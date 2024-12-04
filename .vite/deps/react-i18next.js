import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/void-elements/index.js
var require_void_elements = __commonJS({
  "node_modules/void-elements/index.js"(exports, module) {
    module.exports = {
      "area": true,
      "base": true,
      "br": true,
      "col": true,
      "embed": true,
      "hr": true,
      "img": true,
      "input": true,
      "link": true,
      "meta": true,
      "param": true,
      "source": true,
      "track": true,
      "wbr": true
    };
  }
});

// node_modules/react-i18next/dist/es/Trans.js
var import_react3 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/TransWithoutContext.js
var import_react = __toESM(require_react(), 1);

// node_modules/html-parse-stringify/dist/html-parse-stringify.module.js
var import_void_elements = __toESM(require_void_elements());
var t = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function n(n2) {
  var r2 = { type: "tag", name: "", voidElement: false, attrs: {}, children: [] }, i2 = n2.match(/<\/?([^\s]+?)[/\s>]/);
  if (i2 && (r2.name = i2[1], (import_void_elements.default[i2[1]] || "/" === n2.charAt(n2.length - 2)) && (r2.voidElement = true), r2.name.startsWith("!--"))) {
    var s2 = n2.indexOf("-->");
    return { type: "comment", comment: -1 !== s2 ? n2.slice(4, s2) : "" };
  }
  for (var a2 = new RegExp(t), c2 = null; null !== (c2 = a2.exec(n2)); ) if (c2[0].trim()) if (c2[1]) {
    var o = c2[1].trim(), l = [o, ""];
    o.indexOf("=") > -1 && (l = o.split("=")), r2.attrs[l[0]] = l[1], a2.lastIndex--;
  } else c2[2] && (r2.attrs[c2[2]] = c2[3].trim().substring(1, c2[3].length - 1));
  return r2;
}
var r = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g;
var i = /^\s*$/;
var s = /* @__PURE__ */ Object.create(null);
function a(e2, t2) {
  switch (t2.type) {
    case "text":
      return e2 + t2.content;
    case "tag":
      return e2 += "<" + t2.name + (t2.attrs ? function(e3) {
        var t3 = [];
        for (var n2 in e3) t3.push(n2 + '="' + e3[n2] + '"');
        return t3.length ? " " + t3.join(" ") : "";
      }(t2.attrs) : "") + (t2.voidElement ? "/>" : ">"), t2.voidElement ? e2 : e2 + t2.children.reduce(a, "") + "</" + t2.name + ">";
    case "comment":
      return e2 + "<!--" + t2.comment + "-->";
  }
}
var c = { parse: function(e2, t2) {
  t2 || (t2 = {}), t2.components || (t2.components = s);
  var a2, c2 = [], o = [], l = -1, m = false;
  if (0 !== e2.indexOf("<")) {
    var u = e2.indexOf("<");
    c2.push({ type: "text", content: -1 === u ? e2 : e2.substring(0, u) });
  }
  return e2.replace(r, function(r2, s2) {
    if (m) {
      if (r2 !== "</" + a2.name + ">") return;
      m = false;
    }
    var u2, f = "/" !== r2.charAt(1), h = r2.startsWith("<!--"), p = s2 + r2.length, d = e2.charAt(p);
    if (h) {
      var v = n(r2);
      return l < 0 ? (c2.push(v), c2) : ((u2 = o[l]).children.push(v), c2);
    }
    if (f && (l++, "tag" === (a2 = n(r2)).type && t2.components[a2.name] && (a2.type = "component", m = true), a2.voidElement || m || !d || "<" === d || a2.children.push({ type: "text", content: e2.slice(p, e2.indexOf("<", p)) }), 0 === l && c2.push(a2), (u2 = o[l - 1]) && u2.children.push(a2), o[l] = a2), (!f || a2.voidElement) && (l > -1 && (a2.voidElement || a2.name === r2.slice(2, -1)) && (l--, a2 = -1 === l ? c2 : o[l]), !m && "<" !== d && d)) {
      u2 = -1 === l ? c2 : o[l].children;
      var x = e2.indexOf("<", p), g = e2.slice(p, -1 === x ? void 0 : x);
      i.test(g) && (g = " "), (x > -1 && l + u2.length >= 0 || " " !== g) && u2.push({ type: "text", content: g });
    }
  }), c2;
}, stringify: function(e2) {
  return e2.reduce(function(e3, t2) {
    return e3 + a("", t2);
  }, "");
} };
var html_parse_stringify_module_default = c;

// node_modules/react-i18next/dist/es/utils.js
var warn = (...args) => {
  if (console == null ? void 0 : console.warn) {
    if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
    console.warn(...args);
  }
};
var alreadyWarned = {};
var warnOnce = (...args) => {
  if (isString(args[0]) && alreadyWarned[args[0]]) return;
  if (isString(args[0])) alreadyWarned[args[0]] = /* @__PURE__ */ new Date();
  warn(...args);
};
var loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off("initialized", initialized);
      }, 0);
      cb();
    };
    i18n.on("initialized", initialized);
  }
};
var loadNamespaces = (i18n, ns, cb) => {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
};
var loadLanguages = (i18n, lng, ns, cb) => {
  if (isString(ns)) ns = [ns];
  if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
  ns.forEach((n2) => {
    if (i18n.options.ns.indexOf(n2) < 0) i18n.options.ns.push(n2);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
};
var hasLoadedNamespace = (ns, i18n, options = {}) => {
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce("i18n.languages were undefined or empty", i18n.languages);
    return true;
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance2, loadNotPending) => {
      var _a;
      if (((_a = options.bindI18n) == null ? void 0 : _a.indexOf("languageChanging")) > -1 && i18nInstance2.services.backendConnector.backend && i18nInstance2.isLanguageChangingTo && !loadNotPending(i18nInstance2.isLanguageChangingTo, ns)) return false;
    }
  });
};
var getDisplayName = (Component) => Component.displayName || Component.name || (isString(Component) && Component.length > 0 ? Component : "Unknown");
var isString = (obj) => typeof obj === "string";
var isObject = (obj) => typeof obj === "object" && obj !== null;

// node_modules/react-i18next/dist/es/unescape.js
var matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
var htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
};
var unescapeHtmlEntity = (m) => htmlEntities[m];
var unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);

// node_modules/react-i18next/dist/es/defaults.js
var defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
var setDefaults = (options = {}) => {
  defaultOptions = {
    ...defaultOptions,
    ...options
  };
};
var getDefaults = () => defaultOptions;

// node_modules/react-i18next/dist/es/i18nInstance.js
var i18nInstance;
var setI18n = (instance) => {
  i18nInstance = instance;
};
var getI18n = () => i18nInstance;

// node_modules/react-i18next/dist/es/TransWithoutContext.js
var hasChildren = (node, checkLength) => {
  var _a;
  if (!node) return false;
  const base = ((_a = node.props) == null ? void 0 : _a.children) ?? node.children;
  if (checkLength) return base.length > 0;
  return !!base;
};
var getChildren = (node) => {
  var _a, _b;
  if (!node) return [];
  const children = ((_a = node.props) == null ? void 0 : _a.children) ?? node.children;
  return ((_b = node.props) == null ? void 0 : _b.i18nIsDynamicList) ? getAsArray(children) : children;
};
var hasValidReactChildren = (children) => Array.isArray(children) && children.every(import_react.isValidElement);
var getAsArray = (data) => Array.isArray(data) ? data : [data];
var mergeProps = (source, target) => {
  const newTarget = {
    ...target
  };
  newTarget.props = Object.assign(source.props, target.props);
  return newTarget;
};
var nodesToString = (children, i18nOptions) => {
  if (!children) return "";
  let stringNode = "";
  const childrenArray = getAsArray(children);
  const keepArray = (i18nOptions == null ? void 0 : i18nOptions.transSupportBasicHtmlNodes) ? i18nOptions.transKeepBasicHtmlNodesFor ?? [] : [];
  childrenArray.forEach((child, childIndex) => {
    if (isString(child)) {
      stringNode += `${child}`;
    } else if ((0, import_react.isValidElement)(child)) {
      const {
        props,
        type
      } = child;
      const childPropsCount = Object.keys(props).length;
      const shouldKeepChild = keepArray.indexOf(type) > -1;
      const childChildren = props.children;
      if (!childChildren && shouldKeepChild && !childPropsCount) {
        stringNode += `<${type}/>`;
      } else if (!childChildren && (!shouldKeepChild || childPropsCount) || props.i18nIsDynamicList) {
        stringNode += `<${childIndex}></${childIndex}>`;
      } else if (shouldKeepChild && childPropsCount === 1 && isString(childChildren)) {
        stringNode += `<${type}>${childChildren}</${type}>`;
      } else {
        const content = nodesToString(childChildren, i18nOptions);
        stringNode += `<${childIndex}>${content}</${childIndex}>`;
      }
    } else if (child === null) {
      warn(`Trans: the passed in value is invalid - seems you passed in a null child.`);
    } else if (isObject(child)) {
      const {
        format,
        ...clone
      } = child;
      const keys = Object.keys(clone);
      if (keys.length === 1) {
        const value = format ? `${keys[0]}, ${format}` : keys[0];
        stringNode += `{{${value}}}`;
      } else {
        warn(`react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.`, child);
      }
    } else {
      warn(`Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.`, child);
    }
  });
  return stringNode;
};
var renderNodes = (children, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape) => {
  if (targetString === "") return [];
  const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
  const emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.map((keep) => `<${keep}`).join("|")).test(targetString);
  if (!children && !emptyChildrenButNeedsHandling && !shouldUnescape) return [targetString];
  const data = {};
  const getData = (childs) => {
    const childrenArray = getAsArray(childs);
    childrenArray.forEach((child) => {
      if (isString(child)) return;
      if (hasChildren(child)) getData(getChildren(child));
      else if (isObject(child) && !(0, import_react.isValidElement)(child)) Object.assign(data, child);
    });
  };
  getData(children);
  const ast = html_parse_stringify_module_default.parse(`<0>${targetString}</0>`);
  const opts = {
    ...data,
    ...combinedTOpts
  };
  const renderInner = (child, node, rootReactNode) => {
    var _a;
    const childs = getChildren(child);
    const mappedChildren = mapAST(childs, node.children, rootReactNode);
    return hasValidReactChildren(childs) && mappedChildren.length === 0 || ((_a = child.props) == null ? void 0 : _a.i18nIsDynamicList) ? childs : mappedChildren;
  };
  const pushTranslatedJSX = (child, inner, mem, i2, isVoid) => {
    if (child.dummy) {
      child.children = inner;
      mem.push((0, import_react.cloneElement)(child, {
        key: i2
      }, isVoid ? void 0 : inner));
    } else {
      mem.push(...import_react.Children.map([child], (c2) => {
        const props = {
          ...c2.props
        };
        delete props.i18nIsDynamicList;
        return (0, import_react.createElement)(c2.type, {
          ...props,
          key: i2,
          ref: c2.ref
        }, isVoid ? null : inner);
      }));
    }
  };
  const mapAST = (reactNode, astNode, rootReactNode) => {
    const reactNodes = getAsArray(reactNode);
    const astNodes = getAsArray(astNode);
    return astNodes.reduce((mem, node, i2) => {
      var _a, _b;
      const translationContent = ((_b = (_a = node.children) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
      if (node.type === "tag") {
        let tmp = reactNodes[parseInt(node.name, 10)];
        if (rootReactNode.length === 1 && !tmp) tmp = rootReactNode[0][node.name];
        if (!tmp) tmp = {};
        const child = Object.keys(node.attrs).length !== 0 ? mergeProps({
          props: node.attrs
        }, tmp) : tmp;
        const isElement = (0, import_react.isValidElement)(child);
        const isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
        const isEmptyTransWithHTML = emptyChildrenButNeedsHandling && isObject(child) && child.dummy && !isElement;
        const isKnownComponent = isObject(children) && Object.hasOwnProperty.call(children, node.name);
        if (isString(child)) {
          const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
          mem.push(value);
        } else if (hasChildren(child) || isValidTranslationWithChildren) {
          const inner = renderInner(child, node, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i2);
        } else if (isEmptyTransWithHTML) {
          const inner = mapAST(reactNodes, node.children, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i2);
        } else if (Number.isNaN(parseFloat(node.name))) {
          if (isKnownComponent) {
            const inner = renderInner(child, node, rootReactNode);
            pushTranslatedJSX(child, inner, mem, i2, node.voidElement);
          } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
            if (node.voidElement) {
              mem.push((0, import_react.createElement)(node.name, {
                key: `${node.name}-${i2}`
              }));
            } else {
              const inner = mapAST(reactNodes, node.children, rootReactNode);
              mem.push((0, import_react.createElement)(node.name, {
                key: `${node.name}-${i2}`
              }, inner));
            }
          } else if (node.voidElement) {
            mem.push(`<${node.name} />`);
          } else {
            const inner = mapAST(reactNodes, node.children, rootReactNode);
            mem.push(`<${node.name}>${inner}</${node.name}>`);
          }
        } else if (isObject(child) && !isElement) {
          const content = node.children[0] ? translationContent : null;
          if (content) mem.push(content);
        } else {
          pushTranslatedJSX(child, translationContent, mem, i2, node.children.length !== 1 || !translationContent);
        }
      } else if (node.type === "text") {
        const wrapTextNodes = i18nOptions.transWrapTextNodes;
        const content = shouldUnescape ? i18nOptions.unescape(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
        if (wrapTextNodes) {
          mem.push((0, import_react.createElement)(wrapTextNodes, {
            key: `${node.name}-${i2}`
          }, content));
        } else {
          mem.push(content);
        }
      }
      return mem;
    }, []);
  };
  const result = mapAST([{
    dummy: true,
    children: children || []
  }], ast, getAsArray(children || []));
  return getChildren(result[0]);
};
function Trans({
  children,
  count,
  parent,
  i18nKey,
  context,
  tOptions = {},
  values,
  defaults,
  components,
  ns,
  i18n: i18nFromProps,
  t: tFromProps,
  shouldUnescape,
  ...additionalProps
}) {
  var _a, _b, _c, _d, _e, _f;
  const i18n = i18nFromProps || getI18n();
  if (!i18n) {
    warnOnce("You will need to pass in an i18next instance by using i18nextReactModule");
    return children;
  }
  const t2 = tFromProps || i18n.t.bind(i18n) || ((k) => k);
  const reactI18nextOptions = {
    ...getDefaults(),
    ...(_a = i18n.options) == null ? void 0 : _a.react
  };
  let namespaces = ns || t2.ns || ((_b = i18n.options) == null ? void 0 : _b.defaultNS);
  namespaces = isString(namespaces) ? [namespaces] : namespaces || ["translation"];
  const nodeAsString = nodesToString(children, reactI18nextOptions);
  const defaultValue = defaults || nodeAsString || reactI18nextOptions.transEmptyNodeValue || i18nKey;
  const {
    hashTransKey
  } = reactI18nextOptions;
  const key = i18nKey || (hashTransKey ? hashTransKey(nodeAsString || defaultValue) : nodeAsString || defaultValue);
  if ((_d = (_c = i18n.options) == null ? void 0 : _c.interpolation) == null ? void 0 : _d.defaultVariables) {
    values = values && Object.keys(values).length > 0 ? {
      ...values,
      ...i18n.options.interpolation.defaultVariables
    } : {
      ...i18n.options.interpolation.defaultVariables
    };
  }
  const interpolationOverride = values || count !== void 0 && !((_f = (_e = i18n.options) == null ? void 0 : _e.interpolation) == null ? void 0 : _f.alwaysFormat) || !children ? tOptions.interpolation : {
    interpolation: {
      ...tOptions.interpolation,
      prefix: "#$?",
      suffix: "?$#"
    }
  };
  const combinedTOpts = {
    ...tOptions,
    context: context || tOptions.context,
    count,
    ...values,
    ...interpolationOverride,
    defaultValue,
    ns: namespaces
  };
  const translation = key ? t2(key, combinedTOpts) : defaultValue;
  if (components) {
    Object.keys(components).forEach((c2) => {
      if (!components[c2].key) components[c2] = (0, import_react.cloneElement)(components[c2], {
        key: c2
      });
      const comp = components[c2];
      if (typeof comp.type === "function" || !comp.props || !comp.props.children || translation.indexOf(`${c2}/>`) < 0 && translation.indexOf(`${c2} />`) < 0) return;
      function Componentized() {
        return (0, import_react.createElement)(import_react.Fragment, null, comp);
      }
      components[c2] = (0, import_react.createElement)(Componentized);
    });
  }
  const content = renderNodes(components || children, translation, i18n, reactI18nextOptions, combinedTOpts, shouldUnescape);
  const useAsParent = parent ?? reactI18nextOptions.defaultTransParent;
  return useAsParent ? (0, import_react.createElement)(useAsParent, additionalProps, content) : content;
}

// node_modules/react-i18next/dist/es/context.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/initReactI18next.js
var initReactI18next = {
  type: "3rdParty",
  init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};

// node_modules/react-i18next/dist/es/context.js
var I18nContext = (0, import_react2.createContext)();
var ReportNamespaces = class {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach((ns) => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
};
var composeInitialProps = (ForComponent) => async (ctx) => {
  var _a;
  const componentsInitialProps = await ((_a = ForComponent.getInitialProps) == null ? void 0 : _a.call(ForComponent, ctx)) ?? {};
  const i18nInitialProps = getInitialProps();
  return {
    ...componentsInitialProps,
    ...i18nInitialProps
  };
};
var getInitialProps = () => {
  var _a;
  const i18n = getI18n();
  const namespaces = ((_a = i18n.reportNamespaces) == null ? void 0 : _a.getUsedNamespaces()) ?? [];
  const ret = {};
  const initialI18nStore = {};
  i18n.languages.forEach((l) => {
    initialI18nStore[l] = {};
    namespaces.forEach((ns) => {
      initialI18nStore[l][ns] = i18n.getResourceBundle(l, ns) || {};
    });
  });
  ret.initialI18nStore = initialI18nStore;
  ret.initialLanguage = i18n.language;
  return ret;
};

// node_modules/react-i18next/dist/es/Trans.js
function Trans2({
  children,
  count,
  parent,
  i18nKey,
  context,
  tOptions = {},
  values,
  defaults,
  components,
  ns,
  i18n: i18nFromProps,
  t: tFromProps,
  shouldUnescape,
  ...additionalProps
}) {
  var _a;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0, import_react3.useContext)(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  const t2 = tFromProps || (i18n == null ? void 0 : i18n.t.bind(i18n));
  return Trans({
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions,
    values,
    defaults,
    components,
    ns: ns || (t2 == null ? void 0 : t2.ns) || defaultNSFromContext || ((_a = i18n == null ? void 0 : i18n.options) == null ? void 0 : _a.defaultNS),
    i18n,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  });
}

// node_modules/react-i18next/dist/es/useTranslation.js
var import_react4 = __toESM(require_react(), 1);
var usePrevious = (value, ignore) => {
  const ref = (0, import_react4.useRef)();
  (0, import_react4.useEffect)(() => {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
var alwaysNewT = (i18n, language, namespace, keyPrefix) => i18n.getFixedT(language, namespace, keyPrefix);
var useMemoizedT = (i18n, language, namespace, keyPrefix) => (0, import_react4.useCallback)(alwaysNewT(i18n, language, namespace, keyPrefix), [i18n, language, namespace, keyPrefix]);
var useTranslation = (ns, props = {}) => {
  var _a, _b, _c, _d;
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0, import_react4.useContext)(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce("You will need to pass in an i18next instance by using initReactI18next");
    const notReadyT = (k, optsOrDefaultValue) => {
      if (isString(optsOrDefaultValue)) return optsOrDefaultValue;
      if (isObject(optsOrDefaultValue) && isString(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if ((_a = i18n.options.react) == null ? void 0 : _a.wait) warnOnce("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const i18nOptions = {
    ...getDefaults(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || ((_b = i18n.options) == null ? void 0 : _b.defaultNS);
  namespaces = isString(namespaces) ? [namespaces] : namespaces || ["translation"];
  (_d = (_c = i18n.reportNamespaces).addUsedNamespaces) == null ? void 0 : _d.call(_c, namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n2) => hasLoadedNamespace(n2, i18n, i18nOptions));
  const memoGetT = useMemoizedT(i18n, props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
  const getT = () => memoGetT;
  const getNewT = () => alwaysNewT(i18n, props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
  const [t2, setT] = (0, import_react4.useState)(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = (0, import_react4.useRef)(true);
  (0, import_react4.useEffect)(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        loadLanguages(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      } else {
        loadNamespaces(i18n, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getNewT);
    }
    const boundReset = () => {
      if (isMounted.current) setT(getNewT);
    };
    if (bindI18n) i18n == null ? void 0 : i18n.on(bindI18n, boundReset);
    if (bindI18nStore) i18n == null ? void 0 : i18n.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (i18n) bindI18n == null ? void 0 : bindI18n.split(" ").forEach((e2) => i18n.off(e2, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(" ").forEach((e2) => i18n.store.off(e2, boundReset));
    };
  }, [i18n, joinedNS]);
  (0, import_react4.useEffect)(() => {
    if (isMounted.current && ready) {
      setT(getT);
    }
  }, [i18n, keyPrefix, ready]);
  const ret = [t2, i18n, ready];
  ret.t = t2;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise((resolve) => {
    if (props.lng) {
      loadLanguages(i18n, props.lng, namespaces, () => resolve());
    } else {
      loadNamespaces(i18n, namespaces, () => resolve());
    }
  });
};

// node_modules/react-i18next/dist/es/withTranslation.js
var import_react5 = __toESM(require_react(), 1);
var withTranslation = (ns, options = {}) => function Extend(WrappedComponent) {
  function I18nextWithTranslation({
    forwardedRef,
    ...rest
  }) {
    const [t2, i18n, ready] = useTranslation(ns, {
      ...rest,
      keyPrefix: options.keyPrefix
    });
    const passDownProps = {
      ...rest,
      t: t2,
      i18n,
      tReady: ready
    };
    if (options.withRef && forwardedRef) {
      passDownProps.ref = forwardedRef;
    } else if (!options.withRef && forwardedRef) {
      passDownProps.forwardedRef = forwardedRef;
    }
    return (0, import_react5.createElement)(WrappedComponent, passDownProps);
  }
  I18nextWithTranslation.displayName = `withI18nextTranslation(${getDisplayName(WrappedComponent)})`;
  I18nextWithTranslation.WrappedComponent = WrappedComponent;
  const forwardRef = (props, ref) => (0, import_react5.createElement)(I18nextWithTranslation, Object.assign({}, props, {
    forwardedRef: ref
  }));
  return options.withRef ? (0, import_react5.forwardRef)(forwardRef) : I18nextWithTranslation;
};

// node_modules/react-i18next/dist/es/Translation.js
var Translation = ({
  ns,
  children,
  ...options
}) => {
  const [t2, i18n, ready] = useTranslation(ns, options);
  return children(t2, {
    i18n,
    lng: i18n.language
  }, ready);
};

// node_modules/react-i18next/dist/es/I18nextProvider.js
var import_react6 = __toESM(require_react(), 1);
function I18nextProvider({
  i18n,
  defaultNS,
  children
}) {
  const value = (0, import_react6.useMemo)(() => ({
    i18n,
    defaultNS
  }), [i18n, defaultNS]);
  return (0, import_react6.createElement)(I18nContext.Provider, {
    value
  }, children);
}

// node_modules/react-i18next/dist/es/withSSR.js
var import_react8 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/useSSR.js
var import_react7 = __toESM(require_react(), 1);
var useSSR = (initialI18nStore, initialLanguage, props = {}) => {
  var _a;
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext
  } = (0, import_react7.useContext)(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if ((_a = i18n.options) == null ? void 0 : _a.isClone) return;
  if (initialI18nStore && !i18n.initializedStoreOnce) {
    i18n.services.resourceStore.data = initialI18nStore;
    i18n.options.ns = Object.values(initialI18nStore).reduce((mem, lngResources) => {
      Object.keys(lngResources).forEach((ns) => {
        if (mem.indexOf(ns) < 0) mem.push(ns);
      });
      return mem;
    }, i18n.options.ns);
    i18n.initializedStoreOnce = true;
    i18n.isInitialized = true;
  }
  if (initialLanguage && !i18n.initializedLanguageOnce) {
    i18n.changeLanguage(initialLanguage);
    i18n.initializedLanguageOnce = true;
  }
};

// node_modules/react-i18next/dist/es/withSSR.js
var withSSR = () => function Extend(WrappedComponent) {
  function I18nextWithSSR({
    initialI18nStore,
    initialLanguage,
    ...rest
  }) {
    useSSR(initialI18nStore, initialLanguage);
    return (0, import_react8.createElement)(WrappedComponent, {
      ...rest
    });
  }
  I18nextWithSSR.getInitialProps = composeInitialProps(WrappedComponent);
  I18nextWithSSR.displayName = `withI18nextSSR(${getDisplayName(WrappedComponent)})`;
  I18nextWithSSR.WrappedComponent = WrappedComponent;
  return I18nextWithSSR;
};

// node_modules/react-i18next/dist/es/index.js
var date = () => "";
var time = () => "";
var number = () => "";
var select = () => "";
var plural = () => "";
var selectOrdinal = () => "";
export {
  I18nContext,
  I18nextProvider,
  Trans2 as Trans,
  Trans as TransWithoutContext,
  Translation,
  composeInitialProps,
  date,
  getDefaults,
  getI18n,
  getInitialProps,
  initReactI18next,
  number,
  plural,
  select,
  selectOrdinal,
  setDefaults,
  setI18n,
  time,
  useSSR,
  useTranslation,
  withSSR,
  withTranslation
};
//# sourceMappingURL=react-i18next.js.map
