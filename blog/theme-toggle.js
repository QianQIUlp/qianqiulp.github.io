(function () {
  const button = document.getElementById('themeToggle');

  if (!button) {
    return;
  }

  const root = document.documentElement;

  function applyTheme(theme) {
    const isDark = theme === 'dark';

    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      button.textContent = '☀️';
      return;
    }

    root.removeAttribute('data-theme');
    button.textContent = '🌙';
  }

  applyTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

  button.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
})();