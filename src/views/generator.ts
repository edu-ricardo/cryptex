export function renderGenerator(app: HTMLDivElement) {
  app.innerHTML = `
    <div class="container">
      <h1>Gerador de Cryptex</h1>
      <p>Digite uma palavra e uma mensagem secreta.</p>
      <div class="generator">
        <input type="text" id="word-input" placeholder="Digite sua palavra secreta" />
        <textarea id="message-input" placeholder="Digite sua mensagem secreta"></textarea>
        <button id="generate-button">Gerar Link</button>
      </div>
      <div id="link-container" class="hidden">
        <p>Seu link compartilhável:</p>
        <div class="link-display">
          <input type="text" id="generated-link" readonly />
          <button id="copy-button">Copiar</button>
        </div>
      </div>
    </div>
  `;

  const generateButton = document.getElementById('generate-button')!;
  const wordInput = document.getElementById('word-input') as HTMLInputElement;
  const messageInput = document.getElementById('message-input') as HTMLTextAreaElement;
  const linkContainer = document.getElementById('link-container')!;
  const generatedLinkInput = document.getElementById('generated-link') as HTMLInputElement;
  const copyButton = document.getElementById('copy-button')!;

  generateButton.addEventListener('click', () => {
    const word = wordInput.value.trim().toUpperCase();
    const message = messageInput.value;

    if (word && /^[A-Z]+$/.test(word)) {
      const data = { word, message };
      const encodedData = btoa(JSON.stringify(data));
      const link = `${window.location.origin}${window.location.pathname}#/solve/${encodedData}`;
      generatedLinkInput.value = link;
      linkContainer.classList.remove('hidden');
    } else {
      alert('Por favor, digite uma palavra válida (apenas letras A-Z).');
    }
  });

  copyButton.addEventListener('click', () => {
    generatedLinkInput.select();
    document.execCommand('copy');
    copyButton.textContent = 'Copiado!';
    setTimeout(() => {
      copyButton.textContent = 'Copiar';
    }, 2000);
  });
}
