var li = Object.defineProperty;
var ln = (e) => {
  throw TypeError(e);
};
var ui = (e, n, i) => n in e ? li(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[n] = i;
var $ = (e, n, i) => ui(e, typeof n != "symbol" ? n + "" : n, i), Ke = (e, n, i) => n.has(e) || ln("Cannot " + i);
var a = (e, n, i) => (Ke(e, n, "read from private field"), i ? i.call(e) : n.get(e)), C = (e, n, i) => n.has(e) ? ln("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i), A = (e, n, i, r) => (Ke(e, n, "write to private field"), r ? r.call(e, i) : n.set(e, i), i), P = (e, n, i) => (Ke(e, n, "access private method"), i);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function bn(e) {
  return typeof e > "u" || e === null;
}
function si(e) {
  return typeof e == "object" && e !== null;
}
function fi(e) {
  return Array.isArray(e) ? e : bn(e) ? [] : [e];
}
function ci(e, n) {
  var i, r, o, l;
  if (n)
    for (l = Object.keys(n), i = 0, r = l.length; i < r; i += 1)
      o = l[i], e[o] = n[o];
  return e;
}
function ai(e, n) {
  var i = "", r;
  for (r = 0; r < n; r += 1)
    i += e;
  return i;
}
function hi(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var pi = bn, gi = si, di = fi, mi = ai, xi = hi, Ci = ci, b = {
  isNothing: pi,
  isObject: gi,
  toArray: di,
  repeat: mi,
  isNegativeZero: xi,
  extend: Ci
};
function _n(e, n) {
  var i = "", r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (i += 'in "' + e.mark.name + '" '), i += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (i += `

` + e.mark.snippet), r + " " + i) : r;
}
function Ce(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = _n(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ce.prototype = Object.create(Error.prototype);
Ce.prototype.constructor = Ce;
Ce.prototype.toString = function(n) {
  return this.name + ": " + _n(this, n);
};
var O = Ce;
function Ge(e, n, i, r, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return r - n > u && (l = " ... ", n = r - u + l.length), i - r > u && (t = " ...", i = r + u - t.length), {
    str: l + e.slice(n, i).replace(/\t/g, "→") + t,
    pos: r - n + l.length
    // relative position
  };
}
function $e(e, n) {
  return b.repeat(" ", n - e.length) + e;
}
function Ai(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], o = [], l, t = -1; l = i.exec(e.buffer); )
    o.push(l.index), r.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = r.length - 2);
  t < 0 && (t = r.length - 1);
  var u = "", s, f, h = Math.min(e.line + n.linesAfter, o.length).toString().length, c = n.maxLength - (n.indent + h + 3);
  for (s = 1; s <= n.linesBefore && !(t - s < 0); s++)
    f = Ge(
      e.buffer,
      r[t - s],
      o[t - s],
      e.position - (r[t] - r[t - s]),
      c
    ), u = b.repeat(" ", n.indent) + $e((e.line - s + 1).toString(), h) + " | " + f.str + `
` + u;
  for (f = Ge(e.buffer, r[t], o[t], e.position, c), u += b.repeat(" ", n.indent) + $e((e.line + 1).toString(), h) + " | " + f.str + `
`, u += b.repeat("-", n.indent + h + 3 + f.pos) + `^
`, s = 1; s <= n.linesAfter && !(t + s >= o.length); s++)
    f = Ge(
      e.buffer,
      r[t + s],
      o[t + s],
      e.position - (r[t] - r[t + s]),
      c
    ), u += b.repeat(" ", n.indent) + $e((e.line + s + 1).toString(), h) + " | " + f.str + `
`;
  return u.replace(/\n$/, "");
}
var vi = Ai, yi = [
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
], wi = [
  "scalar",
  "sequence",
  "mapping"
];
function bi(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(i) {
    e[i].forEach(function(r) {
      n[String(r)] = i;
    });
  }), n;
}
function _i(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(i) {
    if (yi.indexOf(i) === -1)
      throw new O('Unknown option "' + i + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(i) {
    return i;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = bi(n.styleAliases || null), wi.indexOf(this.kind) === -1)
    throw new O('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = _i;
function un(e, n) {
  var i = [];
  return e[n].forEach(function(r) {
    var o = i.length;
    i.forEach(function(l, t) {
      l.tag === r.tag && l.kind === r.kind && l.multi === r.multi && (o = t);
    }), i[o] = r;
  }), i;
}
function Ei() {
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
  }, n, i;
  function r(o) {
    o.multi ? (e.multi[o.kind].push(o), e.multi.fallback.push(o)) : e[o.kind][o.tag] = e.fallback[o.tag] = o;
  }
  for (n = 0, i = arguments.length; n < i; n += 1)
    arguments[n].forEach(r);
  return e;
}
function Ve(e) {
  return this.extend(e);
}
Ve.prototype.extend = function(n) {
  var i = [], r = [];
  if (n instanceof _)
    r.push(n);
  else if (Array.isArray(n))
    r = r.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (i = i.concat(n.implicit)), n.explicit && (r = r.concat(n.explicit));
  else
    throw new O("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(l) {
    if (!(l instanceof _))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new O("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new O("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(l) {
    if (!(l instanceof _))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(Ve.prototype);
  return o.implicit = (this.implicit || []).concat(i), o.explicit = (this.explicit || []).concat(r), o.compiledImplicit = un(o, "implicit"), o.compiledExplicit = un(o, "explicit"), o.compiledTypeMap = Ei(o.compiledImplicit, o.compiledExplicit), o;
};
var Si = Ve, Oi = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Ti = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), ki = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Fi = new Si({
  explicit: [
    Oi,
    Ti,
    ki
  ]
});
function Li(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Ni() {
  return null;
}
function Ii(e) {
  return e === null;
}
var Pi = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Li,
  construct: Ni,
  predicate: Ii,
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
function Ri(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Di(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Mi(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Ui = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Ri,
  construct: Di,
  predicate: Mi,
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
function Bi(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Hi(e) {
  return 48 <= e && e <= 55;
}
function Yi(e) {
  return 48 <= e && e <= 57;
}
function ji(e) {
  if (e === null) return !1;
  var n = e.length, i = 0, r = !1, o;
  if (!n) return !1;
  if (o = e[i], (o === "-" || o === "+") && (o = e[++i]), o === "0") {
    if (i + 1 === n) return !0;
    if (o = e[++i], o === "b") {
      for (i++; i < n; i++)
        if (o = e[i], o !== "_") {
          if (o !== "0" && o !== "1") return !1;
          r = !0;
        }
      return r && o !== "_";
    }
    if (o === "x") {
      for (i++; i < n; i++)
        if (o = e[i], o !== "_") {
          if (!Bi(e.charCodeAt(i))) return !1;
          r = !0;
        }
      return r && o !== "_";
    }
    if (o === "o") {
      for (i++; i < n; i++)
        if (o = e[i], o !== "_") {
          if (!Hi(e.charCodeAt(i))) return !1;
          r = !0;
        }
      return r && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; i < n; i++)
    if (o = e[i], o !== "_") {
      if (!Yi(e.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || o === "_");
}
function Ki(e) {
  var n = e, i = 1, r;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), r = n[0], (r === "-" || r === "+") && (r === "-" && (i = -1), n = n.slice(1), r = n[0]), n === "0") return 0;
  if (r === "0") {
    if (n[1] === "b") return i * parseInt(n.slice(2), 2);
    if (n[1] === "x") return i * parseInt(n.slice(2), 16);
    if (n[1] === "o") return i * parseInt(n.slice(2), 8);
  }
  return i * parseInt(n, 10);
}
function Gi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !b.isNegativeZero(e);
}
var $i = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: ji,
  construct: Ki,
  predicate: Gi,
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
}), Wi = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Vi(e) {
  return !(e === null || !Wi.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function qi(e) {
  var n, i;
  return n = e.replace(/_/g, "").toLowerCase(), i = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : i * parseFloat(n, 10);
}
var Qi = /^[-+]?[0-9]+e/;
function Xi(e, n) {
  var i;
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
  return i = e.toString(10), Qi.test(i) ? i.replace("e", ".e") : i;
}
function Ji(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || b.isNegativeZero(e));
}
var Zi = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Vi,
  construct: qi,
  predicate: Ji,
  represent: Xi,
  defaultStyle: "lowercase"
}), zi = Fi.extend({
  implicit: [
    Pi,
    Ui,
    $i,
    Zi
  ]
}), er = zi, En = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Sn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function nr(e) {
  return e === null ? !1 : En.exec(e) !== null || Sn.exec(e) !== null;
}
function ir(e) {
  var n, i, r, o, l, t, u, s = 0, f = null, h, c, g;
  if (n = En.exec(e), n === null && (n = Sn.exec(e)), n === null) throw new Error("Date resolve error");
  if (i = +n[1], r = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(i, r, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (s = n[7].slice(0, 3); s.length < 3; )
      s += "0";
    s = +s;
  }
  return n[9] && (h = +n[10], c = +(n[11] || 0), f = (h * 60 + c) * 6e4, n[9] === "-" && (f = -f)), g = new Date(Date.UTC(i, r, o, l, t, u, s)), f && g.setTime(g.getTime() - f), g;
}
function rr(e) {
  return e.toISOString();
}
var or = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: nr,
  construct: ir,
  instanceOf: Date,
  represent: rr
});
function tr(e) {
  return e === "<<" || e === null;
}
var lr = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: tr
}), en = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function ur(e) {
  if (e === null) return !1;
  var n, i, r = 0, o = e.length, l = en;
  for (i = 0; i < o; i++)
    if (n = l.indexOf(e.charAt(i)), !(n > 64)) {
      if (n < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function sr(e) {
  var n, i, r = e.replace(/[\r\n=]/g, ""), o = r.length, l = en, t = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)), t = t << 6 | l.indexOf(r.charAt(n));
  return i = o % 4 * 6, i === 0 ? (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)) : i === 18 ? (u.push(t >> 10 & 255), u.push(t >> 2 & 255)) : i === 12 && u.push(t >> 4 & 255), new Uint8Array(u);
}
function fr(e) {
  var n = "", i = 0, r, o, l = e.length, t = en;
  for (r = 0; r < l; r++)
    r % 3 === 0 && r && (n += t[i >> 18 & 63], n += t[i >> 12 & 63], n += t[i >> 6 & 63], n += t[i & 63]), i = (i << 8) + e[r];
  return o = l % 3, o === 0 ? (n += t[i >> 18 & 63], n += t[i >> 12 & 63], n += t[i >> 6 & 63], n += t[i & 63]) : o === 2 ? (n += t[i >> 10 & 63], n += t[i >> 4 & 63], n += t[i << 2 & 63], n += t[64]) : o === 1 && (n += t[i >> 2 & 63], n += t[i << 4 & 63], n += t[64], n += t[64]), n;
}
function cr(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var ar = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: ur,
  construct: sr,
  predicate: cr,
  represent: fr
}), hr = Object.prototype.hasOwnProperty, pr = Object.prototype.toString;
function gr(e) {
  if (e === null) return !0;
  var n = [], i, r, o, l, t, u = e;
  for (i = 0, r = u.length; i < r; i += 1) {
    if (o = u[i], t = !1, pr.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (hr.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function dr(e) {
  return e !== null ? e : [];
}
var mr = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: gr,
  construct: dr
}), xr = Object.prototype.toString;
function Cr(e) {
  if (e === null) return !0;
  var n, i, r, o, l, t = e;
  for (l = new Array(t.length), n = 0, i = t.length; n < i; n += 1) {
    if (r = t[n], xr.call(r) !== "[object Object]" || (o = Object.keys(r), o.length !== 1)) return !1;
    l[n] = [o[0], r[o[0]]];
  }
  return !0;
}
function Ar(e) {
  if (e === null) return [];
  var n, i, r, o, l, t = e;
  for (l = new Array(t.length), n = 0, i = t.length; n < i; n += 1)
    r = t[n], o = Object.keys(r), l[n] = [o[0], r[o[0]]];
  return l;
}
var vr = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Cr,
  construct: Ar
}), yr = Object.prototype.hasOwnProperty;
function wr(e) {
  if (e === null) return !0;
  var n, i = e;
  for (n in i)
    if (yr.call(i, n) && i[n] !== null)
      return !1;
  return !0;
}
function br(e) {
  return e !== null ? e : {};
}
var _r = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: wr,
  construct: br
}), On = er.extend({
  implicit: [
    or,
    lr
  ],
  explicit: [
    ar,
    mr,
    vr,
    _r
  ]
}), G = Object.prototype.hasOwnProperty, Ne = 1, Tn = 2, kn = 3, Ie = 4, We = 1, Er = 2, sn = 3, Sr = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Or = /[\x85\u2028\u2029]/, Tr = /[,\[\]\{\}]/, Fn = /^(?:!|!!|![a-z\-]+!)$/i, Ln = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function fn(e) {
  return Object.prototype.toString.call(e);
}
function D(e) {
  return e === 10 || e === 13;
}
function ne(e) {
  return e === 9 || e === 32;
}
function T(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function oe(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function kr(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function Fr(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Lr(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function cn(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Nr(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Nn = new Array(256), In = new Array(256);
for (var ie = 0; ie < 256; ie++)
  Nn[ie] = cn(ie) ? 1 : 0, In[ie] = cn(ie);
function Ir(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || On, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Pn(e, n) {
  var i = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return i.snippet = vi(i), new O(n, i);
}
function d(e, n) {
  throw Pn(e, n);
}
function Pe(e, n) {
  e.onWarning && e.onWarning.call(null, Pn(e, n));
}
var an = {
  YAML: function(n, i, r) {
    var o, l, t;
    n.version !== null && d(n, "duplication of %YAML directive"), r.length !== 1 && d(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), o === null && d(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && d(n, "unacceptable YAML version of the document"), n.version = r[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && Pe(n, "unsupported YAML version of the document");
  },
  TAG: function(n, i, r) {
    var o, l;
    r.length !== 2 && d(n, "TAG directive accepts exactly two arguments"), o = r[0], l = r[1], Fn.test(o) || d(n, "ill-formed tag handle (first argument) of the TAG directive"), G.call(n.tagMap, o) && d(n, 'there is a previously declared suffix for "' + o + '" tag handle'), Ln.test(l) || d(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      d(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[o] = l;
  }
};
function K(e, n, i, r) {
  var o, l, t, u;
  if (n < i) {
    if (u = e.input.slice(n, i), r)
      for (o = 0, l = u.length; o < l; o += 1)
        t = u.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || d(e, "expected valid JSON character");
    else Sr.test(u) && d(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function hn(e, n, i, r) {
  var o, l, t, u;
  for (b.isObject(i) || d(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(i), t = 0, u = o.length; t < u; t += 1)
    l = o[t], G.call(n, l) || (n[l] = i[l], r[l] = !0);
}
function te(e, n, i, r, o, l, t, u, s) {
  var f, h;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), f = 0, h = o.length; f < h; f += 1)
      Array.isArray(o[f]) && d(e, "nested arrays are not supported inside keys"), typeof o == "object" && fn(o[f]) === "[object Object]" && (o[f] = "[object Object]");
  if (typeof o == "object" && fn(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (f = 0, h = l.length; f < h; f += 1)
        hn(e, n, l[f], i);
    else
      hn(e, n, l, i);
  else
    !e.json && !G.call(i, o) && G.call(n, o) && (e.line = t || e.line, e.lineStart = u || e.lineStart, e.position = s || e.position, d(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete i[o];
  return n;
}
function nn(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : d(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function w(e, n, i) {
  for (var r = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; ne(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (n && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (D(o))
      for (nn(e), o = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && e.lineIndent < i && Pe(e, "deficient indentation"), r;
}
function Ye(e) {
  var n = e.position, i;
  return i = e.input.charCodeAt(n), !!((i === 45 || i === 46) && i === e.input.charCodeAt(n + 1) && i === e.input.charCodeAt(n + 2) && (n += 3, i = e.input.charCodeAt(n), i === 0 || T(i)));
}
function rn(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += b.repeat(`
`, n - 1));
}
function Pr(e, n, i) {
  var r, o, l, t, u, s, f, h, c = e.kind, g = e.result, p;
  if (p = e.input.charCodeAt(e.position), T(p) || oe(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (o = e.input.charCodeAt(e.position + 1), T(o) || i && oe(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, u = !1; p !== 0; ) {
    if (p === 58) {
      if (o = e.input.charCodeAt(e.position + 1), T(o) || i && oe(o))
        break;
    } else if (p === 35) {
      if (r = e.input.charCodeAt(e.position - 1), T(r))
        break;
    } else {
      if (e.position === e.lineStart && Ye(e) || i && oe(p))
        break;
      if (D(p))
        if (s = e.line, f = e.lineStart, h = e.lineIndent, w(e, !1, -1), e.lineIndent >= n) {
          u = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = s, e.lineStart = f, e.lineIndent = h;
          break;
        }
    }
    u && (K(e, l, t, !1), rn(e, e.line - s), l = t = e.position, u = !1), ne(p) || (t = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return K(e, l, t, !1), e.result ? !0 : (e.kind = c, e.result = g, !1);
}
function Rr(e, n) {
  var i, r, o;
  if (i = e.input.charCodeAt(e.position), i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = o = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (K(e, r, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        r = e.position, e.position++, o = e.position;
      else
        return !0;
    else D(i) ? (K(e, r, o, !0), rn(e, w(e, !1, n)), r = o = e.position) : e.position === e.lineStart && Ye(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
function Dr(e, n) {
  var i, r, o, l, t, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = r = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return K(e, i, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (K(e, i, e.position, !0), u = e.input.charCodeAt(++e.position), D(u))
        w(e, !1, n);
      else if (u < 256 && Nn[u])
        e.result += In[u], e.position++;
      else if ((t = Fr(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = kr(u)) >= 0 ? l = (l << 4) + t : d(e, "expected hexadecimal character");
        e.result += Nr(l), e.position++;
      } else
        d(e, "unknown escape sequence");
      i = r = e.position;
    } else D(u) ? (K(e, i, r, !0), rn(e, w(e, !1, n)), i = r = e.position) : e.position === e.lineStart && Ye(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function Mr(e, n) {
  var i = !0, r, o, l, t = e.tag, u, s = e.anchor, f, h, c, g, p, m = /* @__PURE__ */ Object.create(null), x, y, S, v;
  if (v = e.input.charCodeAt(e.position), v === 91)
    h = 93, p = !1, u = [];
  else if (v === 123)
    h = 125, p = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), v = e.input.charCodeAt(++e.position); v !== 0; ) {
    if (w(e, !0, n), v = e.input.charCodeAt(e.position), v === h)
      return e.position++, e.tag = t, e.anchor = s, e.kind = p ? "mapping" : "sequence", e.result = u, !0;
    i ? v === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), y = x = S = null, c = g = !1, v === 63 && (f = e.input.charCodeAt(e.position + 1), T(f) && (c = g = !0, e.position++, w(e, !0, n))), r = e.line, o = e.lineStart, l = e.position, pe(e, n, Ne, !1, !0), y = e.tag, x = e.result, w(e, !0, n), v = e.input.charCodeAt(e.position), (g || e.line === r) && v === 58 && (c = !0, v = e.input.charCodeAt(++e.position), w(e, !0, n), pe(e, n, Ne, !1, !0), S = e.result), p ? te(e, u, m, y, x, S, r, o, l) : c ? u.push(te(e, null, m, y, x, S, r, o, l)) : u.push(x), w(e, !0, n), v = e.input.charCodeAt(e.position), v === 44 ? (i = !0, v = e.input.charCodeAt(++e.position)) : i = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function Ur(e, n) {
  var i, r, o = We, l = !1, t = !1, u = n, s = 0, f = !1, h, c;
  if (c = e.input.charCodeAt(e.position), c === 124)
    r = !1;
  else if (c === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      We === o ? o = c === 43 ? sn : Er : d(e, "repeat of a chomping mode identifier");
    else if ((h = Lr(c)) >= 0)
      h === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? d(e, "repeat of an indentation width identifier") : (u = n + h - 1, t = !0);
    else
      break;
  if (ne(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (ne(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!D(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (nn(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), D(c)) {
      s++;
      continue;
    }
    if (e.lineIndent < u) {
      o === sn ? e.result += b.repeat(`
`, l ? 1 + s : s) : o === We && l && (e.result += `
`);
      break;
    }
    for (r ? ne(c) ? (f = !0, e.result += b.repeat(`
`, l ? 1 + s : s)) : f ? (f = !1, e.result += b.repeat(`
`, s + 1)) : s === 0 ? l && (e.result += " ") : e.result += b.repeat(`
`, s) : e.result += b.repeat(`
`, l ? 1 + s : s), l = !0, t = !0, s = 0, i = e.position; !D(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    K(e, i, e.position, !1);
  }
  return !0;
}
function pn(e, n) {
  var i, r = e.tag, o = e.anchor, l = [], t, u = !1, s;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), s = e.input.charCodeAt(e.position); s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(s !== 45 || (t = e.input.charCodeAt(e.position + 1), !T(t)))); ) {
    if (u = !0, e.position++, w(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    if (i = e.line, pe(e, n, kn, !1, !0), l.push(e.result), w(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === i || e.lineIndent > n) && s !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = r, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function Br(e, n, i) {
  var r, o, l, t, u, s, f = e.tag, h = e.anchor, c = {}, g = /* @__PURE__ */ Object.create(null), p = null, m = null, x = null, y = !1, S = !1, v;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), v = e.input.charCodeAt(e.position); v !== 0; ) {
    if (!y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), r = e.input.charCodeAt(e.position + 1), l = e.line, (v === 63 || v === 58) && T(r))
      v === 63 ? (y && (te(e, c, g, p, m, null, t, u, s), p = m = x = null), S = !0, y = !0, o = !0) : y ? (y = !1, o = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, v = r;
    else {
      if (t = e.line, u = e.lineStart, s = e.position, !pe(e, i, Tn, !1, !0))
        break;
      if (e.line === l) {
        for (v = e.input.charCodeAt(e.position); ne(v); )
          v = e.input.charCodeAt(++e.position);
        if (v === 58)
          v = e.input.charCodeAt(++e.position), T(v) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && (te(e, c, g, p, m, null, t, u, s), p = m = x = null), S = !0, y = !1, o = !1, p = e.tag, m = e.result;
        else if (S)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = h, !0;
      } else if (S)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = h, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (y && (t = e.line, u = e.lineStart, s = e.position), pe(e, n, Ie, !0, o) && (y ? m = e.result : x = e.result), y || (te(e, c, g, p, m, x, t, u, s), p = m = x = null), w(e, !0, -1), v = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && v !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return y && te(e, c, g, p, m, null, t, u, s), S && (e.tag = f, e.anchor = h, e.kind = "mapping", e.result = c), S;
}
function Hr(e) {
  var n, i = !1, r = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (i = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (r = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, i) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !T(t); )
      t === 33 && (r ? d(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), Fn.test(o) || d(e, "named tag handle cannot contain such characters"), r = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Tr.test(l) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !Ln.test(l) && d(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    d(e, "tag name is malformed: " + l);
  }
  return i ? e.tag = l : G.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : d(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Yr(e) {
  var n, i;
  if (i = e.input.charCodeAt(e.position), i !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !T(i) && !oe(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function jr(e) {
  var n, i, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !T(r) && !oe(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), i = e.input.slice(n, e.position), G.call(e.anchorMap, i) || d(e, 'unidentified alias "' + i + '"'), e.result = e.anchorMap[i], w(e, !0, -1), !0;
}
function pe(e, n, i, r, o) {
  var l, t, u, s = 1, f = !1, h = !1, c, g, p, m, x, y;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = Ie === i || kn === i, r && w(e, !0, -1) && (f = !0, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)), s === 1)
    for (; Hr(e) || Yr(e); )
      w(e, !0, -1) ? (f = !0, u = l, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)) : u = !1;
  if (u && (u = f || o), (s === 1 || Ie === i) && (Ne === i || Tn === i ? x = n : x = n + 1, y = e.position - e.lineStart, s === 1 ? u && (pn(e, y) || Br(e, y, x)) || Mr(e, x) ? h = !0 : (t && Ur(e, x) || Rr(e, x) || Dr(e, x) ? h = !0 : jr(e) ? (h = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : Pr(e, x, Ne === i) && (h = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : s === 0 && (h = u && pn(e, y))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), c = 0, g = e.implicitTypes.length; c < g; c += 1)
      if (m = e.implicitTypes[c], m.resolve(e.result)) {
        e.result = m.construct(e.result), e.tag = m.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (G.call(e.typeMap[e.kind || "fallback"], e.tag))
      m = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (m = null, p = e.typeMap.multi[e.kind || "fallback"], c = 0, g = p.length; c < g; c += 1)
        if (e.tag.slice(0, p[c].tag.length) === p[c].tag) {
          m = p[c];
          break;
        }
    m || d(e, "unknown tag !<" + e.tag + ">"), e.result !== null && m.kind !== e.kind && d(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + m.kind + '", not "' + e.kind + '"'), m.resolve(e.result, e.tag) ? (e.result = m.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : d(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || h;
}
function Kr(e) {
  var n = e.position, i, r, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (w(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), i = e.position; t !== 0 && !T(t); )
      t = e.input.charCodeAt(++e.position);
    for (r = e.input.slice(i, e.position), o = [], r.length < 1 && d(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; ne(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !D(t));
        break;
      }
      if (D(t)) break;
      for (i = e.position; t !== 0 && !T(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(i, e.position));
    }
    t !== 0 && nn(e), G.call(an, r) ? an[r](e, r, o) : Pe(e, 'unknown document directive "' + r + '"');
  }
  if (w(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, w(e, !0, -1)) : l && d(e, "directives end mark is expected"), pe(e, e.lineIndent - 1, Ie, !1, !0), w(e, !0, -1), e.checkLineBreaks && Or.test(e.input.slice(n, e.position)) && Pe(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ye(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, w(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    d(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Rn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var i = new Ir(e, n), r = e.indexOf("\0");
  for (r !== -1 && (i.position = r, d(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    Kr(i);
  return i.documents;
}
function Gr(e, n, i) {
  n !== null && typeof n == "object" && typeof i > "u" && (i = n, n = null);
  var r = Rn(e, i);
  if (typeof n != "function")
    return r;
  for (var o = 0, l = r.length; o < l; o += 1)
    n(r[o]);
}
function $r(e, n) {
  var i = Rn(e, n);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new O("expected a single document in the stream, but found more");
  }
}
var Wr = Gr, Vr = $r, qr = {
  loadAll: Wr,
  load: Vr
}, Dn = Object.prototype.toString, Mn = Object.prototype.hasOwnProperty, on = 65279, Qr = 9, Ae = 10, Xr = 13, Jr = 32, Zr = 33, zr = 34, qe = 35, eo = 37, no = 38, io = 39, ro = 42, Un = 44, oo = 45, Re = 58, to = 61, lo = 62, uo = 63, so = 64, Bn = 91, Hn = 93, fo = 96, Yn = 123, co = 124, jn = 125, E = {};
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
], ho = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function po(e, n) {
  var i, r, o, l, t, u, s;
  if (n === null) return {};
  for (i = {}, r = Object.keys(n), o = 0, l = r.length; o < l; o += 1)
    t = r[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), s = e.compiledTypeMap.fallback[t], s && Mn.call(s.styleAliases, u) && (u = s.styleAliases[u]), i[t] = u;
  return i;
}
function go(e) {
  var n, i, r;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    i = "x", r = 2;
  else if (e <= 65535)
    i = "u", r = 4;
  else if (e <= 4294967295)
    i = "U", r = 8;
  else
    throw new O("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + i + b.repeat("0", r - n.length) + n;
}
var mo = 1, ve = 2;
function xo(e) {
  this.schema = e.schema || On, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = po(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ve : mo, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function gn(e, n) {
  for (var i = b.repeat(" ", n), r = 0, o = -1, l = "", t, u = e.length; r < u; )
    o = e.indexOf(`
`, r), o === -1 ? (t = e.slice(r), r = u) : (t = e.slice(r, o + 1), r = o + 1), t.length && t !== `
` && (l += i), l += t;
  return l;
}
function Qe(e, n) {
  return `
` + b.repeat(" ", e.indent * n);
}
function Co(e, n) {
  var i, r, o;
  for (i = 0, r = e.implicitTypes.length; i < r; i += 1)
    if (o = e.implicitTypes[i], o.resolve(n))
      return !0;
  return !1;
}
function De(e) {
  return e === Jr || e === Qr;
}
function ye(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== on || 65536 <= e && e <= 1114111;
}
function dn(e) {
  return ye(e) && e !== on && e !== Xr && e !== Ae;
}
function mn(e, n, i) {
  var r = dn(e), o = r && !De(e);
  return (
    // ns-plain-safe
    (i ? (
      // c = flow-in
      r
    ) : r && e !== Un && e !== Bn && e !== Hn && e !== Yn && e !== jn) && e !== qe && !(n === Re && !o) || dn(n) && !De(n) && e === qe || n === Re && o
  );
}
function Ao(e) {
  return ye(e) && e !== on && !De(e) && e !== oo && e !== uo && e !== Re && e !== Un && e !== Bn && e !== Hn && e !== Yn && e !== jn && e !== qe && e !== no && e !== ro && e !== Zr && e !== co && e !== to && e !== lo && e !== io && e !== zr && e !== eo && e !== so && e !== fo;
}
function vo(e) {
  return !De(e) && e !== Re;
}
function me(e, n) {
  var i = e.charCodeAt(n), r;
  return i >= 55296 && i <= 56319 && n + 1 < e.length && (r = e.charCodeAt(n + 1), r >= 56320 && r <= 57343) ? (i - 55296) * 1024 + r - 56320 + 65536 : i;
}
function Kn(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Gn = 1, Xe = 2, $n = 3, Wn = 4, re = 5;
function yo(e, n, i, r, o, l, t, u) {
  var s, f = 0, h = null, c = !1, g = !1, p = r !== -1, m = -1, x = Ao(me(e, 0)) && vo(me(e, e.length - 1));
  if (n || t)
    for (s = 0; s < e.length; f >= 65536 ? s += 2 : s++) {
      if (f = me(e, s), !ye(f))
        return re;
      x = x && mn(f, h, u), h = f;
    }
  else {
    for (s = 0; s < e.length; f >= 65536 ? s += 2 : s++) {
      if (f = me(e, s), f === Ae)
        c = !0, p && (g = g || // Foldable line = too long, and not more-indented.
        s - m - 1 > r && e[m + 1] !== " ", m = s);
      else if (!ye(f))
        return re;
      x = x && mn(f, h, u), h = f;
    }
    g = g || p && s - m - 1 > r && e[m + 1] !== " ";
  }
  return !c && !g ? x && !t && !o(e) ? Gn : l === ve ? re : Xe : i > 9 && Kn(e) ? re : t ? l === ve ? re : Xe : g ? Wn : $n;
}
function wo(e, n, i, r, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === ve ? '""' : "''";
    if (!e.noCompatMode && (ao.indexOf(n) !== -1 || ho.test(n)))
      return e.quotingType === ve ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, i), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = r || e.flowLevel > -1 && i >= e.flowLevel;
    function s(f) {
      return Co(e, f);
    }
    switch (yo(
      n,
      u,
      e.indent,
      t,
      s,
      e.quotingType,
      e.forceQuotes && !r,
      o
    )) {
      case Gn:
        return n;
      case Xe:
        return "'" + n.replace(/'/g, "''") + "'";
      case $n:
        return "|" + xn(n, e.indent) + Cn(gn(n, l));
      case Wn:
        return ">" + xn(n, e.indent) + Cn(gn(bo(n, t), l));
      case re:
        return '"' + _o(n) + '"';
      default:
        throw new O("impossible error: invalid scalar style");
    }
  }();
}
function xn(e, n) {
  var i = Kn(e) ? String(n) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : r ? "" : "-";
  return i + l + `
`;
}
function Cn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function bo(e, n) {
  for (var i = /(\n+)([^\n]*)/g, r = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, i.lastIndex = f, An(e.slice(0, f), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = i.exec(e); ) {
    var u = t[1], s = t[2];
    l = s[0] === " ", r += u + (!o && !l && s !== "" ? `
` : "") + An(s, n), o = l;
  }
  return r;
}
function An(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var i = / [^ ]/g, r, o = 0, l, t = 0, u = 0, s = ""; r = i.exec(e); )
    u = r.index, u - o > n && (l = t > o ? t : u, s += `
` + e.slice(o, l), o = l + 1), t = u;
  return s += `
`, e.length - o > n && t > o ? s += e.slice(o, t) + `
` + e.slice(t + 1) : s += e.slice(o), s.slice(1);
}
function _o(e) {
  for (var n = "", i = 0, r, o = 0; o < e.length; i >= 65536 ? o += 2 : o++)
    i = me(e, o), r = E[i], !r && ye(i) ? (n += e[o], i >= 65536 && (n += e[o + 1])) : n += r || go(i);
  return n;
}
function Eo(e, n, i) {
  var r = "", o = e.tag, l, t, u;
  for (l = 0, t = i.length; l < t; l += 1)
    u = i[l], e.replacer && (u = e.replacer.call(i, String(l), u)), (U(e, n, u, !1, !1) || typeof u > "u" && U(e, n, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = o, e.dump = "[" + r + "]";
}
function vn(e, n, i, r) {
  var o = "", l = e.tag, t, u, s;
  for (t = 0, u = i.length; t < u; t += 1)
    s = i[t], e.replacer && (s = e.replacer.call(i, String(t), s)), (U(e, n + 1, s, !0, !0, !1, !0) || typeof s > "u" && U(e, n + 1, null, !0, !0, !1, !0)) && ((!r || o !== "") && (o += Qe(e, n)), e.dump && Ae === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function So(e, n, i) {
  var r = "", o = e.tag, l = Object.keys(i), t, u, s, f, h;
  for (t = 0, u = l.length; t < u; t += 1)
    h = "", r !== "" && (h += ", "), e.condenseFlow && (h += '"'), s = l[t], f = i[s], e.replacer && (f = e.replacer.call(i, s, f)), U(e, n, s, !1, !1) && (e.dump.length > 1024 && (h += "? "), h += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), U(e, n, f, !1, !1) && (h += e.dump, r += h));
  e.tag = o, e.dump = "{" + r + "}";
}
function Oo(e, n, i, r) {
  var o = "", l = e.tag, t = Object.keys(i), u, s, f, h, c, g;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new O("sortKeys must be a boolean or a function");
  for (u = 0, s = t.length; u < s; u += 1)
    g = "", (!r || o !== "") && (g += Qe(e, n)), f = t[u], h = i[f], e.replacer && (h = e.replacer.call(i, f, h)), U(e, n + 1, f, !0, !0, !0) && (c = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, c && (e.dump && Ae === e.dump.charCodeAt(0) ? g += "?" : g += "? "), g += e.dump, c && (g += Qe(e, n)), U(e, n + 1, h, !0, c) && (e.dump && Ae === e.dump.charCodeAt(0) ? g += ":" : g += ": ", g += e.dump, o += g));
  e.tag = l, e.dump = o || "{}";
}
function yn(e, n, i) {
  var r, o, l, t, u, s;
  for (o = i ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (i ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (s = e.styleMap[u.tag] || u.defaultStyle, Dn.call(u.represent) === "[object Function]")
          r = u.represent(n, s);
        else if (Mn.call(u.represent, s))
          r = u.represent[s](n, s);
        else
          throw new O("!<" + u.tag + '> tag resolver accepts not "' + s + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function U(e, n, i, r, o, l, t) {
  e.tag = null, e.dump = i, yn(e, i, !1) || yn(e, i, !0);
  var u = Dn.call(e.dump), s = r, f;
  r && (r = e.flowLevel < 0 || e.flowLevel > n);
  var h = u === "[object Object]" || u === "[object Array]", c, g;
  if (h && (c = e.duplicates.indexOf(i), g = c !== -1), (e.tag !== null && e.tag !== "?" || g || e.indent !== 2 && n > 0) && (o = !1), g && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (h && g && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), u === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Oo(e, n, e.dump, o), g && (e.dump = "&ref_" + c + e.dump)) : (So(e, n, e.dump), g && (e.dump = "&ref_" + c + " " + e.dump));
    else if (u === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? vn(e, n - 1, e.dump, o) : vn(e, n, e.dump, o), g && (e.dump = "&ref_" + c + e.dump)) : (Eo(e, n, e.dump), g && (e.dump = "&ref_" + c + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && wo(e, e.dump, n, l, s);
    else {
      if (u === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new O("unacceptable kind of an object to dump " + u);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function To(e, n) {
  var i = [], r = [], o, l;
  for (Je(e, i, r), o = 0, l = r.length; o < l; o += 1)
    n.duplicates.push(i[r[o]]);
  n.usedDuplicates = new Array(l);
}
function Je(e, n, i) {
  var r, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      i.indexOf(o) === -1 && i.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        Je(e[o], n, i);
    else
      for (r = Object.keys(e), o = 0, l = r.length; o < l; o += 1)
        Je(e[r[o]], n, i);
}
function ko(e, n) {
  n = n || {};
  var i = new xo(n);
  i.noRefs || To(e, i);
  var r = e;
  return i.replacer && (r = i.replacer.call({ "": r }, "", r)), U(i, 0, r, !0, !0) ? i.dump + `
` : "";
}
var Fo = ko, Lo = {
  dump: Fo
}, Vn = qr.load, No = Lo.dump;
const Le = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function Ze(e, n = Le) {
  const {
    retries: i = Le.retries,
    retryDelay: r = Le.retryDelay,
    retryOnStatusCodes: o = Le.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const s = async () => {
    u++;
    try {
      let f, h;
      e instanceof Request ? (h = e.url, f = new Request(e, t)) : (h = e.toString(), f = new Request(h, t));
      const c = await fetch(f), g = {
        status: c.status,
        statusText: c.statusText,
        headers: Object.fromEntries(c.headers.entries()),
        data: c,
        config: { url: h, ...t },
        ok: c.ok
      };
      if (o.includes(g.status) && u <= i) {
        if (l) {
          const p = l(new Error(`请求失败，状态码 ${g.status}`), u);
          p instanceof Promise && await p;
        }
        return await new Promise((p) => setTimeout(p, r)), s();
      }
      return g;
    } catch (f) {
      if (l) {
        const h = l(f, u);
        h instanceof Promise && await h;
      }
      if (u <= i)
        return await new Promise((h) => setTimeout(h, r)), s();
      throw f;
    }
  };
  return s();
}
function tn(e) {
  if (!e) return e;
  const n = atob(e), i = new Uint8Array(n.length);
  for (let r = 0; r < n.length; r++)
    i[r] = n.charCodeAt(r);
  return new TextDecoder().decode(i);
}
function wn(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let i = "";
  for (let r = 0; r < n.length; r += 1)
    i += String.fromCharCode(n[r]);
  return btoa(i);
}
var we, Me, qn;
class Io {
  constructor(n = []) {
    C(this, Me);
    C(this, we);
    const i = n.map((o) => Vn(o)), r = P(this, Me, qn).call(this, i);
    A(this, we, r);
  }
  get clashConfig() {
    return a(this, we);
  }
}
we = new WeakMap(), Me = new WeakSet(), /**
 * @description 合并配置
 * @param {ClashType[]} configs
 * @returns {ClashType} mergedConfig
 */
qn = function(n = []) {
  var f, h, c, g;
  if (!n.length)
    return {};
  const i = structuredClone(n[0]);
  if (n.length === 1)
    return i;
  const r = {
    ...i,
    proxies: i.proxies || [],
    "proxy-groups": i["proxy-groups"] || []
  }, o = n.reduce((p, m) => {
    var x;
    return p + (((x = m.proxies) == null ? void 0 : x.length) || 0);
  }, 0), l = new Int32Array(o), t = new Set((f = i.proxies) == null ? void 0 : f.map((p) => p.name));
  let u = ((h = i.proxies) == null ? void 0 : h.length) || 0;
  const s = new Map(r["proxy-groups"].map((p) => [p.name, p]));
  for (let p = 1; p < n.length; p++) {
    const m = n[p];
    if ((c = m.proxies) != null && c.length)
      for (const x of m.proxies)
        t.has(x.name) || (r.proxies[u] = x, l[u] = u, t.add(x.name), u++);
    if ((g = m["proxy-groups"]) != null && g.length)
      for (const x of m["proxy-groups"]) {
        const y = s.get(x.name);
        if (y) {
          const S = new Set(y.proxies);
          for (const v of x.proxies || [])
            S.add(v);
          y.proxies = Array.from(S), Object.assign(y, {
            ...x,
            proxies: y.proxies
          });
        } else
          r["proxy-groups"].push(x), s.set(x.name, x);
      }
  }
  return r.proxies = r.proxies.filter((p, m) => l[m] !== -1), r;
};
var W, V;
const F = class F {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const i = n.split(a(F, W));
    return [i[0], i[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, i) {
    return [n, i].join(a(F, W));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(n) {
    if (!(n != null && n.includes(a(F, W)))) return null;
    if (a(F, V).has(n))
      return a(F, V).get(n);
    const [i] = F.getPs(n);
    if (i) {
      const r = i.trim();
      return a(F, V).set(n, r), r;
    }
    return null;
  }
  static isConfigType(n) {
    return n.includes(a(this, W));
  }
  // 清除缓存
  static clearCache() {
    a(this, V).clear();
  }
};
W = new WeakMap(), V = new WeakMap(), C(F, W, "^LINK_TO^"), C(F, V, /* @__PURE__ */ new Map());
let k = F;
var be, Ue, Qn;
class Po {
  constructor(n = []) {
    C(this, Ue);
    C(this, be, {});
    const i = P(this, Ue, Qn).call(this, n);
    A(this, be, i);
  }
  get singboxConfig() {
    return a(this, be);
  }
}
be = new WeakMap(), Ue = new WeakSet(), Qn = function(n) {
  var t, u;
  if (n.length === 0)
    return {};
  const i = structuredClone(n[0]), r = [], o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
  for (const s of n)
    if ((t = s.outbounds) != null && t.length) {
      for (const f of s.outbounds)
        if (f.outbounds) {
          const h = `${f.type}:${f.tag}`;
          if (!l.has(h)) {
            const c = new Set(f.outbounds.filter((g) => !k.isConfigType(g)));
            l.set(h, {
              base: f,
              baseOutbounds: c,
              linkOutbounds: /* @__PURE__ */ new Set()
            });
          }
          f.outbounds.forEach((c) => {
            var g;
            k.isConfigType(c) && ((g = l.get(h)) == null || g.linkOutbounds.add(c));
          });
        }
    }
  for (const s of n)
    if ((u = s.outbounds) != null && u.length) {
      for (const f of s.outbounds)
        if (!f.outbounds)
          if (k.isConfigType(f.tag))
            r.push(f);
          else {
            const h = `${f.type}:${f.tag}`;
            o.has(h) || (o.add(h), r.push(f));
          }
    }
  for (const [s, f] of l) {
    const h = { ...f.base }, c = /* @__PURE__ */ new Set([...f.baseOutbounds, ...f.linkOutbounds]);
    h.outbounds = Array.from(c), r.push(h);
  }
  return i.outbounds = r, i;
};
function Ro(e) {
  try {
    return tn(e), "base64";
  } catch {
    try {
      return Vn(e), "yaml";
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
  const i = [];
  let r = [];
  return e.forEach((o, l) => {
    r.push(o), (l + 1) % n === 0 && (i.push(r.join("|")), r = []);
  }), r.length > 0 && i.push(r.join("|")), i;
}
class Mo {
  constructor(n = []) {
    $(this, "existVps", []);
    $(this, "existVpsMap", /* @__PURE__ */ new Map());
    this.existVps = n, this.updateExist(this.existVps);
  }
  updateExist(n = []) {
    for (const i of n) {
      const r = this.getParser(i);
      r && this.setExistVpsMap(r);
    }
  }
  updateVpsPs(n) {
    const i = this.getParser(n);
    if (!i) return null;
    const r = i.originPs, [o, l] = r.split("#");
    if (!l) return n;
    const t = this.existVpsMap.get(l) || 0, u = t === 0 ? r : `${o}#${l} ${t}`;
    return i.updateOriginConfig(u), this.existVpsMap.set(l, t + 1), i.originLink;
  }
  setExistVpsMap(n) {
    const i = n.originPs, [, r] = i.split("#");
    if (!r) return;
    const [o, l] = r.split(" "), t = l ? Number.parseInt(l) >>> 0 : 0, u = this.existVpsMap.get(o) || 0;
    this.existVpsMap.set(o, Math.max(u, t + 1));
  }
  getParser(n) {
    return n.startsWith("vless://") ? new Zn(n) : n.startsWith("vmess://") ? new zn(n) : n.startsWith("trojan://") ? new Jn(n) : n.startsWith("ss://") ? new Xn(n) : null;
  }
}
var _e, Ee, Se, Be;
class Uo {
  constructor() {
    C(this, _e, ["localhost", "127.0.0.1", "abc.cba.com"]);
    C(this, Ee, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    C(this, Se, 1024);
    C(this, Be, 65535);
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
    return a(this, _e)[Math.floor(Math.random() * a(this, _e).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (a(this, Be) - a(this, Se) + 1) + a(this, Se)).toString();
  }
  /**
   * @description 获取随机 SS协议的加密类型
   */
  getEncrtptionProtocol() {
    return a(this, Ee)[Math.floor(Math.random() * a(this, Ee).length)];
  }
}
_e = new WeakMap(), Ee = new WeakMap(), Se = new WeakMap(), Be = new WeakMap();
let je = class extends Uo {
};
var q, Oe, H, L, Q, ue;
class Xn extends je {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    C(this, q, "");
    /** * @description 混淆链接 */
    C(this, Oe, "");
    /** * @description vps原始配置 */
    C(this, H, {});
    /** * @description 混淆配置 */
    C(this, L, {});
    /** * @description 原始备注 */
    C(this, Q, "");
    /** * @description 混淆备注 */
    C(this, ue, "");
    A(this, ue, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    A(this, q, i), A(this, H, new URL(i)), A(this, Q, a(this, H).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, H).hash = i, A(this, Q, i), A(this, q, a(this, H).href), this.setConfuseConfig(a(this, q));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    A(this, L, new URL(i)), a(this, L).username = this.getUsername(), a(this, L).host = this.getHost(), a(this, L).hostname = this.getHostName(), a(this, L).port = this.getPort(), a(this, L).hash = k.setPs(a(this, Q), a(this, ue)), A(this, Oe, a(this, L).href);
  }
  restoreClash(i, r) {
    var o;
    return i.name = r, i.server = this.originConfig.hostname ?? "", i.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), i;
  }
  restoreSingbox(i, r) {
    return i.server = this.originConfig.hostname ?? "", i.server_port = Number(this.originConfig.port ?? 0), i.tag = r, i;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return a(this, Q);
  }
  /**
   * @description 原始链接
   * @example 'ss://...'
   */
  get originLink() {
    return a(this, q);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return a(this, H);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return a(this, ue);
  }
  /**
   * @description 混淆链接
   * @example 'ss://...'
   */
  get confuseLink() {
    return a(this, Oe);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, L);
  }
}
q = new WeakMap(), Oe = new WeakMap(), H = new WeakMap(), L = new WeakMap(), Q = new WeakMap(), ue = new WeakMap();
var X, Te, Y, N, J, se;
class Jn extends je {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    C(this, X, "");
    /** * @description 混淆链接 */
    C(this, Te, "");
    /** * @description vps原始配置 */
    C(this, Y, {});
    /** * @description 混淆配置 */
    C(this, N, {});
    /** * @description 原始备注 */
    C(this, J, "");
    /** * @description 混淆备注 */
    C(this, se, "");
    A(this, se, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    A(this, X, i), A(this, Y, new URL(i)), A(this, J, a(this, Y).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, Y).hash = i, A(this, J, i), A(this, X, a(this, Y).href), this.setConfuseConfig(a(this, X));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    A(this, N, new URL(i)), a(this, N).username = this.getUsername(), a(this, N).host = this.getHost(), a(this, N).hostname = this.getHostName(), a(this, N).port = this.getPort(), a(this, N).hash = k.setPs(a(this, J), a(this, se)), A(this, Te, a(this, N).href);
  }
  restoreClash(i, r) {
    var o;
    return i.name = r, i.server = this.originConfig.hostname ?? "", i.port = Number(this.originConfig.port ?? 0), i.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", i;
  }
  restoreSingbox(i, r) {
    var o;
    return i.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", i.server = this.originConfig.hostname ?? "", i.server_port = Number(this.originConfig.port ?? 0), i.tag = r, i;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return a(this, J);
  }
  /**
   * @description 原始链接
   * @example 'trojan://...'
   */
  get originLink() {
    return a(this, X);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return a(this, Y);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return encodeURIComponent(a(this, se));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return a(this, Te);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, N);
  }
}
X = new WeakMap(), Te = new WeakMap(), Y = new WeakMap(), N = new WeakMap(), J = new WeakMap(), se = new WeakMap();
var Z, ke, j, I, z, fe;
class Zn extends je {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    C(this, Z, "");
    /** * @description 混淆链接 */
    C(this, ke, "");
    /** * @description vps原始配置 */
    C(this, j, {});
    /** * @description 混淆配置 */
    C(this, I, {});
    /** * @description 原始备注 */
    C(this, z, "");
    /** * @description 混淆备注 */
    C(this, fe, "");
    A(this, fe, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    A(this, Z, i), A(this, j, new URL(i)), A(this, z, a(this, j).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, j).hash = i, A(this, z, i), A(this, Z, a(this, j).href), this.setConfuseConfig(a(this, Z));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    A(this, I, new URL(i)), a(this, I).username = this.getUsername(), a(this, I).host = this.getHost(), a(this, I).hostname = this.getHostName(), a(this, I).port = this.getPort(), a(this, I).hash = k.setPs(a(this, z), a(this, fe)), A(this, ke, a(this, I).href);
  }
  restoreClash(i, r) {
    var o;
    return i.name = r, i.server = this.originConfig.hostname ?? "", i.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), i.uuid = this.originConfig.username ?? "", i;
  }
  restoreSingbox(i, r) {
    var o;
    return i.tag = r, i.server = this.originConfig.hostname ?? "", i.server_port = Number(this.originConfig.port ?? 0), i.uuid = this.originConfig.username ?? "", (o = i.tls) != null && o.server_name && (i.tls.server_name = this.originConfig.hostname ?? ""), i;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return a(this, z);
  }
  /**
   * @description 原始链接
   * @example 'vless://...'
   */
  get originLink() {
    return a(this, Z);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return a(this, j);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return a(this, fe);
  }
  /**
   * @description 混淆链接
   * @example 'vless://...'
   */
  get confuseLink() {
    return a(this, ke);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, I);
  }
}
Z = new WeakMap(), ke = new WeakMap(), j = new WeakMap(), I = new WeakMap(), z = new WeakMap(), fe = new WeakMap();
var ce, Fe, M, R, ee, ae, He, ei;
class zn extends je {
  constructor(i) {
    super();
    C(this, He);
    /** * @description 原始链接 */
    C(this, ce, "");
    /** * @description 混淆链接 */
    C(this, Fe, "");
    /** * @description vps原始配置 */
    C(this, M, {});
    /** * @description 混淆配置 */
    C(this, R, {});
    /** * @description 原始备注 */
    C(this, ee, "");
    /** * @description 混淆备注 */
    C(this, ae, "");
    A(this, ae, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig();
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    const [r, o] = i.match(/vmess:\/\/(.*)/) || [];
    A(this, ce, i), A(this, M, JSON.parse(tn(o))), A(this, ee, a(this, M).ps ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, M).ps = i, A(this, ee, i), A(this, ce, `vmess://${wn(JSON.stringify(a(this, M)))}`), this.setConfuseConfig();
  }
  /**
   * @description 设置混淆配置
   */
  setConfuseConfig() {
    A(this, R, structuredClone(a(this, M))), a(this, R).add = this.getHostName(), a(this, R).port = this.getPort(), a(this, R).id = this.getPassword(), a(this, R).ps = k.setPs(a(this, ee), a(this, ae)), A(this, Fe, `vmess://${wn(JSON.stringify(a(this, R)))}`);
  }
  restoreClash(i, r) {
    var o, l;
    return P(this, He, ei).call(this, i), i.name = r, i.server = this.originConfig.add ?? "", i.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), i.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", i;
  }
  restoreSingbox(i, r) {
    var o, l;
    return i.server = this.originConfig.add ?? "", i.server_port = Number(this.originConfig.port ?? 0), i.tag = r, (o = i.tls) != null && o.server_name && (i.tls.server_name = this.originConfig.add ?? ""), i.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", i;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return a(this, ee);
  }
  /**
   * @description 原始链接
   * @example 'vmess://...'
   */
  get originLink() {
    return a(this, ce);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return a(this, M);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return a(this, ae);
  }
  /**
   * @description 混淆链接
   * @example 'vmess://...'
   */
  get confuseLink() {
    return a(this, Fe);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, R);
  }
}
ce = new WeakMap(), Fe = new WeakMap(), M = new WeakMap(), R = new WeakMap(), ee = new WeakMap(), ae = new WeakMap(), He = new WeakSet(), ei = function(i) {
  i.network === "ws" && (i["ws-opts"] = {
    ...i["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...i["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
class Bo extends Mo {
  constructor(i, r = []) {
    super(r);
    $(this, "urlSet", /* @__PURE__ */ new Set());
    $(this, "vpsStore", /* @__PURE__ */ new Map());
    $(this, "originUrls", /* @__PURE__ */ new Set());
    $(this, "vps", []);
    this.vps = i;
  }
  async parse(i = this.vps) {
    for await (const r of i) {
      const o = this.updateVpsPs(r);
      if (o) {
        let l = null;
        o.startsWith("vless://") ? l = new Zn(o) : o.startsWith("vmess://") ? l = new zn(o) : o.startsWith("trojan://") ? l = new Jn(o) : o.startsWith("ss://") && (l = new Xn(o)), l && this.setStore(o, l);
      }
      if (r.startsWith("https://") || r.startsWith("http://")) {
        const l = await Ze(r, { retries: 3 }).then((u) => u.data.text());
        Ro(l) === "base64" && (this.updateExist(Array.from(this.originUrls)), await this.parse(ti.base64(l)));
      }
    }
  }
  setStore(i, r) {
    this.urlSet.add(r.confuseLink), this.originUrls.add(i), this.vpsStore.set(r.confusePs, r);
  }
  get urls() {
    return Array.from(this.urlSet);
  }
  get vpsMap() {
    return this.vpsStore;
  }
}
var he;
const le = class le {
  /**
   * @description 获取混淆链接组
   * @param {string | URL} url
   * @param {string} backend
   * @param {string} chunkCount
   * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
   */
  static async getConfuseUrl(n, i, r) {
    const { searchParams: o } = new URL(n), t = o.get("url").split(/\||\n/).filter(Boolean), u = new Bo(t);
    await u.parse(t);
    const s = Do(Array.from(u.urls), Number(r));
    return A(le, he, s.map((f) => {
      const h = new URL(`${i}/sub`), { searchParams: c } = new URL(n);
      return c.set("url", f), h.search = c.toString(), h.toString();
    })), u;
  }
  /**
   * @description 获取Clash混淆配置
   * @returns {Promise<Clash>} clashConfig
   */
  static async getClashConfuseConfig() {
    try {
      const n = await Promise.all(a(le, he).map((r) => Ze(r, { retries: 3 }).then((o) => o.data.text())));
      return new Io(n).clashConfig;
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
        a(le, he).map((r) => Ze(r, { retries: 3 }).then((o) => o.data.json()))
      );
      return new Po(n).singboxConfig;
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
};
he = new WeakMap(), C(le, he);
let xe = le;
var ge, ni, ii;
class Ho {
  constructor() {
    C(this, ge);
  }
  /**
   * @description 获取原始配置
   * @param {ClashType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {ClashType} originConfig
   */
  getOriginConfig(n, i) {
    try {
      return n.proxies = P(this, ge, ni).call(this, n.proxies, i), n["proxy-groups"] = n["proxy-groups"].map((r) => (r.proxies && (r.proxies = P(this, ge, ii).call(this, r.proxies)), r)), n;
    } catch (r) {
      throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
}
ge = new WeakSet(), ni = function(n, i) {
  try {
    const r = [];
    for (const o of n) {
      const [l, t] = k.getPs(o.name);
      if (i.has(t)) {
        const u = i.get(t);
        u == null || u.restoreClash(o, l), r.push(o);
      }
    }
    return r;
  } catch (r) {
    throw new Error(`Restore proxies failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}, ii = function(n) {
  try {
    return n.map((i) => {
      const [r] = k.getPs(i);
      return r;
    });
  } catch (i) {
    throw new Error(`Update proxies groups failed: ${i.message || i}, function trace: ${i.stack}`);
  }
};
var B, ri, oi, ze;
class Yo {
  constructor() {
    C(this, B);
  }
  /**
   * @description 获取原始配置
   * @param {SingboxType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {SingboxType} originConfig
   */
  getOriginConfig(n, i) {
    try {
      return n.outbounds = P(this, B, ri).call(this, n.outbounds, i), n;
    } catch (r) {
      throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
}
B = new WeakSet(), ri = function(n = [], i) {
  try {
    const r = [];
    for (const o of n) {
      if (P(this, B, ze).call(this, o.tag)) {
        const [l, t] = k.getPs(o.tag), u = i.get(t);
        u == null || u.restoreSingbox(o, l);
      }
      Reflect.has(o, "outbounds") && (o.outbounds = P(this, B, oi).call(this, o.outbounds)), r.push(o);
    }
    return r;
  } catch (r) {
    throw new Error(`Restore outbounds failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}, oi = function(n = []) {
  try {
    return n.map((i) => {
      if (P(this, B, ze).call(this, i)) {
        const [r] = k.getPs(i);
        return r;
      }
      return i;
    });
  } catch (i) {
    throw new Error(`Update outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, ze = function(n) {
  return k.isConfigType(n);
};
const jo = new Ho(), Ko = new Yo();
class ti {
  /**
   * @description 处理base64订阅
   * @param {string} subs
   * @returns {string[]} content
   */
  static base64(n) {
    return tn(n).split(`
`).filter(Boolean);
  }
  /**
   * @description 获取转换类型
   * @param {string | URL} url
   * @returns {ConvertTarget | null} 转换类型
   */
  static getConvertType(n) {
    const { searchParams: i } = new URL(n);
    return i.get("target");
  }
}
function Go(e = "") {
  return e.split(`
`).reduce((i, r) => (i.push({
    label: r,
    value: r
  }), i), []);
}
function $o(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function Wo(e, n) {
  const i = n === "" ? [] : Go(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(i));
}
function Vo(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const de = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function qo(e) {
  try {
    const { url: n, lockBackend: i, remoteConfig: r, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = $o(t, o), t = Wo(t, r), t = Vo(t, i), new Response(t, {
      headers: new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" })
    });
  } catch (n) {
    return new Response(n.message || n);
  }
}
const Jo = {
  async fetch(e, n) {
    try {
      const { pathname: i, origin: r } = new URL(e.url);
      if (i === "/sub") {
        const { vpsMap: o } = await xe.getConfuseUrl(
          e.url,
          n.BACKEND ?? de.BACKEND,
          n.CHUNK_COUNT ?? de.CHUNK_COUNT
        ), l = ti.getConvertType(e.url);
        if (!l)
          return new Response("Unsupported client type", { status: 400 });
        if (["clash", "clashr"].includes(l)) {
          const t = await xe.getClashConfuseConfig(), u = jo.getOriginConfig(t, o);
          return new Response(No(u, { indent: 2, lineWidth: 200 }), {
            headers: new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        if (l === "singbox") {
          const t = await xe.getSingboxConfuseConfig(), u = Ko.getOriginConfig(t, o);
          return new Response(JSON.stringify(u), {
            headers: new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        return new Response("Unsupported client type, support list: clash, clashr", { status: 400 });
      }
      return qo({
        url: n.PAGE_URL ?? de.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? de.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? de.REMOTE_CONFIG,
        origin: r
      });
    } catch (i) {
      return new Response(i.message || i);
    }
  }
};
export {
  Jo as default
};
