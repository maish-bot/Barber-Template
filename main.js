/* Site behaviour. You shouldn't need to edit this file —
   shop details live in assets/config.js. */
(function () {
  var S = window.SITE || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  document.documentElement.classList.add('js');

  /* ---------- Fill in shop details from config.js ---------- */
  var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.mapQuery || '');
  var links = {
    tel: S.phoneLink ? 'tel:' + S.phoneLink : '',
    whatsapp: S.whatsapp ? 'https://wa.me/' + S.whatsapp : '',
    email: S.email ? 'mailto:' + S.email : '',
    maps: mapsUrl,
    booking: S.bookingUrl || 'Contacts.html#book',
    instagram: S.instagram, tiktok: S.tiktok, facebook: S.facebook
  };
  var text = {
    name: S.name, phone: S.phone, email: S.email,
    address: (S.address || []).join(', '),
    rating: S.rating, reviewCount: S.reviewCount,
    year: String(new Date().getFullYear())
  };
  $$('[data-site]').forEach(function (el) {
    var v = text[el.dataset.site];
    if (v) el.textContent = v;
  });
  $$('[data-site-lines]').forEach(function (el) {
    if (S.address && S.address.length) el.innerHTML = S.address.map(escapeHtml).join('<br>');
  });
  $$('[data-link]').forEach(function (el) {
    var v = links[el.dataset.link];
    if (v) {
      el.href = v;
      if (/^https?:/.test(v) && !/^Contacts/.test(v)) { el.target = '_blank'; el.rel = 'noopener'; }
    } else if (v === '' || v === undefined) {
      if (el.hasAttribute('data-hide-empty')) (el.closest('li[data-hide-whatsapp]') || el).remove();
    }
  });
  // "Book <service>" buttons: online booking link if set, otherwise the form with that service picked
  $$('[data-book]').forEach(function (el) {
    el.href = S.bookingUrl || 'Contacts.html?service=' + encodeURIComponent(el.dataset.book) + '#book';
    if (S.bookingUrl) { el.target = '_blank'; el.rel = 'noopener'; }
  });
  if (!S.rating) $$('[data-needs-rating]').forEach(function (el) { el.remove(); });
  $$('[data-map]').forEach(function (f) {
    f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(S.mapQuery || '') + '&output=embed';
  });

  /* ---------- Opening hours + open now ---------- */
  var now = new Date(), day = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
  var toMin = function (t) { var p = (t || '').split(':'); return p.length === 2 ? (+p[0]) * 60 + (+p[1]) : null; };
  var fmt = function (t) {
    var m = toMin(t); if (m === null) return '';
    var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return h + (mm ? ':' + String(mm).padStart(2, '0') : '') + ap;
  };
  var hours = S.hours || [];
  var todayRule = hours.filter(function (h) { return h.days.indexOf(day) > -1; })[0];
  var isOpen = !!(todayRule && todayRule.open && mins >= toMin(todayRule.open) && mins < toMin(todayRule.close));

  $$('[data-hours]').forEach(function (table) {
    table.innerHTML = hours.map(function (h) {
      var t = h.open ? fmt(h.open) + ' – ' + fmt(h.close) : 'Closed';
      return '<tr' + (h === todayRule ? ' class="today"' : '') + '><td>' + escapeHtml(h.label) + '</td><td>' + t + '</td></tr>';
    }).join('');
  });
  $$('[data-open-status]').forEach(function (el) {
    el.classList.add(isOpen ? 'is-open' : 'is-closed');
    el.textContent = isOpen ? 'Open now' : 'Closed now';
  });
  $$('[data-today]').forEach(function (el) {
    if (todayRule && todayRule.open) {
      el.textContent = isOpen ? 'Open today until ' + fmt(todayRule.close)
        : (mins < toMin(todayRule.open) ? 'Opens today at ' + fmt(todayRule.open) : 'Closed for today');
    } else { el.textContent = 'Closed today'; }
  });

  /* ---------- Mobile menu ---------- */
  var btn = $('.menu-btn'), nav = $('.mobile-nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  /* ---------- Missing photos: show a labelled placeholder ---------- */
  $$('img[data-photo]').forEach(function (img) {
    var mark = function () {
      var box = img.parentElement;
      box.classList.add('img-missing');
      box.setAttribute('data-label', img.getAttribute('src'));
      img.style.display = 'none';
      if (!box.querySelector('.img-missing__label')) {
        var s = document.createElement('span');
        s.className = 'img-missing__label';
        s.textContent = 'Add photo: ' + img.getAttribute('src');
        box.appendChild(s);
      }
    };
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });

  /* ---------- Gallery filters + lightbox ---------- */
  var shots = $$('.shot');
  $$('.filter').forEach(function (f) {
    f.addEventListener('click', function () {
      $$('.filter').forEach(function (b) { b.setAttribute('aria-pressed', b === f); });
      shots.forEach(function (s) { s.hidden = f.dataset.filter !== 'all' && s.dataset.cat !== f.dataset.filter; });
    });
  });
  var lb = $('.lightbox');
  if (lb && shots.length) {
    var lbImg = $('img', lb), lbCap = $('p', lb), idx = 0;
    var visible = function () { return shots.filter(function (s) { return !s.hidden && !s.classList.contains('img-missing'); }); };
    var show = function (i) {
      var list = visible(); if (!list.length) return;
      idx = (i + list.length) % list.length;
      var im = $('img', list[idx]);
      lbImg.src = im.src; lbImg.alt = im.alt; lbCap.textContent = im.alt;
    };
    var open = function (s) {
      if (s.classList.contains('img-missing')) return;
      show(visible().indexOf(s)); lb.classList.add('open'); $('.lb-close', lb).focus();
    };
    var close = function () { lb.classList.remove('open'); };
    shots.forEach(function (s) {
      s.tabIndex = 0;
      s.addEventListener('click', function () { open(s); });
      s.addEventListener('keydown', function (e) { if (e.key === 'Enter') open(s); });
    });
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', function () { show(idx - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- Contact form ---------- */
  var form = $('#contact-form');
  if (form) {
    // Pre-select a service when arriving from a "Book" link like Contacts.html?service=Skin%20fade#book
    var wanted = new URLSearchParams(location.search).get('service');
    var sel = $('select[name=service]', form);
    if (wanted && sel) sel.value = wanted;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form), msg = $('.form-msg', form.parentElement);
      if (S.formEndpoint) {
        var b = $('button[type=submit]', form); b.disabled = true; b.textContent = 'Sending…';
        fetch(S.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw 0; form.reset(); msg.textContent = "Thanks — we'll get back to you shortly."; msg.classList.add('show'); })
          .catch(function () { msg.textContent = 'Sorry, that didn’t send. Please call us on ' + (S.phone || '') + '.'; msg.classList.add('show'); })
          .then(function () { b.disabled = false; b.textContent = 'Send request'; });
      } else {
        // No form service set up yet: open the visitor's email app with the details filled in
        var body = []; data.forEach(function (v, k) { if (v) body.push(k + ': ' + v); });
        location.href = 'mailto:' + (S.email || '') + '?subject=' + encodeURIComponent('Booking request') + '&body=' + encodeURIComponent(body.join('\n'));
      }
    });
  }

  /* ---------- Fade in on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
})();
