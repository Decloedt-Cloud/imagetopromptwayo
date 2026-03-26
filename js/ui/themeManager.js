const THEME_KEY = 'theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    return storedTheme;
  }
  
  return DARK_THEME;
}

function applyTheme(theme) {
  const html = document.documentElement;
  
  html.setAttribute('data-theme', theme);
  
  if (theme === DARK_THEME) {
    html.classList.add(DARK_THEME);
  } else {
    html.classList.remove(DARK_THEME);
  }
  
  localStorage.setItem(THEME_KEY, theme);
  
  updateThemeToggleIcon(theme);
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains(DARK_THEME);
  const newTheme = isDark ? LIGHT_THEME : DARK_THEME;
  applyTheme(newTheme);
}

function updateThemeToggleIcon(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  
  const icon = toggleBtn.querySelector('#themeIcon');
  if (!icon) return;
  
  if (theme === LIGHT_THEME) {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    toggleBtn.setAttribute('title', 'Switch to dark mode');
    toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    toggleBtn.setAttribute('title', 'Switch to light mode');
    toggleBtn.setAttribute('aria-label', 'Switch to light mode');
  }
}

function initTheme() {
  const theme = getPreferredTheme();
  
  document.documentElement.setAttribute('data-theme', theme);
  
  applyTheme(theme);
  
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
}

export { initTheme, toggleTheme, getPreferredTheme };
