var jn = Object.defineProperty;
var Ye = (e) => {
  throw TypeError(e);
};
var $n = (e, n, r) => n in e ? jn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var be = (e, n, r) => $n(e, typeof n != "symbol" ? n + "" : n, r), Se = (e, n, r) => n.has(e) || Ye("Cannot " + r);
var C = (e, n, r) => (Se(e, n, "read from private field"), r ? r.call(e) : n.get(e)), A = (e, n, r) => n.has(e) ? Ye("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r), T = (e, n, r, i) => (Se(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r), O = (e, n, r) => (Se(e, n, "access private method"), r);
const W = {
  retries: 3,
  // 默认最大重试次数
  retryDelay: 1e3,
  // 默认每次重试的间隔时间（毫秒）
  retryOnStatusCodes: [500, 502, 503, 504]
  // 默认重试的状态码
};
let Kn = class {
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
    const l = new AbortController(), t = n.signal || l.signal, u = async () => {
      o++;
      const c = setTimeout(() => {
        l.abort();
      }, i);
      try {
        const f = await fetch(r.url, {
          method: r.method,
          headers: r.headers,
          body: r.body ? JSON.stringify(r.body) : void 0,
          signal: t
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
};
async function on(e, n) {
  const {
    retries: r = W.retries,
    retryDelay: i = W.retryDelay,
    retryOnStatusCodes: o = W.retryOnStatusCodes,
    onError: l,
    ...t
  } = n;
  let u = 0;
  const c = async () => {
    u++;
    try {
      const f = await Gn.request({ url: e, ...t });
      if (o.includes(f.status) && u <= r) {
        if (l) {
          const a = l(new Error(`Request failed with status ${f.status}`), u);
          a instanceof Promise && await a;
        }
        return await new Promise((a) => setTimeout(a, i)), c();
      }
      return f;
    } catch (f) {
      if (l) {
        const a = l(f, u);
        a instanceof Promise && await a;
      }
      if (u <= r)
        return await new Promise((a) => setTimeout(a, i)), c();
      throw f;
    }
  };
  return c();
}
const Gn = new Kn(), qn = "bad request", Wn = "internal server error", tn = new Headers({
  "Content-type": "application/json"
}), Qn = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const Vn = new Headers({
  "Content-type": "text/html"
}), Xn = (e, n = Qn) => new Response(e, {
  status: 200,
  headers: n
}), Zn = (e, n = Vn) => new Response(e, {
  headers: n
}), Jn = (e = qn, n = 400, r = tn) => Response.json(
  {
    status: n,
    message: e
  },
  {
    status: n,
    statusText: e,
    headers: r
  }
), ln = (e = Wn, n = 500, r = tn) => Response.json(
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
function zn(e) {
  return typeof e == "object" && e !== null;
}
function er(e) {
  return Array.isArray(e) ? e : un(e) ? [] : [e];
}
function nr(e, n) {
  var r, i, o, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      o = l[r], e[o] = n[o];
  return e;
}
function rr(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function ir(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var or = un, tr = zn, lr = er, ur = rr, cr = ir, fr = nr, w = {
  isNothing: or,
  isObject: tr,
  toArray: lr,
  repeat: ur,
  isNegativeZero: cr,
  extend: fr
};
function cn(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function V(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = cn(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
V.prototype = Object.create(Error.prototype);
V.prototype.constructor = V;
V.prototype.toString = function(n) {
  return this.name + ": " + cn(this, n);
};
var b = V;
function Te(e, n, r, i, o) {
  var l = "", t = "", u = Math.floor(o / 2) - 1;
  return i - n > u && (l = " ... ", n = i - u + l.length), r - i > u && (t = " ...", r = i + u - t.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + t,
    pos: i - n + l.length
    // relative position
  };
}
function ke(e, n) {
  return w.repeat(" ", n - e.length) + e;
}
function sr(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], o = [], l, t = -1; l = r.exec(e.buffer); )
    o.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && t < 0 && (t = i.length - 2);
  t < 0 && (t = i.length - 1);
  var u = "", c, f, a = Math.min(e.line + n.linesAfter, o.length).toString().length, s = n.maxLength - (n.indent + a + 3);
  for (c = 1; c <= n.linesBefore && !(t - c < 0); c++)
    f = Te(
      e.buffer,
      i[t - c],
      o[t - c],
      e.position - (i[t] - i[t - c]),
      s
    ), u = w.repeat(" ", n.indent) + ke((e.line - c + 1).toString(), a) + " | " + f.str + `
` + u;
  for (f = Te(e.buffer, i[t], o[t], e.position, s), u += w.repeat(" ", n.indent) + ke((e.line + 1).toString(), a) + " | " + f.str + `
`, u += w.repeat("-", n.indent + a + 3 + f.pos) + `^
`, c = 1; c <= n.linesAfter && !(t + c >= o.length); c++)
    f = Te(
      e.buffer,
      i[t + c],
      o[t + c],
      e.position - (i[t] - i[t + c]),
      s
    ), u += w.repeat(" ", n.indent) + ke((e.line + c + 1).toString(), a) + " | " + f.str + `
`;
  return u.replace(/\n$/, "");
}
var ar = sr, pr = [
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
], hr = [
  "scalar",
  "sequence",
  "mapping"
];
function dr(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function gr(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (pr.indexOf(r) === -1)
      throw new b('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = dr(n.styleAliases || null), hr.indexOf(this.kind) === -1)
    throw new b('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var _ = gr;
function je(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var o = r.length;
    r.forEach(function(l, t) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (o = t);
    }), r[o] = i;
  }), r;
}
function mr() {
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
  r.forEach(function(l) {
    if (!(l instanceof _))
      throw new b("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new b("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new b("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof _))
      throw new b("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var o = Object.create(Le.prototype);
  return o.implicit = (this.implicit || []).concat(r), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = je(o, "implicit"), o.compiledExplicit = je(o, "explicit"), o.compiledTypeMap = mr(o.compiledImplicit, o.compiledExplicit), o;
};
var xr = Le, Cr = new _("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Ar = new _("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), vr = new _("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), yr = new xr({
  explicit: [
    Cr,
    Ar,
    vr
  ]
});
function wr(e) {
  if (e === null) return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function _r() {
  return null;
}
function Er(e) {
  return e === null;
}
var br = new _("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: wr,
  construct: _r,
  predicate: Er,
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
function Sr(e) {
  if (e === null) return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Tr(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function kr(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Or = new _("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Sr,
  construct: Tr,
  predicate: kr,
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
function Fr(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Lr(e) {
  return 48 <= e && e <= 55;
}
function Ir(e) {
  return 48 <= e && e <= 57;
}
function Nr(e) {
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
          if (!Fr(e.charCodeAt(r))) return !1;
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
      if (!Ir(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || o === "_");
}
function Pr(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0") return 0;
  if (i === "0") {
    if (n[1] === "b") return r * parseInt(n.slice(2), 2);
    if (n[1] === "x") return r * parseInt(n.slice(2), 16);
    if (n[1] === "o") return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function Rr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !w.isNegativeZero(e);
}
var Dr = new _("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Nr,
  construct: Pr,
  predicate: Rr,
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
}), Mr = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ur(e) {
  return !(e === null || !Mr.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Br(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var Hr = /^[-+]?[0-9]+e/;
function Yr(e, n) {
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
  return r = e.toString(10), Hr.test(r) ? r.replace("e", ".e") : r;
}
function jr(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || w.isNegativeZero(e));
}
var $r = new _("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ur,
  construct: Br,
  predicate: jr,
  represent: Yr,
  defaultStyle: "lowercase"
}), Kr = yr.extend({
  implicit: [
    br,
    Or,
    Dr,
    $r
  ]
}), Gr = Kr, fn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), sn = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function qr(e) {
  return e === null ? !1 : fn.exec(e) !== null || sn.exec(e) !== null;
}
function Wr(e) {
  var n, r, i, o, l, t, u, c = 0, f = null, a, s, h;
  if (n = fn.exec(e), n === null && (n = sn.exec(e)), n === null) throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, o = +n[3], !n[4])
    return new Date(Date.UTC(r, i, o));
  if (l = +n[4], t = +n[5], u = +n[6], n[7]) {
    for (c = n[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return n[9] && (a = +n[10], s = +(n[11] || 0), f = (a * 60 + s) * 6e4, n[9] === "-" && (f = -f)), h = new Date(Date.UTC(r, i, o, l, t, u, c)), f && h.setTime(h.getTime() - f), h;
}
function Qr(e) {
  return e.toISOString();
}
var Vr = new _("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: qr,
  construct: Wr,
  instanceOf: Date,
  represent: Qr
});
function Xr(e) {
  return e === "<<" || e === null;
}
var Zr = new _("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Xr
}), De = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Jr(e) {
  if (e === null) return !1;
  var n, r, i = 0, o = e.length, l = De;
  for (r = 0; r < o; r++)
    if (n = l.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function zr(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), o = i.length, l = De, t = 0, u = [];
  for (n = 0; n < o; n++)
    n % 4 === 0 && n && (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)), t = t << 6 | l.indexOf(i.charAt(n));
  return r = o % 4 * 6, r === 0 ? (u.push(t >> 16 & 255), u.push(t >> 8 & 255), u.push(t & 255)) : r === 18 ? (u.push(t >> 10 & 255), u.push(t >> 2 & 255)) : r === 12 && u.push(t >> 4 & 255), new Uint8Array(u);
}
function ei(e) {
  var n = "", r = 0, i, o, l = e.length, t = De;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]), r = (r << 8) + e[i];
  return o = l % 3, o === 0 ? (n += t[r >> 18 & 63], n += t[r >> 12 & 63], n += t[r >> 6 & 63], n += t[r & 63]) : o === 2 ? (n += t[r >> 10 & 63], n += t[r >> 4 & 63], n += t[r << 2 & 63], n += t[64]) : o === 1 && (n += t[r >> 2 & 63], n += t[r << 4 & 63], n += t[64], n += t[64]), n;
}
function ni(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var ri = new _("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Jr,
  construct: zr,
  predicate: ni,
  represent: ei
}), ii = Object.prototype.hasOwnProperty, oi = Object.prototype.toString;
function ti(e) {
  if (e === null) return !0;
  var n = [], r, i, o, l, t, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (o = u[r], t = !1, oi.call(o) !== "[object Object]") return !1;
    for (l in o)
      if (ii.call(o, l))
        if (!t) t = !0;
        else return !1;
    if (!t) return !1;
    if (n.indexOf(l) === -1) n.push(l);
    else return !1;
  }
  return !0;
}
function li(e) {
  return e !== null ? e : [];
}
var ui = new _("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: ti,
  construct: li
}), ci = Object.prototype.toString;
function fi(e) {
  if (e === null) return !0;
  var n, r, i, o, l, t = e;
  for (l = new Array(t.length), n = 0, r = t.length; n < r; n += 1) {
    if (i = t[n], ci.call(i) !== "[object Object]" || (o = Object.keys(i), o.length !== 1)) return !1;
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
var ai = new _("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: fi,
  construct: si
}), pi = Object.prototype.hasOwnProperty;
function hi(e) {
  if (e === null) return !0;
  var n, r = e;
  for (n in r)
    if (pi.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function di(e) {
  return e !== null ? e : {};
}
var gi = new _("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: hi,
  construct: di
}), an = Gr.extend({
  implicit: [
    Vr,
    Zr
  ],
  explicit: [
    ri,
    ui,
    ai,
    gi
  ]
}), N = Object.prototype.hasOwnProperty, me = 1, pn = 2, hn = 3, xe = 4, Oe = 1, mi = 2, $e = 3, xi = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Ci = /[\x85\u2028\u2029]/, Ai = /[,\[\]\{\}]/, dn = /^(?:!|!!|![a-z\-]+!)$/i, gn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Ke(e) {
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
function vi(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function yi(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function wi(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Ge(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function _i(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var mn = new Array(256), xn = new Array(256);
for (var B = 0; B < 256; B++)
  mn[B] = Ge(B) ? 1 : 0, xn[B] = Ge(B);
function Ei(e, n) {
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
  return r.snippet = ar(r), new b(n, r);
}
function p(e, n) {
  throw Cn(e, n);
}
function Ce(e, n) {
  e.onWarning && e.onWarning.call(null, Cn(e, n));
}
var qe = {
  YAML: function(n, r, i) {
    var o, l, t;
    n.version !== null && p(n, "duplication of %YAML directive"), i.length !== 1 && p(n, "YAML directive accepts exactly one argument"), o = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), o === null && p(n, "ill-formed argument of the YAML directive"), l = parseInt(o[1], 10), t = parseInt(o[2], 10), l !== 1 && p(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = t < 2, t !== 1 && t !== 2 && Ce(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var o, l;
    i.length !== 2 && p(n, "TAG directive accepts exactly two arguments"), o = i[0], l = i[1], dn.test(o) || p(n, "ill-formed tag handle (first argument) of the TAG directive"), N.call(n.tagMap, o) && p(n, 'there is a previously declared suffix for "' + o + '" tag handle'), gn.test(l) || p(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      p(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[o] = l;
  }
};
function I(e, n, r, i) {
  var o, l, t, u;
  if (n < r) {
    if (u = e.input.slice(n, r), i)
      for (o = 0, l = u.length; o < l; o += 1)
        t = u.charCodeAt(o), t === 9 || 32 <= t && t <= 1114111 || p(e, "expected valid JSON character");
    else xi.test(u) && p(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function We(e, n, r, i) {
  var o, l, t, u;
  for (w.isObject(r) || p(e, "cannot merge mappings; the provided source object is unacceptable"), o = Object.keys(r), t = 0, u = o.length; t < u; t += 1)
    l = o[t], N.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function j(e, n, r, i, o, l, t, u, c) {
  var f, a;
  if (Array.isArray(o))
    for (o = Array.prototype.slice.call(o), f = 0, a = o.length; f < a; f += 1)
      Array.isArray(o[f]) && p(e, "nested arrays are not supported inside keys"), typeof o == "object" && Ke(o[f]) === "[object Object]" && (o[f] = "[object Object]");
  if (typeof o == "object" && Ke(o) === "[object Object]" && (o = "[object Object]"), o = String(o), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (f = 0, a = l.length; f < a; f += 1)
        We(e, n, l[f], r);
    else
      We(e, n, l, r);
  else
    !e.json && !N.call(r, o) && N.call(n, o) && (e.line = t || e.line, e.lineStart = u || e.lineStart, e.position = c || e.position, p(e, "duplicated mapping key")), o === "__proto__" ? Object.defineProperty(n, o, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[o] = l, delete r[o];
  return n;
}
function Me(e) {
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
      for (Me(e), o = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; o === 32; )
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
function Ue(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += w.repeat(`
`, n - 1));
}
function bi(e, n, r) {
  var i, o, l, t, u, c, f, a, s = e.kind, h = e.result, d;
  if (d = e.input.charCodeAt(e.position), S(d) || Y(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (o = e.input.charCodeAt(e.position + 1), S(o) || r && Y(o)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = t = e.position, u = !1; d !== 0; ) {
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
          e.position = t, e.line = c, e.lineStart = f, e.lineIndent = a;
          break;
        }
    }
    u && (I(e, l, t, !1), Ue(e, e.line - c), l = t = e.position, u = !1), U(d) || (t = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return I(e, l, t, !1), e.result ? !0 : (e.kind = s, e.result = h, !1);
}
function Si(e, n) {
  var r, i, o;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = o = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (I(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, o = e.position;
      else
        return !0;
    else F(r) ? (I(e, i, o, !0), Ue(e, y(e, !1, n)), i = o = e.position) : e.position === e.lineStart && we(e) ? p(e, "unexpected end of the document within a single quoted scalar") : (e.position++, o = e.position);
  p(e, "unexpected end of the stream within a single quoted scalar");
}
function Ti(e, n) {
  var r, i, o, l, t, u;
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
      else if ((t = yi(u)) > 0) {
        for (o = t, l = 0; o > 0; o--)
          u = e.input.charCodeAt(++e.position), (t = vi(u)) >= 0 ? l = (l << 4) + t : p(e, "expected hexadecimal character");
        e.result += _i(l), e.position++;
      } else
        p(e, "unknown escape sequence");
      r = i = e.position;
    } else F(u) ? (I(e, r, i, !0), Ue(e, y(e, !1, n)), r = i = e.position) : e.position === e.lineStart && we(e) ? p(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  p(e, "unexpected end of the stream within a double quoted scalar");
}
function ki(e, n) {
  var r = !0, i, o, l, t = e.tag, u, c = e.anchor, f, a, s, h, d, g = /* @__PURE__ */ Object.create(null), x, v, k, m;
  if (m = e.input.charCodeAt(e.position), m === 91)
    a = 93, d = !1, u = [];
  else if (m === 123)
    a = 125, d = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), m = e.input.charCodeAt(++e.position); m !== 0; ) {
    if (y(e, !0, n), m = e.input.charCodeAt(e.position), m === a)
      return e.position++, e.tag = t, e.anchor = c, e.kind = d ? "mapping" : "sequence", e.result = u, !0;
    r ? m === 44 && p(e, "expected the node content, but found ','") : p(e, "missed comma between flow collection entries"), v = x = k = null, s = h = !1, m === 63 && (f = e.input.charCodeAt(e.position + 1), S(f) && (s = h = !0, e.position++, y(e, !0, n))), i = e.line, o = e.lineStart, l = e.position, $(e, n, me, !1, !0), v = e.tag, x = e.result, y(e, !0, n), m = e.input.charCodeAt(e.position), (h || e.line === i) && m === 58 && (s = !0, m = e.input.charCodeAt(++e.position), y(e, !0, n), $(e, n, me, !1, !0), k = e.result), d ? j(e, u, g, v, x, k, i, o, l) : s ? u.push(j(e, null, g, v, x, k, i, o, l)) : u.push(x), y(e, !0, n), m = e.input.charCodeAt(e.position), m === 44 ? (r = !0, m = e.input.charCodeAt(++e.position)) : r = !1;
  }
  p(e, "unexpected end of the stream within a flow collection");
}
function Oi(e, n) {
  var r, i, o = Oe, l = !1, t = !1, u = n, c = 0, f = !1, a, s;
  if (s = e.input.charCodeAt(e.position), s === 124)
    i = !1;
  else if (s === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; s !== 0; )
    if (s = e.input.charCodeAt(++e.position), s === 43 || s === 45)
      Oe === o ? o = s === 43 ? $e : mi : p(e, "repeat of a chomping mode identifier");
    else if ((a = wi(s)) >= 0)
      a === 0 ? p(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : t ? p(e, "repeat of an indentation width identifier") : (u = n + a - 1, t = !0);
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
    for (Me(e), e.lineIndent = 0, s = e.input.charCodeAt(e.position); (!t || e.lineIndent < u) && s === 32; )
      e.lineIndent++, s = e.input.charCodeAt(++e.position);
    if (!t && e.lineIndent > u && (u = e.lineIndent), F(s)) {
      c++;
      continue;
    }
    if (e.lineIndent < u) {
      o === $e ? e.result += w.repeat(`
`, l ? 1 + c : c) : o === Oe && l && (e.result += `
`);
      break;
    }
    for (i ? U(s) ? (f = !0, e.result += w.repeat(`
`, l ? 1 + c : c)) : f ? (f = !1, e.result += w.repeat(`
`, c + 1)) : c === 0 ? l && (e.result += " ") : e.result += w.repeat(`
`, c) : e.result += w.repeat(`
`, l ? 1 + c : c), l = !0, t = !0, c = 0, r = e.position; !F(s) && s !== 0; )
      s = e.input.charCodeAt(++e.position);
    I(e, r, e.position, !1);
  }
  return !0;
}
function Qe(e, n) {
  var r, i = e.tag, o = e.anchor, l = [], t, u = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), !(c !== 45 || (t = e.input.charCodeAt(e.position + 1), !S(t)))); ) {
    if (u = !0, e.position++, y(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, $(e, n, hn, !1, !0), l.push(e.result), y(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && c !== 0)
      p(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = o, e.kind = "sequence", e.result = l, !0) : !1;
}
function Fi(e, n, r) {
  var i, o, l, t, u, c, f = e.tag, a = e.anchor, s = {}, h = /* @__PURE__ */ Object.create(null), d = null, g = null, x = null, v = !1, k = !1, m;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), m = e.input.charCodeAt(e.position); m !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, p(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (m === 63 || m === 58) && S(i))
      m === 63 ? (v && (j(e, s, h, d, g, null, t, u, c), d = g = x = null), k = !0, v = !0, o = !0) : v ? (v = !1, o = !0) : p(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, m = i;
    else {
      if (t = e.line, u = e.lineStart, c = e.position, !$(e, r, pn, !1, !0))
        break;
      if (e.line === l) {
        for (m = e.input.charCodeAt(e.position); U(m); )
          m = e.input.charCodeAt(++e.position);
        if (m === 58)
          m = e.input.charCodeAt(++e.position), S(m) || p(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (j(e, s, h, d, g, null, t, u, c), d = g = x = null), k = !0, v = !1, o = !1, d = e.tag, g = e.result;
        else if (k)
          p(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = a, !0;
      } else if (k)
        p(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = a, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (v && (t = e.line, u = e.lineStart, c = e.position), $(e, n, xe, !0, o) && (v ? g = e.result : x = e.result), v || (j(e, s, h, d, g, x, t, u, c), d = g = x = null), y(e, !0, -1), m = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && m !== 0)
      p(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return v && j(e, s, h, d, g, null, t, u, c), k && (e.tag = f, e.anchor = a, e.kind = "mapping", e.result = s), k;
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
    for (; t !== 0 && !S(t); )
      t === 33 && (i ? p(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(n - 1, e.position + 1), dn.test(o) || p(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), t = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Ai.test(l) && p(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !gn.test(l) && p(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    p(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : N.call(e.tagMap, o) ? e.tag = e.tagMap[o] + l : o === "!" ? e.tag = "!" + l : o === "!!" ? e.tag = "tag:yaml.org,2002:" + l : p(e, 'undeclared tag handle "' + o + '"'), !0;
}
function Ii(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && p(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !S(r) && !Y(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Ni(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !S(i) && !Y(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && p(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), N.call(e.anchorMap, r) || p(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], y(e, !0, -1), !0;
}
function $(e, n, r, i, o) {
  var l, t, u, c = 1, f = !1, a = !1, s, h, d, g, x, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = t = u = xe === r || hn === r, i && y(e, !0, -1) && (f = !0, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)), c === 1)
    for (; Li(e) || Ii(e); )
      y(e, !0, -1) ? (f = !0, u = l, e.lineIndent > n ? c = 1 : e.lineIndent === n ? c = 0 : e.lineIndent < n && (c = -1)) : u = !1;
  if (u && (u = f || o), (c === 1 || xe === r) && (me === r || pn === r ? x = n : x = n + 1, v = e.position - e.lineStart, c === 1 ? u && (Qe(e, v) || Fi(e, v, x)) || ki(e, x) ? a = !0 : (t && Oi(e, x) || Si(e, x) || Ti(e, x) ? a = !0 : Ni(e) ? (a = !0, (e.tag !== null || e.anchor !== null) && p(e, "alias node should not have any properties")) : bi(e, x, me === r) && (a = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (a = u && Qe(e, v))), e.tag === null)
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
function Pi(e) {
  var n = e.position, r, i, o, l = !1, t;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (t = e.input.charCodeAt(e.position)) !== 0 && (y(e, !0, -1), t = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || t !== 37)); ) {
    for (l = !0, t = e.input.charCodeAt(++e.position), r = e.position; t !== 0 && !S(t); )
      t = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), o = [], i.length < 1 && p(e, "directive name must not be less than one character in length"); t !== 0; ) {
      for (; U(t); )
        t = e.input.charCodeAt(++e.position);
      if (t === 35) {
        do
          t = e.input.charCodeAt(++e.position);
        while (t !== 0 && !F(t));
        break;
      }
      if (F(t)) break;
      for (r = e.position; t !== 0 && !S(t); )
        t = e.input.charCodeAt(++e.position);
      o.push(e.input.slice(r, e.position));
    }
    t !== 0 && Me(e), N.call(qe, i) ? qe[i](e, i, o) : Ce(e, 'unknown document directive "' + i + '"');
  }
  if (y(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, y(e, !0, -1)) : l && p(e, "directives end mark is expected"), $(e, e.lineIndent - 1, xe, !1, !0), y(e, !0, -1), e.checkLineBreaks && Ci.test(e.input.slice(n, e.position)) && Ce(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && we(e)) {
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
  var r = new Ei(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, p(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Pi(r);
  return r.documents;
}
function Ri(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = An(e, r);
  if (typeof n != "function")
    return i;
  for (var o = 0, l = i.length; o < l; o += 1)
    n(i[o]);
}
function Di(e, n) {
  var r = An(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new b("expected a single document in the stream, but found more");
  }
}
var Mi = Ri, Ui = Di, Bi = {
  loadAll: Mi,
  load: Ui
}, vn = Object.prototype.toString, yn = Object.prototype.hasOwnProperty, Be = 65279, Hi = 9, X = 10, Yi = 13, ji = 32, $i = 33, Ki = 34, Ie = 35, Gi = 37, qi = 38, Wi = 39, Qi = 42, wn = 44, Vi = 45, Ae = 58, Xi = 61, Zi = 62, Ji = 63, zi = 64, _n = 91, En = 93, eo = 96, bn = 123, no = 124, Sn = 125, E = {};
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
var ro = [
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
], io = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function oo(e, n) {
  var r, i, o, l, t, u, c;
  if (n === null) return {};
  for (r = {}, i = Object.keys(n), o = 0, l = i.length; o < l; o += 1)
    t = i[o], u = String(n[t]), t.slice(0, 2) === "!!" && (t = "tag:yaml.org,2002:" + t.slice(2)), c = e.compiledTypeMap.fallback[t], c && yn.call(c.styleAliases, u) && (u = c.styleAliases[u]), r[t] = u;
  return r;
}
function to(e) {
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
var lo = 1, Z = 2;
function uo(e) {
  this.schema = e.schema || an, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = w.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = oo(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Z : lo, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ve(e, n) {
  for (var r = w.repeat(" ", n), i = 0, o = -1, l = "", t, u = e.length; i < u; )
    o = e.indexOf(`
`, i), o === -1 ? (t = e.slice(i), i = u) : (t = e.slice(i, o + 1), i = o + 1), t.length && t !== `
` && (l += r), l += t;
  return l;
}
function Ne(e, n) {
  return `
` + w.repeat(" ", e.indent * n);
}
function co(e, n) {
  var r, i, o;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (o = e.implicitTypes[r], o.resolve(n))
      return !0;
  return !1;
}
function ve(e) {
  return e === ji || e === Hi;
}
function J(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Be || 65536 <= e && e <= 1114111;
}
function Xe(e) {
  return J(e) && e !== Be && e !== Yi && e !== X;
}
function Ze(e, n, r) {
  var i = Xe(e), o = i && !ve(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== wn && e !== _n && e !== En && e !== bn && e !== Sn) && e !== Ie && !(n === Ae && !o) || Xe(n) && !ve(n) && e === Ie || n === Ae && o
  );
}
function fo(e) {
  return J(e) && e !== Be && !ve(e) && e !== Vi && e !== Ji && e !== Ae && e !== wn && e !== _n && e !== En && e !== bn && e !== Sn && e !== Ie && e !== qi && e !== Qi && e !== $i && e !== no && e !== Xi && e !== Zi && e !== Wi && e !== Ki && e !== Gi && e !== zi && e !== eo;
}
function so(e) {
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
var kn = 1, Pe = 2, On = 3, Fn = 4, H = 5;
function ao(e, n, r, i, o, l, t, u) {
  var c, f = 0, a = null, s = !1, h = !1, d = i !== -1, g = -1, x = fo(q(e, 0)) && so(q(e, e.length - 1));
  if (n || t)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = q(e, c), !J(f))
        return H;
      x = x && Ze(f, a, u), a = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = q(e, c), f === X)
        s = !0, d && (h = h || // Foldable line = too long, and not more-indented.
        c - g - 1 > i && e[g + 1] !== " ", g = c);
      else if (!J(f))
        return H;
      x = x && Ze(f, a, u), a = f;
    }
    h = h || d && c - g - 1 > i && e[g + 1] !== " ";
  }
  return !s && !h ? x && !t && !o(e) ? kn : l === Z ? H : Pe : r > 9 && Tn(e) ? H : t ? l === Z ? H : Pe : h ? Fn : On;
}
function po(e, n, r, i, o) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === Z ? '""' : "''";
    if (!e.noCompatMode && (ro.indexOf(n) !== -1 || io.test(n)))
      return e.quotingType === Z ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), t = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function c(f) {
      return co(e, f);
    }
    switch (ao(
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
      case Pe:
        return "'" + n.replace(/'/g, "''") + "'";
      case On:
        return "|" + Je(n, e.indent) + ze(Ve(n, l));
      case Fn:
        return ">" + Je(n, e.indent) + ze(Ve(ho(n, t), l));
      case H:
        return '"' + go(n) + '"';
      default:
        throw new b("impossible error: invalid scalar style");
    }
  }();
}
function Je(e, n) {
  var r = Tn(e) ? String(n) : "", i = e[e.length - 1] === `
`, o = i && (e[e.length - 2] === `
` || e === `
`), l = o ? "+" : i ? "" : "-";
  return r + l + `
`;
}
function ze(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function ho(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, en(e.slice(0, f), n);
  }(), o = e[0] === `
` || e[0] === " ", l, t; t = r.exec(e); ) {
    var u = t[1], c = t[2];
    l = c[0] === " ", i += u + (!o && !l && c !== "" ? `
` : "") + en(c, n), o = l;
  }
  return i;
}
function en(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, o = 0, l, t = 0, u = 0, c = ""; i = r.exec(e); )
    u = i.index, u - o > n && (l = t > o ? t : u, c += `
` + e.slice(o, l), o = l + 1), t = u;
  return c += `
`, e.length - o > n && t > o ? c += e.slice(o, t) + `
` + e.slice(t + 1) : c += e.slice(o), c.slice(1);
}
function go(e) {
  for (var n = "", r = 0, i, o = 0; o < e.length; r >= 65536 ? o += 2 : o++)
    r = q(e, o), i = E[r], !i && J(r) ? (n += e[o], r >= 65536 && (n += e[o + 1])) : n += i || to(r);
  return n;
}
function mo(e, n, r) {
  var i = "", o = e.tag, l, t, u;
  for (l = 0, t = r.length; l < t; l += 1)
    u = r[l], e.replacer && (u = e.replacer.call(r, String(l), u)), (L(e, n, u, !1, !1) || typeof u > "u" && L(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = o, e.dump = "[" + i + "]";
}
function nn(e, n, r, i) {
  var o = "", l = e.tag, t, u, c;
  for (t = 0, u = r.length; t < u; t += 1)
    c = r[t], e.replacer && (c = e.replacer.call(r, String(t), c)), (L(e, n + 1, c, !0, !0, !1, !0) || typeof c > "u" && L(e, n + 1, null, !0, !0, !1, !0)) && ((!i || o !== "") && (o += Ne(e, n)), e.dump && X === e.dump.charCodeAt(0) ? o += "-" : o += "- ", o += e.dump);
  e.tag = l, e.dump = o || "[]";
}
function xo(e, n, r) {
  var i = "", o = e.tag, l = Object.keys(r), t, u, c, f, a;
  for (t = 0, u = l.length; t < u; t += 1)
    a = "", i !== "" && (a += ", "), e.condenseFlow && (a += '"'), c = l[t], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), L(e, n, c, !1, !1) && (e.dump.length > 1024 && (a += "? "), a += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), L(e, n, f, !1, !1) && (a += e.dump, i += a));
  e.tag = o, e.dump = "{" + i + "}";
}
function Co(e, n, r, i) {
  var o = "", l = e.tag, t = Object.keys(r), u, c, f, a, s, h;
  if (e.sortKeys === !0)
    t.sort();
  else if (typeof e.sortKeys == "function")
    t.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new b("sortKeys must be a boolean or a function");
  for (u = 0, c = t.length; u < c; u += 1)
    h = "", (!i || o !== "") && (h += Ne(e, n)), f = t[u], a = r[f], e.replacer && (a = e.replacer.call(r, f, a)), L(e, n + 1, f, !0, !0, !0) && (s = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, s && (e.dump && X === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, s && (h += Ne(e, n)), L(e, n + 1, a, !0, s) && (e.dump && X === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, o += h));
  e.tag = l, e.dump = o || "{}";
}
function rn(e, n, r) {
  var i, o, l, t, u, c;
  for (o = r ? e.explicitTypes : e.implicitTypes, l = 0, t = o.length; l < t; l += 1)
    if (u = o[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
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
function L(e, n, r, i, o, l, t) {
  e.tag = null, e.dump = r, rn(e, r, !1) || rn(e, r, !0);
  var u = vn.call(e.dump), c = i, f;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var a = u === "[object Object]" || u === "[object Array]", s, h;
  if (a && (s = e.duplicates.indexOf(r), h = s !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && n > 0) && (o = !1), h && e.usedDuplicates[s])
    e.dump = "*ref_" + s;
  else {
    if (a && h && !e.usedDuplicates[s] && (e.usedDuplicates[s] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (Co(e, n, e.dump, o), h && (e.dump = "&ref_" + s + e.dump)) : (xo(e, n, e.dump), h && (e.dump = "&ref_" + s + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !t && n > 0 ? nn(e, n - 1, e.dump, o) : nn(e, n, e.dump, o), h && (e.dump = "&ref_" + s + e.dump)) : (mo(e, n, e.dump), h && (e.dump = "&ref_" + s + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && po(e, e.dump, n, l, c);
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
function Ao(e, n) {
  var r = [], i = [], o, l;
  for (Re(e, r, i), o = 0, l = i.length; o < l; o += 1)
    n.duplicates.push(r[i[o]]);
  n.usedDuplicates = new Array(l);
}
function Re(e, n, r) {
  var i, o, l;
  if (e !== null && typeof e == "object")
    if (o = n.indexOf(e), o !== -1)
      r.indexOf(o) === -1 && r.push(o);
    else if (n.push(e), Array.isArray(e))
      for (o = 0, l = e.length; o < l; o += 1)
        Re(e[o], n, r);
    else
      for (i = Object.keys(e), o = 0, l = i.length; o < l; o += 1)
        Re(e[i[o]], n, r);
}
function vo(e, n) {
  n = n || {};
  var r = new uo(n);
  r.noRefs || Ao(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), L(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var yo = vo, wo = {
  dump: yo
}, Ln = Bi.load, _o = wo.dump;
function _e(e) {
  if (!e) return e;
  const n = atob(e), r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n.charCodeAt(i);
  return new TextDecoder().decode(r);
}
function He(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let r = "";
  for (let i = 0; i < n.length; i += 1)
    r += String.fromCharCode(n[i]);
  return btoa(r);
}
function Eo(e, n) {
  const r = (i) => i;
  try {
    return e ? decodeURIComponent(e) : r(e);
  } catch {
    return r(e);
  }
}
function bo(e, n) {
  const r = (i) => i;
  try {
    return e ? encodeURIComponent(e) : r(e);
  } catch {
    return r(e);
  }
}
function So(e, n) {
  const { searchParams: r, origin: i } = new URL(e), l = r.get("url").split(/\||\n/).filter(Boolean);
  r.set("url", bo(`${i}/getSub?links=${l.join("|")}`));
  const t = new URL(`${n}/sub`);
  return t.search = r.toString(), t.toString();
}
var z, ee, ne, ye;
class To {
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
var re, ie, oe, te;
class Ee extends To {
  constructor() {
    super();
    /** * @description vps原始配置 */
    A(this, re, {});
    /** * @description 混淆配置 */
    A(this, ie, {});
    /** * @description 原始备注 */
    A(this, oe, "");
    /** * @description 混淆备注 */
    A(this, te, "");
    T(this, te, this.getUUID());
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
    return C(this, te);
  }
  /**
   * @description 混淆配置
   */
  get confuseConfig() {
    return C(this, ie);
  }
}
re = new WeakMap(), ie = new WeakMap(), oe = new WeakMap(), te = new WeakMap();
var le;
const Q = class Q {
  /**
   * @description 获取备注
   * @param {string} name
   * @returns {[string, string]} [origin, confuse]
   */
  static getPs(n) {
    const r = n.split(C(Q, le));
    return [r[0], r[1]];
  }
  /**
   * @description 设置备注
   * @param {string} name 原始备注
   * @param {string} ps 混淆备注
   * @returns {string} origin^LINK_TO^confuse
   */
  static setPs(n, r) {
    return [n, r].join(C(Q, le));
  }
};
le = new WeakMap(), A(Q, le, "^LINK_TO^");
let P = Q;
function ko(e) {
  try {
    return _e(e), "base64";
  } catch {
    try {
      return Ln(e), "yaml";
    } catch {
      try {
        return JSON.parse(e), "json";
      } catch {
        return "unknown";
      }
    }
  }
}
function Oo(e) {
  return _e(e).split(`
`).filter(Boolean).map((r) => decodeURIComponent(r));
}
function Fo(e, n) {
  try {
    const r = [];
    for (const i of e) {
      const [o, l] = P.getPs(i.name);
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
function Lo(e) {
  try {
    return e.map((n) => {
      const [r] = P.getPs(n);
      return r;
    });
  } catch (n) {
    throw new Error(`Update proxies groups failed: ${n.message || n}, function trace: ${n.stack}`);
  }
}
function Io(e, n) {
  try {
    const r = Ln(e);
    return r.proxies = Fo(r.proxies, n), r["proxy-groups"] = r["proxy-groups"].map((i) => (i.proxies && (i.proxies = Lo(i.proxies)), i)), r;
  } catch (r) {
    throw new Error(`Get origin config failed: ${r.message || r}, function trace: ${r.stack}`);
  }
}
function No(e = "") {
  return e.split(`
`).reduce((r, i) => (r.push({
    label: i,
    value: i
  }), r), []);
}
function Po(e, n) {
  return e.replace("#{cloudflare_worker_sub}", n);
}
function Ro(e, n) {
  const r = n === "" ? [] : No(n);
  return e.replace("[] // #{CLOUDFLARE_ENV_REMOTE}", JSON.stringify(r));
}
function Do(e, n) {
  return e.replace("'#{DISABLED_BACKEND}'", n ? "true" : "false");
}
const ge = {
  PAGE_URL: "https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html",
  BACKEND: "https://url.v1.mk",
  LOCK_BACKEND: !1,
  REMOTE_CONFIG: ""
};
async function Mo(e) {
  try {
    const { url: n, lockBackend: r, remoteConfig: i, origin: o } = e, l = await fetch(`${n}?t=${Date.now()}`);
    if (l.status !== 200)
      throw new Error(l.statusText);
    let t = await l.text();
    return t = Po(t, o), t = Ro(t, i), t = Do(t, r), Zn(t, new Headers({ ...l.headers, "Content-Type": "text/html; charset=utf-8" }));
  } catch (n) {
    return ln(n.message || n);
  }
}
var ue, ce, M, R, In, Nn, Pn;
class Uo extends Ee {
  constructor(r) {
    super();
    A(this, R);
    /** @description 原始链接 */
    A(this, ue, "");
    /** @description 混淆链接 */
    A(this, ce, "");
    /** @description 解析的私有配置 */
    A(this, M, {});
    O(this, R, In).call(this, r);
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
ue = new WeakMap(), ce = new WeakMap(), M = new WeakMap(), R = new WeakSet(), In = function(r) {
  T(this, ue, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash);
  const o = this.getEncrtptionProtocol(), l = this.getPassword();
  O(this, R, Nn).call(this, i.username), this.setConfuseConfig({
    username: encodeURIComponent(He(`${o}:${l}`)),
    hostname: this.getHostName(),
    port: this.getPort(),
    hash: P.setPs(this.originPs, this.confusePs)
  }), O(this, R, Pn).call(this);
}, Nn = function(r) {
  const [i, o] = _e(decodeURIComponent(r)).split(":");
  C(this, M).originEncryptionProtocol = i, C(this, M).originPassword = o;
}, Pn = function() {
  const { username: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  T(this, ce, `ss://${r}@${i}:${o}${l ?? ""}${t}`);
};
var fe, se, K, Rn, Dn;
class Bo extends Ee {
  constructor(r) {
    super();
    A(this, K);
    /** * @description 原始链接 */
    A(this, fe, "");
    /** * @description 混淆链接 */
    A(this, se, "");
    O(this, K, Rn).call(this, r);
  }
  restore(r, i) {
    var o, l;
    return r.name = i, r.server = this.originConfig.hostname ?? "", r.port = Number(this.originConfig.port ?? 0), r.password = ((o = this.originConfig) == null ? void 0 : o.username) ?? "", r.sni = ((l = this.originConfig) == null ? void 0 : l.hostname) ?? "", r;
  }
  get confuseLink() {
    return C(this, se);
  }
  get originLink() {
    return C(this, fe);
  }
}
fe = new WeakMap(), se = new WeakMap(), K = new WeakSet(), Rn = function(r) {
  T(this, fe, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: P.setPs(this.originPs, this.confusePs)
  }), O(this, K, Dn).call(this);
}, Dn = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  T(this, se, `trojan://${r}@${i}:${o}${l}${t}`);
};
var ae, pe, G, Mn, Un;
class Ho extends Ee {
  constructor(r) {
    super();
    A(this, G);
    /** * @description 原始链接 */
    A(this, ae, "");
    /** * @description 混淆链接 */
    A(this, pe, "");
    O(this, G, Mn).call(this, r);
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
ae = new WeakMap(), pe = new WeakMap(), G = new WeakSet(), Mn = function(r) {
  T(this, ae, r);
  const i = new URL(r);
  this.setOriginConfig(i, i.hash), this.setConfuseConfig({
    password: this.getPassword(),
    hostname: this.getHostName(),
    port: this.getPort(),
    search: this.originConfig.search,
    hash: P.setPs(this.originPs, this.confusePs)
  }), O(this, G, Un).call(this);
}, Un = function() {
  const { password: r, hostname: i, port: o, search: l, hash: t } = this.confuseConfig;
  T(this, pe, `vless://${r}@${i}:${o}${l}${t}`);
};
var he, de, D, Bn, Hn, Yn;
class Yo extends Ee {
  constructor(r) {
    super();
    A(this, D);
    /** * @description 原始链接 */
    A(this, he, "");
    /** * @description 混淆链接 */
    A(this, de, "");
    O(this, D, Bn).call(this, r);
  }
  restore(r, i) {
    var o, l;
    return O(this, D, Yn).call(this, r), r.name = i, r.server = this.originConfig.add ?? "", r.port = Number(((o = this.originConfig) == null ? void 0 : o.port) ?? 0), r.uuid = ((l = this.originConfig) == null ? void 0 : l.id) ?? "", r;
  }
  get confuseLink() {
    return C(this, de);
  }
  get originLink() {
    return C(this, he);
  }
}
he = new WeakMap(), de = new WeakMap(), D = new WeakSet(), Bn = function(r) {
  const [i, o] = r.match(/vmess:\/\/(.*)/) || [], l = JSON.parse(_e(o));
  T(this, he, r), this.setOriginConfig(l, l.ps), this.setConfuseConfig({
    ...this.originConfig,
    add: this.getHostName(),
    port: this.getPort(),
    id: this.getPassword(),
    ps: P.setPs(this.originPs, this.confusePs),
    tls: this.originConfig.tls
  }), O(this, D, Hn).call(this);
}, Hn = function() {
  const { add: r, port: i, id: o, ps: l, scy: t, net: u, type: c, tls: f, v: a } = this.confuseConfig;
  T(this, de, `vmess://${He(JSON.stringify({ v: a, ps: l, add: r, port: i, id: o, scy: t, net: u, type: c, tls: f }))}`);
}, Yn = function(r) {
  r.network === "ws" && (r["ws-opts"] = {
    ...r["ws-opts"],
    path: this.originConfig.path,
    headers: {
      ...r["ws-opts"].headers,
      Host: this.originConfig.host
    }
  });
};
async function jo(e) {
  const n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  async function i(o) {
    for await (const l of o) {
      if (l.startsWith("vless:")) {
        const t = new Ho(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("vmess:")) {
        const t = new Yo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("trojan://")) {
        const t = new Bo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("ss://")) {
        const t = new Uo(l);
        n.add(t.confuseLink), r.set(t.confusePs, t);
      }
      if (l.startsWith("https://")) {
        const t = await on(Eo(l), { retries: 3 }).then((c) => c.data.text());
        ko(t) === "base64" && await i(Oo(t));
      }
    }
  }
  return await i(e), { urls: n, vpsMap: r };
}
async function $o(e) {
  const { searchParams: n } = new URL(e), i = n.get("links").split(/\||\n/).filter(Boolean), { urls: o, vpsMap: l } = await jo(i);
  return {
    base64: He(Array.from(o).join(`
`)),
    vpsMap: l
  };
}
let Fe = /* @__PURE__ */ new Map();
const qo = {
  async fetch(e, n) {
    try {
      const { pathname: r, origin: i } = new URL(e.url);
      if (r === "/getSub") {
        console.info("request.url", e.url);
        const { base64: o, vpsMap: l } = await $o(e.url);
        return Fe = l, new Response(o, {
          headers: new Headers({
            "Content-Type": "text/plain; charset=UTF-8",
            "Cache-Control": "no-store"
          })
        });
      }
      if (r === "/sub") {
        const o = So(e.url, n.BACKEND ?? ge.BACKEND), l = await on(o, { retries: 3 });
        if (!l.ok)
          throw new Error(l.statusText);
        const t = await l.data.text();
        if (!t)
          return Jn("confuseConfig is empty");
        console.info(`confuseConfig: ${t.length}`), console.info(`vpsMap: ${Fe.size}`);
        const u = Io(t, Fe);
        return Xn(
          _o(u, { indent: 2, lineWidth: 200 }),
          new Headers({
            "Content-Type": "text/yaml; charset=UTF-8",
            "Cache-Control": "no-store"
          })
        );
      }
      return Mo({
        url: n.PAGE_URL ?? ge.PAGE_URL,
        lockBackend: n.LOCK_BACKEND ?? ge.LOCK_BACKEND,
        remoteConfig: n.REMOTE_CONFIG ?? ge.REMOTE_CONFIG,
        origin: i
      });
    } catch (r) {
      return ln(r.message || r);
    }
  }
};
export {
  qo as default
};
