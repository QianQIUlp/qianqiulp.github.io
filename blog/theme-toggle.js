(function () {
  var button = document.getElementById('themeToggle');
  if (!button) return;

  var root = document.documentElement;
  var isDark = root.getAttribute('data-theme') === 'dark';
  button.textContent = isDark ? '☀️' : '🌙';

  button.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark';
    if (dark) {
      root.removeAttribute('data-theme');
      button.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      button.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
})();