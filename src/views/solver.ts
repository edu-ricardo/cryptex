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
    const dialData: { letters: string[]; currentIndex: number }[] = [];
    const letterStrips: HTMLDivElement[] = [];

    const letterHeight = 50; // This value MUST match the CSS

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
        letters: shuffledLetters,
        currentIndex: Math.floor(shuffledLetters.length / 2), // Start in the middle
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
      
      shuffledLetters.forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.textContent = letter;
        letterStrip.appendChild(letterDiv);
      });

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

        // Update transform to center the active letter
        const translateY = dialInfo.currentIndex * letterHeight - (letterHeight);
        letterStrip.style.transform = `translateY(-${translateY}px)`;

        // Update classes
        letterStrip.querySelectorAll('.letter').forEach((letterDiv, i) => {
            letterDiv.classList.remove('active');
            if (i === dialInfo.currentIndex) {
                letterDiv.classList.add('active');
            }
        });
    }

    const updateDial = (index: number, direction: 'up' | 'down') => {
        const dialInfo = dialData[index];
        const numLetters = dialInfo.letters.length;

        if (direction === 'up') {
            dialInfo.currentIndex = (dialInfo.currentIndex - 1 + numLetters) % numLetters;
        } else {
            dialInfo.currentIndex = (dialInfo.currentIndex + 1) % numLetters;
        }
        updateDialAppearance(index);
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
        guess += dialInfo.letters[dialInfo.currentIndex];
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