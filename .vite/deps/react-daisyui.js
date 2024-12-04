import {
  require_jsx_runtime
} from "./chunk-5HDAWWHN.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/react-daisyui/dist/react-daisyui.modern.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r2 in t) ({}).hasOwnProperty.call(t, r2) && (n[r2] = t[r2]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectDestructuringEmpty(t) {
  if (null == t) throw new TypeError("Cannot destructure " + t);
}
function _objectWithoutPropertiesLoose(r2, e) {
  if (null == r2) return {};
  var t = {};
  for (var n in r2) if ({}.hasOwnProperty.call(r2, n)) {
    if (e.includes(n)) continue;
    t[n] = r2[n];
  }
  return t;
}
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  else for (t in e) e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; ) (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
function twJoin() {
  var index = 0;
  var argument;
  var resolvedValue;
  var string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  var resolvedValue;
  var string = "";
  for (var k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var CLASS_PART_SEPARATOR = "-";
function createClassUtils(config) {
  var classMap = createClassMap(config);
  var conflictingClassGroups = config.conflictingClassGroups, _config$conflictingCl = config.conflictingClassGroupModifiers, conflictingClassGroupModifiers = _config$conflictingCl === void 0 ? {} : _config$conflictingCl;
  function getClassGroupId(className) {
    var classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    var conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [].concat(conflicts, conflictingClassGroupModifiers[classGroupId]);
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  var _a;
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  var currentClassPart = classParts[0];
  var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  var classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_a = classPartObject.validators.find(function(_ref) {
    var validator = _ref.validator;
    return validator(classRest);
  })) == null ? void 0 : _a.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    var property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  var theme = config.theme, prefix = config.prefix;
  var classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(function(_ref2) {
    var classGroupId = _ref2[0], classGroup = _ref2[1];
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(function(classDefinition) {
    if (typeof classDefinition === "string") {
      var classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(function(_ref3) {
      var key = _ref3[0], classGroup2 = _ref3[1];
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  var currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(function(pathPart) {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(function(_ref4) {
    var classGroupId = _ref4[0], classGroup = _ref4[1];
    var prefixedClassGroup = classGroup.map(function(classDefinition) {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(function(_ref5) {
          var key = _ref5[0], value = _ref5[1];
          return [prefix + key, value];
        }));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: function get() {
        return void 0;
      },
      set: function set() {
      }
    };
  }
  var cacheSize = 0;
  var cache = /* @__PURE__ */ new Map();
  var previousCache = /* @__PURE__ */ new Map();
  function update(key, value) {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get: function get(key) {
      var value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set: function set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}
var IMPORTANT_MODIFIER = "!";
function createSplitModifiers(config) {
  var separator = config.separator || ":";
  var isSeparatorSingleCharacter = separator.length === 1;
  var firstSeparatorCharacter = separator[0];
  var separatorLength = separator.length;
  return function splitModifiers(className) {
    var modifiers = [];
    var bracketDepth = 0;
    var modifierStart = 0;
    var postfixModifierPosition;
    for (var index = 0; index < className.length; index++) {
      var currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    var baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    var maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  var sortedModifiers = [];
  var unsortedModifiers = [];
  modifiers.forEach(function(modifier) {
    var isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
var SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList, configUtils) {
  var splitModifiers = configUtils.splitModifiers, getClassGroupId = configUtils.getClassGroupId, getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
  var classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map(function(originalClassName) {
    var _splitModifiers = splitModifiers(originalClassName), modifiers = _splitModifiers.modifiers, hasImportantModifier = _splitModifiers.hasImportantModifier, baseClassName = _splitModifiers.baseClassName, maybePostfixModifierPosition = _splitModifiers.maybePostfixModifierPosition;
    var classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    var hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    var variantModifier = sortModifiers(modifiers).join(":");
    var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter(function(parsed) {
    if (!parsed.isTailwindClass) {
      return true;
    }
    var modifierId = parsed.modifierId, classGroupId = parsed.classGroupId, hasPostfixModifier = parsed.hasPostfixModifier;
    var classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(function(group) {
      return classGroupsInConflict.add(modifierId + group);
    });
    return true;
  }).reverse().map(function(parsed) {
    return parsed.originalClassName;
  }).join(" ");
}
function createTailwindMerge() {
  for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
    createConfig[_key] = arguments[_key];
  }
  var configUtils;
  var cacheGet;
  var cacheSet;
  var functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    var firstCreateConfig = createConfig[0], restCreateConfig = createConfig.slice(1);
    var config = restCreateConfig.reduce(function(previousConfig, createConfigCurrent) {
      return createConfigCurrent(previousConfig);
    }, firstCreateConfig());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    var cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    var result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key) {
  var themeGetter = function themeGetter2(theme) {
    return theme[key] || [];
  };
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value) || isArbitraryLength(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, "size", isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryUrl(value) {
  return getIsArbitraryValue(value, "url", isUrl);
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber);
}
function isNumber(value) {
  return !Number.isNaN(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isInteger(value) {
  return isIntegerOnly(value) || getIsArbitraryValue(value, "number", isIntegerOnly);
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isAny() {
  return true;
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function getIsArbitraryValue(value, label, testValue) {
  var result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return result[1] === label;
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value);
}
function isNever() {
  return false;
}
function isUrl(value) {
  return value.startsWith("url(");
}
function isIntegerOnly(value) {
  return Number.isInteger(Number(value));
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function getDefaultConfig() {
  var colors = fromTheme("colors");
  var spacing = fromTheme("spacing");
  var blur = fromTheme("blur");
  var brightness = fromTheme("brightness");
  var borderColor = fromTheme("borderColor");
  var borderRadius = fromTheme("borderRadius");
  var borderSpacing = fromTheme("borderSpacing");
  var borderWidth = fromTheme("borderWidth");
  var contrast = fromTheme("contrast");
  var grayscale = fromTheme("grayscale");
  var hueRotate = fromTheme("hueRotate");
  var invert = fromTheme("invert");
  var gap = fromTheme("gap");
  var gradientColorStops = fromTheme("gradientColorStops");
  var gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  var inset = fromTheme("inset");
  var margin = fromTheme("margin");
  var opacity = fromTheme("opacity");
  var padding = fromTheme("padding");
  var saturate = fromTheme("saturate");
  var scale = fromTheme("scale");
  var sepia = fromTheme("sepia");
  var skew = fromTheme("skew");
  var space = fromTheme("space");
  var translate = fromTheme("translate");
  var getOverscroll = function getOverscroll2() {
    return ["auto", "contain", "none"];
  };
  var getOverflow = function getOverflow2() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  };
  var getSpacingWithAutoAndArbitrary = function getSpacingWithAutoAndArbitrary2() {
    return ["auto", isArbitraryValue, spacing];
  };
  var getSpacingWithArbitrary = function getSpacingWithArbitrary2() {
    return [isArbitraryValue, spacing];
  };
  var getLengthWithEmpty = function getLengthWithEmpty2() {
    return ["", isLength];
  };
  var getNumberWithAutoAndArbitrary = function getNumberWithAutoAndArbitrary2() {
    return ["auto", isNumber, isArbitraryValue];
  };
  var getPositions = function getPositions2() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  };
  var getLineStyles = function getLineStyles2() {
    return ["solid", "dashed", "dotted", "double", "none"];
  };
  var getBlendModes = function getBlendModes2() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  };
  var getAlign = function getAlign2() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  };
  var getZeroAndEmpty = function getZeroAndEmpty2() {
    return ["", "0", isArbitraryValue];
  };
  var getBreaks = function getBreaks2() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  };
  var getNumber = function getNumber2() {
    return [isNumber, isArbitraryNumber];
  };
  var getNumberAndArbitrary = function getNumberAndArbitrary2() {
    return [isNumber, isArbitraryValue];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [isAny],
      spacing: [isLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmpty(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      "float": [{
        "float": ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [].concat(getPositions(), [isArbitraryValue])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal"].concat(getAlign())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal"].concat(getAlign(), ["baseline"])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [].concat(getAlign(), ["baseline"])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", isArbitraryValue, isLength]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize, isArbitraryValue]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", isArbitraryValue, isLength]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isArbitraryValue, isLength]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [].concat(getLineStyles(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isArbitraryValue, isLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      "break": [{
        "break": ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [].concat(getPositions(), [isArbitraryPosition])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryUrl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [].concat(getLineStyles(), ["hidden"])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [""].concat(getLineStyles())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isArbitraryValue, isLength]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmpty()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var twMerge = createTailwindMerge(getDefaultConfig);
var _excluded$1A = ["size", "variant", "color", "dataTheme", "className", "style"];
var Loading = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    size,
    variant = "spinner",
    color,
    dataTheme,
    className,
    style
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1A);
  const classes = twMerge("loading", className, clsx({
    "loading-lg": size === "lg",
    "loading-md": size === "md",
    "loading-sm": size === "sm",
    "loading-xs": size === "xs",
    "loading-spinner": variant === "spinner",
    "loading-dots": variant === "dots",
    "loading-ring": variant === "ring",
    "loading-ball": variant === "ball",
    "loading-bars": variant === "bars",
    "loading-infinity": variant === "infinity",
    "text-primary": color === "primary",
    "text-secondary": color === "secondary",
    "text-accent": color === "accent",
    "text-info": color === "info",
    "text-success": color === "success",
    "text-warning": color === "warning",
    "text-error": color === "error",
    "text-ghost": color === "ghost"
  }));
  return (0, import_jsx_runtime.jsx)("span", _extends({}, props, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    style
  }));
});
Loading.displayName = "Loading";
var _excluded$1z = ["children", "shape", "size", "variant", "color", "glass", "startIcon", "endIcon", "wide", "fullWidth", "responsive", "animation", "loading", "active", "disabled", "dataTheme", "className", "style", "tag"];
var VoidElementList = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "keygen", "meta", "param", "source", "track", "wbr"];
var Button = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    shape,
    size,
    variant,
    color,
    glass,
    startIcon,
    endIcon,
    wide,
    fullWidth,
    responsive,
    animation = true,
    loading,
    active,
    disabled,
    dataTheme,
    className,
    style,
    tag = "button"
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1z);
  const Tag = tag;
  const classes = twMerge("btn", className, clsx((startIcon && !loading || endIcon) && "gap-2", {
    "btn-lg": size === "lg",
    "btn-md": size === "md",
    "btn-sm": size === "sm",
    "btn-xs": size === "xs",
    "btn-circle": shape === "circle",
    "btn-square": shape === "square",
    "btn-outline": variant === "outline",
    "btn-link": variant === "link",
    "btn-neutral": color === "neutral",
    "btn-primary": color === "primary",
    "btn-secondary": color === "secondary",
    "btn-accent": color === "accent",
    "btn-info": color === "info",
    "btn-success": color === "success",
    "btn-warning": color === "warning",
    "btn-error": color === "error",
    "btn-ghost": color === "ghost",
    glass,
    "btn-wide": wide,
    "btn-block": fullWidth,
    "btn-xs sm:btn-sm md:btn-md lg:btn-lg": responsive,
    "no-animation": !animation,
    "btn-active": active,
    "btn-disabled": disabled
  }));
  if (VoidElementList.includes(Tag)) {
    return (0, import_jsx_runtime.jsx)(Tag, _extends({}, props, {
      ref,
      "data-theme": dataTheme,
      className: classes,
      style,
      disabled
    }));
  } else {
    return (0, import_jsx_runtime.jsxs)(Tag, _extends({}, props, {
      ref,
      "data-theme": dataTheme,
      className: classes,
      style,
      disabled,
      children: [loading && (0, import_jsx_runtime.jsx)(Loading, {
        size
      }), startIcon && !loading && startIcon, children, endIcon && endIcon]
    }));
  }
});
Button.displayName = "Button";
var _excluded$1y = ["children", "color", "size", "button", "dataTheme", "className", "disabled"];
var DropdownToggle = (_ref) => {
  let {
    children,
    color,
    size,
    button = true,
    dataTheme,
    className,
    disabled
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1y);
  return (0, import_jsx_runtime.jsx)("label", _extends({
    tabIndex: 0,
    className
  }, props, {
    children: button ? (0, import_jsx_runtime.jsx)(Button, {
      type: "button",
      dataTheme,
      color,
      size,
      disabled,
      children
    }) : children
  }));
};
var Summary$1 = (0, import_react.forwardRef)((props, ref) => {
  return (0, import_jsx_runtime.jsx)(Button, _extends({}, props, {
    ref,
    tag: "summary"
  }));
});
var _excluded$1x = ["children", "className", "horizontal", "vertical", "end", "dataTheme", "open"];
var Details$1 = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    horizontal,
    vertical,
    end,
    dataTheme,
    open
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1x);
  return (0, import_jsx_runtime.jsx)("details", _extends({
    role: "listbox"
  }, props, {
    ref,
    "data-theme": dataTheme,
    className: classesFn$5({
      className,
      horizontal,
      vertical,
      open,
      end
    }),
    open,
    children
  }));
});
Details$1.displayName = "Details";
var DropdownDetails = Object.assign(Details$1, {
  Toggle: Summary$1
});
var _excluded$1w = ["dataTheme", "className"];
var DropdownMenu = (_ref) => {
  let {
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1w);
  const classes = twMerge("dropdown-content menu p-2 shadow bg-base-100 rounded-box", className);
  return (0, import_jsx_runtime.jsx)("ul", _extends({}, props, {
    tabIndex: 0,
    "data-theme": dataTheme,
    className: classes,
    role: "menu"
  }));
};
var _excluded$1v = ["anchor"];
var DropdownItem = import_react.default.forwardRef((_ref, ref) => {
  let {
    anchor = true
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1v);
  return (0, import_jsx_runtime.jsx)("li", {
    role: "menuitem",
    children: anchor ? (0, import_jsx_runtime.jsx)("a", _extends({
      ref
    }, props)) : props.children
  });
});
var _excluded$1u = ["children", "className", "item", "horizontal", "vertical", "end", "hover", "open", "dataTheme"];
var classesFn$5 = ({
  className,
  horizontal,
  vertical,
  end,
  hover,
  open
}) => twMerge("dropdown", className, clsx({
  "dropdown-left": horizontal === "left",
  "dropdown-right": horizontal === "right",
  "dropdown-top": vertical === "top",
  "dropdown-bottom": vertical === "bottom",
  "dropdown-end": end,
  "dropdown-hover": hover,
  "dropdown-open": open
}));
var Dropdown = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    item,
    horizontal,
    vertical,
    end,
    hover,
    open,
    dataTheme
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1u);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "listbox"
  }, props, {
    ref,
    "data-theme": dataTheme,
    className: classesFn$5({
      className,
      horizontal,
      vertical,
      end,
      hover,
      open
    }),
    children: item ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [(0, import_jsx_runtime.jsx)("label", {
        tabIndex: 0,
        children
      }), (0, import_jsx_runtime.jsx)("ul", {
        className: "dropdown-content",
        children: item
      })]
    }) : (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children
    })
  }));
});
var Dropdown$1 = Object.assign(Dropdown, {
  Details: DropdownDetails,
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
  Item: DropdownItem
});
var _excluded$1t = ["children", "className"];
var ModalActions = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1t);
  const classes = twMerge("modal-action", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    ref,
    children
  }));
});
ModalActions.displayName = "ModalActions";
var _excluded$1s = ["children", "className"];
var ModalBody = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1s);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className,
    ref,
    children
  }));
});
ModalBody.displayName = "ModalBody";
var _excluded$1r = ["children", "className"];
var ModalHeader = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1r);
  const classes = twMerge("w-full mb-8 text-xl", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    ref,
    children
  }));
});
ModalHeader.displayName = "ModalHeader";
var _excluded$1q = ["children", "open", "responsive", "onClickBackdrop", "dataTheme", "className"];
var Modal$2 = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    open,
    responsive,
    onClickBackdrop,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1q);
  const containerClasses = twMerge("modal", clsx({
    "modal-open": open,
    "modal-bottom sm:modal-middle": responsive
  }));
  const bodyClasses = twMerge("modal-box", className);
  return (0, import_jsx_runtime.jsx)("div", {
    "aria-label": "Modal",
    "aria-hidden": !open,
    "aria-modal": open,
    "data-theme": dataTheme,
    className: containerClasses,
    onClick: (e) => {
      e.stopPropagation();
      if (e.target === e.currentTarget) {
        e.stopPropagation();
        if (onClickBackdrop) {
          onClickBackdrop();
        }
      }
    },
    children: (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
      "data-theme": dataTheme,
      className: bodyClasses,
      ref,
      children
    }))
  });
});
Modal$2.displayName = "Modal";
var _excluded$1p = ["children", "open", "responsive", "backdrop", "ariaHidden", "dataTheme", "className"];
var _excluded2 = ["children"];
var Modal = (0, import_react.forwardRef)((_ref, ref) => {
  var _ariaHidden;
  let {
    children,
    open,
    responsive,
    backdrop,
    ariaHidden,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1p);
  const containerClasses = twMerge("modal", clsx({
    "modal-open": open,
    "modal-bottom sm:modal-middle": responsive
  }));
  ariaHidden = (_ariaHidden = ariaHidden) != null ? _ariaHidden : !open;
  const bodyClasses = twMerge("modal-box", className);
  return (0, import_jsx_runtime.jsxs)("dialog", _extends({}, props, {
    "aria-label": "Modal",
    "aria-hidden": ariaHidden,
    open,
    "aria-modal": open,
    "data-theme": dataTheme,
    className: containerClasses,
    ref,
    children: [(0, import_jsx_runtime.jsx)("div", {
      "data-theme": dataTheme,
      className: bodyClasses,
      children
    }), backdrop && (0, import_jsx_runtime.jsx)("form", {
      method: "dialog",
      className: "modal-backdrop",
      children: (0, import_jsx_runtime.jsx)("button", {
        children: "close"
      })
    })]
  }));
});
Modal.displayName = "Modal";
var useDialog = () => {
  const dialogRef = (0, import_react.useRef)(null);
  const handleShow = (0, import_react.useCallback)(() => {
    var _dialogRef$current;
    (_dialogRef$current = dialogRef.current) == null || _dialogRef$current.showModal();
  }, [dialogRef]);
  const handleHide = (0, import_react.useCallback)(() => {
    var _dialogRef$current2;
    (_dialogRef$current2 = dialogRef.current) == null || _dialogRef$current2.close();
  }, [dialogRef]);
  const Dialog = (_ref2) => {
    let {
      children
    } = _ref2, props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
    return (0, import_jsx_runtime.jsx)(Modal, _extends({}, props, {
      ref: dialogRef,
      children
    }));
  };
  Dialog.displayName = "Dialog";
  return {
    dialogRef,
    Dialog,
    handleShow,
    handleHide
  };
};
var Modal$1 = Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Actions: ModalActions,
  Legacy: Modal$2,
  useDialog
});
var isReactFragment = (node) => {
  if (!node) return false;
  if (node != null && node.type) {
    return (node == null ? void 0 : node.type) === import_react.default.Fragment;
  }
  return node === import_react.default.Fragment;
};
var wrapWithElementIfInvalid = ({
  node,
  wrapper,
  props: _props = {}
}) => {
  if (!node) {
    return import_react.default.cloneElement(wrapper, _props);
  } else if (!import_react.default.isValidElement(node)) {
    return import_react.default.cloneElement(wrapper, _props, node);
  } else if (isReactFragment(node)) {
    var _node$props;
    return import_react.default.cloneElement(wrapper, _extends({}, _props, {
      className: twMerge((_node$props = node.props) == null ? void 0 : _node$props.className, _props == null ? void 0 : _props.className)
    }), node.props.children);
  } else {
    var _node$props2;
    return import_react.default.cloneElement(node, _extends({}, _props, {
      className: twMerge((_node$props2 = node.props) == null ? void 0 : _node$props2.className, _props == null ? void 0 : _props.className)
    }));
  }
};
var isSingleStringChild = (children) => {
  return children && import_react.default.Children.count(children) === 1 && import_react.default.isValidElement(children) && typeof children.props.children === "string";
};
var _excluded$1o = ["onElement", "offElement", "active", "rotate", "flip", "dataTheme", "className", "onClick", "onChange"];
var Swap = import_react.default.forwardRef((_ref, ref) => {
  let {
    onElement,
    offElement,
    active,
    rotate,
    flip,
    dataTheme,
    className,
    onClick,
    onChange
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1o);
  const classes = twMerge("swap", className, clsx({
    "swap-active": active,
    "swap-rotate": rotate,
    "swap-flip": flip
  }));
  const onEl = wrapWithElementIfInvalid({
    node: onElement,
    wrapper: (0, import_jsx_runtime.jsx)("div", {}),
    props: {
      className: "swap-on"
    }
  });
  const offEl = wrapWithElementIfInvalid({
    node: offElement,
    wrapper: (0, import_jsx_runtime.jsx)("div", {}),
    props: {
      className: "swap-off"
    }
  });
  return (0, import_jsx_runtime.jsxs)("label", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children: [(0, import_jsx_runtime.jsx)("input", {
      type: "checkbox",
      onClick,
      onChange
    }), onEl, offEl]
  }));
});
var _excluded$1n = ["children", "className"];
var AvatarGroup = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1n);
  const classes = twMerge("avatar-group -space-x-6", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": `Group of ${children.length} avatar photos`
  }, props, {
    className: classes,
    ref,
    children
  }));
});
var _excluded$1m = ["size", "src", "letters", "shape", "color", "border", "borderColor", "online", "offline", "dataTheme", "className", "innerClassName", "children"];
var Avatar = import_react.default.forwardRef((_ref, ref) => {
  let {
    size = "md",
    src,
    letters,
    shape,
    color,
    border,
    borderColor,
    online,
    offline,
    dataTheme,
    className,
    innerClassName,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1m);
  const containerClasses = twMerge("avatar", className, clsx({
    online,
    offline,
    placeholder: !src
  }));
  const imgClasses = clsx(innerClassName, {
    "ring ring-offset-base-100 ring-offset-2": border,
    "ring-accent": borderColor === "accent",
    "ring-error": borderColor === "error",
    "ring-info": borderColor === "info",
    "ring-neutral": borderColor === "neutral",
    "ring-primary": borderColor === "primary",
    "ring-secondary": borderColor === "secondary",
    "ring-success": borderColor === "success",
    "ring-warning": borderColor === "warning",
    "rounded-btn": shape === "square",
    "rounded-full": shape === "circle",
    "w-32 h-32": size === "lg",
    "w-24 h-24": size === "md",
    "w-14 h-14": size === "sm",
    "w-10 h-10": size === "xs"
  });
  const placeholderClasses = clsx(innerClassName, {
    "bg-neutral-focus": !color,
    "text-neutral-content": !color || color === "neutral",
    "bg-accent": color === "accent",
    "bg-error": color === "error",
    "bg-info": color === "info",
    "bg-neutral": color === "neutral",
    "bg-primary": color === "primary",
    "bg-secondary": color === "secondary",
    "bg-success": color === "success",
    "bg-warning": color === "warning",
    "text-accent-content": color === "accent",
    "text-error-content": color === "error",
    "text-info-content": color === "info",
    "text-primary-content": color === "primary",
    "text-secondary-content": color === "secondary",
    "text-success-content": color === "success",
    "text-warning-content": color === "warning",
    "ring ring-offset-base-100 ring-offset-2": border,
    "ring-accent": borderColor === "accent",
    "ring-error": borderColor === "error",
    "ring-info": borderColor === "info",
    "ring-neutral": borderColor === "neutral",
    "ring-primary": borderColor === "primary",
    "ring-secondary": borderColor === "secondary",
    "ring-success": borderColor === "success",
    "ring-warning": borderColor === "warning",
    "rounded-btn": shape === "square",
    "rounded-full": shape === "circle",
    "w-32 h-32 text-3xl": size === "lg",
    "w-24 h-24 text-xl": size === "md",
    "w-14 h-14": size === "sm",
    "w-10 h-10": size === "xs"
  });
  const customImgDimension = typeof size === "number" ? {
    width: size,
    height: size
  } : {};
  const renderAvatarContents = () => {
    if (src) {
      return (0, import_jsx_runtime.jsx)("div", {
        className: imgClasses,
        style: customImgDimension,
        children: (0, import_jsx_runtime.jsx)("img", {
          src
        })
      });
    } else if (letters || isSingleStringChild(children)) {
      return (0, import_jsx_runtime.jsx)("div", {
        className: placeholderClasses,
        style: customImgDimension,
        children: (0, import_jsx_runtime.jsx)("span", {
          children: letters ? letters : children
        })
      });
    } else if (import_react.default.Children.count(children) === 1) {
      const firstChild = import_react.default.Children.only(children);
      return import_react.default.cloneElement(firstChild, {
        className: twMerge(imgClasses, firstChild.props.className),
        style: _extends({}, customImgDimension, firstChild.props.style)
      });
    } else {
      return (0, import_jsx_runtime.jsx)("div", {
        className: imgClasses,
        style: customImgDimension,
        children
      });
    }
  };
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Avatar photo"
  }, props, {
    "data-theme": dataTheme,
    className: containerClasses,
    ref,
    children: renderAvatarContents()
  }));
});
var Avatar$1 = Object.assign(Avatar, {
  Group: AvatarGroup
});
var _excluded$1l = ["children", "variant", "outline", "size", "color", "responsive", "dataTheme", "className"];
var Badge = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    variant,
    outline,
    size,
    color,
    responsive,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1l);
  const classes = twMerge("badge", className, clsx({
    "badge-lg": size === "lg",
    "badge-md": size === "md",
    "badge-sm": size === "sm",
    "badge-xs": size === "xs",
    "badge-outline": variant === "outline" || outline,
    "badge-neutral": color === "neutral",
    "badge-primary": color === "primary",
    "badge-secondary": color === "secondary",
    "badge-accent": color === "accent",
    "badge-ghost": color === "ghost",
    "badge-info": color === "info",
    "badge-success": color === "success",
    "badge-warning": color === "warning",
    "badge-error": color === "error",
    "badge-xs md:badge-sm lg:badge-md xl:badge-lg": responsive
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Badge"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
Badge.displayName = "Badge";
var _excluded$1k = ["className"];
var CardActions = import_react.default.forwardRef((_ref, ref) => {
  let {
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1k);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: twMerge("card-actions", className),
    ref
  }));
});
var _excluded$1j = ["className"];
var CardBody = import_react.default.forwardRef((_ref, ref) => {
  let {
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1j);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: twMerge("card-body", className),
    ref
  }));
});
var _excluded$1i = ["className", "tag"];
var CardTitle = import_react.default.forwardRef((_ref, ref) => {
  let {
    className,
    tag = "div"
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1i);
  const Tag = tag;
  return (0, import_jsx_runtime.jsx)(Tag, _extends({}, props, {
    className: twMerge("card-title", className),
    ref
  }));
});
var CardImage = import_react.default.forwardRef((_ref, ref) => {
  let props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return (0, import_jsx_runtime.jsx)("figure", {
    ref,
    children: (0, import_jsx_runtime.jsx)("img", _extends({}, props))
  });
});
var _excluded$1h = ["bordered", "imageFull", "normal", "compact", "side", "className"];
var DYNAMIC_MODIFIERS = {
  compact: {
    true: "card-compact",
    xs: "xs:card-compact",
    sm: "sm:card-compact",
    md: "md:card-compact",
    lg: "lg:card-compact"
  },
  normal: {
    true: "card-normal",
    xs: "xs:card-normal",
    sm: "sm:card-normal",
    md: "md:card-normal",
    lg: "lg:card-normal"
  },
  side: {
    true: "card-side",
    xs: "xs:card-side",
    sm: "sm:card-side",
    md: "md:card-side",
    lg: "lg:card-side"
  }
};
var Card = import_react.default.forwardRef((_ref, ref) => {
  let {
    bordered = true,
    imageFull,
    normal,
    compact,
    side,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1h);
  const classes = twMerge("card", className, clsx({
    "card-bordered": bordered,
    "image-full": imageFull,
    [compact && DYNAMIC_MODIFIERS.compact[compact.toString()] || ""]: compact,
    [normal && DYNAMIC_MODIFIERS.normal[normal.toString()] || ""]: normal,
    [side && DYNAMIC_MODIFIERS.side[side.toString()] || ""]: side
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Card"
  }, props, {
    className: classes,
    ref
  }));
});
var Card$1 = Object.assign(Card, {
  Actions: CardActions,
  Body: CardBody,
  Title: CardTitle,
  Image: CardImage
});
var _excluded$1g = ["children", "innerRef", "src", "alt", "index", "width", "hasButtons", "buttonStyle", "onPrev", "onNext", "className"];
var CarouselItem = (_ref) => {
  let {
    children,
    innerRef,
    src,
    alt,
    index = 0,
    width,
    hasButtons,
    buttonStyle,
    onPrev,
    onNext,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1g);
  const classes = twMerge("carousel-item relative", className, clsx({
    "w-full": width === "full",
    "w-1/2": width === "half",
    "h-full": true
  }));
  const imageClasses = clsx({
    "w-full": width === "full"
  });
  const renderButtons = () => {
    if (buttonStyle != null) {
      return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
        children: [(0, import_react.cloneElement)(buttonStyle("❮"), {
          onClick: onPrev
        }), (0, import_react.cloneElement)(buttonStyle("❯"), {
          onClick: onNext
        })]
      });
    }
    return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [(0, import_jsx_runtime.jsx)(Button, {
        onClick: onPrev,
        shape: "circle",
        children: "❮"
      }), (0, import_jsx_runtime.jsx)(Button, {
        onClick: onNext,
        shape: "circle",
        children: "❯"
      })]
    });
  };
  return (0, import_jsx_runtime.jsxs)("div", _extends({}, props, {
    id: `item${index}`,
    ref: innerRef,
    className: classes,
    children: [src ? (0, import_jsx_runtime.jsx)("img", {
      src,
      alt,
      className: imageClasses
    }) : children, hasButtons && (0, import_jsx_runtime.jsx)("div", {
      className: "absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2",
      children: renderButtons()
    })]
  }));
};
var _excluded$1f = ["children", "display", "snap", "vertical", "width", "buttonStyle", "dataTheme", "className"];
var Carousel = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    display = "slider",
    snap,
    vertical,
    width,
    buttonStyle,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1f);
  const classes = twMerge("carousel", className, clsx({
    "carousel-start": snap === "start",
    "carousel-center": snap === "center",
    "carousel-end": snap === "end",
    "carousel-vertical": vertical,
    "w-full": display !== "slider"
  }));
  const [itemRefs, setItemRefs] = (0, import_react.useState)([]);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    const newRefs = [];
    children.map((_) => {
      newRefs.push((0, import_react.createRef)());
    });
    setItemRefs(newRefs);
  }, [children]);
  const scrollToIndex = (index) => {
    var _itemRefs$index$curre;
    (_itemRefs$index$curre = itemRefs[index].current) == null || _itemRefs$index$curre.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: snap
    });
    setActiveIndex(index);
  };
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [(0, import_jsx_runtime.jsx)("div", _extends({
      role: "listbox",
      "aria-label": "Image carousel"
    }, props, {
      ref,
      "data-theme": dataTheme,
      className: classes,
      children: children.map((child, i) => {
        return (0, import_react.cloneElement)(child, _extends({
          key: i,
          innerRef: itemRefs[i],
          index: i + 1,
          children: child.props.children,
          src: child.props.src,
          alt: child.props.alt,
          width: display !== "slider" ? "full" : width,
          hasButtons: display === "sequential",
          buttonStyle,
          onPrev: () => scrollToIndex(i - 1 < 0 ? children.length - 1 : i - 1),
          onNext: () => scrollToIndex(i + 1 > children.length - 1 ? 0 : i + 1)
        }, child.props));
      })
    })), display === "numbered" && (0, import_jsx_runtime.jsx)("div", {
      className: "flex justify-center w-full py-2 gap-2",
      children: children.map((_, i) => {
        if (buttonStyle != null) {
          return (0, import_react.cloneElement)(buttonStyle((i + 1).toString()), {
            key: i,
            onClick: () => scrollToIndex(i)
          });
        }
        return (0, import_jsx_runtime.jsx)(Button, {
          active: i === activeIndex,
          onClick: () => scrollToIndex(i),
          children: i + 1
        }, i);
      })
    })]
  });
});
var Carousel$1 = Object.assign(Carousel, {
  Item: CarouselItem
});
var _excluded$1e = ["size", "shape", "className"];
var ChatBubbleAvatar = import_react.default.forwardRef((_ref, ref) => {
  let {
    size = "xs",
    shape = "circle",
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1e);
  return (0, import_jsx_runtime.jsx)(Avatar$1, _extends({
    size,
    shape
  }, props, {
    className: twMerge("chat-image", className),
    ref
  }));
});
var _excluded$1d = ["color", "className"];
var ChatBubbleMessage = import_react.default.forwardRef((_ref, ref) => {
  let {
    color,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1d);
  const classes = twMerge("chat-bubble", clsx({
    "chat-bubble-primary": color === "primary",
    "chat-bubble-secondary": color === "secondary",
    "chat-bubble-accent": color === "accent",
    "chat-bubble-info": color === "info",
    "chat-bubble-success": color === "success",
    "chat-bubble-warning": color === "warning",
    "chat-bubble-error": color === "error"
  }), className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    ref
  }));
});
var _excluded$1c = ["className"];
var ChatBubbleHeader = import_react.default.forwardRef((_ref, ref) => {
  let {
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1c);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: twMerge("chat-header", className),
    ref
  }));
});
var _excluded$1b = ["className"];
var ChatBubbleTime = import_react.default.forwardRef((_ref, ref) => {
  let {
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1b);
  return (0, import_jsx_runtime.jsx)("time", _extends({}, props, {
    className: twMerge("text-xs opacity-50", className),
    ref
  }));
});
var _excluded$1a = ["className"];
var ChatBubbleFooter = import_react.default.forwardRef((_ref, ref) => {
  let {
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1a);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: twMerge("chat-footer opacity-50", className),
    ref
  }));
});
var _excluded$19 = ["end", "color", "dataTheme", "className", "children"];
var ChatBubble = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    end = false,
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$19);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: twMerge("chat", `chat-${end ? "end" : "start"}`, className),
    ref,
    children
  }));
});
ChatBubble.displayName = "ChatBubble";
var ChatBubble$1 = Object.assign(ChatBubble, {
  Header: ChatBubbleHeader,
  Time: ChatBubbleTime,
  Avatar: ChatBubbleAvatar,
  Message: ChatBubbleMessage,
  Footer: ChatBubbleFooter
});
var _excluded$18 = ["children", "className"];
var classesFn$4 = ({
  className
}) => twMerge("collapse-title", className);
var CollapseTitle = (_ref) => {
  let {
    children,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$18);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classesFn$4({
      className
    }),
    children
  }));
};
var Summary = import_react.default.forwardRef(({
  children,
  className
}, ref) => {
  return (0, import_jsx_runtime.jsx)("summary", {
    ref,
    className: classesFn$4({
      className
    }),
    children
  });
});
var _excluded$17 = ["children", "icon", "open", "dataTheme", "className"];
var Details = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    icon,
    open,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$17);
  return (0, import_jsx_runtime.jsx)("details", _extends({}, props, {
    ref,
    "data-theme": dataTheme,
    className: classesFn$3({
      className,
      icon,
      open
    }),
    open,
    children
  }));
});
Details.displayName = "Details";
var CollapseDetails = Object.assign(Details, {
  Title: Summary
});
var _excluded$16 = ["children", "className"];
var CollapseContent = (_ref) => {
  let {
    children,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$16);
  const classes = twMerge("collapse-content", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    children
  }));
};
var _excluded$15 = ["children", "checkbox", "icon", "open", "dataTheme", "className", "onOpen", "onClose", "onToggle"];
var classesFn$3 = ({
  className,
  icon,
  open
}) => twMerge("collapse", className, clsx({
  "collapse-arrow": icon === "arrow",
  "collapse-plus": icon === "plus",
  "collapse-open": open === true,
  "collapse-close": open === false
}));
var Collapse = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    checkbox,
    icon,
    open,
    dataTheme,
    className,
    onOpen,
    onClose,
    onToggle
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$15);
  const [isChecked, setIsChecked] = (0, import_react.useState)(open);
  const checkboxRef = (0, import_react.useRef)(null);
  const handleCheckboxChange = () => {
    var _checkboxRef$current, _checkboxRef$current2, _checkboxRef$current3;
    if (onToggle) {
      onToggle();
    }
    if (onOpen && (_checkboxRef$current = checkboxRef.current) != null && _checkboxRef$current.checked) {
      onOpen();
    } else if (onClose && !((_checkboxRef$current2 = checkboxRef.current) != null && _checkboxRef$current2.checked)) {
      onClose();
    }
    setIsChecked((_checkboxRef$current3 = checkboxRef.current) == null ? void 0 : _checkboxRef$current3.checked);
  };
  const handleBlur = (event) => {
    if (!checkbox && onToggle) onToggle();
    if (!checkbox && onClose) onClose();
    if (props.onBlur) props.onBlur(event);
  };
  const handleFocus = (event) => {
    if (!checkbox && onToggle) onToggle();
    if (!checkbox && onOpen) onOpen();
    if (props.onFocus) props.onFocus(event);
  };
  return (0, import_jsx_runtime.jsxs)("div", _extends({
    "aria-expanded": open
  }, props, {
    ref,
    tabIndex: isChecked === true ? void 0 : 0,
    "data-theme": dataTheme,
    className: classesFn$3({
      className,
      icon,
      open
    }),
    onBlur: handleBlur,
    onFocus: handleFocus,
    children: [checkbox && (0, import_jsx_runtime.jsx)("input", {
      type: "checkbox",
      tabIndex: isChecked === true ? 0 : void 0,
      className: "peer",
      ref: checkboxRef,
      onChange: handleCheckboxChange
    }), children]
  }));
});
var Collapse$1 = Object.assign(Collapse, {
  Details: CollapseDetails,
  Title: CollapseTitle,
  Content: CollapseContent
});
var _excluded$14 = ["value", "dataTheme", "className"];
var Countdown = (_ref) => {
  let {
    value,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$14);
  const classes = twMerge("countdown", className);
  const displayedValue = Math.min(99, Math.max(0, value));
  const countdownStyle = {
    "--value": displayedValue
  };
  return (0, import_jsx_runtime.jsx)("span", _extends({
    role: "timer"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    children: (0, import_jsx_runtime.jsx)("span", {
      style: countdownStyle
    })
  }));
};
var _excluded$13 = ["children", "size", "dataTheme", "className"];
var Kbd = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    size,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$13);
  const classes = twMerge("kbd", className, clsx({
    "kbd-lg": size === "lg",
    "kbd-md": size === "md",
    "kbd-sm": size === "sm",
    "kbd-xs": size === "xs"
  }));
  return (0, import_jsx_runtime.jsx)("kbd", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var _excluded$12 = ["children", "section", "className"];
var StatSection = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    section,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$12);
  const classes = twMerge(className, clsx({
    "stat-title": section === "title",
    "stat-value": section === "value",
    "stat-desc": section === "desc",
    "stat-figure": section === "figure",
    "stat-actions": section === "actions"
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    ref,
    children
  }));
});
var _excluded$11 = ["dataTheme", "className"];
var Stat = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$11);
  const classes = twMerge("stat", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref
  }));
});
var StatTitle = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(StatSection, _extends({}, props, {
  section: "title",
  ref
})));
var StatValue = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(StatSection, _extends({}, props, {
  section: "value",
  ref
})));
var StatDesc = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(StatSection, _extends({}, props, {
  section: "desc",
  ref
})));
var StatFigure = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(StatSection, _extends({}, props, {
  section: "figure",
  ref
})));
var StatActions = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(StatSection, _extends({}, props, {
  section: "actions",
  ref
})));
var Stat$1 = Object.assign(Stat, {
  Title: StatTitle,
  Value: StatValue,
  Desc: StatDesc,
  Figure: StatFigure,
  Actions: StatActions
});
var _excluded$10 = ["direction", "dataTheme", "className", "children"];
var Stats = import_react.default.forwardRef((_ref, ref) => {
  let {
    direction = "horizontal",
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$10);
  const classes = twMerge("stats", className, clsx({
    "stats-vertical": direction === "vertical",
    "stats-horizontal": direction === "horizontal"
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    children
  }));
});
var Stats$1 = Object.assign(Stats, {
  Stat: Stat$1
});
var _excluded$$ = ["children", "noCell"];
var TableHead = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    noCell = false
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$$);
  const renderChildren = noCell ? children : children == null ? void 0 : children.map((child, i) => i < 1 ? (0, import_jsx_runtime.jsx)("th", {
    children: child
  }, i) : (0, import_jsx_runtime.jsx)("td", {
    children: child
  }, i));
  return (0, import_jsx_runtime.jsx)("thead", _extends({}, props, {
    ref,
    children: (0, import_jsx_runtime.jsx)("tr", {
      children: renderChildren
    })
  }));
});
var _excluded$_ = ["children"];
var TableBody = import_react.default.forwardRef((_ref, ref) => {
  let {
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$_);
  return (0, import_jsx_runtime.jsx)("tbody", _extends({}, props, {
    ref,
    children
  }));
});
var _excluded$Z = ["children", "active", "hover", "noCell", "className"];
var TableRow = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    active,
    hover,
    noCell = false,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$Z);
  const classes = twMerge(className, clsx({
    active,
    hover
  }));
  const renderChildren = noCell ? children : children == null ? void 0 : children.map((child, i) => i < 1 ? (0, import_jsx_runtime.jsx)("th", {
    children: child
  }, i) : (0, import_jsx_runtime.jsx)("td", {
    children: child
  }, i));
  return (0, import_jsx_runtime.jsx)("tr", _extends({}, props, {
    className: classes,
    ref,
    children: renderChildren
  }));
});
var _excluded$Y = ["children", "noCell"];
var TableFooter = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    noCell = false
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$Y);
  const renderChildren = noCell ? children : children == null ? void 0 : children.map((child, i) => i < 1 ? (0, import_jsx_runtime.jsx)("th", {
    children: child
  }, i) : (0, import_jsx_runtime.jsx)("td", {
    children: child
  }, i));
  return (0, import_jsx_runtime.jsx)("tfoot", _extends({}, props, {
    ref,
    children: (0, import_jsx_runtime.jsx)("tr", {
      children: renderChildren
    })
  }));
});
var _excluded$X = ["children", "size", "zebra", "pinRows", "pinCols", "dataTheme", "className"];
var Table = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    size,
    zebra,
    pinRows,
    pinCols,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$X);
  const classes = twMerge("table", className, clsx({
    "table-zebra": zebra,
    "table-lg": size === "lg",
    "table-md": size === "md",
    "table-sm": size === "sm",
    "table-xs": size === "xs",
    "table-pin-rows": pinRows,
    "table-pin-cols": pinCols
  }));
  return (0, import_jsx_runtime.jsx)("table", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var Table$1 = Object.assign(Table, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Footer: TableFooter
});
var _excluded$W = ["name", "icon", "dataTheme", "className", "children"];
var Accordion = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    name = "accordion",
    icon,
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$W);
  const classes = twMerge("collapse", clsx({
    "collapse-arrow": icon === "arrow",
    "collapse-plus": icon === "plus"
  }), className);
  return (0, import_jsx_runtime.jsxs)("div", {
    "data-theme": dataTheme,
    className: classes,
    children: [(0, import_jsx_runtime.jsx)("input", _extends({}, props, {
      ref,
      type: "radio",
      name
    })), children]
  });
});
Accordion.displayName = "Accordion";
var Accordion$1 = Object.assign(Accordion, {
  Title: CollapseTitle,
  Content: CollapseContent
});
var _excluded$V = ["dataTheme", "className", "children", "secondItem"];
var Diff = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataTheme,
    className,
    children,
    secondItem
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$V);
  const classes = twMerge("diff aspect-[16/9]", clsx({}), className);
  return (0, import_jsx_runtime.jsxs)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children: [(0, import_jsx_runtime.jsx)("div", {
      className: "diff-item-1",
      children
    }), (0, import_jsx_runtime.jsx)("div", {
      className: "diff-item-2",
      children: secondItem
    }), (0, import_jsx_runtime.jsx)("div", {
      className: "diff-resizer"
    })]
  }));
});
Diff.displayName = "Diff";
var _excluded$U = ["children", "className", "connect", "startClassName", "endClassName"];
var TimelineItem = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    connect,
    startClassName,
    endClassName
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$U);
  return (0, import_jsx_runtime.jsxs)("li", _extends({}, props, {
    className,
    ref,
    children: [(connect === "both" || connect === "start") && (0, import_jsx_runtime.jsx)("hr", {
      className: startClassName
    }), children, (connect === "both" || connect === "end") && (0, import_jsx_runtime.jsx)("hr", {
      className: endClassName
    })]
  }));
});
TimelineItem.displayName = "TimelineItem";
var _excluded$T = ["children", "className", "box"];
var TimelineStart = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    box
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$T);
  const classes = twMerge("timeline-start", clsx({
    "timeline-box": box
  }), className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    ref,
    children
  }));
});
TimelineStart.displayName = "TimelineStart";
var _excluded$S = ["children", "className"];
var TimelineMiddle = import_react.default.forwardRef((_ref, ref) => {
  let {
    children = (0, import_jsx_runtime.jsx)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className: "w-5 h-5",
      children: (0, import_jsx_runtime.jsx)("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
        clipRule: "evenodd"
      })
    }),
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$S);
  const classes = twMerge("timeline-middle", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    ref,
    children
  }));
});
TimelineMiddle.displayName = "TimelineMiddle";
var _excluded$R = ["children", "className", "box"];
var TimelineEnd = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    box = true
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$R);
  const classes = twMerge("timeline-end", clsx({
    "timeline-box": box
  }), className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: classes,
    ref,
    children
  }));
});
TimelineEnd.displayName = "TimelineEnd";
var _excluded$Q = ["dataTheme", "className", "vertical", "horizontal", "responsive", "snap", "compact", "children"];
var Timeline = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataTheme,
    className,
    vertical,
    horizontal,
    responsive,
    snap,
    compact,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$Q);
  const classes = twMerge("timeline", clsx({
    "timeline-vertical": vertical,
    "timeline-horizontal": horizontal,
    "timeline-vertical lg:timeline-horizontal": responsive,
    "timeline-snap-icon": snap,
    "timeline-compact": compact
  }), className);
  return (0, import_jsx_runtime.jsx)("ul", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
Timeline.displayName = "Timeline";
var Timeline$1 = Object.assign(Timeline, {
  Item: TimelineItem,
  Start: TimelineStart,
  Middle: TimelineMiddle,
  End: TimelineEnd
});
var _excluded$P = ["children", "href"];
var BreadcrumbsItem = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    href
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$P);
  return (0, import_jsx_runtime.jsx)("li", _extends({
    role: "link"
  }, props, {
    ref,
    children: href ? (0, import_jsx_runtime.jsx)("a", {
      href,
      children
    }) : (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children
    })
  }));
});
var _excluded$O = ["children", "dataTheme", "className", "innerProps", "innerRef"];
var Breadcrumbs = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    dataTheme,
    className,
    innerProps,
    innerRef
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$O);
  const classes = twMerge("breadcrumbs", "text-sm", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "navigation",
    "aria-label": "Breadcrumbs"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children: (0, import_jsx_runtime.jsx)("ul", _extends({}, innerProps, {
      ref: innerRef,
      children
    }))
  }));
});
var Breadcrumbs$1 = Object.assign(Breadcrumbs, {
  Item: BreadcrumbsItem
});
var _excluded$N = ["children", "className", "color", "dataTheme", "active", "disabled"];
var BottomNavigationItem = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    className,
    color,
    dataTheme,
    active,
    disabled
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$N);
  const classes = twMerge(className, clsx({
    "text-neutral": color === "neutral",
    "text-primary": color === "primary",
    "text-secondary": color === "secondary",
    "text-accent": color === "accent",
    "text-info": color === "info",
    "text-success": color === "success",
    "text-warning": color === "warning",
    "text-error": color === "error",
    active,
    disabled
  }));
  return (0, import_jsx_runtime.jsx)("button", _extends({}, props, {
    className: classes,
    "data-theme": dataTheme,
    ref,
    children
  }));
});
var _excluded$M = ["children", "className"];
var BottomNavigationLabel = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$M);
  const classes = twMerge("btm-nav-label", className);
  return (0, import_jsx_runtime.jsx)("span", _extends({}, props, {
    className: classes,
    ref,
    children
  }));
});
var _excluded$L = ["size", "dataTheme", "className", "children"];
var BottomNavigation = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    size,
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$L);
  const classes = twMerge("btm-nav", clsx({
    "btm-nav-lg": size === "lg",
    "btm-nav-md": size === "md",
    "btm-nav-sm": size === "sm",
    "btm-nav-xs": size === "xs"
  }), className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    role: "navigation",
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
BottomNavigation.displayName = "BottomNavigation";
var BottomNavigation$1 = Object.assign(BottomNavigation, {
  Item: BottomNavigationItem,
  Label: BottomNavigationLabel
});
var _excluded$K = ["children", "href", "color", "hover", "dataTheme", "className"];
var Link = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    href,
    color,
    hover = true,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$K);
  const classes = twMerge("link", className, clsx({
    "link-neutral": color === "neutral",
    "link-primary": color === "primary",
    "link-secondary": color === "secondary",
    "link-accent": color === "accent",
    "link-info": color === "info",
    "link-success": color === "success",
    "link-warning": color === "warning",
    "link-error": color === "error",
    "link-hover": hover
  }));
  return (0, import_jsx_runtime.jsx)("a", _extends({
    rel: "noopener noreferrer"
  }, props, {
    href,
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
Link.displayName = "Link";
var _excluded$J = ["className"];
var MenuTitle = import_react.default.forwardRef((_ref, ref) => {
  let {
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$J);
  const classes = twMerge("menu-title", className);
  return (0, import_jsx_runtime.jsx)("li", _extends({}, props, {
    className: classes,
    ref
  }));
});
var _excluded$I = ["className", "disabled"];
var MenuItem = import_react.default.forwardRef((_ref, ref) => {
  let {
    className,
    disabled
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$I);
  const classes = twMerge(className, clsx({
    disabled
  }));
  return (0, import_jsx_runtime.jsx)("li", _extends({
    role: "menuitem",
    className: classes
  }, props, {
    ref
  }));
});
var _excluded$H = ["className", "label", "open", "children"];
var MenuDropdown = import_react.default.forwardRef((_ref, ref) => {
  let {
    className,
    label,
    open,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$H);
  const classes = twMerge("menu-dropdown-toggle", className, clsx({
    "menu-dropdown-show": open
  }));
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [(0, import_jsx_runtime.jsx)("span", _extends({}, props, {
      className: classes,
      ref,
      children: label
    })), (0, import_jsx_runtime.jsx)("ul", {
      className: clsx("menu-dropdown", {
        "menu-dropdown-show": open
      }),
      children
    })]
  });
});
var _excluded$G = ["className", "label", "open", "children"];
var MenuDetails = import_react.default.forwardRef((_ref, ref) => {
  let {
    className,
    label,
    open,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$G);
  return (0, import_jsx_runtime.jsxs)("details", _extends({}, props, {
    open,
    className,
    ref,
    children: [(0, import_jsx_runtime.jsx)("summary", {
      children: label
    }), (0, import_jsx_runtime.jsx)("ul", {
      children
    })]
  }));
});
var _excluded$F = ["responsive", "horizontal", "vertical", "dataTheme", "className", "size"];
var Menu = import_react.default.forwardRef((_ref, ref) => {
  let {
    responsive,
    horizontal,
    vertical,
    dataTheme,
    className,
    size
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$F);
  const classes = twMerge("menu", className, clsx({
    "menu-vertical lg:menu-horizontal": responsive,
    "menu-lg": size === "lg",
    "menu-md": size === "md",
    "menu-sm": size === "sm",
    "menu-xs": size === "xs",
    "menu-vertical": vertical,
    "menu-horizontal": horizontal
  }));
  return (0, import_jsx_runtime.jsx)("ul", _extends({
    role: "menu",
    "data-theme": dataTheme,
    className: classes
  }, props, {
    ref
  }));
});
var Menu$1 = Object.assign(Menu, {
  Title: MenuTitle,
  Item: MenuItem,
  Dropdown: MenuDropdown,
  Details: MenuDetails
});
var NavbarSection = import_react.default.forwardRef(({
  children,
  section,
  dataTheme,
  className,
  style
}, ref) => {
  const classes = twMerge(className, clsx({
    "navbar-start": section === "start",
    "navbar-center": section === "center",
    "navbar-end": section === "end"
  }));
  return (0, import_jsx_runtime.jsx)("div", {
    "data-theme": dataTheme,
    className: classes,
    style,
    ref,
    children
  });
});
var _excluded$E = ["children", "dataTheme", "className"];
var Navbar = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$E);
  const classes = twMerge("navbar", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "navigation",
    "aria-label": "Navbar"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var NavbarStart = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(NavbarSection, _extends({}, props, {
  section: "start",
  ref
})));
var NavbarCenter = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(NavbarSection, _extends({}, props, {
  section: "center",
  ref
})));
var NavbarEnd = import_react.default.forwardRef((props, ref) => (0, import_jsx_runtime.jsx)(NavbarSection, _extends({}, props, {
  section: "end",
  ref
})));
var Navbar$1 = Object.assign(Navbar, {
  Start: NavbarStart,
  Center: NavbarCenter,
  End: NavbarEnd
});
var _excluded$D = ["dataTheme", "className", "children", "responsive", "vertical", "horizontal"];
var Join = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataTheme,
    className,
    children,
    responsive,
    vertical,
    horizontal
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$D);
  const classes = twMerge("join", clsx({
    "join-vertical": !responsive && vertical,
    "join-horizontal": !responsive && horizontal,
    "join-vertical lg:join-horizontal": responsive
  }), className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
Join.displayName = "Join";
var Pagination = Join;
var _excluded$C = ["children", "value", "color", "dataTheme", "className"];
var Step = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    value,
    color,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$C);
  const classes = twMerge("step", className, clsx({
    "step-primary": color === "primary",
    "step-secondary": color === "secondary",
    "step-accent": color === "accent",
    "step-info": color === "info",
    "step-success": color === "success",
    "step-warning": color === "warning",
    "step-error": color === "error"
  }));
  return (0, import_jsx_runtime.jsx)("li", _extends({
    "aria-label": "Step"
  }, props, {
    "data-theme": dataTheme,
    "data-content": value,
    className: classes,
    ref,
    children
  }));
});
var _excluded$B = ["children", "dataTheme", "className", "vertical", "horizontal"];
var Steps = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    dataTheme,
    className,
    vertical,
    horizontal
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$B);
  const classes = twMerge("steps", className, clsx({
    "steps-vertical": vertical,
    "steps-horizontal": horizontal
  }));
  return (0, import_jsx_runtime.jsx)("ul", _extends({
    "aria-label": "Steps",
    role: "group"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var Steps$1 = Object.assign(Steps, {
  Step
});
var _excluded$A = ["children", "className", "color", "bgColor", "borderColor", "active", "disabled"];
var Tab = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    className,
    color,
    bgColor,
    borderColor,
    active,
    disabled
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$A);
  const classes = twMerge("tab", className, clsx({
    [`[--tab-bg:${bgColor}]`]: bgColor,
    [`[--tab-border-color:${borderColor}]`]: borderColor,
    "text-neutral": color === "neutral",
    "text-primary": color === "primary",
    "text-secondary": color === "secondary",
    "text-accent": color === "accent",
    "text-info": color === "info",
    "text-success": color === "success",
    "text-warning": color === "warning",
    "text-error": color === "error",
    "tab-active": active,
    "tab-disabled": disabled
  }));
  return (0, import_jsx_runtime.jsx)("a", _extends({
    role: "tab"
  }, props, {
    ref,
    className: classes,
    children
  }));
});
var _excluded$z = ["children", "className", "color", "bgColor", "borderColor", "active", "label", "disabled", "name", "contentClassName"];
var RadioTab = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    className,
    color,
    bgColor,
    borderColor,
    active,
    label,
    disabled,
    name,
    contentClassName
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$z);
  const classes = twMerge("tab", className, clsx({
    [`[--tab-bg:${bgColor}]`]: bgColor,
    [`[--tab-border-color:${borderColor}]`]: borderColor,
    "text-neutral": color === "neutral",
    "text-primary": color === "primary",
    "text-secondary": color === "secondary",
    "text-accent": color === "accent",
    "text-info": color === "info",
    "text-success": color === "success",
    "text-warning": color === "warning",
    "text-error": color === "error",
    "tab-active": active,
    "tab-disabled": disabled
  }));
  const contentClasses = twMerge("tab-content", contentClassName);
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [(0, import_jsx_runtime.jsx)("input", _extends({
      className: classes,
      role: "tab",
      type: "radio",
      name,
      disabled,
      "aria-label": label
    }, props, {
      ref
    })), (0, import_jsx_runtime.jsx)("div", {
      className: contentClasses,
      children
    })]
  });
});
var Tabs = (0, import_react.forwardRef)(({
  children,
  className,
  variant,
  size
}, ref) => {
  const classes = twMerge("tabs", className, clsx({
    "tabs-boxed": variant === "boxed",
    "tabs-bordered": variant === "bordered",
    "tabs-lifted": variant === "lifted",
    "tabs-lg": size === "lg",
    "tabs-md": size === "md",
    "tabs-sm": size === "sm",
    "tabs-xs": size === "xs"
  }));
  return (0, import_jsx_runtime.jsx)("div", {
    role: "tablist",
    className: classes,
    ref,
    children
  });
});
var Tabs$1 = Object.assign(Tabs, {
  Tab,
  RadioTab
});
var _excluded$y = ["children", "icon", "status", "dataTheme", "className"];
var Alert = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    icon,
    status,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$y);
  const classes = twMerge("alert", className, clsx({
    "alert-info": status === "info",
    "alert-success": status === "success",
    "alert-warning": status === "warning",
    "alert-error": status === "error"
  }));
  return (0, import_jsx_runtime.jsxs)("div", _extends({
    role: "alert"
  }, props, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    children: [icon, children]
  }));
});
Alert.displayName = "Alert";
var _excluded$x = ["color", "dataTheme", "className"];
var Progress = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    color,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$x);
  const classes = twMerge("progress", className, clsx({
    "progress-accent": color === "accent",
    "progress-error": color === "error",
    "progress-ghost": color === "ghost",
    "progress-info": color === "info",
    "progress-primary": color === "primary",
    "progress-secondary": color === "secondary",
    "progress-success": color === "success",
    "progress-warning": color === "warning"
  }));
  return (0, import_jsx_runtime.jsx)("progress", _extends({}, props, {
    ref,
    "data-theme": dataTheme,
    className: classes
  }));
});
Progress.displayName = "Progress";
var _excluded$w = ["value", "size", "thickness", "color", "dataTheme", "className", "children"];
var RadialProgress = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    value,
    size = "4rem",
    thickness = "4px",
    color,
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$w);
  const classes = twMerge("radial-progress", className, clsx({
    "text-primary": color === "primary",
    "text-secondary": color === "secondary",
    "text-accent": color === "accent",
    "text-info": color === "info",
    "text-success": color === "success",
    "text-warning": color === "warning",
    "text-error": color === "error"
  }));
  const displayedValue = Math.min(100, Math.max(0, value));
  const progressStyle = {
    "--value": displayedValue,
    "--size": size,
    "--thickness": thickness
  };
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "progressbar",
    "aria-valuenow": displayedValue,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, props, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    style: progressStyle,
    children
  }));
});
RadialProgress.displayName = "RadialProgress";
var _excluded$v = ["dataTheme", "className", "children"];
var Skeleton = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$v);
  const classes = twMerge("skeleton", clsx({}), className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
Skeleton.displayName = "Skeleton";
var _excluded$u = ["horizontal", "vertical", "className", "children"];
var horizontalOptions = {
  start: "toast-start",
  center: "toast-center",
  end: "toast-end"
};
var verticalOptions = {
  top: "toast-top",
  middle: "toast-middle",
  bottom: "toast-bottom"
};
var Toast = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    horizontal = "end",
    vertical = "bottom",
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$u);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    className: twMerge("toast", horizontalOptions[horizontal], verticalOptions[vertical], className),
    ref,
    children
  }));
});
Toast.displayName = "Toast";
var _excluded$t = ["message", "children", "open", "color", "position", "dataTheme", "className"];
var Tooltip = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    message,
    children,
    open,
    color,
    position,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$t);
  const classes = twMerge("tooltip", className, clsx({
    "tooltip-open": open,
    "tooltip-primary": color === "primary",
    "tooltip-secondary": color === "secondary",
    "tooltip-accent": color === "accent",
    "tooltip-info": color === "info",
    "tooltip-success": color === "success",
    "tooltip-warning": color === "warning",
    "tooltip-error": color === "error",
    "tooltip-top": position === "top",
    "tooltip-bottom": position === "bottom",
    "tooltip-left": position === "left",
    "tooltip-right": position === "right"
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "tooltip"
  }, props, {
    ref,
    "data-theme": dataTheme,
    "data-tip": message,
    className: classes,
    children
  }));
});
Tooltip.displayName = "Tooltip";
var _excluded$s = ["children", "title", "dataTheme", "className"];
var Label = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    title,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$s);
  const classes = twMerge("label", className);
  return (0, import_jsx_runtime.jsxs)("label", _extends({}, props, {
    className: classes,
    children: [(0, import_jsx_runtime.jsx)("span", {
      className: "label-text cursor-pointer",
      ref,
      children: title
    }), children]
  }));
});
var _excluded$r = ["children", "dataTheme", "className"];
var Form = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$r);
  const classes = twMerge("form-control", className);
  return (0, import_jsx_runtime.jsx)("form", _extends({
    role: "form"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var Form$1 = Object.assign(Form, {
  Label
});
var _excluded$q = ["color", "size", "indeterminate", "dataTheme", "className"];
var Checkbox = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    color,
    size,
    indeterminate,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$q);
  const classes = twMerge("checkbox", className, clsx({
    "checkbox-lg": size === "lg",
    "checkbox-md": size === "md",
    "checkbox-sm": size === "sm",
    "checkbox-xs": size === "xs",
    "checkbox-primary": color === "primary",
    "checkbox-secondary": color === "secondary",
    "checkbox-accent": color === "accent",
    "checkbox-info": color === "info",
    "checkbox-success": color === "success",
    "checkbox-warning": color === "warning",
    "checkbox-error": color === "error"
  }));
  const checkboxRef = (0, import_react.useRef)(null);
  (0, import_react.useImperativeHandle)(ref, () => checkboxRef.current);
  (0, import_react.useEffect)(() => {
    if (!checkboxRef.current) {
      return;
    }
    if (indeterminate) {
      checkboxRef.current.indeterminate = true;
    } else {
      checkboxRef.current.indeterminate = false;
    }
  }, [indeterminate]);
  return (0, import_jsx_runtime.jsx)("input", _extends({}, props, {
    ref: checkboxRef,
    type: "checkbox",
    "data-theme": dataTheme,
    className: classes
  }));
});
Checkbox.displayName = "Checkbox";
var _excluded$p = ["value", "placeholder", "bordered", "borderOffset", "size", "color", "dataTheme", "className", "type"];
var Input = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    value,
    placeholder,
    bordered = true,
    borderOffset,
    size,
    color,
    dataTheme,
    className,
    type
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$p);
  const classes = twMerge("input", className, clsx({
    "input-lg": size === "lg",
    "input-md": size === "md",
    "input-sm": size === "sm",
    "input-xs": size === "xs",
    "input-primary": color === "primary",
    "input-secondary": color === "secondary",
    "input-accent": color === "accent",
    "input-ghost": color === "ghost",
    "input-info": color === "info",
    "input-success": color === "success",
    "input-warning": color === "warning",
    "input-error": color === "error",
    "input-bordered": bordered,
    "focus:outline-offset-0": !borderOffset
  }));
  return (0, import_jsx_runtime.jsx)("input", _extends({}, props, {
    ref,
    type,
    value,
    placeholder,
    "data-theme": dataTheme,
    className: classes
  }));
});
Input.displayName = "Input";
var _excluded$o = ["color", "size", "name", "dataTheme", "className"];
var Radio = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    color,
    size,
    name,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$o);
  const classes = twMerge("radio", className, clsx({
    "radio-lg": size === "lg",
    "radio-md": size === "md",
    "radio-sm": size === "sm",
    "radio-xs": size === "xs",
    "radio-primary": color === "primary",
    "radio-secondary": color === "secondary",
    "radio-accent": color === "accent",
    "radio-info": color === "info",
    "radio-success": color === "success",
    "radio-warning": color === "warning",
    "radio-error": color === "error"
  }));
  return (0, import_jsx_runtime.jsx)("input", _extends({}, props, {
    ref,
    type: "radio",
    name,
    "data-theme": dataTheme,
    className: classes
  }));
});
Radio.displayName = "Radio";
var _excluded$n = ["color", "size", "step", "displayTicks", "ticksStep", "dataTheme", "className"];
var Range = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    color,
    size,
    step,
    displayTicks,
    ticksStep,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$n);
  const classes = twMerge("range", className, clsx({
    "range-lg": size === "lg",
    "range-md": size === "md",
    "range-sm": size === "sm",
    "range-xs": size === "xs",
    "range-primary": color === "primary",
    "range-secondary": color === "secondary",
    "range-accent": color === "accent",
    "range-info": color === "info",
    "range-success": color === "success",
    "range-warning": color === "warning",
    "range-error": color === "error"
  }));
  const calculatedDisplayTicks = displayTicks != null ? displayTicks : step !== void 0;
  const calculatedStep = step !== void 0 ? Number(step) : 1;
  const calculatedTicksStep = !!ticksStep ? ticksStep : calculatedStep;
  const min = props.min !== void 0 ? Number(props.min) : 0;
  const max = props.max !== void 0 ? Number(props.max) : 100;
  const numTicks = Math.max(Math.ceil((max - min) / calculatedTicksStep), 1) + 1;
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [(0, import_jsx_runtime.jsx)("input", _extends({}, props, {
      ref,
      type: "range",
      step,
      "data-theme": dataTheme,
      className: classes
    })), calculatedDisplayTicks && (0, import_jsx_runtime.jsx)("div", {
      className: "w-full flex justify-between text-xs px-2",
      children: [...Array(numTicks)].map((_, i) => {
        return (0, import_jsx_runtime.jsx)("span", {
          children: "|"
        }, i);
      })
    })]
  });
});
Range.displayName = "Range";
var RatingItem = (_ref) => {
  let props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return (0, import_jsx_runtime.jsx)("input", _extends({}, props, {
    type: "checkbox"
  }));
};
var _excluded$m = ["children", "size", "half", "hidden", "dataTheme", "className", "value", "onChange"];
var Rating = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    size,
    half,
    hidden,
    dataTheme,
    className,
    value,
    onChange
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$m);
  const classes = twMerge("rating", className, clsx({
    "rating-lg": size === "lg",
    "rating-md": size === "md",
    "rating-sm": size === "sm",
    "rating-xs": size === "xs",
    "rating-half": half,
    "rating-hidden": hidden || value === 0
  }));
  return (0, import_jsx_runtime.jsxs)("div", _extends({
    "aria-label": "Rating"
  }, props, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    children: [value === 0 && (0, import_jsx_runtime.jsx)(RatingItem, {
      className: clsx(classes, "hidden"),
      checked: true,
      readOnly: true
    }), import_react.default.Children.map(children, (child, index) => {
      const childComponent = child;
      return import_react.default.cloneElement(childComponent, {
        key: index + value,
        checked: value === index + 1,
        readOnly: onChange == null,
        onChange: () => {
          onChange == null || onChange(index + 1);
        }
      });
    })]
  }));
});
var Rating$1 = Object.assign(Rating, {
  Item: RatingItem
});
var _excluded$l = ["children"];
var SelectOption = (_ref) => {
  let {
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$l);
  return (0, import_jsx_runtime.jsx)("option", _extends({}, props, {
    children
  }));
};
var _excluded$k = ["children", "size", "color", "bordered", "borderOffset", "dataTheme", "className"];
var SelectInner = (props, ref) => {
  const {
    children,
    size,
    color,
    bordered = true,
    borderOffset,
    dataTheme,
    className
  } = props, rest = _objectWithoutPropertiesLoose(props, _excluded$k);
  const classes = twMerge("select", className, clsx({
    "select-lg": size === "lg",
    "select-md": size === "md",
    "select-sm": size === "sm",
    "select-xs": size === "xs",
    "select-primary": color === "primary",
    "select-secondary": color === "secondary",
    "select-accent": color === "accent",
    "select-ghost": color === "ghost",
    "select-info": color === "info",
    "select-success": color === "success",
    "select-warning": color === "warning",
    "select-error": color === "error",
    "select-bordered": bordered,
    "focus:outline-offset-0": !borderOffset
  }));
  return (0, import_jsx_runtime.jsx)("select", _extends({}, rest, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    children
  }));
};
var Select = import_react.default.forwardRef(SelectInner);
var Select$1 = Object.assign(Select, {
  Option: SelectOption
});
var _excluded$j = ["color", "size", "dataTheme", "className"];
var Toggle = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    color,
    size,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$j);
  const classes = twMerge("toggle", className, clsx({
    "toggle-lg": size === "lg",
    "toggle-md": size === "md",
    "toggle-sm": size === "sm",
    "toggle-xs": size === "xs",
    "toggle-primary": color === "primary",
    "toggle-secondary": color === "secondary",
    "toggle-accent": color === "accent",
    "toggle-info": color === "info",
    "toggle-success": color === "success",
    "toggle-warning": color === "warning",
    "toggle-error": color === "error"
  }));
  return (0, import_jsx_runtime.jsx)("input", _extends({}, props, {
    ref,
    type: "checkbox",
    "data-theme": dataTheme,
    className: classes
  }));
});
Toggle.displayName = "Toggle";
var _excluded$i = ["bordered", "borderOffset", "color", "size", "dataTheme", "className"];
var Textarea = import_react.default.forwardRef((_ref, ref) => {
  let {
    bordered = true,
    borderOffset,
    color,
    size,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$i);
  const classes = twMerge("textarea", className, clsx({
    "textarea-lg": size === "lg",
    "textarea-md": size === "md",
    "textarea-sm": size === "sm",
    "textarea-xs": size === "xs",
    "textarea-primary": color === "primary",
    "textarea-secondary": color === "secondary",
    "textarea-accent": color === "accent",
    "textarea-ghost": color === "ghost",
    "textarea-info": color === "info",
    "textarea-success": color === "success",
    "textarea-warning": color === "warning",
    "textarea-error": color === "error",
    "textarea-bordered": bordered,
    "focus:outline-offset-0": !borderOffset
  }));
  return (0, import_jsx_runtime.jsx)("textarea", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref
  }));
});
var _excluded$h = ["className", "size", "color", "bordered", "dataTheme"];
var FileInput = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    className,
    size,
    color,
    bordered,
    dataTheme
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$h);
  const classes = twMerge("file-input", className, clsx({
    "file-input-lg": size === "lg",
    "file-input-md": size === "md",
    "file-input-sm": size === "sm",
    "file-input-xs": size === "xs",
    "file-input-primary": color === "primary",
    "file-input-secondary": color === "secondary",
    "file-input-accent": color === "accent",
    "file-input-ghost": color === "ghost",
    "file-input-info": color === "info",
    "file-input-success": color === "success",
    "file-input-warning": color === "warning",
    "file-input-error": color === "error",
    "file-input-bordered": bordered
  }));
  return (0, import_jsx_runtime.jsx)("input", _extends({}, props, {
    ref,
    type: "file",
    "data-theme": dataTheme,
    className: classes
  }));
});
FileInput.displayName = "FileInput";
var _excluded$g = ["children", "demo", "size", "horizontal", "dataTheme", "className"];
var Artboard = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    demo = true,
    size,
    horizontal,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$g);
  const classes = twMerge("artboard", className, clsx({
    "artboard-demo": demo,
    "phone-1": size === 1,
    "phone-2": size === 2,
    "phone-3": size === 3,
    "phone-4": size === 4,
    "phone-5": size === 5,
    "phone-6": size === 6,
    horizontal
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Artboard"
  }, props, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    children
  }));
});
Artboard.displayName = "Artboard";
var _excluded$f = ["children", "vertical", "horizontal", "responsive", "color", "start", "end", "dataTheme", "className"];
var Divider = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    children,
    vertical,
    horizontal,
    responsive,
    color,
    start,
    end,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$f);
  const classes = twMerge("divider", className, clsx({
    "divider-vertical": vertical,
    "divider-horizontal": horizontal,
    "lg:divider-horizontal": responsive,
    "divider-neutral": color === "neutral",
    "divider-primary": color === "primary",
    "divider-secondary": color === "secondary",
    "divider-accent": color === "accent",
    "divider-warning": color === "warning",
    "divider-info": color === "info",
    "divider-error": color === "error",
    "divider-start": start,
    "divider-end": end
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "separator"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
Divider.displayName = "Divider";
var _excluded$e = ["children", "side", "open", "end", "dataTheme", "className", "toggleClassName", "contentClassName", "sideClassName", "overlayClassName", "onClickOverlay"];
var Drawer = (_ref) => {
  let {
    children,
    side,
    open,
    end,
    dataTheme,
    className,
    toggleClassName,
    contentClassName,
    sideClassName,
    overlayClassName,
    onClickOverlay
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$e);
  const classes = twMerge("drawer", className, clsx({
    "drawer-end": end
  }));
  return (0, import_jsx_runtime.jsxs)("div", _extends({
    "aria-expanded": open
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    children: [(0, import_jsx_runtime.jsx)("input", {
      type: "checkbox",
      className: clsx("drawer-toggle", toggleClassName),
      checked: open,
      readOnly: true
    }), (0, import_jsx_runtime.jsx)("div", {
      className: clsx("drawer-content", contentClassName),
      children
    }), (0, import_jsx_runtime.jsxs)("div", {
      className: clsx("drawer-side", sideClassName),
      children: [(0, import_jsx_runtime.jsx)("label", {
        className: clsx("drawer-overlay", overlayClassName),
        onClick: onClickOverlay
      }), side]
    })]
  }));
};
var _excluded$d = ["className"];
var FooterTitle = import_react.default.forwardRef((_ref, ref) => {
  let {
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$d);
  const classes = twMerge("footer-title", className);
  return (0, import_jsx_runtime.jsx)("span", _extends({}, props, {
    className: classes,
    ref
  }));
});
var _excluded$c = ["center", "dataTheme", "className"];
var Footer = import_react.default.forwardRef((_ref, ref) => {
  let {
    center,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$c);
  const classes = twMerge("footer", className, clsx({
    "footer-center": center
  }));
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "contentinfo"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref
  }));
});
var Footer$1 = Object.assign(Footer, {
  Title: FooterTitle
});
var _excluded$b = ["dataTheme", "className", "children"];
var HeroContent = import_react.default.forwardRef((_ref, ref) => {
  let {
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$b);
  const classes = twMerge("hero-content", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var _excluded$a = ["dataTheme", "className", "children"];
var HeroOverlay = import_react.default.forwardRef((_ref, ref) => {
  let {
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$a);
  const classes = twMerge("hero-overlay", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var _excluded$9 = ["dataTheme", "className", "children"];
var Hero = import_react.default.forwardRef((_ref, ref) => {
  let {
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$9);
  const classes = twMerge("hero", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    role: "banner"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children
  }));
});
var Hero$1 = Object.assign(Hero, {
  Content: HeroContent,
  Overlay: HeroOverlay
});
var _excluded$8 = ["children", "horizontal", "vertical", "dataTheme", "className"];
var classesFn$2 = ({
  className,
  horizontal,
  vertical
} = {}) => twMerge("indicator-item", className, clsx({
  "indicator-start": horizontal === "start",
  "indicator-center": horizontal === "center",
  "indicator-end": horizontal === "end",
  "indicator-top": vertical === "top",
  "indicator-middle": vertical === "middle",
  "indicator-bottom": vertical === "bottom"
}));
var IndicatorItem = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    horizontal = "end",
    vertical = "top",
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Indicator"
  }, props, {
    className: classesFn$2({
      className,
      horizontal,
      vertical
    }),
    ref,
    children
  }));
});
IndicatorItem.displayName = "IndicatorItem";
var IndicatorItem$1 = Object.assign(IndicatorItem, {
  className: classesFn$2
});
var _excluded$7 = ["children", "className", "dataTheme"];
var classesFn$1 = ({
  className
} = {}) => twMerge("indicator", className);
var Indicator = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    dataTheme
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  return (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
    "data-theme": dataTheme,
    className: classesFn$1({
      className
    }),
    ref,
    children
  }));
});
Indicator.displayName = "Indicator";
var Indicator$1 = Object.assign(Indicator, {
  Item: IndicatorItem$1,
  className: classesFn$1
});
var _excluded$6 = ["src", "variant", "dataTheme", "className"];
var classesFn = ({
  className,
  variant
} = {}) => twMerge("mask", className, clsx({
  "mask-squircle": variant === "squircle",
  "mask-heart": variant === "heart",
  "mask-hexagon": variant === "hexagon",
  "mask-hexagon-2": variant === "hexagon-2",
  "mask-decagon": variant === "decagon",
  "mask-pentagon": variant === "pentagon",
  "mask-diamond": variant === "diamond",
  "mask-square": variant === "square",
  "mask-circle": variant === "circle",
  "mask-parallelogram": variant === "parallelogram",
  "mask-parallelogram-2": variant === "parallelogram-2",
  "mask-parallelogram-3": variant === "parallelogram-3",
  "mask-parallelogram-4": variant === "parallelogram-4",
  "mask-star": variant === "star",
  "mask-star-2": variant === "star-2",
  "mask-triangle": variant === "triangle",
  "mask-triangle-2": variant === "triangle-2",
  "mask-triangle-3": variant === "triangle-3",
  "mask-triangle-4": variant === "triangle-4",
  "mask-half-1": variant === "half-1",
  "mask-half-2": variant === "half-2"
}));
var Mask = import_react.default.forwardRef((_ref, ref) => {
  let {
    src,
    variant,
    dataTheme,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$6);
  return (0, import_jsx_runtime.jsx)("img", _extends({}, props, {
    "data-theme": dataTheme,
    className: classesFn({
      className,
      variant
    }),
    src,
    ref
  }));
});
Mask.displayName = "Mask";
var Mask$1 = Object.assign(Mask, {
  className: classesFn
});
var _excluded$5 = ["dataTheme", "className", "children"];
var Stack = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  const classes = twMerge("stack", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Stack"
  }, props, {
    ref,
    "data-theme": dataTheme,
    className: classes,
    children
  }));
});
Stack.displayName = "Stack";
var _excluded$4 = ["dataPrefix", "dataTheme", "status", "className", "children", "innerProps", "innerRef"];
var CodeMockupLine = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataPrefix,
    dataTheme,
    status,
    className,
    children,
    innerProps,
    innerRef
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  const classes = twMerge(clsx({
    "bg-info": status === "info",
    "bg-success": status === "success",
    "bg-warning": status === "warning",
    "bg-error": status === "error",
    "text-info-content": status === "info",
    "text-success-content": status === "success",
    "text-warning-content": status === "warning",
    "text-error-content": status === "error"
  }), className);
  const allProps = _extends({}, props, {
    className: classes
  }, dataPrefix !== false && {
    "data-prefix": dataPrefix || ">"
  });
  return (0, import_jsx_runtime.jsx)("pre", _extends({}, allProps, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children: (0, import_jsx_runtime.jsx)("code", _extends({}, innerProps, {
      ref: innerRef,
      children
    }))
  }));
});
CodeMockupLine.displayName = "CodeMockup.Line";
var _excluded$3 = ["dataTheme", "className", "children"];
var CodeMockup = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  const classes = twMerge("mockup-code", className);
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Code mockup"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children: import_react.default.Children.map(children, (child, index) => {
      const childComponent = child;
      return import_react.default.cloneElement(childComponent, {
        key: index
      });
    })
  }));
});
CodeMockup.displayName = "CodeMockup";
var CodeMockupNamespace = Object.assign(CodeMockup, {
  Line: CodeMockupLine
});
var _excluded$2 = ["color", "dataTheme", "className", "children", "innerRef", "innerProps"];
var PhoneMockup = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    color,
    dataTheme,
    className,
    children,
    innerRef,
    innerProps
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  const classes = twMerge("mockup-phone", clsx({
    "border-primary": color === "primary",
    "border-secondary": color === "secondary",
    "border-info": color === "info",
    "border-success": color === "success",
    "border-warning": color === "warning",
    "border-error": color === "error"
  }), className);
  return (0, import_jsx_runtime.jsxs)("div", _extends({
    "aria-label": "Phone mockup"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children: [(0, import_jsx_runtime.jsx)("div", {
      className: "camera"
    }), (0, import_jsx_runtime.jsx)("div", {
      className: "display",
      children: (0, import_jsx_runtime.jsx)("div", _extends({}, innerProps, {
        className: twMerge("artboard artboard-demo phone-1", innerProps == null ? void 0 : innerProps.className),
        ref: innerRef,
        children
      }))
    })]
  }));
});
PhoneMockup.displayName = "PhoneMockup";
var defaultTheme = "light";
var _excluded$1 = ["border", "borderColor", "backgroundColor", "frameColor", "dataTheme", "className", "children"];
var WindowMockup = (0, import_react.forwardRef)((_ref, ref) => {
  let {
    border,
    borderColor,
    backgroundColor,
    frameColor,
    dataTheme,
    className,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  const borderColorValue = borderColor ? borderColor : frameColor || "base-300";
  const classes = twMerge("mockup-window", border && `border border-${borderColorValue}`, clsx({
    "border-primary": borderColorValue === "primary",
    "border-secondary": borderColorValue === "secondary",
    "border-accent": borderColorValue === "accent",
    "border-info": borderColorValue === "info",
    "border-success": borderColorValue === "success",
    "border-warning": borderColorValue === "warning",
    "border-error": borderColorValue === "error",
    "border-base-100": borderColorValue === "base-100",
    "border-base-200": borderColorValue === "base-200",
    "border-base-300": borderColorValue === "base-300",
    "border-neutral": borderColorValue === "neutral",
    "bg-primary": frameColor === "primary",
    "bg-secondary": frameColor === "secondary",
    "bg-accent": frameColor === "accent",
    "bg-info": frameColor === "info",
    "bg-success": frameColor === "success",
    "bg-warning": frameColor === "warning",
    "bg-error": frameColor === "error",
    "bg-base-100": frameColor === "base-100",
    "bg-base-200": frameColor === "base-200",
    "bg-base-300": frameColor === "base-300",
    "bg-neutral": frameColor === "neutral"
  }), className);
  const numChildren = import_react.default.Children.count(children);
  const firstChild = numChildren > 0 && import_react.default.Children.toArray(children)[0];
  const innerClasses = clsx(backgroundColor && `bg-${backgroundColor}`, border && `border-t border-${borderColorValue}`, "p-4");
  const innerEl = firstChild && import_react.default.isValidElement(firstChild) ? import_react.default.cloneElement(firstChild, {
    className: twMerge(innerClasses, firstChild.props.className)
  }) : (0, import_jsx_runtime.jsx)("div", {
    className: innerClasses,
    children
  });
  return (0, import_jsx_runtime.jsx)("div", _extends({
    "aria-label": "Window mockup"
  }, props, {
    "data-theme": dataTheme,
    className: classes,
    ref,
    children: innerEl
  }));
});
WindowMockup.displayName = "WindowMockup";
var ThemeContext = import_react.default.createContext({
  theme: "light",
  setTheme: () => {
  }
});
var getThemeFromClosestAncestor = (ref) => {
  if (!ref.current) return;
  const matches = ref.current.closest("[data-theme]");
  if (matches) return matches.getAttribute("data-theme");
};
var _excluded = ["children", "dataTheme", "onChange", "className"];
var Theme = import_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    dataTheme,
    onChange,
    className
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const themeRef = (0, import_react.useRef)(ref == null ? void 0 : ref.current);
  const closestAncestorTheme = getThemeFromClosestAncestor(themeRef);
  const [theme, setTheme] = (0, import_react.useState)(dataTheme || closestAncestorTheme || defaultTheme);
  const handleThemeChange = (theme2) => {
    onChange && onChange(theme2);
    setTheme(theme2);
  };
  (0, import_react.useEffect)(() => {
    if (dataTheme !== theme) {
      dataTheme && handleThemeChange(dataTheme);
    }
  }, [dataTheme]);
  return (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
    value: {
      theme,
      setTheme: handleThemeChange
    },
    children: (0, import_jsx_runtime.jsx)("div", _extends({}, props, {
      "data-theme": theme,
      className,
      ref: themeRef,
      children
    }))
  });
});
var useTheme = (value) => {
  const {
    theme,
    setTheme
  } = (0, import_react.useContext)(ThemeContext);
  (0, import_react.useEffect)(() => {
    if (value && theme !== value) {
      setTheme(value);
    }
  }, [value]);
  return {
    theme,
    setTheme
  };
};
export {
  Accordion$1 as Accordion,
  Alert,
  Artboard,
  Avatar$1 as Avatar,
  Badge,
  BottomNavigation$1 as BottomNavigation,
  Breadcrumbs$1 as Breadcrumbs,
  Button,
  Card$1 as Card,
  Carousel$1 as Carousel,
  ChatBubble$1 as ChatBubble,
  Checkbox,
  CodeMockupNamespace as CodeMockup,
  Collapse$1 as Collapse,
  Countdown,
  Diff,
  Divider,
  Drawer,
  Dropdown$1 as Dropdown,
  FileInput,
  Footer$1 as Footer,
  Form$1 as Form,
  Hero$1 as Hero,
  Indicator$1 as Indicator,
  Input,
  Join,
  Kbd,
  Link,
  Loading,
  Mask$1 as Mask,
  Menu$1 as Menu,
  Modal$1 as Modal,
  Navbar$1 as Navbar,
  Pagination,
  PhoneMockup,
  Progress,
  RadialProgress,
  Radio,
  Range,
  Rating$1 as Rating,
  Select$1 as Select,
  Skeleton,
  Stack,
  Stats$1 as Stats,
  Steps$1 as Steps,
  Swap,
  Table$1 as Table,
  Tabs$1 as Tabs,
  Textarea,
  Theme,
  Timeline$1 as Timeline,
  Toast,
  Toggle,
  Tooltip,
  WindowMockup,
  useTheme
};
//# sourceMappingURL=react-daisyui.js.map
