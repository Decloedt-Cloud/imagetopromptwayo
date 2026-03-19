export function initDropdown() {
  const trigger = document.getElementById('dd-trigger');
  const menu = document.getElementById('dd-menu');
  const chevron = document.getElementById('dd-chevron');

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.style.display === 'block';
    menu.style.display = open ? 'none' : 'block';
    chevron.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
  });

  document.addEventListener('click', () => {
    menu.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  });
}