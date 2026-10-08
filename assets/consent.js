/* Einwilligungs-Banner (nur für externe Inhalte: Google Maps). Speichert die Auswahl lokal im Browser (localStorage). */
(function () {
  var KEY = 'consent_v1';
  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  var prefix = location.pathname.indexOf('/pages/') !== -1 ? '' : 'pages/';

  var css = '.cb-overlay{position:fixed;left:0;right:0;bottom:0;z-index:2000;padding:18px;display:flex;justify-content:center;pointer-events:none}'
    + '.cb-overlay[hidden]{display:none}'
    + '.cb-box{pointer-events:auto;position:relative;background:#FBF7F0;border-radius:20px;max-width:760px;width:100%;padding:26px 28px 22px;box-shadow:0 18px 60px rgba(27,58,63,.30);border-top:5px solid #9CC61E;font-size:14.5px;line-height:1.6;color:#34383D;animation:cbIn .35s ease both}'
    + '@keyframes cbIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}'
    + '.cb-head{display:flex;align-items:center;gap:12px;margin-bottom:8px}'
    + '.cb-ico{width:40px;height:40px;border-radius:12px;background:#1B3A3F;display:flex;align-items:center;justify-content:center;flex-shrink:0}'
    + '.cb-box h2{font-family:Sora,sans-serif;font-size:19px;font-weight:700;color:#1B3A3F;margin:0}'
    + '.cb-box p{margin:0}'
    + '.cb-box a{color:#1B3A3F;font-weight:600;text-decoration:underline}'
    + '.cb-settings{margin-top:14px;display:grid;gap:10px}'
    + '.cb-settings[hidden]{display:none}'
    + '.cb-row{display:flex;justify-content:space-between;align-items:center;gap:16px;background:#fff;border-radius:12px;padding:12px 16px;box-shadow:0 1px 6px rgba(27,58,63,.07)}'
    + '.cb-row strong{display:block;color:#1B3A3F;font-size:14px}'
    + '.cb-row span.d{font-size:13px;color:#6B6F76}'
    + '.cb-sw{position:relative;width:46px;height:26px;flex-shrink:0}'
    + '.cb-sw input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;z-index:2}'
    + '.cb-sw i{position:absolute;inset:0;border-radius:999px;background:#CFCFCB;transition:background .2s}'
    + '.cb-sw i::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .2s}'
    + '.cb-sw input:checked+i{background:#9CC61E}'
    + '.cb-sw input:checked+i::after{transform:translateX(20px)}'
    + '.cb-sw input:disabled{cursor:not-allowed}'
    + '.cb-sw input:disabled+i{opacity:.6}'
    + '.cb-sw input:focus-visible+i{outline:3px solid #1B3A3F;outline-offset:2px}'
    + '.cb-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}'
    + '.cb-btn{flex:1 1 140px;padding:13px 18px;border-radius:10px;border:2px solid #1B3A3F;background:transparent;color:#1B3A3F;font:inherit;font-weight:600;font-size:14.5px;cursor:pointer;transition:background .15s,transform .15s}'
    + '.cb-btn:hover{background:#fff}'
    + '.cb-btn.cb-primary{background:#9CC61E;border-color:#9CC61E}'
    + '.cb-btn.cb-primary:hover{background:#8ab41a;border-color:#8ab41a}'
    + '.cb-btn:focus-visible{outline:3px solid #1B3A3F;outline-offset:2px}'
    + '.cb-link{background:none;border:none;font:inherit;font-size:13px;font-weight:600;color:#6B6F76;text-decoration:underline;cursor:pointer;padding:10px 0 0;display:block;margin:0 auto}'
    + '@media(max-width:560px){.cb-overlay{padding:10px}.cb-box{padding:20px 18px 16px}.cb-btn{flex:1 1 100%}}'
    + '@media(prefers-reduced-motion:reduce){.cb-box{animation:none}.cb-sw i,.cb-sw i::after{transition:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var box;
  function build() {
    var c = read() || {};
    box = document.createElement('div');
    box.className = 'cb-overlay'; box.hidden = true;
    box.innerHTML = '<div class="cb-box" role="dialog" aria-modal="false" aria-labelledby="cb-title">'
      + '<div class="cb-head"><span class="cb-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a9 9 0 109 9 4 4 0 01-4-4 4 4 0 01-4-4 1 1 0 00-1-1z" stroke="#9CC61E" stroke-width="1.8" stroke-linejoin="round"/><circle cx="9" cy="11" r="1.2" fill="#9CC61E"/><circle cx="14" cy="15" r="1.2" fill="#9CC61E"/><circle cx="8.5" cy="15.5" r="1" fill="#9CC61E"/></svg></span><h2 id="cb-title">Wir respektieren deine Privatsphäre</h2></div>'
      + '<p>Wir verwenden Cookies und ähnliche Technologien, um diese Website bereitzustellen und externe Inhalte wie Google Maps anzuzeigen. Du kannst selbst entscheiden, welche Kategorien du zulässt. Mehr dazu findest du in unserer <a href="' + prefix + 'datenschutz.html#maps">Datenschutzerklärung</a>.</p>'
      + '<div class="cb-settings" id="cb-settings" hidden>'
      + '<div class="cb-row"><div><strong>Notwendig</strong><span class="d">Speichert deine Cookie-Auswahl. Immer aktiv.</span></div><label class="cb-sw"><input type="checkbox" checked disabled aria-label="Notwendig"><i></i></label></div>'
      + '<div class="cb-row"><div><strong>Externe Medien</strong><span class="d">Google Maps (Google Ireland Limited bzw. Google LLC, USA)</span></div><label class="cb-sw"><input type="checkbox" id="cb-maps"' + (c.maps ? ' checked' : '') + ' aria-label="Externe Medien"><i></i></label></div>'
      + '</div>'
      + '<div class="cb-btns"><button type="button" class="cb-btn" id="cb-no">Nur notwendige</button><button type="button" class="cb-btn" id="cb-cfg">Einstellungen</button><button type="button" class="cb-btn cb-primary" id="cb-all">Alle akzeptieren</button></div>'
      + '</div>';
    document.body.appendChild(box);
    function decide(maps) { var old = read(); write({ maps: !!maps, ts: Date.now() }); box.hidden = true; apply(); if (old && old.maps && !maps) location.reload(); }
    var cfg = box.querySelector('#cb-cfg'), panel = box.querySelector('#cb-settings');
    box.querySelector('#cb-no').addEventListener('click', function () { decide(false); });
    box.querySelector('#cb-all').addEventListener('click', function () { decide(true); });
    cfg.addEventListener('click', function () {
      if (panel.hidden) { panel.hidden = false; cfg.textContent = 'Auswahl speichern'; cfg.classList.add('cb-primary'); box.querySelector('#cb-all').classList.remove('cb-primary'); }
      else { decide(box.querySelector('#cb-maps').checked); }
    });
  }
  function apply() {
    var c = read();
    var btn = document.getElementById('map-load');
    if (c && c.maps && btn) btn.click();
  }
  function open() { if (!box) build(); var c = read() || {}; box.querySelector('#cb-maps').checked = !!c.maps; box.hidden = false; box.querySelector('#cb-all').focus(); }
  window.openConsent = open;

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-consent-open]') : null;
    if (t) { e.preventDefault(); open(); }
  });

  function init() {
    build();
    var c = read();
    if (!c) { box.hidden = false; } else { apply(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
