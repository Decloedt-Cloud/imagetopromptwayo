// ─── Active dropdown item based on current page ───────────────────────────

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
      a.querySelector('.dd-icon').classList.replace('bg-surface', 'bg-brand');
      a.querySelector('.dd-svg').classList.replace('text-muted',  'text-white');
      a.querySelector('.dd-label').classList.replace('text-primary', 'text-brand');
    }
  });
}


// ─── Dropdown open / close ────────────────────────────────────────────────

function initDropdown() {
  const ddTrigger = document.getElementById('dd-trigger');
  const ddMenu    = document.getElementById('dd-menu');
  const ddChevron = document.getElementById('dd-chevron');

  if (!ddTrigger || !ddMenu) return;

  ddTrigger.addEventListener('click', e => {
    e.stopPropagation();
    const open = ddMenu.style.display === 'block';
    ddMenu.style.display      = open ? 'none'         : 'block';
    ddChevron.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
  });

  document.addEventListener('click', () => {
    ddMenu.style.display      = 'none';
    ddChevron.style.transform = 'rotate(0deg)';
  });
}


// ─── Mobile menu open / close ─────────────────────────────────────────────

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu   = document.getElementById('mobile-menu');

  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.addEventListener('click', () => {
    const open = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = open ? 'none' : 'flex';
  });
}


// ─── Init all nav functionality ───────────────────────────────────────────

function initNav() {
  initDropdown();
  initMobileMenu();
  highlightActiveDropdownItem();
}

document.addEventListener('DOMContentLoaded', initNav);