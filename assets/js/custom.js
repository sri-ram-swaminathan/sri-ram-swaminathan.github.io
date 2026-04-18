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
  // Mistral-style reclining cat: cream body, black outline, normal triangular ears.
  // Two SVG frames stacked; opacity alternates to wag the tail tip.
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var PALETTE = {
    'K': 'currentColor',   // outline — theme-aware via wrapper color
    'C': '#f5ead5',        // cream body (constant, Mistral-style)
    'E': 'currentColor'    // eye (same as outline)
  };

  // 24 cols x 14 rows. Cat faces right (head right, tail curls up on left).
  var FRAME_0 = [
    '........................',
    '...............K...K....',
    '..KK...........KCK.KCK..',
    '.KCK..........KCCCCCCCK.',
    '.KCK..........KCCCCCCCK.',
    '.KCK..........KCECCCECK.',
    '.KCCKKKKKKKKKKKCCCCCCCK.',
    '.KCCCCCCCCCCCCCCCCCCCK..',
    '.KCCCCCCCCCCCCCCCCCCCK..',
    '.KCCCCCCCCCCCCCCCCCCCK..',
    '.KCCKKCCKKCCCCCCCKKCCK..',
    '.KCK.KCK.KCCCCCCK.KCCK..',
    '.KKK.KKK.KKKKKKKK.KKKK..',
    '........................'
  ];
  // Frame 1: tail tip lifts and curls — a small twitch.
  var FRAME_1 = [
    '........................',
    '..K............K...K....',
    '..KKK..........KCK.KCK..',
    '.KCCK.........KCCCCCCCK.',
    '.KCK..........KCCCCCCCK.',
    '.KCK..........KCECCCECK.',
    '.KCCKKKKKKKKKKKCCCCCCCK.',
    '.KCCCCCCCCCCCCCCCCCCCK..',
    '.KCCCCCCCCCCCCCCCCCCCK..',
    '.KCCCCCCCCCCCCCCCCCCCK..',
    '.KCCKKCCKKCCCCCCCKKCCK..',
    '.KCK.KCK.KCCCCCCK.KCCK..',
    '.KKK.KKK.KKKKKKKK.KKKK..',
    '........................'
  ];

  function makeCatFrame(pixelMap, cls) {
    var W = pixelMap[0].length;
    var H = pixelMap.length;
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('pixel-cat-frame', cls);

    for (var y = 0; y < H; y++) {
      var row = pixelMap[y];
      for (var x = 0; x < row.length; x++) {
        var color = PALETTE[row[x]];
        if (!color) continue;
        var r = document.createElementNS(SVG_NS, 'rect');
        r.setAttribute('x', x);
        r.setAttribute('y', y);
        r.setAttribute('width', 1);
        r.setAttribute('height', 1);
        r.setAttribute('fill', color);
        svg.appendChild(r);
      }
    }
    return svg;
  }

  function buildCat() {
    var wrapper = document.createElement('div');
    wrapper.className = 'pixel-cat-wrapper';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.appendChild(makeCatFrame(FRAME_0, 'pixel-cat-frame-0'));
    wrapper.appendChild(makeCatFrame(FRAME_1, 'pixel-cat-frame-1'));
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
