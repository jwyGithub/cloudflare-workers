var sr = Object.defineProperty;
var Je = (e) => {
  throw TypeError(e);
};
var cr = (e, n, r) => n in e ? sr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var Re = (e, n, r) => cr(e, typeof n != "symbol" ? n + "" : n, r), De = (e, n, r) => n.has(e) || Je("Cannot " + r);
var x = (e, n, r) => (De(e, n, "read from private field"), r ? r.call(e) : n.get(e)), y = (e, n, r) => n.has(e) ? Je("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), _ = (e, n, r, i) => (De(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), A = (e, n, r) => (De(e, n, "access private method"), r);
const ar = "bad request", fr = "internal server error", mn = new Headers({
  "Content-type": "application/json"
}), pr = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const hr = new Headers({
  "Content-type": "text/html"
}), Ze = (e, n = pr) => new Response(e, {
  status: 200,
  headers: n
}), dr = (e, n = hr) => new Response(e, {
  headers: n
}), ze = (e = ar, n = 400, r = mn) => Response.json(
  {
    status: n,
    message: e
  },
  {
    status: n,
    statusText: e,
    headers: r
  }
), xn = (e = fr, n = 500, r = mn) => Response.json(
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
function Cn(e) {
  return typeof e > "u" || e === null;
}
function gr(e) {
  return typeof e == "object" && e !== null;
}
function mr(e) {
  return Array.isArray(e) ? e : Cn(e) ? [] : [e];
}
function xr(e, n) {
  var r, i, o, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      o = l[r], e[o] = n[o];
  return e;
}
function Cr(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function yr(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var wr = Cn, vr = gr, Ar = mr, br = Cr, _r = yr, Er = xr, b = {
  isNothing: wr,
  isObject: vr,
  toArray: Ar,
  repeat: br,
  isNegativeZero: _r,
  extend: Er
};
function yn(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function ie(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = yn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
ie.prototype = Object.create(Error.prototype);
ie.prototype.constructor = ie;
ie.prototype.toString = function(n) {
  return this.name + ": " + yn(this, n);
};
var O = ie;
function Me(e, n, r, i, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return i - n > u && (l = " ... ", n = i - u + l.length), r - i > u && (t = " ...", r = i + u - t.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + t,
    pos: i - n + l.length
    // relative position
  };
}
function Ue(e, n) {
  return b.repeat(" ", n - e.length) + e;
}
function Sr(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], o = [], l, t = -1; l = r.exec(e.buffer); )
    o.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = i.length - 2);
  t < 0 && (t = i.length - 1);
  var u = "", s, c, a = Math.min(e.line + n.linesAfter, o.length).toString().length, f = n.maxLength - (n.indent + a + 3);
  for (s = 1; s <= n.linesBefore && !(t - s < 0); s++)
    c = Me(
      e.buffer,
      i[t - s],
      o[t - s],
      e.position - (i[t] - i[t - s]),
      f
    ), u = b.repeat(" ", n.indent) + Ue((e.line - s + 1).toString(), a) + " | " + c.str + `
` + u;
  for (c = Me(e.buffer, i[t], o[t], e.position, f), u += b.repeat(" ", n.indent) + Ue((e.line + 1).toString(), a) + " | " + c.str + `
`, u += b.repeat("-", n.indent + a + 3 + c.pos) + `^
`, s = 1; s <= n.linesAfter && !(t + s >= o.length); s++)
    c = Me(
      e.buffer,
      i[t + s],
      o[t + s],
      e.position - (i[t] - i[t + s]),
      f
    ), u += b.repeat(" ", n.indent) + Ue((e.line + s + 1).toString(), a) + " | " + c.str + `
`;
  return u.replace(/\n$/, "");
}
var Tr = Sr, Or = [
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
], kr = [
  "scalar",
  "sequence",
  "mapping"
];
function Fr(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function Lr(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (Or.indexOf(r) === -1)
      throw new O('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = Fr(n.styleAliases || null), kr.indexOf(this.kind) === -1)
    throw new O('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var E = Lr;
function en(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var o = r.length;
    r.forEach(function(l, t) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (o = t);
    }), r[o] = i;
  }), r;
}
function Ir() {
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
function He(e) {
  return this.extend(e);
}
He.prototype.extend = function(n) {
  var r = [], i = [];
  if (n instanceof E)
    i.push(n);
  else if (Array.isArray(n))
    i = i.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (r = r.concat(n.implicit)), n.explicit && (i = i.concat(n.explicit));
  else
    throw new O("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(l) {
    if (!(l instanceof E))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new O("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new O("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof E))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(He.prototype);
  return o.implicit = (this.implicit || []).concat(r), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = en(o, "implicit"), o.compiledExplicit = en(o, "explicit"), o.compiledTypeMap = Ir(o.compiledImplicit, o.compiledExplicit), o;
};
var Nr = He, Pr = new E("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Rr = new E("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Dr = new E("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Mr = new Nr({
  explicit: [
    Pr,
    Rr,
    Dr
  ]
});
function Ur(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Br() {
  return null;
}
function Hr(e) {
  return e === null;
}
var $r = new E("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Ur,
  construct: Br,
  predicate: Hr,
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
function jr(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Yr(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Kr(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Gr = new E("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: jr,
  construct: Yr,
  predicate: Kr,
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
function qr(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Wr(e) {
  return 48 <= e && e <= 55;
}
function Vr(e) {
  return 48 <= e && e <= 57;
}
function Qr(e) {
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
          if (!qr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "o") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (!Wr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; r < n; r++)
    if (o = e[r], o !== "_") {
      if (!Vr(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || o === "_");
}
function Xr(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function Jr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !b.isNegativeZero(e);
}
var Zr = new E("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Qr,
  construct: Xr,
  predicate: Jr,
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
}), zr = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function ei(e) {
  return !(e === null || !zr.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function ni(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var ri = /^[-+]?[0-9]+e/;
function ii(e, n) {
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
  return r = e.toString(10), ri.test(r) ? r.replace("e", ".e") : r;
}
function oi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || b.isNegativeZero(e));
}
var ti = new E("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: ei,
  construct: ni,
  predicate: oi,
  represent: ii,
  defaultStyle: "lowercase"
}), li = Mr.extend({
  implicit: [
    $r,
    Gr,
    Zr,
    ti
  ]
}), ui = li, wn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), vn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function si(e) {
  return e === null ? !1 : wn.exec(e) !== null || vn.exec(e) !== null;
}
function ci(e) {
  var n, r, i, o, l, t, u, s = 0, c = null, a, f, p;
  if (n = wn.exec(e), n === null && (n = vn.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(r, i, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (s = n[7].slice(0, 3); s.length < 3; )
      s += "0";
    s = +s;
  }
  return n[9] && (a = +n[10], f = +(n[11] || 0), c = (a * 60 + f) * 6e4, n[9] === "-" && (c = -c)), p = new Date(Date.UTC(r, i, o, l, t, u, s)), c && p.setTime(p.getTime() - c), p;
}
function ai(e) {
  return e.toISOString();
}
var fi = new E("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: si,
  construct: ci,
  instanceOf: Date,
  represent: ai
});
function pi(e) {
  return e === "<<" || e === null;
}
var hi = new E("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: pi
}), We = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function di(e) {
  if (e === null) return !1;
  var n, r, i = 0, o = e.length, l = We;
  for (r = 0; r < o; r++)
    if (n = l.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function gi(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), o = i.length, l = We, t = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)), t = t << 6 | l.indexOf(i.charAt(n));
  return r = o % 4 * 6, r === 0 ? (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)) : r === 18 ? (u.push(t >> 10 & 255), u.push(t >> 2 & 255)) : r === 12 && u.push(t >> 4 & 255), new Uint8Array(u);
}
function mi(e) {
  var n = "", r = 0, i, o, l = e.length, t = We;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]), r = (r << 8) + e[i];
  return o = l % 3, o === 0 ? (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]) : o === 2 ? (n += t[r >> 10 & 63], n += t[r >> 4 & 63], n += t[r << 2 & 63], n += t[64]) : o === 1 && (n += t[r >> 2 & 63], n += t[r << 4 & 63], n += t[64], n += t[64]), n;
}
function xi(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Ci = new E("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: di,
  construct: gi,
  predicate: xi,
  represent: mi
}), yi = Object.prototype.hasOwnProperty, wi = Object.prototype.toString;
function vi(e) {
  if (e === null) return !0;
  var n = [], r, i, o, l, t, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (o = u[r], t = !1, wi.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (yi.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function Ai(e) {
  return e !== null ? e : [];
}
var bi = new E("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: vi,
  construct: Ai
}), _i = Object.prototype.toString;
function Ei(e) {
  if (e === null) return !0;
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1) {
    if (i = t[n], _i.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
    l[n] = [o[0], i[o[0]]];
  }
  return !0;
}
function Si(e) {
  if (e === null) return [];
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1)
    i = t[n], o = Object.keys(i), l[n] = [o[0], i[o[0]]];
  return l;
}
var Ti = new E("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Ei,
  construct: Si
}), Oi = Object.prototype.hasOwnProperty;
function ki(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (Oi.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function Fi(e) {
  return e !== null ? e : {};
}
var Li = new E("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: ki,
  construct: Fi
}), An = ui.extend({
  implicit: [
    fi,
    hi
  ],
  explicit: [
    Ci,
    bi,
    Ti,
    Li
  ]
}), M = Object.prototype.hasOwnProperty, _e = 1, bn = 2, _n = 3, Ee = 4, Be = 1, Ii = 2, nn = 3, Ni = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Pi = /[\x85\u2028\u2029]/, Ri = /[,\[\]\{\}]/, En = /^(?:!|!!|![a-z\-]+!)$/i, Sn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function rn(e) {
  return Object.prototype.toString.call(e);
}
function I(e) {
  return e === 10 || e === 13;
}
function j(e) {
  return e === 9 || e === 32;
}
function k(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function G(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Di(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function Mi(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Ui(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function on(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Bi(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Tn = new Array(256), On = new Array(256);
for (var Y = 0; Y < 256; Y++)
  Tn[Y] = on(Y) ? 1 : 0, On[Y] = on(Y);
function Hi(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || An, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function kn(e, n) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = Tr(r), new O(n, r);
}
function d(e, n) {
  throw kn(e, n);
}
function Se(e, n) {
  e.onWarning && e.onWarning.call(null, kn(e, n));
}
var tn = {
  YAML: function(n, r, i) {
    var o, l, t;
    n.version !== null && d(n, "duplication of %YAML directive"), i.length !== 1 && d(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), o === null && d(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && d(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && Se(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var o, l;
    i.length !== 2 && d(n, "TAG directive accepts exactly two arguments"), o = i[0], l = i[1], En.test(o) || d(n, "ill-formed tag handle (first argument) of the TAG directive"), M.call(n.tagMap, o) && d(n, 'there is a previously declared suffix for "' + o + '" tag handle'), Sn.test(l) || d(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      d(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[o] = l;
  }
};
function D(e, n, r, i) {
  var o, l, t, u;
  if (n < r) {
    if (u = e.input.slice(n, r), i)
      for (o = 0, l = u.length; o < l; o += 1)
        t = u.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || d(e, "expected valid JSON character");
    else Ni.test(u) && d(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function ln(e, n, r, i) {
  var o, l, t, u;
  for (b.isObject(r) || d(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(r), t = 0, u = o.length; t < u; t += 1)
    l = o[t], M.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function q(e, n, r, i, o, l, t, u, s) {
  var c, a;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), c = 0, a = o.length; c < a; c += 1)
      Array.isArray(o[c]) && d(e, "nested arrays are not supported inside keys"), typeof o == "object" && rn(o[c]) === "[object Object]" && (o[c] = "[object Object]");
  if (typeof o == "object" && rn(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (c = 0, a = l.length; c < a; c += 1)
        ln(e, n, l[c], r);
    else
      ln(e, n, l, r);
  else
    !e.json && !M.call(r, o) && M.call(n, o) && (e.line = t || e.line, e.lineStart = u || e.lineStart, e.position = s || e.position, d(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete r[o];
  return n;
}
function Ve(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : d(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function v(e, n, r) {
  for (var i = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; j(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (n && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (I(o))
      for (Ve(e), o = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && Se(e, "deficient indentation"), i;
}
function Ie(e) {
  var n = e.position, r;
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || k(r)));
}
function Qe(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += b.repeat(`
`, n - 1));
}
function $i(e, n, r) {
  var i, o, l, t, u, s, c, a, f = e.kind, p = e.result, h;
  if (h = e.input.charCodeAt(e.position), k(h) || G(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (o = e.input.charCodeAt(e.position + 1), k(o) || r && G(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, u = !1; h !== 0; ) {
    if (h === 58) {
      if (o = e.input.charCodeAt(e.position + 1), k(o) || r && G(o))
        break;
    } else if (h === 35) {
      if (i = e.input.charCodeAt(e.position - 1), k(i))
        break;
    } else {
      if (e.position === e.lineStart && Ie(e) || r && G(h))
        break;
      if (I(h))
        if (s = e.line, c = e.lineStart, a = e.lineIndent, v(e, !1, -1), e.lineIndent >= n) {
          u = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = s, e.lineStart = c, e.lineIndent = a;
          break;
        }
    }
    u && (D(e, l, t, !1), Qe(e, e.line - s), l = t = e.position, u = !1), j(h) || (t = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return D(e, l, t, !1), e.result ? !0 : (e.kind = f, e.result = p, !1);
}
function ji(e, n) {
  var r, i, o;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (D(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else I(r) ? (D(e, i, o, !0), Qe(e, v(e, !1, n)), i = o = e.position) : e.position === e.lineStart && Ie(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
function Yi(e, n) {
  var r, i, o, l, t, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return D(e, r, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (D(e, r, e.position, !0), u = e.input.charCodeAt(++e.position), I(u))
        v(e, !1, n);
      else if (u < 256 && Tn[u])
        e.result += On[u], e.position++;
      else if ((t = Mi(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = Di(u)) >= 0 ? l = (l << 4) + t : d(e, "expected hexadecimal character");
        e.result += Bi(l), e.position++;
      } else
        d(e, "unknown escape sequence");
      r = i = e.position;
    } else I(u) ? (D(e, r, i, !0), Qe(e, v(e, !1, n)), r = i = e.position) : e.position === e.lineStart && Ie(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function Ki(e, n) {
  var r = !0, i, o, l, t = e.tag, u, s = e.anchor, c, a, f, p, h, g = /* @__PURE__ */ Object.create(null), m, w, T, C;
  if (C = e.input.charCodeAt(e.position), C === 91)
    a = 93, h = !1, u = [];
  else if (C === 123)
    a = 125, h = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), C = e.input.charCodeAt(++e.position); C !== 0; ) {
    if (v(e, !0, n), C = e.input.charCodeAt(e.position), C === a)
      return e.position++, e.tag = t, e.anchor = s, e.kind = h ? "mapping" : "sequence", e.result = u, !0;
    r ? C === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), w = m = T = null, f = p = !1, C === 63 && (c = e.input.charCodeAt(e.position + 1), k(c) && (f = p = !0, e.position++, v(e, !0, n))), i = e.line, o = e.lineStart, l = e.position, Q(e, n, _e, !1, !0), w = e.tag, m = e.result, v(e, !0, n), C = e.input.charCodeAt(e.position), (p || e.line === i) && C === 58 && (f = !0, C = e.input.charCodeAt(++e.position), v(e, !0, n), Q(e, n, _e, !1, !0), T = e.result), h ? q(e, u, g, w, m, T, i, o, l) : f ? u.push(q(e, null, g, w, m, T, i, o, l)) : u.push(m), v(e, !0, n), C = e.input.charCodeAt(e.position), C === 44 ? (r = !0, C = e.input.charCodeAt(++e.position)) : r = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function Gi(e, n) {
  var r, i, o = Be, l = !1, t = !1, u = n, s = 0, c = !1, a, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    i = !1;
  else if (f === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      Be === o ? o = f === 43 ? nn : Ii : d(e, "repeat of a chomping mode identifier");
    else if ((a = Ui(f)) >= 0)
      a === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? d(e, "repeat of an indentation width identifier") : (u = n + a - 1, t = !0);
    else
      break;
  if (j(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (j(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!I(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Ve(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), I(f)) {
      s++;
      continue;
    }
    if (e.lineIndent < u) {
      o === nn ? e.result += b.repeat(`
`, l ? 1 + s : s) : o === Be && l && (e.result += `
`);
      break;
    }
    for (i ? j(f) ? (c = !0, e.result += b.repeat(`
`, l ? 1 + s : s)) : c ? (c = !1, e.result += b.repeat(`
`, s + 1)) : s === 0 ? l && (e.result += " ") : e.result += b.repeat(`
`, s) : e.result += b.repeat(`
`, l ? 1 + s : s), l = !0, t = !0, s = 0, r = e.position; !I(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    D(e, r, e.position, !1);
  }
  return !0;
}
function un(e, n) {
  var r, i = e.tag, o = e.anchor, l = [], t, u = !1, s;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), s = e.input.charCodeAt(e.position); s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(s !== 45 || (t = e.input.charCodeAt(e.position + 1), !k(t)))); ) {
    if (u = !0, e.position++, v(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Q(e, n, _n, !1, !0), l.push(e.result), v(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && s !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function qi(e, n, r) {
  var i, o, l, t, u, s, c = e.tag, a = e.anchor, f = {}, p = /* @__PURE__ */ Object.create(null), h = null, g = null, m = null, w = !1, T = !1, C;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), C = e.input.charCodeAt(e.position); C !== 0; ) {
    if (!w && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (C === 63 || C === 58) && k(i))
      C === 63 ? (w && (q(e, f, p, h, g, null, t, u, s), h = g = m = null), T = !0, w = !0, o = !0) : w ? (w = !1, o = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, C = i;
    else {
      if (t = e.line, u = e.lineStart, s = e.position, !Q(e, r, bn, !1, !0))
        break;
      if (e.line === l) {
        for (C = e.input.charCodeAt(e.position); j(C); )
          C = e.input.charCodeAt(++e.position);
        if (C === 58)
          C = e.input.charCodeAt(++e.position), k(C) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), w && (q(e, f, p, h, g, null, t, u, s), h = g = m = null), T = !0, w = !1, o = !1, h = e.tag, g = e.result;
        else if (T)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = c, e.anchor = a, !0;
      } else if (T)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = c, e.anchor = a, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (w && (t = e.line, u = e.lineStart, s = e.position), Q(e, n, Ee, !0, o) && (w ? g = e.result : m = e.result), w || (q(e, f, p, h, g, m, t, u, s), h = g = m = null), v(e, !0, -1), C = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && C !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return w && q(e, f, p, h, g, null, t, u, s), T && (e.tag = c, e.anchor = a, e.kind = "mapping", e.result = f), T;
}
function Wi(e) {
  var n, r = !1, i = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (r = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (i = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, r) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !k(t); )
      t === 33 && (i ? d(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), En.test(o) || d(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Ri.test(l) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !Sn.test(l) && d(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    d(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : M.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : d(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Vi(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !k(r) && !G(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Qi(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !k(i) && !G(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), M.call(e.anchorMap, r) || d(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], v(e, !0, -1), !0;
}
function Q(e, n, r, i, o) {
  var l, t, u, s = 1, c = !1, a = !1, f, p, h, g, m, w;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = Ee === r || _n === r, i && v(e, !0, -1) && (c = !0, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)), s === 1)
    for (; Wi(e) || Vi(e); )
      v(e, !0, -1) ? (c = !0, u = l, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)) : u = !1;
  if (u && (u = c || o), (s === 1 || Ee === r) && (_e === r || bn === r ? m = n : m = n + 1, w = e.position - e.lineStart, s === 1 ? u && (un(e, w) || qi(e, w, m)) || Ki(e, m) ? a = !0 : (t && Gi(e, m) || ji(e, m) || Yi(e, m) ? a = !0 : Qi(e) ? (a = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : $i(e, m, _e === r) && (a = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : s === 0 && (a = u && un(e, w))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, p = e.implicitTypes.length; f < p; f += 1)
      if (g = e.implicitTypes[f], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (M.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, h = e.typeMap.multi[e.kind || "fallback"], f = 0, p = h.length; f < p; f += 1)
        if (e.tag.slice(0, h[f].tag.length) === h[f].tag) {
          g = h[f];
          break;
        }
    g || d(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && d(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : d(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || a;
}
function Xi(e) {
  var n = e.position, r, i, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (v(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), r = e.position; t !== 0 && !k(t); )
      t = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), o = [], i.length < 1 && d(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; j(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !I(t));
        break;
      }
      if (I(t)) break;
      for (r = e.position; t !== 0 && !k(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(r, e.position));
    }
    t !== 0 && Ve(e), M.call(tn, i) ? tn[i](e, i, o) : Se(e, 'unknown document directive "' + i + '"');
  }
  if (v(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, v(e, !0, -1)) : l && d(e, "directives end mark is expected"), Q(e, e.lineIndent - 1, Ee, !1, !0), v(e, !0, -1), e.checkLineBreaks && Pi.test(e.input.slice(n, e.position)) && Se(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ie(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, v(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    d(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Fn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new Hi(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, d(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Xi(r);
  return r.documents;
}
function Ji(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = Fn(e, r);
  if (typeof n != "function")
    return i;
  for (var o = 0, l = i.length; o < l; o += 1)
    n(i[o]);
}
function Zi(e, n) {
  var r = Fn(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new O("expected a single document in the stream, but found more");
  }
}
var zi = Ji, eo = Zi, no = {
  loadAll: zi,
  load: eo
}, Ln = Object.prototype.toString, In = Object.prototype.hasOwnProperty, Xe = 65279, ro = 9, oe = 10, io = 13, oo = 32, to = 33, lo = 34, $e = 35, uo = 37, so = 38, co = 39, ao = 42, Nn = 44, fo = 45, Te = 58, po = 61, ho = 62, go = 63, mo = 64, Pn = 91, Rn = 93, xo = 96, Dn = 123, Co = 124, Mn = 125, S = {};
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
], wo = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function vo(e, n) {
  var r, i, o, l, t, u, s;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), o = 0, l = i.length; o < l; o += 1)
    t = i[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), s = e.compiledTypeMap.fallback[t], s && In.call(s.styleAliases, u) && (u = s.styleAliases[u]), r[t] = u;
  return r;
}
function Ao(e) {
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
var bo = 1, te = 2;
function _o(e) {
  this.schema = e.schema || An, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = vo(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? te : bo, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function sn(e, n) {
  for (var r = b.repeat(" ", n), i = 0, o = -1, l = "", t, u = e.length; i < u; )
    o = e.indexOf(`
`, i), o === -1 ? (t = e.slice(i), i = u) : (t = e.slice(i, o + 1), i = o + 1), t.length && t !== `
` && (l += r), l += t;
  return l;
}
function je(e, n) {
  return `
` + b.repeat(" ", e.indent * n);
}
function Eo(e, n) {
  var r, i, o;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (o = e.implicitTypes[r], o.resolve(n))
      return !0;
  return !1;
}
function Oe(e) {
  return e === oo || e === ro;
}
function le(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Xe || 65536 <= e && e <= 1114111;
}
function cn(e) {
  return le(e) && e !== Xe && e !== io && e !== oe;
}
function an(e, n, r) {
  var i = cn(e), o = i && !Oe(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== Nn && e !== Pn && e !== Rn && e !== Dn && e !== Mn) && e !== $e && !(n === Te && !o) || cn(n) && !Oe(n) && e === $e || n === Te && o
  );
}
function So(e) {
  return le(e) && e !== Xe && !Oe(e) && e !== fo && e !== go && e !== Te && e !== Nn && e !== Pn && e !== Rn && e !== Dn && e !== Mn && e !== $e && e !== so && e !== ao && e !== to && e !== Co && e !== po && e !== ho && e !== co && e !== lo && e !== uo && e !== mo && e !== xo;
}
function To(e) {
  return !Oe(e) && e !== Te;
}
function ee(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function Un(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Bn = 1, Ye = 2, Hn = 3, $n = 4, K = 5;
function Oo(e, n, r, i, o, l, t, u) {
  var s, c = 0, a = null, f = !1, p = !1, h = i !== -1, g = -1, m = So(ee(e, 0)) && To(ee(e, e.length - 1));
  if (n || t)
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = ee(e, s), !le(c))
        return K;
      m = m && an(c, a, u), a = c;
    }
  else {
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = ee(e, s), c === oe)
        f = !0, h && (p = p || // Foldable line = too long, and not more-indented.
        s - g - 1 > i && e[g + 1] !== " ", g = s);
      else if (!le(c))
        return K;
      m = m && an(c, a, u), a = c;
    }
    p = p || h && s - g - 1 > i && e[g + 1] !== " ";
  }
  return !f && !p ? m && !t && !o(e) ? Bn : l === te ? K : Ye : r > 9 && Un(e) ? K : t ? l === te ? K : Ye : p ? $n : Hn;
}
function ko(e, n, r, i, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === te ? '""' : "''";
    if (!e.noCompatMode && (yo.indexOf(n) !== -1 || wo.test(n)))
      return e.quotingType === te ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function s(c) {
      return Eo(e, c);
    }
    switch (Oo(
      n,
      u,
      e.indent,
      t,
      s,
      e.quotingType,
      e.forceQuotes && !i,
      o
    )) {
      case Bn:
        return n;
      case Ye:
        return "'" + n.replace(/'/g, "''") + "'";
      case Hn:
        return "|" + fn(n, e.indent) + pn(sn(n, l));
      case $n:
        return ">" + fn(n, e.indent) + pn(sn(Fo(n, t), l));
      case K:
        return '"' + Lo(n) + '"';
      default:
        throw new O("impossible error: invalid scalar style");
    }
  }();
}
function fn(e, n) {
  var r = Un(e) ? String(n) : "", i = e[e.length - 1] === `
`, o = i && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : i ? "" : "-";
  return r + l + `
`;
}
function pn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Fo(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var c = e.indexOf(`
`);
    return c = c !== -1 ? c : e.length, r.lastIndex = c, hn(e.slice(0, c), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = r.exec(e); ) {
    var u = t[1], s = t[2];
    l = s[0] === " ", i += u + (!o && !l && s !== "" ? `
` : "") + hn(s, n), o = l;
  }
  return i;
}
function hn(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, o = 0, l, t = 0, u = 0, s = ""; i = r.exec(e); )
    u = i.index, u - o > n && (l = t > o ? t : u, s += `
` + e.slice(o, l), o = l + 1), t = u;
  return s += `
`, e.length - o > n && t > o ? s += e.slice(o, t) + `
` + e.slice(t + 1) : s += e.slice(o), s.slice(1);
}
function Lo(e) {
  for (var n = "", r = 0, i, o = 0; o < e.length; r >= 65536 ? o += 2 : o++)
    r = ee(e, o), i = S[r], !i && le(r) ? (n += e[o], r >= 65536 && (n += e[o + 1])) : n += i || Ao(r);
  return n;
}
function Io(e, n, r) {
  var i = "", o = e.tag, l, t, u;
  for (l = 0, t = r.length; l < t; l += 1)
    u = r[l], e.replacer && (u = e.replacer.call(r, String(l), u)), (N(e, n, u, !1, !1) || typeof u > "u" && N(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function dn(e, n, r, i) {
  var o = "", l = e.tag, t, u, s;
  for (t = 0, u = r.length; t < u; t += 1)
    s = r[t], e.replacer && (s = e.replacer.call(r, String(t), s)), (N(e, n + 1, s, !0, !0, !1, !0) || typeof s > "u" && N(e, n + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += je(e, n)), e.dump && oe === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function No(e, n, r) {
  var i = "", o = e.tag, l = Object.keys(r), t, u, s, c, a;
  for (t = 0, u = l.length; t < u; t += 1)
    a = "", i !== "" && (a += ", "), e.condenseFlow && (a += '"'), s = l[t], c = r[s], e.replacer && (c = e.replacer.call(r, s, c)), N(e, n, s, !1, !1) && (e.dump.length > 1024 && (a += "? "), a += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), N(e, n, c, !1, !1) && (a += e.dump, i += a));
  e.tag = o, e.dump = "{" + i + "}";
}
function Po(e, n, r, i) {
  var o = "", l = e.tag, t = Object.keys(r), u, s, c, a, f, p;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new O("sortKeys must be a boolean or a function");
  for (u = 0, s = t.length; u < s; u += 1)
    p = "", (!i || o !== "") && (p += je(e, n)), c = t[u], a = r[c], e.replacer && (a = e.replacer.call(r, c, a)), N(e, n + 1, c, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && oe === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, f && (p += je(e, n)), N(e, n + 1, a, !0, f) && (e.dump && oe === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, o += p));
  e.tag = l, e.dump = o || "{}";
}
function gn(e, n, r) {
  var i, o, l, t, u, s;
  for (o = r ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (r ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (s = e.styleMap[u.tag] || u.defaultStyle, Ln.call(u.represent) === "[object Function]")
          i = u.represent(n, s);
        else if (In.call(u.represent, s))
          i = u.represent[s](n, s);
        else
          throw new O("!<" + u.tag + '> tag resolver accepts not "' + s + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function N(e, n, r, i, o, l, t) {
  e.tag = null, e.dump = r, gn(e, r, !1) || gn(e, r, !0);
  var u = Ln.call(e.dump), s = i, c;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var a = u === "[object Object]" || u === "[object Array]", f, p;
  if (a && (f = e.duplicates.indexOf(r), p = f !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && n > 0) && (o = !1), p && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (a && p && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (Po(e, n, e.dump, o), p && (e.dump = "&ref_" + f + e.dump)) : (No(e, n, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? dn(e, n - 1, e.dump, o) : dn(e, n, e.dump, o), p && (e.dump = "&ref_" + f + e.dump)) : (Io(e, n, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && ko(e, e.dump, n, l, s);
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
function Ro(e, n) {
  var r = [], i = [], o, l;
  for (Ke(e, r, i), o = 0, l = i.length; o < l; o += 1)
    n.duplicates.push(r[i[o]]);
  n.usedDuplicates = new Array(l);
}
function Ke(e, n, r) {
  var i, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      r.indexOf(o) === -1 && r.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        Ke(e[o], n, r);
    else
      for (i = Object.keys(e), o = 0, l = i.length; o < l; o += 1)
        Ke(e[i[o]], n, r);
}
function Do(e, n) {
  n = n || {};
  var r = new _o(n);
  r.noRefs || Ro(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), N(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var Mo = Do, Uo = {
  dump: Mo
}, jn = no.load, Bo = Uo.dump;
function Ne(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function Yn(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
const ne = {
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
    r.retries = r.retries ?? ne.retries, r.retryDelay = r.retryDelay ?? ne.retryDelay;
    for (const s of this.requestInterceptors)
      r = await s(r);
    if (r.params) {
      const s = new URLSearchParams(r.params).toString();
      r.url += (r.url.includes("?") ? "&" : "?") + s;
    }
    r.method = r.method || "GET";
    const { timeout: i = 1e4 } = r;
    let o = 0;
    const l = new AbortController(), t = n.signal || l.signal, u = async () => {
      o++;
      const s = setTimeout(() => {
        l.abort();
      }, i);
      try {
        const c = await fetch(r.url, {
          method: r.method,
          headers: r.headers,
          body: r.body ? JSON.stringify(r.body) : void 0,
          signal: t
        });
        clearTimeout(s);
        let a = {
          data: c,
          status: c.status,
          statusText: c.statusText,
          headers: c.headers,
          config: r,
          ok: c.ok
        };
        for (const f of this.responseInterceptors)
          a = await f(a);
        return !c.ok && r.retries && o < r.retries ? (await new Promise((f) => setTimeout(f, r.retryDelay)), u()) : a;
      } catch (c) {
        if (c.name === "AbortError")
          throw new Error("Request timed out");
        if (r.retries && o < r.retries)
          return await new Promise((a) => setTimeout(a, r.retryDelay)), u();
        throw c;
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
async function Ge(e, n) {
  const {
    retries: r = ne.retries,
    retryDelay: i = ne.retryDelay,
    retryOnStatusCodes: o = ne.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const s = async () => {
    u++;
    try {
      const c = await $o.request({ url: e, ...t });
      if (o.includes(c.status) && u <= r) {
        if (l) {
          const a = l(new Error(`Request failed with status ${c.status}`), u);
          a instanceof Promise && await a;
        }
        return await new Promise((a) => setTimeout(a, i)), s();
      }
      return c;
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
const $o = new Ho();
var ue, ke, Kn;
class jo {
  constructor(n = []) {
    y(this, ke);
    y(this, ue);
    const r = n.map((o) => jn(o)), i = A(this, ke, Kn).call(this, r);
    _(this, ue, i);
  }
  get clashConfig() {
    return x(this, ue);
  }
}
ue = new WeakMap(), ke = new WeakSet(), /**
 * @description 合并配置
 * @param {ClashType[]} configs
 * @returns {ClashType} mergedConfig
 */
Kn = function(n = []) {
  var c, a, f, p;
  if (!n.length)
    return {};
  const r = structuredClone(n[0]);
  if (n.length === 1)
    return r;
  const i = {
    ...r,
    proxies: r.proxies || [],
    "proxy-groups": r["proxy-groups"] || []
  }, o = n.reduce((h, g) => {
    var m;
    return h + (((m = g.proxies) == null ? void 0 : m.length) || 0);
  }, 0), l = new Int32Array(o), t = new Set((c = r.proxies) == null ? void 0 : c.map((h) => h.name));
  let u = ((a = r.proxies) == null ? void 0 : a.length) || 0;
  const s = new Map(i["proxy-groups"].map((h) => [h.name, h]));
  for (let h = 1; h < n.length; h++) {
    const g = n[h];
    if ((f = g.proxies) != null && f.length)
      for (const m of g.proxies)
        t.has(m.name) || (i.proxies[u] = m, l[u] = u, t.add(m.name), u++);
    if ((p = g["proxy-groups"]) != null && p.length)
      for (const m of g["proxy-groups"]) {
        const w = s.get(m.name);
        if (w) {
          const T = new Set(w.proxies);
          for (const C of m.proxies || [])
            T.add(C);
          w.proxies = Array.from(T), Object.assign(w, {
            ...m,
            proxies: w.proxies
          });
        } else
          i["proxy-groups"].push(m), s.set(m.name, m);
      }
  }
  return i.proxies = i.proxies.filter((h, g) => l[g] !== -1), i;
};
var se, ce, ae, Fe;
class Yo {
  constructor() {
    y(this, se, ["localhost", "127.0.0.1", "abc.cba.com"]);
    y(this, ce, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    y(this, ae, 1024);
    y(this, Fe, 65535);
  }
  /**
   * @description 获取随机hostname
   * @returns {string} hostname
   */
  getHostName() {
    return x(this, se)[Math.floor(Math.random() * x(this, se).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (x(this, Fe) - x(this, ae) + 1) + x(this, ae)).toString();
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
    return x(this, ce)[Math.floor(Math.random() * x(this, ce).length)];
  }
}
se = new WeakMap(), ce = new WeakMap(), ae = new WeakMap(), Fe = new WeakMap();
var fe, pe, he, de;
class Pe extends Yo {
  constructor() {
    super();
    /** * @description vps原始配置 */
    y(this, fe, {});
    /** * @description 混淆配置 */
    y(this, pe, {});
    /** * @description 原始备注 */
    y(this, he, "");
    /** * @description 混淆备注 */
    y(this, de, "");
    _(this, de, this.getUUID());
  }
  /**
   * @description 设置原始配置
   * @param {Partial<T>} config
   */
  setConfuseConfig(r) {
    _(this, pe, r);
  }
  /**
   * @description 设置混淆配置
   * @param {Partial<T>} config
   * @param {string} ps
   */
  setOriginConfig(r, i) {
    _(this, fe, r), _(this, he, decodeURIComponent(i));
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return x(this, he);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return x(this, fe);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return x(this, de);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return x(this, pe);
  }
}
fe = new WeakMap(), pe = new WeakMap(), he = new WeakMap(), de = new WeakMap();
var H, $;
const L = class L {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(x(L, H));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(x(L, H));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(n) {
    if (!(n != null && n.includes(x(L, H)))) return null;
    if (x(L, $).has(n))
      return x(L, $).get(n);
    const [r] = L.getPs(n);
    if (r) {
      const i = r.trim();
      return x(L, $).set(n, i), i;
    }
    return null;
  }
  static isConfigType(n) {
    return n.includes(x(this, H));
  }
  // 清除缓存
  static clearCache() {
    x(this, $).clear();
  }
};
H = new WeakMap(), $ = new WeakMap(), y(L, H, "^LINK_TO^"), y(L, $, /* @__PURE__ */ new Map());
let F = L;
function Ko(e) {
  try {
    return Ne(e), "base64";
  } catch {
    try {
      return jn(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function Go(e, n = 10) {
  const r = [];
  let i = [];
  return e.forEach((o, l) => {
    i.push(o), (l + 1) % n === 0 && (r.push(i.join("|")), i = []);
  }), i.length > 0 && r.push(i.join("|")), r;
}
function Gn(e, n = []) {
  const r = /* @__PURE__ */ new WeakMap(), i = new Set(n), o = {}, l = /* @__PURE__ */ new Map();
  return n.forEach((t) => {
    const [, u] = t.split("#"), [s, c] = u.split(" "), a = c ? Number.parseInt(c) >>> 0 : 0, f = l.get(s) || 0;
    l.set(s, f | a + 1);
  }), e.map((t) => {
    const [u, s] = t.split("#");
    r.has(o) || r.set(o, /* @__PURE__ */ new Map());
    const c = r.get(o);
    let a = l.get(s) || 0, f = a === 0 ? t : `${u}#${s} ${a}`;
    const p = `${s}_${a}`;
    if (!c.has(p) && i.has(f)) {
      for (; i.has(f); )
        a = a + 1 >>> 0, f = `${u}#${s} ${a}`;
      c.set(p, a);
    }
    return l.set(s, a + 1), f;
  });
}
var ge, Le, qn;
class qo {
  constructor(n = []) {
    y(this, Le);
    y(this, ge, {});
    const r = A(this, Le, qn).call(this, n);
    _(this, ge, r);
  }
  get singboxConfig() {
    return x(this, ge);
  }
}
ge = new WeakMap(), Le = new WeakSet(), qn = function(n) {
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
            const f = new Set(c.outbounds.filter((p) => !F.isConfigType(p)));
            l.set(a, {
              base: c,
              baseOutbounds: f,
              linkOutbounds: /* @__PURE__ */ new Set()
            });
          }
          c.outbounds.forEach((f) => {
            var p;
            F.isConfigType(f) && ((p = l.get(a)) == null || p.linkOutbounds.add(f));
          });
        }
    }
  for (const s of n)
    if ((u = s.outbounds) != null && u.length) {
      for (const c of s.outbounds)
        if (!c.outbounds)
          if (F.isConfigType(c.tag))
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
var me, xe, R, U, Wn, Vn, Qn;
class Wo extends Pe {
  constructor(r) {
    super();
    y(this, U);
    /** @description 原始链接 */
    y(this, me, "");
    /** @description 混淆链接 */
    y(this, xe, "");
    /** @description 解析的私有配置 */
    y(this, R, {});
    A(this, U, Wn).call(this, r);
  }
  restoreClash(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.cipher = x(this, R).originEncryptionProtocol, r.password = x(this, R).originPassword, r;
  }
  restoreSingbox(r, i) {
    return r.password = x(this, R).originPassword, r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, r;
  }
  get confuseLink() {
    return x(this, xe);
  }
  get originLink() {
    return x(this, me);
  }
}
me = new WeakMap(), xe = new WeakMap(), R = new WeakMap(), U = new WeakSet(), Wn = function(r) {
  _(this, me, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash);
  const o = this.getEncrtptionProtocol(), l = this.getPassword();
  A(this, U, Vn).call(this, i.username), this.setConfuseConfig({
    username: encodeURIComponent(Yn(`${o}:${l}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: F.setPs(this.originPs, this.confusePs)
  }), A(this, U, Qn).call(this);
}, Vn = function(r) {
  const [i, o] = Ne(decodeURIComponent(r)).split(":");
  x(this, R).originEncryptionProtocol = i, x(this, R).originPassword = o;
}, Qn = function() {
  const { username: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  _(this, xe, `ss://${r}@${i}:${o}${l ?? ""}${t}`);
};
var Ce, ye, X, Xn, Jn;
class Vo extends Pe {
  constructor(r) {
    super();
    y(this, X);
    /** * @description 原始链接 */
    y(this, Ce, "");
    /** * @description 混淆链接 */
    y(this, ye, "");
    A(this, X, Xn).call(this, r);
  }
  restoreClash(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r;
  }
  restoreSingbox(r, i) {
    var o;
    return r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, r;
  }
  get confuseLink() {
    return x(this, ye);
  }
  get originLink() {
    return x(this, Ce);
  }
}
Ce = new WeakMap(), ye = new WeakMap(), X = new WeakSet(), Xn = function(r) {
  _(this, Ce, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: F.setPs(this.originPs, this.confusePs)
  }), A(this, X, Jn).call(this);
}, Jn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  _(this, ye, `trojan://${r}@${i}:${o}${l}${t}`);
};
var we, ve, J, Zn, zn;
class Qo extends Pe {
  constructor(r) {
    super();
    y(this, J);
    /** * @description 原始链接 */
    y(this, we, "");
    /** * @description 混淆链接 */
    y(this, ve, "");
    A(this, J, Zn).call(this, r);
  }
  restoreClash(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = this.originConfig.username ?? "", r;
  }
  restoreSingbox(r, i) {
    var o;
    return r.tag = i, r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.uuid = this.originConfig.username ?? "", (o = r.tls) != null && o.server_name && (r.tls.server_name = this.originConfig.hostname ?? ""), r;
  }
  get confuseLink() {
    return x(this, ve);
  }
  get originLink() {
    return x(this, we);
  }
}
we = new WeakMap(), ve = new WeakMap(), J = new WeakSet(), Zn = function(r) {
  _(this, we, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: F.setPs(this.originPs, this.confusePs)
  }), A(this, J, zn).call(this);
}, zn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  _(this, ve, `vless://${r}@${i}:${o}${l}${t}`);
};
var Ae, be, B, er, nr, rr;
class Xo extends Pe {
  constructor(r) {
    super();
    y(this, B);
    /** * @description 原始链接 */
    y(this, Ae, "");
    /** * @description 混淆链接 */
    y(this, be, "");
    A(this, B, er).call(this, r);
  }
  restoreClash(r, i) {
    var o, l;
    return A(this, B, rr).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  restoreSingbox(r, i) {
    var o, l;
    return r.server = this.originConfig.add ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, (o = r.tls) != null && o.server_name && (r.tls.server_name = this.originConfig.add ?? ""), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  get confuseLink() {
    return x(this, be);
  }
  get originLink() {
    return x(this, Ae);
  }
}
Ae = new WeakMap(), be = new WeakMap(), B = new WeakSet(), er = function(r) {
  const [i, o] = r.match(/vmess:\/\/(.*)/) || [], l = JSON.parse(Ne(o));
  _(this, Ae, r), this.setOriginConfig(l, l.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: F.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), A(this, B, nr).call(this);
}, nr = function() {
  const { add: r, port: i, id: o, ps: l, scy: t, net: u, type: s, tls: c, v: a } = this.confuseConfig;
  _(this, be, `vmess://${Yn(JSON.stringify({ v: a, ps: l, add: r, port: i, id: o, scy: t, net: u, type: s, tls: c }))}`);
}, rr = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
async function Jo(e) {
  const n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
  async function o(l) {
    for await (const t of l) {
      if (t.startsWith("vless:")) {
        const u = new Qo(t);
        n.add(u.confuseLink), i.add(t), r.set(u.confusePs, u);
      }
      if (t.startsWith("vmess:")) {
        const u = new Xo(t);
        n.add(u.confuseLink), i.add(t), r.set(u.confusePs, u);
      }
      if (t.startsWith("trojan://")) {
        const u = new Vo(t);
        n.add(u.confuseLink), i.add(t), r.set(u.confusePs, u);
      }
      if (t.startsWith("ss://")) {
        const u = new Wo(t);
        n.add(u.confuseLink), i.add(t), r.set(u.confusePs, u);
      }
      if (t.startsWith("https://") || t.startsWith("http://")) {
        const u = await Ge(t, { retries: 3 }).then((c) => c.data.text());
        Ko(u) === "base64" && await o(Gn(ur.base64(u), Array.from(i)));
      }
    }
  }
  return await o(e), { urls: n, vpsMap: r };
}
var V;
const W = class W {
  /**
   * @description 获取混淆链接组
   * @param {string | URL} url
   * @param {string} backend
   * @param {string} chunkCount
   * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
   */
  static async getConfuseUrl(n, r, i) {
    const { searchParams: o } = new URL(n), t = o.get("url").split(/\||\n/).filter(Boolean), { urls: u, vpsMap: s } = await Jo(Gn(t)), c = Go(Array.from(u), Number(i));
    return _(W, V, c.map((a) => {
      const f = new URL(`${r}/sub`), { searchParams: p } = new URL(n);
      return p.set("url", a), f.search = p.toString(), f.toString();
    })), { vpsMap: s };
  }
  /**
   * @description 获取Clash混淆配置
   * @returns {Promise<Clash>} clashConfig
   */
  static async getClashConfuseConfig() {
    try {
      const n = await Promise.all(x(W, V).map((i) => Ge(i, { retries: 3 }).then((o) => o.data.text())));
      return new jo(n).clashConfig;
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
        x(W, V).map((i) => Ge(i, { retries: 3 }).then((o) => o.data.json()))
      );
      return new qo(n).singboxConfig;
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
};
V = new WeakMap(), y(W, V);
let re = W;
var Z, ir, or;
class Zo {
  constructor() {
    y(this, Z);
  }
  /**
   * @description 获取原始配置
   * @param {ClashType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {ClashType} originConfig
   */
  getOriginConfig(n, r) {
    try {
      return n.proxies = A(this, Z, ir).call(this, n.proxies, r), n["proxy-groups"] = n["proxy-groups"].map((i) => (i.proxies && (i.proxies = A(this, Z, or).call(this, i.proxies)), i)), n;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
Z = new WeakSet(), ir = function(n, r) {
  try {
    const i = [];
    for (const o of n) {
      const [l, t] = F.getPs(o.name);
      if (r.has(t)) {
        const u = r.get(t);
        u == null || u.restoreClash(o, l), i.push(o);
      }
    }
    return i;
  } catch (i) {
    throw new Error(`Restore proxies failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, or = function(n) {
  try {
    return n.map((r) => {
      const [i] = F.getPs(r);
      return i;
    });
  } catch (r) {
    throw new Error(`Update proxies groups failed: ${r.message || r}, function trace: ${r.stack}`);
  }
};
var P, tr, lr, qe;
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
  getOriginConfig(n, r) {
    try {
      return n.outbounds = A(this, P, tr).call(this, n.outbounds, r), n;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
P = new WeakSet(), tr = function(n = [], r) {
  try {
    const i = [];
    for (const o of n) {
      if (A(this, P, qe).call(this, o.tag)) {
        const [l, t] = F.getPs(o.tag), u = r.get(t);
        u == null || u.restoreSingbox(o, l);
      }
      Reflect.has(o, "outbounds") && (o.outbounds = A(this, P, lr).call(this, o.outbounds)), i.push(o);
    }
    return i;
  } catch (i) {
    throw new Error(`Restore outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, lr = function(n = []) {
  try {
    return n.map((r) => {
      if (A(this, P, qe).call(this, r)) {
        const [i] = F.getPs(r);
        return i;
      }
      return r;
    });
  } catch (r) {
    throw new Error(`Update outbounds failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}, qe = function(n) {
  return F.isConfigType(n);
};
const et = new Zo(), nt = new zo();
class ur {
  /**
   * @description 处理base64订阅
   * @param {string} subs
   * @returns {string[]} content
   */
  static base64(n) {
    return Ne(n).split(`
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
function rt(e = "") {
  return e.split(`
`).reduce((r, i) => (r.push({
    label: i,
    value: i
  }), r), []);
}
function it(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function ot(e, n) {
  const r = n === "" ? [] : rt(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(r));
}
function tt(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const z = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function lt(e) {
  try {
    const { url: n, lockBackend: r, remoteConfig: i, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = it(t, o), t = ot(t, i), t = tt(t, r), dr(t, new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" }));
  } catch (n) {
    return xn(n.message || n);
  }
}
const st = {
  async fetch(e, n) {
    try {
      const { pathname: r, origin: i } = new URL(e.url);
      if (r === "/sub") {
        const { vpsMap: o } = await re.getConfuseUrl(
          e.url,
          n.BACKEND ?? z.BACKEND,
          n.CHUNK_COUNT ?? z.CHUNK_COUNT
        ), l = ur.getConvertType(e.url);
        if (!l)
          return ze("Unsupported client type");
        if (["clash", "clashr"].includes(l)) {
          const t = await re.getClashConfuseConfig(), u = et.getOriginConfig(t, o);
          return Ze(
            Bo(u, { indent: 2, lineWidth: 200 }),
            new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          );
        }
        if (l === "singbox") {
          const t = await re.getSingboxConfuseConfig(), u = nt.getOriginConfig(t, o);
          return Ze(
            JSON.stringify(u),
            new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          );
        }
        return ze("Unsupported client type, support list: clash, clashr");
      }
      return lt({
        url: n.PAGE_URL ?? z.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? z.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? z.REMOTE_CONFIG,
        origin: i
      });
    } catch (r) {
      return xn(r.message || r);
    }
  }
};
export {
  st as default
};
