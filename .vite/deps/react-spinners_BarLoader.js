import {
  require_animation,
  require_unitConverter
} from "./chunk-QVSQZOHT.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/react-spinners/helpers/colors.js
var require_colors = __commonJS({
  "node_modules/react-spinners/helpers/colors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calculateRgba = void 0;
    var BasicColors;
    (function(BasicColors2) {
      BasicColors2["maroon"] = "#800000";
      BasicColors2["red"] = "#FF0000";
      BasicColors2["orange"] = "#FFA500";
      BasicColors2["yellow"] = "#FFFF00";
      BasicColors2["olive"] = "#808000";
      BasicColors2["green"] = "#008000";
      BasicColors2["purple"] = "#800080";
      BasicColors2["fuchsia"] = "#FF00FF";
      BasicColors2["lime"] = "#00FF00";
      BasicColors2["teal"] = "#008080";
      BasicColors2["aqua"] = "#00FFFF";
      BasicColors2["blue"] = "#0000FF";
      BasicColors2["navy"] = "#000080";
      BasicColors2["black"] = "#000000";
      BasicColors2["gray"] = "#808080";
      BasicColors2["silver"] = "#C0C0C0";
      BasicColors2["white"] = "#FFFFFF";
    })(BasicColors || (BasicColors = {}));
    var handleRgbColorString = function(color, opacity) {
      if (color.includes("/")) {
        return color.replace("rgb(", "rgba(");
      }
      var rgbValues = color.substring(color.startsWith("rgba(") ? 5 : 4, color.length - 1).trim();
      var splittedByCommas = rgbValues.split(",");
      if (splittedByCommas.length === 4) {
        return color.replace("rgb(", "rgba(");
      }
      if (splittedByCommas.length === 3) {
        return "rgba(".concat(rgbValues, ", ").concat(opacity, ")");
      }
      return "rgba(".concat(rgbValues, " / ").concat(opacity, ")");
    };
    var calculateRgba = function(color, opacity) {
      if (color.startsWith("rgb")) {
        return handleRgbColorString(color, opacity);
      }
      if (Object.keys(BasicColors).includes(color)) {
        color = BasicColors[color];
      }
      if (color[0] === "#") {
        color = color.slice(1);
      }
      if (color.length === 3) {
        var res_1 = "";
        color.split("").forEach(function(c) {
          res_1 += c;
          res_1 += c;
        });
        color = res_1;
      }
      var rgbValues = (color.match(/.{2}/g) || []).map(function(hex) {
        return parseInt(hex, 16);
      }).join(", ");
      return "rgba(".concat(rgbValues, ", ").concat(opacity, ")");
    };
    exports.calculateRgba = calculateRgba;
  }
});

// node_modules/react-spinners/BarLoader.js
var require_BarLoader = __commonJS({
  "node_modules/react-spinners/BarLoader.js"(exports) {
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = __importStar(require_react());
    var unitConverter_1 = require_unitConverter();
    var animation_1 = require_animation();
    var colors_1 = require_colors();
    var long = (0, animation_1.createAnimation)("BarLoader", "0% {left: -35%;right: 100%} 60% {left: 100%;right: -90%} 100% {left: 100%;right: -90%}", "long");
    var short = (0, animation_1.createAnimation)("BarLoader", "0% {left: -200%;right: 100%} 60% {left: 107%;right: -8%} 100% {left: 107%;right: -8%}", "short");
    function BarLoader(_a) {
      var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.height, height = _f === void 0 ? 4 : _f, _g = _a.width, width = _g === void 0 ? 100 : _g, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "height", "width"]);
      var wrapper = __assign({ display: "inherit", position: "relative", width: (0, unitConverter_1.cssValue)(width), height: (0, unitConverter_1.cssValue)(height), overflow: "hidden", backgroundColor: (0, colors_1.calculateRgba)(color, 0.2), backgroundClip: "padding-box" }, cssOverride);
      var style = function(i) {
        return {
          position: "absolute",
          height: (0, unitConverter_1.cssValue)(height),
          overflow: "hidden",
          backgroundColor: color,
          backgroundClip: "padding-box",
          display: "block",
          borderRadius: 2,
          willChange: "left, right",
          animationFillMode: "forwards",
          animation: "".concat(i === 1 ? long : short, " ").concat(2.1 / speedMultiplier, "s ").concat(i === 2 ? "".concat(1.15 / speedMultiplier, "s") : "", " ").concat(i === 1 ? "cubic-bezier(0.65, 0.815, 0.735, 0.395)" : "cubic-bezier(0.165, 0.84, 0.44, 1)", " infinite")
        };
      };
      if (!loading) {
        return null;
      }
      return React.createElement(
        "span",
        __assign({ style: wrapper }, additionalprops),
        React.createElement("span", { style: style(1) }),
        React.createElement("span", { style: style(2) })
      );
    }
    exports.default = BarLoader;
  }
});
export default require_BarLoader();
//# sourceMappingURL=react-spinners_BarLoader.js.map
