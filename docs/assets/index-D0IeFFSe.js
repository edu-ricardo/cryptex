(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){e.innerHTML=`
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
  `;let t=document.getElementById(`generate-button`),n=document.getElementById(`word-input`),r=document.getElementById(`message-input`),i=document.getElementById(`link-container`),a=document.getElementById(`generated-link`),o=document.getElementById(`copy-button`);t.addEventListener(`click`,()=>{let e=n.value.trim().toUpperCase(),t=r.value;if(e&&/^[A-Z]+$/.test(e)){let n={word:e,message:t},r=btoa(JSON.stringify(n));a.value=`${window.location.origin}${window.location.pathname}#/solve/${r}`,i.classList.remove(`hidden`)}else alert(`Por favor, digite uma palavra válida (apenas letras A-Z).`)}),o.addEventListener(`click`,()=>{a.select(),document.execCommand(`copy`),o.textContent=`Copiado!`,setTimeout(()=>{o.textContent=`Copiar`},2e3)})}function t(e,t){try{let n=JSON.parse(atob(t)),r=n.word,i=n.message;e.innerHTML=`
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
    `;let a=document.getElementById(`cryptex-container`),o=[],s=[],c=e=>e.sort(()=>Math.random()-.5);for(let e=0;e<r.length;e++){let t=r[e],n=c([...`ABCDEFGHIJKLMNOPQRSTUVWXYZ`]);n.includes(t)||(n.pop(),n.push(t),n=c(n));let i={letters:n,currentIndex:Math.floor(n.length/2)};o.push(i);let l=document.createElement(`div`);l.classList.add(`dial-container`);let u=document.createElement(`button`);u.classList.add(`dial-button`,`up-button`),u.innerHTML=`&#9650;`,u.dataset.index=e.toString();let d=document.createElement(`div`);d.classList.add(`letter-viewport`);let f=document.createElement(`div`);f.classList.add(`letter-strip`),s.push(f),n.forEach(e=>{let t=document.createElement(`div`);t.classList.add(`letter`),t.textContent=e,f.appendChild(t)}),d.appendChild(f);let p=document.createElement(`button`);p.classList.add(`dial-button`,`down-button`),p.innerHTML=`&#9660;`,p.dataset.index=e.toString(),l.appendChild(u),l.appendChild(d),l.appendChild(p),a.appendChild(l)}let l=e=>{let t=o[e],n=s[e],r=t.currentIndex*50-50;n.style.transform=`translateY(-${r}px)`,n.querySelectorAll(`.letter`).forEach((e,n)=>{e.classList.remove(`active`),n===t.currentIndex&&e.classList.add(`active`)})},u=(e,t)=>{let n=o[e],r=n.letters.length;t===`up`?n.currentIndex=(n.currentIndex-1+r)%r:n.currentIndex=(n.currentIndex+1)%r,l(e)};for(let e=0;e<r.length;e++)l(e);document.querySelectorAll(`.up-button`).forEach(e=>{e.addEventListener(`click`,e=>{u(parseInt(e.currentTarget.dataset.index),`up`)})}),document.querySelectorAll(`.down-button`).forEach(e=>{e.addEventListener(`click`,e=>{u(parseInt(e.currentTarget.dataset.index),`down`)})});let d=document.getElementById(`check-button`),f=document.getElementById(`result-message`),p=document.getElementById(`secret-message-container`),m=document.getElementById(`secret-message`);d.addEventListener(`click`,()=>{let e=``;o.forEach(t=>{e+=t.letters[t.currentIndex]}),e===r?(f.textContent=`Parabéns! Você resolveu!`,f.style.color=`green`,a.classList.add(`solved`),i&&(m.textContent=i,p.classList.remove(`hidden`))):(f.textContent=`Não foi dessa vez, tente novamente.`,f.style.color=`red`)})}catch{e.innerHTML=`
      <div class="container">
        <h1>Cryptex Inválido</h1>
        <p>O link parece estar quebrado.</p>
        <a href="#/generate">Crie um novo</a>
      </div>
    `}}var n=document.querySelector(`#app`);function r(){let r=window.location.hash.slice(1)||`/`;r===`/`||r===`/generate`?e(n):r.startsWith(`/solve/`)?t(n,r.substring(7)):e(n)}window.addEventListener(`hashchange`,r),window.addEventListener(`load`,r);