import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/react-facebook/dist/esm/index.js
var import_react = __toESM(require_react());
var u = function(e2, t2) {
  return u = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
    e3.__proto__ = t3;
  } || function(e3, t3) {
    for (var n2 in t3) Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
  }, u(e2, t2);
};
var c;
var l = function() {
  return l = Object.assign || function(e2) {
    for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++) for (var i2 in t2 = arguments[n2]) Object.prototype.hasOwnProperty.call(t2, i2) && (e2[i2] = t2[i2]);
    return e2;
  }, l.apply(this, arguments);
};
function d(e2, t2) {
  var n2 = {};
  for (var r2 in e2) Object.prototype.hasOwnProperty.call(e2, r2) && t2.indexOf(r2) < 0 && (n2[r2] = e2[r2]);
  if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
    var i2 = 0;
    for (r2 = Object.getOwnPropertySymbols(e2); i2 < r2.length; i2++) t2.indexOf(r2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, r2[i2]) && (n2[r2[i2]] = e2[r2[i2]]);
  }
  return n2;
}
function h(e2, t2, n2, r2) {
  return new (n2 || (n2 = Promise))(function(i2, o2) {
    function a2(e3) {
      try {
        u2(r2.next(e3));
      } catch (e4) {
        o2(e4);
      }
    }
    function s2(e3) {
      try {
        u2(r2.throw(e3));
      } catch (e4) {
        o2(e4);
      }
    }
    function u2(e3) {
      var t3;
      e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
        e4(t3);
      })).then(a2, s2);
    }
    u2((r2 = r2.apply(e2, t2 || [])).next());
  });
}
function f(e2, t2) {
  var n2, r2, i2, o2, a2 = { label: 0, sent: function() {
    if (1 & i2[0]) throw i2[1];
    return i2[1];
  }, trys: [], ops: [] };
  return o2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
    return this;
  }), o2;
  function s2(s3) {
    return function(u2) {
      return function(s4) {
        if (n2) throw new TypeError("Generator is already executing.");
        for (; o2 && (o2 = 0, s4[0] && (a2 = 0)), a2; ) try {
          if (n2 = 1, r2 && (i2 = 2 & s4[0] ? r2.return : s4[0] ? r2.throw || ((i2 = r2.return) && i2.call(r2), 0) : r2.next) && !(i2 = i2.call(r2, s4[1])).done) return i2;
          switch (r2 = 0, i2 && (s4 = [2 & s4[0], i2.value]), s4[0]) {
            case 0:
            case 1:
              i2 = s4;
              break;
            case 4:
              return a2.label++, { value: s4[1], done: false };
            case 5:
              a2.label++, r2 = s4[1], s4 = [0];
              continue;
            case 7:
              s4 = a2.ops.pop(), a2.trys.pop();
              continue;
            default:
              if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== s4[0] && 2 !== s4[0])) {
                a2 = 0;
                continue;
              }
              if (3 === s4[0] && (!i2 || s4[1] > i2[0] && s4[1] < i2[3])) {
                a2.label = s4[1];
                break;
              }
              if (6 === s4[0] && a2.label < i2[1]) {
                a2.label = i2[1], i2 = s4;
                break;
              }
              if (i2 && a2.label < i2[2]) {
                a2.label = i2[2], a2.ops.push(s4);
                break;
              }
              i2[2] && a2.ops.pop(), a2.trys.pop();
              continue;
          }
          s4 = t2.call(e2, a2);
        } catch (e3) {
          s4 = [6, e3], r2 = 0;
        } finally {
          n2 = i2 = 0;
        }
        if (5 & s4[0]) throw s4[1];
        return { value: s4[0] ? s4[1] : void 0, done: true };
      }([s3, u2]);
    };
  }
}
function p(e2, t2, n2) {
  if (n2 || 2 === arguments.length) for (var r2, i2 = 0, o2 = t2.length; i2 < o2; i2++) !r2 && i2 in t2 || (r2 || (r2 = Array.prototype.slice.call(t2, 0, i2)), r2[i2] = t2[i2]);
  return e2.concat(r2 || Array.prototype.slice.call(t2));
}
!function(e2) {
  e2.CONNECTED = "connected", e2.AUTHORIZATION_EXPIRED = "authorization_expired", e2.NOT_AUTHORIZED = "not_authorized", e2.UNKNOWN = "unknown";
}(c || (c = {}));
var v;
var g;
var m = c;
var y = function(e2) {
  function t2(t3, n2, r2) {
    var i2 = e2.call(this, t3) || this;
    return i2.code = n2, i2.type = r2, i2;
  }
  return function(e3, t3) {
    if ("function" != typeof t3 && null !== t3) throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
    function n2() {
      this.constructor = e3;
    }
    u(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
  }(t2, e2), t2;
}(Error);
!function(e2) {
  e2.GET = "get", e2.POST = "post", e2.DELETE = "delete";
}(v || (v = {})), function(e2) {
  e2.UI = "ui", e2.API = "api", e2.LOGIN = "login", e2.LOGOUT = "logout", e2.GET_LOGIN_STATUS = "getLoginStatus", e2.GET_AUTH_RESPONSE = "getAuthResponse";
}(g || (g = {}));
var w;
var b = { domain: "connect.facebook.net", version: "v15.0", cookie: false, status: false, xfbml: false, language: "en_US", frictionlessRequests: false, debug: false, chatSupport: false, autoLogAppEvents: true, lazy: false };
var E = function() {
  function e2(e3) {
    if (!e3.appId) throw new Error("You need to set appId");
    this.options = l(l({}, b), e3), this.options.lazy || this.init();
  }
  return e2.prototype.getAppId = function() {
    return this.options.appId;
  }, e2.prototype.getFB = function() {
    return window.FB;
  }, e2.prototype.init = function() {
    return h(this, void 0, void 0, function() {
      var e3 = this;
      return f(this, function(t2) {
        return this.loadingPromise || (this.loadingPromise = new Promise(function(t3) {
          var n2 = e3.options, r2 = n2.domain, i2 = n2.language, o2 = n2.debug, a2 = n2.chatSupport, s2 = d(n2, ["domain", "language", "debug", "chatSupport"]);
          if (window.fbAsyncInit = function() {
            window.FB.init({ appId: s2.appId, version: s2.version, cookie: s2.cookie, status: s2.status, xfbml: s2.xfbml, frictionlessRequests: s2.frictionlessRequests }), t3(e3);
          }, window.document.getElementById("facebook-jssdk")) return t3(e3);
          var u2 = window.document.createElement("script");
          u2.id = "facebook-jssdk", u2.async = true, u2.defer = true, u2.crossOrigin = "anonymous", u2.src = "https://".concat(r2, "/").concat(i2, "/sdk").concat(a2 ? "/xfbml.customerchat" : "").concat(o2 ? "/debug" : "", ".js"), window.document.body.appendChild(u2);
        })), [2, this.loadingPromise];
      });
    });
  }, e2.prototype.process = function(e3, t2, n2) {
    return void 0 === t2 && (t2 = []), void 0 === n2 && (n2 = []), h(this, void 0, void 0, function() {
      var r2;
      return f(this, function(i2) {
        switch (i2.label) {
          case 0:
            return [4, this.init()];
          case 1:
            return i2.sent(), r2 = this.getFB(), [2, new Promise(function(i3, o2) {
              r2[e3].apply(r2, p(p(p([], t2, false), [function(t3) {
                if (t3) if (t3 && "error" in t3) {
                  var n3 = t3.error, r3 = n3.code, a2 = n3.type, s2 = n3.message;
                  o2(new y(s2, r3, a2));
                } else i3(t3);
                else {
                  if (e3 === g.UI) return;
                  o2(new Error("Response is undefined"));
                }
              }], false), n2, false));
            })];
        }
      });
    });
  }, e2.prototype.ui = function(e3) {
    return h(this, void 0, void 0, function() {
      return f(this, function(t2) {
        return [2, this.process(g.UI, [e3])];
      });
    });
  }, e2.prototype.api = function(e3, t2, n2) {
    return void 0 === t2 && (t2 = v.GET), void 0 === n2 && (n2 = {}), h(this, void 0, void 0, function() {
      return f(this, function(r2) {
        return [2, this.process(g.API, [e3, t2, n2])];
      });
    });
  }, e2.prototype.login = function(e3) {
    return h(this, void 0, void 0, function() {
      var t2, n2, r2, i2, o2, a2, s2;
      return f(this, function(u2) {
        return t2 = e3.scope, n2 = e3.authType, r2 = void 0 === n2 ? [] : n2, i2 = e3.returnScopes, o2 = e3.rerequest, a2 = e3.reauthorize, s2 = { scope: t2 }, i2 && (s2.return_scopes = true), o2 && r2.push("rerequest"), a2 && r2.push("reauthenticate"), r2.length && (s2.auth_type = r2.join(",")), [2, this.process(g.LOGIN, [], [s2])];
      });
    });
  }, e2.prototype.logout = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        return [2, this.process(g.LOGOUT)];
      });
    });
  }, e2.prototype.getLoginStatus = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        return [2, this.process(g.GET_LOGIN_STATUS)];
      });
    });
  }, e2.prototype.getAuthResponse = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        return [2, this.process(g.GET_AUTH_RESPONSE)];
      });
    });
  }, e2.prototype.getTokenDetail = function(e3) {
    return h(this, void 0, void 0, function() {
      var t2;
      return f(this, function(n2) {
        switch (n2.label) {
          case 0:
            return (null == e3 ? void 0 : e3.status) === m.CONNECTED ? [2, e3.authResponse] : [4, this.getLoginStatus()];
          case 1:
            if ((t2 = n2.sent()).status === m.CONNECTED) return [2, t2.authResponse];
            throw new Error("Token is undefined");
        }
      });
    });
  }, e2.prototype.getProfile = function(e3) {
    return h(this, void 0, void 0, function() {
      return f(this, function(t2) {
        return [2, this.api("/me", v.GET, e3)];
      });
    });
  }, e2.prototype.getTokenDetailWithProfile = function(e3, t2) {
    return h(this, void 0, void 0, function() {
      var n2;
      return f(this, function(r2) {
        switch (r2.label) {
          case 0:
            return [4, this.getTokenDetail(t2)];
          case 1:
            return n2 = r2.sent(), [4, this.getProfile(e3)];
          case 2:
            return [2, { profile: r2.sent(), tokenDetail: n2 }];
        }
      });
    });
  }, e2.prototype.getToken = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        switch (e3.label) {
          case 0:
            return [4, this.getTokenDetail()];
          case 1:
            return [2, e3.sent().accessToken];
        }
      });
    });
  }, e2.prototype.getUserId = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        switch (e3.label) {
          case 0:
            return [4, this.getTokenDetail()];
          case 1:
            return [2, e3.sent().userID];
        }
      });
    });
  }, e2.prototype.sendInvite = function(e3, t2) {
    return h(this, void 0, void 0, function() {
      return f(this, function(n2) {
        return [2, this.ui(l({ to: e3, method: "apprequests" }, t2))];
      });
    });
  }, e2.prototype.postAction = function(e3, t2, n2, r2, i2) {
    return void 0 === i2 && (i2 = false), h(this, void 0, void 0, function() {
      var o2;
      return f(this, function(a2) {
        return o2 = "/me/".concat(e3, ":").concat(t2, "?").concat(n2, "=").concat(encodeURIComponent(r2)), true === i2 && (o2 += "&no_feed_story=true"), [2, this.api(o2, v.POST)];
      });
    });
  }, e2.prototype.getPermissions = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        switch (e3.label) {
          case 0:
            return [4, this.api("/me/permissions")];
          case 1:
            return [2, e3.sent().data];
        }
      });
    });
  }, e2.prototype.hasPermissions = function(e3) {
    return h(this, void 0, void 0, function() {
      var t2;
      return f(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, this.getPermissions()];
          case 1:
            return t2 = n2.sent(), [2, e3.filter(function(e4) {
              return !!t2.find(function(t3) {
                var n3 = t3.permission;
                return "granted" === t3.status && n3 === e4;
              });
            }).length === e3.length];
        }
      });
    });
  }, e2.prototype.subscribe = function(e3, t2) {
    return h(this, void 0, void 0, function() {
      var n2 = this;
      return f(this, function(r2) {
        switch (r2.label) {
          case 0:
            return [4, this.init()];
          case 1:
            return r2.sent(), this.getFB().Event.subscribe(e3, t2), [2, function() {
              return n2.unsubscribe(e3, t2);
            }];
        }
      });
    });
  }, e2.prototype.unsubscribe = function(e3, t2) {
    return h(this, void 0, void 0, function() {
      return f(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, this.init()];
          case 1:
            return n2.sent(), this.getFB().Event.unsubscribe(e3, t2), [2];
        }
      });
    });
  }, e2.prototype.parse = function(e3) {
    return h(this, void 0, void 0, function() {
      return f(this, function(t2) {
        switch (t2.label) {
          case 0:
            return [4, this.init()];
          case 1:
            return t2.sent(), void 0 === e3 ? this.getFB().XFBML.parse() : this.getFB().XFBML.parse(e3), [2];
        }
      });
    });
  }, e2.prototype.getRequests = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        return [2, this.api("/me/apprequests")];
      });
    });
  }, e2.prototype.removeRequest = function(e3) {
    return h(this, void 0, void 0, function() {
      return f(this, function(t2) {
        return [2, this.api(e3, v.DELETE)];
      });
    });
  }, e2.prototype.setAutoGrow = function() {
    return h(this, void 0, void 0, function() {
      return f(this, function(e3) {
        switch (e3.label) {
          case 0:
            return [4, this.init()];
          case 1:
            return e3.sent(), this.getFB().Canvas.setAutoGrow(), [2];
        }
      });
    });
  }, e2.prototype.paySimple = function(e3, t2) {
    return void 0 === t2 && (t2 = 1), h(this, void 0, void 0, function() {
      return f(this, function(n2) {
        return [2, this.ui({ method: "pay", action: "purchaseitem", product: e3, quantity: t2 })];
      });
    });
  }, e2.prototype.pay = function(e3, t2) {
    return h(this, void 0, void 0, function() {
      return f(this, function(n2) {
        return [2, this.ui(l({ method: "pay", action: "purchaseitem", product: e3 }, t2))];
      });
    });
  }, e2;
}();
var T = (0, import_react.createContext)(void 0);
function _(t2) {
  var i2 = t2.children, o2 = d(t2, ["children"]), a2 = (0, import_react.useState)(true), s2 = a2[0], u2 = a2[1], c2 = (0, import_react.useState)(false), l2 = c2[0], p2 = c2[1], v2 = (0, import_react.useState)(), g2 = v2[0], m2 = v2[1];
  function y2() {
    return h(this, void 0, void 0, function() {
      var e2;
      return f(this, function(t3) {
        switch (t3.label) {
          case 0:
            return t3.trys.push([0, 2, 3, 4]), w ? [2, w.init()] : (p2(false), u2(true), [4, (w = new E(o2)).init()]);
          case 1:
            return t3.sent(), p2(true), [3, 4];
          case 2:
            return e2 = t3.sent(), m2(e2), [3, 4];
          case 3:
            return u2(false), [7];
          case 4:
            return [2, w];
        }
      });
    });
  }
  (0, import_react.useEffect)(function() {
    o2.lazy || y2();
  }, []);
  var b2 = { isLoading: s2, error: g2, init: y2, api: l2 ? w : void 0, parse: function(e2) {
    return h(this, void 0, void 0, function() {
      var t3;
      return f(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, y2()];
          case 1:
            return (t3 = n2.sent()) ? [4, t3.parse(e2)] : [3, 3];
          case 2:
            n2.sent(), n2.label = 3;
          case 3:
            return [2];
        }
      });
    });
  } };
  return import_react.default.createElement(T.Provider, { value: b2 }, i2);
}
function z(e2) {
  void 0 === e2 && (e2 = {});
  var t2 = e2.lazy, n2 = void 0 !== t2 && t2, o2 = (0, import_react.useContext)(T);
  if (!o2) throw new Error("useFacebook must be used within a FacebookProvider");
  return (0, import_react.useEffect)(function() {
    n2 || o2.init();
  }, [n2]), o2;
}
var k = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.inline, i2 = t2.children, o2 = d(t2, ["inline", "children"]), a2 = r2 ? "span" : "div";
  return import_react.default.createElement(a2, l({}, o2, { ref: n2 }), i2);
}));
var I = (0, import_react.memo)(function(t2) {
  var i2 = t2.children, o2 = t2.inline, a2 = d(t2, ["children", "inline"]), u2 = z().parse, c2 = (0, import_react.useState)(null), h2 = c2[0], f2 = c2[1], p2 = (0, import_react.useCallback)(function(e2) {
    f2(e2);
  }, []);
  return (0, import_react.useEffect)(function() {
    h2 && u2(h2);
  }, [h2]), import_react.default.createElement(k, l({ inline: o2 }, a2, { ref: p2 }), i2);
});
var O = !("undefined" == typeof window || !window.document || !window.document.createElement);
function S() {
  return O ? window.location.href : "https://www.facebook.com";
}
var A = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.href, i2 = void 0 === r2 ? S() : r2, o2 = t2.layout, a2 = t2.colorScheme, s2 = t2.action, u2 = t2.showFaces, c2 = t2.share, h2 = t2.children, f2 = t2.width, p2 = t2.size, v2 = t2.kidDirectedSite, g2 = t2.referral, m2 = t2.lazy, y2 = d(t2, ["href", "layout", "colorScheme", "action", "showFaces", "share", "children", "width", "size", "kidDirectedSite", "referral", "lazy"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-like", "data-ref": g2, "data-href": i2, "data-layout": o2, "data-colorscheme": a2, "data-action": s2, "data-show-faces": u2, "data-share": c2, "data-width": f2, "data-size": p2, "data-lazy": m2, "data-kid-directed-site": v2 }, y2, { ref: n2 }), h2));
}));
function C() {
  var e2 = z().init, t2 = (0, import_react.useState)(false), r2 = t2[0], i2 = t2[1], o2 = (0, import_react.useState)(void 0), a2 = o2[0], s2 = o2[1];
  return { isLoading: r2, error: a2, share: function(t3) {
    return h(this, void 0, void 0, function() {
      var n2, r3, o3, a3, u2, c2, h2;
      return f(this, function(f2) {
        switch (f2.label) {
          case 0:
            return f2.trys.push([0, 2, 3, 4]), n2 = t3.href, r3 = t3.display, o3 = t3.hashtag, a3 = t3.redirectUri, u2 = d(t3, ["href", "display", "hashtag", "redirectUri"]), s2(void 0), i2(true), [4, e2()];
          case 1:
            if (!(c2 = f2.sent())) throw new Error("Facebook API is not initialized");
            return [2, c2.ui((p2 = l({ method: "share", href: n2, display: r3, app_id: c2.getAppId(), hashtag: o3, redirect_uri: a3 }, u2), Object.fromEntries(Object.entries(p2).filter(function(e3) {
              return void 0 !== e3[1];
            }))))];
          case 2:
            return h2 = f2.sent(), s2(h2), [3, 4];
          case 3:
            return i2(false), [7];
          case 4:
            return [2];
        }
        var p2;
      });
    });
  } };
}
function L(t2) {
  var n2 = t2.children, r2 = t2.asChild, i2 = void 0 === r2 ? "button" : r2;
  t2.disabled;
  var o2 = t2.href, a2 = t2.display, s2 = t2.hashtag, u2 = t2.redirectUri, c2 = d(t2, ["children", "asChild", "disabled", "href", "display", "hashtag", "redirectUri"]), h2 = C(), f2 = h2.isLoading, p2 = h2.share;
  return import_react.default.createElement(i2, l({ onClick: function() {
    f2 || p2({ href: o2, display: a2, hashtag: s2, redirectUri: u2 });
  }, disabled: f2 }, c2), n2);
}
var N = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.style, i2 = t2.href, o2 = void 0 === i2 ? S() : i2, a2 = t2.tabs, s2 = t2.hideCover, u2 = t2.width, c2 = t2.height, h2 = t2.showFacepile, f2 = t2.hideCTA, p2 = t2.smallHeader, v2 = t2.adaptContainerWidth, g2 = t2.children, m2 = t2.lazy, y2 = d(t2, ["style", "href", "tabs", "hideCover", "width", "height", "showFacepile", "hideCTA", "smallHeader", "adaptContainerWidth", "children", "lazy"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-page", style: r2, "data-tabs": a2, "data-hide-cover": s2, "data-show-facepile": h2, "data-hide-cta": f2, "data-href": o2, "data-small-header": p2, "data-adapt-container-width": v2, "data-height": c2, "data-width": u2, "data-lazy": m2 }, y2, { ref: n2 }), g2));
}));
function P() {
  var e2 = z(), t2 = e2.api, r2 = e2.isLoading, i2 = (0, import_react.useState)(void 0), o2 = i2[0], a2 = i2[1], s2 = (0, import_react.useState)(false), u2 = s2[0], c2 = s2[1], l2 = (0, import_react.useState)(), d2 = l2[0], p2 = l2[1];
  return { login: function(e3, n2) {
    return h(this, void 0, void 0, function() {
      var r3, i3;
      return f(this, function(o3) {
        switch (o3.label) {
          case 0:
            if (o3.trys.push([0, 2, 3, 4]), !t2) throw new Error("Facebook API is not initialized");
            return c2(true), [4, t2.login(e3)];
          case 1:
            if ((r3 = o3.sent()).status !== m.CONNECTED) throw new Error("Unauthorized user");
            return p2(r3), null == n2 || n2(r3), [2, r3];
          case 2:
            throw i3 = o3.sent(), a2(i3), i3;
          case 3:
            return c2(false), [7];
          case 4:
            return [2];
        }
      });
    });
  }, error: o2, isLoading: r2 || u2, status: null == d2 ? void 0 : d2.status };
}
function D(t2) {
  var n2 = t2.children, r2 = t2.asChild, i2 = void 0 === r2 ? "button" : r2;
  t2.disabled;
  var o2 = t2.scope, a2 = t2.returnScopes, s2 = t2.authType, u2 = t2.rerequest, c2 = t2.reauthorize, p2 = t2.onError, v2 = t2.onSuccess, g2 = d(t2, ["children", "asChild", "disabled", "scope", "returnScopes", "authType", "rerequest", "reauthorize", "onError", "onSuccess"]), m2 = P(), y2 = m2.isLoading, w2 = m2.login;
  return import_react.default.createElement(i2, l({ onClick: function() {
    return h(this, void 0, void 0, function() {
      var e2, t3;
      return f(this, function(n3) {
        switch (n3.label) {
          case 0:
            return n3.trys.push([0, 2, , 3]), y2 ? [2] : [4, w2({ scope: o2, returnScopes: a2, authType: s2, rerequest: u2, reauthorize: c2 })];
          case 1:
            return e2 = n3.sent(), null == v2 || v2(e2), [3, 3];
          case 2:
            return t3 = n3.sent(), null == p2 || p2(t3), [3, 3];
          case 3:
            return [2];
        }
      });
    });
  }, disabled: y2 }, g2), n2);
}
var R = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.href, i2 = t2.width, o2 = t2.showText, a2 = t2.lazy, s2 = t2.children, u2 = d(t2, ["href", "width", "showText", "lazy", "children"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-post", "data-href": r2, "data-width": i2, "data-lazy": a2, "data-show-text": o2 }, u2, { ref: n2 }), s2));
}));
var x = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.href, i2 = t2.width, o2 = t2.showText, a2 = t2.allowFullScreen, s2 = t2.autoPlay, u2 = t2.lazy, c2 = t2.showCaptions, h2 = t2.children, f2 = d(t2, ["href", "width", "showText", "allowFullScreen", "autoPlay", "lazy", "showCaptions", "children"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-video", "data-href": r2, "data-width": i2, "data-show-text": o2, "data-show-captions": c2, "data-autoplay": s2, "data-lazy": u2, "data-allowfullscreen": a2 }, f2, { ref: n2 }), h2));
}));
var U = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.colorScheme, i2 = t2.href, o2 = void 0 === i2 ? S() : i2, a2 = t2.numPosts, s2 = t2.orderBy, u2 = t2.width, c2 = t2.children, h2 = t2.mobile, f2 = t2.lazy, p2 = d(t2, ["colorScheme", "href", "numPosts", "orderBy", "width", "children", "mobile", "lazy"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-comments", "data-colorscheme": r2, "data-numposts": a2, "data-href": o2, "data-order-by": s2, "data-width": u2, "data-skin": r2, "data-mobile": h2, "data-lazy": f2 }, p2, { ref: n2 }), c2));
}));
var G = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.href, i2 = void 0 === r2 ? S() : r2, o2 = t2.children, a2 = d(t2, ["href", "children"]);
  return import_react.default.createElement(I, { inline: true }, import_react.default.createElement("span", l({ className: "fb-comments-count", "data-href": i2 }, a2, { ref: n2 }), o2));
}));
var F = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.style, i2 = t2.href, o2 = void 0 === i2 ? S() : i2, a2 = t2.width, s2 = t2.lazy, u2 = t2.showSocialContext, c2 = t2.showMetaData, h2 = t2.children, f2 = t2.skin, p2 = d(t2, ["style", "href", "width", "lazy", "showSocialContext", "showMetaData", "children", "skin"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-group", style: r2, "data-href": o2, "data-width": a2, "data-show-social-context": u2, "data-show-metadata": c2, "data-skin": f2, "data-lazy": s2 }, p2, { ref: n2 }), h2));
}));
var B = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.style, i2 = t2.uri, o2 = void 0 === i2 ? S() : i2, a2 = t2.lazy, s2 = t2.children, u2 = d(t2, ["style", "uri", "lazy", "children"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-save", style: r2, "data-uri": o2, "data-lazy": a2 }, u2, { ref: n2 }), s2));
}));
var M = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.style, i2 = t2.href, o2 = void 0 === i2 ? S() : i2, a2 = t2.lazy, s2 = t2.layout, u2 = t2.size, c2 = t2.children, h2 = d(t2, ["style", "href", "lazy", "layout", "size", "children"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-share-button", style: r2, "data-href": o2, "data-lazy": a2, "data-size": u2, "data-layout": s2 }, h2, { ref: n2 }), c2));
}));
var j = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.children, i2 = t2.pageId, o2 = t2.themeColor, a2 = t2.loggedInGreeting, s2 = t2.loggedOutGreeting, u2 = t2.dataRef, c2 = t2.greetingDialogDisplay, h2 = t2.greetingDialogDelay, f2 = t2.minimized, p2 = d(t2, ["children", "pageId", "themeColor", "loggedInGreeting", "loggedOutGreeting", "dataRef", "greetingDialogDisplay", "greetingDialogDelay", "minimized"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-customerchat", page_id: i2, theme_color: o2, logged_in_greeting: a2, logged_out_greeting: s2, greeting_dialog_display: c2, greeting_dialog_delay: h2, "data-ref": u2, minimized: f2 }, p2, { ref: n2 }), r2));
}));
var q = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.color, i2 = t2.messengerAppId, o2 = t2.pageId, a2 = t2.children, s2 = t2.size, u2 = t2.dataRef, c2 = d(t2, ["color", "messengerAppId", "pageId", "children", "size", "dataRef"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-messengermessageus", messenger_app_id: i2, page_id: o2, "data-color": r2, "data-size": s2, "data-ref": u2 }, c2, { ref: n2 }), a2));
}));
var H = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.origin, i2 = t2.prechecked, o2 = t2.allowLogin, a2 = t2.userRef, s2 = t2.messengerAppId, u2 = t2.pageId, c2 = t2.children, h2 = t2.size, f2 = t2.centerAlign, p2 = t2.skin, v2 = d(t2, ["origin", "prechecked", "allowLogin", "userRef", "messengerAppId", "pageId", "children", "size", "centerAlign", "skin"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-messenger-checkbox", messenger_app_id: s2, page_id: u2, size: h2, origin: r2, user_ref: a2, prechecked: i2, allow_login: o2, skin: p2, center_align: f2 }, v2, { ref: n2 }), c2));
}));
var W;
var X = (0, import_react.memo)((0, import_react.forwardRef)(function(t2, n2) {
  var r2 = t2.color, i2 = t2.messengerAppId, o2 = t2.pageId, a2 = t2.children, s2 = t2.dataRef, u2 = t2.size, c2 = t2.enforceLogin, h2 = t2.ctaText, f2 = d(t2, ["color", "messengerAppId", "pageId", "children", "dataRef", "size", "enforceLogin", "ctaText"]);
  return import_react.default.createElement(I, null, import_react.default.createElement("div", l({ className: "fb-send-to-messenger", messenger_app_id: i2, page_id: o2, "data-color": r2, "data-size": u2, "data-ref": s2, enforce_login: c2, cta_text: h2 }, f2, { ref: n2 }), a2));
}));
!function(e2) {
  e2.SMALL = "small", e2.LARGE = "large";
}(W || (W = {}));
var K;
var V = W;
!function(e2) {
  e2.STANDARD = "standard", e2.BUTTON_COUNT = "button_count", e2.BUTTON = "button", e2.BOX_COUNT = "box_count";
}(K || (K = {}));
var Z;
var Y = K;
!function(e2) {
  e2.LIGHT = "light", e2.DARK = "dark";
}(Z || (Z = {}));
var J;
var Q = Z;
!function(e2) {
  e2.LIKE = "like", e2.RECOMMEND = "recommend";
}(J || (J = {}));
var $;
var ee = J;
!function(e2) {
  e2.SOCIAL = "social", e2.REVERSE_TIME = "reverse_time", e2.TIME = "time";
}($ || ($ = {}));
var te;
var ne = $;
!function(e2) {
  e2.SMALL = "small", e2.MEDIUM = "medium", e2.STANDARD = "standard", e2.LARGE = "large", e2.XLARGE = "xlarge";
}(te || (te = {}));
var re;
var ie = te;
!function(e2) {
  e2.BLUE = "blue", e2.WHITE = "white";
}(re || (re = {}));
var oe = re;
var ae = ["id", "first_name", "last_name", "middle_name", "name", "name_format", "picture", "short_name", "email"];
function se(e2, t2) {
  var i2 = this, o2 = (0, import_react.useState)(void 0), a2 = o2[0], u2 = o2[1], c2 = z().init, l2 = (0, import_react.useCallback)(function(e3) {
    u2(e3), null == t2 || t2(a2);
  }, [t2]), d2 = (0, import_react.useCallback)(function() {
    return h(i2, void 0, void 0, function() {
      var t3;
      return f(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, c2()];
          case 1:
            return (t3 = n2.sent()) ? [4, t3.subscribe(e2, l2)] : [3, 3];
          case 2:
            n2.sent(), n2.label = 3;
          case 3:
            return [2];
        }
      });
    });
  }, [e2, l2]), p2 = (0, import_react.useCallback)(function() {
    return h(i2, void 0, void 0, function() {
      var t3;
      return f(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, c2()];
          case 1:
            return (t3 = n2.sent()) ? [4, t3.unsubscribe(e2, l2)] : [3, 3];
          case 2:
            n2.sent(), n2.label = 3;
          case 3:
            return [2];
        }
      });
    });
  }, [e2, l2]);
  return (0, import_react.useEffect)(function() {
    return d2(), function() {
      p2();
    };
  }, [d2]), a2;
}
function ue() {
  var e2 = z().init, t2 = (0, import_react.useState)(true), i2 = t2[0], o2 = t2[1], a2 = (0, import_react.useState)(void 0), u2 = a2[0], c2 = a2[1], l2 = (0, import_react.useState)(m.UNKNOWN), d2 = l2[0], p2 = l2[1];
  return se("auth.statusChange", (0, import_react.useCallback)(function(e3) {
    p2(e3.status);
  }, [])), (0, import_react.useEffect)(function() {
    !function() {
      h(this, void 0, void 0, function() {
        var t3, n2, r2;
        return f(this, function(i3) {
          switch (i3.label) {
            case 0:
              return i3.trys.push([0, 3, 4, 5]), o2(true), [4, e2()];
            case 1:
              if (!(t3 = i3.sent())) throw new Error("Facebook API is not initialized");
              return [4, t3.getLoginStatus()];
            case 2:
              return n2 = i3.sent().status, p2(n2), [3, 5];
            case 3:
              return r2 = i3.sent(), c2(r2), [3, 5];
            case 4:
              return o2(false), [7];
            case 5:
              return [2];
          }
        });
      });
    }();
  }, []), { isLoading: i2, error: u2, status: d2 };
}
function ce(e2) {
  var t2 = z().init, i2 = ue().status, o2 = (0, import_react.useState)(true), a2 = o2[0], s2 = o2[1], u2 = (0, import_react.useState)(void 0), c2 = u2[0], l2 = u2[1], d2 = (0, import_react.useState)(void 0), p2 = d2[0], v2 = d2[1];
  return (0, import_react.useEffect)(function() {
    !function() {
      h(this, void 0, void 0, function() {
        var n2, r2, o3;
        return f(this, function(a3) {
          switch (a3.label) {
            case 0:
              return a3.trys.push([0, 4, 5, 6]), v2(void 0), s2(true), [4, t2()];
            case 1:
              if (!(n2 = a3.sent())) throw new Error("Facebook API is not initialized");
              return i2 !== m.CONNECTED ? [3, 3] : [4, n2.getProfile({ fields: e2 })];
            case 2:
              r2 = a3.sent(), l2(r2), a3.label = 3;
            case 3:
              return [3, 6];
            case 4:
              return o3 = a3.sent(), v2(o3), [3, 6];
            case 5:
              return s2(false), [7];
            case 6:
              return [2];
          }
        });
      });
    }();
  }, [i2, e2]), { isLoading: a2, error: p2, profile: c2 };
}
export {
  Q as ColorScheme,
  U as Comments,
  G as CommentsCount,
  ne as CommentsOrderBy,
  j as CustomChat,
  R as EmbeddedPost,
  x as EmbeddedVideo,
  T as FacebookContext,
  _ as FacebookProvider,
  ae as Fields,
  F as Group,
  A as Like,
  ee as LikeAction,
  Y as LikeLayout,
  V as LikeSize,
  D as LoginButton,
  m as LoginStatus,
  q as MessageUs,
  H as MessengerCheckbox,
  oe as MessengerColor,
  ie as MessengerSize,
  N as Page,
  I as Parser,
  B as Save,
  X as SendToMessenger,
  M as Share,
  L as ShareButton,
  z as useFacebook,
  P as useLogin,
  ue as useLoginStatus,
  ce as useProfile,
  C as useShare,
  se as useSubscribe
};
//# sourceMappingURL=react-facebook.js.map
