// ─── Active dropdown item ─────────────────────────────

function highlightActiveDropdownItem() {
  const path = window.location.pathname;

  const map = {
    '/midjourney/':                 'Midjourney',
    '/midjourney/index.html':       'Midjourney',
    '/stable-diffusion/':           'Stable Diffusion',
    '/stable-diffusion/index.html': 'Stable Diffusion',
    '/dalle/':                      'DALL·E',
    '/dalle/index.html':            'DALL·E',
  };

  const label = map[path];
  if (!label) return;

  document.querySelectorAll('#dd-menu a').forEach(a => {
    const itemLabel = a.querySelector('.dd-label')?.textContent?.trim();

    if (itemLabel === label) {
      a.classList.add('bg-brand-light');
      a.classList.remove('hover:bg-surface');

      a.querySelector('.dd-icon')?.classList.replace('bg-surface', 'bg-brand');
      a.querySelector('.dd-svg')?.classList.replace('text-muted', 'text-white');
      a.querySelector('.dd-label')?.classList.replace('text-primary', 'text-brand');
    }
  });
}


// ─── Dropdown ─────────────────────────────

function initDropdown() {
  const trigger = document.getElementById('dd-trigger');
  const menu = document.getElementById('dd-menu');
  const chevron = document.getElementById('dd-chevron');

  if (!trigger || !menu) return;

  trigger.addEventListener('click', e => {
    e.stopPropagation();

    const open = menu.style.display === 'block';
    menu.style.display = open ? 'none' : 'block';

    if (chevron) {
      chevron.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });

  document.addEventListener('click', () => {
    menu.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  });
}


// ─── Mobile menu ─────────────────────────────

function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
  });
}


// ─── PUBLIC INIT ─────────────────────────────

export function initNav() {
  initDropdown();
  initMobileMenu();
  highlightActiveDropdownItem();
}