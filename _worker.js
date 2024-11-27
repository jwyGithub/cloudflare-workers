var De = (e) => {
  throw TypeError(e);
};
var _e = (e, n, i) => n.has(e) || De("Cannot " + i);
var C = (e, n, i) => (_e(e, n, "read from private field"), i ? i.call(e) : n.get(e)), A = (e, n, i) => n.has(e) ? De("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i), F = (e, n, i, o) => (_e(e, n, "write to private field"), o ? o.call(e, i) : n.set(e, i), i), L = (e, n, i) => (_e(e, n, "access private method"), i);
const Dn = "internal server error", Mn = new Headers({
  "Content-type": "application/json"
}), Bn = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
new Headers({
  "Content-type": "text/html"
});
const ze = (e, n = Bn) => new Response(e, {
  status: 200,
  headers: n
}), Je = (e = Dn, n = 500, i = Mn) => Response.json(
  {
    status: n,
    message: e
  },
  {
    status: n,
    statusText: e,
    headers: i
  }
);
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function en(e) {
  return typeof e > "u" || e === null;
}
function Un(e) {
  return typeof e == "object" && e !== null;
}
function Yn(e) {
  return Array.isArray(e) ? e : en(e) ? [] : [e];
}
function Hn(e, n) {
  var i, o, r, u;
  if (n)
    for (u = Object.keys(n), i = 0, o = u.length; i < o; i += 1)
      r = u[i], e[r] = n[r];
  return e;
}
function jn(e, n) {
  var i = "", o;
  for (o = 0; o < n; o += 1)
    i += e;
  return i;
}
function Kn(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var $n = en, Gn = Un, Wn = Yn, qn = jn, Qn = Kn, Vn = Hn, w = {
  isNothing: $n,
  isObject: Gn,
  toArray: Wn,
  repeat: qn,
  isNegativeZero: Qn,
  extend: Vn
};
function nn(e, n) {
  var i = "", o = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (i += 'in "' + e.mark.name + '" '), i += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (i += `

` + e.mark.snippet), o + " " + i) : o;
}
function Q(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = nn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Q.prototype = Object.create(Error.prototype);
Q.prototype.constructor = Q;
Q.prototype.toString = function(n) {
  return this.name + ": " + nn(this, n);
};
var b = Q;
function Ee(e, n, i, o, r) {
  var u = "", l = "", t = Math.floor(r / 2) - 1;
  return o - n > t && (u = " ... ", n = o - t + u.length), i - o > t && (l = " ...", i = o + t - l.length), {
    str: u + e.slice(n, i).replace(/\t/g, "→") + l,
    pos: o - n + u.length
    // relative position
  };
}
function be(e, n) {
  return w.repeat(" ", n - e.length) + e;
}
function Xn(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, o = [0], r = [], u, l = -1; u = i.exec(e.buffer); )
    r.push(u.index), o.push(u.index + u[0].length), e.position <= u.index && l < 0 && (l = o.length - 2);
  l < 0 && (l = o.length - 1);
  var t = "", c, f, s = Math.min(e.line + n.linesAfter, r.length).toString().length, a = n.maxLength - (n.indent + s + 3);
  for (c = 1; c <= n.linesBefore && !(l - c < 0); c++)
    f = Ee(
      e.buffer,
      o[l - c],
      r[l - c],
      e.position - (o[l] - o[l - c]),
      a
    ), t = w.repeat(" ", n.indent) + be((e.line - c + 1).toString(), s) + " | " + f.str + `
` + t;
  for (f = Ee(e.buffer, o[l], r[l], e.position, a), t += w.repeat(" ", n.indent) + be((e.line + 1).toString(), s) + " | " + f.str + `
`, t += w.repeat("-", n.indent + s + 3 + f.pos) + `^
`, c = 1; c <= n.linesAfter && !(l + c >= r.length); c++)
    f = Ee(
      e.buffer,
      o[l + c],
      r[l + c],
      e.position - (o[l] - o[l + c]),
      a
    ), t += w.repeat(" ", n.indent) + be((e.line + c + 1).toString(), s) + " | " + f.str + `
`;
  return t.replace(/\n$/, "");
}
var Zn = Xn, zn = [
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
], Jn = [
  "scalar",
  "sequence",
  "mapping"
];
function ei(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(i) {
    e[i].forEach(function(o) {
      n[String(o)] = i;
    });
  }), n;
}
function ni(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(i) {
    if (zn.indexOf(i) === -1)
      throw new b('Unknown option "' + i + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(i) {
    return i;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = ei(n.styleAliases || null), Jn.indexOf(this.kind) === -1)
    throw new b('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = ni;
function Me(e, n) {
  var i = [];
  return e[n].forEach(function(o) {
    var r = i.length;
    i.forEach(function(u, l) {
      u.tag === o.tag && u.kind === o.kind && u.multi === o.multi && (r = l);
    }), i[r] = o;
  }), i;
}
function ii() {
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
  function o(r) {
    r.multi ? (e.multi[r.kind].push(r), e.multi.fallback.push(r)) : e[r.kind][r.tag] = e.fallback[r.tag] = r;
  }
  for (n = 0, i = arguments.length; n < i; n += 1)
    arguments[n].forEach(o);
  return e;
}
function Fe(e) {
  return this.extend(e);
}
Fe.prototype.extend = function(n) {
  var i = [], o = [];
  if (n instanceof _)
    o.push(n);
  else if (Array.isArray(n))
    o = o.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (i = i.concat(n.implicit)), n.explicit && (o = o.concat(n.explicit));
  else
    throw new b("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(u) {
    if (!(u instanceof _))
      throw new b("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (u.loadKind && u.loadKind !== "scalar")
      throw new b("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (u.multi)
      throw new b("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), o.forEach(function(u) {
    if (!(u instanceof _))
      throw new b("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var r = Object.create(Fe.prototype);
  return r.implicit = (this.implicit || []).concat(i), r.explicit = (this.explicit || []).concat(o), r.compiledImplicit = Me(r, "implicit"), r.compiledExplicit = Me(r, "explicit"), r.compiledTypeMap = ii(r.compiledImplicit, r.compiledExplicit), r;
};
var ri = Fe, oi = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), li = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), ui = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), ti = new ri({
  explicit: [
    oi,
    li,
    ui
  ]
});
function ci(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function fi() {
  return null;
}
function ai(e) {
  return e === null;
}
var si = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: ci,
  construct: fi,
  predicate: ai,
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
function pi(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function hi(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function di(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var gi = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: pi,
  construct: hi,
  predicate: di,
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
function mi(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function xi(e) {
  return 48 <= e && e <= 55;
}
function Ci(e) {
  return 48 <= e && e <= 57;
}
function Ai(e) {
  if (e === null) return !1;
  var n = e.length, i = 0, o = !1, r;
  if (!n) return !1;
  if (r = e[i], (r === "-" || r === "+") && (r = e[++i]), r === "0") {
    if (i + 1 === n) return !0;
    if (r = e[++i], r === "b") {
      for (i++; i < n; i++)
        if (r = e[i], r !== "_") {
          if (r !== "0" && r !== "1") return !1;
          o = !0;
        }
      return o && r !== "_";
    }
    if (r === "x") {
      for (i++; i < n; i++)
        if (r = e[i], r !== "_") {
          if (!mi(e.charCodeAt(i))) return !1;
          o = !0;
        }
      return o && r !== "_";
    }
    if (r === "o") {
      for (i++; i < n; i++)
        if (r = e[i], r !== "_") {
          if (!xi(e.charCodeAt(i))) return !1;
          o = !0;
        }
      return o && r !== "_";
    }
  }
  if (r === "_") return !1;
  for (; i < n; i++)
    if (r = e[i], r !== "_") {
      if (!Ci(e.charCodeAt(i)))
        return !1;
      o = !0;
    }
  return !(!o || r === "_");
}
function vi(e) {
  var n = e, i = 1, o;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), o = n[0], (o === "-" || o === "+") && (o === "-" && (i = -1), n = n.slice(1), o = n[0]), n === "0") return 0;
  if (o === "0") {
    if (n[1] === "b") return i * parseInt(n.slice(2), 2);
    if (n[1] === "x") return i * parseInt(n.slice(2), 16);
    if (n[1] === "o") return i * parseInt(n.slice(2), 8);
  }
  return i * parseInt(n, 10);
}
function yi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !w.isNegativeZero(e);
}
var wi = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Ai,
  construct: vi,
  predicate: yi,
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
}), _i = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ei(e) {
  return !(e === null || !_i.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function bi(e) {
  var n, i;
  return n = e.replace(/_/g, "").toLowerCase(), i = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : i * parseFloat(n, 10);
}
var Si = /^[-+]?[0-9]+e/;
function Fi(e, n) {
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
  else if (w.isNegativeZero(e))
    return "-0.0";
  return i = e.toString(10), Si.test(i) ? i.replace("e", ".e") : i;
}
function Ti(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || w.isNegativeZero(e));
}
var Li = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ei,
  construct: bi,
  predicate: Ti,
  represent: Fi,
  defaultStyle: "lowercase"
}), Oi = ti.extend({
  implicit: [
    si,
    gi,
    wi,
    Li
  ]
}), ki = Oi, rn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), on = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Ii(e) {
  return e === null ? !1 : rn.exec(e) !== null || on.exec(e) !== null;
}
function Ni(e) {
  var n, i, o, r, u, l, t, c = 0, f = null, s, a, h;
  if (n = rn.exec(e), n === null && (n = on.exec(e)), n === null) throw new Error("Date resolve error");
  if (i = +n[1], o = +n[2] - 1, r = +n[3], !n[4])
    return new Date(Date.UTC(i, o, r));
  if (u = +n[4], l = +n[5], t = +n[6], n[7]) {
    for (c = n[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return n[9] && (s = +n[10], a = +(n[11] || 0), f = (s * 60 + a) * 6e4, n[9] === "-" && (f = -f)), h = new Date(Date.UTC(i, o, r, u, l, t, c)), f && h.setTime(h.getTime() - f), h;
}
function Pi(e) {
  return e.toISOString();
}
var Ri = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Ii,
  construct: Ni,
  instanceOf: Date,
  represent: Pi
});
function Di(e) {
  return e === "<<" || e === null;
}
var Mi = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Di
}), Ie = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Bi(e) {
  if (e === null) return !1;
  var n, i, o = 0, r = e.length, u = Ie;
  for (i = 0; i < r; i++)
    if (n = u.indexOf(e.charAt(i)), !(n > 64)) {
      if (n < 0) return !1;
      o += 6;
    }
  return o % 8 === 0;
}
function Ui(e) {
  var n, i, o = e.replace(/[\r\n=]/g, ""), r = o.length, u = Ie, l = 0, t = [];
  for (n = 0; n < r; n++)
    n % 4 === 0 && n && (t.push(l >> 16 & 255), t.push(l >> 8 & 255), t.push(l & 255)), l = l << 6 | u.indexOf(o.charAt(n));
  return i = r % 4 * 6, i === 0 ? (t.push(l >> 16 & 255), t.push(l >> 8 & 255), t.push(l & 255)) : i === 18 ? (t.push(l >> 10 & 255), t.push(l >> 2 & 255)) : i === 12 && t.push(l >> 4 & 255), new Uint8Array(t);
}
function Yi(e) {
  var n = "", i = 0, o, r, u = e.length, l = Ie;
  for (o = 0; o < u; o++)
    o % 3 === 0 && o && (n += l[i >> 18 & 63], n += l[i >> 12 & 63], n += l[i >> 6 & 63], n += l[i & 63]), i = (i << 8) + e[o];
  return r = u % 3, r === 0 ? (n += l[i >> 18 & 63], n += l[i >> 12 & 63], n += l[i >> 6 & 63], n += l[i & 63]) : r === 2 ? (n += l[i >> 10 & 63], n += l[i >> 4 & 63], n += l[i << 2 & 63], n += l[64]) : r === 1 && (n += l[i >> 2 & 63], n += l[i << 4 & 63], n += l[64], n += l[64]), n;
}
function Hi(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var ji = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Bi,
  construct: Ui,
  predicate: Hi,
  represent: Yi
}), Ki = Object.prototype.hasOwnProperty, $i = Object.prototype.toString;
function Gi(e) {
  if (e === null) return !0;
  var n = [], i, o, r, u, l, t = e;
  for (i = 0, o = t.length; i < o; i += 1) {
    if (r = t[i], l = !1, $i.call(r) !== "[object Object]") return !1;
    for (u in r)
      if (Ki.call(r, u))
        if (!l) l = !0;
        else return !1;
    if (!l) return !1;
    if (n.indexOf(u) === -1) n.push(u);
    else return !1;
  }
  return !0;
}
function Wi(e) {
  return e !== null ? e : [];
}
var qi = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Gi,
  construct: Wi
}), Qi = Object.prototype.toString;
function Vi(e) {
  if (e === null) return !0;
  var n, i, o, r, u, l = e;
  for (u = new Array(l.length), n = 0, i = l.length; n < i; n += 1) {
    if (o = l[n], Qi.call(o) !== "[object Object]" || (r = Object.keys(o), r.length !== 1)) return !1;
    u[n] = [r[0], o[r[0]]];
  }
  return !0;
}
function Xi(e) {
  if (e === null) return [];
  var n, i, o, r, u, l = e;
  for (u = new Array(l.length), n = 0, i = l.length; n < i; n += 1)
    o = l[n], r = Object.keys(o), u[n] = [r[0], o[r[0]]];
  return u;
}
var Zi = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Vi,
  construct: Xi
}), zi = Object.prototype.hasOwnProperty;
function Ji(e) {
  if (e === null) return !0;
  var n, i = e;
  for (n in i)
    if (zi.call(i, n) && i[n] !== null)
      return !1;
  return !0;
}
function er(e) {
  return e !== null ? e : {};
}
var nr = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Ji,
  construct: er
}), ln = ki.extend({
  implicit: [
    Ri,
    Mi
  ],
  explicit: [
    ji,
    qi,
    Zi,
    nr
  ]
}), N = Object.prototype.hasOwnProperty, ge = 1, un = 2, tn = 3, me = 4, Se = 1, ir = 2, Be = 3, rr = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, or = /[\x85\u2028\u2029]/, lr = /[,\[\]\{\}]/, cn = /^(?:!|!!|![a-z\-]+!)$/i, fn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Ue(e) {
  return Object.prototype.toString.call(e);
}
function O(e) {
  return e === 10 || e === 13;
}
function M(e) {
  return e === 9 || e === 32;
}
function S(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Y(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function ur(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function tr(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function cr(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Ye(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function fr(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var an = new Array(256), sn = new Array(256);
for (var B = 0; B < 256; B++)
  an[B] = Ye(B) ? 1 : 0, sn[B] = Ye(B);
function ar(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || ln, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function pn(e, n) {
  var i = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return i.snippet = Zn(i), new b(n, i);
}
function p(e, n) {
  throw pn(e, n);
}
function xe(e, n) {
  e.onWarning && e.onWarning.call(null, pn(e, n));
}
var He = {
  YAML: function(n, i, o) {
    var r, u, l;
    n.version !== null && p(n, "duplication of %YAML directive"), o.length !== 1 && p(n, "YAML directive accepts exactly one argument"), r = /^([0-9]+)\.([0-9]+)$/.exec(o[0]), r === null && p(n, "ill-formed argument of the YAML directive"), u = parseInt(r[1], 10), l = parseInt(r[2], 10), u !== 1 && p(n, "unacceptable YAML version of the document"), n.version = o[0], n.checkLineBreaks = l < 2, l !== 1 && l !== 2 && xe(n, "unsupported YAML version of the document");
  },
  TAG: function(n, i, o) {
    var r, u;
    o.length !== 2 && p(n, "TAG directive accepts exactly two arguments"), r = o[0], u = o[1], cn.test(r) || p(n, "ill-formed tag handle (first argument) of the TAG directive"), N.call(n.tagMap, r) && p(n, 'there is a previously declared suffix for "' + r + '" tag handle'), fn.test(u) || p(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      u = decodeURIComponent(u);
    } catch {
      p(n, "tag prefix is malformed: " + u);
    }
    n.tagMap[r] = u;
  }
};
function I(e, n, i, o) {
  var r, u, l, t;
  if (n < i) {
    if (t = e.input.slice(n, i), o)
      for (r = 0, u = t.length; r < u; r += 1)
        l = t.charCodeAt(r), l === 9 || 32 <= l && l <= 1114111 || p(e, "expected valid JSON character");
    else rr.test(t) && p(e, "the stream contains non-printable characters");
    e.result += t;
  }
}
function je(e, n, i, o) {
  var r, u, l, t;
  for (w.isObject(i) || p(e, "cannot merge mappings; the provided source object is unacceptable"), r = Object.keys(i), l = 0, t = r.length; l < t; l += 1)
    u = r[l], N.call(n, u) || (n[u] = i[u], o[u] = !0);
}
function H(e, n, i, o, r, u, l, t, c) {
  var f, s;
  if (Array.isArray(r))
    for (r = Array.prototype.slice.call(r), f = 0, s = r.length; f < s; f += 1)
      Array.isArray(r[f]) && p(e, "nested arrays are not supported inside keys"), typeof r == "object" && Ue(r[f]) === "[object Object]" && (r[f] = "[object Object]");
  if (typeof r == "object" && Ue(r) === "[object Object]" && (r = "[object Object]"), r = String(r), n === null && (n = {}), o === "tag:yaml.org,2002:merge")
    if (Array.isArray(u))
      for (f = 0, s = u.length; f < s; f += 1)
        je(e, n, u[f], i);
    else
      je(e, n, u, i);
  else
    !e.json && !N.call(i, r) && N.call(n, r) && (e.line = l || e.line, e.lineStart = t || e.lineStart, e.position = c || e.position, p(e, "duplicated mapping key")), r === "__proto__" ? Object.defineProperty(n, r, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: u
    }) : n[r] = u, delete i[r];
  return n;
}
function Ne(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : p(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function y(e, n, i) {
  for (var o = 0, r = e.input.charCodeAt(e.position); r !== 0; ) {
    for (; M(r); )
      r === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), r = e.input.charCodeAt(++e.position);
    if (n && r === 35)
      do
        r = e.input.charCodeAt(++e.position);
      while (r !== 10 && r !== 13 && r !== 0);
    if (O(r))
      for (Ne(e), r = e.input.charCodeAt(e.position), o++, e.lineIndent = 0; r === 32; )
        e.lineIndent++, r = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return i !== -1 && o !== 0 && e.lineIndent < i && xe(e, "deficient indentation"), o;
}
function ye(e) {
  var n = e.position, i;
  return i = e.input.charCodeAt(n), !!((i === 45 || i === 46) && i === e.input.charCodeAt(n + 1) && i === e.input.charCodeAt(n + 2) && (n += 3, i = e.input.charCodeAt(n), i === 0 || S(i)));
}
function Pe(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += w.repeat(`
`, n - 1));
}
function sr(e, n, i) {
  var o, r, u, l, t, c, f, s, a = e.kind, h = e.result, d;
  if (d = e.input.charCodeAt(e.position), S(d) || Y(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (r = e.input.charCodeAt(e.position + 1), S(r) || i && Y(r)))
    return !1;
  for (e.kind = "scalar", e.result = "", u = l = e.position, t = !1; d !== 0; ) {
    if (d === 58) {
      if (r = e.input.charCodeAt(e.position + 1), S(r) || i && Y(r))
        break;
    } else if (d === 35) {
      if (o = e.input.charCodeAt(e.position - 1), S(o))
        break;
    } else {
      if (e.position === e.lineStart && ye(e) || i && Y(d))
        break;
      if (O(d))
        if (c = e.line, f = e.lineStart, s = e.lineIndent, y(e, !1, -1), e.lineIndent >= n) {
          t = !0, d = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = l, e.line = c, e.lineStart = f, e.lineIndent = s;
          break;
        }
    }
    t && (I(e, u, l, !1), Pe(e, e.line - c), u = l = e.position, t = !1), M(d) || (l = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return I(e, u, l, !1), e.result ? !0 : (e.kind = a, e.result = h, !1);
}
function pr(e, n) {
  var i, o, r;
  if (i = e.input.charCodeAt(e.position), i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, o = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (I(e, o, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        o = e.position, e.position++, r = e.position;
      else
        return !0;
    else O(i) ? (I(e, o, r, !0), Pe(e, y(e, !1, n)), o = r = e.position) : e.position === e.lineStart && ye(e) ? p(e, "unexpected end of the document within a single quoted scalar") : (e.position++, r = e.position);
  p(e, "unexpected end of the stream within a single quoted scalar");
}
function hr(e, n) {
  var i, o, r, u, l, t;
  if (t = e.input.charCodeAt(e.position), t !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (t = e.input.charCodeAt(e.position)) !== 0; ) {
    if (t === 34)
      return I(e, i, e.position, !0), e.position++, !0;
    if (t === 92) {
      if (I(e, i, e.position, !0), t = e.input.charCodeAt(++e.position), O(t))
        y(e, !1, n);
      else if (t < 256 && an[t])
        e.result += sn[t], e.position++;
      else if ((l = tr(t)) > 0) {
        for (r = l, u = 0; r > 0; r--)
          t = e.input.charCodeAt(++e.position), (l = ur(t)) >= 0 ? u = (u << 4) + l : p(e, "expected hexadecimal character");
        e.result += fr(u), e.position++;
      } else
        p(e, "unknown escape sequence");
      i = o = e.position;
    } else O(t) ? (I(e, i, o, !0), Pe(e, y(e, !1, n)), i = o = e.position) : e.position === e.lineStart && ye(e) ? p(e, "unexpected end of the document within a double quoted scalar") : (e.position++, o = e.position);
  }
  p(e, "unexpected end of the stream within a double quoted scalar");
}
function dr(e, n) {
  var i = !0, o, r, u, l = e.tag, t, c = e.anchor, f, s, a, h, d, g = /* @__PURE__ */ Object.create(null), x, v, T, m;
  if (m = e.input.charCodeAt(e.position), m === 91)
    s = 93, d = !1, t = [];
  else if (m === 123)
    s = 125, d = !0, t = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = t), m = e.input.charCodeAt(++e.position); m !== 0; ) {
    if (y(e, !0, n), m = e.input.charCodeAt(e.position), m === s)
      return e.position++, e.tag = l, e.anchor = c, e.kind = d ? "mapping" : "sequence", e.result = t, !0;
    i ? m === 44 && p(e, "expected the node content, but found ','") : p(e, "missed comma between flow collection entries"), v = x = T = null, a = h = !1, m === 63 && (f = e.input.charCodeAt(e.position + 1), S(f) && (a = h = !0, e.position++, y(e, !0, n))), o = e.line, r = e.lineStart, u = e.position, j(e, n, ge, !1, !0), v = e.tag, x = e.result, y(e, !0, n), m = e.input.charCodeAt(e.position), (h || e.line === o) && m === 58 && (a = !0, m = e.input.charCodeAt(++e.position), y(e, !0, n), j(e, n, ge, !1, !0), T = e.result), d ? H(e, t, g, v, x, T, o, r, u) : a ? t.push(H(e, null, g, v, x, T, o, r, u)) : t.push(x), y(e, !0, n), m = e.input.charCodeAt(e.position), m === 44 ? (i = !0, m = e.input.charCodeAt(++e.position)) : i = !1;
  }
  p(e, "unexpected end of the stream within a flow collection");
}
function gr(e, n) {
  var i, o, r = Se, u = !1, l = !1, t = n, c = 0, f = !1, s, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    o = !1;
  else if (a === 62)
    o = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      Se === r ? r = a === 43 ? Be : ir : p(e, "repeat of a chomping mode identifier");
    else if ((s = cr(a)) >= 0)
      s === 0 ? p(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : l ? p(e, "repeat of an indentation width identifier") : (t = n + s - 1, l = !0);
    else
      break;
  if (M(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while (M(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!O(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (Ne(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!l || e.lineIndent < t) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!l && e.lineIndent > t && (t = e.lineIndent), O(a)) {
      c++;
      continue;
    }
    if (e.lineIndent < t) {
      r === Be ? e.result += w.repeat(`
`, u ? 1 + c : c) : r === Se && u && (e.result += `
`);
      break;
    }
    for (o ? M(a) ? (f = !0, e.result += w.repeat(`
`, u ? 1 + c : c)) : f ? (f = !1, e.result += w.repeat(`
`, c + 1)) : c === 0 ? u && (e.result += " ") : e.result += w.repeat(`
`, c) : e.result += w.repeat(`
`, u ? 1 + c : c), u = !0, l = !0, c = 0, i = e.position; !O(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    I(e, i, e.position, !1);
  }
  return !0;
}
function Ke(e, n) {
  var i, o = e.tag, r = e.anchor, u = [], l, t = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), !(c !== 45 || (l = e.input.charCodeAt(e.position + 1), !S(l)))); ) {
    if (t = !0, e.position++, y(e, !0, -1) && e.lineIndent <= n) {
      u.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (i = e.line, j(e, n, tn, !1, !0), u.push(e.result), y(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === i || e.lineIndent > n) && c !== 0)
      p(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return t ? (e.tag = o, e.anchor = r, e.kind = "sequence", e.result = u, !0) : !1;
}
function mr(e, n, i) {
  var o, r, u, l, t, c, f = e.tag, s = e.anchor, a = {}, h = /* @__PURE__ */ Object.create(null), d = null, g = null, x = null, v = !1, T = !1, m;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), m = e.input.charCodeAt(e.position); m !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), o = e.input.charCodeAt(e.position + 1), u = e.line, (m === 63 || m === 58) && S(o))
      m === 63 ? (v && (H(e, a, h, d, g, null, l, t, c), d = g = x = null), T = !0, v = !0, r = !0) : v ? (v = !1, r = !0) : p(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, m = o;
    else {
      if (l = e.line, t = e.lineStart, c = e.position, !j(e, i, un, !1, !0))
        break;
      if (e.line === u) {
        for (m = e.input.charCodeAt(e.position); M(m); )
          m = e.input.charCodeAt(++e.position);
        if (m === 58)
          m = e.input.charCodeAt(++e.position), S(m) || p(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (H(e, a, h, d, g, null, l, t, c), d = g = x = null), T = !0, v = !1, r = !1, d = e.tag, g = e.result;
        else if (T)
          p(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = s, !0;
      } else if (T)
        p(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = s, !0;
    }
    if ((e.line === u || e.lineIndent > n) && (v && (l = e.line, t = e.lineStart, c = e.position), j(e, n, me, !0, r) && (v ? g = e.result : x = e.result), v || (H(e, a, h, d, g, x, l, t, c), d = g = x = null), y(e, !0, -1), m = e.input.charCodeAt(e.position)), (e.line === u || e.lineIndent > n) && m !== 0)
      p(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return v && H(e, a, h, d, g, null, l, t, c), T && (e.tag = f, e.anchor = s, e.kind = "mapping", e.result = a), T;
}
function xr(e) {
  var n, i = !1, o = !1, r, u, l;
  if (l = e.input.charCodeAt(e.position), l !== 33) return !1;
  if (e.tag !== null && p(e, "duplication of a tag property"), l = e.input.charCodeAt(++e.position), l === 60 ? (i = !0, l = e.input.charCodeAt(++e.position)) : l === 33 ? (o = !0, r = "!!", l = e.input.charCodeAt(++e.position)) : r = "!", n = e.position, i) {
    do
      l = e.input.charCodeAt(++e.position);
    while (l !== 0 && l !== 62);
    e.position < e.length ? (u = e.input.slice(n, e.position), l = e.input.charCodeAt(++e.position)) : p(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; l !== 0 && !S(l); )
      l === 33 && (o ? p(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(n - 1, e.position + 1), cn.test(r) || p(e, "named tag handle cannot contain such characters"), o = !0, n = e.position + 1)), l = e.input.charCodeAt(++e.position);
    u = e.input.slice(n, e.position), lr.test(u) && p(e, "tag suffix cannot contain flow indicator characters");
  }
  u && !fn.test(u) && p(e, "tag name cannot contain such characters: " + u);
  try {
    u = decodeURIComponent(u);
  } catch {
    p(e, "tag name is malformed: " + u);
  }
  return i ? e.tag = u : N.call(e.tagMap, r) ? e.tag = e.tagMap[r] + u : r === "!" ? e.tag = "!" + u : r === "!!" ? e.tag = "tag:yaml.org,2002:" + u : p(e, 'undeclared tag handle "' + r + '"'), !0;
}
function Cr(e) {
  var n, i;
  if (i = e.input.charCodeAt(e.position), i !== 38) return !1;
  for (e.anchor !== null && p(e, "duplication of an anchor property"), i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !S(i) && !Y(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Ar(e) {
  var n, i, o;
  if (o = e.input.charCodeAt(e.position), o !== 42) return !1;
  for (o = e.input.charCodeAt(++e.position), n = e.position; o !== 0 && !S(o) && !Y(o); )
    o = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an alias node must contain at least one character"), i = e.input.slice(n, e.position), N.call(e.anchorMap, i) || p(e, 'unidentified alias "' + i + '"'), e.result = e.anchorMap[i], y(e, !0, -1), !0;
}
function j(e, n, i, o, r) {
  var u, l, t, c = 1, f = !1, s = !1, a, h, d, g, x, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, u = l = t = me === i || tn === i, o && y(e, !0, -1) && (f = !0, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)), c === 1)
    for (; xr(e) || Cr(e); )
      y(e, !0, -1) ? (f = !0, t = u, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)) : t = !1;
  if (t && (t = f || r), (c === 1 || me === i) && (ge === i || un === i ? x = n : x = n + 1, v = e.position - e.lineStart, c === 1 ? t && (Ke(e, v) || mr(e, v, x)) || dr(e, x) ? s = !0 : (l && gr(e, x) || pr(e, x) || hr(e, x) ? s = !0 : Ar(e) ? (s = !0, (e.tag !== null || e.anchor !== null) && p(e, "alias node should not have any properties")) : sr(e, x, ge === i) && (s = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (s = t && Ke(e, v))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && p(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, h = e.implicitTypes.length; a < h; a += 1)
      if (g = e.implicitTypes[a], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (N.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, d = e.typeMap.multi[e.kind || "fallback"], a = 0, h = d.length; a < h; a += 1)
        if (e.tag.slice(0, d[a].tag.length) === d[a].tag) {
          g = d[a];
          break;
        }
    g || p(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && p(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : p(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || s;
}
function vr(e) {
  var n = e.position, i, o, r, u = !1, l;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (l = e.input.charCodeAt(e.position)) !== 0 && (y(e, !0, -1), l = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || l !== 37)); ) {
    for (u = !0, l = e.input.charCodeAt(++e.position), i = e.position; l !== 0 && !S(l); )
      l = e.input.charCodeAt(++e.position);
    for (o = e.input.slice(i, e.position), r = [], o.length < 1 && p(e, "directive name must not be less than one character in length"); l !== 0; ) {
      for (; M(l); )
        l = e.input.charCodeAt(++e.position);
      if (l === 35) {
        do
          l = e.input.charCodeAt(++e.position);
        while (l !== 0 && !O(l));
        break;
      }
      if (O(l)) break;
      for (i = e.position; l !== 0 && !S(l); )
        l = e.input.charCodeAt(++e.position);
      r.push(e.input.slice(i, e.position));
    }
    l !== 0 && Ne(e), N.call(He, o) ? He[o](e, o, r) : xe(e, 'unknown document directive "' + o + '"');
  }
  if (y(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, y(e, !0, -1)) : u && p(e, "directives end mark is expected"), j(e, e.lineIndent - 1, me, !1, !0), y(e, !0, -1), e.checkLineBreaks && or.test(e.input.slice(n, e.position)) && xe(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && ye(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, y(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    p(e, "end of the stream or a document separator is expected");
  else
    return;
}
function hn(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var i = new ar(e, n), o = e.indexOf("\0");
  for (o !== -1 && (i.position = o, p(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    vr(i);
  return i.documents;
}
function yr(e, n, i) {
  n !== null && typeof n == "object" && typeof i > "u" && (i = n, n = null);
  var o = hn(e, i);
  if (typeof n != "function")
    return o;
  for (var r = 0, u = o.length; r < u; r += 1)
    n(o[r]);
}
function wr(e, n) {
  var i = hn(e, n);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new b("expected a single document in the stream, but found more");
  }
}
var _r = yr, Er = wr, br = {
  loadAll: _r,
  load: Er
}, dn = Object.prototype.toString, gn = Object.prototype.hasOwnProperty, Re = 65279, Sr = 9, V = 10, Fr = 13, Tr = 32, Lr = 33, Or = 34, Te = 35, kr = 37, Ir = 38, Nr = 39, Pr = 42, mn = 44, Rr = 45, Ce = 58, Dr = 61, Mr = 62, Br = 63, Ur = 64, xn = 91, Cn = 93, Yr = 96, An = 123, Hr = 124, vn = 125, E = {};
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
var jr = [
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
], Kr = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function $r(e, n) {
  var i, o, r, u, l, t, c;
  if (n === null) return {};
  for (i = {}, o = Object.keys(n), r = 0, u = o.length; r < u; r += 1)
    l = o[r], t = String(n[l]), l.slice(0, 2) === "!!" && (l = "tag:yaml.org,2002:" + l.slice(2)), c = e.compiledTypeMap.fallback[l], c && gn.call(c.styleAliases, t) && (t = c.styleAliases[t]), i[l] = t;
  return i;
}
function Gr(e) {
  var n, i, o;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    i = "x", o = 2;
  else if (e <= 65535)
    i = "u", o = 4;
  else if (e <= 4294967295)
    i = "U", o = 8;
  else
    throw new b("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + i + w.repeat("0", o - n.length) + n;
}
var Wr = 1, X = 2;
function qr(e) {
  this.schema = e.schema || ln, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = w.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = $r(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? X : Wr, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function $e(e, n) {
  for (var i = w.repeat(" ", n), o = 0, r = -1, u = "", l, t = e.length; o < t; )
    r = e.indexOf(`
`, o), r === -1 ? (l = e.slice(o), o = t) : (l = e.slice(o, r + 1), o = r + 1), l.length && l !== `
` && (u += i), u += l;
  return u;
}
function Le(e, n) {
  return `
` + w.repeat(" ", e.indent * n);
}
function Qr(e, n) {
  var i, o, r;
  for (i = 0, o = e.implicitTypes.length; i < o; i += 1)
    if (r = e.implicitTypes[i], r.resolve(n))
      return !0;
  return !1;
}
function Ae(e) {
  return e === Tr || e === Sr;
}
function Z(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Re || 65536 <= e && e <= 1114111;
}
function Ge(e) {
  return Z(e) && e !== Re && e !== Fr && e !== V;
}
function We(e, n, i) {
  var o = Ge(e), r = o && !Ae(e);
  return (
    // ns-plain-safe
    (i ? (
      // c = flow-in
      o
    ) : o && e !== mn && e !== xn && e !== Cn && e !== An && e !== vn) && e !== Te && !(n === Ce && !r) || Ge(n) && !Ae(n) && e === Te || n === Ce && r
  );
}
function Vr(e) {
  return Z(e) && e !== Re && !Ae(e) && e !== Rr && e !== Br && e !== Ce && e !== mn && e !== xn && e !== Cn && e !== An && e !== vn && e !== Te && e !== Ir && e !== Pr && e !== Lr && e !== Hr && e !== Dr && e !== Mr && e !== Nr && e !== Or && e !== kr && e !== Ur && e !== Yr;
}
function Xr(e) {
  return !Ae(e) && e !== Ce;
}
function W(e, n) {
  var i = e.charCodeAt(n), o;
  return i >= 55296 && i <= 56319 && n + 1 < e.length && (o = e.charCodeAt(n + 1), o >= 56320 && o <= 57343) ? (i - 55296) * 1024 + o - 56320 + 65536 : i;
}
function yn(e) {
  var n = /^\n* /;
  return n.test(e);
}
var wn = 1, Oe = 2, _n = 3, En = 4, U = 5;
function Zr(e, n, i, o, r, u, l, t) {
  var c, f = 0, s = null, a = !1, h = !1, d = o !== -1, g = -1, x = Vr(W(e, 0)) && Xr(W(e, e.length - 1));
  if (n || l)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = W(e, c), !Z(f))
        return U;
      x = x && We(f, s, t), s = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = W(e, c), f === V)
        a = !0, d && (h = h || // Foldable line = too long, and not more-indented.
        c - g - 1 > o && e[g + 1] !== " ", g = c);
      else if (!Z(f))
        return U;
      x = x && We(f, s, t), s = f;
    }
    h = h || d && c - g - 1 > o && e[g + 1] !== " ";
  }
  return !a && !h ? x && !l && !r(e) ? wn : u === X ? U : Oe : i > 9 && yn(e) ? U : l ? u === X ? U : Oe : h ? En : _n;
}
function zr(e, n, i, o, r) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === X ? '""' : "''";
    if (!e.noCompatMode && (jr.indexOf(n) !== -1 || Kr.test(n)))
      return e.quotingType === X ? '"' + n + '"' : "'" + n + "'";
    var u = e.indent * Math.max(1, i), l = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - u), t = o || e.flowLevel > -1 && i >= e.flowLevel;
    function c(f) {
      return Qr(e, f);
    }
    switch (Zr(
      n,
      t,
      e.indent,
      l,
      c,
      e.quotingType,
      e.forceQuotes && !o,
      r
    )) {
      case wn:
        return n;
      case Oe:
        return "'" + n.replace(/'/g, "''") + "'";
      case _n:
        return "|" + qe(n, e.indent) + Qe($e(n, u));
      case En:
        return ">" + qe(n, e.indent) + Qe($e(Jr(n, l), u));
      case U:
        return '"' + eo(n) + '"';
      default:
        throw new b("impossible error: invalid scalar style");
    }
  }();
}
function qe(e, n) {
  var i = yn(e) ? String(n) : "", o = e[e.length - 1] === `
`, r = o && (e[e.length - 2] === `
` || e === `
`), u = r ? "+" : o ? "" : "-";
  return i + u + `
`;
}
function Qe(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Jr(e, n) {
  for (var i = /(\n+)([^\n]*)/g, o = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, i.lastIndex = f, Ve(e.slice(0, f), n);
  }(), r = e[0] === `
` || e[0] === " ", u, l; l = i.exec(e); ) {
    var t = l[1], c = l[2];
    u = c[0] === " ", o += t + (!r && !u && c !== "" ? `
` : "") + Ve(c, n), r = u;
  }
  return o;
}
function Ve(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var i = / [^ ]/g, o, r = 0, u, l = 0, t = 0, c = ""; o = i.exec(e); )
    t = o.index, t - r > n && (u = l > r ? l : t, c += `
` + e.slice(r, u), r = u + 1), l = t;
  return c += `
`, e.length - r > n && l > r ? c += e.slice(r, l) + `
` + e.slice(l + 1) : c += e.slice(r), c.slice(1);
}
function eo(e) {
  for (var n = "", i = 0, o, r = 0; r < e.length; i >= 65536 ? r += 2 : r++)
    i = W(e, r), o = E[i], !o && Z(i) ? (n += e[r], i >= 65536 && (n += e[r + 1])) : n += o || Gr(i);
  return n;
}
function no(e, n, i) {
  var o = "", r = e.tag, u, l, t;
  for (u = 0, l = i.length; u < l; u += 1)
    t = i[u], e.replacer && (t = e.replacer.call(i, String(u), t)), (k(e, n, t, !1, !1) || typeof t > "u" && k(e, n, null, !1, !1)) && (o !== "" && (o += "," + (e.condenseFlow ? "" : " ")), o += e.dump);
  e.tag = r, e.dump = "[" + o + "]";
}
function Xe(e, n, i, o) {
  var r = "", u = e.tag, l, t, c;
  for (l = 0, t = i.length; l < t; l += 1)
    c = i[l], e.replacer && (c = e.replacer.call(i, String(l), c)), (k(e, n + 1, c, !0, !0, !1, !0) || typeof c > "u" && k(e, n + 1, null, !0, !0, !1, !0)) && ((!o || r !== "") && (r += Le(e, n)), e.dump && V === e.dump.charCodeAt(0) ? r += "-" : r += "- ", r += e.dump);
  e.tag = u, e.dump = r || "[]";
}
function io(e, n, i) {
  var o = "", r = e.tag, u = Object.keys(i), l, t, c, f, s;
  for (l = 0, t = u.length; l < t; l += 1)
    s = "", o !== "" && (s += ", "), e.condenseFlow && (s += '"'), c = u[l], f = i[c], e.replacer && (f = e.replacer.call(i, c, f)), k(e, n, c, !1, !1) && (e.dump.length > 1024 && (s += "? "), s += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), k(e, n, f, !1, !1) && (s += e.dump, o += s));
  e.tag = r, e.dump = "{" + o + "}";
}
function ro(e, n, i, o) {
  var r = "", u = e.tag, l = Object.keys(i), t, c, f, s, a, h;
  if (e.sortKeys === !0)
    l.sort();
  else if (typeof e.sortKeys == "function")
    l.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new b("sortKeys must be a boolean or a function");
  for (t = 0, c = l.length; t < c; t += 1)
    h = "", (!o || r !== "") && (h += Le(e, n)), f = l[t], s = i[f], e.replacer && (s = e.replacer.call(i, f, s)), k(e, n + 1, f, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && V === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, a && (h += Le(e, n)), k(e, n + 1, s, !0, a) && (e.dump && V === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, r += h));
  e.tag = u, e.dump = r || "{}";
}
function Ze(e, n, i) {
  var o, r, u, l, t, c;
  for (r = i ? e.explicitTypes : e.implicitTypes, u = 0, l = r.length; u < l; u += 1)
    if (t = r[u], (t.instanceOf || t.predicate) && (!t.instanceOf || typeof n == "object" && n instanceof t.instanceOf) && (!t.predicate || t.predicate(n))) {
      if (i ? t.multi && t.representName ? e.tag = t.representName(n) : e.tag = t.tag : e.tag = "?", t.represent) {
        if (c = e.styleMap[t.tag] || t.defaultStyle, dn.call(t.represent) === "[object Function]")
          o = t.represent(n, c);
        else if (gn.call(t.represent, c))
          o = t.represent[c](n, c);
        else
          throw new b("!<" + t.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = o;
      }
      return !0;
    }
  return !1;
}
function k(e, n, i, o, r, u, l) {
  e.tag = null, e.dump = i, Ze(e, i, !1) || Ze(e, i, !0);
  var t = dn.call(e.dump), c = o, f;
  o && (o = e.flowLevel < 0 || e.flowLevel > n);
  var s = t === "[object Object]" || t === "[object Array]", a, h;
  if (s && (a = e.duplicates.indexOf(i), h = a !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && n > 0) && (r = !1), h && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (s && h && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), t === "[object Object]")
      o && Object.keys(e.dump).length !== 0 ? (ro(e, n, e.dump, r), h && (e.dump = "&ref_" + a + e.dump)) : (io(e, n, e.dump), h && (e.dump = "&ref_" + a + " " + e.dump));
    else if (t === "[object Array]")
      o && e.dump.length !== 0 ? (e.noArrayIndent && !l && n > 0 ? Xe(e, n - 1, e.dump, r) : Xe(e, n, e.dump, r), h && (e.dump = "&ref_" + a + e.dump)) : (no(e, n, e.dump), h && (e.dump = "&ref_" + a + " " + e.dump));
    else if (t === "[object String]")
      e.tag !== "?" && zr(e, e.dump, n, u, c);
    else {
      if (t === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new b("unacceptable kind of an object to dump " + t);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function oo(e, n) {
  var i = [], o = [], r, u;
  for (ke(e, i, o), r = 0, u = o.length; r < u; r += 1)
    n.duplicates.push(i[o[r]]);
  n.usedDuplicates = new Array(u);
}
function ke(e, n, i) {
  var o, r, u;
  if (e !== null && typeof e == "object")
    if (r = n.indexOf(e), r !== -1)
      i.indexOf(r) === -1 && i.push(r);
    else if (n.push(e), Array.isArray(e))
      for (r = 0, u = e.length; r < u; r += 1)
        ke(e[r], n, i);
    else
      for (o = Object.keys(e), r = 0, u = o.length; r < u; r += 1)
        ke(e[o[r]], n, i);
}
function lo(e, n) {
  n = n || {};
  var i = new qr(n);
  i.noRefs || oo(e, i);
  var o = e;
  return i.replacer && (o = i.replacer.call({ "": o }, "", o)), k(i, 0, o, !0, !0) ? i.dump + `
` : "";
}
var uo = lo, to = {
  dump: uo
}, co = br.load, fo = to.dump;
function bn(e) {
  if (!e) return e;
  const n = atob(e), i = new Uint8Array(n.length);
  for (let o = 0; o < n.length; o++)
    i[o] = n.charCodeAt(o);
  return new TextDecoder().decode(i);
}
function Sn(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let i = "";
  for (let o = 0; o < n.length; o += 1)
    i += String.fromCharCode(n[o]);
  return btoa(i);
}
var z, J, ee, ve;
class ao {
  constructor() {
    A(this, z, ["localhost", "127.0.0.1", "example.com"]);
    A(this, J, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    A(this, ee, 1024);
    A(this, ve, 65535);
  }
  /**
   * @description 获取随机hostname
   * @returns {string} hostname
   */
  getHostName() {
    return C(this, z)[Math.floor(Math.random() * C(this, z).length)];
  }
  /**
   * @description 获取随机端口
   * @returns {string} port
   */
  getPort() {
    return Math.floor(Math.random() * (C(this, ve) - C(this, ee) + 1) + C(this, ee)).toString();
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
    return C(this, J)[Math.floor(Math.random() * C(this, J).length)];
  }
}
z = new WeakMap(), J = new WeakMap(), ee = new WeakMap(), ve = new WeakMap();
var ne, ie, re, oe;
class we extends ao {
  constructor() {
    super();
    /** * @description vps原始配置 */
    A(this, ne, {});
    /** * @description 混淆配置 */
    A(this, ie, {});
    /** * @description 原始备注 */
    A(this, re, "");
    /** * @description 混淆备注 */
    A(this, oe, "");
    F(this, oe, this.getUUID());
  }
  /**
   * @description 设置原始配置
   * @param {Partial<T>} config
   */
  setConfuseConfig(i) {
    F(this, ie, i);
  }
  /**
   * @description 设置混淆配置
   * @param {Partial<T>} config
   * @param {string} ps
   */
  setOriginConfig(i, o) {
    F(this, ne, i), F(this, re, decodeURIComponent(o));
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return C(this, re);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return C(this, ne);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return C(this, oe);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return C(this, ie);
  }
}
ne = new WeakMap(), ie = new WeakMap(), re = new WeakMap(), oe = new WeakMap();
var le;
const q = class q {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const i = n.split(C(q, le));
    return [i[0], i[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, i) {
    return [n, i].join(C(q, le));
  }
};
le = new WeakMap(), A(q, le, "^LINK_TO^");
let P = q;
var ue, te, D, R, Fn, Tn, Ln;
class so extends we {
  constructor(i) {
    super();
    A(this, R);
    /** @description 原始链接 */
    A(this, ue, "");
    /** @description 混淆链接 */
    A(this, te, "");
    /** @description 解析的私有配置 */
    A(this, D, {});
    L(this, R, Fn).call(this, i);
  }
  restore(i, o) {
    var r;
    return i.name = o, i.server = this.originConfig.hostname ?? "", i.port = Number(((r = this.originConfig) == null ? void 0 : r.port) ?? 0), i.cipher = C(this, D).originEncryptionProtocol, i.password = C(this, D).originPassword, i;
  }
  get confuseLink() {
    return C(this, te);
  }
  get originLink() {
    return C(this, ue);
  }
}
ue = new WeakMap(), te = new WeakMap(), D = new WeakMap(), R = new WeakSet(), Fn = function(i) {
  F(this, ue, i);
  const o = new URL(i);
  this.setOriginConfig(o, o.hash);
  const r = this.getEncrtptionProtocol(), u = this.getPassword();
  L(this, R, Tn).call(this, o.username), this.setConfuseConfig({
    username: encodeURIComponent(Sn(`${r}:${u}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: P.setPs(this.originPs, this.confusePs)
  }), L(this, R, Ln).call(this);
}, Tn = function(i) {
  const [o, r] = bn(decodeURIComponent(i)).split(":");
  C(this, D).originEncryptionProtocol = o, C(this, D).originPassword = r;
}, Ln = function() {
  const { username: i, hostname: o, port: r, search: u, hash: l } = this.confuseConfig;
  F(this, te, `ss://${i}@${o}:${r}${u ?? ""}${l}`);
};
var ce, fe, K, On, kn;
class po extends we {
  constructor(i) {
    super();
    A(this, K);
    /** * @description 原始链接 */
    A(this, ce, "");
    /** * @description 混淆链接 */
    A(this, fe, "");
    L(this, K, On).call(this, i);
  }
  restore(i, o) {
    var r, u;
    return i.name = o, i.server = this.originConfig.hostname ?? "", i.port = Number(this.originConfig.port ?? 0), i.password = ((r = this.originConfig) == null ? void 0 : r.username) ?? "", i.sni = ((u = this.originConfig) == null ? void 0 : u.hostname) ?? "", i;
  }
  get confuseLink() {
    return C(this, fe);
  }
  get originLink() {
    return C(this, ce);
  }
}
ce = new WeakMap(), fe = new WeakMap(), K = new WeakSet(), On = function(i) {
  F(this, ce, i);
  const o = new URL(i);
  this.setOriginConfig(o, o.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: P.setPs(this.originPs, this.confusePs)
  }), L(this, K, kn).call(this);
}, kn = function() {
  const { password: i, hostname: o, port: r, search: u, hash: l } = this.confuseConfig;
  F(this, fe, `trojan://${i}@${o}:${r}${u}${l}`);
};
var ae, se, $, In, Nn;
class ho extends we {
  constructor(i) {
    super();
    A(this, $);
    /** * @description 原始链接 */
    A(this, ae, "");
    /** * @description 混淆链接 */
    A(this, se, "");
    L(this, $, In).call(this, i);
  }
  restore(i, o) {
    var r;
    return i.name = o, i.server = this.originConfig.hostname ?? "", i.port = Number(((r = this.originConfig) == null ? void 0 : r.port) ?? 0), i.uuid = this.originConfig.username ?? "", i;
  }
  get confuseLink() {
    return C(this, se);
  }
  get originLink() {
    return C(this, ae);
  }
}
ae = new WeakMap(), se = new WeakMap(), $ = new WeakSet(), In = function(i) {
  F(this, ae, i);
  const o = new URL(i);
  this.setOriginConfig(o, o.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: P.setPs(this.originPs, this.confusePs)
  }), L(this, $, Nn).call(this);
}, Nn = function() {
  const { password: i, hostname: o, port: r, search: u, hash: l } = this.confuseConfig;
  F(this, se, `vless://${i}@${o}:${r}${u}${l}`);
};
var pe, he, G, Pn, Rn;
class go extends we {
  constructor(i) {
    super();
    A(this, G);
    /** * @description 原始链接 */
    A(this, pe, "");
    /** * @description 混淆链接 */
    A(this, he, "");
    L(this, G, Pn).call(this, i);
  }
  restore(i, o) {
    var r, u;
    return i.name = o, i.server = this.originConfig.add ?? "", i.port = Number(((r = this.originConfig) == null ? void 0 : r.port) ?? 0), i.uuid = ((u = this.originConfig) == null ? void 0 : u.id) ?? "", i;
  }
  get confuseLink() {
    return C(this, he);
  }
  get originLink() {
    return C(this, pe);
  }
}
pe = new WeakMap(), he = new WeakMap(), G = new WeakSet(), Pn = function(i) {
  const [o, r] = i.match(/vmess:\/\/(.*)/) || [], u = JSON.parse(bn(r));
  F(this, pe, i), this.setOriginConfig(u, u.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: P.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), L(this, G, Rn).call(this);
}, Rn = function() {
  const { add: i, port: o, id: r, ps: u, scy: l, net: t, type: c, tls: f, v: s } = this.confuseConfig;
  F(this, he, `vmess://${Sn(JSON.stringify({ v: s, ps: u, add: i, port: o, id: r, scy: l, net: t, type: c, tls: f }))}`);
};
function mo(e, n) {
  const { searchParams: i } = new URL(e), r = i.get("url").split(/\||\n/).filter(Boolean), u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
  for (const c of r) {
    if (c.startsWith("vless:")) {
      const f = new ho(c);
      u.add(f.confuseLink), l.set(f.confusePs, f);
    }
    if (c.startsWith("vmess:")) {
      const f = new go(c);
      u.add(f.confuseLink), l.set(f.confusePs, f);
    }
    if (c.startsWith("trojan://")) {
      const f = new po(c);
      u.add(f.confuseLink), l.set(f.confusePs, f);
    }
    if (c.startsWith("ss://")) {
      const f = new so(c);
      u.add(f.confuseLink), l.set(f.confusePs, f);
    }
  }
  i.set("url", Array.from(u).join("|"));
  const t = new URL(`${n}/sub`);
  return t.search = i.toString(), {
    confuseUrl: t.toString(),
    vpsMap: l
  };
}
function xo(e, n) {
  try {
    const i = [];
    for (const o of e) {
      const [r, u] = P.getPs(o.name);
      if (n.has(u)) {
        const l = n.get(u);
        l == null || l.restore(o, r), i.push(o);
      }
    }
    return i;
  } catch (i) {
    throw new Error(`Restore proxies failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}
function Co(e) {
  try {
    return e.map((n) => {
      const [i] = P.getPs(n);
      return i;
    });
  } catch (n) {
    throw new Error(`Update proxies groups failed: ${n.message || n}, function trace: ${n.stack}`);
  }
}
function Ao(e, n) {
  try {
    const i = co(e);
    return i.proxies = xo(i.proxies, n), i["proxy-groups"] = i["proxy-groups"].map((o) => (o.proxies && (o.proxies = Co(o.proxies)), o)), i;
  } catch (i) {
    throw new Error(`Get origin config failed: ${i.message || i}, function trace: ${i.stack}`);
  }
}
function vo(e = "") {
  return e.split(`
`).reduce((i, o) => (i.push({
    label: o,
    value: o
  }), i), []);
}
function yo(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function wo(e, n) {
  const i = n === "" ? [] : vo(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(i));
}
function _o(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const de = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: ""
};
async function Eo(e) {
  try {
    const { url: n, lockBackend: i, remoteConfig: o, origin: r } = e, u = await fetch(`${n}?t=${Date.now()}`);
    if (u.status !== 200)
      throw new Error(u.statusText);
    let l = await u.text();
    return l = yo(l, r), l = wo(l, o), l = _o(l, i), ze(
      l,
      new Headers({
        ...u.headers,
        "Content-Type": "text/html; charset=utf-8"
      })
    );
  } catch (n) {
    return Je(n.message || n);
  }
}
const So = {
  async fetch(e, n) {
    try {
      const { pathname: i, origin: o } = new URL(e.url);
      if (i === "/sub") {
        const { confuseUrl: r, vpsMap: u } = mo(e.url, n.BACKEND ?? de.BACKEND), l = await fetch(r);
        if (!l.ok)
          throw new Error(l.statusText);
        const t = await l.text(), c = Ao(t, u);
        return ze(
          fo(c, { indent: 2, lineWidth: 200 }),
          new Headers({
            "Content-Type": "text/yaml; charset=UTF-8",
            "Cache-Control": "no-store"
          })
        );
      }
      return Eo({
        url: n.PAGE_URL ?? de.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? de.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? de.REMOTE_CONFIG,
        origin: o
      });
    } catch (i) {
      return Je(i.message || i);
    }
  }
};
export {
  So as default
};
