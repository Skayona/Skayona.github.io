/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_visible__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(choices_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Polyfills_scrollIntoViewIfNeeded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var Polyfills_scrollIntoViewIfNeeded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(Polyfills_scrollIntoViewIfNeeded__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var UiComponents_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var Components_youtube_video_loader_youtube_video_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var Components_youtube_video_loader_youtube_video_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(Components_youtube_video_loader_youtube_video_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var Components_header_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var Components_header_header__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(Components_header_header__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var Components_auth_register__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var Components_auth_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);


 // ui-components

 // components






/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory() :
  undefined;
}(this, (function () { 'use strict';

  /**
   * Applies the :focus-visible polyfill at the given scope.
   * A scope in this case is either the top-level Document or a Shadow Root.
   *
   * @param {(Document|ShadowRoot)} scope
   * @see https://github.com/WICG/focus-visible
   */
  function applyFocusVisiblePolyfill(scope) {
    var hadKeyboardEvent = true;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;

    var inputTypesAllowlist = {
      text: true,
      search: true,
      url: true,
      tel: true,
      email: true,
      password: true,
      number: true,
      date: true,
      month: true,
      week: true,
      time: true,
      datetime: true,
      'datetime-local': true
    };

    /**
     * Helper function for legacy browsers and iframes which sometimes focus
     * elements like document, body, and non-interactive SVG.
     * @param {Element} el
     */
    function isValidFocusTarget(el) {
      if (
        el &&
        el !== document &&
        el.nodeName !== 'HTML' &&
        el.nodeName !== 'BODY' &&
        'classList' in el &&
        'contains' in el.classList
      ) {
        return true;
      }
      return false;
    }

    /**
     * Computes whether the given element should automatically trigger the
     * `focus-visible` class being added, i.e. whether it should always match
     * `:focus-visible` when focused.
     * @param {Element} el
     * @return {boolean}
     */
    function focusTriggersKeyboardModality(el) {
      var type = el.type;
      var tagName = el.tagName;

      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
        return true;
      }

      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }

      if (el.isContentEditable) {
        return true;
      }

      return false;
    }

    /**
     * Add the `focus-visible` class to the given element if it was not added by
     * the author.
     * @param {Element} el
     */
    function addFocusVisibleClass(el) {
      if (el.classList.contains('focus-visible')) {
        return;
      }
      el.classList.add('focus-visible');
      el.setAttribute('data-focus-visible-added', '');
    }

    /**
     * Remove the `focus-visible` class from the given element if it was not
     * originally added by the author.
     * @param {Element} el
     */
    function removeFocusVisibleClass(el) {
      if (!el.hasAttribute('data-focus-visible-added')) {
        return;
      }
      el.classList.remove('focus-visible');
      el.removeAttribute('data-focus-visible-added');
    }

    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     * @param {KeyboardEvent} e
     */
    function onKeyDown(e) {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(scope.activeElement)) {
        addFocusVisibleClass(scope.activeElement);
      }

      hadKeyboardEvent = true;
    }

    /**
     * If at any point a user clicks with a pointing device, ensure that we change
     * the modality away from keyboard.
     * This avoids the situation where a user presses a key on an already focused
     * element, and then clicks on a different element, focusing it with a
     * pointing device, while we still think we're in keyboard modality.
     * @param {Event} e
     */
    function onPointerDown(e) {
      hadKeyboardEvent = false;
    }

    /**
     * On `focus`, add the `focus-visible` class to the target if:
     * - the target received focus as a result of keyboard navigation, or
     * - the event target is an element that will likely require interaction
     *   via the keyboard (e.g. a text box)
     * @param {Event} e
     */
    function onFocus(e) {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    }

    /**
     * On `blur`, remove the `focus-visible` class from the target.
     * @param {Event} e
     */
    function onBlur(e) {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (
        e.target.classList.contains('focus-visible') ||
        e.target.hasAttribute('data-focus-visible-added')
      ) {
        // To detect a tab/window switch, we look for a blur event followed
        // rapidly by a visibility change.
        // If we don't see a visibility change within 100ms, it's probably a
        // regular focus change.
        hadFocusVisibleRecently = true;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
          hadFocusVisibleRecently = false;
        }, 100);
        removeFocusVisibleClass(e.target);
      }
    }

    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     * @param {Event} e
     */
    function onVisibilityChange(e) {
      if (document.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
        if (hadFocusVisibleRecently) {
          hadKeyboardEvent = true;
        }
        addInitialPointerMoveListeners();
      }
    }

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    function addInitialPointerMoveListeners() {
      document.addEventListener('mousemove', onInitialPointerMove);
      document.addEventListener('mousedown', onInitialPointerMove);
      document.addEventListener('mouseup', onInitialPointerMove);
      document.addEventListener('pointermove', onInitialPointerMove);
      document.addEventListener('pointerdown', onInitialPointerMove);
      document.addEventListener('pointerup', onInitialPointerMove);
      document.addEventListener('touchmove', onInitialPointerMove);
      document.addEventListener('touchstart', onInitialPointerMove);
      document.addEventListener('touchend', onInitialPointerMove);
    }

    function removeInitialPointerMoveListeners() {
      document.removeEventListener('mousemove', onInitialPointerMove);
      document.removeEventListener('mousedown', onInitialPointerMove);
      document.removeEventListener('mouseup', onInitialPointerMove);
      document.removeEventListener('pointermove', onInitialPointerMove);
      document.removeEventListener('pointerdown', onInitialPointerMove);
      document.removeEventListener('pointerup', onInitialPointerMove);
      document.removeEventListener('touchmove', onInitialPointerMove);
      document.removeEventListener('touchstart', onInitialPointerMove);
      document.removeEventListener('touchend', onInitialPointerMove);
    }

    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     * @param {Event} e
     */
    function onInitialPointerMove(e) {
      // Work around a Safari quirk that fires a mousemove on <html> whenever the
      // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent = false;
      removeInitialPointerMoveListeners();
    }

    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    // For focus and blur, we specifically care about state changes in the local
    // scope. This is because focus / blur events that originate from within a
    // shadow root are not re-dispatched from the host element if it was already
    // the active element in its own scope:
    scope.addEventListener('focus', onFocus, true);
    scope.addEventListener('blur', onBlur, true);

    // We detect that a node is a ShadowRoot by ensuring that it is a
    // DocumentFragment and also has a host property. This check covers native
    // implementation and polyfill implementation transparently. If we only cared
    // about the native implementation, we could just check if the scope was
    // an instance of a ShadowRoot.
    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
      // Since a ShadowRoot is a special kind of DocumentFragment, it does not
      // have a root element to add a class to. So, we add this attribute to the
      // host element instead:
      scope.host.setAttribute('data-js-focus-visible', '');
    } else if (scope.nodeType === Node.DOCUMENT_NODE) {
      document.documentElement.classList.add('js-focus-visible');
      document.documentElement.setAttribute('data-js-focus-visible', '');
    }
  }

  // It is important to wrap all references to global window and document in
  // these checks to support server-side rendering use cases
  // @see https://github.com/WICG/focus-visible/issues/199
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Make the polyfill helper globally available. This can be used as a signal
    // to interested libraries that wish to coordinate with the polyfill for e.g.,
    // applying the polyfill to a shadow root:
    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;

    // Notify interested libraries of the polyfill's presence, in case the
    // polyfill was loaded lazily:
    var event;

    try {
      event = new CustomEvent('focus-visible-polyfill-ready');
    } catch (error) {
      // IE11 does not support using CustomEvent as a constructor directly:
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});
    }

    window.dispatchEvent(event);
  }

  if (typeof document !== 'undefined') {
    // Apply the polyfill to the global document, so that no JavaScript
    // coordination is required to use the polyfill in the top-level document:
    applyFocusVisiblePolyfill(document);
  }

})));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*! choices.js v9.0.1 | © 2019 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	try {
		return (key in target) // Properties are safe to merge if they don't exist in the target yet,
			&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
				&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
	} catch (unused) {
		// Counterintuitively, it's safe to merge any property on a target that causes the `in` operator to throw.
		// This happens when trying to copy an object in the source over a plain string in the target.
		return false
	}
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (!options.isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		} else {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5), __webpack_require__(6)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.4.5 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=n(2),a=n(8),s=n(0),c=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,h=void 0===c?.6:c,l=n.maxPatternLength,u=void 0===l?32:l,f=n.caseSensitive,d=void 0!==f&&f,v=n.tokenSeparator,p=void 0===v?/ +/g:v,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m,S=n.id,x=void 0===S?null:S,b=n.keys,M=void 0===b?[]:b,_=n.shouldSort,L=void 0===_||_,w=n.getFn,A=void 0===w?a:w,C=n.sortFn,I=void 0===C?function(e,t){return e.score-t.score}:C,O=n.tokenize,j=void 0!==O&&O,P=n.matchAllTokens,F=void 0!==P&&P,T=n.includeMatches,z=void 0!==T&&T,E=n.includeScore,K=void 0!==E&&E,$=n.verbose,J=void 0!==$&&$;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k,id:x,keys:M,includeMatches:z,includeScore:K,shouldSort:L,getFn:A,sortFn:I,verbose:J,tokenize:j,matchAllTokens:F},this.setCollection(t)}var t,n,c;return t=e,(n=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var n=this._prepareSearchers(e),r=n.tokenSearchers,o=n.fullSearcher,i=this._search(r,o),a=i.weights,s=i.results;return this._computeScore(a,s),this.options.shouldSort&&this._sort(s),t.limit&&"number"==typeof t.limit&&(s=s.slice(0,t.limit)),this._format(s)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var n=e.split(this.options.tokenSeparator),r=0,o=n.length;r<o;r+=1)t.push(new i(n[r],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=this.list,r={},o=[];if("string"==typeof n[0]){for(var i=0,a=n.length;i<a;i+=1)this._analyze({key:"",value:n[i],record:i,index:i},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t});return{weights:null,results:o}}for(var s={},c=0,h=n.length;c<h;c+=1)for(var l=n[c],u=0,f=this.options.keys.length;u<f;u+=1){var d=this.options.keys[u];if("string"!=typeof d){if(s[d.name]={weight:1-d.weight||1},d.weight<=0||d.weight>1)throw new Error("Key weight has to be > 0 and <= 1");d=d.name}else s[d]={weight:1};this._analyze({key:d,value:this.options.getFn(l,d),record:l,index:c},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t})}return{weights:s,results:o}}},{key:"_analyze",value:function(e,t){var n=e.key,r=e.arrayIndex,o=void 0===r?-1:r,i=e.value,a=e.record,c=e.index,h=t.tokenSearchers,l=void 0===h?[]:h,u=t.fullSearcher,f=void 0===u?[]:u,d=t.resultMap,v=void 0===d?{}:d,p=t.results,g=void 0===p?[]:p;if(null!=i){var y=!1,m=-1,k=0;if("string"==typeof i){this._log("\nKey: ".concat(""===n?"-":n));var S=f.search(i);if(this._log('Full text: "'.concat(i,'", score: ').concat(S.score)),this.options.tokenize){for(var x=i.split(this.options.tokenSeparator),b=[],M=0;M<l.length;M+=1){var _=l[M];this._log('\nPattern: "'.concat(_.pattern,'"'));for(var L=!1,w=0;w<x.length;w+=1){var A=x[w],C=_.search(A),I={};C.isMatch?(I[A]=C.score,y=!0,L=!0,b.push(C.score)):(I[A]=1,this.options.matchAllTokens||b.push(1)),this._log('Token: "'.concat(A,'", score: ').concat(I[A]))}L&&(k+=1)}m=b[0];for(var O=b.length,j=1;j<O;j+=1)m+=b[j];m/=O,this._log("Token score average:",m)}var P=S.score;m>-1&&(P=(P+m)/2),this._log("Score average:",P);var F=!this.options.tokenize||!this.options.matchAllTokens||k>=l.length;if(this._log("\nCheck Matches: ".concat(F)),(y||S.isMatch)&&F){var T=v[c];T?T.output.push({key:n,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}):(v[c]={item:a,output:[{key:n,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}]},g.push(v[c]))}}else if(s(i))for(var z=0,E=i.length;z<E;z+=1)this._analyze({key:n,arrayIndex:z,value:i[z],record:a,index:c},{resultMap:v,results:g,tokenSearchers:l,fullSearcher:f})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var n=0,r=t.length;n<r;n+=1){for(var o=t[n].output,i=o.length,a=1,s=1,c=0;c<i;c+=1){var h=e?e[o[c].key].weight:1,l=(1===h?o[c].score:o[c].score||.001)*h;1!==h?s=Math.min(s,l):(o[c].nScore=l,a*=l)}t[n].score=1===s?a:s,this._log(t[n])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var n=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===r(t)&&null!==t){if(-1!==n.indexOf(t))return;n.push(t)}return t})),n=null}var o=[];this.options.includeMatches&&o.push(function(e,t){var n=e.output;t.matches=[];for(var r=0,o=n.length;r<o;r+=1){var i=n[r];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c)}else t.push(s.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&o(t.prototype,n),c&&o(t,c),e}();e.exports=c},function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=n(3),i=n(4),a=n(7),s=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,h=void 0===c?.6:c,l=n.maxPatternLength,u=void 0===l?32:l,f=n.isCaseSensitive,d=void 0!==f&&f,v=n.tokenSeparator,p=void 0===v?/ +/g:v,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k},this.pattern=this.options.isCaseSensitive?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern))}var t,n,s;return t=e,(n=[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,n=t.maxPatternLength,r=t.tokenSeparator;if(this.pattern.length>n)return o(e,this.pattern,r);var a=this.options,s=a.location,c=a.distance,h=a.threshold,l=a.findAllMatches,u=a.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:s,distance:c,threshold:h,findAllMatches:l,minMatchCharLength:u})}}])&&r(t.prototype,n),s&&r(t,s),e}();e.exports=s},function(e,t){var n=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(n,"\\$&").replace(r,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1])}return{score:a?.5:1,isMatch:a,matchedIndices:s}}},function(e,t,n){var r=n(5),o=n(6);e.exports=function(e,t,n,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,d=void 0!==f&&f,v=i.minMatchCharLength,p=void 0===v?1:v,g=s,y=e.length,m=u,k=e.indexOf(t,g),S=t.length,x=[],b=0;b<y;b+=1)x[b]=0;if(-1!==k){var M=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});if(m=Math.min(M,m),-1!==(k=e.lastIndexOf(t,g+S))){var _=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});m=Math.min(_,m)}}k=-1;for(var L=[],w=1,A=S+y,C=1<<S-1,I=0;I<S;I+=1){for(var O=0,j=A;O<j;){r(t,{errors:I,currentLocation:g+j,expectedLocation:g,distance:h})<=m?O=j:A=j,j=Math.floor((A-O)/2+O)}A=j;var P=Math.max(1,g-j+1),F=d?y:Math.min(g+j,y)+S,T=Array(F+2);T[F+1]=(1<<I)-1;for(var z=F;z>=P;z-=1){var E=z-1,K=n[e.charAt(E)];if(K&&(x[E]=1),T[z]=(T[z+1]<<1|1)&K,0!==I&&(T[z]|=(L[z+1]|L[z])<<1|1|L[z+1]),T[z]&C&&(w=r(t,{errors:I,currentLocation:E,expectedLocation:g,distance:h}))<=m){if(m=w,(k=E)<=g)break;P=Math.max(1,2*g-k)}}if(r(t,{errors:I+1,currentLocation:g,expectedLocation:g,distance:h})>m)break;L=T}return{isMatch:k>=0,score:0===w?.001:w,matchedIndices:o(x,p)}}},function(e,t){e.exports=function(e,t){var n=t.errors,r=void 0===n?0:n,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=r/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l}},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=[],r=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===r?r=i:s||-1===r||((o=i-1)-r+1>=t&&n.push([r,o]),r=-1)}return e[i-1]&&i-r>=t&&n.push([r,i-1]),n}},function(e,t){e.exports=function(e){for(var t={},n=e.length,r=0;r<n;r+=1)t[e.charAt(r)]=0;for(var o=0;o<n;o+=1)t[e.charAt(o)]|=1<<n-o-1;return t}},function(e,t,n){var r=n(0);e.exports=function(e,t){return function e(t,n,o){if(n){var i=n.indexOf("."),a=n,s=null;-1!==i&&(a=n.slice(0,i),s=n.slice(i+1));var c=t[a];if(null!=c)if(s||"string"!=typeof c&&"number"!=typeof c)if(r(c))for(var h=0,l=c.length;h<l;h+=1)e(c[h],s,o);else s&&e(c,s,o);else o.push(c.toString())}else o.push(t);return o}(e,t,[])}}])});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/fuse.js/dist/fuse.js
var dist_fuse = __webpack_require__(2);
var fuse_default = /*#__PURE__*/__webpack_require__.n(dist_fuse);

// EXTERNAL MODULE: ./node_modules/deepmerge/dist/cjs.js
var cjs = __webpack_require__(0);
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// EXTERNAL MODULE: ./node_modules/symbol-observable/es/index.js
var es = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/redux/es/redux.js


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[es["a" /* default */]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[es["a" /* default */]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (false) {}



// CONCATENATED MODULE: ./src/scripts/reducers/items.js
var defaultState = [];
function items_items(state, action) {
  if (state === void 0) {
    state = defaultState;
  }

  switch (action.type) {
    case 'ADD_ITEM':
      {
        // Add object to items array
        var newState = [].concat(state, [{
          id: action.id,
          choiceId: action.choiceId,
          groupId: action.groupId,
          value: action.value,
          label: action.label,
          active: true,
          highlighted: false,
          customProperties: action.customProperties,
          placeholder: action.placeholder || false,
          keyCode: null
        }]);
        return newState.map(function (obj) {
          var item = obj;
          item.highlighted = false;
          return item;
        });
      }

    case 'REMOVE_ITEM':
      {
        // Set item to inactive
        return state.map(function (obj) {
          var item = obj;

          if (item.id === action.id) {
            item.active = false;
          }

          return item;
        });
      }

    case 'HIGHLIGHT_ITEM':
      {
        return state.map(function (obj) {
          var item = obj;

          if (item.id === action.id) {
            item.highlighted = action.highlighted;
          }

          return item;
        });
      }

    default:
      {
        return state;
      }
  }
}
// CONCATENATED MODULE: ./src/scripts/reducers/groups.js
var groups_defaultState = [];
function groups(state, action) {
  if (state === void 0) {
    state = groups_defaultState;
  }

  switch (action.type) {
    case 'ADD_GROUP':
      {
        return [].concat(state, [{
          id: action.id,
          value: action.value,
          active: action.active,
          disabled: action.disabled
        }]);
      }

    case 'CLEAR_CHOICES':
      {
        return [];
      }

    default:
      {
        return state;
      }
  }
}
// CONCATENATED MODULE: ./src/scripts/reducers/choices.js
var choices_defaultState = [];
function choices_choices(state, action) {
  if (state === void 0) {
    state = choices_defaultState;
  }

  switch (action.type) {
    case 'ADD_CHOICE':
      {
        /*
            A disabled choice appears in the choice dropdown but cannot be selected
            A selected choice has been added to the passed input's value (added as an item)
            An active choice appears within the choice dropdown
         */
        return [].concat(state, [{
          id: action.id,
          elementId: action.elementId,
          groupId: action.groupId,
          value: action.value,
          label: action.label || action.value,
          disabled: action.disabled || false,
          selected: false,
          active: true,
          score: 9999,
          customProperties: action.customProperties,
          placeholder: action.placeholder || false,
          keyCode: null
        }]);
      }

    case 'ADD_ITEM':
      {
        // If all choices need to be activated
        if (action.activateOptions) {
          return state.map(function (obj) {
            var choice = obj;
            choice.active = action.active;
            return choice;
          });
        } // When an item is added and it has an associated choice,
        // we want to disable it so it can't be chosen again


        if (action.choiceId > -1) {
          return state.map(function (obj) {
            var choice = obj;

            if (choice.id === parseInt(action.choiceId, 10)) {
              choice.selected = true;
            }

            return choice;
          });
        }

        return state;
      }

    case 'REMOVE_ITEM':
      {
        // When an item is removed and it has an associated choice,
        // we want to re-enable it so it can be chosen again
        if (action.choiceId > -1) {
          return state.map(function (obj) {
            var choice = obj;

            if (choice.id === parseInt(action.choiceId, 10)) {
              choice.selected = false;
            }

            return choice;
          });
        }

        return state;
      }

    case 'FILTER_CHOICES':
      {
        return state.map(function (obj) {
          var choice = obj; // Set active state based on whether choice is
          // within filtered results

          choice.active = action.results.some(function (_ref) {
            var item = _ref.item,
                score = _ref.score;

            if (item.id === choice.id) {
              choice.score = score;
              return true;
            }

            return false;
          });
          return choice;
        });
      }

    case 'ACTIVATE_CHOICES':
      {
        return state.map(function (obj) {
          var choice = obj;
          choice.active = action.active;
          return choice;
        });
      }

    case 'CLEAR_CHOICES':
      {
        return choices_defaultState;
      }

    default:
      {
        return state;
      }
  }
}
// CONCATENATED MODULE: ./src/scripts/reducers/general.js
var general_defaultState = {
  loading: false
};

var general = function general(state, action) {
  if (state === void 0) {
    state = general_defaultState;
  }

  switch (action.type) {
    case 'SET_IS_LOADING':
      {
        return {
          loading: action.isLoading
        };
      }

    default:
      {
        return state;
      }
  }
};

/* harmony default export */ var reducers_general = (general);
// CONCATENATED MODULE: ./src/scripts/lib/utils.js
/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
/**
 * @param {number} length
 * @returns {string}
 */

var generateChars = function generateChars(length) {
  return Array.from({
    length: length
  }, function () {
    return getRandomNumber(0, 36).toString(36);
  }).join('');
};
/**
 * @param {HTMLInputElement | HTMLSelectElement} element
 * @param {string} prefix
 * @returns {string}
 */

var generateId = function generateId(element, prefix) {
  var id = element.id || element.name && element.name + "-" + generateChars(2) || generateChars(4);
  id = id.replace(/(:|\.|\[|\]|,)/g, '');
  id = prefix + "-" + id;
  return id;
};
/**
 * @param {any} obj
 * @returns {string}
 */

var getType = function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
/**
 * @param {string} type
 * @param {any} obj
 * @returns {boolean}
 */

var isType = function isType(type, obj) {
  return obj !== undefined && obj !== null && getType(obj) === type;
};
/**
 * @param {HTMLElement} element
 * @param {HTMLElement} [wrapper={HTMLDivElement}]
 * @returns {HTMLElement}
 */

var utils_wrap = function wrap(element, wrapper) {
  if (wrapper === void 0) {
    wrapper = document.createElement('div');
  }

  if (element.nextSibling) {
    element.parentNode.insertBefore(wrapper, element.nextSibling);
  } else {
    element.parentNode.appendChild(wrapper);
  }

  return wrapper.appendChild(element);
};
/**
 * @param {Element} startEl
 * @param {string} selector
 * @param {1 | -1} direction
 * @returns {Element | undefined}
 */

var getAdjacentEl = function getAdjacentEl(startEl, selector, direction) {
  if (direction === void 0) {
    direction = 1;
  }

  if (!(startEl instanceof Element) || typeof selector !== 'string') {
    return undefined;
  }

  var prop = (direction > 0 ? 'next' : 'previous') + "ElementSibling";
  var sibling = startEl[prop];

  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }

    sibling = sibling[prop];
  }

  return sibling;
};
/**
 * @param {Element} element
 * @param {Element} parent
 * @param {-1 | 1} direction
 * @returns {boolean}
 */

var isScrolledIntoView = function isScrolledIntoView(element, parent, direction) {
  if (direction === void 0) {
    direction = 1;
  }

  if (!element) {
    return false;
  }

  var isVisible;

  if (direction > 0) {
    // In view from bottom
    isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
  } else {
    // In view from top
    isVisible = element.offsetTop >= parent.scrollTop;
  }

  return isVisible;
};
/**
 * @param {any} value
 * @returns {any}
 */

var sanitise = function sanitise(value) {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(/&/g, '&amp;').replace(/>/g, '&rt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};
/**
 * @returns {() => (str: string) => Element}
 */

var strToEl = function () {
  var tmpEl = document.createElement('div');
  return function (str) {
    var cleanedInput = str.trim();
    tmpEl.innerHTML = cleanedInput;
    var firldChild = tmpEl.children[0];

    while (tmpEl.firstChild) {
      tmpEl.removeChild(tmpEl.firstChild);
    }

    return firldChild;
  };
}();
/**
 * @param {{ label?: string, value: string }} a
 * @param {{ label?: string, value: string }} b
 * @returns {number}
 */

var sortByAlpha = function sortByAlpha(_ref, _ref2) {
  var value = _ref.value,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? value : _ref$label;
  var value2 = _ref2.value,
      _ref2$label = _ref2.label,
      label2 = _ref2$label === void 0 ? value2 : _ref2$label;
  return label.localeCompare(label2, [], {
    sensitivity: 'base',
    ignorePunctuation: true,
    numeric: true
  });
};
/**
 * @param {{ score: number }} a
 * @param {{ score: number }} b
 */

var sortByScore = function sortByScore(a, b) {
  return a.score - b.score;
};
/**
 * @param {HTMLElement} element
 * @param {string} type
 * @param {object} customArgs
 */

var dispatchEvent = function dispatchEvent(element, type, customArgs) {
  if (customArgs === void 0) {
    customArgs = null;
  }

  var event = new CustomEvent(type, {
    detail: customArgs,
    bubbles: true,
    cancelable: true
  });
  return element.dispatchEvent(event);
};
/**
 * @param {array} array
 * @param {any} value
 * @param {string} [key="value"]
 * @returns {boolean}
 */

var existsInArray = function existsInArray(array, value, key) {
  if (key === void 0) {
    key = 'value';
  }

  return array.some(function (item) {
    if (typeof value === 'string') {
      return item[key] === value.trim();
    }

    return item[key] === value;
  });
};
/**
 * @param {any} obj
 * @returns {any}
 */

var cloneObject = function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
};
/**
 * Returns an array of keys present on the first but missing on the second object
 * @param {object} a
 * @param {object} b
 * @returns {string[]}
 */

var diff = function diff(a, b) {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return aKeys.filter(function (i) {
    return bKeys.indexOf(i) < 0;
  });
};
// CONCATENATED MODULE: ./src/scripts/reducers/index.js






var appReducer = combineReducers({
  items: items_items,
  groups: groups,
  choices: choices_choices,
  general: reducers_general
});

var reducers_rootReducer = function rootReducer(passedState, action) {
  var state = passedState; // If we are clearing all items, groups and options we reassign
  // state and then pass that state to our proper reducer. This isn't
  // mutating our actual state
  // See: http://stackoverflow.com/a/35641992

  if (action.type === 'CLEAR_ALL') {
    state = undefined;
  } else if (action.type === 'RESET_TO') {
    return cloneObject(action.state);
  }

  return appReducer(state, action);
};

/* harmony default export */ var reducers = (reducers_rootReducer);
// CONCATENATED MODULE: ./src/scripts/store/store.js
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * @typedef {import('../../../types/index').Choices.Choice} Choice
 * @typedef {import('../../../types/index').Choices.Group} Group
 * @typedef {import('../../../types/index').Choices.Item} Item
 */

var store_Store =
/*#__PURE__*/
function () {
  function Store() {
    this._store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  /**
   * Subscribe store to function call (wrapped Redux method)
   * @param  {Function} onChange Function to trigger when state changes
   * @return
   */


  var _proto = Store.prototype;

  _proto.subscribe = function subscribe(onChange) {
    this._store.subscribe(onChange);
  }
  /**
   * Dispatch event to store (wrapped Redux method)
   * @param  {{ type: string, [x: string]: any }} action Action to trigger
   * @return
   */
  ;

  _proto.dispatch = function dispatch(action) {
    this._store.dispatch(action);
  }
  /**
   * Get store object (wrapping Redux method)
   * @returns {object} State
   */
  ;

  /**
   * Get loading state from store
   * @returns {boolean} Loading State
   */
  _proto.isLoading = function isLoading() {
    return this.state.general.loading;
  }
  /**
   * Get single choice by it's ID
   * @param {string} id
   * @returns {Choice | undefined} Found choice
   */
  ;

  _proto.getChoiceById = function getChoiceById(id) {
    return this.activeChoices.find(function (choice) {
      return choice.id === parseInt(id, 10);
    });
  }
  /**
   * Get group by group id
   * @param  {number} id Group ID
   * @returns {Group | undefined} Group data
   */
  ;

  _proto.getGroupById = function getGroupById(id) {
    return this.groups.find(function (group) {
      return group.id === id;
    });
  };

  _createClass(Store, [{
    key: "state",
    get: function get() {
      return this._store.getState();
    }
    /**
     * Get items from store
     * @returns {Item[]} Item objects
     */

  }, {
    key: "items",
    get: function get() {
      return this.state.items;
    }
    /**
     * Get active items from store
     * @returns {Item[]} Item objects
     */

  }, {
    key: "activeItems",
    get: function get() {
      return this.items.filter(function (item) {
        return item.active === true;
      });
    }
    /**
     * Get highlighted items from store
     * @returns {Item[]} Item objects
     */

  }, {
    key: "highlightedActiveItems",
    get: function get() {
      return this.items.filter(function (item) {
        return item.active && item.highlighted;
      });
    }
    /**
     * Get choices from store
     * @returns {Choice[]} Option objects
     */

  }, {
    key: "choices",
    get: function get() {
      return this.state.choices;
    }
    /**
     * Get active choices from store
     * @returns {Choice[]} Option objects
     */

  }, {
    key: "activeChoices",
    get: function get() {
      return this.choices.filter(function (choice) {
        return choice.active === true;
      });
    }
    /**
     * Get selectable choices from store
     * @returns {Choice[]} Option objects
     */

  }, {
    key: "selectableChoices",
    get: function get() {
      return this.choices.filter(function (choice) {
        return choice.disabled !== true;
      });
    }
    /**
     * Get choices that can be searched (excluding placeholders)
     * @returns {Choice[]} Option objects
     */

  }, {
    key: "searchableChoices",
    get: function get() {
      return this.selectableChoices.filter(function (choice) {
        return choice.placeholder !== true;
      });
    }
    /**
     * Get placeholder choice from store
     * @returns {Choice | undefined} Found placeholder
     */

  }, {
    key: "placeholderChoice",
    get: function get() {
      return [].concat(this.choices).reverse().find(function (choice) {
        return choice.placeholder === true;
      });
    }
    /**
     * Get groups from store
     * @returns {Group[]} Group objects
     */

  }, {
    key: "groups",
    get: function get() {
      return this.state.groups;
    }
    /**
     * Get active groups from store
     * @returns {Group[]} Group objects
     */

  }, {
    key: "activeGroups",
    get: function get() {
      var groups = this.groups,
          choices = this.choices;
      return groups.filter(function (group) {
        var isActive = group.active === true && group.disabled === false;
        var hasActiveOptions = choices.some(function (choice) {
          return choice.active === true && choice.disabled === false;
        });
        return isActive && hasActiveOptions;
      }, []);
    }
  }]);

  return Store;
}();


// CONCATENATED MODULE: ./src/scripts/components/dropdown.js
function dropdown_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dropdown_createClass(Constructor, protoProps, staticProps) { if (protoProps) dropdown_defineProperties(Constructor.prototype, protoProps); if (staticProps) dropdown_defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {import('../../../types/index').Choices.passedElement} passedElement
 * @typedef {import('../../../types/index').Choices.ClassNames} ClassNames
 */
var Dropdown =
/*#__PURE__*/
function () {
  /**
   * @param {{
   *  element: HTMLElement,
   *  type: passedElement['type'],
   *  classNames: ClassNames,
   * }} args
   */
  function Dropdown(_ref) {
    var element = _ref.element,
        type = _ref.type,
        classNames = _ref.classNames;
    this.element = element;
    this.classNames = classNames;
    this.type = type;
    this.isActive = false;
  }
  /**
   * Bottom position of dropdown in viewport coordinates
   * @returns {number} Vertical position
   */


  var _proto = Dropdown.prototype;

  /**
   * Find element that matches passed selector
   * @param {string} selector
   * @returns {HTMLElement | null}
   */
  _proto.getChild = function getChild(selector) {
    return this.element.querySelector(selector);
  }
  /**
   * Show dropdown to user by adding active state class
   * @returns {this}
   */
  ;

  _proto.show = function show() {
    this.element.classList.add(this.classNames.activeState);
    this.element.setAttribute('aria-expanded', 'true');
    this.isActive = true;
    return this;
  }
  /**
   * Hide dropdown from user
   * @returns {this}
   */
  ;

  _proto.hide = function hide() {
    this.element.classList.remove(this.classNames.activeState);
    this.element.setAttribute('aria-expanded', 'false');
    this.isActive = false;
    return this;
  };

  dropdown_createClass(Dropdown, [{
    key: "distanceFromTopWindow",
    get: function get() {
      return this.element.getBoundingClientRect().bottom;
    }
  }]);

  return Dropdown;
}();


// CONCATENATED MODULE: ./src/scripts/constants.js

/**
 * @typedef {import('../../types/index').Choices.ClassNames} ClassNames
 * @typedef {import('../../types/index').Choices.Options} Options
 */

/** @type {ClassNames} */

var DEFAULT_CLASSNAMES = {
  containerOuter: 'choices',
  containerInner: 'choices__inner',
  input: 'choices__input',
  inputCloned: 'choices__input--cloned',
  list: 'choices__list',
  listItems: 'choices__list--multiple',
  listSingle: 'choices__list--single',
  listDropdown: 'choices__list--dropdown',
  item: 'choices__item',
  itemSelectable: 'choices__item--selectable',
  itemDisabled: 'choices__item--disabled',
  itemChoice: 'choices__item--choice',
  placeholder: 'choices__placeholder',
  group: 'choices__group',
  groupHeading: 'choices__heading',
  button: 'choices__button',
  activeState: 'is-active',
  focusState: 'is-focused',
  openState: 'is-open',
  disabledState: 'is-disabled',
  highlightedState: 'is-highlighted',
  selectedState: 'is-selected',
  flippedState: 'is-flipped',
  loadingState: 'is-loading',
  noResults: 'has-no-results',
  noChoices: 'has-no-choices'
};
/** @type {Options} */

var DEFAULT_CONFIG = {
  items: [],
  choices: [],
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  addItems: true,
  addItemFilter: null,
  removeItems: true,
  removeItemButton: false,
  editItems: false,
  duplicateItemsAllowed: true,
  delimiter: ',',
  paste: true,
  searchEnabled: true,
  searchChoices: true,
  searchFloor: 1,
  searchResultLimit: 4,
  searchFields: ['label', 'value'],
  position: 'auto',
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  sorter: sortByAlpha,
  placeholder: true,
  placeholderValue: null,
  searchPlaceholderValue: null,
  prependValue: null,
  appendValue: null,
  renderSelectedChoices: 'auto',
  loadingText: 'Loading...',
  noResultsText: 'No results found',
  noChoicesText: 'No choices to choose from',
  itemSelectText: 'Press to select',
  uniqueItemText: 'Only unique values can be added',
  customAddItemText: 'Only values matching specific conditions can be added',
  addItemText: function addItemText(value) {
    return "Press Enter to add <b>\"" + sanitise(value) + "\"</b>";
  },
  maxItemText: function maxItemText(maxItemCount) {
    return "Only " + maxItemCount + " values can be added";
  },
  valueComparer: function valueComparer(value1, value2) {
    return value1 === value2;
  },
  fuseOptions: {
    includeScore: true
  },
  callbackOnInit: null,
  callbackOnCreateTemplates: null,
  classNames: DEFAULT_CLASSNAMES
};
var EVENTS = {
  showDropdown: 'showDropdown',
  hideDropdown: 'hideDropdown',
  change: 'change',
  choice: 'choice',
  search: 'search',
  addItem: 'addItem',
  removeItem: 'removeItem',
  highlightItem: 'highlightItem',
  highlightChoice: 'highlightChoice'
};
var ACTION_TYPES = {
  ADD_CHOICE: 'ADD_CHOICE',
  FILTER_CHOICES: 'FILTER_CHOICES',
  ACTIVATE_CHOICES: 'ACTIVATE_CHOICES',
  CLEAR_CHOICES: 'CLEAR_CHOICES',
  ADD_GROUP: 'ADD_GROUP',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  HIGHLIGHT_ITEM: 'HIGHLIGHT_ITEM',
  CLEAR_ALL: 'CLEAR_ALL'
};
var KEY_CODES = {
  BACK_KEY: 46,
  DELETE_KEY: 8,
  ENTER_KEY: 13,
  A_KEY: 65,
  ESC_KEY: 27,
  UP_KEY: 38,
  DOWN_KEY: 40,
  PAGE_UP_KEY: 33,
  PAGE_DOWN_KEY: 34
};
var TEXT_TYPE = 'text';
var SELECT_ONE_TYPE = 'select-one';
var SELECT_MULTIPLE_TYPE = 'select-multiple';
var SCROLLING_SPEED = 4;
// CONCATENATED MODULE: ./src/scripts/components/container.js


/**
 * @typedef {import('../../../types/index').Choices.passedElement} passedElement
 * @typedef {import('../../../types/index').Choices.ClassNames} ClassNames
 */

var container_Container =
/*#__PURE__*/
function () {
  /**
   * @param {{
   *  element: HTMLElement,
   *  type: passedElement['type'],
   *  classNames: ClassNames,
   *  position
   * }} args
   */
  function Container(_ref) {
    var element = _ref.element,
        type = _ref.type,
        classNames = _ref.classNames,
        position = _ref.position;
    this.element = element;
    this.classNames = classNames;
    this.type = type;
    this.position = position;
    this.isOpen = false;
    this.isFlipped = false;
    this.isFocussed = false;
    this.isDisabled = false;
    this.isLoading = false;
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  var _proto = Container.prototype;

  _proto.addEventListeners = function addEventListeners() {
    this.element.addEventListener('focus', this._onFocus);
    this.element.addEventListener('blur', this._onBlur);
  };

  _proto.removeEventListeners = function removeEventListeners() {
    this.element.removeEventListener('focus', this._onFocus);
    this.element.removeEventListener('blur', this._onBlur);
  }
  /**
   * Determine whether container should be flipped based on passed
   * dropdown position
   * @param {number} dropdownPos
   * @returns {boolean}
   */
  ;

  _proto.shouldFlip = function shouldFlip(dropdownPos) {
    if (typeof dropdownPos !== 'number') {
      return false;
    } // If flip is enabled and the dropdown bottom position is
    // greater than the window height flip the dropdown.


    var shouldFlip = false;

    if (this.position === 'auto') {
      shouldFlip = !window.matchMedia("(min-height: " + (dropdownPos + 1) + "px)").matches;
    } else if (this.position === 'top') {
      shouldFlip = true;
    }

    return shouldFlip;
  }
  /**
   * @param {string} activeDescendantID
   */
  ;

  _proto.setActiveDescendant = function setActiveDescendant(activeDescendantID) {
    this.element.setAttribute('aria-activedescendant', activeDescendantID);
  };

  _proto.removeActiveDescendant = function removeActiveDescendant() {
    this.element.removeAttribute('aria-activedescendant');
  }
  /**
   * @param {number} dropdownPos
   */
  ;

  _proto.open = function open(dropdownPos) {
    this.element.classList.add(this.classNames.openState);
    this.element.setAttribute('aria-expanded', 'true');
    this.isOpen = true;

    if (this.shouldFlip(dropdownPos)) {
      this.element.classList.add(this.classNames.flippedState);
      this.isFlipped = true;
    }
  };

  _proto.close = function close() {
    this.element.classList.remove(this.classNames.openState);
    this.element.setAttribute('aria-expanded', 'false');
    this.removeActiveDescendant();
    this.isOpen = false; // A dropdown flips if it does not have space within the page

    if (this.isFlipped) {
      this.element.classList.remove(this.classNames.flippedState);
      this.isFlipped = false;
    }
  };

  _proto.focus = function focus() {
    if (!this.isFocussed) {
      this.element.focus();
    }
  };

  _proto.addFocusState = function addFocusState() {
    this.element.classList.add(this.classNames.focusState);
  };

  _proto.removeFocusState = function removeFocusState() {
    this.element.classList.remove(this.classNames.focusState);
  };

  _proto.enable = function enable() {
    this.element.classList.remove(this.classNames.disabledState);
    this.element.removeAttribute('aria-disabled');

    if (this.type === SELECT_ONE_TYPE) {
      this.element.setAttribute('tabindex', '0');
    }

    this.isDisabled = false;
  };

  _proto.disable = function disable() {
    this.element.classList.add(this.classNames.disabledState);
    this.element.setAttribute('aria-disabled', 'true');

    if (this.type === SELECT_ONE_TYPE) {
      this.element.setAttribute('tabindex', '-1');
    }

    this.isDisabled = true;
  }
  /**
   * @param {HTMLElement} element
   */
  ;

  _proto.wrap = function wrap(element) {
    utils_wrap(element, this.element);
  }
  /**
   * @param {Element} element
   */
  ;

  _proto.unwrap = function unwrap(element) {
    // Move passed element outside this element
    this.element.parentNode.insertBefore(element, this.element); // Remove this element

    this.element.parentNode.removeChild(this.element);
  };

  _proto.addLoadingState = function addLoadingState() {
    this.element.classList.add(this.classNames.loadingState);
    this.element.setAttribute('aria-busy', 'true');
    this.isLoading = true;
  };

  _proto.removeLoadingState = function removeLoadingState() {
    this.element.classList.remove(this.classNames.loadingState);
    this.element.removeAttribute('aria-busy');
    this.isLoading = false;
  };

  _proto._onFocus = function _onFocus() {
    this.isFocussed = true;
  };

  _proto._onBlur = function _onBlur() {
    this.isFocussed = false;
  };

  return Container;
}();


// CONCATENATED MODULE: ./src/scripts/components/input.js
function input_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function input_createClass(Constructor, protoProps, staticProps) { if (protoProps) input_defineProperties(Constructor.prototype, protoProps); if (staticProps) input_defineProperties(Constructor, staticProps); return Constructor; }



/**
 * @typedef {import('../../../types/index').Choices.passedElement} passedElement
 * @typedef {import('../../../types/index').Choices.ClassNames} ClassNames
 */

var input_Input =
/*#__PURE__*/
function () {
  /**
   * @param {{
   *  element: HTMLInputElement,
   *  type: passedElement['type'],
   *  classNames: ClassNames,
   *  preventPaste: boolean
   * }} args
   */
  function Input(_ref) {
    var element = _ref.element,
        type = _ref.type,
        classNames = _ref.classNames,
        preventPaste = _ref.preventPaste;
    this.element = element;
    this.type = type;
    this.classNames = classNames;
    this.preventPaste = preventPaste;
    this.isFocussed = this.element === document.activeElement;
    this.isDisabled = element.disabled;
    this._onPaste = this._onPaste.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }
  /**
   * @param {string} placeholder
   */


  var _proto = Input.prototype;

  _proto.addEventListeners = function addEventListeners() {
    this.element.addEventListener('paste', this._onPaste);
    this.element.addEventListener('input', this._onInput, {
      passive: true
    });
    this.element.addEventListener('focus', this._onFocus, {
      passive: true
    });
    this.element.addEventListener('blur', this._onBlur, {
      passive: true
    });
  };

  _proto.removeEventListeners = function removeEventListeners() {
    this.element.removeEventListener('input', this._onInput, {
      passive: true
    });
    this.element.removeEventListener('paste', this._onPaste);
    this.element.removeEventListener('focus', this._onFocus, {
      passive: true
    });
    this.element.removeEventListener('blur', this._onBlur, {
      passive: true
    });
  };

  _proto.enable = function enable() {
    this.element.removeAttribute('disabled');
    this.isDisabled = false;
  };

  _proto.disable = function disable() {
    this.element.setAttribute('disabled', '');
    this.isDisabled = true;
  };

  _proto.focus = function focus() {
    if (!this.isFocussed) {
      this.element.focus();
    }
  };

  _proto.blur = function blur() {
    if (this.isFocussed) {
      this.element.blur();
    }
  }
  /**
   * Set value of input to blank
   * @param {boolean} setWidth
   * @returns {this}
   */
  ;

  _proto.clear = function clear(setWidth) {
    if (setWidth === void 0) {
      setWidth = true;
    }

    if (this.element.value) {
      this.element.value = '';
    }

    if (setWidth) {
      this.setWidth();
    }

    return this;
  }
  /**
   * Set the correct input width based on placeholder
   * value or input value
   */
  ;

  _proto.setWidth = function setWidth() {
    // Resize input to contents or placeholder
    var _this$element = this.element,
        style = _this$element.style,
        value = _this$element.value,
        placeholder = _this$element.placeholder;
    style.minWidth = placeholder.length + 1 + "ch";
    style.width = value.length + 1 + "ch";
  }
  /**
   * @param {string} activeDescendantID
   */
  ;

  _proto.setActiveDescendant = function setActiveDescendant(activeDescendantID) {
    this.element.setAttribute('aria-activedescendant', activeDescendantID);
  };

  _proto.removeActiveDescendant = function removeActiveDescendant() {
    this.element.removeAttribute('aria-activedescendant');
  };

  _proto._onInput = function _onInput() {
    if (this.type !== SELECT_ONE_TYPE) {
      this.setWidth();
    }
  }
  /**
   * @param {Event} event
   */
  ;

  _proto._onPaste = function _onPaste(event) {
    if (this.preventPaste) {
      event.preventDefault();
    }
  };

  _proto._onFocus = function _onFocus() {
    this.isFocussed = true;
  };

  _proto._onBlur = function _onBlur() {
    this.isFocussed = false;
  };

  input_createClass(Input, [{
    key: "placeholder",
    set: function set(placeholder) {
      this.element.placeholder = placeholder;
    }
    /**
     * @returns {string}
     */

  }, {
    key: "value",
    get: function get() {
      return sanitise(this.element.value);
    }
    /**
     * @param {string} value
     */
    ,
    set: function set(value) {
      this.element.value = value;
    }
  }]);

  return Input;
}();


// CONCATENATED MODULE: ./src/scripts/components/list.js

/**
 * @typedef {import('../../../types/index').Choices.Choice} Choice
 */

var list_List =
/*#__PURE__*/
function () {
  /**
   * @param {{ element: HTMLElement }} args
   */
  function List(_ref) {
    var element = _ref.element;
    this.element = element;
    this.scrollPos = this.element.scrollTop;
    this.height = this.element.offsetHeight;
  }

  var _proto = List.prototype;

  _proto.clear = function clear() {
    this.element.innerHTML = '';
  }
  /**
   * @param {Element | DocumentFragment} node
   */
  ;

  _proto.append = function append(node) {
    this.element.appendChild(node);
  }
  /**
   * @param {string} selector
   * @returns {Element | null}
   */
  ;

  _proto.getChild = function getChild(selector) {
    return this.element.querySelector(selector);
  }
  /**
   * @returns {boolean}
   */
  ;

  _proto.hasChildren = function hasChildren() {
    return this.element.hasChildNodes();
  };

  _proto.scrollToTop = function scrollToTop() {
    this.element.scrollTop = 0;
  }
  /**
   * @param {Element} element
   * @param {1 | -1} direction
   */
  ;

  _proto.scrollToChildElement = function scrollToChildElement(element, direction) {
    var _this = this;

    if (!element) {
      return;
    }

    var listHeight = this.element.offsetHeight; // Scroll position of dropdown

    var listScrollPosition = this.element.scrollTop + listHeight;
    var elementHeight = element.offsetHeight; // Distance from bottom of element to top of parent

    var elementPos = element.offsetTop + elementHeight; // Difference between the element and scroll position

    var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
    requestAnimationFrame(function () {
      _this._animateScroll(destination, direction);
    });
  }
  /**
   * @param {number} scrollPos
   * @param {number} strength
   * @param {number} destination
   */
  ;

  _proto._scrollDown = function _scrollDown(scrollPos, strength, destination) {
    var easing = (destination - scrollPos) / strength;
    var distance = easing > 1 ? easing : 1;
    this.element.scrollTop = scrollPos + distance;
  }
  /**
   * @param {number} scrollPos
   * @param {number} strength
   * @param {number} destination
   */
  ;

  _proto._scrollUp = function _scrollUp(scrollPos, strength, destination) {
    var easing = (scrollPos - destination) / strength;
    var distance = easing > 1 ? easing : 1;
    this.element.scrollTop = scrollPos - distance;
  }
  /**
   * @param {*} destination
   * @param {*} direction
   */
  ;

  _proto._animateScroll = function _animateScroll(destination, direction) {
    var _this2 = this;

    var strength = SCROLLING_SPEED;
    var choiceListScrollTop = this.element.scrollTop;
    var continueAnimation = false;

    if (direction > 0) {
      this._scrollDown(choiceListScrollTop, strength, destination);

      if (choiceListScrollTop < destination) {
        continueAnimation = true;
      }
    } else {
      this._scrollUp(choiceListScrollTop, strength, destination);

      if (choiceListScrollTop > destination) {
        continueAnimation = true;
      }
    }

    if (continueAnimation) {
      requestAnimationFrame(function () {
        _this2._animateScroll(destination, direction);
      });
    }
  };

  return List;
}();


// CONCATENATED MODULE: ./src/scripts/components/wrapped-element.js
function wrapped_element_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function wrapped_element_createClass(Constructor, protoProps, staticProps) { if (protoProps) wrapped_element_defineProperties(Constructor.prototype, protoProps); if (staticProps) wrapped_element_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * @typedef {import('../../../types/index').Choices.passedElement} passedElement
 * @typedef {import('../../../types/index').Choices.ClassNames} ClassNames
 */

var wrapped_element_WrappedElement =
/*#__PURE__*/
function () {
  /**
   * @param {{
   *  element: HTMLInputElement | HTMLSelectElement,
   *  classNames: ClassNames,
   * }} args
   */
  function WrappedElement(_ref) {
    var element = _ref.element,
        classNames = _ref.classNames;
    this.element = element;
    this.classNames = classNames;

    if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
      throw new TypeError('Invalid element passed');
    }

    this.isDisabled = false;
  }

  var _proto = WrappedElement.prototype;

  _proto.conceal = function conceal() {
    // Hide passed input
    this.element.classList.add(this.classNames.input);
    this.element.hidden = true; // Remove element from tab index

    this.element.tabIndex = -1; // Backup original styles if any

    var origStyle = this.element.getAttribute('style');

    if (origStyle) {
      this.element.setAttribute('data-choice-orig-style', origStyle);
    }

    this.element.setAttribute('data-choice', 'active');
  };

  _proto.reveal = function reveal() {
    // Reinstate passed element
    this.element.classList.remove(this.classNames.input);
    this.element.hidden = false;
    this.element.removeAttribute('tabindex'); // Recover original styles if any

    var origStyle = this.element.getAttribute('data-choice-orig-style');

    if (origStyle) {
      this.element.removeAttribute('data-choice-orig-style');
      this.element.setAttribute('style', origStyle);
    } else {
      this.element.removeAttribute('style');
    }

    this.element.removeAttribute('data-choice'); // Re-assign values - this is weird, I know
    // @todo Figure out why we need to do this

    this.element.value = this.element.value; // eslint-disable-line no-self-assign
  };

  _proto.enable = function enable() {
    this.element.removeAttribute('disabled');
    this.element.disabled = false;
    this.isDisabled = false;
  };

  _proto.disable = function disable() {
    this.element.setAttribute('disabled', '');
    this.element.disabled = true;
    this.isDisabled = true;
  };

  _proto.triggerEvent = function triggerEvent(eventType, data) {
    dispatchEvent(this.element, eventType, data);
  };

  wrapped_element_createClass(WrappedElement, [{
    key: "isActive",
    get: function get() {
      return this.element.dataset.choice === 'active';
    }
  }, {
    key: "dir",
    get: function get() {
      return this.element.dir;
    }
  }, {
    key: "value",
    get: function get() {
      return this.element.value;
    },
    set: function set(value) {
      // you must define setter here otherwise it will be readonly property
      this.element.value = value;
    }
  }]);

  return WrappedElement;
}();


// CONCATENATED MODULE: ./src/scripts/components/wrapped-input.js
function wrapped_input_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function wrapped_input_createClass(Constructor, protoProps, staticProps) { if (protoProps) wrapped_input_defineProperties(Constructor.prototype, protoProps); if (staticProps) wrapped_input_defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }


/**
 * @typedef {import('../../../types/index').Choices.ClassNames} ClassNames
 * @typedef {import('../../../types/index').Choices.Item} Item
 */

var WrappedInput =
/*#__PURE__*/
function (_WrappedElement) {
  _inheritsLoose(WrappedInput, _WrappedElement);

  /**
   * @param {{
   *  element: HTMLInputElement,
   *  classNames: ClassNames,
   *  delimiter: string
   * }} args
   */
  function WrappedInput(_ref) {
    var _this;

    var element = _ref.element,
        classNames = _ref.classNames,
        delimiter = _ref.delimiter;
    _this = _WrappedElement.call(this, {
      element: element,
      classNames: classNames
    }) || this;
    _this.delimiter = delimiter;
    return _this;
  }
  /**
   * @returns {string}
   */


  wrapped_input_createClass(WrappedInput, [{
    key: "value",
    get: function get() {
      return this.element.value;
    }
    /**
     * @param {Item[]} items
     */
    ,
    set: function set(items) {
      var itemValues = items.map(function (_ref2) {
        var value = _ref2.value;
        return value;
      });
      var joinedValues = itemValues.join(this.delimiter);
      this.element.setAttribute('value', joinedValues);
      this.element.value = joinedValues;
    }
  }]);

  return WrappedInput;
}(wrapped_element_WrappedElement);


// CONCATENATED MODULE: ./src/scripts/components/wrapped-select.js
function wrapped_select_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function wrapped_select_createClass(Constructor, protoProps, staticProps) { if (protoProps) wrapped_select_defineProperties(Constructor.prototype, protoProps); if (staticProps) wrapped_select_defineProperties(Constructor, staticProps); return Constructor; }

function wrapped_select_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }


/**
 * @typedef {import('../../../types/index').Choices.ClassNames} ClassNames
 * @typedef {import('../../../types/index').Choices.Item} Item
 * @typedef {import('../../../types/index').Choices.Choice} Choice
 */

var WrappedSelect =
/*#__PURE__*/
function (_WrappedElement) {
  wrapped_select_inheritsLoose(WrappedSelect, _WrappedElement);

  /**
   * @param {{
   *  element: HTMLSelectElement,
   *  classNames: ClassNames,
   *  delimiter: string
   *  template: function
   * }} args
   */
  function WrappedSelect(_ref) {
    var _this;

    var element = _ref.element,
        classNames = _ref.classNames,
        template = _ref.template;
    _this = _WrappedElement.call(this, {
      element: element,
      classNames: classNames
    }) || this;
    _this.template = template;
    return _this;
  }

  var _proto = WrappedSelect.prototype;

  /**
   * @param {DocumentFragment} fragment
   */
  _proto.appendDocFragment = function appendDocFragment(fragment) {
    this.element.innerHTML = '';
    this.element.appendChild(fragment);
  };

  wrapped_select_createClass(WrappedSelect, [{
    key: "placeholderOption",
    get: function get() {
      return this.element.querySelector('option[value=""]') || // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
      this.element.querySelector('option[placeholder]');
    }
    /**
     * @returns {Element[]}
     */

  }, {
    key: "optionGroups",
    get: function get() {
      return Array.from(this.element.getElementsByTagName('OPTGROUP'));
    }
    /**
     * @returns {Item[] | Choice[]}
     */

  }, {
    key: "options",
    get: function get() {
      return Array.from(this.element.options);
    }
    /**
     * @param {Item[] | Choice[]} options
     */
    ,
    set: function set(options) {
      var _this2 = this;

      var fragment = document.createDocumentFragment();

      var addOptionToFragment = function addOptionToFragment(data) {
        // Create a standard select option
        var option = _this2.template(data); // Append it to fragment


        fragment.appendChild(option);
      }; // Add each list item to list


      options.forEach(function (optionData) {
        return addOptionToFragment(optionData);
      });
      this.appendDocFragment(fragment);
    }
  }]);

  return WrappedSelect;
}(wrapped_element_WrappedElement);


// CONCATENATED MODULE: ./src/scripts/components/index.js







// CONCATENATED MODULE: ./src/scripts/templates.js
/**
 * Helpers to create HTML elements used by Choices
 * Can be overridden by providing `callbackOnCreateTemplates` option
 * @typedef {import('../../types/index').Choices.Templates} Templates
 * @typedef {import('../../types/index').Choices.ClassNames} ClassNames
 * @typedef {import('../../types/index').Choices.Options} Options
 * @typedef {import('../../types/index').Choices.Item} Item
 * @typedef {import('../../types/index').Choices.Choice} Choice
 * @typedef {import('../../types/index').Choices.Group} Group
 */
var TEMPLATES =
/** @type {Templates} */
{
  /**
   * @param {Partial<ClassNames>} classNames
   * @param {"ltr" | "rtl" | "auto"} dir
   * @param {boolean} isSelectElement
   * @param {boolean} isSelectOneElement
   * @param {boolean} searchEnabled
   * @param {"select-one" | "select-multiple" | "text"} passedElementType
   */
  containerOuter: function containerOuter(_ref, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType) {
    var _containerOuter = _ref.containerOuter;
    var div = Object.assign(document.createElement('div'), {
      className: _containerOuter
    });
    div.dataset.type = passedElementType;

    if (dir) {
      div.dir = dir;
    }

    if (isSelectOneElement) {
      div.tabIndex = 0;
    }

    if (isSelectElement) {
      div.setAttribute('role', searchEnabled ? 'combobox' : 'listbox');

      if (searchEnabled) {
        div.setAttribute('aria-autocomplete', 'list');
      }
    }

    div.setAttribute('aria-haspopup', 'true');
    div.setAttribute('aria-expanded', 'false');
    return div;
  },

  /**
   * @param {Partial<ClassNames>} classNames
   */
  containerInner: function containerInner(_ref2) {
    var _containerInner = _ref2.containerInner;
    return Object.assign(document.createElement('div'), {
      className: _containerInner
    });
  },

  /**
   * @param {Partial<ClassNames>} classNames
   * @param {boolean} isSelectOneElement
   */
  itemList: function itemList(_ref3, isSelectOneElement) {
    var list = _ref3.list,
        listSingle = _ref3.listSingle,
        listItems = _ref3.listItems;
    return Object.assign(document.createElement('div'), {
      className: list + " " + (isSelectOneElement ? listSingle : listItems)
    });
  },

  /**
   * @param {Partial<ClassNames>} classNames
   * @param {string} value
   */
  placeholder: function placeholder(_ref4, value) {
    var _placeholder = _ref4.placeholder;
    return Object.assign(document.createElement('div'), {
      className: _placeholder,
      innerHTML: value
    });
  },

  /**
   * @param {Partial<ClassNames>} classNames
   * @param {Item} item
   * @param {boolean} removeItemButton
   */
  item: function item(_ref5, _ref6, removeItemButton) {
    var _item = _ref5.item,
        button = _ref5.button,
        highlightedState = _ref5.highlightedState,
        itemSelectable = _ref5.itemSelectable,
        placeholder = _ref5.placeholder;
    var id = _ref6.id,
        value = _ref6.value,
        label = _ref6.label,
        customProperties = _ref6.customProperties,
        active = _ref6.active,
        disabled = _ref6.disabled,
        highlighted = _ref6.highlighted,
        isPlaceholder = _ref6.placeholder;
    var div = Object.assign(document.createElement('div'), {
      className: _item,
      innerHTML: label
    });
    Object.assign(div.dataset, {
      item: '',
      id: id,
      value: value,
      customProperties: customProperties
    });

    if (active) {
      div.setAttribute('aria-selected', 'true');
    }

    if (disabled) {
      div.setAttribute('aria-disabled', 'true');
    }

    if (isPlaceholder) {
      div.classList.add(placeholder);
    }

    div.classList.add(highlighted ? highlightedState : itemSelectable);

    if (removeItemButton) {
      if (disabled) {
        div.classList.remove(itemSelectable);
      }

      div.dataset.deletable = '';
      /** @todo This MUST be localizable, not hardcoded! */

      var REMOVE_ITEM_TEXT = 'Remove item';
      var removeButton = Object.assign(document.createElement('button'), {
        type: 'button',
        className: button,
        innerHTML: REMOVE_ITEM_TEXT
      });
      removeButton.setAttribute('aria-label', REMOVE_ITEM_TEXT + ": '" + value + "'");
      removeButton.dataset.button = '';
      div.appendChild(removeButton);
    }

    return div;
  },

  /**
   * @param {Partial<ClassNames>} classNames
   * @param {boolean} isSelectOneElement
   */
  choiceList: function choiceList(_ref7, isSelectOneElement) {
    var list = _ref7.list;
    var div = Object.assign(document.createElement('div'), {
      className: list
    });

    if (!isSelectOneElement) {
      div.setAttribute('aria-multiselectable', 'true');
    }

    div.setAttribute('role', 'listbox');
    return div;
  },

  /**
   * @param {Partial<ClassNames>} classNames
   * @param {Group} group
   */
  choiceGroup: function choiceGroup(_ref8, _ref9) {
    var group = _ref8.group,
        groupHeading = _ref8.groupHeading,
        itemDisabled = _ref8.itemDisabled;
    var id = _ref9.id,
        value = _ref9.value,
        disabled = _ref9.disabled;
    var div = Object.assign(document.createElement('div'), {
      className: group + " " + (disabled ? itemDisabled : '')
    });
    div.setAttribute('role', 'group');
    Object.assign(div.dataset, {
      group: '',
      id: id,
      value: value
    });

    if (disabled) {
      div.setAttribute('aria-disabled', 'true');
    }

    div.appendChild(Object.assign(document.createElement('div'), {
      className: groupHeading,
      innerHTML: value
    }));
    return div;
  },

  /**
   * @param {Partial<ClassNames>} classNames
   * @param {Choice} choice
   * @param {Options['itemSelectText']} selectText
   */
  choice: function choice(_ref10, _ref11, selectText) {
    var item = _ref10.item,
        itemChoice = _ref10.itemChoice,
        itemSelectable = _ref10.itemSelectable,
        selectedState = _ref10.selectedState,
        itemDisabled = _ref10.itemDisabled,
        placeholder = _ref10.placeholder;
    var id = _ref11.id,
        value = _ref11.value,
        label = _ref11.label,
        groupId = _ref11.groupId,
        elementId = _ref11.elementId,
        isDisabled = _ref11.disabled,
        isSelected = _ref11.selected,
        isPlaceholder = _ref11.placeholder;
    var div = Object.assign(document.createElement('div'), {
      id: elementId,
      innerHTML: label,
      className: item + " " + itemChoice
    });

    if (isSelected) {
      div.classList.add(selectedState);
    }

    if (isPlaceholder) {
      div.classList.add(placeholder);
    }

    div.setAttribute('role', groupId > 0 ? 'treeitem' : 'option');
    Object.assign(div.dataset, {
      choice: '',
      id: id,
      value: value,
      selectText: selectText
    });

    if (isDisabled) {
      div.classList.add(itemDisabled);
      div.dataset.choiceDisabled = '';
      div.setAttribute('aria-disabled', 'true');
    } else {
      div.classList.add(itemSelectable);
      div.dataset.choiceSelectable = '';
    }

    return div;
  },

  /**
   * @param {Partial<ClassNames>} classNames
   * @param {string} placeholderValue
   */
  input: function input(_ref12, placeholderValue) {
    var _input = _ref12.input,
        inputCloned = _ref12.inputCloned;
    var inp = Object.assign(document.createElement('input'), {
      type: 'text',
      className: _input + " " + inputCloned,
      autocomplete: 'off',
      autocapitalize: 'off',
      spellcheck: false
    });
    inp.setAttribute('role', 'textbox');
    inp.setAttribute('aria-autocomplete', 'list');
    inp.setAttribute('aria-label', placeholderValue);
    return inp;
  },

  /**
   * @param {Partial<ClassNames>} classNames
   */
  dropdown: function dropdown(_ref13) {
    var list = _ref13.list,
        listDropdown = _ref13.listDropdown;
    var div = document.createElement('div');
    div.classList.add(list, listDropdown);
    div.setAttribute('aria-expanded', 'false');
    return div;
  },

  /**
   *
   * @param {Partial<ClassNames>} classNames
   * @param {string} innerHTML
   * @param {"no-choices" | "no-results" | ""} type
   */
  notice: function notice(_ref14, innerHTML, type) {
    var item = _ref14.item,
        itemChoice = _ref14.itemChoice,
        noResults = _ref14.noResults,
        noChoices = _ref14.noChoices;

    if (type === void 0) {
      type = '';
    }

    var classes = [item, itemChoice];

    if (type === 'no-choices') {
      classes.push(noChoices);
    } else if (type === 'no-results') {
      classes.push(noResults);
    }

    return Object.assign(document.createElement('div'), {
      innerHTML: innerHTML,
      className: classes.join(' ')
    });
  },

  /**
   * @param {Item} option
   */
  option: function option(_ref15) {
    var label = _ref15.label,
        value = _ref15.value,
        customProperties = _ref15.customProperties,
        active = _ref15.active,
        disabled = _ref15.disabled;
    var opt = new Option(label, value, false, active);

    if (customProperties) {
      opt.dataset.customProperties = customProperties;
    }

    opt.disabled = disabled;
    return opt;
  }
};
/* harmony default export */ var templates = (TEMPLATES);
// CONCATENATED MODULE: ./src/scripts/actions/choices.js
/**
 * @typedef {import('redux').Action} Action
 * @typedef {import('../../../types/index').Choices.Choice} Choice
 */

/**
 * @argument {Choice} choice
 * @returns {Action & Choice}
 */

var choices_addChoice = function addChoice(_ref) {
  var value = _ref.value,
      label = _ref.label,
      id = _ref.id,
      groupId = _ref.groupId,
      disabled = _ref.disabled,
      elementId = _ref.elementId,
      customProperties = _ref.customProperties,
      placeholder = _ref.placeholder,
      keyCode = _ref.keyCode;
  return {
    type: ACTION_TYPES.ADD_CHOICE,
    value: value,
    label: label,
    id: id,
    groupId: groupId,
    disabled: disabled,
    elementId: elementId,
    customProperties: customProperties,
    placeholder: placeholder,
    keyCode: keyCode
  };
};
/**
 * @argument {Choice[]} results
 * @returns {Action & { results: Choice[] }}
 */

var choices_filterChoices = function filterChoices(results) {
  return {
    type: ACTION_TYPES.FILTER_CHOICES,
    results: results
  };
};
/**
 * @argument {boolean} active
 * @returns {Action & { active: boolean }}
 */

var choices_activateChoices = function activateChoices(active) {
  if (active === void 0) {
    active = true;
  }

  return {
    type: ACTION_TYPES.ACTIVATE_CHOICES,
    active: active
  };
};
/**
 * @returns {Action}
 */

var choices_clearChoices = function clearChoices() {
  return {
    type: ACTION_TYPES.CLEAR_CHOICES
  };
};
// CONCATENATED MODULE: ./src/scripts/actions/items.js

/**
 * @typedef {import('redux').Action} Action
 * @typedef {import('../../../types/index').Choices.Item} Item
 */

/**
 * @param {Item} item
 * @returns {Action & Item}
 */

var items_addItem = function addItem(_ref) {
  var value = _ref.value,
      label = _ref.label,
      id = _ref.id,
      choiceId = _ref.choiceId,
      groupId = _ref.groupId,
      customProperties = _ref.customProperties,
      placeholder = _ref.placeholder,
      keyCode = _ref.keyCode;
  return {
    type: ACTION_TYPES.ADD_ITEM,
    value: value,
    label: label,
    id: id,
    choiceId: choiceId,
    groupId: groupId,
    customProperties: customProperties,
    placeholder: placeholder,
    keyCode: keyCode
  };
};
/**
 * @param {string} id
 * @param {string} choiceId
 * @returns {Action & { id: string, choiceId: string }}
 */

var items_removeItem = function removeItem(id, choiceId) {
  return {
    type: ACTION_TYPES.REMOVE_ITEM,
    id: id,
    choiceId: choiceId
  };
};
/**
 * @param {string} id
 * @param {boolean} highlighted
 * @returns {Action & { id: string, highlighted: boolean }}
 */

var items_highlightItem = function highlightItem(id, highlighted) {
  return {
    type: ACTION_TYPES.HIGHLIGHT_ITEM,
    id: id,
    highlighted: highlighted
  };
};
// CONCATENATED MODULE: ./src/scripts/actions/groups.js

/**
 * @typedef {import('redux').Action} Action
 * @typedef {import('../../../types/index').Choices.Group} Group
 */

/**
 * @param {Group} group
 * @returns {Action & Group}
 */

var groups_addGroup = function addGroup(_ref) {
  var value = _ref.value,
      id = _ref.id,
      active = _ref.active,
      disabled = _ref.disabled;
  return {
    type: ACTION_TYPES.ADD_GROUP,
    value: value,
    id: id,
    active: active,
    disabled: disabled
  };
};
// CONCATENATED MODULE: ./src/scripts/actions/misc.js
/**
 * @typedef {import('redux').Action} Action
 */

/**
 * @returns {Action}
 */
var clearAll = function clearAll() {
  return {
    type: 'CLEAR_ALL'
  };
};
/**
 * @param {any} state
 * @returns {Action & { state: object }}
 */

var resetTo = function resetTo(state) {
  return {
    type: 'RESET_TO',
    state: state
  };
};
/**
 * @param {boolean} isLoading
 * @returns {Action & { isLoading: boolean }}
 */

var setIsLoading = function setIsLoading(isLoading) {
  return {
    type: 'SET_IS_LOADING',
    isLoading: isLoading
  };
};
// CONCATENATED MODULE: ./src/scripts/choices.js
function choices_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function choices_createClass(Constructor, protoProps, staticProps) { if (protoProps) choices_defineProperties(Constructor.prototype, protoProps); if (staticProps) choices_defineProperties(Constructor, staticProps); return Constructor; }












/** @see {@link http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c} */

var IS_IE11 = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
/**
 * @typedef {import('../../types/index').Choices.Choice} Choice
 * @typedef {import('../../types/index').Choices.Item} Item
 * @typedef {import('../../types/index').Choices.Group} Group
 * @typedef {import('../../types/index').Choices.Options} Options
 */

/** @type {Partial<Options>} */

var USER_DEFAULTS = {};
/**
 * Choices
 * @author Josh Johnson<josh@joshuajohnson.co.uk>
 */

var choices_Choices =
/*#__PURE__*/
function () {
  choices_createClass(Choices, null, [{
    key: "defaults",
    get: function get() {
      return Object.preventExtensions({
        get options() {
          return USER_DEFAULTS;
        },

        get templates() {
          return TEMPLATES;
        }

      });
    }
    /**
     * @param {string | HTMLInputElement | HTMLSelectElement} element
     * @param {Partial<Options>} userConfig
     */

  }]);

  function Choices(element, userConfig) {
    var _this = this;

    if (element === void 0) {
      element = '[data-choice]';
    }

    if (userConfig === void 0) {
      userConfig = {};
    }

    /** @type {Partial<Options>} */
    this.config = cjs_default.a.all([DEFAULT_CONFIG, Choices.defaults.options, userConfig], // When merging array configs, replace with a copy of the userConfig array,
    // instead of concatenating with the default array
    {
      arrayMerge: function arrayMerge(_, sourceArray) {
        return [].concat(sourceArray);
      }
    });
    var invalidConfigOptions = diff(this.config, DEFAULT_CONFIG);

    if (invalidConfigOptions.length) {
      console.warn('Unknown config option(s) passed', invalidConfigOptions.join(', '));
    }

    var passedElement = typeof element === 'string' ? document.querySelector(element) : element;

    if (!(passedElement instanceof HTMLInputElement || passedElement instanceof HTMLSelectElement)) {
      throw TypeError('Expected one of the following types text|select-one|select-multiple');
    }

    this._isTextElement = passedElement.type === TEXT_TYPE;
    this._isSelectOneElement = passedElement.type === SELECT_ONE_TYPE;
    this._isSelectMultipleElement = passedElement.type === SELECT_MULTIPLE_TYPE;
    this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement;
    this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled;

    if (!['auto', 'always'].includes(this.config.renderSelectedChoices)) {
      this.config.renderSelectedChoices = 'auto';
    }

    if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== 'function') {
      var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
      this.config.addItemFilter = re.test.bind(re);
    }

    if (this._isTextElement) {
      this.passedElement = new WrappedInput({
        element: passedElement,
        classNames: this.config.classNames,
        delimiter: this.config.delimiter
      });
    } else {
      this.passedElement = new WrappedSelect({
        element: passedElement,
        classNames: this.config.classNames,
        template: function template(data) {
          return _this._templates.option(data);
        }
      });
    }

    this.initialised = false;
    this._store = new store_Store();
    this._initialState = {};
    this._currentState = {};
    this._prevState = {};
    this._currentValue = '';
    this._canSearch = this.config.searchEnabled;
    this._isScrollingOnIe = false;
    this._highlightPosition = 0;
    this._wasTap = true;
    this._placeholderValue = this._generatePlaceholderValue();
    this._baseId = generateId(this.passedElement.element, 'choices-');
    /**
     * setting direction in cases where it's explicitly set on passedElement
     * or when calculated direction is different from the document
     * @type {HTMLElement['dir']}
     */

    this._direction = this.passedElement.dir;

    if (!this._direction) {
      var _window$getComputedSt = window.getComputedStyle(this.passedElement.element),
          elementDirection = _window$getComputedSt.direction;

      var _window$getComputedSt2 = window.getComputedStyle(document.documentElement),
          documentDirection = _window$getComputedSt2.direction;

      if (elementDirection !== documentDirection) {
        this._direction = elementDirection;
      }
    }

    this._idNames = {
      itemChoice: 'item-choice'
    }; // Assign preset groups from passed element

    this._presetGroups = this.passedElement.optionGroups; // Assign preset options from passed element

    this._presetOptions = this.passedElement.options; // Assign preset choices from passed object

    this._presetChoices = this.config.choices; // Assign preset items from passed object first

    this._presetItems = this.config.items; // Add any values passed from attribute

    if (this.passedElement.value) {
      this._presetItems = this._presetItems.concat(this.passedElement.value.split(this.config.delimiter));
    } // Create array of choices from option elements


    if (this.passedElement.options) {
      this.passedElement.options.forEach(function (o) {
        _this._presetChoices.push({
          value: o.value,
          label: o.innerHTML,
          selected: o.selected,
          disabled: o.disabled || o.parentNode.disabled,
          placeholder: o.value === '' || o.hasAttribute('placeholder'),
          customProperties: o.getAttribute('data-custom-properties')
        });
      });
    }

    this._render = this._render.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
    this._onAKey = this._onAKey.bind(this);
    this._onEnterKey = this._onEnterKey.bind(this);
    this._onEscapeKey = this._onEscapeKey.bind(this);
    this._onDirectionKey = this._onDirectionKey.bind(this);
    this._onDeleteKey = this._onDeleteKey.bind(this); // If element has already been initialised with Choices, fail silently

    if (this.passedElement.isActive) {
      if (!this.config.silent) {
        console.warn('Trying to initialise Choices on element already initialised');
      }

      this.initialised = true;
      return;
    } // Let's go


    this.init();
  }

  var _proto = Choices.prototype;

  _proto.init = function init() {
    if (this.initialised) {
      return;
    }

    this._createTemplates();

    this._createElements();

    this._createStructure(); // Set initial state (We need to clone the state because some reducers
    // modify the inner objects properties in the state) 🤢


    this._initialState = cloneObject(this._store.state);

    this._store.subscribe(this._render);

    this._render();

    this._addEventListeners();

    var shouldDisable = !this.config.addItems || this.passedElement.element.hasAttribute('disabled');

    if (shouldDisable) {
      this.disable();
    }

    this.initialised = true;
    var callbackOnInit = this.config.callbackOnInit; // Run callback if it is a function

    if (callbackOnInit && typeof callbackOnInit === 'function') {
      callbackOnInit.call(this);
    }
  };

  _proto.destroy = function destroy() {
    if (!this.initialised) {
      return;
    }

    this._removeEventListeners();

    this.passedElement.reveal();
    this.containerOuter.unwrap(this.passedElement.element);
    this.clearStore();

    if (this._isSelectElement) {
      this.passedElement.options = this._presetOptions;
    }

    this._templates = null;
    this.initialised = false;
  };

  _proto.enable = function enable() {
    if (this.passedElement.isDisabled) {
      this.passedElement.enable();
    }

    if (this.containerOuter.isDisabled) {
      this._addEventListeners();

      this.input.enable();
      this.containerOuter.enable();
    }

    return this;
  };

  _proto.disable = function disable() {
    if (!this.passedElement.isDisabled) {
      this.passedElement.disable();
    }

    if (!this.containerOuter.isDisabled) {
      this._removeEventListeners();

      this.input.disable();
      this.containerOuter.disable();
    }

    return this;
  };

  _proto.highlightItem = function highlightItem(item, runEvent) {
    if (runEvent === void 0) {
      runEvent = true;
    }

    if (!item) {
      return this;
    }

    var id = item.id,
        _item$groupId = item.groupId,
        groupId = _item$groupId === void 0 ? -1 : _item$groupId,
        _item$value = item.value,
        value = _item$value === void 0 ? '' : _item$value,
        _item$label = item.label,
        label = _item$label === void 0 ? '' : _item$label;
    var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;

    this._store.dispatch(items_highlightItem(id, true));

    if (runEvent) {
      this.passedElement.triggerEvent(EVENTS.highlightItem, {
        id: id,
        value: value,
        label: label,
        groupValue: group && group.value ? group.value : null
      });
    }

    return this;
  };

  _proto.unhighlightItem = function unhighlightItem(item) {
    if (!item) {
      return this;
    }

    var id = item.id,
        _item$groupId2 = item.groupId,
        groupId = _item$groupId2 === void 0 ? -1 : _item$groupId2,
        _item$value2 = item.value,
        value = _item$value2 === void 0 ? '' : _item$value2,
        _item$label2 = item.label,
        label = _item$label2 === void 0 ? '' : _item$label2;
    var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;

    this._store.dispatch(items_highlightItem(id, false));

    this.passedElement.triggerEvent(EVENTS.highlightItem, {
      id: id,
      value: value,
      label: label,
      groupValue: group && group.value ? group.value : null
    });
    return this;
  };

  _proto.highlightAll = function highlightAll() {
    var _this2 = this;

    this._store.items.forEach(function (item) {
      return _this2.highlightItem(item);
    });

    return this;
  };

  _proto.unhighlightAll = function unhighlightAll() {
    var _this3 = this;

    this._store.items.forEach(function (item) {
      return _this3.unhighlightItem(item);
    });

    return this;
  };

  _proto.removeActiveItemsByValue = function removeActiveItemsByValue(value) {
    var _this4 = this;

    this._store.activeItems.filter(function (item) {
      return item.value === value;
    }).forEach(function (item) {
      return _this4._removeItem(item);
    });

    return this;
  };

  _proto.removeActiveItems = function removeActiveItems(excludedId) {
    var _this5 = this;

    this._store.activeItems.filter(function (_ref) {
      var id = _ref.id;
      return id !== excludedId;
    }).forEach(function (item) {
      return _this5._removeItem(item);
    });

    return this;
  };

  _proto.removeHighlightedItems = function removeHighlightedItems(runEvent) {
    var _this6 = this;

    if (runEvent === void 0) {
      runEvent = false;
    }

    this._store.highlightedActiveItems.forEach(function (item) {
      _this6._removeItem(item); // If this action was performed by the user
      // trigger the event


      if (runEvent) {
        _this6._triggerChange(item.value);
      }
    });

    return this;
  };

  _proto.showDropdown = function showDropdown(preventInputFocus) {
    var _this7 = this;

    if (this.dropdown.isActive) {
      return this;
    }

    requestAnimationFrame(function () {
      _this7.dropdown.show();

      _this7.containerOuter.open(_this7.dropdown.distanceFromTopWindow);

      if (!preventInputFocus && _this7._canSearch) {
        _this7.input.focus();
      }

      _this7.passedElement.triggerEvent(EVENTS.showDropdown, {});
    });
    return this;
  };

  _proto.hideDropdown = function hideDropdown(preventInputBlur) {
    var _this8 = this;

    if (!this.dropdown.isActive) {
      return this;
    }

    requestAnimationFrame(function () {
      _this8.dropdown.hide();

      _this8.containerOuter.close();

      if (!preventInputBlur && _this8._canSearch) {
        _this8.input.removeActiveDescendant();

        _this8.input.blur();
      }

      _this8.passedElement.triggerEvent(EVENTS.hideDropdown, {});
    });
    return this;
  };

  _proto.getValue = function getValue(valueOnly) {
    if (valueOnly === void 0) {
      valueOnly = false;
    }

    var values = this._store.activeItems.reduce(function (selectedItems, item) {
      var itemValue = valueOnly ? item.value : item;
      selectedItems.push(itemValue);
      return selectedItems;
    }, []);

    return this._isSelectOneElement ? values[0] : values;
  }
  /**
   * @param {string[] | import('../../types/index').Choices.Item[]} items
   */
  ;

  _proto.setValue = function setValue(items) {
    var _this9 = this;

    if (!this.initialised) {
      return this;
    }

    items.forEach(function (value) {
      return _this9._setChoiceOrItem(value);
    });
    return this;
  };

  _proto.setChoiceByValue = function setChoiceByValue(value) {
    var _this10 = this;

    if (!this.initialised || this._isTextElement) {
      return this;
    } // If only one value has been passed, convert to array


    var choiceValue = Array.isArray(value) ? value : [value]; // Loop through each value and

    choiceValue.forEach(function (val) {
      return _this10._findAndSelectChoiceByValue(val);
    });
    return this;
  }
  /**
   * Set choices of select input via an array of objects (or function that returns array of object or promise of it),
   * a value field name and a label field name.
   * This behaves the same as passing items via the choices option but can be called after initialising Choices.
   * This can also be used to add groups of choices (see example 2); Optionally pass a true `replaceChoices` value to remove any existing choices.
   * Optionally pass a `customProperties` object to add additional data to your choices (useful when searching/filtering etc).
   *
   * **Input types affected:** select-one, select-multiple
   *
   * @template {Choice[] | ((instance: Choices) => object[] | Promise<object[]>)} T
   * @param {T} [choicesArrayOrFetcher]
   * @param {string} [value = 'value'] - name of `value` field
   * @param {string} [label = 'label'] - name of 'label' field
   * @param {boolean} [replaceChoices = false] - whether to replace of add choices
   * @returns {this | Promise<this>}
   *
   * @example
   * ```js
   * const example = new Choices(element);
   *
   * example.setChoices([
   *   {value: 'One', label: 'Label One', disabled: true},
   *   {value: 'Two', label: 'Label Two', selected: true},
   *   {value: 'Three', label: 'Label Three'},
   * ], 'value', 'label', false);
   * ```
   *
   * @example
   * ```js
   * const example = new Choices(element);
   *
   * example.setChoices(async () => {
   *   try {
   *      const items = await fetch('/items');
   *      return items.json()
   *   } catch(err) {
   *      console.error(err)
   *   }
   * });
   * ```
   *
   * @example
   * ```js
   * const example = new Choices(element);
   *
   * example.setChoices([{
   *   label: 'Group one',
   *   id: 1,
   *   disabled: false,
   *   choices: [
   *     {value: 'Child One', label: 'Child One', selected: true},
   *     {value: 'Child Two', label: 'Child Two',  disabled: true},
   *     {value: 'Child Three', label: 'Child Three'},
   *   ]
   * },
   * {
   *   label: 'Group two',
   *   id: 2,
   *   disabled: false,
   *   choices: [
   *     {value: 'Child Four', label: 'Child Four', disabled: true},
   *     {value: 'Child Five', label: 'Child Five'},
   *     {value: 'Child Six', label: 'Child Six', customProperties: {
   *       description: 'Custom description about child six',
   *       random: 'Another random custom property'
   *     }},
   *   ]
   * }], 'value', 'label', false);
   * ```
   */
  ;

  _proto.setChoices = function setChoices(choicesArrayOrFetcher, value, label, replaceChoices) {
    var _this11 = this;

    if (choicesArrayOrFetcher === void 0) {
      choicesArrayOrFetcher = [];
    }

    if (value === void 0) {
      value = 'value';
    }

    if (label === void 0) {
      label = 'label';
    }

    if (replaceChoices === void 0) {
      replaceChoices = false;
    }

    if (!this.initialised) {
      throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
    }

    if (!this._isSelectElement) {
      throw new TypeError("setChoices can't be used with INPUT based Choices");
    }

    if (typeof value !== 'string' || !value) {
      throw new TypeError("value parameter must be a name of 'value' field in passed objects");
    } // Clear choices if needed


    if (replaceChoices) {
      this.clearChoices();
    }

    if (typeof choicesArrayOrFetcher === 'function') {
      // it's a choices fetcher function
      var fetcher = choicesArrayOrFetcher(this);

      if (typeof Promise === 'function' && fetcher instanceof Promise) {
        // that's a promise
        // eslint-disable-next-line compat/compat
        return new Promise(function (resolve) {
          return requestAnimationFrame(resolve);
        }).then(function () {
          return _this11._handleLoadingState(true);
        }).then(function () {
          return fetcher;
        }).then(function (data) {
          return _this11.setChoices(data, value, label, replaceChoices);
        }).catch(function (err) {
          if (!_this11.config.silent) {
            console.error(err);
          }
        }).then(function () {
          return _this11._handleLoadingState(false);
        }).then(function () {
          return _this11;
        });
      } // function returned something else than promise, let's check if it's an array of choices


      if (!Array.isArray(fetcher)) {
        throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: " + typeof fetcher);
      } // recursion with results, it's sync and choices were cleared already


      return this.setChoices(fetcher, value, label, false);
    }

    if (!Array.isArray(choicesArrayOrFetcher)) {
      throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
    }

    this.containerOuter.removeLoadingState();

    this._startLoading();

    choicesArrayOrFetcher.forEach(function (groupOrChoice) {
      if (groupOrChoice.choices) {
        _this11._addGroup({
          id: parseInt(groupOrChoice.id, 10) || null,
          group: groupOrChoice,
          valueKey: value,
          labelKey: label
        });
      } else {
        _this11._addChoice({
          value: groupOrChoice[value],
          label: groupOrChoice[label],
          isSelected: groupOrChoice.selected,
          isDisabled: groupOrChoice.disabled,
          customProperties: groupOrChoice.customProperties,
          placeholder: groupOrChoice.placeholder
        });
      }
    });

    this._stopLoading();

    return this;
  };

  _proto.clearChoices = function clearChoices() {
    this._store.dispatch(choices_clearChoices());

    return this;
  };

  _proto.clearStore = function clearStore() {
    this._store.dispatch(clearAll());

    return this;
  };

  _proto.clearInput = function clearInput() {
    var shouldSetInputWidth = !this._isSelectOneElement;
    this.input.clear(shouldSetInputWidth);

    if (!this._isTextElement && this._canSearch) {
      this._isSearching = false;

      this._store.dispatch(choices_activateChoices(true));
    }

    return this;
  };

  _proto._render = function _render() {
    if (this._store.isLoading()) {
      return;
    }

    this._currentState = this._store.state;
    var stateChanged = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items;
    var shouldRenderChoices = this._isSelectElement;
    var shouldRenderItems = this._currentState.items !== this._prevState.items;

    if (!stateChanged) {
      return;
    }

    if (shouldRenderChoices) {
      this._renderChoices();
    }

    if (shouldRenderItems) {
      this._renderItems();
    }

    this._prevState = this._currentState;
  };

  _proto._renderChoices = function _renderChoices() {
    var _this12 = this;

    var _this$_store = this._store,
        activeGroups = _this$_store.activeGroups,
        activeChoices = _this$_store.activeChoices;
    var choiceListFragment = document.createDocumentFragment();
    this.choiceList.clear();

    if (this.config.resetScrollPosition) {
      requestAnimationFrame(function () {
        return _this12.choiceList.scrollToTop();
      });
    } // If we have grouped options


    if (activeGroups.length >= 1 && !this._isSearching) {
      // If we have a placeholder choice along with groups
      var activePlaceholders = activeChoices.filter(function (activeChoice) {
        return activeChoice.placeholder === true && activeChoice.groupId === -1;
      });

      if (activePlaceholders.length >= 1) {
        choiceListFragment = this._createChoicesFragment(activePlaceholders, choiceListFragment);
      }

      choiceListFragment = this._createGroupsFragment(activeGroups, activeChoices, choiceListFragment);
    } else if (activeChoices.length >= 1) {
      choiceListFragment = this._createChoicesFragment(activeChoices, choiceListFragment);
    } // If we have choices to show


    if (choiceListFragment.childNodes && choiceListFragment.childNodes.length > 0) {
      var activeItems = this._store.activeItems;

      var canAddItem = this._canAddItem(activeItems, this.input.value); // ...and we can select them


      if (canAddItem.response) {
        // ...append them and highlight the first choice
        this.choiceList.append(choiceListFragment);

        this._highlightChoice();
      } else {
        // ...otherwise show a notice
        this.choiceList.append(this._getTemplate('notice', canAddItem.notice));
      }
    } else {
      // Otherwise show a notice
      var dropdownItem;
      var notice;

      if (this._isSearching) {
        notice = typeof this.config.noResultsText === 'function' ? this.config.noResultsText() : this.config.noResultsText;
        dropdownItem = this._getTemplate('notice', notice, 'no-results');
      } else {
        notice = typeof this.config.noChoicesText === 'function' ? this.config.noChoicesText() : this.config.noChoicesText;
        dropdownItem = this._getTemplate('notice', notice, 'no-choices');
      }

      this.choiceList.append(dropdownItem);
    }
  };

  _proto._renderItems = function _renderItems() {
    var activeItems = this._store.activeItems || [];
    this.itemList.clear(); // Create a fragment to store our list items
    // (so we don't have to update the DOM for each item)

    var itemListFragment = this._createItemsFragment(activeItems); // If we have items to add, append them


    if (itemListFragment.childNodes) {
      this.itemList.append(itemListFragment);
    }
  };

  _proto._createGroupsFragment = function _createGroupsFragment(groups, choices, fragment) {
    var _this13 = this;

    if (fragment === void 0) {
      fragment = document.createDocumentFragment();
    }

    var getGroupChoices = function getGroupChoices(group) {
      return choices.filter(function (choice) {
        if (_this13._isSelectOneElement) {
          return choice.groupId === group.id;
        }

        return choice.groupId === group.id && (_this13.config.renderSelectedChoices === 'always' || !choice.selected);
      });
    }; // If sorting is enabled, filter groups


    if (this.config.shouldSort) {
      groups.sort(this.config.sorter);
    }

    groups.forEach(function (group) {
      var groupChoices = getGroupChoices(group);

      if (groupChoices.length >= 1) {
        var dropdownGroup = _this13._getTemplate('choiceGroup', group);

        fragment.appendChild(dropdownGroup);

        _this13._createChoicesFragment(groupChoices, fragment, true);
      }
    });
    return fragment;
  };

  _proto._createChoicesFragment = function _createChoicesFragment(choices, fragment, withinGroup) {
    var _this14 = this;

    if (fragment === void 0) {
      fragment = document.createDocumentFragment();
    }

    if (withinGroup === void 0) {
      withinGroup = false;
    }

    // Create a fragment to store our list items (so we don't have to update the DOM for each item)
    var _this$config = this.config,
        renderSelectedChoices = _this$config.renderSelectedChoices,
        searchResultLimit = _this$config.searchResultLimit,
        renderChoiceLimit = _this$config.renderChoiceLimit;
    var filter = this._isSearching ? sortByScore : this.config.sorter;

    var appendChoice = function appendChoice(choice) {
      var shouldRender = renderSelectedChoices === 'auto' ? _this14._isSelectOneElement || !choice.selected : true;

      if (shouldRender) {
        var dropdownItem = _this14._getTemplate('choice', choice, _this14.config.itemSelectText);

        fragment.appendChild(dropdownItem);
      }
    };

    var rendererableChoices = choices;

    if (renderSelectedChoices === 'auto' && !this._isSelectOneElement) {
      rendererableChoices = choices.filter(function (choice) {
        return !choice.selected;
      });
    } // Split array into placeholders and "normal" choices


    var _rendererableChoices$ = rendererableChoices.reduce(function (acc, choice) {
      if (choice.placeholder) {
        acc.placeholderChoices.push(choice);
      } else {
        acc.normalChoices.push(choice);
      }

      return acc;
    }, {
      placeholderChoices: [],
      normalChoices: []
    }),
        placeholderChoices = _rendererableChoices$.placeholderChoices,
        normalChoices = _rendererableChoices$.normalChoices; // If sorting is enabled or the user is searching, filter choices


    if (this.config.shouldSort || this._isSearching) {
      normalChoices.sort(filter);
    }

    var choiceLimit = rendererableChoices.length; // Prepend placeholeder

    var sortedChoices = this._isSelectOneElement ? [].concat(placeholderChoices, normalChoices) : normalChoices;

    if (this._isSearching) {
      choiceLimit = searchResultLimit;
    } else if (renderChoiceLimit && renderChoiceLimit > 0 && !withinGroup) {
      choiceLimit = renderChoiceLimit;
    } // Add each choice to dropdown within range


    for (var i = 0; i < choiceLimit; i += 1) {
      if (sortedChoices[i]) {
        appendChoice(sortedChoices[i]);
      }
    }

    return fragment;
  };

  _proto._createItemsFragment = function _createItemsFragment(items, fragment) {
    var _this15 = this;

    if (fragment === void 0) {
      fragment = document.createDocumentFragment();
    }

    // Create fragment to add elements to
    var _this$config2 = this.config,
        shouldSortItems = _this$config2.shouldSortItems,
        sorter = _this$config2.sorter,
        removeItemButton = _this$config2.removeItemButton; // If sorting is enabled, filter items

    if (shouldSortItems && !this._isSelectOneElement) {
      items.sort(sorter);
    }

    if (this._isTextElement) {
      // Update the value of the hidden input
      this.passedElement.value = items;
    } else {
      // Update the options of the hidden input
      this.passedElement.options = items;
    }

    var addItemToFragment = function addItemToFragment(item) {
      // Create new list element
      var listItem = _this15._getTemplate('item', item, removeItemButton); // Append it to list


      fragment.appendChild(listItem);
    }; // Add each list item to list


    items.forEach(addItemToFragment);
    return fragment;
  };

  _proto._triggerChange = function _triggerChange(value) {
    if (value === undefined || value === null) {
      return;
    }

    this.passedElement.triggerEvent(EVENTS.change, {
      value: value
    });
  };

  _proto._selectPlaceholderChoice = function _selectPlaceholderChoice() {
    var placeholderChoice = this._store.placeholderChoice;

    if (placeholderChoice) {
      this._addItem({
        value: placeholderChoice.value,
        label: placeholderChoice.label,
        choiceId: placeholderChoice.id,
        groupId: placeholderChoice.groupId,
        placeholder: placeholderChoice.placeholder
      });

      this._triggerChange(placeholderChoice.value);
    }
  };

  _proto._handleButtonAction = function _handleButtonAction(activeItems, element) {
    if (!activeItems || !element || !this.config.removeItems || !this.config.removeItemButton) {
      return;
    }

    var itemId = element.parentNode.getAttribute('data-id');
    var itemToRemove = activeItems.find(function (item) {
      return item.id === parseInt(itemId, 10);
    }); // Remove item associated with button

    this._removeItem(itemToRemove);

    this._triggerChange(itemToRemove.value);

    if (this._isSelectOneElement) {
      this._selectPlaceholderChoice();
    }
  };

  _proto._handleItemAction = function _handleItemAction(activeItems, element, hasShiftKey) {
    var _this16 = this;

    if (hasShiftKey === void 0) {
      hasShiftKey = false;
    }

    if (!activeItems || !element || !this.config.removeItems || this._isSelectOneElement) {
      return;
    }

    var passedId = element.getAttribute('data-id'); // We only want to select one item with a click
    // so we deselect any items that aren't the target
    // unless shift is being pressed

    activeItems.forEach(function (item) {
      if (item.id === parseInt(passedId, 10) && !item.highlighted) {
        _this16.highlightItem(item);
      } else if (!hasShiftKey && item.highlighted) {
        _this16.unhighlightItem(item);
      }
    }); // Focus input as without focus, a user cannot do anything with a
    // highlighted item

    this.input.focus();
  };

  _proto._handleChoiceAction = function _handleChoiceAction(activeItems, element) {
    if (!activeItems || !element) {
      return;
    } // If we are clicking on an option


    var id = element.dataset.id;

    var choice = this._store.getChoiceById(id);

    if (!choice) {
      return;
    }

    var passedKeyCode = activeItems[0] && activeItems[0].keyCode ? activeItems[0].keyCode : null;
    var hasActiveDropdown = this.dropdown.isActive; // Update choice keyCode

    choice.keyCode = passedKeyCode;
    this.passedElement.triggerEvent(EVENTS.choice, {
      choice: choice
    });

    if (!choice.selected && !choice.disabled) {
      var canAddItem = this._canAddItem(activeItems, choice.value);

      if (canAddItem.response) {
        this._addItem({
          value: choice.value,
          label: choice.label,
          choiceId: choice.id,
          groupId: choice.groupId,
          customProperties: choice.customProperties,
          placeholder: choice.placeholder,
          keyCode: choice.keyCode
        });

        this._triggerChange(choice.value);
      }
    }

    this.clearInput(); // We want to close the dropdown if we are dealing with a single select box

    if (hasActiveDropdown && this._isSelectOneElement) {
      this.hideDropdown(true);
      this.containerOuter.focus();
    }
  };

  _proto._handleBackspace = function _handleBackspace(activeItems) {
    if (!this.config.removeItems || !activeItems) {
      return;
    }

    var lastItem = activeItems[activeItems.length - 1];
    var hasHighlightedItems = activeItems.some(function (item) {
      return item.highlighted;
    }); // If editing the last item is allowed and there are not other selected items,
    // we can edit the item value. Otherwise if we can remove items, remove all selected items

    if (this.config.editItems && !hasHighlightedItems && lastItem) {
      this.input.value = lastItem.value;
      this.input.setWidth();

      this._removeItem(lastItem);

      this._triggerChange(lastItem.value);
    } else {
      if (!hasHighlightedItems) {
        // Highlight last item if none already highlighted
        this.highlightItem(lastItem, false);
      }

      this.removeHighlightedItems(true);
    }
  };

  _proto._startLoading = function _startLoading() {
    this._store.dispatch(setIsLoading(true));
  };

  _proto._stopLoading = function _stopLoading() {
    this._store.dispatch(setIsLoading(false));
  };

  _proto._handleLoadingState = function _handleLoadingState(setLoading) {
    if (setLoading === void 0) {
      setLoading = true;
    }

    var placeholderItem = this.itemList.getChild("." + this.config.classNames.placeholder);

    if (setLoading) {
      this.disable();
      this.containerOuter.addLoadingState();

      if (this._isSelectOneElement) {
        if (!placeholderItem) {
          placeholderItem = this._getTemplate('placeholder', this.config.loadingText);
          this.itemList.append(placeholderItem);
        } else {
          placeholderItem.innerHTML = this.config.loadingText;
        }
      } else {
        this.input.placeholder = this.config.loadingText;
      }
    } else {
      this.enable();
      this.containerOuter.removeLoadingState();

      if (this._isSelectOneElement) {
        placeholderItem.innerHTML = this._placeholderValue || '';
      } else {
        this.input.placeholder = this._placeholderValue || '';
      }
    }
  };

  _proto._handleSearch = function _handleSearch(value) {
    if (!value || !this.input.isFocussed) {
      return;
    }

    var choices = this._store.choices;
    var _this$config3 = this.config,
        searchFloor = _this$config3.searchFloor,
        searchChoices = _this$config3.searchChoices;
    var hasUnactiveChoices = choices.some(function (option) {
      return !option.active;
    }); // Check that we have a value to search and the input was an alphanumeric character

    if (value && value.length >= searchFloor) {
      var resultCount = searchChoices ? this._searchChoices(value) : 0; // Trigger search event

      this.passedElement.triggerEvent(EVENTS.search, {
        value: value,
        resultCount: resultCount
      });
    } else if (hasUnactiveChoices) {
      // Otherwise reset choices to active
      this._isSearching = false;

      this._store.dispatch(choices_activateChoices(true));
    }
  };

  _proto._canAddItem = function _canAddItem(activeItems, value) {
    var canAddItem = true;
    var notice = typeof this.config.addItemText === 'function' ? this.config.addItemText(value) : this.config.addItemText;

    if (!this._isSelectOneElement) {
      var isDuplicateValue = existsInArray(activeItems, value);

      if (this.config.maxItemCount > 0 && this.config.maxItemCount <= activeItems.length) {
        // If there is a max entry limit and we have reached that limit
        // don't update
        canAddItem = false;
        notice = typeof this.config.maxItemText === 'function' ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText;
      }

      if (!this.config.duplicateItemsAllowed && isDuplicateValue && canAddItem) {
        canAddItem = false;
        notice = typeof this.config.uniqueItemText === 'function' ? this.config.uniqueItemText(value) : this.config.uniqueItemText;
      }

      if (this._isTextElement && this.config.addItems && canAddItem && typeof this.config.addItemFilter === 'function' && !this.config.addItemFilter(value)) {
        canAddItem = false;
        notice = typeof this.config.customAddItemText === 'function' ? this.config.customAddItemText(value) : this.config.customAddItemText;
      }
    }

    return {
      response: canAddItem,
      notice: notice
    };
  };

  _proto._searchChoices = function _searchChoices(value) {
    var newValue = typeof value === 'string' ? value.trim() : value;
    var currentValue = typeof this._currentValue === 'string' ? this._currentValue.trim() : this._currentValue;

    if (newValue.length < 1 && newValue === currentValue + " ") {
      return 0;
    } // If new value matches the desired length and is not the same as the current value with a space


    var haystack = this._store.searchableChoices;
    var needle = newValue;
    var keys = [].concat(this.config.searchFields);
    var options = Object.assign(this.config.fuseOptions, {
      keys: keys
    });
    var fuse = new fuse_default.a(haystack, options);
    var results = fuse.search(needle);
    this._currentValue = newValue;
    this._highlightPosition = 0;
    this._isSearching = true;

    this._store.dispatch(choices_filterChoices(results));

    return results.length;
  };

  _proto._addEventListeners = function _addEventListeners() {
    var _document = document,
        documentElement = _document.documentElement; // capture events - can cancel event processing or propagation

    documentElement.addEventListener('touchend', this._onTouchEnd, true);
    this.containerOuter.element.addEventListener('keydown', this._onKeyDown, true);
    this.containerOuter.element.addEventListener('mousedown', this._onMouseDown, true); // passive events - doesn't call `preventDefault` or `stopPropagation`

    documentElement.addEventListener('click', this._onClick, {
      passive: true
    });
    documentElement.addEventListener('touchmove', this._onTouchMove, {
      passive: true
    });
    this.dropdown.element.addEventListener('mouseover', this._onMouseOver, {
      passive: true
    });

    if (this._isSelectOneElement) {
      this.containerOuter.element.addEventListener('focus', this._onFocus, {
        passive: true
      });
      this.containerOuter.element.addEventListener('blur', this._onBlur, {
        passive: true
      });
    }

    this.input.element.addEventListener('keyup', this._onKeyUp, {
      passive: true
    });
    this.input.element.addEventListener('focus', this._onFocus, {
      passive: true
    });
    this.input.element.addEventListener('blur', this._onBlur, {
      passive: true
    });

    if (this.input.element.form) {
      this.input.element.form.addEventListener('reset', this._onFormReset, {
        passive: true
      });
    }

    this.input.addEventListeners();
  };

  _proto._removeEventListeners = function _removeEventListeners() {
    var _document2 = document,
        documentElement = _document2.documentElement;
    documentElement.removeEventListener('touchend', this._onTouchEnd, true);
    this.containerOuter.element.removeEventListener('keydown', this._onKeyDown, true);
    this.containerOuter.element.removeEventListener('mousedown', this._onMouseDown, true);
    documentElement.removeEventListener('click', this._onClick);
    documentElement.removeEventListener('touchmove', this._onTouchMove);
    this.dropdown.element.removeEventListener('mouseover', this._onMouseOver);

    if (this._isSelectOneElement) {
      this.containerOuter.element.removeEventListener('focus', this._onFocus);
      this.containerOuter.element.removeEventListener('blur', this._onBlur);
    }

    this.input.element.removeEventListener('keyup', this._onKeyUp);
    this.input.element.removeEventListener('focus', this._onFocus);
    this.input.element.removeEventListener('blur', this._onBlur);

    if (this.input.element.form) {
      this.input.element.form.removeEventListener('reset', this._onFormReset);
    }

    this.input.removeEventListeners();
  }
  /**
   * @param {KeyboardEvent} event
   */
  ;

  _proto._onKeyDown = function _onKeyDown(event) {
    var _keyDownActions;

    var target = event.target,
        keyCode = event.keyCode,
        ctrlKey = event.ctrlKey,
        metaKey = event.metaKey;
    var activeItems = this._store.activeItems;
    var hasFocusedInput = this.input.isFocussed;
    var hasActiveDropdown = this.dropdown.isActive;
    var hasItems = this.itemList.hasChildren();
    var keyString = String.fromCharCode(keyCode);
    var BACK_KEY = KEY_CODES.BACK_KEY,
        DELETE_KEY = KEY_CODES.DELETE_KEY,
        ENTER_KEY = KEY_CODES.ENTER_KEY,
        A_KEY = KEY_CODES.A_KEY,
        ESC_KEY = KEY_CODES.ESC_KEY,
        UP_KEY = KEY_CODES.UP_KEY,
        DOWN_KEY = KEY_CODES.DOWN_KEY,
        PAGE_UP_KEY = KEY_CODES.PAGE_UP_KEY,
        PAGE_DOWN_KEY = KEY_CODES.PAGE_DOWN_KEY;
    var hasCtrlDownKeyPressed = ctrlKey || metaKey; // If a user is typing and the dropdown is not active

    if (!this._isTextElement && /[a-zA-Z0-9-_ ]/.test(keyString)) {
      this.showDropdown();
    } // Map keys to key actions


    var keyDownActions = (_keyDownActions = {}, _keyDownActions[A_KEY] = this._onAKey, _keyDownActions[ENTER_KEY] = this._onEnterKey, _keyDownActions[ESC_KEY] = this._onEscapeKey, _keyDownActions[UP_KEY] = this._onDirectionKey, _keyDownActions[PAGE_UP_KEY] = this._onDirectionKey, _keyDownActions[DOWN_KEY] = this._onDirectionKey, _keyDownActions[PAGE_DOWN_KEY] = this._onDirectionKey, _keyDownActions[DELETE_KEY] = this._onDeleteKey, _keyDownActions[BACK_KEY] = this._onDeleteKey, _keyDownActions); // If keycode has a function, run it

    if (keyDownActions[keyCode]) {
      keyDownActions[keyCode]({
        event: event,
        target: target,
        keyCode: keyCode,
        metaKey: metaKey,
        activeItems: activeItems,
        hasFocusedInput: hasFocusedInput,
        hasActiveDropdown: hasActiveDropdown,
        hasItems: hasItems,
        hasCtrlDownKeyPressed: hasCtrlDownKeyPressed
      });
    }
  };

  _proto._onKeyUp = function _onKeyUp(_ref2) {
    var target = _ref2.target,
        keyCode = _ref2.keyCode;
    var value = this.input.value;
    var activeItems = this._store.activeItems;

    var canAddItem = this._canAddItem(activeItems, value);

    var backKey = KEY_CODES.BACK_KEY,
        deleteKey = KEY_CODES.DELETE_KEY; // We are typing into a text input and have a value, we want to show a dropdown
    // notice. Otherwise hide the dropdown

    if (this._isTextElement) {
      var canShowDropdownNotice = canAddItem.notice && value;

      if (canShowDropdownNotice) {
        var dropdownItem = this._getTemplate('notice', canAddItem.notice);

        this.dropdown.element.innerHTML = dropdownItem.outerHTML;
        this.showDropdown(true);
      } else {
        this.hideDropdown(true);
      }
    } else {
      var userHasRemovedValue = (keyCode === backKey || keyCode === deleteKey) && !target.value;
      var canReactivateChoices = !this._isTextElement && this._isSearching;
      var canSearch = this._canSearch && canAddItem.response;

      if (userHasRemovedValue && canReactivateChoices) {
        this._isSearching = false;

        this._store.dispatch(choices_activateChoices(true));
      } else if (canSearch) {
        this._handleSearch(this.input.value);
      }
    }

    this._canSearch = this.config.searchEnabled;
  };

  _proto._onAKey = function _onAKey(_ref3) {
    var hasItems = _ref3.hasItems,
        hasCtrlDownKeyPressed = _ref3.hasCtrlDownKeyPressed;

    // If CTRL + A or CMD + A have been pressed and there are items to select
    if (hasCtrlDownKeyPressed && hasItems) {
      this._canSearch = false;
      var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;

      if (shouldHightlightAll) {
        this.highlightAll();
      }
    }
  };

  _proto._onEnterKey = function _onEnterKey(_ref4) {
    var event = _ref4.event,
        target = _ref4.target,
        activeItems = _ref4.activeItems,
        hasActiveDropdown = _ref4.hasActiveDropdown;
    var enterKey = KEY_CODES.ENTER_KEY;
    var targetWasButton = target.hasAttribute('data-button');

    if (this._isTextElement && target.value) {
      var value = this.input.value;

      var canAddItem = this._canAddItem(activeItems, value);

      if (canAddItem.response) {
        this.hideDropdown(true);

        this._addItem({
          value: value
        });

        this._triggerChange(value);

        this.clearInput();
      }
    }

    if (targetWasButton) {
      this._handleButtonAction(activeItems, target);

      event.preventDefault();
    }

    if (hasActiveDropdown) {
      var highlightedChoice = this.dropdown.getChild("." + this.config.classNames.highlightedState);

      if (highlightedChoice) {
        // add enter keyCode value
        if (activeItems[0]) {
          activeItems[0].keyCode = enterKey; // eslint-disable-line no-param-reassign
        }

        this._handleChoiceAction(activeItems, highlightedChoice);
      }

      event.preventDefault();
    } else if (this._isSelectOneElement) {
      this.showDropdown();
      event.preventDefault();
    }
  };

  _proto._onEscapeKey = function _onEscapeKey(_ref5) {
    var hasActiveDropdown = _ref5.hasActiveDropdown;

    if (hasActiveDropdown) {
      this.hideDropdown(true);
      this.containerOuter.focus();
    }
  };

  _proto._onDirectionKey = function _onDirectionKey(_ref6) {
    var event = _ref6.event,
        hasActiveDropdown = _ref6.hasActiveDropdown,
        keyCode = _ref6.keyCode,
        metaKey = _ref6.metaKey;
    var downKey = KEY_CODES.DOWN_KEY,
        pageUpKey = KEY_CODES.PAGE_UP_KEY,
        pageDownKey = KEY_CODES.PAGE_DOWN_KEY; // If up or down key is pressed, traverse through options

    if (hasActiveDropdown || this._isSelectOneElement) {
      this.showDropdown();
      this._canSearch = false;
      var directionInt = keyCode === downKey || keyCode === pageDownKey ? 1 : -1;
      var skipKey = metaKey || keyCode === pageDownKey || keyCode === pageUpKey;
      var selectableChoiceIdentifier = '[data-choice-selectable]';
      var nextEl;

      if (skipKey) {
        if (directionInt > 0) {
          nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier + ":last-of-type");
        } else {
          nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
        }
      } else {
        var currentEl = this.dropdown.element.querySelector("." + this.config.classNames.highlightedState);

        if (currentEl) {
          nextEl = getAdjacentEl(currentEl, selectableChoiceIdentifier, directionInt);
        } else {
          nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
        }
      }

      if (nextEl) {
        // We prevent default to stop the cursor moving
        // when pressing the arrow
        if (!isScrolledIntoView(nextEl, this.choiceList.element, directionInt)) {
          this.choiceList.scrollToChildElement(nextEl, directionInt);
        }

        this._highlightChoice(nextEl);
      } // Prevent default to maintain cursor position whilst
      // traversing dropdown options


      event.preventDefault();
    }
  };

  _proto._onDeleteKey = function _onDeleteKey(_ref7) {
    var event = _ref7.event,
        target = _ref7.target,
        hasFocusedInput = _ref7.hasFocusedInput,
        activeItems = _ref7.activeItems;

    // If backspace or delete key is pressed and the input has no value
    if (hasFocusedInput && !target.value && !this._isSelectOneElement) {
      this._handleBackspace(activeItems);

      event.preventDefault();
    }
  };

  _proto._onTouchMove = function _onTouchMove() {
    if (this._wasTap) {
      this._wasTap = false;
    }
  };

  _proto._onTouchEnd = function _onTouchEnd(event) {
    var _ref8 = event || event.touches[0],
        target = _ref8.target;

    var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);

    if (touchWasWithinContainer) {
      var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;

      if (containerWasExactTarget) {
        if (this._isTextElement) {
          this.input.focus();
        } else if (this._isSelectMultipleElement) {
          this.showDropdown();
        }
      } // Prevents focus event firing


      event.stopPropagation();
    }

    this._wasTap = true;
  }
  /**
   * Handles mousedown event in capture mode for containetOuter.element
   * @param {MouseEvent} event
   */
  ;

  _proto._onMouseDown = function _onMouseDown(event) {
    var target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    } // If we have our mouse down on the scrollbar and are on IE11...


    if (IS_IE11 && this.choiceList.element.contains(target)) {
      // check if click was on a scrollbar area
      var firstChoice =
      /** @type {HTMLElement} */
      this.choiceList.element.firstElementChild;
      var isOnScrollbar = this._direction === 'ltr' ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
      this._isScrollingOnIe = isOnScrollbar;
    }

    if (target === this.input.element) {
      return;
    }

    var item = target.closest('[data-button],[data-item],[data-choice]');

    if (item instanceof HTMLElement) {
      var hasShiftKey = event.shiftKey;
      var activeItems = this._store.activeItems;
      var dataset = item.dataset;

      if ('button' in dataset) {
        this._handleButtonAction(activeItems, item);
      } else if ('item' in dataset) {
        this._handleItemAction(activeItems, item, hasShiftKey);
      } else if ('choice' in dataset) {
        this._handleChoiceAction(activeItems, item);
      }
    }

    event.preventDefault();
  }
  /**
   * Handles mouseover event over this.dropdown
   * @param {MouseEvent} event
   */
  ;

  _proto._onMouseOver = function _onMouseOver(_ref9) {
    var target = _ref9.target;

    if (target instanceof HTMLElement && 'choice' in target.dataset) {
      this._highlightChoice(target);
    }
  };

  _proto._onClick = function _onClick(_ref10) {
    var target = _ref10.target;
    var clickWasWithinContainer = this.containerOuter.element.contains(target);

    if (clickWasWithinContainer) {
      if (!this.dropdown.isActive && !this.containerOuter.isDisabled) {
        if (this._isTextElement) {
          if (document.activeElement !== this.input.element) {
            this.input.focus();
          }
        } else {
          this.showDropdown();
          this.containerOuter.focus();
        }
      } else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) {
        this.hideDropdown();
      }
    } else {
      var hasHighlightedItems = this._store.highlightedActiveItems.length > 0;

      if (hasHighlightedItems) {
        this.unhighlightAll();
      }

      this.containerOuter.removeFocusState();
      this.hideDropdown(true);
    }
  };

  _proto._onFocus = function _onFocus(_ref11) {
    var _this17 = this,
        _focusActions;

    var target = _ref11.target;
    var focusWasWithinContainer = this.containerOuter.element.contains(target);

    if (!focusWasWithinContainer) {
      return;
    }

    var focusActions = (_focusActions = {}, _focusActions[TEXT_TYPE] = function () {
      if (target === _this17.input.element) {
        _this17.containerOuter.addFocusState();
      }
    }, _focusActions[SELECT_ONE_TYPE] = function () {
      _this17.containerOuter.addFocusState();

      if (target === _this17.input.element) {
        _this17.showDropdown(true);
      }
    }, _focusActions[SELECT_MULTIPLE_TYPE] = function () {
      if (target === _this17.input.element) {
        _this17.showDropdown(true); // If element is a select box, the focused element is the container and the dropdown
        // isn't already open, focus and show dropdown


        _this17.containerOuter.addFocusState();
      }
    }, _focusActions);
    focusActions[this.passedElement.element.type]();
  };

  _proto._onBlur = function _onBlur(_ref12) {
    var _this18 = this;

    var target = _ref12.target;
    var blurWasWithinContainer = this.containerOuter.element.contains(target);

    if (blurWasWithinContainer && !this._isScrollingOnIe) {
      var _blurActions;

      var activeItems = this._store.activeItems;
      var hasHighlightedItems = activeItems.some(function (item) {
        return item.highlighted;
      });
      var blurActions = (_blurActions = {}, _blurActions[TEXT_TYPE] = function () {
        if (target === _this18.input.element) {
          _this18.containerOuter.removeFocusState();

          if (hasHighlightedItems) {
            _this18.unhighlightAll();
          }

          _this18.hideDropdown(true);
        }
      }, _blurActions[SELECT_ONE_TYPE] = function () {
        _this18.containerOuter.removeFocusState();

        if (target === _this18.input.element || target === _this18.containerOuter.element && !_this18._canSearch) {
          _this18.hideDropdown(true);
        }
      }, _blurActions[SELECT_MULTIPLE_TYPE] = function () {
        if (target === _this18.input.element) {
          _this18.containerOuter.removeFocusState();

          _this18.hideDropdown(true);

          if (hasHighlightedItems) {
            _this18.unhighlightAll();
          }
        }
      }, _blurActions);
      blurActions[this.passedElement.element.type]();
    } else {
      // On IE11, clicking the scollbar blurs our input and thus
      // closes the dropdown. To stop this, we refocus our input
      // if we know we are on IE *and* are scrolling.
      this._isScrollingOnIe = false;
      this.input.element.focus();
    }
  };

  _proto._onFormReset = function _onFormReset() {
    this._store.dispatch(resetTo(this._initialState));
  };

  _proto._highlightChoice = function _highlightChoice(el) {
    var _this19 = this;

    if (el === void 0) {
      el = null;
    }

    var choices = Array.from(this.dropdown.element.querySelectorAll('[data-choice-selectable]'));

    if (!choices.length) {
      return;
    }

    var passedEl = el;
    var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll("." + this.config.classNames.highlightedState)); // Remove any highlighted choices

    highlightedChoices.forEach(function (choice) {
      choice.classList.remove(_this19.config.classNames.highlightedState);
      choice.setAttribute('aria-selected', 'false');
    });

    if (passedEl) {
      this._highlightPosition = choices.indexOf(passedEl);
    } else {
      // Highlight choice based on last known highlight location
      if (choices.length > this._highlightPosition) {
        // If we have an option to highlight
        passedEl = choices[this._highlightPosition];
      } else {
        // Otherwise highlight the option before
        passedEl = choices[choices.length - 1];
      }

      if (!passedEl) {
        passedEl = choices[0];
      }
    }

    passedEl.classList.add(this.config.classNames.highlightedState);
    passedEl.setAttribute('aria-selected', 'true');
    this.passedElement.triggerEvent(EVENTS.highlightChoice, {
      el: passedEl
    });

    if (this.dropdown.isActive) {
      // IE11 ignores aria-label and blocks virtual keyboard
      // if aria-activedescendant is set without a dropdown
      this.input.setActiveDescendant(passedEl.id);
      this.containerOuter.setActiveDescendant(passedEl.id);
    }
  };

  _proto._addItem = function _addItem(_ref13) {
    var value = _ref13.value,
        _ref13$label = _ref13.label,
        label = _ref13$label === void 0 ? null : _ref13$label,
        _ref13$choiceId = _ref13.choiceId,
        choiceId = _ref13$choiceId === void 0 ? -1 : _ref13$choiceId,
        _ref13$groupId = _ref13.groupId,
        groupId = _ref13$groupId === void 0 ? -1 : _ref13$groupId,
        _ref13$customProperti = _ref13.customProperties,
        customProperties = _ref13$customProperti === void 0 ? null : _ref13$customProperti,
        _ref13$placeholder = _ref13.placeholder,
        placeholder = _ref13$placeholder === void 0 ? false : _ref13$placeholder,
        _ref13$keyCode = _ref13.keyCode,
        keyCode = _ref13$keyCode === void 0 ? null : _ref13$keyCode;
    var passedValue = typeof value === 'string' ? value.trim() : value;
    var passedKeyCode = keyCode;
    var passedCustomProperties = customProperties;
    var items = this._store.items;
    var passedLabel = label || passedValue;
    var passedOptionId = choiceId || -1;
    var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
    var id = items ? items.length + 1 : 1; // If a prepended value has been passed, prepend it

    if (this.config.prependValue) {
      passedValue = this.config.prependValue + passedValue.toString();
    } // If an appended value has been passed, append it


    if (this.config.appendValue) {
      passedValue += this.config.appendValue.toString();
    }

    this._store.dispatch(items_addItem({
      value: passedValue,
      label: passedLabel,
      id: id,
      choiceId: passedOptionId,
      groupId: groupId,
      customProperties: customProperties,
      placeholder: placeholder,
      keyCode: passedKeyCode
    }));

    if (this._isSelectOneElement) {
      this.removeActiveItems(id);
    } // Trigger change event


    this.passedElement.triggerEvent(EVENTS.addItem, {
      id: id,
      value: passedValue,
      label: passedLabel,
      customProperties: passedCustomProperties,
      groupValue: group && group.value ? group.value : undefined,
      keyCode: passedKeyCode
    });
    return this;
  };

  _proto._removeItem = function _removeItem(item) {
    if (!item || !isType('Object', item)) {
      return this;
    }

    var id = item.id,
        value = item.value,
        label = item.label,
        choiceId = item.choiceId,
        groupId = item.groupId;
    var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;

    this._store.dispatch(items_removeItem(id, choiceId));

    if (group && group.value) {
      this.passedElement.triggerEvent(EVENTS.removeItem, {
        id: id,
        value: value,
        label: label,
        groupValue: group.value
      });
    } else {
      this.passedElement.triggerEvent(EVENTS.removeItem, {
        id: id,
        value: value,
        label: label
      });
    }

    return this;
  };

  _proto._addChoice = function _addChoice(_ref14) {
    var value = _ref14.value,
        _ref14$label = _ref14.label,
        label = _ref14$label === void 0 ? null : _ref14$label,
        _ref14$isSelected = _ref14.isSelected,
        isSelected = _ref14$isSelected === void 0 ? false : _ref14$isSelected,
        _ref14$isDisabled = _ref14.isDisabled,
        isDisabled = _ref14$isDisabled === void 0 ? false : _ref14$isDisabled,
        _ref14$groupId = _ref14.groupId,
        groupId = _ref14$groupId === void 0 ? -1 : _ref14$groupId,
        _ref14$customProperti = _ref14.customProperties,
        customProperties = _ref14$customProperti === void 0 ? null : _ref14$customProperti,
        _ref14$placeholder = _ref14.placeholder,
        placeholder = _ref14$placeholder === void 0 ? false : _ref14$placeholder,
        _ref14$keyCode = _ref14.keyCode,
        keyCode = _ref14$keyCode === void 0 ? null : _ref14$keyCode;

    if (typeof value === 'undefined' || value === null) {
      return;
    } // Generate unique id


    var choices = this._store.choices;
    var choiceLabel = label || value;
    var choiceId = choices ? choices.length + 1 : 1;
    var choiceElementId = this._baseId + "-" + this._idNames.itemChoice + "-" + choiceId;

    this._store.dispatch(choices_addChoice({
      id: choiceId,
      groupId: groupId,
      elementId: choiceElementId,
      value: value,
      label: choiceLabel,
      disabled: isDisabled,
      customProperties: customProperties,
      placeholder: placeholder,
      keyCode: keyCode
    }));

    if (isSelected) {
      this._addItem({
        value: value,
        label: choiceLabel,
        choiceId: choiceId,
        customProperties: customProperties,
        placeholder: placeholder,
        keyCode: keyCode
      });
    }
  };

  _proto._addGroup = function _addGroup(_ref15) {
    var _this20 = this;

    var group = _ref15.group,
        id = _ref15.id,
        _ref15$valueKey = _ref15.valueKey,
        valueKey = _ref15$valueKey === void 0 ? 'value' : _ref15$valueKey,
        _ref15$labelKey = _ref15.labelKey,
        labelKey = _ref15$labelKey === void 0 ? 'label' : _ref15$labelKey;
    var groupChoices = isType('Object', group) ? group.choices : Array.from(group.getElementsByTagName('OPTION'));
    var groupId = id || Math.floor(new Date().valueOf() * Math.random());
    var isDisabled = group.disabled ? group.disabled : false;

    if (groupChoices) {
      this._store.dispatch(groups_addGroup({
        value: group.label,
        id: groupId,
        active: true,
        disabled: isDisabled
      }));

      var addGroupChoices = function addGroupChoices(choice) {
        var isOptDisabled = choice.disabled || choice.parentNode && choice.parentNode.disabled;

        _this20._addChoice({
          value: choice[valueKey],
          label: isType('Object', choice) ? choice[labelKey] : choice.innerHTML,
          isSelected: choice.selected,
          isDisabled: isOptDisabled,
          groupId: groupId,
          customProperties: choice.customProperties,
          placeholder: choice.placeholder
        });
      };

      groupChoices.forEach(addGroupChoices);
    } else {
      this._store.dispatch(groups_addGroup({
        value: group.label,
        id: group.id,
        active: false,
        disabled: group.disabled
      }));
    }
  };

  _proto._getTemplate = function _getTemplate(template) {
    var _this$_templates$temp;

    if (!template) {
      return null;
    }

    var classNames = this.config.classNames;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_this$_templates$temp = this._templates[template]).call.apply(_this$_templates$temp, [this, classNames].concat(args));
  };

  _proto._createTemplates = function _createTemplates() {
    var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
    var userTemplates = {};

    if (callbackOnCreateTemplates && typeof callbackOnCreateTemplates === 'function') {
      userTemplates = callbackOnCreateTemplates.call(this, strToEl);
    }

    this._templates = cjs_default()(TEMPLATES, userTemplates);
  };

  _proto._createElements = function _createElements() {
    this.containerOuter = new container_Container({
      element: this._getTemplate('containerOuter', this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      position: this.config.position
    });
    this.containerInner = new container_Container({
      element: this._getTemplate('containerInner'),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      position: this.config.position
    });
    this.input = new input_Input({
      element: this._getTemplate('input', this._placeholderValue),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      preventPaste: !this.config.paste
    });
    this.choiceList = new list_List({
      element: this._getTemplate('choiceList', this._isSelectOneElement)
    });
    this.itemList = new list_List({
      element: this._getTemplate('itemList', this._isSelectOneElement)
    });
    this.dropdown = new Dropdown({
      element: this._getTemplate('dropdown'),
      classNames: this.config.classNames,
      type: this.passedElement.element.type
    });
  };

  _proto._createStructure = function _createStructure() {
    // Hide original element
    this.passedElement.conceal(); // Wrap input in container preserving DOM ordering

    this.containerInner.wrap(this.passedElement.element); // Wrapper inner container with outer container

    this.containerOuter.wrap(this.containerInner.element);

    if (this._isSelectOneElement) {
      this.input.placeholder = this.config.searchPlaceholderValue || '';
    } else if (this._placeholderValue) {
      this.input.placeholder = this._placeholderValue;
      this.input.setWidth();
    }

    this.containerOuter.element.appendChild(this.containerInner.element);
    this.containerOuter.element.appendChild(this.dropdown.element);
    this.containerInner.element.appendChild(this.itemList.element);

    if (!this._isTextElement) {
      this.dropdown.element.appendChild(this.choiceList.element);
    }

    if (!this._isSelectOneElement) {
      this.containerInner.element.appendChild(this.input.element);
    } else if (this.config.searchEnabled) {
      this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild);
    }

    if (this._isSelectElement) {
      this._highlightPosition = 0;
      this._isSearching = false;

      this._startLoading();

      if (this._presetGroups.length) {
        this._addPredefinedGroups(this._presetGroups);
      } else {
        this._addPredefinedChoices(this._presetChoices);
      }

      this._stopLoading();
    }

    if (this._isTextElement) {
      this._addPredefinedItems(this._presetItems);
    }
  };

  _proto._addPredefinedGroups = function _addPredefinedGroups(groups) {
    var _this21 = this;

    // If we have a placeholder option
    var placeholderChoice = this.passedElement.placeholderOption;

    if (placeholderChoice && placeholderChoice.parentNode.tagName === 'SELECT') {
      this._addChoice({
        value: placeholderChoice.value,
        label: placeholderChoice.innerHTML,
        isSelected: placeholderChoice.selected,
        isDisabled: placeholderChoice.disabled,
        placeholder: true
      });
    }

    groups.forEach(function (group) {
      return _this21._addGroup({
        group: group,
        id: group.id || null
      });
    });
  };

  _proto._addPredefinedChoices = function _addPredefinedChoices(choices) {
    var _this22 = this;

    // If sorting is enabled or the user is searching, filter choices
    if (this.config.shouldSort) {
      choices.sort(this.config.sorter);
    }

    var hasSelectedChoice = choices.some(function (choice) {
      return choice.selected;
    });
    var firstEnabledChoiceIndex = choices.findIndex(function (choice) {
      return choice.disabled === undefined || !choice.disabled;
    });
    choices.forEach(function (choice, index) {
      var value = choice.value,
          label = choice.label,
          customProperties = choice.customProperties,
          placeholder = choice.placeholder;

      if (_this22._isSelectElement) {
        // If the choice is actually a group
        if (choice.choices) {
          _this22._addGroup({
            group: choice,
            id: choice.id || null
          });
        } else {
          /**
           * If there is a selected choice already or the choice is not the first in
           * the array, add each choice normally.
           *
           * Otherwise we pre-select the first enabled choice in the array ("select-one" only)
           */
          var shouldPreselect = _this22._isSelectOneElement && !hasSelectedChoice && index === firstEnabledChoiceIndex;
          var isSelected = shouldPreselect ? true : choice.selected;
          var isDisabled = choice.disabled;

          _this22._addChoice({
            value: value,
            label: label,
            isSelected: isSelected,
            isDisabled: isDisabled,
            customProperties: customProperties,
            placeholder: placeholder
          });
        }
      } else {
        _this22._addChoice({
          value: value,
          label: label,
          isSelected: choice.selected,
          isDisabled: choice.disabled,
          customProperties: customProperties,
          placeholder: placeholder
        });
      }
    });
  }
  /**
   * @param {Item[]} items
   */
  ;

  _proto._addPredefinedItems = function _addPredefinedItems(items) {
    var _this23 = this;

    items.forEach(function (item) {
      if (typeof item === 'object' && item.value) {
        _this23._addItem({
          value: item.value,
          label: item.label,
          choiceId: item.id,
          customProperties: item.customProperties,
          placeholder: item.placeholder
        });
      }

      if (typeof item === 'string') {
        _this23._addItem({
          value: item
        });
      }
    });
  };

  _proto._setChoiceOrItem = function _setChoiceOrItem(item) {
    var _this24 = this;

    var itemType = getType(item).toLowerCase();
    var handleType = {
      object: function object() {
        if (!item.value) {
          return;
        } // If we are dealing with a select input, we need to create an option first
        // that is then selected. For text inputs we can just add items normally.


        if (!_this24._isTextElement) {
          _this24._addChoice({
            value: item.value,
            label: item.label,
            isSelected: true,
            isDisabled: false,
            customProperties: item.customProperties,
            placeholder: item.placeholder
          });
        } else {
          _this24._addItem({
            value: item.value,
            label: item.label,
            choiceId: item.id,
            customProperties: item.customProperties,
            placeholder: item.placeholder
          });
        }
      },
      string: function string() {
        if (!_this24._isTextElement) {
          _this24._addChoice({
            value: item,
            label: item,
            isSelected: true,
            isDisabled: false
          });
        } else {
          _this24._addItem({
            value: item
          });
        }
      }
    };
    handleType[itemType]();
  };

  _proto._findAndSelectChoiceByValue = function _findAndSelectChoiceByValue(val) {
    var _this25 = this;

    var choices = this._store.choices; // Check 'value' property exists and the choice isn't already selected

    var foundChoice = choices.find(function (choice) {
      return _this25.config.valueComparer(choice.value, val);
    });

    if (foundChoice && !foundChoice.selected) {
      this._addItem({
        value: foundChoice.value,
        label: foundChoice.label,
        choiceId: foundChoice.id,
        groupId: foundChoice.groupId,
        customProperties: foundChoice.customProperties,
        placeholder: foundChoice.placeholder,
        keyCode: foundChoice.keyCode
      });
    }
  };

  _proto._generatePlaceholderValue = function _generatePlaceholderValue() {
    if (this._isSelectElement) {
      var placeholderOption = this.passedElement.placeholderOption;
      return placeholderOption ? placeholderOption.text : false;
    }

    var _this$config4 = this.config,
        placeholder = _this$config4.placeholder,
        placeholderValue = _this$config4.placeholderValue;
    var dataset = this.passedElement.element.dataset;

    if (placeholder) {
      if (placeholderValue) {
        return placeholderValue;
      }

      if (dataset.placeholder) {
        return dataset.placeholder;
      }
    }

    return false;
  };

  return Choices;
}();

/* harmony default export */ var scripts_choices = __webpack_exports__["default"] = (choices_Choices);

/***/ })
/******/ ])["default"];
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

if (!Element.prototype.scrollIntoViewIfNeeded) {
  Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
    var parent = this.parentNode,
        parentComputedStyle = window.getComputedStyle(parent, null),
        parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
        parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
        overBottom = this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth > parent.scrollTop + parent.clientHeight,
        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
        overRight = this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth > parent.scrollLeft + parent.clientWidth,
        alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centerIfNeeded) {
      parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
    }

    if ((overLeft || overRight) && centerIfNeeded) {
      parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
    }

    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
      this.scrollIntoView(alignWithTop);
    }
  };
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modals_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modals", function() { return modals; });
/* harmony import */ var focus_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var focus_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_manager__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // USAGE
// add 1 wrapper for all modals before end of the tag </body>
// EXAMPLE:
// <div calss="modal-overlay hidden" data-modal-overlay> ... here goes list of modals </div>
// then add modal inside, using template modal.pug. add unic value for attr "data-modal" in modal, EXAMPLE: data-modal="my-modal"
// add this value for attr "data-modal-for" in a button, it triggers modal opening, EXAMPLE: <button data-modal-for="my-modal"></button>
// button with attr "data-close-modal" - will close modal. EXAMPLE: <button data-close-modal></button>
// if you need to open modal on some event, just call modals.open('modal-name')

var Modals = /*#__PURE__*/function () {
  function Modals() {
    _classCallCheck(this, Modals);

    this.modalSelector = '[data-modal]';
    this.overflowClass = 'modal-open';
    this.classHidden = 'hidden';
    this.overlayAttr = 'data-modal-overlay';
    this.modals = _toConsumableArray(document.querySelectorAll(this.modalSelector));
    this.overlay = document.querySelector("[".concat(this.overlayAttr, "]"));
    this.openButtons = _toConsumableArray(document.querySelectorAll('[data-modal-for]'));
    this.closeButtons = _toConsumableArray(document.querySelectorAll('[data-close-modal]'));
    this.body = document.querySelector('body');
    this.inFocus = null;
    this.onKeyUpWindowHandler = null;
    this.overlayClickHandler = null;
  }

  _createClass(Modals, [{
    key: "openHandler",
    value: function openHandler() {
      var _this = this;

      this.openButtons.forEach(function (button) {
        var forModal = button.dataset.modalFor;
        button.addEventListener('click', function (e) {
          e.preventDefault();

          _this.open(forModal);
        });
      });
    }
  }, {
    key: "closeHandler",
    value: function closeHandler() {
      var _this2 = this;

      this.closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          var currModal = button.closest(_this2.modalSelector);

          _this2.close(currModal);
        });
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this3 = this;

      var modal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.modals.find(function (m) {
        return !m.classList.contains(_this3.classHidden);
      });
      if (!modal) return;
      var closeModalEvent = new CustomEvent('onCloseModal');
      modal.dispatchEvent(closeModalEvent);
      focus_manager__WEBPACK_IMPORTED_MODULE_0___default.a.release();
      modal.classList.add(this.classHidden);
      modal.setAttribute('tabindex', 1);
      if (this.modals.find(function (m) {
        return !m.classList.contains(_this3.classHidden);
      })) return;
      this.inFocus.focus();
      this.body.classList.remove(this.overflowClass);
      this.overlay.classList.add(this.classHidden);
      document.removeEventListener('keyup', this.onKeyUpWindowHandler);
      this.overlay.removeEventListener('click', this.overlayClickHandler);
    }
  }, {
    key: "open",
    value: function open(forModal, callback) {
      var _this4 = this;

      var modal = this.modals.find(function (m) {
        return m.dataset.modal === forModal;
      });
      if (!modal) return;
      var currentOpenModal = this.modals.find(function (m) {
        return !m.classList.contains(_this4.classHidden);
      });

      if (currentOpenModal === modal) {
        this.close(modal);
        return;
      }

      modal.classList.remove(this.classHidden);
      modal.setAttribute('tabindex', -1);
      setTimeout(function () {
        modal.focus();
        focus_manager__WEBPACK_IMPORTED_MODULE_0___default.a.capture(modal);
      }, 100);

      if (currentOpenModal) {
        this.close(currentOpenModal);
        return;
      }

      this.inFocus = document.activeElement;
      this.overlay.classList.remove(this.classHidden);
      this.body.classList.add(this.overflowClass);

      this.onKeyUpWindowHandler = function (e) {
        if (e.key !== 'Escape' || e.keyCode !== 27) return;

        var curModal = _this4.modals.find(function (m) {
          return !m.classList.contains(_this4.classHidden);
        });

        if (!curModal) return;

        _this4.close(curModal);
      };

      document.addEventListener('keyup', this.onKeyUpWindowHandler);

      this.overlayClickHandler = function (e) {
        if (!e.target.hasAttribute(_this4.overlayAttr)) return;

        _this4.close();
      };

      this.overlay.addEventListener('click', this.overlayClickHandler);

      if (callback) {
        callback(modal);
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.openHandler();
      this.closeHandler();
    }
  }]);

  return Modals;
}(); // init modals



var modals = new Modals();
modals.init();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function() {
"use strict";

function isAncestor(ancestor, descendant) {
	var element = descendant;
	while (element) {
		if (element === ancestor) {
			return true;
		}
		element = element.parentElement;
	}

	return false;
}

function isDisabled(element) {
	return element.disabled === true;
}

function isFocusable(element) {
	return Boolean(element) && element.tabIndex >= 0 && !isDisabled(element);
}

function makeFocusable(element) {
	// A tabIndex is needed to make the element focusable
	// A tabIndex of -1 means that the element is only programmatically focusable
	if (isDisabled(element)) {
		element.disabled = false;
	}

	if (!isFocusable(element)) {
		element.tabIndex = -1;
	}
}

// Find the first focusable element.
// The candidates are the element and it's descendants.
// The search is performed depth-first.
function findFirstFocusableElement(element) {
	if (isFocusable(element)) {
		return element;
	}

	var children = element.children;
	var length = children.length;
	var child;
	var focusableDescendant;

	for (var i = 0; i < length; i += 1) {
		child = children[i];

		focusableDescendant = findFirstFocusableElement(child);

		if (focusableDescendant) {
			return focusableDescendant;
		}
	}

	return null;
}

// Find the first focusable element.
// The candidates are the element and it's descendants.
// The search is performed depth-first.
function findLastFocusableElement(element) {
	var children = element.children;
	var length = children.length;
	var child;
	var focusableDescendant;

	for (var i = length -1; i >= 0; i -= 1) {
		child = children[i];

		focusableDescendant = findLastFocusableElement(child);

		if (focusableDescendant) {
			return focusableDescendant;
		}
	}

	if (isFocusable(element)) {
		return element;
	}

	return null;
}

function focus(element) {
	makeFocusable(element);
	element.focus();
	state.lastFocus = element;
}

function resolveFocus(parent, defaultFocus) {
	var focusElement;

	if (defaultFocus) {
		focusElement = defaultFocus;
	} else {
		focusElement = findFirstFocusableElement(parent) || parent;

		if (focusElement === state.lastFocus) {
			focusElement = findLastFocusableElement(parent) || parent;
		}
	}

	focus(focusElement);
}

function focusFirstInElement(element) {
	var focusElement = findFirstFocusableElement(element) || element;
	focus(focusElement);
}

function focusLastInElement(element) {
	var focusElement = findLastFocusableElement(element) || element;
	focus(focusElement);
}

// State is kept is these variables.
// Since only one modal dialog can capture focus at a time the state is a singleton.
var state = {
	eventListenerArguments: null,
	eventListenerContext: null,
	lastFocus: null
};

function releaseModalFocus(focusElement) {
	var eventListenerContext = state.eventListenerContext;
	var eventListenerArguments = state.eventListenerArguments;

	if (eventListenerContext && eventListenerArguments) {
		eventListenerContext.removeEventListener.apply(eventListenerContext, eventListenerArguments);
	}

	// Reset the state object
	state.eventListenerContext = null;
	state.eventListenerArguments = null;
	state.lastFocus = null;

	if (focusElement) {
		focusElement.focus();
	}
}

// Keep focus inside the modal
function restrictFocus(modal, focusedElement) {
	if (isAncestor(modal, focusedElement)) {
		state.lastFocus = focusedElement;
	} else {
		resolveFocus(modal);
	}
}

// modal, the element in which to contain focus
// focusElement (optional), the element inside the modal to focus when opening
// backgroundElement (optional), All focus events within this element are redirected to the modal. Defaults to document
function captureModalFocus(modal, focusElement, backgroundElement) {

	// without a modal there is nothing to capture
	if (!modal) {
		return null;
	}

	// If any focus is already being captured, release it now
	releaseModalFocus();

	// focus the modal so the user knows it was opened
	resolveFocus(modal, focusElement);

	// Whenever an element outside of the modal is focused, the modal is focused instead
	function focusCallback(evnt) {
		restrictFocus(modal, evnt.target);
	}

	// The focus event does not bubble
	// however it can be captured on an ancestor element
	// by setting useCapture to true
	var eventListenerContext = backgroundElement || document;
	var eventListenerArguments = ["focus", focusCallback, true];

	// Save the eventListener data in the state object so it can be removed later
	// by the releaseModalFocus function
	state.eventListenerContext = eventListenerContext;
	state.eventListenerArguments = eventListenerArguments;

	eventListenerContext.addEventListener.apply(eventListenerContext, eventListenerArguments);
}

var focusManager = {
	capture: captureModalFocus,
	release: releaseModalFocus,
	focusFirstInElement: focusFirstInElement,
	focusLastInElement: focusLastInElement
};
return focusManager;
}));


/***/ }),
/* 8 */
/***/ (function(module, exports) {

{
  var createIframe = function createIframe(id) {
    var iframe = document.createElement('iframe');
    var url = "https://www.youtube.com/embed/".concat(id, "?rel=0&showinfo=0&enablejsapi=1&autoplay=1");
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', url);
    iframe.classList.add('youtube-video-media');
    return iframe;
  };

  var setupVideo = function setupVideo(video) {
    var link = video.querySelector('.js-youtube-video-link');
    var button = video.querySelector('.js-yotube-play-btn');
    var id = video.dataset.youtubeid;
    video.addEventListener('click', function () {
      var iframe = createIframe(id);
      link.remove();
      button.remove();
      video.appendChild(iframe);
    });
    link.removeAttribute('href');
    video.classList.add('enabled');
  };

  var findVideos = function findVideos() {
    var videos = document.querySelectorAll('.js-youtube-video');
    videos.forEach(setupVideo);
  };

  findVideos();
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

{
  var dropdownMenuOpenHandler = document.querySelector('.js-dropdown-menu-open');
  var dropdownMenuCloseHandler = document.querySelector('.js-dropdown-menu-close');
  var dropdownMenuMob = document.querySelector('.js-dropdown-menu-mob');
  var dropdownMenuMobVisible = 'nav-mob-visible';
  var dropdownMenuTablet = document.querySelector('.js-dropdown-menu-tablet');
  var dropdownMenuTabletVisible = 'nav-tablet-visible';
  dropdownMenuOpenHandler && dropdownMenuOpenHandler.addEventListener('click', function (event) {
    event.stopPropagation();

    if (window.matchMedia('(max-width: 1365px)').matches) {
      event.preventDefault();
    }

    if (window.matchMedia('(max-width: 767px)').matches) {
      dropdownMenuMob.classList.toggle(dropdownMenuMobVisible);
      document.body.classList.toggle('overflow-hidden');
    }

    if (window.matchMedia('(min-width: 768px) and (max-width: 1365px)').matches) {
      dropdownMenuTablet && dropdownMenuTablet.classList.toggle(dropdownMenuTabletVisible);
    }
  });

  var hideMobMenu = function hideMobMenu() {
    dropdownMenuMob.classList.remove(dropdownMenuMobVisible);
    document.body.classList.remove('overflow-hidden');
  };

  dropdownMenuCloseHandler && dropdownMenuCloseHandler.addEventListener('click', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      hideMobMenu();
    }
  });
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 768px)').matches && dropdownMenuMob.classList.contains(dropdownMenuMobVisible)) {
      hideMobMenu();
    }

    if (window.matchMedia('(min-width: 1366px)').matches && dropdownMenuTablet && dropdownMenuTablet.classList.contains(dropdownMenuTabletVisible)) {
      dropdownMenuTablet.classList.remove(dropdownMenuTabletVisible);
    }
  });
  dropdownMenuTablet && dropdownMenuTablet.addEventListener('click', function (event) {
    event.stopPropagation();
  });
  dropdownMenuTablet && document.addEventListener('click', function () {
    if (dropdownMenuTablet.classList.contains(dropdownMenuTabletVisible)) {
      dropdownMenuTablet.classList.remove(dropdownMenuTabletVisible);
    }
  });
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var UiComponents_field_select_field_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var Utils_form_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



{
  // custom select init
  var selectList = [{
    value: 'должность 1',
    label: 'Должность 1'
  }, {
    value: 'должность 2',
    label: 'Должность 2'
  }, {
    value: 'должность 3',
    label: 'Должность 3'
  }, {
    value: 'должность 4',
    label: 'Должность 4'
  }, {
    value: 'должность 5',
    label: 'Должность 5'
  }, {
    value: 'должность 6',
    label: 'Должность 6'
  }];
  var positionSelect = Object(UiComponents_field_select_field_select__WEBPACK_IMPORTED_MODULE_0__["fieldSelect"])({
    className: '.js-register-position',
    selectList: selectList
  }); // form submit

  var form = document.querySelector('.js-register-form');

  if (form) {
    var _constraints;

    var formModal = form.closest('[data-modal]');
    var constraints = (_constraints = {}, _defineProperty(_constraints, 'register-email', {
      presence: {
        message: "^Обязательное поле"
      },
      email: {
        message: "^Неверный формат"
      }
    }), _defineProperty(_constraints, 'register-position', {
      presence: {
        message: "^Обязательное поле"
      }
    }), _constraints);

    var successCallback = function successCallback() {
      var submitBtn = form.querySelector('[type="submit"]');
      var url = 'url';
      var data = {};
      new FormData(form).forEach(function (value, key) {
        return data[key] = value;
      });
      submitBtn.disabled = true;
      console.log(data);
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(function (response) {
        submitBtn.disabled = false;
        return response.json();
      }).then(function () {
        form.reset();
      })["catch"](function (err) {
        console.error(err);
      });
    };

    form.addEventListener('change', function () {
      Object(Utils_form_validation__WEBPACK_IMPORTED_MODULE_1__["handleFormChange"])({
        form: form,
        constraints: constraints
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      Object(Utils_form_validation__WEBPACK_IMPORTED_MODULE_1__["handleFormSubmit"])({
        form: form,
        constraints: constraints,
        successCallback: successCallback
      });
    });
    formModal.addEventListener('onCloseModal', function () {
      Object(Utils_form_validation__WEBPACK_IMPORTED_MODULE_1__["handleFormResset"])({
        form: form
      });
      positionSelect.destroy();
      positionSelect.init();
    });
  }
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fieldSelect", function() { return fieldSelect; });
/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(choices_js__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


function fieldSelect(_ref) {
  var className = _ref.className,
      selectList = _ref.selectList,
      onSelectCallback = _ref.onSelectCallback,
      rest = _objectWithoutProperties(_ref, ["className", "selectList", "onSelectCallback"]);

  var selectElement = document.querySelector(className);

  if (selectElement) {
    var choices = new choices_js__WEBPACK_IMPORTED_MODULE_0___default.a(selectElement, _objectSpread({
      searchEnabled: false,
      shouldSort: false,
      choices: selectList,
      resetScrollPosition: true,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices field-type-select'
      }
    }, rest));
    selectElement.addEventListener('showDropdown', function () {
      var dropdown = choices.choiceList.element;
      var selectedOption = dropdown.querySelector('.is-selected');
      selectedOption && selectedOption.scrollIntoViewIfNeeded();
    });
    onSelectCallback && selectElement.addEventListener('change', function (e) {
      onSelectCallback(e.detail.value);
    }, false);
    return choices;
  }
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleFormSubmit", function() { return handleFormSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleFormChange", function() { return handleFormChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleFormResset", function() { return handleFormResset; });
/* harmony import */ var validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var validate_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validate_js__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function handleFormSubmit(_ref) {
  var _ref$formData = _ref.formData,
      formData = _ref$formData === void 0 ? null : _ref$formData,
      form = _ref.form,
      constraints = _ref.constraints,
      successCallback = _ref.successCallback;
  var errors = validate_js__WEBPACK_IMPORTED_MODULE_0___default()(formData || form, constraints);
  form.classList.add('was-submitted');
  errorHandler(form, errors || {});
  focusOnErrorField(form);

  if (!errors) {
    successCallback && successCallback();
  }
}
function handleFormChange(_ref2) {
  var _ref2$formData = _ref2.formData,
      formData = _ref2$formData === void 0 ? null : _ref2$formData,
      form = _ref2.form,
      constraints = _ref2.constraints;
  if (!form.classList.contains('was-submitted')) return;
  var errors = validate_js__WEBPACK_IMPORTED_MODULE_0___default()(formData || form, constraints);
  errorHandler(form, errors || {});
}
function handleFormResset(_ref3) {
  var form = _ref3.form;
  form.reset();
  form.classList.remove('was-submitted');
  errorHandler(form, {});
}

function errorHandler(form, errors) {
  _toConsumableArray(form.querySelectorAll('input[name], select[name], textarea[name]')).forEach(function (input) {
    var errorText = errors && errors[input.name];
    var formControl = input.closest('.form-control');
    var errorBlock = formControl && formControl.querySelector('.form-error');

    if (formControl) {
      errorText ? formControl.classList.add('invalid') : formControl.classList.remove('invalid');
    }

    if (errorBlock) {
      errorBlock.innerText = errorText || '';
    }
  });
}

function focusOnErrorField(form) {
  var firstInvalidField = _toConsumableArray(form.querySelectorAll('input[name], select[name], textarea[name]')).find(function (input) {
    var formControl = input.closest('.form-control');
    return formControl === null || formControl === void 0 ? void 0 : formControl.classList.contains('invalid');
  });

  firstInvalidField === null || firstInvalidField === void 0 ? void 0 : firstInvalidField.focus();
  var parentEl = firstInvalidField === null || firstInvalidField === void 0 ? void 0 : firstInvalidField.closest('.form-control');
  parentEl === null || parentEl === void 0 ? void 0 : parentEl.scrollIntoViewIfNeeded();
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*!
 * validate.js 0.13.1
 *
 * (c) 2013-2019 Nicklas Ansman, 2013 Wrapp
 * Validate.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://validatejs.org/
 */

(function(exports, module, define) {
  "use strict";

  // The main function that calls the validators specified by the constraints.
  // The options are the following:
  //   - format (string) - An option that controls how the returned value is formatted
  //     * flat - Returns a flat array of just the error messages
  //     * grouped - Returns the messages grouped by attribute (default)
  //     * detailed - Returns an array of the raw validation data
  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
  //
  // Please note that the options are also passed to each validator.
  var validate = function(attributes, constraints, options) {
    options = v.extend({}, v.options, options);

    var results = v.runValidations(attributes, constraints, options)
      , attr
      , validator;

    if (results.some(function(r) { return v.isPromise(r.error); })) {
      throw new Error("Use validate.async if you want support for promises");
    }
    return validate.processValidationResults(results, options);
  };

  var v = validate;

  // Copies over attributes from one or more sources to a single destination.
  // Very much similar to underscore's extend.
  // The first argument is the target object and the remaining arguments will be
  // used as sources.
  v.extend = function(obj) {
    [].slice.call(arguments, 1).forEach(function(source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    return obj;
  };

  v.extend(validate, {
    // This is the version of the library as a semver.
    // The toString function will allow it to be coerced into a string
    version: {
      major: 0,
      minor: 13,
      patch: 1,
      metadata: null,
      toString: function() {
        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
        if (!v.isEmpty(v.version.metadata)) {
          version += "+" + v.version.metadata;
        }
        return version;
      }
    },

    // Below is the dependencies that are used in validate.js

    // The constructor of the Promise implementation.
    // If you are using Q.js, RSVP or any other A+ compatible implementation
    // override this attribute to be the constructor of that promise.
    // Since jQuery promises aren't A+ compatible they won't work.
    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */ null,

    EMPTY_STRING_REGEXP: /^\s*$/,

    // Runs the validators specified by the constraints object.
    // Will return an array of the format:
    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
    runValidations: function(attributes, constraints, options) {
      var results = []
        , attr
        , validatorName
        , value
        , validators
        , validator
        , validatorOptions
        , error;

      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
        attributes = v.collectFormValues(attributes);
      }

      // Loops through each constraints, finds the correct validator and run it.
      for (attr in constraints) {
        value = v.getDeepObjectValue(attributes, attr);
        // This allows the constraints for an attribute to be a function.
        // The function will be called with the value, attribute name, the complete dict of
        // attributes as well as the options and constraints passed in.
        // This is useful when you want to have different
        // validations depending on the attribute value.
        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);

        for (validatorName in validators) {
          validator = v.validators[validatorName];

          if (!validator) {
            error = v.format("Unknown validator %{name}", {name: validatorName});
            throw new Error(error);
          }

          validatorOptions = validators[validatorName];
          // This allows the options to be a function. The function will be
          // called with the value, attribute name, the complete dict of
          // attributes as well as the options and constraints passed in.
          // This is useful when you want to have different
          // validations depending on the attribute value.
          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
          if (!validatorOptions) {
            continue;
          }
          results.push({
            attribute: attr,
            value: value,
            validator: validatorName,
            globalOptions: options,
            attributes: attributes,
            options: validatorOptions,
            error: validator.call(validator,
                value,
                validatorOptions,
                attr,
                attributes,
                options)
          });
        }
      }

      return results;
    },

    // Takes the output from runValidations and converts it to the correct
    // output format.
    processValidationResults: function(errors, options) {
      errors = v.pruneEmptyErrors(errors, options);
      errors = v.expandMultipleErrors(errors, options);
      errors = v.convertErrorMessages(errors, options);

      var format = options.format || "grouped";

      if (typeof v.formatters[format] === 'function') {
        errors = v.formatters[format](errors);
      } else {
        throw new Error(v.format("Unknown format %{format}", options));
      }

      return v.isEmpty(errors) ? undefined : errors;
    },

    // Runs the validations with support for promises.
    // This function will return a promise that is settled when all the
    // validation promises have been completed.
    // It can be called even if no validations returned a promise.
    async: function(attributes, constraints, options) {
      options = v.extend({}, v.async.options, options);

      var WrapErrors = options.wrapErrors || function(errors) {
        return errors;
      };

      // Removes unknown attributes
      if (options.cleanAttributes !== false) {
        attributes = v.cleanAttributes(attributes, constraints);
      }

      var results = v.runValidations(attributes, constraints, options);

      return new v.Promise(function(resolve, reject) {
        v.waitForResults(results).then(function() {
          var errors = v.processValidationResults(results, options);
          if (errors) {
            reject(new WrapErrors(errors, options, attributes, constraints));
          } else {
            resolve(attributes);
          }
        }, function(err) {
          reject(err);
        });
      });
    },

    single: function(value, constraints, options) {
      options = v.extend({}, v.single.options, options, {
        format: "flat",
        fullMessages: false
      });
      return v({single: value}, {single: constraints}, options);
    },

    // Returns a promise that is resolved when all promises in the results array
    // are settled. The promise returned from this function is always resolved,
    // never rejected.
    // This function modifies the input argument, it replaces the promises
    // with the value returned from the promise.
    waitForResults: function(results) {
      // Create a sequence of all the results starting with a resolved promise.
      return results.reduce(function(memo, result) {
        // If this result isn't a promise skip it in the sequence.
        if (!v.isPromise(result.error)) {
          return memo;
        }

        return memo.then(function() {
          return result.error.then(function(error) {
            result.error = error || null;
          });
        });
      }, new v.Promise(function(r) { r(); })); // A resolved promise
    },

    // If the given argument is a call: function the and: function return the value
    // otherwise just return the value. Additional arguments will be passed as
    // arguments to the function.
    // Example:
    // ```
    // result('foo') // 'foo'
    // result(Math.max, 1, 2) // 2
    // ```
    result: function(value) {
      var args = [].slice.call(arguments, 1);
      if (typeof value === 'function') {
        value = value.apply(null, args);
      }
      return value;
    },

    // Checks if the value is a number. This function does not consider NaN a
    // number like many other `isNumber` functions do.
    isNumber: function(value) {
      return typeof value === 'number' && !isNaN(value);
    },

    // Returns false if the object is not a function
    isFunction: function(value) {
      return typeof value === 'function';
    },

    // A simple check to verify that the value is an integer. Uses `isNumber`
    // and a simple modulo check.
    isInteger: function(value) {
      return v.isNumber(value) && value % 1 === 0;
    },

    // Checks if the value is a boolean
    isBoolean: function(value) {
      return typeof value === 'boolean';
    },

    // Uses the `Object` function to check if the given argument is an object.
    isObject: function(obj) {
      return obj === Object(obj);
    },

    // Simply checks if the object is an instance of a date
    isDate: function(obj) {
      return obj instanceof Date;
    },

    // Returns false if the object is `null` of `undefined`
    isDefined: function(obj) {
      return obj !== null && obj !== undefined;
    },

    // Checks if the given argument is a promise. Anything with a `then`
    // function is considered a promise.
    isPromise: function(p) {
      return !!p && v.isFunction(p.then);
    },

    isJqueryElement: function(o) {
      return o && v.isString(o.jquery);
    },

    isDomElement: function(o) {
      if (!o) {
        return false;
      }

      if (!o.querySelectorAll || !o.querySelector) {
        return false;
      }

      if (v.isObject(document) && o === document) {
        return true;
      }

      // http://stackoverflow.com/a/384380/699304
      /* istanbul ignore else */
      if (typeof HTMLElement === "object") {
        return o instanceof HTMLElement;
      } else {
        return o &&
          typeof o === "object" &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === "string";
      }
    },

    isEmpty: function(value) {
      var attr;

      // Null and undefined are empty
      if (!v.isDefined(value)) {
        return true;
      }

      // functions are non empty
      if (v.isFunction(value)) {
        return false;
      }

      // Whitespace only strings are empty
      if (v.isString(value)) {
        return v.EMPTY_STRING_REGEXP.test(value);
      }

      // For arrays we use the length property
      if (v.isArray(value)) {
        return value.length === 0;
      }

      // Dates have no attributes but aren't empty
      if (v.isDate(value)) {
        return false;
      }

      // If we find at least one property we consider it non empty
      if (v.isObject(value)) {
        for (attr in value) {
          return false;
        }
        return true;
      }

      return false;
    },

    // Formats the specified strings with the given values like so:
    // ```
    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
    // ```
    // If you want to write %{...} without having it replaced simply
    // prefix it with % like this `Foo: %%{foo}` and it will be returned
    // as `"Foo: %{foo}"`
    format: v.extend(function(str, vals) {
      if (!v.isString(str)) {
        return str;
      }
      return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
        if (m1 === '%') {
          return "%{" + m2 + "}";
        } else {
          return String(vals[m2]);
        }
      });
    }, {
      // Finds %{key} style patterns in the given string
      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
    }),

    // "Prettifies" the given string.
    // Prettifying means replacing [.\_-] with spaces as well as splitting
    // camel case words.
    prettify: function(str) {
      if (v.isNumber(str)) {
        // If there are more than 2 decimals round it to two
        if ((str * 100) % 1 === 0) {
          return "" + str;
        } else {
          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
        }
      }

      if (v.isArray(str)) {
        return str.map(function(s) { return v.prettify(s); }).join(", ");
      }

      if (v.isObject(str)) {
        if (!v.isDefined(str.toString)) {
          return JSON.stringify(str);
        }

        return str.toString();
      }

      // Ensure the string is actually a string
      str = "" + str;

      return str
        // Splits keys separated by periods
        .replace(/([^\s])\.([^\s])/g, '$1 $2')
        // Removes backslashes
        .replace(/\\+/g, '')
        // Replaces - and - with space
        .replace(/[_-]/g, ' ')
        // Splits camel cased words
        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
          return "" + m1 + " " + m2.toLowerCase();
        })
        .toLowerCase();
    },

    stringifyValue: function(value, options) {
      var prettify = options && options.prettify || v.prettify;
      return prettify(value);
    },

    isString: function(value) {
      return typeof value === 'string';
    },

    isArray: function(value) {
      return {}.toString.call(value) === '[object Array]';
    },

    // Checks if the object is a hash, which is equivalent to an object that
    // is neither an array nor a function.
    isHash: function(value) {
      return v.isObject(value) && !v.isArray(value) && !v.isFunction(value);
    },

    contains: function(obj, value) {
      if (!v.isDefined(obj)) {
        return false;
      }
      if (v.isArray(obj)) {
        return obj.indexOf(value) !== -1;
      }
      return value in obj;
    },

    unique: function(array) {
      if (!v.isArray(array)) {
        return array;
      }
      return array.filter(function(el, index, array) {
        return array.indexOf(el) == index;
      });
    },

    forEachKeyInKeypath: function(object, keypath, callback) {
      if (!v.isString(keypath)) {
        return undefined;
      }

      var key = ""
        , i
        , escape = false;

      for (i = 0; i < keypath.length; ++i) {
        switch (keypath[i]) {
          case '.':
            if (escape) {
              escape = false;
              key += '.';
            } else {
              object = callback(object, key, false);
              key = "";
            }
            break;

          case '\\':
            if (escape) {
              escape = false;
              key += '\\';
            } else {
              escape = true;
            }
            break;

          default:
            escape = false;
            key += keypath[i];
            break;
        }
      }

      return callback(object, key, true);
    },

    getDeepObjectValue: function(obj, keypath) {
      if (!v.isObject(obj)) {
        return undefined;
      }

      return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
        if (v.isObject(obj)) {
          return obj[key];
        }
      });
    },

    // This returns an object with all the values of the form.
    // It uses the input name as key and the value as value
    // So for example this:
    // <input type="text" name="email" value="foo@bar.com" />
    // would return:
    // {email: "foo@bar.com"}
    collectFormValues: function(form, options) {
      var values = {}
        , i
        , j
        , input
        , inputs
        , option
        , value;

      if (v.isJqueryElement(form)) {
        form = form[0];
      }

      if (!form) {
        return values;
      }

      options = options || {};

      inputs = form.querySelectorAll("input[name], textarea[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);

        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        var name = input.name.replace(/\./g, "\\\\.");
        value = v.sanitizeFormValue(input.value, options);
        if (input.type === "number") {
          value = value ? +value : null;
        } else if (input.type === "checkbox") {
          if (input.attributes.value) {
            if (!input.checked) {
              value = values[name] || null;
            }
          } else {
            value = input.checked;
          }
        } else if (input.type === "radio") {
          if (!input.checked) {
            value = values[name] || null;
          }
        }
        values[name] = value;
      }

      inputs = form.querySelectorAll("select[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);
        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        if (input.multiple) {
          value = [];
          for (j in input.options) {
            option = input.options[j];
             if (option && option.selected) {
              value.push(v.sanitizeFormValue(option.value, options));
            }
          }
        } else {
          var _val = typeof input.options[input.selectedIndex] !== 'undefined' ? input.options[input.selectedIndex].value : /* istanbul ignore next */ '';
          value = v.sanitizeFormValue(_val, options);
        }
        values[input.name] = value;
      }

      return values;
    },

    sanitizeFormValue: function(value, options) {
      if (options.trim && v.isString(value)) {
        value = value.trim();
      }

      if (options.nullify !== false && value === "") {
        return null;
      }
      return value;
    },

    capitalize: function(str) {
      if (!v.isString(str)) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    },

    // Remove all errors who's error attribute is empty (null or undefined)
    pruneEmptyErrors: function(errors) {
      return errors.filter(function(error) {
        return !v.isEmpty(error.error);
      });
    },

    // In
    // [{error: ["err1", "err2"], ...}]
    // Out
    // [{error: "err1", ...}, {error: "err2", ...}]
    //
    // All attributes in an error with multiple messages are duplicated
    // when expanding the errors.
    expandMultipleErrors: function(errors) {
      var ret = [];
      errors.forEach(function(error) {
        // Removes errors without a message
        if (v.isArray(error.error)) {
          error.error.forEach(function(msg) {
            ret.push(v.extend({}, error, {error: msg}));
          });
        } else {
          ret.push(error);
        }
      });
      return ret;
    },

    // Converts the error mesages by prepending the attribute name unless the
    // message is prefixed by ^
    convertErrorMessages: function(errors, options) {
      options = options || {};

      var ret = []
        , prettify = options.prettify || v.prettify;
      errors.forEach(function(errorInfo) {
        var error = v.result(errorInfo.error,
            errorInfo.value,
            errorInfo.attribute,
            errorInfo.options,
            errorInfo.attributes,
            errorInfo.globalOptions);

        if (!v.isString(error)) {
          ret.push(errorInfo);
          return;
        }

        if (error[0] === '^') {
          error = error.slice(1);
        } else if (options.fullMessages !== false) {
          error = v.capitalize(prettify(errorInfo.attribute)) + " " + error;
        }
        error = error.replace(/\\\^/g, "^");
        error = v.format(error, {
          value: v.stringifyValue(errorInfo.value, options)
        });
        ret.push(v.extend({}, errorInfo, {error: error}));
      });
      return ret;
    },

    // In:
    // [{attribute: "<attributeName>", ...}]
    // Out:
    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
    groupErrorsByAttribute: function(errors) {
      var ret = {};
      errors.forEach(function(error) {
        var list = ret[error.attribute];
        if (list) {
          list.push(error);
        } else {
          ret[error.attribute] = [error];
        }
      });
      return ret;
    },

    // In:
    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
    // Out:
    // ["<message 1>", "<message 2>"]
    flattenErrorsToArray: function(errors) {
      return errors
        .map(function(error) { return error.error; })
        .filter(function(value, index, self) {
          return self.indexOf(value) === index;
        });
    },

    cleanAttributes: function(attributes, whitelist) {
      function whitelistCreator(obj, key, last) {
        if (v.isObject(obj[key])) {
          return obj[key];
        }
        return (obj[key] = last ? true : {});
      }

      function buildObjectWhitelist(whitelist) {
        var ow = {}
          , lastObject
          , attr;
        for (attr in whitelist) {
          if (!whitelist[attr]) {
            continue;
          }
          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
        }
        return ow;
      }

      function cleanRecursive(attributes, whitelist) {
        if (!v.isObject(attributes)) {
          return attributes;
        }

        var ret = v.extend({}, attributes)
          , w
          , attribute;

        for (attribute in attributes) {
          w = whitelist[attribute];

          if (v.isObject(w)) {
            ret[attribute] = cleanRecursive(ret[attribute], w);
          } else if (!w) {
            delete ret[attribute];
          }
        }
        return ret;
      }

      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
        return {};
      }

      whitelist = buildObjectWhitelist(whitelist);
      return cleanRecursive(attributes, whitelist);
    },

    exposeModule: function(validate, root, exports, module, define) {
      if (exports) {
        if (module && module.exports) {
          exports = module.exports = validate;
        }
        exports.validate = validate;
      } else {
        root.validate = validate;
        if (validate.isFunction(define) && define.amd) {
          define([], function () { return validate; });
        }
      }
    },

    warn: function(msg) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[validate.js] " + msg);
      }
    },

    error: function(msg) {
      if (typeof console !== "undefined" && console.error) {
        console.error("[validate.js] " + msg);
      }
    }
  });

  validate.validators = {
    // Presence validates that the value isn't empty
    presence: function(value, options) {
      options = v.extend({}, this.options, options);
      if (options.allowEmpty !== false ? !v.isDefined(value) : v.isEmpty(value)) {
        return options.message || this.message || "can't be blank";
      }
    },
    length: function(value, options, attribute) {
      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var is = options.is
        , maximum = options.maximum
        , minimum = options.minimum
        , tokenizer = options.tokenizer || function(val) { return val; }
        , err
        , errors = [];

      value = tokenizer(value);
      var length = value.length;
      if(!v.isNumber(length)) {
        return options.message || this.notValid || "has an incorrect length";
      }

      // Is checks
      if (v.isNumber(is) && length !== is) {
        err = options.wrongLength ||
          this.wrongLength ||
          "is the wrong length (should be %{count} characters)";
        errors.push(v.format(err, {count: is}));
      }

      if (v.isNumber(minimum) && length < minimum) {
        err = options.tooShort ||
          this.tooShort ||
          "is too short (minimum is %{count} characters)";
        errors.push(v.format(err, {count: minimum}));
      }

      if (v.isNumber(maximum) && length > maximum) {
        err = options.tooLong ||
          this.tooLong ||
          "is too long (maximum is %{count} characters)";
        errors.push(v.format(err, {count: maximum}));
      }

      if (errors.length > 0) {
        return options.message || errors;
      }
    },
    numericality: function(value, options, attribute, attributes, globalOptions) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var errors = []
        , name
        , count
        , checks = {
            greaterThan:          function(v, c) { return v > c; },
            greaterThanOrEqualTo: function(v, c) { return v >= c; },
            equalTo:              function(v, c) { return v === c; },
            lessThan:             function(v, c) { return v < c; },
            lessThanOrEqualTo:    function(v, c) { return v <= c; },
            divisibleBy:          function(v, c) { return v % c === 0; }
          }
        , prettify = options.prettify ||
          (globalOptions && globalOptions.prettify) ||
          v.prettify;

      // Strict will check that it is a valid looking number
      if (v.isString(value) && options.strict) {
        var pattern = "^-?(0|[1-9]\\d*)";
        if (!options.onlyInteger) {
          pattern += "(\\.\\d+)?";
        }
        pattern += "$";

        if (!(new RegExp(pattern).test(value))) {
          return options.message ||
            options.notValid ||
            this.notValid ||
            this.message ||
            "must be a valid number";
        }
      }

      // Coerce the value to a number unless we're being strict.
      if (options.noStrings !== true && v.isString(value) && !v.isEmpty(value)) {
        value = +value;
      }

      // If it's not a number we shouldn't continue since it will compare it.
      if (!v.isNumber(value)) {
        return options.message ||
          options.notValid ||
          this.notValid ||
          this.message ||
          "is not a number";
      }

      // Same logic as above, sort of. Don't bother with comparisons if this
      // doesn't pass.
      if (options.onlyInteger && !v.isInteger(value)) {
        return options.message ||
          options.notInteger ||
          this.notInteger ||
          this.message ||
          "must be an integer";
      }

      for (name in checks) {
        count = options[name];
        if (v.isNumber(count) && !checks[name](value, count)) {
          // This picks the default message if specified
          // For example the greaterThan check uses the message from
          // this.notGreaterThan so we capitalize the name and prepend "not"
          var key = "not" + v.capitalize(name);
          var msg = options[key] ||
            this[key] ||
            this.message ||
            "must be %{type} %{count}";

          errors.push(v.format(msg, {
            count: count,
            type: prettify(name)
          }));
        }
      }

      if (options.odd && value % 2 !== 1) {
        errors.push(options.notOdd ||
            this.notOdd ||
            this.message ||
            "must be odd");
      }
      if (options.even && value % 2 !== 0) {
        errors.push(options.notEven ||
            this.notEven ||
            this.message ||
            "must be even");
      }

      if (errors.length) {
        return options.message || errors;
      }
    },
    datetime: v.extend(function(value, options) {
      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
        throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
      }

      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var err
        , errors = []
        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
        , latest = options.latest ? this.parse(options.latest, options) : NaN;

      value = this.parse(value, options);

      // 86400000 is the number of milliseconds in a day, this is used to remove
      // the time from the date
      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
        err = options.notValid ||
          options.message ||
          this.notValid ||
          "must be a valid date";
        return v.format(err, {value: arguments[0]});
      }

      if (!isNaN(earliest) && value < earliest) {
        err = options.tooEarly ||
          options.message ||
          this.tooEarly ||
          "must be no earlier than %{date}";
        err = v.format(err, {
          value: this.format(value, options),
          date: this.format(earliest, options)
        });
        errors.push(err);
      }

      if (!isNaN(latest) && value > latest) {
        err = options.tooLate ||
          options.message ||
          this.tooLate ||
          "must be no later than %{date}";
        err = v.format(err, {
          date: this.format(latest, options),
          value: this.format(value, options)
        });
        errors.push(err);
      }

      if (errors.length) {
        return v.unique(errors);
      }
    }, {
      parse: null,
      format: null
    }),
    date: function(value, options) {
      options = v.extend({}, options, {dateOnly: true});
      return v.validators.datetime.call(v.validators.datetime, value, options);
    },
    format: function(value, options) {
      if (v.isString(options) || (options instanceof RegExp)) {
        options = {pattern: options};
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is invalid"
        , pattern = options.pattern
        , match;

      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }

      if (v.isString(pattern)) {
        pattern = new RegExp(options.pattern, options.flags);
      }
      match = pattern.exec(value);
      if (!match || match[0].length != value.length) {
        return message;
      }
    },
    inclusion: function(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (v.contains(options.within, value)) {
        return;
      }
      var message = options.message ||
        this.message ||
        "^%{value} is not included in the list";
      return v.format(message, {value: value});
    },
    exclusion: function(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (!v.contains(options.within, value)) {
        return;
      }
      var message = options.message || this.message || "^%{value} is restricted";
      if (v.isString(options.within[value])) {
        value = options.within[value];
      }
      return v.format(message, {value: value});
    },
    email: v.extend(function(value, options) {
      options = v.extend({}, this.options, options);
      var message = options.message || this.message || "is not a valid email";
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }
      if (!this.PATTERN.exec(value)) {
        return message;
      }
    }, {
      PATTERN: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
    }),
    equality: function(value, options, attribute, attributes, globalOptions) {
      if (!v.isDefined(value)) {
        return;
      }

      if (v.isString(options)) {
        options = {attribute: options};
      }
      options = v.extend({}, this.options, options);
      var message = options.message ||
        this.message ||
        "is not equal to %{attribute}";

      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
        throw new Error("The attribute must be a non empty string");
      }

      var otherValue = v.getDeepObjectValue(attributes, options.attribute)
        , comparator = options.comparator || function(v1, v2) {
          return v1 === v2;
        }
        , prettify = options.prettify ||
          (globalOptions && globalOptions.prettify) ||
          v.prettify;

      if (!comparator(value, otherValue, options, attribute, attributes)) {
        return v.format(message, {attribute: prettify(options.attribute)});
      }
    },
    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function(value, options) {
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is not a valid url"
        , schemes = options.schemes || this.schemes || ['http', 'https']
        , allowLocal = options.allowLocal || this.allowLocal || false
        , allowDataUrl = options.allowDataUrl || this.allowDataUrl || false;
      if (!v.isString(value)) {
        return message;
      }

      // https://gist.github.com/dperini/729294
      var regex =
        "^" +
        // protocol identifier
        "(?:(?:" + schemes.join("|") + ")://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:";

      var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

      if (allowLocal) {
        tld += "?";
      } else {
        regex +=
          // IP address exclusion
          // private & local networks
          "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
          "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
      }

      regex +=
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broacast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          // host name
          "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
          // domain name
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
          tld +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
      "$";

      if (allowDataUrl) {
        // RFC 2397
        var mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
        var urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
        var dataurl = "data:(?:"+mediaType+")?(?:;base64)?,"+urlchar;
        regex = "(?:"+regex+")|(?:^"+dataurl+"$)";
      }

      var PATTERN = new RegExp(regex, 'i');
      if (!PATTERN.exec(value)) {
        return message;
      }
    },
    type: v.extend(function(value, originalOptions, attribute, attributes, globalOptions) {
      if (v.isString(originalOptions)) {
        originalOptions = {type: originalOptions};
      }

      if (!v.isDefined(value)) {
        return;
      }

      var options = v.extend({}, this.options, originalOptions);

      var type = options.type;
      if (!v.isDefined(type)) {
        throw new Error("No type was specified");
      }

      var check;
      if (v.isFunction(type)) {
        check = type;
      } else {
        check = this.types[type];
      }

      if (!v.isFunction(check)) {
        throw new Error("validate.validators.type.types." + type + " must be a function.");
      }

      if (!check(value, options, attribute, attributes, globalOptions)) {
        var message = originalOptions.message ||
          this.messages[type] ||
          this.message ||
          options.message ||
          (v.isFunction(type) ? "must be of the correct type" : "must be of type %{type}");

        if (v.isFunction(message)) {
          message = message(value, originalOptions, attribute, attributes, globalOptions);
        }

        return v.format(message, {attribute: v.prettify(attribute), type: type});
      }
    }, {
      types: {
        object: function(value) {
          return v.isObject(value) && !v.isArray(value);
        },
        array: v.isArray,
        integer: v.isInteger,
        number: v.isNumber,
        string: v.isString,
        date: v.isDate,
        boolean: v.isBoolean
      },
      messages: {}
    })
  };

  validate.formatters = {
    detailed: function(errors) {return errors;},
    flat: v.flattenErrorsToArray,
    grouped: function(errors) {
      var attr;

      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = v.flattenErrorsToArray(errors[attr]);
      }
      return errors;
    },
    constraint: function(errors) {
      var attr;
      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = errors[attr].map(function(result) {
          return result.validator;
        }).sort();
      }
      return errors;
    }
  };

  validate.exposeModule(validate, this, exports, module, __webpack_require__(15));
}).call(this,
         true ? /* istanbul ignore next */ exports : undefined,
         true ? /* istanbul ignore next */ module : undefined,
        __webpack_require__(15));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_form_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // form submit

{
  var form = document.querySelector('.js-login-form');

  if (form) {
    var _constraints;

    var formModal = form.closest('[data-modal]');
    var constraints = (_constraints = {}, _defineProperty(_constraints, 'login-email', {
      presence: {
        message: "^Обязательное поле"
      },
      email: {
        message: "^Неверный формат"
      }
    }), _defineProperty(_constraints, 'login-pass', {
      presence: {
        message: "^Обязательное поле"
      }
    }), _constraints);

    var successCallback = function successCallback() {
      var submitBtn = form.querySelector('[type="submit"]');
      var url = 'API_URL';
      var data = {};
      new FormData(form).forEach(function (value, key) {
        return data[key] = value;
      });
      submitBtn.disabled = true;
      console.log(data);
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(function (response) {
        submitBtn.disabled = false;
        return response.json();
      }).then(function () {
        form.reset();
      })["catch"](function (err) {
        console.error(err);
      });
    };

    form.addEventListener('change', function () {
      Object(_utils_form_validation__WEBPACK_IMPORTED_MODULE_0__["handleFormChange"])({
        form: form,
        constraints: constraints
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      Object(_utils_form_validation__WEBPACK_IMPORTED_MODULE_0__["handleFormSubmit"])({
        form: form,
        constraints: constraints,
        successCallback: successCallback
      });
    });
    formModal.addEventListener('onCloseModal', function () {
      return Object(_utils_form_validation__WEBPACK_IMPORTED_MODULE_0__["handleFormResset"])({
        form: form
      });
    });
  }
}

/***/ })
/******/ ]);