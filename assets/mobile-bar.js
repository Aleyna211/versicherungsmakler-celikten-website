/* Feste Kontaktleiste (Anrufen, Termin) nur auf Smartphones. */
(function () {
  var p = location.pathname;
  if (/\/(kontakt|danke|altersvorsorge-check)\.html$/.test(p)) return;
  var prefix = p.indexOf('/pages/') !== -1 ? '' : 'pages/';
  var css = '.mb-bar{display:none}'
    + '@media (max-width:900px){'
    + 'body{padding-bottom:calc(78px + env(safe-area-inset-bottom))}'
    + '.mb-bar{display:grid;grid-template-columns:1fr 1.5fr;gap:10px;position:fixed;left:0;right:0;bottom:0;z-index:1500;background:#fff;padding:10px 14px calc(10px + env(safe-area-inset-bottom));box-shadow:0 -6px 24px rgba(27,58,63,.16);border-top:1px solid rgba(27,58,63,.08)}'
    + '.mb-bar a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:50px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;font-family:inherit}'
    + '.mb-call{border:2px solid #1B3A3F;color:#1B3A3F;background:#fff}'
    + '.mb-cta{background:#9CC61E;color:#1B3A3F;border:2px solid #9CC61E}'
    + '.mb-bar a:active{transform:scale(.98)}'
    + '}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function init() {
    var bar = document.createElement('nav');
    bar.className = 'mb-bar'; bar.setAttribute('aria-label', 'Schnellkontakt');
    bar.innerHTML = '<a class="mb-call" href="tel:+491702392285"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>Anrufen</a>'
      + '<a class="mb-cta" href="' + prefix + 'kontakt.html">Termin anfragen</a>';
    document.body.appendChild(bar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
