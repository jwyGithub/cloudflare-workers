var $n = Object.defineProperty;
var Ge = (e) => {
  throw TypeError(e);
};
var Kn = (e, n, r) => n in e ? $n(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var Oe = (e, n, r) => Kn(e, typeof n != "symbol" ? n + "" : n, r), ke = (e, n, r) => n.has(e) || Ge("Cannot " + r);
var m = (e, n, r) => (ke(e, n, "read from private field"), r ? r.call(e) : n.get(e)), A = (e, n, r) => n.has(e) ? Ge("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), _ = (e, n, r, i) => (ke(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), L = (e, n, r) => (ke(e, n, "access private method"), r);
const qn = "internal server error", Wn = new Headers({
  "Content-type": "application/json"
}), Vn = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const Qn = new Headers({
  "Content-type": "text/html"
}), Xn = (e, n = Vn) => new Response(e, {
  status: 200,
  headers: n
}), Zn = (e, n = Qn) => new Response(e, {
  headers: n
}), un = (e = qn, n = 500, r = Wn) => Response.json(
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
function cn(e) {
  return typeof e > "u" || e === null;
}
function Jn(e) {
  return typeof e == "object" && e !== null;
}
function zn(e) {
  return Array.isArray(e) ? e : cn(e) ? [] : [e];
}
function er(e, n) {
  var r, i, o, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      o = l[r], e[o] = n[o];
  return e;
}
function nr(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function rr(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var ir = cn, or = Jn, tr = zn, lr = nr, ur = rr, cr = er, w = {
  isNothing: ir,
  isObject: or,
  toArray: tr,
  repeat: lr,
  isNegativeZero: ur,
  extend: cr
};
function sn(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function Z(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = sn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Z.prototype = Object.create(Error.prototype);
Z.prototype.constructor = Z;
Z.prototype.toString = function(n) {
  return this.name + ": " + sn(this, n);
};
var S = Z;
function Le(e, n, r, i, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return i - n > u && (l = " ... ", n = i - u + l.length), r - i > u && (t = " ...", r = i + u - t.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + t,
    pos: i - n + l.length
    // relative position
  };
}
function Fe(e, n) {
  return w.repeat(" ", n - e.length) + e;
}
function sr(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], o = [], l, t = -1; l = r.exec(e.buffer); )
    o.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = i.length - 2);
  t < 0 && (t = i.length - 1);
  var u = "", c, s, f = Math.min(e.line + n.linesAfter, o.length).toString().length, a = n.maxLength - (n.indent + f + 3);
  for (c = 1; c <= n.linesBefore && !(t - c < 0); c++)
    s = Le(
      e.buffer,
      i[t - c],
      o[t - c],
      e.position - (i[t] - i[t - c]),
      a
    ), u = w.repeat(" ", n.indent) + Fe((e.line - c + 1).toString(), f) + " | " + s.str + `
` + u;
  for (s = Le(e.buffer, i[t], o[t], e.position, a), u += w.repeat(" ", n.indent) + Fe((e.line + 1).toString(), f) + " | " + s.str + `
`, u += w.repeat("-", n.indent + f + 3 + s.pos) + `^
`, c = 1; c <= n.linesAfter && !(t + c >= o.length); c++)
    s = Le(
      e.buffer,
      i[t + c],
      o[t + c],
      e.position - (i[t] - i[t + c]),
      a
    ), u += w.repeat(" ", n.indent) + Fe((e.line + c + 1).toString(), f) + " | " + s.str + `
`;
  return u.replace(/\n$/, "");
}
var fr = sr, ar = [
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
], pr = [
  "scalar",
  "sequence",
  "mapping"
];
function hr(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function dr(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (ar.indexOf(r) === -1)
      throw new S('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = hr(n.styleAliases || null), pr.indexOf(this.kind) === -1)
    throw new S('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var E = dr;
function $e(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var o = r.length;
    r.forEach(function(l, t) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (o = t);
    }), r[o] = i;
  }), r;
}
function gr() {
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
function Ne(e) {
  return this.extend(e);
}
Ne.prototype.extend = function(n) {
  var r = [], i = [];
  if (n instanceof E)
    i.push(n);
  else if (Array.isArray(n))
    i = i.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (r = r.concat(n.implicit)), n.explicit && (i = i.concat(n.explicit));
  else
    throw new S("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(l) {
    if (!(l instanceof E))
      throw new S("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new S("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new S("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof E))
      throw new S("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(Ne.prototype);
  return o.implicit = (this.implicit || []).concat(r), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = $e(o, "implicit"), o.compiledExplicit = $e(o, "explicit"), o.compiledTypeMap = gr(o.compiledImplicit, o.compiledExplicit), o;
};
var mr = Ne, xr = new E("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Cr = new E("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Ar = new E("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), vr = new mr({
  explicit: [
    xr,
    Cr,
    Ar
  ]
});
function yr(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function wr() {
  return null;
}
function _r(e) {
  return e === null;
}
var Er = new E("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: yr,
  construct: wr,
  predicate: _r,
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
function br(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Sr(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Tr(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Or = new E("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: br,
  construct: Sr,
  predicate: Tr,
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
function kr(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Lr(e) {
  return 48 <= e && e <= 55;
}
function Fr(e) {
  return 48 <= e && e <= 57;
}
function Ir(e) {
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
          if (!kr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "o") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (!Lr(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; r < n; r++)
    if (o = e[r], o !== "_") {
      if (!Fr(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || o === "_");
}
function Nr(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function Pr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !w.isNegativeZero(e);
}
var Rr = new E("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Ir,
  construct: Nr,
  predicate: Pr,
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
}), Dr = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Mr(e) {
  return !(e === null || !Dr.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Ur(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var Br = /^[-+]?[0-9]+e/;
function Hr(e, n) {
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
  return r = e.toString(10), Br.test(r) ? r.replace("e", ".e") : r;
}
function Yr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || w.isNegativeZero(e));
}
var jr = new E("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Mr,
  construct: Ur,
  predicate: Yr,
  represent: Hr,
  defaultStyle: "lowercase"
}), Gr = vr.extend({
  implicit: [
    Er,
    Or,
    Rr,
    jr
  ]
}), $r = Gr, fn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), an = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Kr(e) {
  return e === null ? !1 : fn.exec(e) !== null || an.exec(e) !== null;
}
function qr(e) {
  var n, r, i, o, l, t, u, c = 0, s = null, f, a, h;
  if (n = fn.exec(e), n === null && (n = an.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(r, i, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (c = n[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return n[9] && (f = +n[10], a = +(n[11] || 0), s = (f * 60 + a) * 6e4, n[9] === "-" && (s = -s)), h = new Date(Date.UTC(r, i, o, l, t, u, c)), s && h.setTime(h.getTime() - s), h;
}
function Wr(e) {
  return e.toISOString();
}
var Vr = new E("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Kr,
  construct: qr,
  instanceOf: Date,
  represent: Wr
});
function Qr(e) {
  return e === "<<" || e === null;
}
var Xr = new E("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Qr
}), Ue = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Zr(e) {
  if (e === null) return !1;
  var n, r, i = 0, o = e.length, l = Ue;
  for (r = 0; r < o; r++)
    if (n = l.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function Jr(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), o = i.length, l = Ue, t = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)), t = t << 6 | l.indexOf(i.charAt(n));
  return r = o % 4 * 6, r === 0 ? (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)) : r === 18 ? (u.push(t >> 10 & 255), u.push(t >> 2 & 255)) : r === 12 && u.push(t >> 4 & 255), new Uint8Array(u);
}
function zr(e) {
  var n = "", r = 0, i, o, l = e.length, t = Ue;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]), r = (r << 8) + e[i];
  return o = l % 3, o === 0 ? (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]) : o === 2 ? (n += t[r >> 10 & 63], n += t[r >> 4 & 63], n += t[r << 2 & 63], n += t[64]) : o === 1 && (n += t[r >> 2 & 63], n += t[r << 4 & 63], n += t[64], n += t[64]), n;
}
function ei(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var ni = new E("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Zr,
  construct: Jr,
  predicate: ei,
  represent: zr
}), ri = Object.prototype.hasOwnProperty, ii = Object.prototype.toString;
function oi(e) {
  if (e === null) return !0;
  var n = [], r, i, o, l, t, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (o = u[r], t = !1, ii.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (ri.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function ti(e) {
  return e !== null ? e : [];
}
var li = new E("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: oi,
  construct: ti
}), ui = Object.prototype.toString;
function ci(e) {
  if (e === null) return !0;
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1) {
    if (i = t[n], ui.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
    l[n] = [o[0], i[o[0]]];
  }
  return !0;
}
function si(e) {
  if (e === null) return [];
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1)
    i = t[n], o = Object.keys(i), l[n] = [o[0], i[o[0]]];
  return l;
}
var fi = new E("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: ci,
  construct: si
}), ai = Object.prototype.hasOwnProperty;
function pi(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (ai.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function hi(e) {
  return e !== null ? e : {};
}
var di = new E("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: pi,
  construct: hi
}), pn = $r.extend({
  implicit: [
    Vr,
    Xr
  ],
  explicit: [
    ni,
    li,
    fi,
    di
  ]
}), P = Object.prototype.hasOwnProperty, Ae = 1, hn = 2, dn = 3, ve = 4, Ie = 1, gi = 2, Ke = 3, mi = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, xi = /[\x85\u2028\u2029]/, Ci = /[,\[\]\{\}]/, gn = /^(?:!|!!|![a-z\-]+!)$/i, mn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function qe(e) {
  return Object.prototype.toString.call(e);
}
function F(e) {
  return e === 10 || e === 13;
}
function B(e) {
  return e === 9 || e === 32;
}
function T(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function j(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Ai(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function vi(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function yi(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function We(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function wi(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var xn = new Array(256), Cn = new Array(256);
for (var H = 0; H < 256; H++)
  xn[H] = We(H) ? 1 : 0, Cn[H] = We(H);
function _i(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || pn, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function An(e, n) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = fr(r), new S(n, r);
}
function p(e, n) {
  throw An(e, n);
}
function ye(e, n) {
  e.onWarning && e.onWarning.call(null, An(e, n));
}
var Ve = {
  YAML: function(n, r, i) {
    var o, l, t;
    n.version !== null && p(n, "duplication of %YAML directive"), i.length !== 1 && p(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), o === null && p(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && p(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && ye(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var o, l;
    i.length !== 2 && p(n, "TAG directive accepts exactly two arguments"), o = i[0], l = i[1], gn.test(o) || p(n, "ill-formed tag handle (first argument) of the TAG directive"), P.call(n.tagMap, o) && p(n, 'there is a previously declared suffix for "' + o + '" tag handle'), mn.test(l) || p(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      p(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[o] = l;
  }
};
function N(e, n, r, i) {
  var o, l, t, u;
  if (n < r) {
    if (u = e.input.slice(n, r), i)
      for (o = 0, l = u.length; o < l; o += 1)
        t = u.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || p(e, "expected valid JSON character");
    else mi.test(u) && p(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function Qe(e, n, r, i) {
  var o, l, t, u;
  for (w.isObject(r) || p(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(r), t = 0, u = o.length; t < u; t += 1)
    l = o[t], P.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function G(e, n, r, i, o, l, t, u, c) {
  var s, f;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), s = 0, f = o.length; s < f; s += 1)
      Array.isArray(o[s]) && p(e, "nested arrays are not supported inside keys"), typeof o == "object" && qe(o[s]) === "[object Object]" && (o[s] = "[object Object]");
  if (typeof o == "object" && qe(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (s = 0, f = l.length; s < f; s += 1)
        Qe(e, n, l[s], r);
    else
      Qe(e, n, l, r);
  else
    !e.json && !P.call(r, o) && P.call(n, o) && (e.line = t || e.line, e.lineStart = u || e.lineStart, e.position = c || e.position, p(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete r[o];
  return n;
}
function Be(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : p(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function y(e, n, r) {
  for (var i = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; B(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (n && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (F(o))
      for (Be(e), o = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && ye(e, "deficient indentation"), i;
}
function be(e) {
  var n = e.position, r;
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || T(r)));
}
function He(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += w.repeat(`
`, n - 1));
}
function Ei(e, n, r) {
  var i, o, l, t, u, c, s, f, a = e.kind, h = e.result, d;
  if (d = e.input.charCodeAt(e.position), T(d) || j(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (o = e.input.charCodeAt(e.position + 1), T(o) || r && j(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, u = !1; d !== 0; ) {
    if (d === 58) {
      if (o = e.input.charCodeAt(e.position + 1), T(o) || r && j(o))
        break;
    } else if (d === 35) {
      if (i = e.input.charCodeAt(e.position - 1), T(i))
        break;
    } else {
      if (e.position === e.lineStart && be(e) || r && j(d))
        break;
      if (F(d))
        if (c = e.line, s = e.lineStart, f = e.lineIndent, y(e, !1, -1), e.lineIndent >= n) {
          u = !0, d = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = c, e.lineStart = s, e.lineIndent = f;
          break;
        }
    }
    u && (N(e, l, t, !1), He(e, e.line - c), l = t = e.position, u = !1), B(d) || (t = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return N(e, l, t, !1), e.result ? !0 : (e.kind = a, e.result = h, !1);
}
function bi(e, n) {
  var r, i, o;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (N(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else F(r) ? (N(e, i, o, !0), He(e, y(e, !1, n)), i = o = e.position) : e.position === e.lineStart && be(e) ? p(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  p(e, "unexpected end of the stream within a single quoted scalar");
}
function Si(e, n) {
  var r, i, o, l, t, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return N(e, r, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (N(e, r, e.position, !0), u = e.input.charCodeAt(++e.position), F(u))
        y(e, !1, n);
      else if (u < 256 && xn[u])
        e.result += Cn[u], e.position++;
      else if ((t = vi(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = Ai(u)) >= 0 ? l = (l << 4) + t : p(e, "expected hexadecimal character");
        e.result += wi(l), e.position++;
      } else
        p(e, "unknown escape sequence");
      r = i = e.position;
    } else F(u) ? (N(e, r, i, !0), He(e, y(e, !1, n)), r = i = e.position) : e.position === e.lineStart && be(e) ? p(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  p(e, "unexpected end of the stream within a double quoted scalar");
}
function Ti(e, n) {
  var r = !0, i, o, l, t = e.tag, u, c = e.anchor, s, f, a, h, d, g = /* @__PURE__ */ Object.create(null), C, v, k, x;
  if (x = e.input.charCodeAt(e.position), x === 91)
    f = 93, d = !1, u = [];
  else if (x === 123)
    f = 125, d = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), x = e.input.charCodeAt(++e.position); x !== 0; ) {
    if (y(e, !0, n), x = e.input.charCodeAt(e.position), x === f)
      return e.position++, e.tag = t, e.anchor = c, e.kind = d ? "mapping" : "sequence", e.result = u, !0;
    r ? x === 44 && p(e, "expected the node content, but found ','") : p(e, "missed comma between flow collection entries"), v = C = k = null, a = h = !1, x === 63 && (s = e.input.charCodeAt(e.position + 1), T(s) && (a = h = !0, e.position++, y(e, !0, n))), i = e.line, o = e.lineStart, l = e.position, $(e, n, Ae, !1, !0), v = e.tag, C = e.result, y(e, !0, n), x = e.input.charCodeAt(e.position), (h || e.line === i) && x === 58 && (a = !0, x = e.input.charCodeAt(++e.position), y(e, !0, n), $(e, n, Ae, !1, !0), k = e.result), d ? G(e, u, g, v, C, k, i, o, l) : a ? u.push(G(e, null, g, v, C, k, i, o, l)) : u.push(C), y(e, !0, n), x = e.input.charCodeAt(e.position), x === 44 ? (r = !0, x = e.input.charCodeAt(++e.position)) : r = !1;
  }
  p(e, "unexpected end of the stream within a flow collection");
}
function Oi(e, n) {
  var r, i, o = Ie, l = !1, t = !1, u = n, c = 0, s = !1, f, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    i = !1;
  else if (a === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      Ie === o ? o = a === 43 ? Ke : gi : p(e, "repeat of a chomping mode identifier");
    else if ((f = yi(a)) >= 0)
      f === 0 ? p(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? p(e, "repeat of an indentation width identifier") : (u = n + f - 1, t = !0);
    else
      break;
  if (B(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while (B(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!F(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (Be(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), F(a)) {
      c++;
      continue;
    }
    if (e.lineIndent < u) {
      o === Ke ? e.result += w.repeat(`
`, l ? 1 + c : c) : o === Ie && l && (e.result += `
`);
      break;
    }
    for (i ? B(a) ? (s = !0, e.result += w.repeat(`
`, l ? 1 + c : c)) : s ? (s = !1, e.result += w.repeat(`
`, c + 1)) : c === 0 ? l && (e.result += " ") : e.result += w.repeat(`
`, c) : e.result += w.repeat(`
`, l ? 1 + c : c), l = !0, t = !0, c = 0, r = e.position; !F(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    N(e, r, e.position, !1);
  }
  return !0;
}
function Xe(e, n) {
  var r, i = e.tag, o = e.anchor, l = [], t, u = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), !(c !== 45 || (t = e.input.charCodeAt(e.position + 1), !T(t)))); ) {
    if (u = !0, e.position++, y(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, $(e, n, dn, !1, !0), l.push(e.result), y(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && c !== 0)
      p(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function ki(e, n, r) {
  var i, o, l, t, u, c, s = e.tag, f = e.anchor, a = {}, h = /* @__PURE__ */ Object.create(null), d = null, g = null, C = null, v = !1, k = !1, x;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), x = e.input.charCodeAt(e.position); x !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (x === 63 || x === 58) && T(i))
      x === 63 ? (v && (G(e, a, h, d, g, null, t, u, c), d = g = C = null), k = !0, v = !0, o = !0) : v ? (v = !1, o = !0) : p(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, x = i;
    else {
      if (t = e.line, u = e.lineStart, c = e.position, !$(e, r, hn, !1, !0))
        break;
      if (e.line === l) {
        for (x = e.input.charCodeAt(e.position); B(x); )
          x = e.input.charCodeAt(++e.position);
        if (x === 58)
          x = e.input.charCodeAt(++e.position), T(x) || p(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (G(e, a, h, d, g, null, t, u, c), d = g = C = null), k = !0, v = !1, o = !1, d = e.tag, g = e.result;
        else if (k)
          p(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = s, e.anchor = f, !0;
      } else if (k)
        p(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = s, e.anchor = f, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (v && (t = e.line, u = e.lineStart, c = e.position), $(e, n, ve, !0, o) && (v ? g = e.result : C = e.result), v || (G(e, a, h, d, g, C, t, u, c), d = g = C = null), y(e, !0, -1), x = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && x !== 0)
      p(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return v && G(e, a, h, d, g, null, t, u, c), k && (e.tag = s, e.anchor = f, e.kind = "mapping", e.result = a), k;
}
function Li(e) {
  var n, r = !1, i = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && p(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (r = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (i = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, r) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : p(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !T(t); )
      t === 33 && (i ? p(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), gn.test(o) || p(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Ci.test(l) && p(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !mn.test(l) && p(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    p(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : P.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : p(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Fi(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && p(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !T(r) && !j(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Ii(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !T(i) && !j(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), P.call(e.anchorMap, r) || p(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], y(e, !0, -1), !0;
}
function $(e, n, r, i, o) {
  var l, t, u, c = 1, s = !1, f = !1, a, h, d, g, C, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = ve === r || dn === r, i && y(e, !0, -1) && (s = !0, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)), c === 1)
    for (; Li(e) || Fi(e); )
      y(e, !0, -1) ? (s = !0, u = l, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)) : u = !1;
  if (u && (u = s || o), (c === 1 || ve === r) && (Ae === r || hn === r ? C = n : C = n + 1, v = e.position - e.lineStart, c === 1 ? u && (Xe(e, v) || ki(e, v, C)) || Ti(e, C) ? f = !0 : (t && Oi(e, C) || bi(e, C) || Si(e, C) ? f = !0 : Ii(e) ? (f = !0, (e.tag !== null || e.anchor !== null) && p(e, "alias node should not have any properties")) : Ei(e, C, Ae === r) && (f = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (f = u && Xe(e, v))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && p(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, h = e.implicitTypes.length; a < h; a += 1)
      if (g = e.implicitTypes[a], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (P.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, d = e.typeMap.multi[e.kind || "fallback"], a = 0, h = d.length; a < h; a += 1)
        if (e.tag.slice(0, d[a].tag.length) === d[a].tag) {
          g = d[a];
          break;
        }
    g || p(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && p(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : p(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || f;
}
function Ni(e) {
  var n = e.position, r, i, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (y(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), r = e.position; t !== 0 && !T(t); )
      t = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), o = [], i.length < 1 && p(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; B(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !F(t));
        break;
      }
      if (F(t)) break;
      for (r = e.position; t !== 0 && !T(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(r, e.position));
    }
    t !== 0 && Be(e), P.call(Ve, i) ? Ve[i](e, i, o) : ye(e, 'unknown document directive "' + i + '"');
  }
  if (y(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, y(e, !0, -1)) : l && p(e, "directives end mark is expected"), $(e, e.lineIndent - 1, ve, !1, !0), y(e, !0, -1), e.checkLineBreaks && xi.test(e.input.slice(n, e.position)) && ye(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && be(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, y(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    p(e, "end of the stream or a document separator is expected");
  else
    return;
}
function vn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new _i(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, p(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Ni(r);
  return r.documents;
}
function Pi(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = vn(e, r);
  if (typeof n != "function")
    return i;
  for (var o = 0, l = i.length; o < l; o += 1)
    n(i[o]);
}
function Ri(e, n) {
  var r = vn(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new S("expected a single document in the stream, but found more");
  }
}
var Di = Pi, Mi = Ri, Ui = {
  loadAll: Di,
  load: Mi
}, yn = Object.prototype.toString, wn = Object.prototype.hasOwnProperty, Ye = 65279, Bi = 9, J = 10, Hi = 13, Yi = 32, ji = 33, Gi = 34, Pe = 35, $i = 37, Ki = 38, qi = 39, Wi = 42, _n = 44, Vi = 45, we = 58, Qi = 61, Xi = 62, Zi = 63, Ji = 64, En = 91, bn = 93, zi = 96, Sn = 123, eo = 124, Tn = 125, b = {};
b[0] = "\\0";
b[7] = "\\a";
b[8] = "\\b";
b[9] = "\\t";
b[10] = "\\n";
b[11] = "\\v";
b[12] = "\\f";
b[13] = "\\r";
b[27] = "\\e";
b[34] = '\\"';
b[92] = "\\\\";
b[133] = "\\N";
b[160] = "\\_";
b[8232] = "\\L";
b[8233] = "\\P";
var no = [
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
], ro = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function io(e, n) {
  var r, i, o, l, t, u, c;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), o = 0, l = i.length; o < l; o += 1)
    t = i[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), c = e.compiledTypeMap.fallback[t], c && wn.call(c.styleAliases, u) && (u = c.styleAliases[u]), r[t] = u;
  return r;
}
function oo(e) {
  var n, r, i;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new S("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + w.repeat("0", i - n.length) + n;
}
var to = 1, z = 2;
function lo(e) {
  this.schema = e.schema || pn, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = w.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = io(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? z : to, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ze(e, n) {
  for (var r = w.repeat(" ", n), i = 0, o = -1, l = "", t, u = e.length; i < u; )
    o = e.indexOf(`
`, i), o === -1 ? (t = e.slice(i), i = u) : (t = e.slice(i, o + 1), i = o + 1), t.length && t !== `
` && (l += r), l += t;
  return l;
}
function Re(e, n) {
  return `
` + w.repeat(" ", e.indent * n);
}
function uo(e, n) {
  var r, i, o;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (o = e.implicitTypes[r], o.resolve(n))
      return !0;
  return !1;
}
function _e(e) {
  return e === Yi || e === Bi;
}
function ee(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ye || 65536 <= e && e <= 1114111;
}
function Je(e) {
  return ee(e) && e !== Ye && e !== Hi && e !== J;
}
function ze(e, n, r) {
  var i = Je(e), o = i && !_e(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== _n && e !== En && e !== bn && e !== Sn && e !== Tn) && e !== Pe && !(n === we && !o) || Je(n) && !_e(n) && e === Pe || n === we && o
  );
}
function co(e) {
  return ee(e) && e !== Ye && !_e(e) && e !== Vi && e !== Zi && e !== we && e !== _n && e !== En && e !== bn && e !== Sn && e !== Tn && e !== Pe && e !== Ki && e !== Wi && e !== ji && e !== eo && e !== Qi && e !== Xi && e !== qi && e !== Gi && e !== $i && e !== Ji && e !== zi;
}
function so(e) {
  return !_e(e) && e !== we;
}
function V(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function On(e) {
  var n = /^\n* /;
  return n.test(e);
}
var kn = 1, De = 2, Ln = 3, Fn = 4, Y = 5;
function fo(e, n, r, i, o, l, t, u) {
  var c, s = 0, f = null, a = !1, h = !1, d = i !== -1, g = -1, C = co(V(e, 0)) && so(V(e, e.length - 1));
  if (n || t)
    for (c = 0; c < e.length; s >= 65536 ? c += 2 : c++) {
      if (s = V(e, c), !ee(s))
        return Y;
      C = C && ze(s, f, u), f = s;
    }
  else {
    for (c = 0; c < e.length; s >= 65536 ? c += 2 : c++) {
      if (s = V(e, c), s === J)
        a = !0, d && (h = h || // Foldable line = too long, and not more-indented.
        c - g - 1 > i && e[g + 1] !== " ", g = c);
      else if (!ee(s))
        return Y;
      C = C && ze(s, f, u), f = s;
    }
    h = h || d && c - g - 1 > i && e[g + 1] !== " ";
  }
  return !a && !h ? C && !t && !o(e) ? kn : l === z ? Y : De : r > 9 && On(e) ? Y : t ? l === z ? Y : De : h ? Fn : Ln;
}
function ao(e, n, r, i, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === z ? '""' : "''";
    if (!e.noCompatMode && (no.indexOf(n) !== -1 || ro.test(n)))
      return e.quotingType === z ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function c(s) {
      return uo(e, s);
    }
    switch (fo(
      n,
      u,
      e.indent,
      t,
      c,
      e.quotingType,
      e.forceQuotes && !i,
      o
    )) {
      case kn:
        return n;
      case De:
        return "'" + n.replace(/'/g, "''") + "'";
      case Ln:
        return "|" + en(n, e.indent) + nn(Ze(n, l));
      case Fn:
        return ">" + en(n, e.indent) + nn(Ze(po(n, t), l));
      case Y:
        return '"' + ho(n) + '"';
      default:
        throw new S("impossible error: invalid scalar style");
    }
  }();
}
function en(e, n) {
  var r = On(e) ? String(n) : "", i = e[e.length - 1] === `
`, o = i && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : i ? "" : "-";
  return r + l + `
`;
}
function nn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function po(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var s = e.indexOf(`
`);
    return s = s !== -1 ? s : e.length, r.lastIndex = s, rn(e.slice(0, s), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = r.exec(e); ) {
    var u = t[1], c = t[2];
    l = c[0] === " ", i += u + (!o && !l && c !== "" ? `
` : "") + rn(c, n), o = l;
  }
  return i;
}
function rn(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, o = 0, l, t = 0, u = 0, c = ""; i = r.exec(e); )
    u = i.index, u - o > n && (l = t > o ? t : u, c += `
` + e.slice(o, l), o = l + 1), t = u;
  return c += `
`, e.length - o > n && t > o ? c += e.slice(o, t) + `
` + e.slice(t + 1) : c += e.slice(o), c.slice(1);
}
function ho(e) {
  for (var n = "", r = 0, i, o = 0; o < e.length; r >= 65536 ? o += 2 : o++)
    r = V(e, o), i = b[r], !i && ee(r) ? (n += e[o], r >= 65536 && (n += e[o + 1])) : n += i || oo(r);
  return n;
}
function go(e, n, r) {
  var i = "", o = e.tag, l, t, u;
  for (l = 0, t = r.length; l < t; l += 1)
    u = r[l], e.replacer && (u = e.replacer.call(r, String(l), u)), (I(e, n, u, !1, !1) || typeof u > "u" && I(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function on(e, n, r, i) {
  var o = "", l = e.tag, t, u, c;
  for (t = 0, u = r.length; t < u; t += 1)
    c = r[t], e.replacer && (c = e.replacer.call(r, String(t), c)), (I(e, n + 1, c, !0, !0, !1, !0) || typeof c > "u" && I(e, n + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += Re(e, n)), e.dump && J === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function mo(e, n, r) {
  var i = "", o = e.tag, l = Object.keys(r), t, u, c, s, f;
  for (t = 0, u = l.length; t < u; t += 1)
    f = "", i !== "" && (f += ", "), e.condenseFlow && (f += '"'), c = l[t], s = r[c], e.replacer && (s = e.replacer.call(r, c, s)), I(e, n, c, !1, !1) && (e.dump.length > 1024 && (f += "? "), f += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), I(e, n, s, !1, !1) && (f += e.dump, i += f));
  e.tag = o, e.dump = "{" + i + "}";
}
function xo(e, n, r, i) {
  var o = "", l = e.tag, t = Object.keys(r), u, c, s, f, a, h;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new S("sortKeys must be a boolean or a function");
  for (u = 0, c = t.length; u < c; u += 1)
    h = "", (!i || o !== "") && (h += Re(e, n)), s = t[u], f = r[s], e.replacer && (f = e.replacer.call(r, s, f)), I(e, n + 1, s, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && J === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, a && (h += Re(e, n)), I(e, n + 1, f, !0, a) && (e.dump && J === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, o += h));
  e.tag = l, e.dump = o || "{}";
}
function tn(e, n, r) {
  var i, o, l, t, u, c;
  for (o = r ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (r ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (c = e.styleMap[u.tag] || u.defaultStyle, yn.call(u.represent) === "[object Function]")
          i = u.represent(n, c);
        else if (wn.call(u.represent, c))
          i = u.represent[c](n, c);
        else
          throw new S("!<" + u.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function I(e, n, r, i, o, l, t) {
  e.tag = null, e.dump = r, tn(e, r, !1) || tn(e, r, !0);
  var u = yn.call(e.dump), c = i, s;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var f = u === "[object Object]" || u === "[object Array]", a, h;
  if (f && (a = e.duplicates.indexOf(r), h = a !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && n > 0) && (o = !1), h && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (f && h && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (xo(e, n, e.dump, o), h && (e.dump = "&ref_" + a + e.dump)) : (mo(e, n, e.dump), h && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? on(e, n - 1, e.dump, o) : on(e, n, e.dump, o), h && (e.dump = "&ref_" + a + e.dump)) : (go(e, n, e.dump), h && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && ao(e, e.dump, n, l, c);
    else {
      if (u === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new S("unacceptable kind of an object to dump " + u);
    }
    e.tag !== null && e.tag !== "?" && (s = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? s = "!" + s : s.slice(0, 18) === "tag:yaml.org,2002:" ? s = "!!" + s.slice(18) : s = "!<" + s + ">", e.dump = s + " " + e.dump);
  }
  return !0;
}
function Co(e, n) {
  var r = [], i = [], o, l;
  for (Me(e, r, i), o = 0, l = i.length; o < l; o += 1)
    n.duplicates.push(r[i[o]]);
  n.usedDuplicates = new Array(l);
}
function Me(e, n, r) {
  var i, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      r.indexOf(o) === -1 && r.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        Me(e[o], n, r);
    else
      for (i = Object.keys(e), o = 0, l = i.length; o < l; o += 1)
        Me(e[i[o]], n, r);
}
function Ao(e, n) {
  n = n || {};
  var r = new lo(n);
  r.noRefs || Co(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), I(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var vo = Ao, yo = {
  dump: vo
}, je = Ui.load, ln = yo.dump;
const Q = {
  retries: 3,
  // 默认最大重试次数
  retryDelay: 1e3,
  // 默认每次重试的间隔时间（毫秒）
  retryOnStatusCodes: [500, 502, 503, 504]
  // 默认重试的状态码
};
class wo {
  constructor() {
    Oe(this, "requestInterceptors", []);
    Oe(this, "responseInterceptors", []);
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
    r.retries = r.retries ?? Q.retries, r.retryDelay = r.retryDelay ?? Q.retryDelay;
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
async function In(e, n) {
  const {
    retries: r = Q.retries,
    retryDelay: i = Q.retryDelay,
    retryOnStatusCodes: o = Q.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const c = async () => {
    u++;
    try {
      const s = await _o.request({ url: e, ...t });
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
const _o = new wo();
function Se(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function Nn(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
var ne, re, ie, Ee;
class Eo {
  constructor() {
    A(this, ne, ["localhost", "127.0.0.1", "abc.cba.com"]);
    A(this, re, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    A(this, ie, 1024);
    A(this, Ee, 65535);
  }
  /**
   * @description 获取随机hostname
   * @returns {string} hostname
   */
  getHostName() {
    return m(this, ne)[Math.floor(Math.random() * m(this, ne).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (m(this, Ee) - m(this, ie) + 1) + m(this, ie)).toString();
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
    return m(this, re)[Math.floor(Math.random() * m(this, re).length)];
  }
}
ne = new WeakMap(), re = new WeakMap(), ie = new WeakMap(), Ee = new WeakMap();
var oe, te, le, ue;
class Te extends Eo {
  constructor() {
    super();
    /** * @description vps原始配置 */
    A(this, oe, {});
    /** * @description 混淆配置 */
    A(this, te, {});
    /** * @description 原始备注 */
    A(this, le, "");
    /** * @description 混淆备注 */
    A(this, ue, "");
    _(this, ue, this.getUUID());
  }
  /**
   * @description 设置原始配置
   * @param {Partial<T>} config
   */
  setConfuseConfig(r) {
    _(this, te, r);
  }
  /**
   * @description 设置混淆配置
   * @param {Partial<T>} config
   * @param {string} ps
   */
  setOriginConfig(r, i) {
    _(this, oe, r), _(this, le, decodeURIComponent(i));
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return m(this, le);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return m(this, oe);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return m(this, ue);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return m(this, te);
  }
}
oe = new WeakMap(), te = new WeakMap(), le = new WeakMap(), ue = new WeakMap();
var ce;
const X = class X {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(m(X, ce));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(m(X, ce));
  }
};
ce = new WeakMap(), A(X, ce, "^LINK_TO^");
let O = X;
function bo(e) {
  try {
    return Se(e), "base64";
  } catch {
    try {
      return je(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function So(e) {
  return Se(e).split(`
`).filter(Boolean).map((r) => decodeURIComponent(r));
}
function To(e, n = 10) {
  const r = [];
  let i = [];
  return e.forEach((o, l) => {
    i.push(o), (l + 1) % n === 0 && (r.push(i.join("|")), i = []);
  }), i.length > 0 && r.push(i.join("|")), r;
}
function Oo(e = []) {
  const n = [];
  function r(i) {
    return n.findIndex((o) => o.name === i) !== -1;
  }
  for (const i of e) {
    const { name: o, proxies: l } = i;
    if (r(o)) {
      const t = n.find((u) => u.name === o);
      t && (t.proxies = [.../* @__PURE__ */ new Set([...t.proxies ?? [], ...l ?? []])]);
    } else
      n.push(i);
  }
  return n;
}
function ko(e = [], n = []) {
  const r = {}, i = {};
  e.forEach((t) => {
    const [u, c] = O.getPs(t.name);
    u && (r[u] = (r[u] || 0) + 1, i[c] = t.name);
  });
  const o = e.map((t) => {
    const [u, c] = O.getPs(t.name);
    if (r[u] > 1) {
      const s = r[u];
      r[u] -= 1;
      const f = O.setPs(`${u} ${s}`, c);
      return i[c] = f, t.name = f, t;
    }
    return t;
  }), l = n.map((t) => {
    var u;
    return {
      ...t,
      proxies: (u = t.proxies) == null ? void 0 : u.map((c) => {
        const [s, f] = O.getPs(c);
        return f && i[f] ? i[f] : c;
      })
    };
  });
  return [o, l];
}
function Lo(e) {
  let n = { proxies: [], "proxy-groups": [] };
  const r = e.reduce(
    (i, o) => {
      const { proxies: l, proxyGroups: t, config: u } = o;
      return i.proxies.push(...l), i["proxy-groups"].push(...t), n = u, i;
    },
    { proxies: [], "proxy-groups": [] }
  );
  return n.proxies = r.proxies, n["proxy-groups"] = Oo(r["proxy-groups"]), n;
}
var M, se, fe;
class Fo {
  constructor(n) {
    A(this, M);
    A(this, se, []);
    A(this, fe, []);
    _(this, M, je(n)), _(this, se, m(this, M).proxies), _(this, fe, m(this, M)["proxy-groups"]);
  }
  get config() {
    return m(this, M);
  }
  get proxies() {
    return m(this, se);
  }
  get proxyGroups() {
    return m(this, fe);
  }
}
M = new WeakMap(), se = new WeakMap(), fe = new WeakMap();
var ae, pe, U, R, Pn, Rn, Dn;
class Io extends Te {
  constructor(r) {
    super();
    A(this, R);
    /** @description 原始链接 */
    A(this, ae, "");
    /** @description 混淆链接 */
    A(this, pe, "");
    /** @description 解析的私有配置 */
    A(this, U, {});
    L(this, R, Pn).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.cipher = m(this, U).originEncryptionProtocol, r.password = m(this, U).originPassword, r;
  }
  get confuseLink() {
    return m(this, pe);
  }
  get originLink() {
    return m(this, ae);
  }
}
ae = new WeakMap(), pe = new WeakMap(), U = new WeakMap(), R = new WeakSet(), Pn = function(r) {
  _(this, ae, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash);
  const o = this.getEncrtptionProtocol(), l = this.getPassword();
  L(this, R, Rn).call(this, i.username), this.setConfuseConfig({
    username: encodeURIComponent(Nn(`${o}:${l}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: O.setPs(this.originPs, this.confusePs)
  }), L(this, R, Dn).call(this);
}, Rn = function(r) {
  const [i, o] = Se(decodeURIComponent(r)).split(":");
  m(this, U).originEncryptionProtocol = i, m(this, U).originPassword = o;
}, Dn = function() {
  const { username: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  _(this, pe, `ss://${r}@${i}:${o}${l ?? ""}${t}`);
};
var he, de, K, Mn, Un;
class No extends Te {
  constructor(r) {
    super();
    A(this, K);
    /** * @description 原始链接 */
    A(this, he, "");
    /** * @description 混淆链接 */
    A(this, de, "");
    L(this, K, Mn).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r;
  }
  get confuseLink() {
    return m(this, de);
  }
  get originLink() {
    return m(this, he);
  }
}
he = new WeakMap(), de = new WeakMap(), K = new WeakSet(), Mn = function(r) {
  _(this, he, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: O.setPs(this.originPs, this.confusePs)
  }), L(this, K, Un).call(this);
}, Un = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  _(this, de, `trojan://${r}@${i}:${o}${l}${t}`);
};
var ge, me, q, Bn, Hn;
class Po extends Te {
  constructor(r) {
    super();
    A(this, q);
    /** * @description 原始链接 */
    A(this, ge, "");
    /** * @description 混淆链接 */
    A(this, me, "");
    L(this, q, Bn).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = this.originConfig.username ?? "", r;
  }
  get confuseLink() {
    return m(this, me);
  }
  get originLink() {
    return m(this, ge);
  }
}
ge = new WeakMap(), me = new WeakMap(), q = new WeakSet(), Bn = function(r) {
  _(this, ge, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: O.setPs(this.originPs, this.confusePs)
  }), L(this, q, Hn).call(this);
}, Hn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  _(this, me, `vless://${r}@${i}:${o}${l}${t}`);
};
var xe, Ce, D, Yn, jn, Gn;
class Ro extends Te {
  constructor(r) {
    super();
    A(this, D);
    /** * @description 原始链接 */
    A(this, xe, "");
    /** * @description 混淆链接 */
    A(this, Ce, "");
    L(this, D, Yn).call(this, r);
  }
  restore(r, i) {
    var o, l;
    return L(this, D, Gn).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  get confuseLink() {
    return m(this, Ce);
  }
  get originLink() {
    return m(this, xe);
  }
}
xe = new WeakMap(), Ce = new WeakMap(), D = new WeakSet(), Yn = function(r) {
  const [i, o] = r.match(/vmess:\/\/(.*)/) || [], l = JSON.parse(Se(o));
  _(this, xe, r), this.setOriginConfig(l, l.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: O.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), L(this, D, jn).call(this);
}, jn = function() {
  const { add: r, port: i, id: o, ps: l, scy: t, net: u, type: c, tls: s, v: f } = this.confuseConfig;
  _(this, Ce, `vmess://${Nn(JSON.stringify({ v: f, ps: l, add: r, port: i, id: o, scy: t, net: u, type: c, tls: s }))}`);
}, Gn = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
async function Do(e) {
  const n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  async function i(o) {
    for await (const l of o) {
      if (l.startsWith("vless:")) {
        const t = new Po(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("vmess:")) {
        const t = new Ro(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("trojan://")) {
        const t = new No(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("ss://")) {
        const t = new Io(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("https://") || l.startsWith("http://")) {
        const t = await In(l, { retries: 3 }).then((c) => c.data.text());
        bo(t) === "base64" && await i(So(t));
      }
    }
  }
  return await i(e), { urls: n, vpsMap: r };
}
async function Mo(e, n, r) {
  const { searchParams: i } = new URL(e), l = i.get("url").split(/\||\n/).filter(Boolean), { urls: t, vpsMap: u } = await Do(l);
  return {
    confuseUrls: To(Array.from(t), Number(r)).map((f) => {
      const a = new URL(`${n}/sub`), { searchParams: h } = new URL(e);
      return h.set("url", f), a.search = h.toString(), a.toString();
    }),
    vpsMap: u
  };
}
async function Uo(e) {
  try {
    const n = await Promise.all(e.map((l) => In(l, { retries: 1 }).then((t) => t.data.text()))), r = Lo(n.map((l) => new Fo(l))), [i, o] = ko(r.proxies, r["proxy-groups"]);
    return r.proxies = i, r["proxy-groups"] = o, r;
  } catch (n) {
    throw new Error(n.message || n);
  }
}
function Bo(e, n) {
  try {
    const r = [];
    for (const i of e) {
      const [o, l] = O.getPs(i.name);
      if (n.has(l)) {
        const t = n.get(l);
        t == null || t.restore(i, o), r.push(i);
      }
    }
    return r;
  } catch (r) {
    throw new Error(`Restore proxies failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}
function Ho(e) {
  try {
    return e.map((n) => {
      const [r] = O.getPs(n);
      return r;
    });
  } catch (n) {
    throw new Error(`Update proxies groups failed: ${n.message || n}, function trace: ${n.stack}`);
  }
}
function Yo(e, n) {
  try {
    const r = je(e);
    return r.proxies = Bo(r.proxies, n), r["proxy-groups"] = r["proxy-groups"].map((i) => (i.proxies && (i.proxies = Ho(i.proxies)), i)), r;
  } catch (r) {
    throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}
function jo(e = "") {
  return e.split(`
`).reduce((r, i) => (r.push({
    label: i,
    value: i
  }), r), []);
}
function Go(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function $o(e, n) {
  const r = n === "" ? [] : jo(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(r));
}
function Ko(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const W = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function qo(e) {
  try {
    const { url: n, lockBackend: r, remoteConfig: i, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = Go(t, o), t = $o(t, i), t = Ko(t, r), Zn(t, new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" }));
  } catch (n) {
    return un(n.message || n);
  }
}
const Vo = {
  async fetch(e, n) {
    try {
      const { pathname: r, origin: i } = new URL(e.url);
      if (r === "/sub") {
        const { confuseUrls: o, vpsMap: l } = await Mo(
          e.url,
          n.BACKEND ?? W.BACKEND,
          n.CHUNK_COUNT ?? W.CHUNK_COUNT
        ), t = await Uo(o), u = Yo(ln(t), l);
        return Xn(
          ln(u, { indent: 2, lineWidth: 200 }),
          new Headers({
            "Content-Type": "text/yaml; charset=UTF-8",
            "Cache-Control": "no-store"
          })
        );
      }
      return qo({
        url: n.PAGE_URL ?? W.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? W.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? W.REMOTE_CONFIG,
        origin: i
      });
    } catch (r) {
      return un(r.message || r);
    }
  }
};
export {
  Vo as default
};
