(function () {
  "use strict";

  var C = window.CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function fmt(str) {
    return String(str == null ? "" : str)
      .replace(/\{to\}/g, C.to || "")
      .replace(/\{from\}/g, C.from || "");
  }
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  /* ---------- simple text fields ---------- */
  document.title = fmt(C.pageTitle || "a letter");
  document.querySelectorAll("[data-text]").forEach(function (node) {
    var value = get(node.getAttribute("data-text"));
    if (value == null || value === "") { node.hidden = true; return; }
    node.textContent = fmt(value);
  });

  /* ---------- photos: one per screen ---------- */
  var HOLD_PATH = "M10 26c2-12 16-20 28-18s20 10 17 20-15 15-27 13S8 36 10 26z";
  var exts = [C.imageExtension || "png", "png", "jpg", "jpeg", "webp", "PNG", "JPG", "JPEG"]
    .filter(function (e, i, a) { return a.indexOf(e) === i; });
  var STYLES = ["tag", "panel", "arch", "editorial", "hold", "topo"];

  // gym circuit colours: c = bright hold colour, ink = darker version for readable text
  var COLORS = {
    red:    { c: "#ff4b3e", ink: "#d92f22" },
    orange: { c: "#ff9a1f", ink: "#c46400" },
    yellow: { c: "#ffd000", ink: "#9c7c00" },
    green:  { c: "#1fc36b", ink: "#0f8a49" },
    blue:   { c: "#2f80ff", ink: "#1b5fd0" },
    purple: { c: "#9b5cf7", ink: "#7136d6" },
    pink:   { c: "#ff5cad", ink: "#d6307f" },
    teal:   { c: "#12c2c2", ink: "#0a8686" }
  };
  var DAY_COLORS = ["red", "orange", "yellow", "green", "blue", "purple"];

  // one climbing hold as SVG: shadow, coloured body, shine, chalk, bolt
  function holdSVG(shape, chalk) {
    var cx = shape.c[0], cy = shape.c[1];
    return '<svg viewBox="0 0 64 48" aria-hidden="true">' +
      '<path class="sh" transform="translate(1.6 2.6)" d="' + shape.d + '"/>' +
      '<path class="body" d="' + shape.d + '"/>' +
      '<ellipse class="shine" cx="' + (cx - 10) + '" cy="' + (cy - 9) + '" rx="8" ry="3.2" transform="rotate(-18 ' + (cx - 10) + ' ' + (cy - 9) + ')"/>' +
      (chalk ? '<ellipse class="chalk" cx="' + (cx + 7) + '" cy="' + (cy - 5) + '" rx="7" ry="4"/>' : "") +
      '<circle class="bolt" cx="' + cx + '" cy="' + cy + '" r="3.2"/></svg>';
  }

  var slides = document.getElementById("slides");
  var days = (C.week && C.week.days) || [];
  var topo = (C.week && C.week.topo) || {};

  // photo frame with fallbacks (.png → .jpg → …) and a placeholder if nothing is found
  function photoFrame(d, i, onMissing, fileName) {
    var file = fileName || (Array.isArray(d.file) ? d.file[0] : d.file);
    var frame = el("div", "frame");
    var img = new Image();
    img.alt = fmt(d.caption || d.day || "");
    img.decoding = "async";
    img.loading = i < 2 ? "eager" : "lazy";
    frame.appendChild(img);

    var tryIndex = 0;
    img.onload = function () { img.classList.add("loaded"); };
    img.onerror = function () {
      tryIndex++;
      if (tryIndex < exts.length) {
        img.src = "images/" + file + "." + exts[tryIndex];
      } else {
        frame.className = "frame empty";
        frame.innerHTML = '<svg viewBox="0 0 64 48" aria-hidden="true"><path d="' + HOLD_PATH + '"/></svg>';
        frame.appendChild(el("span", null, fmt((C.week && C.week.missingPhotoText) || "photo coming soon")));
        if (onMissing) onMissing();
      }
    };
    img.src = "images/" + file + "." + exts[0];
    return frame;
  }
  function reveal(node, delay) {
    node.classList.add("reveal");
    if (delay) node.style.setProperty("--d", delay + "ms");
    return node;
  }
  function add(parent) {
    for (var k = 1; k < arguments.length; k++) if (arguments[k]) parent.appendChild(arguments[k]);
    return parent;
  }

  // small date under the day name, e.g. "09 Nov 2026" (set "date" on each day in config.js)
  function dateEl(d) { return d.date ? el("p", "slide-date", fmt(d.date)) : null; }
  function dayBlock(d) { return add(el("div", "day-block"), el("p", "slide-day", fmt(d.day)), dateEl(d)); }

  var layouts = {
    // taped route-tag card
    tag: function (s, d, i, n) {
      var meta = add(el("div", "meta"), dayBlock(d), el("p", "slide-count", pad(i + 1) + " / " + pad(n)));
      var inner = add(el("div", "tag-inner"), photoFrame(d, i), meta, d.caption && el("p", "caption", fmt(d.caption)));
      add(s, reveal(add(el("figure", "tag"), inner)));
    },

    // photo bolted to the wall in a thick coloured frame, words centered below
    panel: function (s, d, i, n) {
      var panel = add(el("div", "panel"), photoFrame(d, i),
        el("span", "screw"), el("span", "screw"), el("span", "screw"), el("span", "screw"));
      var text = add(el("div", "text"),
        el("p", "slide-count", pad(i + 1) + " / " + pad(n)),
        dayBlock(d),
        d.caption && el("p", "caption", fmt(d.caption)));
      add(s, add(el("div", "wrap"), reveal(panel), reveal(text, 150)));
    },

    // arched window frame, centered
    // (give it two files, e.g. file: ["wed", "wed2"], and they sit side by side)
    arch: function (s, d, i, n) {
      var files = Array.isArray(d.file) ? d.file.slice(0, 2) : [d.file];
      var arches = files.map(function (f) { return add(el("div", "arch"), photoFrame(d, i, null, f)); });
      var photos = arches.length > 1 ? add.apply(null, [el("div", "pair")].concat(arches)) : arches[0];
      add(s, add(el("div", "wrap"),
        reveal(dayBlock(d)),
        reveal(photos, 120),
        d.caption && reveal(el("p", "caption", fmt(d.caption)), 240),
        reveal(el("p", "slide-count", pad(i + 1) + " / " + pad(n)), 320)));
    },

    // magazine spread: day name down the side, big number, rule + caption
    editorial: function (s, d, i) {
      var main = add(el("div", "main"), el("p", "num", pad(i + 1)), photoFrame(d, i));
      var text = add(el("div", "text"), dateEl(d), d.caption && el("p", "caption", fmt(d.caption)));
      add(s, reveal(add(el("div", "wrap"), el("p", "side", fmt(d.day)), main, text)));
    },

    // photo cut into a climbing-hold shape, with its bolt hole
    hold: function (s, d, i, n) {
      var shape = el("div", "shape");
      add(shape, photoFrame(d, i, function () { shape.classList.add("no-photo"); }), el("span", "bolt"));
      add(s, add(el("div", "wrap"),
        reveal(add(el("div", "meta"), dayBlock(d), el("p", "slide-count", pad(i + 1) + " / " + pad(n)))),
        reveal(shape, 120),
        d.caption && reveal(el("p", "caption", fmt(d.caption)), 240)));
    },

    // a page from a climbing guidebook, route line drawn over the photo
    // (give it two files, e.g. file: ["sat", "sat2"], and they sit side by side)
    topo: function (s, d, i) {
      var files = Array.isArray(d.file) ? d.file.slice(0, 2) : [d.file];
      var frames = files.map(function (f) { return photoFrame(d, i, null, f); });
      var frame = frames.length > 1 ? add.apply(null, [el("div", "topo-pair")].concat(frames)) : frames[0];
      var head = add(el("div", "topo-head"), el("p", "slide-count", "No. " + pad(i + 1)), topo.stars && el("span", "stars", fmt(topo.stars)));
      var entry = el("p", "entry");
      add(entry, el("b", null, (i + 1) + ". "), el("em", null, fmt(d.day)));
      add(s, reveal(add(el("div", "topo"), head, frame, entry, dateEl(d),
        d.caption && el("p", "caption", fmt(d.caption)),
        topo.credit && el("p", "credit", fmt(topo.credit)))));
    }
  };

  days.forEach(function (d, i) {
    var style = d.style === "full" ? "panel" : d.style;   // old name still works
    if (!layouts[style]) style = STYLES[i % STYLES.length];
    var slide = el("div", "slide s-" + style);
    var col = COLORS[d.color] || COLORS[DAY_COLORS[i % DAY_COLORS.length]];
    slide.style.setProperty("--c", col.c);
    slide.style.setProperty("--c-ink", col.ink);
    layouts[style](slide, d, i, days.length);
    slides.appendChild(slide);
  });

  /* ---------- letter (static) ---------- */
  var routeCard = document.getElementById("routeCard");
  ((C.letter && C.letter.routeCard) || []).forEach(function (row) {
    var cell = el("div");
    cell.appendChild(el("dt", null, fmt(row.label)));
    cell.appendChild(el("dd", null, fmt(row.value)));
    routeCard.appendChild(cell);
  });

  var paraWrap = document.getElementById("paragraphs");
  ((C.letter && C.letter.paragraphs) || []).forEach(function (p) {
    var text = typeof p === "string" ? p : (p && p.text);
    if (text) paraWrap.appendChild(el("p", "pitch-text", fmt(text)));
  });

  /* ---------- colourful holds on the landing screen ---------- */
  var shapes = [
    { d: HOLD_PATH, c: [33, 25] },
    { d: "M4 24c6-9 22-13 38-11s22 6 20 12-16 11-32 10S-1 32 4 24z", c: [32, 24] },
    { d: "M14 36c-4-12 4-26 18-28s24 6 22 18-10 18-22 18-15-2-18-8z", c: [32, 26] },
    { d: "M8 20c4-8 14-10 22-6s10 2 18-2 14 2 12 12-12 16-26 16S4 32 8 20z", c: [30, 26] }
  ];
  // x/y in %, size in px, sp = parallax strength. Kept to the top and bottom, away from the name.
  var holdLayout = [
    { x: 4,  y: 7,  s: 80, shape: 0, col: "red",    chalk: 1, sp: 0.18 },
    { x: 60, y: 4,  s: 62, shape: 1, col: "blue",   chalk: 0, sp: 0.28 },
    { x: 82, y: 18, s: 72, shape: 2, col: "yellow", chalk: 1, sp: 0.12 },
    { x: 32, y: 15, s: 42, shape: 3, col: "green",  chalk: 0, sp: 0.34 },
    { x: -5, y: 33, s: 58, shape: 2, col: "purple", chalk: 1, sp: 0.24 },
    { x: 87, y: 47, s: 54, shape: 3, col: "pink",   chalk: 0, sp: 0.3 },
    { x: 2,  y: 70, s: 66, shape: 1, col: "orange", chalk: 1, sp: 0.2 },
    { x: 70, y: 67, s: 76, shape: 0, col: "teal",   chalk: 0, sp: 0.16 },
    { x: 22, y: 84, s: 48, shape: 3, col: "yellow", chalk: 0, sp: 0.36 },
    { x: 64, y: 86, s: 42, shape: 2, col: "red",    chalk: 1, sp: 0.4 },
    { x: 86, y: 80, s: 46, shape: 1, col: "green",  chalk: 0, sp: 0.26 }
  ];
  var holdsWrap = document.getElementById("holds");
  var holdEls = holdLayout.map(function (h, i) {
    var wrap = el("div", "hold");
    wrap.style.left = h.x + "%";
    wrap.style.top = h.y + "%";
    wrap.style.setProperty("--s", "clamp(" + Math.round(h.s * 0.6) + "px, " + (h.s / 6) + "vw, " + h.s + "px)");
    wrap.style.setProperty("--delay", 150 + i * 90 + "ms");
    wrap.style.setProperty("--hc", COLORS[h.col].c);
    wrap.innerHTML = holdSVG(shapes[h.shape], h.chalk);
    wrap.firstChild.style.setProperty("--dur", 12 + (i % 4) * 3 + "s");
    holdsWrap.appendChild(wrap);
    return { node: wrap, sp: h.sp };
  });

  /* ---------- "circuit" row above the photos: one hold per day, in that day's colour ---------- */
  var head = document.querySelector(".section-head");
  if (head && days.length) {
    var circuit = reveal(el("div", "circuit"));
    days.forEach(function (d, i) {
      var key = COLORS[d.color] ? d.color : DAY_COLORS[i % DAY_COLORS.length];
      var span = el("span");
      span.style.setProperty("--hc", COLORS[key].c);
      span.innerHTML = holdSVG(shapes[i % shapes.length], false);
      circuit.appendChild(span);
    });
    head.insertBefore(circuit, head.firstChild);
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(function (n) { io.observe(n); });
  } else {
    revealEls.forEach(function (n) { n.classList.add("is-visible"); });
  }

  /* ---------- gentle parallax on the landing holds ---------- */
  if (!reduceMotion) {
    var ticking = false;
    var hero = document.getElementById("top");
    var heroH = hero.offsetHeight;   // measured once: iOS's toolbar resizing won't cause jumps
    var paused = false;
    var update = function () {
      var y = window.scrollY;
      if (y < heroH) {
        holdEls.forEach(function (h) { h.node.style.transform = "translate3d(0," + (-y * h.sp).toFixed(1) + "px,0)"; });
      }
      // stop the drifting holds once the landing is off screen (saves battery, keeps scrolling smooth)
      var off = y > heroH;
      if (off !== paused) { paused = off; hero.classList.toggle("paused", off); }
      ticking = false;
    };
    window.addEventListener("orientationchange", function () { heroH = hero.offsetHeight; });
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }
})();
