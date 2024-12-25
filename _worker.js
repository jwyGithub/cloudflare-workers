var hn = (e) => {
  throw TypeError(e);
};
var Qe = (e, n, i) => n.has(e) || hn("Cannot " + i);
var c = (e, n, i) => (Qe(e, n, "read from private field"), i ? i.call(e) : n.get(e)), m = (e, n, i) => n.has(e) ? hn("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i), A = (e, n, i, r) => (Qe(e, n, "write to private field"), r ? r.call(e, i) : n.set(e, i), i), P = (e, n, i) => (Qe(e, n, "access private method"), i);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function kn(e) {
  return typeof e > "u" || e === null;
}
function hi(e) {
  return typeof e == "object" && e !== null;
}
function pi(e) {
  return Array.isArray(e) ? e : kn(e) ? [] : [e];
}
function gi(e, n) {
  var i, r, o, l;
  if (n)
    for (l = Object.keys(n), i = 0, r = l.length; i < r; i += 1)
      o = l[i], e[o] = n[o];
  return e;
}
function di(e, n) {
  var i = "", r;
  for (r = 0; r < n; r += 1)
    i += e;
  return i;
}
function mi(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var xi = kn, Ci = hi, Ai = pi, vi = di, yi = mi, wi = gi, b = {
  isNothing: xi,
  isObject: Ci,
  toArray: Ai,
  repeat: vi,
  isNegativeZero: yi,
  extend: wi
};
function Fn(e, n) {
  var i = "", r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (i += 'in "' + e.mark.name + '" '), i += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (i += `

` + e.mark.snippet), r + " " + i) : r;
}
function ve(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = Fn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
ve.prototype = Object.create(Error.prototype);
ve.prototype.constructor = ve;
ve.prototype.toString = function(n) {
  return this.name + ": " + Fn(this, n);
};
var O = ve;
function Xe(e, n, i, r, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return r - n > u && (l = " ... ", n = r - u + l.length), i - r > u && (t = " ...", i = r + u - t.length), {
    str: l + e.slice(n, i).replace(/\t/g, "→") + t,
    pos: r - n + l.length
    // relative position
  };
}
function Je(e, n) {
  return b.repeat(" ", n - e.length) + e;
}
function bi(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], o = [], l, t = -1; l = i.exec(e.buffer); )
    o.push(l.index), r.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = r.length - 2);
  t < 0 && (t = r.length - 1);
  var u = "", s, f, h = Math.min(e.line + n.linesAfter, o.length).toString().length, a = n.maxLength - (n.indent + h + 3);
  for (s = 1; s <= n.linesBefore && !(t - s < 0); s++)
    f = Xe(
      e.buffer,
      r[t - s],
      o[t - s],
      e.position - (r[t] - r[t - s]),
      a
    ), u = b.repeat(" ", n.indent) + Je((e.line - s + 1).toString(), h) + " | " + f.str + `
` + u;
  for (f = Xe(e.buffer, r[t], o[t], e.position, a), u += b.repeat(" ", n.indent) + Je((e.line + 1).toString(), h) + " | " + f.str + `
`, u += b.repeat("-", n.indent + h + 3 + f.pos) + `^
`, s = 1; s <= n.linesAfter && !(t + s >= o.length); s++)
    f = Xe(
      e.buffer,
      r[t + s],
      o[t + s],
      e.position - (r[t] - r[t + s]),
      a
    ), u += b.repeat(" ", n.indent) + Je((e.line + s + 1).toString(), h) + " | " + f.str + `
`;
  return u.replace(/\n$/, "");
}
var _i = bi, Ei = [
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
], Si = [
  "scalar",
  "sequence",
  "mapping"
];
function Oi(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(i) {
    e[i].forEach(function(r) {
      n[String(r)] = i;
    });
  }), n;
}
function Ti(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(i) {
    if (Ei.indexOf(i) === -1)
      throw new O('Unknown option "' + i + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(i) {
    return i;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = Oi(n.styleAliases || null), Si.indexOf(this.kind) === -1)
    throw new O('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = Ti;
function pn(e, n) {
  var i = [];
  return e[n].forEach(function(r) {
    var o = i.length;
    i.forEach(function(l, t) {
      l.tag === r.tag && l.kind === r.kind && l.multi === r.multi && (o = t);
    }), i[o] = r;
  }), i;
}
function ki() {
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
function ze(e) {
  return this.extend(e);
}
ze.prototype.extend = function(n) {
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
  var o = Object.create(ze.prototype);
  return o.implicit = (this.implicit || []).concat(i), o.explicit = (this.explicit || []).concat(r), o.compiledImplicit = pn(o, "implicit"), o.compiledExplicit = pn(o, "explicit"), o.compiledTypeMap = ki(o.compiledImplicit, o.compiledExplicit), o;
};
var Fi = ze, Li = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Ni = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Ii = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Pi = new Fi({
  explicit: [
    Li,
    Ni,
    Ii
  ]
});
function Ri(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Di() {
  return null;
}
function Mi(e) {
  return e === null;
}
var Ui = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Ri,
  construct: Di,
  predicate: Mi,
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
function Bi(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Hi(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Yi(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var ji = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Bi,
  construct: Hi,
  predicate: Yi,
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
function Ki(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Gi(e) {
  return 48 <= e && e <= 55;
}
function $i(e) {
  return 48 <= e && e <= 57;
}
function Wi(e) {
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
          if (!Ki(e.charCodeAt(i))) return !1;
          r = !0;
        }
      return r && o !== "_";
    }
    if (o === "o") {
      for (i++; i < n; i++)
        if (o = e[i], o !== "_") {
          if (!Gi(e.charCodeAt(i))) return !1;
          r = !0;
        }
      return r && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; i < n; i++)
    if (o = e[i], o !== "_") {
      if (!$i(e.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || o === "_");
}
function qi(e) {
  var n = e, i = 1, r;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), r = n[0], (r === "-" || r === "+") && (r === "-" && (i = -1), n = n.slice(1), r = n[0]), n === "0") return 0;
  if (r === "0") {
    if (n[1] === "b") return i * parseInt(n.slice(2), 2);
    if (n[1] === "x") return i * parseInt(n.slice(2), 16);
    if (n[1] === "o") return i * parseInt(n.slice(2), 8);
  }
  return i * parseInt(n, 10);
}
function Vi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !b.isNegativeZero(e);
}
var Qi = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Wi,
  construct: qi,
  predicate: Vi,
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
}), Xi = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ji(e) {
  return !(e === null || !Xi.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Zi(e) {
  var n, i;
  return n = e.replace(/_/g, "").toLowerCase(), i = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : i * parseFloat(n, 10);
}
var zi = /^[-+]?[0-9]+e/;
function er(e, n) {
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
  return i = e.toString(10), zi.test(i) ? i.replace("e", ".e") : i;
}
function nr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || b.isNegativeZero(e));
}
var ir = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ji,
  construct: Zi,
  predicate: nr,
  represent: er,
  defaultStyle: "lowercase"
}), rr = Pi.extend({
  implicit: [
    Ui,
    ji,
    Qi,
    ir
  ]
}), or = rr, Ln = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Nn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function tr(e) {
  return e === null ? !1 : Ln.exec(e) !== null || Nn.exec(e) !== null;
}
function lr(e) {
  var n, i, r, o, l, t, u, s = 0, f = null, h, a, g;
  if (n = Ln.exec(e), n === null && (n = Nn.exec(e)), n === null) throw new Error("Date resolve error");
  if (i = +n[1], r = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(i, r, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (s = n[7].slice(0, 3); s.length < 3; )
      s += "0";
    s = +s;
  }
  return n[9] && (h = +n[10], a = +(n[11] || 0), f = (h * 60 + a) * 6e4, n[9] === "-" && (f = -f)), g = new Date(Date.UTC(i, r, o, l, t, u, s)), f && g.setTime(g.getTime() - f), g;
}
function ur(e) {
  return e.toISOString();
}
var sr = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: tr,
  construct: lr,
  instanceOf: Date,
  represent: ur
});
function fr(e) {
  return e === "<<" || e === null;
}
var cr = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: fr
}), un = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function ar(e) {
  if (e === null) return !1;
  var n, i, r = 0, o = e.length, l = un;
  for (i = 0; i < o; i++)
    if (n = l.indexOf(e.charAt(i)), !(n > 64)) {
      if (n < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function hr(e) {
  var n, i, r = e.replace(/[\r\n=]/g, ""), o = r.length, l = un, t = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)), t = t << 6 | l.indexOf(r.charAt(n));
  return i = o % 4 * 6, i === 0 ? (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)) : i === 18 ? (u.push(t >> 10 & 255), u.push(t >> 2 & 255)) : i === 12 && u.push(t >> 4 & 255), new Uint8Array(u);
}
function pr(e) {
  var n = "", i = 0, r, o, l = e.length, t = un;
  for (r = 0; r < l; r++)
    r % 3 === 0 && r && (n += t[i >> 18 & 63], n += t[i >> 12 & 63], n += t[i >> 6 & 63], n += t[i & 63]), i = (i << 8) + e[r];
  return o = l % 3, o === 0 ? (n += t[i >> 18 & 63], n += t[i >> 12 & 63], n += t[i >> 6 & 63], n += t[i & 63]) : o === 2 ? (n += t[i >> 10 & 63], n += t[i >> 4 & 63], n += t[i << 2 & 63], n += t[64]) : o === 1 && (n += t[i >> 2 & 63], n += t[i << 4 & 63], n += t[64], n += t[64]), n;
}
function gr(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var dr = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: ar,
  construct: hr,
  predicate: gr,
  represent: pr
}), mr = Object.prototype.hasOwnProperty, xr = Object.prototype.toString;
function Cr(e) {
  if (e === null) return !0;
  var n = [], i, r, o, l, t, u = e;
  for (i = 0, r = u.length; i < r; i += 1) {
    if (o = u[i], t = !1, xr.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (mr.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function Ar(e) {
  return e !== null ? e : [];
}
var vr = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Cr,
  construct: Ar
}), yr = Object.prototype.toString;
function wr(e) {
  if (e === null) return !0;
  var n, i, r, o, l, t = e;
  for (l = new Array(t.length), n = 0, i = t.length; n < i; n += 1) {
    if (r = t[n], yr.call(r) !== "[object Object]" || (o = Object.keys(r), o.length !== 1)) return !1;
    l[n] = [o[0], r[o[0]]];
  }
  return !0;
}
function br(e) {
  if (e === null) return [];
  var n, i, r, o, l, t = e;
  for (l = new Array(t.length), n = 0, i = t.length; n < i; n += 1)
    r = t[n], o = Object.keys(r), l[n] = [o[0], r[o[0]]];
  return l;
}
var _r = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: wr,
  construct: br
}), Er = Object.prototype.hasOwnProperty;
function Sr(e) {
  if (e === null) return !0;
  var n, i = e;
  for (n in i)
    if (Er.call(i, n) && i[n] !== null)
      return !1;
  return !0;
}
function Or(e) {
  return e !== null ? e : {};
}
var Tr = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Sr,
  construct: Or
}), In = or.extend({
  implicit: [
    sr,
    cr
  ],
  explicit: [
    dr,
    vr,
    _r,
    Tr
  ]
}), G = Object.prototype.hasOwnProperty, Ue = 1, Pn = 2, Rn = 3, Be = 4, Ze = 1, kr = 2, gn = 3, Fr = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Lr = /[\x85\u2028\u2029]/, Nr = /[,\[\]\{\}]/, Dn = /^(?:!|!!|![a-z\-]+!)$/i, Mn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function dn(e) {
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
function Ir(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function Pr(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Rr(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function mn(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Dr(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Un = new Array(256), Bn = new Array(256);
for (var ie = 0; ie < 256; ie++)
  Un[ie] = mn(ie) ? 1 : 0, Bn[ie] = mn(ie);
function Mr(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || In, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Hn(e, n) {
  var i = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return i.snippet = _i(i), new O(n, i);
}
function d(e, n) {
  throw Hn(e, n);
}
function He(e, n) {
  e.onWarning && e.onWarning.call(null, Hn(e, n));
}
var xn = {
  YAML: function(n, i, r) {
    var o, l, t;
    n.version !== null && d(n, "duplication of %YAML directive"), r.length !== 1 && d(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), o === null && d(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && d(n, "unacceptable YAML version of the document"), n.version = r[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && He(n, "unsupported YAML version of the document");
  },
  TAG: function(n, i, r) {
    var o, l;
    r.length !== 2 && d(n, "TAG directive accepts exactly two arguments"), o = r[0], l = r[1], Dn.test(o) || d(n, "ill-formed tag handle (first argument) of the TAG directive"), G.call(n.tagMap, o) && d(n, 'there is a previously declared suffix for "' + o + '" tag handle'), Mn.test(l) || d(n, "ill-formed tag prefix (second argument) of the TAG directive");
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
    else Fr.test(u) && d(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function Cn(e, n, i, r) {
  var o, l, t, u;
  for (b.isObject(i) || d(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(i), t = 0, u = o.length; t < u; t += 1)
    l = o[t], G.call(n, l) || (n[l] = i[l], r[l] = !0);
}
function te(e, n, i, r, o, l, t, u, s) {
  var f, h;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), f = 0, h = o.length; f < h; f += 1)
      Array.isArray(o[f]) && d(e, "nested arrays are not supported inside keys"), typeof o == "object" && dn(o[f]) === "[object Object]" && (o[f] = "[object Object]");
  if (typeof o == "object" && dn(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (f = 0, h = l.length; f < h; f += 1)
        Cn(e, n, l[f], i);
    else
      Cn(e, n, l, i);
  else
    !e.json && !G.call(i, o) && G.call(n, o) && (e.line = t || e.line, e.lineStart = u || e.lineStart, e.position = s || e.position, d(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete i[o];
  return n;
}
function sn(e) {
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
      for (sn(e), o = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && e.lineIndent < i && He(e, "deficient indentation"), r;
}
function qe(e) {
  var n = e.position, i;
  return i = e.input.charCodeAt(n), !!((i === 45 || i === 46) && i === e.input.charCodeAt(n + 1) && i === e.input.charCodeAt(n + 2) && (n += 3, i = e.input.charCodeAt(n), i === 0 || T(i)));
}
function fn(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += b.repeat(`
`, n - 1));
}
function Ur(e, n, i) {
  var r, o, l, t, u, s, f, h, a = e.kind, g = e.result, p;
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
      if (e.position === e.lineStart && qe(e) || i && oe(p))
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
    u && (K(e, l, t, !1), fn(e, e.line - s), l = t = e.position, u = !1), ne(p) || (t = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return K(e, l, t, !1), e.result ? !0 : (e.kind = a, e.result = g, !1);
}
function Br(e, n) {
  var i, r, o;
  if (i = e.input.charCodeAt(e.position), i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = o = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (K(e, r, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        r = e.position, e.position++, o = e.position;
      else
        return !0;
    else D(i) ? (K(e, r, o, !0), fn(e, w(e, !1, n)), r = o = e.position) : e.position === e.lineStart && qe(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
function Hr(e, n) {
  var i, r, o, l, t, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = r = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return K(e, i, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (K(e, i, e.position, !0), u = e.input.charCodeAt(++e.position), D(u))
        w(e, !1, n);
      else if (u < 256 && Un[u])
        e.result += Bn[u], e.position++;
      else if ((t = Pr(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = Ir(u)) >= 0 ? l = (l << 4) + t : d(e, "expected hexadecimal character");
        e.result += Dr(l), e.position++;
      } else
        d(e, "unknown escape sequence");
      i = r = e.position;
    } else D(u) ? (K(e, i, r, !0), fn(e, w(e, !1, n)), i = r = e.position) : e.position === e.lineStart && qe(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function Yr(e, n) {
  var i = !0, r, o, l, t = e.tag, u, s = e.anchor, f, h, a, g, p, x = /* @__PURE__ */ Object.create(null), C, y, S, v;
  if (v = e.input.charCodeAt(e.position), v === 91)
    h = 93, p = !1, u = [];
  else if (v === 123)
    h = 125, p = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), v = e.input.charCodeAt(++e.position); v !== 0; ) {
    if (w(e, !0, n), v = e.input.charCodeAt(e.position), v === h)
      return e.position++, e.tag = t, e.anchor = s, e.kind = p ? "mapping" : "sequence", e.result = u, !0;
    i ? v === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), y = C = S = null, a = g = !1, v === 63 && (f = e.input.charCodeAt(e.position + 1), T(f) && (a = g = !0, e.position++, w(e, !0, n))), r = e.line, o = e.lineStart, l = e.position, de(e, n, Ue, !1, !0), y = e.tag, C = e.result, w(e, !0, n), v = e.input.charCodeAt(e.position), (g || e.line === r) && v === 58 && (a = !0, v = e.input.charCodeAt(++e.position), w(e, !0, n), de(e, n, Ue, !1, !0), S = e.result), p ? te(e, u, x, y, C, S, r, o, l) : a ? u.push(te(e, null, x, y, C, S, r, o, l)) : u.push(C), w(e, !0, n), v = e.input.charCodeAt(e.position), v === 44 ? (i = !0, v = e.input.charCodeAt(++e.position)) : i = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function jr(e, n) {
  var i, r, o = Ze, l = !1, t = !1, u = n, s = 0, f = !1, h, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    r = !1;
  else if (a === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      Ze === o ? o = a === 43 ? gn : kr : d(e, "repeat of a chomping mode identifier");
    else if ((h = Rr(a)) >= 0)
      h === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? d(e, "repeat of an indentation width identifier") : (u = n + h - 1, t = !0);
    else
      break;
  if (ne(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while (ne(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!D(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (sn(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), D(a)) {
      s++;
      continue;
    }
    if (e.lineIndent < u) {
      o === gn ? e.result += b.repeat(`
`, l ? 1 + s : s) : o === Ze && l && (e.result += `
`);
      break;
    }
    for (r ? ne(a) ? (f = !0, e.result += b.repeat(`
`, l ? 1 + s : s)) : f ? (f = !1, e.result += b.repeat(`
`, s + 1)) : s === 0 ? l && (e.result += " ") : e.result += b.repeat(`
`, s) : e.result += b.repeat(`
`, l ? 1 + s : s), l = !0, t = !0, s = 0, i = e.position; !D(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    K(e, i, e.position, !1);
  }
  return !0;
}
function An(e, n) {
  var i, r = e.tag, o = e.anchor, l = [], t, u = !1, s;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), s = e.input.charCodeAt(e.position); s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(s !== 45 || (t = e.input.charCodeAt(e.position + 1), !T(t)))); ) {
    if (u = !0, e.position++, w(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    if (i = e.line, de(e, n, Rn, !1, !0), l.push(e.result), w(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === i || e.lineIndent > n) && s !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = r, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function Kr(e, n, i) {
  var r, o, l, t, u, s, f = e.tag, h = e.anchor, a = {}, g = /* @__PURE__ */ Object.create(null), p = null, x = null, C = null, y = !1, S = !1, v;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), v = e.input.charCodeAt(e.position); v !== 0; ) {
    if (!y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), r = e.input.charCodeAt(e.position + 1), l = e.line, (v === 63 || v === 58) && T(r))
      v === 63 ? (y && (te(e, a, g, p, x, null, t, u, s), p = x = C = null), S = !0, y = !0, o = !0) : y ? (y = !1, o = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, v = r;
    else {
      if (t = e.line, u = e.lineStart, s = e.position, !de(e, i, Pn, !1, !0))
        break;
      if (e.line === l) {
        for (v = e.input.charCodeAt(e.position); ne(v); )
          v = e.input.charCodeAt(++e.position);
        if (v === 58)
          v = e.input.charCodeAt(++e.position), T(v) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && (te(e, a, g, p, x, null, t, u, s), p = x = C = null), S = !0, y = !1, o = !1, p = e.tag, x = e.result;
        else if (S)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = h, !0;
      } else if (S)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = h, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (y && (t = e.line, u = e.lineStart, s = e.position), de(e, n, Be, !0, o) && (y ? x = e.result : C = e.result), y || (te(e, a, g, p, x, C, t, u, s), p = x = C = null), w(e, !0, -1), v = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && v !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return y && te(e, a, g, p, x, null, t, u, s), S && (e.tag = f, e.anchor = h, e.kind = "mapping", e.result = a), S;
}
function Gr(e) {
  var n, i = !1, r = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (i = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (r = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, i) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !T(t); )
      t === 33 && (r ? d(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), Dn.test(o) || d(e, "named tag handle cannot contain such characters"), r = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Nr.test(l) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !Mn.test(l) && d(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    d(e, "tag name is malformed: " + l);
  }
  return i ? e.tag = l : G.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : d(e, 'undeclared tag handle "' + o + '"'), !0;
}
function $r(e) {
  var n, i;
  if (i = e.input.charCodeAt(e.position), i !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !T(i) && !oe(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Wr(e) {
  var n, i, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !T(r) && !oe(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), i = e.input.slice(n, e.position), G.call(e.anchorMap, i) || d(e, 'unidentified alias "' + i + '"'), e.result = e.anchorMap[i], w(e, !0, -1), !0;
}
function de(e, n, i, r, o) {
  var l, t, u, s = 1, f = !1, h = !1, a, g, p, x, C, y;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = Be === i || Rn === i, r && w(e, !0, -1) && (f = !0, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)), s === 1)
    for (; Gr(e) || $r(e); )
      w(e, !0, -1) ? (f = !0, u = l, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)) : u = !1;
  if (u && (u = f || o), (s === 1 || Be === i) && (Ue === i || Pn === i ? C = n : C = n + 1, y = e.position - e.lineStart, s === 1 ? u && (An(e, y) || Kr(e, y, C)) || Yr(e, C) ? h = !0 : (t && jr(e, C) || Br(e, C) || Hr(e, C) ? h = !0 : Wr(e) ? (h = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : Ur(e, C, Ue === i) && (h = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : s === 0 && (h = u && An(e, y))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, g = e.implicitTypes.length; a < g; a += 1)
      if (x = e.implicitTypes[a], x.resolve(e.result)) {
        e.result = x.construct(e.result), e.tag = x.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (G.call(e.typeMap[e.kind || "fallback"], e.tag))
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
function qr(e) {
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
    t !== 0 && sn(e), G.call(xn, r) ? xn[r](e, r, o) : He(e, 'unknown document directive "' + r + '"');
  }
  if (w(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, w(e, !0, -1)) : l && d(e, "directives end mark is expected"), de(e, e.lineIndent - 1, Be, !1, !0), w(e, !0, -1), e.checkLineBreaks && Lr.test(e.input.slice(n, e.position)) && He(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && qe(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, w(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    d(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Yn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var i = new Mr(e, n), r = e.indexOf("\0");
  for (r !== -1 && (i.position = r, d(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    qr(i);
  return i.documents;
}
function Vr(e, n, i) {
  n !== null && typeof n == "object" && typeof i > "u" && (i = n, n = null);
  var r = Yn(e, i);
  if (typeof n != "function")
    return r;
  for (var o = 0, l = r.length; o < l; o += 1)
    n(r[o]);
}
function Qr(e, n) {
  var i = Yn(e, n);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new O("expected a single document in the stream, but found more");
  }
}
var Xr = Vr, Jr = Qr, Zr = {
  loadAll: Xr,
  load: Jr
}, jn = Object.prototype.toString, Kn = Object.prototype.hasOwnProperty, cn = 65279, zr = 9, ye = 10, eo = 13, no = 32, io = 33, ro = 34, en = 35, oo = 37, to = 38, lo = 39, uo = 42, Gn = 44, so = 45, Ye = 58, fo = 61, co = 62, ao = 63, ho = 64, $n = 91, Wn = 93, po = 96, qn = 123, go = 124, Vn = 125, E = {};
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
var mo = [
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
], xo = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Co(e, n) {
  var i, r, o, l, t, u, s;
  if (n === null) return {};
  for (i = {}, r = Object.keys(n), o = 0, l = r.length; o < l; o += 1)
    t = r[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), s = e.compiledTypeMap.fallback[t], s && Kn.call(s.styleAliases, u) && (u = s.styleAliases[u]), i[t] = u;
  return i;
}
function Ao(e) {
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
var vo = 1, we = 2;
function yo(e) {
  this.schema = e.schema || In, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Co(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? we : vo, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function vn(e, n) {
  for (var i = b.repeat(" ", n), r = 0, o = -1, l = "", t, u = e.length; r < u; )
    o = e.indexOf(`
`, r), o === -1 ? (t = e.slice(r), r = u) : (t = e.slice(r, o + 1), r = o + 1), t.length && t !== `
` && (l += i), l += t;
  return l;
}
function nn(e, n) {
  return `
` + b.repeat(" ", e.indent * n);
}
function wo(e, n) {
  var i, r, o;
  for (i = 0, r = e.implicitTypes.length; i < r; i += 1)
    if (o = e.implicitTypes[i], o.resolve(n))
      return !0;
  return !1;
}
function je(e) {
  return e === no || e === zr;
}
function be(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== cn || 65536 <= e && e <= 1114111;
}
function yn(e) {
  return be(e) && e !== cn && e !== eo && e !== ye;
}
function wn(e, n, i) {
  var r = yn(e), o = r && !je(e);
  return (
    // ns-plain-safe
    (i ? (
      // c = flow-in
      r
    ) : r && e !== Gn && e !== $n && e !== Wn && e !== qn && e !== Vn) && e !== en && !(n === Ye && !o) || yn(n) && !je(n) && e === en || n === Ye && o
  );
}
function bo(e) {
  return be(e) && e !== cn && !je(e) && e !== so && e !== ao && e !== Ye && e !== Gn && e !== $n && e !== Wn && e !== qn && e !== Vn && e !== en && e !== to && e !== uo && e !== io && e !== go && e !== fo && e !== co && e !== lo && e !== ro && e !== oo && e !== ho && e !== po;
}
function _o(e) {
  return !je(e) && e !== Ye;
}
function Ce(e, n) {
  var i = e.charCodeAt(n), r;
  return i >= 55296 && i <= 56319 && n + 1 < e.length && (r = e.charCodeAt(n + 1), r >= 56320 && r <= 57343) ? (i - 55296) * 1024 + r - 56320 + 65536 : i;
}
function Qn(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Xn = 1, rn = 2, Jn = 3, Zn = 4, re = 5;
function Eo(e, n, i, r, o, l, t, u) {
  var s, f = 0, h = null, a = !1, g = !1, p = r !== -1, x = -1, C = bo(Ce(e, 0)) && _o(Ce(e, e.length - 1));
  if (n || t)
    for (s = 0; s < e.length; f >= 65536 ? s += 2 : s++) {
      if (f = Ce(e, s), !be(f))
        return re;
      C = C && wn(f, h, u), h = f;
    }
  else {
    for (s = 0; s < e.length; f >= 65536 ? s += 2 : s++) {
      if (f = Ce(e, s), f === ye)
        a = !0, p && (g = g || // Foldable line = too long, and not more-indented.
        s - x - 1 > r && e[x + 1] !== " ", x = s);
      else if (!be(f))
        return re;
      C = C && wn(f, h, u), h = f;
    }
    g = g || p && s - x - 1 > r && e[x + 1] !== " ";
  }
  return !a && !g ? C && !t && !o(e) ? Xn : l === we ? re : rn : i > 9 && Qn(e) ? re : t ? l === we ? re : rn : g ? Zn : Jn;
}
function So(e, n, i, r, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === we ? '""' : "''";
    if (!e.noCompatMode && (mo.indexOf(n) !== -1 || xo.test(n)))
      return e.quotingType === we ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, i), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = r || e.flowLevel > -1 && i >= e.flowLevel;
    function s(f) {
      return wo(e, f);
    }
    switch (Eo(
      n,
      u,
      e.indent,
      t,
      s,
      e.quotingType,
      e.forceQuotes && !r,
      o
    )) {
      case Xn:
        return n;
      case rn:
        return "'" + n.replace(/'/g, "''") + "'";
      case Jn:
        return "|" + bn(n, e.indent) + _n(vn(n, l));
      case Zn:
        return ">" + bn(n, e.indent) + _n(vn(Oo(n, t), l));
      case re:
        return '"' + To(n) + '"';
      default:
        throw new O("impossible error: invalid scalar style");
    }
  }();
}
function bn(e, n) {
  var i = Qn(e) ? String(n) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : r ? "" : "-";
  return i + l + `
`;
}
function _n(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Oo(e, n) {
  for (var i = /(\n+)([^\n]*)/g, r = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, i.lastIndex = f, En(e.slice(0, f), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = i.exec(e); ) {
    var u = t[1], s = t[2];
    l = s[0] === " ", r += u + (!o && !l && s !== "" ? `
` : "") + En(s, n), o = l;
  }
  return r;
}
function En(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var i = / [^ ]/g, r, o = 0, l, t = 0, u = 0, s = ""; r = i.exec(e); )
    u = r.index, u - o > n && (l = t > o ? t : u, s += `
` + e.slice(o, l), o = l + 1), t = u;
  return s += `
`, e.length - o > n && t > o ? s += e.slice(o, t) + `
` + e.slice(t + 1) : s += e.slice(o), s.slice(1);
}
function To(e) {
  for (var n = "", i = 0, r, o = 0; o < e.length; i >= 65536 ? o += 2 : o++)
    i = Ce(e, o), r = E[i], !r && be(i) ? (n += e[o], i >= 65536 && (n += e[o + 1])) : n += r || Ao(i);
  return n;
}
function ko(e, n, i) {
  var r = "", o = e.tag, l, t, u;
  for (l = 0, t = i.length; l < t; l += 1)
    u = i[l], e.replacer && (u = e.replacer.call(i, String(l), u)), (U(e, n, u, !1, !1) || typeof u > "u" && U(e, n, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = o, e.dump = "[" + r + "]";
}
function Sn(e, n, i, r) {
  var o = "", l = e.tag, t, u, s;
  for (t = 0, u = i.length; t < u; t += 1)
    s = i[t], e.replacer && (s = e.replacer.call(i, String(t), s)), (U(e, n + 1, s, !0, !0, !1, !0) || typeof s > "u" && U(e, n + 1, null, !0, !0, !1, !0)) && ((!r || o !== "") && (o += nn(e, n)), e.dump && ye === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function Fo(e, n, i) {
  var r = "", o = e.tag, l = Object.keys(i), t, u, s, f, h;
  for (t = 0, u = l.length; t < u; t += 1)
    h = "", r !== "" && (h += ", "), e.condenseFlow && (h += '"'), s = l[t], f = i[s], e.replacer && (f = e.replacer.call(i, s, f)), U(e, n, s, !1, !1) && (e.dump.length > 1024 && (h += "? "), h += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), U(e, n, f, !1, !1) && (h += e.dump, r += h));
  e.tag = o, e.dump = "{" + r + "}";
}
function Lo(e, n, i, r) {
  var o = "", l = e.tag, t = Object.keys(i), u, s, f, h, a, g;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new O("sortKeys must be a boolean or a function");
  for (u = 0, s = t.length; u < s; u += 1)
    g = "", (!r || o !== "") && (g += nn(e, n)), f = t[u], h = i[f], e.replacer && (h = e.replacer.call(i, f, h)), U(e, n + 1, f, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && ye === e.dump.charCodeAt(0) ? g += "?" : g += "? "), g += e.dump, a && (g += nn(e, n)), U(e, n + 1, h, !0, a) && (e.dump && ye === e.dump.charCodeAt(0) ? g += ":" : g += ": ", g += e.dump, o += g));
  e.tag = l, e.dump = o || "{}";
}
function On(e, n, i) {
  var r, o, l, t, u, s;
  for (o = i ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (i ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (s = e.styleMap[u.tag] || u.defaultStyle, jn.call(u.represent) === "[object Function]")
          r = u.represent(n, s);
        else if (Kn.call(u.represent, s))
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
  e.tag = null, e.dump = i, On(e, i, !1) || On(e, i, !0);
  var u = jn.call(e.dump), s = r, f;
  r && (r = e.flowLevel < 0 || e.flowLevel > n);
  var h = u === "[object Object]" || u === "[object Array]", a, g;
  if (h && (a = e.duplicates.indexOf(i), g = a !== -1), (e.tag !== null && e.tag !== "?" || g || e.indent !== 2 && n > 0) && (o = !1), g && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (h && g && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), u === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Lo(e, n, e.dump, o), g && (e.dump = "&ref_" + a + e.dump)) : (Fo(e, n, e.dump), g && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? Sn(e, n - 1, e.dump, o) : Sn(e, n, e.dump, o), g && (e.dump = "&ref_" + a + e.dump)) : (ko(e, n, e.dump), g && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && So(e, e.dump, n, l, s);
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
function No(e, n) {
  var i = [], r = [], o, l;
  for (on(e, i, r), o = 0, l = r.length; o < l; o += 1)
    n.duplicates.push(i[r[o]]);
  n.usedDuplicates = new Array(l);
}
function on(e, n, i) {
  var r, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      i.indexOf(o) === -1 && i.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        on(e[o], n, i);
    else
      for (r = Object.keys(e), o = 0, l = r.length; o < l; o += 1)
        on(e[r[o]], n, i);
}
function Io(e, n) {
  n = n || {};
  var i = new yo(n);
  i.noRefs || No(e, i);
  var r = e;
  return i.replacer && (r = i.replacer.call({ "": r }, "", r)), U(i, 0, r, !0, !0) ? i.dump + `
` : "";
}
var Po = Io, Ro = {
  dump: Po
}, zn = Zr.load, Do = Ro.dump;
const Me = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function tn(e, n = Me) {
  const {
    retries: i = Me.retries,
    retryDelay: r = Me.retryDelay,
    retryOnStatusCodes: o = Me.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const s = async () => {
    u++;
    try {
      let f, h;
      e instanceof Request ? (h = e.url, f = new Request(e, t)) : (h = e.toString(), f = new Request(h, t));
      const a = await fetch(f), g = {
        status: a.status,
        statusText: a.statusText,
        headers: Object.fromEntries(a.headers.entries()),
        data: a,
        config: { url: h, ...t },
        ok: a.ok
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
function an(e) {
  if (!e) return e;
  const n = atob(e), i = new Uint8Array(n.length);
  for (let r = 0; r < n.length; r++)
    i[r] = n.charCodeAt(r);
  return new TextDecoder().decode(i);
}
function Tn(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let i = "";
  for (let r = 0; r < n.length; r += 1)
    i += String.fromCharCode(n[r]);
  return btoa(i);
}
var _e, Ke, ei;
class Mo {
  constructor(n = []) {
    m(this, Ke);
    m(this, _e);
    const i = n.map((o) => zn(o)), r = P(this, Ke, ei).call(this, i);
    A(this, _e, r);
  }
  get clashConfig() {
    return c(this, _e);
  }
}
_e = new WeakMap(), Ke = new WeakSet(), /**
 * @description 合并配置
 * @param {ClashType[]} configs
 * @returns {ClashType} mergedConfig
 */
ei = function(n = []) {
  var f, h, a, g;
  if (!n.length)
    return {};
  const i = structuredClone(n[0]);
  if (n.length === 1)
    return i;
  const r = {
    ...i,
    proxies: i.proxies || [],
    "proxy-groups": i["proxy-groups"] || []
  }, o = n.reduce((p, x) => {
    var C;
    return p + (((C = x.proxies) == null ? void 0 : C.length) || 0);
  }, 0), l = new Int32Array(o), t = new Set((f = i.proxies) == null ? void 0 : f.map((p) => p.name));
  let u = ((h = i.proxies) == null ? void 0 : h.length) || 0;
  const s = new Map(r["proxy-groups"].map((p) => [p.name, p]));
  for (let p = 1; p < n.length; p++) {
    const x = n[p];
    if ((a = x.proxies) != null && a.length)
      for (const C of x.proxies)
        t.has(C.name) || (r.proxies[u] = C, l[u] = u, t.add(C.name), u++);
    if ((g = x["proxy-groups"]) != null && g.length)
      for (const C of x["proxy-groups"]) {
        const y = s.get(C.name);
        if (y) {
          const S = new Set(y.proxies);
          for (const v of C.proxies || [])
            S.add(v);
          y.proxies = Array.from(S), Object.assign(y, {
            ...C,
            proxies: y.proxies
          });
        } else
          r["proxy-groups"].push(C), s.set(C.name, C);
      }
  }
  return r.proxies = r.proxies.filter((p, x) => l[x] !== -1), r;
};
var $, W;
const F = class F {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const i = n.split(c(F, $));
    return [i[0], i[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, i) {
    return [n, i].join(c(F, $));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(n) {
    if (!(n != null && n.includes(c(F, $)))) return null;
    if (c(F, W).has(n))
      return c(F, W).get(n);
    const [i] = F.getPs(n);
    if (i) {
      const r = i.trim();
      return c(F, W).set(n, r), r;
    }
    return null;
  }
  static isConfigType(n) {
    return n.includes(c(this, $));
  }
  // 清除缓存
  static clearCache() {
    c(this, W).clear();
  }
};
$ = new WeakMap(), W = new WeakMap(), m(F, $, "^LINK_TO^"), m(F, W, /* @__PURE__ */ new Map());
let k = F;
var Ee, Ge, ni;
class Uo {
  constructor(n = []) {
    m(this, Ge);
    m(this, Ee, {});
    const i = P(this, Ge, ni).call(this, n);
    A(this, Ee, i);
  }
  get singboxConfig() {
    return c(this, Ee);
  }
}
Ee = new WeakMap(), Ge = new WeakSet(), ni = function(n) {
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
            const a = new Set(f.outbounds.filter((g) => !k.isConfigType(g)));
            l.set(h, {
              base: f,
              baseOutbounds: a,
              linkOutbounds: /* @__PURE__ */ new Set()
            });
          }
          f.outbounds.forEach((a) => {
            var g;
            k.isConfigType(a) && ((g = l.get(h)) == null || g.linkOutbounds.add(a));
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
    const h = { ...f.base }, a = /* @__PURE__ */ new Set([...f.baseOutbounds, ...f.linkOutbounds]);
    h.outbounds = Array.from(a), r.push(h);
  }
  return i.outbounds = r, i;
};
function Bo(e) {
  try {
    return an(e), "base64";
  } catch {
    try {
      return zn(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function Ho(e, n = 10) {
  const i = [];
  let r = [];
  return e.forEach((o, l) => {
    r.push(o), (l + 1) % n === 0 && (i.push(r.join("|")), r = []);
  }), r.length > 0 && i.push(r.join("|")), i;
}
var Se, Oe, Te, $e;
class Yo {
  constructor() {
    m(this, Se, ["localhost", "127.0.0.1", "abc.cba.com"]);
    m(this, Oe, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    m(this, Te, 1024);
    m(this, $e, 65535);
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
    return c(this, Se)[Math.floor(Math.random() * c(this, Se).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (c(this, $e) - c(this, Te) + 1) + c(this, Te)).toString();
  }
  /**
   * @description 获取随机 SS协议的加密类型
   */
  getEncrtptionProtocol() {
    return c(this, Oe)[Math.floor(Math.random() * c(this, Oe).length)];
  }
}
Se = new WeakMap(), Oe = new WeakMap(), Te = new WeakMap(), $e = new WeakMap();
let Ve = class extends Yo {
};
var q, ke, H, L, V, ue;
class ii extends Ve {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    m(this, q, "");
    /** * @description 混淆链接 */
    m(this, ke, "");
    /** * @description vps原始配置 */
    m(this, H, {});
    /** * @description 混淆配置 */
    m(this, L, {});
    /** * @description 原始备注 */
    m(this, V, "");
    /** * @description 混淆备注 */
    m(this, ue, "");
    A(this, ue, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    A(this, q, i), A(this, H, new URL(i)), A(this, V, c(this, H).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    c(this, H).hash = i, A(this, V, i), A(this, q, c(this, H).href), this.setConfuseConfig(c(this, q));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    A(this, L, new URL(i)), c(this, L).username = this.getUsername(), c(this, L).host = this.getHost(), c(this, L).hostname = this.getHostName(), c(this, L).port = this.getPort(), c(this, L).hash = k.setPs(c(this, V), c(this, ue)), A(this, ke, c(this, L).href);
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
    return c(this, V);
  }
  /**
   * @description 原始链接
   * @example 'ss://...'
   */
  get originLink() {
    return c(this, q);
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
    return c(this, ue);
  }
  /**
   * @description 混淆链接
   * @example 'ss://...'
   */
  get confuseLink() {
    return c(this, ke);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, L);
  }
}
q = new WeakMap(), ke = new WeakMap(), H = new WeakMap(), L = new WeakMap(), V = new WeakMap(), ue = new WeakMap();
var Q, Fe, Y, N, X, se;
class ri extends Ve {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    m(this, Q, "");
    /** * @description 混淆链接 */
    m(this, Fe, "");
    /** * @description vps原始配置 */
    m(this, Y, {});
    /** * @description 混淆配置 */
    m(this, N, {});
    /** * @description 原始备注 */
    m(this, X, "");
    /** * @description 混淆备注 */
    m(this, se, "");
    A(this, se, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    A(this, Q, i), A(this, Y, new URL(i)), A(this, X, c(this, Y).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    c(this, Y).hash = i, A(this, X, i), A(this, Q, c(this, Y).href), this.setConfuseConfig(c(this, Q));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    A(this, N, new URL(i)), c(this, N).username = this.getUsername(), c(this, N).host = this.getHost(), c(this, N).hostname = this.getHostName(), c(this, N).port = this.getPort(), c(this, N).hash = k.setPs(c(this, X), c(this, se)), A(this, Fe, c(this, N).href);
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
    return c(this, Y);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return encodeURIComponent(c(this, se));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return c(this, Fe);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, N);
  }
}
Q = new WeakMap(), Fe = new WeakMap(), Y = new WeakMap(), N = new WeakMap(), X = new WeakMap(), se = new WeakMap();
var J, Le, j, I, Z, fe;
class oi extends Ve {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    m(this, J, "");
    /** * @description 混淆链接 */
    m(this, Le, "");
    /** * @description vps原始配置 */
    m(this, j, {});
    /** * @description 混淆配置 */
    m(this, I, {});
    /** * @description 原始备注 */
    m(this, Z, "");
    /** * @description 混淆备注 */
    m(this, fe, "");
    A(this, fe, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    A(this, J, i), A(this, j, new URL(i)), A(this, Z, c(this, j).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    c(this, j).hash = i, A(this, Z, i), A(this, J, c(this, j).href), this.setConfuseConfig(c(this, J));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    A(this, I, new URL(i)), c(this, I).username = this.getUsername(), c(this, I).host = this.getHost(), c(this, I).hostname = this.getHostName(), c(this, I).port = this.getPort(), c(this, I).hash = k.setPs(c(this, Z), c(this, fe)), A(this, Le, c(this, I).href);
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
    return c(this, Z);
  }
  /**
   * @description 原始链接
   * @example 'vless://...'
   */
  get originLink() {
    return c(this, J);
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
    return c(this, fe);
  }
  /**
   * @description 混淆链接
   * @example 'vless://...'
   */
  get confuseLink() {
    return c(this, Le);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, I);
  }
}
J = new WeakMap(), Le = new WeakMap(), j = new WeakMap(), I = new WeakMap(), Z = new WeakMap(), fe = new WeakMap();
var ce, Ne, M, R, z, ae, We, li;
class ti extends Ve {
  constructor(i) {
    super();
    m(this, We);
    /** * @description 原始链接 */
    m(this, ce, "");
    /** * @description 混淆链接 */
    m(this, Ne, "");
    /** * @description vps原始配置 */
    m(this, M, {});
    /** * @description 混淆配置 */
    m(this, R, {});
    /** * @description 原始备注 */
    m(this, z, "");
    /** * @description 混淆备注 */
    m(this, ae, "");
    A(this, ae, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig();
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    const [r, o] = i.match(/vmess:\/\/(.*)/) || [];
    A(this, ce, i), A(this, M, JSON.parse(an(o))), A(this, z, c(this, M).ps ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    c(this, M).ps = i, A(this, z, i), A(this, ce, `vmess://${Tn(JSON.stringify(c(this, M)))}`), this.setConfuseConfig();
  }
  /**
   * @description 设置混淆配置
   */
  setConfuseConfig() {
    A(this, R, structuredClone(c(this, M))), c(this, R).add = this.getHostName(), c(this, R).port = this.getPort(), c(this, R).id = this.getPassword(), c(this, R).ps = k.setPs(c(this, z), c(this, ae)), A(this, Ne, `vmess://${Tn(JSON.stringify(c(this, R)))}`);
  }
  restoreClash(i, r) {
    var o, l;
    return P(this, We, li).call(this, i), i.name = r, i.server = this.originConfig.add ?? "", i.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), i.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", i;
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
    return c(this, z);
  }
  /**
   * @description 原始链接
   * @example 'vmess://...'
   */
  get originLink() {
    return c(this, ce);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, M);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return c(this, ae);
  }
  /**
   * @description 混淆链接
   * @example 'vmess://...'
   */
  get confuseLink() {
    return c(this, Ne);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, R);
  }
}
ce = new WeakMap(), Ne = new WeakMap(), M = new WeakMap(), R = new WeakMap(), z = new WeakMap(), ae = new WeakMap(), We = new WeakSet(), li = function(i) {
  i.network === "ws" && (i["ws-opts"] = {
    ...i["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...i["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
var Ie, ee;
class jo {
  constructor(n) {
    m(this, Ie, []);
    m(this, ee, /* @__PURE__ */ new Map());
    A(this, Ie, n), this.setExistVpsMap();
  }
  setExistVpsMap(n = c(this, Ie)) {
    for (const i of n) {
      const r = this.getParser(i);
      r && this.updateExistVpsMap(r);
    }
  }
  updateExistVpsMap(n) {
    const i = n.originPs, [, r] = i.split("#");
    if (!r) return;
    const [o, l] = r.split(" "), t = l ? Number.parseInt(l) >>> 0 : 0, u = c(this, ee).get(o) || 0;
    c(this, ee).set(o, Math.max(u, t + 1));
  }
  getParser(n) {
    return n.startsWith("vless://") ? new oi(n) : n.startsWith("vmess://") ? new ti(n) : n.startsWith("trojan://") ? new ri(n) : n.startsWith("ss://") ? new ii(n) : null;
  }
  updateVpsPs(n) {
    const i = this.getParser(n);
    if (!i) return null;
    const r = i.originPs, [o, l] = r.split("#");
    if (!l) return n;
    const t = c(this, ee).get(l) || 0, u = t === 0 ? r : `${o}#${l} ${t}`;
    return i.updateOriginConfig(u), c(this, ee).set(l, t + 1), i.originLink;
  }
}
Ie = new WeakMap(), ee = new WeakMap();
var Pe, Re, he, De, pe;
class Ko {
  constructor(n, i = Array.from(c(this, he))) {
    m(this, Pe, /* @__PURE__ */ new Set());
    m(this, Re, /* @__PURE__ */ new Map());
    m(this, he, /* @__PURE__ */ new Set());
    m(this, De, []);
    m(this, pe);
    A(this, De, n), A(this, pe, new jo(i));
  }
  async parse(n = c(this, De)) {
    for await (const i of n) {
      const r = c(this, pe).updateVpsPs(i);
      if (r) {
        let o = null;
        r.startsWith("vless://") ? o = new oi(r) : r.startsWith("vmess://") ? o = new ti(r) : r.startsWith("trojan://") ? o = new ri(r) : r.startsWith("ss://") && (o = new ii(r)), o && this.setStore(r, o);
      }
      if (i.startsWith("https://") || i.startsWith("http://")) {
        const o = await tn(i, { retries: 3 }).then((t) => t.data.text());
        Bo(o) === "base64" && (c(this, pe).setExistVpsMap(Array.from(c(this, he))), await this.parse(ai.base64(o)));
      }
    }
  }
  setStore(n, i) {
    c(this, Pe).add(i.confuseLink), c(this, he).add(n), c(this, Re).set(i.confusePs, i);
  }
  get urls() {
    return c(this, Pe);
  }
  get vpsMap() {
    return c(this, Re);
  }
}
Pe = new WeakMap(), Re = new WeakMap(), he = new WeakMap(), De = new WeakMap(), pe = new WeakMap();
var ge;
const le = class le {
  /**
   * @description 获取混淆链接组
   * @param {string | URL} url
   * @param {string} backend
   * @param {string} chunkCount
   * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
   */
  static async getConfuseUrl(n, i, r) {
    const { searchParams: o } = new URL(n), t = o.get("url").split(/\||\n/).filter(Boolean), u = new Ko(t);
    await u.parse(t);
    const s = Ho(Array.from(u.urls), Number(r));
    return A(le, ge, s.map((f) => {
      const h = new URL(`${i}/sub`), { searchParams: a } = new URL(n);
      return a.set("url", f), h.search = a.toString(), h.toString();
    })), u;
  }
  /**
   * @description 获取Clash混淆配置
   * @returns {Promise<Clash>} clashConfig
   */
  static async getClashConfuseConfig() {
    try {
      const n = await Promise.all(c(le, ge).map((r) => tn(r, { retries: 3 }).then((o) => o.data.text())));
      return new Mo(n).clashConfig;
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
        c(le, ge).map((r) => tn(r, { retries: 3 }).then((o) => o.data.json()))
      );
      return new Uo(n).singboxConfig;
    } catch (n) {
      throw new Error(n.message || n);
    }
  }
};
ge = new WeakMap(), m(le, ge);
let Ae = le;
var me, ui, si;
class Go {
  constructor() {
    m(this, me);
  }
  /**
   * @description 获取原始配置
   * @param {ClashType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {ClashType} originConfig
   */
  getOriginConfig(n, i) {
    try {
      return n.proxies = P(this, me, ui).call(this, n.proxies, i), n["proxy-groups"] = n["proxy-groups"].map((r) => (r.proxies && (r.proxies = P(this, me, si).call(this, r.proxies)), r)), n;
    } catch (r) {
      throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
}
me = new WeakSet(), ui = function(n, i) {
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
}, si = function(n) {
  try {
    return n.map((i) => {
      const [r] = k.getPs(i);
      return r;
    });
  } catch (i) {
    throw new Error(`Update proxies groups failed: ${i.message || i}, function trace: ${i.stack}`);
  }
};
var B, fi, ci, ln;
class $o {
  constructor() {
    m(this, B);
  }
  /**
   * @description 获取原始配置
   * @param {SingboxType} confuseConfig
   * @param {VpsMap} vpsMap
   * @returns {SingboxType} originConfig
   */
  getOriginConfig(n, i) {
    try {
      return n.outbounds = P(this, B, fi).call(this, n.outbounds, i), n;
    } catch (r) {
      throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
}
B = new WeakSet(), fi = function(n = [], i) {
  try {
    const r = [];
    for (const o of n) {
      if (P(this, B, ln).call(this, o.tag)) {
        const [l, t] = k.getPs(o.tag), u = i.get(t);
        u == null || u.restoreSingbox(o, l);
      }
      Reflect.has(o, "outbounds") && (o.outbounds = P(this, B, ci).call(this, o.outbounds)), r.push(o);
    }
    return r;
  } catch (r) {
    throw new Error(`Restore outbounds failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}, ci = function(n = []) {
  try {
    return n.map((i) => {
      if (P(this, B, ln).call(this, i)) {
        const [r] = k.getPs(i);
        return r;
      }
      return i;
    });
  } catch (i) {
    throw new Error(`Update outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}, ln = function(n) {
  return k.isConfigType(n);
};
const Wo = new Go(), qo = new $o();
class ai {
  /**
   * @description 处理base64订阅
   * @param {string} subs
   * @returns {string[]} content
   */
  static base64(n) {
    return an(n).split(`
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
function Vo(e = "") {
  return e.split(`
`).reduce((i, r) => (i.push({
    label: r,
    value: r
  }), i), []);
}
function Qo(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function Xo(e, n) {
  const i = n === "" ? [] : Vo(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(i));
}
function Jo(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const xe = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function Zo(e) {
  try {
    const { url: n, lockBackend: i, remoteConfig: r, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = Qo(t, o), t = Xo(t, r), t = Jo(t, i), new Response(t, {
      headers: new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" })
    });
  } catch (n) {
    return new Response(n.message || n);
  }
}
const nt = {
  async fetch(e, n) {
    try {
      const { pathname: i, origin: r } = new URL(e.url);
      if (i === "/sub") {
        const { vpsMap: o } = await Ae.getConfuseUrl(
          e.url,
          n.BACKEND ?? xe.BACKEND,
          n.CHUNK_COUNT ?? xe.CHUNK_COUNT
        ), l = ai.getConvertType(e.url);
        if (!l)
          return new Response("Unsupported client type", { status: 400 });
        if (["clash", "clashr"].includes(l)) {
          const t = await Ae.getClashConfuseConfig(), u = Wo.getOriginConfig(t, o);
          return new Response(Do(u, { indent: 2, lineWidth: 200 }), {
            headers: new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        if (l === "singbox") {
          const t = await Ae.getSingboxConfuseConfig(), u = qo.getOriginConfig(t, o);
          return new Response(JSON.stringify(u), {
            headers: new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        return new Response("Unsupported client type, support list: clash, clashr", { status: 400 });
      }
      return Zo({
        url: n.PAGE_URL ?? xe.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? xe.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? xe.REMOTE_CONFIG,
        origin: r
      });
    } catch (i) {
      return new Response(i.message || i);
    }
  }
};
export {
  nt as default
};
