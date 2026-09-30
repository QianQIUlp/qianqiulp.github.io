// Shared by Astro markup and the controls that change state in the browser.
export const iconPaths = {
  right: 'M3 10h14m-5-5 5 5-5 5',
  left: 'M17 10H3m5-5-5 5 5 5',
  down: 'M10 3v14m-5-5 5 5 5-5',
  northeast: 'M4 16 16 4M5 4h11v11',
  southeast: 'M4 4 16 16M5 16h11V5',
  southwest: 'M16 4 4 16M15 16H4V5',
  northwest: 'M16 16 4 4M15 4H4v11',
  horizontal: 'M3 10h14M7 6l-4 4 4 4m6-8 4 4-4 4',
  vertical: 'M10 3v14M6 7l4-4 4 4m-8 6 4 4 4-4',
  plus: 'M10 3v14M3 10h14',
  minus: 'M3 10h14',
  overview: 'M3 8V3h5m4 0h5v5m0 4v5h-5m-4 0H3v-5',
  replay: 'M16 8a6 6 0 1 0 0 5M16 3v5h-5',
  restore: 'M4 8a6 6 0 1 1 0 5M4 3v5h5',
  play: 'M6 4 16 10 6 16Z',
  pause: 'M7 4v12m6-12v12',
  record: 'M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  stop: 'M5 5h10v10H5Z',
  check: 'M3 10l5 5 9-10',
  wave: 'M2 11c3-10 5 10 8 0s5 10 8 0',
  point: 'M11.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0',
};

export function setIcon(element, name) {
  const icon = element.querySelector('.ui-icon');
  icon.toggleAttribute('hidden', !name);
  if (name) {
    icon.dataset.icon = name;
    icon.querySelector('path').setAttribute('d', iconPaths[name]);
  }
}

export function setControl(element, label, name) {
  element.firstChild.textContent = `${label} `;
  setIcon(element, name);
}
