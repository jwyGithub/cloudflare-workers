var zr = Object.defineProperty;
var er = (e) => {
  throw TypeError(e);
};
var Qr = (e, n, r) => n in e ? zr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var k = (e, n, r) => Qr(e, typeof n != "symbol" ? n + "" : n, r), Be = (e, n, r) => n.has(e) || er("Cannot " + r);
var c = (e, n, r) => (Be(e, n, "read from private field"), r ? r.call(e) : n.get(e)), v = (e, n, r) => n.has(e) ? er("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), m = (e, n, r, i) => (Be(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), rr = (e, n, r) => (Be(e, n, "access private method"), r);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function br(e) {
  return typeof e > "u" || e === null;
}
function Jr(e) {
  return typeof e == "object" && e !== null;
}
function Xr(e) {
  return Array.isArray(e) ? e : br(e) ? [] : [e];
}
function Zr(e, n) {
  var r, i, t, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      t = l[r], e[t] = n[t];
  return e;
}
function en(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function rn(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var nn = br, tn = Jr, on = Xr, ln = en, sn = rn, an = Zr, w = {
  isNothing: nn,
  isObject: tn,
  toArray: on,
  repeat: ln,
  isNegativeZero: sn,
  extend: an
};
function vr(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function xe(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = vr(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
xe.prototype = Object.create(Error.prototype);
xe.prototype.constructor = xe;
xe.prototype.toString = function(n) {
  return this.name + ": " + vr(this, n);
};
var E = xe;
function He(e, n, r, i, t) {
  var l = "", o = "", s = Math.floor(t / 2) - 1;
  return i - n > s && (l = " ... ", n = i - s + l.length), r - i > s && (o = " ...", r = i + s - o.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + o,
    pos: i - n + l.length
    // relative position
  };
}
function je(e, n) {
  return w.repeat(" ", n - e.length) + e;
}
function un(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], t = [], l, o = -1; l = r.exec(e.buffer); )
    t.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && o < 0 && (o = i.length - 2);
  o < 0 && (o = i.length - 1);
  var s = "", a, u, p = Math.min(e.line + n.linesAfter, t.length).toString().length, f = n.maxLength - (n.indent + p + 3);
  for (a = 1; a <= n.linesBefore && !(o - a < 0); a++)
    u = He(
      e.buffer,
      i[o - a],
      t[o - a],
      e.position - (i[o] - i[o - a]),
      f
    ), s = w.repeat(" ", n.indent) + je((e.line - a + 1).toString(), p) + " | " + u.str + `
` + s;
  for (u = He(e.buffer, i[o], t[o], e.position, f), s += w.repeat(" ", n.indent) + je((e.line + 1).toString(), p) + " | " + u.str + `
`, s += w.repeat("-", n.indent + p + 3 + u.pos) + `^
`, a = 1; a <= n.linesAfter && !(o + a >= t.length); a++)
    u = He(
      e.buffer,
      i[o + a],
      t[o + a],
      e.position - (i[o] - i[o + a]),
      f
    ), s += w.repeat(" ", n.indent) + je((e.line + a + 1).toString(), p) + " | " + u.str + `
`;
  return s.replace(/\n$/, "");
}
var cn = un, fn = [
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
], pn = [
  "scalar",
  "sequence",
  "mapping"
];
function hn(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function dn(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (fn.indexOf(r) === -1)
      throw new E('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = hn(n.styleAliases || null), pn.indexOf(this.kind) === -1)
    throw new E('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var A = dn;
function nr(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var t = r.length;
    r.forEach(function(l, o) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (t = o);
    }), r[t] = i;
  }), r;
}
function gn() {
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
  function i(t) {
    t.multi ? (e.multi[t.kind].push(t), e.multi.fallback.push(t)) : e[t.kind][t.tag] = e.fallback[t.tag] = t;
  }
  for (n = 0, r = arguments.length; n < r; n += 1)
    arguments[n].forEach(i);
  return e;
}
function $e(e) {
  return this.extend(e);
}
$e.prototype.extend = function(n) {
  var r = [], i = [];
  if (n instanceof A)
    i.push(n);
  else if (Array.isArray(n))
    i = i.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (r = r.concat(n.implicit)), n.explicit && (i = i.concat(n.explicit));
  else
    throw new E("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(l) {
    if (!(l instanceof A))
      throw new E("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new E("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new E("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof A))
      throw new E("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var t = Object.create($e.prototype);
  return t.implicit = (this.implicit || []).concat(r), t.explicit = (this.explicit || []).concat(i), t.compiledImplicit = nr(t, "implicit"), t.compiledExplicit = nr(t, "explicit"), t.compiledTypeMap = gn(t.compiledImplicit, t.compiledExplicit), t;
};
var mn = $e, xn = new A("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), bn = new A("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), vn = new A("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Cn = new mn({
  explicit: [
    xn,
    bn,
    vn
  ]
});
function yn(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Sn() {
  return null;
}
function wn(e) {
  return e === null;
}
var An = new A("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: yn,
  construct: Sn,
  predicate: wn,
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
function _n(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function kn(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function On(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Ln = new A("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: _n,
  construct: kn,
  predicate: On,
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
function En(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Tn(e) {
  return 48 <= e && e <= 55;
}
function Rn(e) {
  return 48 <= e && e <= 57;
}
function Fn(e) {
  if (e === null) return !1;
  var n = e.length, r = 0, i = !1, t;
  if (!n) return !1;
  if (t = e[r], (t === "-" || t === "+") && (t = e[++r]), t === "0") {
    if (r + 1 === n) return !0;
    if (t = e[++r], t === "b") {
      for (r++; r < n; r++)
        if (t = e[r], t !== "_") {
          if (t !== "0" && t !== "1") return !1;
          i = !0;
        }
      return i && t !== "_";
    }
    if (t === "x") {
      for (r++; r < n; r++)
        if (t = e[r], t !== "_") {
          if (!En(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && t !== "_";
    }
    if (t === "o") {
      for (r++; r < n; r++)
        if (t = e[r], t !== "_") {
          if (!Tn(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && t !== "_";
    }
  }
  if (t === "_") return !1;
  for (; r < n; r++)
    if (t = e[r], t !== "_") {
      if (!Rn(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || t === "_");
}
function Nn(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function In(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !w.isNegativeZero(e);
}
var Pn = new A("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Fn,
  construct: Nn,
  predicate: In,
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
}), Un = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Mn(e) {
  return !(e === null || !Un.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Dn(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var Bn = /^[-+]?[0-9]+e/;
function Hn(e, n) {
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
  return r = e.toString(10), Bn.test(r) ? r.replace("e", ".e") : r;
}
function jn(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || w.isNegativeZero(e));
}
var Yn = new A("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Mn,
  construct: Dn,
  predicate: jn,
  represent: Hn,
  defaultStyle: "lowercase"
}), $n = Cn.extend({
  implicit: [
    An,
    Ln,
    Pn,
    Yn
  ]
}), Gn = $n, Cr = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), yr = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function qn(e) {
  return e === null ? !1 : Cr.exec(e) !== null || yr.exec(e) !== null;
}
function Vn(e) {
  var n, r, i, t, l, o, s, a = 0, u = null, p, f, d;
  if (n = Cr.exec(e), n === null && (n = yr.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, t = +n[3], !n[4])
    return new Date(Date.UTC(r, i, t));
  if (l = +n[4], o = +n[5], s = +n[6], n[7]) {
    for (a = n[7].slice(0, 3); a.length < 3; )
      a += "0";
    a = +a;
  }
  return n[9] && (p = +n[10], f = +(n[11] || 0), u = (p * 60 + f) * 6e4, n[9] === "-" && (u = -u)), d = new Date(Date.UTC(r, i, t, l, o, s, a)), u && d.setTime(d.getTime() - u), d;
}
function Kn(e) {
  return e.toISOString();
}
var Wn = new A("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: qn,
  construct: Vn,
  instanceOf: Date,
  represent: Kn
});
function zn(e) {
  return e === "<<" || e === null;
}
var Qn = new A("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: zn
}), ze = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Jn(e) {
  if (e === null) return !1;
  var n, r, i = 0, t = e.length, l = ze;
  for (r = 0; r < t; r++)
    if (n = l.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function Xn(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), t = i.length, l = ze, o = 0, s = [];
  for (n = 0; n < t; n++)
    n % 4 === 0 && n && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | l.indexOf(i.charAt(n));
  return r = t % 4 * 6, r === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : r === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : r === 12 && s.push(o >> 4 & 255), new Uint8Array(s);
}
function Zn(e) {
  var n = "", r = 0, i, t, l = e.length, o = ze;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += o[r >> 18 & 63], n += o[r >> 12 & 63], n += o[r >> 6 & 63], n += o[r & 63]), r = (r << 8) + e[i];
  return t = l % 3, t === 0 ? (n += o[r >> 18 & 63], n += o[r >> 12 & 63], n += o[r >> 6 & 63], n += o[r & 63]) : t === 2 ? (n += o[r >> 10 & 63], n += o[r >> 4 & 63], n += o[r << 2 & 63], n += o[64]) : t === 1 && (n += o[r >> 2 & 63], n += o[r << 4 & 63], n += o[64], n += o[64]), n;
}
function ei(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var ri = new A("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Jn,
  construct: Xn,
  predicate: ei,
  represent: Zn
}), ni = Object.prototype.hasOwnProperty, ii = Object.prototype.toString;
function ti(e) {
  if (e === null) return !0;
  var n = [], r, i, t, l, o, s = e;
  for (r = 0, i = s.length; r < i; r += 1) {
    if (t = s[r], o = !1, ii.call(t) !== "[object Object]") return !1;
    for (l in t)
      if (ni.call(t, l))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function oi(e) {
  return e !== null ? e : [];
}
var li = new A("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: ti,
  construct: oi
}), si = Object.prototype.toString;
function ai(e) {
  if (e === null) return !0;
  var n, r, i, t, l, o = e;
  for (l = new Array(o.length), n = 0, r = o.length; n < r; n += 1) {
    if (i = o[n], si.call(i) !== "[object Object]" || (t = Object.keys(i), t.length !== 1)) return !1;
    l[n] = [t[0], i[t[0]]];
  }
  return !0;
}
function ui(e) {
  if (e === null) return [];
  var n, r, i, t, l, o = e;
  for (l = new Array(o.length), n = 0, r = o.length; n < r; n += 1)
    i = o[n], t = Object.keys(i), l[n] = [t[0], i[t[0]]];
  return l;
}
var ci = new A("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: ai,
  construct: ui
}), fi = Object.prototype.hasOwnProperty;
function pi(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (fi.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function hi(e) {
  return e !== null ? e : {};
}
var di = new A("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: pi,
  construct: hi
}), Sr = Gn.extend({
  implicit: [
    Wn,
    Qn
  ],
  explicit: [
    ri,
    li,
    ci,
    di
  ]
}), q = Object.prototype.hasOwnProperty, Re = 1, wr = 2, Ar = 3, Fe = 4, Ye = 1, gi = 2, ir = 3, mi = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, xi = /[\x85\u2028\u2029]/, bi = /[,\[\]\{\}]/, _r = /^(?:!|!!|![a-z\-]+!)$/i, kr = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function tr(e) {
  return Object.prototype.toString.call(e);
}
function M(e) {
  return e === 10 || e === 13;
}
function ie(e) {
  return e === 9 || e === 32;
}
function T(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function le(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function vi(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function Ci(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function yi(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function or(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Si(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Or = new Array(256), Lr = new Array(256);
for (var te = 0; te < 256; te++)
  Or[te] = or(te) ? 1 : 0, Lr[te] = or(te);
function wi(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || Sr, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Er(e, n) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = cn(r), new E(n, r);
}
function g(e, n) {
  throw Er(e, n);
}
function Ne(e, n) {
  e.onWarning && e.onWarning.call(null, Er(e, n));
}
var lr = {
  YAML: function(n, r, i) {
    var t, l, o;
    n.version !== null && g(n, "duplication of %YAML directive"), i.length !== 1 && g(n, "YAML directive accepts exactly one argument"), t = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), t === null && g(n, "ill-formed argument of the YAML directive"), l = parseInt(t[1], 10), o = parseInt(t[2], 10), l !== 1 && g(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = o < 2, o !== 1 && o !== 2 && Ne(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var t, l;
    i.length !== 2 && g(n, "TAG directive accepts exactly two arguments"), t = i[0], l = i[1], _r.test(t) || g(n, "ill-formed tag handle (first argument) of the TAG directive"), q.call(n.tagMap, t) && g(n, 'there is a previously declared suffix for "' + t + '" tag handle'), kr.test(l) || g(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      g(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[t] = l;
  }
};
function G(e, n, r, i) {
  var t, l, o, s;
  if (n < r) {
    if (s = e.input.slice(n, r), i)
      for (t = 0, l = s.length; t < l; t += 1)
        o = s.charCodeAt(t), o === 9 || 32 <= o && o <= 1114111 || g(e, "expected valid JSON character");
    else mi.test(s) && g(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function sr(e, n, r, i) {
  var t, l, o, s;
  for (w.isObject(r) || g(e, "cannot merge mappings; the provided source object is unacceptable"), t = Object.keys(r), o = 0, s = t.length; o < s; o += 1)
    l = t[o], q.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function se(e, n, r, i, t, l, o, s, a) {
  var u, p;
  if (Array.isArray(t))
    for (t = Array.prototype.slice.call(t), u = 0, p = t.length; u < p; u += 1)
      Array.isArray(t[u]) && g(e, "nested arrays are not supported inside keys"), typeof t == "object" && tr(t[u]) === "[object Object]" && (t[u] = "[object Object]");
  if (typeof t == "object" && tr(t) === "[object Object]" && (t = "[object Object]"), t = String(t), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (u = 0, p = l.length; u < p; u += 1)
        sr(e, n, l[u], r);
    else
      sr(e, n, l, r);
  else
    !e.json && !q.call(r, t) && q.call(n, t) && (e.line = o || e.line, e.lineStart = s || e.lineStart, e.position = a || e.position, g(e, "duplicated mapping key")), t === "__proto__" ? Object.defineProperty(n, t, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[t] = l, delete r[t];
  return n;
}
function Qe(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : g(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function S(e, n, r) {
  for (var i = 0, t = e.input.charCodeAt(e.position); t !== 0; ) {
    for (; ie(t); )
      t === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), t = e.input.charCodeAt(++e.position);
    if (n && t === 35)
      do
        t = e.input.charCodeAt(++e.position);
      while (t !== 10 && t !== 13 && t !== 0);
    if (M(t))
      for (Qe(e), t = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; t === 32; )
        e.lineIndent++, t = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && Ne(e, "deficient indentation"), i;
}
function De(e) {
  var n = e.position, r;
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || T(r)));
}
function Je(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += w.repeat(`
`, n - 1));
}
function Ai(e, n, r) {
  var i, t, l, o, s, a, u, p, f = e.kind, d = e.result, h;
  if (h = e.input.charCodeAt(e.position), T(h) || le(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (t = e.input.charCodeAt(e.position + 1), T(t) || r && le(t)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = o = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (t = e.input.charCodeAt(e.position + 1), T(t) || r && le(t))
        break;
    } else if (h === 35) {
      if (i = e.input.charCodeAt(e.position - 1), T(i))
        break;
    } else {
      if (e.position === e.lineStart && De(e) || r && le(h))
        break;
      if (M(h))
        if (a = e.line, u = e.lineStart, p = e.lineIndent, S(e, !1, -1), e.lineIndent >= n) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = a, e.lineStart = u, e.lineIndent = p;
          break;
        }
    }
    s && (G(e, l, o, !1), Je(e, e.line - a), l = o = e.position, s = !1), ie(h) || (o = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return G(e, l, o, !1), e.result ? !0 : (e.kind = f, e.result = d, !1);
}
function _i(e, n) {
  var r, i, t;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = t = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (G(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, t = e.position;
      else
        return !0;
    else M(r) ? (G(e, i, t, !0), Je(e, S(e, !1, n)), i = t = e.position) : e.position === e.lineStart && De(e) ? g(e, "unexpected end of the document within a single quoted scalar") : (e.position++, t = e.position);
  g(e, "unexpected end of the stream within a single quoted scalar");
}
function ki(e, n) {
  var r, i, t, l, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return G(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (G(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), M(s))
        S(e, !1, n);
      else if (s < 256 && Or[s])
        e.result += Lr[s], e.position++;
      else if ((o = Ci(s)) > 0) {
        for (t = o, l = 0; t > 0; t--)
          s = e.input.charCodeAt(++e.position), (o = vi(s)) >= 0 ? l = (l << 4) + o : g(e, "expected hexadecimal character");
        e.result += Si(l), e.position++;
      } else
        g(e, "unknown escape sequence");
      r = i = e.position;
    } else M(s) ? (G(e, r, i, !0), Je(e, S(e, !1, n)), r = i = e.position) : e.position === e.lineStart && De(e) ? g(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  g(e, "unexpected end of the stream within a double quoted scalar");
}
function Oi(e, n) {
  var r = !0, i, t, l, o = e.tag, s, a = e.anchor, u, p, f, d, h, x = /* @__PURE__ */ Object.create(null), b, y, L, C;
  if (C = e.input.charCodeAt(e.position), C === 91)
    p = 93, h = !1, s = [];
  else if (C === 123)
    p = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), C = e.input.charCodeAt(++e.position); C !== 0; ) {
    if (S(e, !0, n), C = e.input.charCodeAt(e.position), C === p)
      return e.position++, e.tag = o, e.anchor = a, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    r ? C === 44 && g(e, "expected the node content, but found ','") : g(e, "missed comma between flow collection entries"), y = b = L = null, f = d = !1, C === 63 && (u = e.input.charCodeAt(e.position + 1), T(u) && (f = d = !0, e.position++, S(e, !0, n))), i = e.line, t = e.lineStart, l = e.position, ge(e, n, Re, !1, !0), y = e.tag, b = e.result, S(e, !0, n), C = e.input.charCodeAt(e.position), (d || e.line === i) && C === 58 && (f = !0, C = e.input.charCodeAt(++e.position), S(e, !0, n), ge(e, n, Re, !1, !0), L = e.result), h ? se(e, s, x, y, b, L, i, t, l) : f ? s.push(se(e, null, x, y, b, L, i, t, l)) : s.push(b), S(e, !0, n), C = e.input.charCodeAt(e.position), C === 44 ? (r = !0, C = e.input.charCodeAt(++e.position)) : r = !1;
  }
  g(e, "unexpected end of the stream within a flow collection");
}
function Li(e, n) {
  var r, i, t = Ye, l = !1, o = !1, s = n, a = 0, u = !1, p, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    i = !1;
  else if (f === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      Ye === t ? t = f === 43 ? ir : gi : g(e, "repeat of a chomping mode identifier");
    else if ((p = yi(f)) >= 0)
      p === 0 ? g(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? g(e, "repeat of an indentation width identifier") : (s = n + p - 1, o = !0);
    else
      break;
  if (ie(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (ie(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!M(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Qe(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), M(f)) {
      a++;
      continue;
    }
    if (e.lineIndent < s) {
      t === ir ? e.result += w.repeat(`
`, l ? 1 + a : a) : t === Ye && l && (e.result += `
`);
      break;
    }
    for (i ? ie(f) ? (u = !0, e.result += w.repeat(`
`, l ? 1 + a : a)) : u ? (u = !1, e.result += w.repeat(`
`, a + 1)) : a === 0 ? l && (e.result += " ") : e.result += w.repeat(`
`, a) : e.result += w.repeat(`
`, l ? 1 + a : a), l = !0, o = !0, a = 0, r = e.position; !M(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    G(e, r, e.position, !1);
  }
  return !0;
}
function ar(e, n) {
  var r, i = e.tag, t = e.anchor, l = [], o, s = !1, a;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), a = e.input.charCodeAt(e.position); a !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, g(e, "tab characters must not be used in indentation")), !(a !== 45 || (o = e.input.charCodeAt(e.position + 1), !T(o)))); ) {
    if (s = !0, e.position++, S(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), a = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, ge(e, n, Ar, !1, !0), l.push(e.result), S(e, !0, -1), a = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && a !== 0)
      g(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return s ? (e.tag = i, e.anchor = t, e.kind = "sequence", e.result = l, !0) : !1;
}
function Ei(e, n, r) {
  var i, t, l, o, s, a, u = e.tag, p = e.anchor, f = {}, d = /* @__PURE__ */ Object.create(null), h = null, x = null, b = null, y = !1, L = !1, C;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), C = e.input.charCodeAt(e.position); C !== 0; ) {
    if (!y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, g(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (C === 63 || C === 58) && T(i))
      C === 63 ? (y && (se(e, f, d, h, x, null, o, s, a), h = x = b = null), L = !0, y = !0, t = !0) : y ? (y = !1, t = !0) : g(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, C = i;
    else {
      if (o = e.line, s = e.lineStart, a = e.position, !ge(e, r, wr, !1, !0))
        break;
      if (e.line === l) {
        for (C = e.input.charCodeAt(e.position); ie(C); )
          C = e.input.charCodeAt(++e.position);
        if (C === 58)
          C = e.input.charCodeAt(++e.position), T(C) || g(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && (se(e, f, d, h, x, null, o, s, a), h = x = b = null), L = !0, y = !1, t = !1, h = e.tag, x = e.result;
        else if (L)
          g(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = u, e.anchor = p, !0;
      } else if (L)
        g(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = u, e.anchor = p, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (y && (o = e.line, s = e.lineStart, a = e.position), ge(e, n, Fe, !0, t) && (y ? x = e.result : b = e.result), y || (se(e, f, d, h, x, b, o, s, a), h = x = b = null), S(e, !0, -1), C = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && C !== 0)
      g(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return y && se(e, f, d, h, x, null, o, s, a), L && (e.tag = u, e.anchor = p, e.kind = "mapping", e.result = f), L;
}
function Ti(e) {
  var n, r = !1, i = !1, t, l, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && g(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (i = !0, t = "!!", o = e.input.charCodeAt(++e.position)) : t = "!", n = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), o = e.input.charCodeAt(++e.position)) : g(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !T(o); )
      o === 33 && (i ? g(e, "tag suffix cannot contain exclamation marks") : (t = e.input.slice(n - 1, e.position + 1), _r.test(t) || g(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), o = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), bi.test(l) && g(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !kr.test(l) && g(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    g(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : q.call(e.tagMap, t) ? e.tag = e.tagMap[t] + l : t === "!" ? e.tag = "!" + l : t === "!!" ? e.tag = "tag:yaml.org,2002:" + l : g(e, 'undeclared tag handle "' + t + '"'), !0;
}
function Ri(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && g(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !T(r) && !le(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && g(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Fi(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !T(i) && !le(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && g(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), q.call(e.anchorMap, r) || g(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], S(e, !0, -1), !0;
}
function ge(e, n, r, i, t) {
  var l, o, s, a = 1, u = !1, p = !1, f, d, h, x, b, y;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = o = s = Fe === r || Ar === r, i && S(e, !0, -1) && (u = !0, e.lineIndent > n ? a = 1 : e.lineIndent === n ? a = 0 : e.lineIndent < n && (a = -1)), a === 1)
    for (; Ti(e) || Ri(e); )
      S(e, !0, -1) ? (u = !0, s = l, e.lineIndent > n ? a = 1 : e.lineIndent === n ? a = 0 : e.lineIndent < n && (a = -1)) : s = !1;
  if (s && (s = u || t), (a === 1 || Fe === r) && (Re === r || wr === r ? b = n : b = n + 1, y = e.position - e.lineStart, a === 1 ? s && (ar(e, y) || Ei(e, y, b)) || Oi(e, b) ? p = !0 : (o && Li(e, b) || _i(e, b) || ki(e, b) ? p = !0 : Fi(e) ? (p = !0, (e.tag !== null || e.anchor !== null) && g(e, "alias node should not have any properties")) : Ai(e, b, Re === r) && (p = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : a === 0 && (p = s && ar(e, y))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && g(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, d = e.implicitTypes.length; f < d; f += 1)
      if (x = e.implicitTypes[f], x.resolve(e.result)) {
        e.result = x.construct(e.result), e.tag = x.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (q.call(e.typeMap[e.kind || "fallback"], e.tag))
      x = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (x = null, h = e.typeMap.multi[e.kind || "fallback"], f = 0, d = h.length; f < d; f += 1)
        if (e.tag.slice(0, h[f].tag.length) === h[f].tag) {
          x = h[f];
          break;
        }
    x || g(e, "unknown tag !<" + e.tag + ">"), e.result !== null && x.kind !== e.kind && g(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + x.kind + '", not "' + e.kind + '"'), x.resolve(e.result, e.tag) ? (e.result = x.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : g(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || p;
}
function Ni(e) {
  var n = e.position, r, i, t, l = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (S(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (l = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !T(o); )
      o = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), t = [], i.length < 1 && g(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; ie(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !M(o));
        break;
      }
      if (M(o)) break;
      for (r = e.position; o !== 0 && !T(o); )
        o = e.input.charCodeAt(++e.position);
      t.push(e.input.slice(r, e.position));
    }
    o !== 0 && Qe(e), q.call(lr, i) ? lr[i](e, i, t) : Ne(e, 'unknown document directive "' + i + '"');
  }
  if (S(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, S(e, !0, -1)) : l && g(e, "directives end mark is expected"), ge(e, e.lineIndent - 1, Fe, !1, !0), S(e, !0, -1), e.checkLineBreaks && xi.test(e.input.slice(n, e.position)) && Ne(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && De(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, S(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    g(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Tr(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new wi(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, g(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Ni(r);
  return r.documents;
}
function Ii(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = Tr(e, r);
  if (typeof n != "function")
    return i;
  for (var t = 0, l = i.length; t < l; t += 1)
    n(i[t]);
}
function Pi(e, n) {
  var r = Tr(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new E("expected a single document in the stream, but found more");
  }
}
var Ui = Ii, Mi = Pi, Di = {
  loadAll: Ui,
  load: Mi
}, Rr = Object.prototype.toString, Fr = Object.prototype.hasOwnProperty, Xe = 65279, Bi = 9, be = 10, Hi = 13, ji = 32, Yi = 33, $i = 34, Ge = 35, Gi = 37, qi = 38, Vi = 39, Ki = 42, Nr = 44, Wi = 45, Ie = 58, zi = 61, Qi = 62, Ji = 63, Xi = 64, Ir = 91, Pr = 93, Zi = 96, Ur = 123, et = 124, Mr = 125, _ = {};
_[0] = "\\0";
_[7] = "\\a";
_[8] = "\\b";
_[9] = "\\t";
_[10] = "\\n";
_[11] = "\\v";
_[12] = "\\f";
_[13] = "\\r";
_[27] = "\\e";
_[34] = '\\"';
_[92] = "\\\\";
_[133] = "\\N";
_[160] = "\\_";
_[8232] = "\\L";
_[8233] = "\\P";
var rt = [
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
], nt = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function it(e, n) {
  var r, i, t, l, o, s, a;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), t = 0, l = i.length; t < l; t += 1)
    o = i[t], s = String(n[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), a = e.compiledTypeMap.fallback[o], a && Fr.call(a.styleAliases, s) && (s = a.styleAliases[s]), r[o] = s;
  return r;
}
function tt(e) {
  var n, r, i;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new E("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + w.repeat("0", i - n.length) + n;
}
var ot = 1, ve = 2;
function lt(e) {
  this.schema = e.schema || Sr, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = w.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = it(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ve : ot, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function ur(e, n) {
  for (var r = w.repeat(" ", n), i = 0, t = -1, l = "", o, s = e.length; i < s; )
    t = e.indexOf(`
`, i), t === -1 ? (o = e.slice(i), i = s) : (o = e.slice(i, t + 1), i = t + 1), o.length && o !== `
` && (l += r), l += o;
  return l;
}
function qe(e, n) {
  return `
` + w.repeat(" ", e.indent * n);
}
function st(e, n) {
  var r, i, t;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (t = e.implicitTypes[r], t.resolve(n))
      return !0;
  return !1;
}
function Pe(e) {
  return e === ji || e === Bi;
}
function Ce(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Xe || 65536 <= e && e <= 1114111;
}
function cr(e) {
  return Ce(e) && e !== Xe && e !== Hi && e !== be;
}
function fr(e, n, r) {
  var i = cr(e), t = i && !Pe(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== Nr && e !== Ir && e !== Pr && e !== Ur && e !== Mr) && e !== Ge && !(n === Ie && !t) || cr(n) && !Pe(n) && e === Ge || n === Ie && t
  );
}
function at(e) {
  return Ce(e) && e !== Xe && !Pe(e) && e !== Wi && e !== Ji && e !== Ie && e !== Nr && e !== Ir && e !== Pr && e !== Ur && e !== Mr && e !== Ge && e !== qi && e !== Ki && e !== Yi && e !== et && e !== zi && e !== Qi && e !== Vi && e !== $i && e !== Gi && e !== Xi && e !== Zi;
}
function ut(e) {
  return !Pe(e) && e !== Ie;
}
function me(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function Dr(e) {
  var n = /^\n* /;
  return n.test(e);
}
var Br = 1, Ve = 2, Hr = 3, jr = 4, oe = 5;
function ct(e, n, r, i, t, l, o, s) {
  var a, u = 0, p = null, f = !1, d = !1, h = i !== -1, x = -1, b = at(me(e, 0)) && ut(me(e, e.length - 1));
  if (n || o)
    for (a = 0; a < e.length; u >= 65536 ? a += 2 : a++) {
      if (u = me(e, a), !Ce(u))
        return oe;
      b = b && fr(u, p, s), p = u;
    }
  else {
    for (a = 0; a < e.length; u >= 65536 ? a += 2 : a++) {
      if (u = me(e, a), u === be)
        f = !0, h && (d = d || // Foldable line = too long, and not more-indented.
        a - x - 1 > i && e[x + 1] !== " ", x = a);
      else if (!Ce(u))
        return oe;
      b = b && fr(u, p, s), p = u;
    }
    d = d || h && a - x - 1 > i && e[x + 1] !== " ";
  }
  return !f && !d ? b && !o && !t(e) ? Br : l === ve ? oe : Ve : r > 9 && Dr(e) ? oe : o ? l === ve ? oe : Ve : d ? jr : Hr;
}
function ft(e, n, r, i, t) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === ve ? '""' : "''";
    if (!e.noCompatMode && (rt.indexOf(n) !== -1 || nt.test(n)))
      return e.quotingType === ve ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), s = i || e.flowLevel > -1 && r >= e.flowLevel;
    function a(u) {
      return st(e, u);
    }
    switch (ct(
      n,
      s,
      e.indent,
      o,
      a,
      e.quotingType,
      e.forceQuotes && !i,
      t
    )) {
      case Br:
        return n;
      case Ve:
        return "'" + n.replace(/'/g, "''") + "'";
      case Hr:
        return "|" + pr(n, e.indent) + hr(ur(n, l));
      case jr:
        return ">" + pr(n, e.indent) + hr(ur(pt(n, o), l));
      case oe:
        return '"' + ht(n) + '"';
      default:
        throw new E("impossible error: invalid scalar style");
    }
  }();
}
function pr(e, n) {
  var r = Dr(e) ? String(n) : "", i = e[e.length - 1] === `
`, t = i && (e[e.length - 2] === `
` || e === `
`), l = t ? "+" : i ? "" : "-";
  return r + l + `
`;
}
function hr(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function pt(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var u = e.indexOf(`
`);
    return u = u !== -1 ? u : e.length, r.lastIndex = u, dr(e.slice(0, u), n);
  }(), t = e[0] === `
` || e[0] === " ", l, o; o = r.exec(e); ) {
    var s = o[1], a = o[2];
    l = a[0] === " ", i += s + (!t && !l && a !== "" ? `
` : "") + dr(a, n), t = l;
  }
  return i;
}
function dr(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, t = 0, l, o = 0, s = 0, a = ""; i = r.exec(e); )
    s = i.index, s - t > n && (l = o > t ? o : s, a += `
` + e.slice(t, l), t = l + 1), o = s;
  return a += `
`, e.length - t > n && o > t ? a += e.slice(t, o) + `
` + e.slice(o + 1) : a += e.slice(t), a.slice(1);
}
function ht(e) {
  for (var n = "", r = 0, i, t = 0; t < e.length; r >= 65536 ? t += 2 : t++)
    r = me(e, t), i = _[r], !i && Ce(r) ? (n += e[t], r >= 65536 && (n += e[t + 1])) : n += i || tt(r);
  return n;
}
function dt(e, n, r) {
  var i = "", t = e.tag, l, o, s;
  for (l = 0, o = r.length; l < o; l += 1)
    s = r[l], e.replacer && (s = e.replacer.call(r, String(l), s)), (B(e, n, s, !1, !1) || typeof s > "u" && B(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = t, e.dump = "[" + i + "]";
}
function gr(e, n, r, i) {
  var t = "", l = e.tag, o, s, a;
  for (o = 0, s = r.length; o < s; o += 1)
    a = r[o], e.replacer && (a = e.replacer.call(r, String(o), a)), (B(e, n + 1, a, !0, !0, !1, !0) || typeof a > "u" && B(e, n + 1, null, !0, !0, !1, !0)) && ((!i || t !== "") && (t += qe(e, n)), e.dump && be === e.dump.charCodeAt(0) ? t += "-" : t += "- ", t += e.dump);
  e.tag = l, e.dump = t || "[]";
}
function gt(e, n, r) {
  var i = "", t = e.tag, l = Object.keys(r), o, s, a, u, p;
  for (o = 0, s = l.length; o < s; o += 1)
    p = "", i !== "" && (p += ", "), e.condenseFlow && (p += '"'), a = l[o], u = r[a], e.replacer && (u = e.replacer.call(r, a, u)), B(e, n, a, !1, !1) && (e.dump.length > 1024 && (p += "? "), p += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), B(e, n, u, !1, !1) && (p += e.dump, i += p));
  e.tag = t, e.dump = "{" + i + "}";
}
function mt(e, n, r, i) {
  var t = "", l = e.tag, o = Object.keys(r), s, a, u, p, f, d;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new E("sortKeys must be a boolean or a function");
  for (s = 0, a = o.length; s < a; s += 1)
    d = "", (!i || t !== "") && (d += qe(e, n)), u = o[s], p = r[u], e.replacer && (p = e.replacer.call(r, u, p)), B(e, n + 1, u, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && be === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, f && (d += qe(e, n)), B(e, n + 1, p, !0, f) && (e.dump && be === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, t += d));
  e.tag = l, e.dump = t || "{}";
}
function mr(e, n, r) {
  var i, t, l, o, s, a;
  for (t = r ? e.explicitTypes : e.implicitTypes, l = 0, o = t.length; l < o; l += 1)
    if (s = t[l], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof n == "object" && n instanceof s.instanceOf) && (!s.predicate || s.predicate(n))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(n) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (a = e.styleMap[s.tag] || s.defaultStyle, Rr.call(s.represent) === "[object Function]")
          i = s.represent(n, a);
        else if (Fr.call(s.represent, a))
          i = s.represent[a](n, a);
        else
          throw new E("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function B(e, n, r, i, t, l, o) {
  e.tag = null, e.dump = r, mr(e, r, !1) || mr(e, r, !0);
  var s = Rr.call(e.dump), a = i, u;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var p = s === "[object Object]" || s === "[object Array]", f, d;
  if (p && (f = e.duplicates.indexOf(r), d = f !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && n > 0) && (t = !1), d && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (p && d && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), s === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (mt(e, n, e.dump, t), d && (e.dump = "&ref_" + f + e.dump)) : (gt(e, n, e.dump), d && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !o && n > 0 ? gr(e, n - 1, e.dump, t) : gr(e, n, e.dump, t), d && (e.dump = "&ref_" + f + e.dump)) : (dt(e, n, e.dump), d && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && ft(e, e.dump, n, l, a);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new E("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (u = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? u = "!" + u : u.slice(0, 18) === "tag:yaml.org,2002:" ? u = "!!" + u.slice(18) : u = "!<" + u + ">", e.dump = u + " " + e.dump);
  }
  return !0;
}
function xt(e, n) {
  var r = [], i = [], t, l;
  for (Ke(e, r, i), t = 0, l = i.length; t < l; t += 1)
    n.duplicates.push(r[i[t]]);
  n.usedDuplicates = new Array(l);
}
function Ke(e, n, r) {
  var i, t, l;
  if (e !== null && typeof e == "object")
    if (t = n.indexOf(e), t !== -1)
      r.indexOf(t) === -1 && r.push(t);
    else if (n.push(e), Array.isArray(e))
      for (t = 0, l = e.length; t < l; t += 1)
        Ke(e[t], n, r);
    else
      for (i = Object.keys(e), t = 0, l = i.length; t < l; t += 1)
        Ke(e[i[t]], n, r);
}
function bt(e, n) {
  n = n || {};
  var r = new lt(n);
  r.noRefs || xt(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), B(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var vt = bt, Ct = {
  dump: vt
}, Yr = Di.load, yt = Ct.dump;
const ae = {
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: "",
  CHUNK_COUNT: "20",
  SHORT_SERVER: "https://short.looby.us.kg"
};
function St(e, n = 10) {
  const r = [];
  let i = [];
  return e.forEach((t, l) => {
    i.push(t), (l + 1) % n === 0 && (r.push(i.join("|")), i = []);
  }), i.length > 0 && r.push(i.join("|")), r;
}
const Te = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function Ze(e, n = Te) {
  const {
    retries: r = Te.retries,
    retryDelay: i = Te.retryDelay,
    retryOnStatusCodes: t = Te.retryOnStatusCodes,
    onError: l,
    ...o
  } = n;
  let s = 0;
  const a = async () => {
    s++;
    try {
      let u, p;
      e instanceof Request ? (p = e.url, u = new Request(e, o)) : (p = e.toString(), u = new Request(p, o));
      const f = await fetch(u), d = {
        status: f.status,
        statusText: f.statusText,
        headers: Object.fromEntries(f.headers.entries()),
        data: f,
        config: { url: p, ...o },
        ok: f.ok
      };
      if (t.includes(d.status) && s <= r) {
        if (l) {
          const h = l(new Error(`请求失败，状态码 ${d.status}`), s);
          h instanceof Promise && await h;
        }
        return await new Promise((h) => setTimeout(h, i)), a();
      }
      return d;
    } catch (u) {
      if (l) {
        const p = l(u, s);
        p instanceof Promise && await p;
      }
      if (s <= r)
        return await new Promise((p) => setTimeout(p, i)), a();
      throw u;
    }
  };
  return a();
}
function We(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function xr(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
class wt {
  constructor(n = []) {
    k(this, "existVps", []);
    k(this, "existVpsMap", /* @__PURE__ */ new Map());
    this.existVps = n, this.updateExist(this.existVps);
  }
  updateExist(n = []) {
    for (const r of n) {
      const i = this.getParser(r);
      i && this.setExistVpsMap(i);
    }
  }
  updateVpsPs(n) {
    const r = this.getParser(n);
    if (!r) return null;
    const i = r.originPs, [t, l] = i.split("#");
    if (!l) return n;
    const o = this.existVpsMap.get(l) || 0, s = o === 0 ? i : `${t}#${l} ${o}`;
    return r.updateOriginConfig(s), this.existVpsMap.set(l, o + 1), r.originLink;
  }
  setExistVpsMap(n) {
    const r = n.originPs, [, i] = r.split("#");
    if (!i) return;
    const [t, l] = i.split(" "), o = l ? Number.parseInt(l) >>> 0 : 0, s = this.existVpsMap.get(t) || 0;
    this.existVpsMap.set(t, Math.max(s, o + 1));
  }
  getParser(n) {
    return n.startsWith("vless://") ? new Vr(n) : n.startsWith("vmess://") ? new Kr(n) : n.startsWith("trojan://") ? new qr(n) : n.startsWith("ss://") ? new Gr(n) : n.startsWith("hysteria2://") || n.startsWith("hysteria://") || n.startsWith("hy2://") ? new $r(n) : null;
  }
}
class At extends wt {
  constructor(n = []) {
    super(n);
  }
}
var ye, Se, we, Ue;
class Ee {
  constructor() {
    v(this, ye, ["localhost", "127.0.0.1", "abc.cba.com"]);
    v(this, Se, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    v(this, we, 1024);
    v(this, Ue, 65535);
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
    return c(this, ye)[Math.floor(Math.random() * c(this, ye).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (c(this, Ue) - c(this, we) + 1) + c(this, we)).toString();
  }
  /**
   * @description 获取随机 SS协议的加密类型
   */
  getEncrtptionProtocol() {
    return c(this, Se)[Math.floor(Math.random() * c(this, Se).length)];
  }
}
ye = new WeakMap(), Se = new WeakMap(), we = new WeakMap(), Ue = new WeakMap();
var V, K;
const R = class R {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(c(R, V));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(c(R, V));
  }
  /**
   * @description 获取前缀（带缓存）
   * @param {string} name
   * @returns {string|null} prefix
   */
  static getPrefix(n) {
    if (!(n != null && n.includes(c(R, V)))) return null;
    if (c(R, K).has(n))
      return c(R, K).get(n);
    const [r] = R.getPs(n);
    if (r) {
      const i = r.trim();
      return c(R, K).set(n, i), i;
    }
    return null;
  }
  static isConfigType(n) {
    return n.includes(c(this, V));
  }
  // 清除缓存
  static clearCache() {
    c(this, K).clear();
  }
};
V = new WeakMap(), K = new WeakMap(), v(R, V, "^LINK_TO^"), v(R, K, /* @__PURE__ */ new Map());
let O = R;
var W, Ae, H, F, z, ue;
class $r extends Ee {
  constructor(r) {
    super();
    /** * @description 原始链接 */
    v(this, W, "");
    /** * @description 混淆链接 */
    v(this, Ae, "");
    /** * @description vps原始配置 */
    v(this, H, {});
    /** * @description 混淆配置 */
    v(this, F, {});
    /** * @description 原始备注 */
    v(this, z, "");
    /** * @description 混淆备注 */
    v(this, ue, "");
    m(this, ue, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig(r);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    m(this, W, r), m(this, H, new URL(r)), m(this, z, c(this, H).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(r) {
    c(this, H).hash = r, m(this, z, r), m(this, W, c(this, H).href), this.setConfuseConfig(c(this, W));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(r) {
    m(this, F, new URL(r)), c(this, F).username = this.getUsername(), c(this, F).host = this.getHost(), c(this, F).hostname = this.getHostName(), c(this, F).port = this.getPort(), c(this, F).hash = O.setPs(c(this, z), c(this, ue)), m(this, Ae, c(this, F).href);
  }
  restoreClash(r, i) {
    var t;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((t = this.originConfig) == null ? void 0 : t.username) ?? "", r;
  }
  restoreSingbox(r, i) {
    var t;
    return r.password = ((t = this.originConfig) == null ? void 0 : t.username) ?? "", r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, r;
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
   * @example 'trojan://...'
   */
  get originLink() {
    return c(this, W);
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
    return encodeURIComponent(c(this, ue));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return c(this, Ae);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, F);
  }
}
W = new WeakMap(), Ae = new WeakMap(), H = new WeakMap(), F = new WeakMap(), z = new WeakMap(), ue = new WeakMap();
var Q, _e, j, N, J, ce;
class Gr extends Ee {
  constructor(r) {
    super();
    /** * @description 原始链接 */
    v(this, Q, "");
    /** * @description 混淆链接 */
    v(this, _e, "");
    /** * @description vps原始配置 */
    v(this, j, {});
    /** * @description 混淆配置 */
    v(this, N, {});
    /** * @description 原始备注 */
    v(this, J, "");
    /** * @description 混淆备注 */
    v(this, ce, "");
    m(this, ce, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig(r);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    m(this, Q, r), m(this, j, new URL(r)), m(this, J, c(this, j).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(r) {
    c(this, j).hash = r, m(this, J, r), m(this, Q, c(this, j).href), this.setConfuseConfig(c(this, Q));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(r) {
    m(this, N, new URL(r)), c(this, N).username = this.getUsername(), c(this, N).host = this.getHost(), c(this, N).hostname = this.getHostName(), c(this, N).port = this.getPort(), c(this, N).hash = O.setPs(c(this, J), c(this, ce)), m(this, _e, c(this, N).href);
  }
  restoreClash(r, i) {
    var t;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((t = this.originConfig) == null ? void 0 : t.port) ?? 0), r;
  }
  restoreSingbox(r, i) {
    return r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, r;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return c(this, J);
  }
  /**
   * @description 原始链接
   * @example 'ss://...'
   */
  get originLink() {
    return c(this, Q);
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
    return c(this, ce);
  }
  /**
   * @description 混淆链接
   * @example 'ss://...'
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
Q = new WeakMap(), _e = new WeakMap(), j = new WeakMap(), N = new WeakMap(), J = new WeakMap(), ce = new WeakMap();
var X, ke, Y, I, Z, fe;
class qr extends Ee {
  constructor(r) {
    super();
    /** * @description 原始链接 */
    v(this, X, "");
    /** * @description 混淆链接 */
    v(this, ke, "");
    /** * @description vps原始配置 */
    v(this, Y, {});
    /** * @description 混淆配置 */
    v(this, I, {});
    /** * @description 原始备注 */
    v(this, Z, "");
    /** * @description 混淆备注 */
    v(this, fe, "");
    m(this, fe, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig(r);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    m(this, X, r), m(this, Y, new URL(r)), m(this, Z, c(this, Y).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(r) {
    c(this, Y).hash = r, m(this, Z, r), m(this, X, c(this, Y).href), this.setConfuseConfig(c(this, X));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(r) {
    m(this, I, new URL(r)), c(this, I).username = this.getUsername(), c(this, I).host = this.getHost(), c(this, I).hostname = this.getHostName(), c(this, I).port = this.getPort(), c(this, I).hash = O.setPs(c(this, Z), c(this, fe)), m(this, ke, c(this, I).href);
  }
  restoreClash(r, i) {
    var t;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((t = this.originConfig) == null ? void 0 : t.username) ?? "", r;
  }
  restoreSingbox(r, i) {
    var t;
    return r.password = ((t = this.originConfig) == null ? void 0 : t.username) ?? "", r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, r;
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
   * @example 'trojan://...'
   */
  get originLink() {
    return c(this, X);
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
    return encodeURIComponent(c(this, fe));
  }
  /**
   * @description 混淆链接
   * @example 'trojan://...'
   */
  get confuseLink() {
    return c(this, ke);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, I);
  }
}
X = new WeakMap(), ke = new WeakMap(), Y = new WeakMap(), I = new WeakMap(), Z = new WeakMap(), fe = new WeakMap();
var ee, Oe, $, P, re, pe;
class Vr extends Ee {
  constructor(r) {
    super();
    /** * @description 原始链接 */
    v(this, ee, "");
    /** * @description 混淆链接 */
    v(this, Oe, "");
    /** * @description vps原始配置 */
    v(this, $, {});
    /** * @description 混淆配置 */
    v(this, P, {});
    /** * @description 原始备注 */
    v(this, re, "");
    /** * @description 混淆备注 */
    v(this, pe, "");
    m(this, pe, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig(r);
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    m(this, ee, r), m(this, $, new URL(r)), m(this, re, c(this, $).hash ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(r) {
    c(this, $).hash = r, m(this, re, r), m(this, ee, c(this, $).href), this.setConfuseConfig(c(this, ee));
  }
  /**
   * @description 设置混淆配置
   * @param {string} v
   */
  setConfuseConfig(r) {
    m(this, P, new URL(r)), c(this, P).username = this.getUsername(), c(this, P).host = this.getHost(), c(this, P).hostname = this.getHostName(), c(this, P).port = this.getPort(), c(this, P).hash = O.setPs(c(this, re), c(this, pe)), m(this, Oe, c(this, P).href);
  }
  restoreClash(r, i) {
    var t;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((t = this.originConfig) == null ? void 0 : t.port) ?? 0), r.uuid = this.originConfig.username ?? "", r;
  }
  restoreSingbox(r, i) {
    var t;
    return r.tag = i, r.server = this.originConfig.hostname ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.uuid = this.originConfig.username ?? "", (t = r.tls) != null && t.server_name && (r.tls.server_name = this.originConfig.hostname ?? ""), r;
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
   * @example 'vless://...'
   */
  get originLink() {
    return c(this, ee);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, $);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return c(this, pe);
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
    return c(this, P);
  }
}
ee = new WeakMap(), Oe = new WeakMap(), $ = new WeakMap(), P = new WeakMap(), re = new WeakMap(), pe = new WeakMap();
var he, Le, D, U, ne, de, Me, Wr;
class Kr extends Ee {
  constructor(r) {
    super();
    v(this, Me);
    /** * @description 原始链接 */
    v(this, he, "");
    /** * @description 混淆链接 */
    v(this, Le, "");
    /** * @description vps原始配置 */
    v(this, D, {});
    /** * @description 混淆配置 */
    v(this, U, {});
    /** * @description 原始备注 */
    v(this, ne, "");
    /** * @description 混淆备注 */
    v(this, de, "");
    m(this, de, crypto.randomUUID()), this.setOriginConfig(r), this.setConfuseConfig();
  }
  /**
   * @description 设置原始配置
   * @param {string} v
   */
  setOriginConfig(r) {
    const [i, t] = r.match(/vmess:\/\/(.*)/) || [];
    m(this, he, r), m(this, D, JSON.parse(We(t))), m(this, ne, c(this, D).ps ?? "");
  }
  /**
   * @description 更新原始配置
   * @param {string} ps
   */
  updateOriginConfig(r) {
    c(this, D).ps = r, m(this, ne, r), m(this, he, `vmess://${xr(JSON.stringify(c(this, D)))}`), this.setConfuseConfig();
  }
  /**
   * @description 设置混淆配置
   */
  setConfuseConfig() {
    m(this, U, structuredClone(c(this, D))), c(this, U).add = this.getHostName(), c(this, U).port = this.getPort(), c(this, U).id = this.getPassword(), c(this, U).ps = O.setPs(c(this, ne), c(this, de)), m(this, Le, `vmess://${xr(JSON.stringify(c(this, U)))}`);
  }
  restoreClash(r, i) {
    var t, l;
    return rr(this, Me, Wr).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((t = this.originConfig) == null ? void 0 : t.port) ?? 0), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  restoreSingbox(r, i) {
    var t, l;
    return r.server = this.originConfig.add ?? "", r.server_port = Number(this.originConfig.port ?? 0), r.tag = i, (t = r.tls) != null && t.server_name && (r.tls.server_name = this.originConfig.add ?? ""), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return c(this, ne);
  }
  /**
   * @description 原始链接
   * @example 'vmess://...'
   */
  get originLink() {
    return c(this, he);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return c(this, D);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return c(this, de);
  }
  /**
   * @description 混淆链接
   * @example 'vmess://...'
   */
  get confuseLink() {
    return c(this, Le);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return c(this, U);
  }
}
he = new WeakMap(), Le = new WeakMap(), D = new WeakMap(), U = new WeakMap(), ne = new WeakMap(), de = new WeakMap(), Me = new WeakSet(), Wr = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
class _t extends At {
  constructor(r, i = []) {
    super(i);
    k(this, "urlSet", /* @__PURE__ */ new Set());
    k(this, "vpsStore", /* @__PURE__ */ new Map());
    k(this, "originUrls", /* @__PURE__ */ new Set());
    k(this, "vps", []);
    this.vps = r;
  }
  async parse(r = this.vps) {
    for await (const i of r) {
      const t = this.updateVpsPs(i);
      if (t) {
        let l = null;
        t.startsWith("vless://") ? l = new Vr(t) : t.startsWith("vmess://") ? l = new Kr(t) : t.startsWith("trojan://") ? l = new qr(t) : t.startsWith("ss://") ? l = new Gr(t) : this.isHysteria2(t) && (l = new $r(t)), l && this.setStore(t, l);
      }
      if (i.startsWith("https://") || i.startsWith("http://")) {
        const l = await Ze(i, { retries: 3 }).then((s) => s.data.text());
        if (this.getSubType(l) === "base64") {
          this.updateExist(Array.from(this.originUrls));
          const s = We(l);
          await this.parse(s.split(`
`).filter(Boolean));
        }
      }
    }
  }
  setStore(r, i) {
    this.urlSet.add(i.confuseLink), this.originUrls.add(r), this.vpsStore.set(i.confusePs, i);
  }
  getSubType(r) {
    try {
      return We(r), "base64";
    } catch {
      try {
        return Yr(r), "yaml";
      } catch {
        try {
          return JSON.parse(r), "json";
        } catch {
          return "unknown";
        }
      }
    }
  }
  isHysteria2(r) {
    return r.startsWith("hysteria2://") || r.startsWith("hysteria://") || r.startsWith("hy2://");
  }
  get urls() {
    return Array.from(this.urlSet);
  }
  get vpsMap() {
    return this.vpsStore;
  }
}
let kt = class {
  async getConfig(n) {
    try {
      const r = await Promise.all(n.map((i) => Ze(i, { retries: 3 }).then((t) => t.data.text())));
      return this.setClashConfig(r);
    } catch (r) {
      throw new Error(r.message || r);
    }
  }
  setClashConfig(n) {
    const r = n.map((i) => Yr(i));
    return this.mergeClashConfig(r);
  }
  /**
   * @description 合并配置
   * @param {ClashType[]} configs
   * @returns {ClashType} mergedConfig
   */
  mergeClashConfig(n = []) {
    var u, p, f, d;
    if (!n.length)
      return {};
    const r = structuredClone(n[0]);
    if (n.length === 1)
      return r;
    const i = {
      ...r,
      proxies: r.proxies || [],
      "proxy-groups": r["proxy-groups"] || []
    }, t = n.reduce((h, x) => {
      var b;
      return h + (((b = x.proxies) == null ? void 0 : b.length) || 0);
    }, 0), l = new Int32Array(t), o = new Set((u = r.proxies) == null ? void 0 : u.map((h) => h.name));
    let s = ((p = r.proxies) == null ? void 0 : p.length) || 0;
    const a = new Map(i["proxy-groups"].map((h) => [h.name, h]));
    for (let h = 1; h < n.length; h++) {
      const x = n[h];
      if ((f = x.proxies) != null && f.length)
        for (const b of x.proxies)
          o.has(b.name) || (i.proxies[s] = b, l[s] = s, o.add(b.name), s++);
      if ((d = x["proxy-groups"]) != null && d.length)
        for (const b of x["proxy-groups"]) {
          const y = a.get(b.name);
          if (y) {
            const L = new Set(y.proxies);
            for (const C of b.proxies || [])
              L.add(C);
            y.proxies = Array.from(L), Object.assign(y, {
              ...b,
              proxies: y.proxies
            });
          } else
            i["proxy-groups"].push(b), a.set(b.name, b);
        }
    }
    return i.proxies = i.proxies.filter((h, x) => l[x] !== -1), i;
  }
}, Ot = class {
  async getConfig(n) {
    try {
      const r = await Promise.all(
        n.map((i) => Ze(i, { retries: 3 }).then((t) => t.data.json()))
      );
      return this.mergeConfig(r);
    } catch (r) {
      throw new Error(r.message || r);
    }
  }
  mergeConfig(n) {
    var o, s;
    if (n.length === 0)
      return {};
    const r = structuredClone(n[0]), i = [], t = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
    for (const a of n)
      if ((o = a.outbounds) != null && o.length) {
        for (const u of a.outbounds)
          if (u.outbounds) {
            const p = `${u.type}:${u.tag}`;
            if (!l.has(p)) {
              const f = new Set(u.outbounds.filter((d) => !O.isConfigType(d)));
              l.set(p, {
                base: u,
                baseOutbounds: f,
                linkOutbounds: /* @__PURE__ */ new Set()
              });
            }
            u.outbounds.forEach((f) => {
              var d;
              O.isConfigType(f) && ((d = l.get(p)) == null || d.linkOutbounds.add(f));
            });
          }
      }
    for (const a of n)
      if ((s = a.outbounds) != null && s.length) {
        for (const u of a.outbounds)
          if (!u.outbounds)
            if (O.isConfigType(u.tag))
              i.push(u);
            else {
              const p = `${u.type}:${u.tag}`;
              t.has(p) || (t.add(p), i.push(u));
            }
      }
    for (const [a, u] of l) {
      const p = { ...u.base }, f = /* @__PURE__ */ new Set([...u.baseOutbounds, ...u.linkOutbounds]);
      p.outbounds = Array.from(f), i.push(p);
    }
    return r.outbounds = i, r;
  }
};
class Lt {
  constructor(n) {
    k(this, "urls", []);
    k(this, "chunkCount", Number(ae.CHUNK_COUNT));
    k(this, "backend", ae.BACKEND);
    k(this, "parser", null);
    k(this, "clashClient", new kt());
    k(this, "singboxClient", new Ot());
    this.chunkCount = Number(n.CHUNK_COUNT ?? ae.CHUNK_COUNT), this.backend = n.BACKEND ?? ae.BACKEND, this.parser = null;
  }
  async setSubUrls(n) {
    const { searchParams: r } = new URL(n.url), t = r.get("url").split(/\||\n/).filter(Boolean);
    this.parser = new _t(t), await this.parser.parse(t);
    const l = St(Array.from(this.parser.urls), Number(this.chunkCount));
    this.urls = l.map((o) => {
      const s = new URL(`${this.backend}/sub`), { searchParams: a } = new URL(n.url);
      return a.set("url", o), s.search = a.toString(), s.toString();
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
class Et {
  constructor(n) {
    k(this, "confuseConfig");
    this.confuseConfig = n;
  }
  getOriginConfig(n) {
    try {
      return this.confuseConfig.proxies = this.restoreProxies(this.confuseConfig.proxies, n), this.confuseConfig["proxy-groups"] = this.confuseConfig["proxy-groups"].map((r) => (r.proxies && (r.proxies = this.updateProxiesGroups(r.proxies)), r)), this.confuseConfig;
    } catch (r) {
      throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
  restoreProxies(n, r) {
    try {
      const i = [];
      for (const t of n) {
        const [l, o] = O.getPs(t.name);
        if (r.has(o)) {
          const s = r.get(o);
          s == null || s.restoreClash(t, l), i.push(t);
        }
      }
      return i;
    } catch (i) {
      throw new Error(`Restore proxies failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
  updateProxiesGroups(n) {
    try {
      return n.map((r) => {
        const [i] = O.getPs(r);
        return i;
      });
    } catch (r) {
      throw new Error(`Update proxies groups failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
}
class Tt {
  constructor(n) {
    k(this, "confuseConfig");
    this.confuseConfig = n;
  }
  getOriginConfig(n) {
    try {
      return this.confuseConfig.outbounds = this.restoreOutbounds(this.confuseConfig.outbounds, n), this.confuseConfig;
    } catch (r) {
      throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
  restoreOutbounds(n = [], r) {
    try {
      const i = [];
      for (const t of n) {
        if (this.isConfuseVps(t.tag)) {
          const [l, o] = O.getPs(t.tag), s = r.get(o);
          s == null || s.restoreSingbox(t, l);
        }
        Reflect.has(t, "outbounds") && (t.outbounds = this.updateOutbouns(t.outbounds)), i.push(t);
      }
      return i;
    } catch (i) {
      throw new Error(`Restore outbounds failed: ${i.message || i}, function trace: ${i.stack}`);
    }
  }
  updateOutbouns(n = []) {
    try {
      return n.map((r) => {
        if (this.isConfuseVps(r)) {
          const [i] = O.getPs(r);
          return i;
        }
        return r;
      });
    } catch (r) {
      throw new Error(`Update outbounds failed: ${r.message || r}, function trace: ${r.stack}`);
    }
  }
  isConfuseVps(n) {
    return O.isConfigType(n);
  }
}
class Rt {
  constructor(n) {
    this.confuse = n, this.confuse = n;
  }
  async getClashConfig() {
    const n = await this.confuse.getClashConfig();
    return new Et(n).getOriginConfig(this.confuse.vpsStore);
  }
  async getSingboxConfig() {
    const n = await this.confuse.getSingboxConfig();
    return new Tt(n).getOriginConfig(this.confuse.vpsStore);
  }
}
const Ft = [
  { label: "肥羊增强型后端【vless+hysteria】", value: "https://api.v1.mk" },
  { label: "肥羊备用后端【vless+hysteria】", value: "https://sub.d1.mk" },
  { label: "品云提供后端【实验性】", value: "https://v.id9.cc" },
  { label: "つつ-多地防失联【负载均衡+国内优化】", value: "https://api.tsutsu.one" },
  { label: "nameless13提供", value: "https://www.nameless13.com" },
  { label: "subconverter作者提供", value: "https://sub.xeton.dev" },
  { label: "sub-web作者提供", value: "https://api.wcc.best" },
  { label: "sub作者&lhie1提供", value: "https://api.dler.io" }
], Nt = [
  {
    label: "ACL4SSR_Online 默认版 分组比较全 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini"
  },
  {
    label: "ACL4SSR_Online_AdblockPlus 更多去广告 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini"
  },
  {
    label: "ACL4SSR_Online_NoAuto 无自动测速 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini"
  },
  {
    label: "ACL4SSR_Online_NoReject 无广告拦截规则 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini"
  },
  {
    label: "ACL4SSR_Online_Mini 精简版 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini"
  },
  {
    label: "ACL4SSR_Online_Mini_AdblockPlus.ini 精简版 更多去广告 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini"
  },
  {
    label: "ACL4SSR_Online_Mini_NoAuto.ini 精简版 不带自动测速 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_NoAuto.ini"
  },
  {
    label: "ACL4SSR_Online_Mini_Fallback.ini 精简版 带故障转移 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Fallback.ini"
  },
  {
    label: "ACL4SSR_Online_Mini_MultiMode.ini 精简版 自动测速、故障转移、负载均衡 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini"
  },
  {
    label: "ACL4SSR_Online_Full 全分组 重度用户使用 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini"
  },
  {
    label: "ACL4SSR_Online_Full_NoAuto.ini 全分组 无自动测速 重度用户使用 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini"
  },
  {
    label: "ACL4SSR_Online_Full_AdblockPlus 全分组 重度用户使用 更多去广告 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_AdblockPlus.ini"
  },
  {
    label: "ACL4SSR_Online_Full_Netflix 全分组 重度用户使用 奈飞全量 (与Github同步)",
    value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Netflix.ini"
  }
], It = [], Pt = [
  { label: "Clash", value: "clash" },
  { label: "ClashR", value: "clashr" },
  { label: "Sing-box", value: "sing-box" }
];
function Ut(e = "") {
  return e.split(`
`).filter(Boolean).reduce((r, i) => (r.unshift({
    label: i,
    value: i
  }), r), Nt);
}
function Mt(e) {
  return [{ label: e, value: e }, ...Ft];
}
function Dt(e) {
  return e.split(`
`).filter(Boolean).reduce((r, i) => (r.push({ label: i, value: i }), r), It);
}
function Bt(e, n) {
  const r = Ut(n.REMOTE_CONFIG || ae.REMOTE_CONFIG), i = Dt(n.SHORT_SERVER || ae.SHORT_SERVER), t = Mt(new URL(e.url).origin), l = `
        <!doctype html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>订阅转换</title>
                <style>
                    :root {
                        --primary: #1677ff;
                        --error: #ff4d4f;
                        --text: #000000d9;
                        --text-secondary: #00000073;
                        --border: #d9d9d9;
                        --component-bg: #ffffff;
                    }

                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        margin: 0;
                        padding: 24px;
                        background: #f5f5f5;
                    }

                    .container {
                        max-width: 80%;
                        margin: 0 auto;
                        background: var(--component-bg);
                        padding: 24px;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    }

                    .form-item {
                        margin-bottom: 24px;
                        display: flex;
                        align-items: flex-start;
                    }

                    .form-label {
                        width: 100px;
                        flex-shrink: 0;
                        text-align: right;
                        padding: 5px 12px 0 0;
                        color: var(--text);
                        font-size: 14px;
                        line-height: 1.5715;
                    }

                    .form-content {
                        flex: 1;
                        min-width: 0;
                    }

                    .form-input {
                        width: 100%;
                        padding: 4px 11px;
                        border: 1px solid var(--border);
                        border-radius: 6px;
                        transition: all 0.3s;
                        min-height: 32px;
                        box-sizing: border-box;
                    }

                    textarea.form-input {
                        min-height: 100px;
                        resize: vertical;
                    }

                    .form-input:hover {
                        border-color: var(--primary);
                    }

                    .form-input:focus {
                        border-color: var(--primary);
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                    }

                    .btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 15px;
                        font-size: 14px;
                        border-radius: 6px;
                        border: 1px solid var(--border);
                        background: var(--component-bg);
                        color: var(--text);
                        cursor: pointer;
                        transition: all 0.3s;
                        height: 32px;
                        white-space: nowrap;
                        width: 100%;
                        position: relative;
                    }

                    .btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .btn .text {
                        flex: 1;
                        text-align: center;
                    }

                    .btn .icon {
                        margin-left: 4px;
                        color: var(--text-secondary);
                    }

                    .btn .icon svg {
                        width: 14px;
                        height: 14px;
                        transition: transform 0.3s;
                    }

                    .btn .icon svg path {
                        fill: currentColor;
                    }

                    .btn.expanded .icon {
                        color: var(--primary);
                    }

                    .btn.expanded .icon svg {
                        transform: rotate(180deg);
                    }

                    .btn:hover .icon {
                        color: var(--primary);
                    }

                    .collapse-content {
                        display: none;
                        opacity: 0;
                        transition: opacity 0.3s;
                    }

                    .collapse-content.show {
                        display: block;
                        opacity: 1;
                    }

                    .options-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12px;
                        padding: 16px;
                        background: #fafafa;
                        border-radius: 6px;
                    }

                    .checkbox-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                        color: var(--text);
                        cursor: pointer;
                    }

                    .checkbox-item:has(input:checked) {
                        color: var(--primary);
                    }

                    .checkbox-item input[type='checkbox'] {
                        width: 16px;
                        height: 16px;
                        margin: 0;
                        cursor: pointer;
                        accent-color: var(--primary);
                    }

                    .checkbox-item:hover {
                        color: var(--primary);
                    }

                    .btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 15px;
                        font-size: 14px;
                        border-radius: 6px;
                        border: 1px solid var(--border);
                        background: var(--component-bg);
                        color: var(--text);
                        cursor: pointer;
                        transition: all 0.3s;
                        height: 32px;
                        white-space: nowrap;
                    }

                    .btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .select-wrapper {
                        position: relative;
                        width: 100%;
                    }

                    .select-input {
                        height: 20px;
                        padding: 4px 11px;
                        background: #fff;
                        border: 1px solid var(--border);
                        border-radius: 6px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        user-select: none;
                    }

                    .select-input:hover {
                        border-color: var(--primary);
                    }

                    .select-value {
                        color: var(--text);
                        font-size: 14px;
                    }

                    .select-arrow {
                        width: 14px;
                        height: 14px;
                        transition: transform 0.3s;
                        color: var(--text-secondary);
                    }

                    .select-wrapper.open .select-arrow {
                        transform: rotate(180deg);
                        color: var(--primary);
                    }

                    .select-options {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        margin-top: 4px;
                        background: white;
                        border-radius: 6px;
                        box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08);
                        max-height: 256px;
                        overflow-y: auto;
                        z-index: 1000;
                        display: none;
                        padding: 4px 0;
                    }

                    .select-wrapper.open .select-options {
                        display: block;
                    }

                    .select-option {
                        padding: 8px 12px;
                        cursor: pointer;
                        font-size: 14px;
                        color: var(--text);
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                    }

                    .select-option:hover {
                        background: #f5f5f5;
                        color: var(--primary);
                    }

                    .select-option.selected {
                        color: var(--primary);
                        font-weight: 500;
                        background: #e6f4ff;
                    }

                    .select-option.selected:hover {
                        background: #bae0ff;
                    }

                    .input-group {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .input-group .form-input {
                        flex: 1;
                        background-color: #fafafa;
                        color: var(--text-secondary);
                        cursor: not-allowed;
                    }

                    .input-group .form-input:disabled {
                        border-color: var(--border);
                        -webkit-text-fill-color: var(--text-secondary);
                        opacity: 1;
                    }

                    .input-group .form-input:disabled:hover {
                        border-color: var(--border);
                    }

                    .copy-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 4px;
                        padding: 4px 15px;
                        height: 32px;
                        background: white;
                        border: 1px solid var(--border);
                        border-radius: 6px;
                        color: var(--text);
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }

                    .copy-btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .copy-btn svg {
                        width: 14px;
                        height: 14px;
                    }

                    .button-group {
                        display: flex;
                        gap: 12px;
                        justify-content: center;
                        max-width: 400px;
                        margin: 0 auto;
                    }

                    .submit-btn {
                        min-width: 120px;
                        height: 32px;
                        padding: 4px 15px;
                        border-radius: 6px;
                        font-size: 14px;
                        cursor: pointer;
                        border: 1px solid var(--border);
                        background: white;
                        color: var(--text);
                        transition: all 0.3s;
                        flex: 0 1 auto;
                    }

                    .submit-btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .submit-btn.primary {
                        background: var(--primary);
                        color: white;
                        border-color: var(--primary);
                    }

                    .submit-btn.primary:hover {
                        opacity: 0.8;
                        color: white;
                    }

                    .submit-btn:disabled {
                        background: #f5f5f5;
                        border-color: var(--border);
                        color: rgba(0, 0, 0, 0.25);
                        cursor: not-allowed;
                    }

                    .submit-btn.primary:disabled {
                        background: #f5f5f5;
                        border-color: var(--border);
                        color: rgba(0, 0, 0, 0.25);
                    }

                    .submit-btn:disabled:hover {
                        background: #f5f5f5;
                        border-color: var(--border);
                        color: rgba(0, 0, 0, 0.25);
                    }
                </style>
            </head>
            <body>
                <div class="container">

                    <header>
                        <h2 style="text-align: center;">订阅转换</h2>
                    </header>
                
                    <form id="convertForm">
                        <div class="form-item">
                            <label class="form-label">订阅链接:</label>
                            <div class="form-content">
                                <textarea class="form-input" name="url" placeholder="支持各种订阅链接或单节点链接，多个链接每行一个或用 | 分隔"></textarea>
                            </div>
                        </div>
                        <!-- 生成类型 -->
                        <div class="form-item form-target"> </div>
                        <!-- 远程配置 -->
                        <div class="form-item form-config"> </div>
                        <!-- 后端地址 -->
                        <div class="form-item form-backend"> </div>

                        <div class="form-item">
                            <label class="form-label">高级功能:</label>
                            <div class="form-content">
                                <button type="button" class="btn" onclick="toggleCollapse(this)">
                                    <span class="text">点击显示/隐藏</span>
                                    <span class="icon">
                                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div class="collapse-content">
                            <div class="form-item form-short-url"> </div>
                            <div class="form-item">
                                <label class="form-label">高级选项:</label>
                                <div class="form-content">
                                    <div class="options-grid">
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="emoji" checked />
                                            <span>Emoji</span>
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="new_name" checked />
                                            <span>Clash New Field</span>
                                        </label>

                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="udp" />
                                            <span>启用 UDP</span>
                                        </label>

                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="sort"  />
                                            <span>排序节点</span>
                                        </label>

                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="tfo" />
                                            <span>启用TFO</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-item form-subscribe">
                            <label class="form-label">定制订阅:</label>
                            <div class="form-content">
                                <div class="input-group">
                                    <input type="text" 
                                           class="form-input" 
                                           value="" 
                                           disabled>
                                    <button type="button" class="copy-btn" onclick="copyToClipboard('form-subscribe')">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                        </svg>
                                        复制
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-item form-short-url">
                            <label class="form-label">订阅短链:</label>
                            <div class="form-content">
                                <div class="input-group">
                                    <input type="text" 
                                           class="form-input" 
                                           disabled>
                                    <button type="button" class="copy-btn" onclick="copyToClipboard('form-short-url')">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                        </svg>
                                        复制
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-item">
                            <label class="form-label"></label>
                            <div class="form-content">
                                <div class="button-group">
                                    <button type="button" class="submit-btn primary" id="generateBtn" disabled>生成订阅链接</button>
                                    <button type="button" class="submit-btn" id="shortUrlBtn" disabled>生成短链接</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <script>
                    function createSelect(label, key, options, rootNode) {
                        const defaultLabel = options[0]?.label || '';
                        const defaultValue = options[0]?.value || '';
                        rootNode.innerHTML = \`
                            <label class="form-label" data-key="\${key}">\${label}:</label>
                            <div class="form-content">
                                <div class="select-wrapper">
                                    <div class="select-input" onclick="toggleSelect(this)">
                                        <span class="select-value" data-value="\${defaultValue}">\${defaultLabel}</span>
                                        <span class="select-arrow">
                                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="select-options">
                                        \${options.map(option => \`<div class="select-option" data-value="\${option.value}" onclick="selectOption(this, '\${option.label}', '\${option.value}')">\${option.label}</div>\`).join('')}
                                    </div>
                                </div>
                            </div>
                        \`;
                    }

                    createSelect('生成类型', 'target', ${JSON.stringify(Pt)}, document.querySelector('.form-target'));
                    createSelect('远程配置', 'config', ${JSON.stringify(r)}, document.querySelector('.form-config'));
                    createSelect('后端地址', 'backend', ${JSON.stringify(t)}, document.querySelector('.form-backend'));
                    createSelect('短链服务', 'short_url', ${JSON.stringify(i)}, document.querySelector('.form-short-url'));

                    function toggleCollapse(btn) {
                        const content = btn.closest('.form-item').nextElementSibling;
                        btn.classList.toggle('expanded');
                        content.classList.toggle('show');
                    }

                    function toggleSelect(input) {
                        const wrapper = input.closest('.select-wrapper');
                        wrapper.classList.toggle('open');

                        // 关闭其他打开的下拉框
                        document.querySelectorAll('.select-wrapper.open').forEach(el => {
                            if (el !== wrapper) {
                                el.classList.remove('open');
                            }
                        });
                    }

                    function selectOption(option, label, value) {
                        const options = option.closest('.select-wrapper').querySelectorAll('.select-option');
                        const wrapper = option.closest('.select-wrapper');
                        const valueSpan = wrapper.querySelector('.select-value');

                        valueSpan.setAttribute('data-value', value);
                        valueSpan.textContent = label;

                        // 更新选中状态的样式
                        options.forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');
                        
                        // 关闭下拉框
                        wrapper.classList.remove('open');

                        // 如果是短链服务的选择，检查短链按钮状态
                        if (wrapper.closest('.form-short-url')) {
                            checkShortUrlButtonState();
                        }
                    }

                    // 点击外部关闭下拉框
                    document.addEventListener('click', e => {
                        if (!e.target.closest('.select-wrapper')) {
                            document.querySelectorAll('.select-wrapper').forEach(wrapper => {
                                wrapper.classList.remove('open');
                            });
                        }
                    });

                    function copyToClipboard(form) {
                        const input = document.querySelector(\`.\${form} .form-input\`);
                        input.select();
                        input.setSelectionRange(0, 99999);
                        navigator.clipboard.writeText(input.value);

                        const btn = document.querySelector(\`.\${form} .copy-btn\`);
                        btn.textContent = '已复制';
                        setTimeout(() => {
                            btn.textContent = '复制';
                        }, 1000);
                    }

                    // 监听订阅链接输入框的变化
                    document.querySelector('textarea[name="url"]').addEventListener('input', function(e) {
                        const generateBtn = document.getElementById('generateBtn');
                        const hasValue = !!e.target.value.trim();
                        generateBtn.disabled = !hasValue;
                        
                        // 检查短链按钮状态
                        checkShortUrlButtonState();
                    });

                    // 检查短链按钮是否可用
                    function checkShortUrlButtonState() {
                        const shortUrlBtn = document.getElementById('shortUrlBtn');
                        const subscribeInput = document.querySelector('.form-subscribe .form-input');
                        const shortUrlSelect = document.querySelector('.form-short-url .select-value');
                        
                        // 只有当订阅链接已生成且选择了短链服务时才可点击
                        const hasSubscribeUrl = !!subscribeInput.value.trim();
                        const hasShortUrlService = shortUrlSelect && shortUrlSelect.getAttribute('data-value') !== 'none';
                        
                        shortUrlBtn.disabled = !hasSubscribeUrl || !hasShortUrlService;
                    }

                    // 生成订阅链接
                    function generateSubscribe() {
                        // 获取表单元素
                        const form = document.getElementById('convertForm');
                        const formData = new FormData(form);
                        
                        // 获取基本表单数据
                        const data = {
                            url: formData.get('url'),
                            target: document.querySelector('.form-target .select-value').getAttribute('data-value'),
                            config: document.querySelector('.form-config .select-value').getAttribute('data-value'),
                            backend: document.querySelector('.form-backend .select-value').getAttribute('data-value'),
                        };

                        // 获取高级选项的复选框值
                        const options = [];
                        document.querySelectorAll('input[name="options"]').forEach(checkbox => {
                            options.push({
                                key: checkbox.value,
                                value: checkbox.checked
                            });
                        });
                        data.options = options;

                        // 获取短链服务
                        const shortUrlValue = document.querySelector('.form-short-url .select-value').getAttribute('data-value');
                        if (shortUrlValue && shortUrlValue !== '不使用') {
                            data.shortUrl = shortUrlValue;
                        }

                        const url = new URL(data.backend + '/sub');
                        url.searchParams.set('target', data.target);
                        url.searchParams.set('url', data.url);
                        url.searchParams.set('insert', 'false');
                        url.searchParams.set('config', data.config);
                        url.searchParams.set('list', false);
                        url.searchParams.set('scv', false);
                        url.searchParams.set('fdn', false);

                        data.options.forEach(option => {
                            url.searchParams.set(option.key, option.value);
                        });
                        
                        const subUrl = url.toString();

                        const subscribeInput = document.querySelector('.form-subscribe .form-input');
                        subscribeInput.value = subUrl;

                        // 生成订阅链接后检查短链按钮状态
                        checkShortUrlButtonState();
                    }

                    // 修改按钮添加点击事件
                    document.getElementById('generateBtn').onclick = generateSubscribe;

                    async function generateShortUrl() {
                        // 获取生成的订阅链接
                        const subscribeInput = document.querySelector('.form-subscribe .form-input');
                        const longUrl = subscribeInput.value;

                        // 获取选中的短链服务
                        const shortUrlService = document.querySelector('.form-short-url .select-value').getAttribute('data-value');

                        // 构建请求数据
                        const requestData = {
                            serve: shortUrlService,
                            long_url: longUrl
                        };

                        // 发送请求
                        const response = await fetch(\`\${shortUrlService}/api/add\`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestData)
                        })

                        if (response.ok) {
                            const data = await response.json();
                            const shortUrlInput = document.querySelector('.form-short-url .form-input');
                            shortUrlInput.value = data.data.short_url;
                        } else {
                            alert('生成短链接失败');
                        }
                    }

                    // 添加按钮点击事件
                    document.getElementById('shortUrlBtn').onclick = generateShortUrl;

                    // 监听短链服务选择变化
                    document.querySelector('.form-short-url').addEventListener('click', function(e) {
                        if (e.target.closest('.select-option')) {
                            // 当选择变化时检查短链按钮状态
                            setTimeout(checkShortUrlButtonState, 0);
                        }
                    });
                <\/script>
            </body>
        </html>
    `;
  return new Response(l, {
    headers: new Headers({
      "Content-Type": "text/html; charset=UTF-8"
    })
  });
}
const $t = {
  async fetch(e, n) {
    try {
      const { pathname: r } = new URL(e.url);
      if (r === "/sub") {
        const i = new Lt(n);
        await i.setSubUrls(e);
        const t = new URL(e.url).searchParams.get("target");
        if (!t)
          return new Response("Unsupported client type", { status: 400 });
        const l = new Rt(i);
        if (["clash", "clashr"].includes(t)) {
          const o = await l.getClashConfig();
          return new Response(yt(o, { indent: 2, lineWidth: 200 }), {
            headers: new Headers({
              "Content-Type": "text/yaml; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        if (t === "singbox") {
          const o = await l.getSingboxConfig();
          return new Response(JSON.stringify(o), {
            headers: new Headers({
              "Content-Type": "text/plain; charset=UTF-8",
              "Cache-Control": "no-store"
            })
          });
        }
        return new Response("Unsupported client type, support list: clash, clashr", { status: 400 });
      }
      return Bt(e, n);
    } catch (r) {
      return new Response(r.message || r);
    }
  }
};
export {
  $t as default
};
