import './style.css';
import { renderGenerator } from './views/generator';
import { renderSolver } from './views/solver';

const app = document.querySelector<HTMLDivElement>('#app')!;

function router() {
  const path = window.location.hash.slice(1) || '/';
  if (path === '/' || path === '/generate') {
    renderGenerator(app);
  } else if (path.startsWith('/solve/')) {
    const encodedData = path.substring('/solve/'.length);
    renderSolver(app, encodedData);
  } else {
    renderGenerator(app);
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);