(function () {
  'use strict';

  // --- Theme toggle -------------------------------------------------------
  var STORAGE_KEY = 'site-theme';
  var root = document.documentElement;

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storeTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }
  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }

  var initial = getStoredTheme() || (prefersDark() ? 'dark' : 'light');
  applyTheme(initial);

  function wireToggle() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  // Respect OS-level changes unless the user explicitly picked a theme.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var mqHandler = function (e) {
      if (!getStoredTheme()) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', mqHandler);
    else if (mq.addListener) mq.addListener(mqHandler);
  }

  // --- Pixel cat ----------------------------------------------------------
  // Sprite-sheet driven (cat 1.6.png). CSS handles frame stepping.
  function buildCat() {
    var wrapper = document.createElement('div');
    wrapper.className = 'pixel-cat-wrapper';
    wrapper.setAttribute('aria-hidden', 'true');

    var sprite = document.createElement('div');
    sprite.className = 'pixel-cat-img';
    wrapper.appendChild(sprite);

    document.body.appendChild(wrapper);
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    wireToggle();
    buildCat();
  });
})();
