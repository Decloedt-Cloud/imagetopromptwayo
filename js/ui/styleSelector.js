import { state } from '../core/state.js';

export function initStyleSelector() {
  const buttons = document.querySelectorAll('.style-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('ring-2','ring-orange-500','text-brand'));
      btn.classList.add('ring-2','ring-orange-500','text-brand');
      state.currentStyle = btn.dataset.style;
    });
  });

  document
    .querySelector('.style-btn[data-style="realiste"]')
    ?.classList.add('ring-2','ring-orange-500','text-brand');
}