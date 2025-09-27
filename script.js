// ===============================
// Site Enhancements - Drop-in
// ===============================
(function () {
  // Attach current year
  document.addEventListener('DOMContentLoaded', function () {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });

  // Keep-original pages: group-training, our-purpose, chase-tag, learn-more
  var keepOriginalSlugs = ['group-training', 'our-purpose', 'chase-tag', 'learn-more'];
  var path = (location.pathname || '').toLowerCase();
  if (keepOriginalSlugs.some(function (slug) { return path.indexOf(slug) !== -1; })) {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('page-keep-original');
    });
  }

  // Scroll-reactive arrow
  var arrow = document.getElementById('scroll-arrow');
  if (!arrow) return;
  var svgPath = arrow.querySelector('svg path');
  var minScale = 0.6, maxScale = 7.0, scale = 1.0;
  var lastY = window.scrollY || 0, ticking = false;
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function onScroll() {
    if (ticking) return;
    window.requestAnimationFrame(function () {
      var y = window.scrollY || 0;
      var dy = y - lastY;
      var factor = 0.006; // sensitivity
      scale = clamp(scale + dy * factor, minScale, maxScale);
      arrow.style.setProperty('--arrow-scale', scale.toFixed(3));

      if (svgPath && typeof svgPath.getTotalLength === 'function') {
        try {
          var total = svgPath.getTotalLength();
          var dash = clamp(total * (scale / maxScale), 20, total);
          svgPath.style.strokeDasharray = dash + ' ' + total;
          svgPath.style.strokeDashoffset = 0;
        } catch (e) {}
      }
      lastY = y; ticking = false;
    });
    ticking = true;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
