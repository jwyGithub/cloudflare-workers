var Yn = Object.defineProperty;
var $e = (e) => {
  throw TypeError(e);
};
var jn = (e, n, r) => n in e ? Yn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var be = (e, n, r) => jn(e, typeof n != "symbol" ? n + "" : n, r), Se = (e, n, r) => n.has(e) || $e("Cannot " + r);
var C = (e, n, r) => (Se(e, n, "read from private field"), r ? r.call(e) : n.get(e)), A = (e, n, r) => n.has(e) ? $e("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), T = (e, n, r, i) => (Se(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), k = (e, n, r) => (Se(e, n, "access private method"), r);
const W = {
  retries: 3,
  // 默认最大重试次数
  retryDelay: 1e3,
  // 默认每次重试的间隔时间（毫秒）
  retryOnStatusCodes: [500, 502, 503, 504]
  // 默认重试的状态码
};
class $n {
  constructor() {
    be(this, "requestInterceptors", []);
    be(this, "responseInterceptors", []);
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
    r.retries = r.retries ?? W.retries, r.retryDelay = r.retryDelay ?? W.retryDelay;
    for (const c of this.requestInterceptors)
      r = await c(r);
    if (r.params) {
      const c = new URLSearchParams(r.params).toString();
      r.url += (r.url.includes("?") ? "&" : "?") + c;
    }
    r.method = r.method || "GET";
    const { timeout: i = 1e4 } = r;
    let o = 0;
    const t = new AbortController(), l = n.signal || t.signal, u = async () => {
      o++;
      const c = setTimeout(() => {
        t.abort();
      }, i);
      try {
        const f = await fetch(r.url, {
          method: r.method,
          headers: r.headers,
          body: r.body ? JSON.stringify(r.body) : void 0,
          signal: l
        });
        clearTimeout(c);
        let a = {
          data: f,
          status: f.status,
          statusText: f.statusText,
          headers: f.headers,
          config: r,
          ok: f.ok
        };
        for (const s of this.responseInterceptors)
          a = await s(a);
        return !f.ok && r.retries && o < r.retries ? (await new Promise((s) => setTimeout(s, r.retryDelay)), u()) : a;
      } catch (f) {
        if (f.name === "AbortError")
          throw new Error("Request timed out");
        if (r.retries && o < r.retries)
          return await new Promise((a) => setTimeout(a, r.retryDelay)), u();
        throw f;
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
async function tn(e, n) {
  const {
    retries: r = W.retries,
    retryDelay: i = W.retryDelay,
    retryOnStatusCodes: o = W.retryOnStatusCodes,
    onError: t,
    ...l
  } = n;
  let u = 0;
  const c = async () => {
    u++;
    try {
      const f = await Kn.request({ url: e, ...l });
      if (o.includes(f.status) && u <= r) {
        if (t) {
          const a = t(new Error(`Request failed with status ${f.status}`), u);
          a instanceof Promise && await a;
        }
        return await new Promise((a) => setTimeout(a, i)), c();
      }
      return f;
    } catch (f) {
      if (t) {
        const a = t(f, u);
        a instanceof Promise && await a;
      }
      if (u <= r)
        return await new Promise((a) => setTimeout(a, i)), c();
      throw f;
    }
  };
  return c();
}
const Kn = new $n(), Gn = "internal server error", qn = new Headers({
  "Content-type": "application/json"
}), Wn = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const Vn = new Headers({
  "Content-type": "text/html"
}), Qn = (e, n = Wn) => new Response(e, {
  status: 200,
  headers: n
}), Xn = (e, n = Vn) => new Response(e, {
  headers: n
}), Fe = (e = Gn, n = 500, r = qn) => Response.json(
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
function un(e) {
  return typeof e > "u" || e === null;
}
function Zn(e) {
  return typeof e == "object" && e !== null;
}
function Jn(e) {
  return Array.isArray(e) ? e : un(e) ? [] : [e];
}
function zn(e, n) {
  var r, i, o, t;
  if (n)
    for (t = Object.keys(n), r = 0, i = t.length; r < i; r += 1)
      o = t[r], e[o] = n[o];
  return e;
}
function er(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function nr(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var rr = un, ir = Zn, or = Jn, lr = er, tr = nr, ur = zn, w = {
  isNothing: rr,
  isObject: ir,
  toArray: or,
  repeat: lr,
  isNegativeZero: tr,
  extend: ur
};
function cn(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function Q(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = cn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Q.prototype = Object.create(Error.prototype);
Q.prototype.constructor = Q;
Q.prototype.toString = function(n) {
  return this.name + ": " + cn(this, n);
};
var b = Q;
function Te(e, n, r, i, o) {
  var t = "", l = "", u = Math.floor(o / 2) - 1;
  return i - n > u && (t = " ... ", n = i - u + t.length), r - i > u && (l = " ...", r = i + u - l.length), {
    str: t + e.slice(n, r).replace(/\t/g, "→") + l,
    pos: i - n + t.length
    // relative position
  };
}
function Oe(e, n) {
  return w.repeat(" ", n - e.length) + e;
}
function cr(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], o = [], t, l = -1; t = r.exec(e.buffer); )
    o.push(t.index), i.push(t.index + t[0].length), e.position <= t.index && l < 0 && (l = i.length - 2);
  l < 0 && (l = i.length - 1);
  var u = "", c, f, a = Math.min(e.line + n.linesAfter, o.length).toString().length, s = n.maxLength - (n.indent + a + 3);
  for (c = 1; c <= n.linesBefore && !(l - c < 0); c++)
    f = Te(
      e.buffer,
      i[l - c],
      o[l - c],
      e.position - (i[l] - i[l - c]),
      s
    ), u = w.repeat(" ", n.indent) + Oe((e.line - c + 1).toString(), a) + " | " + f.str + `
` + u;
  for (f = Te(e.buffer, i[l], o[l], e.position, s), u += w.repeat(" ", n.indent) + Oe((e.line + 1).toString(), a) + " | " + f.str + `
`, u += w.repeat("-", n.indent + a + 3 + f.pos) + `^
`, c = 1; c <= n.linesAfter && !(l + c >= o.length); c++)
    f = Te(
      e.buffer,
      i[l + c],
      o[l + c],
      e.position - (i[l] - i[l + c]),
      s
    ), u += w.repeat(" ", n.indent) + Oe((e.line + c + 1).toString(), a) + " | " + f.str + `
`;
  return u.replace(/\n$/, "");
}
var fr = cr, sr = [
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
], ar = [
  "scalar",
  "sequence",
  "mapping"
];
function pr(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function hr(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (sr.indexOf(r) === -1)
      throw new b('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = pr(n.styleAliases || null), ar.indexOf(this.kind) === -1)
    throw new b('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = hr;
function Ke(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var o = r.length;
    r.forEach(function(t, l) {
      t.tag === i.tag && t.kind === i.kind && t.multi === i.multi && (o = l);
    }), r[o] = i;
  }), r;
}
function dr() {
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
function Le(e) {
  return this.extend(e);
}
Le.prototype.extend = function(n) {
  var r = [], i = [];
  if (n instanceof _)
    i.push(n);
  else if (Array.isArray(n))
    i = i.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (r = r.concat(n.implicit)), n.explicit && (i = i.concat(n.explicit));
  else
    throw new b("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(t) {
    if (!(t instanceof _))
      throw new b("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (t.loadKind && t.loadKind !== "scalar")
      throw new b("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (t.multi)
      throw new b("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(t) {
    if (!(t instanceof _))
      throw new b("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(Le.prototype);
  return o.implicit = (this.implicit || []).concat(r), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = Ke(o, "implicit"), o.compiledExplicit = Ke(o, "explicit"), o.compiledTypeMap = dr(o.compiledImplicit, o.compiledExplicit), o;
};
var gr = Le, mr = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), xr = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Cr = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Ar = new gr({
  explicit: [
    mr,
    xr,
    Cr
  ]
});
function vr(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function yr() {
  return null;
}
function wr(e) {
  return e === null;
}
var _r = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: vr,
  construct: yr,
  predicate: wr,
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
function Er(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function br(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Sr(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Tr = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Er,
  construct: br,
  predicate: Sr,
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
function Or(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function kr(e) {
  return 48 <= e && e <= 55;
}
function Fr(e) {
  return 48 <= e && e <= 57;
}
function Lr(e) {
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
          if (!Or(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && o !== "_";
    }
    if (o === "o") {
      for (r++; r < n; r++)
        if (o = e[r], o !== "_") {
          if (!kr(e.charCodeAt(r))) return !1;
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
function Ir(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function Nr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !w.isNegativeZero(e);
}
var Pr = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Lr,
  construct: Ir,
  predicate: Nr,
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
}), Rr = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Dr(e) {
  return !(e === null || !Rr.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Mr(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var Ur = /^[-+]?[0-9]+e/;
function Br(e, n) {
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
  return r = e.toString(10), Ur.test(r) ? r.replace("e", ".e") : r;
}
function Hr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || w.isNegativeZero(e));
}
var Yr = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Dr,
  construct: Mr,
  predicate: Hr,
  represent: Br,
  defaultStyle: "lowercase"
}), jr = Ar.extend({
  implicit: [
    _r,
    Tr,
    Pr,
    Yr
  ]
}), $r = jr, fn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), sn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Kr(e) {
  return e === null ? !1 : fn.exec(e) !== null || sn.exec(e) !== null;
}
function Gr(e) {
  var n, r, i, o, t, l, u, c = 0, f = null, a, s, h;
  if (n = fn.exec(e), n === null && (n = sn.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(r, i, o));
  if (t = +n[4], l = +n[5], u = +n[6], n[7]) {
    for (c = n[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return n[9] && (a = +n[10], s = +(n[11] || 0), f = (a * 60 + s) * 6e4, n[9] === "-" && (f = -f)), h = new Date(Date.UTC(r, i, o, t, l, u, c)), f && h.setTime(h.getTime() - f), h;
}
function qr(e) {
  return e.toISOString();
}
var Wr = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Kr,
  construct: Gr,
  instanceOf: Date,
  represent: qr
});
function Vr(e) {
  return e === "<<" || e === null;
}
var Qr = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Vr
}), Me = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Xr(e) {
  if (e === null) return !1;
  var n, r, i = 0, o = e.length, t = Me;
  for (r = 0; r < o; r++)
    if (n = t.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function Zr(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), o = i.length, t = Me, l = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(l >> 16 & 255), u.push(l >> 8 & 255), u.push(l & 255)), l = l << 6 | t.indexOf(i.charAt(n));
  return r = o % 4 * 6, r === 0 ? (u.push(l >> 16 & 255), u.push(l >> 8 & 255), u.push(l & 255)) : r === 18 ? (u.push(l >> 10 & 255), u.push(l >> 2 & 255)) : r === 12 && u.push(l >> 4 & 255), new Uint8Array(u);
}
function Jr(e) {
  var n = "", r = 0, i, o, t = e.length, l = Me;
  for (i = 0; i < t; i++)
    i % 3 === 0 && i && (n += l[r >> 18 & 63], n += l[r >> 12 & 63], n += l[r >> 6 & 63], n += l[r & 63]), r = (r << 8) + e[i];
  return o = t % 3, o === 0 ? (n += l[r >> 18 & 63], n += l[r >> 12 & 63], n += l[r >> 6 & 63], n += l[r & 63]) : o === 2 ? (n += l[r >> 10 & 63], n += l[r >> 4 & 63], n += l[r << 2 & 63], n += l[64]) : o === 1 && (n += l[r >> 2 & 63], n += l[r << 4 & 63], n += l[64], n += l[64]), n;
}
function zr(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var ei = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Xr,
  construct: Zr,
  predicate: zr,
  represent: Jr
}), ni = Object.prototype.hasOwnProperty, ri = Object.prototype.toString;
function ii(e) {
  if (e === null) return !0;
  var n = [], r, i, o, t, l, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (o = u[r], l = !1, ri.call(o) !== "[object Object]") return !1;
    for (t in o)
      if (ni.call(o, t))
        if (!l) l = !0;
        else return !1;
    if (!l) return !1;
    if (n.indexOf(t) === -1) n.push(t);
    else return !1;
  }
  return !0;
}
function oi(e) {
  return e !== null ? e : [];
}
var li = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: ii,
  construct: oi
}), ti = Object.prototype.toString;
function ui(e) {
  if (e === null) return !0;
  var n, r, i, o, t, l = e;
  for (t = new Array(l.length), n = 0, r = l.length; n < r; n += 1) {
    if (i = l[n], ti.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
    t[n] = [o[0], i[o[0]]];
  }
  return !0;
}
function ci(e) {
  if (e === null) return [];
  var n, r, i, o, t, l = e;
  for (t = new Array(l.length), n = 0, r = l.length; n < r; n += 1)
    i = l[n], o = Object.keys(i), t[n] = [o[0], i[o[0]]];
  return t;
}
var fi = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: ui,
  construct: ci
}), si = Object.prototype.hasOwnProperty;
function ai(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (si.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function pi(e) {
  return e !== null ? e : {};
}
var hi = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: ai,
  construct: pi
}), an = $r.extend({
  implicit: [
    Wr,
    Qr
  ],
  explicit: [
    ei,
    li,
    fi,
    hi
  ]
}), N = Object.prototype.hasOwnProperty, me = 1, pn = 2, hn = 3, xe = 4, ke = 1, di = 2, Ge = 3, gi = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, mi = /[\x85\u2028\u2029]/, xi = /[,\[\]\{\}]/, dn = /^(?:!|!!|![a-z\-]+!)$/i, gn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function qe(e) {
  return Object.prototype.toString.call(e);
}
function F(e) {
  return e === 10 || e === 13;
}
function U(e) {
  return e === 9 || e === 32;
}
function S(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Y(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Ci(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function Ai(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function vi(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function We(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function yi(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var mn = new Array(256), xn = new Array(256);
for (var B = 0; B < 256; B++)
  mn[B] = We(B) ? 1 : 0, xn[B] = We(B);
function wi(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || an, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Cn(e, n) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = fr(r), new b(n, r);
}
function p(e, n) {
  throw Cn(e, n);
}
function Ce(e, n) {
  e.onWarning && e.onWarning.call(null, Cn(e, n));
}
var Ve = {
  YAML: function(n, r, i) {
    var o, t, l;
    n.version !== null && p(n, "duplication of %YAML directive"), i.length !== 1 && p(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), o === null && p(n, "ill-formed argument of the YAML directive"), t = parseInt(o[1], 10), l = parseInt(o[2], 10), t !== 1 && p(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = l < 2, l !== 1 && l !== 2 && Ce(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var o, t;
    i.length !== 2 && p(n, "TAG directive accepts exactly two arguments"), o = i[0], t = i[1], dn.test(o) || p(n, "ill-formed tag handle (first argument) of the TAG directive"), N.call(n.tagMap, o) && p(n, 'there is a previously declared suffix for "' + o + '" tag handle'), gn.test(t) || p(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      t = decodeURIComponent(t);
    } catch {
      p(n, "tag prefix is malformed: " + t);
    }
    n.tagMap[o] = t;
  }
};
function I(e, n, r, i) {
  var o, t, l, u;
  if (n < r) {
    if (u = e.input.slice(n, r), i)
      for (o = 0, t = u.length; o < t; o += 1)
        l = u.charCodeAt(o), l === 9 || 32 <= l && l <= 1114111 || p(e, "expected valid JSON character");
    else gi.test(u) && p(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function Qe(e, n, r, i) {
  var o, t, l, u;
  for (w.isObject(r) || p(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(r), l = 0, u = o.length; l < u; l += 1)
    t = o[l], N.call(n, t) || (n[t] = r[t], i[t] = !0);
}
function j(e, n, r, i, o, t, l, u, c) {
  var f, a;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), f = 0, a = o.length; f < a; f += 1)
      Array.isArray(o[f]) && p(e, "nested arrays are not supported inside keys"), typeof o == "object" && qe(o[f]) === "[object Object]" && (o[f] = "[object Object]");
  if (typeof o == "object" && qe(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(t))
      for (f = 0, a = t.length; f < a; f += 1)
        Qe(e, n, t[f], r);
    else
      Qe(e, n, t, r);
  else
    !e.json && !N.call(r, o) && N.call(n, o) && (e.line = l || e.line, e.lineStart = u || e.lineStart, e.position = c || e.position, p(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    }) : n[o] = t, delete r[o];
  return n;
}
function Ue(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : p(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function y(e, n, r) {
  for (var i = 0, o = e.input.charCodeAt(e.position); o !== 0; ) {
    for (; U(o); )
      o === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), o = e.input.charCodeAt(++e.position);
    if (n && o === 35)
      do
        o = e.input.charCodeAt(++e.position);
      while (o !== 10 && o !== 13 && o !== 0);
    if (F(o))
      for (Ue(e), o = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; o === 32; )
        e.lineIndent++, o = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && Ce(e, "deficient indentation"), i;
}
function we(e) {
  var n = e.position, r;
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || S(r)));
}
function Be(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += w.repeat(`
`, n - 1));
}
function _i(e, n, r) {
  var i, o, t, l, u, c, f, a, s = e.kind, h = e.result, d;
  if (d = e.input.charCodeAt(e.position), S(d) || Y(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (o = e.input.charCodeAt(e.position + 1), S(o) || r && Y(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", t = l = e.position, u = !1; d !== 0; ) {
    if (d === 58) {
      if (o = e.input.charCodeAt(e.position + 1), S(o) || r && Y(o))
        break;
    } else if (d === 35) {
      if (i = e.input.charCodeAt(e.position - 1), S(i))
        break;
    } else {
      if (e.position === e.lineStart && we(e) || r && Y(d))
        break;
      if (F(d))
        if (c = e.line, f = e.lineStart, a = e.lineIndent, y(e, !1, -1), e.lineIndent >= n) {
          u = !0, d = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = l, e.line = c, e.lineStart = f, e.lineIndent = a;
          break;
        }
    }
    u && (I(e, t, l, !1), Be(e, e.line - c), t = l = e.position, u = !1), U(d) || (l = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return I(e, t, l, !1), e.result ? !0 : (e.kind = s, e.result = h, !1);
}
function Ei(e, n) {
  var r, i, o;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (I(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else F(r) ? (I(e, i, o, !0), Be(e, y(e, !1, n)), i = o = e.position) : e.position === e.lineStart && we(e) ? p(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  p(e, "unexpected end of the stream within a single quoted scalar");
}
function bi(e, n) {
  var r, i, o, t, l, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return I(e, r, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (I(e, r, e.position, !0), u = e.input.charCodeAt(++e.position), F(u))
        y(e, !1, n);
      else if (u < 256 && mn[u])
        e.result += xn[u], e.position++;
      else if ((l = Ai(u)) > 0) {
        for (o = l, t = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (l = Ci(u)) >= 0 ? t = (t << 4) + l : p(e, "expected hexadecimal character");
        e.result += yi(t), e.position++;
      } else
        p(e, "unknown escape sequence");
      r = i = e.position;
    } else F(u) ? (I(e, r, i, !0), Be(e, y(e, !1, n)), r = i = e.position) : e.position === e.lineStart && we(e) ? p(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  p(e, "unexpected end of the stream within a double quoted scalar");
}
function Si(e, n) {
  var r = !0, i, o, t, l = e.tag, u, c = e.anchor, f, a, s, h, d, g = /* @__PURE__ */ Object.create(null), x, v, O, m;
  if (m = e.input.charCodeAt(e.position), m === 91)
    a = 93, d = !1, u = [];
  else if (m === 123)
    a = 125, d = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), m = e.input.charCodeAt(++e.position); m !== 0; ) {
    if (y(e, !0, n), m = e.input.charCodeAt(e.position), m === a)
      return e.position++, e.tag = l, e.anchor = c, e.kind = d ? "mapping" : "sequence", e.result = u, !0;
    r ? m === 44 && p(e, "expected the node content, but found ','") : p(e, "missed comma between flow collection entries"), v = x = O = null, s = h = !1, m === 63 && (f = e.input.charCodeAt(e.position + 1), S(f) && (s = h = !0, e.position++, y(e, !0, n))), i = e.line, o = e.lineStart, t = e.position, $(e, n, me, !1, !0), v = e.tag, x = e.result, y(e, !0, n), m = e.input.charCodeAt(e.position), (h || e.line === i) && m === 58 && (s = !0, m = e.input.charCodeAt(++e.position), y(e, !0, n), $(e, n, me, !1, !0), O = e.result), d ? j(e, u, g, v, x, O, i, o, t) : s ? u.push(j(e, null, g, v, x, O, i, o, t)) : u.push(x), y(e, !0, n), m = e.input.charCodeAt(e.position), m === 44 ? (r = !0, m = e.input.charCodeAt(++e.position)) : r = !1;
  }
  p(e, "unexpected end of the stream within a flow collection");
}
function Ti(e, n) {
  var r, i, o = ke, t = !1, l = !1, u = n, c = 0, f = !1, a, s;
  if (s = e.input.charCodeAt(e.position), s === 124)
    i = !1;
  else if (s === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; s !== 0; )
    if (s = e.input.charCodeAt(++e.position), s === 43 || s === 45)
      ke === o ? o = s === 43 ? Ge : di : p(e, "repeat of a chomping mode identifier");
    else if ((a = vi(s)) >= 0)
      a === 0 ? p(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : l ? p(e, "repeat of an indentation width identifier") : (u = n + a - 1, l = !0);
    else
      break;
  if (U(s)) {
    do
      s = e.input.charCodeAt(++e.position);
    while (U(s));
    if (s === 35)
      do
        s = e.input.charCodeAt(++e.position);
      while (!F(s) && s !== 0);
  }
  for (; s !== 0; ) {
    for (Ue(e), e.lineIndent = 0, s = e.input.charCodeAt(e.position); (!l || e.lineIndent < u) && s === 32; )
      e.lineIndent++, s = e.input.charCodeAt(++e.position);
    if (!l && e.lineIndent > u && (u = e.lineIndent), F(s)) {
      c++;
      continue;
    }
    if (e.lineIndent < u) {
      o === Ge ? e.result += w.repeat(`
`, t ? 1 + c : c) : o === ke && t && (e.result += `
`);
      break;
    }
    for (i ? U(s) ? (f = !0, e.result += w.repeat(`
`, t ? 1 + c : c)) : f ? (f = !1, e.result += w.repeat(`
`, c + 1)) : c === 0 ? t && (e.result += " ") : e.result += w.repeat(`
`, c) : e.result += w.repeat(`
`, t ? 1 + c : c), t = !0, l = !0, c = 0, r = e.position; !F(s) && s !== 0; )
      s = e.input.charCodeAt(++e.position);
    I(e, r, e.position, !1);
  }
  return !0;
}
function Xe(e, n) {
  var r, i = e.tag, o = e.anchor, t = [], l, u = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = t), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), !(c !== 45 || (l = e.input.charCodeAt(e.position + 1), !S(l)))); ) {
    if (u = !0, e.position++, y(e, !0, -1) && e.lineIndent <= n) {
      t.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, $(e, n, hn, !1, !0), t.push(e.result), y(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && c !== 0)
      p(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = t, !0) : !1;
}
function Oi(e, n, r) {
  var i, o, t, l, u, c, f = e.tag, a = e.anchor, s = {}, h = /* @__PURE__ */ Object.create(null), d = null, g = null, x = null, v = !1, O = !1, m;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), m = e.input.charCodeAt(e.position); m !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), t = e.line, (m === 63 || m === 58) && S(i))
      m === 63 ? (v && (j(e, s, h, d, g, null, l, u, c), d = g = x = null), O = !0, v = !0, o = !0) : v ? (v = !1, o = !0) : p(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, m = i;
    else {
      if (l = e.line, u = e.lineStart, c = e.position, !$(e, r, pn, !1, !0))
        break;
      if (e.line === t) {
        for (m = e.input.charCodeAt(e.position); U(m); )
          m = e.input.charCodeAt(++e.position);
        if (m === 58)
          m = e.input.charCodeAt(++e.position), S(m) || p(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (j(e, s, h, d, g, null, l, u, c), d = g = x = null), O = !0, v = !1, o = !1, d = e.tag, g = e.result;
        else if (O)
          p(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = a, !0;
      } else if (O)
        p(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = a, !0;
    }
    if ((e.line === t || e.lineIndent > n) && (v && (l = e.line, u = e.lineStart, c = e.position), $(e, n, xe, !0, o) && (v ? g = e.result : x = e.result), v || (j(e, s, h, d, g, x, l, u, c), d = g = x = null), y(e, !0, -1), m = e.input.charCodeAt(e.position)), (e.line === t || e.lineIndent > n) && m !== 0)
      p(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return v && j(e, s, h, d, g, null, l, u, c), O && (e.tag = f, e.anchor = a, e.kind = "mapping", e.result = s), O;
}
function ki(e) {
  var n, r = !1, i = !1, o, t, l;
  if (l = e.input.charCodeAt(e.position), l !== 33) return !1;
  if (e.tag !== null && p(e, "duplication of a tag property"), l = e.input.charCodeAt(++e.position), l === 60 ? (r = !0, l = e.input.charCodeAt(++e.position)) : l === 33 ? (i = !0, o = "!!", l = e.input.charCodeAt(++e.position)) : o = "!", n = e.position, r) {
    do
      l = e.input.charCodeAt(++e.position);
    while (l !== 0 && l !== 62);
    e.position < e.length ? (t = e.input.slice(n, e.position), l = e.input.charCodeAt(++e.position)) : p(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; l !== 0 && !S(l); )
      l === 33 && (i ? p(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), dn.test(o) || p(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), l = e.input.charCodeAt(++e.position);
    t = e.input.slice(n, e.position), xi.test(t) && p(e, "tag suffix cannot contain flow indicator characters");
  }
  t && !gn.test(t) && p(e, "tag name cannot contain such characters: " + t);
  try {
    t = decodeURIComponent(t);
  } catch {
    p(e, "tag name is malformed: " + t);
  }
  return r ? e.tag = t : N.call(e.tagMap, o) ? e.tag = e.tagMap[o] + t : o === "!" ? e.tag = "!" + t : o === "!!" ? e.tag = "tag:yaml.org,2002:" + t : p(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Fi(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && p(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !S(r) && !Y(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Li(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !S(i) && !Y(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), N.call(e.anchorMap, r) || p(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], y(e, !0, -1), !0;
}
function $(e, n, r, i, o) {
  var t, l, u, c = 1, f = !1, a = !1, s, h, d, g, x, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, t = l = u = xe === r || hn === r, i && y(e, !0, -1) && (f = !0, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)), c === 1)
    for (; ki(e) || Fi(e); )
      y(e, !0, -1) ? (f = !0, u = t, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)) : u = !1;
  if (u && (u = f || o), (c === 1 || xe === r) && (me === r || pn === r ? x = n : x = n + 1, v = e.position - e.lineStart, c === 1 ? u && (Xe(e, v) || Oi(e, v, x)) || Si(e, x) ? a = !0 : (l && Ti(e, x) || Ei(e, x) || bi(e, x) ? a = !0 : Li(e) ? (a = !0, (e.tag !== null || e.anchor !== null) && p(e, "alias node should not have any properties")) : _i(e, x, me === r) && (a = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (a = u && Xe(e, v))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && p(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), s = 0, h = e.implicitTypes.length; s < h; s += 1)
      if (g = e.implicitTypes[s], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (N.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, d = e.typeMap.multi[e.kind || "fallback"], s = 0, h = d.length; s < h; s += 1)
        if (e.tag.slice(0, d[s].tag.length) === d[s].tag) {
          g = d[s];
          break;
        }
    g || p(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && p(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : p(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || a;
}
function Ii(e) {
  var n = e.position, r, i, o, t = !1, l;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (l = e.input.charCodeAt(e.position)) !== 0 && (y(e, !0, -1), l = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || l !== 37)); ) {
    for (t = !0, l = e.input.charCodeAt(++e.position), r = e.position; l !== 0 && !S(l); )
      l = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), o = [], i.length < 1 && p(e, "directive name must not be less than one character in length"); l !== 0; ) {
      for (; U(l); )
        l = e.input.charCodeAt(++e.position);
      if (l === 35) {
        do
          l = e.input.charCodeAt(++e.position);
        while (l !== 0 && !F(l));
        break;
      }
      if (F(l)) break;
      for (r = e.position; l !== 0 && !S(l); )
        l = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(r, e.position));
    }
    l !== 0 && Ue(e), N.call(Ve, i) ? Ve[i](e, i, o) : Ce(e, 'unknown document directive "' + i + '"');
  }
  if (y(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, y(e, !0, -1)) : t && p(e, "directives end mark is expected"), $(e, e.lineIndent - 1, xe, !1, !0), y(e, !0, -1), e.checkLineBreaks && mi.test(e.input.slice(n, e.position)) && Ce(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && we(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, y(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    p(e, "end of the stream or a document separator is expected");
  else
    return;
}
function An(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new wi(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, p(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Ii(r);
  return r.documents;
}
function Ni(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = An(e, r);
  if (typeof n != "function")
    return i;
  for (var o = 0, t = i.length; o < t; o += 1)
    n(i[o]);
}
function Pi(e, n) {
  var r = An(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new b("expected a single document in the stream, but found more");
  }
}
var Ri = Ni, Di = Pi, Mi = {
  loadAll: Ri,
  load: Di
}, vn = Object.prototype.toString, yn = Object.prototype.hasOwnProperty, He = 65279, Ui = 9, X = 10, Bi = 13, Hi = 32, Yi = 33, ji = 34, Ie = 35, $i = 37, Ki = 38, Gi = 39, qi = 42, wn = 44, Wi = 45, Ae = 58, Vi = 61, Qi = 62, Xi = 63, Zi = 64, _n = 91, En = 93, Ji = 96, bn = 123, zi = 124, Sn = 125, E = {};
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
var eo = [
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
], no = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function ro(e, n) {
  var r, i, o, t, l, u, c;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), o = 0, t = i.length; o < t; o += 1)
    l = i[o], u = String(n[l]), l.slice(0, 2) === "!!" && (l = "tag:yaml.org,2002:" + l.slice(2)), c = e.compiledTypeMap.fallback[l], c && yn.call(c.styleAliases, u) && (u = c.styleAliases[u]), r[l] = u;
  return r;
}
function io(e) {
  var n, r, i;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new b("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + w.repeat("0", i - n.length) + n;
}
var oo = 1, Z = 2;
function lo(e) {
  this.schema = e.schema || an, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = w.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = ro(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Z : oo, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ze(e, n) {
  for (var r = w.repeat(" ", n), i = 0, o = -1, t = "", l, u = e.length; i < u; )
    o = e.indexOf(`
`, i), o === -1 ? (l = e.slice(i), i = u) : (l = e.slice(i, o + 1), i = o + 1), l.length && l !== `
` && (t += r), t += l;
  return t;
}
function Ne(e, n) {
  return `
` + w.repeat(" ", e.indent * n);
}
function to(e, n) {
  var r, i, o;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (o = e.implicitTypes[r], o.resolve(n))
      return !0;
  return !1;
}
function ve(e) {
  return e === Hi || e === Ui;
}
function J(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== He || 65536 <= e && e <= 1114111;
}
function Je(e) {
  return J(e) && e !== He && e !== Bi && e !== X;
}
function ze(e, n, r) {
  var i = Je(e), o = i && !ve(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== wn && e !== _n && e !== En && e !== bn && e !== Sn) && e !== Ie && !(n === Ae && !o) || Je(n) && !ve(n) && e === Ie || n === Ae && o
  );
}
function uo(e) {
  return J(e) && e !== He && !ve(e) && e !== Wi && e !== Xi && e !== Ae && e !== wn && e !== _n && e !== En && e !== bn && e !== Sn && e !== Ie && e !== Ki && e !== qi && e !== Yi && e !== zi && e !== Vi && e !== Qi && e !== Gi && e !== ji && e !== $i && e !== Zi && e !== Ji;
}
function co(e) {
  return !ve(e) && e !== Ae;
}
function q(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function Tn(e) {
  var n = /^\n* /;
  return n.test(e);
}
var On = 1, Pe = 2, kn = 3, Fn = 4, H = 5;
function fo(e, n, r, i, o, t, l, u) {
  var c, f = 0, a = null, s = !1, h = !1, d = i !== -1, g = -1, x = uo(q(e, 0)) && co(q(e, e.length - 1));
  if (n || l)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = q(e, c), !J(f))
        return H;
      x = x && ze(f, a, u), a = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = q(e, c), f === X)
        s = !0, d && (h = h || // Foldable line = too long, and not more-indented.
        c - g - 1 > i && e[g + 1] !== " ", g = c);
      else if (!J(f))
        return H;
      x = x && ze(f, a, u), a = f;
    }
    h = h || d && c - g - 1 > i && e[g + 1] !== " ";
  }
  return !s && !h ? x && !l && !o(e) ? On : t === Z ? H : Pe : r > 9 && Tn(e) ? H : l ? t === Z ? H : Pe : h ? Fn : kn;
}
function so(e, n, r, i, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === Z ? '""' : "''";
    if (!e.noCompatMode && (eo.indexOf(n) !== -1 || no.test(n)))
      return e.quotingType === Z ? '"' + n + '"' : "'" + n + "'";
    var t = e.indent * Math.max(1, r), l = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - t), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function c(f) {
      return to(e, f);
    }
    switch (fo(
      n,
      u,
      e.indent,
      l,
      c,
      e.quotingType,
      e.forceQuotes && !i,
      o
    )) {
      case On:
        return n;
      case Pe:
        return "'" + n.replace(/'/g, "''") + "'";
      case kn:
        return "|" + en(n, e.indent) + nn(Ze(n, t));
      case Fn:
        return ">" + en(n, e.indent) + nn(Ze(ao(n, l), t));
      case H:
        return '"' + po(n) + '"';
      default:
        throw new b("impossible error: invalid scalar style");
    }
  }();
}
function en(e, n) {
  var r = Tn(e) ? String(n) : "", i = e[e.length - 1] === `
`, o = i && (e[e.length - 2] === `
` || e === `
`), t = o ? "+" : i ? "" : "-";
  return r + t + `
`;
}
function nn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function ao(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, rn(e.slice(0, f), n);
  }(), o = e[0] === `
` || e[0] === " ", t, l; l = r.exec(e); ) {
    var u = l[1], c = l[2];
    t = c[0] === " ", i += u + (!o && !t && c !== "" ? `
` : "") + rn(c, n), o = t;
  }
  return i;
}
function rn(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, o = 0, t, l = 0, u = 0, c = ""; i = r.exec(e); )
    u = i.index, u - o > n && (t = l > o ? l : u, c += `
` + e.slice(o, t), o = t + 1), l = u;
  return c += `
`, e.length - o > n && l > o ? c += e.slice(o, l) + `
` + e.slice(l + 1) : c += e.slice(o), c.slice(1);
}
function po(e) {
  for (var n = "", r = 0, i, o = 0; o < e.length; r >= 65536 ? o += 2 : o++)
    r = q(e, o), i = E[r], !i && J(r) ? (n += e[o], r >= 65536 && (n += e[o + 1])) : n += i || io(r);
  return n;
}
function ho(e, n, r) {
  var i = "", o = e.tag, t, l, u;
  for (t = 0, l = r.length; t < l; t += 1)
    u = r[t], e.replacer && (u = e.replacer.call(r, String(t), u)), (L(e, n, u, !1, !1) || typeof u > "u" && L(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function on(e, n, r, i) {
  var o = "", t = e.tag, l, u, c;
  for (l = 0, u = r.length; l < u; l += 1)
    c = r[l], e.replacer && (c = e.replacer.call(r, String(l), c)), (L(e, n + 1, c, !0, !0, !1, !0) || typeof c > "u" && L(e, n + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += Ne(e, n)), e.dump && X === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = t, e.dump = o || "[]";
}
function go(e, n, r) {
  var i = "", o = e.tag, t = Object.keys(r), l, u, c, f, a;
  for (l = 0, u = t.length; l < u; l += 1)
    a = "", i !== "" && (a += ", "), e.condenseFlow && (a += '"'), c = t[l], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), L(e, n, c, !1, !1) && (e.dump.length > 1024 && (a += "? "), a += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), L(e, n, f, !1, !1) && (a += e.dump, i += a));
  e.tag = o, e.dump = "{" + i + "}";
}
function mo(e, n, r, i) {
  var o = "", t = e.tag, l = Object.keys(r), u, c, f, a, s, h;
  if (e.sortKeys === !0)
    l.sort();
  else if (typeof e.sortKeys == "function")
    l.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new b("sortKeys must be a boolean or a function");
  for (u = 0, c = l.length; u < c; u += 1)
    h = "", (!i || o !== "") && (h += Ne(e, n)), f = l[u], a = r[f], e.replacer && (a = e.replacer.call(r, f, a)), L(e, n + 1, f, !0, !0, !0) && (s = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, s && (e.dump && X === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, s && (h += Ne(e, n)), L(e, n + 1, a, !0, s) && (e.dump && X === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, o += h));
  e.tag = t, e.dump = o || "{}";
}
function ln(e, n, r) {
  var i, o, t, l, u, c;
  for (o = r ? e.explicitTypes : e.implicitTypes, t = 0, l = o.length; t < l; t += 1)
    if (u = o[t], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (r ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (c = e.styleMap[u.tag] || u.defaultStyle, vn.call(u.represent) === "[object Function]")
          i = u.represent(n, c);
        else if (yn.call(u.represent, c))
          i = u.represent[c](n, c);
        else
          throw new b("!<" + u.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function L(e, n, r, i, o, t, l) {
  e.tag = null, e.dump = r, ln(e, r, !1) || ln(e, r, !0);
  var u = vn.call(e.dump), c = i, f;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var a = u === "[object Object]" || u === "[object Array]", s, h;
  if (a && (s = e.duplicates.indexOf(r), h = s !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && n > 0) && (o = !1), h && e.usedDuplicates[s])
    e.dump = "*ref_" + s;
  else {
    if (a && h && !e.usedDuplicates[s] && (e.usedDuplicates[s] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (mo(e, n, e.dump, o), h && (e.dump = "&ref_" + s + e.dump)) : (go(e, n, e.dump), h && (e.dump = "&ref_" + s + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !l && n > 0 ? on(e, n - 1, e.dump, o) : on(e, n, e.dump, o), h && (e.dump = "&ref_" + s + e.dump)) : (ho(e, n, e.dump), h && (e.dump = "&ref_" + s + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && so(e, e.dump, n, t, c);
    else {
      if (u === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new b("unacceptable kind of an object to dump " + u);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function xo(e, n) {
  var r = [], i = [], o, t;
  for (Re(e, r, i), o = 0, t = i.length; o < t; o += 1)
    n.duplicates.push(r[i[o]]);
  n.usedDuplicates = new Array(t);
}
function Re(e, n, r) {
  var i, o, t;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      r.indexOf(o) === -1 && r.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, t = e.length; o < t; o += 1)
        Re(e[o], n, r);
    else
      for (i = Object.keys(e), o = 0, t = i.length; o < t; o += 1)
        Re(e[i[o]], n, r);
}
function Co(e, n) {
  n = n || {};
  var r = new lo(n);
  r.noRefs || xo(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), L(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var Ao = Co, vo = {
  dump: Ao
}, Ye = Mi.load, yo = vo.dump;
function _e(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function je(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
function wo(e, n) {
  const r = (i) => i;
  try {
    return e ? decodeURIComponent(e) : r(e);
  } catch {
    return r(e);
  }
}
const De = "getSub";
var z, ee, ne, ye;
class _o {
  constructor() {
    A(this, z, ["localhost", "127.0.0.1", "abc.cba.com"]);
    A(this, ee, ["AES_256_GCM", "CHACHA20_POLY1305", "AES_128_GCM", "CHACHA20_IETF"]);
    A(this, ne, 1024);
    A(this, ye, 65535);
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
    return Math.floor(Math.random() * (C(this, ye) - C(this, ne) + 1) + C(this, ne)).toString();
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
    return C(this, ee)[Math.floor(Math.random() * C(this, ee).length)];
  }
}
z = new WeakMap(), ee = new WeakMap(), ne = new WeakMap(), ye = new WeakMap();
var re, ie, oe, le;
class Ee extends _o {
  constructor() {
    super();
    /** * @description vps原始配置 */
    A(this, re, {});
    /** * @description 混淆配置 */
    A(this, ie, {});
    /** * @description 原始备注 */
    A(this, oe, "");
    /** * @description 混淆备注 */
    A(this, le, "");
    T(this, le, this.getUUID());
  }
  /**
   * @description 设置原始配置
   * @param {Partial<T>} config
   */
  setConfuseConfig(r) {
    T(this, ie, r);
  }
  /**
   * @description 设置混淆配置
   * @param {Partial<T>} config
   * @param {string} ps
   */
  setOriginConfig(r, i) {
    T(this, re, r), T(this, oe, decodeURIComponent(i));
  }
  /**
   * @description 原始备注
   * @example '#originPs'
   */
  get originPs() {
    return C(this, oe);
  }
  /**
   * @description 原始配置
   */
  get originConfig() {
    return C(this, re);
  }
  /**
   * @description 混淆备注
   * @example 'confusePs'
   */
  get confusePs() {
    return C(this, le);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return C(this, ie);
  }
}
re = new WeakMap(), ie = new WeakMap(), oe = new WeakMap(), le = new WeakMap();
var te;
const V = class V {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(C(V, te));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(C(V, te));
  }
};
te = new WeakMap(), A(V, te, "^LINK_TO^");
let P = V;
function Eo(e) {
  try {
    return _e(e), "base64";
  } catch {
    try {
      return Ye(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function bo(e) {
  return _e(e).split(`
`).filter(Boolean).map((r) => decodeURIComponent(r));
}
var ue, ce, M, R, Ln, In, Nn;
class So extends Ee {
  constructor(r) {
    super();
    A(this, R);
    /** @description 原始链接 */
    A(this, ue, "");
    /** @description 混淆链接 */
    A(this, ce, "");
    /** @description 解析的私有配置 */
    A(this, M, {});
    k(this, R, Ln).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.cipher = C(this, M).originEncryptionProtocol, r.password = C(this, M).originPassword, r;
  }
  get confuseLink() {
    return C(this, ce);
  }
  get originLink() {
    return C(this, ue);
  }
}
ue = new WeakMap(), ce = new WeakMap(), M = new WeakMap(), R = new WeakSet(), Ln = function(r) {
  T(this, ue, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash);
  const o = this.getEncrtptionProtocol(), t = this.getPassword();
  k(this, R, In).call(this, i.username), this.setConfuseConfig({
    username: encodeURIComponent(je(`${o}:${t}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: P.setPs(this.originPs, this.confusePs)
  }), k(this, R, Nn).call(this);
}, In = function(r) {
  const [i, o] = _e(decodeURIComponent(r)).split(":");
  C(this, M).originEncryptionProtocol = i, C(this, M).originPassword = o;
}, Nn = function() {
  const { username: r, hostname: i, port: o, search: t, hash: l } = this.confuseConfig;
  T(this, ce, `ss://${r}@${i}:${o}${t ?? ""}${l}`);
};
var fe, se, K, Pn, Rn;
class To extends Ee {
  constructor(r) {
    super();
    A(this, K);
    /** * @description 原始链接 */
    A(this, fe, "");
    /** * @description 混淆链接 */
    A(this, se, "");
    k(this, K, Pn).call(this, r);
  }
  restore(r, i) {
    var o, t;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r.sni = ((t = this.originConfig) == null ? void 0 : t.hostname) ?? "", r;
  }
  get confuseLink() {
    return C(this, se);
  }
  get originLink() {
    return C(this, fe);
  }
}
fe = new WeakMap(), se = new WeakMap(), K = new WeakSet(), Pn = function(r) {
  T(this, fe, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: P.setPs(this.originPs, this.confusePs)
  }), k(this, K, Rn).call(this);
}, Rn = function() {
  const { password: r, hostname: i, port: o, search: t, hash: l } = this.confuseConfig;
  T(this, se, `trojan://${r}@${i}:${o}${t}${l}`);
};
var ae, pe, G, Dn, Mn;
class Oo extends Ee {
  constructor(r) {
    super();
    A(this, G);
    /** * @description 原始链接 */
    A(this, ae, "");
    /** * @description 混淆链接 */
    A(this, pe, "");
    k(this, G, Dn).call(this, r);
  }
  restore(r, i) {
    var o;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = this.originConfig.username ?? "", r;
  }
  get confuseLink() {
    return C(this, pe);
  }
  get originLink() {
    return C(this, ae);
  }
}
ae = new WeakMap(), pe = new WeakMap(), G = new WeakSet(), Dn = function(r) {
  T(this, ae, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: P.setPs(this.originPs, this.confusePs)
  }), k(this, G, Mn).call(this);
}, Mn = function() {
  const { password: r, hostname: i, port: o, search: t, hash: l } = this.confuseConfig;
  T(this, pe, `vless://${r}@${i}:${o}${t}${l}`);
};
var he, de, D, Un, Bn, Hn;
class ko extends Ee {
  constructor(r) {
    super();
    A(this, D);
    /** * @description 原始链接 */
    A(this, he, "");
    /** * @description 混淆链接 */
    A(this, de, "");
    k(this, D, Un).call(this, r);
  }
  restore(r, i) {
    var o, t;
    return k(this, D, Hn).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = ((t = this.originConfig) == null ? void 0 : t.id) ?? "", r;
  }
  get confuseLink() {
    return C(this, de);
  }
  get originLink() {
    return C(this, he);
  }
}
he = new WeakMap(), de = new WeakMap(), D = new WeakSet(), Un = function(r) {
  const [i, o] = r.match(/vmess:\/\/(.*)/) || [], t = JSON.parse(_e(o));
  T(this, he, r), this.setOriginConfig(t, t.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: P.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), k(this, D, Bn).call(this);
}, Bn = function() {
  const { add: r, port: i, id: o, ps: t, scy: l, net: u, type: c, tls: f, v: a } = this.confuseConfig;
  T(this, de, `vmess://${je(JSON.stringify({ v: a, ps: t, add: r, port: i, id: o, scy: l, net: u, type: c, tls: f }))}`);
}, Hn = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
async function Fo(e) {
  const n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  async function i(o) {
    for await (const t of o) {
      if (t.startsWith("vless:")) {
        const l = new Oo(t);
        n.add(l.confuseLink), r.set(l.confusePs, l);
      }
      if (t.startsWith("vmess:")) {
        const l = new ko(t);
        n.add(l.confuseLink), r.set(l.confusePs, l);
      }
      if (t.startsWith("trojan://")) {
        const l = new To(t);
        n.add(l.confuseLink), r.set(l.confusePs, l);
      }
      if (t.startsWith("ss://")) {
        const l = new So(t);
        n.add(l.confuseLink), r.set(l.confusePs, l);
      }
      if (t.startsWith("https://")) {
        const l = await tn(wo(t), { retries: 3 }).then((c) => c.data.text());
        Eo(l) === "base64" && await i(bo(l));
      }
    }
  }
  return await i(e), { urls: n, vpsMap: r };
}
async function Lo(e, n) {
  const { searchParams: r, origin: i } = new URL(e), t = r.get("url").split(/\||\n/).filter(Boolean), { urls: l, vpsMap: u } = await Fo(t), c = `${i}/${De}`, f = new Response(je(Array.from(l).join(`
`)), {
    headers: new Headers({ "Content-Type": "text/plain; charset=UTF-8" })
  });
  caches.default.put(c, f), r.set("url", c);
  const a = new URL(`${n}/sub`);
  return a.search = r.toString(), {
    confuseUrl: a.toString(),
    vpsMap: u
  };
}
function Io(e, n) {
  try {
    const r = [];
    for (const i of e) {
      const [o, t] = P.getPs(i.name);
      if (n.has(t)) {
        const l = n.get(t);
        l == null || l.restore(i, o), r.push(i);
      }
    }
    return r;
  } catch (r) {
    throw new Error(`Restore proxies failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}
function No(e) {
  try {
    return e.map((n) => {
      const [r] = P.getPs(n);
      return r;
    });
  } catch (n) {
    throw new Error(`Update proxies groups failed: ${n.message || n}, function trace: ${n.stack}`);
  }
}
function Po(e, n) {
  try {
    const r = Ye(e);
    return r.proxies = Io(r.proxies, n), r["proxy-groups"] = r["proxy-groups"].map((i) => (i.proxies && (i.proxies = No(i.proxies)), i)), r;
  } catch (r) {
    throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}
function Ro(e = "") {
  return e.split(`
`).reduce((r, i) => (r.push({
    label: i,
    value: i
  }), r), []);
}
function Do(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function Mo(e, n) {
  const r = n === "" ? [] : Ro(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(r));
}
function Uo(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const ge = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: ""
};
async function Bo(e) {
  try {
    const { url: n, lockBackend: r, remoteConfig: i, origin: o } = e, t = await fetch(`${n}?t=${Date.now()}`);
    if (t.status !== 200)
      throw new Error(t.statusText);
    let l = await t.text();
    return l = Do(l, o), l = Mo(l, i), l = Uo(l, r), Xn(l, new Headers({ ...t.headers, "Content-Type": "text/html; charset=utf-8" }));
  } catch (n) {
    return Fe(n.message || n);
  }
}
const Yo = {
  async fetch(e, n) {
    try {
      const { pathname: r, origin: i } = new URL(e.url);
      if (r === "/sub") {
        const { confuseUrl: o, vpsMap: t } = await Lo(e.url, n.BACKEND ?? ge.BACKEND);
        console.log(`confuseUrl: ${o}`);
        const l = await tn(o, { retries: 3 });
        if (!l.ok)
          throw new Error(l.statusText);
        console.log(`confuseConfig: ${l.status} ${l.statusText}`);
        const u = await l.data.text();
        console.log(`confuseConfig: ${Ye(u).proxies}`);
        const c = Po(u, t);
        return Qn(
          yo(c, { indent: 2, lineWidth: 200 }),
          new Headers({
            "Content-Type": "text/yaml; charset=UTF-8",
            "Cache-Control": "no-store"
          })
        );
      }
      return r === `/${De}` ? await caches.default.match(`${i}/${De}`) || Fe("Cache not found") : Bo({
        url: n.PAGE_URL ?? ge.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? ge.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? ge.REMOTE_CONFIG,
        origin: i
      });
    } catch (r) {
      return Fe(r.message || r);
    }
  }
};
export {
  Yo as default
};
