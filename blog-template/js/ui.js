// ui.js – handles theme toggling and UI interactions

// Simple storage of theme preference in localStorage
export function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Apply stored theme on load
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  toggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  // Update CSS variables if needed – currently only dark theme defined.
  // Light theme fallback can be added later.
}
