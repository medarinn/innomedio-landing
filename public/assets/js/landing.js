// innoTMSGO várólista landing + köszönőoldal.
// Az űrlap még nincs bekötve: érvényes kitöltés után a köszönőoldalra visz, adatot nem küld sehova.
(() => {
  // "Mindegyiket elfogadom": bejelöli / leveszi a nyilatkozatokat, és követi az állapotukat.
  document.querySelectorAll('form[data-form]').forEach((form) => {
    const all = form.querySelector('[data-check-all]');
    const items = [...form.querySelectorAll('[data-check-item]')];
    const error = form.querySelector('[data-form-error]');

    const syncAll = () => {
      if (!all) return;
      const on = items.filter((item) => item.checked).length;
      all.checked = on === items.length;
      all.indeterminate = on > 0 && on < items.length;
    };
    if (all) {
      all.addEventListener('change', () => {
        items.forEach((item) => { item.checked = all.checked; });
        syncAll();
      });
    }
    items.forEach((item) => item.addEventListener('change', syncAll));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        if (error) error.hidden = false;
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        form.reportValidity();
        return;
      }
      if (error) error.hidden = true;
      // Bekötéskor itt megy el a jelentkezés (fetch), és csak siker után lépünk tovább.
      window.location.assign(form.getAttribute('action') || '/koszonjuk/');
    });
  });

  // Videó: kattintásra tölti be a YouTube-lejátszót (adatvédelmi okból előtte nem).
  document.querySelectorAll('[data-video]').forEach((box) => {
    const button = box.querySelector('[data-video-play]');
    if (!button) return;
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(box.dataset.video)}?autoplay=1&rel=0`;
      iframe.title = box.dataset.videoTitle || 'Videó';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
    });
  });
})();

// Esti mód kapcsoló: alapból világos (a rendszerbeállítás nem kapcsolja át); kattintásra vált, és a választás megmarad (localStorage).
(() => {
  const root = document.documentElement;
  const KEY = 'innotmsgo-tema';
  const isDark = () => root.getAttribute('data-theme') === 'dark';
  const buttons = [...document.querySelectorAll('[data-theme-toggle]')];
  const sync = () => {
    const dark = isDark();
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', dark ? 'true' : 'false');
      const label = dark ? 'Esti mód kikapcsolása' : 'Esti mód bekapcsolása';
      button.setAttribute('aria-label', label);
      button.title = label;
    });
  };
  buttons.forEach((button) => button.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (e) { /* privát ablakban nincs tárhely: csak erre a látogatásra vált */ }
    sync();
  }));
  sync();
})();
