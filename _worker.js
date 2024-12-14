var zn = Object.defineProperty;
var qe = (e) => {
  throw TypeError(e);
};
var er = (e, n, r) => n in e ? zn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var Fe = (e, n, r) => er(e, typeof n != "symbol" ? n + "" : n, r), Ie = (e, n, r) => n.has(e) || qe("Cannot " + r);
var C = (e, n, r) => (Ie(e, n, "read from private field"), r ? r.call(e) : n.get(e)), A = (e, n, r) => n.has(e) ? qe("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), b = (e, n, r, i) => (Ie(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), S = (e, n, r) => (Ie(e, n, "access private method"), r);
const nr = "bad request", rr = "internal server error", fn = new Headers({
  "Content-type": "application/json"
}), ir = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const or = new Headers({
  "Content-type": "text/html"
}), tr = (e, n = ir) => new Response(e, {
  status: 200,
  headers: n
}), lr = (e, n = or) => new Response(e, {
  headers: n
}), We = (e = nr, n = 400, r = fn) => Response.json(
  {
    status: n,
    message: e
  },
  {
    status: n,
    statusText: e,
    headers: r
  }
), pn = (e = rr, n = 500, r = fn) => Response.json(
  {
    status: n,
    message: e
  },
  {
    status: n,
    statusText: e,
    headers: r
  }
);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function hn(e) {
  return typeof e > "u" || e === null;
}
function ur(e) {
  return typeof e == "object" && e !== null;
}
function cr(e) {
  return Array.isArray(e) ? e : hn(e) ? [] : [e];
}
function sr(e, n) {
  var r, i, o, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      o = l[r], e[o] = n[o];
  return e;
}
function ar(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function fr(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var pr = hn, hr = ur, dr = cr, gr = ar, mr = fr, xr = sr, w = {
  isNothing: pr,
  isObject: hr,
  toArray: dr,
  repeat: gr,
  isNegativeZero: mr,
  extend: xr
};
function dn(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function ee(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = dn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
ee.prototype = Object.create(Error.prototype);
ee.prototype.constructor = ee;
ee.prototype.toString = function(n) {
  return this.name + ": " + dn(this, n);
};
var O = ee;
function Ne(e, n, r, i, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return i - n > u && (l = " ... ", n = i - u + l.length), r - i > u && (t = " ...", r = i + u - t.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + t,
    pos: i - n + l.length
    // relative position
  };
}
function Pe(e, n) {
  return w.repeat(" ", n - e.length) + e;
}
function Cr(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], o = [], l, t = -1; l = r.exec(e.buffer); )
    o.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = i.length - 2);
  t < 0 && (t = i.length - 1);
  var u = "", c, s, f = Math.min(e.line + n.linesAfter, o.length).toString().length, a = n.maxLength - (n.indent + f + 3);
  for (c = 1; c <= n.linesBefore && !(t - c < 0); c++)
    s = Ne(
      e.buffer,
      i[t - c],
      o[t - c],
      e.position - (i[t] - i[t - c]),
      a
    ), u = w.repeat(" ", n.indent) + Pe((e.line - c + 1).toString(), f) + " | " + s.str + `
` + u;
  for (s = Ne(e.buffer, i[t], o[t], e.position, a), u += w.repeat(" ", n.indent) + Pe((e.line + 1).toString(), f) + " | " + s.str + `
`, u += w.repeat("-", n.indent + f + 3 + s.pos) + `^
`, c = 1; c <= n.linesAfter && !(t + c >= o.length); c++)
    s = Ne(
      e.buffer,
      i[t + c],
      o[t + c],
      e.position - (i[t] - i[t + c]),
      a
    ), u += w.repeat(" ", n.indent) + Pe((e.line + c + 1).toString(), f) + " | " + s.str + `
`;
  return u.replace(/\n$/, "");
}
var Ar = Cr, yr = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], vr = [
  "scalar",
  "sequence",
  "mapping"
];
function wr(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function _r(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (yr.indexOf(r) === -1)
      throw new O('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = wr(n.styleAliases || null), vr.indexOf(this.kind) === -1)
    throw new O('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = _r;
function Ve(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var o = r.length;
    r.forEach(function(l, t) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (o = t);
    }), r[o] = i;
  }), r;
}
function Er() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, n, r;
  function i(o) {
    o.multi ? (e.multi[o.kind].push(o), e.multi.fallback.push(o)) : e[o.kind][o.tag] = e.fallback[o.tag] = o;
  }
  for (n = 0, r = arguments.length; n < r; n += 1)
    arguments[n].forEach(i);
  return e;
}
function De(e) {
  return this.extend(e);
}
De.prototype.extend = function(n) {
  var r = [], i = [];
  if (n instanceof _)
    i.push(n);
  else if (Array.isArray(n))
    i = i.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (r = r.concat(n.implicit)), n.explicit && (i = i.concat(n.explicit));
  else
    throw new O("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(l) {
    if (!(l instanceof _))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new O("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new O("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof _))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(De.prototype);
  return o.implicit = (this.implicit || []).concat(r), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = Ve(o, "implicit"), o.compiledExplicit = Ve(o, "explicit"), o.compiledTypeMap = Er(o.compiledImplicit, o.compiledExplicit), o;
};
var br = De, Tr = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Sr = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Or = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), kr = new br({
  explicit: [
    Tr,
    Sr,
    Or
  ]
});
function Lr(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Fr() {
  return null;
}
function Ir(e) {
  return e === null;
}
var Nr = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Lr,
  construct: Fr,
  predicate: Ir,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function Pr(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Rr(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Dr(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Mr = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Pr,
  construct: Rr,
  predicate: Dr,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function Ur(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Br(e) {
  return 48 <= e && e <= 55;
}
function Hr(e) {
  return 48 <= e && e <= 57;
}
function jr(e) {
  if (e === null) return !1;
  var n = e.length, r = 0, i = !1, o;
  if (!n) return !1;
  if (o = e[r], (o === "-" || o === "+") && (o = e[++r]), o === "0") {
    if (r + 1 === n) return !0;
    if (o = e[++r], o === "b") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (o !== "0" && o !== "1") return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "x") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (!Ur(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "o") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (!Br(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; r < n; r++)
    if (o = e[r], o !== "_") {
      if (!Hr(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || o === "_");
}
function Yr(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function $r(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !w.isNegativeZero(e);
}
var Gr = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: jr,
  construct: Yr,
  predicate: $r,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Kr = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function qr(e) {
  return !(e === null || !Kr.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Wr(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var Vr = /^[-+]?[0-9]+e/;
function Qr(e, n) {
  var r;
  if (isNaN(e))
    switch (n) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (n) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (n) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (w.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Vr.test(r) ? r.replace("e", ".e") : r;
}
function Xr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || w.isNegativeZero(e));
}
var Zr = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: qr,
  construct: Wr,
  predicate: Xr,
  represent: Qr,
  defaultStyle: "lowercase"
}), Jr = kr.extend({
  implicit: [
    Nr,
    Mr,
    Gr,
    Zr
  ]
}), zr = Jr, gn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), mn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function ei(e) {
  return e === null ? !1 : gn.exec(e) !== null || mn.exec(e) !== null;
}
function ni(e) {
  var n, r, i, o, l, t, u, c = 0, s = null, f, a, p;
  if (n = gn.exec(e), n === null && (n = mn.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(r, i, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (c = n[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return n[9] && (f = +n[10], a = +(n[11] || 0), s = (f * 60 + a) * 6e4, n[9] === "-" && (s = -s)), p = new Date(Date.UTC(r, i, o, l, t, u, c)), s && p.setTime(p.getTime() - s), p;
}
function ri(e) {
  return e.toISOString();
}
var ii = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: ei,
  construct: ni,
  instanceOf: Date,
  represent: ri
});
function oi(e) {
  return e === "<<" || e === null;
}
var ti = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: oi
}), Ye = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function li(e) {
  if (e === null) return !1;
  var n, r, i = 0, o = e.length, l = Ye;
  for (r = 0; r < o; r++)
    if (n = l.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function ui(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), o = i.length, l = Ye, t = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)), t = t << 6 | l.indexOf(i.charAt(n));
  return r = o % 4 * 6, r === 0 ? (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)) : r === 18 ? (u.push(t >> 10 & 255), u.push(t >> 2 & 255)) : r === 12 && u.push(t >> 4 & 255), new Uint8Array(u);
}
function ci(e) {
  var n = "", r = 0, i, o, l = e.length, t = Ye;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]), r = (r << 8) + e[i];
  return o = l % 3, o === 0 ? (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]) : o === 2 ? (n += t[r >> 10 & 63], n += t[r >> 4 & 63], n += t[r << 2 & 63], n += t[64]) : o === 1 && (n += t[r >> 2 & 63], n += t[r << 4 & 63], n += t[64], n += t[64]), n;
}
function si(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var ai = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: li,
  construct: ui,
  predicate: si,
  represent: ci
}), fi = Object.prototype.hasOwnProperty, pi = Object.prototype.toString;
function hi(e) {
  if (e === null) return !0;
  var n = [], r, i, o, l, t, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (o = u[r], t = !1, pi.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (fi.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function di(e) {
  return e !== null ? e : [];
}
var gi = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: hi,
  construct: di
}), mi = Object.prototype.toString;
function xi(e) {
  if (e === null) return !0;
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1) {
    if (i = t[n], mi.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
    l[n] = [o[0], i[o[0]]];
  }
  return !0;
}
function Ci(e) {
  if (e === null) return [];
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1)
    i = t[n], o = Object.keys(i), l[n] = [o[0], i[o[0]]];
  return l;
}
var Ai = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: xi,
  construct: Ci
}), yi = Object.prototype.hasOwnProperty;
function vi(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (yi.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function wi(e) {
  return e !== null ? e : {};
}
var _i = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: vi,
  construct: wi
}), xn = zr.extend({
  implicit: [
    ii,
    ti
  ],
  explicit: [
    ai,
    gi,
    Ai,
    _i
  ]
}), P = Object.prototype.hasOwnProperty, ye = 1, Cn = 2, An = 3, ve = 4, Re = 1, Ei = 2, Qe = 3, bi = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Ti = /[\x85\u2028\u2029]/, Si = /[,\[\]\{\}]/, yn = /^(?:!|!!|![a-z\-]+!)$/i, vn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Xe(e) {
  return Object.prototype.toString.call(e);
}
function L(e) {
  return e === 10 || e === 13;
}
function B(e) {
  return e === 9 || e === 32;
}
function k(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Y(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Oi(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function ki(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Li(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Ze(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Fi(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var wn = new Array(256), _n = new Array(256);
for (var H = 0; H < 256; H++)
  wn[H] = Ze(H) ? 1 : 0, _n[H] = Ze(H);
function Ii(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || xn, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function En(e, n) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = Ar(r), new O(n, r);
}
function d(e, n) {
  throw En(e, n);
}
function we(e, n) {
  e.onWarning && e.onWarning.call(null, En(e, n));
}
var Je = {
  YAML: function(n, r, i) {
    var o, l, t;
    n.version !== null && d(n, "duplication of %YAML directive"), i.length !== 1 && d(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), o === null && d(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && d(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && we(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var o, l;
    i.length !== 2 && d(n, "TAG directive accepts exactly two arguments"), o = i[0], l = i[1], yn.test(o) || d(n, "ill-formed tag handle (first argument) of the TAG directive"), P.call(n.tagMap, o) && d(n, 'there is a previously declared suffix for "' + o + '" tag handle'), vn.test(l) || d(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      d(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[o] = l;
  }
};
function N(e, n, r, i) {
  var o, l, t, u;
  if (n < r) {
    if (u = e.input.slice(n, r), i)
      for (o = 0, l = u.length; o < l; o += 1)
        t = u.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || d(e, "expected valid JSON character");
    else bi.test(u) && d(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function ze(e, n, r, i) {
  var o, l, t, u;
  for (w.isObject(r) || d(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(r), t = 0, u = o.length; t < u; t += 1)
    l = o[t], P.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function $(e, n, r, i, o, l, t, u, c) {
  var s, f;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), s = 0, f = o.length; s < f; s += 1)
      Array.isArray(o[s]) && d(e, "nested arrays are not supported inside keys"), typeof o == "object" && Xe(o[s]) === "[object Object]" && (o[s] = "[object Object]");
  if (typeof o == "object" && Xe(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (s = 0, f = l.length; s < f; s += 1)
        ze(e, n, l[s], r);
    else
      ze(e, n, l, r);
  else
    !e.json && !P.call(r, o) && P.call(n, o) && (e.line = t || e.line, e.lineStart = u || e.lineStart, e.position = c || e.position, d(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete r[o];
  return n;
}
function $e(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : d(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function v(e, n, r) {
  for (var i = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; B(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (n && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (L(o))
      for ($e(e), o = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && we(e, "deficient indentation"), i;
}
function Oe(e) {
  var n = e.position, r;
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || k(r)));
}
function Ge(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += w.repeat(`
`, n - 1));
}
function Ni(e, n, r) {
  var i, o, l, t, u, c, s, f, a = e.kind, p = e.result, h;
  if (h = e.input.charCodeAt(e.position), k(h) || Y(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (o = e.input.charCodeAt(e.position + 1), k(o) || r && Y(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, u = !1; h !== 0; ) {
    if (h === 58) {
      if (o = e.input.charCodeAt(e.position + 1), k(o) || r && Y(o))
        break;
    } else if (h === 35) {
      if (i = e.input.charCodeAt(e.position - 1), k(i))
        break;
    } else {
      if (e.position === e.lineStart && Oe(e) || r && Y(h))
        break;
      if (L(h))
        if (c = e.line, s = e.lineStart, f = e.lineIndent, v(e, !1, -1), e.lineIndent >= n) {
          u = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = c, e.lineStart = s, e.lineIndent = f;
          break;
        }
    }
    u && (N(e, l, t, !1), Ge(e, e.line - c), l = t = e.position, u = !1), B(h) || (t = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return N(e, l, t, !1), e.result ? !0 : (e.kind = a, e.result = p, !1);
}
function Pi(e, n) {
  var r, i, o;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (N(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else L(r) ? (N(e, i, o, !0), Ge(e, v(e, !1, n)), i = o = e.position) : e.position === e.lineStart && Oe(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
function Ri(e, n) {
  var r, i, o, l, t, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return N(e, r, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (N(e, r, e.position, !0), u = e.input.charCodeAt(++e.position), L(u))
        v(e, !1, n);
      else if (u < 256 && wn[u])
        e.result += _n[u], e.position++;
      else if ((t = ki(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = Oi(u)) >= 0 ? l = (l << 4) + t : d(e, "expected hexadecimal character");
        e.result += Fi(l), e.position++;
      } else
        d(e, "unknown escape sequence");
      r = i = e.position;
    } else L(u) ? (N(e, r, i, !0), Ge(e, v(e, !1, n)), r = i = e.position) : e.position === e.lineStart && Oe(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function Di(e, n) {
  var r = !0, i, o, l, t = e.tag, u, c = e.anchor, s, f, a, p, h, g = /* @__PURE__ */ Object.create(null), m, y, T, x;
  if (x = e.input.charCodeAt(e.position), x === 91)
    f = 93, h = !1, u = [];
  else if (x === 123)
    f = 125, h = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), x = e.input.charCodeAt(++e.position); x !== 0; ) {
    if (v(e, !0, n), x = e.input.charCodeAt(e.position), x === f)
      return e.position++, e.tag = t, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = u, !0;
    r ? x === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), y = m = T = null, a = p = !1, x === 63 && (s = e.input.charCodeAt(e.position + 1), k(s) && (a = p = !0, e.position++, v(e, !0, n))), i = e.line, o = e.lineStart, l = e.position, q(e, n, ye, !1, !0), y = e.tag, m = e.result, v(e, !0, n), x = e.input.charCodeAt(e.position), (p || e.line === i) && x === 58 && (a = !0, x = e.input.charCodeAt(++e.position), v(e, !0, n), q(e, n, ye, !1, !0), T = e.result), h ? $(e, u, g, y, m, T, i, o, l) : a ? u.push($(e, null, g, y, m, T, i, o, l)) : u.push(m), v(e, !0, n), x = e.input.charCodeAt(e.position), x === 44 ? (r = !0, x = e.input.charCodeAt(++e.position)) : r = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function Mi(e, n) {
  var r, i, o = Re, l = !1, t = !1, u = n, c = 0, s = !1, f, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    i = !1;
  else if (a === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      Re === o ? o = a === 43 ? Qe : Ei : d(e, "repeat of a chomping mode identifier");
    else if ((f = Li(a)) >= 0)
      f === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? d(e, "repeat of an indentation width identifier") : (u = n + f - 1, t = !0);
    else
      break;
  if (B(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while (B(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!L(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for ($e(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), L(a)) {
      c++;
      continue;
    }
    if (e.lineIndent < u) {
      o === Qe ? e.result += w.repeat(`
`, l ? 1 + c : c) : o === Re && l && (e.result += `
`);
      break;
    }
    for (i ? B(a) ? (s = !0, e.result += w.repeat(`
`, l ? 1 + c : c)) : s ? (s = !1, e.result += w.repeat(`
`, c + 1)) : c === 0 ? l && (e.result += " ") : e.result += w.repeat(`
`, c) : e.result += w.repeat(`
`, l ? 1 + c : c), l = !0, t = !0, c = 0, r = e.position; !L(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    N(e, r, e.position, !1);
  }
  return !0;
}
function en(e, n) {
  var r, i = e.tag, o = e.anchor, l = [], t, u = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(c !== 45 || (t = e.input.charCodeAt(e.position + 1), !k(t)))); ) {
    if (u = !0, e.position++, v(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, q(e, n, An, !1, !0), l.push(e.result), v(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && c !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function Ui(e, n, r) {
  var i, o, l, t, u, c, s = e.tag, f = e.anchor, a = {}, p = /* @__PURE__ */ Object.create(null), h = null, g = null, m = null, y = !1, T = !1, x;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), x = e.input.charCodeAt(e.position); x !== 0; ) {
    if (!y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (x === 63 || x === 58) && k(i))
      x === 63 ? (y && ($(e, a, p, h, g, null, t, u, c), h = g = m = null), T = !0, y = !0, o = !0) : y ? (y = !1, o = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, x = i;
    else {
      if (t = e.line, u = e.lineStart, c = e.position, !q(e, r, Cn, !1, !0))
        break;
      if (e.line === l) {
        for (x = e.input.charCodeAt(e.position); B(x); )
          x = e.input.charCodeAt(++e.position);
        if (x === 58)
          x = e.input.charCodeAt(++e.position), k(x) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && ($(e, a, p, h, g, null, t, u, c), h = g = m = null), T = !0, y = !1, o = !1, h = e.tag, g = e.result;
        else if (T)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = s, e.anchor = f, !0;
      } else if (T)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = s, e.anchor = f, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (y && (t = e.line, u = e.lineStart, c = e.position), q(e, n, ve, !0, o) && (y ? g = e.result : m = e.result), y || ($(e, a, p, h, g, m, t, u, c), h = g = m = null), v(e, !0, -1), x = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && x !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return y && $(e, a, p, h, g, null, t, u, c), T && (e.tag = s, e.anchor = f, e.kind = "mapping", e.result = a), T;
}
function Bi(e) {
  var n, r = !1, i = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (r = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (i = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, r) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !k(t); )
      t === 33 && (i ? d(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), yn.test(o) || d(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Si.test(l) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !vn.test(l) && d(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    d(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : P.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : d(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Hi(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !k(r) && !Y(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function ji(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !k(i) && !Y(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), P.call(e.anchorMap, r) || d(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], v(e, !0, -1), !0;
}
function q(e, n, r, i, o) {
  var l, t, u, c = 1, s = !1, f = !1, a, p, h, g, m, y;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = ve === r || An === r, i && v(e, !0, -1) && (s = !0, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)), c === 1)
    for (; Bi(e) || Hi(e); )
      v(e, !0, -1) ? (s = !0, u = l, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)) : u = !1;
  if (u && (u = s || o), (c === 1 || ve === r) && (ye === r || Cn === r ? m = n : m = n + 1, y = e.position - e.lineStart, c === 1 ? u && (en(e, y) || Ui(e, y, m)) || Di(e, m) ? f = !0 : (t && Mi(e, m) || Pi(e, m) || Ri(e, m) ? f = !0 : ji(e) ? (f = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : Ni(e, m, ye === r) && (f = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (f = u && en(e, y))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, p = e.implicitTypes.length; a < p; a += 1)
      if (g = e.implicitTypes[a], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (P.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, h = e.typeMap.multi[e.kind || "fallback"], a = 0, p = h.length; a < p; a += 1)
        if (e.tag.slice(0, h[a].tag.length) === h[a].tag) {
          g = h[a];
          break;
        }
    g || d(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && d(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : d(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || f;
}
function Yi(e) {
  var n = e.position, r, i, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (v(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), r = e.position; t !== 0 && !k(t); )
      t = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), o = [], i.length < 1 && d(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; B(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !L(t));
        break;
      }
      if (L(t)) break;
      for (r = e.position; t !== 0 && !k(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(r, e.position));
    }
    t !== 0 && $e(e), P.call(Je, i) ? Je[i](e, i, o) : we(e, 'unknown document directive "' + i + '"');
  }
  if (v(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, v(e, !0, -1)) : l && d(e, "directives end mark is expected"), q(e, e.lineIndent - 1, ve, !1, !0), v(e, !0, -1), e.checkLineBreaks && Ti.test(e.input.slice(n, e.position)) && we(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Oe(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, v(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    d(e, "end of the stream or a document separator is expected");
  else
    return;
}
function bn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new Ii(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, d(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Yi(r);
  return r.documents;
}
function $i(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = bn(e, r);
  if (typeof n != "function")
    return i;
  for (var o = 0, l = i.length; o < l; o += 1)
    n(i[o]);
}
function Gi(e, n) {
  var r = bn(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new O("expected a single document in the stream, but found more");
  }
}
var Ki = $i, qi = Gi, Wi = {
  loadAll: Ki,
  load: qi
}, Tn = Object.prototype.toString, Sn = Object.prototype.hasOwnProperty, Ke = 65279, Vi = 9, ne = 10, Qi = 13, Xi = 32, Zi = 33, Ji = 34, Me = 35, zi = 37, eo = 38, no = 39, ro = 42, On = 44, io = 45, _e = 58, oo = 61, to = 62, lo = 63, uo = 64, kn = 91, Ln = 93, co = 96, Fn = 123, so = 124, In = 125, E = {};
E[0] = "\\0";
E[7] = "\\a";
E[8] = "\\b";
E[9] = "\\t";
E[10] = "\\n";
E[11] = "\\v";
E[12] = "\\f";
E[13] = "\\r";
E[27] = "\\e";
E[34] = '\\"';
E[92] = "\\\\";
E[133] = "\\N";
E[160] = "\\_";
E[8232] = "\\L";
E[8233] = "\\P";
var ao = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], fo = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function po(e, n) {
  var r, i, o, l, t, u, c;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), o = 0, l = i.length; o < l; o += 1)
    t = i[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), c = e.compiledTypeMap.fallback[t], c && Sn.call(c.styleAliases, u) && (u = c.styleAliases[u]), r[t] = u;
  return r;
}
function ho(e) {
  var n, r, i;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new O("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + w.repeat("0", i - n.length) + n;
}
var go = 1, re = 2;
function mo(e) {
  this.schema = e.schema || xn, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = w.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = po(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? re : go, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function nn(e, n) {
  for (var r = w.repeat(" ", n), i = 0, o = -1, l = "", t, u = e.length; i < u; )
    o = e.indexOf(`
`, i), o === -1 ? (t = e.slice(i), i = u) : (t = e.slice(i, o + 1), i = o + 1), t.length && t !== `
` && (l += r), l += t;
  return l;
}
function Ue(e, n) {
  return `
` + w.repeat(" ", e.indent * n);
}
function xo(e, n) {
  var r, i, o;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (o = e.implicitTypes[r], o.resolve(n))
      return !0;
  return !1;
}
function Ee(e) {
  return e === Xi || e === Vi;
}
function ie(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ke || 65536 <= e && e <= 1114111;
}
function rn(e) {
  return ie(e) && e !== Ke && e !== Qi && e !== ne;
}
function on(e, n, r) {
  var i = rn(e), o = i && !Ee(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== On && e !== kn && e !== Ln && e !== Fn && e !== In) && e !== Me && !(n === _e && !o) || rn(n) && !Ee(n) && e === Me || n === _e && o
  );
}
function Co(e) {
  return ie(e) && e !== Ke && !Ee(e) && e !== io && e !== lo && e !== _e && e !== On && e !== kn && e !== Ln && e !== Fn && e !== In && e !== Me && e !== eo && e !== ro && e !== Zi && e !== so && e !== oo && e !== to && e !== no && e !== Ji && e !== zi && e !== uo && e !== co;
}
function Ao(e) {
  return !Ee(e) && e !== _e;
}
function Z(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function Nn(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Pn = 1, Be = 2, Rn = 3, Dn = 4, j = 5;
function yo(e, n, r, i, o, l, t, u) {
  var c, s = 0, f = null, a = !1, p = !1, h = i !== -1, g = -1, m = Co(Z(e, 0)) && Ao(Z(e, e.length - 1));
  if (n || t)
    for (c = 0; c < e.length; s >= 65536 ? c += 2 : c++) {
      if (s = Z(e, c), !ie(s))
        return j;
      m = m && on(s, f, u), f = s;
    }
  else {
    for (c = 0; c < e.length; s >= 65536 ? c += 2 : c++) {
      if (s = Z(e, c), s === ne)
        a = !0, h && (p = p || // Foldable line = too long, and not more-indented.
        c - g - 1 > i && e[g + 1] !== " ", g = c);
      else if (!ie(s))
        return j;
      m = m && on(s, f, u), f = s;
    }
    p = p || h && c - g - 1 > i && e[g + 1] !== " ";
  }
  return !a && !p ? m && !t && !o(e) ? Pn : l === re ? j : Be : r > 9 && Nn(e) ? j : t ? l === re ? j : Be : p ? Dn : Rn;
}
function vo(e, n, r, i, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === re ? '""' : "''";
    if (!e.noCompatMode && (ao.indexOf(n) !== -1 || fo.test(n)))
      return e.quotingType === re ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function c(s) {
      return xo(e, s);
    }
    switch (yo(
      n,
      u,
      e.indent,
      t,
      c,
      e.quotingType,
      e.forceQuotes && !i,
      o
    )) {
      case Pn:
        return n;
      case Be:
        return "'" + n.replace(/'/g, "''") + "'";
      case Rn:
        return "|" + tn(n, e.indent) + ln(nn(n, l));
      case Dn:
        return ">" + tn(n, e.indent) + ln(nn(wo(n, t), l));
      case j:
        return '"' + _o(n) + '"';
      default:
        throw new O("impossible error: invalid scalar style");
    }
  }();
}
function tn(e, n) {
  var r = Nn(e) ? String(n) : "", i = e[e.length - 1] === `
`, o = i && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : i ? "" : "-";
  return r + l + `
`;
}
function ln(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function wo(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var s = e.indexOf(`
`);
    return s = s !== -1 ? s : e.length, r.lastIndex = s, un(e.slice(0, s), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = r.exec(e); ) {
    var u = t[1], c = t[2];
    l = c[0] === " ", i += u + (!o && !l && c !== "" ? `
` : "") + un(c, n), o = l;
  }
  return i;
}
function un(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, o = 0, l, t = 0, u = 0, c = ""; i = r.exec(e); )
    u = i.index, u - o > n && (l = t > o ? t : u, c += `
` + e.slice(o, l), o = l + 1), t = u;
  return c += `
`, e.length - o > n && t > o ? c += e.slice(o, t) + `
` + e.slice(t + 1) : c += e.slice(o), c.slice(1);
}
function _o(e) {
  for (var n = "", r = 0, i, o = 0; o < e.length; r >= 65536 ? o += 2 : o++)
    r = Z(e, o), i = E[r], !i && ie(r) ? (n += e[o], r >= 65536 && (n += e[o + 1])) : n += i || ho(r);
  return n;
}
function Eo(e, n, r) {
  var i = "", o = e.tag, l, t, u;
  for (l = 0, t = r.length; l < t; l += 1)
    u = r[l], e.replacer && (u = e.replacer.call(r, String(l), u)), (I(e, n, u, !1, !1) || typeof u > "u" && I(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function cn(e, n, r, i) {
  var o = "", l = e.tag, t, u, c;
  for (t = 0, u = r.length; t < u; t += 1)
    c = r[t], e.replacer && (c = e.replacer.call(r, String(t), c)), (I(e, n + 1, c, !0, !0, !1, !0) || typeof c > "u" && I(e, n + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += Ue(e, n)), e.dump && ne === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function bo(e, n, r) {
  var i = "", o = e.tag, l = Object.keys(r), t, u, c, s, f;
  for (t = 0, u = l.length; t < u; t += 1)
    f = "", i !== "" && (f += ", "), e.condenseFlow && (f += '"'), c = l[t], s = r[c], e.replacer && (s = e.replacer.call(r, c, s)), I(e, n, c, !1, !1) && (e.dump.length > 1024 && (f += "? "), f += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), I(e, n, s, !1, !1) && (f += e.dump, i += f));
  e.tag = o, e.dump = "{" + i + "}";
}
function To(e, n, r, i) {
  var o = "", l = e.tag, t = Object.keys(r), u, c, s, f, a, p;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new O("sortKeys must be a boolean or a function");
  for (u = 0, c = t.length; u < c; u += 1)
    p = "", (!i || o !== "") && (p += Ue(e, n)), s = t[u], f = r[s], e.replacer && (f = e.replacer.call(r, s, f)), I(e, n + 1, s, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && ne === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, a && (p += Ue(e, n)), I(e, n + 1, f, !0, a) && (e.dump && ne === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, o += p));
  e.tag = l, e.dump = o || "{}";
}
function sn(e, n, r) {
  var i, o, l, t, u, c;
  for (o = r ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (r ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (c = e.styleMap[u.tag] || u.defaultStyle, Tn.call(u.represent) === "[object Function]")
          i = u.represent(n, c);
        else if (Sn.call(u.represent, c))
          i = u.represent[c](n, c);
        else
          throw new O("!<" + u.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function I(e, n, r, i, o, l, t) {
  e.tag = null, e.dump = r, sn(e, r, !1) || sn(e, r, !0);
  var u = Tn.call(e.dump), c = i, s;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var f = u === "[object Object]" || u === "[object Array]", a, p;
  if (f && (a = e.duplicates.indexOf(r), p = a !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && n > 0) && (o = !1), p && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (f && p && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (To(e, n, e.dump, o), p && (e.dump = "&ref_" + a + e.dump)) : (bo(e, n, e.dump), p && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? cn(e, n - 1, e.dump, o) : cn(e, n, e.dump, o), p && (e.dump = "&ref_" + a + e.dump)) : (Eo(e, n, e.dump), p && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && vo(e, e.dump, n, l, c);
    else {
      if (u === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new O("unacceptable kind of an object to dump " + u);
    }
    e.tag !== null && e.tag !== "?" && (s = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? s = "!" + s : s.slice(0, 18) === "tag:yaml.org,2002:" ? s = "!!" + s.slice(18) : s = "!<" + s + ">", e.dump = s + " " + e.dump);
  }
  return !0;
}
function So(e, n) {
  var r = [], i = [], o, l;
  for (He(e, r, i), o = 0, l = i.length; o < l; o += 1)
    n.duplicates.push(r[i[o]]);
  n.usedDuplicates = new Array(l);
}
function He(e, n, r) {
  var i, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      r.indexOf(o) === -1 && r.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        He(e[o], n, r);
    else
      for (i = Object.keys(e), o = 0, l = i.length; o < l; o += 1)
        He(e[i[o]], n, r);
}
function Oo(e, n) {
  n = n || {};
  var r = new mo(n);
  r.noRefs || So(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), I(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var ko = Oo, Lo = {
  dump: ko
}, Mn = Wi.load, Fo = Lo.dump;
function ke(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function Un(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
const J = {
  retries: 3,
  // 默认最大重试次数
  retryDelay: 1e3,
  // 默认每次重试的间隔时间（毫秒）
  retryOnStatusCodes: [500, 502, 503, 504]
  // 默认重试的状态码
};
class Io {
  constructor() {
    Fe(this, "requestInterceptors", []);
    Fe(this, "responseInterceptors", []);
  }
  // 添加请求拦截器
  useRequestInterceptor(n) {
    this.requestInterceptors.push(n);
  }
  // 添加响应拦截器
  useResponseInterceptor(n) {
    this.responseInterceptors.push(n);
  }
  // 核心请求方法
  async request(n) {
    let r = { ...n };
    r.retries = r.retries ?? J.retries, r.retryDelay = r.retryDelay ?? J.retryDelay;
    for (const c of this.requestInterceptors)
      r = await c(r);
    if (r.params) {
      const c = new URLSearchParams(r.params).toString();
      r.url += (r.url.includes("?") ? "&" : "?") + c;
    }
    r.method = r.method || "GET";
    const { timeout: i = 1e4 } = r;
    let o = 0;
    const l = new AbortController(), t = n.signal || l.signal, u = async () => {
      o++;
      const c = setTimeout(() => {
        l.abort();
      }, i);
      try {
        const s = await fetch(r.url, {
          method: r.method,
          headers: r.headers,
          body: r.body ? JSON.stringify(r.body) : void 0,
          signal: t
        });
        clearTimeout(c);
        let f = {
          data: s,
          status: s.status,
          statusText: s.statusText,
          headers: s.headers,
          config: r,
          ok: s.ok
        };
        for (const a of this.responseInterceptors)
          f = await a(f);
        return !s.ok && r.retries && o < r.retries ? (await new Promise((a) => setTimeout(a, r.retryDelay)), u()) : f;
      } catch (s) {
        if (s.name === "AbortError")
          throw new Error("Request timed out");
        if (r.retries && o < r.retries)
          return await new Promise((f) => setTimeout(f, r.retryDelay)), u();
        throw s;
      }
    };
    return u();
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.get('https://jsonplaceholder.typicode.com/posts', {
   *   params: { userId: 1 },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  get(n, r) {
    return this.request({ ...r, url: n, method: "GET" });
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
   *   title: 'foo',
   *   body: 'bar',
   *   userId: 1,
   * });
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.post('https://jsonplaceholder.typicode.com/posts', {
   *   title: 'foo',
   *   body: 'bar',
   * }, {
   *   params: { userId: 1 },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  post(n, r, i) {
    return this.request({ ...i, url: n, method: "POST", body: r });
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
   *   title: 'foo',
   *   body: 'bar',
   *   userId: 1,
   * });
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
   *   title: 'foo',
   *   body: 'bar',
   * }, {
   *   params: { admin: true },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  put(n, r, i) {
    return this.request({ ...i, url: n, method: "PUT", body: r });
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.delete('https://jsonplaceholder.typicode.com/posts', {
   *   params: { userId: 1 },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  delete(n, r) {
    return this.request({ ...r, url: n, method: "DELETE" });
  }
}
async function je(e, n) {
  const {
    retries: r = J.retries,
    retryDelay: i = J.retryDelay,
    retryOnStatusCodes: o = J.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const c = async () => {
    u++;
    try {
      const s = await No.request({ url: e, ...t });
      if (o.includes(s.status) && u <= r) {
        if (l) {
          const f = l(new Error(`Request failed with status ${s.status}`), u);
          f instanceof Promise && await f;
        }
        return await new Promise((f) => setTimeout(f, i)), c();
      }
      return s;
    } catch (s) {
      if (l) {
        const f = l(s, u);
        f instanceof Promise && await f;
      }
      if (u <= r)
        return await new Promise((f) => setTimeout(f, i)), c();
      throw s;
    }
  };
  return c();
}
const No = new Io();
var oe, te, le, Te;
class Po {
  constructor() {
    A(this, oe, ["localhost", "127.0.0.1", "abc.cba.com"]);
    A(this, te, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    A(this, le, 1024);
    A(this, Te, 65535);
  }
  /**
   * @description 获取随机hostname
   * @returns {string} hostname
   */
  getHostName() {
    return C(this, oe)[Math.floor(Math.random() * C(this, oe).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (C(this, Te) - C(this, le) + 1) + C(this, le)).toString();
  }
  /**
   * @description 获取随机password
   * @returns {string} crypto.UUID
   */
  getPassword() {
    return crypto.randomUUID();
  }
  /**
   * @description 获取随机uuid
   * @returns {crypto.UUID} crypto.UUID
   */
  getUUID() {
    return crypto.randomUUID();
  }
  /**
   * @description 获取随机 SS协议的加密类型
   */
  getEncrtptionProtocol() {
    return C(this, te)[Math.floor(Math.random() * C(this, te).length)];
  }
}
oe = new WeakMap(), te = new WeakMap(), le = new WeakMap(), Te = new WeakMap();
var ue, ce, se, ae;
class Le extends Po {
  constructor() {
    super();
    /** * @description vps原始配置 */
    A(this, ue, {});
    /** * @description 混淆配置 */
    A(this, ce, {});
    /** * @description 原始备注 */
    A(this, se, "");
    /** * @description 混淆备注 */
    A(this, ae, "");
    b(this, ae, this.getUUID());
  }
  /**
   * @description 设置原始配置
   * @param {Partial<T>} config
   */
  setConfuseConfig(r) {
    b(this, ce, r);
  }
  /**
   * @description 设置混淆配置
   * @param {Partial<T>} config
   * @param {string} ps
   */
  setOriginConfig(r, i) {
    b(this, ue, r), b(this, se, decodeURIComponent(i));
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return C(this, se);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return C(this, ue);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return C(this, ae);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return C(this, ce);
  }
}
ue = new WeakMap(), ce = new WeakMap(), se = new WeakMap(), ae = new WeakMap();
var fe;
const z = class z {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(C(z, fe));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(C(z, fe));
  }
};
fe = new WeakMap(), A(z, fe, "^LINK_TO^");
let F = z;
function Ro(e) {
  try {
    return ke(e), "base64";
  } catch {
    try {
      return Mn(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function Do(e, n = 10) {
  const r = [];
  let i = [];
  return e.forEach((o, l) => {
    i.push(o), (l + 1) % n === 0 && (r.push(i.join("|")), i = []);
  }), i.length > 0 && r.push(i.join("|")), r;
}
var M, Se, Bn;
class an {
  constructor(n = []) {
    A(this, Se);
    A(this, M);
    const r = n.map((o) => Mn(o));
    b(this, M, r.at(-1));
    const i = S(this, Se, Bn).call(this, r);
    C(this, M).proxies = i.proxies, C(this, M)["proxy-groups"] = i["proxy-groups"];
  }
  get clashConfig() {
    return C(this, M);
  }
}
M = new WeakMap(), Se = new WeakSet(), /**
 * @description 合并配置
 * @param {Clash[]} configs
 * @returns {Clash} mergedConfig
 */
Bn = function(n = []) {
  const r = {
    proxies: [],
    "proxy-groups": []
  }, i = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null), l = n.reduce((c, s) => c + s.proxies.length, 0), t = new Int32Array(l);
  let u = 0;
  for (const c of n) {
    const s = c.proxies, f = c["proxy-groups"];
    for (let p = 0; p < s.length; p++) {
      const h = s[p], [g, m] = F.getPs(h.name);
      if (o[h.name]) {
        t[u++] = -1;
        continue;
      }
      const y = i[g] || 0;
      i[g] = y + 1;
      const T = y === 0 ? h.name : F.setPs(`${g} ${y + 1}`, m);
      o[h.name] = T;
      const x = {
        ...h,
        name: T
      };
      r.proxies[u] = x, t[u] = u, u++;
    }
    if (!f) continue;
    const a = /* @__PURE__ */ new Set();
    for (const p of f) {
      if (a.has(p.name)) continue;
      const h = r["proxy-groups"].find((g) => g.name === p.name);
      if (p.proxies = p.proxies || [], h) {
        const g = new Set(h.proxies);
        for (const m of p.proxies)
          g.add(o[m] || m);
        h.proxies = Array.from(g);
      } else {
        const g = {
          ...p,
          proxies: p.proxies.map((m) => o[m] || m)
        };
        r["proxy-groups"].push(g);
      }
      a.add(p.name);
    }
  }
  return r.proxies = r.proxies.filter((c, s) => t[s] !== -1), r;
};
var pe, he, U, R, Hn, jn, Yn;
class Mo extends Le {
  constructor(r) {
    super();
    A(this, R);
    /** @description 原始链接 */
    A(this, pe, "");
    /** @description 混淆链接 */
    A(this, he, "");
    /** @description 解析的私有配置 */
    A(this, U, {});
    S(this, R, Hn).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.cipher = C(this, U).originEncryptionProtocol, r.password = C(this, U).originPassword, r;
  }
  get confuseLink() {
    return C(this, he);
  }
  get originLink() {
    return C(this, pe);
  }
}
pe = new WeakMap(), he = new WeakMap(), U = new WeakMap(), R = new WeakSet(), Hn = function(r) {
  b(this, pe, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash);
  const o = this.getEncrtptionProtocol(), l = this.getPassword();
  S(this, R, jn).call(this, i.username), this.setConfuseConfig({
    username: encodeURIComponent(Un(`${o}:${l}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: F.setPs(this.originPs, this.confusePs)
  }), S(this, R, Yn).call(this);
}, jn = function(r) {
  const [i, o] = ke(decodeURIComponent(r)).split(":");
  C(this, U).originEncryptionProtocol = i, C(this, U).originPassword = o;
}, Yn = function() {
  const { username: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  b(this, he, `ss://${r}@${i}:${o}${l ?? ""}${t}`);
};
var de, ge, W, $n, Gn;
class Uo extends Le {
  constructor(r) {
    super();
    A(this, W);
    /** * @description 原始链接 */
    A(this, de, "");
    /** * @description 混淆链接 */
    A(this, ge, "");
    S(this, W, $n).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r;
  }
  get confuseLink() {
    return C(this, ge);
  }
  get originLink() {
    return C(this, de);
  }
}
de = new WeakMap(), ge = new WeakMap(), W = new WeakSet(), $n = function(r) {
  b(this, de, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: F.setPs(this.originPs, this.confusePs)
  }), S(this, W, Gn).call(this);
}, Gn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  b(this, ge, `trojan://${r}@${i}:${o}${l}${t}`);
};
var me, xe, V, Kn, qn;
class Bo extends Le {
  constructor(r) {
    super();
    A(this, V);
    /** * @description 原始链接 */
    A(this, me, "");
    /** * @description 混淆链接 */
    A(this, xe, "");
    S(this, V, Kn).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = this.originConfig.username ?? "", r;
  }
  get confuseLink() {
    return C(this, xe);
  }
  get originLink() {
    return C(this, me);
  }
}
me = new WeakMap(), xe = new WeakMap(), V = new WeakSet(), Kn = function(r) {
  b(this, me, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: F.setPs(this.originPs, this.confusePs)
  }), S(this, V, qn).call(this);
}, qn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  b(this, xe, `vless://${r}@${i}:${o}${l}${t}`);
};
var Ce, Ae, D, Wn, Vn, Qn;
class Ho extends Le {
  constructor(r) {
    super();
    A(this, D);
    /** * @description 原始链接 */
    A(this, Ce, "");
    /** * @description 混淆链接 */
    A(this, Ae, "");
    S(this, D, Wn).call(this, r);
  }
  restore(r, i) {
    var o, l;
    return S(this, D, Qn).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  get confuseLink() {
    return C(this, Ae);
  }
  get originLink() {
    return C(this, Ce);
  }
}
Ce = new WeakMap(), Ae = new WeakMap(), D = new WeakSet(), Wn = function(r) {
  const [i, o] = r.match(/vmess:\/\/(.*)/) || [], l = JSON.parse(ke(o));
  b(this, Ce, r), this.setOriginConfig(l, l.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: F.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), S(this, D, Vn).call(this);
}, Vn = function() {
  const { add: r, port: i, id: o, ps: l, scy: t, net: u, type: c, tls: s, v: f } = this.confuseConfig;
  b(this, Ae, `vmess://${Un(JSON.stringify({ v: f, ps: l, add: r, port: i, id: o, scy: t, net: u, type: c, tls: s }))}`);
}, Qn = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
async function jo(e) {
  const n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  async function i(o) {
    for await (const l of o) {
      if (l.startsWith("vless:")) {
        const t = new Bo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("vmess:")) {
        const t = new Ho(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("trojan://")) {
        const t = new Uo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("ss://")) {
        const t = new Mo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("https://") || l.startsWith("http://")) {
        const t = await je(l, { retries: 3 }).then((c) => c.data.text());
        Ro(t) === "base64" && await i(Jn.base64(t));
      }
    }
  }
  return await i(e), { urls: n, vpsMap: r };
}
var K;
const G = class G {
  /**
   * @description 获取混淆链接组
   * @param {string | URL} url
   * @param {string} backend
   * @param {string} chunkCount
   * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
   */
  static async getConfuseUrl(n, r, i) {
    const { searchParams: o } = new URL(n), t = o.get("url").split(/\||\n/).filter(Boolean), { urls: u, vpsMap: c } = await jo(t), s = Do(Array.from(u), Number(i));
    return b(G, K, s.map((f) => {
      const a = new URL(`${r}/sub`), { searchParams: p } = new URL(n);
      return p.set("url", f), a.search = p.toString(), a.toString();
    })), { vpsMap: c };
  }
  /**
   * @description 获取Clash混淆配置
   * @returns {Promise<Clash>} clashConfig
   */
  static async getClashConfuseConfig() {
    try {
      const n = await Promise.all(C(G, K).map((i) => je(i, { retries: 3 }).then((o) => o.data.text())));
      return new an(n).clashConfig;
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
  /**
   * @description 获取Singbox混淆配置
   * @returns {Promise<Singbox>} Singbox
   */
  static async getSingboxConfuseConfig() {
    try {
      const n = await Promise.all(C(G, K).map((i) => je(i, { retries: 3 }).then((o) => o.data.text())));
      return new an(n).clashConfig;
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
};
K = new WeakMap(), A(G, K);
let be = G;
var Q, Xn, Zn;
class Yo {
  constructor() {
    A(this, Q);
  }
  /**
   * @description 获取原始配置
   * @param {Clash} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {Clash} originConfig
   */
  getOriginConfig(n, r) {
    try {
      return n.proxies = S(this, Q, Xn).call(this, n.proxies, r), n["proxy-groups"] = n["proxy-groups"].map((i) => (i.proxies && (i.proxies = S(this, Q, Zn).call(this, i.proxies)), i)), n;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
Q = new WeakSet(), Xn = function(n, r) {
  try {
    const i = [];
    for (const o of n) {
      const [l, t] = F.getPs(o.name);
      if (r.has(t)) {
        const u = r.get(t);
        u == null || u.restore(o, l), i.push(o);
      }
    }
    return i;
  } catch (i) {
    throw new Error(`Restore proxies failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, Zn = function(n) {
  try {
    return n.map((r) => {
      const [i] = F.getPs(r);
      return i;
    });
  } catch (r) {
    throw new Error(`Update proxies groups failed: ${r.message || r}, function trace: ${r.stack}`);
  }
};
const $o = new Yo();
class Jn {
  /**
   * @description 处理base64订阅
   * @param {string} subs
   * @returns {string[]} content
   */
  static base64(n) {
    return ke(n).split(`
`).filter(Boolean).map((i) => decodeURIComponent(i));
  }
  /**
   * @description 获取转换类型
   * @param {string | URL} url
   * @returns {ConvertTarget | null} 转换类型
   */
  static getConvertType(n) {
    const { searchParams: r } = new URL(n);
    return r.get("target");
  }
}
function Go(e = "") {
  return e.split(`
`).reduce((r, i) => (r.push({
    label: i,
    value: i
  }), r), []);
}
function Ko(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function qo(e, n) {
  const r = n === "" ? [] : Go(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(r));
}
function Wo(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const X = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function Vo(e) {
  try {
    const { url: n, lockBackend: r, remoteConfig: i, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = Ko(t, o), t = qo(t, i), t = Wo(t, r), lr(t, new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" }));
  } catch (n) {
    return pn(n.message || n);
  }
}
const Xo = {
  async fetch(e, n) {
    try {
      const { pathname: r, origin: i } = new URL(e.url);
      if (r === "/sub") {
        const { vpsMap: o } = await be.getConfuseUrl(
          e.url,
          n.BACKEND ?? X.BACKEND,
          n.CHUNK_COUNT ?? X.CHUNK_COUNT
        ), l = Jn.getConvertType(e.url);
        if (!l)
          return We("Unsupported client type");
        if (["clash", "clashr"].includes(l)) {
          const t = await be.getClashConfuseConfig(), u = $o.getOriginConfig(t, o);
          return tr(
            Fo(u, { indent: 2, lineWidth: 200 }),
            new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          );
        }
        return We("Unsupported client type, support list: clash, clashr");
      }
      return Vo({
        url: n.PAGE_URL ?? X.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? X.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? X.REMOTE_CONFIG,
        origin: i
      });
    } catch (r) {
      return pn(r.message || r);
    }
  }
};
export {
  Xo as default
};
