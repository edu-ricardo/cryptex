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
    `;let a=document.getElementById(`cryptex-container`),o=[],s=[],c=new Set,l=e=>e.sort(()=>Math.random()-.5);for(let e=0;e<r.length;e++){let t=r[e],n=l([...`ABCDEFGHIJKLMNOPQRSTUVWXYZ`]);n.includes(t)||(n.pop(),n.push(t),n=l(n));let i={baseLetters:n,currentIndex:Math.floor(n.length/2)};o.push(i);let c=document.createElement(`div`);c.classList.add(`dial-container`);let u=document.createElement(`button`);u.classList.add(`dial-button`,`up-button`),u.innerHTML=`&#9650;`,u.dataset.index=e.toString();let d=document.createElement(`div`);d.classList.add(`letter-viewport`);let f=document.createElement(`div`);f.classList.add(`letter-strip`),s.push(f);for(let e=0;e<3;e++){let e=document.createElement(`div`);e.classList.add(`letter`),e.textContent=``,f.appendChild(e)}d.appendChild(f);let p=document.createElement(`button`);p.classList.add(`dial-button`,`down-button`),p.innerHTML=`&#9660;`,p.dataset.index=e.toString(),c.appendChild(u),c.appendChild(d),c.appendChild(p),a.appendChild(c)}let u=e=>{let t=o[e],n=s[e],r=t.baseLetters,i=r.length,a=r[(t.currentIndex-1+i)%i],c=r[t.currentIndex%i],l=r[(t.currentIndex+1)%i],u=Array.from(n.querySelectorAll(`.letter`));u.length>=3&&(u[0].textContent=a,u[1].textContent=c,u[2].textContent=l,u.forEach(e=>e.classList.remove(`active`)),u[1].classList.add(`active`))},d=(e,t)=>{let n=o[e],r=n.baseLetters.length;if(c.has(e))return;c.add(e);let i=s[e],a=t===`up`?(n.currentIndex-1+r)%r:(n.currentIndex+1)%r;i.style.transition=`transform 180ms ease`,t===`up`?i.style.transform=`translateY(50px)`:i.style.transform=`translateY(-50px)`;let l=()=>{i.removeEventListener(`transitionend`,d),n.currentIndex=a,i.style.transition=`none`,i.style.transform=`translateY(0)`,u(e),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.style.transition=``})}),c.delete(e)},d=()=>l();i.addEventListener(`transitionend`,d),setTimeout(()=>{c.has(e)&&l()},400)};for(let e=0;e<r.length;e++)u(e);document.querySelectorAll(`.up-button`).forEach(e=>{e.addEventListener(`click`,e=>{d(parseInt(e.currentTarget.dataset.index),`up`)})}),document.querySelectorAll(`.down-button`).forEach(e=>{e.addEventListener(`click`,e=>{d(parseInt(e.currentTarget.dataset.index),`down`)})});let f=document.getElementById(`check-button`),p=document.getElementById(`result-message`),m=document.getElementById(`secret-message-container`),h=document.getElementById(`secret-message`);f.addEventListener(`click`,()=>{let e=``;o.forEach(t=>{let n=t.baseLetters,r=n[t.currentIndex%n.length];e+=r}),e===r?(p.textContent=`Parabéns! Você resolveu!`,p.style.color=`green`,a.classList.add(`solved`),i&&(h.textContent=i,m.classList.remove(`hidden`))):(p.textContent=`Não foi dessa vez, tente novamente.`,p.style.color=`red`)})}catch{e.innerHTML=`
      <div class="container">
        <h1>Cryptex Inválido</h1>
        <p>O link parece estar quebrado.</p>
        <a href="#/generate">Crie um novo</a>
      </div>
    `}}var n=document.querySelector(`#app`);function r(){let r=window.location.hash.slice(1)||`/`;r===`/`||r===`/generate`?e(n):r.startsWith(`/solve/`)?t(n,r.substring(7)):e(n)}window.addEventListener(`hashchange`,r),window.addEventListener(`load`,r);