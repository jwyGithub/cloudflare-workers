const Ln = "RFC3986", vn = {
  RFC1738: (r) => String(r).replace(/%20/g, "+"),
  RFC3986: (r) => String(r)
}, jw = "RFC1738", Hw = Array.isArray, j = (() => {
  const r = [];
  for (let e = 0; e < 256; ++e)
    r.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return r;
})(), xn = 1024, Xw = (r, e, t, s, n) => {
  if (r.length === 0)
    return r;
  let i = r;
  if (typeof r == "symbol" ? i = Symbol.prototype.toString.call(r) : typeof r != "string" && (i = String(r)), t === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(o) {
      return "%26%23" + parseInt(o.slice(2), 16) + "%3B";
    });
  let c = "";
  for (let o = 0; o < i.length; o += xn) {
    const l = i.length >= xn ? i.slice(o, o + xn) : i, g = [];
    for (let $ = 0; $ < l.length; ++$) {
      let w = l.charCodeAt($);
      if (w === 45 || // -
      w === 46 || // .
      w === 95 || // _
      w === 126 || // ~
      w >= 48 && w <= 57 || // 0-9
      w >= 65 && w <= 90 || // a-z
      w >= 97 && w <= 122 || // A-Z
      n === jw && (w === 40 || w === 41)) {
        g[g.length] = l.charAt($);
        continue;
      }
      if (w < 128) {
        g[g.length] = j[w];
        continue;
      }
      if (w < 2048) {
        g[g.length] = j[192 | w >> 6] + j[128 | w & 63];
        continue;
      }
      if (w < 55296 || w >= 57344) {
        g[g.length] = j[224 | w >> 12] + j[128 | w >> 6 & 63] + j[128 | w & 63];
        continue;
      }
      $ += 1, w = 65536 + ((w & 1023) << 10 | l.charCodeAt($) & 1023), g[g.length] = j[240 | w >> 18] + j[128 | w >> 12 & 63] + j[128 | w >> 6 & 63] + j[128 | w & 63];
    }
    c += g.join("");
  }
  return c;
};
function Qw(r) {
  return !r || typeof r != "object" ? !1 : !!(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r));
}
function Hl(r, e) {
  if (Hw(r)) {
    const t = [];
    for (let s = 0; s < r.length; s += 1)
      t.push(e(r[s]));
    return t;
  }
  return e(r);
}
const Jw = Object.prototype.hasOwnProperty, rd = {
  brackets(r) {
    return String(r) + "[]";
  },
  comma: "comma",
  indices(r, e) {
    return String(r) + "[" + e + "]";
  },
  repeat(r) {
    return String(r);
  }
}, H = Array.isArray, qw = Array.prototype.push, cd = function(r, e) {
  qw.apply(r, H(e) ? e : [e]);
}, e$ = Date.prototype.toISOString, b = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Xw,
  encodeValuesOnly: !1,
  format: Ln,
  formatter: vn[Ln],
  /** @deprecated */
  indices: !1,
  serializeDate(r) {
    return e$.call(r);
  },
  skipNulls: !1,
  strictNullHandling: !1
};
function t$(r) {
  return typeof r == "string" || typeof r == "number" || typeof r == "boolean" || typeof r == "symbol" || typeof r == "bigint";
}
const zn = {};
function ad(r, e, t, s, n, i, c, o, l, g, $, w, f, A, U, le, it, Ft) {
  let m = r, Gt = Ft, Bt = 0, Ml = !1;
  for (; (Gt = Gt.get(zn)) !== void 0 && !Ml; ) {
    const L = Gt.get(r);
    if (Bt += 1, typeof L < "u") {
      if (L === Bt)
        throw new RangeError("Cyclic object value");
      Ml = !0;
    }
    typeof Gt.get(zn) > "u" && (Bt = 0);
  }
  if (typeof g == "function" ? m = g(e, m) : m instanceof Date ? m = f == null ? void 0 : f(m) : t === "comma" && H(m) && (m = Hl(m, function(L) {
    return L instanceof Date ? f == null ? void 0 : f(L) : L;
  })), m === null) {
    if (i)
      return l && !le ? (
        // @ts-expect-error
        l(e, b.encoder, it, "key", A)
      ) : e;
    m = "";
  }
  if (t$(m) || Qw(m)) {
    if (l) {
      const L = le ? e : l(e, b.encoder, it, "key", A);
      return [
        (U == null ? void 0 : U(L)) + "=" + // @ts-expect-error
        (U == null ? void 0 : U(l(m, b.encoder, it, "value", A)))
      ];
    }
    return [(U == null ? void 0 : U(e)) + "=" + (U == null ? void 0 : U(String(m)))];
  }
  const Un = [];
  if (typeof m > "u")
    return Un;
  let rt;
  if (t === "comma" && H(m))
    le && l && (m = Hl(m, l)), rt = [{ value: m.length > 0 ? m.join(",") || null : void 0 }];
  else if (H(g))
    rt = g;
  else {
    const L = Object.keys(m);
    rt = $ ? L.sort($) : L;
  }
  const Kl = o ? String(e).replace(/\./g, "%2E") : String(e), Nt = s && H(m) && m.length === 1 ? Kl + "[]" : Kl;
  if (n && H(m) && m.length === 0)
    return Nt + "[]";
  for (let L = 0; L < rt.length; ++L) {
    const Re = rt[L], Wl = (
      // @ts-ignore
      typeof Re == "object" && typeof Re.value < "u" ? Re.value : m[Re]
    );
    if (c && Wl === null)
      continue;
    const bn = w && o ? Re.replace(/\./g, "%2E") : Re, Ww = H(m) ? typeof t == "function" ? t(Nt, bn) : Nt : Nt + (w ? "." + bn : "[" + bn + "]");
    Ft.set(r, Bt);
    const jl = /* @__PURE__ */ new WeakMap();
    jl.set(zn, Ft), cd(Un, ad(
      Wl,
      Ww,
      t,
      s,
      n,
      i,
      c,
      o,
      // @ts-ignore
      t === "comma" && le && H(m) ? null : l,
      g,
      $,
      w,
      f,
      A,
      U,
      le,
      it,
      jl
    ));
  }
  return Un;
}
function s$(r = b) {
  if (typeof r.allowEmptyArrays < "u" && typeof r.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof r.encodeDotInKeys < "u" && typeof r.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (r.encoder !== null && typeof r.encoder < "u" && typeof r.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  const e = r.charset || b.charset;
  if (typeof r.charset < "u" && r.charset !== "utf-8" && r.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let t = Ln;
  if (typeof r.format < "u") {
    if (!Jw.call(vn, r.format))
      throw new TypeError("Unknown format option provided.");
    t = r.format;
  }
  const s = vn[t];
  let n = b.filter;
  (typeof r.filter == "function" || H(r.filter)) && (n = r.filter);
  let i;
  if (r.arrayFormat && r.arrayFormat in rd ? i = r.arrayFormat : "indices" in r ? i = r.indices ? "indices" : "repeat" : i = b.arrayFormat, "commaRoundTrip" in r && typeof r.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const c = typeof r.allowDots > "u" ? r.encodeDotInKeys ? !0 : b.allowDots : !!r.allowDots;
  return {
    addQueryPrefix: typeof r.addQueryPrefix == "boolean" ? r.addQueryPrefix : b.addQueryPrefix,
    // @ts-ignore
    allowDots: c,
    allowEmptyArrays: typeof r.allowEmptyArrays == "boolean" ? !!r.allowEmptyArrays : b.allowEmptyArrays,
    arrayFormat: i,
    charset: e,
    charsetSentinel: typeof r.charsetSentinel == "boolean" ? r.charsetSentinel : b.charsetSentinel,
    commaRoundTrip: !!r.commaRoundTrip,
    delimiter: typeof r.delimiter > "u" ? b.delimiter : r.delimiter,
    encode: typeof r.encode == "boolean" ? r.encode : b.encode,
    encodeDotInKeys: typeof r.encodeDotInKeys == "boolean" ? r.encodeDotInKeys : b.encodeDotInKeys,
    encoder: typeof r.encoder == "function" ? r.encoder : b.encoder,
    encodeValuesOnly: typeof r.encodeValuesOnly == "boolean" ? r.encodeValuesOnly : b.encodeValuesOnly,
    filter: n,
    format: t,
    formatter: s,
    serializeDate: typeof r.serializeDate == "function" ? r.serializeDate : b.serializeDate,
    skipNulls: typeof r.skipNulls == "boolean" ? r.skipNulls : b.skipNulls,
    // @ts-ignore
    sort: typeof r.sort == "function" ? r.sort : null,
    strictNullHandling: typeof r.strictNullHandling == "boolean" ? r.strictNullHandling : b.strictNullHandling
  };
}
function n$(r, e = {}) {
  let t = r;
  const s = s$(e);
  let n, i;
  typeof s.filter == "function" ? (i = s.filter, t = i("", t)) : H(s.filter) && (i = s.filter, n = i);
  const c = [];
  if (typeof t != "object" || t === null)
    return "";
  const o = rd[s.arrayFormat], l = o === "comma" && s.commaRoundTrip;
  n || (n = Object.keys(t)), s.sort && n.sort(s.sort);
  const g = /* @__PURE__ */ new WeakMap();
  for (let f = 0; f < n.length; ++f) {
    const A = n[f];
    s.skipNulls && t[A] === null || cd(c, ad(
      t[A],
      A,
      // @ts-expect-error
      o,
      l,
      s.allowEmptyArrays,
      s.strictNullHandling,
      s.skipNulls,
      s.encodeDotInKeys,
      s.encode ? s.encoder : null,
      s.filter,
      s.sort,
      s.allowDots,
      s.serializeDate,
      s.format,
      s.formatter,
      s.encodeValuesOnly,
      s.charset,
      g
    ));
  }
  const $ = c.join(s.delimiter);
  let w = s.addQueryPrefix === !0 ? "?" : "";
  return s.charsetSentinel && (s.charset === "iso-8859-1" ? w += "utf8=%26%2310003%3B&" : w += "utf8=%E2%9C%93&"), $.length > 0 ? w + $ : "";
}
const Le = "4.1.0";
class d extends Error {
}
class v extends d {
  constructor(e, t, s, n) {
    super(`${v.makeMessage(e, t, s)}`), this.status = e, this.headers = n, this.error = t;
    const i = t;
    this.errors = (i == null ? void 0 : i.errors) ?? [];
  }
  static makeMessage(e, t, s) {
    const n = t != null && t.message ? typeof t.message == "string" ? t.message : JSON.stringify(t.message) : t ? JSON.stringify(t) : s;
    return e && n ? `${e} ${n}` : e ? `${e} status code (no body)` : n || "(no status code or body)";
  }
  static generate(e, t, s, n) {
    if (!e || !n)
      return new ss({ message: s, cause: Cn(t) });
    const i = t;
    return e === 400 ? new ud(e, i, s, n) : e === 401 ? new ld(e, i, s, n) : e === 403 ? new dd(e, i, s, n) : e === 404 ? new hd(e, i, s, n) : e === 409 ? new _d(e, i, s, n) : e === 422 ? new gd(e, i, s, n) : e === 429 ? new pd(e, i, s, n) : e >= 500 ? new wd(e, i, s, n) : new v(e, i, s, n);
  }
}
class In extends v {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}
class ss extends v {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}
class od extends ss {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}
class ud extends v {
}
class ld extends v {
}
class dd extends v {
}
class hd extends v {
}
class _d extends v {
}
class gd extends v {
}
class pd extends v {
}
class wd extends v {
}
let Xl = !1, at, $d, md, kn, Vn, yd, fd, Pd;
function i$(r, e = { auto: !1 }) {
  if (Xl)
    throw new Error(`you must \`import 'cloudflare/shims/${r.kind}'\` before importing anything else from cloudflare`);
  if (at)
    throw new Error(`can't \`import 'cloudflare/shims/${r.kind}'\` after \`import 'cloudflare/shims/${at}'\``);
  Xl = e.auto, at = r.kind, $d = r.fetch, md = r.FormData, kn = r.File, Vn = r.getMultipartRequestOptions, yd = r.getDefaultAgent, fd = r.fileFromPath, Pd = r.isFsReadStream;
}
class r$ {
  constructor(e) {
    this.body = e;
  }
  get [Symbol.toStringTag]() {
    return "MultipartBody";
  }
}
function c$({ manuallyImported: r } = {}) {
  const e = r ? "You may need to use polyfills" : "Add one of these imports before your first `import … from 'cloudflare'`:\n- `import 'cloudflare/shims/node'` (if you're running on Node)\n- `import 'cloudflare/shims/web'` (otherwise)\n";
  let t, s, n, i;
  try {
    t = fetch, s = Request, n = Response, i = Headers;
  } catch (c) {
    throw new Error(`this environment is missing the following Web Fetch API type: ${c.message}. ${e}`);
  }
  return {
    kind: "web",
    fetch: t,
    Request: s,
    Response: n,
    Headers: i,
    FormData: (
      // @ts-ignore
      typeof FormData < "u" ? FormData : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${e}`);
        }
      }
    ),
    Blob: typeof Blob < "u" ? Blob : class {
      constructor() {
        throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${e}`);
      }
    },
    File: (
      // @ts-ignore
      typeof File < "u" ? File : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${e}`);
        }
      }
    ),
    ReadableStream: (
      // @ts-ignore
      typeof ReadableStream < "u" ? ReadableStream : class {
        // @ts-ignore
        constructor() {
          throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${e}`);
        }
      }
    ),
    getMultipartRequestOptions: async (c, o) => ({
      ...o,
      body: new r$(c)
    }),
    getDefaultAgent: (c) => {
    },
    fileFromPath: () => {
      throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/cloudflare/cloudflare-typescript#file-uploads");
    },
    isFsReadStream: (c) => !1
  };
}
at || i$(c$(), { auto: !0 });
const Ud = (r) => r != null && typeof r == "object" && typeof r.url == "string" && typeof r.blob == "function", bd = (r) => r != null && typeof r == "object" && typeof r.name == "string" && typeof r.lastModified == "number" && ns(r), ns = (r) => r != null && typeof r == "object" && typeof r.size == "number" && typeof r.type == "string" && typeof r.text == "function" && typeof r.slice == "function" && typeof r.arrayBuffer == "function", xd = (r) => bd(r) || Ud(r) || Pd(r);
async function zd(r, e, t) {
  var n;
  if (r = await r, bd(r))
    return r;
  if (Ud(r)) {
    const i = await r.blob();
    e || (e = new URL(r.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
    const c = ns(i) ? [await i.arrayBuffer()] : [i];
    return new kn(c, e, t);
  }
  const s = await a$(r);
  if (e || (e = u$(r) ?? "unknown_file"), !(t != null && t.type)) {
    const i = (n = s[0]) == null ? void 0 : n.type;
    typeof i == "string" && (t = { ...t, type: i });
  }
  return new kn(s, e, t);
}
async function a$(r) {
  var t;
  let e = [];
  if (typeof r == "string" || ArrayBuffer.isView(r) || // includes Uint8Array, Buffer, etc.
  r instanceof ArrayBuffer)
    e.push(r);
  else if (ns(r))
    e.push(await r.arrayBuffer());
  else if (l$(r))
    for await (const s of r)
      e.push(s);
  else
    throw new Error(`Unexpected data type: ${typeof r}; constructor: ${(t = r == null ? void 0 : r.constructor) == null ? void 0 : t.name}; props: ${o$(r)}`);
  return e;
}
function o$(r) {
  return `[${Object.getOwnPropertyNames(r).map((t) => `"${t}"`).join(", ")}]`;
}
function u$(r) {
  var e;
  return Sn(r.name) || Sn(r.filename) || // For fs.ReadStream
  ((e = Sn(r.path)) == null ? void 0 : e.split(/[\\/]/).pop());
}
const Sn = (r) => {
  if (typeof r == "string")
    return r;
  if (typeof Buffer < "u" && r instanceof Buffer)
    return String(r);
}, l$ = (r) => r != null && typeof r == "object" && typeof r[Symbol.asyncIterator] == "function", Ql = (r) => r && typeof r == "object" && r.body && r[Symbol.toStringTag] === "MultipartBody", Tn = async (r) => {
  if (!On(r.body))
    return r;
  const e = await Sd(r.body);
  return Vn(e, r);
}, R = async (r) => {
  const e = await Sd(r.body);
  return Vn(e, r);
}, Sd = async (r) => {
  const e = new md();
  return await Promise.all(Object.entries(r || {}).map(([t, s]) => Zn(e, t, s))), e;
}, On = (r) => {
  if (xd(r))
    return !0;
  if (Array.isArray(r))
    return r.some(On);
  if (r && typeof r == "object") {
    for (const e in r)
      if (On(r[e]))
        return !0;
  }
  return !1;
}, Zn = async (r, e, t) => {
  if (t !== void 0) {
    if (t == null)
      throw new TypeError(`Received null for "${e}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof t == "string" || typeof t == "number" || typeof t == "boolean")
      r.append(e, String(t));
    else if (xd(t)) {
      const s = await zd(t);
      r.append(e, s);
    } else if (Array.isArray(t))
      await Promise.all(t.map((s) => Zn(r, e + "[]", s)));
    else if (typeof t == "object")
      await Promise.all(Object.entries(t).map(([s, n]) => Zn(r, `${e}[${s}]`, n)));
    else
      throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${t} instead`);
  }
};
var d$ = function(r, e, t, s, n) {
  if (s === "m") throw new TypeError("Private method is not writable");
  if (s === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? r !== e || !n : !e.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return s === "a" ? n.call(r, t) : n ? n.value = t : e.set(r, t), t;
}, h$ = function(r, e, t, s) {
  if (t === "a" && !s) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? r !== e || !s : !e.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? s : t === "a" ? s.call(r) : s ? s.value : e.get(r);
}, Mt;
async function Ad(r) {
  const { response: e } = r;
  if (e.status === 204)
    return null;
  if (r.options.__binaryResponse)
    return e;
  const t = e.headers.get("content-type");
  if ((t == null ? void 0 : t.includes("application/json")) || (t == null ? void 0 : t.includes("application/vnd.api+json"))) {
    const i = await e.json();
    return ot("response", e.status, e.url, e.headers, i), i;
  }
  const n = await e.text();
  return ot("response", e.status, e.url, e.headers, n), n;
}
class is extends Promise {
  constructor(e, t = Ad) {
    super((s) => {
      s(null);
    }), this.responsePromise = e, this.parseResponse = t;
  }
  _thenUnwrap(e) {
    return new is(this.responsePromise, async (t) => e(await this.parseResponse(t), t));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'cloudflare'`:
   * - `import 'cloudflare/shims/node'` (if you're running on Node)
   * - `import 'cloudflare/shims/web'` (otherwise)
   */
  asResponse() {
    return this.responsePromise.then((e) => e.response);
  }
  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'cloudflare'`:
   * - `import 'cloudflare/shims/node'` (if you're running on Node)
   * - `import 'cloudflare/shims/web'` (otherwise)
   */
  async withResponse() {
    const [e, t] = await Promise.all([this.parse(), this.asResponse()]);
    return { data: e, response: t };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then(this.parseResponse)), this.parsedPromise;
  }
  then(e, t) {
    return this.parse().then(e, t);
  }
  catch(e) {
    return this.parse().catch(e);
  }
  finally(e) {
    return this.parse().finally(e);
  }
}
class _$ {
  constructor({
    baseURL: e,
    maxRetries: t = 2,
    timeout: s = 6e4,
    // 1 minute
    httpAgent: n,
    fetch: i
  }) {
    this.baseURL = e, this.maxRetries = An("maxRetries", t), this.timeout = An("timeout", s), this.httpAgent = n, this.fetch = i ?? $d;
  }
  authHeaders(e) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  defaultHeaders(e) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": this.getUserAgent(),
      ...y$(),
      ...this.authHeaders(e)
    };
  }
  /**
   * Override this to add your own headers validation:
   */
  validateHeaders(e, t) {
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${x$()}`;
  }
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, s) {
    return this.request(Promise.resolve(s).then(async (n) => {
      const i = n && ns(n == null ? void 0 : n.body) ? new DataView(await n.body.arrayBuffer()) : (n == null ? void 0 : n.body) instanceof DataView ? n.body : (n == null ? void 0 : n.body) instanceof ArrayBuffer ? new DataView(n.body) : n && ArrayBuffer.isView(n == null ? void 0 : n.body) ? new DataView(n.body.buffer) : n == null ? void 0 : n.body;
      return { method: e, path: t, ...n, body: i };
    }));
  }
  getAPIList(e, t, s) {
    return this.requestAPIList(t, { method: "get", path: e, ...s });
  }
  calculateContentLength(e) {
    if (typeof e == "string") {
      if (typeof Buffer < "u")
        return Buffer.byteLength(e, "utf8").toString();
      if (typeof TextEncoder < "u")
        return new TextEncoder().encode(e).length.toString();
    } else if (ArrayBuffer.isView(e))
      return e.byteLength.toString();
    return null;
  }
  buildRequest(e, { retryCount: t = 0 } = {}) {
    var U;
    e = { ...e };
    const { method: s, path: n, query: i, headers: c = {} } = e, o = ArrayBuffer.isView(e.body) || e.__binaryRequest && typeof e.body == "string" ? e.body : Ql(e.body) ? e.body.body : e.body ? JSON.stringify(e.body, null, 2) : null, l = this.calculateContentLength(o), g = this.buildURL(n, i);
    "timeout" in e && An("timeout", e.timeout), e.timeout = e.timeout ?? this.timeout;
    const $ = e.httpAgent ?? this.httpAgent ?? yd(g), w = e.timeout + 1e3;
    typeof ((U = $ == null ? void 0 : $.options) == null ? void 0 : U.timeout) == "number" && w > ($.options.timeout ?? 0) && ($.options.timeout = w), this.idempotencyHeader && s !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), c[this.idempotencyHeader] = e.idempotencyKey);
    const f = this.buildHeaders({ options: e, headers: c, contentLength: l, retryCount: t });
    return { req: {
      method: s,
      ...o && { body: o },
      headers: f,
      ...$ && { agent: $ },
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: e.signal ?? null
    }, url: g, timeout: e.timeout };
  }
  buildHeaders({ options: e, headers: t, contentLength: s, retryCount: n }) {
    const i = {};
    s && (i["content-length"] = s);
    const c = this.defaultHeaders(e);
    return td(i, c), td(i, t), Ql(e.body) && at !== "node" && delete i["content-type"], Kt(c, "x-stainless-retry-count") === void 0 && Kt(t, "x-stainless-retry-count") === void 0 && (i["x-stainless-retry-count"] = String(n)), Kt(c, "x-stainless-timeout") === void 0 && Kt(t, "x-stainless-timeout") === void 0 && e.timeout && (i["x-stainless-timeout"] = String(e.timeout)), this.validateHeaders(i, t), i;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(e) {
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(e, { url: t, options: s }) {
  }
  parseHeaders(e) {
    return e ? Symbol.iterator in e ? Object.fromEntries(Array.from(e).map((t) => [...t])) : { ...e } : {};
  }
  makeStatusError(e, t, s, n) {
    return v.generate(e, t, s, n);
  }
  request(e, t = null) {
    return new is(this.makeRequest(e, t));
  }
  async makeRequest(e, t) {
    var w, f;
    const s = await e, n = s.maxRetries ?? this.maxRetries;
    t == null && (t = n), await this.prepareOptions(s);
    const { req: i, url: c, timeout: o } = this.buildRequest(s, { retryCount: n - t });
    if (await this.prepareRequest(i, { url: c, options: s }), ot("request", c, s, i.headers), (w = s.signal) != null && w.aborted)
      throw new In();
    const l = new AbortController(), g = await this.fetchWithTimeout(c, i, o, l).catch(Cn);
    if (g instanceof Error) {
      if ((f = s.signal) != null && f.aborted)
        throw new In();
      if (t)
        return this.retryRequest(s, t);
      throw g.name === "AbortError" ? new od() : new ss({ cause: g });
    }
    const $ = p$(g.headers);
    if (!g.ok) {
      if (t && this.shouldRetry(g)) {
        const m = `retrying, ${t} attempts remaining`;
        return ot(`response (error; ${m})`, g.status, c, $), this.retryRequest(s, t, $);
      }
      const A = await g.text().catch((m) => Cn(m).message), U = f$(A), le = U ? void 0 : A;
      throw ot(`response (error; ${t ? "(error; no more retries left)" : "(error; not retryable)"})`, g.status, c, $, le), this.makeStatusError(g.status, U, le, $);
    }
    return { response: g, options: s, controller: l };
  }
  requestAPIList(e, t) {
    const s = this.makeRequest(t, null);
    return new g$(this, s, e);
  }
  buildURL(e, t) {
    const s = U$(e) ? new URL(e) : new URL(this.baseURL + (this.baseURL.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), n = this.defaultQuery();
    return ve(n) || (t = { ...n, ...t }), typeof t == "object" && t && !Array.isArray(t) && (s.search = this.stringifyQuery(t)), s.toString();
  }
  stringifyQuery(e) {
    return Object.entries(e).filter(([t, s]) => typeof s < "u").map(([t, s]) => {
      if (typeof s == "string" || typeof s == "number" || typeof s == "boolean")
        return `${encodeURIComponent(t)}=${encodeURIComponent(s)}`;
      if (s === null)
        return `${encodeURIComponent(t)}=`;
      throw new d(`Cannot stringify type ${typeof s}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
    }).join("&");
  }
  async fetchWithTimeout(e, t, s, n) {
    const { signal: i, ...c } = t || {};
    i && i.addEventListener("abort", () => n.abort());
    const o = setTimeout(() => n.abort(), s), l = {
      signal: n.signal,
      ...c
    };
    return l.method && (l.method = l.method.toUpperCase()), // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
    this.fetch.call(void 0, e, l).finally(() => {
      clearTimeout(o);
    });
  }
  shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, t, s) {
    let n;
    const i = s == null ? void 0 : s["retry-after-ms"];
    if (i) {
      const o = parseFloat(i);
      Number.isNaN(o) || (n = o);
    }
    const c = s == null ? void 0 : s["retry-after"];
    if (c && !n) {
      const o = parseFloat(c);
      Number.isNaN(o) ? n = Date.parse(c) - Date.now() : n = o * 1e3;
    }
    if (!(n && 0 <= n && n < 60 * 1e3)) {
      const o = e.maxRetries ?? this.maxRetries;
      n = this.calculateDefaultRetryTimeoutMillis(t, o);
    }
    return await b$(n), this.makeRequest(e, t - 1);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const i = t - e, c = Math.min(0.5 * Math.pow(2, i), 8), o = 1 - Math.random() * 0.25;
    return c * o * 1e3;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${Le}`;
  }
}
class ut {
  constructor(e, t, s, n) {
    Mt.set(this, void 0), d$(this, Mt, e, "f"), this.options = n, this.response = t, this.body = s;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageInfo() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageInfo();
    if (!e)
      throw new d("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    const t = { ...this.options };
    if ("params" in e && typeof t.query == "object")
      t.query = { ...t.query, ...e.params };
    else if ("url" in e) {
      const s = [...Object.entries(t.query || {}), ...e.url.searchParams.entries()];
      for (const [n, i] of s)
        e.url.searchParams.set(n, i);
      t.query = void 0, t.path = e.url.toString();
    }
    return await h$(this, Mt, "f").requestAPIList(this.constructor, t);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(Mt = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages())
      for (const t of e.getPaginatedItems())
        yield t;
  }
}
class g$ extends is {
  constructor(e, t, s) {
    super(t, async (n) => new s(e, n.response, await Ad(n), n.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e)
      yield t;
  }
}
const p$ = (r) => new Proxy(Object.fromEntries(
  // @ts-ignore
  r.entries()
), {
  get(e, t) {
    const s = t.toString();
    return e[s.toLowerCase()] || e[s];
  }
}), w$ = {
  method: !0,
  path: !0,
  query: !0,
  body: !0,
  headers: !0,
  maxRetries: !0,
  stream: !0,
  timeout: !0,
  httpAgent: !0,
  signal: !0,
  idempotencyKey: !0,
  __binaryRequest: !0,
  __binaryResponse: !0
}, u = (r) => typeof r == "object" && r !== null && !ve(r) && Object.keys(r).every((e) => Rd(w$, e)), $$ = () => {
  var e;
  if (typeof Deno < "u" && Deno.build != null)
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Le,
      "X-Stainless-OS": ql(Deno.build.os),
      "X-Stainless-Arch": Jl(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : ((e = Deno.version) == null ? void 0 : e.deno) ?? "unknown"
    };
  if (typeof EdgeRuntime < "u")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Le,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": process.version
    };
  if (Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Le,
      "X-Stainless-OS": ql(process.platform),
      "X-Stainless-Arch": Jl(process.arch),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": process.version
    };
  const r = m$();
  return r ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Le,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${r.browser}`,
    "X-Stainless-Runtime-Version": r.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Le,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function m$() {
  if (typeof navigator > "u" || !navigator)
    return null;
  const r = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key: e, pattern: t } of r) {
    const s = t.exec(navigator.userAgent);
    if (s) {
      const n = s[1] || 0, i = s[2] || 0, c = s[3] || 0;
      return { browser: e, version: `${n}.${i}.${c}` };
    }
  }
  return null;
}
const Jl = (r) => r === "x32" ? "x32" : r === "x86_64" || r === "x64" ? "x64" : r === "arm" ? "arm" : r === "aarch64" || r === "arm64" ? "arm64" : r ? `other:${r}` : "unknown", ql = (r) => (r = r.toLowerCase(), r.includes("ios") ? "iOS" : r === "android" ? "Android" : r === "darwin" ? "MacOS" : r === "win32" ? "Windows" : r === "freebsd" ? "FreeBSD" : r === "openbsd" ? "OpenBSD" : r === "linux" ? "Linux" : r ? `Other:${r}` : "Unknown");
let ed;
const y$ = () => ed ?? (ed = $$()), f$ = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return;
  }
}, P$ = /^[a-z][a-z0-9+.-]*:/i, U$ = (r) => P$.test(r), b$ = (r) => new Promise((e) => setTimeout(e, r)), An = (r, e) => {
  if (typeof e != "number" || !Number.isInteger(e))
    throw new d(`${r} must be an integer`);
  if (e < 0)
    throw new d(`${r} must be a positive integer`);
  return e;
}, Cn = (r) => {
  if (r instanceof Error)
    return r;
  if (typeof r == "object" && r !== null)
    try {
      return new Error(JSON.stringify(r));
    } catch {
    }
  return new Error(r);
}, ct = (r) => {
  var e, t, s, n, i;
  if (typeof process < "u")
    return ((t = (e = process.env) == null ? void 0 : e[r]) == null ? void 0 : t.trim()) ?? void 0;
  if (typeof Deno < "u")
    return (i = (n = (s = Deno.env) == null ? void 0 : s.get) == null ? void 0 : n.call(s, r)) == null ? void 0 : i.trim();
};
function ve(r) {
  if (!r)
    return !0;
  for (const e in r)
    return !1;
  return !0;
}
function Rd(r, e) {
  return Object.prototype.hasOwnProperty.call(r, e);
}
function td(r, e) {
  for (const t in e) {
    if (!Rd(e, t))
      continue;
    const s = t.toLowerCase();
    if (!s)
      continue;
    const n = e[t];
    n === null ? delete r[s] : n !== void 0 && (r[s] = n);
  }
}
function ot(r, ...e) {
  var t;
  typeof process < "u" && ((t = process == null ? void 0 : process.env) == null ? void 0 : t.DEBUG) === "true" && console.log(`Cloudflare:DEBUG:${r}`, ...e);
}
const x$ = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (r) => {
  const e = Math.random() * 16 | 0;
  return (r === "x" ? e : e & 3 | 8).toString(16);
}), z$ = (r) => typeof (r == null ? void 0 : r.get) == "function", Kt = (r, e) => {
  var s;
  const t = e.toLowerCase();
  if (z$(r)) {
    const n = ((s = e[0]) == null ? void 0 : s.toUpperCase()) + e.substring(1).replace(/([^\w])(\w)/g, (i, c, o) => c + o.toUpperCase());
    for (const i of [e, t, e.toUpperCase(), n]) {
      const c = r.get(i);
      if (c)
        return c;
    }
  }
  for (const [n, i] of Object.entries(r))
    if (n.toLowerCase() === t)
      return Array.isArray(i) ? (i.length <= 1 || console.warn(`Received ${i.length} entries for the ${e} header, using the first entry.`), i[0]) : i;
};
class F extends ut {
  constructor(e, t, s, n) {
    super(e, t, s, n), this.result = s.result || {}, this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    var e;
    return ((e = this.result) == null ? void 0 : e.items) ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const e = this.nextPageInfo();
    if (!e)
      return null;
    if ("params" in e)
      return e.params;
    const t = Object.fromEntries(e.url.searchParams);
    return Object.keys(t).length ? t : null;
  }
  nextPageInfo() {
    const e = this.options.query;
    return { params: { page: ((e == null ? void 0 : e.page) ?? 1) + 1 } };
  }
}
class p extends ut {
  constructor(e, t, s, n) {
    super(e, t, s, n), this.result = s.result || [], this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const e = this.nextPageInfo();
    if (!e)
      return null;
    if ("params" in e)
      return e.params;
    const t = Object.fromEntries(e.url.searchParams);
    return Object.keys(t).length ? t : null;
  }
  nextPageInfo() {
    const e = this.options.query;
    return { params: { page: ((e == null ? void 0 : e.page) ?? 1) + 1 } };
  }
}
class Ld extends ut {
  constructor(e, t, s, n) {
    super(e, t, s, n), this.result = s.result || [], this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const e = this.nextPageInfo();
    if (!e)
      return null;
    if ("params" in e)
      return e.params;
    const t = Object.fromEntries(e.url.searchParams);
    return Object.keys(t).length ? t : null;
  }
  nextPageInfo() {
    var t;
    const e = (t = this.result_info) == null ? void 0 : t.cursor;
    return e ? {
      params: {
        cursor: e
      }
    } : null;
  }
}
class Dn extends ut {
  constructor(e, t, s, n) {
    super(e, t, s, n), this.result = s.result || [], this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const e = this.nextPageInfo();
    if (!e)
      return null;
    if ("params" in e)
      return e.params;
    const t = Object.fromEntries(e.url.searchParams);
    return Object.keys(t).length ? t : null;
  }
  nextPageInfo() {
    var t;
    const e = (t = this.result_info) == null ? void 0 : t.cursor;
    return e ? {
      params: {
        cursor: e
      }
    } : null;
  }
}
class h extends ut {
  constructor(e, t, s, n) {
    super(e, t, s, n), this.result = s.result || [];
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams() {
    return null;
  }
  nextPageInfo() {
    return null;
  }
}
class S$ extends p {
}
class A$ extends p {
}
class vd extends h {
}
class Id extends p {
}
class kd extends p {
}
class a {
  constructor(e) {
    this._client = e;
  }
}
class Od extends a {
  /**
   * Set Total TLS Settings or disable the feature for a Zone.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/acm/total_tls`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Total TLS Settings for a Zone.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/acm/total_tls`, t)._thenUnwrap((n) => n.result);
  }
}
class En extends a {
  constructor() {
    super(...arguments), this.totalTLS = new Od(this._client);
  }
}
En.TotalTLS = Od;
class Yn extends a {
  /**
   * Author Search
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/ai/authors/search`, Fn, t);
  }
}
class Fn extends h {
}
Yn.AuthorListResponsesSinglePage = Fn;
class Gn extends a {
  /**
   * Task Search
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/ai/tasks/search`, Bn, t);
  }
}
class Bn extends h {
}
Gn.TaskListResponsesSinglePage = Bn;
let Zd = class extends a {
  /**
   * Upload a Finetune Asset
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/ai/finetunes/${e}/finetune-assets`, R({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
};
class Nn extends a {
  /**
   * List Public Finetunes
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/ai/finetunes/public`, Mn, { query: n, ...t });
  }
}
class Mn extends h {
}
Nn.PublicListResponsesSinglePage = Mn;
class lt extends a {
  constructor() {
    super(...arguments), this.assets = new Zd(this._client), this.public = new Nn(this._client);
  }
  /**
   * Create a new Finetune
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/ai/finetunes`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List Finetunes
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/ai/finetunes`, t)._thenUnwrap((n) => n.result);
  }
}
lt.Assets = Zd;
lt.Public = Nn;
lt.PublicListResponsesSinglePage = Mn;
class Cd extends a {
  /**
   * Get Model Schema
   */
  get(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/ai/models/schema`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
}
class rs extends a {
  constructor() {
    super(...arguments), this.schema = new Cd(this._client);
  }
  /**
   * Model Search
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/ai/models/search`, Kn, { query: n, ...t });
  }
}
class Kn extends p {
}
rs.ModelListResponsesV4PagePaginationArray = Kn;
rs.Schema = Cd;
let ne = class extends a {
  constructor() {
    super(...arguments), this.finetunes = new lt(this._client), this.authors = new Yn(this._client), this.tasks = new Gn(this._client), this.models = new rs(this._client);
  }
  /**
   * This endpoint provides users with the capability to run specific AI models
   * on-demand.
   *
   * By submitting the required input data, users can receive real-time predictions
   * or results generated by the chosen AI model. The endpoint supports various AI
   * model types, ensuring flexibility and adaptability for diverse use cases.
   *
   * Model specific inputs available in
   * [Cloudflare Docs](https://developers.cloudflare.com/workers-ai/models/).
   */
  run(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/ai/run/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
ne.Finetunes = lt;
ne.Authors = Yn;
ne.AuthorListResponsesSinglePage = Fn;
ne.Tasks = Gn;
ne.TaskListResponsesSinglePage = Bn;
ne.Models = rs;
ne.ModelListResponsesV4PagePaginationArray = Kn;
let Wn = class extends a {
  /**
   * Create a new Dataset
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/ai-gateway/gateways/${e}/datasets`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a Dataset
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/ai-gateway/gateways/${e}/datasets/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * List Datasets
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/ai-gateway/gateways/${e}/datasets`, jn, { query: i, ...s });
  }
  /**
   * Delete a Dataset
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/ai-gateway/gateways/${e}/datasets/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a Dataset
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${e}/datasets/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class jn extends p {
}
Wn.DatasetListResponsesV4PagePaginationArray = jn;
class Hn extends a {
  /**
   * List Evaluators
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/ai-gateway/evaluation-types`, Xn, { query: n, ...t });
  }
}
class Xn extends p {
}
Hn.EvaluationTypeListResponsesV4PagePaginationArray = Xn;
class Qn extends a {
  /**
   * Create a new Evaluation
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/ai-gateway/gateways/${e}/evaluations`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Evaluations
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/ai-gateway/gateways/${e}/evaluations`, Jn, { query: i, ...s });
  }
  /**
   * Delete a Evaluation
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/ai-gateway/gateways/${e}/evaluations/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a Evaluation
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${e}/evaluations/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Jn extends p {
}
Qn.EvaluationListResponsesV4PagePaginationArray = Jn;
let qn = class extends a {
  /**
   * List Gateway Logs
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/ai-gateway/gateways/${e}/logs`, ei, { query: i, ...s });
  }
  /**
   * Delete Gateway Logs
   */
  delete(e, t, s) {
    const { account_id: n, filters: i, limit: c, order_by: o, order_by_direction: l } = t;
    return this._client.delete(`/accounts/${n}/ai-gateway/gateways/${e}/logs`, {
      query: { filters: i, limit: c, order_by: o, order_by_direction: l },
      ...s
    });
  }
  /**
   * Patch Gateway Log
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/ai-gateway/gateways/${e}/logs/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Get Gateway Log Detail
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${e}/logs/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Get Gateway Log Request
   */
  request(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${e}/logs/${t}/request`, n);
  }
  /**
   * Get Gateway Log Response
   */
  response(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${e}/logs/${t}/response`, n);
  }
};
class ei extends p {
}
qn.LogListResponsesV4PagePaginationArray = ei;
class X extends a {
  constructor() {
    super(...arguments), this.evaluationTypes = new Hn(this._client), this.logs = new qn(this._client), this.datasets = new Wn(this._client), this.evaluations = new Qn(this._client);
  }
  /**
   * Create a new Gateway
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/ai-gateway/gateways`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Gateway
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/ai-gateway/gateways/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Gateways
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/ai-gateway/gateways`, R$, { query: n, ...t });
  }
  /**
   * Delete a Gateway
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/ai-gateway/gateways/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a Gateway
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/ai-gateway/gateways/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class R$ extends p {
}
X.EvaluationTypes = Hn;
X.EvaluationTypeListResponsesV4PagePaginationArray = Xn;
X.Logs = qn;
X.LogListResponsesV4PagePaginationArray = ei;
X.Datasets = Wn;
X.DatasetListResponsesV4PagePaginationArray = jn;
X.Evaluations = Qn;
X.EvaluationListResponsesV4PagePaginationArray = Jn;
let Vd = class extends a {
  /**
   * Set configuration properties
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/api_gateway/configuration`, { body: n, ...t });
  }
  /**
   * Retrieve information about specific configuration properties
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/api_gateway/configuration`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
};
class Td extends a {
  /**
   * Retrieve operations and features as OpenAPI schemas
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/api_gateway/schemas`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
}
let Dd = class extends a {
  /**
   * Retrieve the most up to date view of discovered operations
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/api_gateway/discovery/operations`, L$, { query: n, ...t });
  }
  /**
   * Update the `state` on one or more discovered operations
   */
  bulkEdit(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.patch(`/zones/${s}/api_gateway/discovery/operations`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update the `state` on a discovered operation
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/api_gateway/discovery/operations/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class ti extends a {
  constructor() {
    super(...arguments), this.operations = new Dd(this._client);
  }
  /**
   * Retrieve the most up to date view of discovered operations, rendered as OpenAPI
   * schemas
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/api_gateway/discovery`, t)._thenUnwrap((n) => n.result);
  }
}
class L$ extends p {
}
ti.Operations = Dd;
class Ed extends a {
  /**
   * Generate fallthrough WAF expression template from a set of API hosts
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/api_gateway/expression-template/fallthrough`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class si extends a {
  constructor() {
    super(...arguments), this.fallthrough = new Ed(this._client);
  }
}
si.Fallthrough = Ed;
let Yd = class extends a {
  /**
   * Updates operation-level schema validation settings on the zone
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/api_gateway/operations/${e}/schema_validation`, {
      body: i,
      ...s
    });
  }
  /**
   * Updates multiple operation-level schema validation settings on the zone
   */
  edit(e, t) {
    const { zone_id: s, settings_multiple_request: n } = e;
    return this._client.patch(`/zones/${s}/api_gateway/operations/schema_validation`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves operation-level schema validation settings on the zone
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/api_gateway/operations/${e}/schema_validation`, s);
  }
}, dt = class extends a {
  constructor() {
    super(...arguments), this.schemaValidation = new Yd(this._client);
  }
  /**
   * Add one operation to a zone. Endpoints can contain path variables. Host, method,
   * endpoint will be normalized to a canoncial form when creating an operation and
   * must be unique on the zone. Inserting an operation that matches an existing one
   * will return the record of the already existing operation and update its
   * last_updated date.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/api_gateway/operations/item`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve information about all operations on a zone
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/api_gateway/operations`, ni, { query: n, ...t });
  }
  /**
   * Delete an operation
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/api_gateway/operations/${e}`, s);
  }
  /**
   * Add one or more operations to a zone. Endpoints can contain path variables.
   * Host, method, endpoint will be normalized to a canoncial form when creating an
   * operation and must be unique on the zone. Inserting an operation that matches an
   * existing one will return the record of the already existing operation and update
   * its last_updated date.
   */
  bulkCreate(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.getAPIList(`/zones/${s}/api_gateway/operations`, ii, { body: n, method: "post", ...t });
  }
  /**
   * Delete multiple operations
   */
  bulkDelete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/api_gateway/operations`, t);
  }
  /**
   * Retrieve information about an operation
   */
  get(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.get(`/zones/${n}/api_gateway/operations/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}, ni = class extends p {
};
class ii extends h {
}
dt.OperationListResponsesV4PagePaginationArray = ni;
dt.OperationBulkCreateResponsesSinglePage = ii;
dt.SchemaValidation = Yd;
class Fd extends a {
  /**
   * Updates zone level schema validation settings on the zone
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/api_gateway/settings/schema_validation`, { body: n, ...t });
  }
  /**
   * Updates zone level schema validation settings on the zone
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/api_gateway/settings/schema_validation`, {
      body: n,
      ...t
    });
  }
  /**
   * Retrieves zone level schema validation settings currently set on the zone
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/api_gateway/settings/schema_validation`, t);
  }
}
let Gd = class extends a {
  constructor() {
    super(...arguments), this.schemaValidation = new Fd(this._client);
  }
};
Gd.SchemaValidation = Fd;
class ri extends a {
  /**
   * Retrieve schema hosts in a zone
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/api_gateway/user_schemas/hosts`, ci, { query: n, ...t });
  }
}
class ci extends p {
}
ri.HostListResponsesV4PagePaginationArray = ci;
class ai extends a {
  /**
   * Retrieves all operations from the schema. Operations that already exist in API
   * Shield Endpoint Management will be returned as full operations.
   */
  list(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.getAPIList(`/zones/${n}/api_gateway/user_schemas/${e}/operations`, oi, { query: i, ...s });
  }
}
class oi extends p {
}
ai.OperationListResponsesV4PagePaginationArray = oi;
class ye extends a {
  constructor() {
    super(...arguments), this.operations = new ai(this._client), this.hosts = new ri(this._client);
  }
  /**
   * Upload a schema to a zone
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/api_gateway/user_schemas`, R({ body: n, ...t }))._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve information about all schemas on a zone
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/api_gateway/user_schemas`, ui, { query: n, ...t });
  }
  /**
   * Delete a schema
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/api_gateway/user_schemas/${e}`, s);
  }
  /**
   * Enable validation for a schema
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/api_gateway/user_schemas/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieve information about a specific schema on a zone
   */
  get(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.get(`/zones/${n}/api_gateway/user_schemas/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class ui extends p {
}
ye.PublicSchemasV4PagePaginationArray = ui;
ye.Operations = ai;
ye.OperationListResponsesV4PagePaginationArray = oi;
ye.Hosts = ri;
ye.HostListResponsesV4PagePaginationArray = ci;
class G extends a {
  constructor() {
    super(...arguments), this.configurations = new Vd(this._client), this.discovery = new ti(this._client), this.operations = new dt(this._client), this.schemas = new Td(this._client), this.settings = new Gd(this._client), this.userSchemas = new ye(this._client), this.expressionTemplate = new si(this._client);
  }
}
G.Configurations = Vd;
G.Discovery = ti;
G.Operations = dt;
G.OperationListResponsesV4PagePaginationArray = ni;
G.OperationBulkCreateResponsesSinglePage = ii;
G.Schemas = Td;
G.UserSchemas = ye;
G.PublicSchemasV4PagePaginationArray = ui;
G.ExpressionTemplate = si;
class Bd extends a {
  /**
   * Submit the Abuse Report of a particular type
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/abuse-reports/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Nd extends a {
  /**
   * Add a user to the list of members for this account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/members`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify an account member.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/members/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all members of an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/members`, S$, {
      query: n,
      ...t
    });
  }
  /**
   * Remove a member from an account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/members/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific member of an account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/members/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Md extends a {
  /**
   * Get all available roles for an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/roles`, A$, {
      query: n,
      ...t
    });
  }
  /**
   * Get information about a specific role for an account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/roles/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
let Kd = class extends a {
  /**
   * Creates an account subscription.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/subscriptions`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an account subscription.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/subscriptions/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes an account's subscription.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/subscriptions/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all of an account's subscriptions.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/subscriptions`, vd, t);
  }
};
class li extends a {
  /**
   * Gets a list of audit logs for an account. <br /> <br /> This is the beta release
   * of Audit Logs Version 2. Since this is a beta version, there may be gaps or
   * missing entries in the available audit logs. Be aware of the following
   * limitations. <br /> <ul> <li>Audit logs are available only for the past 30 days.
   * <br /></li> <li>Error handling is not yet implemented. <br /> </li> </ul>
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/logs/audit`, di, { query: n, ...t });
  }
}
class di extends Dn {
}
li.AuditListResponsesCursorLimitPagination = di;
let cs = class extends a {
  constructor() {
    super(...arguments), this.audit = new li(this._client);
  }
};
cs.Audit = li;
cs.AuditListResponsesCursorLimitPagination = di;
let as = class extends a {
  /**
   * Find all available permission groups for Account Owned API Tokens
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/tokens/permission_groups`, hi, t);
  }
  /**
   * Find all available permission groups for Account Owned API Tokens
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/tokens/permission_groups`, _i, t);
  }
}, hi = class extends h {
};
class _i extends h {
}
as.PermissionGroupListResponsesSinglePage = hi;
as.PermissionGroupGetResponsesSinglePage = _i;
let Wd = class extends a {
  /**
   * Roll the Account Owned API token secret.
   */
  update(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.put(`/accounts/${n}/tokens/${e}/value`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}, Ie = class extends a {
  constructor() {
    super(...arguments), this.permissionGroups = new as(this._client), this.value = new Wd(this._client);
  }
  /**
   * Create a new Account Owned API token.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/tokens`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing token.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/tokens/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * List all Account Owned API tokens created for this account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/tokens`, Id, {
      query: n,
      ...t
    });
  }
  /**
   * Destroy an Account Owned API token.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/tokens/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific Account Owned API token.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/tokens/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Test whether a token works.
   */
  verify(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/tokens/verify`, t)._thenUnwrap((n) => n.result);
  }
};
Ie.PermissionGroups = as;
Ie.PermissionGroupListResponsesSinglePage = hi;
Ie.PermissionGroupGetResponsesSinglePage = _i;
Ie.Value = Wd;
let fe = class extends a {
  constructor() {
    super(...arguments), this.members = new Nd(this._client), this.roles = new Md(this._client), this.subscriptions = new Kd(this._client), this.tokens = new Ie(this._client), this.logs = new cs(this._client);
  }
  /**
   * Create an account (only available for tenant admins at this time)
   */
  create(e, t) {
    return this._client.post("/accounts", { body: e, ...t })._thenUnwrap((s) => s.result);
  }
  /**
   * Update an existing account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/accounts", v$, { query: e, ...t });
  }
  /**
   * Delete a specific account (only available for tenant admins at this time). This
   * is a permanent operation that will delete any zones or other resources under the
   * account
   */
  delete(e, t) {
    const { account_id: s } = e;
    return this._client.delete(`/accounts/${s}`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Get information about a specific account that you are a member of.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}`, t)._thenUnwrap((n) => n.result);
  }
};
class v$ extends p {
}
fe.Members = Nd;
fe.Roles = Md;
fe.Subscriptions = Kd;
fe.Tokens = Ie;
fe.Logs = cs;
class jd extends a {
  /**
   * Submit LOA document (pdf format) under the account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/addressing/loa_documents`, R({ body: n, ...t }))._thenUnwrap((i) => i.result);
  }
  /**
   * Download specified LOA document under the account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/addressing/loa_documents/${e}/download`, {
      ...s,
      headers: { Accept: "application/pdf", ...s == null ? void 0 : s.headers },
      __binaryResponse: !0
    });
  }
}
class gi extends a {
  /**
   * Bring-Your-Own IP (BYOIP) prefixes onboarded to Cloudflare must be bound to a
   * service running on the Cloudflare network to enable a Cloudflare product on the
   * IP addresses. This endpoint can be used as a reference of available services on
   * the Cloudflare network, and their service IDs.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/addressing/services`, pi, t);
  }
}
class pi extends h {
}
gi.ServiceListResponsesSinglePage = pi;
class Hd extends a {
  /**
   * Add an account as a member of a particular address map.
   */
  update(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.put(`/accounts/${n}/addressing/address_maps/${e}/accounts/${n}`, { body: i, ...s });
  }
  /**
   * Remove an account as a member of a particular address map.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/addressing/address_maps/${e}/accounts/${n}`, s);
  }
}
let Xd = class extends a {
  /**
   * Add an IP from a prefix owned by the account to a particular address map.
   */
  update(e, t, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.put(`/accounts/${i}/addressing/address_maps/${e}/ips/${t}`, { body: c, ...n });
  }
  /**
   * Remove an IP from a particular address map.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/addressing/address_maps/${e}/ips/${t}`, n);
  }
}, Qd = class extends a {
  /**
   * Add a zone as a member of a particular address map.
   */
  update(e, t, s) {
    const { zone_id: n, account_id: i, body: c } = t;
    return this._client.put(`/accounts/${i}/addressing/address_maps/${e}/zones/${n}`, { body: c, ...s });
  }
  /**
   * Remove a zone as a member of a particular address map.
   */
  delete(e, t, s) {
    const { zone_id: n, account_id: i } = t;
    return this._client.delete(`/accounts/${i}/addressing/address_maps/${e}/zones/${n}`, s);
  }
};
class ke extends a {
  constructor() {
    super(...arguments), this.accounts = new Hd(this._client), this.ips = new Xd(this._client), this.zones = new Qd(this._client);
  }
  /**
   * Create a new address map under the account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/addressing/address_maps`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all address maps owned by the account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/addressing/address_maps`, wi, t);
  }
  /**
   * Delete a particular address map owned by the account. An Address Map must be
   * disabled before it can be deleted.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/addressing/address_maps/${e}`, s);
  }
  /**
   * Modify properties of an address map owned by the account.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/addressing/address_maps/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show a particular address map owned by the account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/addressing/address_maps/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class wi extends h {
}
ke.AddressMapsSinglePage = wi;
ke.Accounts = Hd;
ke.IPs = Xd;
ke.Zones = Qd;
class Jd extends a {
  /**
   * Advertise or withdraw the BGP route for a prefix.
   *
   * **Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for
   * advertising and withdrawing subnets of an IP prefix.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/addressing/prefixes/${e}/bgp/status`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * View the current advertisement state for a prefix.
   *
   * **Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for
   * advertising and withdrawing subnets of an IP prefix.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/addressing/prefixes/${e}/bgp/status`, s)._thenUnwrap((i) => i.result);
  }
}
class $i extends a {
  /**
   * Create a BGP prefix, controlling the BGP advertisement status of a specific
   * subnet. When created, BGP prefixes are initially withdrawn, and can be
   * advertised with the Update BGP Prefix API.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/addressing/prefixes/${e}/bgp/prefixes`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all BGP Prefixes within the specified IP Prefix. BGP Prefixes are used to
   * control which specific subnets are advertised to the Internet. It is possible to
   * advertise subnets more specific than an IP Prefix by creating more specific BGP
   * Prefixes.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/addressing/prefixes/${e}/bgp/prefixes`, mi, s);
  }
  /**
   * Update the properties of a BGP Prefix, such as the on demand advertisement
   * status (advertised or withdrawn).
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/addressing/prefixes/${e}/bgp/prefixes/${t}`, { body: c, ...n })._thenUnwrap((o) => o.result);
  }
  /**
   * Retrieve a single BGP Prefix according to its identifier
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/addressing/prefixes/${e}/bgp/prefixes/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class mi extends h {
}
$i.BGPPrefixesSinglePage = mi;
class qd extends a {
  /**
   * Create a new account delegation for a given IP prefix.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/addressing/prefixes/${e}/delegations`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all delegations for a given account IP prefix.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/addressing/prefixes/${e}/delegations`, yi, s);
  }
  /**
   * Delete an account delegation for a given IP prefix.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/addressing/prefixes/${e}/delegations/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class yi extends h {
}
qd.DelegationsSinglePage = yi;
class fi extends a {
  /**
   * Creates a new Service Binding, routing traffic to IPs within the given CIDR to a
   * service running on Cloudflare's network. **Note:** This API may only be used on
   * prefixes currently configured with a Magic Transit service binding, and only
   * allows creating service bindings for the Cloudflare CDN or Cloudflare Spectrum.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/addressing/prefixes/${e}/bindings`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List the Cloudflare services this prefix is currently bound to. Traffic sent to
   * an address within an IP prefix will be routed to the Cloudflare service of the
   * most-specific Service Binding matching the address. **Example:** binding
   * `192.0.2.0/24` to Cloudflare Magic Transit and `192.0.2.1/32` to the Cloudflare
   * CDN would route traffic for `192.0.2.1` to the CDN, and traffic for all other
   * IPs in the prefix to Cloudflare Magic Transit.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/addressing/prefixes/${e}/bindings`, Pi, s);
  }
  /**
   * Delete a Service Binding
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/addressing/prefixes/${e}/bindings/${t}`, n);
  }
  /**
   * Fetch a single Service Binding
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/addressing/prefixes/${e}/bindings/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Pi extends h {
}
fi.ServiceBindingsSinglePage = Pi;
class ie extends a {
  constructor() {
    super(...arguments), this.serviceBindings = new fi(this._client), this.bgpPrefixes = new $i(this._client), this.advertisementStatus = new Jd(this._client), this.delegations = new qd(this._client);
  }
  /**
   * Add a new prefix under the account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/addressing/prefixes`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all prefixes owned by the account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/addressing/prefixes`, Ui, t);
  }
  /**
   * Delete an unapproved prefix owned by the account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/addressing/prefixes/${e}`, s);
  }
  /**
   * Modify the description for a prefix owned by the account.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/addressing/prefixes/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a particular prefix owned by the account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/addressing/prefixes/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Ui extends h {
}
ie.PrefixesSinglePage = Ui;
ie.ServiceBindings = fi;
ie.ServiceBindingsSinglePage = Pi;
ie.BGPPrefixes = $i;
ie.BGPPrefixesSinglePage = mi;
ie.AdvertisementStatus = Jd;
ie.DelegationsSinglePage = yi;
let bi = class extends a {
  /**
   * List all Regional Services regions available for use by this account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/addressing/regional_hostnames/regions`, xi, t);
  }
};
class xi extends h {
}
bi.RegionListResponsesSinglePage = xi;
class ht extends a {
  constructor() {
    super(...arguments), this.regions = new bi(this._client);
  }
  /**
   * Create a new Regional Hostname entry. Cloudflare will only use data centers that
   * are physically located within the chosen region to decrypt and service HTTPS
   * traffic. Learn more about
   * [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/).
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/addressing/regional_hostnames`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all Regional Hostnames within a zone.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/addressing/regional_hostnames`, zi, t);
  }
  /**
   * Delete the region configuration for a specific Regional Hostname.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/addressing/regional_hostnames/${e}`, s);
  }
  /**
   * Update the configuration for a specific Regional Hostname. Only the region_key
   * of a hostname is mutable.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/addressing/regional_hostnames/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch the configuration for a specific Regional Hostname, within a zone.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/addressing/regional_hostnames/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class zi extends h {
}
ht.RegionalHostnameListResponsesSinglePage = zi;
ht.Regions = bi;
ht.RegionListResponsesSinglePage = xi;
class B extends a {
  constructor() {
    super(...arguments), this.regionalHostnames = new ht(this._client), this.services = new gi(this._client), this.addressMaps = new ke(this._client), this.loaDocuments = new jd(this._client), this.prefixes = new ie(this._client);
  }
}
B.RegionalHostnames = ht;
B.RegionalHostnameListResponsesSinglePage = zi;
B.Services = gi;
B.ServiceListResponsesSinglePage = pi;
B.AddressMaps = ke;
B.AddressMapsSinglePage = wi;
B.LOADocuments = jd;
B.Prefixes = ie;
B.PrefixesSinglePage = Ui;
class eh extends a {
  /**
   * Gets a list of all alert types for which an account is eligible.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/alerting/v3/available_alerts`, t)._thenUnwrap((n) => n.result);
  }
}
class Si extends a {
  /**
   * Gets a list of history records for notifications sent to an account. The records
   * are displayed for last `x` number of days based on the zone plan (free = 30, pro
   * = 30, biz = 30, ent = 90).
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/history`, Ai, { query: n, ...t });
  }
}
class Ai extends p {
}
Si.HistoriesV4PagePaginationArray = Ai;
let Ri = class extends a {
  /**
   * Creates a new Notification policy.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/alerting/v3/policies`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Notification policy.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/alerting/v3/policies/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a list of all Notification policies.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/policies`, Li, t);
  }
  /**
   * Delete a Notification policy.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/alerting/v3/policies/${e}`, s);
  }
  /**
   * Get details for a single policy.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/alerting/v3/policies/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Li extends h {
}
Ri.PoliciesSinglePage = Li;
class th extends a {
  /**
   * Get a list of all delivery mechanism types for which an account is eligible.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/alerting/v3/destinations/eligible`, t)._thenUnwrap((n) => n.result);
  }
}
class vi extends a {
  /**
   * Creates a new token for integrating with PagerDuty.
   */
  create(e, t) {
    const { account_id: s } = e;
    return this._client.post(`/accounts/${s}/alerting/v3/destinations/pagerduty/connect`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Deletes all the PagerDuty Services connected to the account.
   */
  delete(e, t) {
    const { account_id: s } = e;
    return this._client.delete(`/accounts/${s}/alerting/v3/destinations/pagerduty`, t);
  }
  /**
   * Get a list of all configured PagerDuty services.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/destinations/pagerduty`, Ii, t);
  }
  /**
   * Links PagerDuty with the account using the integration token.
   */
  link(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/alerting/v3/destinations/pagerduty/connect/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Ii extends h {
}
vi.PagerdutiesSinglePage = Ii;
let sh = class extends a {
  /**
   * Creates a new webhook destination.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/alerting/v3/destinations/webhooks`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a webhook destination.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/alerting/v3/destinations/webhooks/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets a list of all configured webhook destinations.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/destinations/webhooks`, ki, t);
  }
  /**
   * Delete a configured webhook destination.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/alerting/v3/destinations/webhooks/${e}`, s);
  }
  /**
   * Get details for a single webhooks destination.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/alerting/v3/destinations/webhooks/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class ki extends h {
}
sh.WebhooksSinglePage = ki;
class Oe extends a {
  constructor() {
    super(...arguments), this.eligible = new th(this._client), this.pagerduty = new vi(this._client), this.webhooks = new sh(this._client);
  }
}
Oe.Eligible = th;
Oe.PagerdutyResource = vi;
Oe.PagerdutiesSinglePage = Ii;
Oe.WebhooksSinglePage = ki;
class de extends a {
  constructor() {
    super(...arguments), this.availableAlerts = new eh(this._client), this.destinations = new Oe(this._client), this.history = new Si(this._client), this.policies = new Ri(this._client);
  }
}
de.AvailableAlerts = eh;
de.Destinations = Oe;
de.HistoryResource = Si;
de.HistoriesV4PagePaginationArray = Ai;
de.Policies = Ri;
de.PoliciesSinglePage = Li;
class nh extends a {
  /**
   * Updates enablement of Argo Smart Routing.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/argo/smart_routing`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Argo Smart Routing setting
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/argo/smart_routing`, t)._thenUnwrap((n) => n.result);
  }
}
class ih extends a {
  /**
   * Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of
   * lower-tiers and upper-tiers. If content is not cached in lower-tier data centers
   * (generally the ones closest to a visitor), the lower-tier must ask an upper-tier
   * to see if it has the content. If the upper-tier does not have the content, only
   * the upper-tier can ask the origin for content. This practice improves bandwidth
   * efficiency by limiting the number of data centers that can ask the origin for
   * content, which reduces origin load and makes websites more cost-effective to
   * operate. Additionally, Tiered Cache concentrates connections to origin servers
   * so they come from a small number of data centers rather than the full set of
   * network locations. This results in fewer open connections using server
   * resources.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/argo/tiered_caching`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of
   * lower-tiers and upper-tiers. If content is not cached in lower-tier data centers
   * (generally the ones closest to a visitor), the lower-tier must ask an upper-tier
   * to see if it has the content. If the upper-tier does not have the content, only
   * the upper-tier can ask the origin for content. This practice improves bandwidth
   * efficiency by limiting the number of data centers that can ask the origin for
   * content, which reduces origin load and makes websites more cost-effective to
   * operate. Additionally, Tiered Cache concentrates connections to origin servers
   * so they come from a small number of data centers rather than the full set of
   * network locations. This results in fewer open connections using server
   * resources.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/argo/tiered_caching`, t)._thenUnwrap((n) => n.result);
  }
}
class os extends a {
  constructor() {
    super(...arguments), this.smartRouting = new nh(this._client), this.tieredCaching = new ih(this._client);
  }
}
os.SmartRouting = nh;
os.TieredCaching = ih;
let rh = class extends a {
  /**
   * Gets a list of audit logs for an account. Can be filtered by who made the
   * change, on which zone, and the timeframe of the change.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/audit_logs`, kd, {
      query: n,
      ...t
    });
  }
}, ch = class extends a {
  /**
   * Gets the current billing profile for the account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/billing/profile`, t)._thenUnwrap((n) => n.result);
  }
}, Oi = class extends a {
  constructor() {
    super(...arguments), this.profiles = new ch(this._client);
  }
};
Oi.Profiles = ch;
class ah extends a {
  /**
   * Updates the Bot Management configuration for a zone.
   *
   * This API is used to update:
   *
   * - **Bot Fight Mode**
   * - **Super Bot Fight Mode**
   * - **Bot Management for Enterprise**
   *
   * See [Bot Plans](https://developers.cloudflare.com/bots/plans/) for more
   * information on the different plans \
   * If you recently upgraded or downgraded your plan, refer to the following examples
   * to clean up old configurations. Copy and paste the example body to remove old zone
   * configurations based on your current plan.
   *
   * #### Clean up configuration for Bot Fight Mode plan
   *
   * ```json
   * {
   *   "sbfm_likely_automated": "allow",
   *   "sbfm_definitely_automated": "allow",
   *   "sbfm_verified_bots": "allow",
   *   "sbfm_static_resource_protection": false,
   *   "optimize_wordpress": false,
   *   "suppress_session_score": false
   * }
   * ```
   *
   * #### Clean up configuration for SBFM Pro plan
   *
   * ```json
   * {
   *   "sbfm_likely_automated": "allow",
   *   "fight_mode": false
   * }
   * ```
   *
   * #### Clean up configuration for SBFM Biz plan
   *
   * ```json
   * {
   *   "fight_mode": false
   * }
   * ```
   *
   * #### Clean up configuration for BM Enterprise Subscription plan
   *
   * It is strongly recommended that you ensure you have
   * [custom rules](https://developers.cloudflare.com/waf/custom-rules/) in place to
   * protect your zone before disabling the SBFM rules. Without these protections,
   * your zone is vulnerable to attacks.
   *
   * ```json
   * {
   *   "sbfm_likely_automated": "allow",
   *   "sbfm_definitely_automated": "allow",
   *   "sbfm_verified_bots": "allow",
   *   "sbfm_static_resource_protection": false,
   *   "optimize_wordpress": false,
   *   "fight_mode": false
   * }
   * ```
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/bot_management`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve a zone's Bot Management Config
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/bot_management`, t)._thenUnwrap((n) => n.result);
  }
}
let oh = class extends a {
  /**
   * Gets all the data the botnet tracking database has for a given ASN registered to
   * user account for given date. If no date is given, it will return results for the
   * previous day.
   */
  dayReport(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/botnet_feed/asn/${e}/day_report`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets all the data the botnet threat feed tracking database has for a given ASN
   * registered to user account.
   */
  fullReport(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/botnet_feed/asn/${e}/full_report`, s)._thenUnwrap((i) => i.result);
  }
}, uh = class extends a {
  /**
   * Delete an ASN from botnet threat feed for a given user.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/botnet_feed/configs/asn/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets a list of all ASNs registered for a user for the DDoS Botnet Feed API.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/botnet_feed/configs/asn`, t)._thenUnwrap((n) => n.result);
  }
}, Zi = class extends a {
  constructor() {
    super(...arguments), this.asn = new uh(this._client);
  }
};
Zi.ASN = uh;
class us extends a {
  constructor() {
    super(...arguments), this.asn = new oh(this._client), this.configs = new Zi(this._client);
  }
}
us.ASN = oh;
us.Configs = Zi;
class lh extends a {
  /**
   * Submit suspicious URL for scanning
   */
  submit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/brand-protection/submit`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets phishing details about a URL.
   */
  urlInfo(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/brand-protection/url-info`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class dh extends a {
  /**
   * You can use Cache Reserve Clear to clear your Cache Reserve, but you must first
   * disable Cache Reserve. In most cases, this will be accomplished within 24 hours.
   * You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind
   * that you cannot undo or cancel this operation.
   */
  clear(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/cache/cache_reserve_clear`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Increase cache lifetimes by automatically storing all cacheable files into
   * Cloudflare's persistent object storage buckets. Requires Cache Reserve
   * subscription. Note: using Tiered Cache with Cache Reserve is highly recommended
   * to reduce Reserve operations costs. See the
   * [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve)
   * for more information.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/cache/cache_reserve`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Increase cache lifetimes by automatically storing all cacheable files into
   * Cloudflare's persistent object storage buckets. Requires Cache Reserve
   * subscription. Note: using Tiered Cache with Cache Reserve is highly recommended
   * to reduce Reserve operations costs. See the
   * [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve)
   * for more information.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/cache/cache_reserve`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * You can use Cache Reserve Clear to clear your Cache Reserve, but you must first
   * disable Cache Reserve. In most cases, this will be accomplished within 24 hours.
   * You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind
   * that you cannot undo or cancel this operation.
   */
  status(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/cache/cache_reserve_clear`, t)._thenUnwrap((n) => n.result);
  }
}
class hh extends a {
  /**
   * Instructs Cloudflare to check a regional hub data center on the way to your
   * upper tier. This can help improve performance for smart and custom tiered cache
   * topologies.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/cache/regional_tiered_cache`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Instructs Cloudflare to check a regional hub data center on the way to your
   * upper tier. This can help improve performance for smart and custom tiered cache
   * topologies.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/cache/regional_tiered_cache`, t)._thenUnwrap((n) => n.result);
  }
}
class _h extends a {
  /**
   * Smart Tiered Cache dynamically selects the single closest upper tier for each of
   * your website’s origins with no configuration required, using our in-house
   * performance and routing data. Cloudflare collects latency data for each request
   * to an origin, and uses the latency data to determine how well any upper-tier
   * data center is connected with an origin. As a result, Cloudflare can select the
   * data center with the lowest latency to be the upper-tier for an origin.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/cache/tiered_cache_smart_topology_enable`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Smart Tiered Cache dynamically selects the single closest upper tier for each of
   * your website’s origins with no configuration required, using our in-house
   * performance and routing data. Cloudflare collects latency data for each request
   * to an origin, and uses the latency data to determine how well any upper-tier
   * data center is connected with an origin. As a result, Cloudflare can select the
   * data center with the lowest latency to be the upper-tier for an origin.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/cache/tiered_cache_smart_topology_enable`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Smart Tiered Cache dynamically selects the single closest upper tier for each of
   * your website’s origins with no configuration required, using our in-house
   * performance and routing data. Cloudflare collects latency data for each request
   * to an origin, and uses the latency data to determine how well any upper-tier
   * data center is connected with an origin. As a result, Cloudflare can select the
   * data center with the lowest latency to be the upper-tier for an origin.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/cache/tiered_cache_smart_topology_enable`, t)._thenUnwrap((n) => n.result);
  }
}
let gh = class extends a {
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/cache/variants`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/cache/variants`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/cache/variants`, t)._thenUnwrap((n) => n.result);
  }
};
class Ze extends a {
  constructor() {
    super(...arguments), this.cacheReserve = new dh(this._client), this.smartTieredCache = new _h(this._client), this.variants = new gh(this._client), this.regionalTieredCache = new hh(this._client);
  }
  /**
   * ### Purge All Cached Content
   *
   * Removes ALL files from Cloudflare's cache. All tiers can purge everything.
   *
   * ```
   * {"purge_everything": true}
   * ```
   *
   * ### Purge Cached Content by URL
   *
   * Granularly removes one or more files from Cloudflare's cache by specifying URLs.
   * All tiers can purge by URL.
   *
   * To purge files with custom cache keys, include the headers used to compute the
   * cache key as in the example. If you have a device type or geo in your cache key,
   * you will need to include the CF-Device-Type or CF-IPCountry headers. If you have
   * lang in your cache key, you will need to include the Accept-Language header.
   *
   * **NB:** When including the Origin header, be sure to include the **scheme** and
   * **hostname**. The port number can be omitted if it is the default port (80 for
   * http, 443 for https), but must be included otherwise.
   *
   * **NB:** For Zones on Free/Pro/Business plan, you may purge up to 30 URLs in one
   * API call. For Zones on Enterprise plan, you may purge up to 500 URLs in one API
   * call.
   *
   * Single file purge example with files:
   *
   * ```
   * {"files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"]}
   * ```
   *
   * Single file purge example with url and header pairs:
   *
   * ```
   * {"files": [{url: "http://www.example.com/cat_picture.jpg", headers: { "CF-IPCountry": "US", "CF-Device-Type": "desktop", "Accept-Language": "zh-CN" }}, {url: "http://www.example.com/dog_picture.jpg", headers: { "CF-IPCountry": "EU", "CF-Device-Type": "mobile", "Accept-Language": "en-US" }}]}
   * ```
   *
   * ### Purge Cached Content by Tag, Host or Prefix
   *
   * Granularly removes one or more files from Cloudflare's cache either by
   * specifying the host, the associated Cache-Tag, or a Prefix. Only Enterprise
   * customers are permitted to purge by Tag, Host or Prefix.
   *
   * **NB:** Cache-Tag, host, and prefix purging each have a rate limit of 30,000
   * purge API calls in every 24 hour period. You may purge up to 30 tags, hosts, or
   * prefixes in one API call. This rate limit can be raised for customers who need
   * to purge at higher volume.
   *
   * Flex purge with tags:
   *
   * ```
   * {"tags": ["a-cache-tag", "another-cache-tag"]}
   * ```
   *
   * Flex purge with hosts:
   *
   * ```
   * {"hosts": ["www.example.com", "images.example.com"]}
   * ```
   *
   * Flex purge with prefixes:
   *
   * ```
   * {"prefixes": ["www.example.com/foo", "images.example.com/bar/baz"]}
   * ```
   */
  purge(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/purge_cache`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
}
Ze.CacheReserveResource = dh;
Ze.SmartTieredCache = _h;
Ze.Variants = gh;
Ze.RegionalTieredCacheResource = hh;
class Ci extends a {
  /**
   * Creates a new Cloudflare calls app. An app is an unique enviroment where each
   * Session can access all Tracks within the app.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/calls/apps`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Edit details for a single app.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/calls/apps/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all apps in the Cloudflare account
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/calls/apps`, Vi, t);
  }
  /**
   * Deletes an app from Cloudflare Calls
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/calls/apps/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches details for a single Calls app.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/calls/apps/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Vi extends h {
}
Ci.SFUListResponsesSinglePage = Vi;
class Ti extends a {
  /**
   * Creates a new Cloudflare Calls TURN key.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/calls/turn_keys`, { body: n, ...t });
  }
  /**
   * Edit details for a single TURN key.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/calls/turn_keys/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all TURN keys in the Cloudflare account
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/calls/turn_keys`, Di, t);
  }
  /**
   * Deletes a TURN key from Cloudflare Calls
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/calls/turn_keys/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches details for a single TURN key.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/calls/turn_keys/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Di extends h {
}
Ti.TURNListResponsesSinglePage = Di;
class Ce extends a {
  constructor() {
    super(...arguments), this.sfu = new Ci(this._client), this.turn = new Ti(this._client);
  }
}
Ce.SFU = Ci;
Ce.SFUListResponsesSinglePage = Vi;
Ce.TURN = Ti;
Ce.TURNListResponsesSinglePage = Di;
class ph extends a {
  /**
   * Replace Hostname Associations
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/certificate_authorities/hostname_associations`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Hostname Associations
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/certificate_authorities/hostname_associations`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class Ei extends a {
  constructor() {
    super(...arguments), this.hostnameAssociations = new ph(this._client);
  }
}
Ei.HostnameAssociations = ph;
class wh extends a {
  /**
   * Create a new API Shield mTLS Client Certificate
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/client_certificates`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List all of your Zone's API Shield mTLS Client Certificates by Status and/or
   * using Pagination
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/client_certificates`, I$, { query: n, ...t });
  }
  /**
   * Set a API Shield mTLS Client Certificate to pending_revocation status for
   * processing to revoked status.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/client_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * If a API Shield mTLS Client Certificate is in a pending_revocation state, you
   * may reactivate it with this endpoint.
   */
  edit(e, t, s) {
    const { zone_id: n } = t;
    return this._client.patch(`/zones/${n}/client_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Details for a single mTLS API Shield Client Certificate
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/client_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class I$ extends p {
}
let ls = class extends a {
  /**
   * Put Rules
   */
  update(e, t) {
    const { zone_id: s, rules: n } = e;
    return this._client.getAPIList(`/zones/${s}/cloud_connector/rules`, Yi, {
      body: n,
      method: "put",
      ...t
    });
  }
  /**
   * Rules
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/cloud_connector/rules`, Fi, t);
  }
}, Yi = class extends h {
}, Fi = class extends h {
};
ls.RuleUpdateResponsesSinglePage = Yi;
ls.RuleListResponsesSinglePage = Fi;
class _t extends a {
  constructor() {
    super(...arguments), this.rules = new ls(this._client);
  }
}
_t.Rules = ls;
_t.RuleUpdateResponsesSinglePage = Yi;
_t.RuleListResponsesSinglePage = Fi;
let ds = class extends a {
  /**
   * List Request Assets
   */
  create(e, t, s, n) {
    return this._client.getAPIList(`/accounts/${e}/cloudforce-one/requests/${t}/asset`, Gi, { body: s, method: "post", ...n });
  }
  /**
   * Update a Request Asset
   */
  update(e, t, s, n, i) {
    return this._client.put(`/accounts/${e}/cloudforce-one/requests/${t}/asset/${s}`, { body: n, ...i })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete a Request Asset
   */
  delete(e, t, s, n) {
    return this._client.delete(`/accounts/${e}/cloudforce-one/requests/${t}/asset/${s}`, n);
  }
  /**
   * Get a Request Asset
   */
  get(e, t, s, n) {
    return this._client.getAPIList(`/accounts/${e}/cloudforce-one/requests/${t}/asset/${s}`, Bi, n);
  }
};
class Gi extends h {
}
class Bi extends h {
}
ds.AssetCreateResponsesSinglePage = Gi;
ds.AssetGetResponsesSinglePage = Bi;
class Ni extends a {
  /**
   * Create a New Request Message
   */
  create(e, t, s, n) {
    return this._client.post(`/accounts/${e}/cloudforce-one/requests/${t}/message/new`, { body: s, ...n })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Request Message
   */
  update(e, t, s, n, i) {
    return this._client.put(`/accounts/${e}/cloudforce-one/requests/${t}/message/${s}`, { body: n, ...i })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete a Request Message
   */
  delete(e, t, s, n) {
    return this._client.delete(`/accounts/${e}/cloudforce-one/requests/${t}/message/${s}`, n);
  }
  /**
   * List Request Messages
   */
  get(e, t, s, n) {
    return this._client.getAPIList(`/accounts/${e}/cloudforce-one/requests/${t}/message`, Mi, { body: s, method: "post", ...n });
  }
}
class Mi extends h {
}
Ni.MessagesSinglePage = Mi;
class $h extends a {
  /**
   * Create a New Priority Intelligence Requirement
   */
  create(e, t, s) {
    return this._client.post(`/accounts/${e}/cloudforce-one/requests/priority/new`, {
      body: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
  /**
   * Update a Priority Intelligence Requirement
   */
  update(e, t, s, n) {
    return this._client.put(`/accounts/${e}/cloudforce-one/requests/priority/${t}`, { body: s, ...n })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a Priority Intelligence Requirement
   */
  delete(e, t, s) {
    return this._client.delete(`/accounts/${e}/cloudforce-one/requests/priority/${t}`, s);
  }
  /**
   * Get a Priority Intelligence Requirement
   */
  get(e, t, s) {
    return this._client.get(`/accounts/${e}/cloudforce-one/requests/priority/${t}`, s)._thenUnwrap((n) => n.result);
  }
  /**
   * Get Priority Intelligence Requirement Quota
   */
  quota(e, t) {
    return this._client.get(`/accounts/${e}/cloudforce-one/requests/priority/quota`, t)._thenUnwrap((s) => s.result);
  }
}
class Q extends a {
  constructor() {
    super(...arguments), this.message = new Ni(this._client), this.priority = new $h(this._client), this.assets = new ds(this._client);
  }
  /**
   * Creating a request adds the request into the Cloudforce One queue for analysis.
   * In addition to the content, a short title, type, priority, and releasability
   * should be provided. If one is not provided, a default will be assigned.
   */
  create(e, t, s) {
    return this._client.post(`/accounts/${e}/cloudforce-one/requests/new`, {
      body: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
  /**
   * Updating a request alters the request in the Cloudforce One queue. This API may
   * be used to update any attributes of the request after the initial submission.
   * Only fields that you choose to update need to be add to the request body.
   */
  update(e, t, s, n) {
    return this._client.put(`/accounts/${e}/cloudforce-one/requests/${t}`, {
      body: s,
      ...n
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Requests
   */
  list(e, t, s) {
    return this._client.getAPIList(`/accounts/${e}/cloudforce-one/requests`, Ki, { body: t, method: "post", ...s });
  }
  /**
   * Delete a Request
   */
  delete(e, t, s) {
    return this._client.delete(`/accounts/${e}/cloudforce-one/requests/${t}`, s);
  }
  /**
   * Get Request Priority, Status, and TLP constants
   */
  constants(e, t) {
    return this._client.get(`/accounts/${e}/cloudforce-one/requests/constants`, t)._thenUnwrap((s) => s.result);
  }
  /**
   * Get a Request
   */
  get(e, t, s) {
    return this._client.get(`/accounts/${e}/cloudforce-one/requests/${t}`, s)._thenUnwrap((n) => n.result);
  }
  /**
   * Get Request Quota
   */
  quota(e, t) {
    return this._client.get(`/accounts/${e}/cloudforce-one/requests/quota`, t)._thenUnwrap((s) => s.result);
  }
  /**
   * Get Request Types
   */
  types(e, t) {
    return this._client.getAPIList(`/accounts/${e}/cloudforce-one/requests/types`, Wi, t);
  }
}
class Ki extends h {
}
class Wi extends h {
}
Q.ListItemsSinglePage = Ki;
Q.RequestTypesResponsesSinglePage = Wi;
Q.MessageResource = Ni;
Q.MessagesSinglePage = Mi;
Q.PriorityResource = $h;
Q.Assets = ds;
Q.AssetCreateResponsesSinglePage = Gi;
Q.AssetGetResponsesSinglePage = Bi;
class gt extends a {
  constructor() {
    super(...arguments), this.requests = new Q(this._client);
  }
}
gt.Requests = Q;
gt.ListItemsSinglePage = Ki;
gt.RequestTypesResponsesSinglePage = Wi;
class pt extends a {
  /**
   * Add custom scan expressions for Content Scanning
   */
  create(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.getAPIList(`/zones/${s}/content-upload-scan/payloads`, ji, { body: n, method: "post", ...t });
  }
  /**
   * Get a list of existing custom scan expressions for Content Scanning
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/content-upload-scan/payloads`, Hi, t);
  }
  /**
   * Delete a Content Scan Custom Expression
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/content-upload-scan/payloads/${e}`, Xi, { method: "delete", ...s });
  }
}
class ji extends h {
}
class Hi extends h {
}
class Xi extends h {
}
pt.PayloadCreateResponsesSinglePage = ji;
pt.PayloadListResponsesSinglePage = Hi;
pt.PayloadDeleteResponsesSinglePage = Xi;
let mh = class extends a {
  /**
   * Retrieve the current status of Content Scanning
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/content-upload-scan/settings`, t)._thenUnwrap((n) => n.result);
  }
};
class Pe extends a {
  constructor() {
    super(...arguments), this.payloads = new pt(this._client), this.settings = new mh(this._client);
  }
  /**
   * Disable Content Scanning
   */
  disable(e, t) {
    const { zone_id: s } = e;
    return this._client.post(`/zones/${s}/content-upload-scan/disable`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Enable Content Scanning
   */
  enable(e, t) {
    const { zone_id: s } = e;
    return this._client.post(`/zones/${s}/content-upload-scan/enable`, t)._thenUnwrap((n) => n.result);
  }
}
Pe.Payloads = pt;
Pe.PayloadCreateResponsesSinglePage = ji;
Pe.PayloadListResponsesSinglePage = Hi;
Pe.PayloadDeleteResponsesSinglePage = Xi;
Pe.Settings = mh;
class yh extends a {
  /**
   * If a zone has multiple SSL certificates, you can set the order in which they
   * should be used during a request. The higher priority will break ties across
   * overlapping 'legacy_custom' certificates.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/custom_certificates/prioritize`, O$, { body: n, method: "put", ...t });
  }
}
class Qi extends a {
  constructor() {
    super(...arguments), this.prioritize = new yh(this._client);
  }
  /**
   * Upload a new SSL certificate for a zone.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/custom_certificates`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List, search, and filter all of your custom SSL certificates. The higher
   * priority will break ties across overlapping 'legacy_custom' certificates, but
   * 'legacy_custom' certificates will always supercede 'sni_custom' certificates.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/custom_certificates`, k$, { query: n, ...t });
  }
  /**
   * Remove a SSL certificate from a zone.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/custom_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Upload a new private key and/or PEM/CRT for the SSL certificate. Note: PATCHing
   * a configuration for sni_custom certificates will result in a new resource id
   * being returned, and the previous one being deleted.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/custom_certificates/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * SSL Configuration Details
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/custom_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class k$ extends p {
}
class O$ extends h {
}
Qi.Prioritize = yh;
class fh extends a {
  /**
   * Update Fallback Origin for Custom Hostnames
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/custom_hostnames/fallback_origin`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete Fallback Origin for Custom Hostnames
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/custom_hostnames/fallback_origin`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Get Fallback Origin for Custom Hostnames
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/custom_hostnames/fallback_origin`, t)._thenUnwrap((n) => n.result);
  }
}
let Ph = class extends a {
  /**
   * Replace a single custom certificate within a certificate pack that contains two
   * bundled certificates. The replacement must adhere to the following constraints.
   * You can only replace an RSA certificate with another RSA certificate or an ECDSA
   * certificate with another ECDSA certificate.
   */
  update(e, t, s, n, i) {
    const { zone_id: c, ...o } = n;
    return this._client.put(`/zones/${c}/custom_hostnames/${e}/certificate_pack/${t}/certificates/${s}`, { body: o, ...i })._thenUnwrap((l) => l.result);
  }
  /**
   * Delete a single custom certificate from a certificate pack that contains two
   * bundled certificates. Deletion is subject to the following constraints. You
   * cannot delete a certificate if it is the only remaining certificate in the pack.
   * At least one certificate must remain in the pack.
   */
  delete(e, t, s, n, i) {
    const { zone_id: c } = n;
    return this._client.delete(`/zones/${c}/custom_hostnames/${e}/certificate_pack/${t}/certificates/${s}`, i);
  }
};
class Ji extends a {
  constructor() {
    super(...arguments), this.certificates = new Ph(this._client);
  }
}
Ji.Certificates = Ph;
class hs extends a {
  constructor() {
    super(...arguments), this.fallbackOrigin = new fh(this._client), this.certificatePack = new Ji(this._client);
  }
  /**
   * Add a new custom hostname and request that an SSL certificate be issued for it.
   * One of three validation methods—http, txt, email—should be used, with 'http'
   * recommended if the CNAME is already in place (or will be soon). Specifying
   * 'email' will send an email to the WHOIS contacts on file for the base domain
   * plus hostmaster, postmaster, webmaster, admin, administrator. If http is used
   * and the domain is not already pointing to the Managed CNAME host, the PATCH
   * method must be used once it is (to complete validation). Enable bundling of
   * certificates using the custom_cert_bundle field. The bundling process requires
   * the following condition One certificate in the bundle must use an RSA, and the
   * other must use an ECDSA.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/custom_hostnames`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List, search, sort, and filter all of your custom hostnames.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/custom_hostnames`, Z$, { query: n, ...t });
  }
  /**
   * Delete Custom Hostname (and any issued SSL certificates)
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/custom_hostnames/${e}`, s);
  }
  /**
   * Modify SSL configuration for a custom hostname. When sent with SSL config that
   * matches existing config, used to indicate that hostname should pass domain
   * control validation (DCV). Can also be used to change validation type, e.g., from
   * 'http' to 'email'. Bundle an existing certificate with another certificate by
   * using the "custom_cert_bundle" field. The bundling process supports combining
   * certificates as long as the following condition is met. One certificate must use
   * the RSA algorithm, and the other must use the ECDSA algorithm.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/custom_hostnames/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Custom Hostname Details
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/custom_hostnames/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Z$ extends p {
}
hs.FallbackOrigin = fh;
hs.CertificatePack = Ji;
let Uh = class extends a {
  /**
   * Add Account Custom Nameserver
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/custom_ns`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete Account Custom Nameserver
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/custom_ns/${e}`, C$, { method: "delete", ...s });
  }
  /**
   * Get Eligible Zones for Account Custom Nameservers
   */
  availabilty(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/custom_ns/availability`, V$, t);
  }
  /**
   * List an account's custom nameservers.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/custom_ns`, T$, t);
  }
};
class C$ extends h {
}
class V$ extends h {
}
class T$ extends h {
}
class wt extends a {
  /**
   * Returns the created D1 database.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/d1/database`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a list of D1 databases.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/d1/database`, qi, { query: n, ...t });
  }
  /**
   * Deletes the specified D1 database.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/d1/database/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a URL where the SQL contents of your D1 can be downloaded. Note: this
   * process may take some time for larger DBs, during which your D1 will be
   * unavailable to serve queries. To avoid blocking your DB unnecessarily, an
   * in-progress export must be continually polled or will automatically cancel.
   */
  export(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/d1/database/${e}/export`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified D1 database.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/d1/database/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Generates a temporary URL for uploading an SQL file to, then instructing the D1
   * to import it and polling it for status updates. Imports block the D1 for their
   * duration.
   */
  import(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/d1/database/${e}/import`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the query result as an object.
   */
  query(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/d1/database/${e}/query`, er, { body: i, method: "post", ...s });
  }
  /**
   * Returns the query result rows as arrays rather than objects. This is a
   * performance-optimized version of the /query endpoint.
   */
  raw(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/d1/database/${e}/raw`, tr, { body: i, method: "post", ...s });
  }
}
class qi extends p {
}
class er extends h {
}
class tr extends h {
}
wt.DatabaseListResponsesV4PagePaginationArray = qi;
wt.QueryResultsSinglePage = er;
wt.DatabaseRawResponsesSinglePage = tr;
class Ve extends a {
  constructor() {
    super(...arguments), this.database = new wt(this._client);
  }
}
Ve.Database = wt;
Ve.DatabaseListResponsesV4PagePaginationArray = qi;
Ve.QueryResultsSinglePage = er;
Ve.DatabaseRawResponsesSinglePage = tr;
class bh extends a {
  /**
   * Retrieve the account and zone specific unique identifier used as part of the
   * CNAME target for DCV Delegation.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/dcv_delegation/uuid`, t)._thenUnwrap((n) => n.result);
  }
}
class xh extends a {
  /**
   * Delete DNSSEC.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/dnssec`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Enable or disable DNSSEC.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/dnssec`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Details about DNSSEC status and configuration.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/dnssec`, t)._thenUnwrap((n) => n.result);
  }
}
class sr extends a {
  /**
   * Create a new DNS record for a zone.
   *
   * Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/dns_records`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Overwrite an existing DNS record.
   *
   * Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/dns_records/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List, search, sort, and filter a zones' DNS records.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/dns_records`, nr, {
      query: n,
      ...t
    });
  }
  /**
   * Delete DNS Record
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/dns_records/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Send a Batch of DNS Record API calls to be executed together.
   *
   * Notes:
   *
   * - Although Cloudflare will execute the batched operations in a single database
   *   transaction, Cloudflare's distributed KV store must treat each record change
   *   as a single key-value pair. This means that the propagation of changes is not
   *   atomic. See
   *   [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/ "Batch DNS records")
   *   for more information.
   * - The operations you specify within the /batch request body are always executed
   *   in the following order:
   *
   *   - Deletes
   *   - Patches
   *   - Puts
   *   - Posts
   */
  batch(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/dns_records/batch`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing DNS record.
   *
   * Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/dns_records/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * You can export your
   * [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this
   * endpoint.
   *
   * See
   * [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records")
   * for more information.
   */
  export(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/dns_records/export`, {
      ...t,
      headers: { Accept: "text/plain", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * DNS Record Details
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/dns_records/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * You can upload your
   * [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this
   * endpoint. It assumes that cURL is called from a location with bind_config.txt
   * (valid BIND config) present.
   *
   * See
   * [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records")
   * for more information.
   */
  import(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/dns_records/import`, R({ body: n, ...t }))._thenUnwrap((i) => i.result);
  }
  /**
   * Scan for common DNS records on your domain and automatically add them to your
   * zone. Useful if you haven't updated your nameservers yet.
   */
  scan(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/dns_records/scan`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
}
class nr extends p {
}
sr.RecordResponsesV4PagePaginationArray = nr;
let zh = class extends a {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/dns_analytics/report/bytime`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}, ir = class extends a {
  constructor() {
    super(...arguments), this.bytimes = new zh(this._client);
  }
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/dns_analytics/report`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
};
ir.Bytimes = zh;
let rr = class extends a {
  constructor() {
    super(...arguments), this.reports = new ir(this._client);
  }
};
rr.Reports = ir;
class cr extends a {
  /**
   * Create Internal DNS View for an account
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dns_settings/views`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List DNS Internal Views for an Account
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dns_settings/views`, ar, { query: n, ...t });
  }
  /**
   * Delete an existing Internal DNS View
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/dns_settings/views/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing Internal DNS View
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/dns_settings/views/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get DNS Internal View
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dns_settings/views/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class ar extends p {
}
cr.ViewListResponsesV4PagePaginationArray = ar;
let _s = class extends a {
  constructor() {
    super(...arguments), this.views = new cr(this._client);
  }
  /**
   * Update DNS settings for an account or zone
   */
  edit(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.patch(`/${c}/${o}/dns_settings`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  get(e = {}, t) {
    if (u(e))
      return this.get({}, e);
    const { account_id: s, zone_id: n } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${i}/${c}/dns_settings`, t)._thenUnwrap((o) => o.result);
  }
};
_s.Views = cr;
_s.ViewListResponsesV4PagePaginationArray = ar;
let or = class extends a {
  /**
   * Create ACL.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/secondary_dns/acls`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify ACL.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/secondary_dns/acls/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List ACLs.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/secondary_dns/acls`, ur, t);
  }
  /**
   * Delete ACL.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/secondary_dns/acls/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get ACL.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/secondary_dns/acls/${e}`, s)._thenUnwrap((i) => i.result);
  }
}, ur = class extends h {
};
or.ACLsSinglePage = ur;
class Sh extends a {
  /**
   * Sends AXFR zone transfer request to primary nameserver(s).
   */
  create(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/secondary_dns/force_axfr`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class Ah extends a {
  /**
   * Create secondary zone configuration for incoming zone transfers.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/secondary_dns/incoming`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update secondary zone configuration for incoming zone transfers.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/secondary_dns/incoming`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete secondary zone configuration for incoming zone transfers.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/secondary_dns/incoming`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Get secondary zone configuration for incoming zone transfers.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/secondary_dns/incoming`, t)._thenUnwrap((n) => n.result);
  }
}
class lr extends a {
  /**
   * Create Peer.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/secondary_dns/peers`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify Peer.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/secondary_dns/peers/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Peers.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/secondary_dns/peers`, dr, t);
  }
  /**
   * Delete Peer.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/secondary_dns/peers/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Peer.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/secondary_dns/peers/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class dr extends h {
}
lr.PeersSinglePage = dr;
class hr extends a {
  /**
   * Create TSIG.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/secondary_dns/tsigs`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify TSIG.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/secondary_dns/tsigs/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List TSIGs.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/secondary_dns/tsigs`, _r, t);
  }
  /**
   * Delete TSIG.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/secondary_dns/tsigs/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get TSIG.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/secondary_dns/tsigs/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class _r extends h {
}
hr.TSIGsSinglePage = _r;
let Rh = class extends a {
  /**
   * Get primary zone transfer status.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/secondary_dns/outgoing/status`, t)._thenUnwrap((n) => n.result);
  }
};
class gr extends a {
  constructor() {
    super(...arguments), this.status = new Rh(this._client);
  }
  /**
   * Create primary zone configuration for outgoing zone transfers.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update primary zone configuration for outgoing zone transfers.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/secondary_dns/outgoing`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete primary zone configuration for outgoing zone transfers.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/secondary_dns/outgoing`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Disable outgoing zone transfers for primary zone and clears IXFR backlog of
   * primary zone.
   */
  disable(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing/disable`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Enable outgoing zone transfers for primary zone.
   */
  enable(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing/enable`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Notifies the secondary nameserver(s) and clears IXFR backlog of primary zone.
   */
  forceNotify(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing/force_notify`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get primary zone configuration for outgoing zone transfers.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/secondary_dns/outgoing`, t)._thenUnwrap((n) => n.result);
  }
}
gr.Status = Rh;
class N extends a {
  constructor() {
    super(...arguments), this.forceAXFR = new Sh(this._client), this.incoming = new Ah(this._client), this.outgoing = new gr(this._client), this.acls = new or(this._client), this.peers = new lr(this._client), this.tsigs = new hr(this._client);
  }
}
N.ForceAXFRResource = Sh;
N.IncomingResource = Ah;
N.OutgoingResource = gr;
N.ACLs = or;
N.ACLsSinglePage = ur;
N.Peers = lr;
N.PeersSinglePage = dr;
N.TSIGs = hr;
N.TSIGsSinglePage = _r;
let he = class extends a {
  constructor() {
    super(...arguments), this.dnssec = new xh(this._client), this.records = new sr(this._client), this.settings = new _s(this._client), this.analytics = new rr(this._client), this.zoneTransfers = new N(this._client);
  }
};
he.DNSSECResource = xh;
he.Records = sr;
he.RecordResponsesV4PagePaginationArray = nr;
he.Settings = _s;
he.Analytics = rr;
he.ZoneTransfers = N;
class Lh extends a {
  /**
   * Update reverse DNS configuration (PTR records) for a DNS Firewall cluster
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/dns_firewall/${e}/reverse_dns`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show reverse DNS configuration (PTR records) for a DNS Firewall cluster
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dns_firewall/${e}/reverse_dns`, s)._thenUnwrap((i) => i.result);
  }
}
let vh = class extends a {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dns_firewall/${e}/dns_analytics/report/bytime`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class pr extends a {
  constructor() {
    super(...arguments), this.bytimes = new vh(this._client);
  }
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dns_firewall/${e}/dns_analytics/report`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
pr.Bytimes = vh;
let wr = class extends a {
  constructor() {
    super(...arguments), this.reports = new pr(this._client);
  }
};
wr.Reports = pr;
class gs extends a {
  constructor() {
    super(...arguments), this.analytics = new wr(this._client), this.reverseDNS = new Lh(this._client);
  }
  /**
   * Create a DNS Firewall cluster
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dns_firewall`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List DNS Firewall clusters for an account
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dns_firewall`, D$, { query: n, ...t });
  }
  /**
   * Delete a DNS Firewall cluster
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/dns_firewall/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Modify the configuration of a DNS Firewall cluster
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/dns_firewall/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show a single DNS Firewall cluster for an account
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dns_firewall/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class D$ extends p {
}
gs.Analytics = wr;
gs.ReverseDNS = Lh;
class $r extends a {
  /**
   * Run traceroutes from Cloudflare colos.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/diagnostics/traceroute`, mr, {
      body: n,
      method: "post",
      ...t
    });
  }
}
class mr extends h {
}
$r.TraceroutesSinglePage = mr;
class ps extends a {
  constructor() {
    super(...arguments), this.traceroutes = new $r(this._client);
  }
}
ps.Traceroutes = $r;
ps.TraceroutesSinglePage = mr;
class yr extends a {
  /**
   * Returns the Durable Objects in a given namespace.
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/workers/durable_objects/namespaces/${e}/objects`, fr, { query: i, ...s });
  }
}
class fr extends Dn {
}
yr.DurableObjectsCursorLimitPagination = fr;
let $t = class extends a {
  constructor() {
    super(...arguments), this.objects = new yr(this._client);
  }
  /**
   * Returns the Durable Object namespaces owned by an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/workers/durable_objects/namespaces`, Pr, t);
  }
};
class Pr extends h {
}
$t.NamespacesSinglePage = Pr;
$t.Objects = yr;
$t.DurableObjectsCursorLimitPagination = fr;
class ws extends a {
  constructor() {
    super(...arguments), this.namespaces = new $t(this._client);
  }
}
ws.Namespaces = $t;
ws.NamespacesSinglePage = Pr;
class Ur extends a {
  /**
   * Create a destination address to forward your emails to. Destination addresses
   * need to be verified before they can be used.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/email/routing/addresses`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists existing destination addresses.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email/routing/addresses`, br, { query: n, ...t });
  }
  /**
   * Deletes a specific destination address.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/email/routing/addresses/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets information for a specific destination email already created.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email/routing/addresses/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class br extends p {
}
Ur.AddressesV4PagePaginationArray = br;
let xr = class extends a {
  /**
   * Enable you Email Routing zone. Add and lock the necessary MX and SPF records.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/email/routing/dns`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Disable your Email Routing zone. Also removes additional MX records previously
   * required for Email Routing to work.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/email/routing/dns`, zr, {
      method: "delete",
      ...t
    });
  }
  /**
   * Unlock MX Records previously locked by Email Routing.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/email/routing/dns`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Show the DNS records needed to configure your Email Routing zone.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/email/routing/dns`, { query: n, ...t });
  }
};
class zr extends h {
}
xr.DNSRecordsSinglePage = zr;
class Ih extends a {
  /**
   * Enable or disable catch-all routing rule, or change action to forward to
   * specific destination address.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/email/routing/rules/catch_all`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get information on the default catch-all routing rule.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/email/routing/rules/catch_all`, t)._thenUnwrap((n) => n.result);
  }
}
let $s = class extends a {
  constructor() {
    super(...arguments), this.catchAlls = new Ih(this._client);
  }
  /**
   * Rules consist of a set of criteria for matching emails (such as an email being
   * sent to a specific custom email address) plus a set of actions to take on the
   * email (like forwarding it to a specific destination address).
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/email/routing/rules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update actions and matches, or enable/disable specific routing rules.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/email/routing/rules/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists existing routing rules.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/email/routing/rules`, Sr, { query: n, ...t });
  }
  /**
   * Delete a specific routing rule.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/email/routing/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information for a specific routing rule already created.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/email/routing/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Sr extends p {
}
$s.EmailRoutingRulesV4PagePaginationArray = Sr;
$s.CatchAlls = Ih;
class _e extends a {
  constructor() {
    super(...arguments), this.dns = new xr(this._client), this.rules = new $s(this._client), this.addresses = new Ur(this._client);
  }
  /**
   * Disable your Email Routing zone. Also removes additional MX records previously
   * required for Email Routing to work.
   */
  disable(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/email/routing/disable`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Enable you Email Routing zone. Add and lock the necessary MX and SPF records.
   */
  enable(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.post(`/zones/${s}/email/routing/enable`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about the settings for your Email Routing zone.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/email/routing`, t)._thenUnwrap((n) => n.result);
  }
}
_e.DNS = xr;
_e.DNSRecordsSinglePage = zr;
_e.Rules = $s;
_e.EmailRoutingRulesV4PagePaginationArray = Sr;
_e.Addresses = Ur;
_e.AddressesV4PagePaginationArray = br;
class Ar extends a {
  /**
   * This endpoint returns information for submissions to made to reclassify emails.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/submissions`, Rr, { query: n, ...t });
  }
}
class Rr extends p {
}
Ar.SubmissionListResponsesV4PagePaginationArray = Rr;
let kh = class extends a {
  /**
   * Returns detection details such as threat categories and sender information for
   * non-benign messages.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/investigate/${e}/detections`, s)._thenUnwrap((i) => i.result);
  }
};
class ms extends a {
  /**
   * Move a message
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/email-security/investigate/${e}/move`, Lr, { body: i, method: "post", ...s });
  }
  /**
   * Move multiple messages
   */
  bulk(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/investigate/move`, vr, { body: n, method: "post", ...t });
  }
}
class Lr extends h {
}
class vr extends h {
}
ms.MoveCreateResponsesSinglePage = Lr;
ms.MoveBulkResponsesSinglePage = vr;
class Oh extends a {
  /**
   * Preview for non-detection messages
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/email-security/investigate/preview`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a preview of the message body as a base64 encoded PNG image for
   * non-benign messages.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/investigate/${e}/preview`, s)._thenUnwrap((i) => i.result);
  }
}
class Zh extends a {
  /**
   * Returns the raw eml of any non-benign message.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/investigate/${e}/raw`, s)._thenUnwrap((i) => i.result);
  }
}
class Ch extends a {
  /**
   * Change email classfication
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/email-security/investigate/${e}/reclassify`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Ir extends a {
  /**
   * Release messages from quarantine
   */
  bulk(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/investigate/release`, kr, { body: n, method: "post", ...t });
  }
}
class kr extends h {
}
Ir.ReleaseBulkResponsesSinglePage = kr;
class Vh extends a {
  /**
   * Get email trace
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/investigate/${e}/trace`, s)._thenUnwrap((i) => i.result);
  }
}
class Z extends a {
  constructor() {
    super(...arguments), this.detections = new kh(this._client), this.preview = new Oh(this._client), this.raw = new Zh(this._client), this.trace = new Vh(this._client), this.move = new ms(this._client), this.reclassify = new Ch(this._client), this.release = new Ir(this._client);
  }
  /**
   * Returns information for each email that matches the search parameter(s).
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/investigate`, Or, { query: n, ...t });
  }
  /**
   * Get message details
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/investigate/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Or extends p {
}
Z.InvestigateListResponsesV4PagePaginationArray = Or;
Z.Detections = kh;
Z.Preview = Oh;
Z.Raw = Zh;
Z.Trace = Vh;
Z.Move = ms;
Z.MoveCreateResponsesSinglePage = Lr;
Z.MoveBulkResponsesSinglePage = vr;
Z.Reclassify = Ch;
Z.Release = Ir;
Z.ReleaseBulkResponsesSinglePage = kr;
class Zr extends a {
  /**
   * Create an email allow policy
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/email-security/settings/allow_policies`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists, searches, and sorts an account’s email allow policies.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/allow_policies`, Cr, { query: n, ...t });
  }
  /**
   * Delete an email allow policy
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/email-security/settings/allow_policies/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an email allow policy
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/email-security/settings/allow_policies/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get an email allow policy
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/settings/allow_policies/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Cr extends p {
}
Zr.AllowPolicyListResponsesV4PagePaginationArray = Cr;
class Vr extends a {
  /**
   * Create a blocked email sender
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/email-security/settings/block_senders`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List blocked email senders
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/block_senders`, Tr, { query: n, ...t });
  }
  /**
   * Delete a blocked email sender
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/email-security/settings/block_senders/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update a blocked email sender
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/email-security/settings/block_senders/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a blocked email sender
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/settings/block_senders/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Tr extends p {
}
Vr.BlockSenderListResponsesV4PagePaginationArray = Tr;
let ys = class extends a {
  /**
   * Lists, searches, and sorts an account’s email domains.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/domains`, Dr, { query: n, ...t });
  }
  /**
   * Unprotect an email domain
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/email-security/settings/domains/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Unprotect multiple email domains
   */
  bulkDelete(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/domains`, Er, { method: "delete", ...t });
  }
  /**
   * Update an email domain
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/email-security/settings/domains/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get an email domain
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/settings/domains/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Dr extends p {
}
class Er extends h {
}
ys.DomainListResponsesV4PagePaginationArray = Dr;
ys.DomainBulkDeleteResponsesSinglePage = Er;
class Yr extends a {
  /**
   * Create an entry in impersonation registry
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/email-security/settings/impersonation_registry`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists, searches, and sorts entries in the impersonation registry.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/impersonation_registry`, Fr, { query: n, ...t });
  }
  /**
   * Delete an entry from impersonation registry
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/email-security/settings/impersonation_registry/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an entry in impersonation registry
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/email-security/settings/impersonation_registry/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Get an entry in impersonation registry
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/settings/impersonation_registry/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Fr extends p {
}
Yr.ImpersonationRegistryListResponsesV4PagePaginationArray = Fr;
class Gr extends a {
  /**
   * Create a trusted email domain
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/email-security/settings/trusted_domains`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists, searches, and sorts an account’s trusted email domains.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/trusted_domains`, Br, { query: n, ...t });
  }
  /**
   * Delete a trusted email domain
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/email-security/settings/trusted_domains/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update a trusted email domain
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/email-security/settings/trusted_domains/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a trusted email domain
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/email-security/settings/trusted_domains/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Br extends p {
}
Gr.TrustedDomainListResponsesV4PagePaginationArray = Br;
let C = class extends a {
  constructor() {
    super(...arguments), this.allowPolicies = new Zr(this._client), this.blockSenders = new Vr(this._client), this.domains = new ys(this._client), this.impersonationRegistry = new Yr(this._client), this.trustedDomains = new Gr(this._client);
  }
};
C.AllowPolicies = Zr;
C.AllowPolicyListResponsesV4PagePaginationArray = Cr;
C.BlockSenders = Vr;
C.BlockSenderListResponsesV4PagePaginationArray = Tr;
C.Domains = ys;
C.DomainListResponsesV4PagePaginationArray = Dr;
C.DomainBulkDeleteResponsesSinglePage = Er;
C.ImpersonationRegistry = Yr;
C.ImpersonationRegistryListResponsesV4PagePaginationArray = Fr;
C.TrustedDomains = Gr;
C.TrustedDomainListResponsesV4PagePaginationArray = Br;
class Ue extends a {
  constructor() {
    super(...arguments), this.investigate = new Z(this._client), this.settings = new C(this._client), this.submissions = new Ar(this._client);
  }
}
Ue.Investigate = Z;
Ue.InvestigateListResponsesV4PagePaginationArray = Or;
Ue.Settings = C;
Ue.Submissions = Ar;
Ue.SubmissionListResponsesV4PagePaginationArray = Rr;
class Th extends a {
  /**
   * Creates one or more filters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/filters`, Rn, {
      body: n,
      method: "post",
      ...t
    });
  }
  /**
   * Updates an existing filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  update(e, t, s) {
    const { zone_id: n, body: i } = t;
    return this._client.put(`/zones/${n}/filters/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches filters in a zone. You can filter the results using several optional
   * parameters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/filters`, E$, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes an existing filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/filters/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes one or more existing filters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkDelete(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/filters`, Rn, {
      method: "delete",
      ...t
    });
  }
  /**
   * Updates one or more existing filters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkUpdate(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/filters`, Rn, {
      body: n,
      method: "put",
      ...t
    });
  }
  /**
   * Fetches the details of a filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/filters/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Rn extends h {
}
class E$ extends p {
}
class Nr extends a {
  /**
   * Creates a new IP Access rule for an account or zone. The rule will apply to all
   * zones in the account or zone.
   *
   * Note: To create an IP Access rule that applies to a single zone, refer to the
   * [IP Access rules for a zone](#ip-access-rules-for-a-zone) endpoints.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/firewall/access_rules/rules`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/firewall/access_rules/rules`, Mr, { query: i, ...t });
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/firewall/access_rules/rules/${e}`, s)._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an IP Access rule defined.
   *
   * Note: This operation will affect all zones in the account or zone.
   */
  edit(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.patch(`/${o}/${l}/firewall/access_rules/rules/${e}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/firewall/access_rules/rules/${e}`, s)._thenUnwrap((l) => l.result);
  }
}
class Mr extends p {
}
Nr.AccessRuleListResponsesV4PagePaginationArray = Mr;
class Kr extends a {
  /**
   * Creates a new Zone Lockdown rule.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/firewall/lockdowns`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Zone Lockdown rule.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/firewall/lockdowns/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Zone Lockdown rules. You can filter the results using several optional
   * parameters.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/lockdowns`, Wr, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes an existing Zone Lockdown rule.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/firewall/lockdowns/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a Zone Lockdown rule.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/firewall/lockdowns/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Wr extends p {
}
Kr.LockdownsV4PagePaginationArray = Wr;
let fs = class extends a {
  /**
   * Create one or more firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, $e, {
      body: n,
      method: "post",
      ...t
    });
  }
  /**
   * Updates an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/firewall/rules/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches firewall rules in a zone. You can filter the results using several
   * optional parameters.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, jr, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/firewall/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes existing firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkDelete(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, $e, {
      method: "delete",
      ...t
    });
  }
  /**
   * Updates the priority of existing firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkEdit(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, $e, {
      body: n,
      method: "patch",
      ...t
    });
  }
  /**
   * Updates one or more existing firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkUpdate(e, t) {
    const { zone_id: s, body: n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, $e, {
      body: n,
      method: "put",
      ...t
    });
  }
  /**
   * Updates the priority of an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.getAPIList(`/zones/${n}/firewall/rules/${e}`, $e, {
      body: i,
      method: "patch",
      ...s
    });
  }
  /**
   * Fetches the details of a firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  get(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.get(`/zones/${n}/firewall/rules/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class $e extends h {
}
class jr extends p {
}
fs.FirewallRulesSinglePage = $e;
fs.FirewallRulesV4PagePaginationArray = jr;
class Hr extends a {
  /**
   * Creates a new User Agent Blocking rule in a zone.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/firewall/ua_rules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing User Agent Blocking rule.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/firewall/ua_rules/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches User Agent Blocking rules in a zone. You can filter the results using
   * several optional parameters.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/ua_rules`, Xr, { query: n, ...t });
  }
  /**
   * Deletes an existing User Agent Blocking rule.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/firewall/ua_rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a User Agent Blocking rule.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/firewall/ua_rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Xr extends p {
}
Hr.UARuleListResponsesV4PagePaginationArray = Xr;
class Qr extends a {
  /**
   * Creates a URI-based WAF override for a zone.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/firewall/waf/overrides`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/firewall/waf/overrides/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the URI-based WAF overrides in a zone.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/waf/overrides`, Jr, { query: n, ...t });
  }
  /**
   * Deletes an existing URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/firewall/waf/overrides/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/firewall/waf/overrides/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Jr extends p {
}
Qr.OverridesV4PagePaginationArray = Jr;
let qr = class extends a {
  /**
   * Fetches the WAF rule groups in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  list(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.getAPIList(`/zones/${n}/firewall/waf/packages/${e}/groups`, ec, { query: i, ...s });
  }
  /**
   * Updates a WAF rule group. You can update the state (`mode` parameter) of a rule
   * group.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  edit(e, t, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.patch(`/zones/${i}/firewall/waf/packages/${e}/groups/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Fetches the details of a WAF rule group.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/firewall/waf/packages/${e}/groups/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class ec extends p {
}
qr.GroupsV4PagePaginationArray = ec;
let tc = class extends a {
  /**
   * Fetches WAF rules in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  list(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.getAPIList(`/zones/${n}/firewall/waf/packages/${e}/rules`, sc, { query: i, ...s });
  }
  /**
   * Updates a WAF rule. You can only update the mode/action of the rule.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  edit(e, t, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.patch(`/zones/${i}/firewall/waf/packages/${e}/rules/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Fetches the details of a WAF rule in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/firewall/waf/packages/${e}/rules/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class sc extends p {
}
tc.RuleListResponsesV4PagePaginationArray = sc;
class be extends a {
  constructor() {
    super(...arguments), this.groups = new qr(this._client), this.rules = new tc(this._client);
  }
  /**
   * Fetches WAF packages for a zone.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/firewall/waf/packages`, nc, { query: n, ...t });
  }
  /**
   * Fetches the details of a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/firewall/waf/packages/${e}`, s);
  }
}
class nc extends p {
}
be.PackageListResponsesV4PagePaginationArray = nc;
be.Groups = qr;
be.GroupsV4PagePaginationArray = ec;
be.Rules = tc;
be.RuleListResponsesV4PagePaginationArray = sc;
class Te extends a {
  constructor() {
    super(...arguments), this.overrides = new Qr(this._client), this.packages = new be(this._client);
  }
}
Te.Overrides = Qr;
Te.OverridesV4PagePaginationArray = Jr;
Te.Packages = be;
Te.PackageListResponsesV4PagePaginationArray = nc;
class V extends a {
  constructor() {
    super(...arguments), this.lockdowns = new Kr(this._client), this.rules = new fs(this._client), this.accessRules = new Nr(this._client), this.uaRules = new Hr(this._client), this.waf = new Te(this._client);
  }
}
V.Lockdowns = Kr;
V.LockdownsV4PagePaginationArray = Wr;
V.Rules = fs;
V.FirewallRulesSinglePage = $e;
V.FirewallRulesV4PagePaginationArray = jr;
V.AccessRules = Nr;
V.AccessRuleListResponsesV4PagePaginationArray = Mr;
V.UARules = Hr;
V.UARuleListResponsesV4PagePaginationArray = Xr;
V.WAF = Te;
let Dh = class extends a {
  /**
   * Create a new preview health check.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/healthchecks/preview`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a health check.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/healthchecks/preview/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a single configured health check preview.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/healthchecks/preview/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class ic extends a {
  constructor() {
    super(...arguments), this.previews = new Dh(this._client);
  }
  /**
   * Create a new health check.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/healthchecks`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a configured health check.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/healthchecks/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured health checks.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/healthchecks`, Y$, {
      query: n,
      ...t
    });
  }
  /**
   * Delete a health check.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/healthchecks/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patch a configured health check.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/healthchecks/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured health check.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/healthchecks/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Y$ extends p {
}
ic.Previews = Dh;
class rc extends a {
  /**
   * Update the tls setting value for the hostname.
   */
  update(e, t, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.put(`/zones/${i}/hostnames/settings/${e}/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Delete the tls setting value for the hostname.
   */
  delete(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.delete(`/zones/${i}/hostnames/settings/${e}/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * List the requested TLS setting for the hostnames under this zone.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/hostnames/settings/${e}`, cc, s);
  }
}
class cc extends h {
}
rc.TLSGetResponsesSinglePage = cc;
let Ps = class extends a {
  constructor() {
    super(...arguments), this.tls = new rc(this._client);
  }
};
Ps.TLS = rc;
Ps.TLSGetResponsesSinglePage = cc;
let ac = class extends a {
  constructor() {
    super(...arguments), this.settings = new Ps(this._client);
  }
};
ac.Settings = Ps;
let oc = class extends a {
  /**
   * Creates and returns a new Hyperdrive configuration.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/hyperdrive/configs`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates and returns the specified Hyperdrive configuration.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/hyperdrive/configs/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns a list of Hyperdrives
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/hyperdrive/configs`, uc, t);
  }
  /**
   * Deletes the specified Hyperdrive.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/hyperdrive/configs/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patches and returns the specified Hyperdrive configuration. Custom caching
   * settings are not kept if caching is disabled.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/hyperdrive/configs/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified Hyperdrive configuration.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/hyperdrive/configs/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class uc extends h {
}
oc.ConfigListResponsesSinglePage = uc;
class Us extends a {
  constructor() {
    super(...arguments), this.configs = new oc(this._client);
  }
}
Us.Configs = oc;
Us.ConfigListResponsesSinglePage = uc;
let lc = class extends a {
  /**
   * List all the permissions groups for an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/iam/permission_groups`, dc, { query: n, ...t });
  }
  /**
   * Get information about a specific permission group in an account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/iam/permission_groups/${e}`, s);
  }
};
class dc extends p {
}
lc.PermissionGroupListResponsesV4PagePaginationArray = dc;
class hc extends a {
  /**
   * Create a new Resource Group under the specified account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/iam/resource_groups`, { body: n, ...t });
  }
  /**
   * Modify an existing resource group.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/iam/resource_groups/${e}`, {
      body: i,
      ...s
    });
  }
  /**
   * List all the resource groups for an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/iam/resource_groups`, _c, { query: n, ...t });
  }
  /**
   * Remove a resource group from an account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/iam/resource_groups/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific resource group in an account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/iam/resource_groups/${e}`, s);
  }
}
class _c extends p {
}
hc.ResourceGroupListResponsesV4PagePaginationArray = _c;
class De extends a {
  constructor() {
    super(...arguments), this.permissionGroups = new lc(this._client), this.resourceGroups = new hc(this._client);
  }
}
De.PermissionGroups = lc;
De.PermissionGroupListResponsesV4PagePaginationArray = dc;
De.ResourceGroups = hc;
De.ResourceGroupListResponsesV4PagePaginationArray = _c;
let Eh = class extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.get("/ips", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
class Yh extends a {
  /**
   * Fetch base image. For most images this will be the originally uploaded file. For
   * larger images it can be a near-lossless version of the original.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/images/v1/${e}/blob`, {
      ...s,
      headers: { Accept: "image/*", ...s == null ? void 0 : s.headers },
      __binaryResponse: !0
    });
  }
}
let Fh = class extends a {
  /**
   * Create a new signing key with specified name. Returns all keys available.
   */
  update(e, t, s) {
    const { account_id: n } = t;
    return this._client.put(`/accounts/${n}/images/v1/keys/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists your signing keys. These can be found on your Cloudflare Images dashboard.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/images/v1/keys`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Delete signing key with specified name. Returns all keys available. When last
   * key is removed, a new default signing key will be generated.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/images/v1/keys/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Gh extends a {
  /**
   * Fetch usage statistics details for Cloudflare Images.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/images/v1/stats`, t)._thenUnwrap((n) => n.result);
  }
}
class Bh extends a {
  /**
   * Specify variants that allow you to resize images for different use cases.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/images/v1/variants`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists existing variants.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/images/v1/variants`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Deleting a variant purges the cache for all images associated with the variant.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/images/v1/variants/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updating a variant purges the cache for all images associated with the variant.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/images/v1/variants/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch details for a single variant.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/images/v1/variants/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class xe extends a {
  constructor() {
    super(...arguments), this.keys = new Fh(this._client), this.stats = new Gh(this._client), this.variants = new Bh(this._client), this.blobs = new Yh(this._client);
  }
  /**
   * Upload an image with up to 10 Megabytes using a single HTTP POST
   * (multipart/form-data) request. An image can be uploaded by sending an image file
   * or passing an accessible to an API url.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/images/v1`, R({ body: n, ...t }))._thenUnwrap((i) => i.result);
  }
  /**
   * List up to 100 images with one request. Use the optional parameters below to get
   * a specific range of images.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/images/v1`, gc, {
      query: n,
      ...t
    });
  }
  /**
   * Delete an image on Cloudflare Images. On success, all copies of the image are
   * deleted and purged from cache.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/images/v1/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update image access control. On access control change, all copies of the image
   * are purged from cache.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/images/v1/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch details for a single image.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/images/v1/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class gc extends F {
}
xe.V1ListResponsesV4PagePagination = gc;
xe.Keys = Fh;
xe.Stats = Gh;
xe.Variants = Bh;
xe.Blobs = Yh;
class Nh extends a {
  /**
   * Direct uploads allow users to upload images without API keys. A common use case
   * are web apps, client-side applications, or mobile devices where users upload
   * content directly to Cloudflare Images. This method creates a draft record for a
   * future image. It returns an upload URL and an image identifier. To verify if the
   * image itself has been uploaded, send an image details request
   * (accounts/:account_identifier/images/v1/:identifier), and check that the
   * `draft: true` property is not present.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/images/v2/direct_upload`, R({ body: n, ...t }))._thenUnwrap((i) => i.result);
  }
}
class pc extends a {
  constructor() {
    super(...arguments), this.directUploads = new Nh(this._client);
  }
  /**
   * List up to 10000 images with one request. Use the optional parameters below to
   * get a specific range of images. Endpoint returns continuation_token if more
   * images are present.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/images/v2`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
}
pc.DirectUploads = Nh;
class mt extends a {
  constructor() {
    super(...arguments), this.v1 = new xe(this._client), this.v2 = new pc(this._client);
  }
}
mt.V1 = xe;
mt.V1ListResponsesV4PagePagination = gc;
mt.V2 = pc;
let Mh = class extends a {
  /**
   * Gets a list of all the domains that have resolved to a specific IP address.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/intel/dns`, wc, {
      query: n,
      ...t
    });
  }
};
class wc extends F {
}
Mh.DNSV4PagePagination = wc;
class Kh extends a {
  /**
   * Gets historical security threat and content categories currently and previously
   * assigned to a domain.
   */
  get(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/domain-history`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class $c extends a {
  /**
   * Get IP Lists
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/intel/ip-list`, mc, t);
  }
}
class mc extends h {
}
$c.IPListsSinglePage = mc;
let Wh = class extends a {
  /**
   * Gets the geolocation, ASN, infrastructure type of the ASN, and any security
   * threat categories of an IP address.
   */
  get(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/ip`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
};
class jh extends a {
  /**
   * Allows you to submit requests to change a domain’s category.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/intel/miscategorization`, { body: n, ...t });
  }
}
class yc extends a {
  /**
   * List sinkholes owned by this account
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/intel/sinkholes`, fc, t);
  }
}
class fc extends h {
}
yc.SinkholesSinglePage = fc;
class F$ extends a {
  /**
   * Get WHOIS Record
   */
  get(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/whois`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
}
class Hh extends a {
  /**
   * Get ASN Subnets
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/asn/${e}/subnets`, s);
  }
}
class Pc extends a {
  constructor() {
    super(...arguments), this.subnets = new Hh(this._client);
  }
  /**
   * Gets an overview of the Autonomous System Number (ASN) and a list of subnets for
   * it.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/asn/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
Pc.Subnets = Hh;
class Uc extends a {
  /**
   * Get Security Center Issues Types
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/intel/attack-surface-report/issue-types`, bc, t);
  }
}
class bc extends h {
}
Uc.IssueTypeGetResponsesSinglePage = bc;
class xc extends a {
  /**
   * Get Security Center Issues
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/intel/attack-surface-report/issues`, zc, { query: n, ...t });
  }
  /**
   * Get Security Center Issue Counts by Class
   */
  class(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/attack-surface-report/issues/class`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Archive Security Center Insight
   */
  dismiss(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/intel/attack-surface-report/${e}/dismiss`, {
      body: i,
      ...s
    });
  }
  /**
   * Get Security Center Issue Counts by Severity
   */
  severity(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/attack-surface-report/issues/severity`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Security Center Issue Counts by Type
   */
  type(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/attack-surface-report/issues/type`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class zc extends F {
}
xc.IssueListResponsesV4PagePagination = zc;
class Ee extends a {
  constructor() {
    super(...arguments), this.issueTypes = new Uc(this._client), this.issues = new xc(this._client);
  }
}
Ee.IssueTypes = Uc;
Ee.IssueTypeGetResponsesSinglePage = bc;
Ee.Issues = xc;
Ee.IssueListResponsesV4PagePagination = zc;
class Xh extends a {
  /**
   * Same as summary
   */
  get(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/domain/bulk`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
let Sc = class extends a {
  constructor() {
    super(...arguments), this.bulks = new Xh(this._client);
  }
  /**
   * Gets security details and statistics about a domain.
   */
  get(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/intel/domain`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
};
Sc.Bulks = Xh;
let Qh = class extends a {
  /**
   * Download indicator feed data
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/indicator_feeds/${e}/download`, s)._thenUnwrap((i) => i.result);
  }
};
class Jh extends a {
  /**
   * Grant permission to indicator feed
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/intel/indicator-feeds/permissions/add`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List indicator feed permissions
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/intel/indicator-feeds/permissions/view`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Revoke permission to indicator feed
   */
  delete(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/intel/indicator-feeds/permissions/remove`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class qh extends a {
  /**
   * Update indicator feed data
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/intel/indicator-feeds/${e}/snapshot`, R({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
}
class Ye extends a {
  constructor() {
    super(...arguments), this.snapshots = new qh(this._client), this.permissions = new Jh(this._client), this.downloads = new Qh(this._client);
  }
  /**
   * Create new indicator feed
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/intel/indicator-feeds`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update indicator feed metadata
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/intel/indicator-feeds/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get indicator feeds owned by this account
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/intel/indicator-feeds`, Ac, t);
  }
  /**
   * Get indicator feed data
   */
  data(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/indicator-feeds/${e}/data`, {
      ...s,
      headers: { Accept: "text/csv", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Get indicator feed metadata
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/indicator-feeds/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Ac extends h {
}
Ye.IndicatorFeedListResponsesSinglePage = Ac;
Ye.Snapshots = qh;
Ye.Permissions = Jh;
Ye.Downloads = Qh;
class I extends a {
  constructor() {
    super(...arguments), this.asn = new Pc(this._client), this.dns = new Mh(this._client), this.domains = new Sc(this._client), this.domainHistory = new Kh(this._client), this.ips = new Wh(this._client), this.ipLists = new $c(this._client), this.miscategorizations = new jh(this._client), this.whois = new F$(this._client), this.indicatorFeeds = new Ye(this._client), this.sinkholes = new yc(this._client), this.attackSurfaceReport = new Ee(this._client);
  }
}
I.ASN = Pc;
I.DNSV4PagePagination = wc;
I.Domains = Sc;
I.DomainHistoryResource = Kh;
I.IPs = Wh;
I.IPLists = $c;
I.IPListsSinglePage = mc;
I.Miscategorizations = jh;
I.IndicatorFeeds = Ye;
I.IndicatorFeedListResponsesSinglePage = Ac;
I.Sinkholes = yc;
I.SinkholesSinglePage = fc;
I.AttackSurfaceReport = Ee;
let e_ = class extends a {
  /**
   * Retrieves Workers KV request metrics for the given account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/storage/analytics`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves Workers KV stored data metrics for the given account.
   */
  stored(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/storage/analytics/stored`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}, Rc = class extends a {
  /**
   * Lists a namespace's keys.
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/storage/kv/namespaces/${e}/keys`, Lc, { query: i, ...s });
  }
};
class Lc extends Dn {
}
Rc.KeysCursorLimitPagination = Lc;
class t_ extends a {
  /**
   * Returns the metadata associated with the given key in the given namespace. Use
   * URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key
   * name.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/storage/kv/namespaces/${e}/metadata/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class s_ extends a {
  /**
   * Write a value identified by a key. Use URL-encoding to use special characters
   * (for example, `:`, `!`, `%`) in the key name. Body should be the value to be
   * stored. If JSON metadata to be associated with the key/value pair is needed, use
   * `multipart/form-data` content type for your PUT request (see dropdown below in
   * `REQUEST BODY SCHEMA`). Existing values, expirations, and metadata will be
   * overwritten. If neither `expiration` nor `expiration_ttl` is specified, the
   * key-value pair will never expire. If both are set, `expiration_ttl` is used and
   * `expiration` is ignored.
   */
  update(e, t, s, n) {
    const { account_id: i, expiration: c, expiration_ttl: o, ...l } = s;
    return this._client.put(`/accounts/${i}/storage/kv/namespaces/${e}/values/${t}`, Tn({
      query: { expiration: c, expiration_ttl: o },
      body: l,
      ...n,
      headers: { "Content-Type": "*/*", ...n == null ? void 0 : n.headers }
    }))._thenUnwrap((g) => g.result);
  }
  /**
   * Remove a KV pair from the namespace. Use URL-encoding to use special characters
   * (for example, `:`, `!`, `%`) in the key name.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/storage/kv/namespaces/${e}/values/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the value associated with the given key in the given namespace. Use
   * URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key
   * name. If the KV-pair is set to expire at some point, the expiration time as
   * measured in seconds since the UNIX epoch will be returned in the `expiration`
   * response header.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/storage/kv/namespaces/${e}/values/${t}`, {
      ...n,
      headers: { Accept: "application/octet-stream", ...n == null ? void 0 : n.headers },
      __binaryResponse: !0
    });
  }
}
let ge = class extends a {
  constructor() {
    super(...arguments), this.analytics = new e_(this._client), this.keys = new Rc(this._client), this.metadata = new t_(this._client), this.values = new s_(this._client);
  }
  /**
   * Creates a namespace under the given title. A `400` is returned if the account
   * already owns a namespace with this title. A namespace must be explicitly deleted
   * to be replaced.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/storage/kv/namespaces`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modifies a namespace's title.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/storage/kv/namespaces/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the namespaces owned by an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/storage/kv/namespaces`, vc, { query: n, ...t });
  }
  /**
   * Deletes the namespace corresponding to the given ID.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/storage/kv/namespaces/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Remove multiple KV pairs from the namespace. Body should be an array of up to
   * 10,000 keys to be removed.
   */
  bulkDelete(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/storage/kv/namespaces/${e}/bulk/delete`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Write multiple keys and values at once. Body should be an array of up to 10,000
   * key-value pairs to be stored, along with optional expiration information.
   * Existing values and expirations will be overwritten. If neither `expiration` nor
   * `expiration_ttl` is specified, the key-value pair will never expire. If both are
   * set, `expiration_ttl` is used and `expiration` is ignored. The entire request
   * size must be 100 megabytes or less.
   */
  bulkUpdate(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.put(`/accounts/${n}/storage/kv/namespaces/${e}/bulk`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get the namespace corresponding to the given ID.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/storage/kv/namespaces/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class vc extends p {
}
ge.NamespacesV4PagePaginationArray = vc;
ge.Analytics = e_;
ge.Keys = Rc;
ge.KeysCursorLimitPagination = Lc;
ge.Metadata = t_;
ge.Values = s_;
class bs extends a {
  constructor() {
    super(...arguments), this.namespaces = new ge(this._client);
  }
}
bs.Namespaces = ge;
bs.NamespacesV4PagePaginationArray = vc;
class n_ extends a {
  /**
   * Create Keyless SSL Configuration
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/keyless_certificates`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List all Keyless SSL configurations for a given zone.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/keyless_certificates`, G$, t);
  }
  /**
   * Delete Keyless SSL Configuration
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/keyless_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * This will update attributes of a Keyless SSL. Consists of one or more of the
   * following: host,name,port.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/keyless_certificates/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get details for one Keyless SSL configuration.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/keyless_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class G$ extends h {
}
class Ic extends a {
  /**
   * Create user-defined detection pattern for Leaked Credential Checks
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/leaked-credential-checks/detections`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update user-defined detection pattern for Leaked Credential Checks
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/leaked-credential-checks/detections/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List user-defined detection patterns for Leaked Credential Checks
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/leaked-credential-checks/detections`, kc, t);
  }
  /**
   * Remove user-defined detection pattern for Leaked Credential Checks
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/leaked-credential-checks/detections/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class kc extends h {
}
Ic.DetectionListResponsesSinglePage = kc;
class xs extends a {
  constructor() {
    super(...arguments), this.detections = new Ic(this._client);
  }
  /**
   * Updates the current status of Leaked Credential Checks
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/leaked-credential-checks`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves the current status of Leaked Credential Checks
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/leaked-credential-checks`, t)._thenUnwrap((n) => n.result);
  }
}
xs.Detections = Ic;
xs.DetectionListResponsesSinglePage = kc;
let i_ = class extends a {
  /**
   * Get the result of a previous preview operation using the provided preview_id.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/load_balancers/preview/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class r_ extends a {
  /**
   * List all region mappings.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/load_balancers/regions`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get a single region mapping.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/load_balancers/regions/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Oc extends a {
  /**
   * Search for Load Balancing resources.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/search`, Zc, { query: n, ...t });
  }
}
class Zc extends F {
}
Oc.SearchListResponsesV4PagePagination = Zc;
class c_ extends a {
  /**
   * Preview pools using the specified monitor with provided monitor details. The
   * returned preview_id can be used in the preview endpoint to retrieve the results.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/load_balancers/monitors/${e}/preview`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let Cc = class extends a {
  /**
   * Get the list of resources that reference the provided monitor.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/load_balancers/monitors/${e}/references`, Vc, s);
  }
}, Vc = class extends h {
};
Cc.ReferenceGetResponsesSinglePage = Vc;
class Fe extends a {
  constructor() {
    super(...arguments), this.previews = new c_(this._client), this.references = new Cc(this._client);
  }
  /**
   * Create a configured monitor.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/load_balancers/monitors`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify a configured monitor.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/load_balancers/monitors/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured monitors for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/monitors`, Tc, t);
  }
  /**
   * Delete a configured monitor.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/load_balancers/monitors/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to an existing monitor, overwriting the supplied properties.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/load_balancers/monitors/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a single configured monitor for an account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/load_balancers/monitors/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Tc extends h {
}
Fe.MonitorsSinglePage = Tc;
Fe.Previews = c_;
Fe.References = Cc;
Fe.ReferenceGetResponsesSinglePage = Vc;
class a_ extends a {
  /**
   * Preview pool health using provided monitor details. The returned preview_id can
   * be used in the preview endpoint to retrieve the results.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/load_balancers/pools/${e}/preview`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch the latest pool health status for a single pool.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/load_balancers/pools/${e}/health`, s)._thenUnwrap((i) => i.result);
  }
}
let Dc = class extends a {
  /**
   * Get the list of resources that reference the provided pool.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/load_balancers/pools/${e}/references`, Ec, s);
  }
};
class Ec extends h {
}
Dc.ReferenceGetResponsesSinglePage = Ec;
class Ge extends a {
  constructor() {
    super(...arguments), this.health = new a_(this._client), this.references = new Dc(this._client);
  }
  /**
   * Create a new pool.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/load_balancers/pools`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify a configured pool.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/load_balancers/pools/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured pools.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/pools`, jt, {
      query: n,
      ...t
    });
  }
  /**
   * Delete a configured pool.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/load_balancers/pools/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to a number of existing pools, overwriting the supplied
   * properties. Pools are ordered by ascending `name`. Returns the list of affected
   * pools. Supports the standard pagination query parameters, either
   * `limit`/`offset` or `per_page`/`page`.
   */
  bulkEdit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/pools`, jt, {
      body: n,
      method: "patch",
      ...t
    });
  }
  /**
   * Apply changes to an existing pool, overwriting the supplied properties.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/load_balancers/pools/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured pool.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/load_balancers/pools/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class jt extends h {
}
Ge.PoolsSinglePage = jt;
Ge.Health = a_;
Ge.References = Dc;
Ge.ReferenceGetResponsesSinglePage = Ec;
class J extends a {
  constructor() {
    super(...arguments), this.monitors = new Fe(this._client), this.pools = new Ge(this._client), this.previews = new i_(this._client), this.regions = new r_(this._client), this.searches = new Oc(this._client);
  }
  /**
   * Create a new load balancer.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/load_balancers`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a configured load balancer.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/load_balancers/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured load balancers.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/load_balancers`, B$, t);
  }
  /**
   * Delete a configured load balancer.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/load_balancers/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to an existing load balancer, overwriting the supplied properties.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/load_balancers/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured load balancer.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/load_balancers/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class B$ extends h {
}
J.Monitors = Fe;
J.MonitorsSinglePage = Tc;
J.Pools = Ge;
J.PoolsSinglePage = jt;
J.Previews = i_;
J.Regions = r_;
J.Searches = Oc;
J.SearchListResponsesV4PagePagination = Zc;
class Yc extends a {
  /**
   * Creates a new Instant Logs job for a zone.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/logpush/edge`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists Instant Logs jobs for a zone.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/logpush/edge`, Fc, t);
  }
}
class Fc extends h {
}
Yc.InstantLogpushJobsSinglePage = Fc;
let Gc = class extends a {
  /**
   * Creates a new Logpush job for an account or zone.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/logpush/jobs`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a Logpush job.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/logpush/jobs/${e}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/logpush/jobs`, zs, t);
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/logpush/jobs/${e}`, s)._thenUnwrap((l) => l.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/logpush/jobs/${e}`, s)._thenUnwrap((l) => l.result);
  }
};
class zs extends h {
}
Gc.LogpushJobsSinglePage = zs;
class o_ extends a {
  /**
   * Gets a new ownership challenge sent to your destination.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/logpush/ownership`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Validates ownership challenge of the destination.
   */
  validate(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/logpush/ownership/validate`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
}
class u_ extends a {
  /**
   * Validates destination.
   */
  destination(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/logpush/validate/destination`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Checks if there is an existing job with a destination.
   */
  destinationExists(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/logpush/validate/destination/exists`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Validates logpull origin with logpull_options.
   */
  origin(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/logpush/validate/origin`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
}
let l_ = class extends a {
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/logpush/datasets/${e}/fields`, s)._thenUnwrap((l) => l.result);
  }
};
class d_ extends a {
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${o}/logpush/datasets/${e}/jobs`, zs, s);
  }
}
let Ss = class extends a {
  constructor() {
    super(...arguments), this.fields = new l_(this._client), this.jobs = new d_(this._client);
  }
};
Ss.Fields = l_;
Ss.Jobs = d_;
class re extends a {
  constructor() {
    super(...arguments), this.datasets = new Ss(this._client), this.edge = new Yc(this._client), this.jobs = new Gc(this._client), this.ownership = new o_(this._client), this.validate = new u_(this._client);
  }
}
re.Datasets = Ss;
re.Edge = Yc;
re.InstantLogpushJobsSinglePage = Fc;
re.Jobs = Gc;
re.LogpushJobsSinglePage = zs;
re.Ownership = o_;
re.Validate = u_;
class h_ extends a {
  /**
   * The `/rayids` api route allows lookups by specific rayid. The rayids route will
   * return zero, one, or more records (ray ids are not unique).
   */
  get(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.get(`/zones/${n}/logs/rayids/${e}`, { query: i, ...s });
  }
}
class __ extends a {
  /**
   * Updates log retention flag for Logpull API.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/logs/control/retention/flag`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets log retention flag for Logpull API.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/logs/control/retention/flag`, t)._thenUnwrap((n) => n.result);
  }
}
class g_ extends a {
  /**
   * Updates CMB config.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/logs/control/cmb/config`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes CMB config.
   */
  delete(e, t) {
    const { account_id: s } = e;
    return this._client.delete(`/accounts/${s}/logs/control/cmb/config`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Gets CMB config.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/logs/control/cmb/config`, t)._thenUnwrap((n) => n.result);
  }
}
class Bc extends a {
  constructor() {
    super(...arguments), this.config = new g_(this._client);
  }
}
Bc.Config = g_;
class As extends a {
  constructor() {
    super(...arguments), this.retention = new __(this._client), this.cmb = new Bc(this._client);
  }
}
As.Retention = __;
As.Cmb = Bc;
class p_ extends a {
  /**
   * Lists all fields available. The response is json object with key-value pairs,
   * where keys are field names, and values are descriptions.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/logs/received/fields`, t);
  }
}
class Nc extends a {
  constructor() {
    super(...arguments), this.fields = new p_(this._client);
  }
  /**
   * The `/received` api route allows customers to retrieve their edge HTTP logs. The
   * basic access pattern is "give me all the logs for zone Z for minute M", where
   * the minute M refers to the time records were received at Cloudflare's central
   * data center. `start` is inclusive, and `end` is exclusive. Because of that, to
   * get all data, at minutely cadence, starting at 10AM, the proper values are:
   * `start=2018-05-20T10:00:00Z&end=2018-05-20T10:01:00Z`, then
   * `start=2018-05-20T10:01:00Z&end=2018-05-20T10:02:00Z` and so on; the overlap
   * will be handled properly.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/logs/received`, { query: n, ...t });
  }
}
Nc.Fields = p_;
let yt = class extends a {
  constructor() {
    super(...arguments), this.control = new As(this._client), this.RayID = new h_(this._client), this.received = new Nc(this._client);
  }
};
yt.Control = As;
yt.RayID = h_;
yt.Received = Nc;
class Mc extends a {
  /**
   * Lists all active associations between the certificate and Cloudflare services.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/mtls_certificates/${e}/associations`, Kc, s);
  }
}
class Kc extends h {
}
Mc.CertificateAsssociationsSinglePage = Kc;
class Rs extends a {
  constructor() {
    super(...arguments), this.associations = new Mc(this._client);
  }
  /**
   * Upload a certificate that you want to use with mTLS-enabled Cloudflare services.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/mtls_certificates`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all mTLS certificates.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/mtls_certificates`, N$, t);
  }
  /**
   * Deletes the mTLS certificate unless the certificate is in use by one or more
   * Cloudflare services.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/mtls_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single mTLS certificate.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/mtls_certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class N$ extends h {
}
Rs.Associations = Mc;
Rs.CertificateAsssociationsSinglePage = Kc;
class w_ extends a {
  /**
   * Lists default sampling, router IPs, warp devices, and rules for account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/mnm/config/full`, t)._thenUnwrap((n) => n.result);
  }
}
class Wc extends a {
  constructor() {
    super(...arguments), this.full = new w_(this._client);
  }
  /**
   * Create a new network monitoring configuration.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/mnm/config`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing network monitoring configuration, requires the entire
   * configuration to be updated at once.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/mnm/config`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete an existing network monitoring configuration.
   */
  delete(e, t) {
    const { account_id: s } = e;
    return this._client.delete(`/accounts/${s}/mnm/config`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Update fields in an existing network monitoring configuration.
   */
  edit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.patch(`/accounts/${s}/mnm/config`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists default sampling, router IPs and warp devices for account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/mnm/config`, t)._thenUnwrap((n) => n.result);
  }
}
Wc.Full = w_;
class $_ extends a {
  /**
   * Update advertisement for rule.
   */
  edit(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.patch(`/accounts/${n}/mnm/rules/${e}/advertisement`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let Ls = class extends a {
  constructor() {
    super(...arguments), this.advertisements = new $_(this._client);
  }
  /**
   * Create network monitoring rules for account. Currently only supports creating a
   * single rule per API request.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/mnm/rules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update network monitoring rules for account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/mnm/rules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists network monitoring rules for account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/mnm/rules`, jc, t);
  }
  /**
   * Delete a network monitoring rule for account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/mnm/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update a network monitoring rule for account.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/mnm/rules/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a single network monitoring rule for account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/mnm/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class jc extends h {
}
Ls.MagicNetworkMonitoringRulesSinglePage = jc;
Ls.Advertisements = $_;
class ft extends a {
  constructor() {
    super(...arguments), this.configs = new Wc(this._client), this.rules = new Ls(this._client);
  }
}
ft.Configs = Wc;
ft.Rules = Ls;
ft.MagicNetworkMonitoringRulesSinglePage = jc;
let Hc = class extends a {
  /**
   * Creates a new App for an account
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/magic/apps`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an Account App
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/magic/apps/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Apps associated with an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/magic/apps`, Xc, t);
  }
  /**
   * Deletes specific Account App.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/magic/apps/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Xc extends h {
}
Hc.AppListResponsesSinglePage = Xc;
class m_ extends a {
  /**
   * Updates a specific interconnect associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  update(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i, ...c } = t;
    return this._client.put(`/accounts/${n}/magic/cf_interconnects/${e}`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists interconnects associated with an account.
   */
  list(e, t) {
    const { account_id: s, "x-magic-new-hc-target": n } = e;
    return this._client.get(`/accounts/${s}/magic/cf_interconnects`, {
      ...t,
      headers: {
        ...(n == null ? void 0 : n.toString()) != null ? { "x-magic-new-hc-target": n == null ? void 0 : n.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates multiple interconnects associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  bulkUpdate(e, t) {
    const { account_id: s, body: n, "x-magic-new-hc-target": i } = e;
    return this._client.put(`/accounts/${s}/magic/cf_interconnects`, {
      body: n,
      ...t,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists details for a specific interconnect.
   */
  get(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = t;
    return this._client.get(`/accounts/${n}/magic/cf_interconnects/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
let Qc = class extends a {
  /**
   * Replace Connector
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/magic/connectors/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Connectors
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/magic/connectors`, Jc, t);
  }
  /**
   * Update Connector
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/magic/connectors/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch Connector
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/magic/connectors/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Jc extends h {
}
Qc.ConnectorListResponsesSinglePage = Jc;
class y_ extends a {
  /**
   * Creates new GRE tunnels. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   */
  create(e, t) {
    const { account_id: s, body: n, "x-magic-new-hc-target": i } = e;
    return this._client.post(`/accounts/${s}/magic/gre_tunnels`, {
      body: n,
      ...t,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a specific GRE tunnel. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   */
  update(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i, ...c } = t;
    return this._client.put(`/accounts/${n}/magic/gre_tunnels/${e}`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists GRE tunnels associated with an account.
   */
  list(e, t) {
    const { account_id: s, "x-magic-new-hc-target": n } = e;
    return this._client.get(`/accounts/${s}/magic/gre_tunnels`, {
      ...t,
      headers: {
        ...(n == null ? void 0 : n.toString()) != null ? { "x-magic-new-hc-target": n == null ? void 0 : n.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Disables and removes a specific static GRE tunnel. Use `?validate_only=true` as
   * an optional query parameter to only run validation without persisting changes.
   */
  delete(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = t;
    return this._client.delete(`/accounts/${n}/magic/gre_tunnels/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates multiple GRE tunnels. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   */
  bulkUpdate(e, t) {
    const { account_id: s, body: n, "x-magic-new-hc-target": i } = e;
    return this._client.put(`/accounts/${s}/magic/gre_tunnels`, {
      body: n,
      ...t,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists informtion for a specific GRE tunnel.
   */
  get(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = t;
    return this._client.get(`/accounts/${n}/magic/gre_tunnels/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class f_ extends a {
  /**
   * Creates new IPsec tunnels associated with an account. Use `?validate_only=true`
   * as an optional query parameter to only run validation without persisting
   * changes.
   */
  create(e, t) {
    const { account_id: s, "x-magic-new-hc-target": n, ...i } = e;
    return this._client.post(`/accounts/${s}/magic/ipsec_tunnels`, {
      body: i,
      ...t,
      headers: {
        ...(n == null ? void 0 : n.toString()) != null ? { "x-magic-new-hc-target": n == null ? void 0 : n.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a specific IPsec tunnel associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  update(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i, ...c } = t;
    return this._client.put(`/accounts/${n}/magic/ipsec_tunnels/${e}`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists IPsec tunnels associated with an account.
   */
  list(e, t) {
    const { account_id: s, "x-magic-new-hc-target": n } = e;
    return this._client.get(`/accounts/${s}/magic/ipsec_tunnels`, {
      ...t,
      headers: {
        ...(n == null ? void 0 : n.toString()) != null ? { "x-magic-new-hc-target": n == null ? void 0 : n.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Disables and removes a specific static IPsec Tunnel associated with an account.
   * Use `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  delete(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = t;
    return this._client.delete(`/accounts/${n}/magic/ipsec_tunnels/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update multiple IPsec tunnels associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  bulkUpdate(e, t) {
    const { account_id: s, body: n, "x-magic-new-hc-target": i } = e;
    return this._client.put(`/accounts/${s}/magic/ipsec_tunnels`, {
      body: n,
      ...t,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists details for a specific IPsec tunnel.
   */
  get(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = t;
    return this._client.get(`/accounts/${n}/magic/ipsec_tunnels/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Generates a Pre Shared Key for a specific IPsec tunnel used in the IKE session.
   * Use `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes. After a PSK is generated, the PSK is immediately
   * persisted to Cloudflare's edge and cannot be retrieved later. Note the PSK in a
   * safe place.
   */
  pskGenerate(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/magic/ipsec_tunnels/${e}/psk_generate`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let P_ = class extends a {
  /**
   * Creates a new Magic static route. Use `?validate_only=true` as an optional query
   * parameter to run validation only without persisting changes.
   */
  create(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.post(`/accounts/${s}/magic/routes`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a specific Magic static route. Use `?validate_only=true` as an optional
   * query parameter to run validation only without persisting changes.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/magic/routes/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all Magic static routes.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/magic/routes`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Disable and remove a specific Magic static route.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/magic/routes/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update multiple Magic static routes. Use `?validate_only=true` as an optional
   * query parameter to run validation only without persisting changes. Only fields
   * for a route that need to be changed need be provided.
   */
  bulkUpdate(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/magic/routes`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete multiple Magic static routes.
   */
  empty(e, t) {
    const { account_id: s } = e;
    return this._client.delete(`/accounts/${s}/magic/routes`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Get a specific Magic static route.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/magic/routes/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class U_ extends a {
  /**
   * Download PCAP information into a file. Response is a binary PCAP file.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/pcaps/${e}/download`, {
      ...s,
      headers: { Accept: "application/vnd.tcpdump.pcap", ...s == null ? void 0 : s.headers },
      __binaryResponse: !0
    });
  }
}
class qc extends a {
  /**
   * Adds an AWS or GCP bucket to use with full packet captures.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/pcaps/ownership`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes buckets added to the packet captures API.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/pcaps/ownership/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * List all buckets configured for use with PCAPs API.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/pcaps/ownership`, ea, t);
  }
  /**
   * Validates buckets added to the packet captures API.
   */
  validate(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/pcaps/ownership/validate`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class ea extends h {
}
qc.OwnershipsSinglePage = ea;
class Be extends a {
  constructor() {
    super(...arguments), this.ownership = new qc(this._client), this.download = new U_(this._client);
  }
  /**
   * Create new PCAP request for account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/pcaps`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all packet capture requests for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/pcaps`, ta, t);
  }
  /**
   * Get information for a PCAP request by id.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/pcaps/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class ta extends h {
}
Be.PCAPListResponsesSinglePage = ta;
Be.OwnershipResource = qc;
Be.OwnershipsSinglePage = ea;
Be.Download = U_;
class sa extends a {
  /**
   * Creates a new Site ACL.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/magic/sites/${e}/acls`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a specific Site ACL.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/magic/sites/${e}/acls/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists Site ACLs associated with an account.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${e}/acls`, na, s);
  }
  /**
   * Remove a specific Site ACL.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/magic/sites/${e}/acls/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site ACL.
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/magic/sites/${e}/acls/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Get a specific Site ACL.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/magic/sites/${e}/acls/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class na extends h {
}
sa.ACLsSinglePage = na;
class ia extends a {
  /**
   * Creates a new Site LAN. If the site is in high availability mode,
   * static_addressing is required along with secondary and virtual address.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${e}/lans`, Ht, {
      body: i,
      method: "post",
      ...s
    });
  }
  /**
   * Update a specific Site LAN.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/magic/sites/${e}/lans/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists Site LANs associated with an account.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${e}/lans`, Ht, s);
  }
  /**
   * Remove a specific Site LAN.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/magic/sites/${e}/lans/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site LAN.
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/magic/sites/${e}/lans/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Get a specific Site LAN.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/magic/sites/${e}/lans/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Ht extends h {
}
ia.LANsSinglePage = Ht;
class ra extends a {
  /**
   * Creates a new Site WAN.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${e}/wans`, Xt, {
      body: i,
      method: "post",
      ...s
    });
  }
  /**
   * Update a specific Site WAN.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/magic/sites/${e}/wans/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists Site WANs associated with an account.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${e}/wans`, Xt, s);
  }
  /**
   * Remove a specific Site WAN.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/magic/sites/${e}/wans/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site WAN.
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/magic/sites/${e}/wans/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Get a specific Site WAN.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/magic/sites/${e}/wans/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Xt extends h {
}
ra.WANsSinglePage = Xt;
class ce extends a {
  constructor() {
    super(...arguments), this.acls = new sa(this._client), this.lans = new ia(this._client), this.wans = new ra(this._client);
  }
  /**
   * Creates a new Site
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/magic/sites`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a specific Site.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/magic/sites/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Sites associated with an account. Use connectorid query param to return
   * sites where connectorid matches either site.ConnectorID or
   * site.SecondaryConnectorID.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/magic/sites`, ca, {
      query: n,
      ...t
    });
  }
  /**
   * Remove a specific Site.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/magic/sites/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patch a specific Site.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/magic/sites/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a specific Site.
   */
  get(e, t, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = t;
    return this._client.get(`/accounts/${n}/magic/sites/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "x-magic-new-hc-target": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class ca extends h {
}
ce.SitesSinglePage = ca;
ce.ACLs = sa;
ce.ACLsSinglePage = na;
ce.LANs = ia;
ce.LANsSinglePage = Ht;
ce.WANs = ra;
ce.WANsSinglePage = Xt;
class O extends a {
  constructor() {
    super(...arguments), this.apps = new Hc(this._client), this.cfInterconnects = new m_(this._client), this.greTunnels = new y_(this._client), this.ipsecTunnels = new f_(this._client), this.routes = new P_(this._client), this.sites = new ce(this._client), this.connectors = new Qc(this._client), this.pcaps = new Be(this._client);
  }
}
O.Apps = Hc;
O.AppListResponsesSinglePage = Xc;
O.CfInterconnects = m_;
O.GRETunnels = y_;
O.IPSECTunnels = f_;
O.Routes = P_;
O.Sites = ce;
O.SitesSinglePage = ca;
O.Connectors = Qc;
O.ConnectorListResponsesSinglePage = Jc;
O.PCAPs = Be;
O.PCAPListResponsesSinglePage = ta;
class b_ extends a {
  /**
   * Fetches a list of all Managed Transforms.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/managed_headers`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Disables all Managed Transforms.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/managed_headers`, {
      ...t,
      headers: { Accept: "*/*", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Updates the status of one or more Managed Transforms.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/managed_headers`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
}
class x_ extends a {
  /**
   * Accept or reject this account invitation.
   */
  update(e, t, s) {
    return this._client.put(`/memberships/${e}`, { body: t, ...s })._thenUnwrap((n) => n.result);
  }
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/memberships", M$, { query: e, ...t });
  }
  /**
   * Remove the associated member from an account.
   */
  delete(e, t) {
    return this._client.delete(`/memberships/${e}`, t)._thenUnwrap((s) => s.result);
  }
  /**
   * Get a specific membership.
   */
  get(e, t) {
    return this._client.get(`/memberships/${e}`, t)._thenUnwrap((s) => s.result);
  }
}
class M$ extends p {
}
class z_ extends a {
  /**
   * Create a new CNI object
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/cni/cnis`, { body: n, ...t });
  }
  /**
   * Modify stored information about a CNI object
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/cni/cnis/${e}`, { body: i, ...s });
  }
  /**
   * List existing CNI objects
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/cni/cnis`, { query: n, ...t });
  }
  /**
   * Delete a specified CNI object
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/cni/cnis/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Get information about a CNI object
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cni/cnis/${e}`, s);
  }
}
class S_ extends a {
  /**
   * Create a new interconnect
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/cni/interconnects`, { body: n, ...t });
  }
  /**
   * List existing interconnects
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/cni/interconnects`, { query: n, ...t });
  }
  /**
   * Delete an interconnect object
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/cni/interconnects/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Get information about an interconnect object
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cni/interconnects/${e}`, s);
  }
  /**
   * Generate the Letter of Authorization (LOA) for a given interconnect
   */
  loa(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cni/interconnects/${e}/loa`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Get the current status of an interconnect object
   */
  status(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cni/interconnects/${e}/status`, s);
  }
}
let A_ = class extends a {
  /**
   * Update the current settings for the active account
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/cni/settings`, { body: n, ...t });
  }
  /**
   * Get the current settings for the active account
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/cni/settings`, t);
  }
};
class R_ extends a {
  /**
   * Retrieve a list of all slots matching the specified parameters
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/cni/slots`, { query: n, ...t });
  }
  /**
   * Get information about the specified slot
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cni/slots/${e}`, s);
  }
}
class Ne extends a {
  constructor() {
    super(...arguments), this.cnis = new z_(this._client), this.interconnects = new S_(this._client), this.settings = new A_(this._client), this.slots = new R_(this._client);
  }
}
Ne.CNIs = z_;
Ne.Interconnects = S_;
Ne.Settings = A_;
Ne.Slots = R_;
class L_ extends a {
  /**
   * Create an Origin CA certificate. You can use an Origin CA Key as your User
   * Service Key or an API token when calling this endpoint ([see above](#requests)).
   */
  create(e, t) {
    return this._client.post("/certificates", { body: e, ...t })._thenUnwrap((s) => s.result);
  }
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/certificates", K$, { query: e, ...t });
  }
  /**
   * Revoke an existing Origin CA certificate by its serial number. You can use an
   * Origin CA Key as your User Service Key or an API token when calling this
   * endpoint ([see above](#requests)).
   */
  delete(e, t) {
    return this._client.delete(`/certificates/${e}`, t)._thenUnwrap((s) => s.result);
  }
  /**
   * Get an existing Origin CA certificate by its serial number. You can use an
   * Origin CA Key as your User Service Key or an API token when calling this
   * endpoint ([see above](#requests)).
   */
  get(e, t) {
    return this._client.get(`/certificates/${e}`, t)._thenUnwrap((s) => s.result);
  }
}
class K$ extends h {
}
class v_ extends a {
  /**
   * Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when
   * connecting to your origin. Preferred instructs Cloudflare to opportunistically
   * send a Post-Quantum keyshare in the first message to the origin (for fastest
   * connections when the origin supports and prefers PQ), supported means that PQ
   * algorithms are advertised but only used when requested by the origin, and off
   * means that PQ algorithms are not advertised
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/cache/origin_post_quantum_encryption`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when
   * connecting to your origin. Preferred instructs Cloudflare to opportunistically
   * send a Post-Quantum keyshare in the first message to the origin (for fastest
   * connections when the origin supports and prefers PQ), supported means that PQ
   * algorithms are advertised but only used when requested by the origin, and off
   * means that PQ algorithms are not advertised
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/cache/origin_post_quantum_encryption`, t)._thenUnwrap((n) => n.result);
  }
}
let I_ = class extends a {
  /**
   * Enable or disable zone-level authenticated origin pulls. 'enabled' should be set
   * true either before/after the certificate is uploaded to see the certificate in
   * use.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/origin_tls_client_auth/settings`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get whether zone-level authenticated origin pulls is enabled or not. It is false
   * by default.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/origin_tls_client_auth/settings`, t)._thenUnwrap((n) => n.result);
  }
}, aa = class extends a {
  /**
   * Upload a certificate to be used for client authentication on a hostname. 10
   * hostname certificates per zone are allowed.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/origin_tls_client_auth/hostnames/certificates`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Certificates
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/origin_tls_client_auth/hostnames/certificates`, oa, t);
  }
  /**
   * Delete Hostname Client Certificate
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/origin_tls_client_auth/hostnames/certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get the certificate by ID to be used for client authentication on a hostname.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/origin_tls_client_auth/hostnames/certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
}, oa = class extends h {
};
aa.CertificateListResponsesSinglePage = oa;
let Pt = class extends a {
  constructor() {
    super(...arguments), this.certificates = new aa(this._client);
  }
  /**
   * Associate a hostname to a certificate and enable, disable or invalidate the
   * association. If disabled, client certificate will not be sent to the hostname
   * even if activated at the zone level. 100 maximum associations on a single
   * certificate are allowed. Note: Use a null value for parameter _enabled_ to
   * invalidate the association.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/origin_tls_client_auth/hostnames`, ua, { body: n, method: "put", ...t });
  }
  /**
   * Get the Hostname Status for Client Authentication
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/origin_tls_client_auth/hostnames/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class ua extends h {
}
Pt.HostnameUpdateResponsesSinglePage = ua;
Pt.Certificates = aa;
Pt.CertificateListResponsesSinglePage = oa;
class Ut extends a {
  constructor() {
    super(...arguments), this.hostnames = new Pt(this._client), this.settings = new I_(this._client);
  }
  /**
   * Upload your own certificate you want Cloudflare to use for edge-to-origin
   * communication to override the shared certificate. Please note that it is
   * important to keep only one certificate active. Also, make sure to enable
   * zone-level authenticated origin pulls by making a PUT call to settings endpoint
   * to see the uploaded certificate in use.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/origin_tls_client_auth`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List Certificates
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/origin_tls_client_auth`, W$, t);
  }
  /**
   * Delete Certificate
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/origin_tls_client_auth/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Certificate Details
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/origin_tls_client_auth/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class W$ extends h {
}
Ut.Hostnames = Pt;
Ut.HostnameUpdateResponsesSinglePage = ua;
Ut.Settings = I_;
class k_ extends a {
  /**
   * Creates a new Page Rule.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/pagerules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Replaces the configuration of an existing Page Rule. The configuration of the
   * updated Page Rule will exactly match the data passed in the API request.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/pagerules/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Page Rules in a zone.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/pagerules`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes an existing Page Rule.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/pagerules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates one or more fields of an existing Page Rule.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/pagerules/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the details of a Page Rule.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/pagerules/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
let la = class extends a {
  /**
   * Lists all connections detected by Page Shield.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/page_shield/connections`, da, {
      query: n,
      ...t
    });
  }
  /**
   * Fetches a connection detected by Page Shield by connection ID.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/page_shield/connections/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class da extends h {
}
la.ConnectionsSinglePage = da;
class ha extends a {
  /**
   * Lists all cookies collected by Page Shield.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/page_shield/cookies`, _a, {
      query: n,
      ...t
    });
  }
  /**
   * Fetches a cookie collected by Page Shield by cookie ID.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/page_shield/cookies/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class _a extends h {
}
ha.CookieListResponsesSinglePage = _a;
let ga = class extends a {
  /**
   * Create a Page Shield policy.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/page_shield/policies`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Page Shield policy by ID.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/page_shield/policies/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all Page Shield policies.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/page_shield/policies`, pa, t);
  }
  /**
   * Delete a Page Shield policy by ID.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/page_shield/policies/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Fetches a Page Shield policy by ID.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/page_shield/policies/${e}`, s)._thenUnwrap((i) => i.result);
  }
}, pa = class extends h {
};
ga.PolicyListResponsesSinglePage = pa;
let wa = class extends a {
  /**
   * Lists all scripts detected by Page Shield.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/page_shield/scripts`, $a, {
      query: n,
      ...t
    });
  }
  /**
   * Fetches a script detected by Page Shield by script ID.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/page_shield/scripts/${e}`, s)._thenUnwrap((i) => i.result);
  }
}, $a = class extends h {
};
wa.ScriptsSinglePage = $a;
class q extends a {
  constructor() {
    super(...arguments), this.policies = new ga(this._client), this.connections = new la(this._client), this.scripts = new wa(this._client), this.cookies = new ha(this._client);
  }
  /**
   * Updates Page Shield settings.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/page_shield`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the Page Shield settings.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/page_shield`, t)._thenUnwrap((n) => n.result);
  }
}
q.Policies = ga;
q.PolicyListResponsesSinglePage = pa;
q.Connections = la;
q.ConnectionsSinglePage = da;
q.Scripts = wa;
q.ScriptsSinglePage = $a;
q.Cookies = ha;
q.CookieListResponsesSinglePage = _a;
let ma = class extends a {
  /**
   * Add a new domain for the Pages project.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/pages/projects/${e}/domains`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a list of all domains associated with a Pages project.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/pages/projects/${e}/domains`, ya, s);
  }
  /**
   * Delete a Pages project's domain.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/pages/projects/${e}/domains/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Retry the validation status of a single domain.
   */
  edit(e, t, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.patch(`/accounts/${i}/pages/projects/${e}/domains/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Fetch a single domain.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/pages/projects/${e}/domains/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class ya extends h {
}
ma.DomainListResponsesSinglePage = ya;
let O_ = class extends a {
  /**
   * Fetch deployment logs for a project.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/pages/projects/${e}/deployments/${t}/history/logs`, n)._thenUnwrap((c) => c.result);
  }
}, fa = class extends a {
  constructor() {
    super(...arguments), this.logs = new O_(this._client);
  }
};
fa.Logs = O_;
let Pa = class extends a {
  constructor() {
    super(...arguments), this.history = new fa(this._client);
  }
  /**
   * Start a new deployment from production. The repository and account must have
   * already been authorized on the Cloudflare Pages dashboard.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/pages/projects/${e}/deployments`, R({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a list of project deployments.
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/pages/projects/${e}/deployments`, vs, { query: i, ...s });
  }
  /**
   * Delete a deployment.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/pages/projects/${e}/deployments/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch information about a deployment.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/pages/projects/${e}/deployments/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Retry a previous deployment.
   */
  retry(e, t, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.post(`/accounts/${i}/pages/projects/${e}/deployments/${t}/retry`, { body: c, ...n })._thenUnwrap((o) => o.result);
  }
  /**
   * Rollback the production deployment to a previous deployment. You can only
   * rollback to succesful builds on production.
   */
  rollback(e, t, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.post(`/accounts/${i}/pages/projects/${e}/deployments/${t}/rollback`, { body: c, ...n })._thenUnwrap((o) => o.result);
  }
};
Pa.History = fa;
class Me extends a {
  constructor() {
    super(...arguments), this.deployments = new Pa(this._client), this.domains = new ma(this._client);
  }
  /**
   * Create a new project.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/pages/projects`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a list of all user projects.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/pages/projects`, vs, t);
  }
  /**
   * Delete a project by name.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/pages/projects/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Set new attributes for an existing project. Modify environment variables. To
   * delete an environment variable, set the key to null.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/pages/projects/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a project by name.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/pages/projects/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Purge all cached build artifacts for a Pages project
   */
  purgeBuildCache(e, t, s) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/pages/projects/${e}/purge_build_cache`, s)._thenUnwrap((i) => i.result);
  }
}
class vs extends h {
}
Me.DeploymentsSinglePage = vs;
Me.Deployments = Pa;
Me.Domains = ma;
Me.DomainListResponsesSinglePage = ya;
let Is = class extends a {
  constructor() {
    super(...arguments), this.projects = new Me(this._client);
  }
};
Is.Projects = Me;
Is.DeploymentsSinglePage = vs;
class Ua extends a {
  /**
   * Creates a new consumer for a Queue
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/queues/${e}/consumers`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates the consumer for a queue, or creates one if it does not exist.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/queues/${e}/consumers/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Deletes the consumer for a queue.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/queues/${e}/consumers/${t}`, n);
  }
  /**
   * Returns the consumers for a Queue
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/queues/${e}/consumers`, ba, s);
  }
}
class ba extends h {
}
Ua.ConsumersSinglePage = ba;
class xa extends a {
  /**
   * Acknowledge + Retry messages from a Queue
   */
  ack(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/queues/${e}/messages/ack`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Pull a batch of messages from a Queue
   */
  pull(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/queues/${e}/messages/pull`, za, { body: i, method: "post", ...s });
  }
}
class za extends h {
}
xa.MessagePullResponsesSinglePage = za;
class Ke extends a {
  constructor() {
    super(...arguments), this.consumers = new Ua(this._client), this.messages = new xa(this._client);
  }
  /**
   * Create a new queue
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/queues`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a Queue. Note that this endpoint does not support partial updates. If
   * successful, the Queue's configuration is overwritten with the supplied
   * configuration.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/queues/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the queues owned by an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/queues`, j$, t);
  }
  /**
   * Deletes a queue
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/queues/${e}`, s);
  }
  /**
   * Get details about a specific queue.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/queues/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class j$ extends h {
}
Ke.Consumers = Ua;
Ke.ConsumersSinglePage = ba;
Ke.Messages = xa;
Ke.MessagePullResponsesSinglePage = za;
class Z_ extends a {
  /**
   * Creates temporary access credentials on a bucket that can be optionally scoped
   * to prefixes or objects.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/r2/temp-access-credentials`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class C_ extends a {
  /**
   * Set the CORS policy for a bucket
   */
  update(e, t, s) {
    const { account_id: n, jurisdiction: i, ...c } = t;
    return this._client.put(`/accounts/${n}/r2/buckets/${e}/cors`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Delete the CORS policy for a bucket
   */
  delete(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.delete(`/accounts/${n}/r2/buckets/${e}/cors`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get the CORS policy for a bucket
   */
  get(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/r2/buckets/${e}/cors`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class V_ extends a {
  /**
   * Create event notification rule.
   */
  update(e, t, s, n) {
    const { account_id: i, jurisdiction: c, ...o } = s;
    return this._client.put(`/accounts/${i}/event_notifications/r2/${e}/configuration/queues/${t}`, {
      body: o,
      ...n,
      headers: {
        ...(c == null ? void 0 : c.toString()) != null ? { "cf-r2-jurisdiction": c == null ? void 0 : c.toString() } : void 0,
        ...n == null ? void 0 : n.headers
      }
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Delete an event notification rule. **If no body is provided, all rules for
   * specified queue will be deleted**.
   */
  delete(e, t, s, n) {
    const { account_id: i, jurisdiction: c } = s;
    return this._client.delete(`/accounts/${i}/event_notifications/r2/${e}/configuration/queues/${t}`, {
      ...n,
      headers: {
        ...(c == null ? void 0 : c.toString()) != null ? { "cf-r2-jurisdiction": c == null ? void 0 : c.toString() } : void 0,
        ...n == null ? void 0 : n.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * List all event notification rules for a bucket.
   */
  get(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/event_notifications/r2/${e}/configuration`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class T_ extends a {
  /**
   * Set the object lifecycle rules for a bucket
   */
  update(e, t, s) {
    const { account_id: n, jurisdiction: i, ...c } = t;
    return this._client.put(`/accounts/${n}/r2/buckets/${e}/lifecycle`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Get object lifecycle rules for a bucket
   */
  get(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/r2/buckets/${e}/lifecycle`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class D_ extends a {
  /**
   * Set lock rules for a bucket
   */
  update(e, t, s) {
    const { account_id: n, jurisdiction: i, ...c } = t;
    return this._client.put(`/accounts/${n}/r2/buckets/${e}/lock`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Get lock rules for a bucket
   */
  get(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/r2/buckets/${e}/lock`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class E_ extends a {
  /**
   * Get Storage/Object Count Metrics across all buckets in your account. Note that
   * Account-Level Metrics may not immediately reflect the latest data.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/r2/metrics`, t)._thenUnwrap((n) => n.result);
  }
}
class Y_ extends a {
  /**
   * Sets configuration for Sippy for an existing R2 bucket.
   */
  update(e, t, s) {
    const { account_id: n, jurisdiction: i, ...c } = t;
    return this._client.put(`/accounts/${n}/r2/buckets/${e}/sippy`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Disables Sippy on this bucket
   */
  delete(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.delete(`/accounts/${n}/r2/buckets/${e}/sippy`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets configuration for Sippy for an existing R2 bucket.
   */
  get(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/r2/buckets/${e}/sippy`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
let F_ = class extends a {
  /**
   * Register a new custom domain for an existing R2 bucket.
   */
  create(e, t, s) {
    const { account_id: n, jurisdiction: i, ...c } = t;
    return this._client.post(`/accounts/${n}/r2/buckets/${e}/domains/custom`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Edit the configuration for a custom domain on an existing R2 bucket.
   */
  update(e, t, s, n) {
    const { account_id: i, jurisdiction: c, ...o } = s;
    return this._client.put(`/accounts/${i}/r2/buckets/${e}/domains/custom/${t}`, {
      body: o,
      ...n,
      headers: {
        ...(c == null ? void 0 : c.toString()) != null ? { "cf-r2-jurisdiction": c == null ? void 0 : c.toString() } : void 0,
        ...n == null ? void 0 : n.headers
      }
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Gets a list of all custom domains registered with an existing R2 bucket.
   */
  list(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/r2/buckets/${e}/domains/custom`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Remove custom domain registration from an existing R2 bucket
   */
  delete(e, t, s, n) {
    const { account_id: i, jurisdiction: c } = s;
    return this._client.delete(`/accounts/${i}/r2/buckets/${e}/domains/custom/${t}`, {
      ...n,
      headers: {
        ...(c == null ? void 0 : c.toString()) != null ? { "cf-r2-jurisdiction": c == null ? void 0 : c.toString() } : void 0,
        ...n == null ? void 0 : n.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Get the configuration for a custom domain on an existing R2 bucket.
   */
  get(e, t, s, n) {
    const { account_id: i, jurisdiction: c } = s;
    return this._client.get(`/accounts/${i}/r2/buckets/${e}/domains/custom/${t}`, {
      ...n,
      headers: {
        ...(c == null ? void 0 : c.toString()) != null ? { "cf-r2-jurisdiction": c == null ? void 0 : c.toString() } : void 0,
        ...n == null ? void 0 : n.headers
      }
    })._thenUnwrap((o) => o.result);
  }
};
class G_ extends a {
  /**
   * Updates state of public access over the bucket's R2-managed (r2.dev) domain.
   */
  update(e, t, s) {
    const { account_id: n, jurisdiction: i, ...c } = t;
    return this._client.put(`/accounts/${n}/r2/buckets/${e}/domains/managed`, {
      body: c,
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Gets state of public access over the bucket's R2-managed (r2.dev) domain.
   */
  list(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/r2/buckets/${e}/domains/managed`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
let ks = class extends a {
  constructor() {
    super(...arguments), this.custom = new F_(this._client), this.managed = new G_(this._client);
  }
};
ks.Custom = F_;
ks.Managed = G_;
class ae extends a {
  constructor() {
    super(...arguments), this.lifecycle = new T_(this._client), this.cors = new C_(this._client), this.domains = new ks(this._client), this.eventNotifications = new V_(this._client), this.locks = new D_(this._client), this.metrics = new E_(this._client), this.sippy = new Y_(this._client);
  }
  /**
   * Creates a new R2 bucket.
   */
  create(e, t) {
    const { account_id: s, jurisdiction: n, ...i } = e;
    return this._client.post(`/accounts/${s}/r2/buckets`, {
      body: i,
      ...t,
      headers: {
        ...(n == null ? void 0 : n.toString()) != null ? { "cf-r2-jurisdiction": n == null ? void 0 : n.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all R2 buckets on your account
   */
  list(e, t) {
    const { account_id: s, jurisdiction: n, ...i } = e;
    return this._client.get(`/accounts/${s}/r2/buckets`, {
      query: i,
      ...t,
      headers: {
        ...(n == null ? void 0 : n.toString()) != null ? { "cf-r2-jurisdiction": n == null ? void 0 : n.toString() } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes an existing R2 bucket.
   */
  delete(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.delete(`/accounts/${n}/r2/buckets/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets metadata for an existing R2 bucket.
   */
  get(e, t, s) {
    const { account_id: n, jurisdiction: i } = t;
    return this._client.get(`/accounts/${n}/r2/buckets/${e}`, {
      ...s,
      headers: {
        ...(i == null ? void 0 : i.toString()) != null ? { "cf-r2-jurisdiction": i == null ? void 0 : i.toString() } : void 0,
        ...s == null ? void 0 : s.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
ae.Lifecycle = T_;
ae.CORS = C_;
ae.Domains = ks;
ae.EventNotifications = V_;
ae.Locks = D_;
ae.Metrics = E_;
ae.SippyResource = Y_;
class Os extends a {
  constructor() {
    super(...arguments), this.buckets = new ae(this._client), this.temporaryCredentials = new Z_(this._client);
  }
}
Os.Buckets = ae;
Os.TemporaryCredentials = Z_;
let B_ = class extends a {
  /**
   * Creates a new rule in a Web Analytics ruleset.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/rum/v2/${e}/rule`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a rule in a Web Analytics ruleset.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/rum/v2/${e}/rule/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists all the rules in a Web Analytics ruleset.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/rum/v2/${e}/rules`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes an existing rule from a Web Analytics ruleset.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/rum/v2/${e}/rule/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Modifies one or more rules in a Web Analytics ruleset with a single request.
   */
  bulkCreate(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/rum/v2/${e}/rules`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class Sa extends a {
  /**
   * Creates a new Web Analytics site.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/rum/site_info`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Web Analytics site.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/rum/site_info/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all Web Analytics sites of an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/rum/site_info/list`, Aa, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes an existing Web Analytics site.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/rum/site_info/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves a Web Analytics site.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/rum/site_info/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Aa extends p {
}
Sa.SitesV4PagePaginationArray = Aa;
class bt extends a {
  constructor() {
    super(...arguments), this.siteInfo = new Sa(this._client), this.rules = new B_(this._client);
  }
}
bt.SiteInfo = Sa;
bt.SitesV4PagePaginationArray = Aa;
bt.Rules = B_;
let N_ = class extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.get("/radar/datasets", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  /**
   * Get a URL to download a single dataset.
   */
  download(e, t) {
    const { format: s, ...n } = e;
    return this._client.post("/radar/datasets/download", {
      query: { format: s },
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get the CSV content of a given dataset by alias or ID. When getting the content
   * by alias the latest dataset is returned, optionally filtered by the latest
   * available at a given date.
   */
  get(e, t) {
    return this._client.get(`/radar/datasets/${e}`, {
      ...t,
      headers: { Accept: "text/csv", ...t == null ? void 0 : t.headers }
    });
  }
};
class M_ extends a {
  /**
   * Lets you search for locations, autonomous systems (ASes), and reports.
   */
  global(e, t) {
    return this._client.get("/radar/search/global", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
class K_ extends a {
  summary(e = {}, t) {
    return u(e) ? this.summary({}, e) : this._client.get("/radar/tcp_resets_timeouts/summary", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  timeseriesGroups(e = {}, t) {
    return u(e) ? this.timeseriesGroups({}, e) : this._client.get("/radar/tcp_resets_timeouts/timeseries_groups", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}
let W_ = class extends a {
  userAgent(e = {}, t) {
    return u(e) ? this.userAgent({}, e) : this._client.get("/radar/ai/bots/timeseries_groups/user_agent", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, j_ = class extends a {
  userAgent(e = {}, t) {
    return u(e) ? this.userAgent({}, e) : this._client.get("/radar/ai/bots/summary/user_agent", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
class Ra extends a {
  constructor() {
    super(...arguments), this.summary = new j_(this._client);
  }
}
Ra.Summary = j_;
let H_ = class extends a {
  model(e = {}, t) {
    return u(e) ? this.model({}, e) : this._client.get("/radar/ai/inference/summary/model", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  task(e = {}, t) {
    return u(e) ? this.task({}, e) : this._client.get("/radar/ai/inference/summary/task", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, X_ = class extends a {
  model(e = {}, t) {
    return u(e) ? this.model({}, e) : this._client.get("/radar/ai/inference/timeseries_groups/model", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  task(e = {}, t) {
    return u(e) ? this.task({}, e) : this._client.get("/radar/ai/inference/timeseries_groups/task", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, La = class extends a {
  constructor() {
    super(...arguments), this.summary = new X_(this._client);
  }
};
La.Summary = X_;
class Zs extends a {
  constructor() {
    super(...arguments), this.summary = new H_(this._client), this.timeseriesGroups = new La(this._client);
  }
}
Zs.Summary = H_;
Zs.TimeseriesGroups = La;
class xt extends a {
  constructor() {
    super(...arguments), this.inference = new Zs(this._client), this.bots = new Ra(this._client), this.timeseriesGroups = new W_(this._client);
  }
}
xt.Inference = Zs;
xt.Bots = Ra;
xt.TimeseriesGroups = W_;
class Q_ extends a {
  get(e = {}, t) {
    return u(e) ? this.get({}, e) : this._client.get("/radar/annotations/outages", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  locations(e = {}, t) {
    return u(e) ? this.locations({}, e) : this._client.get("/radar/annotations/outages/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
class va extends a {
  constructor() {
    super(...arguments), this.outages = new Q_(this._client);
  }
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.get("/radar/annotations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
va.Outages = Q_;
let J_ = class extends a {
  dnssec(e = {}, t) {
    return u(e) ? this.dnssec({}, e) : this._client.get("/radar/as112/summary/dnssec", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  edns(e = {}, t) {
    return u(e) ? this.edns({}, e) : this._client.get("/radar/as112/summary/edns", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/as112/summary/ip_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  protocol(e = {}, t) {
    return u(e) ? this.protocol({}, e) : this._client.get("/radar/as112/summary/protocol", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  queryType(e = {}, t) {
    return u(e) ? this.queryType({}, e) : this._client.get("/radar/as112/summary/query_type", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  responseCodes(e = {}, t) {
    return u(e) ? this.responseCodes({}, e) : this._client.get("/radar/as112/summary/response_codes", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, q_ = class extends a {
  dnssec(e = {}, t) {
    return u(e) ? this.dnssec({}, e) : this._client.get("/radar/as112/timeseries_groups/dnssec", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  edns(e = {}, t) {
    return u(e) ? this.edns({}, e) : this._client.get("/radar/as112/timeseries_groups/edns", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/as112/timeseries_groups/ip_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  protocol(e = {}, t) {
    return u(e) ? this.protocol({}, e) : this._client.get("/radar/as112/timeseries_groups/protocol", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  queryType(e = {}, t) {
    return u(e) ? this.queryType({}, e) : this._client.get("/radar/as112/timeseries_groups/query_type", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  responseCodes(e = {}, t) {
    return u(e) ? this.responseCodes({}, e) : this._client.get("/radar/as112/timeseries_groups/response_codes", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, eg = class extends a {
  dnssec(e, t = {}, s) {
    return u(t) ? this.dnssec(e, {}, t) : this._client.get(`/radar/as112/top/locations/dnssec/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
  edns(e, t = {}, s) {
    return u(t) ? this.edns(e, {}, t) : this._client.get(`/radar/as112/top/locations/edns/${e}`, { query: t, ...s })._thenUnwrap((n) => n.result);
  }
  ipVersion(e, t = {}, s) {
    return u(t) ? this.ipVersion(e, {}, t) : this._client.get(`/radar/as112/top/locations/ip_version/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
  locations(e = {}, t) {
    return u(e) ? this.locations({}, e) : this._client.get("/radar/as112/top/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
class zt extends a {
  constructor() {
    super(...arguments), this.summary = new J_(this._client), this.timeseriesGroups = new q_(this._client), this.top = new eg(this._client);
  }
  timeseries(e = {}, t) {
    return u(e) ? this.timeseries({}, e) : this._client.get("/radar/as112/timeseries", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
zt.Summary = J_;
zt.TimeseriesGroups = q_;
zt.Top = eg;
let tg = class extends a {
  bitrate(e = {}, t) {
    return u(e) ? this.bitrate({}, e) : this._client.get("/radar/attacks/layer3/summary/bitrate", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  duration(e = {}, t) {
    return u(e) ? this.duration({}, e) : this._client.get("/radar/attacks/layer3/summary/duration", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/attacks/layer3/summary/ip_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  protocol(e = {}, t) {
    return u(e) ? this.protocol({}, e) : this._client.get("/radar/attacks/layer3/summary/protocol", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  vector(e = {}, t) {
    return u(e) ? this.vector({}, e) : this._client.get("/radar/attacks/layer3/summary/vector", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, sg = class extends a {
  bitrate(e = {}, t) {
    return u(e) ? this.bitrate({}, e) : this._client.get("/radar/attacks/layer3/timeseries_groups/bitrate", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  duration(e = {}, t) {
    return u(e) ? this.duration({}, e) : this._client.get("/radar/attacks/layer3/timeseries_groups/duration", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  industry(e = {}, t) {
    return u(e) ? this.industry({}, e) : this._client.get("/radar/attacks/layer3/timeseries_groups/industry", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/attacks/layer3/timeseries_groups/ip_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  protocol(e = {}, t) {
    return u(e) ? this.protocol({}, e) : this._client.get("/radar/attacks/layer3/timeseries_groups/protocol", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  vector(e = {}, t) {
    return u(e) ? this.vector({}, e) : this._client.get("/radar/attacks/layer3/timeseries_groups/vector", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  vertical(e = {}, t) {
    return u(e) ? this.vertical({}, e) : this._client.get("/radar/attacks/layer3/timeseries_groups/vertical", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, ng = class extends a {
  origin(e = {}, t) {
    return u(e) ? this.origin({}, e) : this._client.get("/radar/attacks/layer3/top/locations/origin", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  target(e = {}, t) {
    return u(e) ? this.target({}, e) : this._client.get("/radar/attacks/layer3/top/locations/target", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, Ia = class extends a {
  constructor() {
    super(...arguments), this.locations = new ng(this._client);
  }
  attacks(e = {}, t) {
    return u(e) ? this.attacks({}, e) : this._client.get("/radar/attacks/layer3/top/attacks", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  industry(e = {}, t) {
    return u(e) ? this.industry({}, e) : this._client.get("/radar/attacks/layer3/top/industry", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  vertical(e = {}, t) {
    return u(e) ? this.vertical({}, e) : this._client.get("/radar/attacks/layer3/top/vertical", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
Ia.Locations = ng;
class St extends a {
  constructor() {
    super(...arguments), this.summary = new tg(this._client), this.timeseriesGroups = new sg(this._client), this.top = new Ia(this._client);
  }
  timeseries(e = {}, t) {
    return u(e) ? this.timeseries({}, e) : this._client.get("/radar/attacks/layer3/timeseries", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
St.Summary = tg;
St.TimeseriesGroups = sg;
St.Top = Ia;
let ig = class extends a {
  httpMethod(e = {}, t) {
    return u(e) ? this.httpMethod({}, e) : this._client.get("/radar/attacks/layer7/summary/http_method", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  httpVersion(e = {}, t) {
    return u(e) ? this.httpVersion({}, e) : this._client.get("/radar/attacks/layer7/summary/http_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/attacks/layer7/summary/ip_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  managedRules(e = {}, t) {
    return u(e) ? this.managedRules({}, e) : this._client.get("/radar/attacks/layer7/summary/managed_rules", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  mitigationProduct(e = {}, t) {
    return u(e) ? this.mitigationProduct({}, e) : this._client.get("/radar/attacks/layer7/summary/mitigation_product", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, rg = class extends a {
  httpMethod(e = {}, t) {
    return u(e) ? this.httpMethod({}, e) : this._client.get("/radar/attacks/layer7/timeseries_groups/http_method", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  httpVersion(e = {}, t) {
    return u(e) ? this.httpVersion({}, e) : this._client.get("/radar/attacks/layer7/timeseries_groups/http_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  industry(e = {}, t) {
    return u(e) ? this.industry({}, e) : this._client.get("/radar/attacks/layer7/timeseries_groups/industry", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/attacks/layer7/timeseries_groups/ip_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  managedRules(e = {}, t) {
    return u(e) ? this.managedRules({}, e) : this._client.get("/radar/attacks/layer7/timeseries_groups/managed_rules", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  mitigationProduct(e = {}, t) {
    return u(e) ? this.mitigationProduct({}, e) : this._client.get("/radar/attacks/layer7/timeseries_groups/mitigation_product", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  vertical(e = {}, t) {
    return u(e) ? this.vertical({}, e) : this._client.get("/radar/attacks/layer7/timeseries_groups/vertical", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, cg = class extends a {
  origin(e = {}, t) {
    return u(e) ? this.origin({}, e) : this._client.get("/radar/attacks/layer7/top/ases/origin", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, ag = class extends a {
  origin(e = {}, t) {
    return u(e) ? this.origin({}, e) : this._client.get("/radar/attacks/layer7/top/locations/origin", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  target(e = {}, t) {
    return u(e) ? this.target({}, e) : this._client.get("/radar/attacks/layer7/top/locations/target", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, Cs = class extends a {
  constructor() {
    super(...arguments), this.locations = new ag(this._client), this.ases = new cg(this._client);
  }
  attacks(e = {}, t) {
    return u(e) ? this.attacks({}, e) : this._client.get("/radar/attacks/layer7/top/attacks", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  industry(e = {}, t) {
    return u(e) ? this.industry({}, e) : this._client.get("/radar/attacks/layer7/top/industry", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  vertical(e = {}, t) {
    return u(e) ? this.vertical({}, e) : this._client.get("/radar/attacks/layer7/top/vertical", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
Cs.Locations = ag;
Cs.Ases = cg;
class At extends a {
  constructor() {
    super(...arguments), this.summary = new ig(this._client), this.timeseriesGroups = new rg(this._client), this.top = new Cs(this._client);
  }
  timeseries(e = {}, t) {
    return u(e) ? this.timeseries({}, e) : this._client.get("/radar/attacks/layer7/timeseries", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
At.Summary = ig;
At.TimeseriesGroups = rg;
At.Top = Cs;
class Vs extends a {
  constructor() {
    super(...arguments), this.layer3 = new St(this._client), this.layer7 = new At(this._client);
  }
}
Vs.Layer3 = St;
Vs.Layer7 = At;
let og = class extends a {
  timeseries(e = {}, t) {
    return u(e) ? this.timeseries({}, e) : this._client.get("/radar/bgp/ips/timeseries", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, ug = class extends a {
  ases(e = {}, t) {
    return u(e) ? this.ases({}, e) : this._client.get("/radar/bgp/routes/ases", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  moas(e = {}, t) {
    return u(e) ? this.moas({}, e) : this._client.get("/radar/bgp/routes/moas", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  pfx2as(e = {}, t) {
    return u(e) ? this.pfx2as({}, e) : this._client.get("/radar/bgp/routes/pfx2as", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  stats(e = {}, t) {
    return u(e) ? this.stats({}, e) : this._client.get("/radar/bgp/routes/stats", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, ka = class extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/radar/bgp/hijacks/events", Oa, {
      query: e,
      ...t
    });
  }
}, Oa = class extends F {
};
ka.EventListResponsesV4PagePagination = Oa;
class Ts extends a {
  constructor() {
    super(...arguments), this.events = new ka(this._client);
  }
}
Ts.Events = ka;
Ts.EventListResponsesV4PagePagination = Oa;
let Za = class extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/radar/bgp/leaks/events", Ca, {
      query: e,
      ...t
    });
  }
};
class Ca extends F {
}
Za.EventListResponsesV4PagePagination = Ca;
class Ds extends a {
  constructor() {
    super(...arguments), this.events = new Za(this._client);
  }
}
Ds.Events = Za;
Ds.EventListResponsesV4PagePagination = Ca;
let lg = class extends a {
  get(e = {}, t) {
    return u(e) ? this.get({}, e) : this._client.get("/radar/bgp/top/ases", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  prefixes(e = {}, t) {
    return u(e) ? this.prefixes({}, e) : this._client.get("/radar/bgp/top/ases/prefixes", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, Va = class extends a {
  constructor() {
    super(...arguments), this.ases = new lg(this._client);
  }
  prefixes(e = {}, t) {
    return u(e) ? this.prefixes({}, e) : this._client.get("/radar/bgp/top/prefixes", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
Va.Ases = lg;
class ze extends a {
  constructor() {
    super(...arguments), this.leaks = new Ds(this._client), this.top = new Va(this._client), this.hijacks = new Ts(this._client), this.routes = new ug(this._client), this.ips = new og(this._client);
  }
  timeseries(e = {}, t) {
    return u(e) ? this.timeseries({}, e) : this._client.get("/radar/bgp/timeseries", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
ze.Leaks = Ds;
ze.Top = Va;
ze.Hijacks = Ts;
ze.Routes = ug;
ze.IPs = og;
let dg = class extends a {
  ases(e = {}, t) {
    return u(e) ? this.ases({}, e) : this._client.get("/radar/dns/top/ases", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  locations(e = {}, t) {
    return u(e) ? this.locations({}, e) : this._client.get("/radar/dns/top/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
class Ta extends a {
  constructor() {
    super(...arguments), this.top = new dg(this._client);
  }
}
Ta.Top = dg;
let hg = class extends a {
  arc(e = {}, t) {
    return u(e) ? this.arc({}, e) : this._client.get("/radar/email/routing/summary/arc", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  dkim(e = {}, t) {
    return u(e) ? this.dkim({}, e) : this._client.get("/radar/email/routing/summary/dkim", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  dmarc(e = {}, t) {
    return u(e) ? this.dmarc({}, e) : this._client.get("/radar/email/routing/summary/dmarc", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  encrypted(e = {}, t) {
    return u(e) ? this.encrypted({}, e) : this._client.get("/radar/email/routing/summary/encrypted", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/email/routing/summary/ip_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  spf(e = {}, t) {
    return u(e) ? this.spf({}, e) : this._client.get("/radar/email/routing/summary/spf", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, _g = class extends a {
  arc(e = {}, t) {
    return u(e) ? this.arc({}, e) : this._client.get("/radar/email/routing/timeseries_groups/arc", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  dkim(e = {}, t) {
    return u(e) ? this.dkim({}, e) : this._client.get("/radar/email/routing/timeseries_groups/dkim", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  dmarc(e = {}, t) {
    return u(e) ? this.dmarc({}, e) : this._client.get("/radar/email/routing/timeseries_groups/dmarc", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  encrypted(e = {}, t) {
    return u(e) ? this.encrypted({}, e) : this._client.get("/radar/email/routing/timeseries_groups/encrypted", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/email/routing/timeseries_groups/ip_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  spf(e = {}, t) {
    return u(e) ? this.spf({}, e) : this._client.get("/radar/email/routing/timeseries_groups/spf", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
};
class Es extends a {
  constructor() {
    super(...arguments), this.summary = new hg(this._client), this.timeseriesGroups = new _g(this._client);
  }
}
Es.Summary = hg;
Es.TimeseriesGroups = _g;
let gg = class extends a {
  arc(e = {}, t) {
    return u(e) ? this.arc({}, e) : this._client.get("/radar/email/security/summary/arc", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  dkim(e = {}, t) {
    return u(e) ? this.dkim({}, e) : this._client.get("/radar/email/security/summary/dkim", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  dmarc(e = {}, t) {
    return u(e) ? this.dmarc({}, e) : this._client.get("/radar/email/security/summary/dmarc", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  malicious(e = {}, t) {
    return u(e) ? this.malicious({}, e) : this._client.get("/radar/email/security/summary/malicious", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  spam(e = {}, t) {
    return u(e) ? this.spam({}, e) : this._client.get("/radar/email/security/summary/spam", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  spf(e = {}, t) {
    return u(e) ? this.spf({}, e) : this._client.get("/radar/email/security/summary/spf", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  spoof(e = {}, t) {
    return u(e) ? this.spoof({}, e) : this._client.get("/radar/email/security/summary/spoof", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  threatCategory(e = {}, t) {
    return u(e) ? this.threatCategory({}, e) : this._client.get("/radar/email/security/summary/threat_category", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  tlsVersion(e = {}, t) {
    return u(e) ? this.tlsVersion({}, e) : this._client.get("/radar/email/security/summary/tls_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}, pg = class extends a {
  arc(e = {}, t) {
    return u(e) ? this.arc({}, e) : this._client.get("/radar/email/security/timeseries_groups/arc", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  dkim(e = {}, t) {
    return u(e) ? this.dkim({}, e) : this._client.get("/radar/email/security/timeseries_groups/dkim", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  dmarc(e = {}, t) {
    return u(e) ? this.dmarc({}, e) : this._client.get("/radar/email/security/timeseries_groups/dmarc", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  malicious(e = {}, t) {
    return u(e) ? this.malicious({}, e) : this._client.get("/radar/email/security/timeseries_groups/malicious", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  spam(e = {}, t) {
    return u(e) ? this.spam({}, e) : this._client.get("/radar/email/security/timeseries_groups/spam", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  spf(e = {}, t) {
    return u(e) ? this.spf({}, e) : this._client.get("/radar/email/security/timeseries_groups/spf", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  spoof(e = {}, t) {
    return u(e) ? this.spoof({}, e) : this._client.get("/radar/email/security/timeseries_groups/spoof", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  threatCategory(e = {}, t) {
    return u(e) ? this.threatCategory({}, e) : this._client.get("/radar/email/security/timeseries_groups/threat_category", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  tlsVersion(e = {}, t) {
    return u(e) ? this.tlsVersion({}, e) : this._client.get("/radar/email/security/timeseries_groups/tls_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
};
class wg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/email/security/top/tlds/malicious/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class $g extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/email/security/top/tlds/spam/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class mg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/email/security/top/tlds/spoof/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Rt extends a {
  constructor() {
    super(...arguments), this.malicious = new wg(this._client), this.spam = new $g(this._client), this.spoof = new mg(this._client);
  }
  get(e = {}, t) {
    return u(e) ? this.get({}, e) : this._client.get("/radar/email/security/top/tlds", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
Rt.Malicious = wg;
Rt.Spam = $g;
Rt.Spoof = mg;
let Da = class extends a {
  constructor() {
    super(...arguments), this.tlds = new Rt(this._client);
  }
};
Da.Tlds = Rt;
class Lt extends a {
  constructor() {
    super(...arguments), this.top = new Da(this._client), this.summary = new gg(this._client), this.timeseriesGroups = new pg(this._client);
  }
}
Lt.Top = Da;
Lt.Summary = gg;
Lt.TimeseriesGroups = pg;
let Ys = class extends a {
  constructor() {
    super(...arguments), this.routing = new Es(this._client), this.security = new Lt(this._client);
  }
};
Ys.Routing = Es;
Ys.Security = Lt;
class yg extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.get("/radar/entities/asns", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/entities/asns/${e}`, { query: t, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Get the requested autonomous system information based on IP address. Population
   * estimates come from APNIC (refer to https://labs.apnic.net/?p=526).
   */
  ip(e, t) {
    return this._client.get("/radar/entities/asns/ip", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  rel(e, t = {}, s) {
    return u(t) ? this.rel(e, {}, t) : this._client.get(`/radar/entities/asns/${e}/rel`, { query: t, ...s })._thenUnwrap((n) => n.result);
  }
}
let fg = class extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.get("/radar/entities/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/entities/locations/${e}`, { query: t, ...s })._thenUnwrap((n) => n.result);
  }
};
class Fs extends a {
  constructor() {
    super(...arguments), this.asns = new yg(this._client), this.locations = new fg(this._client);
  }
  /**
   * Get IP address information.
   */
  get(e, t) {
    return this._client.get("/radar/entities/ip", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
Fs.ASNs = yg;
Fs.Locations = fg;
let Pg = class extends a {
  botClass(e = {}, t) {
    return u(e) ? this.botClass({}, e) : this._client.get("/radar/http/summary/bot_class", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  deviceType(e = {}, t) {
    return u(e) ? this.deviceType({}, e) : this._client.get("/radar/http/summary/device_type", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  httpProtocol(e = {}, t) {
    return u(e) ? this.httpProtocol({}, e) : this._client.get("/radar/http/summary/http_protocol", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  httpVersion(e = {}, t) {
    return u(e) ? this.httpVersion({}, e) : this._client.get("/radar/http/summary/http_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/http/summary/ip_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  os(e = {}, t) {
    return u(e) ? this.os({}, e) : this._client.get("/radar/http/summary/os", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  postQuantum(e = {}, t) {
    return u(e) ? this.postQuantum({}, e) : this._client.get("/radar/http/summary/post_quantum", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  tlsVersion(e = {}, t) {
    return u(e) ? this.tlsVersion({}, e) : this._client.get("/radar/http/summary/tls_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
class Ug extends a {
  botClass(e = {}, t) {
    return u(e) ? this.botClass({}, e) : this._client.get("/radar/http/timeseries_groups/bot_class", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  browser(e = {}, t) {
    return u(e) ? this.browser({}, e) : this._client.get("/radar/http/timeseries_groups/browser", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  browserFamily(e = {}, t) {
    return u(e) ? this.browserFamily({}, e) : this._client.get("/radar/http/timeseries_groups/browser_family", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  deviceType(e = {}, t) {
    return u(e) ? this.deviceType({}, e) : this._client.get("/radar/http/timeseries_groups/device_type", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  httpProtocol(e = {}, t) {
    return u(e) ? this.httpProtocol({}, e) : this._client.get("/radar/http/timeseries_groups/http_protocol", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  httpVersion(e = {}, t) {
    return u(e) ? this.httpVersion({}, e) : this._client.get("/radar/http/timeseries_groups/http_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(e = {}, t) {
    return u(e) ? this.ipVersion({}, e) : this._client.get("/radar/http/timeseries_groups/ip_version", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  os(e = {}, t) {
    return u(e) ? this.os({}, e) : this._client.get("/radar/http/timeseries_groups/os", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  postQuantum(e = {}, t) {
    return u(e) ? this.postQuantum({}, e) : this._client.get("/radar/http/timeseries_groups/post_quantum", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  tlsVersion(e = {}, t) {
    return u(e) ? this.tlsVersion({}, e) : this._client.get("/radar/http/timeseries_groups/tls_version", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}
let bg = class extends a {
  browser(e = {}, t) {
    return u(e) ? this.browser({}, e) : this._client.get("/radar/http/top/browser", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  browserFamily(e = {}, t) {
    return u(e) ? this.browserFamily({}, e) : this._client.get("/radar/http/top/browser_family", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, xg = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/bot_class/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, zg = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/browser_family/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Sg = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/device_type/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Ag = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/http_version/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Rg = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/http_protocol/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Lg = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/ip_version/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, vg = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/os/${e}`, { query: t, ...s })._thenUnwrap((n) => n.result);
  }
}, Ig = class extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/ases/tls_version/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
};
class ee extends a {
  constructor() {
    super(...arguments), this.botClass = new xg(this._client), this.deviceType = new Sg(this._client), this.httpProtocol = new Rg(this._client), this.httpMethod = new Ag(this._client), this.ipVersion = new Lg(this._client), this.os = new vg(this._client), this.tlsVersion = new Ig(this._client), this.browserFamily = new zg(this._client);
  }
  get(e = {}, t) {
    return u(e) ? this.get({}, e) : this._client.get("/radar/http/top/ases", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
ee.BotClass = xg;
ee.DeviceType = Sg;
ee.HTTPProtocol = Rg;
ee.HTTPMethod = Ag;
ee.IPVersion = Lg;
ee.OS = vg;
ee.TLSVersion = Ig;
ee.BrowserFamily = zg;
class kg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/bot_class/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Og extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/browser_family/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Zg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/device_type/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Cg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/http_version/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Vg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/http_protocol/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Tg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/ip_version/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Dg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/os/${e}`, { query: t, ...s })._thenUnwrap((n) => n.result);
  }
}
class Eg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/http/top/locations/tls_version/${e}`, {
      query: t,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
let te = class extends a {
  constructor() {
    super(...arguments), this.botClass = new kg(this._client), this.deviceType = new Zg(this._client), this.httpProtocol = new Vg(this._client), this.httpMethod = new Cg(this._client), this.ipVersion = new Tg(this._client), this.os = new Dg(this._client), this.tlsVersion = new Eg(this._client), this.browserFamily = new Og(this._client);
  }
  get(e = {}, t) {
    return u(e) ? this.get({}, e) : this._client.get("/radar/http/top/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
te.BotClass = kg;
te.DeviceType = Zg;
te.HTTPProtocol = Vg;
te.HTTPMethod = Cg;
te.IPVersion = Tg;
te.OS = Dg;
te.TLSVersion = Eg;
te.BrowserFamily = Og;
class Se extends a {
  constructor() {
    super(...arguments), this.locations = new te(this._client), this.ases = new ee(this._client), this.summary = new Pg(this._client), this.timeseriesGroups = new Ug(this._client), this.top = new bg(this._client);
  }
  timeseries(e = {}, t) {
    return u(e) ? this.timeseries({}, e) : this._client.get("/radar/http/timeseries", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
Se.Locations = te;
Se.Ases = ee;
Se.Summary = Pg;
Se.TimeseriesGroups = Ug;
Se.Top = bg;
let Yg = class extends a {
  ases(e = {}, t) {
    return u(e) ? this.ases({}, e) : this._client.get("/radar/netflows/top/ases", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  locations(e = {}, t) {
    return u(e) ? this.locations({}, e) : this._client.get("/radar/netflows/top/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
class Ea extends a {
  constructor() {
    super(...arguments), this.top = new Yg(this._client);
  }
  summary(e = {}, t) {
    return u(e) ? this.summary({}, e) : this._client.get("/radar/netflows/summary", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  timeseries(e = {}, t) {
    return u(e) ? this.timeseries({}, e) : this._client.get("/radar/netflows/timeseries", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
Ea.Top = Yg;
class Fg extends a {
  /**
   * Get a summary (percentiles) of bandwidth, latency or DNS response time from the
   * Radar Internet Quality Index (IQI).
   */
  summary(e, t) {
    return this._client.get("/radar/quality/iqi/summary", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  /**
   * Get a time series (percentiles) of bandwidth, latency or DNS response time from
   * the Radar Internet Quality Index (IQI).
   */
  timeseriesGroups(e, t) {
    return this._client.get("/radar/quality/iqi/timeseries_groups", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
let Gg = class extends a {
  ases(e = {}, t) {
    return u(e) ? this.ases({}, e) : this._client.get("/radar/quality/speed/top/ases", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  locations(e = {}, t) {
    return u(e) ? this.locations({}, e) : this._client.get("/radar/quality/speed/top/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}, Ya = class extends a {
  constructor() {
    super(...arguments), this.top = new Gg(this._client);
  }
  histogram(e = {}, t) {
    return u(e) ? this.histogram({}, e) : this._client.get("/radar/quality/speed/histogram", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  summary(e = {}, t) {
    return u(e) ? this.summary({}, e) : this._client.get("/radar/quality/speed/summary", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
Ya.Top = Gg;
class Gs extends a {
  constructor() {
    super(...arguments), this.iqi = new Fg(this._client), this.speed = new Ya(this._client);
  }
}
Gs.IQI = Fg;
Gs.Speed = Ya;
class Bg extends a {
  get(e, t = {}, s) {
    return u(t) ? this.get(e, {}, t) : this._client.get(`/radar/ranking/domain/${e}`, { query: t, ...s })._thenUnwrap((n) => n.result);
  }
}
class Ng extends a {
  timeseriesGroups(e = {}, t) {
    return u(e) ? this.timeseriesGroups({}, e) : this._client.get("/radar/ranking/internet_services/timeseries_groups", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
  top(e = {}, t) {
    return u(e) ? this.top({}, e) : this._client.get("/radar/ranking/internet_services/top", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
class Bs extends a {
  constructor() {
    super(...arguments), this.domain = new Bg(this._client), this.internetServices = new Ng(this._client);
  }
  timeseriesGroups(e = {}, t) {
    return u(e) ? this.timeseriesGroups({}, e) : this._client.get("/radar/ranking/timeseries_groups", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  top(e = {}, t) {
    return u(e) ? this.top({}, e) : this._client.get("/radar/ranking/top", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
Bs.Domain = Bg;
Bs.InternetServices = Ng;
class Mg extends a {
  directive(e = {}, t) {
    return u(e) ? this.directive({}, e) : this._client.get("/radar/robots_txt/top/user_agents/directive", {
      query: e,
      ...t
    })._thenUnwrap((s) => s.result);
  }
}
let Fa = class extends a {
  constructor() {
    super(...arguments), this.userAgents = new Mg(this._client);
  }
  domainCategories(e = {}, t) {
    return u(e) ? this.domainCategories({}, e) : this._client.get("/radar/robots_txt/top/domain_categories", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
Fa.UserAgents = Mg;
class Ga extends a {
  constructor() {
    super(...arguments), this.top = new Fa(this._client);
  }
}
Ga.Top = Fa;
let Kg = class extends a {
  get(e = {}, t) {
    return u(e) ? this.get({}, e) : this._client.get("/radar/traffic_anomalies/locations", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
};
class Ba extends a {
  constructor() {
    super(...arguments), this.locations = new Kg(this._client);
  }
  get(e = {}, t) {
    return u(e) ? this.get({}, e) : this._client.get("/radar/traffic_anomalies", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
Ba.Locations = Kg;
class Wg extends a {
  bots(e = {}, t) {
    return u(e) ? this.bots({}, e) : this._client.get("/radar/verified_bots/top/bots", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
  categories(e = {}, t) {
    return u(e) ? this.categories({}, e) : this._client.get("/radar/verified_bots/top/categories", { query: e, ...t })._thenUnwrap((s) => s.result);
  }
}
class Na extends a {
  constructor() {
    super(...arguments), this.top = new Wg(this._client);
  }
}
Na.Top = Wg;
class P extends a {
  constructor() {
    super(...arguments), this.ai = new xt(this._client), this.annotations = new va(this._client), this.bgp = new ze(this._client), this.datasets = new N_(this._client), this.dns = new Ta(this._client), this.netflows = new Ea(this._client), this.search = new M_(this._client), this.verifiedBots = new Na(this._client), this.as112 = new zt(this._client), this.email = new Ys(this._client), this.attacks = new Vs(this._client), this.entities = new Fs(this._client), this.http = new Se(this._client), this.quality = new Gs(this._client), this.ranking = new Bs(this._client), this.trafficAnomalies = new Ba(this._client), this.tcpResetsTimeouts = new K_(this._client), this.robotsTXT = new Ga(this._client);
  }
}
P.AI = xt;
P.Annotations = va;
P.BGP = ze;
P.Datasets = N_;
P.DNS = Ta;
P.Netflows = Ea;
P.Search = M_;
P.VerifiedBots = Na;
P.AS112 = zt;
P.Email = Ys;
P.Attacks = Vs;
P.Entities = Fs;
P.HTTP = Se;
P.Quality = Gs;
P.Ranking = Bs;
P.TrafficAnomalies = Ba;
P.TCPResetsTimeouts = K_;
P.RobotsTXT = Ga;
class jg extends a {
  /**
   * Creates a new rate limit for a zone. Refer to the object definition for a list
   * of required attributes.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/rate_limits`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the rate limits for a zone.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/rate_limits`, H$, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes an existing rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/rate_limits/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/rate_limits/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the details of a rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/rate_limits/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class H$ extends p {
}
let Ma = class extends a {
  /**
   * Update individual domain.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/registrar/domains/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List domains handled by Registrar.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/registrar/domains`, Ka, t);
  }
  /**
   * Show individual domain.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/registrar/domains/${e}`, s)._thenUnwrap((i) => i.result);
  }
}, Ka = class extends h {
};
Ma.DomainsSinglePage = Ka;
class Ns extends a {
  constructor() {
    super(...arguments), this.domains = new Ma(this._client);
  }
}
Ns.Domains = Ma;
Ns.DomainsSinglePage = Ka;
class Hg extends a {
  /**
   * Request Trace
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/request-tracer/trace`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class Wa extends a {
  constructor() {
    super(...arguments), this.traces = new Hg(this._client);
  }
}
Wa.Traces = Hg;
class ja extends a {
  /**
   * Create a new share recipient
   */
  create(e, t, s) {
    const { path_account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/shares/${e}/recipients`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List share recipients by share ID.
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/shares/${e}/recipients`, Ha, { query: i, ...s });
  }
  /**
   * Deletion is not immediate, an updated share recipient object with a new status
   * will be returned.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/shares/${e}/recipients/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Get share recipient by ID.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/shares/${e}/recipients/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Ha extends p {
}
ja.RecipientListResponsesV4PagePaginationArray = Ha;
class Xa extends a {
  /**
   * Create a new share resource
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/shares/${e}/resources`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update is not immediate, an updated share resource object with a new status will
   * be returned.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/shares/${e}/resources/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * List share resources by share ID.
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/shares/${e}/resources`, Qa, { query: i, ...s });
  }
  /**
   * Deletion is not immediate, an updated share resource object with a new status
   * will be returned.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/shares/${e}/resources/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Get share resource by ID.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/shares/${e}/resources/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Qa extends p {
}
Xa.ResourceListResponsesV4PagePaginationArray = Qa;
class We extends a {
  constructor() {
    super(...arguments), this.recipients = new ja(this._client), this.resources = new Xa(this._client);
  }
  /**
   * Create a new share
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/shares`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updating is not immediate, an updated share object with a new status will be
   * returned.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/shares/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all account shares.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/shares`, X$, { query: n, ...t });
  }
  /**
   * Deletion is not immediate, an updated share object with a new status will be
   * returned.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/shares/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches share by ID.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/shares/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class X$ extends p {
}
We.Recipients = ja;
We.RecipientListResponsesV4PagePaginationArray = Ha;
We.Resources = Xa;
We.ResourceListResponsesV4PagePaginationArray = Qa;
class Xg extends a {
  /**
   * Gets the current status of an asynchronous operation on a list.
   *
   * The `status` property can have one of the following values: `pending`,
   * `running`, `completed`, or `failed`. If the status is `failed`, the `error`
   * property will contain a message describing the error.
   */
  get(e, t, s) {
    return this._client.get(`/accounts/${e}/rules/lists/bulk_operations/${t}`, s)._thenUnwrap((n) => n.result);
  }
}
let Ja = class extends a {
  /**
   * Appends new items to the list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * [Get bulk operation status](/operations/lists-get-bulk-operation-status)
   * endpoint with the returned `operation_id`.
   */
  create(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/rules/lists/${e}/items`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Removes all existing items from the list and adds the provided items to the
   * list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * [Get bulk operation status](/operations/lists-get-bulk-operation-status)
   * endpoint with the returned `operation_id`.
   */
  update(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.put(`/accounts/${n}/rules/lists/${e}/items`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all the items in the list.
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/rules/lists/${e}/items`, qa, { query: i, ...s });
  }
  /**
   * Removes one or more items from a list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * [Get bulk operation status](/operations/lists-get-bulk-operation-status)
   * endpoint with the returned `operation_id`.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/rules/lists/${e}/items`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a list item in the list.
   */
  get(e, t, s, n) {
    return this._client.get(`/accounts/${e}/rules/lists/${t}/items/${s}`, n)._thenUnwrap((i) => i.result);
  }
};
class qa extends Ld {
}
Ja.ItemListResponsesCursorPagination = qa;
let je = class extends a {
  constructor() {
    super(...arguments), this.bulkOperations = new Xg(this._client), this.items = new Ja(this._client);
  }
  /**
   * Creates a new list of the specified type.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/rules/lists`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates the description of a list.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/rules/lists/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all lists in the account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/rules/lists`, eo, t);
  }
  /**
   * Deletes a specific list and all its items.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/rules/lists/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a list.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/rules/lists/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class eo extends h {
}
je.ListsListsSinglePage = eo;
je.BulkOperations = Xg;
je.Items = Ja;
je.ItemListResponsesCursorPagination = qa;
let Ms = class extends a {
  constructor() {
    super(...arguments), this.lists = new je(this._client);
  }
};
Ms.Lists = je;
Ms.ListsListsSinglePage = eo;
let Qg = class extends a {
  /**
   * Adds a new rule to an account or zone ruleset. The rule will be added to the end
   * of the existing list of rules in the ruleset by default.
   */
  create(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${o}/${l}/rulesets/${e}/rules`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  delete(e, t, s = {}, n) {
    if (u(s))
      return this.delete(e, t, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${o}/${l}/rulesets/${e}/rules/${t}`, n)._thenUnwrap((g) => g.result);
  }
  /**
   * Updates an existing rule in an account or zone ruleset.
   */
  edit(e, t, s, n) {
    const { account_id: i, zone_id: c, ...o } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: l, accountOrZoneId: g } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.patch(`/${l}/${g}/rulesets/${e}/rules/${t}`, {
      body: o,
      ...n
    })._thenUnwrap(($) => $.result);
  }
}, to = class extends a {
  list(e, t = {}, s) {
    if (u(t))
      return this.list(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${o}/rulesets/${e}/versions`, so, s);
  }
  delete(e, t, s = {}, n) {
    if (u(s))
      return this.delete(e, t, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${o}/${l}/rulesets/${e}/versions/${t}`, { ...n, headers: { Accept: "*/*", ...n == null ? void 0 : n.headers } });
  }
  get(e, t, s = {}, n) {
    if (u(s))
      return this.get(e, t, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${o}/${l}/rulesets/${e}/versions/${t}`, n)._thenUnwrap((g) => g.result);
  }
}, so = class extends h {
};
to.VersionListResponsesSinglePage = so;
let no = class extends a {
  list(e, t = {}, s) {
    if (u(t))
      return this.list(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${o}/rulesets/phases/${e}/entrypoint/versions`, io, s);
  }
  get(e, t, s = {}, n) {
    if (u(s))
      return this.get(e, t, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${o}/${l}/rulesets/phases/${e}/entrypoint/versions/${t}`, n)._thenUnwrap((g) => g.result);
  }
};
class io extends h {
}
no.VersionListResponsesSinglePage = io;
class Ks extends a {
  constructor() {
    super(...arguments), this.versions = new no(this._client);
  }
  /**
   * Updates an account or zone entry point ruleset, creating a new version.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/rulesets/phases/${e}/entrypoint`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/rulesets/phases/${e}/entrypoint`, s)._thenUnwrap((l) => l.result);
  }
}
Ks.Versions = no;
Ks.VersionListResponsesSinglePage = io;
class He extends a {
  constructor() {
    super(...arguments), this.phases = new Ks(this._client), this.rules = new Qg(this._client), this.versions = new to(this._client);
  }
  /**
   * Creates a ruleset.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/rulesets`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an account or zone ruleset, creating a new version.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/rulesets/${e}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/rulesets`, Q$, { query: i, ...t });
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/rulesets/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/rulesets/${e}`, s)._thenUnwrap((l) => l.result);
  }
}
class Q$ extends Ld {
}
He.Phases = Ks;
He.Rules = Qg;
He.Versions = to;
He.VersionListResponsesSinglePage = so;
class Jg extends a {
  /**
   * Returns the set of hostnames, the signature algorithm, and the expiration date
   * of the certificate.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/ssl/analyze`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
}
class qg extends a {
  /**
   * Retrieve the SSL/TLS Recommender's recommendation for a zone.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/ssl/recommendation`, t)._thenUnwrap((n) => n.result);
  }
}
class ep extends a {
  /**
   * Edit SSL validation method for a certificate pack. A PATCH request will request
   * an immediate validation check on any certificate, and return the updated status.
   * If a validation method is provided, the validation will be immediately attempted
   * using that method.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/ssl/verification/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get SSL Verification Info for a Zone.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/ssl/verification`, { query: n, ...t })._thenUnwrap((i) => i.result);
  }
}
let tp = class extends a {
  /**
   * For a given zone, list certificate pack quotas.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/ssl/certificate_packs/quota`, t)._thenUnwrap((n) => n.result);
  }
};
class Ws extends a {
  constructor() {
    super(...arguments), this.quota = new tp(this._client);
  }
  /**
   * For a given zone, order an advanced certificate pack.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/ssl/certificate_packs/order`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * For a given zone, list all active certificate packs.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/ssl/certificate_packs`, ro, { query: n, ...t });
  }
  /**
   * For a given zone, delete an advanced certificate pack.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/ssl/certificate_packs/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * For a given zone, restart validation or add cloudflare branding for an advanced
   * certificate pack. The former is only a validation operation for a Certificate
   * Pack in a validation_timed_out status.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/ssl/certificate_packs/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * For a given zone, get a certificate pack.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/ssl/certificate_packs/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class ro extends h {
}
Ws.CertificatePackListResponsesSinglePage = ro;
Ws.Quota = tp;
let sp = class extends a {
  /**
   * Patch Universal SSL Settings for a Zone.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/ssl/universal/settings`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Universal SSL Settings for a Zone.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/ssl/universal/settings`, t)._thenUnwrap((n) => n.result);
  }
};
class co extends a {
  constructor() {
    super(...arguments), this.settings = new sp(this._client);
  }
}
co.Settings = sp;
class pe extends a {
  constructor() {
    super(...arguments), this.analyze = new Jg(this._client), this.certificatePacks = new Ws(this._client), this.recommendations = new qg(this._client), this.universal = new co(this._client), this.verification = new ep(this._client);
  }
}
pe.Analyze = Jg;
pe.CertificatePacks = Ws;
pe.CertificatePackListResponsesSinglePage = ro;
pe.Recommendations = qg;
pe.Universal = co;
pe.VerificationResource = ep;
class np extends a {
  get(e = {}, t) {
    if (u(e))
      return this.get({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${c}/${o}/security-center/insights/class`, {
      query: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
}
class ip extends a {
  get(e = {}, t) {
    if (u(e))
      return this.get({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${c}/${o}/security-center/insights/severity`, {
      query: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
}
class rp extends a {
  get(e = {}, t) {
    if (u(e))
      return this.get({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${c}/${o}/security-center/insights/type`, {
      query: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
}
class Xe extends a {
  constructor() {
    super(...arguments), this.class = new np(this._client), this.severity = new ip(this._client), this.type = new rp(this._client);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/security-center/insights`, ao, { query: i, ...t });
  }
  /**
   * Archive Security Center Insight
   */
  dismiss(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/security-center/insights/${e}/dismiss`, { body: c, ...s });
  }
}
class ao extends F {
}
Xe.InsightListResponsesV4PagePagination = ao;
Xe.Class = np;
Xe.Severity = ip;
Xe.Type = rp;
class js extends a {
  constructor() {
    super(...arguments), this.insights = new Xe(this._client);
  }
}
js.Insights = Xe;
js.InsightListResponsesV4PagePagination = ao;
class cp extends a {
  /**
   * Update security.txt
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/security-center/securitytxt`, { body: n, ...t });
  }
  /**
   * Delete security.txt
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/security-center/securitytxt`, t);
  }
  /**
   * Get security.txt
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/security-center/securitytxt`, t)._thenUnwrap((n) => n.result);
  }
}
let ap = class extends a {
  /**
   * Snippet Content
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/snippets/${e}/content`, {
      ...s,
      headers: { Accept: "multipart/form-data", ...s == null ? void 0 : s.headers },
      __binaryResponse: !0
    });
  }
}, Hs = class extends a {
  /**
   * Put Rules
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/snippets/snippet_rules`, oo, { body: n, method: "put", ...t });
  }
  /**
   * Rules
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/snippets/snippet_rules`, uo, t);
  }
  /**
   * Delete All Rules
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/snippets/snippet_rules`, t);
  }
};
class oo extends h {
}
let uo = class extends h {
};
Hs.RuleUpdateResponsesSinglePage = oo;
Hs.RuleListResponsesSinglePage = uo;
class Qe extends a {
  constructor() {
    super(...arguments), this.content = new ap(this._client), this.rules = new Hs(this._client);
  }
  /**
   * Put Snippet
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/snippets/${e}`, R({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
  /**
   * All Snippets
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/snippets`, J$, t);
  }
  /**
   * Delete Snippet
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/snippets/${e}`, s);
  }
  /**
   * Snippet
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/snippets/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class J$ extends h {
}
Qe.Content = ap;
Qe.Rules = Hs;
Qe.RuleUpdateResponsesSinglePage = oo;
Qe.RuleListResponsesSinglePage = uo;
class lo extends a {
  /**
   * Creates a new Spectrum application from a configuration using a name for the
   * origin.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/spectrum/apps`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a previously existing application's configuration that uses a name for
   * the origin.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/spectrum/apps/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves a list of currently existing Spectrum applications inside a zone.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/spectrum/apps`, ho, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes a previously existing application.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/spectrum/apps/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the application configuration of a specific application inside a zone.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/spectrum/apps/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class ho extends p {
}
lo.AppListResponsesV4PagePaginationArray = ho;
class op extends a {
  /**
   * Retrieves analytics aggregated from the last minute of usage on Spectrum
   * applications underneath a given zone.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/spectrum/analytics/aggregate/current`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class _o extends a {
  constructor() {
    super(...arguments), this.currents = new op(this._client);
  }
}
_o.Currents = op;
class up extends a {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/spectrum/analytics/events/bytime`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class lp extends a {
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   */
  get(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.get(`/zones/${s}/spectrum/analytics/events/summary`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
let Xs = class extends a {
  constructor() {
    super(...arguments), this.bytimes = new up(this._client), this.summaries = new lp(this._client);
  }
};
Xs.Bytimes = up;
Xs.Summaries = lp;
class Qs extends a {
  constructor() {
    super(...arguments), this.aggregates = new _o(this._client), this.events = new Xs(this._client);
  }
}
Qs.Aggregates = _o;
Qs.Events = Xs;
class vt extends a {
  constructor() {
    super(...arguments), this.analytics = new Qs(this._client), this.apps = new lo(this._client);
  }
}
vt.Analytics = Qs;
vt.Apps = lo;
vt.AppListResponsesV4PagePaginationArray = ho;
class dp extends a {
  /**
   * Retrieves quota for all plans, as well as the current zone quota.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/speed_api/availabilities`, t)._thenUnwrap((n) => n.result);
  }
}
class hp extends a {
  /**
   * Creates a scheduled test for a page.
   */
  create(e, t, s) {
    const { zone_id: n, region: i } = t;
    return this._client.post(`/zones/${n}/speed_api/schedule/${e}`, {
      query: { region: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a scheduled test for a page.
   */
  delete(e, t, s) {
    const { zone_id: n, region: i } = t;
    return this._client.delete(`/zones/${n}/speed_api/schedule/${e}`, {
      query: { region: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves the test schedule for a page in a specific region.
   */
  get(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.get(`/zones/${n}/speed_api/schedule/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let go = class extends a {
  /**
   * Starts a test for a specific webpage, in a specific region.
   */
  create(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.post(`/zones/${n}/speed_api/pages/${e}/tests`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Test history (list of tests) for a specific webpage.
   */
  list(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.getAPIList(`/zones/${n}/speed_api/pages/${e}/tests`, po, { query: i, ...s });
  }
  /**
   * Deletes all tests for a specific webpage from a specific region. Deleted tests
   * are still counted as part of the quota.
   */
  delete(e, t, s) {
    const { zone_id: n, region: i } = t;
    return this._client.delete(`/zones/${n}/speed_api/pages/${e}/tests`, {
      query: { region: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves the result of a specific test.
   */
  get(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/speed_api/pages/${e}/tests/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class po extends p {
}
go.TestsV4PagePaginationArray = po;
class It extends a {
  constructor() {
    super(...arguments), this.tests = new go(this._client);
  }
  /**
   * Lists all webpages which have been tested.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/speed_api/pages`, wo, t);
  }
  /**
   * Lists the core web vital metrics trend over time for a specific page.
   */
  trend(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.get(`/zones/${n}/speed_api/pages/${e}/trend`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class wo extends h {
}
It.PageListResponsesSinglePage = wo;
It.Tests = go;
It.TestsV4PagePaginationArray = po;
class Je extends a {
  constructor() {
    super(...arguments), this.schedule = new hp(this._client), this.availabilities = new dp(this._client), this.pages = new It(this._client);
  }
}
Je.ScheduleResource = hp;
Je.Availabilities = dp;
Je.Pages = It;
Je.PageListResponsesSinglePage = wo;
class $o extends a {
  /**
   * Deletes additional audio tracks on a video. Deleting a default audio track is
   * not allowed. You must assign another audio track as default prior to deletion.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/stream/${e}/audio/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Adds an additional audio track to a video using the provided audio track URL.
   */
  copy(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/stream/${e}/audio/copy`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Edits additional audio tracks on a video. Editing the default status of an audio
   * track to `true` will mark all other audio tracks on the video default status to
   * `false`.
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/stream/${e}/audio/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists additional audio tracks on a video. Note this API will not return
   * information for audio attached to the video upload.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/stream/${e}/audio`, mo, s);
  }
}
class mo extends h {
}
$o.AudioSinglePage = mo;
class _p extends a {
  /**
   * Clips a video based on the specified start and end times provided in seconds.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/stream/clip`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
}
class gp extends a {
  /**
   * Uploads a video to Stream from a provided URL.
   */
  create(e, t) {
    const { account_id: s, "Upload-Creator": n, "Upload-Metadata": i, ...c } = e;
    return this._client.post(`/accounts/${s}/stream/copy`, {
      body: c,
      ...t,
      headers: {
        ...n != null ? { "Upload-Creator": n } : void 0,
        ...i != null ? { "Upload-Metadata": i } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((o) => o.result);
  }
}
class pp extends a {
  /**
   * Creates a direct upload that allows video uploads without an API key.
   */
  create(e, t) {
    const { account_id: s, "Upload-Creator": n, ...i } = e;
    return this._client.post(`/accounts/${s}/stream/direct_upload`, {
      body: i,
      ...t,
      headers: {
        ...n != null ? { "Upload-Creator": n } : void 0,
        ...t == null ? void 0 : t.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
let wp = class extends a {
  /**
   * Creates a download for a video when a video is ready to view.
   */
  create(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/stream/${e}/downloads`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete the downloads for a video.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/stream/${e}/downloads`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists the downloads created for a video.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/stream/${e}/downloads`, s)._thenUnwrap((i) => i.result);
  }
};
class $p extends a {
  /**
   * Fetches an HTML code snippet to embed a video in a web page delivered through
   * Cloudflare. On success, returns an HTML fragment for use on web pages to display
   * a video. On failure, returns a JSON response body.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/stream/${e}/embed`, s);
  }
}
let mp = class extends a {
  /**
   * Creates an RSA private key in PEM and JWK formats. Key files are only displayed
   * once after creation. Keys are created, used, and deleted independently of
   * videos, and every key can sign any video.
   */
  create(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.post(`/accounts/${s}/stream/keys`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes signing keys and revokes all signed URLs generated with the key.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/stream/keys/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists the video ID and creation date and time when a signing key was created.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/stream/keys`, yo, t);
  }
};
class yo extends h {
}
mp.KeyGetResponsesSinglePage = yo;
let yp = class extends a {
  /**
   * Creates a signed URL token for a video. If a body is not provided in the
   * request, a token is created with default values.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/stream/${e}/token`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class fp extends a {
  /**
   * Returns information about an account's storage use.
   */
  storageUsage(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/stream/storage-usage`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class fo extends a {
  /**
   * Creates watermark profiles using a single `HTTP POST multipart/form-data`
   * request.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/stream/watermarks`, R({ body: n, ...t }))._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all watermark profiles for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/stream/watermarks`, Po, t);
  }
  /**
   * Deletes a watermark profile.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/stream/watermarks/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves details for a single watermark profile.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/stream/watermarks/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Po extends h {
}
fo.WatermarksSinglePage = Po;
class Pp extends a {
  /**
   * Creates a webhook notification.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/stream/webhook`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes a webhook.
   */
  delete(e, t) {
    const { account_id: s } = e;
    return this._client.delete(`/accounts/${s}/stream/webhook`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Retrieves a list of webhooks.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/stream/webhook`, t)._thenUnwrap((n) => n.result);
  }
}
class Up extends a {
  /**
   * Return WebVTT captions for a provided language.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/stream/${e}/captions/${t}/vtt`, {
      ...n,
      headers: { Accept: "text/vtt", ...n == null ? void 0 : n.headers }
    });
  }
}
class Uo extends a {
  constructor() {
    super(...arguments), this.vtt = new Up(this._client);
  }
  /**
   * Generate captions or subtitles for provided language via AI.
   */
  create(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.post(`/accounts/${i}/stream/${e}/captions/${t}/generate`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Uploads the caption or subtitle file to the endpoint for a specific BCP47
   * language. One caption or subtitle file per language is allowed.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/stream/${e}/captions/${t}`, R({ body: c, ...n }))._thenUnwrap((o) => o.result);
  }
  /**
   * Removes the captions or subtitles from a video.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/stream/${e}/captions/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Lists the captions or subtitles for provided language.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/stream/${e}/captions/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
Uo.Vtt = Up;
class Js extends a {
  constructor() {
    super(...arguments), this.language = new Uo(this._client);
  }
  /**
   * Lists the available captions or subtitles for a specific video.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/stream/${e}/captions`, bo, s);
  }
}
class bo extends h {
}
Js.CaptionsSinglePage = bo;
Js.Language = Uo;
class xo extends a {
  /**
   * Creates a new output that can be used to simulcast or restream live video to
   * other RTMP or SRT destinations. Outputs are always linked to a specific live
   * input — one live input can have many outputs.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/stream/live_inputs/${e}/outputs`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates the state of an output.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/stream/live_inputs/${e}/outputs/${t}`, { body: c, ...n })._thenUnwrap((o) => o.result);
  }
  /**
   * Retrieves all outputs associated with a specified live input.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/stream/live_inputs/${e}/outputs`, zo, s);
  }
  /**
   * Deletes an output and removes it from the associated live input.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/stream/live_inputs/${e}/outputs/${t}`, { ...n, headers: { Accept: "*/*", ...n == null ? void 0 : n.headers } });
  }
}
class zo extends h {
}
xo.OutputsSinglePage = zo;
class qs extends a {
  constructor() {
    super(...arguments), this.outputs = new xo(this._client);
  }
  /**
   * Creates a live input, and returns credentials that you or your users can use to
   * stream live video to Cloudflare Stream.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/stream/live_inputs`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a specified live input.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/stream/live_inputs/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists the live inputs created for an account. To get the credentials needed to
   * stream to a specific live input, request a single live input.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/stream/live_inputs`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Prevents a live input from being streamed to and makes the live input
   * inaccessible to any future API calls.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/stream/live_inputs/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Retrieves details of an existing live input.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/stream/live_inputs/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
qs.Outputs = xo;
qs.OutputsSinglePage = zo;
class z extends a {
  constructor() {
    super(...arguments), this.audioTracks = new $o(this._client), this.videos = new fp(this._client), this.clip = new _p(this._client), this.copy = new gp(this._client), this.directUpload = new pp(this._client), this.keys = new mp(this._client), this.liveInputs = new qs(this._client), this.watermarks = new fo(this._client), this.webhooks = new Pp(this._client), this.captions = new Js(this._client), this.downloads = new wp(this._client), this.embed = new $p(this._client), this.token = new yp(this._client);
  }
  /**
   * Initiates a video upload using the TUS protocol. On success, the server responds
   * with a status code 201 (created) and includes a `location` header to indicate
   * where the content should be uploaded. Refer to https://tus.io for protocol
   * details.
   */
  create(e, t) {
    const { account_id: s, body: n, "Tus-Resumable": i, "Upload-Length": c, "Upload-Creator": o, "Upload-Metadata": l } = e;
    return this._client.post(`/accounts/${s}/stream`, {
      body: n,
      ...t,
      headers: {
        Accept: "*/*",
        "Tus-Resumable": i.toString(),
        "Upload-Length": c.toString(),
        ...o != null ? { "Upload-Creator": o } : void 0,
        ...l != null ? { "Upload-Metadata": l } : void 0,
        ...t == null ? void 0 : t.headers
      }
    });
  }
  /**
   * Lists up to 1000 videos from a single request. For a specific range, refer to
   * the optional parameters.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/stream`, q$, { query: n, ...t });
  }
  /**
   * Deletes a video and its copies from Cloudflare Stream.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/stream/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Edit details for a single video.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/stream/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches details for a single video.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/stream/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class q$ extends h {
}
z.AudioTracks = $o;
z.AudioSinglePage = mo;
z.Videos = fp;
z.ClipResource = _p;
z.Copy = gp;
z.DirectUpload = pp;
z.KeyGetResponsesSinglePage = yo;
z.LiveInputs = qs;
z.Watermarks = fo;
z.WatermarksSinglePage = Po;
z.Webhooks = Pp;
z.Captions = Js;
z.CaptionsSinglePage = bo;
z.Downloads = wp;
z.Embed = $p;
z.Token = yp;
class So extends a {
  /**
   * Lists challenge widgets.
   */
  create(e, t) {
    const { account_id: s, direction: n, order: i, page: c, per_page: o, ...l } = e;
    return this._client.post(`/accounts/${s}/challenges/widgets`, {
      query: { direction: n, order: i, page: c, per_page: o },
      body: l,
      ...t
    })._thenUnwrap((g) => g.result);
  }
  /**
   * Update the configuration of a widget.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/challenges/widgets/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all turnstile widgets of an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/challenges/widgets`, Ao, { query: n, ...t });
  }
  /**
   * Destroy a Turnstile Widget.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/challenges/widgets/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Show a single challenge widget configuration.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/challenges/widgets/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Generate a new secret key for this widget. If `invalidate_immediately` is set to
   * `false`, the previous secret remains valid for 2 hours.
   *
   * Note that secrets cannot be rotated again during the grace period.
   */
  rotateSecret(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/challenges/widgets/${e}/rotate_secret`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Ao extends p {
}
So.WidgetListResponsesV4PagePaginationArray = Ao;
class en extends a {
  constructor() {
    super(...arguments), this.widgets = new So(this._client);
  }
}
en.Widgets = So;
en.WidgetListResponsesV4PagePaginationArray = Ao;
class bp extends a {
  /**
   * Updates the URL Normalization settings.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/url_normalization`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes the URL Normalization settings.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}/url_normalization`, {
      ...t,
      headers: { Accept: "*/*", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Fetches the current URL Normalization settings.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/url_normalization`, t)._thenUnwrap((n) => n.result);
  }
}
class xp extends a {
  /**
   * Returns the raw response of the network request. Find the `response_id` in the
   * `data.requests.response.hash`.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/urlscanner/v2/responses/${e}`, {
      ...s,
      headers: { Accept: "text/plain", ...s == null ? void 0 : s.headers }
    });
  }
}
class zp extends a {
  /**
   * Submit a URL to scan. Check limits at
   * https://developers.cloudflare.com/security-center/investigate/scan-limits/.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/urlscanner/v2/scan`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Use a subset of ElasticSearch Query syntax to filter scans. Some example
   * queries:<br/> <br/>- 'path:"/bundles/jquery.js"': Searches for scans who
   * requested resources with the given path.<br/>- 'page.asn:AS24940 AND hash:xxx':
   * Websites hosted in AS24940 where a resource with the given hash was
   * downloaded.<br/>- 'page.domain:microsoft\* AND verdicts.malicious:true AND NOT
   * page.domain:microsoft.com': malicious scans whose hostname starts with
   * "microsoft".<br/>- 'apikey:me AND date:[2025-01 TO 2025-02]': my scans from 2025
   * January to 2025 February.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/urlscanner/v2/search`, { query: n, ...t });
  }
  /**
   * Submit URLs to scan. Check limits at
   * https://developers.cloudflare.com/security-center/investigate/scan-limits/ and
   * take into account scans submitted in bulk have lower priority and may take
   * longer to finish.
   */
  bulkCreate(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.post(`/accounts/${s}/urlscanner/v2/bulk`, { body: n, ...t });
  }
  /**
   * Returns a plain text response, with the scan's DOM content as rendered by
   * Chrome.
   */
  dom(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/urlscanner/v2/dom/${e}`, {
      ...s,
      headers: { Accept: "text/plain", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Get URL scan by uuid
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/urlscanner/v2/result/${e}`, s);
  }
  /**
   * Get a URL scan's HAR file. See HAR spec at
   * http://www.softwareishard.com/blog/har-12-spec/.
   */
  har(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/urlscanner/v2/har/${e}`, s);
  }
  /**
   * Get scan's screenshot by resolution (desktop/mobile/tablet).
   */
  screenshot(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/urlscanner/v2/screenshots/${e}.png`, {
      query: i,
      ...s,
      headers: { Accept: "image/png", ...s == null ? void 0 : s.headers },
      __binaryResponse: !0
    });
  }
}
class tn extends a {
  constructor() {
    super(...arguments), this.responses = new xp(this._client), this.scans = new zp(this._client);
  }
}
tn.Responses = xp;
tn.Scans = zp;
class Sp extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/user/audit_logs", kd, { query: e, ...t });
  }
}
class Ro extends a {
  /**
   * Lists all invitations associated with my user.
   */
  list(e) {
    return this._client.getAPIList("/user/invites", Lo, e);
  }
  /**
   * Responds to an invitation.
   */
  edit(e, t, s) {
    return this._client.patch(`/user/invites/${e}`, { body: t, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Gets the details of an invitation.
   */
  get(e, t) {
    return this._client.get(`/user/invites/${e}`, t)._thenUnwrap((s) => s.result);
  }
}
class Lo extends h {
}
Ro.InvitesSinglePage = Lo;
let vo = class extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/user/organizations", Io, {
      query: e,
      ...t
    });
  }
  /**
   * Removes association to an organization.
   */
  delete(e, t) {
    return this._client.delete(`/user/organizations/${e}`, t);
  }
  /**
   * Gets a specific organization the user is associated with.
   */
  get(e, t) {
    return this._client.get(`/user/organizations/${e}`, t)._thenUnwrap((s) => s.result);
  }
};
class Io extends p {
}
vo.OrganizationsV4PagePaginationArray = Io;
let Ap = class extends a {
  /**
   * Updates a user's subscriptions.
   */
  update(e, t, s) {
    return this._client.put(`/user/subscriptions/${e}`, { body: t, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Deletes a user's subscription.
   */
  delete(e, t) {
    return this._client.delete(`/user/subscriptions/${e}`, t);
  }
  /**
   * Lists all of a user's subscriptions.
   */
  get(e) {
    return this._client.getAPIList("/user/subscriptions", vd, e);
  }
};
class ko extends a {
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/user/billing/history", Oo, {
      query: e,
      ...t
    });
  }
}
class Oo extends p {
}
ko.BillingHistoriesV4PagePaginationArray = Oo;
class Rp extends a {
  /**
   * Accesses your billing profile object.
   */
  get(e) {
    return this._client.get("/user/billing/profile", e)._thenUnwrap((t) => t.result);
  }
}
class kt extends a {
  constructor() {
    super(...arguments), this.history = new ko(this._client), this.profile = new Rp(this._client);
  }
}
kt.History = ko;
kt.BillingHistoriesV4PagePaginationArray = Oo;
kt.Profile = Rp;
class Zo extends a {
  /**
   * Find all available permission groups for API Tokens
   */
  list(e) {
    return this._client.getAPIList("/user/tokens/permission_groups", Co, e);
  }
}
class Co extends h {
}
Zo.PermissionGroupListResponsesSinglePage = Co;
class Lp extends a {
  /**
   * Roll the token secret.
   */
  update(e, t, s) {
    return this._client.put(`/user/tokens/${e}/value`, { body: t, ...s })._thenUnwrap((n) => n.result);
  }
}
class Ot extends a {
  constructor() {
    super(...arguments), this.permissionGroups = new Zo(this._client), this.value = new Lp(this._client);
  }
  /**
   * Create a new access token.
   */
  create(e, t) {
    return this._client.post("/user/tokens", { body: e, ...t })._thenUnwrap((s) => s.result);
  }
  /**
   * Update an existing token.
   */
  update(e, t, s) {
    return this._client.put(`/user/tokens/${e}`, { body: t, ...s })._thenUnwrap((n) => n.result);
  }
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/user/tokens", Id, { query: e, ...t });
  }
  /**
   * Destroy a token.
   */
  delete(e, t) {
    return this._client.delete(`/user/tokens/${e}`, t)._thenUnwrap((s) => s.result);
  }
  /**
   * Get information about a specific token.
   */
  get(e, t) {
    return this._client.get(`/user/tokens/${e}`, t)._thenUnwrap((s) => s.result);
  }
  /**
   * Test whether a token works.
   */
  verify(e) {
    return this._client.get("/user/tokens/verify", e)._thenUnwrap((t) => t.result);
  }
}
Ot.PermissionGroups = Zo;
Ot.PermissionGroupListResponsesSinglePage = Co;
Ot.Value = Lp;
class se extends a {
  constructor() {
    super(...arguments), this.auditLogs = new Sp(this._client), this.billing = new kt(this._client), this.invites = new Ro(this._client), this.organizations = new vo(this._client), this.subscriptions = new Ap(this._client), this.tokens = new Ot(this._client);
  }
  /**
   * Edit part of your user details.
   */
  edit(e, t) {
    return this._client.patch("/user", { body: e, ...t })._thenUnwrap((s) => s.result);
  }
  /**
   * User Details
   */
  get(e) {
    return this._client.get("/user", e)._thenUnwrap((t) => t.result);
  }
}
se.AuditLogs = Sp;
se.Billing = kt;
se.Invites = Ro;
se.InvitesSinglePage = Lo;
se.Organizations = vo;
se.OrganizationsV4PagePaginationArray = Io;
se.Subscriptions = Ap;
se.Tokens = Ot;
class vp extends a {
  /**
   * Enable metadata filtering based on metadata property. Limited to 10 properties.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${e}/metadata_index/create`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Metadata Indexes for the specified Vectorize Index.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/vectorize/v2/indexes/${e}/metadata_index/list`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Allow Vectorize to delete the specified metadata index.
   */
  delete(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${e}/metadata_index/delete`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class sn extends a {
  constructor() {
    super(...arguments), this.metadataIndex = new vp(this._client);
  }
  /**
   * Creates and returns a new Vectorize Index.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/vectorize/v2/indexes`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a list of Vectorize Indexes
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/vectorize/v2/indexes`, Vo, t);
  }
  /**
   * Deletes the specified Vectorize Index.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/vectorize/v2/indexes/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a set of vectors from an index by their vector identifiers.
   */
  deleteByIds(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${e}/delete_by_ids`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified Vectorize Index.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/vectorize/v2/indexes/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a set of vectors from an index by their vector identifiers.
   */
  getByIds(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${e}/get_by_ids`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get information about a vectorize index.
   */
  info(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/vectorize/v2/indexes/${e}/info`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Inserts vectors into the specified index and returns a mutation id corresponding
   * to the vectors enqueued for insertion.
   */
  insert(e, t, s) {
    const { account_id: n, body: i, "unparsable-behavior": c } = t;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${e}/insert`, {
      query: { "unparsable-behavior": c },
      body: i,
      ...s,
      headers: { "Content-Type": "application/x-ndjson", ...s == null ? void 0 : s.headers }
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Finds vectors closest to a given vector in an index.
   */
  query(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${e}/query`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Upserts vectors into the specified index, creating them if they do not exist and
   * returns a mutation id corresponding to the vectors enqueued for upsertion.
   */
  upsert(e, t, s) {
    const { account_id: n, body: i, "unparsable-behavior": c } = t;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${e}/upsert`, {
      query: { "unparsable-behavior": c },
      body: i,
      ...s,
      headers: { "Content-Type": "application/x-ndjson", ...s == null ? void 0 : s.headers }
    })._thenUnwrap((o) => o.result);
  }
}
class Vo extends h {
}
sn.CreateIndicesSinglePage = Vo;
sn.MetadataIndex = vp;
class nn extends a {
  constructor() {
    super(...arguments), this.indexes = new sn(this._client);
  }
}
nn.Indexes = sn;
nn.CreateIndicesSinglePage = Vo;
class Ip extends a {
  /**
   * Creates a waiting room page preview. Upload a custom waiting room page for
   * preview. You will receive a preview URL in the form
   * `http://waitingrooms.dev/preview/<uuid>`. You can use the following query
   * parameters to change the state of the preview:
   *
   * 1. `force_queue`: Boolean indicating if all users will be queued in the waiting
   *    room and no one will be let into the origin website (also known as queueAll).
   * 2. `queue_is_full`: Boolean indicating if the waiting room's queue is currently
   *    full and not accepting new users at the moment.
   * 3. `queueing_method`: The queueing method currently used by the waiting room.
   *    - **fifo** indicates a FIFO queue.
   *    - **random** indicates a Random queue.
   *    - **passthrough** indicates a Passthrough queue. Keep in mind that the
   *      waiting room page will only be displayed if `force_queue=true` or
   *      `event=prequeueing` — for other cases the request will pass through to the
   *      origin. For our preview, this will be a fake origin website returning
   *      "Welcome".
   *    - **reject** indicates a Reject queue.
   * 4. `event`: Used to preview a waiting room event.
   *    - **none** indicates no event is occurring.
   *    - **prequeueing** indicates that an event is prequeueing (between
   *      `prequeue_start_time` and `event_start_time`).
   *    - **started** indicates that an event has started (between `event_start_time`
   *      and `event_end_time`).
   * 5. `shuffle_at_event_start`: Boolean indicating if the event will shuffle users
   *    in the prequeue when it starts. This can only be set to **true** if an event
   *    is active (`event` is not **none**).
   *
   * For example, you can make a request to
   * `http://waitingrooms.dev/preview/<uuid>?force_queue=false&queue_is_full=false&queueing_method=random&event=started&shuffle_at_event_start=true` 6.
   * `waitTime`: Non-zero, positive integer indicating the estimated wait time in
   * minutes. The default value is 10 minutes.
   *
   * For example, you can make a request to
   * `http://waitingrooms.dev/preview/<uuid>?waitTime=50` to configure the estimated
   * wait time as 50 minutes.
   */
  preview(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/waiting_rooms/preview`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
}
let To = class extends a {
  /**
   * Only available for the Waiting Room Advanced subscription. Creates a rule for a
   * waiting room.
   */
  create(e, t, s) {
    const { zone_id: n, rules: i } = t;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${e}/rules`, me, { body: i, method: "post", ...s });
  }
  /**
   * Only available for the Waiting Room Advanced subscription. Replaces all rules
   * for a waiting room.
   */
  update(e, t, s) {
    const { zone_id: n, rules: i } = t;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${e}/rules`, me, { body: i, method: "put", ...s });
  }
  /**
   * Deletes a rule for a waiting room.
   */
  delete(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.getAPIList(`/zones/${i}/waiting_rooms/${e}/rules/${t}`, me, { method: "delete", ...n });
  }
  /**
   * Patches a rule for a waiting room.
   */
  edit(e, t, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.getAPIList(`/zones/${i}/waiting_rooms/${e}/rules/${t}`, me, { body: c, method: "patch", ...n });
  }
  /**
   * Lists rules for a waiting room.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${e}/rules`, me, s);
  }
};
class me extends h {
}
To.WaitingRoomRulesSinglePage = me;
let kp = class extends a {
  /**
   * Update zone-level Waiting Room settings
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.put(`/zones/${s}/waiting_rooms/settings`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Patch zone-level Waiting Room settings
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/waiting_rooms/settings`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get zone-level Waiting Room settings
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/waiting_rooms/settings`, t)._thenUnwrap((n) => n.result);
  }
};
class Op extends a {
  /**
   * Fetches the status of a configured waiting room. Response fields include:
   *
   * 1. `status`: String indicating the status of the waiting room. The possible
   *    status are:
   *    - **not_queueing** indicates that the configured thresholds have not been met
   *      and all users are going through to the origin.
   *    - **queueing** indicates that the thresholds have been met and some users are
   *      held in the waiting room.
   *    - **event_prequeueing** indicates that an event is active and is currently
   *      prequeueing users before it starts.
   *    - **suspended** indicates that the room is suspended.
   * 2. `event_id`: String of the current event's `id` if an event is active,
   *    otherwise an empty string.
   * 3. `estimated_queued_users`: Integer of the estimated number of users currently
   *    waiting in the queue.
   * 4. `estimated_total_active_users`: Integer of the estimated number of users
   *    currently active on the origin.
   * 5. `max_estimated_time_minutes`: Integer of the maximum estimated time currently
   *    presented to the users.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/waiting_rooms/${e}/status`, s)._thenUnwrap((i) => i.result);
  }
}
class Zp extends a {
  /**
   * Previews an event's configuration as if it was active. Inherited fields from the
   * waiting room will be displayed with their current values.
   */
  get(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/waiting_rooms/${e}/events/${t}/details`, n)._thenUnwrap((c) => c.result);
  }
}
class rn extends a {
  constructor() {
    super(...arguments), this.details = new Zp(this._client);
  }
  /**
   * Only available for the Waiting Room Advanced subscription. Creates an event for
   * a waiting room. An event takes place during a specified period of time,
   * temporarily changing the behavior of a waiting room. While the event is active,
   * some of the properties in the event's configuration may either override or
   * inherit from the waiting room's configuration. Note that events cannot overlap
   * with each other, so only one event can be active at a time.
   */
  create(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.post(`/zones/${n}/waiting_rooms/${e}/events`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a configured event for a waiting room.
   */
  update(e, t, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.put(`/zones/${i}/waiting_rooms/${e}/events/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Lists events for a waiting room.
   */
  list(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${e}/events`, Do, { query: i, ...s });
  }
  /**
   * Deletes an event for a waiting room.
   */
  delete(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.delete(`/zones/${i}/waiting_rooms/${e}/events/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patches a configured event for a waiting room.
   */
  edit(e, t, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.patch(`/zones/${i}/waiting_rooms/${e}/events/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
  /**
   * Fetches a single configured event for a waiting room.
   */
  get(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/waiting_rooms/${e}/events/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Do extends p {
}
rn.EventsV4PagePaginationArray = Do;
rn.Details = Zp;
class oe extends a {
  constructor() {
    super(...arguments), this.page = new Ip(this._client), this.events = new rn(this._client), this.rules = new To(this._client), this.statuses = new Op(this._client), this.settings = new kp(this._client);
  }
  /**
   * Creates a new waiting room.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/waiting_rooms`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured waiting room.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/waiting_rooms/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists waiting rooms.
   */
  list(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/waiting_rooms`, em, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes a waiting room.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/waiting_rooms/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patches a configured waiting room.
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/waiting_rooms/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single configured waiting room.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/waiting_rooms/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class em extends p {
}
oe.Page = Ip;
oe.Events = rn;
oe.EventsV4PagePaginationArray = Do;
oe.Rules = To;
oe.WaitingRoomRulesSinglePage = me;
oe.Statuses = Op;
oe.Settings = kp;
let Cp = class extends a {
  /**
   * Create IPFS Universal Path Gateway Content List Entry
   */
  create(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.post(`/zones/${n}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Edit IPFS Universal Path Gateway Content List Entry
   */
  update(e, t, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.put(`/zones/${i}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries/${t}`, { body: c, ...n })._thenUnwrap((o) => o.result);
  }
  /**
   * List IPFS Universal Path Gateway Content List Entries
   */
  list(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Delete IPFS Universal Path Gateway Content List Entry
   */
  delete(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.delete(`/zones/${i}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries/${t}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * IPFS Universal Path Gateway Content List Entry Details
   */
  get(e, t, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class Eo extends a {
  constructor() {
    super(...arguments), this.entries = new Cp(this._client);
  }
  /**
   * Update IPFS Universal Path Gateway Content List
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/web3/hostnames/${e}/ipfs_universal_path/content_list`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * IPFS Universal Path Gateway Content List Details
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/web3/hostnames/${e}/ipfs_universal_path/content_list`, s)._thenUnwrap((i) => i.result);
  }
}
Eo.Entries = Cp;
class Yo extends a {
  constructor() {
    super(...arguments), this.contentLists = new Eo(this._client);
  }
}
Yo.ContentLists = Eo;
class cn extends a {
  constructor() {
    super(...arguments), this.ipfsUniversalPaths = new Yo(this._client);
  }
  /**
   * Create Web3 Hostname
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/web3/hostnames`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * List Web3 Hostnames
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/web3/hostnames`, Fo, t);
  }
  /**
   * Delete Web3 Hostname
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/web3/hostnames/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Edit Web3 Hostname
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/web3/hostnames/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Web3 Hostname Details
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/web3/hostnames/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Fo extends h {
}
cn.HostnamesSinglePage = Fo;
cn.IPFSUniversalPaths = Yo;
class an extends a {
  constructor() {
    super(...arguments), this.hostnames = new cn(this._client);
  }
}
an.Hostnames = cn;
an.HostnamesSinglePage = Fo;
class Vp extends a {
  /**
   * Creates Worker account settings for an account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/workers/account-settings`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches Worker account settings for an account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/workers/account-settings`, t)._thenUnwrap((n) => n.result);
  }
}
class Go extends a {
  /**
   * Attaches a Worker to a zone and hostname.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/workers/domains`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all Worker Domains for an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/workers/domains`, Bo, {
      query: n,
      ...t
    });
  }
  /**
   * Detaches a Worker from a zone and hostname.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/workers/domains/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Gets a Worker domain.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/domains/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Bo extends h {
}
Go.DomainsSinglePage = Bo;
let No = class extends a {
  /**
   * Creates a route that maps a URL pattern to a Worker.
   */
  create(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.post(`/zones/${s}/workers/routes`, { body: n, ...t });
  }
  /**
   * Updates the URL pattern or Worker associated with a route.
   */
  update(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.put(`/zones/${n}/workers/routes/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns routes for a zone.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/workers/routes`, Mo, t);
  }
  /**
   * Deletes a route.
   */
  delete(e, t, s) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/workers/routes/${e}`, s);
  }
  /**
   * Returns information about a route, including URL pattern and Worker.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/workers/routes/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Mo extends h {
}
No.RouteListResponsesSinglePage = Mo;
class Tp extends a {
  /**
   * Creates a Workers subdomain for an account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/workers/subdomain`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a Workers subdomain for an account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/workers/subdomain`, t)._thenUnwrap((n) => n.result);
  }
}
let Dp = class extends a {
  /**
   * Upload assets ahead of creating a Worker version. To learn more about the direct
   * uploads of assets, see
   * https://developers.cloudflare.com/workers/static-assets/direct-upload/
   */
  create(e, t) {
    const { account_id: s, base64: n, ...i } = e;
    return this._client.post(`/accounts/${s}/workers/assets/upload`, R({ query: { base64: n }, body: i, ...t }))._thenUnwrap((c) => c.result);
  }
}, Ko = class extends a {
  constructor() {
    super(...arguments), this.upload = new Dp(this._client);
  }
};
Ko.Upload = Dp;
let Ep = class extends a {
  /**
   * Put script content without touching config or metadata
   */
  update(e, t, s) {
    const { account_id: n, "CF-WORKER-BODY-PART": i, "CF-WORKER-MAIN-MODULE-PART": c, ...o } = t;
    return this._client.put(`/accounts/${n}/workers/scripts/${e}/content`, R({
      body: o,
      ...s,
      headers: {
        ...i != null ? { "CF-WORKER-BODY-PART": i } : void 0,
        ...c != null ? { "CF-WORKER-MAIN-MODULE-PART": c } : void 0,
        ...s == null ? void 0 : s.headers
      }
    }))._thenUnwrap((l) => l.result);
  }
  /**
   * Fetch script content only
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/scripts/${e}/content/v2`, {
      ...s,
      headers: { Accept: "string", ...s == null ? void 0 : s.headers },
      __binaryResponse: !0
    });
  }
};
class Yp extends a {
  /**
   * Deployments configure how
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions)
   * are deployed to traffic. A deployment can consist of one or two versions of a
   * Worker.
   */
  create(e, t, s) {
    const { account_id: n, force: i, ...c } = t;
    return this._client.post(`/accounts/${n}/workers/scripts/${e}/deployments`, {
      query: { force: i },
      body: c,
      ...s
    })._thenUnwrap((o) => o.result);
  }
  /**
   * List of Worker Deployments. The first deployment in the list is the latest
   * deployment actively serving traffic.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/scripts/${e}/deployments`, s)._thenUnwrap((i) => i.result);
  }
}
class Fp extends a {
  /**
   * Updates Cron Triggers for a Worker.
   */
  update(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.put(`/accounts/${n}/workers/scripts/${e}/schedules`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Cron Triggers for a Worker.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/scripts/${e}/schedules`, s)._thenUnwrap((i) => i.result);
  }
}
let Gp = class extends a {
  /**
   * Patch script-level settings when using
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions).
   * Including but not limited to Logpush and Tail Consumers.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/workers/scripts/${e}/script-settings`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get script-level settings when using
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions).
   * Includes Logpush and Tail Consumers.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/scripts/${e}/script-settings`, s)._thenUnwrap((i) => i.result);
  }
};
class Bp extends a {
  /**
   * Enable or disable the Worker on the workers.dev subdomain.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/workers/scripts/${e}/subdomain`, {
      body: i,
      ...s
    });
  }
  /**
   * Get if the Worker is available on the workers.dev subdomain.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/scripts/${e}/subdomain`, s);
  }
}
class Np extends a {
  /**
   * Starts a tail that receives logs and exception from a Worker.
   */
  create(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/workers/scripts/${e}/tails`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a tail from a Worker.
   */
  delete(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/workers/scripts/${e}/tails/${t}`, n);
  }
  /**
   * Get list of tails currently deployed on a Worker.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/scripts/${e}/tails`, s)._thenUnwrap((i) => i.result);
  }
}
let Wo = class extends a {
  /**
   * Upload a Worker Version without deploying to Cloudflare's network. You can find
   * more about the multipart metadata on our docs:
   * https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/workers/scripts/${e}/versions`, R({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
  /**
   * List of Worker Versions. The first version in the list is the latest version.
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/workers/scripts/${e}/versions`, jo, { query: i, ...s });
  }
  /**
   * Get Version Detail
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/scripts/${e}/versions/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class jo extends F {
}
Wo.VersionListResponsesV4PagePagination = jo;
let Mp = class extends a {
  /**
   * Start uploading a collection of assets for use in a Worker version. To learn
   * more about the direct uploads of assets, see
   * https://developers.cloudflare.com/workers/static-assets/direct-upload/
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/workers/scripts/${e}/assets-upload-session`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class Ho extends a {
  constructor() {
    super(...arguments), this.upload = new Mp(this._client);
  }
}
Ho.Upload = Mp;
let T = class extends a {
  constructor() {
    super(...arguments), this.assets = new Ho(this._client), this.subdomain = new Bp(this._client), this.schedules = new Fp(this._client), this.tail = new Np(this._client), this.content = new Ep(this._client), this.settings = new Gp(this._client), this.deployments = new Yp(this._client), this.versions = new Wo(this._client);
  }
  /**
   * Upload a worker module. You can find more about the multipart metadata on our
   * docs:
   * https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/workers/scripts/${e}`, Tn({
      body: i,
      ...s,
      headers: { "Content-Type": "application/javascript", ...s == null ? void 0 : s.headers }
    }))._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a list of uploaded workers.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/workers/scripts`, Xo, t);
  }
  /**
   * Delete your worker. This call has no response body on a successful delete.
   */
  delete(e, t, s) {
    const { account_id: n, force: i } = t;
    return this._client.delete(`/accounts/${n}/workers/scripts/${e}`, {
      query: { force: i },
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Fetch raw script content for your worker. Note this is the original script
   * content, not JSON encoded.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/scripts/${e}`, {
      ...s,
      headers: { Accept: "application/javascript", ...s == null ? void 0 : s.headers }
    });
  }
};
class Xo extends h {
}
T.ScriptsSinglePage = Xo;
T.Assets = Ho;
T.Subdomain = Bp;
T.Schedules = Fp;
T.Tail = Np;
T.Content = Ep;
T.Settings = Gp;
T.Deployments = Yp;
T.Versions = Wo;
T.VersionListResponsesV4PagePagination = jo;
class M extends a {
  constructor() {
    super(...arguments), this.routes = new No(this._client), this.assets = new Ko(this._client), this.scripts = new T(this._client), this.accountSettings = new Vp(this._client), this.domains = new Go(this._client), this.subdomains = new Tp(this._client);
  }
}
M.Routes = No;
M.RouteListResponsesSinglePage = Mo;
M.Assets = Ko;
M.Scripts = T;
M.ScriptsSinglePage = Xo;
M.AccountSettings = Vp;
M.Domains = Go;
M.DomainsSinglePage = Bo;
M.Subdomains = Tp;
class Kp extends a {
  /**
   * Start uploading a collection of assets for use in a Worker version. To learn
   * more about the direct uploads of assets, see
   * https://developers.cloudflare.com/workers/static-assets/direct-upload/
   */
  create(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.post(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/assets-upload-session`, { body: c, ...n })._thenUnwrap((o) => o.result);
  }
}
class Qo extends a {
  /**
   * Fetch script bindings from a script uploaded to a Workers for Platforms
   * namespace.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/bindings`, Jo, n);
  }
}
class Jo extends h {
}
Qo.BindingGetResponsesSinglePage = Jo;
class Wp extends a {
  /**
   * Put script content for a script uploaded to a Workers for Platforms namespace.
   */
  update(e, t, s, n) {
    const { account_id: i, "CF-WORKER-BODY-PART": c, "CF-WORKER-MAIN-MODULE-PART": o, ...l } = s;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/content`, R({
      body: l,
      ...n,
      headers: {
        ...c != null ? { "CF-WORKER-BODY-PART": c } : void 0,
        ...o != null ? { "CF-WORKER-MAIN-MODULE-PART": o } : void 0,
        ...n == null ? void 0 : n.headers
      }
    }))._thenUnwrap((g) => g.result);
  }
  /**
   * Fetch script content from a script uploaded to a Workers for Platforms
   * namespace.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/content`, { ...n, headers: { Accept: "string", ...n == null ? void 0 : n.headers }, __binaryResponse: !0 });
  }
}
class qo extends a {
  /**
   * Put secrets to a script uploaded to a Workers for Platforms namespace.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/secrets`, { body: c, ...n })._thenUnwrap((o) => o.result);
  }
  /**
   * List secrets from a script uploaded to a Workers for Platforms namespace.
   */
  list(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/secrets`, eu, n);
  }
  /**
   * Get secret from a script uploaded to a Workers for Platforms namespace.
   */
  get(e, t, s, n, i) {
    const { account_id: c } = n;
    return this._client.get(`/accounts/${c}/workers/dispatch/namespaces/${e}/scripts/${t}/secrets/${s}`, i)._thenUnwrap((o) => o.result);
  }
}
class eu extends h {
}
qo.SecretListResponsesSinglePage = eu;
let jp = class extends a {
  /**
   * Patch script metadata, such as bindings
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/settings`, R({ body: c, ...n }))._thenUnwrap((o) => o.result);
  }
  /**
   * Get script settings from a script uploaded to a Workers for Platforms namespace.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/settings`, n)._thenUnwrap((c) => c.result);
  }
}, on = class extends a {
  /**
   * Put script tags for a script uploaded to a Workers for Platforms namespace.
   */
  update(e, t, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/tags`, tu, { body: c, method: "put", ...n });
  }
  /**
   * Fetch tags from a script uploaded to a Workers for Platforms namespace.
   */
  list(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}/tags`, su, n);
  }
  /**
   * Delete script tag for a script uploaded to a Workers for Platforms namespace.
   */
  delete(e, t, s, n, i) {
    const { account_id: c } = n;
    return this._client.delete(`/accounts/${c}/workers/dispatch/namespaces/${e}/scripts/${t}/tags/${s}`, i)._thenUnwrap((o) => o.result);
  }
};
class tu extends h {
}
class su extends h {
}
on.TagUpdateResponsesSinglePage = tu;
on.TagListResponsesSinglePage = su;
class D extends a {
  constructor() {
    super(...arguments), this.assetUpload = new Kp(this._client), this.content = new Wp(this._client), this.settings = new jp(this._client), this.bindings = new Qo(this._client), this.secrets = new qo(this._client), this.tags = new on(this._client);
  }
  /**
   * Upload a worker module to a Workers for Platforms namespace. You can find more
   * about the multipart metadata on our docs:
   * https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.
   */
  update(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}`, Tn({
      body: c,
      ...n,
      headers: { "Content-Type": "application/javascript", ...n == null ? void 0 : n.headers }
    }))._thenUnwrap((o) => o.result);
  }
  /**
   * Delete a worker from a Workers for Platforms namespace. This call has no
   * response body on a successful delete.
   */
  delete(e, t, s, n) {
    const { account_id: i, force: c } = s;
    return this._client.delete(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}`, { query: { force: c }, ...n, headers: { Accept: "*/*", ...n == null ? void 0 : n.headers } });
  }
  /**
   * Fetch information about a script uploaded to a Workers for Platforms namespace.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${e}/scripts/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
D.AssetUpload = Kp;
D.Content = Wp;
D.Settings = jp;
D.Bindings = Qo;
D.BindingGetResponsesSinglePage = Jo;
D.Secrets = qo;
D.SecretListResponsesSinglePage = eu;
D.Tags = on;
D.TagUpdateResponsesSinglePage = tu;
D.TagListResponsesSinglePage = su;
class un extends a {
  constructor() {
    super(...arguments), this.scripts = new D(this._client);
  }
  /**
   * Create a new Workers for Platforms namespace.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/workers/dispatch/namespaces`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a list of Workers for Platforms namespaces.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/workers/dispatch/namespaces`, nu, t);
  }
  /**
   * Delete a Workers for Platforms namespace.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/workers/dispatch/namespaces/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a Workers for Platforms namespace.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/dispatch/namespaces/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class nu extends h {
}
un.NamespaceListResponsesSinglePage = nu;
un.Scripts = D;
class ln extends a {
  constructor() {
    super(...arguments), this.namespaces = new un(this._client);
  }
}
ln.Namespaces = un;
ln.NamespaceListResponsesSinglePage = nu;
class iu extends a {
  constructor() {
    super(...arguments), this.dispatch = new ln(this._client);
  }
}
iu.Dispatch = ln;
let ru = class extends a {
  /**
   * List deployed Workflow versions
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/workflows/${e}/versions`, cu, { query: i, ...s });
  }
  /**
   * Get Workflow version details
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workflows/${e}/versions/${t}`, n)._thenUnwrap((c) => c.result);
  }
};
class cu extends p {
}
ru.VersionListResponsesV4PagePaginationArray = cu;
class Hp extends a {
  /**
   * Change status of instance
   */
  edit(e, t, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/workflows/${e}/instances/${t}/status`, {
      body: c,
      ...n
    })._thenUnwrap((o) => o.result);
  }
}
class dn extends a {
  constructor() {
    super(...arguments), this.status = new Hp(this._client);
  }
  /**
   * Create a new workflow instance
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/workflows/${e}/instances`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List of workflow instances
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/workflows/${e}/instances`, au, { query: i, ...s });
  }
  /**
   * Get logs and status from instance
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workflows/${e}/instances/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class au extends p {
}
dn.InstanceListResponsesV4PagePaginationArray = au;
dn.Status = Hp;
class qe extends a {
  constructor() {
    super(...arguments), this.instances = new dn(this._client), this.versions = new ru(this._client);
  }
  /**
   * Create/modify Workflow
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/workflows/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all Workflows
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/workflows`, tm, { query: n, ...t });
  }
  /**
   * Get Workflow details
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workflows/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class tm extends p {
}
qe.Instances = dn;
qe.InstanceListResponsesV4PagePaginationArray = au;
qe.Versions = ru;
qe.VersionListResponsesV4PagePaginationArray = cu;
class Xp extends a {
  /**
   * Updates the Zero Trust Connectivity Settings for the given account.
   */
  edit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.patch(`/accounts/${s}/zerotrust/connectivity_settings`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the Zero Trust Connectivity Settings for the given account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/zerotrust/connectivity_settings`, t)._thenUnwrap((n) => n.result);
  }
}
class ou extends a {
  /**
   * Removes a user from a Zero Trust seat when both `access_seat` and `gateway_seat`
   * are set to false.
   */
  edit(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.getAPIList(`/accounts/${s}/access/seats`, uu, {
      body: n,
      method: "patch",
      ...t
    });
  }
}
class uu extends h {
}
ou.SeatsSinglePage = uu;
class lu extends a {
  /**
   * Create a new Bookmark application.
   */
  create(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/access/bookmarks/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a configured Bookmark application.
   */
  update(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.put(`/accounts/${n}/access/bookmarks/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Bookmark applications.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/access/bookmarks`, du, t);
  }
  /**
   * Deletes a Bookmark application.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/access/bookmarks/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Bookmark application.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/access/bookmarks/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class du extends h {
}
lu.BookmarksSinglePage = du;
class hu extends a {
  /**
   * Create a custom page
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/access/custom_pages`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a custom page
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/access/custom_pages/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List custom pages
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/access/custom_pages`, _u, t);
  }
  /**
   * Delete a custom page
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/access/custom_pages/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a custom page and also returns its HTML.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/access/custom_pages/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class _u extends h {
}
hu.CustomPageWithoutHTMLsSinglePage = _u;
class gu extends a {
  /**
   * Adds a new SSH Certificate Authority (CA).
   */
  create(e, t) {
    const { account_id: s } = e;
    return this._client.post(`/accounts/${s}/access/gateway_ca`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Lists SSH Certificate Authorities (CA).
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/access/gateway_ca`, pu, t);
  }
  /**
   * Deletes an SSH Certificate Authority.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/access/gateway_ca/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class pu extends h {
}
gu.GatewayCAListResponsesSinglePage = pu;
let wu = class extends a {
  /**
   * Creates a new Access group.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/access/groups`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured Access group.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/access/groups/${e}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/access/groups`, $u, { query: i, ...t });
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/access/groups/${e}`, s)._thenUnwrap((l) => l.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/access/groups/${e}`, s)._thenUnwrap((l) => l.result);
  }
};
class $u extends h {
}
class sm extends h {
}
wu.GroupListResponsesSinglePage = $u;
class Qp extends a {
  /**
   * Updates the Access key rotation settings for an account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/access/keys`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the Access key rotation settings for an account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/access/keys`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Perfoms a key rotation for an account.
   */
  rotate(e, t) {
    const { account_id: s } = e;
    return this._client.post(`/accounts/${s}/access/keys/rotate`, t)._thenUnwrap((n) => n.result);
  }
}
let mu = class extends a {
  /**
   * Creates a new Access reusable policy.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/access/policies`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a Access reusable policy.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/access/policies/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Access reusable policies.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/access/policies`, yu, t);
  }
  /**
   * Deletes an Access reusable policy.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/access/policies/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Access reusable policy.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/access/policies/${e}`, s)._thenUnwrap((i) => i.result);
  }
}, yu = class extends h {
};
mu.PolicyListResponsesSinglePage = yu;
class fu extends a {
  /**
   * Generates a new service token. **Note:** This is the only time you can get the
   * Client Secret. If you lose the Client Secret, you will have to rotate the Client
   * Secret or create a new service token.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/access/service_tokens`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured service token.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/access/service_tokens/${e}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/access/service_tokens`, Pu, { query: i, ...t });
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/access/service_tokens/${e}`, s)._thenUnwrap((l) => l.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/access/service_tokens/${e}`, s)._thenUnwrap((l) => l.result);
  }
  /**
   * Refreshes the expiration of a service token.
   */
  refresh(e, t, s) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/access/service_tokens/${e}/refresh`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Generates a new Client Secret for a service token and revokes the old one.
   */
  rotate(e, t, s) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/access/service_tokens/${e}/rotate`, s)._thenUnwrap((i) => i.result);
  }
}
class Pu extends h {
}
fu.ServiceTokensSinglePage = Pu;
class Uu extends a {
  /**
   * Create a tag
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/access/tags`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a tag
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/access/tags/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List tags
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/access/tags`, bu, t);
  }
  /**
   * Delete a tag
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/access/tags/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a tag
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/access/tags/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class bu extends h {
}
Uu.TagsSinglePage = bu;
class xu extends a {
  create(e, t = {}, s) {
    if (u(t))
      return this.create(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${c}/${o}/access/apps/${e}/ca`, s)._thenUnwrap((l) => l.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/access/apps/ca`, zu, t);
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/access/apps/${e}/ca`, s)._thenUnwrap((l) => l.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/access/apps/${e}/ca`, s)._thenUnwrap((l) => l.result);
  }
}
class zu extends h {
}
xu.CAsSinglePage = zu;
let Su = class extends a {
  /**
   * Creates a policy applying exclusive to a single application that defines the
   * users or groups who can reach it. We recommend creating a reusable policy
   * instead and subsequently referencing its ID in the application's 'policies'
   * array.
   */
  create(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${o}/${l}/access/apps/${e}/policies`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  /**
   * Updates an Access policy specific to an application. To update a reusable
   * policy, use the /account or zones/{account or zone_id}/policies/{uid} endpoint.
   */
  update(e, t, s, n) {
    const { account_id: i, zone_id: c, ...o } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: l, accountOrZoneId: g } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.put(`/${l}/${g}/access/apps/${e}/policies/${t}`, {
      body: o,
      ...n
    })._thenUnwrap(($) => $.result);
  }
  list(e, t = {}, s) {
    if (u(t))
      return this.list(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${o}/access/apps/${e}/policies`, Au, s);
  }
  delete(e, t, s = {}, n) {
    if (u(s))
      return this.delete(e, t, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${o}/${l}/access/apps/${e}/policies/${t}`, n)._thenUnwrap((g) => g.result);
  }
  get(e, t, s = {}, n) {
    if (u(s))
      return this.get(e, t, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${o}/${l}/access/apps/${e}/policies/${t}`, n)._thenUnwrap((g) => g.result);
  }
};
class Au extends h {
}
Su.PolicyListResponsesSinglePage = Au;
class Jp extends a {
  list(e, t = {}, s) {
    if (u(t))
      return this.list(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/access/apps/${e}/user_policy_checks`, s)._thenUnwrap((l) => l.result);
  }
}
let Ru = class extends a {
  /**
   * Fetches a single page of user results from an Access policy test.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/policy-tests/${e}/users`, Lu, s);
  }
}, Lu = class extends h {
};
Ru.UserListResponsesSinglePage = Lu;
class hn extends a {
  constructor() {
    super(...arguments), this.users = new Ru(this._client);
  }
  /**
   * Starts an Access policy test.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/access/policy-tests`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current status of a given Access policy test.
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/access/policy-tests/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
hn.Users = Ru;
hn.UserListResponsesSinglePage = Lu;
class ue extends a {
  constructor() {
    super(...arguments), this.cas = new xu(this._client), this.userPolicyChecks = new Jp(this._client), this.policies = new Su(this._client), this.policyTests = new hn(this._client);
  }
  /**
   * Adds a new application to Access.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/access/apps`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an Access application.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/access/apps/${e}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/access/apps`, vu, { query: i, ...t });
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/access/apps/${e}`, s)._thenUnwrap((l) => l.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/access/apps/${e}`, s)._thenUnwrap((l) => l.result);
  }
  revokeTokens(e, t = {}, s) {
    if (u(t))
      return this.revokeTokens(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${c}/${o}/access/apps/${e}/revoke_tokens`, s)._thenUnwrap((l) => l.result);
  }
}
class vu extends h {
}
ue.ApplicationListResponsesSinglePage = vu;
ue.CAs = xu;
ue.CAsSinglePage = zu;
ue.UserPolicyChecks = Jp;
ue.Policies = Su;
ue.PolicyListResponsesSinglePage = Au;
ue.PolicyTests = hn;
let Iu = class extends a {
  /**
   * Updates an mTLS certificate's hostname settings.
   */
  update(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/access/certificates/settings`, Qt, { body: i, method: "put", ...t });
  }
  get(e = {}, t) {
    if (u(e))
      return this.get({}, e);
    const { account_id: s, zone_id: n } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/access/certificates/settings`, Qt, t);
  }
};
class Qt extends h {
}
Iu.CertificateSettingsSinglePage = Qt;
let Zt = class extends a {
  constructor() {
    super(...arguments), this.settings = new Iu(this._client);
  }
  /**
   * Adds a new mTLS root certificate to Access.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/access/certificates`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured mTLS certificate.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/access/certificates/${e}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/access/certificates`, ku, t);
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/access/certificates/${e}`, s)._thenUnwrap((l) => l.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/access/certificates/${e}`, s)._thenUnwrap((l) => l.result);
  }
};
class ku extends h {
}
Zt.CertificatesSinglePage = ku;
Zt.Settings = Iu;
Zt.CertificateSettingsSinglePage = Qt;
class Ou extends a {
  /**
   * Create new target
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/infrastructure/targets`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update target
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/infrastructure/targets/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists and sorts an account’s targets. Filters are optional and are ANDed
   * together.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/infrastructure/targets`, Zu, { query: n, ...t });
  }
  /**
   * Delete target
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/infrastructure/targets/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Removes one or more targets.
   */
  bulkDelete(e, t) {
    const { account_id: s } = e;
    return this._client.delete(`/accounts/${s}/infrastructure/targets/batch`, {
      ...t,
      headers: { Accept: "*/*", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Adds one or more targets.
   */
  bulkUpdate(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.put(`/accounts/${s}/infrastructure/targets/batch`, {
      body: n,
      ...t
    });
  }
  /**
   * Get target
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/infrastructure/targets/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Zu extends p {
}
Ou.TargetListResponsesV4PagePaginationArray = Zu;
class _n extends a {
  constructor() {
    super(...arguments), this.targets = new Ou(this._client);
  }
}
_n.Targets = Ou;
_n.TargetListResponsesV4PagePaginationArray = Zu;
class qp extends a {
  /**
   * Gets a list of Access authentication audit logs for an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/access/logs/access_requests`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class Cu extends a {
  /**
   * Lists Access SCIM update logs that maintain a record of updates made to User and
   * Group resources synced to Cloudflare via the System for Cross-domain Identity
   * Management (SCIM).
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/access/logs/scim/updates`, Vu, { query: n, ...t });
  }
}
class Vu extends h {
}
Cu.UpdateListResponsesSinglePage = Vu;
let gn = class extends a {
  constructor() {
    super(...arguments), this.updates = new Cu(this._client);
  }
};
gn.Updates = Cu;
gn.UpdateListResponsesSinglePage = Vu;
class pn extends a {
  constructor() {
    super(...arguments), this.accessRequests = new qp(this._client), this.scim = new gn(this._client);
  }
}
pn.AccessRequests = qp;
pn.SCIM = gn;
class Tu extends a {
  /**
   * Get active sessions for a single user.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/users/${e}/active_sessions`, Du, s);
  }
  /**
   * Get an active session for a single user.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/access/users/${e}/active_sessions/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Du extends h {
}
Tu.ActiveSessionListResponsesSinglePage = Du;
class Eu extends a {
  /**
   * Get all failed login attempts for a single user.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/users/${e}/failed_logins`, Yu, s);
  }
}
class Yu extends h {
}
Eu.FailedLoginListResponsesSinglePage = Yu;
class ew extends a {
  /**
   * Get last seen identity for a single user.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/access/users/${e}/last_seen_identity`, s)._thenUnwrap((i) => i.result);
  }
}
let we = class extends a {
  constructor() {
    super(...arguments), this.activeSessions = new Tu(this._client), this.lastSeenIdentity = new ew(this._client), this.failedLogins = new Eu(this._client);
  }
  /**
   * Gets a list of users for an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/access/users`, Fu, {
      query: n,
      ...t
    });
  }
};
class Fu extends h {
}
class nm extends h {
}
we.UserListResponsesSinglePage = Fu;
we.ActiveSessions = Tu;
we.ActiveSessionListResponsesSinglePage = Du;
we.LastSeenIdentity = ew;
we.FailedLogins = Eu;
we.FailedLoginListResponsesSinglePage = Yu;
class y extends a {
  constructor() {
    super(...arguments), this.gatewayCA = new gu(this._client), this.infrastructure = new _n(this._client), this.applications = new ue(this._client), this.certificates = new Zt(this._client), this.groups = new wu(this._client), this.serviceTokens = new fu(this._client), this.bookmarks = new lu(this._client), this.keys = new Qp(this._client), this.logs = new pn(this._client), this.users = new we(this._client), this.customPages = new hu(this._client), this.tags = new Uu(this._client), this.policies = new mu(this._client);
  }
}
y.GatewayCA = gu;
y.GatewayCAListResponsesSinglePage = pu;
y.Infrastructure = _n;
y.Applications = ue;
y.ApplicationListResponsesSinglePage = vu;
y.Certificates = Zt;
y.CertificatesSinglePage = ku;
y.Groups = wu;
y.GroupListResponsesSinglePage = $u;
y.ServiceTokens = fu;
y.ServiceTokensSinglePage = Pu;
y.Bookmarks = lu;
y.BookmarksSinglePage = du;
y.Keys = Qp;
y.Logs = pn;
y.Users = we;
y.UserListResponsesSinglePage = Fu;
y.CustomPages = hu;
y.CustomPageWithoutHTMLsSinglePage = _u;
y.Tags = Uu;
y.TagsSinglePage = bu;
y.Policies = mu;
y.PolicyListResponsesSinglePage = yu;
class Gu extends a {
  /**
   * Create a DEX test.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/devices/dex_tests`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a DEX test.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/devices/dex_tests/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch all DEX tests.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/dex_tests`, Bu, t);
  }
  /**
   * Delete a Device DEX test. Returns the remaining device dex tests for the
   * account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/devices/dex_tests/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a single DEX test.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/dex_tests/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Bu extends h {
}
Gu.SchemaHTTPSSinglePage = Bu;
let tw = class extends a {
  /**
   * Get the live status of a latest device given device_id from the device_state
   * table
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dex/devices/${e}/fleet-status/live`, {
      query: i,
      ...s
    });
  }
}, Nu = class extends a {
  /**
   * Creates a new device managed network.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/devices/networks`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured device managed network.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/devices/networks/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a list of managed networks for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/networks`, Jt, t);
  }
  /**
   * Deletes a device managed network and fetches a list of the remaining device
   * managed networks for an account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/networks/${e}`, Jt, { method: "delete", ...s });
  }
  /**
   * Fetches details for a single managed network.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/networks/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Jt extends h {
}
Nu.DeviceNetworksSinglePage = Jt;
class sw extends a {
  /**
   * Fetches a one-time use admin override code for a device. This relies on the
   * **Admin Override** setting being enabled in your device configuration.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/${e}/override_codes`, s)._thenUnwrap((i) => i.result);
  }
}
class nw extends a {
  /**
   * Revokes a list of devices.
   */
  create(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.post(`/accounts/${s}/devices/revoke`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
let iw = class extends a {
  /**
   * Updates the current device settings for a Zero Trust account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/devices/settings`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Describes the current device settings for a Zero Trust account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/devices/settings`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Patches the current device settings for a Zero Trust account.
   */
  edit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.patch(`/accounts/${s}/devices/settings`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
};
class rw extends a {
  /**
   * Unrevokes a list of devices.
   */
  create(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.post(`/accounts/${s}/devices/unrevoke`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
let cw = class extends a {
  /**
   * Sets the list of routes excluded from the WARP client's tunnel for a specific
   * device settings profile.
   */
  update(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${e}/exclude`, qt, { body: i, method: "put", ...s });
  }
  /**
   * Fetches the list of routes excluded from the WARP client's tunnel for a specific
   * device settings profile.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${e}/exclude`, qt, s);
  }
}, aw = class extends a {
  /**
   * Sets the list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead. This will only apply to the
   * specified device settings profile.
   */
  update(e, t, s) {
    const { account_id: n, domains: i } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${e}/fallback_domains`, ts, { body: i, method: "put", ...s });
  }
  /**
   * Fetches the list of domains to bypass Gateway DNS resolution from a specified
   * device settings profile. These domains will use the specified local DNS resolver
   * instead.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${e}/fallback_domains`, ts, s);
  }
}, ow = class extends a {
  /**
   * Sets the list of routes included in the WARP client's tunnel for a specific
   * device settings profile.
   */
  update(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${e}/include`, es, { body: i, method: "put", ...s });
  }
  /**
   * Fetches the list of routes included in the WARP client's tunnel for a specific
   * device settings profile.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${e}/include`, es, s);
  }
}, Ct = class extends a {
  constructor() {
    super(...arguments), this.excludes = new cw(this._client), this.includes = new ow(this._client), this.fallbackDomains = new aw(this._client);
  }
  /**
   * Creates a device settings profile to be applied to certain devices matching the
   * criteria.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/devices/policy`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a list of the device settings profiles for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/policies`, sd, t);
  }
  /**
   * Deletes a device settings profile and fetches a list of the remaining profiles
   * for an account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${e}`, sd, { method: "delete", ...s });
  }
  /**
   * Updates a configured device settings profile.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/devices/policy/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a device settings profile by ID.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/policy/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
Ct.Excludes = cw;
Ct.Includes = ow;
Ct.FallbackDomains = aw;
let uw = class extends a {
  /**
   * Enable Zero Trust Clients to provision a certificate, containing a x509 subject,
   * and referenced by Access device posture policies when the client visits MTLS
   * protected domains. This facilitates device posture without a WARP session.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/devices/policy/certificates`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches device certificate provisioning
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/devices/policy/certificates`, t)._thenUnwrap((n) => n.result);
  }
};
class lw extends a {
  /**
   * Sets the list of routes excluded from the WARP client's tunnel.
   */
  update(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/exclude`, qt, { body: n, method: "put", ...t });
  }
  /**
   * Fetches the list of routes excluded from the WARP client's tunnel.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/exclude`, qt, t);
  }
}
class dw extends a {
  /**
   * Sets the list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead.
   */
  update(e, t) {
    const { account_id: s, domains: n } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/fallback_domains`, ts, { body: n, method: "put", ...t });
  }
  /**
   * Fetches a list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/fallback_domains`, ts, t);
  }
}
class hw extends a {
  /**
   * Sets the list of routes included in the WARP client's tunnel.
   */
  update(e, t) {
    const { account_id: s, body: n } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/include`, es, { body: n, method: "put", ...t });
  }
  /**
   * Fetches the list of routes included in the WARP client's tunnel.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/include`, es, t);
  }
}
class et extends a {
  constructor() {
    super(...arguments), this.excludes = new lw(this._client), this.includes = new hw(this._client), this.fallbackDomains = new dw(this._client), this.certificates = new uw(this._client);
  }
  /**
   * Updates the default device settings profile for an account.
   */
  edit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.patch(`/accounts/${s}/devices/policy`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the default device settings profile for an account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/devices/policy`, t)._thenUnwrap((n) => n.result);
  }
}
et.Excludes = lw;
et.Includes = hw;
et.FallbackDomains = dw;
et.Certificates = uw;
class wn extends a {
  constructor() {
    super(...arguments), this.default = new et(this._client), this.custom = new Ct(this._client);
  }
}
class qt extends h {
}
class es extends h {
}
class ts extends h {
}
class sd extends h {
}
wn.Default = et;
wn.Custom = Ct;
let Mu = class extends a {
  /**
   * Create a new device posture integration.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/devices/posture/integration`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the list of device posture integrations for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/posture/integration`, Ku, t);
  }
  /**
   * Delete a configured device posture integration.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/devices/posture/integration/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured device posture integration.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/devices/posture/integration/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches details for a single device posture integration.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/posture/integration/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Ku extends h {
}
Mu.IntegrationsSinglePage = Ku;
class Vt extends a {
  constructor() {
    super(...arguments), this.integrations = new Mu(this._client);
  }
  /**
   * Creates a new device posture rule.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/devices/posture`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a device posture rule.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/devices/posture/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches device posture rules for a Zero Trust account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices/posture`, Wu, t);
  }
  /**
   * Deletes a device posture rule.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/devices/posture/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single device posture rule.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/posture/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Wu extends h {
}
Vt.DevicePostureRulesSinglePage = Wu;
Vt.Integrations = Mu;
Vt.IntegrationsSinglePage = Ku;
let k = class extends a {
  constructor() {
    super(...arguments), this.dexTests = new Gu(this._client), this.networks = new Nu(this._client), this.fleetStatus = new tw(this._client), this.policies = new wn(this._client), this.posture = new Vt(this._client), this.revoke = new nw(this._client), this.settings = new iw(this._client), this.unrevoke = new rw(this._client), this.overrideCodes = new sw(this._client);
  }
  /**
   * Fetches a list of enrolled devices.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/devices`, ju, t);
  }
  /**
   * Fetches details for a single device.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class ju extends h {
}
k.DevicesSinglePage = ju;
k.DEXTests = Gu;
k.SchemaHTTPSSinglePage = Bu;
k.Networks = Nu;
k.DeviceNetworksSinglePage = Jt;
k.FleetStatus = tw;
k.Policies = wn;
k.Posture = Vt;
k.DevicePostureRulesSinglePage = Wu;
k.Revoke = nw;
k.Settings = iw;
k.Unrevoke = rw;
k.OverrideCodes = sw;
class Hu extends a {
  /**
   * List Cloudflare colos that account's devices were connected to during a time
   * period, sorted by usage starting from the most used colo. Colos without traffic
   * are also returned and sorted alphabetically.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dex/colos`, Xu, {
      query: n,
      ...t
    });
  }
}
class Xu extends h {
}
Hu.ColoListResponsesSinglePage = Xu;
class _w extends a {
  /**
   * Get test details and aggregate performance metrics for an traceroute test for a
   * given time period between 1 hour and 7 days.
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dex/traceroute-tests/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a breakdown of metrics by hop for individual traceroute test runs
   */
  networkPath(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dex/traceroute-tests/${e}/network-path`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get percentiles for a traceroute test for a given time period between 1 hour and
   * 7 days.
   */
  percentiles(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dex/traceroute-tests/${e}/percentiles`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let Qu = class extends a {
  /**
   * List devices with WARP client support for remote captures which have been
   * connected in the last 1 hour.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dex/commands/devices`, Ju, { query: n, ...t });
  }
};
class Ju extends F {
}
Qu.DeviceListResponsesV4PagePagination = Ju;
class gw extends a {
  /**
   * Downloads artifacts for an executed command. Bulk downloads are not supported
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/dex/commands/${e}/downloads/${t}`, {
      ...n,
      headers: { Accept: "application/zip", ...n == null ? void 0 : n.headers },
      __binaryResponse: !0
    });
  }
}
class pw extends a {
  /**
   * Retrieves the current quota usage and limits for device commands within a
   * specific account, including the time when the quota will reset
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/dex/commands/quota`, t)._thenUnwrap((n) => n.result);
  }
}
class Ae extends a {
  constructor() {
    super(...arguments), this.devices = new Qu(this._client), this.downloads = new gw(this._client), this.quota = new pw(this._client);
  }
  /**
   * Initiate commands for up to 10 devices per account
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dex/commands`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves a paginated list of commands issued to devices under the specified
   * account, optionally filtered by time range, device, or other parameters
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dex/commands`, qu, { query: n, ...t });
  }
}
class qu extends F {
}
Ae.CommandListResponsesV4PagePagination = qu;
Ae.Devices = Qu;
Ae.DeviceListResponsesV4PagePagination = Ju;
Ae.Downloads = gw;
Ae.Quota = pw;
class el extends a {
  /**
   * List details for devices using WARP
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dex/fleet-status/devices`, tl, { query: n, ...t });
  }
}
class tl extends p {
}
el.DeviceListResponsesV4PagePaginationArray = tl;
class $n extends a {
  constructor() {
    super(...arguments), this.devices = new el(this._client);
  }
  /**
   * List details for live (up to 60 minutes) devices using WARP
   */
  live(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/dex/fleet-status/live`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List details for devices using WARP, up to 7 days
   */
  overTime(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/dex/fleet-status/over-time`, {
      query: n,
      ...t,
      headers: { Accept: "*/*", ...t == null ? void 0 : t.headers }
    });
  }
}
$n.Devices = el;
$n.DeviceListResponsesV4PagePaginationArray = tl;
class ww extends a {
  /**
   * Get percentiles for an http test for a given time period between 1 hour and 7
   * days.
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dex/http-tests/${e}/percentiles`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class sl extends a {
  constructor() {
    super(...arguments), this.percentiles = new ww(this._client);
  }
  /**
   * Get test details and aggregate performance metrics for an http test for a given
   * time period between 1 hour and 7 days.
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/dex/http-tests/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
sl.Percentiles = ww;
class im extends a {
  /**
   * Returns unique count of devices that have run synthetic application monitoring
   * tests in the past 7 days.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.get(`/accounts/${s}/dex/tests/unique-devices`, {
      query: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class $w extends a {
  constructor() {
    super(...arguments), this.uniqueDevices = new im(this._client);
  }
  /**
   * List DEX tests with overview metrics
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dex/tests/overview`, nl, {
      query: n,
      ...t
    });
  }
}
class nl extends F {
}
$w.TestsV4PagePagination = nl;
class mw extends a {
  /**
   * Get a breakdown of hops and performance metrics for a specific traceroute test
   * run
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dex/traceroute-test-results/${e}/network-path`, s)._thenUnwrap((i) => i.result);
  }
}
class il extends a {
  constructor() {
    super(...arguments), this.networkPath = new mw(this._client);
  }
}
il.NetworkPath = mw;
class K extends a {
  constructor() {
    super(...arguments), this.commands = new Ae(this._client), this.colos = new Hu(this._client), this.fleetStatus = new $n(this._client), this.httpTests = new sl(this._client), this.tests = new $w(this._client), this.tracerouteTestResults = new il(this._client), this.tracerouteTests = new _w(this._client);
  }
}
K.Commands = Ae;
K.CommandListResponsesV4PagePagination = qu;
K.Colos = Hu;
K.ColoListResponsesSinglePage = Xu;
K.FleetStatus = $n;
K.HTTPTests = sl;
K.TestsV4PagePagination = nl;
K.TracerouteTestResults = il;
K.TracerouteTests = _w;
let rl = class extends a {
  /**
   * Creates a DLP custom entry.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dlp/entries`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP entry.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/dlp/entries/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all DLP entries in an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/dlp/entries`, cl, t);
  }
  /**
   * Deletes a DLP custom entry.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/dlp/entries/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a DLP entry by ID
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dlp/entries/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class cl extends h {
}
rl.EntryListResponsesSinglePage = cl;
class yw extends a {
  /**
   * Fetch limits associated with DLP for account
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/dlp/limits`, t)._thenUnwrap((n) => n.result);
  }
}
class fw extends a {
  /**
   * Validates whether this pattern is a valid regular expression. Rejects it if the
   * regular expression is too complex or can match an unbounded-length string. The
   * regex will be rejected if it uses `*` or `+`. Bound the maximum number of
   * characters that can be matched using a range, e.g. `{1,100}`.
   */
  validate(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dlp/patterns/validate`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
}
class Pw extends a {
  /**
   * Set payload log settings
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/dlp/payload_log`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Get payload log settings
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/dlp/payload_log`, t)._thenUnwrap((n) => n.result);
  }
}
class Uw extends a {
  /**
   * Prepare to upload a new version of a dataset
   */
  create(e, t, s) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/dlp/datasets/${e}/upload`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * This is used for single-column EDMv1 and Custom Word Lists. The EDM format can
   * only be created in the Cloudflare dashboard. For other clients, this operation
   * can only be used for non-secret Custom Word Lists. The body must be a UTF-8
   * encoded, newline (NL or CRNL) separated list of words to be matched.
   */
  edit(e, t, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.post(`/accounts/${i}/dlp/datasets/${e}/upload/${t}`, {
      body: c,
      ...n,
      headers: { "Content-Type": "application/octet-stream", ...n == null ? void 0 : n.headers },
      __binaryRequest: !0
    })._thenUnwrap((o) => o.result);
  }
}
class bw extends a {
  /**
   * This is used for multi-column EDMv2 datasets. The EDMv2 format can only be
   * created in the Cloudflare dashboard.
   */
  create(e, t, s, n, i) {
    const { account_id: c, body: o } = n;
    return this._client.post(`/accounts/${c}/dlp/datasets/${e}/versions/${t}/entries/${s}`, {
      body: o,
      ...i,
      headers: { "Content-Type": "application/octet-stream", ...i == null ? void 0 : i.headers },
      __binaryRequest: !0
    })._thenUnwrap((l) => l.result);
  }
}
class mn extends a {
  constructor() {
    super(...arguments), this.entries = new bw(this._client);
  }
  /**
   * This is used for multi-column EDMv2 datasets. The EDMv2 format can only be
   * created in the Cloudflare dashboard. The columns in the response appear in the
   * same order as in the request.
   */
  create(e, t, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.getAPIList(`/accounts/${i}/dlp/datasets/${e}/versions/${t}`, al, { body: c, method: "post", ...n });
  }
}
class al extends h {
}
mn.VersionCreateResponsesSinglePage = al;
mn.Entries = bw;
class tt extends a {
  constructor() {
    super(...arguments), this.upload = new Uw(this._client), this.versions = new mn(this._client);
  }
  /**
   * Create a new dataset
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dlp/datasets`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update details about a dataset
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/dlp/datasets/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch all datasets
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/dlp/datasets`, ol, t);
  }
  /**
   * This deletes all versions of the dataset.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/dlp/datasets/${e}`, {
      ...s,
      headers: { Accept: "*/*", ...s == null ? void 0 : s.headers }
    });
  }
  /**
   * Fetch a specific dataset
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dlp/datasets/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class ol extends h {
}
tt.DatasetsSinglePage = ol;
tt.Upload = Uw;
tt.Versions = mn;
tt.VersionCreateResponsesSinglePage = al;
class xw extends a {
  /**
   * Create mapping
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dlp/email/account_mapping`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get mapping
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/dlp/email/account_mapping`, t)._thenUnwrap((n) => n.result);
  }
}
let ul = class extends a {
  /**
   * Create email scanner rule
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dlp/email/rules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Update email scanner rule
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/dlp/email/rules/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all email scanner rules for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/dlp/email/rules`, ll, t);
  }
  /**
   * Delete email scanner rule
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/dlp/email/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update email scanner rule priorities
   */
  bulkEdit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.patch(`/accounts/${s}/dlp/email/rules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Get an email scanner rule
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dlp/email/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class ll extends h {
}
ul.RuleListResponsesSinglePage = ll;
class Tt extends a {
  constructor() {
    super(...arguments), this.accountMapping = new xw(this._client), this.rules = new ul(this._client);
  }
}
Tt.AccountMapping = xw;
Tt.Rules = ul;
Tt.RuleListResponsesSinglePage = ll;
class zw extends a {
  /**
   * Creates a DLP custom profile.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/dlp/profiles/custom`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP custom profile.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/dlp/profiles/custom/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a DLP custom profile.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/dlp/profiles/custom/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a custom DLP profile by id.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dlp/profiles/custom/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Sw extends a {
  /**
   * Updates a DLP predefined profile. Only supports enabling/disabling entries.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/dlp/profiles/predefined/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a predefined DLP profile by id.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dlp/profiles/predefined/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Dt extends a {
  constructor() {
    super(...arguments), this.custom = new zw(this._client), this.predefined = new Sw(this._client);
  }
  /**
   * Lists all DLP profiles in an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/dlp/profiles`, dl, {
      query: n,
      ...t
    });
  }
  /**
   * Fetches a DLP profile by ID
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dlp/profiles/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class dl extends h {
}
Dt.ProfilesSinglePage = dl;
Dt.Custom = zw;
Dt.Predefined = Sw;
class E extends a {
  constructor() {
    super(...arguments), this.datasets = new tt(this._client), this.patterns = new fw(this._client), this.payloadLogs = new Pw(this._client), this.email = new Tt(this._client), this.profiles = new Dt(this._client), this.limits = new yw(this._client), this.entries = new rl(this._client);
  }
}
E.Datasets = tt;
E.DatasetsSinglePage = ol;
E.Patterns = fw;
E.PayloadLogs = Pw;
E.Email = Tt;
E.Profiles = Dt;
E.ProfilesSinglePage = dl;
E.Limits = yw;
E.Entries = rl;
E.EntryListResponsesSinglePage = cl;
class hl extends a {
  /**
   * Fetches all application and application type mappings.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/gateway/app_types`, _l, t);
  }
}
class _l extends h {
}
hl.AppTypesSinglePage = _l;
class Aw extends a {
  /**
   * Updates Zero Trust Audit SSH and SSH with Access for Infrastructure settings for
   * an account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/gateway/audit_ssh_settings`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets all Zero Trust Audit SSH and SSH with Access for Infrastructure settings
   * for an account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/gateway/audit_ssh_settings`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Rotates the SSH account seed that is used for generating the host key identity
   * when connecting through the Cloudflare SSH Proxy.
   */
  rotateSeed(e, t) {
    const { account_id: s } = e;
    return this._client.post(`/accounts/${s}/gateway/audit_ssh_settings/rotate_seed`, t)._thenUnwrap((n) => n.result);
  }
}
class gl extends a {
  /**
   * Fetches a list of all categories.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/gateway/categories`, pl, t);
  }
}
class pl extends h {
}
gl.CategoriesSinglePage = pl;
class wl extends a {
  /**
   * Creates a new Zero Trust certificate.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/gateway/certificates`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches all Zero Trust certificates for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/gateway/certificates`, $l, t);
  }
  /**
   * Deletes a gateway-managed Zero Trust certificate. A certificate must be
   * deactivated from the edge (inactive) before it is deleted.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/gateway/certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Binds a single Zero Trust certificate to the edge.
   */
  activate(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/gateway/certificates/${e}/activate`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Unbinds a single Zero Trust certificate from the edge
   */
  deactivate(e, t, s) {
    const { account_id: n, body: i } = t;
    return this._client.post(`/accounts/${n}/gateway/certificates/${e}/deactivate`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust certificate.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/certificates/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class $l extends h {
}
wl.CertificateListResponsesSinglePage = $l;
class ml extends a {
  /**
   * Creates a new Zero Trust Gateway location.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/gateway/locations`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway location.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/gateway/locations/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Zero Trust Gateway locations for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/gateway/locations`, yl, t);
  }
  /**
   * Deletes a configured Zero Trust Gateway location.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/gateway/locations/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Zero Trust Gateway location.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/locations/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class yl extends h {
}
ml.LocationsSinglePage = yl;
class Rw extends a {
  /**
   * Updates logging settings for the current Zero Trust account.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/gateway/logging`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current logging settings for Zero Trust account.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/gateway/logging`, t)._thenUnwrap((n) => n.result);
  }
}
class fl extends a {
  /**
   * Creates a new Zero Trust Gateway proxy endpoint.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/gateway/proxy_endpoints`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches all Zero Trust Gateway proxy endpoints for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/gateway/proxy_endpoints`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Deletes a configured Zero Trust Gateway proxy endpoint.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/gateway/proxy_endpoints/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway proxy endpoint.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/gateway/proxy_endpoints/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust Gateway proxy endpoint.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/proxy_endpoints/${e}`, Pl, s);
  }
}
class Pl extends h {
}
fl.ProxyEndpointsSinglePage = Pl;
class Ul extends a {
  /**
   * Creates a new Zero Trust Gateway rule.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/gateway/rules`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway rule.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/gateway/rules/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the Zero Trust Gateway rules for an account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/gateway/rules`, bl, t);
  }
  /**
   * Deletes a Zero Trust Gateway rule.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/gateway/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Zero Trust Gateway rule.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/rules/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Resets the expiration of a Zero Trust Gateway Rule if its duration has elapsed
   * and it has a default duration.
   *
   * The Zero Trust Gateway Rule must have values for both `expiration.expires_at`
   * and `expiration.duration`.
   */
  resetExpiration(e, t, s) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/gateway/rules/${e}/reset_expiration`, s)._thenUnwrap((i) => i.result);
  }
}
class bl extends h {
}
Ul.GatewayRulesSinglePage = bl;
class Lw extends a {
  /**
   * Fetches the current Zero Trust certificate configuration.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/gateway/configuration/custom_certificate`, t);
  }
}
let xl = class extends a {
  constructor() {
    super(...arguments), this.customCertificate = new Lw(this._client);
  }
  /**
   * Updates the current Zero Trust account configuration.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/gateway/configuration`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Patches the current Zero Trust account configuration. This endpoint can update a
   * single subcollection of settings such as `antivirus`, `tls_decrypt`,
   * `activity_log`, `block_page`, `browser_isolation`, `fips`, `body_scanning`, or
   * `certificate`, without updating the entire configuration object. Returns an
   * error if any collection of settings is not properly configured.
   */
  edit(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.patch(`/accounts/${s}/gateway/configuration`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current Zero Trust account configuration.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/gateway/configuration`, t)._thenUnwrap((n) => n.result);
  }
};
xl.CustomCertificate = Lw;
class zl extends a {
  /**
   * Fetches all items in a single Zero Trust list.
   */
  list(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/lists/${e}/items`, Sl, s);
  }
}
class Sl extends h {
}
zl.ItemListResponsesSinglePage = Sl;
class Et extends a {
  constructor() {
    super(...arguments), this.items = new zl(this._client);
  }
  /**
   * Creates a new Zero Trust list.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/gateway/lists`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust list. Skips updating list items if not included
   * in the payload.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/gateway/lists/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all Zero Trust lists for an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/gateway/lists`, Al, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes a Zero Trust list.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/gateway/lists/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Appends or removes an item from a configured Zero Trust list.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/gateway/lists/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust list.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/lists/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Al extends h {
}
Et.GatewayListsSinglePage = Al;
Et.Items = zl;
Et.ItemListResponsesSinglePage = Sl;
class x extends a {
  constructor() {
    super(...arguments), this.auditSSHSettings = new Aw(this._client), this.categories = new gl(this._client), this.appTypes = new hl(this._client), this.configurations = new xl(this._client), this.lists = new Et(this._client), this.locations = new ml(this._client), this.logging = new Rw(this._client), this.proxyEndpoints = new fl(this._client), this.rules = new Ul(this._client), this.certificates = new wl(this._client);
  }
  /**
   * Creates a Zero Trust account with an existing Cloudflare account.
   */
  create(e, t) {
    const { account_id: s } = e;
    return this._client.post(`/accounts/${s}/gateway`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Gets information about the current Zero Trust account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/gateway`, t)._thenUnwrap((n) => n.result);
  }
}
x.AuditSSHSettings = Aw;
x.Categories = gl;
x.CategoriesSinglePage = pl;
x.AppTypes = hl;
x.AppTypesSinglePage = _l;
x.Configurations = xl;
x.Lists = Et;
x.GatewayListsSinglePage = Al;
x.Locations = ml;
x.LocationsSinglePage = yl;
x.Logging = Rw;
x.ProxyEndpoints = fl;
x.ProxyEndpointsSinglePage = Pl;
x.Rules = Ul;
x.GatewayRulesSinglePage = bl;
x.Certificates = wl;
x.CertificateListResponsesSinglePage = $l;
class vw extends a {
  /**
   * Lists SCIM Group resources synced to Cloudflare via the System for Cross-domain
   * Identity Management (SCIM).
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/access/identity_providers/${e}/scim/groups`, sm, { query: i, ...s });
  }
}
class Iw extends a {
  /**
   * Lists SCIM User resources synced to Cloudflare via the System for Cross-domain
   * Identity Management (SCIM).
   */
  list(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.getAPIList(`/accounts/${n}/access/identity_providers/${e}/scim/users`, nm, { query: i, ...s });
  }
}
class yn extends a {
  constructor() {
    super(...arguments), this.groups = new vw(this._client), this.users = new Iw(this._client);
  }
}
yn.Groups = vw;
yn.Users = Iw;
class fn extends a {
  constructor() {
    super(...arguments), this.scim = new yn(this._client);
  }
  /**
   * Adds a new identity provider to Access.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/access/identity_providers`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured identity provider.
   */
  update(e, t, s) {
    const { account_id: n, zone_id: i, ...c } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${o}/${l}/access/identity_providers/${e}`, { body: c, ...s })._thenUnwrap((g) => g.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${o}/access/identity_providers`, Rl, { query: i, ...t });
  }
  delete(e, t = {}, s) {
    if (u(t))
      return this.delete(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${o}/access/identity_providers/${e}`, s)._thenUnwrap((l) => l.result);
  }
  get(e, t = {}, s) {
    if (u(t))
      return this.get(e, {}, t);
    const { account_id: n, zone_id: i } = t;
    if (!n && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (n && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${o}/access/identity_providers/${e}`, s)._thenUnwrap((l) => l.result);
  }
}
class Rl extends h {
}
fn.IdentityProviderListResponsesSinglePage = Rl;
fn.SCIM = yn;
class Ll extends a {
  /**
   * Adds a new virtual network to an account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/teamnet/virtual_networks`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters virtual networks in an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/teamnet/virtual_networks`, vl, { query: n, ...t });
  }
  /**
   * Deletes an existing virtual network.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/teamnet/virtual_networks/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing virtual network.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/teamnet/virtual_networks/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a virtual network.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/teamnet/virtual_networks/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class vl extends h {
}
Ll.VirtualNetworksSinglePage = vl;
class kw extends a {
  /**
   * Fetches routes that contain the given IP address.
   */
  get(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.get(`/accounts/${n}/teamnet/routes/ip/${e}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let Ow = class extends a {
  /**
   * Routes a private network through a Cloudflare Tunnel. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/teamnet/routes/network/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a private network route from an account. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format. If no
   * virtual_network_id is provided it will delete the route from the default vnet.
   * If no tun_type is provided it will fetch the type from the tunnel_id or if that
   * is missing it will assume Cloudflare Tunnel as default. If tunnel_id is provided
   * it will delete the route from that tunnel, otherwise it will delete the route
   * based on the vnet and tun_type.
   */
  delete(e, t, s) {
    const { account_id: n, tun_type: i, tunnel_id: c, virtual_network_id: o } = t;
    return this._client.delete(`/accounts/${n}/teamnet/routes/network/${e}`, {
      query: { tun_type: i, tunnel_id: c, virtual_network_id: o },
      ...s
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an existing private network route in an account. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format.
   */
  edit(e, t, s) {
    const { account_id: n } = t;
    return this._client.patch(`/accounts/${n}/teamnet/routes/network/${e}`, s)._thenUnwrap((i) => i.result);
  }
};
class Yt extends a {
  constructor() {
    super(...arguments), this.ips = new kw(this._client), this.networks = new Ow(this._client);
  }
  /**
   * Routes a private network through a Cloudflare Tunnel.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/teamnet/routes`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters private network routes in an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/teamnet/routes`, Il, {
      query: n,
      ...t
    });
  }
  /**
   * Deletes a private network route from an account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/teamnet/routes/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing private network route in an account. The fields that are
   * meant to be updated should be provided in the body of the request.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/teamnet/routes/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a private network route in an account.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/teamnet/routes/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Il extends p {
}
Yt.TeamnetsV4PagePaginationArray = Il;
Yt.IPs = kw;
Yt.Networks = Ow;
class st extends a {
  constructor() {
    super(...arguments), this.routes = new Yt(this._client), this.virtualNetworks = new Ll(this._client);
  }
}
st.Routes = Yt;
st.TeamnetsV4PagePaginationArray = Il;
st.VirtualNetworks = Ll;
st.VirtualNetworksSinglePage = vl;
class Zw extends a {
  /**
   * Updates the DoH settings for your Zero Trust organization.
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/access/organizations/doh`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns the DoH settings for your Zero Trust organization.
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/access/organizations/doh`, t)._thenUnwrap((n) => n.result);
  }
}
class kl extends a {
  constructor() {
    super(...arguments), this.doh = new Zw(this._client);
  }
  /**
   * Sets up a Zero Trust organization for your account or zone.
   */
  create(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${o}/access/organizations`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates the configuration for your Zero Trust organization.
   */
  update(e, t) {
    const { account_id: s, zone_id: n, ...i } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: o } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.put(`/${c}/${o}/access/organizations`, {
      body: i,
      ...t
    })._thenUnwrap((l) => l.result);
  }
  list(e = {}, t) {
    if (u(e))
      return this.list({}, e);
    const { account_id: s, zone_id: n } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${i}/${c}/access/organizations`, t)._thenUnwrap((o) => o.result);
  }
  /**
   * Revokes a user's access across all applications.
   */
  revokeUsers(e, t) {
    const { account_id: s, zone_id: n, query_devices: i, ...c } = e;
    if (!s && !n)
      throw new d("You must provide either account_id or zone_id.");
    if (s && n)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: o, accountOrZoneId: l } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${o}/${l}/access/organizations/revoke_user`, {
      query: { devices: i },
      body: c,
      ...t
    })._thenUnwrap((g) => g.result);
  }
}
kl.DOH = Zw;
class Cw extends a {
  /**
   * Update configuration for risk behaviors
   */
  update(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.put(`/accounts/${s}/zt_risk_scoring/behaviors`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get all behaviors and associated configuration
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/zt_risk_scoring/behaviors`, t)._thenUnwrap((n) => n.result);
  }
}
class Vw extends a {
  /**
   * Get risk score info for all users in the account
   */
  get(e, t) {
    const { account_id: s } = e;
    return this._client.get(`/accounts/${s}/zt_risk_scoring/summary`, t)._thenUnwrap((n) => n.result);
  }
}
class Tw extends a {
  /**
   * Get risk score integration by reference id.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/zt_risk_scoring/integrations/reference_id/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Pn extends a {
  constructor() {
    super(...arguments), this.references = new Tw(this._client);
  }
  /**
   * Create new risk score integration.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/zt_risk_scoring/integrations`, {
      body: n,
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Overwrite the reference_id, tenant_url, and active values with the ones provided
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/zt_risk_scoring/integrations/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all risk score integrations for the account.
   */
  list(e, t) {
    const { account_id: s } = e;
    return this._client.getAPIList(`/accounts/${s}/zt_risk_scoring/integrations`, Ol, t);
  }
  /**
   * Delete a risk score integration.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/zt_risk_scoring/integrations/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get risk score integration by id.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/zt_risk_scoring/integrations/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Ol extends h {
}
Pn.IntegrationListResponsesSinglePage = Ol;
Pn.References = Tw;
class nt extends a {
  constructor() {
    super(...arguments), this.behaviours = new Cw(this._client), this.summary = new Vw(this._client), this.integrations = new Pn(this._client);
  }
  /**
   * Get risk event/score information for a specific user
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/zt_risk_scoring/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Clear the risk score for a particular user
   */
  reset(e, t, s) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/zt_risk_scoring/${e}/reset`, s)._thenUnwrap((i) => i.result);
  }
}
nt.Behaviours = Cw;
nt.Summary = Vw;
nt.Integrations = Pn;
nt.IntegrationListResponsesSinglePage = Ol;
class Dw extends a {
  /**
   * Adds or updates the configuration for a remotely-managed tunnel.
   */
  update(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.put(`/accounts/${n}/cfd_tunnel/${e}/configurations`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets the configuration for a remotely-managed tunnel
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cfd_tunnel/${e}/configurations`, s)._thenUnwrap((i) => i.result);
  }
}
class Zl extends a {
  /**
   * Removes a connection (aka Cloudflare Tunnel Connector) from a Cloudflare Tunnel
   * independently of its current state. If no connector id (client_id) is provided
   * all connectors will be removed. We recommend running this command after rotating
   * tokens.
   */
  delete(e, t, s) {
    const { account_id: n, client_id: i } = t;
    return this._client.delete(`/accounts/${n}/cfd_tunnel/${e}/connections`, {
      query: { client_id: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches connection details for a Cloudflare Tunnel.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/cfd_tunnel/${e}/connections`, Cl, s);
  }
}
class Cl extends h {
}
Zl.ClientsSinglePage = Cl;
class Ew extends a {
  /**
   * Fetches connector and connection details for a Cloudflare Tunnel.
   */
  get(e, t, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/cfd_tunnel/${e}/connectors/${t}`, n)._thenUnwrap((c) => c.result);
  }
}
class Yw extends a {
  /**
   * Gets a management token used to access the management resources (i.e. Streaming
   * Logs) of a tunnel.
   */
  create(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.post(`/accounts/${n}/cfd_tunnel/${e}/management`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Fw extends a {
  /**
   * Gets the token used to associate cloudflared with a specific tunnel.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cfd_tunnel/${e}/token`, s)._thenUnwrap((i) => i.result);
  }
}
class Vl extends a {
  /**
   * Creates a new Warp Connector Tunnel in an account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/warp_connector`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters Warp Connector Tunnels in an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/warp_connector`, Tl, { query: n, ...t });
  }
  /**
   * Deletes a Warp Connector Tunnel from an account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/warp_connector/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Warp Connector Tunnel.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/warp_connector/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Warp Connector Tunnel.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/warp_connector/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the token used to associate warp device with a specific Warp Connector
   * tunnel.
   */
  token(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/warp_connector/${e}/token`, s)._thenUnwrap((i) => i.result);
  }
}
class Tl extends p {
}
Vl.WARPConnectorListResponsesV4PagePaginationArray = Tl;
class W extends a {
  constructor() {
    super(...arguments), this.warpConnector = new Vl(this._client), this.configurations = new Dw(this._client), this.connections = new Zl(this._client), this.token = new Fw(this._client), this.connectors = new Ew(this._client), this.management = new Yw(this._client);
  }
  /**
   * Creates a new Cloudflare Tunnel in an account.
   */
  create(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.post(`/accounts/${s}/cfd_tunnel`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters Cloudflare Tunnels in an account.
   */
  list(e, t) {
    const { account_id: s, ...n } = e;
    return this._client.getAPIList(`/accounts/${s}/cfd_tunnel`, Dl, { query: n, ...t });
  }
  /**
   * Deletes a Cloudflare Tunnel from an account.
   */
  delete(e, t, s) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/cfd_tunnel/${e}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Cloudflare Tunnel.
   */
  edit(e, t, s) {
    const { account_id: n, ...i } = t;
    return this._client.patch(`/accounts/${n}/cfd_tunnel/${e}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Cloudflare Tunnel.
   */
  get(e, t, s) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/cfd_tunnel/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Dl extends p {
}
W.TunnelListResponsesV4PagePaginationArray = Dl;
W.WARPConnector = Vl;
W.WARPConnectorListResponsesV4PagePaginationArray = Tl;
W.Configurations = Dw;
W.Connections = Zl;
W.ClientsSinglePage = Cl;
W.Token = Fw;
W.Connectors = Ew;
W.Management = Yw;
class S extends a {
  constructor() {
    super(...arguments), this.devices = new k(this._client), this.identityProviders = new fn(this._client), this.organizations = new kl(this._client), this.seats = new ou(this._client), this.access = new y(this._client), this.dex = new K(this._client), this.tunnels = new W(this._client), this.connectivitySettings = new Xp(this._client), this.dlp = new E(this._client), this.gateway = new x(this._client), this.networks = new st(this._client), this.riskScoring = new nt(this._client);
  }
}
S.Devices = k;
S.DevicesSinglePage = ju;
S.IdentityProviders = fn;
S.IdentityProviderListResponsesSinglePage = Rl;
S.Organizations = kl;
S.Seats = ou;
S.SeatsSinglePage = uu;
S.Access = y;
S.DEX = K;
S.Tunnels = W;
S.TunnelListResponsesV4PagePaginationArray = Dl;
S.ConnectivitySettings = Xp;
S.DLP = E;
S.Gateway = x;
S.Networks = st;
S.RiskScoring = nt;
class Gw extends a {
  /**
   * Triggeres a new activation check for a PENDING Zone. This can be triggered every
   * 5 min for paygo/ent customers, every hour for FREE Zones.
   */
  trigger(e, t) {
    const { zone_id: s } = e;
    return this._client.put(`/zones/${s}/activation_check`, t)._thenUnwrap((n) => n.result);
  }
}
class El extends a {
  /**
   * Set metadata for account-level custom nameservers on a zone.
   *
   * If you would like new zones in the account to use account custom nameservers by
   * default, use PUT /accounts/:identifier to set the account setting
   * use_account_custom_ns_by_default to true.
   *
   * Deprecated in favor of
   * [Update DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-update-dns-settings).
   *
   * @deprecated Use [DNS settings API](https://developers.cloudflare.com/api/resources/dns/subresources/settings/methods/put/) instead.
   */
  update(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.getAPIList(`/zones/${s}/custom_ns`, Yl, {
      body: n,
      method: "put",
      ...t
    });
  }
  /**
   * Get metadata for account-level custom nameservers on a zone.
   *
   * Deprecated in favor of
   * [Show DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-list-dns-settings).
   *
   * @deprecated Use [DNS settings API](https://developers.cloudflare.com/api/resources/dns/subresources/settings/methods/get/) instead.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/custom_ns`, t);
  }
}
class Yl extends h {
}
El.CustomNameserverUpdateResponsesSinglePage = Yl;
class Bw extends a {
  /**
   * Enforce a zone hold on the zone, blocking the creation and activation of zones
   * with this zone's hostname.
   */
  create(e, t) {
    const { zone_id: s, include_subdomains: n } = e;
    return this._client.post(`/zones/${s}/hold`, {
      query: { include_subdomains: n },
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Stop enforcement of a zone hold on the zone, permanently or temporarily,
   * allowing the creation and activation of zones with this zone's hostname.
   */
  delete(e, t) {
    const { zone_id: s, hold_after: n } = e;
    return this._client.delete(`/zones/${s}/hold`, {
      query: { hold_after: n },
      ...t
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update the `hold_after` and/or `include_subdomains` values on an existing zone
   * hold. The hold is enabled if the `hold_after` date-time value is in the past.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}/hold`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve whether the zone is subject to a zone hold, and metadata about the
   * hold.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}/hold`, t)._thenUnwrap((n) => n.result);
  }
}
class Fl extends a {
  /**
   * Lists available plans the zone can subscribe to.
   */
  list(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/available_plans`, Gl, t);
  }
  /**
   * Details of the available plan that the zone can subscribe to.
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/available_plans/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Gl extends h {
}
Fl.AvailableRatePlansSinglePage = Gl;
class Bl extends a {
  /**
   * Lists all rate plans the zone can subscribe to.
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.getAPIList(`/zones/${s}/available_rate_plans`, Nl, t);
  }
}
class Nl extends h {
}
Bl.RatePlanGetResponsesSinglePage = Nl;
class Nw extends a {
  /**
   * Updates a single zone setting by the identifier
   */
  edit(e, t, s) {
    const { zone_id: n, ...i } = t;
    return this._client.patch(`/zones/${n}/settings/${e}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single zone setting by name
   */
  get(e, t, s) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/settings/${e}`, s)._thenUnwrap((i) => i.result);
  }
}
class Mw extends a {
  /**
   * Create a zone subscription, either plan or add-ons.
   */
  create(e, t, s) {
    return this._client.post(`/zones/${e}/subscription`, { body: t, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Updates zone subscriptions, either plan or add-ons.
   */
  update(e, t, s) {
    return this._client.put(`/zones/${e}/subscription`, { body: t, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Lists zone subscription details.
   */
  get(e, t) {
    return this._client.get(`/zones/${e}/subscription`, t)._thenUnwrap((s) => s.result);
  }
}
class Y extends a {
  constructor() {
    super(...arguments), this.activationCheck = new Gw(this._client), this.settings = new Nw(this._client), this.customNameservers = new El(this._client), this.holds = new Bw(this._client), this.subscriptions = new Mw(this._client), this.plans = new Fl(this._client), this.ratePlans = new Bl(this._client);
  }
  /**
   * Create Zone
   */
  create(e, t) {
    return this._client.post("/zones", { body: e, ...t })._thenUnwrap((s) => s.result);
  }
  list(e = {}, t) {
    return u(e) ? this.list({}, e) : this._client.getAPIList("/zones", rm, { query: e, ...t });
  }
  /**
   * Deletes an existing zone.
   */
  delete(e, t) {
    const { zone_id: s } = e;
    return this._client.delete(`/zones/${s}`, t)._thenUnwrap((n) => n.result);
  }
  /**
   * Edits a zone. Only one zone property can be changed at a time.
   */
  edit(e, t) {
    const { zone_id: s, ...n } = e;
    return this._client.patch(`/zones/${s}`, { body: n, ...t })._thenUnwrap((i) => i.result);
  }
  /**
   * Zone Details
   */
  get(e, t) {
    const { zone_id: s } = e;
    return this._client.get(`/zones/${s}`, t)._thenUnwrap((n) => n.result);
  }
}
class rm extends p {
}
Y.ActivationCheck = Gw;
Y.Settings = Nw;
Y.CustomNameservers = El;
Y.CustomNameserverUpdateResponsesSinglePage = Yl;
Y.Holds = Bw;
Y.Subscriptions = Mw;
Y.Plans = Fl;
Y.AvailableRatePlansSinglePage = Gl;
Y.RatePlans = Bl;
Y.RatePlanGetResponsesSinglePage = Nl;
var Kw;
class _ extends _$ {
  /**
   * API Client for interfacing with the Cloudflare API.
   *
   * @param {string | null | undefined} [opts.apiToken=process.env['CLOUDFLARE_API_TOKEN'] ?? null]
   * @param {string | null | undefined} [opts.apiKey=process.env['CLOUDFLARE_API_KEY'] ?? null]
   * @param {string | null | undefined} [opts.apiEmail=process.env['CLOUDFLARE_EMAIL'] ?? null]
   * @param {string | null | undefined} [opts.userServiceKey=process.env['CLOUDFLARE_API_USER_SERVICE_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['CLOUDFLARE_BASE_URL'] ?? https://api.cloudflare.com/client/v4] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({ baseURL: e = ct("CLOUDFLARE_BASE_URL"), apiToken: t = ct("CLOUDFLARE_API_TOKEN") ?? null, apiKey: s = ct("CLOUDFLARE_API_KEY") ?? null, apiEmail: n = ct("CLOUDFLARE_EMAIL") ?? null, userServiceKey: i = ct("CLOUDFLARE_API_USER_SERVICE_KEY") ?? null, ...c } = {}) {
    const o = {
      apiToken: t,
      apiKey: s,
      apiEmail: n,
      userServiceKey: i,
      ...c,
      baseURL: e || "https://api.cloudflare.com/client/v4"
    };
    super({
      baseURL: o.baseURL,
      timeout: o.timeout ?? 6e4,
      httpAgent: o.httpAgent,
      maxRetries: o.maxRetries,
      fetch: o.fetch
    }), this.accounts = new fe(this), this.originCACertificates = new L_(this), this.ips = new Eh(this), this.memberships = new x_(this), this.user = new se(this), this.zones = new Y(this), this.loadBalancers = new J(this), this.cache = new Ze(this), this.ssl = new pe(this), this.acm = new En(this), this.argo = new os(this), this.certificateAuthorities = new Ei(this), this.clientCertificates = new wh(this), this.customCertificates = new Qi(this), this.customHostnames = new hs(this), this.customNameservers = new Uh(this), this.dnsFirewall = new gs(this), this.dns = new he(this), this.emailSecurity = new Ue(this), this.emailRouting = new _e(this), this.filters = new Th(this), this.firewall = new V(this), this.healthchecks = new ic(this), this.keylessCertificates = new n_(this), this.logpush = new re(this), this.logs = new yt(this), this.originTLSClientAuth = new Ut(this), this.pageRules = new k_(this), this.rateLimits = new jg(this), this.waitingRooms = new oe(this), this.web3 = new an(this), this.workers = new M(this), this.kv = new bs(this), this.durableObjects = new ws(this), this.queues = new Ke(this), this.apiGateway = new G(this), this.managedTransforms = new b_(this), this.pageShield = new q(this), this.rulesets = new He(this), this.urlNormalization = new bp(this), this.spectrum = new vt(this), this.addressing = new B(this), this.auditLogs = new rh(this), this.billing = new Oi(this), this.brandProtection = new lh(this), this.diagnostics = new ps(this), this.images = new mt(this), this.intel = new I(this), this.magicTransit = new O(this), this.magicNetworkMonitoring = new ft(this), this.networkInterconnects = new Ne(this), this.mtlsCertificates = new Rs(this), this.pages = new Is(this), this.registrar = new Ns(this), this.requestTracers = new Wa(this), this.rules = new Ms(this), this.stream = new z(this), this.alerting = new de(this), this.d1 = new Ve(this), this.r2 = new Os(this), this.workersForPlatforms = new iu(this), this.zeroTrust = new S(this), this.turnstile = new en(this), this.hyperdrive = new Us(this), this.rum = new bt(this), this.vectorize = new nn(this), this.urlScanner = new tn(this), this.radar = new P(this), this.botManagement = new ah(this), this.originPostQuantumEncryption = new v_(this), this.speed = new Je(this), this.dcvDelegation = new bh(this), this.hostnames = new ac(this), this.snippets = new Qe(this), this.calls = new Ce(this), this.cloudforceOne = new gt(this), this.aiGateway = new X(this), this.iam = new De(this), this.cloudConnector = new _t(this), this.botnetFeed = new us(this), this.securityTXT = new cp(this), this.workflows = new qe(this), this.resourceSharing = new We(this), this.leakedCredentialChecks = new xs(this), this.contentScanning = new Pe(this), this.abuseReports = new Bd(this), this.ai = new ne(this), this.securityCenter = new js(this), this._options = o, this.apiToken = t, this.apiKey = s, this.apiEmail = n, this.userServiceKey = i;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  defaultHeaders(e) {
    return {
      ...super.defaultHeaders(e),
      "X-Auth-Key": this.apiKey,
      "X-Auth-Email": this.apiEmail,
      ...this._options.defaultHeaders
    };
  }
  validateHeaders(e, t) {
    if (!(this.apiEmail && e["x-auth-email"]) && t["x-auth-email"] !== null && !(this.apiKey && e["x-auth-key"]) && t["x-auth-key"] !== null && !(this.apiToken && e.authorization) && t.authorization !== null && !(this.userServiceKey && e["x-auth-user-service-key"]) && t["x-auth-user-service-key"] !== null)
      throw new Error('Could not resolve authentication method. Expected one of apiEmail, apiKey, apiToken or userServiceKey to be set. Or for one of the "X-Auth-Email", "X-Auth-Key", "Authorization" or "X-Auth-User-Service-Key" headers to be explicitly omitted');
  }
  authHeaders(e) {
    const t = this.apiEmailAuth(e), s = this.apiKeyAuth(e), n = this.apiTokenAuth(e), i = this.userServiceKeyAuth(e);
    return t != null && !ve(t) && s != null && !ve(s) ? { ...t, ...s } : n != null && !ve(n) ? n : i != null && !ve(i) ? i : {};
  }
  apiEmailAuth(e) {
    return this.apiEmail == null ? {} : { "X-Auth-Email": this.apiEmail };
  }
  apiKeyAuth(e) {
    return this.apiKey == null ? {} : { "X-Auth-Key": this.apiKey };
  }
  apiTokenAuth(e) {
    return this.apiToken == null ? {} : { Authorization: `Bearer ${this.apiToken}` };
  }
  userServiceKeyAuth(e) {
    return this.userServiceKey == null ? {} : { "X-Auth-User-Service-Key": this.userServiceKey };
  }
  stringifyQuery(e) {
    return n$(e, { allowDots: !0, arrayFormat: "repeat" });
  }
}
Kw = _;
_.Cloudflare = Kw;
_.DEFAULT_TIMEOUT = 6e4;
_.CloudflareError = d;
_.APIError = v;
_.APIConnectionError = ss;
_.APIConnectionTimeoutError = od;
_.APIUserAbortError = In;
_.NotFoundError = hd;
_.ConflictError = _d;
_.RateLimitError = pd;
_.BadRequestError = ud;
_.AuthenticationError = ld;
_.InternalServerError = wd;
_.PermissionDeniedError = dd;
_.UnprocessableEntityError = gd;
_.toFile = zd;
_.fileFromPath = fd;
_.Accounts = fe;
_.OriginCACertificates = L_;
_.IPs = Eh;
_.Memberships = x_;
_.User = se;
_.Zones = Y;
_.LoadBalancers = J;
_.Cache = Ze;
_.SSL = pe;
_.ACM = En;
_.Argo = os;
_.CertificateAuthorities = Ei;
_.ClientCertificates = wh;
_.CustomCertificates = Qi;
_.CustomHostnames = hs;
_.CustomNameservers = Uh;
_.DNSFirewall = gs;
_.DNS = he;
_.EmailSecurity = Ue;
_.EmailRouting = _e;
_.Filters = Th;
_.Firewall = V;
_.Healthchecks = ic;
_.KeylessCertificates = n_;
_.Logpush = re;
_.Logs = yt;
_.OriginTLSClientAuth = Ut;
_.PageRules = k_;
_.RateLimits = jg;
_.WaitingRooms = oe;
_.Web3 = an;
_.Workers = M;
_.KV = bs;
_.DurableObjects = ws;
_.Queues = Ke;
_.APIGateway = G;
_.ManagedTransforms = b_;
_.PageShield = q;
_.Rulesets = He;
_.URLNormalization = bp;
_.Spectrum = vt;
_.Addressing = B;
_.AuditLogs = rh;
_.Billing = Oi;
_.BrandProtection = lh;
_.Diagnostics = ps;
_.Images = mt;
_.Intel = I;
_.MagicTransit = O;
_.MagicNetworkMonitoring = ft;
_.NetworkInterconnects = Ne;
_.MTLSCertificates = Rs;
_.Pages = Is;
_.Registrar = Ns;
_.RequestTracers = Wa;
_.Rules = Ms;
_.Stream = z;
_.Alerting = de;
_.D1Resource = Ve;
_.R2 = Os;
_.WorkersForPlatforms = iu;
_.ZeroTrust = S;
_.Turnstile = en;
_.HyperdriveResource = Us;
_.RUM = bt;
_.Vectorize = nn;
_.URLScanner = tn;
_.Radar = P;
_.BotManagement = ah;
_.OriginPostQuantumEncryption = v_;
_.Speed = Je;
_.DCVDelegation = bh;
_.Hostnames = ac;
_.Snippets = Qe;
_.Calls = Ce;
_.CloudforceOne = gt;
_.AIGateway = X;
_.IAM = De;
_.CloudConnector = _t;
_.BotnetFeed = us;
_.SecurityTXT = cp;
_.Workflows = qe;
_.ResourceSharing = We;
_.LeakedCredentialChecks = xs;
_.ContentScanning = Pe;
_.AbuseReports = Bd;
_.AI = ne;
_.SecurityCenter = js;
const Wt = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function cm(r, e = Wt) {
  const {
    retries: t = Wt.retries,
    retryDelay: s = Wt.retryDelay,
    retryOnStatusCodes: n = Wt.retryOnStatusCodes,
    onError: i,
    ...c
  } = e;
  let o = 0;
  const l = async () => {
    o++;
    try {
      let g, $;
      r instanceof Request ? ($ = r.url, g = new Request(r, c)) : ($ = r.toString(), g = new Request($, c));
      const w = await fetch(g), f = {
        status: w.status,
        statusText: w.statusText,
        headers: Object.fromEntries(w.headers.entries()),
        data: w,
        config: { url: $, ...c },
        ok: w.ok
      };
      if (n.includes(f.status) && o <= t) {
        if (i) {
          const A = i(new Error(`请求失败，状态码 ${f.status}`), o);
          A instanceof Promise && await A;
        }
        return await new Promise((A) => setTimeout(A, s)), l();
      }
      return f;
    } catch (g) {
      if (i) {
        const $ = i(g, o);
        $ instanceof Promise && await $;
      }
      if (o <= t)
        return await new Promise(($) => setTimeout($, s)), l();
      throw g;
    }
  };
  return l();
}
function am(r) {
  const e = new URL(`https://${r.SUB_API}/sub`), t = new URLSearchParams();
  return t.set("target", "clash"), t.set("new_name", "true"), t.set("insert", "false"), t.set("config", r.SUB_CONFIG), t.set("url", r.SUB_LIST_URL), t.set("filename", "sub"), t.set("emoji", "true"), t.set("list", "false"), t.set("tfo", "false"), t.set("scv", "false"), t.set("fdn", "false"), t.set("sort", "false"), `${e.toString()}?${t.toString()}`;
}
const om = {
  SUB_API: "convert.08050611.xyz",
  SUB_CONFIG: "https://ovo.08050611.xyz/appStatic/clashConfig/ACL4SSR_Online_Full.ini",
  SUB_URLS: ""
};
async function nd(r, e) {
  const t = {
    ...om,
    ...r
  }, s = am(t), n = await cm(s, { retries: 3 });
  if (n.ok && r.KV_NAMESPACE_ID && r.ACCOUNT_ID) {
    const i = await n.data.text();
    return await e.kv.namespaces.values.update(r.KV_NAMESPACE_ID, "sub.yml", {
      account_id: r.ACCOUNT_ID,
      metadata: JSON.stringify({
        name: "sub.yml",
        type: "text"
      }),
      value: i
    }), i;
  }
  return "";
}
async function um(r, e) {
  if (!r.KV_NAMESPACE_ID || !r.ACCOUNT_ID)
    throw new Error("KV_NAMESPACE_ID and ACCOUNT_ID are required");
  const t = await e.kv.namespaces.values.get(r.KV_NAMESPACE_ID, "sub.yml", {
    account_id: r.ACCOUNT_ID
  });
  return t.ok ? t.json() : null;
}
async function id(r) {
  return new _({
    apiToken: r.KV_API_TOKEN,
    apiEmail: r.ACCOUNT_EMAIL
  });
}
const aU = {
  async fetch(r, e) {
    try {
      const { SUB_LIST_URL: t, KV_NAMESPACE_ID: s, ACCOUNT_ID: n } = e, { pathname: i } = new URL(r.url);
      if (!t || !s || !n)
        throw new Error("SUB_LIST_URL and KV_NAMESPACE_ID and ACCOUNT_ID are required");
      const c = await id(e);
      if (i === "/") {
        const o = await nd(e, c);
        return new Response(o, {
          headers: {
            "Content-Type": "text/yaml"
          }
        });
      } else if (i === "/sub.yml") {
        const o = await um(e, c);
        return new Response(o == null ? void 0 : o.value, {
          headers: new Headers({
            "Content-Type": "text/yaml; charset=utf-8"
          })
        });
      } else
        return new Response("Not Found", { status: 404 });
    } catch (t) {
      return new Response(t.message, { status: 500 });
    }
  },
  async scheduled(r, e, t) {
    const s = await id(e);
    t.waitUntil(nd(e, s));
  }
};
export {
  aU as default
};
