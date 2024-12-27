var $n = Object.defineProperty;
var qe = (e) => {
  throw TypeError(e);
};
var Vn = (e, n, i) => n in e ? $n(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[n] = i;
var E = (e, n, i) => Vn(e, typeof n != "symbol" ? n + "" : n, i), Ie = (e, n, i) => n.has(e) || qe("Cannot " + i);
var a = (e, n, i) => (Ie(e, n, "read from private field"), i ? i.call(e) : n.get(e)), w = (e, n, i) => n.has(e) ? qe("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i), C = (e, n, i, r) => (Ie(e, n, "write to private field"), r ? r.call(e, i) : n.set(e, i), i), Qe = (e, n, i) => (Ie(e, n, "access private method"), i);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function pn(e) {
  return typeof e > "u" || e === null;
}
function Wn(e) {
  return typeof e == "object" && e !== null;
}
function qn(e) {
  return Array.isArray(e) ? e : pn(e) ? [] : [e];
}
function Qn(e, n) {
  var i, r, o, l;
  if (n)
    for (l = Object.keys(n), i = 0, r = l.length; i < r; i += 1)
      o = l[i], e[o] = n[o];
  return e;
}
function Xn(e, n) {
  var i = "", r;
  for (r = 0; r < n; r += 1)
    i += e;
  return i;
}
function Jn(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var Zn = pn, zn = Wn, ei = qn, ni = Xn, ii = Jn, ri = Qn, b = {
  isNothing: Zn,
  isObject: zn,
  toArray: ei,
  repeat: ni,
  isNegativeZero: ii,
  extend: ri
};
function gn(e, n) {
  var i = "", r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (i += 'in "' + e.mark.name + '" '), i += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (i += `

` + e.mark.snippet), r + " " + i) : r;
}
function he(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = gn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
he.prototype = Object.create(Error.prototype);
he.prototype.constructor = he;
he.prototype.toString = function(n) {
  return this.name + ": " + gn(this, n);
};
var T = he;
function Pe(e, n, i, r, o) {
  var l = "", t = "", s = Math.floor(o / 2) - 1;
  return r - n > s && (l = " ... ", n = r - s + l.length), i - r > s && (t = " ...", i = r + s - t.length), {
    str: l + e.slice(n, i).replace(/\t/g, "→") + t,
    pos: r - n + l.length
    // relative position
  };
}
function Re(e, n) {
  return b.repeat(" ", n - e.length) + e;
}
function oi(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], o = [], l, t = -1; l = i.exec(e.buffer); )
    o.push(l.index), r.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = r.length - 2);
  t < 0 && (t = r.length - 1);
  var s = "", u, f, h = Math.min(e.line + n.linesAfter, o.length).toString().length, c = n.maxLength - (n.indent + h + 3);
  for (u = 1; u <= n.linesBefore && !(t - u < 0); u++)
    f = Pe(
      e.buffer,
      r[t - u],
      o[t - u],
      e.position - (r[t] - r[t - u]),
      c
    ), s = b.repeat(" ", n.indent) + Re((e.line - u + 1).toString(), h) + " | " + f.str + `
` + s;
  for (f = Pe(e.buffer, r[t], o[t], e.position, c), s += b.repeat(" ", n.indent) + Re((e.line + 1).toString(), h) + " | " + f.str + `
`, s += b.repeat("-", n.indent + h + 3 + f.pos) + `^
`, u = 1; u <= n.linesAfter && !(t + u >= o.length); u++)
    f = Pe(
      e.buffer,
      r[t + u],
      o[t + u],
      e.position - (r[t] - r[t + u]),
      c
    ), s += b.repeat(" ", n.indent) + Re((e.line + u + 1).toString(), h) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var ti = oi, li = [
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
], si = [
  "scalar",
  "sequence",
  "mapping"
];
function ui(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(i) {
    e[i].forEach(function(r) {
      n[String(r)] = i;
    });
  }), n;
}
function fi(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(i) {
    if (li.indexOf(i) === -1)
      throw new T('Unknown option "' + i + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(i) {
    return i;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = ui(n.styleAliases || null), si.indexOf(this.kind) === -1)
    throw new T('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = fi;
function Xe(e, n) {
  var i = [];
  return e[n].forEach(function(r) {
    var o = i.length;
    i.forEach(function(l, t) {
      l.tag === r.tag && l.kind === r.kind && l.multi === r.multi && (o = t);
    }), i[o] = r;
  }), i;
}
function ci() {
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
function Me(e) {
  return this.extend(e);
}
Me.prototype.extend = function(n) {
  var i = [], r = [];
  if (n instanceof _)
    r.push(n);
  else if (Array.isArray(n))
    r = r.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (i = i.concat(n.implicit)), n.explicit && (r = r.concat(n.explicit));
  else
    throw new T("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(l) {
    if (!(l instanceof _))
      throw new T("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new T("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new T("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(l) {
    if (!(l instanceof _))
      throw new T("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(Me.prototype);
  return o.implicit = (this.implicit || []).concat(i), o.explicit = (this.explicit || []).concat(r), o.compiledImplicit = Xe(o, "implicit"), o.compiledExplicit = Xe(o, "explicit"), o.compiledTypeMap = ci(o.compiledImplicit, o.compiledExplicit), o;
};
var ai = Me, hi = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), pi = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), gi = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), di = new ai({
  explicit: [
    hi,
    pi,
    gi
  ]
});
function mi(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function xi() {
  return null;
}
function Ci(e) {
  return e === null;
}
var Ai = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: mi,
  construct: xi,
  predicate: Ci,
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
function wi(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function yi(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function vi(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var bi = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: wi,
  construct: yi,
  predicate: vi,
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
function _i(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Si(e) {
  return 48 <= e && e <= 55;
}
function Ei(e) {
  return 48 <= e && e <= 57;
}
function Oi(e) {
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
          if (!_i(e.charCodeAt(i))) return !1;
          r = !0;
        }
      return r && o !== "_";
    }
    if (o === "o") {
      for (i++; i < n; i++)
        if (o = e[i], o !== "_") {
          if (!Si(e.charCodeAt(i))) return !1;
          r = !0;
        }
      return r && o !== "_";
    }
  }
  if (o === "_") return !1;
  for (; i < n; i++)
    if (o = e[i], o !== "_") {
      if (!Ei(e.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || o === "_");
}
function Ti(e) {
  var n = e, i = 1, r;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), r = n[0], (r === "-" || r === "+") && (r === "-" && (i = -1), n = n.slice(1), r = n[0]), n === "0") return 0;
  if (r === "0") {
    if (n[1] === "b") return i * parseInt(n.slice(2), 2);
    if (n[1] === "x") return i * parseInt(n.slice(2), 16);
    if (n[1] === "o") return i * parseInt(n.slice(2), 8);
  }
  return i * parseInt(n, 10);
}
function ki(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !b.isNegativeZero(e);
}
var Fi = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Oi,
  construct: Ti,
  predicate: ki,
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
}), Li = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ni(e) {
  return !(e === null || !Li.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Ii(e) {
  var n, i;
  return n = e.replace(/_/g, "").toLowerCase(), i = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : i * parseFloat(n, 10);
}
var Pi = /^[-+]?[0-9]+e/;
function Ri(e, n) {
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
  return i = e.toString(10), Pi.test(i) ? i.replace("e", ".e") : i;
}
function Di(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || b.isNegativeZero(e));
}
var Mi = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ni,
  construct: Ii,
  predicate: Di,
  represent: Ri,
  defaultStyle: "lowercase"
}), Ui = di.extend({
  implicit: [
    Ai,
    bi,
    Fi,
    Mi
  ]
}), Bi = Ui, dn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), mn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Hi(e) {
  return e === null ? !1 : dn.exec(e) !== null || mn.exec(e) !== null;
}
function Yi(e) {
  var n, i, r, o, l, t, s, u = 0, f = null, h, c, g;
  if (n = dn.exec(e), n === null && (n = mn.exec(e)), n === null) throw new Error("Date resolve error");
  if (i = +n[1], r = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(i, r, o));
  if (l = +n[4], t = +n[5], s = +n[6], n[7]) {
    for (u = n[7].slice(0, 3); u.length < 3; )
      u += "0";
    u = +u;
  }
  return n[9] && (h = +n[10], c = +(n[11] || 0), f = (h * 60 + c) * 6e4, n[9] === "-" && (f = -f)), g = new Date(Date.UTC(i, r, o, l, t, s, u)), f && g.setTime(g.getTime() - f), g;
}
function ji(e) {
  return e.toISOString();
}
var Ki = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Hi,
  construct: Yi,
  instanceOf: Date,
  represent: ji
});
function Gi(e) {
  return e === "<<" || e === null;
}
var $i = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Gi
}), Ke = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Vi(e) {
  if (e === null) return !1;
  var n, i, r = 0, o = e.length, l = Ke;
  for (i = 0; i < o; i++)
    if (n = l.indexOf(e.charAt(i)), !(n > 64)) {
      if (n < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function Wi(e) {
  var n, i, r = e.replace(/[\r\n=]/g, ""), o = r.length, l = Ke, t = 0, s = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (s.push(t >> 16 & 255), s.push(t >> 8 & 255), s.push(t & 255)), t = t << 6 | l.indexOf(r.charAt(n));
  return i = o % 4 * 6, i === 0 ? (s.push(t >> 16 & 255), s.push(t >> 8 & 255), s.push(t & 255)) : i === 18 ? (s.push(t >> 10 & 255), s.push(t >> 2 & 255)) : i === 12 && s.push(t >> 4 & 255), new Uint8Array(s);
}
function qi(e) {
  var n = "", i = 0, r, o, l = e.length, t = Ke;
  for (r = 0; r < l; r++)
    r % 3 === 0 && r && (n += t[i >> 18 & 63], n += t[i >> 12 & 63], n += t[i >> 6 & 63], n += t[i & 63]), i = (i << 8) + e[r];
  return o = l % 3, o === 0 ? (n += t[i >> 18 & 63], n += t[i >> 12 & 63], n += t[i >> 6 & 63], n += t[i & 63]) : o === 2 ? (n += t[i >> 10 & 63], n += t[i >> 4 & 63], n += t[i << 2 & 63], n += t[64]) : o === 1 && (n += t[i >> 2 & 63], n += t[i << 4 & 63], n += t[64], n += t[64]), n;
}
function Qi(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Xi = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Vi,
  construct: Wi,
  predicate: Qi,
  represent: qi
}), Ji = Object.prototype.hasOwnProperty, Zi = Object.prototype.toString;
function zi(e) {
  if (e === null) return !0;
  var n = [], i, r, o, l, t, s = e;
  for (i = 0, r = s.length; i < r; i += 1) {
    if (o = s[i], t = !1, Zi.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (Ji.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function er(e) {
  return e !== null ? e : [];
}
var nr = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: zi,
  construct: er
}), ir = Object.prototype.toString;
function rr(e) {
  if (e === null) return !0;
  var n, i, r, o, l, t = e;
  for (l = new Array(t.length), n = 0, i = t.length; n < i; n += 1) {
    if (r = t[n], ir.call(r) !== "[object Object]" || (o = Object.keys(r), o.length !== 1)) return !1;
    l[n] = [o[0], r[o[0]]];
  }
  return !0;
}
function or(e) {
  if (e === null) return [];
  var n, i, r, o, l, t = e;
  for (l = new Array(t.length), n = 0, i = t.length; n < i; n += 1)
    r = t[n], o = Object.keys(r), l[n] = [o[0], r[o[0]]];
  return l;
}
var tr = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: rr,
  construct: or
}), lr = Object.prototype.hasOwnProperty;
function sr(e) {
  if (e === null) return !0;
  var n, i = e;
  for (n in i)
    if (lr.call(i, n) && i[n] !== null)
      return !1;
  return !0;
}
function ur(e) {
  return e !== null ? e : {};
}
var fr = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: sr,
  construct: ur
}), xn = Bi.extend({
  implicit: [
    Ki,
    $i
  ],
  explicit: [
    Xi,
    nr,
    tr,
    fr
  ]
}), K = Object.prototype.hasOwnProperty, _e = 1, Cn = 2, An = 3, Se = 4, De = 1, cr = 2, Je = 3, ar = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, hr = /[\x85\u2028\u2029]/, pr = /[,\[\]\{\}]/, wn = /^(?:!|!!|![a-z\-]+!)$/i, yn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Ze(e) {
  return Object.prototype.toString.call(e);
}
function D(e) {
  return e === 10 || e === 13;
}
function ee(e) {
  return e === 9 || e === 32;
}
function k(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function re(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function gr(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function dr(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function mr(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function ze(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function xr(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var vn = new Array(256), bn = new Array(256);
for (var ne = 0; ne < 256; ne++)
  vn[ne] = ze(ne) ? 1 : 0, bn[ne] = ze(ne);
function Cr(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || xn, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function _n(e, n) {
  var i = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return i.snippet = ti(i), new T(n, i);
}
function d(e, n) {
  throw _n(e, n);
}
function Ee(e, n) {
  e.onWarning && e.onWarning.call(null, _n(e, n));
}
var en = {
  YAML: function(n, i, r) {
    var o, l, t;
    n.version !== null && d(n, "duplication of %YAML directive"), r.length !== 1 && d(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), o === null && d(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && d(n, "unacceptable YAML version of the document"), n.version = r[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && Ee(n, "unsupported YAML version of the document");
  },
  TAG: function(n, i, r) {
    var o, l;
    r.length !== 2 && d(n, "TAG directive accepts exactly two arguments"), o = r[0], l = r[1], wn.test(o) || d(n, "ill-formed tag handle (first argument) of the TAG directive"), K.call(n.tagMap, o) && d(n, 'there is a previously declared suffix for "' + o + '" tag handle'), yn.test(l) || d(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      d(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[o] = l;
  }
};
function j(e, n, i, r) {
  var o, l, t, s;
  if (n < i) {
    if (s = e.input.slice(n, i), r)
      for (o = 0, l = s.length; o < l; o += 1)
        t = s.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || d(e, "expected valid JSON character");
    else ar.test(s) && d(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function nn(e, n, i, r) {
  var o, l, t, s;
  for (b.isObject(i) || d(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(i), t = 0, s = o.length; t < s; t += 1)
    l = o[t], K.call(n, l) || (n[l] = i[l], r[l] = !0);
}
function oe(e, n, i, r, o, l, t, s, u) {
  var f, h;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), f = 0, h = o.length; f < h; f += 1)
      Array.isArray(o[f]) && d(e, "nested arrays are not supported inside keys"), typeof o == "object" && Ze(o[f]) === "[object Object]" && (o[f] = "[object Object]");
  if (typeof o == "object" && Ze(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (f = 0, h = l.length; f < h; f += 1)
        nn(e, n, l[f], i);
    else
      nn(e, n, l, i);
  else
    !e.json && !K.call(i, o) && K.call(n, o) && (e.line = t || e.line, e.lineStart = s || e.lineStart, e.position = u || e.position, d(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete i[o];
  return n;
}
function Ge(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : d(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function v(e, n, i) {
  for (var r = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; ee(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (n && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (D(o))
      for (Ge(e), o = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && e.lineIndent < i && Ee(e, "deficient indentation"), r;
}
function Le(e) {
  var n = e.position, i;
  return i = e.input.charCodeAt(n), !!((i === 45 || i === 46) && i === e.input.charCodeAt(n + 1) && i === e.input.charCodeAt(n + 2) && (n += 3, i = e.input.charCodeAt(n), i === 0 || k(i)));
}
function $e(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += b.repeat(`
`, n - 1));
}
function Ar(e, n, i) {
  var r, o, l, t, s, u, f, h, c = e.kind, g = e.result, p;
  if (p = e.input.charCodeAt(e.position), k(p) || re(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (o = e.input.charCodeAt(e.position + 1), k(o) || i && re(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, s = !1; p !== 0; ) {
    if (p === 58) {
      if (o = e.input.charCodeAt(e.position + 1), k(o) || i && re(o))
        break;
    } else if (p === 35) {
      if (r = e.input.charCodeAt(e.position - 1), k(r))
        break;
    } else {
      if (e.position === e.lineStart && Le(e) || i && re(p))
        break;
      if (D(p))
        if (u = e.line, f = e.lineStart, h = e.lineIndent, v(e, !1, -1), e.lineIndent >= n) {
          s = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = t, e.line = u, e.lineStart = f, e.lineIndent = h;
          break;
        }
    }
    s && (j(e, l, t, !1), $e(e, e.line - u), l = t = e.position, s = !1), ee(p) || (t = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return j(e, l, t, !1), e.result ? !0 : (e.kind = c, e.result = g, !1);
}
function wr(e, n) {
  var i, r, o;
  if (i = e.input.charCodeAt(e.position), i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = o = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (j(e, r, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        r = e.position, e.position++, o = e.position;
      else
        return !0;
    else D(i) ? (j(e, r, o, !0), $e(e, v(e, !1, n)), r = o = e.position) : e.position === e.lineStart && Le(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
function yr(e, n) {
  var i, r, o, l, t, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = r = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return j(e, i, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (j(e, i, e.position, !0), s = e.input.charCodeAt(++e.position), D(s))
        v(e, !1, n);
      else if (s < 256 && vn[s])
        e.result += bn[s], e.position++;
      else if ((t = dr(s)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          s = e.input.charCodeAt(++e.position), (t = gr(s)) >= 0 ? l = (l << 4) + t : d(e, "expected hexadecimal character");
        e.result += xr(l), e.position++;
      } else
        d(e, "unknown escape sequence");
      i = r = e.position;
    } else D(s) ? (j(e, i, r, !0), $e(e, v(e, !1, n)), i = r = e.position) : e.position === e.lineStart && Le(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
function vr(e, n) {
  var i = !0, r, o, l, t = e.tag, s, u = e.anchor, f, h, c, g, p, m = /* @__PURE__ */ Object.create(null), x, y, O, A;
  if (A = e.input.charCodeAt(e.position), A === 91)
    h = 93, p = !1, s = [];
  else if (A === 123)
    h = 125, p = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), A = e.input.charCodeAt(++e.position); A !== 0; ) {
    if (v(e, !0, n), A = e.input.charCodeAt(e.position), A === h)
      return e.position++, e.tag = t, e.anchor = u, e.kind = p ? "mapping" : "sequence", e.result = s, !0;
    i ? A === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), y = x = O = null, c = g = !1, A === 63 && (f = e.input.charCodeAt(e.position + 1), k(f) && (c = g = !0, e.position++, v(e, !0, n))), r = e.line, o = e.lineStart, l = e.position, ce(e, n, _e, !1, !0), y = e.tag, x = e.result, v(e, !0, n), A = e.input.charCodeAt(e.position), (g || e.line === r) && A === 58 && (c = !0, A = e.input.charCodeAt(++e.position), v(e, !0, n), ce(e, n, _e, !1, !0), O = e.result), p ? oe(e, s, m, y, x, O, r, o, l) : c ? s.push(oe(e, null, m, y, x, O, r, o, l)) : s.push(x), v(e, !0, n), A = e.input.charCodeAt(e.position), A === 44 ? (i = !0, A = e.input.charCodeAt(++e.position)) : i = !1;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
function br(e, n) {
  var i, r, o = De, l = !1, t = !1, s = n, u = 0, f = !1, h, c;
  if (c = e.input.charCodeAt(e.position), c === 124)
    r = !1;
  else if (c === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      De === o ? o = c === 43 ? Je : cr : d(e, "repeat of a chomping mode identifier");
    else if ((h = mr(c)) >= 0)
      h === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? d(e, "repeat of an indentation width identifier") : (s = n + h - 1, t = !0);
    else
      break;
  if (ee(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (ee(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!D(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (Ge(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!t || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > s && (s = e.lineIndent), D(c)) {
      u++;
      continue;
    }
    if (e.lineIndent < s) {
      o === Je ? e.result += b.repeat(`
`, l ? 1 + u : u) : o === De && l && (e.result += `
`);
      break;
    }
    for (r ? ee(c) ? (f = !0, e.result += b.repeat(`
`, l ? 1 + u : u)) : f ? (f = !1, e.result += b.repeat(`
`, u + 1)) : u === 0 ? l && (e.result += " ") : e.result += b.repeat(`
`, u) : e.result += b.repeat(`
`, l ? 1 + u : u), l = !0, t = !0, u = 0, i = e.position; !D(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    j(e, i, e.position, !1);
  }
  return !0;
}
function rn(e, n) {
  var i, r = e.tag, o = e.anchor, l = [], t, s = !1, u;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), u = e.input.charCodeAt(e.position); u !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(u !== 45 || (t = e.input.charCodeAt(e.position + 1), !k(t)))); ) {
    if (s = !0, e.position++, v(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), u = e.input.charCodeAt(e.position);
      continue;
    }
    if (i = e.line, ce(e, n, An, !1, !0), l.push(e.result), v(e, !0, -1), u = e.input.charCodeAt(e.position), (e.line === i || e.lineIndent > n) && u !== 0)
      d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return s ? (e.tag = r, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function _r(e, n, i) {
  var r, o, l, t, s, u, f = e.tag, h = e.anchor, c = {}, g = /* @__PURE__ */ Object.create(null), p = null, m = null, x = null, y = !1, O = !1, A;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), A = e.input.charCodeAt(e.position); A !== 0; ) {
    if (!y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), r = e.input.charCodeAt(e.position + 1), l = e.line, (A === 63 || A === 58) && k(r))
      A === 63 ? (y && (oe(e, c, g, p, m, null, t, s, u), p = m = x = null), O = !0, y = !0, o = !0) : y ? (y = !1, o = !0) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, A = r;
    else {
      if (t = e.line, s = e.lineStart, u = e.position, !ce(e, i, Cn, !1, !0))
        break;
      if (e.line === l) {
        for (A = e.input.charCodeAt(e.position); ee(A); )
          A = e.input.charCodeAt(++e.position);
        if (A === 58)
          A = e.input.charCodeAt(++e.position), k(A) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && (oe(e, c, g, p, m, null, t, s, u), p = m = x = null), O = !0, y = !1, o = !1, p = e.tag, m = e.result;
        else if (O)
          d(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = h, !0;
      } else if (O)
        d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = h, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (y && (t = e.line, s = e.lineStart, u = e.position), ce(e, n, Se, !0, o) && (y ? m = e.result : x = e.result), y || (oe(e, c, g, p, m, x, t, s, u), p = m = x = null), v(e, !0, -1), A = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && A !== 0)
      d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return y && oe(e, c, g, p, m, null, t, s, u), O && (e.tag = f, e.anchor = h, e.kind = "mapping", e.result = c), O;
}
function Sr(e) {
  var n, i = !1, r = !1, o, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 33) return !1;
  if (e.tag !== null && d(e, "duplication of a tag property"), t = e.input.charCodeAt(++e.position), t === 60 ? (i = !0, t = e.input.charCodeAt(++e.position)) : t === 33 ? (r = !0, o = "!!", t = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, i) {
    do
      t = e.input.charCodeAt(++e.position);
    while (t !== 0 && t !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), t = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; t !== 0 && !k(t); )
      t === 33 && (r ? d(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), wn.test(o) || d(e, "named tag handle cannot contain such characters"), r = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), pr.test(l) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !yn.test(l) && d(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    d(e, "tag name is malformed: " + l);
  }
  return i ? e.tag = l : K.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : d(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Er(e) {
  var n, i;
  if (i = e.input.charCodeAt(e.position), i !== 38) return !1;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !k(i) && !re(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Or(e) {
  var n, i, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !k(r) && !re(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), i = e.input.slice(n, e.position), K.call(e.anchorMap, i) || d(e, 'unidentified alias "' + i + '"'), e.result = e.anchorMap[i], v(e, !0, -1), !0;
}
function ce(e, n, i, r, o) {
  var l, t, s, u = 1, f = !1, h = !1, c, g, p, m, x, y;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = s = Se === i || An === i, r && v(e, !0, -1) && (f = !0, e.lineIndent > n ? u = 1 : e.lineIndent === n ? u = 0 : e.lineIndent < n && (u = -1)), u === 1)
    for (; Sr(e) || Er(e); )
      v(e, !0, -1) ? (f = !0, s = l, e.lineIndent > n ? u = 1 : e.lineIndent === n ? u = 0 : e.lineIndent < n && (u = -1)) : s = !1;
  if (s && (s = f || o), (u === 1 || Se === i) && (_e === i || Cn === i ? x = n : x = n + 1, y = e.position - e.lineStart, u === 1 ? s && (rn(e, y) || _r(e, y, x)) || vr(e, x) ? h = !0 : (t && br(e, x) || wr(e, x) || yr(e, x) ? h = !0 : Or(e) ? (h = !0, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : Ar(e, x, _e === i) && (h = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : u === 0 && (h = s && rn(e, y))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), c = 0, g = e.implicitTypes.length; c < g; c += 1)
      if (m = e.implicitTypes[c], m.resolve(e.result)) {
        e.result = m.construct(e.result), e.tag = m.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (K.call(e.typeMap[e.kind || "fallback"], e.tag))
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
function Tr(e) {
  var n = e.position, i, r, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (v(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), i = e.position; t !== 0 && !k(t); )
      t = e.input.charCodeAt(++e.position);
    for (r = e.input.slice(i, e.position), o = [], r.length < 1 && d(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; ee(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !D(t));
        break;
      }
      if (D(t)) break;
      for (i = e.position; t !== 0 && !k(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(i, e.position));
    }
    t !== 0 && Ge(e), K.call(en, r) ? en[r](e, r, o) : Ee(e, 'unknown document directive "' + r + '"');
  }
  if (v(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, v(e, !0, -1)) : l && d(e, "directives end mark is expected"), ce(e, e.lineIndent - 1, Se, !1, !0), v(e, !0, -1), e.checkLineBreaks && hr.test(e.input.slice(n, e.position)) && Ee(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Le(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, v(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    d(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Sn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var i = new Cr(e, n), r = e.indexOf("\0");
  for (r !== -1 && (i.position = r, d(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    Tr(i);
  return i.documents;
}
function kr(e, n, i) {
  n !== null && typeof n == "object" && typeof i > "u" && (i = n, n = null);
  var r = Sn(e, i);
  if (typeof n != "function")
    return r;
  for (var o = 0, l = r.length; o < l; o += 1)
    n(r[o]);
}
function Fr(e, n) {
  var i = Sn(e, n);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new T("expected a single document in the stream, but found more");
  }
}
var Lr = kr, Nr = Fr, Ir = {
  loadAll: Lr,
  load: Nr
}, En = Object.prototype.toString, On = Object.prototype.hasOwnProperty, Ve = 65279, Pr = 9, pe = 10, Rr = 13, Dr = 32, Mr = 33, Ur = 34, Ue = 35, Br = 37, Hr = 38, Yr = 39, jr = 42, Tn = 44, Kr = 45, Oe = 58, Gr = 61, $r = 62, Vr = 63, Wr = 64, kn = 91, Fn = 93, qr = 96, Ln = 123, Qr = 124, Nn = 125, S = {};
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
var Xr = [
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
], Jr = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Zr(e, n) {
  var i, r, o, l, t, s, u;
  if (n === null) return {};
  for (i = {}, r = Object.keys(n), o = 0, l = r.length; o < l; o += 1)
    t = r[o], s = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), u = e.compiledTypeMap.fallback[t], u && On.call(u.styleAliases, s) && (s = u.styleAliases[s]), i[t] = s;
  return i;
}
function zr(e) {
  var n, i, r;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    i = "x", r = 2;
  else if (e <= 65535)
    i = "u", r = 4;
  else if (e <= 4294967295)
    i = "U", r = 8;
  else
    throw new T("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + i + b.repeat("0", r - n.length) + n;
}
var eo = 1, ge = 2;
function no(e) {
  this.schema = e.schema || xn, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Zr(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ge : eo, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function on(e, n) {
  for (var i = b.repeat(" ", n), r = 0, o = -1, l = "", t, s = e.length; r < s; )
    o = e.indexOf(`
`, r), o === -1 ? (t = e.slice(r), r = s) : (t = e.slice(r, o + 1), r = o + 1), t.length && t !== `
` && (l += i), l += t;
  return l;
}
function Be(e, n) {
  return `
` + b.repeat(" ", e.indent * n);
}
function io(e, n) {
  var i, r, o;
  for (i = 0, r = e.implicitTypes.length; i < r; i += 1)
    if (o = e.implicitTypes[i], o.resolve(n))
      return !0;
  return !1;
}
function Te(e) {
  return e === Dr || e === Pr;
}
function de(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ve || 65536 <= e && e <= 1114111;
}
function tn(e) {
  return de(e) && e !== Ve && e !== Rr && e !== pe;
}
function ln(e, n, i) {
  var r = tn(e), o = r && !Te(e);
  return (
    // ns-plain-safe
    (i ? (
      // c = flow-in
      r
    ) : r && e !== Tn && e !== kn && e !== Fn && e !== Ln && e !== Nn) && e !== Ue && !(n === Oe && !o) || tn(n) && !Te(n) && e === Ue || n === Oe && o
  );
}
function ro(e) {
  return de(e) && e !== Ve && !Te(e) && e !== Kr && e !== Vr && e !== Oe && e !== Tn && e !== kn && e !== Fn && e !== Ln && e !== Nn && e !== Ue && e !== Hr && e !== jr && e !== Mr && e !== Qr && e !== Gr && e !== $r && e !== Yr && e !== Ur && e !== Br && e !== Wr && e !== qr;
}
function oo(e) {
  return !Te(e) && e !== Oe;
}
function ae(e, n) {
  var i = e.charCodeAt(n), r;
  return i >= 55296 && i <= 56319 && n + 1 < e.length && (r = e.charCodeAt(n + 1), r >= 56320 && r <= 57343) ? (i - 55296) * 1024 + r - 56320 + 65536 : i;
}
function In(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Pn = 1, He = 2, Rn = 3, Dn = 4, ie = 5;
function to(e, n, i, r, o, l, t, s) {
  var u, f = 0, h = null, c = !1, g = !1, p = r !== -1, m = -1, x = ro(ae(e, 0)) && oo(ae(e, e.length - 1));
  if (n || t)
    for (u = 0; u < e.length; f >= 65536 ? u += 2 : u++) {
      if (f = ae(e, u), !de(f))
        return ie;
      x = x && ln(f, h, s), h = f;
    }
  else {
    for (u = 0; u < e.length; f >= 65536 ? u += 2 : u++) {
      if (f = ae(e, u), f === pe)
        c = !0, p && (g = g || // Foldable line = too long, and not more-indented.
        u - m - 1 > r && e[m + 1] !== " ", m = u);
      else if (!de(f))
        return ie;
      x = x && ln(f, h, s), h = f;
    }
    g = g || p && u - m - 1 > r && e[m + 1] !== " ";
  }
  return !c && !g ? x && !t && !o(e) ? Pn : l === ge ? ie : He : i > 9 && In(e) ? ie : t ? l === ge ? ie : He : g ? Dn : Rn;
}
function lo(e, n, i, r, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === ge ? '""' : "''";
    if (!e.noCompatMode && (Xr.indexOf(n) !== -1 || Jr.test(n)))
      return e.quotingType === ge ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, i), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), s = r || e.flowLevel > -1 && i >= e.flowLevel;
    function u(f) {
      return io(e, f);
    }
    switch (to(
      n,
      s,
      e.indent,
      t,
      u,
      e.quotingType,
      e.forceQuotes && !r,
      o
    )) {
      case Pn:
        return n;
      case He:
        return "'" + n.replace(/'/g, "''") + "'";
      case Rn:
        return "|" + sn(n, e.indent) + un(on(n, l));
      case Dn:
        return ">" + sn(n, e.indent) + un(on(so(n, t), l));
      case ie:
        return '"' + uo(n) + '"';
      default:
        throw new T("impossible error: invalid scalar style");
    }
  }();
}
function sn(e, n) {
  var i = In(e) ? String(n) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : r ? "" : "-";
  return i + l + `
`;
}
function un(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function so(e, n) {
  for (var i = /(\n+)([^\n]*)/g, r = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, i.lastIndex = f, fn(e.slice(0, f), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = i.exec(e); ) {
    var s = t[1], u = t[2];
    l = u[0] === " ", r += s + (!o && !l && u !== "" ? `
` : "") + fn(u, n), o = l;
  }
  return r;
}
function fn(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var i = / [^ ]/g, r, o = 0, l, t = 0, s = 0, u = ""; r = i.exec(e); )
    s = r.index, s - o > n && (l = t > o ? t : s, u += `
` + e.slice(o, l), o = l + 1), t = s;
  return u += `
`, e.length - o > n && t > o ? u += e.slice(o, t) + `
` + e.slice(t + 1) : u += e.slice(o), u.slice(1);
}
function uo(e) {
  for (var n = "", i = 0, r, o = 0; o < e.length; i >= 65536 ? o += 2 : o++)
    i = ae(e, o), r = S[i], !r && de(i) ? (n += e[o], i >= 65536 && (n += e[o + 1])) : n += r || zr(i);
  return n;
}
function fo(e, n, i) {
  var r = "", o = e.tag, l, t, s;
  for (l = 0, t = i.length; l < t; l += 1)
    s = i[l], e.replacer && (s = e.replacer.call(i, String(l), s)), (U(e, n, s, !1, !1) || typeof s > "u" && U(e, n, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = o, e.dump = "[" + r + "]";
}
function cn(e, n, i, r) {
  var o = "", l = e.tag, t, s, u;
  for (t = 0, s = i.length; t < s; t += 1)
    u = i[t], e.replacer && (u = e.replacer.call(i, String(t), u)), (U(e, n + 1, u, !0, !0, !1, !0) || typeof u > "u" && U(e, n + 1, null, !0, !0, !1, !0)) && ((!r || o !== "") && (o += Be(e, n)), e.dump && pe === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function co(e, n, i) {
  var r = "", o = e.tag, l = Object.keys(i), t, s, u, f, h;
  for (t = 0, s = l.length; t < s; t += 1)
    h = "", r !== "" && (h += ", "), e.condenseFlow && (h += '"'), u = l[t], f = i[u], e.replacer && (f = e.replacer.call(i, u, f)), U(e, n, u, !1, !1) && (e.dump.length > 1024 && (h += "? "), h += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), U(e, n, f, !1, !1) && (h += e.dump, r += h));
  e.tag = o, e.dump = "{" + r + "}";
}
function ao(e, n, i, r) {
  var o = "", l = e.tag, t = Object.keys(i), s, u, f, h, c, g;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new T("sortKeys must be a boolean or a function");
  for (s = 0, u = t.length; s < u; s += 1)
    g = "", (!r || o !== "") && (g += Be(e, n)), f = t[s], h = i[f], e.replacer && (h = e.replacer.call(i, f, h)), U(e, n + 1, f, !0, !0, !0) && (c = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, c && (e.dump && pe === e.dump.charCodeAt(0) ? g += "?" : g += "? "), g += e.dump, c && (g += Be(e, n)), U(e, n + 1, h, !0, c) && (e.dump && pe === e.dump.charCodeAt(0) ? g += ":" : g += ": ", g += e.dump, o += g));
  e.tag = l, e.dump = o || "{}";
}
function an(e, n, i) {
  var r, o, l, t, s, u;
  for (o = i ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (s = o[l], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof n == "object" && n instanceof s.instanceOf) && (!s.predicate || s.predicate(n))) {
      if (i ? s.multi && s.representName ? e.tag = s.representName(n) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (u = e.styleMap[s.tag] || s.defaultStyle, En.call(s.represent) === "[object Function]")
          r = s.represent(n, u);
        else if (On.call(s.represent, u))
          r = s.represent[u](n, u);
        else
          throw new T("!<" + s.tag + '> tag resolver accepts not "' + u + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function U(e, n, i, r, o, l, t) {
  e.tag = null, e.dump = i, an(e, i, !1) || an(e, i, !0);
  var s = En.call(e.dump), u = r, f;
  r && (r = e.flowLevel < 0 || e.flowLevel > n);
  var h = s === "[object Object]" || s === "[object Array]", c, g;
  if (h && (c = e.duplicates.indexOf(i), g = c !== -1), (e.tag !== null && e.tag !== "?" || g || e.indent !== 2 && n > 0) && (o = !1), g && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (h && g && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), s === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (ao(e, n, e.dump, o), g && (e.dump = "&ref_" + c + e.dump)) : (co(e, n, e.dump), g && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? cn(e, n - 1, e.dump, o) : cn(e, n, e.dump, o), g && (e.dump = "&ref_" + c + e.dump)) : (fo(e, n, e.dump), g && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && lo(e, e.dump, n, l, u);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new T("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function ho(e, n) {
  var i = [], r = [], o, l;
  for (Ye(e, i, r), o = 0, l = r.length; o < l; o += 1)
    n.duplicates.push(i[r[o]]);
  n.usedDuplicates = new Array(l);
}
function Ye(e, n, i) {
  var r, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      i.indexOf(o) === -1 && i.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        Ye(e[o], n, i);
    else
      for (r = Object.keys(e), o = 0, l = r.length; o < l; o += 1)
        Ye(e[r[o]], n, i);
}
function po(e, n) {
  n = n || {};
  var i = new no(n);
  i.noRefs || ho(e, i);
  var r = e;
  return i.replacer && (r = i.replacer.call({ "": r }, "", r)), U(i, 0, r, !0, !0) ? i.dump + `
` : "";
}
var go = po, mo = {
  dump: go
}, Mn = Ir.load, xo = mo.dump;
function Co(e = "") {
  return e.split(`
`).reduce((i, r) => (i.push({
    label: r,
    value: r
  }), i), []);
}
function Ao(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function wo(e, n) {
  const i = n === "" ? [] : Co(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(i));
}
function yo(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const G = {
  PAGE_URL: "https://github.08050611.xyz/https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20"
};
async function vo(e) {
  try {
    const { url: n, lockBackend: i, remoteConfig: r, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = Ao(t, o), t = wo(t, r), t = yo(t, i), new Response(t, {
      headers: new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" })
    });
  } catch (n) {
    return new Response(n.message || n);
  }
}
function bo(e, n = 10) {
  const i = [];
  let r = [];
  return e.forEach((o, l) => {
    r.push(o), (l + 1) % n === 0 && (i.push(r.join("|")), r = []);
  }), r.length > 0 && i.push(r.join("|")), i;
}
const be = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function We(e, n = be) {
  const {
    retries: i = be.retries,
    retryDelay: r = be.retryDelay,
    retryOnStatusCodes: o = be.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let s = 0;
  const u = async () => {
    s++;
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
      if (o.includes(g.status) && s <= i) {
        if (l) {
          const p = l(new Error(`请求失败，状态码 ${g.status}`), s);
          p instanceof Promise && await p;
        }
        return await new Promise((p) => setTimeout(p, r)), u();
      }
      return g;
    } catch (f) {
      if (l) {
        const h = l(f, s);
        h instanceof Promise && await h;
      }
      if (s <= i)
        return await new Promise((h) => setTimeout(h, r)), u();
      throw f;
    }
  };
  return u();
}
function je(e) {
  if (!e) return e;
  const n = atob(e), i = new Uint8Array(n.length);
  for (let r = 0; r < n.length; r++)
    i[r] = n.charCodeAt(r);
  return new TextDecoder().decode(i);
}
function hn(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let i = "";
  for (let r = 0; r < n.length; r += 1)
    i += String.fromCharCode(n[r]);
  return btoa(i);
}
class _o {
  constructor(n = []) {
    E(this, "existVps", []);
    E(this, "existVpsMap", /* @__PURE__ */ new Map());
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
    const t = this.existVpsMap.get(l) || 0, s = t === 0 ? r : `${o}#${l} ${t}`;
    return i.updateOriginConfig(s), this.existVpsMap.set(l, t + 1), i.originLink;
  }
  setExistVpsMap(n) {
    const i = n.originPs, [, r] = i.split("#");
    if (!r) return;
    const [o, l] = r.split(" "), t = l ? Number.parseInt(l) >>> 0 : 0, s = this.existVpsMap.get(o) || 0;
    this.existVpsMap.set(o, Math.max(s, t + 1));
  }
  getParser(n) {
    return n.startsWith("vless://") ? new Hn(n) : n.startsWith("vmess://") ? new Yn(n) : n.startsWith("trojan://") ? new Bn(n) : n.startsWith("ss://") ? new Un(n) : null;
  }
}
class So extends _o {
  constructor(n = []) {
    super(n);
  }
}
var me, xe, Ce, ke;
class Ne {
  constructor() {
    w(this, me, ["localhost", "127.0.0.1", "abc.cba.com"]);
    w(this, xe, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    w(this, Ce, 1024);
    w(this, ke, 65535);
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
    return a(this, me)[Math.floor(Math.random() * a(this, me).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (a(this, ke) - a(this, Ce) + 1) + a(this, Ce)).toString();
  }
  /**
   * @description 获取随机 SS协议的加密类型
   */
  getEncrtptionProtocol() {
    return a(this, xe)[Math.floor(Math.random() * a(this, xe).length)];
  }
}
me = new WeakMap(), xe = new WeakMap(), Ce = new WeakMap(), ke = new WeakMap();
var $, V;
const L = class L {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const i = n.split(a(L, $));
    return [i[0], i[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, i) {
    return [n, i].join(a(L, $));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(n) {
    if (!(n != null && n.includes(a(L, $)))) return null;
    if (a(L, V).has(n))
      return a(L, V).get(n);
    const [i] = L.getPs(n);
    if (i) {
      const r = i.trim();
      return a(L, V).set(n, r), r;
    }
    return null;
  }
  static isConfigType(n) {
    return n.includes(a(this, $));
  }
  // 清除缓存
  static clearCache() {
    a(this, V).clear();
  }
};
$ = new WeakMap(), V = new WeakMap(), w(L, $, "^LINK_TO^"), w(L, V, /* @__PURE__ */ new Map());
let F = L;
var W, Ae, B, N, q, te;
class Un extends Ne {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    w(this, W, "");
    /** * @description 混淆链接 */
    w(this, Ae, "");
    /** * @description vps原始配置 */
    w(this, B, {});
    /** * @description 混淆配置 */
    w(this, N, {});
    /** * @description 原始备注 */
    w(this, q, "");
    /** * @description 混淆备注 */
    w(this, te, "");
    C(this, te, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    C(this, W, i), C(this, B, new URL(i)), C(this, q, a(this, B).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, B).hash = i, C(this, q, i), C(this, W, a(this, B).href), this.setConfuseConfig(a(this, W));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    C(this, N, new URL(i)), a(this, N).username = this.getUsername(), a(this, N).host = this.getHost(), a(this, N).hostname = this.getHostName(), a(this, N).port = this.getPort(), a(this, N).hash = F.setPs(a(this, q), a(this, te)), C(this, Ae, a(this, N).href);
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
    return a(this, q);
  }
  /**
   * @description 原始链接
   * @example 'ss://...'
   */
  get originLink() {
    return a(this, W);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return a(this, B);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return a(this, te);
  }
  /**
   * @description 混淆链接
   * @example 'ss://...'
   */
  get confuseLink() {
    return a(this, Ae);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, N);
  }
}
W = new WeakMap(), Ae = new WeakMap(), B = new WeakMap(), N = new WeakMap(), q = new WeakMap(), te = new WeakMap();
var Q, we, H, I, X, le;
class Bn extends Ne {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    w(this, Q, "");
    /** * @description 混淆链接 */
    w(this, we, "");
    /** * @description vps原始配置 */
    w(this, H, {});
    /** * @description 混淆配置 */
    w(this, I, {});
    /** * @description 原始备注 */
    w(this, X, "");
    /** * @description 混淆备注 */
    w(this, le, "");
    C(this, le, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    C(this, Q, i), C(this, H, new URL(i)), C(this, X, a(this, H).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, H).hash = i, C(this, X, i), C(this, Q, a(this, H).href), this.setConfuseConfig(a(this, Q));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    C(this, I, new URL(i)), a(this, I).username = this.getUsername(), a(this, I).host = this.getHost(), a(this, I).hostname = this.getHostName(), a(this, I).port = this.getPort(), a(this, I).hash = F.setPs(a(this, X), a(this, le)), C(this, we, a(this, I).href);
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
    return a(this, X);
  }
  /**
   * @description 原始链接
   * @example 'trojan://...'
   */
  get originLink() {
    return a(this, Q);
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
    return encodeURIComponent(a(this, le));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return a(this, we);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, I);
  }
}
Q = new WeakMap(), we = new WeakMap(), H = new WeakMap(), I = new WeakMap(), X = new WeakMap(), le = new WeakMap();
var J, ye, Y, P, Z, se;
class Hn extends Ne {
  constructor(i) {
    super();
    /** * @description 原始链接 */
    w(this, J, "");
    /** * @description 混淆链接 */
    w(this, ye, "");
    /** * @description vps原始配置 */
    w(this, Y, {});
    /** * @description 混淆配置 */
    w(this, P, {});
    /** * @description 原始备注 */
    w(this, Z, "");
    /** * @description 混淆备注 */
    w(this, se, "");
    C(this, se, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig(i);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    C(this, J, i), C(this, Y, new URL(i)), C(this, Z, a(this, Y).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, Y).hash = i, C(this, Z, i), C(this, J, a(this, Y).href), this.setConfuseConfig(a(this, J));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(i) {
    C(this, P, new URL(i)), a(this, P).username = this.getUsername(), a(this, P).host = this.getHost(), a(this, P).hostname = this.getHostName(), a(this, P).port = this.getPort(), a(this, P).hash = F.setPs(a(this, Z), a(this, se)), C(this, ye, a(this, P).href);
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
    return a(this, Z);
  }
  /**
   * @description 原始链接
   * @example 'vless://...'
   */
  get originLink() {
    return a(this, J);
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
    return a(this, se);
  }
  /**
   * @description 混淆链接
   * @example 'vless://...'
   */
  get confuseLink() {
    return a(this, ye);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, P);
  }
}
J = new WeakMap(), ye = new WeakMap(), Y = new WeakMap(), P = new WeakMap(), Z = new WeakMap(), se = new WeakMap();
var ue, ve, M, R, z, fe, Fe, jn;
class Yn extends Ne {
  constructor(i) {
    super();
    w(this, Fe);
    /** * @description 原始链接 */
    w(this, ue, "");
    /** * @description 混淆链接 */
    w(this, ve, "");
    /** * @description vps原始配置 */
    w(this, M, {});
    /** * @description 混淆配置 */
    w(this, R, {});
    /** * @description 原始备注 */
    w(this, z, "");
    /** * @description 混淆备注 */
    w(this, fe, "");
    C(this, fe, crypto.randomUUID()), this.setOriginConfig(i), this.setConfuseConfig();
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(i) {
    const [r, o] = i.match(/vmess:\/\/(.*)/) || [];
    C(this, ue, i), C(this, M, JSON.parse(je(o))), C(this, z, a(this, M).ps ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(i) {
    a(this, M).ps = i, C(this, z, i), C(this, ue, `vmess://${hn(JSON.stringify(a(this, M)))}`), this.setConfuseConfig();
  }
  /**
   * @description 设置混淆配置
   */
  setConfuseConfig() {
    C(this, R, structuredClone(a(this, M))), a(this, R).add = this.getHostName(), a(this, R).port = this.getPort(), a(this, R).id = this.getPassword(), a(this, R).ps = F.setPs(a(this, z), a(this, fe)), C(this, ve, `vmess://${hn(JSON.stringify(a(this, R)))}`);
  }
  restoreClash(i, r) {
    var o, l;
    return Qe(this, Fe, jn).call(this, i), i.name = r, i.server = this.originConfig.add ?? "", i.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), i.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", i;
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
    return a(this, z);
  }
  /**
   * @description 原始链接
   * @example 'vmess://...'
   */
  get originLink() {
    return a(this, ue);
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
    return a(this, fe);
  }
  /**
   * @description 混淆链接
   * @example 'vmess://...'
   */
  get confuseLink() {
    return a(this, ve);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return a(this, R);
  }
}
ue = new WeakMap(), ve = new WeakMap(), M = new WeakMap(), R = new WeakMap(), z = new WeakMap(), fe = new WeakMap(), Fe = new WeakSet(), jn = function(i) {
  i.network === "ws" && (i["ws-opts"] = {
    ...i["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...i["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
class Eo extends So {
  constructor(i, r = []) {
    super(r);
    E(this, "urlSet", /* @__PURE__ */ new Set());
    E(this, "vpsStore", /* @__PURE__ */ new Map());
    E(this, "originUrls", /* @__PURE__ */ new Set());
    E(this, "vps", []);
    this.vps = i;
  }
  async parse(i = this.vps) {
    for await (const r of i) {
      const o = this.updateVpsPs(r);
      if (o) {
        let l = null;
        o.startsWith("vless://") ? l = new Hn(o) : o.startsWith("vmess://") ? l = new Yn(o) : o.startsWith("trojan://") ? l = new Bn(o) : o.startsWith("ss://") && (l = new Un(o)), l && this.setStore(o, l);
      }
      if (r.startsWith("https://") || r.startsWith("http://")) {
        const l = await We(r, { retries: 3 }).then((s) => s.data.text());
        if (this.getSubType(l) === "base64") {
          this.updateExist(Array.from(this.originUrls));
          const s = je(l);
          await this.parse(s.split(`
`).filter(Boolean));
        }
      }
    }
  }
  setStore(i, r) {
    this.urlSet.add(r.confuseLink), this.originUrls.add(i), this.vpsStore.set(r.confusePs, r);
  }
  getSubType(i) {
    try {
      return je(i), "base64";
    } catch {
      try {
        return Mn(i), "yaml";
      } catch {
        try {
          return JSON.parse(i), "json";
        } catch {
          return "unknown";
        }
      }
    }
  }
  get urls() {
    return Array.from(this.urlSet);
  }
  get vpsMap() {
    return this.vpsStore;
  }
}
let Oo = class {
  async getConfig(n) {
    try {
      const i = await Promise.all(n.map((r) => We(r, { retries: 3 }).then((o) => o.data.text())));
      return this.setClashConfig(i);
    } catch (i) {
      throw new Error(i.message || i);
    }
  }
  setClashConfig(n) {
    const i = n.map((r) => Mn(r));
    return this.mergeClashConfig(i);
  }
  /**
   * @description 合并配置
   * @param {ClashType[]} configs
   * @returns {ClashType} mergedConfig
   */
  mergeClashConfig(n = []) {
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
    let s = ((h = i.proxies) == null ? void 0 : h.length) || 0;
    const u = new Map(r["proxy-groups"].map((p) => [p.name, p]));
    for (let p = 1; p < n.length; p++) {
      const m = n[p];
      if ((c = m.proxies) != null && c.length)
        for (const x of m.proxies)
          t.has(x.name) || (r.proxies[s] = x, l[s] = s, t.add(x.name), s++);
      if ((g = m["proxy-groups"]) != null && g.length)
        for (const x of m["proxy-groups"]) {
          const y = u.get(x.name);
          if (y) {
            const O = new Set(y.proxies);
            for (const A of x.proxies || [])
              O.add(A);
            y.proxies = Array.from(O), Object.assign(y, {
              ...x,
              proxies: y.proxies
            });
          } else
            r["proxy-groups"].push(x), u.set(x.name, x);
        }
    }
    return r.proxies = r.proxies.filter((p, m) => l[m] !== -1), r;
  }
}, To = class {
  async getConfig(n) {
    try {
      const i = await Promise.all(
        n.map((r) => We(r, { retries: 3 }).then((o) => o.data.json()))
      );
      return this.mergeConfig(i);
    } catch (i) {
      throw new Error(i.message || i);
    }
  }
  mergeConfig(n) {
    var t, s;
    if (n.length === 0)
      return {};
    const i = structuredClone(n[0]), r = [], o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
    for (const u of n)
      if ((t = u.outbounds) != null && t.length) {
        for (const f of u.outbounds)
          if (f.outbounds) {
            const h = `${f.type}:${f.tag}`;
            if (!l.has(h)) {
              const c = new Set(f.outbounds.filter((g) => !F.isConfigType(g)));
              l.set(h, {
                base: f,
                baseOutbounds: c,
                linkOutbounds: /* @__PURE__ */ new Set()
              });
            }
            f.outbounds.forEach((c) => {
              var g;
              F.isConfigType(c) && ((g = l.get(h)) == null || g.linkOutbounds.add(c));
            });
          }
      }
    for (const u of n)
      if ((s = u.outbounds) != null && s.length) {
        for (const f of u.outbounds)
          if (!f.outbounds)
            if (F.isConfigType(f.tag))
              r.push(f);
            else {
              const h = `${f.type}:${f.tag}`;
              o.has(h) || (o.add(h), r.push(f));
            }
      }
    for (const [u, f] of l) {
      const h = { ...f.base }, c = /* @__PURE__ */ new Set([...f.baseOutbounds, ...f.linkOutbounds]);
      h.outbounds = Array.from(c), r.push(h);
    }
    return i.outbounds = r, i;
  }
};
class ko {
  constructor(n) {
    E(this, "urls", []);
    E(this, "chunkCount", Number(G.CHUNK_COUNT));
    E(this, "backend", G.BACKEND);
    E(this, "parser", null);
    E(this, "clashClient", new Oo());
    E(this, "singboxClient", new To());
    this.chunkCount = Number(n.CHUNK_COUNT ?? G.CHUNK_COUNT), this.backend = n.BACKEND ?? G.BACKEND, this.parser = null;
  }
  async setSubUrls(n) {
    const { searchParams: i } = new URL(n.url), o = i.get("url").split(/\||\n/).filter(Boolean);
    this.parser = new Eo(o), await this.parser.parse(o);
    const l = bo(Array.from(this.parser.urls), Number(this.chunkCount));
    this.urls = l.map((t) => {
      const s = new URL(`${this.backend}/sub`), { searchParams: u } = new URL(n.url);
      return u.set("url", t), s.search = u.toString(), s.toString();
    });
  }
  async getClashConfig() {
    return await this.clashClient.getConfig(this.urls);
  }
  async getSingboxConfig() {
    return await this.singboxClient.getConfig(this.urls);
  }
  get vpsStore() {
    var n;
    return (n = this.parser) == null ? void 0 : n.vpsMap;
  }
}
class Fo {
  constructor(n) {
    E(this, "confuseConfig");
    this.confuseConfig = n;
  }
  getOriginConfig(n) {
    try {
      return this.confuseConfig.proxies = this.restoreProxies(this.confuseConfig.proxies, n), this.confuseConfig["proxy-groups"] = this.confuseConfig["proxy-groups"].map((i) => (i.proxies && (i.proxies = this.updateProxiesGroups(i.proxies)), i)), this.confuseConfig;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
  restoreProxies(n, i) {
    try {
      const r = [];
      for (const o of n) {
        const [l, t] = F.getPs(o.name);
        if (i.has(t)) {
          const s = i.get(t);
          s == null || s.restoreClash(o, l), r.push(o);
        }
      }
      return r;
    } catch (r) {
      throw new Error(`Restore proxies failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
  updateProxiesGroups(n) {
    try {
      return n.map((i) => {
        const [r] = F.getPs(i);
        return r;
      });
    } catch (i) {
      throw new Error(`Update proxies groups failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
}
class Lo {
  constructor(n) {
    E(this, "confuseConfig");
    this.confuseConfig = n;
  }
  getOriginConfig(n) {
    try {
      return this.confuseConfig.outbounds = this.restoreOutbounds(this.confuseConfig.outbounds, n), this.confuseConfig;
    } catch (i) {
      throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
  restoreOutbounds(n = [], i) {
    try {
      const r = [];
      for (const o of n) {
        if (this.isConfuseVps(o.tag)) {
          const [l, t] = F.getPs(o.tag), s = i.get(t);
          s == null || s.restoreSingbox(o, l);
        }
        Reflect.has(o, "outbounds") && (o.outbounds = this.updateOutbouns(o.outbounds)), r.push(o);
      }
      return r;
    } catch (r) {
      throw new Error(`Restore outbounds failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
  updateOutbouns(n = []) {
    try {
      return n.map((i) => {
        if (this.isConfuseVps(i)) {
          const [r] = F.getPs(i);
          return r;
        }
        return i;
      });
    } catch (i) {
      throw new Error(`Update outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
  isConfuseVps(n) {
    return F.isConfigType(n);
  }
}
class No {
  constructor(n) {
    this.confuse = n, this.confuse = n;
  }
  async getClashConfig() {
    const n = await this.confuse.getClashConfig();
    return new Fo(n).getOriginConfig(this.confuse.vpsStore);
  }
  async getSingboxConfig() {
    const n = await this.confuse.getSingboxConfig();
    return new Lo(n).getOriginConfig(this.confuse.vpsStore);
  }
}
async function Kn(e, n) {
  var i;
  return await ((i = e.KV) == null ? void 0 : i.get(n));
}
async function Gn(e, n, i) {
  var t;
  const r = Math.random().toString(36).substring(2, 7);
  if (await Kn(e, r))
    return Gn(e, n, i);
  await ((t = e.KV) == null ? void 0 : t.put(r, n));
  const l = new URL(i.url);
  return l.pathname = `/${r}`, new Response(l.toString());
}
const Do = {
  async fetch(e, n) {
    try {
      const { pathname: i, origin: r } = new URL(e.url);
      if (i === "/sub") {
        const l = new ko(n);
        await l.setSubUrls(e);
        const t = new URL(e.url).searchParams.get("target");
        if (!t)
          return new Response("Unsupported client type", { status: 400 });
        const s = new No(l);
        if (["clash", "clashr"].includes(t)) {
          const u = await s.getClashConfig();
          return new Response(xo(u, { indent: 2, lineWidth: 200 }), {
            headers: new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        if (t === "singbox") {
          const u = await s.getSingboxConfig();
          return new Response(JSON.stringify(u), {
            headers: new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        return new Response("Unsupported client type, support list: clash, clashr", { status: 400 });
      }
      if (i === "/")
        return vo({
          url: n.PAGE_URL ?? G.PAGE_URL,
          lockBackend: n.LOCK_BACKEND ?? G.LOCK_BACKEND,
          remoteConfig: n.REMOTE_CONFIG ?? G.REMOTE_CONFIG,
          origin: r
        });
      if (i === "/set_short_url") {
        const l = new URL(e.url).searchParams.get("sub_url");
        return l ? await Gn(n, l, e) : new Response("Sub URL not found", { status: 400 });
      }
      if (!n.KV)
        return new Response("KV not found", { status: 500 });
      const o = await Kn(n, i);
      return o ? Response.redirect(o) : new Response("Short URL not found", { status: 404 });
    } catch (i) {
      return new Response(i.message || i);
    }
  }
};
export {
  Do as default
};
