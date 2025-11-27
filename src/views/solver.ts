export function renderSolver(app: HTMLDivElement, encodedData: string) {
  try {
    const decodedData = JSON.parse(atob(encodedData));
    const solution = decodedData.word;
    const secretMessage = decodedData.message;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    app.innerHTML = `
      <div class="container">
        <h1>Resolva o Cryptex</h1>
        <p>Alinhe as letras para desbloquear a mensagem secreta.</p>
        <div id="cryptex-container" class="cryptex"></div>
        <button id="check-button">Verificar</button>
        <p id="result-message"></p>
        <div id="secret-message-container" class="hidden">
            <h2>A Mensagem Secreta:</h2>
            <p id="secret-message"></p>
        </div>
        <a href="#/generate">Crie o seu próprio</a>
      </div>
    `;

    const cryptexContainer = document.getElementById('cryptex-container')!;
    const dialData: { baseLetters: string[]; currentIndex: number }[] = [];
    const letterStrips: HTMLDivElement[] = [];
    const animating = new Set<number>();

    // letter height is controlled by CSS (.letter { height: 50px })

    // Helper to shuffle array
    const shuffleArray = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

    for (let i = 0; i < solution.length; i++) {
      const correctLetter = solution[i];
      let shuffledLetters = shuffleArray([...alphabet]);
      if (!shuffledLetters.includes(correctLetter)) {
        shuffledLetters.pop();
        shuffledLetters.push(correctLetter);
        shuffledLetters = shuffleArray(shuffledLetters);
      }
      
      const dialInfo = {
        baseLetters: shuffledLetters,
        currentIndex: Math.floor(shuffledLetters.length / 2), // start near middle of base set
      };
      dialData.push(dialInfo);

      const dialContainer = document.createElement('div');
      dialContainer.classList.add('dial-container');

      const upButton = document.createElement('button');
      upButton.classList.add('dial-button', 'up-button');
      upButton.innerHTML = '&#9650;';
      upButton.dataset.index = i.toString();

      const letterViewport = document.createElement('div');
      letterViewport.classList.add('letter-viewport');
      
      const letterStrip = document.createElement('div');
      letterStrip.classList.add('letter-strip');
      letterStrips.push(letterStrip);
      
      // Populate with 3 letters: prev, current, next — always present (circular)
      for (let j = 0; j < 3; j++) {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        // placeholder text; will be updated by updateDialAppearance
        letterDiv.textContent = '';
        letterStrip.appendChild(letterDiv);
      }
      // no initial transform: three-row strip already centers the middle letter

      letterViewport.appendChild(letterStrip);

      const downButton = document.createElement('button');
      downButton.classList.add('dial-button', 'down-button');
      downButton.innerHTML = '&#9660;';
      downButton.dataset.index = i.toString();
      
      dialContainer.appendChild(upButton);
      dialContainer.appendChild(letterViewport);
      dialContainer.appendChild(downButton);
      cryptexContainer.appendChild(dialContainer);
    }
    
    const updateDialAppearance = (index: number) => {
      const dialInfo = dialData[index];
      const letterStrip = letterStrips[index];
      const base = dialInfo.baseLetters;
      const L = base.length;

      // compute prev/current/next from baseLetters (circular)
      const prev = base[(dialInfo.currentIndex - 1 + L) % L];
      const curr = base[dialInfo.currentIndex % L];
      const next = base[(dialInfo.currentIndex + 1) % L];

      const letterDivs = Array.from(letterStrip.querySelectorAll('.letter')) as HTMLDivElement[];
      if (letterDivs.length >= 3) {
        letterDivs[0].textContent = prev;
        letterDivs[1].textContent = curr;
        letterDivs[2].textContent = next;
        letterDivs.forEach(d => d.classList.remove('active'));
        letterDivs[1].classList.add('active');
      }
    }

    const updateDial = (index: number, direction: 'up' | 'down') => {
      const dialInfo = dialData[index];
      const numLetters = dialInfo.baseLetters.length;

      if (animating.has(index)) return; // ignore while animating
      animating.add(index);

      const letterStrip = letterStrips[index];
      // compute new index (but don't update DOM texts until animation ends)
      const newIndex = direction === 'up'
        ? (dialInfo.currentIndex - 1 + numLetters) % numLetters
        : (dialInfo.currentIndex + 1) % numLetters;

      // ensure there's a transition set (CSS has fallback)
      letterStrip.style.transition = 'transform 180ms ease';
      const distance = 50; // px, must match .letter height in CSS
      if (direction === 'up') {
        // move content down so previous letter moves into middle
        letterStrip.style.transform = `translateY(${distance}px)`;
      } else {
        // move content up so next letter moves into middle
        letterStrip.style.transform = `translateY(-${distance}px)`;
      }

      const cleanup = () => {
        letterStrip.removeEventListener('transitionend', onEnd);
        // commit index and update displayed letters
        dialInfo.currentIndex = newIndex;
        // temporarily disable transition and reset transform to zero
        letterStrip.style.transition = 'none';
        letterStrip.style.transform = 'translateY(0)';
        updateDialAppearance(index);
        // restore transition after a frame
        requestAnimationFrame(() => { requestAnimationFrame(() => { letterStrip.style.transition = ''; }); });
        animating.delete(index);
      };

      const onEnd = () => cleanup();
      letterStrip.addEventListener('transitionend', onEnd);
      // safety fallback: if transitionend doesn't fire, force cleanup
      setTimeout(() => { if (animating.has(index)) cleanup(); }, 400);
    };

    // Set initial state
    for (let i = 0; i < solution.length; i++) {
        updateDialAppearance(i);
    }

    document.querySelectorAll('.up-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt((e.currentTarget as HTMLElement).dataset.index!);
            updateDial(index, 'up');
        });
    });

    document.querySelectorAll('.down-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt((e.currentTarget as HTMLElement).dataset.index!);
            updateDial(index, 'down');
        });
    });

    const checkButton = document.getElementById('check-button')!;
    const resultMessage = document.getElementById('result-message')!;
    const secretMessageContainer = document.getElementById('secret-message-container')!;
    const secretMessageEl = document.getElementById('secret-message')!;

    checkButton.addEventListener('click', () => {
      let guess = '';
      dialData.forEach(dialInfo => {
        const base = dialInfo.baseLetters;
        const letter = base[dialInfo.currentIndex % base.length];
        guess += letter;
      });

      if (guess === solution) {
        resultMessage.textContent = 'Parabéns! Você resolveu!';
        resultMessage.style.color = 'green';
        cryptexContainer.classList.add('solved');
        
        if (secretMessage) {
            secretMessageEl.textContent = secretMessage;
            secretMessageContainer.classList.remove('hidden');
        }

      } else {
        resultMessage.textContent = 'Não foi dessa vez, tente novamente.';
        resultMessage.style.color = 'red';
      }
    });

  } catch (e) {
    app.innerHTML = `
      <div class="container">
        <h1>Cryptex Inválido</h1>
        <p>O link parece estar quebrado.</p>
        <a href="#/generate">Crie um novo</a>
      </div>
    `
  }
}