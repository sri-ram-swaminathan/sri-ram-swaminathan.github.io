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
  // Two SVG frames stacked; CSS alternates opacity to create a walk cycle.
  // Cat faces right (head on right, tail on left). Flipped via scaleX(-1) at wall.
  var SVG_NS = 'http://www.w3.org/2000/svg';

  function rect(parent, x, y, w, h) {
    var r = document.createElementNS(SVG_NS, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', y);
    r.setAttribute('width', w);
    r.setAttribute('height', h);
    r.setAttribute('fill', 'currentColor');
    parent.appendChild(r);
  }

  function drawBody(g) {
    // Tail (left side, curls up)
    rect(g, 0, 2, 2, 4);
    rect(g, 1, 5, 2, 1);
    // Body
    rect(g, 2, 4, 13, 4);
    // Head
    rect(g, 13, 2, 7, 3);
    // Ears
    rect(g, 13, 0, 2, 2);
    rect(g, 17, 0, 2, 2);
  }

  function makeFrame(legPositions) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 20 11');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('aria-hidden', 'true');
    var g = document.createElementNS(SVG_NS, 'g');
    drawBody(g);
    // Legs
    legPositions.forEach(function (leg) {
      rect(g, leg.x, 8, 2, leg.h);
    });
    svg.appendChild(g);
    return svg;
  }

  function buildCat() {
    var wrapper = document.createElement('div');
    wrapper.className = 'pixel-cat-wrapper';
    wrapper.setAttribute('aria-hidden', 'true');

    // Frame 0: outer legs down, inner legs up
    var frame0 = makeFrame([
      { x: 2,  h: 3 },
      { x: 6,  h: 1 },
      { x: 11, h: 1 },
      { x: 14, h: 3 }
    ]);
    frame0.classList.add('pixel-cat-frame', 'pixel-cat-frame-0');

    // Frame 1: outer legs up, inner legs down
    var frame1 = makeFrame([
      { x: 2,  h: 1 },
      { x: 6,  h: 3 },
      { x: 11, h: 3 },
      { x: 14, h: 1 }
    ]);
    frame1.classList.add('pixel-cat-frame', 'pixel-cat-frame-1');

    wrapper.appendChild(frame0);
    wrapper.appendChild(frame1);
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
