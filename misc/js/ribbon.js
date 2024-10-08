/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/ribbon.js
 **/

!(function () {
  function e(e, t, n) {
    return Number(e.getAttribute(t)) || n;
  }
  function t() {
    for (
      r.clearRect(0, 0, h, s),
        a = [
          { x: 0, y: 0.7 * s + f },
          { x: 0, y: 0.7 * s - f },
        ];
      a[1].x < h + f;

    )
      n(a[0], a[1]);
  }
  function n(e, t) {
    r.beginPath(), r.moveTo(e.x, e.y), r.lineTo(t.x, t.y);
    var n = t.x + (2 * p() - 0.25) * f,
      o = i(t.y);
    r.lineTo(n, o),
      r.closePath(),
      (m -= x / -50),
      (r.fillStyle =
        "#" +
        (
          ((127 * y(m) + 128) << 16) |
          ((127 * y(m + x / 3) + 128) << 8) |
          (127 * y(m + (x / 3) * 2) + 128)
        ).toString(16)),
      r.fill(),
      (a[0] = a[1]),
      (a[1] = { x: n, y: o });
  }
  function i(e) {
    return (l = e + (2 * p() - 1.1) * f), l > s || l < 0 ? i(e) : l;
  }
  var o = document.getElementsByTagName("script"),
    c = o[o.length - 1];
  config = {
    z: e(c, "zIndex", -1),
    a: e(c, "alpha", 0.6),
    s: e(c, "size", 90),
  };
  var a,
    l,
    d = document.createElement("canvas"),
    r = d.getContext("2d"),
    g = window.devicePixelRatio || 1,
    h = window.innerWidth,
    s = window.innerHeight,
    f = config.s,
    u = Math,
    m = 0,
    x = 2 * u.PI,
    y = u.cos,
    p = u.random;
  (d.width = h * g),
    (d.height = s * g),
    r.scale(g, g),
    (r.globalAlpha = config.a),
    (d.style.cssText =
      "opacity: " +
      config.a +
      ";position:fixed;top:0;left:0;z-index: " +
      config.z +
      ";width:100%;height:100%;pointer-events:none;"),
    document.getElementsByTagName("body")[0].appendChild(d),
    (document.onclick = t),
    (document.ontouchstart = t),
    t();
})();
