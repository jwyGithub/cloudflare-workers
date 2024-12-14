var un = Object.defineProperty;
var Ze = (e) => {
  throw TypeError(e);
};
var cn = (e, r, n) => r in e ? un(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n;
var Re = (e, r, n) => cn(e, typeof r != "symbol" ? r + "" : r, n), De = (e, r, n) => r.has(e) || Ze("Cannot " + n);
var m = (e, r, n) => (De(e, r, "read from private field"), n ? n.call(e) : r.get(e)), y = (e, r, n) => r.has(e) ? Ze("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, n), E = (e, r, n, i) => (De(e, r, "write to private field"), i ? i.call(e, n) : r.set(e, n), n), w = (e, r, n) => (De(e, r, "access private method"), n);
const an = "bad request", fn = "internal server error", mr = new Headers({
  "Content-type": "application/json"
}), pn = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const hn = new Headers({
  "Content-type": "text/html"
}), ze = (e, r = pn) => new Response(e, {
  status: 200,
  headers: r
}), gn = (e, r = hn) => new Response(e, {
  headers: r
}), er = (e = an, r = 400, n = mr) => Response.json(
  {
    status: r,
    message: e
  },
  {
    status: r,
    statusText: e,
    headers: n
  }
), xr = (e = fn, r = 500, n = mr) => Response.json(
  {
    status: r,
    message: e
  },
  {
    status: r,
    statusText: e,
    headers: n
  }
);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function Cr(e) {
  return typeof e > "u" || e === null;
}
function dn(e) {
  return typeof e == "object" && e !== null;
}
function mn(e) {
  return Array.isArray(e) ? e : Cr(e) ? [] : [e];
}
function xn(e, r) {
  var n, i, o, l;
  if (r)
    for (l = Object.keys(r), n = 0, i = l.length; n < i; n += 1)
      o = l[n], e[o] = r[o];
  return e;
}
function Cn(e, r) {
  var n = "", i;
  for (i = 0; i < r; i += 1)
    n += e;
  return n;
}
function yn(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var vn = Cr, wn = dn, An = mn, _n = Cn, bn = yn, En = xn, b = {
  isNothing: vn,
  isObject: wn,
  toArray: An,
  repeat: _n,
  isNegativeZero: bn,
  extend: En
};
function yr(e, r) {
  var n = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !r && e.mark.snippet && (n += `

` + e.mark.snippet), i + " " + n) : i;
}
function le(e, r) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = r, this.message = yr(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
le.prototype = Object.create(Error.prototype);
le.prototype.constructor = le;
le.prototype.toString = function(r) {
  return this.name + ": " + yr(this, r);
};
var k = le;
function Me(e, r, n, i, o) {
  var l = "", t = "", s = Math.floor(o / 2) - 1;
  return i - r > s && (l = " ... ", r = i - s + l.length), n - i > s && (t = " ...", n = i + s - t.length), {
    str: l + e.slice(r, n).replace(/\t/g, "→") + t,
    pos: i - r + l.length
    // relative position
  };
}
function Ue(e, r) {
  return b.repeat(" ", r - e.length) + e;
}
function Sn(e, r) {
  if (r = Object.create(r || null), !e.buffer) return null;
  r.maxLength || (r.maxLength = 79), typeof r.indent != "number" && (r.indent = 1), typeof r.linesBefore != "number" && (r.linesBefore = 3), typeof r.linesAfter != "number" && (r.linesAfter = 2);
  for (var n = /\r?\n|\r|\0/g, i = [0], o = [], l, t = -1; l = n.exec(e.buffer); )
    o.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = i.length - 2);
  t < 0 && (t = i.length - 1);
  var s = "", u, c, f = Math.min(e.line + r.linesAfter, o.length).toString().length, a = r.maxLength - (r.indent + f + 3);
  for (u = 1; u <= r.linesBefore && !(t - u < 0); u++)
    c = Me(
      e.buffer,
      i[t - u],
      o[t - u],
      e.position - (i[t] - i[t - u]),
      a
    ), s = b.repeat(" ", r.indent) + Ue((e.line - u + 1).toString(), f) + " | " + c.str + `
` + s;
  for (c = Me(e.buffer, i[t], o[t], e.position, a), s += b.repeat(" ", r.indent) + Ue((e.line + 1).toString(), f) + " | " + c.str + `
`, s += b.repeat("-", r.indent + f + 3 + c.pos) + `^
`, u = 1; u <= r.linesAfter && !(t + u >= o.length); u++)
    c = Me(
      e.buffer,
      i[t + u],
      o[t + u],
      e.position - (i[t] - i[t + u]),
      a
    ), s += b.repeat(" ", r.indent) + Ue((e.line + u + 1).toString(), f) + " | " + c.str + `
`;
  return s.replace(/\n$/, "");
}
var Tn = Sn, On = [
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
], kn = [
  "scalar",
  "sequence",
  "mapping"
];
function Fn(e) {
  var r = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(i) {
      r[String(i)] = n;
    });
  }), r;
}
function Ln(e, r) {
  if (r = r || {}, Object.keys(r).forEach(function(n) {
    if (On.indexOf(n) === -1)
      throw new k('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = r, this.tag = e, this.kind = r.kind || null, this.resolve = r.resolve || function() {
    return !0;
  }, this.construct = r.construct || function(n) {
    return n;
  }, this.instanceOf = r.instanceOf || null, this.predicate = r.predicate || null, this.represent = r.represent || null, this.representName = r.representName || null, this.defaultStyle = r.defaultStyle || null, this.multi = r.multi || !1, this.styleAliases = Fn(r.styleAliases || null), kn.indexOf(this.kind) === -1)
    throw new k('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var S = Ln;
function rr(e, r) {
  var n = [];
  return e[r].forEach(function(i) {
    var o = n.length;
    n.forEach(function(l, t) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (o = t);
    }), n[o] = i;
  }), n;
}
function In() {
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
  }, r, n;
  function i(o) {
    o.multi ? (e.multi[o.kind].push(o), e.multi.fallback.push(o)) : e[o.kind][o.tag] = e.fallback[o.tag] = o;
  }
  for (r = 0, n = arguments.length; r < n; r += 1)
    arguments[r].forEach(i);
  return e;
}
function He(e) {
  return this.extend(e);
}
He.prototype.extend = function(r) {
  var n = [], i = [];
  if (r instanceof S)
    i.push(r);
  else if (Array.isArray(r))
    i = i.concat(r);
  else if (r && (Array.isArray(r.implicit) || Array.isArray(r.explicit)))
    r.implicit && (n = n.concat(r.implicit)), r.explicit && (i = i.concat(r.explicit));
  else
    throw new k("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(l) {
    if (!(l instanceof S))
      throw new k("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new k("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new k("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof S))
      throw new k("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(He.prototype);
  return o.implicit = (this.implicit || []).concat(n), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = rr(o, "implicit"), o.compiledExplicit = rr(o, "explicit"), o.compiledTypeMap = In(o.compiledImplicit, o.compiledExplicit), o;
};
var Nn = He, Pn = new S("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Rn = new S("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Dn = new S("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Mn = new Nn({
  explicit: [
    Pn,
    Rn,
    Dn
  ]
});
function Un(e) {
  if (e === null) return !0;
  var r = e.length;
  return r === 1 && e === "~" || r === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Bn() {
  return null;
}
function Hn(e) {
  return e === null;
}
var jn = new S("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Un,
  construct: Bn,
  predicate: Hn,
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
function Yn(e) {
  if (e === null) return !1;
  var r = e.length;
  return r === 4 && (e === "true" || e === "True" || e === "TRUE") || r === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function $n(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Gn(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Kn = new S("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Yn,
  construct: $n,
  predicate: Gn,
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
function qn(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Wn(e) {
  return 48 <= e && e <= 55;
}
function Vn(e) {
  return 48 <= e && e <= 57;
}
function Qn(e) {
  if (e === null) return !1;
  var r = e.length, n = 0, i = !1, o;
  if (!r) return !1;
  if (o = e[n], (o === "-" || o === "+") && (o = e[++n]), o === "0") {
    if (n + 1 === r) return !0;
    if (o = e[++n], o === "b") {
      for (n++; n < r; n++)
        if (o = e[n], o !== "_") {
          if (o !== "0" && o !== "1") return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "x") {
      for (n++; n < r; n++)
        if (o = e[n], o !== "_") {
          if (!qn(e.charCodeAt(n))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "o") {
      for (n++; n < r; n++)
        if (o = e[n], o !== "_") {
          if (!Wn(e.charCodeAt(n))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; n < r; n++)
    if (o = e[n], o !== "_") {
      if (!Vn(e.charCodeAt(n)))
        return !1;
      i = !0;
    }
  return !(!i || o === "_");
}
function Xn(e) {
  var r = e, n = 1, i;
  if (r.indexOf("_") !== -1 && (r = r.replace(/_/g, "")), i = r[0], (i === "-" || i === "+") && (i === "-" && (n = -1), r = r.slice(1), i = r[0]), r === "0") return 0;
  if (i === "0") {
    if (r[1] === "b") return n * parseInt(r.slice(2), 2);
    if (r[1] === "x") return n * parseInt(r.slice(2), 16);
    if (r[1] === "o") return n * parseInt(r.slice(2), 8);
  }
  return n * parseInt(r, 10);
}
function Jn(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !b.isNegativeZero(e);
}
var Zn = new S("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Qn,
  construct: Xn,
  predicate: Jn,
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
}), zn = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function ei(e) {
  return !(e === null || !zn.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function ri(e) {
  var r, n;
  return r = e.replace(/_/g, "").toLowerCase(), n = r[0] === "-" ? -1 : 1, "+-".indexOf(r[0]) >= 0 && (r = r.slice(1)), r === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : r === ".nan" ? NaN : n * parseFloat(r, 10);
}
var ni = /^[-+]?[0-9]+e/;
function ii(e, r) {
  var n;
  if (isNaN(e))
    switch (r) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (r) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (r) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (b.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), ni.test(n) ? n.replace("e", ".e") : n;
}
function oi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || b.isNegativeZero(e));
}
var ti = new S("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: ei,
  construct: ri,
  predicate: oi,
  represent: ii,
  defaultStyle: "lowercase"
}), li = Mn.extend({
  implicit: [
    jn,
    Kn,
    Zn,
    ti
  ]
}), si = li, vr = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), wr = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function ui(e) {
  return e === null ? !1 : vr.exec(e) !== null || wr.exec(e) !== null;
}
function ci(e) {
  var r, n, i, o, l, t, s, u = 0, c = null, f, a, p;
  if (r = vr.exec(e), r === null && (r = wr.exec(e)), r === null) throw new Error("Date resolve error");
  if (n = +r[1], i = +r[2] - 1, o = +r[3], !r[4])
    return new Date(Date.UTC(n, i, o));
  if (l = +r[4], t = +r[5], s = +r[6], r[7]) {
    for (u = r[7].slice(0, 3); u.length < 3; )
      u += "0";
    u = +u;
  }
  return r[9] && (f = +r[10], a = +(r[11] || 0), c = (f * 60 + a) * 6e4, r[9] === "-" && (c = -c)), p = new Date(Date.UTC(n, i, o, l, t, s, u)), c && p.setTime(p.getTime() - c), p;
}
function ai(e) {
  return e.toISOString();
}
var fi = new S("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: ui,
  construct: ci,
  instanceOf: Date,
  represent: ai
});
function pi(e) {
  return e === "<<" || e === null;
}
var hi = new S("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: pi
}), Ve = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function gi(e) {
  if (e === null) return !1;
  var r, n, i = 0, o = e.length, l = Ve;
  for (n = 0; n < o; n++)
    if (r = l.indexOf(e.charAt(n)), !(r > 64)) {
      if (r < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function di(e) {
  var r, n, i = e.replace(/[\r\n=]/g, ""), o = i.length, l = Ve, t = 0, s = [];
  for (r = 0; r < o; r++)
    r % 4 === 0 && r && (s.push(t >> 16 & 255), s.push(t >> 8 & 255), s.push(t & 255)), t = t << 6 | l.indexOf(i.charAt(r));
  return n = o % 4 * 6, n === 0 ? (s.push(t >> 16 & 255), s.push(t >> 8 & 255), s.push(t & 255)) : n === 18 ? (s.push(t >> 10 & 255), s.push(t >> 2 & 255)) : n === 12 && s.push(t >> 4 & 255), new Uint8Array(s);
}
function mi(e) {
  var r = "", n = 0, i, o, l = e.length, t = Ve;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (r += t[n >> 18 & 63], r += t[n >> 12 & 63], r += t[n >> 6 & 63], r += t[n & 63]), n = (n << 8) + e[i];
  return o = l % 3, o === 0 ? (r += t[n >> 18 & 63], r += t[n >> 12 & 63], r += t[n >> 6 & 63], r += t[n & 63]) : o === 2 ? (r += t[n >> 10 & 63], r += t[n >> 4 & 63], r += t[n << 2 & 63], r += t[64]) : o === 1 && (r += t[n >> 2 & 63], r += t[n << 4 & 63], r += t[64], r += t[64]), r;
}
function xi(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Ci = new S("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: gi,
  construct: di,
  predicate: xi,
  represent: mi
}), yi = Object.prototype.hasOwnProperty, vi = Object.prototype.toString;
function wi(e) {
  if (e === null) return !0;
  var r = [], n, i, o, l, t, s = e;
  for (n = 0, i = s.length; n < i; n += 1) {
    if (o = s[n], t = !1, vi.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (yi.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (r.indexOf(l) === -1) r.push(l);
    else return !1;
  }
  return !0;
}
function Ai(e) {
  return e !== null ? e : [];
}
var _i = new S("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: wi,
  construct: Ai
}), bi = Object.prototype.toString;
function Ei(e) {
  if (e === null) return !0;
  var r, n, i, o, l, t = e;
  for (l = new Array(t.length), r = 0, n = t.length; r < n; r += 1) {
    if (i = t[r], bi.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
    l[r] = [o[0], i[o[0]]];
  }
  return !0;
}
function Si(e) {
  if (e === null) return [];
  var r, n, i, o, l, t = e;
  for (l = new Array(t.length), r = 0, n = t.length; r < n; r += 1)
    i = t[r], o = Object.keys(i), l[r] = [o[0], i[o[0]]];
  return l;
}
var Ti = new S("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Ei,
  construct: Si
}), Oi = Object.prototype.hasOwnProperty;
function ki(e) {
  if (e === null) return !0;
  var r, n = e;
  for (r in n)
    if (Oi.call(n, r) && n[r] !== null)
      return !1;
  return !0;
}
function Fi(e) {
  return e !== null ? e : {};
}
var Li = new S("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: ki,
  construct: Fi
}), Ar = si.extend({
  implicit: [
    fi,
    hi
  ],
  explicit: [
    Ci,
    _i,
    Ti,
    Li
  ]
}), M = Object.prototype.hasOwnProperty, Ee = 1, _r = 2, br = 3, Se = 4, Be = 1, Ii = 2, nr = 3, Ni = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Pi = /[\x85\u2028\u2029]/, Ri = /[,\[\]\{\}]/, Er = /^(?:!|!!|![a-z\-]+!)$/i, Sr = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ir(e) {
  return Object.prototype.toString.call(e);
}
function I(e) {
  return e === 10 || e === 13;
}
function Y(e) {
  return e === 9 || e === 32;
}
function F(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function q(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Di(e) {
  var r;
  return 48 <= e && e <= 57 ? e - 48 : (r = e | 32, 97 <= r && r <= 102 ? r - 97 + 10 : -1);
}
function Mi(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Ui(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function or(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Bi(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Tr = new Array(256), Or = new Array(256);
for (var G = 0; G < 256; G++)
  Tr[G] = or(G) ? 1 : 0, Or[G] = or(G);
function Hi(e, r) {
  this.input = e, this.filename = r.filename || null, this.schema = r.schema || Ar, this.onWarning = r.onWarning || null, this.legacy = r.legacy || !1, this.json = r.json || !1, this.listener = r.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function kr(e, r) {
  var n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = Tn(n), new k(r, n);
}
function g(e, r) {
  throw kr(e, r);
}
function Te(e, r) {
  e.onWarning && e.onWarning.call(null, kr(e, r));
}
var tr = {
  YAML: function(r, n, i) {
    var o, l, t;
    r.version !== null && g(r, "duplication of %YAML directive"), i.length !== 1 && g(r, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), o === null && g(r, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && g(r, "unacceptable YAML version of the document"), r.version = i[0], r.checkLineBreaks = t < 2, t !== 1 && t !== 2 && Te(r, "unsupported YAML version of the document");
  },
  TAG: function(r, n, i) {
    var o, l;
    i.length !== 2 && g(r, "TAG directive accepts exactly two arguments"), o = i[0], l = i[1], Er.test(o) || g(r, "ill-formed tag handle (first argument) of the TAG directive"), M.call(r.tagMap, o) && g(r, 'there is a previously declared suffix for "' + o + '" tag handle'), Sr.test(l) || g(r, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      g(r, "tag prefix is malformed: " + l);
    }
    r.tagMap[o] = l;
  }
};
function D(e, r, n, i) {
  var o, l, t, s;
  if (r < n) {
    if (s = e.input.slice(r, n), i)
      for (o = 0, l = s.length; o < l; o += 1)
        t = s.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || g(e, "expected valid JSON character");
    else Ni.test(s) && g(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function lr(e, r, n, i) {
  var o, l, t, s;
  for (b.isObject(n) || g(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(n), t = 0, s = o.length; t < s; t += 1)
    l = o[t], M.call(r, l) || (r[l] = n[l], i[l] = !0);
}
function W(e, r, n, i, o, l, t, s, u) {
  var c, f;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), c = 0, f = o.length; c < f; c += 1)
      Array.isArray(o[c]) && g(e, "nested arrays are not supported inside keys"), typeof o == "object" && ir(o[c]) === "[object Object]" && (o[c] = "[object Object]");
  if (typeof o == "object" && ir(o) === "[object Object]" && (o = "[object Object]"), o = String(o), r === null && (r = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (c = 0, f = l.length; c < f; c += 1)
        lr(e, r, l[c], n);
    else
      lr(e, r, l, n);
  else
    !e.json && !M.call(n, o) && M.call(r, o) && (e.line = t || e.line, e.lineStart = s || e.lineStart, e.position = u || e.position, g(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(r, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : r[o] = l, delete n[o];
  return r;
}
function Qe(e) {
  var r;
  r = e.input.charCodeAt(e.position), r === 10 ? e.position++ : r === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : g(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function A(e, r, n) {
  for (var i = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; Y(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (r && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (I(o))
      for (Qe(e), o = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && i !== 0 && e.lineIndent < n && Te(e, "deficient indentation"), i;
}
function Ie(e) {
  var r = e.position, n;
  return n = e.input.charCodeAt(r), !!((n === 45 || n === 46) && n === e.input.charCodeAt(r + 1) && n === e.input.charCodeAt(r + 2) && (r += 3, n = e.input.charCodeAt(r), n === 0 || F(n)));
}
function Xe(e, r) {
  r === 1 ? e.result += " " : r > 1 && (e.result += b.repeat(`
`, r - 1));
}
function ji(e, r, n) {
  var i, o, l, t, s, u, c, f, a = e.kind, p = e.result, h;
  if (h = e.input.charCodeAt(e.position), F(h) || q(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (o = e.input.charCodeAt(e.position + 1), F(o) || n && q(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (o = e.input.charCodeAt(e.position + 1), F(o) || n && q(o))
        break;
    } else if (h === 35) {
      if (i = e.input.charCodeAt(e.position - 1), F(i))
        break;
    } else {
      if (e.position === e.lineStart && Ie(e) || n && q(h))
        break;
      if (I(h))
        if (u = e.line, c = e.lineStart, f = e.lineIndent, A(e, !1, -1), e.lineIndent >= r) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = u, e.lineStart = c, e.lineIndent = f;
          break;
        }
    }
    s && (D(e, l, t, !1), Xe(e, e.line - u), l = t = e.position, s = !1), Y(h) || (t = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return D(e, l, t, !1), e.result ? !0 : (e.kind = a, e.result = p, !1);
}
function Yi(e, r) {
  var n, i, o;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if (D(e, i, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else I(n) ? (D(e, i, o, !0), Xe(e, A(e, !1, r)), i = o = e.position) : e.position === e.lineStart && Ie(e) ? g(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  g(e, "unexpected end of the stream within a single quoted scalar");
}
function $i(e, r) {
  var n, i, o, l, t, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return D(e, n, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (D(e, n, e.position, !0), s = e.input.charCodeAt(++e.position), I(s))
        A(e, !1, r);
      else if (s < 256 && Tr[s])
        e.result += Or[s], e.position++;
      else if ((t = Mi(s)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          s = e.input.charCodeAt(++e.position), (t = Di(s)) >= 0 ? l = (l << 4) + t : g(e, "expected hexadecimal character");
        e.result += Bi(l), e.position++;
      } else
        g(e, "unknown escape sequence");
      n = i = e.position;
    } else I(s) ? (D(e, n, i, !0), Xe(e, A(e, !1, r)), n = i = e.position) : e.position === e.lineStart && Ie(e) ? g(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  g(e, "unexpected end of the stream within a double quoted scalar");
}
function Gi(e, r) {
  var n = !0, i, o, l, t = e.tag, s, u = e.anchor, c, f, a, p, h, d = /* @__PURE__ */ Object.create(null), x, v, O, C;
  if (C = e.input.charCodeAt(e.position), C === 91)
    f = 93, h = !1, s = [];
  else if (C === 123)
    f = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), C = e.input.charCodeAt(++e.position); C !== 0; ) {
    if (A(e, !0, r), C = e.input.charCodeAt(e.position), C === f)
      return e.position++, e.tag = t, e.anchor = u, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    n ? C === 44 && g(e, "expected the node content, but found ','") : g(e, "missed comma between flow collection entries"), v = x = O = null, a = p = !1, C === 63 && (c = e.input.charCodeAt(e.position + 1), F(c) && (a = p = !0, e.position++, A(e, !0, r))), i = e.line, o = e.lineStart, l = e.position, Z(e, r, Ee, !1, !0), v = e.tag, x = e.result, A(e, !0, r), C = e.input.charCodeAt(e.position), (p || e.line === i) && C === 58 && (a = !0, C = e.input.charCodeAt(++e.position), A(e, !0, r), Z(e, r, Ee, !1, !0), O = e.result), h ? W(e, s, d, v, x, O, i, o, l) : a ? s.push(W(e, null, d, v, x, O, i, o, l)) : s.push(x), A(e, !0, r), C = e.input.charCodeAt(e.position), C === 44 ? (n = !0, C = e.input.charCodeAt(++e.position)) : n = !1;
  }
  g(e, "unexpected end of the stream within a flow collection");
}
function Ki(e, r) {
  var n, i, o = Be, l = !1, t = !1, s = r, u = 0, c = !1, f, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    i = !1;
  else if (a === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      Be === o ? o = a === 43 ? nr : Ii : g(e, "repeat of a chomping mode identifier");
    else if ((f = Ui(a)) >= 0)
      f === 0 ? g(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? g(e, "repeat of an indentation width identifier") : (s = r + f - 1, t = !0);
    else
      break;
  if (Y(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while (Y(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!I(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (Qe(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!t || e.lineIndent < s) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > s && (s = e.lineIndent), I(a)) {
      u++;
      continue;
    }
    if (e.lineIndent < s) {
      o === nr ? e.result += b.repeat(`
`, l ? 1 + u : u) : o === Be && l && (e.result += `
`);
      break;
    }
    for (i ? Y(a) ? (c = !0, e.result += b.repeat(`
`, l ? 1 + u : u)) : c ? (c = !1, e.result += b.repeat(`
`, u + 1)) : u === 0 ? l && (e.result += " ") : e.result += b.repeat(`
`, u) : e.result += b.repeat(`
`, l ? 1 + u : u), l = !0, t = !0, u = 0, n = e.position; !I(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    D(e, n, e.position, !1);
  }
  return !0;
}
function sr(e, r) {
  var n, i = e.tag, o = e.anchor, l = [], t, s = !1, u;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), u = e.input.charCodeAt(e.position); u !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, g(e, "tab characters must not be used in indentation")), !(u !== 45 || (t = e.input.charCodeAt(e.position + 1), !F(t)))); ) {
    if (s = !0, e.position++, A(e, !0, -1) && e.lineIndent <= r) {
      l.push(null), u = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, Z(e, r, br, !1, !0), l.push(e.result), A(e, !0, -1), u = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > r) && u !== 0)
      g(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < r)
      break;
  }
  return s ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function qi(e, r, n) {
  var i, o, l, t, s, u, c = e.tag, f = e.anchor, a = {}, p = /* @__PURE__ */ Object.create(null), h = null, d = null, x = null, v = !1, O = !1, C;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), C = e.input.charCodeAt(e.position); C !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, g(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (C === 63 || C === 58) && F(i))
      C === 63 ? (v && (W(e, a, p, h, d, null, t, s, u), h = d = x = null), O = !0, v = !0, o = !0) : v ? (v = !1, o = !0) : g(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, C = i;
    else {
      if (t = e.line, s = e.lineStart, u = e.position, !Z(e, n, _r, !1, !0))
        break;
      if (e.line === l) {
        for (C = e.input.charCodeAt(e.position); Y(C); )
          C = e.input.charCodeAt(++e.position);
        if (C === 58)
          C = e.input.charCodeAt(++e.position), F(C) || g(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (W(e, a, p, h, d, null, t, s, u), h = d = x = null), O = !0, v = !1, o = !1, h = e.tag, d = e.result;
        else if (O)
          g(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = c, e.anchor = f, !0;
      } else if (O)
        g(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = c, e.anchor = f, !0;
    }
    if ((e.line === l || e.lineIndent > r) && (v && (t = e.line, s = e.lineStart, u = e.position), Z(e, r, Se, !0, o) && (v ? d = e.result : x = e.result), v || (W(e, a, p, h, d, x, t, s, u), h = d = x = null), A(e, !0, -1), C = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > r) && C !== 0)
      g(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < r)
      break;
  }
  return v && W(e, a, p, h, d, null, t, s, u), O && (e.tag = c, e.anchor = f, e.kind = "mapping", e.result = a), O;
}
function Wi(e) {
  var r, n = !1, i = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && g(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (n = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (i = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", r = e.position, n) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(r, e.position), t = e.input.charCodeAt(++e.position)) : g(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !F(t); )
      t === 33 && (i ? g(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(r - 1, e.position + 1), Er.test(o) || g(e, "named tag handle cannot contain such characters"), i = !0, r = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(r, e.position), Ri.test(l) && g(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !Sr.test(l) && g(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    g(e, "tag name is malformed: " + l);
  }
  return n ? e.tag = l : M.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : g(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Vi(e) {
  var r, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && g(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), r = e.position; n !== 0 && !F(n) && !q(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === r && g(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(r, e.position), !0;
}
function Qi(e) {
  var r, n, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), r = e.position; i !== 0 && !F(i) && !q(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === r && g(e, "name of an alias node must contain at least one character"), n = e.input.slice(r, e.position), M.call(e.anchorMap, n) || g(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], A(e, !0, -1), !0;
}
function Z(e, r, n, i, o) {
  var l, t, s, u = 1, c = !1, f = !1, a, p, h, d, x, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = s = Se === n || br === n, i && A(e, !0, -1) && (c = !0, e.lineIndent > r ? u = 1 : e.lineIndent === r ? u = 0 : e.lineIndent < r && (u = -1)), u === 1)
    for (; Wi(e) || Vi(e); )
      A(e, !0, -1) ? (c = !0, s = l, e.lineIndent > r ? u = 1 : e.lineIndent === r ? u = 0 : e.lineIndent < r && (u = -1)) : s = !1;
  if (s && (s = c || o), (u === 1 || Se === n) && (Ee === n || _r === n ? x = r : x = r + 1, v = e.position - e.lineStart, u === 1 ? s && (sr(e, v) || qi(e, v, x)) || Gi(e, x) ? f = !0 : (t && Ki(e, x) || Yi(e, x) || $i(e, x) ? f = !0 : Qi(e) ? (f = !0, (e.tag !== null || e.anchor !== null) && g(e, "alias node should not have any properties")) : ji(e, x, Ee === n) && (f = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : u === 0 && (f = s && sr(e, v))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && g(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, p = e.implicitTypes.length; a < p; a += 1)
      if (d = e.implicitTypes[a], d.resolve(e.result)) {
        e.result = d.construct(e.result), e.tag = d.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (M.call(e.typeMap[e.kind || "fallback"], e.tag))
      d = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (d = null, h = e.typeMap.multi[e.kind || "fallback"], a = 0, p = h.length; a < p; a += 1)
        if (e.tag.slice(0, h[a].tag.length) === h[a].tag) {
          d = h[a];
          break;
        }
    d || g(e, "unknown tag !<" + e.tag + ">"), e.result !== null && d.kind !== e.kind && g(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + d.kind + '", not "' + e.kind + '"'), d.resolve(e.result, e.tag) ? (e.result = d.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : g(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || f;
}
function Xi(e) {
  var r = e.position, n, i, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (A(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), n = e.position; t !== 0 && !F(t); )
      t = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(n, e.position), o = [], i.length < 1 && g(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; Y(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !I(t));
        break;
      }
      if (I(t)) break;
      for (n = e.position; t !== 0 && !F(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(n, e.position));
    }
    t !== 0 && Qe(e), M.call(tr, i) ? tr[i](e, i, o) : Te(e, 'unknown document directive "' + i + '"');
  }
  if (A(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, A(e, !0, -1)) : l && g(e, "directives end mark is expected"), Z(e, e.lineIndent - 1, Se, !1, !0), A(e, !0, -1), e.checkLineBreaks && Pi.test(e.input.slice(r, e.position)) && Te(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ie(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, A(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    g(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Fr(e, r) {
  e = String(e), r = r || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new Hi(e, r), i = e.indexOf("\0");
  for (i !== -1 && (n.position = i, g(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    Xi(n);
  return n.documents;
}
function Ji(e, r, n) {
  r !== null && typeof r == "object" && typeof n > "u" && (n = r, r = null);
  var i = Fr(e, n);
  if (typeof r != "function")
    return i;
  for (var o = 0, l = i.length; o < l; o += 1)
    r(i[o]);
}
function Zi(e, r) {
  var n = Fr(e, r);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new k("expected a single document in the stream, but found more");
  }
}
var zi = Ji, eo = Zi, ro = {
  loadAll: zi,
  load: eo
}, Lr = Object.prototype.toString, Ir = Object.prototype.hasOwnProperty, Je = 65279, no = 9, se = 10, io = 13, oo = 32, to = 33, lo = 34, je = 35, so = 37, uo = 38, co = 39, ao = 42, Nr = 44, fo = 45, Oe = 58, po = 61, ho = 62, go = 63, mo = 64, Pr = 91, Rr = 93, xo = 96, Dr = 123, Co = 124, Mr = 125, T = {};
T[0] = "\\0";
T[7] = "\\a";
T[8] = "\\b";
T[9] = "\\t";
T[10] = "\\n";
T[11] = "\\v";
T[12] = "\\f";
T[13] = "\\r";
T[27] = "\\e";
T[34] = '\\"';
T[92] = "\\\\";
T[133] = "\\N";
T[160] = "\\_";
T[8232] = "\\L";
T[8233] = "\\P";
var yo = [
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
], vo = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function wo(e, r) {
  var n, i, o, l, t, s, u;
  if (r === null) return {};
  for (n = {}, i = Object.keys(r), o = 0, l = i.length; o < l; o += 1)
    t = i[o], s = String(r[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), u = e.compiledTypeMap.fallback[t], u && Ir.call(u.styleAliases, s) && (s = u.styleAliases[s]), n[t] = s;
  return n;
}
function Ao(e) {
  var r, n, i;
  if (r = e.toString(16).toUpperCase(), e <= 255)
    n = "x", i = 2;
  else if (e <= 65535)
    n = "u", i = 4;
  else if (e <= 4294967295)
    n = "U", i = 8;
  else
    throw new k("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + b.repeat("0", i - r.length) + r;
}
var _o = 1, ue = 2;
function bo(e) {
  this.schema = e.schema || Ar, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = wo(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ue : _o, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function ur(e, r) {
  for (var n = b.repeat(" ", r), i = 0, o = -1, l = "", t, s = e.length; i < s; )
    o = e.indexOf(`
`, i), o === -1 ? (t = e.slice(i), i = s) : (t = e.slice(i, o + 1), i = o + 1), t.length && t !== `
` && (l += n), l += t;
  return l;
}
function Ye(e, r) {
  return `
` + b.repeat(" ", e.indent * r);
}
function Eo(e, r) {
  var n, i, o;
  for (n = 0, i = e.implicitTypes.length; n < i; n += 1)
    if (o = e.implicitTypes[n], o.resolve(r))
      return !0;
  return !1;
}
function ke(e) {
  return e === oo || e === no;
}
function ce(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Je || 65536 <= e && e <= 1114111;
}
function cr(e) {
  return ce(e) && e !== Je && e !== io && e !== se;
}
function ar(e, r, n) {
  var i = cr(e), o = i && !ke(e);
  return (
    // ns-plain-safe
    (n ? (
      // c = flow-in
      i
    ) : i && e !== Nr && e !== Pr && e !== Rr && e !== Dr && e !== Mr) && e !== je && !(r === Oe && !o) || cr(r) && !ke(r) && e === je || r === Oe && o
  );
}
function So(e) {
  return ce(e) && e !== Je && !ke(e) && e !== fo && e !== go && e !== Oe && e !== Nr && e !== Pr && e !== Rr && e !== Dr && e !== Mr && e !== je && e !== uo && e !== ao && e !== to && e !== Co && e !== po && e !== ho && e !== co && e !== lo && e !== so && e !== mo && e !== xo;
}
function To(e) {
  return !ke(e) && e !== Oe;
}
function ie(e, r) {
  var n = e.charCodeAt(r), i;
  return n >= 55296 && n <= 56319 && r + 1 < e.length && (i = e.charCodeAt(r + 1), i >= 56320 && i <= 57343) ? (n - 55296) * 1024 + i - 56320 + 65536 : n;
}
function Ur(e) {
  var r = /^\n* /;
  return r.test(e);
}
var Br = 1, $e = 2, Hr = 3, jr = 4, K = 5;
function Oo(e, r, n, i, o, l, t, s) {
  var u, c = 0, f = null, a = !1, p = !1, h = i !== -1, d = -1, x = So(ie(e, 0)) && To(ie(e, e.length - 1));
  if (r || t)
    for (u = 0; u < e.length; c >= 65536 ? u += 2 : u++) {
      if (c = ie(e, u), !ce(c))
        return K;
      x = x && ar(c, f, s), f = c;
    }
  else {
    for (u = 0; u < e.length; c >= 65536 ? u += 2 : u++) {
      if (c = ie(e, u), c === se)
        a = !0, h && (p = p || // Foldable line = too long, and not more-indented.
        u - d - 1 > i && e[d + 1] !== " ", d = u);
      else if (!ce(c))
        return K;
      x = x && ar(c, f, s), f = c;
    }
    p = p || h && u - d - 1 > i && e[d + 1] !== " ";
  }
  return !a && !p ? x && !t && !o(e) ? Br : l === ue ? K : $e : n > 9 && Ur(e) ? K : t ? l === ue ? K : $e : p ? jr : Hr;
}
function ko(e, r, n, i, o) {
  e.dump = function() {
    if (r.length === 0)
      return e.quotingType === ue ? '""' : "''";
    if (!e.noCompatMode && (yo.indexOf(r) !== -1 || vo.test(r)))
      return e.quotingType === ue ? '"' + r + '"' : "'" + r + "'";
    var l = e.indent * Math.max(1, n), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), s = i || e.flowLevel > -1 && n >= e.flowLevel;
    function u(c) {
      return Eo(e, c);
    }
    switch (Oo(
      r,
      s,
      e.indent,
      t,
      u,
      e.quotingType,
      e.forceQuotes && !i,
      o
    )) {
      case Br:
        return r;
      case $e:
        return "'" + r.replace(/'/g, "''") + "'";
      case Hr:
        return "|" + fr(r, e.indent) + pr(ur(r, l));
      case jr:
        return ">" + fr(r, e.indent) + pr(ur(Fo(r, t), l));
      case K:
        return '"' + Lo(r) + '"';
      default:
        throw new k("impossible error: invalid scalar style");
    }
  }();
}
function fr(e, r) {
  var n = Ur(e) ? String(r) : "", i = e[e.length - 1] === `
`, o = i && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : i ? "" : "-";
  return n + l + `
`;
}
function pr(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Fo(e, r) {
  for (var n = /(\n+)([^\n]*)/g, i = function() {
    var c = e.indexOf(`
`);
    return c = c !== -1 ? c : e.length, n.lastIndex = c, hr(e.slice(0, c), r);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = n.exec(e); ) {
    var s = t[1], u = t[2];
    l = u[0] === " ", i += s + (!o && !l && u !== "" ? `
` : "") + hr(u, r), o = l;
  }
  return i;
}
function hr(e, r) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, i, o = 0, l, t = 0, s = 0, u = ""; i = n.exec(e); )
    s = i.index, s - o > r && (l = t > o ? t : s, u += `
` + e.slice(o, l), o = l + 1), t = s;
  return u += `
`, e.length - o > r && t > o ? u += e.slice(o, t) + `
` + e.slice(t + 1) : u += e.slice(o), u.slice(1);
}
function Lo(e) {
  for (var r = "", n = 0, i, o = 0; o < e.length; n >= 65536 ? o += 2 : o++)
    n = ie(e, o), i = T[n], !i && ce(n) ? (r += e[o], n >= 65536 && (r += e[o + 1])) : r += i || Ao(n);
  return r;
}
function Io(e, r, n) {
  var i = "", o = e.tag, l, t, s;
  for (l = 0, t = n.length; l < t; l += 1)
    s = n[l], e.replacer && (s = e.replacer.call(n, String(l), s)), (N(e, r, s, !1, !1) || typeof s > "u" && N(e, r, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function gr(e, r, n, i) {
  var o = "", l = e.tag, t, s, u;
  for (t = 0, s = n.length; t < s; t += 1)
    u = n[t], e.replacer && (u = e.replacer.call(n, String(t), u)), (N(e, r + 1, u, !0, !0, !1, !0) || typeof u > "u" && N(e, r + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += Ye(e, r)), e.dump && se === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function No(e, r, n) {
  var i = "", o = e.tag, l = Object.keys(n), t, s, u, c, f;
  for (t = 0, s = l.length; t < s; t += 1)
    f = "", i !== "" && (f += ", "), e.condenseFlow && (f += '"'), u = l[t], c = n[u], e.replacer && (c = e.replacer.call(n, u, c)), N(e, r, u, !1, !1) && (e.dump.length > 1024 && (f += "? "), f += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), N(e, r, c, !1, !1) && (f += e.dump, i += f));
  e.tag = o, e.dump = "{" + i + "}";
}
function Po(e, r, n, i) {
  var o = "", l = e.tag, t = Object.keys(n), s, u, c, f, a, p;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new k("sortKeys must be a boolean or a function");
  for (s = 0, u = t.length; s < u; s += 1)
    p = "", (!i || o !== "") && (p += Ye(e, r)), c = t[s], f = n[c], e.replacer && (f = e.replacer.call(n, c, f)), N(e, r + 1, c, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && se === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, a && (p += Ye(e, r)), N(e, r + 1, f, !0, a) && (e.dump && se === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, o += p));
  e.tag = l, e.dump = o || "{}";
}
function dr(e, r, n) {
  var i, o, l, t, s, u;
  for (o = n ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (s = o[l], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof r == "object" && r instanceof s.instanceOf) && (!s.predicate || s.predicate(r))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(r) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (u = e.styleMap[s.tag] || s.defaultStyle, Lr.call(s.represent) === "[object Function]")
          i = s.represent(r, u);
        else if (Ir.call(s.represent, u))
          i = s.represent[u](r, u);
        else
          throw new k("!<" + s.tag + '> tag resolver accepts not "' + u + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function N(e, r, n, i, o, l, t) {
  e.tag = null, e.dump = n, dr(e, n, !1) || dr(e, n, !0);
  var s = Lr.call(e.dump), u = i, c;
  i && (i = e.flowLevel < 0 || e.flowLevel > r);
  var f = s === "[object Object]" || s === "[object Array]", a, p;
  if (f && (a = e.duplicates.indexOf(n), p = a !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && r > 0) && (o = !1), p && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (f && p && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), s === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (Po(e, r, e.dump, o), p && (e.dump = "&ref_" + a + e.dump)) : (No(e, r, e.dump), p && (e.dump = "&ref_" + a + " " + e.dump));
    else if (s === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !t && r > 0 ? gr(e, r - 1, e.dump, o) : gr(e, r, e.dump, o), p && (e.dump = "&ref_" + a + e.dump)) : (Io(e, r, e.dump), p && (e.dump = "&ref_" + a + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && ko(e, e.dump, r, l, u);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new k("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (c = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? c = "!" + c : c.slice(0, 18) === "tag:yaml.org,2002:" ? c = "!!" + c.slice(18) : c = "!<" + c + ">", e.dump = c + " " + e.dump);
  }
  return !0;
}
function Ro(e, r) {
  var n = [], i = [], o, l;
  for (Ge(e, n, i), o = 0, l = i.length; o < l; o += 1)
    r.duplicates.push(n[i[o]]);
  r.usedDuplicates = new Array(l);
}
function Ge(e, r, n) {
  var i, o, l;
  if (e !== null && typeof e == "object")
    if (o = r.indexOf(e), o !== -1)
      n.indexOf(o) === -1 && n.push(o);
    else if (r.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        Ge(e[o], r, n);
    else
      for (i = Object.keys(e), o = 0, l = i.length; o < l; o += 1)
        Ge(e[i[o]], r, n);
}
function Do(e, r) {
  r = r || {};
  var n = new bo(r);
  n.noRefs || Ro(e, n);
  var i = e;
  return n.replacer && (i = n.replacer.call({ "": i }, "", i)), N(n, 0, i, !0, !0) ? n.dump + `
` : "";
}
var Mo = Do, Uo = {
  dump: Mo
}, Yr = ro.load, Bo = Uo.dump;
function Ne(e) {
  if (!e) return e;
  const r = atob(e), n = new Uint8Array(r.length);
  for (let i = 0; i < r.length; i++)
    n[i] = r.charCodeAt(i);
  return new TextDecoder().decode(n);
}
function $r(e) {
  if (!e) return e;
  const r = new TextEncoder().encode(e.trim());
  let n = "";
  for (let i = 0; i < r.length; i += 1)
    n += String.fromCharCode(r[i]);
  return btoa(n);
}
const oe = {
  retries: 3,
  // 默认最大重试次数
  retryDelay: 1e3,
  // 默认每次重试的间隔时间（毫秒）
  retryOnStatusCodes: [500, 502, 503, 504]
  // 默认重试的状态码
};
class Ho {
  constructor() {
    Re(this, "requestInterceptors", []);
    Re(this, "responseInterceptors", []);
  }
  // 添加请求拦截器
  useRequestInterceptor(r) {
    this.requestInterceptors.push(r);
  }
  // 添加响应拦截器
  useResponseInterceptor(r) {
    this.responseInterceptors.push(r);
  }
  // 核心请求方法
  async request(r) {
    let n = { ...r };
    n.retries = n.retries ?? oe.retries, n.retryDelay = n.retryDelay ?? oe.retryDelay;
    for (const u of this.requestInterceptors)
      n = await u(n);
    if (n.params) {
      const u = new URLSearchParams(n.params).toString();
      n.url += (n.url.includes("?") ? "&" : "?") + u;
    }
    n.method = n.method || "GET";
    const { timeout: i = 1e4 } = n;
    let o = 0;
    const l = new AbortController(), t = r.signal || l.signal, s = async () => {
      o++;
      const u = setTimeout(() => {
        l.abort();
      }, i);
      try {
        const c = await fetch(n.url, {
          method: n.method,
          headers: n.headers,
          body: n.body ? JSON.stringify(n.body) : void 0,
          signal: t
        });
        clearTimeout(u);
        let f = {
          data: c,
          status: c.status,
          statusText: c.statusText,
          headers: c.headers,
          config: n,
          ok: c.ok
        };
        for (const a of this.responseInterceptors)
          f = await a(f);
        return !c.ok && n.retries && o < n.retries ? (await new Promise((a) => setTimeout(a, n.retryDelay)), s()) : f;
      } catch (c) {
        if (c.name === "AbortError")
          throw new Error("Request timed out");
        if (n.retries && o < n.retries)
          return await new Promise((f) => setTimeout(f, n.retryDelay)), s();
        throw c;
      }
    };
    return s();
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
  get(r, n) {
    return this.request({ ...n, url: r, method: "GET" });
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
  post(r, n, i) {
    return this.request({ ...i, url: r, method: "POST", body: n });
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
  put(r, n, i) {
    return this.request({ ...i, url: r, method: "PUT", body: n });
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
  delete(r, n) {
    return this.request({ ...n, url: r, method: "DELETE" });
  }
}
async function Ke(e, r) {
  const {
    retries: n = oe.retries,
    retryDelay: i = oe.retryDelay,
    retryOnStatusCodes: o = oe.retryOnStatusCodes,
    onError: l,
    ...t
  } = r;
  let s = 0;
  const u = async () => {
    s++;
    try {
      const c = await jo.request({ url: e, ...t });
      if (o.includes(c.status) && s <= n) {
        if (l) {
          const f = l(new Error(`Request failed with status ${c.status}`), s);
          f instanceof Promise && await f;
        }
        return await new Promise((f) => setTimeout(f, i)), u();
      }
      return c;
    } catch (c) {
      if (l) {
        const f = l(c, s);
        f instanceof Promise && await f;
      }
      if (s <= n)
        return await new Promise((f) => setTimeout(f, i)), u();
      throw c;
    }
  };
  return u();
}
const jo = new Ho();
var ae, fe, pe, Fe;
class Yo {
  constructor() {
    y(this, ae, ["localhost", "127.0.0.1", "abc.cba.com"]);
    y(this, fe, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    y(this, pe, 1024);
    y(this, Fe, 65535);
  }
  /**
   * @description 获取随机hostname
   * @returns {string} hostname
   */
  getHostName() {
    return m(this, ae)[Math.floor(Math.random() * m(this, ae).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (m(this, Fe) - m(this, pe) + 1) + m(this, pe)).toString();
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
    return m(this, fe)[Math.floor(Math.random() * m(this, fe).length)];
  }
}
ae = new WeakMap(), fe = new WeakMap(), pe = new WeakMap(), Fe = new WeakMap();
var he, ge, de, me;
class Pe extends Yo {
  constructor() {
    super();
    /** * @description vps原始配置 */
    y(this, he, {});
    /** * @description 混淆配置 */
    y(this, ge, {});
    /** * @description 原始备注 */
    y(this, de, "");
    /** * @description 混淆备注 */
    y(this, me, "");
    E(this, me, this.getUUID());
  }
  /**
   * @description 设置原始配置
   * @param {Partial<T>} config
   */
  setConfuseConfig(n) {
    E(this, ge, n);
  }
  /**
   * @description 设置混淆配置
   * @param {Partial<T>} config
   * @param {string} ps
   */
  setOriginConfig(n, i) {
    E(this, he, n), E(this, de, decodeURIComponent(i));
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return m(this, de);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return m(this, he);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return m(this, me);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return m(this, ge);
  }
}
he = new WeakMap(), ge = new WeakMap(), de = new WeakMap(), me = new WeakMap();
var H, Q;
const L = class L {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(r) {
    const n = r.split(m(L, H));
    return [n[0], n[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(r, n) {
    return [r, n].join(m(L, H));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(r) {
    if (!(r != null && r.includes(m(L, H)))) return null;
    if (m(L, Q).has(r))
      return m(L, Q).get(r);
    const [n] = L.getPs(r);
    if (n) {
      const i = n.trim();
      return m(L, Q).set(r, i), i;
    }
    return null;
  }
  static isConfigType(r) {
    return r.includes(m(this, H));
  }
};
H = new WeakMap(), Q = new WeakMap(), y(L, H, "^LINK_TO^"), y(L, Q, /* @__PURE__ */ new Map());
let _ = L;
function $o(e) {
  try {
    return Ne(e), "base64";
  } catch {
    try {
      return Yr(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function Go(e, r = 10) {
  const n = [];
  let i = [];
  return e.forEach((o, l) => {
    i.push(o), (l + 1) % r === 0 && (n.push(i.join("|")), i = []);
  }), i.length > 0 && n.push(i.join("|")), n;
}
var j, Le, Gr;
class Ko {
  constructor(r = []) {
    y(this, Le);
    y(this, j);
    const n = r.map((o) => Yr(o));
    E(this, j, n.at(-1));
    const i = w(this, Le, Gr).call(this, n);
    m(this, j).proxies = i.proxies, m(this, j)["proxy-groups"] = i["proxy-groups"];
  }
  get clashConfig() {
    return m(this, j);
  }
}
j = new WeakMap(), Le = new WeakSet(), /**
 * @description 合并配置
 * @param {ClashType[]} configs
 * @returns {ClashType} mergedConfig
 */
Gr = function(r = []) {
  const n = {
    proxies: [],
    "proxy-groups": []
  }, i = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null), l = r.reduce((u, c) => u + c.proxies.length, 0), t = new Int32Array(l);
  let s = 0;
  for (const u of r) {
    const c = u.proxies, f = u["proxy-groups"];
    for (let p = 0; p < c.length; p++) {
      const h = c[p], [d, x] = _.getPs(h.name);
      if (o[h.name]) {
        t[s++] = -1;
        continue;
      }
      const v = i[d] || 0;
      i[d] = v + 1;
      const O = v === 0 ? h.name : _.setPs(`${d} ${v + 1}`, x);
      o[h.name] = O;
      const C = {
        ...h,
        name: O
      };
      n.proxies[s] = C, t[s] = s, s++;
    }
    if (!f) continue;
    const a = /* @__PURE__ */ new Set();
    for (const p of f) {
      if (a.has(p.name)) continue;
      const h = n["proxy-groups"].find((d) => d.name === p.name);
      if (p.proxies = p.proxies || [], h) {
        const d = new Set(h.proxies);
        for (const x of p.proxies)
          d.add(o[x] || x);
        h.proxies = Array.from(d);
      } else {
        const d = {
          ...p,
          proxies: p.proxies.map((x) => o[x] || x)
        };
        n["proxy-groups"].push(d);
      }
      a.add(p.name);
    }
  }
  return n.proxies = n.proxies.filter((u, c) => t[c] !== -1), n;
};
var X, $, Kr, qe;
class qo {
  constructor(r = []) {
    y(this, $);
    y(this, X, {});
    E(this, X, r.at(-1));
    const n = w(this, $, Kr).call(this, r);
    m(this, X).outbounds = n.outbounds;
  }
  get singboxConfig() {
    return m(this, X);
  }
}
X = new WeakMap(), $ = new WeakSet(), Kr = function(r) {
  var s, u;
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = [];
  for (const c of r)
    if ((s = c.outbounds) != null && s.length)
      for (const f of c.outbounds) {
        const a = _.getPrefix(f.tag ?? "");
        a && o.set(a, (o.get(a) || 0) + 1);
      }
  const t = (c) => {
    var f;
    if (c.type === "selector") {
      const a = _.getPrefix(c.tag);
      a && o.get(a) > 1 && (c.tag = w(this, $, qe).call(this, c.tag, i, n)), (f = c.outbounds) != null && f.length && (c.outbounds = c.outbounds.map((p) => {
        const h = _.getPrefix(p);
        return h && o.get(h) > 1 && n.get(p) || p;
      }));
    } else {
      const a = _.getPrefix(c.tag);
      a && o.get(a) > 1 && (c.tag = w(this, $, qe).call(this, c.tag, i, n));
    }
    return c;
  };
  for (const c of r) {
    if (!((u = c.outbounds) != null && u.length)) continue;
    const f = c.outbounds.map(t);
    l.push(...f);
  }
  return { outbounds: l };
}, qe = function(r, n, i) {
  if (i.has(r))
    return i.get(r);
  try {
    const [o, l] = _.getPs(r);
    if (o && l) {
      const t = (n.get(o.trim()) || 0) + 1;
      n.set(o.trim(), t);
      const s = _.setPs(`${o.trim()} ${t}`, l);
      return i.set(r, s), s;
    }
  } catch (o) {
    console.warn(`Failed to parse name: ${r}`, o);
  }
  return i.set(r, r), r;
};
var xe, Ce, R, U, qr, Wr, Vr;
class Wo extends Pe {
  constructor(n) {
    super();
    y(this, U);
    /** @description 原始链接 */
    y(this, xe, "");
    /** @description 混淆链接 */
    y(this, Ce, "");
    /** @description 解析的私有配置 */
    y(this, R, {});
    w(this, U, qr).call(this, n);
  }
  restoreClash(n, i) {
    var o;
    return n.name = i, n.server = this.originConfig.hostname ?? "", n.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), n.cipher = m(this, R).originEncryptionProtocol, n.password = m(this, R).originPassword, n;
  }
  restoreSingbox(n, i) {
    return n.password = m(this, R).originPassword, n.server = this.originConfig.hostname ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.tag = i, n;
  }
  get confuseLink() {
    return m(this, Ce);
  }
  get originLink() {
    return m(this, xe);
  }
}
xe = new WeakMap(), Ce = new WeakMap(), R = new WeakMap(), U = new WeakSet(), qr = function(n) {
  E(this, xe, n);
  const i = new URL(n);
  this.setOriginConfig(i, i.hash);
  const o = this.getEncrtptionProtocol(), l = this.getPassword();
  w(this, U, Wr).call(this, i.username), this.setConfuseConfig({
    username: encodeURIComponent($r(`${o}:${l}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: _.setPs(this.originPs, this.confusePs)
  }), w(this, U, Vr).call(this);
}, Wr = function(n) {
  const [i, o] = Ne(decodeURIComponent(n)).split(":");
  m(this, R).originEncryptionProtocol = i, m(this, R).originPassword = o;
}, Vr = function() {
  const { username: n, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  E(this, Ce, `ss://${n}@${i}:${o}${l ?? ""}${t}`);
};
var ye, ve, z, Qr, Xr;
class Vo extends Pe {
  constructor(n) {
    super();
    y(this, z);
    /** * @description 原始链接 */
    y(this, ye, "");
    /** * @description 混淆链接 */
    y(this, ve, "");
    w(this, z, Qr).call(this, n);
  }
  restoreClash(n, i) {
    var o;
    return n.name = i, n.server = this.originConfig.hostname ?? "", n.port = Number(this.originConfig.port ?? 0), n.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", n;
  }
  restoreSingbox(n, i) {
    var o;
    return n.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", n.server = this.originConfig.hostname ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.tag = i, n;
  }
  get confuseLink() {
    return m(this, ve);
  }
  get originLink() {
    return m(this, ye);
  }
}
ye = new WeakMap(), ve = new WeakMap(), z = new WeakSet(), Qr = function(n) {
  E(this, ye, n);
  const i = new URL(n);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: _.setPs(this.originPs, this.confusePs)
  }), w(this, z, Xr).call(this);
}, Xr = function() {
  const { password: n, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  E(this, ve, `trojan://${n}@${i}:${o}${l}${t}`);
};
var we, Ae, ee, Jr, Zr;
class Qo extends Pe {
  constructor(n) {
    super();
    y(this, ee);
    /** * @description 原始链接 */
    y(this, we, "");
    /** * @description 混淆链接 */
    y(this, Ae, "");
    w(this, ee, Jr).call(this, n);
  }
  restoreClash(n, i) {
    var o;
    return n.name = i, n.server = this.originConfig.hostname ?? "", n.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), n.uuid = this.originConfig.username ?? "", n;
  }
  restoreSingbox(n, i) {
    var o;
    return n.tag = i, n.server = this.originConfig.hostname ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.uuid = this.originConfig.username ?? "", (o = n.tls) != null && o.server_name && (n.tls.server_name = this.originConfig.hostname ?? ""), n;
  }
  get confuseLink() {
    return m(this, Ae);
  }
  get originLink() {
    return m(this, we);
  }
}
we = new WeakMap(), Ae = new WeakMap(), ee = new WeakSet(), Jr = function(n) {
  E(this, we, n);
  const i = new URL(n);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: _.setPs(this.originPs, this.confusePs)
  }), w(this, ee, Zr).call(this);
}, Zr = function() {
  const { password: n, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  E(this, Ae, `vless://${n}@${i}:${o}${l}${t}`);
};
var _e, be, B, zr, en, rn;
class Xo extends Pe {
  constructor(n) {
    super();
    y(this, B);
    /** * @description 原始链接 */
    y(this, _e, "");
    /** * @description 混淆链接 */
    y(this, be, "");
    w(this, B, zr).call(this, n);
  }
  restoreClash(n, i) {
    var o, l;
    return w(this, B, rn).call(this, n), n.name = i, n.server = this.originConfig.add ?? "", n.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), n.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", n;
  }
  restoreSingbox(n, i) {
    var o, l;
    return n.server = this.originConfig.add ?? "", n.server_port = Number(this.originConfig.port ?? 0), n.tag = i, (o = n.tls) != null && o.server_name && (n.tls.server_name = this.originConfig.add ?? ""), n.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", n;
  }
  get confuseLink() {
    return m(this, be);
  }
  get originLink() {
    return m(this, _e);
  }
}
_e = new WeakMap(), be = new WeakMap(), B = new WeakSet(), zr = function(n) {
  const [i, o] = n.match(/vmess:\/\/(.*)/) || [], l = JSON.parse(Ne(o));
  E(this, _e, n), this.setOriginConfig(l, l.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: _.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), w(this, B, en).call(this);
}, en = function() {
  const { add: n, port: i, id: o, ps: l, scy: t, net: s, type: u, tls: c, v: f } = this.confuseConfig;
  E(this, be, `vmess://${$r(JSON.stringify({ v: f, ps: l, add: n, port: i, id: o, scy: t, net: s, type: u, tls: c }))}`);
}, rn = function(n) {
  n.network === "ws" && (n["ws-opts"] = {
    ...n["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...n["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
async function Jo(e) {
  const r = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  async function i(o) {
    for await (const l of o) {
      if (l.startsWith("vless:")) {
        const t = new Qo(l);
        r.add(t.confuseLink), n.set(t.confusePs, t);
      }
      if (l.startsWith("vmess:")) {
        const t = new Xo(l);
        r.add(t.confuseLink), n.set(t.confusePs, t);
      }
      if (l.startsWith("trojan://")) {
        const t = new Vo(l);
        r.add(t.confuseLink), n.set(t.confusePs, t);
      }
      if (l.startsWith("ss://")) {
        const t = new Wo(l);
        r.add(t.confuseLink), n.set(t.confusePs, t);
      }
      if (l.startsWith("https://") || l.startsWith("http://")) {
        const t = await Ke(l, { retries: 3 }).then((u) => u.data.text());
        $o(t) === "base64" && await i(sn.base64(t));
      }
    }
  }
  return await i(e), { urls: r, vpsMap: n };
}
var J;
const V = class V {
  /**
   * @description 获取混淆链接组
   * @param {string | URL} url
   * @param {string} backend
   * @param {string} chunkCount
   * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
   */
  static async getConfuseUrl(r, n, i) {
    const { searchParams: o } = new URL(r), t = o.get("url").split(/\||\n/).filter(Boolean), { urls: s, vpsMap: u } = await Jo(t), c = Go(Array.from(s), Number(i));
    return E(V, J, c.map((f) => {
      const a = new URL(`${n}/sub`), { searchParams: p } = new URL(r);
      return p.set("url", f), a.search = p.toString(), a.toString();
    })), { vpsMap: u };
  }
  /**
   * @description 获取Clash混淆配置
   * @returns {Promise<Clash>} clashConfig
   */
  static async getClashConfuseConfig() {
    try {
      const r = await Promise.all(m(V, J).map((i) => Ke(i, { retries: 3 }).then((o) => o.data.text())));
      return new Ko(r).clashConfig;
    } catch (r) {
      throw new Error(r.message || r);
    }
  }
  /**
   * @description 获取Singbox混淆配置
   * @returns {Promise<Singbox>} Singbox
   */
  static async getSingboxConfuseConfig() {
    try {
      const r = await Promise.all(
        m(V, J).map((i) => Ke(i, { retries: 3 }).then((o) => o.data.json()))
      );
      return new qo(r).singboxConfig;
    } catch (r) {
      throw new Error(r.message || r);
    }
  }
};
J = new WeakMap(), y(V, J);
let te = V;
var re, nn, on;
class Zo {
  constructor() {
    y(this, re);
  }
  /**
   * @description 获取原始配置
   * @param {ClashType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {ClashType} originConfig
   */
  getOriginConfig(r, n) {
    try {
      return r.proxies = w(this, re, nn).call(this, r.proxies, n), r["proxy-groups"] = r["proxy-groups"].map((i) => (i.proxies && (i.proxies = w(this, re, on).call(this, i.proxies)), i)), r;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
re = new WeakSet(), nn = function(r, n) {
  try {
    const i = [];
    for (const o of r) {
      const [l, t] = _.getPs(o.name);
      if (n.has(t)) {
        const s = n.get(t);
        s == null || s.restoreClash(o, l), i.push(o);
      }
    }
    return i;
  } catch (i) {
    throw new Error(`Restore proxies failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, on = function(r) {
  try {
    return r.map((n) => {
      const [i] = _.getPs(n);
      return i;
    });
  } catch (n) {
    throw new Error(`Update proxies groups failed: ${n.message || n}, function trace: ${n.stack}`);
  }
};
var P, tn, ln, We;
class zo {
  constructor() {
    y(this, P);
  }
  /**
   * @description 获取原始配置
   * @param {SingboxType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {SingboxType} originConfig
   */
  getOriginConfig(r, n) {
    try {
      return r.outbounds = w(this, P, tn).call(this, r.outbounds, n), r;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
P = new WeakSet(), tn = function(r = [], n) {
  try {
    const i = [];
    for (const o of r) {
      if (w(this, P, We).call(this, o.tag)) {
        const [l, t] = _.getPs(o.tag), s = n.get(t);
        s == null || s.restoreSingbox(o, l);
      }
      Reflect.has(o, "outbounds") && (o.outbounds = w(this, P, ln).call(this, o.outbounds)), i.push(o);
    }
    return console.log("result", i), i;
  } catch (i) {
    throw new Error(`Restore outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, ln = function(r = []) {
  try {
    return r.map((n) => {
      if (w(this, P, We).call(this, n)) {
        const [i] = _.getPs(n);
        return i;
      }
      return n;
    });
  } catch (n) {
    throw new Error(`Update outbounds failed: ${n.message || n}, function trace: ${n.stack}`);
  }
}, We = function(r) {
  return _.isConfigType(r);
};
const et = new Zo(), rt = new zo();
class sn {
  /**
   * @description 处理base64订阅
   * @param {string} subs
   * @returns {string[]} content
   */
  static base64(r) {
    return Ne(r).split(`
`).filter(Boolean).map((i) => decodeURIComponent(i));
  }
  /**
   * @description 获取转换类型
   * @param {string | URL} url
   * @returns {ConvertTarget | null} 转换类型
   */
  static getConvertType(r) {
    const { searchParams: n } = new URL(r);
    return n.get("target");
  }
}
function nt(e = "") {
  return e.split(`
`).reduce((n, i) => (n.push({
    label: i,
    value: i
  }), n), []);
}
function it(e, r) {
  return e.replace("#{cloudflare_worker_sub}", r);
}
function ot(e, r) {
  const n = r === "" ? [] : nt(r);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(n));
}
function tt(e, r) {
  return e.replace("'#{DISABLED_BACKEND}'", r ? "true" : "false");
}
const ne = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function lt(e) {
  try {
    const { url: r, lockBackend: n, remoteConfig: i, origin: o } = e, l = await fetch(`${r}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = it(t, o), t = ot(t, i), t = tt(t, n), gn(t, new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" }));
  } catch (r) {
    return xr(r.message || r);
  }
}
const ut = {
  async fetch(e, r) {
    try {
      const { pathname: n, origin: i } = new URL(e.url);
      if (n === "/sub") {
        const { vpsMap: o } = await te.getConfuseUrl(
          e.url,
          r.BACKEND ?? ne.BACKEND,
          r.CHUNK_COUNT ?? ne.CHUNK_COUNT
        ), l = sn.getConvertType(e.url);
        if (!l)
          return er("Unsupported client type");
        if (["clash", "clashr"].includes(l)) {
          const t = await te.getClashConfuseConfig(), s = et.getOriginConfig(t, o);
          return ze(
            Bo(s, { indent: 2, lineWidth: 200 }),
            new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          );
        }
        if (l === "singbox") {
          const t = await te.getSingboxConfuseConfig(), s = rt.getOriginConfig(t, o);
          return ze(
            JSON.stringify(s),
            new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          );
        }
        return er("Unsupported client type, support list: clash, clashr");
      }
      return lt({
        url: r.PAGE_URL ?? ne.PAGE_URL,
        lockBackend: r.LOCK_BACKEND ?? ne.LOCK_BACKEND,
        remoteConfig: r.REMOTE_CONFIG ?? ne.REMOTE_CONFIG,
        origin: i
      });
    } catch (n) {
      return xr(n.message || n);
    }
  }
};
export {
  ut as default
};
