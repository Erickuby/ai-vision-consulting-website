(function () {
  'use strict';

  var CONFIG = {
    counters:    { duration: 1600 },
    testimonials:{ interval: 6000 },
    reveal:      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    tilt:        { max: 8, scale: 1.02, perspective: 1000 },
    /* ── Formspree endpoints ────────────────────────────────
       Replace the IDs below with your real Formspree form IDs.
       Create them at https://formspree.io → "New form".
         - CONTACT_FORM_ID: the contact/enquiry form on contact.html
         - NEWSLETTER_FORM_ID: every newsletter signup across the site
       Until you add real IDs, forms fall back to a mailto: link so
       no enquiry is lost. */
    formspree: {
      contactFormId:   'YOUR_CONTACT_FORM_ID',
      newsletterFormId:'YOUR_NEWSLETTER_FORM_ID'
    }
  };

  /* ── Mobile Drawer ──────────────────────────────────── */
  function setupMobileMenu() {
    var toggle  = document.querySelector('[data-nav-toggle]');
    var drawer  = document.querySelector('[data-mobile-drawer]');
    var backdrop= document.querySelector('[data-drawer-backdrop]');
    var closeBtn= document.querySelector('[data-drawer-close]');
    if (!toggle || !drawer) return;

    var previousFocus = null;
    drawer.inert = true;
    drawer.setAttribute('aria-hidden', 'true');

    function focusableItems() {
      return Array.from(drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    }

    function open() {
      previousFocus = document.activeElement;
      drawer.inert = false;
      drawer.setAttribute('aria-hidden', 'false');
      drawer.classList.add('open');
      backdrop && backdrop.classList.add('visible');
      document.body.style.overflow = 'hidden';
      drawer.style.visibility = 'visible';
      toggle.setAttribute('aria-expanded','true');
      var items = focusableItems();
      if (items.length) {
        window.setTimeout(function () {
          if (drawer.classList.contains('open')) items[0].focus();
        }, 50);
      }
    }

    function close(restoreFocus) {
      drawer.classList.remove('open');
      drawer.style.visibility = '';
      backdrop && backdrop.classList.remove('visible');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded','false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.inert = true;
      if (restoreFocus !== false && previousFocus && previousFocus.focus) previousFocus.focus();
    }

    toggle.addEventListener('click', function () {
      drawer.classList.contains('open') ? close() : open();
    });
    closeBtn && closeBtn.addEventListener('click', function () { close(); });
    backdrop && backdrop.addEventListener('click', function () { close(); });
    drawer.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', function () { close(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) { close(); }
      if (e.key === 'Tab' && drawer.classList.contains('open')) {
        var items = focusableItems();
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ── Scroll Reveal ──────────────────────────────────── */
  function setupReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: CONFIG.reveal.threshold, rootMargin: CONFIG.reveal.rootMargin });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ── Counters ───────────────────────────────────────── */
  function setupCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
    function animate(el) {
      var target = Number(el.dataset.target || '0');
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      var start = performance.now();
      function step(now) {
        var p = Math.min((now - start) / CONFIG.counters.duration, 1);
        el.textContent = prefix + Math.floor(easeOutCubic(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.45 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ── Course Filters ─────────────────────────────────── */
  function setupCourseFilters() {
    var group = document.querySelector('[data-filters]');
    var cards = document.querySelectorAll('[data-course]');
    if (!group || !cards.length) return;

    function apply(filter) {
      group.querySelectorAll('[data-filter]').forEach(function (b) {
        b.classList.toggle('active', b.dataset.filter === filter);
      });
      cards.forEach(function (card) {
        var tags = (card.dataset.tags || '').split(' ');
        var show = filter === 'all' || tags.indexOf(filter) !== -1;
        if (show) {
          card.removeAttribute('hidden');
          card.style.opacity = '0'; card.style.transform = 'scale(0.97)';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              card.style.transition = 'opacity 240ms, transform 240ms';
              card.style.opacity = '1'; card.style.transform = 'scale(1)';
            });
          });
        } else {
          card.style.transition = 'opacity 160ms, transform 160ms';
          card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
          setTimeout(function () { card.setAttribute('hidden',''); }, 170);
        }
      });
    }

    group.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      apply(btn.dataset.filter || 'all');
    });

    var q = new URLSearchParams(window.location.search).get('filter');
    var allowed = ['all','jobseekers','business','funded'];
    apply(allowed.indexOf(q) !== -1 ? q : 'all');
  }

  /* ── Testimonial Carousel ───────────────────────────── */
  function setupTestimonials() {
    var root = document.querySelector('[data-testimonials]');
    if (!root) return;
    var items = Array.from(root.querySelectorAll('.testimonial-item'));
    var dots  = Array.from(root.querySelectorAll('.testimonial-dot'));
    var prev  = root.querySelector('[data-prev]');
    var next  = root.querySelector('[data-next]');
    if (!items.length) return;

    var idx = 0, timer = null;

    function show(i) {
      items.forEach(function (el, k) { el.classList.toggle('active', k === i); });
      dots.forEach(function (el, k) { el.classList.toggle('active', k === i); });
    }
    function move(d) { idx = (idx + d + items.length) % items.length; show(idx); }
    function startAuto() { timer = setInterval(function () { move(1); }, CONFIG.testimonials.interval); }
    function stopAuto()  { clearInterval(timer); }
    function manual(d)   { stopAuto(); move(d); setTimeout(startAuto, 1000); }

    prev && prev.addEventListener('click', function () { manual(-1); });
    next && next.addEventListener('click', function () { manual(1); });
    dots.forEach(function (dot, k) {
      dot.addEventListener('click', function () { stopAuto(); idx = k; show(idx); setTimeout(startAuto, 1000); });
    });
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);
    show(0); startAuto();
  }

  /* ── WebGL Shader Hero (real depth, brand iridescence) ── */
  function setupShaderHero() {
    var canvas = document.querySelector('.hero-shader');
    if (!canvas) return;

    var gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    var vsrc = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

    /* Fragment shader: flowing iridescent mesh in brand cyan/purple/gold */
    var fsrc = [
      'precision highp float;',
      'uniform vec2  u_res;',
      'uniform float u_time;',
      'uniform vec2  u_mouse;',
      '#define CYAN   vec3(0.180, 0.769, 0.780)', // #2EC4C7
      '#define PURPLE vec3(0.357, 0.173, 0.514)', // #5B2C83
      '#define GOLD   vec3(0.957, 0.706, 0.000)', // #F4B400
      '#define NAVY   vec3(0.051, 0.106, 0.165)', // #0D1B2A
      '',
      'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
      '',
      'float noise(vec2 p){',
      '  vec2 i=floor(p),f=fract(p);',
      '  float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));',
      '  vec2 u=f*f*(3.-2.*f);',
      '  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);',
      '}',
      '',
      'float fbm(vec2 p){',
      '  float v=0.,a=0.5;',
      '  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.05;a*=0.5;}',
      '  return v;',
      '}',
      '',
      'void main(){',
      '  vec2 uv=(gl_FragCoord.xy*2.-u_res)/min(u_res.x,u_res.y);',
      '  vec2 m=(u_mouse*2.-u_res)/min(u_res.x,u_res.y);',
      '  float t=u_time*0.08;',
      '  vec2 p=uv*1.4+vec2(t,-t*0.6);',
      '  // domain warp',
      '  vec2 q=vec2(fbm(p),fbm(p+vec2(5.2,1.3)));',
      '  vec2 r=vec2(fbm(p+4.*q+vec2(1.7,9.2)),fbm(p+4.*q+vec2(8.3,2.8)));',
      '  float f=fbm(p+4.*r);',
      '  // mouse parallax displacement',
      '  float md=length(uv-m*0.25);',
      '  f += smoothstep(1.2,0.0,md)*0.18;',
      '  vec3 col=mix(NAVY,PURPLE,smoothstep(0.0,0.55,f));',
      '  col=mix(col,CYAN, smoothstep(0.35,0.85,f));',
      '  col=mix(col,GOLD, smoothstep(0.78,1.0,f)*0.55);',
      '  // vignette',
      '  float vg=smoothstep(1.5,0.4,length(uv));',
      '  col*=vg;',
      '  // grain',
      '  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.025;',
      '  gl_FragColor=vec4(col,1.0);',
      '}'
    ].join('\n');

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    }
    var vs = compile(gl.VERTEX_SHADER, vsrc);
    var fs = compile(gl.FRAGMENT_SHADER, fsrc);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes   = gl.getUniformLocation(prog, 'u_res');
    var uTime  = gl.getUniformLocation(prog, 'u_time');
    var uMouse = gl.getUniformLocation(prog, 'u_mouse');

    var mouse = [0, 0], targetMouse = [0, 0];
    var start = performance.now();
    var visible = true, raf = null;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = canvas.clientWidth | 0, h = canvas.clientHeight | 0;
      canvas.width  = (w * dpr) | 0;
      canvas.height = (h * dpr) | 0;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 150); });

    document.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      targetMouse[0] = (e.clientX - rect.left) * (canvas.width / rect.width);
      targetMouse[1] = (rect.height - (e.clientY - rect.top)) * (canvas.height / rect.height);
    }, { passive: true });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(render);
      });
    }, { threshold: 0 });
    io.observe(canvas);

    function render() {
      if (!visible) { raf = null; return; }
      mouse[0] += (targetMouse[0] - mouse[0]) * 0.06;
      mouse[1] += (targetMouse[1] - mouse[1]) * 0.06;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) * 0.001);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);
  }

  /* ── 3D Tilt Cards (perspective on pointer move) ────── */
  function setupTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var cards = document.querySelectorAll('.card, .value-card, .trust-item, .proof-panel');
    cards.forEach(function (el) {
      var raf = null, rect = null;
      function update(x, y) {
        var px = (x - rect.left) / rect.width;
        var py = (y - rect.top)  / rect.height;
        var rx = (0.5 - py) * CONFIG.tilt.max;
        var ry = (px - 0.5) * CONFIG.tilt.max;
        el.style.transform =
          'perspective(' + CONFIG.tilt.perspective + 'px) ' +
          'rotateX(' + rx.toFixed(2) + 'deg) ' +
          'rotateY(' + ry.toFixed(2) + 'deg) ' +
          'translateZ(0) scale(' + CONFIG.tilt.scale + ')';
      }
      el.addEventListener('pointerenter', function () { rect = el.getBoundingClientRect(); });
      el.addEventListener('pointermove', function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () { update(e.clientX, e.clientY); });
      });
      el.addEventListener('pointerleave', function () {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = '';
      });
    });
  }

  /* ── Parallax (hero text drift) ─────────────────────── */
  function setupParallax() {
    var target = document.querySelector('[data-parallax]');
    if (!target) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    target.style.willChange = 'transform';
    function run() {
      var y = window.scrollY * 0.06;
      target.style.transform = 'translateY(' + y + 'px)';
    }
    run();
    window.addEventListener('scroll', run, { passive: true });
  }

  /* ── Formspree submission helper ──────────────────────
     Posts form data as JSON to a Formspree endpoint.
     Returns true on success, false on failure (caller shows fallback). */
  function submitToFormspree(formId, data) {
    return fetch('https://formspree.io/f/' + formId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  function isFormspreeConfigured(formId) {
    return formId && formId.indexOf('YOUR_') === -1;
  }

  /* ── Contact Form Validation + Submission ───────────── */
  function setupContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });

      // Validate required fields
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          var err = document.createElement('span');
          err.className = 'field-error';
          err.textContent = 'This field is required.';
          field.parentNode.appendChild(err);
        }
      });
      if (!valid) return;

      var formId = CONFIG.formspree.contactFormId;

      // Fallback: open a prefilled mailto if Formspree isn't wired up yet
      if (!isFormspreeConfigured(formId)) {
        var name = (form.querySelector('[name="name"]') || {}).value || '';
        var email = (form.querySelector('[name="email"]') || {}).value || '';
        var enquiry = (form.querySelector('[name="enquiry_type"]') || {}).value || '';
        var message = (form.querySelector('[name="message"]') || {}).value || '';
        var body = 'Name: ' + name + '\nEmail: ' + email + '\nEnquiry type: ' + enquiry + '\n\n' + message;
        window.location.href = 'mailto:info@aivisionconsulting.co.uk?subject=' +
          encodeURIComponent('New website enquiry (' + enquiry + ')') + '&body=' + encodeURIComponent(body);
        return;
      }

      // Submit to Formspree
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      var payload = {};
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      payload._subject = 'New enquiry from aivisionconsulting.co.uk';

      submitToFormspree(formId, payload).then(function (ok) {
        if (ok) {
          var success = document.createElement('div');
          success.className = 'form-success';
          success.innerHTML = '<strong>Thank you.</strong> We will reply within 1 business day.';
          form.parentNode.insertBefore(success, form.nextSibling);
          form.reset();
          form.style.display = 'none';
        } else {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Enquiry'; }
          var fail = document.createElement('div');
          fail.className = 'field-error';
          fail.style.display = 'block';
          fail.textContent = 'Something went wrong. Please email info@aivisionconsulting.co.uk directly.';
          form.appendChild(fail);
        }
      });
    });
  }

  /* ── Newsletter Forms (Formspree) ───────────────────── */
  function setupNewsletterForms() {
    document.querySelectorAll('[data-newsletter-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var formId = CONFIG.formspree.newsletterFormId;

        // Fallback if not yet configured
        if (!isFormspreeConfigured(formId)) {
          var email = (form.querySelector('input[type="email"]') || {}).value || '';
          window.location.href = 'mailto:info@aivisionconsulting.co.uk?subject=' +
            encodeURIComponent('Newsletter subscription') + '&body=' +
            encodeURIComponent('Please add me to the newsletter: ' + email);
          return;
        }

        if (btn) { btn.disabled = true; btn.textContent = 'Subscribing…'; }
        var payload = {};
        new FormData(form).forEach(function (v, k) { payload[k] = v; });
        payload._subject = 'New newsletter subscription';

        submitToFormspree(formId, payload).then(function (ok) {
          if (ok) {
            if (btn) { btn.textContent = 'Subscribed ✓'; }
            form.reset();
          } else {
            if (btn) { btn.disabled = false; btn.textContent = 'Subscribe'; }
          }
        });
      });
    });
  }

  /* ── Background video (HLS stream with Safari fallback) ── */
  function setupBgVideo() {
    var video = document.querySelector('.bg-video video[data-hls-src]');
    if (!video) return;
    var src = video.getAttribute('data-hls-src');

    function tryPlay() {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { /* autoplay blocked; poster stays */ });
      }
    }

    if (window.Hls && window.Hls.isSupported()) {
      var hls = new window.Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, tryPlay);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', tryPlay);
    }
  }

  /* ── Lucide Icons ───────────────────────────────────── */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ── Init ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    setupReveal();
    setupCounters();
    setupCourseFilters();
    setupTestimonials();
    setupShaderHero();
    setupTilt();
    setupParallax();
    setupContactForm();
    setupNewsletterForms();
    setupBgVideo();
    initIcons();
  });

})();
