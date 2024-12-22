var cn = (e) => {
  throw TypeError(e);
};
var We = (e, n, r) => n.has(e) || cn("Cannot " + r);
var h = (e, n, r) => (We(e, n, "read from private field"), r ? r.call(e) : n.get(e)), m = (e, n, r) => n.has(e) ? cn("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), v = (e, n, r, i) => (We(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), P = (e, n, r) => (We(e, n, "access private method"), r);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function Sn(e) {
  return typeof e > "u" || e === null;
}
function tr(e) {
  return typeof e == "object" && e !== null;
}
function lr(e) {
  return Array.isArray(e) ? e : Sn(e) ? [] : [e];
}
function ur(e, n) {
  var r, i, o, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      o = l[r], e[o] = n[o];
  return e;
}
function sr(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function cr(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var fr = Sn, ar = tr, hr = lr, pr = sr, gr = cr, dr = ur, b = {
  isNothing: fr,
  isObject: ar,
  toArray: hr,
  repeat: pr,
  isNegativeZero: gr,
  extend: dr
};
function En(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function pe(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = En(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
pe.prototype = Object.create(Error.prototype);
pe.prototype.constructor = pe;
pe.prototype.toString = function(n) {
  return this.name + ": " + En(this, n);
};
var O = pe;
function qe(e, n, r, i, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return i - n > u && (l = " ... ", n = i - u + l.length), r - i > u && (t = " ...", r = i + u - t.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + t,
    pos: i - n + l.length
    // relative position
  };
}
function Ve(e, n) {
  return b.repeat(" ", n - e.length) + e;
}
function mr(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], o = [], l, t = -1; l = r.exec(e.buffer); )
    o.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = i.length - 2);
  t < 0 && (t = i.length - 1);
  var u = "", s, c, a = Math.min(e.line + n.linesAfter, o.length).toString().length, f = n.maxLength - (n.indent + a + 3);
  for (s = 1; s <= n.linesBefore && !(t - s < 0); s++)
    c = qe(
      e.buffer,
      i[t - s],
      o[t - s],
      e.position - (i[t] - i[t - s]),
      f
    ), u = b.repeat(" ", n.indent) + Ve((e.line - s + 1).toString(), a) + " | " + c.str + `
` + u;
  for (c = qe(e.buffer, i[t], o[t], e.position, f), u += b.repeat(" ", n.indent) + Ve((e.line + 1).toString(), a) + " | " + c.str + `
`, u += b.repeat("-", n.indent + a + 3 + c.pos) + `^
`, s = 1; s <= n.linesAfter && !(t + s >= o.length); s++)
    c = qe(
      e.buffer,
      i[t + s],
      o[t + s],
      e.position - (i[t] - i[t + s]),
      f
    ), u += b.repeat(" ", n.indent) + Ve((e.line + s + 1).toString(), a) + " | " + c.str + `
`;
  return u.replace(/\n$/, "");
}
var xr = mr, Cr = [
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
], Ar = [
  "scalar",
  "sequence",
  "mapping"
];
function vr(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function yr(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (Cr.indexOf(r) === -1)
      throw new O('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = vr(n.styleAliases || null), Ar.indexOf(this.kind) === -1)
    throw new O('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = yr;
function fn(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var o = r.length;
    r.forEach(function(l, t) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (o = t);
    }), r[o] = i;
  }), r;
}
function wr() {
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
function Xe(e) {
  return this.extend(e);
}
Xe.prototype.extend = function(n) {
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
  var o = Object.create(Xe.prototype);
  return o.implicit = (this.implicit || []).concat(r), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = fn(o, "implicit"), o.compiledExplicit = fn(o, "explicit"), o.compiledTypeMap = wr(o.compiledImplicit, o.compiledExplicit), o;
};
var br = Xe, _r = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Sr = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Er = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Or = new br({
  explicit: [
    _r,
    Sr,
    Er
  ]
});
function Tr(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function kr() {
  return null;
}
function Fr(e) {
  return e === null;
}
var Lr = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Tr,
  construct: kr,
  predicate: Fr,
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
function Ir(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Nr(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Pr(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Rr = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Ir,
  construct: Nr,
  predicate: Pr,
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
function Dr(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Mr(e) {
  return 48 <= e && e <= 55;
}
function Ur(e) {
  return 48 <= e && e <= 57;
}
function Br(e) {
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
          if (!Dr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "o") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (!Mr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; r < n; r++)
    if (o = e[r], o !== "_") {
      if (!Ur(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || o === "_");
}
function Hr(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function Yr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !b.isNegativeZero(e);
}
var jr = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Br,
  construct: Hr,
  predicate: Yr,
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
function $r(e) {
  return !(e === null || !Kr.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Gr(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var Wr = /^[-+]?[0-9]+e/;
function qr(e, n) {
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
  else if (b.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Wr.test(r) ? r.replace("e", ".e") : r;
}
function Vr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || b.isNegativeZero(e));
}
var Qr = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: $r,
  construct: Gr,
  predicate: Vr,
  represent: qr,
  defaultStyle: "lowercase"
}), Xr = Or.extend({
  implicit: [
    Lr,
    Rr,
    jr,
    Qr
  ]
}), Zr = Xr, On = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Tn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Jr(e) {
  return e === null ? !1 : On.exec(e) !== null || Tn.exec(e) !== null;
}
function zr(e) {
  var n, r, i, o, l, t, u, s = 0, c = null, a, f, g;
  if (n = On.exec(e), n === null && (n = Tn.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(r, i, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (s = n[7].slice(0, 3); s.length < 3; )
      s += "0";
    s = +s;
  }
  return n[9] && (a = +n[10], f = +(n[11] || 0), c = (a * 60 + f) * 6e4, n[9] === "-" && (c = -c)), g = new Date(Date.UTC(r, i, o, l, t, u, s)), c && g.setTime(g.getTime() - c), g;
}
function ei(e) {
  return e.toISOString();
}
var ni = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Jr,
  construct: zr,
  instanceOf: Date,
  represent: ei
});
function ri(e) {
  return e === "<<" || e === null;
}
var ii = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: ri
}), on = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function oi(e) {
  if (e === null) return !1;
  var n, r, i = 0, o = e.length, l = on;
  for (r = 0; r < o; r++)
    if (n = l.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function ti(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), o = i.length, l = on, t = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)), t = t << 6 | l.indexOf(i.charAt(n));
  return r = o % 4 * 6, r === 0 ? (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)) : r === 18 ? (u.push(t >> 10 & 255), u.push(t >> 2 & 255)) : r === 12 && u.push(t >> 4 & 255), new Uint8Array(u);
}
function li(e) {
  var n = "", r = 0, i, o, l = e.length, t = on;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]), r = (r << 8) + e[i];
  return o = l % 3, o === 0 ? (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]) : o === 2 ? (n += t[r >> 10 & 63], n += t[r >> 4 & 63], n += t[r << 2 & 63], n += t[64]) : o === 1 && (n += t[r >> 2 & 63], n += t[r << 4 & 63], n += t[64], n += t[64]), n;
}
function ui(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var si = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: oi,
  construct: ti,
  predicate: ui,
  represent: li
}), ci = Object.prototype.hasOwnProperty, fi = Object.prototype.toString;
function ai(e) {
  if (e === null) return !0;
  var n = [], r, i, o, l, t, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (o = u[r], t = !1, fi.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (ci.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function hi(e) {
  return e !== null ? e : [];
}
var pi = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: ai,
  construct: hi
}), gi = Object.prototype.toString;
function di(e) {
  if (e === null) return !0;
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1) {
    if (i = t[n], gi.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
    l[n] = [o[0], i[o[0]]];
  }
  return !0;
}
function mi(e) {
  if (e === null) return [];
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1)
    i = t[n], o = Object.keys(i), l[n] = [o[0], i[o[0]]];
  return l;
}
var xi = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: di,
  construct: mi
}), Ci = Object.prototype.hasOwnProperty;
function Ai(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (Ci.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function vi(e) {
  return e !== null ? e : {};
}
var yi = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Ai,
  construct: vi
}), kn = Zr.extend({
  implicit: [
    ni,
    ii
  ],
  explicit: [
    si,
    pi,
    xi,
    yi
  ]
}), H = Object.prototype.hasOwnProperty, Re = 1, Fn = 2, Ln = 3, De = 4, Qe = 1, wi = 2, an = 3, bi = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, _i = /[\x85\u2028\u2029]/, Si = /[,\[\]\{\}]/, In = /^(?:!|!!|![a-z\-]+!)$/i, Nn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function hn(e) {
  return Object.prototype.toString.call(e);
}
function D(e) {
  return e === 10 || e === 13;
}
function $(e) {
  return e === 9 || e === 32;
}
function T(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function q(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Ei(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function Oi(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Ti(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function pn(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function ki(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Pn = new Array(256), Rn = new Array(256);
for (var G = 0; G < 256; G++)
  Pn[G] = pn(G) ? 1 : 0, Rn[G] = pn(G);
function Fi(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || kn, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Dn(e, n) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = xr(r), new O(n, r);
}
function d(e, n) {
  throw Dn(e, n);
}
function Me(e, n) {
  e.onWarning && e.onWarning.call(null, Dn(e, n));
}
var gn = {
  YAML: function(n, r, i) {
    var o, l, t;
    n.version !== null && d(n, "duplication of %YAML directive"), i.length !== 1 && d(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), o === null && d(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && d(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && Me(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var o, l;
    i.length !== 2 && d(n, "TAG directive accepts exactly two arguments"), o = i[0], l = i[1], In.test(o) || d(n, "ill-formed tag handle (first argument) of the TAG directive"), H.call(n.tagMap, o) && d(n, 'there is a previously declared suffix for "' + o + '" tag handle'), Nn.test(l) || d(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      d(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[o] = l;
  }
};
function B(e, n, r, i) {
  var o, l, t, u;
  if (n < r) {
    if (u = e.input.slice(n, r), i)
      for (o = 0, l = u.length; o < l; o += 1)
        t = u.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || d(e, "expected valid JSON character");
    else bi.test(u) && d(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function dn(e, n, r, i) {
  var o, l, t, u;
  for (b.isObject(r) || d(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(r), t = 0, u = o.length; t < u; t += 1)
    l = o[t], H.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function V(e, n, r, i, o, l, t, u, s) {
  var c, a;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), c = 0, a = o.length; c < a; c += 1)
      Array.isArray(o[c]) && d(e, "nested arrays are not supported inside keys"), typeof o == "object" && hn(o[c]) === "[object Object]" && (o[c] = "[object Object]");
  if (typeof o == "object" && hn(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (c = 0, a = l.length; c < a; c += 1)
        dn(e, n, l[c], r);
    else
      dn(e, n, l, r);
  else
    !e.json && !H.call(r, o) && H.call(n, o) && (e.line = t || e.line, e.lineStart = u || e.lineStart, e.position = s || e.position, d(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete r[o];
  return n;
}
function tn(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : d(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function w(e, n, r) {
  for (var i = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; $(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (n && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (D(o))
      for (tn(e), o = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && Me(e, "deficient indentation"), i;
}
function $e(e) {
  var n = e.position, r;
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || T(r)));
}
function ln(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += b.repeat(`
`, n - 1));
}
function Li(e, n, r) {
  var i, o, l, t, u, s, c, a, f = e.kind, g = e.result, p;
  if (p = e.input.charCodeAt(e.position), T(p) || q(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (o = e.input.charCodeAt(e.position + 1), T(o) || r && q(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, u = !1; p !== 0; ) {
    if (p === 58) {
      if (o = e.input.charCodeAt(e.position + 1), T(o) || r && q(o))
        break;
    } else if (p === 35) {
      if (i = e.input.charCodeAt(e.position - 1), T(i))
        break;
    } else {
      if (e.position === e.lineStart && $e(e) || r && q(p))
        break;
      if (D(p))
        if (s = e.line, c = e.lineStart, a = e.lineIndent, w(e, !1, -1), e.lineIndent >= n) {
          u = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = s, e.lineStart = c, e.lineIndent = a;
          break;
        }
    }
    u && (B(e, l, t, !1), ln(e, e.line - s), l = t = e.position, u = !1), $(p) || (t = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return B(e, l, t, !1), e.result ? !0 : (e.kind = f, e.result = g, !1);
}
function Ii(e, n) {
  var r, i, o;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (B(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else D(r) ? (B(e, i, o, !0), ln(e, w(e, !1, n)), i = o = e.position) : e.position === e.lineStart && $e(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
function Ni(e, n) {
  var r, i, o, l, t, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return B(e, r, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (B(e, r, e.position, !0), u = e.input.charCodeAt(++e.position), D(u))
        w(e, !1, n);
      else if (u < 256 && Pn[u])
        e.result += Rn[u], e.position++;
      else if ((t = Oi(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = Ei(u)) >= 0 ? l = (l << 4) + t : d(e, "expected hexadecimal character");
        e.result += ki(l), e.position++;
      } else
        d(e, "unknown escape sequence");
      r = i = e.position;
    } else D(u) ? (B(e, r, i, !0), ln(e, w(e, !1, n)), r = i = e.position) : e.position === e.lineStart && $e(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function Pi(e, n) {
  var r = !0, i, o, l, t = e.tag, u, s = e.anchor, c, a, f, g, p, x = /* @__PURE__ */ Object.create(null), C, y, E, A;
  if (A = e.input.charCodeAt(e.position), A === 91)
    a = 93, p = !1, u = [];
  else if (A === 123)
    a = 125, p = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), A = e.input.charCodeAt(++e.position); A !== 0; ) {
    if (w(e, !0, n), A = e.input.charCodeAt(e.position), A === a)
      return e.position++, e.tag = t, e.anchor = s, e.kind = p ? "mapping" : "sequence", e.result = u, !0;
    r ? A === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), y = C = E = null, f = g = !1, A === 63 && (c = e.input.charCodeAt(e.position + 1), T(c) && (f = g = !0, e.position++, w(e, !0, n))), i = e.line, o = e.lineStart, l = e.position, se(e, n, Re, !1, !0), y = e.tag, C = e.result, w(e, !0, n), A = e.input.charCodeAt(e.position), (g || e.line === i) && A === 58 && (f = !0, A = e.input.charCodeAt(++e.position), w(e, !0, n), se(e, n, Re, !1, !0), E = e.result), p ? V(e, u, x, y, C, E, i, o, l) : f ? u.push(V(e, null, x, y, C, E, i, o, l)) : u.push(C), w(e, !0, n), A = e.input.charCodeAt(e.position), A === 44 ? (r = !0, A = e.input.charCodeAt(++e.position)) : r = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function Ri(e, n) {
  var r, i, o = Qe, l = !1, t = !1, u = n, s = 0, c = !1, a, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    i = !1;
  else if (f === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      Qe === o ? o = f === 43 ? an : wi : d(e, "repeat of a chomping mode identifier");
    else if ((a = Ti(f)) >= 0)
      a === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? d(e, "repeat of an indentation width identifier") : (u = n + a - 1, t = !0);
    else
      break;
  if ($(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while ($(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!D(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (tn(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), D(f)) {
      s++;
      continue;
    }
    if (e.lineIndent < u) {
      o === an ? e.result += b.repeat(`
`, l ? 1 + s : s) : o === Qe && l && (e.result += `
`);
      break;
    }
    for (i ? $(f) ? (c = !0, e.result += b.repeat(`
`, l ? 1 + s : s)) : c ? (c = !1, e.result += b.repeat(`
`, s + 1)) : s === 0 ? l && (e.result += " ") : e.result += b.repeat(`
`, s) : e.result += b.repeat(`
`, l ? 1 + s : s), l = !0, t = !0, s = 0, r = e.position; !D(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    B(e, r, e.position, !1);
  }
  return !0;
}
function mn(e, n) {
  var r, i = e.tag, o = e.anchor, l = [], t, u = !1, s;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), s = e.input.charCodeAt(e.position); s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(s !== 45 || (t = e.input.charCodeAt(e.position + 1), !T(t)))); ) {
    if (u = !0, e.position++, w(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, se(e, n, Ln, !1, !0), l.push(e.result), w(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && s !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function Di(e, n, r) {
  var i, o, l, t, u, s, c = e.tag, a = e.anchor, f = {}, g = /* @__PURE__ */ Object.create(null), p = null, x = null, C = null, y = !1, E = !1, A;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), A = e.input.charCodeAt(e.position); A !== 0; ) {
    if (!y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (A === 63 || A === 58) && T(i))
      A === 63 ? (y && (V(e, f, g, p, x, null, t, u, s), p = x = C = null), E = !0, y = !0, o = !0) : y ? (y = !1, o = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, A = i;
    else {
      if (t = e.line, u = e.lineStart, s = e.position, !se(e, r, Fn, !1, !0))
        break;
      if (e.line === l) {
        for (A = e.input.charCodeAt(e.position); $(A); )
          A = e.input.charCodeAt(++e.position);
        if (A === 58)
          A = e.input.charCodeAt(++e.position), T(A) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && (V(e, f, g, p, x, null, t, u, s), p = x = C = null), E = !0, y = !1, o = !1, p = e.tag, x = e.result;
        else if (E)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = c, e.anchor = a, !0;
      } else if (E)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = c, e.anchor = a, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (y && (t = e.line, u = e.lineStart, s = e.position), se(e, n, De, !0, o) && (y ? x = e.result : C = e.result), y || (V(e, f, g, p, x, C, t, u, s), p = x = C = null), w(e, !0, -1), A = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && A !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return y && V(e, f, g, p, x, null, t, u, s), E && (e.tag = c, e.anchor = a, e.kind = "mapping", e.result = f), E;
}
function Mi(e) {
  var n, r = !1, i = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (r = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (i = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, r) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !T(t); )
      t === 33 && (i ? d(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), In.test(o) || d(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Si.test(l) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !Nn.test(l) && d(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    d(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : H.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : d(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Ui(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !T(r) && !q(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Bi(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !T(i) && !q(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), H.call(e.anchorMap, r) || d(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], w(e, !0, -1), !0;
}
function se(e, n, r, i, o) {
  var l, t, u, s = 1, c = !1, a = !1, f, g, p, x, C, y;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = De === r || Ln === r, i && w(e, !0, -1) && (c = !0, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)), s === 1)
    for (; Mi(e) || Ui(e); )
      w(e, !0, -1) ? (c = !0, u = l, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)) : u = !1;
  if (u && (u = c || o), (s === 1 || De === r) && (Re === r || Fn === r ? C = n : C = n + 1, y = e.position - e.lineStart, s === 1 ? u && (mn(e, y) || Di(e, y, C)) || Pi(e, C) ? a = !0 : (t && Ri(e, C) || Ii(e, C) || Ni(e, C) ? a = !0 : Bi(e) ? (a = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : Li(e, C, Re === r) && (a = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : s === 0 && (a = u && mn(e, y))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, g = e.implicitTypes.length; f < g; f += 1)
      if (x = e.implicitTypes[f], x.resolve(e.result)) {
        e.result = x.construct(e.result), e.tag = x.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (H.call(e.typeMap[e.kind || "fallback"], e.tag))
      x = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (x = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, g = p.length; f < g; f += 1)
        if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
          x = p[f];
          break;
        }
    x || d(e, "unknown tag !<" + e.tag + ">"), e.result !== null && x.kind !== e.kind && d(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + x.kind + '", not "' + e.kind + '"'), x.resolve(e.result, e.tag) ? (e.result = x.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : d(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || a;
}
function Hi(e) {
  var n = e.position, r, i, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (w(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), r = e.position; t !== 0 && !T(t); )
      t = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), o = [], i.length < 1 && d(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; $(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !D(t));
        break;
      }
      if (D(t)) break;
      for (r = e.position; t !== 0 && !T(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(r, e.position));
    }
    t !== 0 && tn(e), H.call(gn, i) ? gn[i](e, i, o) : Me(e, 'unknown document directive "' + i + '"');
  }
  if (w(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, w(e, !0, -1)) : l && d(e, "directives end mark is expected"), se(e, e.lineIndent - 1, De, !1, !0), w(e, !0, -1), e.checkLineBreaks && _i.test(e.input.slice(n, e.position)) && Me(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && $e(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, w(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    d(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Mn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new Fi(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, d(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Hi(r);
  return r.documents;
}
function Yi(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = Mn(e, r);
  if (typeof n != "function")
    return i;
  for (var o = 0, l = i.length; o < l; o += 1)
    n(i[o]);
}
function ji(e, n) {
  var r = Mn(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new O("expected a single document in the stream, but found more");
  }
}
var Ki = Yi, $i = ji, Gi = {
  loadAll: Ki,
  load: $i
}, Un = Object.prototype.toString, Bn = Object.prototype.hasOwnProperty, un = 65279, Wi = 9, ge = 10, qi = 13, Vi = 32, Qi = 33, Xi = 34, Ze = 35, Zi = 37, Ji = 38, zi = 39, eo = 42, Hn = 44, no = 45, Ue = 58, ro = 61, io = 62, oo = 63, to = 64, Yn = 91, jn = 93, lo = 96, Kn = 123, uo = 124, $n = 125, S = {};
S[0] = "\\0";
S[7] = "\\a";
S[8] = "\\b";
S[9] = "\\t";
S[10] = "\\n";
S[11] = "\\v";
S[12] = "\\f";
S[13] = "\\r";
S[27] = "\\e";
S[34] = '\\"';
S[92] = "\\\\";
S[133] = "\\N";
S[160] = "\\_";
S[8232] = "\\L";
S[8233] = "\\P";
var so = [
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
], co = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function fo(e, n) {
  var r, i, o, l, t, u, s;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), o = 0, l = i.length; o < l; o += 1)
    t = i[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), s = e.compiledTypeMap.fallback[t], s && Bn.call(s.styleAliases, u) && (u = s.styleAliases[u]), r[t] = u;
  return r;
}
function ao(e) {
  var n, r, i;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new O("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + b.repeat("0", i - n.length) + n;
}
var ho = 1, de = 2;
function po(e) {
  this.schema = e.schema || kn, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = fo(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? de : ho, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function xn(e, n) {
  for (var r = b.repeat(" ", n), i = 0, o = -1, l = "", t, u = e.length; i < u; )
    o = e.indexOf(`
`, i), o === -1 ? (t = e.slice(i), i = u) : (t = e.slice(i, o + 1), i = o + 1), t.length && t !== `
` && (l += r), l += t;
  return l;
}
function Je(e, n) {
  return `
` + b.repeat(" ", e.indent * n);
}
function go(e, n) {
  var r, i, o;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (o = e.implicitTypes[r], o.resolve(n))
      return !0;
  return !1;
}
function Be(e) {
  return e === Vi || e === Wi;
}
function me(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== un || 65536 <= e && e <= 1114111;
}
function Cn(e) {
  return me(e) && e !== un && e !== qi && e !== ge;
}
function An(e, n, r) {
  var i = Cn(e), o = i && !Be(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== Hn && e !== Yn && e !== jn && e !== Kn && e !== $n) && e !== Ze && !(n === Ue && !o) || Cn(n) && !Be(n) && e === Ze || n === Ue && o
  );
}
function mo(e) {
  return me(e) && e !== un && !Be(e) && e !== no && e !== oo && e !== Ue && e !== Hn && e !== Yn && e !== jn && e !== Kn && e !== $n && e !== Ze && e !== Ji && e !== eo && e !== Qi && e !== uo && e !== ro && e !== io && e !== zi && e !== Xi && e !== Zi && e !== to && e !== lo;
}
function xo(e) {
  return !Be(e) && e !== Ue;
}
function ae(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function Gn(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Wn = 1, ze = 2, qn = 3, Vn = 4, W = 5;
function Co(e, n, r, i, o, l, t, u) {
  var s, c = 0, a = null, f = !1, g = !1, p = i !== -1, x = -1, C = mo(ae(e, 0)) && xo(ae(e, e.length - 1));
  if (n || t)
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = ae(e, s), !me(c))
        return W;
      C = C && An(c, a, u), a = c;
    }
  else {
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = ae(e, s), c === ge)
        f = !0, p && (g = g || // Foldable line = too long, and not more-indented.
        s - x - 1 > i && e[x + 1] !== " ", x = s);
      else if (!me(c))
        return W;
      C = C && An(c, a, u), a = c;
    }
    g = g || p && s - x - 1 > i && e[x + 1] !== " ";
  }
  return !f && !g ? C && !t && !o(e) ? Wn : l === de ? W : ze : r > 9 && Gn(e) ? W : t ? l === de ? W : ze : g ? Vn : qn;
}
function Ao(e, n, r, i, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === de ? '""' : "''";
    if (!e.noCompatMode && (so.indexOf(n) !== -1 || co.test(n)))
      return e.quotingType === de ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function s(c) {
      return go(e, c);
    }
    switch (Co(
      n,
      u,
      e.indent,
      t,
      s,
      e.quotingType,
      e.forceQuotes && !i,
      o
    )) {
      case Wn:
        return n;
      case ze:
        return "'" + n.replace(/'/g, "''") + "'";
      case qn:
        return "|" + vn(n, e.indent) + yn(xn(n, l));
      case Vn:
        return ">" + vn(n, e.indent) + yn(xn(vo(n, t), l));
      case W:
        return '"' + yo(n) + '"';
      default:
        throw new O("impossible error: invalid scalar style");
    }
  }();
}
function vn(e, n) {
  var r = Gn(e) ? String(n) : "", i = e[e.length - 1] === `
`, o = i && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : i ? "" : "-";
  return r + l + `
`;
}
function yn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function vo(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var c = e.indexOf(`
`);
    return c = c !== -1 ? c : e.length, r.lastIndex = c, wn(e.slice(0, c), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = r.exec(e); ) {
    var u = t[1], s = t[2];
    l = s[0] === " ", i += u + (!o && !l && s !== "" ? `
` : "") + wn(s, n), o = l;
  }
  return i;
}
function wn(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, o = 0, l, t = 0, u = 0, s = ""; i = r.exec(e); )
    u = i.index, u - o > n && (l = t > o ? t : u, s += `
` + e.slice(o, l), o = l + 1), t = u;
  return s += `
`, e.length - o > n && t > o ? s += e.slice(o, t) + `
` + e.slice(t + 1) : s += e.slice(o), s.slice(1);
}
function yo(e) {
  for (var n = "", r = 0, i, o = 0; o < e.length; r >= 65536 ? o += 2 : o++)
    r = ae(e, o), i = S[r], !i && me(r) ? (n += e[o], r >= 65536 && (n += e[o + 1])) : n += i || ao(r);
  return n;
}
function wo(e, n, r) {
  var i = "", o = e.tag, l, t, u;
  for (l = 0, t = r.length; l < t; l += 1)
    u = r[l], e.replacer && (u = e.replacer.call(r, String(l), u)), (M(e, n, u, !1, !1) || typeof u > "u" && M(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function bn(e, n, r, i) {
  var o = "", l = e.tag, t, u, s;
  for (t = 0, u = r.length; t < u; t += 1)
    s = r[t], e.replacer && (s = e.replacer.call(r, String(t), s)), (M(e, n + 1, s, !0, !0, !1, !0) || typeof s > "u" && M(e, n + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += Je(e, n)), e.dump && ge === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function bo(e, n, r) {
  var i = "", o = e.tag, l = Object.keys(r), t, u, s, c, a;
  for (t = 0, u = l.length; t < u; t += 1)
    a = "", i !== "" && (a += ", "), e.condenseFlow && (a += '"'), s = l[t], c = r[s], e.replacer && (c = e.replacer.call(r, s, c)), M(e, n, s, !1, !1) && (e.dump.length > 1024 && (a += "? "), a += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), M(e, n, c, !1, !1) && (a += e.dump, i += a));
  e.tag = o, e.dump = "{" + i + "}";
}
function _o(e, n, r, i) {
  var o = "", l = e.tag, t = Object.keys(r), u, s, c, a, f, g;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new O("sortKeys must be a boolean or a function");
  for (u = 0, s = t.length; u < s; u += 1)
    g = "", (!i || o !== "") && (g += Je(e, n)), c = t[u], a = r[c], e.replacer && (a = e.replacer.call(r, c, a)), M(e, n + 1, c, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && ge === e.dump.charCodeAt(0) ? g += "?" : g += "? "), g += e.dump, f && (g += Je(e, n)), M(e, n + 1, a, !0, f) && (e.dump && ge === e.dump.charCodeAt(0) ? g += ":" : g += ": ", g += e.dump, o += g));
  e.tag = l, e.dump = o || "{}";
}
function _n(e, n, r) {
  var i, o, l, t, u, s;
  for (o = r ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (r ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (s = e.styleMap[u.tag] || u.defaultStyle, Un.call(u.represent) === "[object Function]")
          i = u.represent(n, s);
        else if (Bn.call(u.represent, s))
          i = u.represent[s](n, s);
        else
          throw new O("!<" + u.tag + '> tag resolver accepts not "' + s + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function M(e, n, r, i, o, l, t) {
  e.tag = null, e.dump = r, _n(e, r, !1) || _n(e, r, !0);
  var u = Un.call(e.dump), s = i, c;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var a = u === "[object Object]" || u === "[object Array]", f, g;
  if (a && (f = e.duplicates.indexOf(r), g = f !== -1), (e.tag !== null && e.tag !== "?" || g || e.indent !== 2 && n > 0) && (o = !1), g && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (a && g && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (_o(e, n, e.dump, o), g && (e.dump = "&ref_" + f + e.dump)) : (bo(e, n, e.dump), g && (e.dump = "&ref_" + f + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? bn(e, n - 1, e.dump, o) : bn(e, n, e.dump, o), g && (e.dump = "&ref_" + f + e.dump)) : (wo(e, n, e.dump), g && (e.dump = "&ref_" + f + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && Ao(e, e.dump, n, l, s);
    else {
      if (u === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new O("unacceptable kind of an object to dump " + u);
    }
    e.tag !== null && e.tag !== "?" && (c = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? c = "!" + c : c.slice(0, 18) === "tag:yaml.org,2002:" ? c = "!!" + c.slice(18) : c = "!<" + c + ">", e.dump = c + " " + e.dump);
  }
  return !0;
}
function So(e, n) {
  var r = [], i = [], o, l;
  for (en(e, r, i), o = 0, l = i.length; o < l; o += 1)
    n.duplicates.push(r[i[o]]);
  n.usedDuplicates = new Array(l);
}
function en(e, n, r) {
  var i, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      r.indexOf(o) === -1 && r.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        en(e[o], n, r);
    else
      for (i = Object.keys(e), o = 0, l = i.length; o < l; o += 1)
        en(e[i[o]], n, r);
}
function Eo(e, n) {
  n = n || {};
  var r = new po(n);
  r.noRefs || So(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), M(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var Oo = Eo, To = {
  dump: Oo
}, Qn = Gi.load, ko = To.dump;
const Pe = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function nn(e, n = Pe) {
  const {
    retries: r = Pe.retries,
    retryDelay: i = Pe.retryDelay,
    retryOnStatusCodes: o = Pe.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const s = async () => {
    u++;
    try {
      let c, a;
      e instanceof Request ? (a = e.url, c = new Request(e, t)) : (a = e.toString(), c = new Request(a, t));
      const f = await fetch(c), g = {
        status: f.status,
        statusText: f.statusText,
        headers: Object.fromEntries(f.headers.entries()),
        data: f,
        config: { url: a, ...t },
        ok: f.ok
      };
      if (o.includes(g.status) && u <= r) {
        if (l) {
          const p = l(new Error(`请求失败，状态码 ${g.status}`), u);
          p instanceof Promise && await p;
        }
        return await new Promise((p) => setTimeout(p, i)), s();
      }
      return g;
    } catch (c) {
      if (l) {
        const a = l(c, u);
        a instanceof Promise && await a;
      }
      if (u <= r)
        return await new Promise((a) => setTimeout(a, i)), s();
      throw c;
    }
  };
  return s();
}
function sn(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function Fo(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
var xe, He, Xn;
class Lo {
  constructor(n = []) {
    m(this, He);
    m(this, xe);
    const r = n.map((o) => Qn(o)), i = P(this, He, Xn).call(this, r);
    v(this, xe, i);
  }
  get clashConfig() {
    return h(this, xe);
  }
}
xe = new WeakMap(), He = new WeakSet(), /**
 * @description 合并配置
 * @param {ClashType[]} configs
 * @returns {ClashType} mergedConfig
 */
Xn = function(n = []) {
  var c, a, f, g;
  if (!n.length)
    return {};
  const r = structuredClone(n[0]);
  if (n.length === 1)
    return r;
  const i = {
    ...r,
    proxies: r.proxies || [],
    "proxy-groups": r["proxy-groups"] || []
  }, o = n.reduce((p, x) => {
    var C;
    return p + (((C = x.proxies) == null ? void 0 : C.length) || 0);
  }, 0), l = new Int32Array(o), t = new Set((c = r.proxies) == null ? void 0 : c.map((p) => p.name));
  let u = ((a = r.proxies) == null ? void 0 : a.length) || 0;
  const s = new Map(i["proxy-groups"].map((p) => [p.name, p]));
  for (let p = 1; p < n.length; p++) {
    const x = n[p];
    if ((f = x.proxies) != null && f.length)
      for (const C of x.proxies)
        t.has(C.name) || (i.proxies[u] = C, l[u] = u, t.add(C.name), u++);
    if ((g = x["proxy-groups"]) != null && g.length)
      for (const C of x["proxy-groups"]) {
        const y = s.get(C.name);
        if (y) {
          const E = new Set(y.proxies);
          for (const A of C.proxies || [])
            E.add(A);
          y.proxies = Array.from(E), Object.assign(y, {
            ...C,
            proxies: y.proxies
          });
        } else
          i["proxy-groups"].push(C), s.set(C.name, C);
      }
  }
  return i.proxies = i.proxies.filter((p, x) => l[x] !== -1), i;
};
var Ce, Ae, ve, Ye;
class Ge {
  constructor() {
    m(this, Ce, ["localhost", "127.0.0.1", "abc.cba.com"]);
    m(this, Ae, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    m(this, ve, 1024);
    m(this, Ye, 65535);
  }
  /**
   * @description 获取随机uuid
   * @returns {crypto.UUID} crypto.UUID
   */
  getUUID() {
    return crypto.randomUUID();
  }
  /**
   * @description 获取随机username
   * @returns {string} username
   */
  getUsername() {
    return this.getUUID();
  }
  /**
   * @description 获取随机password
   * @returns {string} crypto.UUID
   */
  getPassword() {
    return this.getUUID();
  }
  getHost() {
    return `${this.getHostName()}:${this.getPort()}`;
  }
  /**
   * @description 获取随机hostname
   * @returns {string} hostname
   */
  getHostName() {
    return h(this, Ce)[Math.floor(Math.random() * h(this, Ce).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (h(this, Ye) - h(this, ve) + 1) + h(this, ve)).toString();
  }
  /**
   * @description 获取随机 SS协议的加密类型
   */
  getEncrtptionProtocol() {
    return h(this, Ae)[Math.floor(Math.random() * h(this, Ae).length)];
  }
}
Ce = new WeakMap(), Ae = new WeakMap(), ve = new WeakMap(), Ye = new WeakMap();
var Y, j;
const F = class F {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(h(F, Y));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(h(F, Y));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(n) {
    if (!(n != null && n.includes(h(F, Y)))) return null;
    if (h(F, j).has(n))
      return h(F, j).get(n);
    const [r] = F.getPs(n);
    if (r) {
      const i = r.trim();
      return h(F, j).set(n, i), i;
    }
    return null;
  }
  static isConfigType(n) {
    return n.includes(h(this, Y));
  }
  // 清除缓存
  static clearCache() {
    h(this, j).clear();
  }
};
Y = new WeakMap(), j = new WeakMap(), m(F, Y, "^LINK_TO^"), m(F, j, /* @__PURE__ */ new Map());
let k = F;
function Io(e) {
  try {
    return sn(e), "base64";
  } catch {
    try {
      return Qn(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function No(e, n = 10) {
  const r = [];
  let i = [];
  return e.forEach((o, l) => {
    i.push(o), (l + 1) % n === 0 && (r.push(i.join("|")), i = []);
  }), i.length > 0 && r.push(i.join("|")), r;
}
function Zn(e, n = []) {
  const r = /* @__PURE__ */ new WeakMap(), i = new Set(n), o = {}, l = /* @__PURE__ */ new Map();
  return n.forEach((t) => {
    const [, u] = t.split("#"), [s, c] = u.split(" "), a = c ? Number.parseInt(c) >>> 0 : 0, f = l.get(s) || 0;
    l.set(s, f | a + 1);
  }), e.map((t) => {
    const [u, s] = t.split("#");
    r.has(o) || r.set(o, /* @__PURE__ */ new Map());
    const c = r.get(o);
    let a = l.get(s) || 0, f = a === 0 ? t : `${u}#${s} ${a}`;
    const g = `${s}_${a}`;
    if (!c.has(g) && i.has(f)) {
      for (; i.has(f); )
        a = a + 1 >>> 0, f = `${u}#${s} ${a}`;
      c.set(g, a);
    }
    return l.set(s, a + 1), f;
  });
}
var ye, je, Jn;
class Po {
  constructor(n = []) {
    m(this, je);
    m(this, ye, {});
    const r = P(this, je, Jn).call(this, n);
    v(this, ye, r);
  }
  get singboxConfig() {
    return h(this, ye);
  }
}
ye = new WeakMap(), je = new WeakSet(), Jn = function(n) {
  var t, u;
  if (n.length === 0)
    return {};
  const r = structuredClone(n[0]), i = [], o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
  for (const s of n)
    if ((t = s.outbounds) != null && t.length) {
      for (const c of s.outbounds)
        if (c.outbounds) {
          const a = `${c.type}:${c.tag}`;
          if (!l.has(a)) {
            const f = new Set(c.outbounds.filter((g) => !k.isConfigType(g)));
            l.set(a, {
              base: c,
              baseOutbounds: f,
              linkOutbounds: /* @__PURE__ */ new Set()
            });
          }
          c.outbounds.forEach((f) => {
            var g;
            k.isConfigType(f) && ((g = l.get(a)) == null || g.linkOutbounds.add(f));
          });
        }
    }
  for (const s of n)
    if ((u = s.outbounds) != null && u.length) {
      for (const c of s.outbounds)
        if (!c.outbounds)
          if (k.isConfigType(c.tag))
            i.push(c);
          else {
            const a = `${c.type}:${c.tag}`;
            o.has(a) || (o.add(a), i.push(c));
          }
    }
  for (const [s, c] of l) {
    const a = { ...c.base }, f = /* @__PURE__ */ new Set([...c.baseOutbounds, ...c.linkOutbounds]);
    a.outbounds = Array.from(f), i.push(a);
  }
  return r.outbounds = i, r;
};
var we, be, X, L, Z, J;
class Ro extends Ge {
  constructor(r) {
    super();
    /** * @description 原始链接 */
    m(this, we, "");
    /** * @description 混淆链接 */
    m(this, be, "");
    /** * @description vps原始配置 */
    m(this, X, {});
    /** * @description 混淆配置 */
    m(this, L, {});
    /** * @description 原始备注 */
    m(this, Z, "");
    /** * @description 混淆备注 */
    m(this, J, "");
    v(this, J, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig(r);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    v(this, we, r), v(this, X, new URL(r)), v(this, Z, h(this, X).hash ?? "");
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(r) {
    v(this, L, new URL(r)), h(this, L).username = this.getUsername(), h(this, L).host = this.getHost(), h(this, L).hostname = this.getHostName(), h(this, L).port = this.getPort(), h(this, L).hash = k.setPs(h(this, Z), h(this, J)), v(this, be, h(this, L).href);
  }
  restoreClash(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r;
  }
  restoreSingbox(r, i) {
    return r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, r;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return h(this, Z);
  }
  /**
   * @description 原始链接
   * @example 'ss://...'
   */
  get originLink() {
    return h(this, we);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return h(this, X);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return h(this, J);
  }
  /**
   * @description 混淆链接
   * @example 'ss://...'
   */
  get confuseLink() {
    return h(this, be);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return h(this, L);
  }
}
we = new WeakMap(), be = new WeakMap(), X = new WeakMap(), L = new WeakMap(), Z = new WeakMap(), J = new WeakMap();
var _e, Se, z, I, ee, ne;
class Do extends Ge {
  constructor(r) {
    super();
    /** * @description 原始链接 */
    m(this, _e, "");
    /** * @description 混淆链接 */
    m(this, Se, "");
    /** * @description vps原始配置 */
    m(this, z, {});
    /** * @description 混淆配置 */
    m(this, I, {});
    /** * @description 原始备注 */
    m(this, ee, "");
    /** * @description 混淆备注 */
    m(this, ne, "");
    v(this, ne, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig(r);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    v(this, _e, r), v(this, z, new URL(r)), v(this, ee, h(this, z).hash ?? "");
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(r) {
    v(this, I, new URL(r)), h(this, I).username = this.getUsername(), h(this, I).host = this.getHost(), h(this, I).hostname = this.getHostName(), h(this, I).port = this.getPort(), h(this, I).hash = k.setPs(h(this, ee), h(this, ne)), v(this, Se, h(this, I).href);
  }
  restoreClash(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r;
  }
  restoreSingbox(r, i) {
    var o;
    return r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, r;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return h(this, ee);
  }
  /**
   * @description 原始链接
   * @example 'trojan://...'
   */
  get originLink() {
    return h(this, _e);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return h(this, z);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return encodeURIComponent(h(this, ne));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return h(this, Se);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return h(this, I);
  }
}
_e = new WeakMap(), Se = new WeakMap(), z = new WeakMap(), I = new WeakMap(), ee = new WeakMap(), ne = new WeakMap();
var Ee, Oe, re, N, ie, oe;
class Mo extends Ge {
  constructor(r) {
    super();
    /** * @description 原始链接 */
    m(this, Ee, "");
    /** * @description 混淆链接 */
    m(this, Oe, "");
    /** * @description vps原始配置 */
    m(this, re, {});
    /** * @description 混淆配置 */
    m(this, N, {});
    /** * @description 原始备注 */
    m(this, ie, "");
    /** * @description 混淆备注 */
    m(this, oe, "");
    v(this, oe, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig(r);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    v(this, Ee, r), v(this, re, new URL(r)), v(this, ie, h(this, re).hash ?? "");
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(r) {
    v(this, N, new URL(r)), h(this, N).username = this.getUsername(), h(this, N).host = this.getHost(), h(this, N).hostname = this.getHostName(), h(this, N).port = this.getPort(), h(this, N).hash = k.setPs(h(this, ie), h(this, oe)), v(this, Oe, h(this, N).href);
  }
  restoreClash(r, i) {
    var o;
    return console.log("proxy", r), r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = this.originConfig.username ?? "", r;
  }
  restoreSingbox(r, i) {
    var o;
    return r.tag = i, r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.uuid = this.originConfig.username ?? "", (o = r.tls) != null && o.server_name && (r.tls.server_name = this.originConfig.hostname ?? ""), r;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return h(this, ie);
  }
  /**
   * @description 原始链接
   * @example 'vless://...'
   */
  get originLink() {
    return h(this, Ee);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return h(this, re);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return h(this, oe);
  }
  /**
   * @description 混淆链接
   * @example 'vless://...'
   */
  get confuseLink() {
    return h(this, Oe);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return h(this, N);
  }
}
Ee = new WeakMap(), Oe = new WeakMap(), re = new WeakMap(), N = new WeakMap(), ie = new WeakMap(), oe = new WeakMap();
var Te, ke, K, R, te, le, Ke, zn;
class Uo extends Ge {
  constructor(r) {
    super();
    m(this, Ke);
    /** * @description 原始链接 */
    m(this, Te, "");
    /** * @description 混淆链接 */
    m(this, ke, "");
    /** * @description vps原始配置 */
    m(this, K, {});
    /** * @description 混淆配置 */
    m(this, R, {});
    /** * @description 原始备注 */
    m(this, te, "");
    /** * @description 混淆备注 */
    m(this, le, "");
    v(this, le, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig();
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    const [i, o] = r.match(/vmess:\/\/(.*)/) || [];
    v(this, Te, r), v(this, K, JSON.parse(sn(o))), v(this, te, h(this, K).ps ?? "");
  }
  /**
   * @description 设置混淆配置
   */
  setConfuseConfig() {
    v(this, R, structuredClone(h(this, K))), h(this, R).add = this.getHostName(), h(this, R).port = this.getPort(), h(this, R).id = this.getPassword(), h(this, R).ps = k.setPs(h(this, te), h(this, le)), v(this, ke, `vmess://${Fo(JSON.stringify(h(this, R)))}`);
  }
  restoreClash(r, i) {
    var o, l;
    return P(this, Ke, zn).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  restoreSingbox(r, i) {
    var o, l;
    return r.server = this.originConfig.add ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, (o = r.tls) != null && o.server_name && (r.tls.server_name = this.originConfig.add ?? ""), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return h(this, te);
  }
  /**
   * @description 原始链接
   * @example 'vmess://...'
   */
  get originLink() {
    return h(this, Te);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return h(this, K);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return h(this, le);
  }
  /**
   * @description 混淆链接
   * @example 'vmess://...'
   */
  get confuseLink() {
    return h(this, ke);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return h(this, R);
  }
}
Te = new WeakMap(), ke = new WeakMap(), K = new WeakMap(), R = new WeakMap(), te = new WeakMap(), le = new WeakMap(), Ke = new WeakSet(), zn = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
var Fe, Le, Ie, Ne;
class Bo {
  constructor(n) {
    m(this, Fe, /* @__PURE__ */ new Set());
    m(this, Le, /* @__PURE__ */ new Map());
    m(this, Ie, /* @__PURE__ */ new Set());
    m(this, Ne, []);
    v(this, Ne, n);
  }
  async parse(n = h(this, Ne)) {
    for await (const r of n) {
      if (r.startsWith("vless:")) {
        const i = new Mo(r);
        this.setStore(r, i);
      }
      if (r.startsWith("vmess:")) {
        const i = new Uo(r);
        this.setStore(r, i);
      }
      if (r.startsWith("trojan://")) {
        const i = new Do(r);
        this.setStore(r, i);
      }
      if (r.startsWith("ss://")) {
        const i = new Ro(r);
        this.setStore(r, i);
      }
      if (r.startsWith("https://") || r.startsWith("http://")) {
        const i = await nn(r, { retries: 3 }).then((l) => l.data.text());
        Io(i) === "base64" && await this.parse(Zn(or.base64(i), Array.from(h(this, Ie))));
      }
    }
  }
  setStore(n, r) {
    h(this, Fe).add(r.confuseLink), h(this, Ie).add(n), h(this, Le).set(r.confusePs, r);
  }
  get urls() {
    return h(this, Fe);
  }
  get vpsMap() {
    return h(this, Le);
  }
}
Fe = new WeakMap(), Le = new WeakMap(), Ie = new WeakMap(), Ne = new WeakMap();
var ue;
const Q = class Q {
  /**
   * @description 获取混淆链接组
   * @param {string | URL} url
   * @param {string} backend
   * @param {string} chunkCount
   * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
   */
  static async getConfuseUrl(n, r, i) {
    const { searchParams: o } = new URL(n), t = o.get("url").split(/\||\n/).filter(Boolean), u = new Bo(t);
    await u.parse(Zn(t));
    const s = No(Array.from(u.urls), Number(i));
    return v(Q, ue, s.map((c) => {
      const a = new URL(`${r}/sub`), { searchParams: f } = new URL(n);
      return f.set("url", c), a.search = f.toString(), a.toString();
    })), u;
  }
  /**
   * @description 获取Clash混淆配置
   * @returns {Promise<Clash>} clashConfig
   */
  static async getClashConfuseConfig() {
    try {
      const n = await Promise.all(h(Q, ue).map((i) => nn(i, { retries: 3 }).then((o) => o.data.text())));
      return new Lo(n).clashConfig;
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
      const n = await Promise.all(
        h(Q, ue).map((i) => nn(i, { retries: 3 }).then((o) => o.data.json()))
      );
      return new Po(n).singboxConfig;
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
};
ue = new WeakMap(), m(Q, ue);
let he = Q;
var ce, er, nr;
class Ho {
  constructor() {
    m(this, ce);
  }
  /**
   * @description 获取原始配置
   * @param {ClashType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {ClashType} originConfig
   */
  getOriginConfig(n, r) {
    try {
      return n.proxies = P(this, ce, er).call(this, n.proxies, r), n["proxy-groups"] = n["proxy-groups"].map((i) => (i.proxies && (i.proxies = P(this, ce, nr).call(this, i.proxies)), i)), n;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
ce = new WeakSet(), er = function(n, r) {
  try {
    const i = [];
    for (const o of n) {
      const [l, t] = k.getPs(o.name);
      if (r.has(t)) {
        const u = r.get(t);
        u == null || u.restoreClash(o, l), i.push(o);
      }
    }
    return i;
  } catch (i) {
    throw new Error(`Restore proxies failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, nr = function(n) {
  try {
    return n.map((r) => {
      const [i] = k.getPs(r);
      return i;
    });
  } catch (r) {
    throw new Error(`Update proxies groups failed: ${r.message || r}, function trace: ${r.stack}`);
  }
};
var U, rr, ir, rn;
class Yo {
  constructor() {
    m(this, U);
  }
  /**
   * @description 获取原始配置
   * @param {SingboxType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {SingboxType} originConfig
   */
  getOriginConfig(n, r) {
    try {
      return n.outbounds = P(this, U, rr).call(this, n.outbounds, r), n;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
U = new WeakSet(), rr = function(n = [], r) {
  try {
    const i = [];
    for (const o of n) {
      if (P(this, U, rn).call(this, o.tag)) {
        const [l, t] = k.getPs(o.tag), u = r.get(t);
        u == null || u.restoreSingbox(o, l);
      }
      Reflect.has(o, "outbounds") && (o.outbounds = P(this, U, ir).call(this, o.outbounds)), i.push(o);
    }
    return i;
  } catch (i) {
    throw new Error(`Restore outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, ir = function(n = []) {
  try {
    return n.map((r) => {
      if (P(this, U, rn).call(this, r)) {
        const [i] = k.getPs(r);
        return i;
      }
      return r;
    });
  } catch (r) {
    throw new Error(`Update outbounds failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}, rn = function(n) {
  return k.isConfigType(n);
};
const jo = new Ho(), Ko = new Yo();
class or {
  /**
   * @description 处理base64订阅
   * @param {string} subs
   * @returns {string[]} content
   */
  static base64(n) {
    return sn(n).split(`
`).filter(Boolean);
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
function $o(e = "") {
  return e.split(`
`).reduce((r, i) => (r.push({
    label: i,
    value: i
  }), r), []);
}
function Go(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function Wo(e, n) {
  const r = n === "" ? [] : $o(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(r));
}
function qo(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const fe = {
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
    return t = Go(t, o), t = Wo(t, i), t = qo(t, r), new Response(t, {
      headers: new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" })
    });
  } catch (n) {
    return new Response(n.message || n);
  }
}
const Xo = {
  async fetch(e, n) {
    try {
      const { pathname: r, origin: i } = new URL(e.url);
      if (r === "/sub") {
        const { vpsMap: o } = await he.getConfuseUrl(
          e.url,
          n.BACKEND ?? fe.BACKEND,
          n.CHUNK_COUNT ?? fe.CHUNK_COUNT
        ), l = or.getConvertType(e.url);
        if (!l)
          return new Response("Unsupported client type", { status: 400 });
        if (["clash", "clashr"].includes(l)) {
          const t = await he.getClashConfuseConfig(), u = jo.getOriginConfig(t, o);
          return new Response(ko(u, { indent: 2, lineWidth: 200 }), {
            headers: new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        if (l === "singbox") {
          const t = await he.getSingboxConfuseConfig(), u = Ko.getOriginConfig(t, o);
          return new Response(JSON.stringify(u), {
            headers: new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        return new Response("Unsupported client type, support list: clash, clashr", { status: 400 });
      }
      return Vo({
        url: n.PAGE_URL ?? fe.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? fe.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? fe.REMOTE_CONFIG,
        origin: i
      });
    } catch (r) {
      return new Response(r.message || r);
    }
  }
};
export {
  Xo as default
};
