var Xn = Object.defineProperty;
var en = (e) => {
  throw TypeError(e);
};
var Jn = (e, i, n) => i in e ? Xn(e, i, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[i] = n;
var E = (e, i, n) => Jn(e, typeof i != "symbol" ? i + "" : i, n), Be = (e, i, n) => i.has(e) || en("Cannot " + n);
var c = (e, i, n) => (Be(e, i, "read from private field"), n ? n.call(e) : i.get(e)), A = (e, i, n) => i.has(e) ? en("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, n), m = (e, i, n, t) => (Be(e, i, "write to private field"), t ? t.call(e, n) : i.set(e, n), n), nn = (e, i, n) => (Be(e, i, "access private method"), n);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function An(e) {
  return typeof e > "u" || e === null;
}
function Zn(e) {
  return typeof e == "object" && e !== null;
}
function zn(e) {
  return Array.isArray(e) ? e : An(e) ? [] : [e];
}
function ei(e, i) {
  var n, t, r, s;
  if (i)
    for (s = Object.keys(i), n = 0, t = s.length; n < t; n += 1)
      r = s[n], e[r] = i[r];
  return e;
}
function ni(e, i) {
  var n = "", t;
  for (t = 0; t < i; t += 1)
    n += e;
  return n;
}
function ii(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var ri = An, ti = Zn, oi = zn, si = ni, li = ii, ui = ei, b = {
  isNothing: ri,
  isObject: ti,
  toArray: oi,
  repeat: si,
  isNegativeZero: li,
  extend: ui
};
function yn(e, i) {
  var n = "", t = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !i && e.mark.snippet && (n += `

` + e.mark.snippet), t + " " + n) : t;
}
function xe(e, i) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = i, this.message = yn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
xe.prototype = Object.create(Error.prototype);
xe.prototype.constructor = xe;
xe.prototype.toString = function(i) {
  return this.name + ": " + yn(this, i);
};
var k = xe;
function He(e, i, n, t, r) {
  var s = "", o = "", l = Math.floor(r / 2) - 1;
  return t - i > l && (s = " ... ", i = t - l + s.length), n - t > l && (o = " ...", n = t + l - o.length), {
    str: s + e.slice(i, n).replace(/\t/g, "→") + o,
    pos: t - i + s.length
    // relative position
  };
}
function Ye(e, i) {
  return b.repeat(" ", i - e.length) + e;
}
function fi(e, i) {
  if (i = Object.create(i || null), !e.buffer) return null;
  i.maxLength || (i.maxLength = 79), typeof i.indent != "number" && (i.indent = 1), typeof i.linesBefore != "number" && (i.linesBefore = 3), typeof i.linesAfter != "number" && (i.linesAfter = 2);
  for (var n = /\r?\n|\r|\0/g, t = [0], r = [], s, o = -1; s = n.exec(e.buffer); )
    r.push(s.index), t.push(s.index + s[0].length), e.position <= s.index && o < 0 && (o = t.length - 2);
  o < 0 && (o = t.length - 1);
  var l = "", u, f, h = Math.min(e.line + i.linesAfter, r.length).toString().length, a = i.maxLength - (i.indent + h + 3);
  for (u = 1; u <= i.linesBefore && !(o - u < 0); u++)
    f = He(
      e.buffer,
      t[o - u],
      r[o - u],
      e.position - (t[o] - t[o - u]),
      a
    ), l = b.repeat(" ", i.indent) + Ye((e.line - u + 1).toString(), h) + " | " + f.str + `
` + l;
  for (f = He(e.buffer, t[o], r[o], e.position, a), l += b.repeat(" ", i.indent) + Ye((e.line + 1).toString(), h) + " | " + f.str + `
`, l += b.repeat("-", i.indent + h + 3 + f.pos) + `^
`, u = 1; u <= i.linesAfter && !(o + u >= r.length); u++)
    f = He(
      e.buffer,
      t[o + u],
      r[o + u],
      e.position - (t[o] - t[o + u]),
      a
    ), l += b.repeat(" ", i.indent) + Ye((e.line + u + 1).toString(), h) + " | " + f.str + `
`;
  return l.replace(/\n$/, "");
}
var ci = fi, ai = [
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
], hi = [
  "scalar",
  "sequence",
  "mapping"
];
function pi(e) {
  var i = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(t) {
      i[String(t)] = n;
    });
  }), i;
}
function gi(e, i) {
  if (i = i || {}, Object.keys(i).forEach(function(n) {
    if (ai.indexOf(n) === -1)
      throw new k('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = i, this.tag = e, this.kind = i.kind || null, this.resolve = i.resolve || function() {
    return !0;
  }, this.construct = i.construct || function(n) {
    return n;
  }, this.instanceOf = i.instanceOf || null, this.predicate = i.predicate || null, this.represent = i.represent || null, this.representName = i.representName || null, this.defaultStyle = i.defaultStyle || null, this.multi = i.multi || !1, this.styleAliases = pi(i.styleAliases || null), hi.indexOf(this.kind) === -1)
    throw new k('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = gi;
function rn(e, i) {
  var n = [];
  return e[i].forEach(function(t) {
    var r = n.length;
    n.forEach(function(s, o) {
      s.tag === t.tag && s.kind === t.kind && s.multi === t.multi && (r = o);
    }), n[r] = t;
  }), n;
}
function di() {
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
  }, i, n;
  function t(r) {
    r.multi ? (e.multi[r.kind].push(r), e.multi.fallback.push(r)) : e[r.kind][r.tag] = e.fallback[r.tag] = r;
  }
  for (i = 0, n = arguments.length; i < n; i += 1)
    arguments[i].forEach(t);
  return e;
}
function Ke(e) {
  return this.extend(e);
}
Ke.prototype.extend = function(i) {
  var n = [], t = [];
  if (i instanceof _)
    t.push(i);
  else if (Array.isArray(i))
    t = t.concat(i);
  else if (i && (Array.isArray(i.implicit) || Array.isArray(i.explicit)))
    i.implicit && (n = n.concat(i.implicit)), i.explicit && (t = t.concat(i.explicit));
  else
    throw new k("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(s) {
    if (!(s instanceof _))
      throw new k("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (s.loadKind && s.loadKind !== "scalar")
      throw new k("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (s.multi)
      throw new k("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), t.forEach(function(s) {
    if (!(s instanceof _))
      throw new k("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var r = Object.create(Ke.prototype);
  return r.implicit = (this.implicit || []).concat(n), r.explicit = (this.explicit || []).concat(t), r.compiledImplicit = rn(r, "implicit"), r.compiledExplicit = rn(r, "explicit"), r.compiledTypeMap = di(r.compiledImplicit, r.compiledExplicit), r;
};
var mi = Ke, xi = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Ci = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Ai = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), yi = new mi({
  explicit: [
    xi,
    Ci,
    Ai
  ]
});
function wi(e) {
  if (e === null) return !0;
  var i = e.length;
  return i === 1 && e === "~" || i === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function vi() {
  return null;
}
function bi(e) {
  return e === null;
}
var _i = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: wi,
  construct: vi,
  predicate: bi,
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
function Si(e) {
  if (e === null) return !1;
  var i = e.length;
  return i === 4 && (e === "true" || e === "True" || e === "TRUE") || i === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Ei(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Oi(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Ti = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Si,
  construct: Ei,
  predicate: Oi,
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
function ki(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Fi(e) {
  return 48 <= e && e <= 55;
}
function Li(e) {
  return 48 <= e && e <= 57;
}
function Ni(e) {
  if (e === null) return !1;
  var i = e.length, n = 0, t = !1, r;
  if (!i) return !1;
  if (r = e[n], (r === "-" || r === "+") && (r = e[++n]), r === "0") {
    if (n + 1 === i) return !0;
    if (r = e[++n], r === "b") {
      for (n++; n < i; n++)
        if (r = e[n], r !== "_") {
          if (r !== "0" && r !== "1") return !1;
          t = !0;
        }
      return t && r !== "_";
    }
    if (r === "x") {
      for (n++; n < i; n++)
        if (r = e[n], r !== "_") {
          if (!ki(e.charCodeAt(n))) return !1;
          t = !0;
        }
      return t && r !== "_";
    }
    if (r === "o") {
      for (n++; n < i; n++)
        if (r = e[n], r !== "_") {
          if (!Fi(e.charCodeAt(n))) return !1;
          t = !0;
        }
      return t && r !== "_";
    }
  }
  if (r === "_") return !1;
  for (; n < i; n++)
    if (r = e[n], r !== "_") {
      if (!Li(e.charCodeAt(n)))
        return !1;
      t = !0;
    }
  return !(!t || r === "_");
}
function Ii(e) {
  var i = e, n = 1, t;
  if (i.indexOf("_") !== -1 && (i = i.replace(/_/g, "")), t = i[0], (t === "-" || t === "+") && (t === "-" && (n = -1), i = i.slice(1), t = i[0]), i === "0") return 0;
  if (t === "0") {
    if (i[1] === "b") return n * parseInt(i.slice(2), 2);
    if (i[1] === "x") return n * parseInt(i.slice(2), 16);
    if (i[1] === "o") return n * parseInt(i.slice(2), 8);
  }
  return n * parseInt(i, 10);
}
function Pi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !b.isNegativeZero(e);
}
var Ri = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Ni,
  construct: Ii,
  predicate: Pi,
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
}), Di = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Mi(e) {
  return !(e === null || !Di.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Ui(e) {
  var i, n;
  return i = e.replace(/_/g, "").toLowerCase(), n = i[0] === "-" ? -1 : 1, "+-".indexOf(i[0]) >= 0 && (i = i.slice(1)), i === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : i === ".nan" ? NaN : n * parseFloat(i, 10);
}
var Bi = /^[-+]?[0-9]+e/;
function Hi(e, i) {
  var n;
  if (isNaN(e))
    switch (i) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (i) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (i) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (b.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), Bi.test(n) ? n.replace("e", ".e") : n;
}
function Yi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || b.isNegativeZero(e));
}
var ji = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Mi,
  construct: Ui,
  predicate: Yi,
  represent: Hi,
  defaultStyle: "lowercase"
}), Ki = yi.extend({
  implicit: [
    _i,
    Ti,
    Ri,
    ji
  ]
}), Gi = Ki, wn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), vn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function $i(e) {
  return e === null ? !1 : wn.exec(e) !== null || vn.exec(e) !== null;
}
function Wi(e) {
  var i, n, t, r, s, o, l, u = 0, f = null, h, a, g;
  if (i = wn.exec(e), i === null && (i = vn.exec(e)), i === null) throw new Error("Date resolve error");
  if (n = +i[1], t = +i[2] - 1, r = +i[3], !i[4])
    return new Date(Date.UTC(n, t, r));
  if (s = +i[4], o = +i[5], l = +i[6], i[7]) {
    for (u = i[7].slice(0, 3); u.length < 3; )
      u += "0";
    u = +u;
  }
  return i[9] && (h = +i[10], a = +(i[11] || 0), f = (h * 60 + a) * 6e4, i[9] === "-" && (f = -f)), g = new Date(Date.UTC(n, t, r, s, o, l, u)), f && g.setTime(g.getTime() - f), g;
}
function Vi(e) {
  return e.toISOString();
}
var qi = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: $i,
  construct: Wi,
  instanceOf: Date,
  represent: Vi
});
function Qi(e) {
  return e === "<<" || e === null;
}
var Xi = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Qi
}), Qe = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Ji(e) {
  if (e === null) return !1;
  var i, n, t = 0, r = e.length, s = Qe;
  for (n = 0; n < r; n++)
    if (i = s.indexOf(e.charAt(n)), !(i > 64)) {
      if (i < 0) return !1;
      t += 6;
    }
  return t % 8 === 0;
}
function Zi(e) {
  var i, n, t = e.replace(/[\r\n=]/g, ""), r = t.length, s = Qe, o = 0, l = [];
  for (i = 0; i < r; i++)
    i % 4 === 0 && i && (l.push(o >> 16 & 255), l.push(o >> 8 & 255), l.push(o & 255)), o = o << 6 | s.indexOf(t.charAt(i));
  return n = r % 4 * 6, n === 0 ? (l.push(o >> 16 & 255), l.push(o >> 8 & 255), l.push(o & 255)) : n === 18 ? (l.push(o >> 10 & 255), l.push(o >> 2 & 255)) : n === 12 && l.push(o >> 4 & 255), new Uint8Array(l);
}
function zi(e) {
  var i = "", n = 0, t, r, s = e.length, o = Qe;
  for (t = 0; t < s; t++)
    t % 3 === 0 && t && (i += o[n >> 18 & 63], i += o[n >> 12 & 63], i += o[n >> 6 & 63], i += o[n & 63]), n = (n << 8) + e[t];
  return r = s % 3, r === 0 ? (i += o[n >> 18 & 63], i += o[n >> 12 & 63], i += o[n >> 6 & 63], i += o[n & 63]) : r === 2 ? (i += o[n >> 10 & 63], i += o[n >> 4 & 63], i += o[n << 2 & 63], i += o[64]) : r === 1 && (i += o[n >> 2 & 63], i += o[n << 4 & 63], i += o[64], i += o[64]), i;
}
function er(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var nr = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Ji,
  construct: Zi,
  predicate: er,
  represent: zi
}), ir = Object.prototype.hasOwnProperty, rr = Object.prototype.toString;
function tr(e) {
  if (e === null) return !0;
  var i = [], n, t, r, s, o, l = e;
  for (n = 0, t = l.length; n < t; n += 1) {
    if (r = l[n], o = !1, rr.call(r) !== "[object Object]") return !1;
    for (s in r)
      if (ir.call(r, s))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (i.indexOf(s) === -1) i.push(s);
    else return !1;
  }
  return !0;
}
function or(e) {
  return e !== null ? e : [];
}
var sr = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: tr,
  construct: or
}), lr = Object.prototype.toString;
function ur(e) {
  if (e === null) return !0;
  var i, n, t, r, s, o = e;
  for (s = new Array(o.length), i = 0, n = o.length; i < n; i += 1) {
    if (t = o[i], lr.call(t) !== "[object Object]" || (r = Object.keys(t), r.length !== 1)) return !1;
    s[i] = [r[0], t[r[0]]];
  }
  return !0;
}
function fr(e) {
  if (e === null) return [];
  var i, n, t, r, s, o = e;
  for (s = new Array(o.length), i = 0, n = o.length; i < n; i += 1)
    t = o[i], r = Object.keys(t), s[i] = [r[0], t[r[0]]];
  return s;
}
var cr = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: ur,
  construct: fr
}), ar = Object.prototype.hasOwnProperty;
function hr(e) {
  if (e === null) return !0;
  var i, n = e;
  for (i in n)
    if (ar.call(n, i) && n[i] !== null)
      return !1;
  return !0;
}
function pr(e) {
  return e !== null ? e : {};
}
var gr = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: hr,
  construct: pr
}), bn = Gi.extend({
  implicit: [
    qi,
    Xi
  ],
  explicit: [
    nr,
    sr,
    cr,
    gr
  ]
}), $ = Object.prototype.hasOwnProperty, Le = 1, _n = 2, Sn = 3, Ne = 4, je = 1, dr = 2, tn = 3, mr = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, xr = /[\x85\u2028\u2029]/, Cr = /[,\[\]\{\}]/, En = /^(?:!|!!|![a-z\-]+!)$/i, On = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function on(e) {
  return Object.prototype.toString.call(e);
}
function M(e) {
  return e === 10 || e === 13;
}
function te(e) {
  return e === 9 || e === 32;
}
function F(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function le(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Ar(e) {
  var i;
  return 48 <= e && e <= 57 ? e - 48 : (i = e | 32, 97 <= i && i <= 102 ? i - 97 + 10 : -1);
}
function yr(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function wr(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function sn(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function vr(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Tn = new Array(256), kn = new Array(256);
for (var oe = 0; oe < 256; oe++)
  Tn[oe] = sn(oe) ? 1 : 0, kn[oe] = sn(oe);
function br(e, i) {
  this.input = e, this.filename = i.filename || null, this.schema = i.schema || bn, this.onWarning = i.onWarning || null, this.legacy = i.legacy || !1, this.json = i.json || !1, this.listener = i.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Fn(e, i) {
  var n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = ci(n), new k(i, n);
}
function d(e, i) {
  throw Fn(e, i);
}
function Ie(e, i) {
  e.onWarning && e.onWarning.call(null, Fn(e, i));
}
var ln = {
  YAML: function(i, n, t) {
    var r, s, o;
    i.version !== null && d(i, "duplication of %YAML directive"), t.length !== 1 && d(i, "YAML directive accepts exactly one argument"), r = /^([0-9]+)\.([0-9]+)$/.exec(t[0]), r === null && d(i, "ill-formed argument of the YAML directive"), s = parseInt(r[1], 10), o = parseInt(r[2], 10), s !== 1 && d(i, "unacceptable YAML version of the document"), i.version = t[0], i.checkLineBreaks = o < 2, o !== 1 && o !== 2 && Ie(i, "unsupported YAML version of the document");
  },
  TAG: function(i, n, t) {
    var r, s;
    t.length !== 2 && d(i, "TAG directive accepts exactly two arguments"), r = t[0], s = t[1], En.test(r) || d(i, "ill-formed tag handle (first argument) of the TAG directive"), $.call(i.tagMap, r) && d(i, 'there is a previously declared suffix for "' + r + '" tag handle'), On.test(s) || d(i, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      s = decodeURIComponent(s);
    } catch {
      d(i, "tag prefix is malformed: " + s);
    }
    i.tagMap[r] = s;
  }
};
function G(e, i, n, t) {
  var r, s, o, l;
  if (i < n) {
    if (l = e.input.slice(i, n), t)
      for (r = 0, s = l.length; r < s; r += 1)
        o = l.charCodeAt(r), o === 9 || 32 <= o && o <= 1114111 || d(e, "expected valid JSON character");
    else mr.test(l) && d(e, "the stream contains non-printable characters");
    e.result += l;
  }
}
function un(e, i, n, t) {
  var r, s, o, l;
  for (b.isObject(n) || d(e, "cannot merge mappings; the provided source object is unacceptable"), r = Object.keys(n), o = 0, l = r.length; o < l; o += 1)
    s = r[o], $.call(i, s) || (i[s] = n[s], t[s] = !0);
}
function ue(e, i, n, t, r, s, o, l, u) {
  var f, h;
  if (Array.isArray(r))
    for (r = Array.prototype.slice.call(r), f = 0, h = r.length; f < h; f += 1)
      Array.isArray(r[f]) && d(e, "nested arrays are not supported inside keys"), typeof r == "object" && on(r[f]) === "[object Object]" && (r[f] = "[object Object]");
  if (typeof r == "object" && on(r) === "[object Object]" && (r = "[object Object]"), r = String(r), i === null && (i = {}), t === "tag:yaml.org,2002:merge")
    if (Array.isArray(s))
      for (f = 0, h = s.length; f < h; f += 1)
        un(e, i, s[f], n);
    else
      un(e, i, s, n);
  else
    !e.json && !$.call(n, r) && $.call(i, r) && (e.line = o || e.line, e.lineStart = l || e.lineStart, e.position = u || e.position, d(e, "duplicated mapping key")), r === "__proto__" ? Object.defineProperty(i, r, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: s
    }) : i[r] = s, delete n[r];
  return i;
}
function Xe(e) {
  var i;
  i = e.input.charCodeAt(e.position), i === 10 ? e.position++ : i === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : d(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function v(e, i, n) {
  for (var t = 0, r = e.input.charCodeAt(e.position); r !== 0; ) {
    for (; te(r); )
      r === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), r = e.input.charCodeAt(++e.position);
    if (i && r === 35)
      do
        r = e.input.charCodeAt(++e.position);
      while (r !== 10 && r !== 13 && r !== 0);
    if (M(r))
      for (Xe(e), r = e.input.charCodeAt(e.position), t++, e.lineIndent = 0; r === 32; )
        e.lineIndent++, r = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && t !== 0 && e.lineIndent < n && Ie(e, "deficient indentation"), t;
}
function Ue(e) {
  var i = e.position, n;
  return n = e.input.charCodeAt(i), !!((n === 45 || n === 46) && n === e.input.charCodeAt(i + 1) && n === e.input.charCodeAt(i + 2) && (i += 3, n = e.input.charCodeAt(i), n === 0 || F(n)));
}
function Je(e, i) {
  i === 1 ? e.result += " " : i > 1 && (e.result += b.repeat(`
`, i - 1));
}
function _r(e, i, n) {
  var t, r, s, o, l, u, f, h, a = e.kind, g = e.result, p;
  if (p = e.input.charCodeAt(e.position), F(p) || le(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (r = e.input.charCodeAt(e.position + 1), F(r) || n && le(r)))
    return !1;
  for (e.kind = "scalar", e.result = "", s = o = e.position, l = !1; p !== 0; ) {
    if (p === 58) {
      if (r = e.input.charCodeAt(e.position + 1), F(r) || n && le(r))
        break;
    } else if (p === 35) {
      if (t = e.input.charCodeAt(e.position - 1), F(t))
        break;
    } else {
      if (e.position === e.lineStart && Ue(e) || n && le(p))
        break;
      if (M(p))
        if (u = e.line, f = e.lineStart, h = e.lineIndent, v(e, !1, -1), e.lineIndent >= i) {
          l = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = u, e.lineStart = f, e.lineIndent = h;
          break;
        }
    }
    l && (G(e, s, o, !1), Je(e, e.line - u), s = o = e.position, l = !1), te(p) || (o = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return G(e, s, o, !1), e.result ? !0 : (e.kind = a, e.result = g, !1);
}
function Sr(e, i) {
  var n, t, r;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, t = r = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if (G(e, t, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        t = e.position, e.position++, r = e.position;
      else
        return !0;
    else M(n) ? (G(e, t, r, !0), Je(e, v(e, !1, i)), t = r = e.position) : e.position === e.lineStart && Ue(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, r = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
function Er(e, i) {
  var n, t, r, s, o, l;
  if (l = e.input.charCodeAt(e.position), l !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = t = e.position; (l = e.input.charCodeAt(e.position)) !== 0; ) {
    if (l === 34)
      return G(e, n, e.position, !0), e.position++, !0;
    if (l === 92) {
      if (G(e, n, e.position, !0), l = e.input.charCodeAt(++e.position), M(l))
        v(e, !1, i);
      else if (l < 256 && Tn[l])
        e.result += kn[l], e.position++;
      else if ((o = yr(l)) > 0) {
        for (r = o, s = 0; r > 0; r--)
          l = e.input.charCodeAt(++e.position), (o = Ar(l)) >= 0 ? s = (s << 4) + o : d(e, "expected hexadecimal character");
        e.result += vr(s), e.position++;
      } else
        d(e, "unknown escape sequence");
      n = t = e.position;
    } else M(l) ? (G(e, n, t, !0), Je(e, v(e, !1, i)), n = t = e.position) : e.position === e.lineStart && Ue(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, t = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function Or(e, i) {
  var n = !0, t, r, s, o = e.tag, l, u = e.anchor, f, h, a, g, p, x = /* @__PURE__ */ Object.create(null), C, w, T, y;
  if (y = e.input.charCodeAt(e.position), y === 91)
    h = 93, p = !1, l = [];
  else if (y === 123)
    h = 125, p = !0, l = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), y = e.input.charCodeAt(++e.position); y !== 0; ) {
    if (v(e, !0, i), y = e.input.charCodeAt(e.position), y === h)
      return e.position++, e.tag = o, e.anchor = u, e.kind = p ? "mapping" : "sequence", e.result = l, !0;
    n ? y === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), w = C = T = null, a = g = !1, y === 63 && (f = e.input.charCodeAt(e.position + 1), F(f) && (a = g = !0, e.position++, v(e, !0, i))), t = e.line, r = e.lineStart, s = e.position, de(e, i, Le, !1, !0), w = e.tag, C = e.result, v(e, !0, i), y = e.input.charCodeAt(e.position), (g || e.line === t) && y === 58 && (a = !0, y = e.input.charCodeAt(++e.position), v(e, !0, i), de(e, i, Le, !1, !0), T = e.result), p ? ue(e, l, x, w, C, T, t, r, s) : a ? l.push(ue(e, null, x, w, C, T, t, r, s)) : l.push(C), v(e, !0, i), y = e.input.charCodeAt(e.position), y === 44 ? (n = !0, y = e.input.charCodeAt(++e.position)) : n = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function Tr(e, i) {
  var n, t, r = je, s = !1, o = !1, l = i, u = 0, f = !1, h, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    t = !1;
  else if (a === 62)
    t = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      je === r ? r = a === 43 ? tn : dr : d(e, "repeat of a chomping mode identifier");
    else if ((h = wr(a)) >= 0)
      h === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? d(e, "repeat of an indentation width identifier") : (l = i + h - 1, o = !0);
    else
      break;
  if (te(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while (te(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!M(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (Xe(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!o || e.lineIndent < l) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > l && (l = e.lineIndent), M(a)) {
      u++;
      continue;
    }
    if (e.lineIndent < l) {
      r === tn ? e.result += b.repeat(`
`, s ? 1 + u : u) : r === je && s && (e.result += `
`);
      break;
    }
    for (t ? te(a) ? (f = !0, e.result += b.repeat(`
`, s ? 1 + u : u)) : f ? (f = !1, e.result += b.repeat(`
`, u + 1)) : u === 0 ? s && (e.result += " ") : e.result += b.repeat(`
`, u) : e.result += b.repeat(`
`, s ? 1 + u : u), s = !0, o = !0, u = 0, n = e.position; !M(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    G(e, n, e.position, !1);
  }
  return !0;
}
function fn(e, i) {
  var n, t = e.tag, r = e.anchor, s = [], o, l = !1, u;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), u = e.input.charCodeAt(e.position); u !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(u !== 45 || (o = e.input.charCodeAt(e.position + 1), !F(o)))); ) {
    if (l = !0, e.position++, v(e, !0, -1) && e.lineIndent <= i) {
      s.push(null), u = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, de(e, i, Sn, !1, !0), s.push(e.result), v(e, !0, -1), u = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > i) && u !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < i)
      break;
  }
  return l ? (e.tag = t, e.anchor = r, e.kind = "sequence", e.result = s, !0) : !1;
}
function kr(e, i, n) {
  var t, r, s, o, l, u, f = e.tag, h = e.anchor, a = {}, g = /* @__PURE__ */ Object.create(null), p = null, x = null, C = null, w = !1, T = !1, y;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), y = e.input.charCodeAt(e.position); y !== 0; ) {
    if (!w && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), t = e.input.charCodeAt(e.position + 1), s = e.line, (y === 63 || y === 58) && F(t))
      y === 63 ? (w && (ue(e, a, g, p, x, null, o, l, u), p = x = C = null), T = !0, w = !0, r = !0) : w ? (w = !1, r = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, y = t;
    else {
      if (o = e.line, l = e.lineStart, u = e.position, !de(e, n, _n, !1, !0))
        break;
      if (e.line === s) {
        for (y = e.input.charCodeAt(e.position); te(y); )
          y = e.input.charCodeAt(++e.position);
        if (y === 58)
          y = e.input.charCodeAt(++e.position), F(y) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), w && (ue(e, a, g, p, x, null, o, l, u), p = x = C = null), T = !0, w = !1, r = !1, p = e.tag, x = e.result;
        else if (T)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = h, !0;
      } else if (T)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = h, !0;
    }
    if ((e.line === s || e.lineIndent > i) && (w && (o = e.line, l = e.lineStart, u = e.position), de(e, i, Ne, !0, r) && (w ? x = e.result : C = e.result), w || (ue(e, a, g, p, x, C, o, l, u), p = x = C = null), v(e, !0, -1), y = e.input.charCodeAt(e.position)), (e.line === s || e.lineIndent > i) && y !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < i)
      break;
  }
  return w && ue(e, a, g, p, x, null, o, l, u), T && (e.tag = f, e.anchor = h, e.kind = "mapping", e.result = a), T;
}
function Fr(e) {
  var i, n = !1, t = !1, r, s, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (n = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (t = !0, r = "!!", o = e.input.charCodeAt(++e.position)) : r = "!", i = e.position, n) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (s = e.input.slice(i, e.position), o = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !F(o); )
      o === 33 && (t ? d(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(i - 1, e.position + 1), En.test(r) || d(e, "named tag handle cannot contain such characters"), t = !0, i = e.position + 1)), o = e.input.charCodeAt(++e.position);
    s = e.input.slice(i, e.position), Cr.test(s) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  s && !On.test(s) && d(e, "tag name cannot contain such characters: " + s);
  try {
    s = decodeURIComponent(s);
  } catch {
    d(e, "tag name is malformed: " + s);
  }
  return n ? e.tag = s : $.call(e.tagMap, r) ? e.tag = e.tagMap[r] + s : r === "!" ? e.tag = "!" + s : r === "!!" ? e.tag = "tag:yaml.org,2002:" + s : d(e, 'undeclared tag handle "' + r + '"'), !0;
}
function Lr(e) {
  var i, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), i = e.position; n !== 0 && !F(n) && !le(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === i && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(i, e.position), !0;
}
function Nr(e) {
  var i, n, t;
  if (t = e.input.charCodeAt(e.position), t !== 42) return !1;
  for (t = e.input.charCodeAt(++e.position), i = e.position; t !== 0 && !F(t) && !le(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === i && d(e, "name of an alias node must contain at least one character"), n = e.input.slice(i, e.position), $.call(e.anchorMap, n) || d(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], v(e, !0, -1), !0;
}
function de(e, i, n, t, r) {
  var s, o, l, u = 1, f = !1, h = !1, a, g, p, x, C, w;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, s = o = l = Ne === n || Sn === n, t && v(e, !0, -1) && (f = !0, e.lineIndent > i ? u = 1 : e.lineIndent === i ? u = 0 : e.lineIndent < i && (u = -1)), u === 1)
    for (; Fr(e) || Lr(e); )
      v(e, !0, -1) ? (f = !0, l = s, e.lineIndent > i ? u = 1 : e.lineIndent === i ? u = 0 : e.lineIndent < i && (u = -1)) : l = !1;
  if (l && (l = f || r), (u === 1 || Ne === n) && (Le === n || _n === n ? C = i : C = i + 1, w = e.position - e.lineStart, u === 1 ? l && (fn(e, w) || kr(e, w, C)) || Or(e, C) ? h = !0 : (o && Tr(e, C) || Sr(e, C) || Er(e, C) ? h = !0 : Nr(e) ? (h = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : _r(e, C, Le === n) && (h = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : u === 0 && (h = l && fn(e, w))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, g = e.implicitTypes.length; a < g; a += 1)
      if (x = e.implicitTypes[a], x.resolve(e.result)) {
        e.result = x.construct(e.result), e.tag = x.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if ($.call(e.typeMap[e.kind || "fallback"], e.tag))
      x = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (x = null, p = e.typeMap.multi[e.kind || "fallback"], a = 0, g = p.length; a < g; a += 1)
        if (e.tag.slice(0, p[a].tag.length) === p[a].tag) {
          x = p[a];
          break;
        }
    x || d(e, "unknown tag !<" + e.tag + ">"), e.result !== null && x.kind !== e.kind && d(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + x.kind + '", not "' + e.kind + '"'), x.resolve(e.result, e.tag) ? (e.result = x.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : d(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || h;
}
function Ir(e) {
  var i = e.position, n, t, r, s = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (v(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (s = !0, o = e.input.charCodeAt(++e.position), n = e.position; o !== 0 && !F(o); )
      o = e.input.charCodeAt(++e.position);
    for (t = e.input.slice(n, e.position), r = [], t.length < 1 && d(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; te(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !M(o));
        break;
      }
      if (M(o)) break;
      for (n = e.position; o !== 0 && !F(o); )
        o = e.input.charCodeAt(++e.position);
      r.push(e.input.slice(n, e.position));
    }
    o !== 0 && Xe(e), $.call(ln, t) ? ln[t](e, t, r) : Ie(e, 'unknown document directive "' + t + '"');
  }
  if (v(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, v(e, !0, -1)) : s && d(e, "directives end mark is expected"), de(e, e.lineIndent - 1, Ne, !1, !0), v(e, !0, -1), e.checkLineBreaks && xr.test(e.input.slice(i, e.position)) && Ie(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ue(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, v(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    d(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Ln(e, i) {
  e = String(e), i = i || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new br(e, i), t = e.indexOf("\0");
  for (t !== -1 && (n.position = t, d(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    Ir(n);
  return n.documents;
}
function Pr(e, i, n) {
  i !== null && typeof i == "object" && typeof n > "u" && (n = i, i = null);
  var t = Ln(e, n);
  if (typeof i != "function")
    return t;
  for (var r = 0, s = t.length; r < s; r += 1)
    i(t[r]);
}
function Rr(e, i) {
  var n = Ln(e, i);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new k("expected a single document in the stream, but found more");
  }
}
var Dr = Pr, Mr = Rr, Ur = {
  loadAll: Dr,
  load: Mr
}, Nn = Object.prototype.toString, In = Object.prototype.hasOwnProperty, Ze = 65279, Br = 9, Ce = 10, Hr = 13, Yr = 32, jr = 33, Kr = 34, Ge = 35, Gr = 37, $r = 38, Wr = 39, Vr = 42, Pn = 44, qr = 45, Pe = 58, Qr = 61, Xr = 62, Jr = 63, Zr = 64, Rn = 91, Dn = 93, zr = 96, Mn = 123, et = 124, Un = 125, S = {};
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
var nt = [
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
], it = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function rt(e, i) {
  var n, t, r, s, o, l, u;
  if (i === null) return {};
  for (n = {}, t = Object.keys(i), r = 0, s = t.length; r < s; r += 1)
    o = t[r], l = String(i[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), u = e.compiledTypeMap.fallback[o], u && In.call(u.styleAliases, l) && (l = u.styleAliases[l]), n[o] = l;
  return n;
}
function tt(e) {
  var i, n, t;
  if (i = e.toString(16).toUpperCase(), e <= 255)
    n = "x", t = 2;
  else if (e <= 65535)
    n = "u", t = 4;
  else if (e <= 4294967295)
    n = "U", t = 8;
  else
    throw new k("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + b.repeat("0", t - i.length) + i;
}
var ot = 1, Ae = 2;
function st(e) {
  this.schema = e.schema || bn, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = rt(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ae : ot, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function cn(e, i) {
  for (var n = b.repeat(" ", i), t = 0, r = -1, s = "", o, l = e.length; t < l; )
    r = e.indexOf(`
`, t), r === -1 ? (o = e.slice(t), t = l) : (o = e.slice(t, r + 1), t = r + 1), o.length && o !== `
` && (s += n), s += o;
  return s;
}
function $e(e, i) {
  return `
` + b.repeat(" ", e.indent * i);
}
function lt(e, i) {
  var n, t, r;
  for (n = 0, t = e.implicitTypes.length; n < t; n += 1)
    if (r = e.implicitTypes[n], r.resolve(i))
      return !0;
  return !1;
}
function Re(e) {
  return e === Yr || e === Br;
}
function ye(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ze || 65536 <= e && e <= 1114111;
}
function an(e) {
  return ye(e) && e !== Ze && e !== Hr && e !== Ce;
}
function hn(e, i, n) {
  var t = an(e), r = t && !Re(e);
  return (
    // ns-plain-safe
    (n ? (
      // c = flow-in
      t
    ) : t && e !== Pn && e !== Rn && e !== Dn && e !== Mn && e !== Un) && e !== Ge && !(i === Pe && !r) || an(i) && !Re(i) && e === Ge || i === Pe && r
  );
}
function ut(e) {
  return ye(e) && e !== Ze && !Re(e) && e !== qr && e !== Jr && e !== Pe && e !== Pn && e !== Rn && e !== Dn && e !== Mn && e !== Un && e !== Ge && e !== $r && e !== Vr && e !== jr && e !== et && e !== Qr && e !== Xr && e !== Wr && e !== Kr && e !== Gr && e !== Zr && e !== zr;
}
function ft(e) {
  return !Re(e) && e !== Pe;
}
function me(e, i) {
  var n = e.charCodeAt(i), t;
  return n >= 55296 && n <= 56319 && i + 1 < e.length && (t = e.charCodeAt(i + 1), t >= 56320 && t <= 57343) ? (n - 55296) * 1024 + t - 56320 + 65536 : n;
}
function Bn(e) {
  var i = /^\n* /;
  return i.test(e);
}
var Hn = 1, We = 2, Yn = 3, jn = 4, se = 5;
function ct(e, i, n, t, r, s, o, l) {
  var u, f = 0, h = null, a = !1, g = !1, p = t !== -1, x = -1, C = ut(me(e, 0)) && ft(me(e, e.length - 1));
  if (i || o)
    for (u = 0; u < e.length; f >= 65536 ? u += 2 : u++) {
      if (f = me(e, u), !ye(f))
        return se;
      C = C && hn(f, h, l), h = f;
    }
  else {
    for (u = 0; u < e.length; f >= 65536 ? u += 2 : u++) {
      if (f = me(e, u), f === Ce)
        a = !0, p && (g = g || // Foldable line = too long, and not more-indented.
        u - x - 1 > t && e[x + 1] !== " ", x = u);
      else if (!ye(f))
        return se;
      C = C && hn(f, h, l), h = f;
    }
    g = g || p && u - x - 1 > t && e[x + 1] !== " ";
  }
  return !a && !g ? C && !o && !r(e) ? Hn : s === Ae ? se : We : n > 9 && Bn(e) ? se : o ? s === Ae ? se : We : g ? jn : Yn;
}
function at(e, i, n, t, r) {
  e.dump = function() {
    if (i.length === 0)
      return e.quotingType === Ae ? '""' : "''";
    if (!e.noCompatMode && (nt.indexOf(i) !== -1 || it.test(i)))
      return e.quotingType === Ae ? '"' + i + '"' : "'" + i + "'";
    var s = e.indent * Math.max(1, n), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s), l = t || e.flowLevel > -1 && n >= e.flowLevel;
    function u(f) {
      return lt(e, f);
    }
    switch (ct(
      i,
      l,
      e.indent,
      o,
      u,
      e.quotingType,
      e.forceQuotes && !t,
      r
    )) {
      case Hn:
        return i;
      case We:
        return "'" + i.replace(/'/g, "''") + "'";
      case Yn:
        return "|" + pn(i, e.indent) + gn(cn(i, s));
      case jn:
        return ">" + pn(i, e.indent) + gn(cn(ht(i, o), s));
      case se:
        return '"' + pt(i) + '"';
      default:
        throw new k("impossible error: invalid scalar style");
    }
  }();
}
function pn(e, i) {
  var n = Bn(e) ? String(i) : "", t = e[e.length - 1] === `
`, r = t && (e[e.length - 2] === `
` || e === `
`), s = r ? "+" : t ? "" : "-";
  return n + s + `
`;
}
function gn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function ht(e, i) {
  for (var n = /(\n+)([^\n]*)/g, t = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, n.lastIndex = f, dn(e.slice(0, f), i);
  }(), r = e[0] === `
` || e[0] === " ", s, o; o = n.exec(e); ) {
    var l = o[1], u = o[2];
    s = u[0] === " ", t += l + (!r && !s && u !== "" ? `
` : "") + dn(u, i), r = s;
  }
  return t;
}
function dn(e, i) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, t, r = 0, s, o = 0, l = 0, u = ""; t = n.exec(e); )
    l = t.index, l - r > i && (s = o > r ? o : l, u += `
` + e.slice(r, s), r = s + 1), o = l;
  return u += `
`, e.length - r > i && o > r ? u += e.slice(r, o) + `
` + e.slice(o + 1) : u += e.slice(r), u.slice(1);
}
function pt(e) {
  for (var i = "", n = 0, t, r = 0; r < e.length; n >= 65536 ? r += 2 : r++)
    n = me(e, r), t = S[n], !t && ye(n) ? (i += e[r], n >= 65536 && (i += e[r + 1])) : i += t || tt(n);
  return i;
}
function gt(e, i, n) {
  var t = "", r = e.tag, s, o, l;
  for (s = 0, o = n.length; s < o; s += 1)
    l = n[s], e.replacer && (l = e.replacer.call(n, String(s), l)), (B(e, i, l, !1, !1) || typeof l > "u" && B(e, i, null, !1, !1)) && (t !== "" && (t += "," + (e.condenseFlow ? "" : " ")), t += e.dump);
  e.tag = r, e.dump = "[" + t + "]";
}
function mn(e, i, n, t) {
  var r = "", s = e.tag, o, l, u;
  for (o = 0, l = n.length; o < l; o += 1)
    u = n[o], e.replacer && (u = e.replacer.call(n, String(o), u)), (B(e, i + 1, u, !0, !0, !1, !0) || typeof u > "u" && B(e, i + 1, null, !0, !0, !1, !0)) && ((!t || r !== "") && (r += $e(e, i)), e.dump && Ce === e.dump.charCodeAt(0) ? r += "-" : r += "- ", r += e.dump);
  e.tag = s, e.dump = r || "[]";
}
function dt(e, i, n) {
  var t = "", r = e.tag, s = Object.keys(n), o, l, u, f, h;
  for (o = 0, l = s.length; o < l; o += 1)
    h = "", t !== "" && (h += ", "), e.condenseFlow && (h += '"'), u = s[o], f = n[u], e.replacer && (f = e.replacer.call(n, u, f)), B(e, i, u, !1, !1) && (e.dump.length > 1024 && (h += "? "), h += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), B(e, i, f, !1, !1) && (h += e.dump, t += h));
  e.tag = r, e.dump = "{" + t + "}";
}
function mt(e, i, n, t) {
  var r = "", s = e.tag, o = Object.keys(n), l, u, f, h, a, g;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new k("sortKeys must be a boolean or a function");
  for (l = 0, u = o.length; l < u; l += 1)
    g = "", (!t || r !== "") && (g += $e(e, i)), f = o[l], h = n[f], e.replacer && (h = e.replacer.call(n, f, h)), B(e, i + 1, f, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && Ce === e.dump.charCodeAt(0) ? g += "?" : g += "? "), g += e.dump, a && (g += $e(e, i)), B(e, i + 1, h, !0, a) && (e.dump && Ce === e.dump.charCodeAt(0) ? g += ":" : g += ": ", g += e.dump, r += g));
  e.tag = s, e.dump = r || "{}";
}
function xn(e, i, n) {
  var t, r, s, o, l, u;
  for (r = n ? e.explicitTypes : e.implicitTypes, s = 0, o = r.length; s < o; s += 1)
    if (l = r[s], (l.instanceOf || l.predicate) && (!l.instanceOf || typeof i == "object" && i instanceof l.instanceOf) && (!l.predicate || l.predicate(i))) {
      if (n ? l.multi && l.representName ? e.tag = l.representName(i) : e.tag = l.tag : e.tag = "?", l.represent) {
        if (u = e.styleMap[l.tag] || l.defaultStyle, Nn.call(l.represent) === "[object Function]")
          t = l.represent(i, u);
        else if (In.call(l.represent, u))
          t = l.represent[u](i, u);
        else
          throw new k("!<" + l.tag + '> tag resolver accepts not "' + u + '" style');
        e.dump = t;
      }
      return !0;
    }
  return !1;
}
function B(e, i, n, t, r, s, o) {
  e.tag = null, e.dump = n, xn(e, n, !1) || xn(e, n, !0);
  var l = Nn.call(e.dump), u = t, f;
  t && (t = e.flowLevel < 0 || e.flowLevel > i);
  var h = l === "[object Object]" || l === "[object Array]", a, g;
  if (h && (a = e.duplicates.indexOf(n), g = a !== -1), (e.tag !== null && e.tag !== "?" || g || e.indent !== 2 && i > 0) && (r = !1), g && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (h && g && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), l === "[object Object]")
      t && Object.keys(e.dump).length !== 0 ? (mt(e, i, e.dump, r), g && (e.dump = "&ref_" + a + e.dump)) : (dt(e, i, e.dump), g && (e.dump = "&ref_" + a + " " + e.dump));
    else if (l === "[object Array]")
      t && e.dump.length !== 0 ? (e.noArrayIndent && !o && i > 0 ? mn(e, i - 1, e.dump, r) : mn(e, i, e.dump, r), g && (e.dump = "&ref_" + a + e.dump)) : (gt(e, i, e.dump), g && (e.dump = "&ref_" + a + " " + e.dump));
    else if (l === "[object String]")
      e.tag !== "?" && at(e, e.dump, i, s, u);
    else {
      if (l === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new k("unacceptable kind of an object to dump " + l);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function xt(e, i) {
  var n = [], t = [], r, s;
  for (Ve(e, n, t), r = 0, s = t.length; r < s; r += 1)
    i.duplicates.push(n[t[r]]);
  i.usedDuplicates = new Array(s);
}
function Ve(e, i, n) {
  var t, r, s;
  if (e !== null && typeof e == "object")
    if (r = i.indexOf(e), r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (i.push(e), Array.isArray(e))
      for (r = 0, s = e.length; r < s; r += 1)
        Ve(e[r], i, n);
    else
      for (t = Object.keys(e), r = 0, s = t.length; r < s; r += 1)
        Ve(e[t[r]], i, n);
}
function Ct(e, i) {
  i = i || {};
  var n = new st(i);
  n.noRefs || xt(e, n);
  var t = e;
  return n.replacer && (t = n.replacer.call({ "": t }, "", t)), B(n, 0, t, !0, !0) ? n.dump + `
` : "";
}
var At = Ct, yt = {
  dump: At
}, Kn = Ur.load, wt = yt.dump;
function vt(e = "") {
  return e.split(`
`).reduce((n, t) => (n.push({
    label: t,
    value: t
  }), n), []);
}
function bt(e, i) {
  return e.replace("#{cloudflare_worker_sub}", i);
}
function _t(e, i) {
  const n = i === "" ? [] : vt(i);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(n));
}
function St(e, i) {
  return e.replace("'#{DISABLED_BACKEND}'", i ? "true" : "false");
}
const W = {
  PAGE_URL: "https://github.08050611.xyz/https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function Et(e) {
  try {
    const { url: i, lockBackend: n, remoteConfig: t, origin: r } = e, s = await fetch(`${i}?t=${Date.now()}`);
    if (s.status !== 200)
      throw new Error(s.statusText);
    let o = await s.text();
    return o = bt(o, r), o = _t(o, t), o = St(o, n), new Response(o, {
      headers: new Headers({ ...s.headers, "Content-Type": "text/html; charset=utf-8" })
    });
  } catch (i) {
    return new Response(i.message || i);
  }
}
function Ot(e, i = 10) {
  const n = [];
  let t = [];
  return e.forEach((r, s) => {
    t.push(r), (s + 1) % i === 0 && (n.push(t.join("|")), t = []);
  }), t.length > 0 && n.push(t.join("|")), n;
}
const Fe = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function ze(e, i = Fe) {
  const {
    retries: n = Fe.retries,
    retryDelay: t = Fe.retryDelay,
    retryOnStatusCodes: r = Fe.retryOnStatusCodes,
    onError: s,
    ...o
  } = i;
  let l = 0;
  const u = async () => {
    l++;
    try {
      let f, h;
      e instanceof Request ? (h = e.url, f = new Request(e, o)) : (h = e.toString(), f = new Request(h, o));
      const a = await fetch(f), g = {
        status: a.status,
        statusText: a.statusText,
        headers: Object.fromEntries(a.headers.entries()),
        data: a,
        config: { url: h, ...o },
        ok: a.ok
      };
      if (r.includes(g.status) && l <= n) {
        if (s) {
          const p = s(new Error(`请求失败，状态码 ${g.status}`), l);
          p instanceof Promise && await p;
        }
        return await new Promise((p) => setTimeout(p, t)), u();
      }
      return g;
    } catch (f) {
      if (s) {
        const h = s(f, l);
        h instanceof Promise && await h;
      }
      if (l <= n)
        return await new Promise((h) => setTimeout(h, t)), u();
      throw f;
    }
  };
  return u();
}
function qe(e) {
  if (!e) return e;
  const i = atob(e), n = new Uint8Array(i.length);
  for (let t = 0; t < i.length; t++)
    n[t] = i.charCodeAt(t);
  return new TextDecoder().decode(n);
}
function Cn(e) {
  if (!e) return e;
  const i = new TextEncoder().encode(e.trim());
  let n = "";
  for (let t = 0; t < i.length; t += 1)
    n += String.fromCharCode(i[t]);
  return btoa(n);
}
class Tt {
  constructor(i = []) {
    E(this, "existVps", []);
    E(this, "existVpsMap", /* @__PURE__ */ new Map());
    this.existVps = i, this.updateExist(this.existVps);
  }
  updateExist(i = []) {
    for (const n of i) {
      const t = this.getParser(n);
      t && this.setExistVpsMap(t);
    }
  }
  updateVpsPs(i) {
    const n = this.getParser(i);
    if (!n) return null;
    const t = n.originPs, [r, s] = t.split("#");
    if (!s) return i;
    const o = this.existVpsMap.get(s) || 0, l = o === 0 ? t : `${r}#${s} ${o}`;
    return n.updateOriginConfig(l), this.existVpsMap.set(s, o + 1), n.originLink;
  }
  setExistVpsMap(i) {
    const n = i.originPs, [, t] = n.split("#");
    if (!t) return;
    const [r, s] = t.split(" "), o = s ? Number.parseInt(s) >>> 0 : 0, l = this.existVpsMap.get(r) || 0;
    this.existVpsMap.set(r, Math.max(l, o + 1));
  }
  getParser(i) {
    return i.startsWith("vless://") ? new Vn(i) : i.startsWith("vmess://") ? new qn(i) : i.startsWith("trojan://") ? new Wn(i) : i.startsWith("ss://") ? new $n(i) : i.startsWith("hysteria2://") || i.startsWith("hysteria://") || i.startsWith("hy2://") ? new Gn(i) : null;
  }
}
class kt extends Tt {
  constructor(i = []) {
    super(i);
  }
}
var we, ve, be, De;
class ke {
  constructor() {
    A(this, we, ["localhost", "127.0.0.1", "abc.cba.com"]);
    A(this, ve, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    A(this, be, 1024);
    A(this, De, 65535);
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
    return c(this, we)[Math.floor(Math.random() * c(this, we).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (c(this, De) - c(this, be) + 1) + c(this, be)).toString();
  }
  /**
   * @description 获取随机 SS协议的加密类型
   */
  getEncrtptionProtocol() {
    return c(this, ve)[Math.floor(Math.random() * c(this, ve).length)];
  }
}
we = new WeakMap(), ve = new WeakMap(), be = new WeakMap(), De = new WeakMap();
var V, q;
const L = class L {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(i) {
    const n = i.split(c(L, V));
    return [n[0], n[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(i, n) {
    return [i, n].join(c(L, V));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(i) {
    if (!(i != null && i.includes(c(L, V)))) return null;
    if (c(L, q).has(i))
      return c(L, q).get(i);
    const [n] = L.getPs(i);
    if (n) {
      const t = n.trim();
      return c(L, q).set(i, t), t;
    }
    return null;
  }
  static isConfigType(i) {
    return i.includes(c(this, V));
  }
  // 清除缓存
  static clearCache() {
    c(this, q).clear();
  }
};
V = new WeakMap(), q = new WeakMap(), A(L, V, "^LINK_TO^"), A(L, q, /* @__PURE__ */ new Map());
let O = L;
var Q, _e, H, N, X, fe;
class Gn extends ke {
  constructor(n) {
    super();
    /** * @description 原始链接 */
    A(this, Q, "");
    /** * @description 混淆链接 */
    A(this, _e, "");
    /** * @description vps原始配置 */
    A(this, H, {});
    /** * @description 混淆配置 */
    A(this, N, {});
    /** * @description 原始备注 */
    A(this, X, "");
    /** * @description 混淆备注 */
    A(this, fe, "");
    m(this, fe, crypto.randomUUID()), this.setOriginConfig(n), this.setConfuseConfig(n);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(n) {
    m(this, Q, n), m(this, H, new URL(n)), m(this, X, c(this, H).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(n) {
    c(this, H).hash = n, m(this, X, n), m(this, Q, c(this, H).href), this.setConfuseConfig(c(this, Q));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(n) {
    m(this, N, new URL(n)), c(this, N).username = this.getUsername(), c(this, N).host = this.getHost(), c(this, N).hostname = this.getHostName(), c(this, N).port = this.getPort(), c(this, N).hash = O.setPs(c(this, X), c(this, fe)), m(this, _e, c(this, N).href);
  }
  restoreClash(n, t) {
    var r;
    return n.name = t, n.server = this.originConfig.hostname ?? "", n.port = Number(this.originConfig.port ?? 0), n.password = ((r = this.originConfig) == null ? void 0 : r.username) ?? "", n;
  }
  restoreSingbox(n, t) {
    var r;
    return n.password = ((r = this.originConfig) == null ? void 0 : r.username) ?? "", n.server = this.originConfig.hostname ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.tag = t, n;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return c(this, X);
  }
  /**
   * @description 原始链接
   * @example 'trojan://...'
   */
  get originLink() {
    return c(this, Q);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, H);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return encodeURIComponent(c(this, fe));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return c(this, _e);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, N);
  }
}
Q = new WeakMap(), _e = new WeakMap(), H = new WeakMap(), N = new WeakMap(), X = new WeakMap(), fe = new WeakMap();
var J, Se, Y, I, Z, ce;
class $n extends ke {
  constructor(n) {
    super();
    /** * @description 原始链接 */
    A(this, J, "");
    /** * @description 混淆链接 */
    A(this, Se, "");
    /** * @description vps原始配置 */
    A(this, Y, {});
    /** * @description 混淆配置 */
    A(this, I, {});
    /** * @description 原始备注 */
    A(this, Z, "");
    /** * @description 混淆备注 */
    A(this, ce, "");
    m(this, ce, crypto.randomUUID()), this.setOriginConfig(n), this.setConfuseConfig(n);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(n) {
    m(this, J, n), m(this, Y, new URL(n)), m(this, Z, c(this, Y).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(n) {
    c(this, Y).hash = n, m(this, Z, n), m(this, J, c(this, Y).href), this.setConfuseConfig(c(this, J));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(n) {
    m(this, I, new URL(n)), c(this, I).username = this.getUsername(), c(this, I).host = this.getHost(), c(this, I).hostname = this.getHostName(), c(this, I).port = this.getPort(), c(this, I).hash = O.setPs(c(this, Z), c(this, ce)), m(this, Se, c(this, I).href);
  }
  restoreClash(n, t) {
    var r;
    return n.name = t, n.server = this.originConfig.hostname ?? "", n.port = Number(((r = this.originConfig) == null ? void 0 : r.port) ?? 0), n;
  }
  restoreSingbox(n, t) {
    return n.server = this.originConfig.hostname ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.tag = t, n;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return c(this, Z);
  }
  /**
   * @description 原始链接
   * @example 'ss://...'
   */
  get originLink() {
    return c(this, J);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, Y);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return c(this, ce);
  }
  /**
   * @description 混淆链接
   * @example 'ss://...'
   */
  get confuseLink() {
    return c(this, Se);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, I);
  }
}
J = new WeakMap(), Se = new WeakMap(), Y = new WeakMap(), I = new WeakMap(), Z = new WeakMap(), ce = new WeakMap();
var z, Ee, j, P, ee, ae;
class Wn extends ke {
  constructor(n) {
    super();
    /** * @description 原始链接 */
    A(this, z, "");
    /** * @description 混淆链接 */
    A(this, Ee, "");
    /** * @description vps原始配置 */
    A(this, j, {});
    /** * @description 混淆配置 */
    A(this, P, {});
    /** * @description 原始备注 */
    A(this, ee, "");
    /** * @description 混淆备注 */
    A(this, ae, "");
    m(this, ae, crypto.randomUUID()), this.setOriginConfig(n), this.setConfuseConfig(n);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(n) {
    m(this, z, n), m(this, j, new URL(n)), m(this, ee, c(this, j).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(n) {
    c(this, j).hash = n, m(this, ee, n), m(this, z, c(this, j).href), this.setConfuseConfig(c(this, z));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(n) {
    m(this, P, new URL(n)), c(this, P).username = this.getUsername(), c(this, P).host = this.getHost(), c(this, P).hostname = this.getHostName(), c(this, P).port = this.getPort(), c(this, P).hash = O.setPs(c(this, ee), c(this, ae)), m(this, Ee, c(this, P).href);
  }
  restoreClash(n, t) {
    var r;
    return n.name = t, n.server = this.originConfig.hostname ?? "", n.port = Number(this.originConfig.port ?? 0), n.password = ((r = this.originConfig) == null ? void 0 : r.username) ?? "", n;
  }
  restoreSingbox(n, t) {
    var r;
    return n.password = ((r = this.originConfig) == null ? void 0 : r.username) ?? "", n.server = this.originConfig.hostname ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.tag = t, n;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return c(this, ee);
  }
  /**
   * @description 原始链接
   * @example 'trojan://...'
   */
  get originLink() {
    return c(this, z);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, j);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return encodeURIComponent(c(this, ae));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return c(this, Ee);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, P);
  }
}
z = new WeakMap(), Ee = new WeakMap(), j = new WeakMap(), P = new WeakMap(), ee = new WeakMap(), ae = new WeakMap();
var ne, Oe, K, R, ie, he;
class Vn extends ke {
  constructor(n) {
    super();
    /** * @description 原始链接 */
    A(this, ne, "");
    /** * @description 混淆链接 */
    A(this, Oe, "");
    /** * @description vps原始配置 */
    A(this, K, {});
    /** * @description 混淆配置 */
    A(this, R, {});
    /** * @description 原始备注 */
    A(this, ie, "");
    /** * @description 混淆备注 */
    A(this, he, "");
    m(this, he, crypto.randomUUID()), this.setOriginConfig(n), this.setConfuseConfig(n);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(n) {
    m(this, ne, n), m(this, K, new URL(n)), m(this, ie, c(this, K).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(n) {
    c(this, K).hash = n, m(this, ie, n), m(this, ne, c(this, K).href), this.setConfuseConfig(c(this, ne));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(n) {
    m(this, R, new URL(n)), c(this, R).username = this.getUsername(), c(this, R).host = this.getHost(), c(this, R).hostname = this.getHostName(), c(this, R).port = this.getPort(), c(this, R).hash = O.setPs(c(this, ie), c(this, he)), m(this, Oe, c(this, R).href);
  }
  restoreClash(n, t) {
    var r;
    return n.name = t, n.server = this.originConfig.hostname ?? "", n.port = Number(((r = this.originConfig) == null ? void 0 : r.port) ?? 0), n.uuid = this.originConfig.username ?? "", n;
  }
  restoreSingbox(n, t) {
    var r;
    return n.tag = t, n.server = this.originConfig.hostname ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.uuid = this.originConfig.username ?? "", (r = n.tls) != null && r.server_name && (n.tls.server_name = this.originConfig.hostname ?? ""), n;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return c(this, ie);
  }
  /**
   * @description 原始链接
   * @example 'vless://...'
   */
  get originLink() {
    return c(this, ne);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, K);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return c(this, he);
  }
  /**
   * @description 混淆链接
   * @example 'vless://...'
   */
  get confuseLink() {
    return c(this, Oe);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, R);
  }
}
ne = new WeakMap(), Oe = new WeakMap(), K = new WeakMap(), R = new WeakMap(), ie = new WeakMap(), he = new WeakMap();
var pe, Te, U, D, re, ge, Me, Qn;
class qn extends ke {
  constructor(n) {
    super();
    A(this, Me);
    /** * @description 原始链接 */
    A(this, pe, "");
    /** * @description 混淆链接 */
    A(this, Te, "");
    /** * @description vps原始配置 */
    A(this, U, {});
    /** * @description 混淆配置 */
    A(this, D, {});
    /** * @description 原始备注 */
    A(this, re, "");
    /** * @description 混淆备注 */
    A(this, ge, "");
    m(this, ge, crypto.randomUUID()), this.setOriginConfig(n), this.setConfuseConfig();
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(n) {
    const [t, r] = n.match(/vmess:\/\/(.*)/) || [];
    m(this, pe, n), m(this, U, JSON.parse(qe(r))), m(this, re, c(this, U).ps ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(n) {
    c(this, U).ps = n, m(this, re, n), m(this, pe, `vmess://${Cn(JSON.stringify(c(this, U)))}`), this.setConfuseConfig();
  }
  /**
   * @description 设置混淆配置
   */
  setConfuseConfig() {
    m(this, D, structuredClone(c(this, U))), c(this, D).add = this.getHostName(), c(this, D).port = this.getPort(), c(this, D).id = this.getPassword(), c(this, D).ps = O.setPs(c(this, re), c(this, ge)), m(this, Te, `vmess://${Cn(JSON.stringify(c(this, D)))}`);
  }
  restoreClash(n, t) {
    var r, s;
    return nn(this, Me, Qn).call(this, n), n.name = t, n.server = this.originConfig.add ?? "", n.port = Number(((r = this.originConfig) == null ? void 0 : r.port) ?? 0), n.uuid = ((s = this.originConfig) == null ? void 0 : s.id) ?? "", n;
  }
  restoreSingbox(n, t) {
    var r, s;
    return n.server = this.originConfig.add ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.tag = t, (r = n.tls) != null && r.server_name && (n.tls.server_name = this.originConfig.add ?? ""), n.uuid = ((s = this.originConfig) == null ? void 0 : s.id) ?? "", n;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return c(this, re);
  }
  /**
   * @description 原始链接
   * @example 'vmess://...'
   */
  get originLink() {
    return c(this, pe);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, U);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return c(this, ge);
  }
  /**
   * @description 混淆链接
   * @example 'vmess://...'
   */
  get confuseLink() {
    return c(this, Te);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, D);
  }
}
pe = new WeakMap(), Te = new WeakMap(), U = new WeakMap(), D = new WeakMap(), re = new WeakMap(), ge = new WeakMap(), Me = new WeakSet(), Qn = function(n) {
  n.network === "ws" && (n["ws-opts"] = {
    ...n["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...n["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
class Ft extends kt {
  constructor(n, t = []) {
    super(t);
    E(this, "urlSet", /* @__PURE__ */ new Set());
    E(this, "vpsStore", /* @__PURE__ */ new Map());
    E(this, "originUrls", /* @__PURE__ */ new Set());
    E(this, "vps", []);
    this.vps = n;
  }
  async parse(n = this.vps) {
    for await (const t of n) {
      const r = this.updateVpsPs(t);
      if (r) {
        let s = null;
        r.startsWith("vless://") ? s = new Vn(r) : r.startsWith("vmess://") ? s = new qn(r) : r.startsWith("trojan://") ? s = new Wn(r) : r.startsWith("ss://") ? s = new $n(r) : this.isHysteria2(r) && (s = new Gn(r)), s && this.setStore(r, s);
      }
      if (t.startsWith("https://") || t.startsWith("http://")) {
        const s = await ze(t, { retries: 3 }).then((l) => l.data.text());
        if (this.getSubType(s) === "base64") {
          this.updateExist(Array.from(this.originUrls));
          const l = qe(s);
          await this.parse(l.split(`
`).filter(Boolean));
        }
      }
    }
  }
  setStore(n, t) {
    this.urlSet.add(t.confuseLink), this.originUrls.add(n), this.vpsStore.set(t.confusePs, t);
  }
  getSubType(n) {
    try {
      return qe(n), "base64";
    } catch {
      try {
        return Kn(n), "yaml";
      } catch {
        try {
          return JSON.parse(n), "json";
        } catch {
          return "unknown";
        }
      }
    }
  }
  isHysteria2(n) {
    return n.startsWith("hysteria2://") || n.startsWith("hysteria://") || n.startsWith("hy2://");
  }
  get urls() {
    return Array.from(this.urlSet);
  }
  get vpsMap() {
    return this.vpsStore;
  }
}
let Lt = class {
  async getConfig(i) {
    try {
      const n = await Promise.all(i.map((t) => ze(t, { retries: 3 }).then((r) => r.data.text())));
      return this.setClashConfig(n);
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
  setClashConfig(i) {
    const n = i.map((t) => Kn(t));
    return this.mergeClashConfig(n);
  }
  /**
   * @description 合并配置
   * @param {ClashType[]} configs
   * @returns {ClashType} mergedConfig
   */
  mergeClashConfig(i = []) {
    var f, h, a, g;
    if (!i.length)
      return {};
    const n = structuredClone(i[0]);
    if (i.length === 1)
      return n;
    const t = {
      ...n,
      proxies: n.proxies || [],
      "proxy-groups": n["proxy-groups"] || []
    }, r = i.reduce((p, x) => {
      var C;
      return p + (((C = x.proxies) == null ? void 0 : C.length) || 0);
    }, 0), s = new Int32Array(r), o = new Set((f = n.proxies) == null ? void 0 : f.map((p) => p.name));
    let l = ((h = n.proxies) == null ? void 0 : h.length) || 0;
    const u = new Map(t["proxy-groups"].map((p) => [p.name, p]));
    for (let p = 1; p < i.length; p++) {
      const x = i[p];
      if ((a = x.proxies) != null && a.length)
        for (const C of x.proxies)
          o.has(C.name) || (t.proxies[l] = C, s[l] = l, o.add(C.name), l++);
      if ((g = x["proxy-groups"]) != null && g.length)
        for (const C of x["proxy-groups"]) {
          const w = u.get(C.name);
          if (w) {
            const T = new Set(w.proxies);
            for (const y of C.proxies || [])
              T.add(y);
            w.proxies = Array.from(T), Object.assign(w, {
              ...C,
              proxies: w.proxies
            });
          } else
            t["proxy-groups"].push(C), u.set(C.name, C);
        }
    }
    return t.proxies = t.proxies.filter((p, x) => s[x] !== -1), t;
  }
}, Nt = class {
  async getConfig(i) {
    try {
      const n = await Promise.all(
        i.map((t) => ze(t, { retries: 3 }).then((r) => r.data.json()))
      );
      return this.mergeConfig(n);
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
  mergeConfig(i) {
    var o, l;
    if (i.length === 0)
      return {};
    const n = structuredClone(i[0]), t = [], r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
    for (const u of i)
      if ((o = u.outbounds) != null && o.length) {
        for (const f of u.outbounds)
          if (f.outbounds) {
            const h = `${f.type}:${f.tag}`;
            if (!s.has(h)) {
              const a = new Set(f.outbounds.filter((g) => !O.isConfigType(g)));
              s.set(h, {
                base: f,
                baseOutbounds: a,
                linkOutbounds: /* @__PURE__ */ new Set()
              });
            }
            f.outbounds.forEach((a) => {
              var g;
              O.isConfigType(a) && ((g = s.get(h)) == null || g.linkOutbounds.add(a));
            });
          }
      }
    for (const u of i)
      if ((l = u.outbounds) != null && l.length) {
        for (const f of u.outbounds)
          if (!f.outbounds)
            if (O.isConfigType(f.tag))
              t.push(f);
            else {
              const h = `${f.type}:${f.tag}`;
              r.has(h) || (r.add(h), t.push(f));
            }
      }
    for (const [u, f] of s) {
      const h = { ...f.base }, a = /* @__PURE__ */ new Set([...f.baseOutbounds, ...f.linkOutbounds]);
      h.outbounds = Array.from(a), t.push(h);
    }
    return n.outbounds = t, n;
  }
};
class It {
  constructor(i) {
    E(this, "urls", []);
    E(this, "chunkCount", Number(W.CHUNK_COUNT));
    E(this, "backend", W.BACKEND);
    E(this, "parser", null);
    E(this, "clashClient", new Lt());
    E(this, "singboxClient", new Nt());
    this.chunkCount = Number(i.CHUNK_COUNT ?? W.CHUNK_COUNT), this.backend = i.BACKEND ?? W.BACKEND, this.parser = null;
  }
  async setSubUrls(i) {
    const { searchParams: n } = new URL(i.url), r = n.get("url").split(/\||\n/).filter(Boolean);
    this.parser = new Ft(r), await this.parser.parse(r);
    const s = Ot(Array.from(this.parser.urls), Number(this.chunkCount));
    this.urls = s.map((o) => {
      const l = new URL(`${this.backend}/sub`), { searchParams: u } = new URL(i.url);
      return u.set("url", o), l.search = u.toString(), l.toString();
    });
  }
  async getClashConfig() {
    return await this.clashClient.getConfig(this.urls);
  }
  async getSingboxConfig() {
    return await this.singboxClient.getConfig(this.urls);
  }
  get vpsStore() {
    var i;
    return (i = this.parser) == null ? void 0 : i.vpsMap;
  }
}
class Pt {
  constructor(i) {
    E(this, "confuseConfig");
    this.confuseConfig = i;
  }
  getOriginConfig(i) {
    try {
      return this.confuseConfig.proxies = this.restoreProxies(this.confuseConfig.proxies, i), this.confuseConfig["proxy-groups"] = this.confuseConfig["proxy-groups"].map((n) => (n.proxies && (n.proxies = this.updateProxiesGroups(n.proxies)), n)), this.confuseConfig;
    } catch (n) {
      throw new Error(`Get origin config failed: ${n.message || n}, function trace: ${n.stack}`);
    }
  }
  restoreProxies(i, n) {
    try {
      const t = [];
      for (const r of i) {
        const [s, o] = O.getPs(r.name);
        if (n.has(o)) {
          const l = n.get(o);
          l == null || l.restoreClash(r, s), t.push(r);
        }
      }
      return t;
    } catch (t) {
      throw new Error(`Restore proxies failed: ${t.message || t}, function trace: ${t.stack}`);
    }
  }
  updateProxiesGroups(i) {
    try {
      return i.map((n) => {
        const [t] = O.getPs(n);
        return t;
      });
    } catch (n) {
      throw new Error(`Update proxies groups failed: ${n.message || n}, function trace: ${n.stack}`);
    }
  }
}
class Rt {
  constructor(i) {
    E(this, "confuseConfig");
    this.confuseConfig = i;
  }
  getOriginConfig(i) {
    try {
      return this.confuseConfig.outbounds = this.restoreOutbounds(this.confuseConfig.outbounds, i), this.confuseConfig;
    } catch (n) {
      throw new Error(`Get origin config failed: ${n.message || n}, function trace: ${n.stack}`);
    }
  }
  restoreOutbounds(i = [], n) {
    try {
      const t = [];
      for (const r of i) {
        if (this.isConfuseVps(r.tag)) {
          const [s, o] = O.getPs(r.tag), l = n.get(o);
          l == null || l.restoreSingbox(r, s);
        }
        Reflect.has(r, "outbounds") && (r.outbounds = this.updateOutbouns(r.outbounds)), t.push(r);
      }
      return t;
    } catch (t) {
      throw new Error(`Restore outbounds failed: ${t.message || t}, function trace: ${t.stack}`);
    }
  }
  updateOutbouns(i = []) {
    try {
      return i.map((n) => {
        if (this.isConfuseVps(n)) {
          const [t] = O.getPs(n);
          return t;
        }
        return n;
      });
    } catch (n) {
      throw new Error(`Update outbounds failed: ${n.message || n}, function trace: ${n.stack}`);
    }
  }
  isConfuseVps(i) {
    return O.isConfigType(i);
  }
}
class Dt {
  constructor(i) {
    this.confuse = i, this.confuse = i;
  }
  async getClashConfig() {
    const i = await this.confuse.getClashConfig();
    return new Pt(i).getOriginConfig(this.confuse.vpsStore);
  }
  async getSingboxConfig() {
    const i = await this.confuse.getSingboxConfig();
    return new Rt(i).getOriginConfig(this.confuse.vpsStore);
  }
}
const Ht = {
  async fetch(e, i) {
    try {
      const { pathname: n, origin: t } = new URL(e.url);
      if (n === "/sub") {
        const r = new It(i);
        await r.setSubUrls(e);
        const s = new URL(e.url).searchParams.get("target");
        if (!s)
          return new Response("Unsupported client type", { status: 400 });
        const o = new Dt(r);
        if (["clash", "clashr"].includes(s)) {
          const l = await o.getClashConfig();
          return new Response(wt(l, { indent: 2, lineWidth: 200 }), {
            headers: new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        if (s === "singbox") {
          const l = await o.getSingboxConfig();
          return new Response(JSON.stringify(l), {
            headers: new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        return new Response("Unsupported client type, support list: clash, clashr", { status: 400 });
      }
      return Et({
        url: i.PAGE_URL ?? W.PAGE_URL,
        lockBackend: i.LOCK_BACKEND ?? W.LOCK_BACKEND,
        remoteConfig: i.REMOTE_CONFIG ?? W.REMOTE_CONFIG,
        origin: t
      });
    } catch (n) {
      return new Response(n.message || n);
    }
  }
};
export {
  Ht as default
};
