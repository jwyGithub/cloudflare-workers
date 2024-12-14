var ur = Object.defineProperty;
var Je = (e) => {
  throw TypeError(e);
};
var sr = (e, n, r) => n in e ? ur(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var Re = (e, n, r) => sr(e, typeof n != "symbol" ? n + "" : n, r), De = (e, n, r) => n.has(e) || Je("Cannot " + r);
var x = (e, n, r) => (De(e, n, "read from private field"), r ? r.call(e) : n.get(e)), w = (e, n, r) => n.has(e) ? Je("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), S = (e, n, r, i) => (De(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), b = (e, n, r) => (De(e, n, "access private method"), r);
const cr = "bad request", ar = "internal server error", mn = new Headers({
  "Content-type": "application/json"
}), fr = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const pr = new Headers({
  "Content-type": "text/html"
}), Ze = (e, n = fr) => new Response(e, {
  status: 200,
  headers: n
}), hr = (e, n = pr) => new Response(e, {
  headers: n
}), ze = (e = cr, n = 400, r = mn) => Response.json(
  {
    status: n,
    message: e
  },
  {
    status: n,
    statusText: e,
    headers: r
  }
), xn = (e = ar, n = 500, r = mn) => Response.json(
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
function dr(e) {
  return Array.isArray(e) ? e : Cn(e) ? [] : [e];
}
function mr(e, n) {
  var r, i, o, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      o = l[r], e[o] = n[o];
  return e;
}
function xr(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function Cr(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var yr = Cn, wr = gr, vr = dr, Ar = xr, br = Cr, _r = mr, _ = {
  isNothing: yr,
  isObject: wr,
  toArray: vr,
  repeat: Ar,
  isNegativeZero: br,
  extend: _r
};
function yn(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function te(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = yn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
te.prototype = Object.create(Error.prototype);
te.prototype.constructor = te;
te.prototype.toString = function(n) {
  return this.name + ": " + yn(this, n);
};
var k = te;
function Me(e, n, r, i, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return i - n > u && (l = " ... ", n = i - u + l.length), r - i > u && (t = " ...", r = i + u - t.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + t,
    pos: i - n + l.length
    // relative position
  };
}
function Ue(e, n) {
  return _.repeat(" ", n - e.length) + e;
}
function Er(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], o = [], l, t = -1; l = r.exec(e.buffer); )
    o.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = i.length - 2);
  t < 0 && (t = i.length - 1);
  var u = "", s, c, p = Math.min(e.line + n.linesAfter, o.length).toString().length, a = n.maxLength - (n.indent + p + 3);
  for (s = 1; s <= n.linesBefore && !(t - s < 0); s++)
    c = Me(
      e.buffer,
      i[t - s],
      o[t - s],
      e.position - (i[t] - i[t - s]),
      a
    ), u = _.repeat(" ", n.indent) + Ue((e.line - s + 1).toString(), p) + " | " + c.str + `
` + u;
  for (c = Me(e.buffer, i[t], o[t], e.position, a), u += _.repeat(" ", n.indent) + Ue((e.line + 1).toString(), p) + " | " + c.str + `
`, u += _.repeat("-", n.indent + p + 3 + c.pos) + `^
`, s = 1; s <= n.linesAfter && !(t + s >= o.length); s++)
    c = Me(
      e.buffer,
      i[t + s],
      o[t + s],
      e.position - (i[t] - i[t + s]),
      a
    ), u += _.repeat(" ", n.indent) + Ue((e.line + s + 1).toString(), p) + " | " + c.str + `
`;
  return u.replace(/\n$/, "");
}
var Sr = Er, Tr = [
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
], Or = [
  "scalar",
  "sequence",
  "mapping"
];
function kr(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function Fr(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (Tr.indexOf(r) === -1)
      throw new k('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = kr(n.styleAliases || null), Or.indexOf(this.kind) === -1)
    throw new k('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var T = Fr;
function en(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var o = r.length;
    r.forEach(function(l, t) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (o = t);
    }), r[o] = i;
  }), r;
}
function Lr() {
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
function je(e) {
  return this.extend(e);
}
je.prototype.extend = function(n) {
  var r = [], i = [];
  if (n instanceof T)
    i.push(n);
  else if (Array.isArray(n))
    i = i.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (r = r.concat(n.implicit)), n.explicit && (i = i.concat(n.explicit));
  else
    throw new k("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(l) {
    if (!(l instanceof T))
      throw new k("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new k("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new k("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof T))
      throw new k("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(je.prototype);
  return o.implicit = (this.implicit || []).concat(r), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = en(o, "implicit"), o.compiledExplicit = en(o, "explicit"), o.compiledTypeMap = Lr(o.compiledImplicit, o.compiledExplicit), o;
};
var Ir = je, Nr = new T("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Pr = new T("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Rr = new T("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Dr = new Ir({
  explicit: [
    Nr,
    Pr,
    Rr
  ]
});
function Mr(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Ur() {
  return null;
}
function Br(e) {
  return e === null;
}
var jr = new T("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Mr,
  construct: Ur,
  predicate: Br,
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
function Hr(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Yr(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function $r(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Gr = new T("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Hr,
  construct: Yr,
  predicate: $r,
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
function Kr(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function qr(e) {
  return 48 <= e && e <= 55;
}
function Wr(e) {
  return 48 <= e && e <= 57;
}
function Vr(e) {
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
          if (!Kr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "o") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (!qr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; r < n; r++)
    if (o = e[r], o !== "_") {
      if (!Wr(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || o === "_");
}
function Qr(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function Xr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !_.isNegativeZero(e);
}
var Jr = new T("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Vr,
  construct: Qr,
  predicate: Xr,
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
}), Zr = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function zr(e) {
  return !(e === null || !Zr.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function ei(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var ni = /^[-+]?[0-9]+e/;
function ri(e, n) {
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
  else if (_.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), ni.test(r) ? r.replace("e", ".e") : r;
}
function ii(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || _.isNegativeZero(e));
}
var oi = new T("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: zr,
  construct: ei,
  predicate: ii,
  represent: ri,
  defaultStyle: "lowercase"
}), ti = Dr.extend({
  implicit: [
    jr,
    Gr,
    Jr,
    oi
  ]
}), li = ti, wn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), vn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function ui(e) {
  return e === null ? !1 : wn.exec(e) !== null || vn.exec(e) !== null;
}
function si(e) {
  var n, r, i, o, l, t, u, s = 0, c = null, p, a, h;
  if (n = wn.exec(e), n === null && (n = vn.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(r, i, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (s = n[7].slice(0, 3); s.length < 3; )
      s += "0";
    s = +s;
  }
  return n[9] && (p = +n[10], a = +(n[11] || 0), c = (p * 60 + a) * 6e4, n[9] === "-" && (c = -c)), h = new Date(Date.UTC(r, i, o, l, t, u, s)), c && h.setTime(h.getTime() - c), h;
}
function ci(e) {
  return e.toISOString();
}
var ai = new T("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: ui,
  construct: si,
  instanceOf: Date,
  represent: ci
});
function fi(e) {
  return e === "<<" || e === null;
}
var pi = new T("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: fi
}), We = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function hi(e) {
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
function di(e) {
  var n = "", r = 0, i, o, l = e.length, t = We;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]), r = (r << 8) + e[i];
  return o = l % 3, o === 0 ? (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]) : o === 2 ? (n += t[r >> 10 & 63], n += t[r >> 4 & 63], n += t[r << 2 & 63], n += t[64]) : o === 1 && (n += t[r >> 2 & 63], n += t[r << 4 & 63], n += t[64], n += t[64]), n;
}
function mi(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var xi = new T("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: hi,
  construct: gi,
  predicate: mi,
  represent: di
}), Ci = Object.prototype.hasOwnProperty, yi = Object.prototype.toString;
function wi(e) {
  if (e === null) return !0;
  var n = [], r, i, o, l, t, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (o = u[r], t = !1, yi.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (Ci.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function vi(e) {
  return e !== null ? e : [];
}
var Ai = new T("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: wi,
  construct: vi
}), bi = Object.prototype.toString;
function _i(e) {
  if (e === null) return !0;
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1) {
    if (i = t[n], bi.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
    l[n] = [o[0], i[o[0]]];
  }
  return !0;
}
function Ei(e) {
  if (e === null) return [];
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1)
    i = t[n], o = Object.keys(i), l[n] = [o[0], i[o[0]]];
  return l;
}
var Si = new T("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: _i,
  construct: Ei
}), Ti = Object.prototype.hasOwnProperty;
function Oi(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (Ti.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function ki(e) {
  return e !== null ? e : {};
}
var Fi = new T("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Oi,
  construct: ki
}), An = li.extend({
  implicit: [
    ai,
    pi
  ],
  explicit: [
    xi,
    Ai,
    Si,
    Fi
  ]
}), M = Object.prototype.hasOwnProperty, _e = 1, bn = 2, _n = 3, Ee = 4, Be = 1, Li = 2, nn = 3, Ii = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Ni = /[\x85\u2028\u2029]/, Pi = /[,\[\]\{\}]/, En = /^(?:!|!!|![a-z\-]+!)$/i, Sn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function rn(e) {
  return Object.prototype.toString.call(e);
}
function I(e) {
  return e === 10 || e === 13;
}
function $(e) {
  return e === 9 || e === 32;
}
function F(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function q(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Ri(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function Di(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Mi(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function on(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Ui(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Tn = new Array(256), On = new Array(256);
for (var G = 0; G < 256; G++)
  Tn[G] = on(G) ? 1 : 0, On[G] = on(G);
function Bi(e, n) {
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
  return r.snippet = Sr(r), new k(n, r);
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
    else Ii.test(u) && d(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function ln(e, n, r, i) {
  var o, l, t, u;
  for (_.isObject(r) || d(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(r), t = 0, u = o.length; t < u; t += 1)
    l = o[t], M.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function W(e, n, r, i, o, l, t, u, s) {
  var c, p;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), c = 0, p = o.length; c < p; c += 1)
      Array.isArray(o[c]) && d(e, "nested arrays are not supported inside keys"), typeof o == "object" && rn(o[c]) === "[object Object]" && (o[c] = "[object Object]");
  if (typeof o == "object" && rn(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (c = 0, p = l.length; c < p; c += 1)
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
function A(e, n, r) {
  for (var i = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; $(o); )
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
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || F(r)));
}
function Qe(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += _.repeat(`
`, n - 1));
}
function ji(e, n, r) {
  var i, o, l, t, u, s, c, p, a = e.kind, h = e.result, f;
  if (f = e.input.charCodeAt(e.position), F(f) || q(f) || f === 35 || f === 38 || f === 42 || f === 33 || f === 124 || f === 62 || f === 39 || f === 34 || f === 37 || f === 64 || f === 96 || (f === 63 || f === 45) && (o = e.input.charCodeAt(e.position + 1), F(o) || r && q(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, u = !1; f !== 0; ) {
    if (f === 58) {
      if (o = e.input.charCodeAt(e.position + 1), F(o) || r && q(o))
        break;
    } else if (f === 35) {
      if (i = e.input.charCodeAt(e.position - 1), F(i))
        break;
    } else {
      if (e.position === e.lineStart && Ie(e) || r && q(f))
        break;
      if (I(f))
        if (s = e.line, c = e.lineStart, p = e.lineIndent, A(e, !1, -1), e.lineIndent >= n) {
          u = !0, f = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = s, e.lineStart = c, e.lineIndent = p;
          break;
        }
    }
    u && (D(e, l, t, !1), Qe(e, e.line - s), l = t = e.position, u = !1), $(f) || (t = e.position + 1), f = e.input.charCodeAt(++e.position);
  }
  return D(e, l, t, !1), e.result ? !0 : (e.kind = a, e.result = h, !1);
}
function Hi(e, n) {
  var r, i, o;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (D(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else I(r) ? (D(e, i, o, !0), Qe(e, A(e, !1, n)), i = o = e.position) : e.position === e.lineStart && Ie(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
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
        A(e, !1, n);
      else if (u < 256 && Tn[u])
        e.result += On[u], e.position++;
      else if ((t = Di(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = Ri(u)) >= 0 ? l = (l << 4) + t : d(e, "expected hexadecimal character");
        e.result += Ui(l), e.position++;
      } else
        d(e, "unknown escape sequence");
      r = i = e.position;
    } else I(u) ? (D(e, r, i, !0), Qe(e, A(e, !1, n)), r = i = e.position) : e.position === e.lineStart && Ie(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function $i(e, n) {
  var r = !0, i, o, l, t = e.tag, u, s = e.anchor, c, p, a, h, f, g = /* @__PURE__ */ Object.create(null), m, C, E, y;
  if (y = e.input.charCodeAt(e.position), y === 91)
    p = 93, f = !1, u = [];
  else if (y === 123)
    p = 125, f = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), y = e.input.charCodeAt(++e.position); y !== 0; ) {
    if (A(e, !0, n), y = e.input.charCodeAt(e.position), y === p)
      return e.position++, e.tag = t, e.anchor = s, e.kind = f ? "mapping" : "sequence", e.result = u, !0;
    r ? y === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), C = m = E = null, a = h = !1, y === 63 && (c = e.input.charCodeAt(e.position + 1), F(c) && (a = h = !0, e.position++, A(e, !0, n))), i = e.line, o = e.lineStart, l = e.position, J(e, n, _e, !1, !0), C = e.tag, m = e.result, A(e, !0, n), y = e.input.charCodeAt(e.position), (h || e.line === i) && y === 58 && (a = !0, y = e.input.charCodeAt(++e.position), A(e, !0, n), J(e, n, _e, !1, !0), E = e.result), f ? W(e, u, g, C, m, E, i, o, l) : a ? u.push(W(e, null, g, C, m, E, i, o, l)) : u.push(m), A(e, !0, n), y = e.input.charCodeAt(e.position), y === 44 ? (r = !0, y = e.input.charCodeAt(++e.position)) : r = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function Gi(e, n) {
  var r, i, o = Be, l = !1, t = !1, u = n, s = 0, c = !1, p, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    i = !1;
  else if (a === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      Be === o ? o = a === 43 ? nn : Li : d(e, "repeat of a chomping mode identifier");
    else if ((p = Mi(a)) >= 0)
      p === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? d(e, "repeat of an indentation width identifier") : (u = n + p - 1, t = !0);
    else
      break;
  if ($(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while ($(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!I(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (Ve(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), I(a)) {
      s++;
      continue;
    }
    if (e.lineIndent < u) {
      o === nn ? e.result += _.repeat(`
`, l ? 1 + s : s) : o === Be && l && (e.result += `
`);
      break;
    }
    for (i ? $(a) ? (c = !0, e.result += _.repeat(`
`, l ? 1 + s : s)) : c ? (c = !1, e.result += _.repeat(`
`, s + 1)) : s === 0 ? l && (e.result += " ") : e.result += _.repeat(`
`, s) : e.result += _.repeat(`
`, l ? 1 + s : s), l = !0, t = !0, s = 0, r = e.position; !I(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    D(e, r, e.position, !1);
  }
  return !0;
}
function un(e, n) {
  var r, i = e.tag, o = e.anchor, l = [], t, u = !1, s;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), s = e.input.charCodeAt(e.position); s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(s !== 45 || (t = e.input.charCodeAt(e.position + 1), !F(t)))); ) {
    if (u = !0, e.position++, A(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, J(e, n, _n, !1, !0), l.push(e.result), A(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && s !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function Ki(e, n, r) {
  var i, o, l, t, u, s, c = e.tag, p = e.anchor, a = {}, h = /* @__PURE__ */ Object.create(null), f = null, g = null, m = null, C = !1, E = !1, y;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), y = e.input.charCodeAt(e.position); y !== 0; ) {
    if (!C && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (y === 63 || y === 58) && F(i))
      y === 63 ? (C && (W(e, a, h, f, g, null, t, u, s), f = g = m = null), E = !0, C = !0, o = !0) : C ? (C = !1, o = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, y = i;
    else {
      if (t = e.line, u = e.lineStart, s = e.position, !J(e, r, bn, !1, !0))
        break;
      if (e.line === l) {
        for (y = e.input.charCodeAt(e.position); $(y); )
          y = e.input.charCodeAt(++e.position);
        if (y === 58)
          y = e.input.charCodeAt(++e.position), F(y) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), C && (W(e, a, h, f, g, null, t, u, s), f = g = m = null), E = !0, C = !1, o = !1, f = e.tag, g = e.result;
        else if (E)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = c, e.anchor = p, !0;
      } else if (E)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = c, e.anchor = p, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (C && (t = e.line, u = e.lineStart, s = e.position), J(e, n, Ee, !0, o) && (C ? g = e.result : m = e.result), C || (W(e, a, h, f, g, m, t, u, s), f = g = m = null), A(e, !0, -1), y = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && y !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return C && W(e, a, h, f, g, null, t, u, s), E && (e.tag = c, e.anchor = p, e.kind = "mapping", e.result = a), E;
}
function qi(e) {
  var n, r = !1, i = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (r = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (i = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, r) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !F(t); )
      t === 33 && (i ? d(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), En.test(o) || d(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Pi.test(l) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !Sn.test(l) && d(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    d(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : M.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : d(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Wi(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !F(r) && !q(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Vi(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !F(i) && !q(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), M.call(e.anchorMap, r) || d(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], A(e, !0, -1), !0;
}
function J(e, n, r, i, o) {
  var l, t, u, s = 1, c = !1, p = !1, a, h, f, g, m, C;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = Ee === r || _n === r, i && A(e, !0, -1) && (c = !0, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)), s === 1)
    for (; qi(e) || Wi(e); )
      A(e, !0, -1) ? (c = !0, u = l, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)) : u = !1;
  if (u && (u = c || o), (s === 1 || Ee === r) && (_e === r || bn === r ? m = n : m = n + 1, C = e.position - e.lineStart, s === 1 ? u && (un(e, C) || Ki(e, C, m)) || $i(e, m) ? p = !0 : (t && Gi(e, m) || Hi(e, m) || Yi(e, m) ? p = !0 : Vi(e) ? (p = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : ji(e, m, _e === r) && (p = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : s === 0 && (p = u && un(e, C))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, h = e.implicitTypes.length; a < h; a += 1)
      if (g = e.implicitTypes[a], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (M.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, f = e.typeMap.multi[e.kind || "fallback"], a = 0, h = f.length; a < h; a += 1)
        if (e.tag.slice(0, f[a].tag.length) === f[a].tag) {
          g = f[a];
          break;
        }
    g || d(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && d(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : d(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || p;
}
function Qi(e) {
  var n = e.position, r, i, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (A(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), r = e.position; t !== 0 && !F(t); )
      t = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), o = [], i.length < 1 && d(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; $(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !I(t));
        break;
      }
      if (I(t)) break;
      for (r = e.position; t !== 0 && !F(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(r, e.position));
    }
    t !== 0 && Ve(e), M.call(tn, i) ? tn[i](e, i, o) : Se(e, 'unknown document directive "' + i + '"');
  }
  if (A(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, A(e, !0, -1)) : l && d(e, "directives end mark is expected"), J(e, e.lineIndent - 1, Ee, !1, !0), A(e, !0, -1), e.checkLineBreaks && Ni.test(e.input.slice(n, e.position)) && Se(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ie(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, A(e, !0, -1));
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
  var r = new Bi(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, d(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Qi(r);
  return r.documents;
}
function Xi(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = Fn(e, r);
  if (typeof n != "function")
    return i;
  for (var o = 0, l = i.length; o < l; o += 1)
    n(i[o]);
}
function Ji(e, n) {
  var r = Fn(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new k("expected a single document in the stream, but found more");
  }
}
var Zi = Xi, zi = Ji, eo = {
  loadAll: Zi,
  load: zi
}, Ln = Object.prototype.toString, In = Object.prototype.hasOwnProperty, Xe = 65279, no = 9, le = 10, ro = 13, io = 32, oo = 33, to = 34, He = 35, lo = 37, uo = 38, so = 39, co = 42, Nn = 44, ao = 45, Te = 58, fo = 61, po = 62, ho = 63, go = 64, Pn = 91, Rn = 93, mo = 96, Dn = 123, xo = 124, Mn = 125, O = {};
O[0] = "\\0";
O[7] = "\\a";
O[8] = "\\b";
O[9] = "\\t";
O[10] = "\\n";
O[11] = "\\v";
O[12] = "\\f";
O[13] = "\\r";
O[27] = "\\e";
O[34] = '\\"';
O[92] = "\\\\";
O[133] = "\\N";
O[160] = "\\_";
O[8232] = "\\L";
O[8233] = "\\P";
var Co = [
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
], yo = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function wo(e, n) {
  var r, i, o, l, t, u, s;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), o = 0, l = i.length; o < l; o += 1)
    t = i[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), s = e.compiledTypeMap.fallback[t], s && In.call(s.styleAliases, u) && (u = s.styleAliases[u]), r[t] = u;
  return r;
}
function vo(e) {
  var n, r, i;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new k("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + _.repeat("0", i - n.length) + n;
}
var Ao = 1, ue = 2;
function bo(e) {
  this.schema = e.schema || An, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = _.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = wo(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ue : Ao, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function sn(e, n) {
  for (var r = _.repeat(" ", n), i = 0, o = -1, l = "", t, u = e.length; i < u; )
    o = e.indexOf(`
`, i), o === -1 ? (t = e.slice(i), i = u) : (t = e.slice(i, o + 1), i = o + 1), t.length && t !== `
` && (l += r), l += t;
  return l;
}
function Ye(e, n) {
  return `
` + _.repeat(" ", e.indent * n);
}
function _o(e, n) {
  var r, i, o;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (o = e.implicitTypes[r], o.resolve(n))
      return !0;
  return !1;
}
function Oe(e) {
  return e === io || e === no;
}
function se(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Xe || 65536 <= e && e <= 1114111;
}
function cn(e) {
  return se(e) && e !== Xe && e !== ro && e !== le;
}
function an(e, n, r) {
  var i = cn(e), o = i && !Oe(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== Nn && e !== Pn && e !== Rn && e !== Dn && e !== Mn) && e !== He && !(n === Te && !o) || cn(n) && !Oe(n) && e === He || n === Te && o
  );
}
function Eo(e) {
  return se(e) && e !== Xe && !Oe(e) && e !== ao && e !== ho && e !== Te && e !== Nn && e !== Pn && e !== Rn && e !== Dn && e !== Mn && e !== He && e !== uo && e !== co && e !== oo && e !== xo && e !== fo && e !== po && e !== so && e !== to && e !== lo && e !== go && e !== mo;
}
function So(e) {
  return !Oe(e) && e !== Te;
}
function re(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function Un(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Bn = 1, $e = 2, jn = 3, Hn = 4, K = 5;
function To(e, n, r, i, o, l, t, u) {
  var s, c = 0, p = null, a = !1, h = !1, f = i !== -1, g = -1, m = Eo(re(e, 0)) && So(re(e, e.length - 1));
  if (n || t)
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = re(e, s), !se(c))
        return K;
      m = m && an(c, p, u), p = c;
    }
  else {
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = re(e, s), c === le)
        a = !0, f && (h = h || // Foldable line = too long, and not more-indented.
        s - g - 1 > i && e[g + 1] !== " ", g = s);
      else if (!se(c))
        return K;
      m = m && an(c, p, u), p = c;
    }
    h = h || f && s - g - 1 > i && e[g + 1] !== " ";
  }
  return !a && !h ? m && !t && !o(e) ? Bn : l === ue ? K : $e : r > 9 && Un(e) ? K : t ? l === ue ? K : $e : h ? Hn : jn;
}
function Oo(e, n, r, i, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === ue ? '""' : "''";
    if (!e.noCompatMode && (Co.indexOf(n) !== -1 || yo.test(n)))
      return e.quotingType === ue ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function s(c) {
      return _o(e, c);
    }
    switch (To(
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
      case $e:
        return "'" + n.replace(/'/g, "''") + "'";
      case jn:
        return "|" + fn(n, e.indent) + pn(sn(n, l));
      case Hn:
        return ">" + fn(n, e.indent) + pn(sn(ko(n, t), l));
      case K:
        return '"' + Fo(n) + '"';
      default:
        throw new k("impossible error: invalid scalar style");
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
function ko(e, n) {
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
function Fo(e) {
  for (var n = "", r = 0, i, o = 0; o < e.length; r >= 65536 ? o += 2 : o++)
    r = re(e, o), i = O[r], !i && se(r) ? (n += e[o], r >= 65536 && (n += e[o + 1])) : n += i || vo(r);
  return n;
}
function Lo(e, n, r) {
  var i = "", o = e.tag, l, t, u;
  for (l = 0, t = r.length; l < t; l += 1)
    u = r[l], e.replacer && (u = e.replacer.call(r, String(l), u)), (N(e, n, u, !1, !1) || typeof u > "u" && N(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function gn(e, n, r, i) {
  var o = "", l = e.tag, t, u, s;
  for (t = 0, u = r.length; t < u; t += 1)
    s = r[t], e.replacer && (s = e.replacer.call(r, String(t), s)), (N(e, n + 1, s, !0, !0, !1, !0) || typeof s > "u" && N(e, n + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += Ye(e, n)), e.dump && le === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function Io(e, n, r) {
  var i = "", o = e.tag, l = Object.keys(r), t, u, s, c, p;
  for (t = 0, u = l.length; t < u; t += 1)
    p = "", i !== "" && (p += ", "), e.condenseFlow && (p += '"'), s = l[t], c = r[s], e.replacer && (c = e.replacer.call(r, s, c)), N(e, n, s, !1, !1) && (e.dump.length > 1024 && (p += "? "), p += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), N(e, n, c, !1, !1) && (p += e.dump, i += p));
  e.tag = o, e.dump = "{" + i + "}";
}
function No(e, n, r, i) {
  var o = "", l = e.tag, t = Object.keys(r), u, s, c, p, a, h;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new k("sortKeys must be a boolean or a function");
  for (u = 0, s = t.length; u < s; u += 1)
    h = "", (!i || o !== "") && (h += Ye(e, n)), c = t[u], p = r[c], e.replacer && (p = e.replacer.call(r, c, p)), N(e, n + 1, c, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && le === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, a && (h += Ye(e, n)), N(e, n + 1, p, !0, a) && (e.dump && le === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, o += h));
  e.tag = l, e.dump = o || "{}";
}
function dn(e, n, r) {
  var i, o, l, t, u, s;
  for (o = r ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (r ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (s = e.styleMap[u.tag] || u.defaultStyle, Ln.call(u.represent) === "[object Function]")
          i = u.represent(n, s);
        else if (In.call(u.represent, s))
          i = u.represent[s](n, s);
        else
          throw new k("!<" + u.tag + '> tag resolver accepts not "' + s + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function N(e, n, r, i, o, l, t) {
  e.tag = null, e.dump = r, dn(e, r, !1) || dn(e, r, !0);
  var u = Ln.call(e.dump), s = i, c;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var p = u === "[object Object]" || u === "[object Array]", a, h;
  if (p && (a = e.duplicates.indexOf(r), h = a !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && n > 0) && (o = !1), h && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (p && h && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (No(e, n, e.dump, o), h && (e.dump = "&ref_" + a + e.dump)) : (Io(e, n, e.dump), h && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? gn(e, n - 1, e.dump, o) : gn(e, n, e.dump, o), h && (e.dump = "&ref_" + a + e.dump)) : (Lo(e, n, e.dump), h && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && Oo(e, e.dump, n, l, s);
    else {
      if (u === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new k("unacceptable kind of an object to dump " + u);
    }
    e.tag !== null && e.tag !== "?" && (c = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? c = "!" + c : c.slice(0, 18) === "tag:yaml.org,2002:" ? c = "!!" + c.slice(18) : c = "!<" + c + ">", e.dump = c + " " + e.dump);
  }
  return !0;
}
function Po(e, n) {
  var r = [], i = [], o, l;
  for (Ge(e, r, i), o = 0, l = i.length; o < l; o += 1)
    n.duplicates.push(r[i[o]]);
  n.usedDuplicates = new Array(l);
}
function Ge(e, n, r) {
  var i, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      r.indexOf(o) === -1 && r.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        Ge(e[o], n, r);
    else
      for (i = Object.keys(e), o = 0, l = i.length; o < l; o += 1)
        Ge(e[i[o]], n, r);
}
function Ro(e, n) {
  n = n || {};
  var r = new bo(n);
  r.noRefs || Po(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), N(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var Do = Ro, Mo = {
  dump: Do
}, Yn = eo.load, Uo = Mo.dump;
function Ne(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function $n(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
const ie = {
  retries: 3,
  // 默认最大重试次数
  retryDelay: 1e3,
  // 默认每次重试的间隔时间（毫秒）
  retryOnStatusCodes: [500, 502, 503, 504]
  // 默认重试的状态码
};
class Bo {
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
    r.retries = r.retries ?? ie.retries, r.retryDelay = r.retryDelay ?? ie.retryDelay;
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
        let p = {
          data: c,
          status: c.status,
          statusText: c.statusText,
          headers: c.headers,
          config: r,
          ok: c.ok
        };
        for (const a of this.responseInterceptors)
          p = await a(p);
        return !c.ok && r.retries && o < r.retries ? (await new Promise((a) => setTimeout(a, r.retryDelay)), u()) : p;
      } catch (c) {
        if (c.name === "AbortError")
          throw new Error("Request timed out");
        if (r.retries && o < r.retries)
          return await new Promise((p) => setTimeout(p, r.retryDelay)), u();
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
async function Ke(e, n) {
  const {
    retries: r = ie.retries,
    retryDelay: i = ie.retryDelay,
    retryOnStatusCodes: o = ie.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const s = async () => {
    u++;
    try {
      const c = await jo.request({ url: e, ...t });
      if (o.includes(c.status) && u <= r) {
        if (l) {
          const p = l(new Error(`Request failed with status ${c.status}`), u);
          p instanceof Promise && await p;
        }
        return await new Promise((p) => setTimeout(p, i)), s();
      }
      return c;
    } catch (c) {
      if (l) {
        const p = l(c, u);
        p instanceof Promise && await p;
      }
      if (u <= r)
        return await new Promise((p) => setTimeout(p, i)), s();
      throw c;
    }
  };
  return s();
}
const jo = new Bo();
var ce, ae, fe, ke;
class Ho {
  constructor() {
    w(this, ce, ["localhost", "127.0.0.1", "abc.cba.com"]);
    w(this, ae, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    w(this, fe, 1024);
    w(this, ke, 65535);
  }
  /**
   * @description 获取随机hostname
   * @returns {string} hostname
   */
  getHostName() {
    return x(this, ce)[Math.floor(Math.random() * x(this, ce).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (x(this, ke) - x(this, fe) + 1) + x(this, fe)).toString();
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
    return x(this, ae)[Math.floor(Math.random() * x(this, ae).length)];
  }
}
ce = new WeakMap(), ae = new WeakMap(), fe = new WeakMap(), ke = new WeakMap();
var pe, he, ge, de;
class Pe extends Ho {
  constructor() {
    super();
    /** * @description vps原始配置 */
    w(this, pe, {});
    /** * @description 混淆配置 */
    w(this, he, {});
    /** * @description 原始备注 */
    w(this, ge, "");
    /** * @description 混淆备注 */
    w(this, de, "");
    S(this, de, this.getUUID());
  }
  /**
   * @description 设置原始配置
   * @param {Partial<T>} config
   */
  setConfuseConfig(r) {
    S(this, he, r);
  }
  /**
   * @description 设置混淆配置
   * @param {Partial<T>} config
   * @param {string} ps
   */
  setOriginConfig(r, i) {
    S(this, pe, r), S(this, ge, decodeURIComponent(i));
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return x(this, ge);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return x(this, pe);
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
    return x(this, he);
  }
}
pe = new WeakMap(), he = new WeakMap(), ge = new WeakMap(), de = new WeakMap();
var j, H;
const L = class L {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(x(L, j));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(x(L, j));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(n) {
    if (!(n != null && n.includes(x(L, j)))) return null;
    if (x(L, H).has(n))
      return x(L, H).get(n);
    const [r] = L.getPs(n);
    if (r) {
      const i = r.trim();
      return x(L, H).set(n, i), i;
    }
    return null;
  }
  static isConfigType(n) {
    return n.includes(x(this, j));
  }
  // 清除缓存
  static clearCache() {
    x(this, H).clear();
  }
};
j = new WeakMap(), H = new WeakMap(), w(L, j, "^LINK_TO^"), w(L, H, /* @__PURE__ */ new Map());
let v = L;
function Yo(e) {
  try {
    return Ne(e), "base64";
  } catch {
    try {
      return Yn(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function $o(e, n = 10) {
  const r = [];
  let i = [];
  return e.forEach((o, l) => {
    i.push(o), (l + 1) % n === 0 && (r.push(i.join("|")), i = []);
  }), i.length > 0 && r.push(i.join("|")), r;
}
var Y, Fe, Gn;
class Go {
  constructor(n = []) {
    w(this, Fe);
    w(this, Y);
    const r = n.map((o) => Yn(o));
    S(this, Y, r.at(-1));
    const i = b(this, Fe, Gn).call(this, r);
    x(this, Y).proxies = i.proxies, x(this, Y)["proxy-groups"] = i["proxy-groups"];
  }
  get clashConfig() {
    return x(this, Y);
  }
}
Y = new WeakMap(), Fe = new WeakSet(), /**
 * @description 合并配置
 * @param {ClashType[]} configs
 * @returns {ClashType} mergedConfig
 */
Gn = function(n = []) {
  const r = {
    proxies: [],
    "proxy-groups": []
  }, i = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null), l = n.reduce((s, c) => s + c.proxies.length, 0), t = new Int32Array(l);
  let u = 0;
  for (const s of n) {
    const c = s.proxies, p = s["proxy-groups"];
    for (let h = 0; h < c.length; h++) {
      const f = c[h], [g, m] = v.getPs(f.name);
      if (o[f.name]) {
        t[u++] = -1;
        continue;
      }
      const C = i[g] || 0;
      i[g] = C + 1;
      const E = C === 0 ? f.name : v.setPs(`${g} ${C + 1}`, m);
      o[f.name] = E;
      const y = {
        ...f,
        name: E
      };
      r.proxies[u] = y, t[u] = u, u++;
    }
    if (!p) continue;
    const a = /* @__PURE__ */ new Set();
    for (const h of p) {
      if (a.has(h.name)) continue;
      const f = r["proxy-groups"].find((g) => g.name === h.name);
      if (h.proxies = h.proxies || [], f) {
        const g = new Set(f.proxies);
        for (const m of h.proxies)
          g.add(o[m] || m);
        f.proxies = Array.from(g);
      } else {
        const g = {
          ...h,
          proxies: h.proxies.map((m) => o[m] || m)
        };
        r["proxy-groups"].push(g);
      }
      a.add(h.name);
    }
  }
  return r.proxies = r.proxies.filter((s, c) => t[c] !== -1), r;
};
var Q, Le, Kn;
class Ko {
  constructor(n = []) {
    w(this, Le);
    w(this, Q, {});
    S(this, Q, n.at(-1));
    const r = b(this, Le, Kn).call(this, n);
    x(this, Q).outbounds = r.outbounds;
  }
  get singboxConfig() {
    return x(this, Q);
  }
}
Q = new WeakMap(), Le = new WeakSet(), Kn = function(n) {
  var p, a;
  const r = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null), t = [], u = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
  for (const h of n)
    if ((p = h.outbounds) != null && p.length)
      for (const f of h.outbounds) {
        if (v.isConfigType(f.tag)) {
          const [g, m] = v.getPs(f.tag);
          g && (o[g.trim()] = (o[g.trim()] || 0) + 1, l[m] = f.tag);
        }
        if (f.outbounds) {
          const g = `${f.type}:${f.tag}`;
          if (!s.has(g)) {
            const m = new Set(f.outbounds.filter((C) => !v.isConfigType(C)));
            s.set(g, {
              base: f,
              baseOutbounds: m,
              linkOutbounds: /* @__PURE__ */ new Set()
              // 存储符合LINK_TO规则的outbounds
            });
          }
          f.outbounds.forEach((m) => {
            var C;
            v.isConfigType(m) && ((C = s.get(g)) == null || C.linkOutbounds.add(m));
          });
        }
      }
  function c(h) {
    if (!v.isConfigType(h)) return h;
    const [f, g] = v.getPs(h);
    if (!f || !o[f.trim()] || o[f.trim()] <= 1)
      return h;
    if (r[h]) return r[h];
    const m = (i[f.trim()] || 0) + 1;
    i[f.trim()] = m;
    const C = v.setPs(`${f.trim()} ${m}`, g);
    return r[h] = C, C;
  }
  for (const h of n)
    if ((a = h.outbounds) != null && a.length) {
      for (const f of h.outbounds)
        if (!f.outbounds)
          if (v.isConfigType(f.tag)) {
            const g = { ...f };
            g.tag = c(f.tag), t.push(g);
          } else {
            const g = `${f.type}:${f.tag}`;
            u.has(g) || (u.add(g), t.push(f));
          }
    }
  for (const [h, f] of s) {
    const g = { ...f.base }, m = /* @__PURE__ */ new Set([
      // 基础outbounds
      ...f.baseOutbounds,
      // 更新后的LINK_TO outbounds
      ...Array.from(f.linkOutbounds).map((C) => {
        const [, E] = v.getPs(C), y = l[E];
        return r[y] || y;
      })
    ]);
    g.outbounds = Array.from(m), t.push(g);
  }
  return { outbounds: t };
};
var me, xe, R, U, qn, Wn, Vn;
class qo extends Pe {
  constructor(r) {
    super();
    w(this, U);
    /** @description 原始链接 */
    w(this, me, "");
    /** @description 混淆链接 */
    w(this, xe, "");
    /** @description 解析的私有配置 */
    w(this, R, {});
    b(this, U, qn).call(this, r);
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
me = new WeakMap(), xe = new WeakMap(), R = new WeakMap(), U = new WeakSet(), qn = function(r) {
  S(this, me, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash);
  const o = this.getEncrtptionProtocol(), l = this.getPassword();
  b(this, U, Wn).call(this, i.username), this.setConfuseConfig({
    username: encodeURIComponent($n(`${o}:${l}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: v.setPs(this.originPs, this.confusePs)
  }), b(this, U, Vn).call(this);
}, Wn = function(r) {
  const [i, o] = Ne(decodeURIComponent(r)).split(":");
  x(this, R).originEncryptionProtocol = i, x(this, R).originPassword = o;
}, Vn = function() {
  const { username: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  S(this, xe, `ss://${r}@${i}:${o}${l ?? ""}${t}`);
};
var Ce, ye, Z, Qn, Xn;
class Wo extends Pe {
  constructor(r) {
    super();
    w(this, Z);
    /** * @description 原始链接 */
    w(this, Ce, "");
    /** * @description 混淆链接 */
    w(this, ye, "");
    b(this, Z, Qn).call(this, r);
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
Ce = new WeakMap(), ye = new WeakMap(), Z = new WeakSet(), Qn = function(r) {
  S(this, Ce, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: v.setPs(this.originPs, this.confusePs)
  }), b(this, Z, Xn).call(this);
}, Xn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  S(this, ye, `trojan://${r}@${i}:${o}${l}${t}`);
};
var we, ve, z, Jn, Zn;
class Vo extends Pe {
  constructor(r) {
    super();
    w(this, z);
    /** * @description 原始链接 */
    w(this, we, "");
    /** * @description 混淆链接 */
    w(this, ve, "");
    b(this, z, Jn).call(this, r);
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
we = new WeakMap(), ve = new WeakMap(), z = new WeakSet(), Jn = function(r) {
  S(this, we, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: v.setPs(this.originPs, this.confusePs)
  }), b(this, z, Zn).call(this);
}, Zn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  S(this, ve, `vless://${r}@${i}:${o}${l}${t}`);
};
var Ae, be, B, zn, er, nr;
class Qo extends Pe {
  constructor(r) {
    super();
    w(this, B);
    /** * @description 原始链接 */
    w(this, Ae, "");
    /** * @description 混淆链接 */
    w(this, be, "");
    b(this, B, zn).call(this, r);
  }
  restoreClash(r, i) {
    var o, l;
    return b(this, B, nr).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
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
Ae = new WeakMap(), be = new WeakMap(), B = new WeakSet(), zn = function(r) {
  const [i, o] = r.match(/vmess:\/\/(.*)/) || [], l = JSON.parse(Ne(o));
  S(this, Ae, r), this.setOriginConfig(l, l.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: v.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), b(this, B, er).call(this);
}, er = function() {
  const { add: r, port: i, id: o, ps: l, scy: t, net: u, type: s, tls: c, v: p } = this.confuseConfig;
  S(this, be, `vmess://${$n(JSON.stringify({ v: p, ps: l, add: r, port: i, id: o, scy: t, net: u, type: s, tls: c }))}`);
}, nr = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
async function Xo(e) {
  const n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  async function i(o) {
    for await (const l of o) {
      if (l.startsWith("vless:")) {
        const t = new Vo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("vmess:")) {
        const t = new Qo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("trojan://")) {
        const t = new Wo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("ss://")) {
        const t = new qo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("https://") || l.startsWith("http://")) {
        const t = await Ke(l, { retries: 3 }).then((s) => s.data.text());
        Yo(t) === "base64" && await i(lr.base64(t));
      }
    }
  }
  return await i(e), { urls: n, vpsMap: r };
}
var X;
const V = class V {
  /**
   * @description 获取混淆链接组
   * @param {string | URL} url
   * @param {string} backend
   * @param {string} chunkCount
   * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
   */
  static async getConfuseUrl(n, r, i) {
    const { searchParams: o } = new URL(n), t = o.get("url").split(/\||\n/).filter(Boolean), { urls: u, vpsMap: s } = await Xo(t), c = $o(Array.from(u), Number(i));
    return S(V, X, c.map((p) => {
      const a = new URL(`${r}/sub`), { searchParams: h } = new URL(n);
      return h.set("url", p), a.search = h.toString(), a.toString();
    })), { vpsMap: s };
  }
  /**
   * @description 获取Clash混淆配置
   * @returns {Promise<Clash>} clashConfig
   */
  static async getClashConfuseConfig() {
    try {
      const n = await Promise.all(x(V, X).map((i) => Ke(i, { retries: 3 }).then((o) => o.data.text())));
      return new Go(n).clashConfig;
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
        x(V, X).map((i) => Ke(i, { retries: 3 }).then((o) => o.data.json()))
      );
      return new Ko(n).singboxConfig;
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
};
X = new WeakMap(), w(V, X);
let oe = V;
var ee, rr, ir;
class Jo {
  constructor() {
    w(this, ee);
  }
  /**
   * @description 获取原始配置
   * @param {ClashType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {ClashType} originConfig
   */
  getOriginConfig(n, r) {
    try {
      return n.proxies = b(this, ee, rr).call(this, n.proxies, r), n["proxy-groups"] = n["proxy-groups"].map((i) => (i.proxies && (i.proxies = b(this, ee, ir).call(this, i.proxies)), i)), n;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
ee = new WeakSet(), rr = function(n, r) {
  try {
    const i = [];
    for (const o of n) {
      const [l, t] = v.getPs(o.name);
      if (r.has(t)) {
        const u = r.get(t);
        u == null || u.restoreClash(o, l), i.push(o);
      }
    }
    return i;
  } catch (i) {
    throw new Error(`Restore proxies failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, ir = function(n) {
  try {
    return n.map((r) => {
      const [i] = v.getPs(r);
      return i;
    });
  } catch (r) {
    throw new Error(`Update proxies groups failed: ${r.message || r}, function trace: ${r.stack}`);
  }
};
var P, or, tr, qe;
class Zo {
  constructor() {
    w(this, P);
  }
  /**
   * @description 获取原始配置
   * @param {SingboxType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {SingboxType} originConfig
   */
  getOriginConfig(n, r) {
    try {
      return n.outbounds = b(this, P, or).call(this, n.outbounds, r), n;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
P = new WeakSet(), or = function(n = [], r) {
  try {
    const i = [];
    for (const o of n) {
      if (b(this, P, qe).call(this, o.tag)) {
        const [l, t] = v.getPs(o.tag), u = r.get(t);
        u == null || u.restoreSingbox(o, l);
      }
      Reflect.has(o, "outbounds") && (o.outbounds = b(this, P, tr).call(this, o.outbounds)), i.push(o);
    }
    return i;
  } catch (i) {
    throw new Error(`Restore outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, tr = function(n = []) {
  try {
    return n.map((r) => {
      if (b(this, P, qe).call(this, r)) {
        const [i] = v.getPs(r);
        return i;
      }
      return r;
    });
  } catch (r) {
    throw new Error(`Update outbounds failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}, qe = function(n) {
  return v.isConfigType(n);
};
const zo = new Jo(), et = new Zo();
class lr {
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
function nt(e = "") {
  return e.split(`
`).reduce((r, i) => (r.push({
    label: i,
    value: i
  }), r), []);
}
function rt(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function it(e, n) {
  const r = n === "" ? [] : nt(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(r));
}
function ot(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const ne = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function tt(e) {
  try {
    const { url: n, lockBackend: r, remoteConfig: i, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = rt(t, o), t = it(t, i), t = ot(t, r), hr(t, new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" }));
  } catch (n) {
    return xn(n.message || n);
  }
}
const ut = {
  async fetch(e, n) {
    try {
      const { pathname: r, origin: i } = new URL(e.url);
      if (r === "/sub") {
        const { vpsMap: o } = await oe.getConfuseUrl(
          e.url,
          n.BACKEND ?? ne.BACKEND,
          n.CHUNK_COUNT ?? ne.CHUNK_COUNT
        ), l = lr.getConvertType(e.url);
        if (!l)
          return ze("Unsupported client type");
        if (["clash", "clashr"].includes(l)) {
          const t = await oe.getClashConfuseConfig(), u = zo.getOriginConfig(t, o);
          return Ze(
            Uo(u, { indent: 2, lineWidth: 200 }),
            new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          );
        }
        if (l === "singbox") {
          const t = await oe.getSingboxConfuseConfig(), u = et.getOriginConfig(t, o);
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
      return tt({
        url: n.PAGE_URL ?? ne.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? ne.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? ne.REMOTE_CONFIG,
        origin: i
      });
    } catch (r) {
      return xn(r.message || r);
    }
  }
};
export {
  ut as default
};
