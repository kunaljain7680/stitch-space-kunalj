import {
  chakra,
  forwardRef,
  motion,
  useCallbackRef,
  useMultiStyleConfig,
  useTheme,
  useUpdateEffect
} from "./chunk-X2SSOQUE.js";
import {
  createContext,
  require_jsx_runtime,
  useSafeLayoutEffect
} from "./chunk-XXZV7QFX.js";
import {
  callAll,
  callAllHandlers,
  cx,
  dataAttr,
  omitThemingProps,
  runIfFn
} from "./chunk-BHDLHQY3.js";
import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/@chakra-ui/menu/dist/chunk-YSKACL7R.mjs
var import_react = __toESM(require_react(), 1);
function isPrintableCharacter(event) {
  const { key } = event;
  return key.length === 1 || key.length > 1 && /[^a-zA-Z0-9]/.test(key);
}
function useShortcut(props = {}) {
  const { timeout = 300, preventDefault = () => true } = props;
  const [keys, setKeys] = (0, import_react.useState)([]);
  const timeoutRef = (0, import_react.useRef)();
  const flush = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const clearKeysAfterDelay = () => {
    flush();
    timeoutRef.current = setTimeout(() => {
      setKeys([]);
      timeoutRef.current = null;
    }, timeout);
  };
  (0, import_react.useEffect)(() => flush, []);
  function onKeyDown(fn2) {
    return (event) => {
      if (event.key === "Backspace") {
        const keysCopy = [...keys];
        keysCopy.pop();
        setKeys(keysCopy);
        return;
      }
      if (isPrintableCharacter(event)) {
        const keysCopy = keys.concat(event.key);
        if (preventDefault(event)) {
          event.preventDefault();
          event.stopPropagation();
        }
        setKeys(keysCopy);
        fn2(keysCopy.join(""));
        clearKeysAfterDelay();
      }
    };
  }
  return onKeyDown;
}

// node_modules/@chakra-ui/menu/dist/chunk-BWUXSGSJ.mjs
function getNextItemFromSearch(items, searchString, itemToString, currentItem) {
  if (searchString == null) {
    return currentItem;
  }
  if (!currentItem) {
    const foundItem = items.find(
      (item) => itemToString(item).toLowerCase().startsWith(searchString.toLowerCase())
    );
    return foundItem;
  }
  const matchingItems = items.filter(
    (item) => itemToString(item).toLowerCase().startsWith(searchString.toLowerCase())
  );
  if (matchingItems.length > 0) {
    let nextIndex;
    if (matchingItems.includes(currentItem)) {
      const currentIndex = matchingItems.indexOf(currentItem);
      nextIndex = currentIndex + 1;
      if (nextIndex === matchingItems.length) {
        nextIndex = 0;
      }
      return matchingItems[nextIndex];
    }
    nextIndex = items.indexOf(matchingItems[0]);
    return items[nextIndex];
  }
  return currentItem;
}

// node_modules/@chakra-ui/clickable/dist/chunk-VDSXRTOE.mjs
var import_react2 = __toESM(require_react(), 1);
function useEventListeners() {
  const listeners = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
  const currentListeners = listeners.current;
  const add = (0, import_react2.useCallback)((el, type, listener, options) => {
    listeners.current.set(listener, { type, el, options });
    el.addEventListener(type, listener, options);
  }, []);
  const remove = (0, import_react2.useCallback)(
    (el, type, listener, options) => {
      el.removeEventListener(type, listener, options);
      listeners.current.delete(listener);
    },
    []
  );
  (0, import_react2.useEffect)(
    () => () => {
      currentListeners.forEach((value, key) => {
        remove(value.el, value.type, key, value.options);
      });
    },
    [remove, currentListeners]
  );
  return { add, remove };
}

// node_modules/@chakra-ui/react-use-merge-refs/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);
function assignRef(ref, value) {
  if (ref == null)
    return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  try {
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      assignRef(ref, node);
    });
  };
}
function useMergeRefs(...refs) {
  return (0, import_react3.useMemo)(() => mergeRefs(...refs), refs);
}

// node_modules/@chakra-ui/clickable/dist/chunk-AXLEE3EK.mjs
var import_react4 = __toESM(require_react(), 1);
function isValidElement(event) {
  const element = event.target;
  const { tagName, isContentEditable: isContentEditable2 } = element;
  return tagName !== "INPUT" && tagName !== "TEXTAREA" && isContentEditable2 !== true;
}
function useClickable(props = {}) {
  const {
    ref: htmlRef,
    isDisabled: isDisabled2,
    isFocusable: isFocusable2,
    clickOnEnter = true,
    clickOnSpace = true,
    onMouseDown,
    onMouseUp,
    onClick,
    onKeyDown,
    onKeyUp,
    tabIndex: tabIndexProp,
    onMouseOver,
    onMouseLeave,
    ...htmlProps
  } = props;
  const [isButton, setIsButton] = (0, import_react4.useState)(true);
  const [isPressed, setIsPressed] = (0, import_react4.useState)(false);
  const listeners = useEventListeners();
  const refCallback = (node) => {
    if (!node)
      return;
    if (node.tagName !== "BUTTON") {
      setIsButton(false);
    }
  };
  const tabIndex = isButton ? tabIndexProp : tabIndexProp || 0;
  const trulyDisabled = isDisabled2 && !isFocusable2;
  const handleClick = (0, import_react4.useCallback)(
    (event) => {
      if (isDisabled2) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      const self = event.currentTarget;
      self.focus();
      onClick == null ? void 0 : onClick(event);
    },
    [isDisabled2, onClick]
  );
  const onDocumentKeyUp = (0, import_react4.useCallback)(
    (e) => {
      if (isPressed && isValidElement(e)) {
        e.preventDefault();
        e.stopPropagation();
        setIsPressed(false);
        listeners.remove(document, "keyup", onDocumentKeyUp, false);
      }
    },
    [isPressed, listeners]
  );
  const handleKeyDown = (0, import_react4.useCallback)(
    (event) => {
      onKeyDown == null ? void 0 : onKeyDown(event);
      if (isDisabled2 || event.defaultPrevented || event.metaKey) {
        return;
      }
      if (!isValidElement(event.nativeEvent) || isButton)
        return;
      const shouldClickOnEnter = clickOnEnter && event.key === "Enter";
      const shouldClickOnSpace = clickOnSpace && event.key === " ";
      if (shouldClickOnSpace) {
        event.preventDefault();
        setIsPressed(true);
      }
      if (shouldClickOnEnter) {
        event.preventDefault();
        const self = event.currentTarget;
        self.click();
      }
      listeners.add(document, "keyup", onDocumentKeyUp, false);
    },
    [
      isDisabled2,
      isButton,
      onKeyDown,
      clickOnEnter,
      clickOnSpace,
      listeners,
      onDocumentKeyUp
    ]
  );
  const handleKeyUp = (0, import_react4.useCallback)(
    (event) => {
      onKeyUp == null ? void 0 : onKeyUp(event);
      if (isDisabled2 || event.defaultPrevented || event.metaKey)
        return;
      if (!isValidElement(event.nativeEvent) || isButton)
        return;
      const shouldClickOnSpace = clickOnSpace && event.key === " ";
      if (shouldClickOnSpace) {
        event.preventDefault();
        setIsPressed(false);
        const self = event.currentTarget;
        self.click();
      }
    },
    [clickOnSpace, isButton, isDisabled2, onKeyUp]
  );
  const onDocumentMouseUp = (0, import_react4.useCallback)(
    (event) => {
      if (event.button !== 0)
        return;
      setIsPressed(false);
      listeners.remove(document, "mouseup", onDocumentMouseUp, false);
    },
    [listeners]
  );
  const handleMouseDown = (0, import_react4.useCallback)(
    (event) => {
      if (event.button !== 0)
        return;
      if (isDisabled2) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      if (!isButton) {
        setIsPressed(true);
      }
      const target = event.currentTarget;
      target.focus({ preventScroll: true });
      listeners.add(document, "mouseup", onDocumentMouseUp, false);
      onMouseDown == null ? void 0 : onMouseDown(event);
    },
    [isDisabled2, isButton, onMouseDown, listeners, onDocumentMouseUp]
  );
  const handleMouseUp = (0, import_react4.useCallback)(
    (event) => {
      if (event.button !== 0)
        return;
      if (!isButton) {
        setIsPressed(false);
      }
      onMouseUp == null ? void 0 : onMouseUp(event);
    },
    [onMouseUp, isButton]
  );
  const handleMouseOver = (0, import_react4.useCallback)(
    (event) => {
      if (isDisabled2) {
        event.preventDefault();
        return;
      }
      onMouseOver == null ? void 0 : onMouseOver(event);
    },
    [isDisabled2, onMouseOver]
  );
  const handleMouseLeave = (0, import_react4.useCallback)(
    (event) => {
      if (isPressed) {
        event.preventDefault();
        setIsPressed(false);
      }
      onMouseLeave == null ? void 0 : onMouseLeave(event);
    },
    [isPressed, onMouseLeave]
  );
  const ref = mergeRefs(htmlRef, refCallback);
  if (isButton) {
    return {
      ...htmlProps,
      ref,
      type: "button",
      "aria-disabled": trulyDisabled ? void 0 : isDisabled2,
      disabled: trulyDisabled,
      onClick: handleClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyDown,
      onMouseOver,
      onMouseLeave
    };
  }
  return {
    ...htmlProps,
    ref,
    role: "button",
    "data-active": dataAttr(isPressed),
    "aria-disabled": isDisabled2 ? "true" : void 0,
    tabIndex: trulyDisabled ? void 0 : tabIndex,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave
  };
}

// node_modules/@chakra-ui/descendant/dist/chunk-3A5YOZDU.mjs
var import_react5 = __toESM(require_react(), 1);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function sortNodes(nodes) {
  return nodes.sort((a, b) => {
    const compare = a.compareDocumentPosition(b);
    if (compare & Node.DOCUMENT_POSITION_FOLLOWING || compare & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return -1;
    }
    if (compare & Node.DOCUMENT_POSITION_PRECEDING || compare & Node.DOCUMENT_POSITION_CONTAINS) {
      return 1;
    }
    if (compare & Node.DOCUMENT_POSITION_DISCONNECTED || compare & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC) {
      throw Error("Cannot sort the given nodes.");
    } else {
      return 0;
    }
  });
}
var isElement = (el) => typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
function getNextIndex(current, max2, loop) {
  let next = current + 1;
  if (loop && next >= max2)
    next = 0;
  return next;
}
function getPrevIndex(current, max2, loop) {
  let next = current - 1;
  if (loop && next < 0)
    next = max2;
  return next;
}
var useSafeLayoutEffect2 = typeof window !== "undefined" ? import_react5.useLayoutEffect : import_react5.useEffect;
var cast = (value) => value;

// node_modules/@chakra-ui/descendant/dist/chunk-FT3H4P66.mjs
var DescendantsManager = class {
  constructor() {
    __publicField(this, "descendants", /* @__PURE__ */ new Map());
    __publicField(this, "register", (nodeOrOptions) => {
      if (nodeOrOptions == null)
        return;
      if (isElement(nodeOrOptions)) {
        return this.registerNode(nodeOrOptions);
      }
      return (node) => {
        this.registerNode(node, nodeOrOptions);
      };
    });
    __publicField(this, "unregister", (node) => {
      this.descendants.delete(node);
      const sorted = sortNodes(Array.from(this.descendants.keys()));
      this.assignIndex(sorted);
    });
    __publicField(this, "destroy", () => {
      this.descendants.clear();
    });
    __publicField(this, "assignIndex", (descendants) => {
      this.descendants.forEach((descendant) => {
        const index = descendants.indexOf(descendant.node);
        descendant.index = index;
        descendant.node.dataset["index"] = descendant.index.toString();
      });
    });
    __publicField(this, "count", () => this.descendants.size);
    __publicField(this, "enabledCount", () => this.enabledValues().length);
    __publicField(this, "values", () => {
      const values = Array.from(this.descendants.values());
      return values.sort((a, b) => a.index - b.index);
    });
    __publicField(this, "enabledValues", () => {
      return this.values().filter((descendant) => !descendant.disabled);
    });
    __publicField(this, "item", (index) => {
      if (this.count() === 0)
        return void 0;
      return this.values()[index];
    });
    __publicField(this, "enabledItem", (index) => {
      if (this.enabledCount() === 0)
        return void 0;
      return this.enabledValues()[index];
    });
    __publicField(this, "first", () => this.item(0));
    __publicField(this, "firstEnabled", () => this.enabledItem(0));
    __publicField(this, "last", () => this.item(this.descendants.size - 1));
    __publicField(this, "lastEnabled", () => {
      const lastIndex = this.enabledValues().length - 1;
      return this.enabledItem(lastIndex);
    });
    __publicField(this, "indexOf", (node) => {
      var _a, _b;
      if (!node)
        return -1;
      return (_b = (_a = this.descendants.get(node)) == null ? void 0 : _a.index) != null ? _b : -1;
    });
    __publicField(this, "enabledIndexOf", (node) => {
      if (node == null)
        return -1;
      return this.enabledValues().findIndex((i) => i.node.isSameNode(node));
    });
    __publicField(this, "next", (index, loop = true) => {
      const next = getNextIndex(index, this.count(), loop);
      return this.item(next);
    });
    __publicField(this, "nextEnabled", (index, loop = true) => {
      const item = this.item(index);
      if (!item)
        return;
      const enabledIndex = this.enabledIndexOf(item.node);
      const nextEnabledIndex = getNextIndex(
        enabledIndex,
        this.enabledCount(),
        loop
      );
      return this.enabledItem(nextEnabledIndex);
    });
    __publicField(this, "prev", (index, loop = true) => {
      const prev = getPrevIndex(index, this.count() - 1, loop);
      return this.item(prev);
    });
    __publicField(this, "prevEnabled", (index, loop = true) => {
      const item = this.item(index);
      if (!item)
        return;
      const enabledIndex = this.enabledIndexOf(item.node);
      const prevEnabledIndex = getPrevIndex(
        enabledIndex,
        this.enabledCount() - 1,
        loop
      );
      return this.enabledItem(prevEnabledIndex);
    });
    __publicField(this, "registerNode", (node, options) => {
      if (!node || this.descendants.has(node))
        return;
      const keys = Array.from(this.descendants.keys()).concat(node);
      const sorted = sortNodes(keys);
      if (options == null ? void 0 : options.disabled) {
        options.disabled = !!options.disabled;
      }
      const descendant = { node, index: -1, ...options };
      this.descendants.set(node, descendant);
      this.assignIndex(sorted);
    });
  }
};

// node_modules/@chakra-ui/descendant/dist/chunk-OCNORRQU.mjs
var import_react6 = __toESM(require_react(), 1);
function useDescendants() {
  const descendants = (0, import_react6.useRef)(new DescendantsManager());
  useSafeLayoutEffect2(() => {
    return () => descendants.current.destroy();
  });
  return descendants.current;
}
var [DescendantsContextProvider, useDescendantsContext] = createContext({
  name: "DescendantsProvider",
  errorMessage: "useDescendantsContext must be used within DescendantsProvider"
});
function useDescendant(options) {
  const descendants = useDescendantsContext();
  const [index, setIndex] = (0, import_react6.useState)(-1);
  const ref = (0, import_react6.useRef)(null);
  useSafeLayoutEffect2(() => {
    return () => {
      if (!ref.current)
        return;
      descendants.unregister(ref.current);
    };
  }, []);
  useSafeLayoutEffect2(() => {
    if (!ref.current)
      return;
    const dataIndex = Number(ref.current.dataset["index"]);
    if (index != dataIndex && !Number.isNaN(dataIndex)) {
      setIndex(dataIndex);
    }
  });
  const refCallback = options ? cast(descendants.register(options)) : cast(descendants.register);
  return {
    descendants,
    index,
    enabledIndex: descendants.enabledIndexOf(ref.current),
    register: mergeRefs(refCallback, ref)
  };
}
function createDescendantContext() {
  const ContextProvider = cast(DescendantsContextProvider);
  const _useDescendantsContext = () => cast(useDescendantsContext());
  const _useDescendant = (options) => useDescendant(options);
  const _useDescendants = () => useDescendants();
  return [
    // context provider
    ContextProvider,
    // call this when you need to read from context
    _useDescendantsContext,
    // descendants state information, to be called and passed to `ContextProvider`
    _useDescendants,
    // descendant index information
    _useDescendant
  ];
}

// node_modules/@chakra-ui/dom-utils/dist/chunk-3XANSPY5.mjs
function isElement2(el) {
  return el != null && typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
}
function isHTMLElement(el) {
  var _a;
  if (!isElement2(el))
    return false;
  const win = (_a = el.ownerDocument.defaultView) != null ? _a : window;
  return el instanceof win.HTMLElement;
}
function getOwnerWindow(node) {
  var _a, _b;
  return (_b = (_a = getOwnerDocument(node)) == null ? void 0 : _a.defaultView) != null ? _b : window;
}
function getOwnerDocument(node) {
  return isElement2(node) ? node.ownerDocument : document;
}
function getActiveElement(node) {
  return getOwnerDocument(node).activeElement;
}

// node_modules/@chakra-ui/dom-utils/dist/chunk-4WEUWBTD.mjs
function isScrollParent(el) {
  const win = el.ownerDocument.defaultView || window;
  const { overflow, overflowX, overflowY } = win.getComputedStyle(el);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getParent(el) {
  if (el.localName === "html")
    return el;
  return el.assignedSlot || el.parentElement || el.ownerDocument.documentElement;
}
function getScrollParent(el) {
  if (["html", "body", "#document"].includes(el.localName)) {
    return el.ownerDocument.body;
  }
  if (isHTMLElement(el) && isScrollParent(el)) {
    return el;
  }
  return getScrollParent(getParent(el));
}

// node_modules/@chakra-ui/dom-utils/dist/chunk-ROURZMX4.mjs
var hasTabIndex = (element) => element.hasAttribute("tabindex");
var hasNegativeTabIndex = (element) => hasTabIndex(element) && element.tabIndex === -1;
function isDisabled(element) {
  return Boolean(element.getAttribute("disabled")) === true || Boolean(element.getAttribute("aria-disabled")) === true;
}
function isHidden(element) {
  if (element.parentElement && isHidden(element.parentElement))
    return true;
  return element.hidden;
}
function isContentEditable(element) {
  const value = element.getAttribute("contenteditable");
  return value !== "false" && value != null;
}
function isFocusable(element) {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }
  const { localName } = element;
  const focusableTags = ["input", "select", "textarea", "button"];
  if (focusableTags.indexOf(localName) >= 0)
    return true;
  const others = {
    a: () => element.hasAttribute("href"),
    audio: () => element.hasAttribute("controls"),
    video: () => element.hasAttribute("controls")
  };
  if (localName in others) {
    return others[localName]();
  }
  if (isContentEditable(element))
    return true;
  return hasTabIndex(element);
}
function isTabbable(element) {
  if (!element)
    return false;
  return isHTMLElement(element) && isFocusable(element) && !hasNegativeTabIndex(element);
}

// node_modules/@chakra-ui/dom-utils/dist/index.mjs
var focusableElList = [
  "input:not(:disabled):not([disabled])",
  "select:not(:disabled):not([disabled])",
  "textarea:not(:disabled):not([disabled])",
  "embed",
  "iframe",
  "object",
  "a[href]",
  "area[href]",
  "button:not(:disabled):not([disabled])",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]"
];
var focusableElSelector = focusableElList.join();
var isVisible = (el) => el.offsetWidth > 0 && el.offsetHeight > 0;
function getAllFocusable(container) {
  const focusableEls = Array.from(
    container.querySelectorAll(focusableElSelector)
  );
  focusableEls.unshift(container);
  return focusableEls.filter((el) => isFocusable(el) && isVisible(el));
}

// node_modules/@chakra-ui/react-use-event-listener/dist/index.mjs
var import_react7 = __toESM(require_react(), 1);
function useEventListener(target, event, handler, options) {
  const listener = useCallbackRef(handler);
  (0, import_react7.useEffect)(() => {
    const node = typeof target === "function" ? target() : target != null ? target : document;
    if (!handler || !node)
      return;
    node.addEventListener(event, listener, options);
    return () => {
      node.removeEventListener(event, listener, options);
    };
  }, [event, target, options, listener, handler]);
  return () => {
    const node = typeof target === "function" ? target() : target != null ? target : document;
    node == null ? void 0 : node.removeEventListener(event, listener, options);
  };
}

// node_modules/@chakra-ui/react-use-focus-effect/dist/index.mjs
var import_react8 = __toESM(require_react(), 1);
function preventReturnFocus(containerRef) {
  const el = containerRef.current;
  if (!el)
    return false;
  const activeElement = getActiveElement(el);
  if (!activeElement)
    return false;
  if (el.contains(activeElement))
    return false;
  if (isTabbable(activeElement))
    return true;
  return false;
}
function useFocusOnHide(containerRef, options) {
  const { shouldFocus: shouldFocusProp, visible, focusRef } = options;
  const shouldFocus = shouldFocusProp && !visible;
  useUpdateEffect(() => {
    if (!shouldFocus)
      return;
    if (preventReturnFocus(containerRef)) {
      return;
    }
    const el = (focusRef == null ? void 0 : focusRef.current) || containerRef.current;
    let rafId;
    if (el) {
      rafId = requestAnimationFrame(() => {
        el.focus({ preventScroll: true });
      });
      return () => {
        cancelAnimationFrame(rafId);
      };
    }
  }, [shouldFocus, containerRef, focusRef]);
}
var defaultOptions = {
  preventScroll: true,
  shouldFocus: false
};
function useFocusOnShow(target, options = defaultOptions) {
  const { focusRef, preventScroll, shouldFocus, visible } = options;
  const element = isRefObject(target) ? target.current : target;
  const autoFocusValue = shouldFocus && visible;
  const autoFocusRef = (0, import_react8.useRef)(autoFocusValue);
  const lastVisibleRef = (0, import_react8.useRef)(visible);
  useSafeLayoutEffect(() => {
    if (!lastVisibleRef.current && visible) {
      autoFocusRef.current = autoFocusValue;
    }
    lastVisibleRef.current = visible;
  }, [visible, autoFocusValue]);
  const onFocus = (0, import_react8.useCallback)(() => {
    if (!visible || !element || !autoFocusRef.current)
      return;
    autoFocusRef.current = false;
    if (element.contains(document.activeElement))
      return;
    if (focusRef == null ? void 0 : focusRef.current) {
      requestAnimationFrame(() => {
        var _a;
        (_a = focusRef.current) == null ? void 0 : _a.focus({ preventScroll });
      });
    } else {
      const tabbableEls = getAllFocusable(element);
      if (tabbableEls.length > 0) {
        requestAnimationFrame(() => {
          tabbableEls[0].focus({ preventScroll });
        });
      }
    }
  }, [visible, preventScroll, element, focusRef]);
  useUpdateEffect(() => {
    onFocus();
  }, [onFocus]);
  useEventListener(element, "transitionend", onFocus);
}
function isRefObject(val) {
  return "current" in val;
}

// node_modules/@chakra-ui/popper/dist/chunk-6WT2JRWX.mjs
var toVar = (value, fallback) => ({
  var: value,
  varRef: fallback ? `var(${value}, ${fallback})` : `var(${value})`
});
var cssVars = {
  arrowShadowColor: toVar("--popper-arrow-shadow-color"),
  arrowSize: toVar("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar("--popper-arrow-size-half"),
  arrowBg: toVar("--popper-arrow-bg"),
  transformOrigin: toVar("--popper-transform-origin"),
  arrowOffset: toVar("--popper-arrow-offset")
};
function getBoxShadow(placement) {
  if (placement.includes("top"))
    return `1px 1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("bottom"))
    return `-1px -1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("right"))
    return `-1px 1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("left"))
    return `1px -1px 0px 0 var(--popper-arrow-shadow-color)`;
}
var transforms = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",
  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",
  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",
  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom"
};
var toTransformOrigin = (placement) => transforms[placement];
var defaultEventListeners = {
  scroll: true,
  resize: true
};
function getEventListenerOptions(value) {
  let eventListeners;
  if (typeof value === "object") {
    eventListeners = {
      enabled: true,
      options: { ...defaultEventListeners, ...value }
    };
  } else {
    eventListeners = {
      enabled: value,
      options: defaultEventListeners
    };
  }
  return eventListeners;
}

// node_modules/@chakra-ui/popper/dist/chunk-P4KPSAOW.mjs
var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => () => {
    const reference2 = state.elements.reference;
    state.elements.popper.style.width = `${reference2.offsetWidth}px`;
  }
};
var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: ({ state }) => {
    setTransformOrigin(state);
  },
  effect: ({ state }) => () => {
    setTransformOrigin(state);
  }
};
var setTransformOrigin = (state) => {
  state.elements.popper.style.setProperty(
    cssVars.transformOrigin.var,
    toTransformOrigin(state.placement)
  );
};
var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: ({ state }) => {
    setArrowStyles(state);
  }
};
var setArrowStyles = (state) => {
  var _a;
  if (!state.placement)
    return;
  const overrides = getArrowStyle(state.placement);
  if (((_a = state.elements) == null ? void 0 : _a.arrow) && overrides) {
    Object.assign(state.elements.arrow.style, {
      [overrides.property]: overrides.value,
      width: cssVars.arrowSize.varRef,
      height: cssVars.arrowSize.varRef,
      zIndex: -1
    });
    const vars = {
      [cssVars.arrowSizeHalf.var]: `calc(${cssVars.arrowSize.varRef} / 2 - 1px)`,
      [cssVars.arrowOffset.var]: `calc(${cssVars.arrowSizeHalf.varRef} * -1)`
    };
    for (const property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};
var getArrowStyle = (placement) => {
  if (placement.startsWith("top")) {
    return { property: "bottom", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("bottom")) {
    return { property: "top", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("left")) {
    return { property: "right", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("right")) {
    return { property: "left", value: cssVars.arrowOffset.varRef };
  }
};
var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: ({ state }) => {
    setInnerArrowStyles(state);
  },
  effect: ({ state }) => () => {
    setInnerArrowStyles(state);
  }
};
var setInnerArrowStyles = (state) => {
  if (!state.elements.arrow)
    return;
  const inner = state.elements.arrow.querySelector(
    "[data-popper-arrow-inner]"
  );
  if (!inner)
    return;
  const boxShadow = getBoxShadow(state.placement);
  if (boxShadow) {
    inner.style.setProperty("--popper-arrow-default-shadow", boxShadow);
  }
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: `var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))`
  });
};

// node_modules/@chakra-ui/popper/dist/chunk-AUJXXV3B.mjs
var logicals = {
  "start-start": { ltr: "left-start", rtl: "right-start" },
  "start-end": { ltr: "left-end", rtl: "right-end" },
  "end-start": { ltr: "right-start", rtl: "left-start" },
  "end-end": { ltr: "right-end", rtl: "left-end" },
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" }
};
var opposites = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start"
};
function getPopperPlacement(placement, dir = "ltr") {
  var _a, _b;
  const value = ((_a = logicals[placement]) == null ? void 0 : _a[dir]) || placement;
  if (dir === "ltr")
    return value;
  return (_b = opposites[placement]) != null ? _b : value;
}

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement3(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement2(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement2(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement2(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement2(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement3(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains2(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement3(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement2(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement2(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement2(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains2(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent2(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent2(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement2(node) && isScrollParent2(node)) {
    return node;
  }
  return getScrollParent2(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent2(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent2(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement3(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement2(element) ? getOffsetParent(element) : element;
  if (!isElement3(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement3(clippingParent) && contains2(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement3(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement2(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement2(offsetParent);
  var offsetParentIsScaled = isHTMLElement2(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent2(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement2(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions2, state.options, options2);
        state.scrollParents = {
          reference: isElement3(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/@chakra-ui/popper/dist/chunk-LUYFNC5G.mjs
var import_react9 = __toESM(require_react(), 1);
function usePopper(props = {}) {
  const {
    enabled = true,
    modifiers,
    placement: placementProp = "bottom",
    strategy = "absolute",
    arrowPadding = 8,
    eventListeners = true,
    offset: offset2,
    gutter = 8,
    flip: flip2 = true,
    boundary = "clippingParents",
    preventOverflow: preventOverflow2 = true,
    matchWidth: matchWidth2,
    direction = "ltr"
  } = props;
  const reference2 = (0, import_react9.useRef)(null);
  const popper2 = (0, import_react9.useRef)(null);
  const instance = (0, import_react9.useRef)(null);
  const placement = getPopperPlacement(placementProp, direction);
  const cleanup = (0, import_react9.useRef)(() => {
  });
  const setupPopper = (0, import_react9.useCallback)(() => {
    var _a;
    if (!enabled || !reference2.current || !popper2.current)
      return;
    (_a = cleanup.current) == null ? void 0 : _a.call(cleanup);
    instance.current = createPopper3(reference2.current, popper2.current, {
      placement,
      modifiers: [
        innerArrow,
        positionArrow,
        transformOrigin,
        {
          ...matchWidth,
          enabled: !!matchWidth2
        },
        {
          name: "eventListeners",
          ...getEventListenerOptions(eventListeners)
        },
        {
          name: "arrow",
          options: { padding: arrowPadding }
        },
        {
          name: "offset",
          options: {
            offset: offset2 != null ? offset2 : [0, gutter]
          }
        },
        {
          name: "flip",
          enabled: !!flip2,
          options: { padding: 8 }
        },
        {
          name: "preventOverflow",
          enabled: !!preventOverflow2,
          options: { boundary }
        },
        // allow users override internal modifiers
        ...modifiers != null ? modifiers : []
      ],
      strategy
    });
    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [
    placement,
    enabled,
    modifiers,
    matchWidth2,
    eventListeners,
    arrowPadding,
    offset2,
    gutter,
    flip2,
    preventOverflow2,
    boundary,
    strategy
  ]);
  (0, import_react9.useEffect)(() => {
    return () => {
      var _a;
      if (!reference2.current && !popper2.current) {
        (_a = instance.current) == null ? void 0 : _a.destroy();
        instance.current = null;
      }
    };
  }, []);
  const referenceRef = (0, import_react9.useCallback)(
    (node) => {
      reference2.current = node;
      setupPopper();
    },
    [setupPopper]
  );
  const getReferenceProps = (0, import_react9.useCallback)(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(referenceRef, ref)
    }),
    [referenceRef]
  );
  const popperRef = (0, import_react9.useCallback)(
    (node) => {
      popper2.current = node;
      setupPopper();
    },
    [setupPopper]
  );
  const getPopperProps = (0, import_react9.useCallback)(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(popperRef, ref),
      style: {
        ...props2.style,
        position: strategy,
        minWidth: matchWidth2 ? void 0 : "max-content",
        inset: "0 auto auto 0"
      }
    }),
    [strategy, popperRef, matchWidth2]
  );
  const getArrowProps = (0, import_react9.useCallback)((props2 = {}, ref = null) => {
    const { size, shadowColor, bg, style, ...rest } = props2;
    return {
      ...rest,
      ref,
      "data-popper-arrow": "",
      style: getArrowStyle2(props2)
    };
  }, []);
  const getArrowInnerProps = (0, import_react9.useCallback)(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref,
      "data-popper-arrow-inner": ""
    }),
    []
  );
  return {
    update() {
      var _a;
      (_a = instance.current) == null ? void 0 : _a.update();
    },
    forceUpdate() {
      var _a;
      (_a = instance.current) == null ? void 0 : _a.forceUpdate();
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps
  };
}
function getArrowStyle2(props) {
  const { size, shadowColor, bg, style } = props;
  const computedStyle = { ...style, position: "absolute" };
  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }
  return computedStyle;
}

// node_modules/@chakra-ui/react-use-disclosure/dist/index.mjs
var import_react10 = __toESM(require_react(), 1);
function useDisclosure(props = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp
  } = props;
  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);
  const [isOpenState, setIsOpen] = (0, import_react10.useState)(props.defaultIsOpen || false);
  const isOpen = isOpenProp !== void 0 ? isOpenProp : isOpenState;
  const isControlled = isOpenProp !== void 0;
  const uid = (0, import_react10.useId)();
  const id = idProp != null ? idProp : `disclosure-${uid}`;
  const onClose = (0, import_react10.useCallback)(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    handleClose == null ? void 0 : handleClose();
  }, [isControlled, handleClose]);
  const onOpen = (0, import_react10.useCallback)(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    handleOpen == null ? void 0 : handleOpen();
  }, [isControlled, handleOpen]);
  const onToggle = (0, import_react10.useCallback)(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);
  function getButtonProps(props2 = {}) {
    return {
      ...props2,
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick(event) {
        var _a;
        (_a = props2.onClick) == null ? void 0 : _a.call(props2, event);
        onToggle();
      }
    };
  }
  function getDisclosureProps(props2 = {}) {
    return {
      ...props2,
      hidden: !isOpen,
      id
    };
  }
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps
  };
}

// node_modules/@chakra-ui/react-use-outside-click/dist/index.mjs
var import_react11 = __toESM(require_react(), 1);
function useOutsideClick(props) {
  const { ref, handler, enabled = true } = props;
  const savedHandler = useCallbackRef(handler);
  const stateRef = (0, import_react11.useRef)({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false
  });
  const state = stateRef.current;
  (0, import_react11.useEffect)(() => {
    if (!enabled)
      return;
    const onPointerDown = (e) => {
      if (isValidEvent(e, ref)) {
        state.isPointerDown = true;
      }
    };
    const onMouseUp = (event) => {
      if (state.ignoreEmulatedMouseEvents) {
        state.ignoreEmulatedMouseEvents = false;
        return;
      }
      if (state.isPointerDown && handler && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        savedHandler(event);
      }
    };
    const onTouchEnd = (event) => {
      state.ignoreEmulatedMouseEvents = true;
      if (handler && state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        savedHandler(event);
      }
    };
    const doc = getOwnerDocument2(ref.current);
    doc.addEventListener("mousedown", onPointerDown, true);
    doc.addEventListener("mouseup", onMouseUp, true);
    doc.addEventListener("touchstart", onPointerDown, true);
    doc.addEventListener("touchend", onTouchEnd, true);
    return () => {
      doc.removeEventListener("mousedown", onPointerDown, true);
      doc.removeEventListener("mouseup", onMouseUp, true);
      doc.removeEventListener("touchstart", onPointerDown, true);
      doc.removeEventListener("touchend", onTouchEnd, true);
    };
  }, [handler, ref, savedHandler, state, enabled]);
}
function isValidEvent(event, ref) {
  var _a;
  const target = event.target;
  if (target) {
    const doc = getOwnerDocument2(target);
    if (!doc.contains(target))
      return false;
  }
  return !((_a = ref.current) == null ? void 0 : _a.contains(target));
}
function getOwnerDocument2(node) {
  var _a;
  return (_a = node == null ? void 0 : node.ownerDocument) != null ? _a : document;
}

// node_modules/@chakra-ui/react-use-animation-state/dist/index.mjs
var import_react12 = __toESM(require_react(), 1);
function useAnimationState(props) {
  const { isOpen, ref } = props;
  const [mounted, setMounted] = (0, import_react12.useState)(isOpen);
  const [once, setOnce] = (0, import_react12.useState)(false);
  (0, import_react12.useEffect)(() => {
    if (!once) {
      setMounted(isOpen);
      setOnce(true);
    }
  }, [isOpen, once, mounted]);
  useEventListener(
    () => ref.current,
    "animationend",
    () => {
      setMounted(isOpen);
    }
  );
  const hidden = isOpen ? false : !mounted;
  return {
    present: !hidden,
    onComplete() {
      var _a;
      const win = getOwnerWindow(ref.current);
      const evt = new win.CustomEvent("animationend", { bubbles: true });
      (_a = ref.current) == null ? void 0 : _a.dispatchEvent(evt);
    }
  };
}

// node_modules/@chakra-ui/react-children-utils/dist/index.mjs
var import_react13 = __toESM(require_react(), 1);
function getValidChildren(children) {
  return import_react13.Children.toArray(children).filter(
    (child) => (0, import_react13.isValidElement)(child)
  );
}

// node_modules/@chakra-ui/react-use-controllable-state/dist/index.mjs
var import_react14 = __toESM(require_react(), 1);
function useControllableState(props) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next
  } = props;
  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);
  const [uncontrolledState, setUncontrolledState] = (0, import_react14.useState)(defaultValue);
  const controlled = valueProp !== void 0;
  const value = controlled ? valueProp : uncontrolledState;
  const setValue = useCallbackRef(
    (next) => {
      const setter = next;
      const nextValue = typeof next === "function" ? setter(value) : next;
      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }
      if (!controlled) {
        setUncontrolledState(nextValue);
      }
      onChangeProp(nextValue);
    },
    [controlled, onChangeProp, value, shouldUpdateProp]
  );
  return [value, setValue];
}

// node_modules/@chakra-ui/lazy-utils/dist/index.mjs
function lazyDisclosure(options) {
  const { wasSelected, enabled, isSelected, mode = "unmount" } = options;
  if (!enabled)
    return true;
  if (isSelected)
    return true;
  if (mode === "keepMounted" && wasSelected)
    return true;
  return false;
}

// node_modules/@chakra-ui/menu/dist/chunk-SANI5SUM.mjs
var import_react15 = __toESM(require_react(), 1);
var [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant
] = createDescendantContext();
var [MenuProvider, useMenuContext] = createContext({
  strict: false,
  name: "MenuContext"
});
function useIds(idProp, ...prefixes) {
  const reactId = (0, import_react15.useId)();
  const id = idProp || reactId;
  return (0, import_react15.useMemo)(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`);
  }, [id, prefixes]);
}
function getOwnerDocument3(node) {
  var _a;
  return (_a = node == null ? void 0 : node.ownerDocument) != null ? _a : document;
}
function isActiveElement2(element) {
  const doc = getOwnerDocument3(element);
  return doc.activeElement === element;
}
function useMenu(props = {}) {
  const {
    id,
    closeOnSelect = true,
    closeOnBlur = true,
    initialFocusRef,
    autoSelect = true,
    isLazy,
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = "bottom-start",
    lazyBehavior = "unmount",
    direction,
    computePositionOnMount = false,
    ...popperProps
  } = props;
  const menuRef = (0, import_react15.useRef)(null);
  const buttonRef = (0, import_react15.useRef)(null);
  const descendants = useMenuDescendants();
  const focusMenu = (0, import_react15.useCallback)(() => {
    requestAnimationFrame(() => {
      var _a;
      (_a = menuRef.current) == null ? void 0 : _a.focus({ preventScroll: false });
    });
  }, []);
  const focusFirstItem = (0, import_react15.useCallback)(() => {
    const id2 = setTimeout(() => {
      var _a;
      if (initialFocusRef) {
        (_a = initialFocusRef.current) == null ? void 0 : _a.focus();
      } else {
        const first = descendants.firstEnabled();
        if (first)
          setFocusedIndex(first.index);
      }
    });
    timeoutIds.current.add(id2);
  }, [descendants, initialFocusRef]);
  const focusLastItem = (0, import_react15.useCallback)(() => {
    const id2 = setTimeout(() => {
      const last = descendants.lastEnabled();
      if (last)
        setFocusedIndex(last.index);
    });
    timeoutIds.current.add(id2);
  }, [descendants]);
  const onOpenInternal = (0, import_react15.useCallback)(() => {
    onOpenProp == null ? void 0 : onOpenProp();
    if (autoSelect) {
      focusFirstItem();
    } else {
      focusMenu();
    }
  }, [autoSelect, focusFirstItem, focusMenu, onOpenProp]);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenInternal
  });
  useOutsideClick({
    enabled: isOpen && closeOnBlur,
    ref: menuRef,
    handler: (event) => {
      var _a;
      if (!((_a = buttonRef.current) == null ? void 0 : _a.contains(event.target))) {
        onClose();
      }
    }
  });
  const popper2 = usePopper({
    ...popperProps,
    enabled: isOpen || computePositionOnMount,
    placement,
    direction
  });
  const [focusedIndex, setFocusedIndex] = (0, import_react15.useState)(-1);
  useUpdateEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);
  useFocusOnHide(menuRef, {
    focusRef: buttonRef,
    visible: isOpen,
    shouldFocus: true
  });
  const animationState = useAnimationState({ isOpen, ref: menuRef });
  const [buttonId, menuId] = useIds(id, `menu-button`, `menu-list`);
  const openAndFocusMenu = (0, import_react15.useCallback)(() => {
    onOpen();
    focusMenu();
  }, [onOpen, focusMenu]);
  const timeoutIds = (0, import_react15.useRef)(/* @__PURE__ */ new Set([]));
  (0, import_react15.useEffect)(() => {
    const ids = timeoutIds.current;
    return () => {
      ids.forEach((id2) => clearTimeout(id2));
      ids.clear();
    };
  }, []);
  const openAndFocusFirstItem = (0, import_react15.useCallback)(() => {
    onOpen();
    focusFirstItem();
  }, [focusFirstItem, onOpen]);
  const openAndFocusLastItem = (0, import_react15.useCallback)(() => {
    onOpen();
    focusLastItem();
  }, [onOpen, focusLastItem]);
  const refocus = (0, import_react15.useCallback)(() => {
    var _a, _b;
    const doc = getOwnerDocument3(menuRef.current);
    const hasFocusWithin2 = (_a = menuRef.current) == null ? void 0 : _a.contains(doc.activeElement);
    const shouldRefocus = isOpen && !hasFocusWithin2;
    if (!shouldRefocus)
      return;
    const node = (_b = descendants.item(focusedIndex)) == null ? void 0 : _b.node;
    node == null ? void 0 : node.focus({ preventScroll: true });
  }, [isOpen, focusedIndex, descendants]);
  const rafId = (0, import_react15.useRef)(null);
  return {
    openAndFocusMenu,
    openAndFocusFirstItem,
    openAndFocusLastItem,
    onTransitionEnd: refocus,
    unstable__animationState: animationState,
    descendants,
    popper: popper2,
    buttonId,
    menuId,
    forceUpdate: popper2.forceUpdate,
    orientation: "vertical",
    isOpen,
    onToggle,
    onOpen,
    onClose,
    menuRef,
    buttonRef,
    focusedIndex,
    closeOnSelect,
    closeOnBlur,
    autoSelect,
    setFocusedIndex,
    isLazy,
    lazyBehavior,
    initialFocusRef,
    rafId
  };
}
function useMenuButton(props = {}, externalRef = null) {
  const menu = useMenuContext();
  const { onToggle, popper: popper2, openAndFocusFirstItem, openAndFocusLastItem } = menu;
  const onKeyDown = (0, import_react15.useCallback)(
    (event) => {
      const eventKey = event.key;
      const keyMap = {
        Enter: openAndFocusFirstItem,
        ArrowDown: openAndFocusFirstItem,
        ArrowUp: openAndFocusLastItem
      };
      const action = keyMap[eventKey];
      if (action) {
        event.preventDefault();
        event.stopPropagation();
        action(event);
      }
    },
    [openAndFocusFirstItem, openAndFocusLastItem]
  );
  return {
    ...props,
    ref: mergeRefs(menu.buttonRef, externalRef, popper2.referenceRef),
    id: menu.buttonId,
    "data-active": dataAttr(menu.isOpen),
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu",
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(props.onClick, onToggle),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown)
  };
}
function isTargetMenuItem(target) {
  var _a;
  return isHTMLElement3(target) && !!((_a = target == null ? void 0 : target.getAttribute("role")) == null ? void 0 : _a.startsWith("menuitem"));
}
function useMenuList(props = {}, ref = null) {
  const menu = useMenuContext();
  if (!menu) {
    throw new Error(
      `useMenuContext: context is undefined. Seems you forgot to wrap component within <Menu>`
    );
  }
  const {
    focusedIndex,
    setFocusedIndex,
    menuRef,
    isOpen,
    onClose,
    menuId,
    isLazy,
    lazyBehavior,
    unstable__animationState: animated
  } = menu;
  const descendants = useMenuDescendantsContext();
  const createTypeaheadHandler = useShortcut({
    preventDefault: (event) => event.key !== " " && isTargetMenuItem(event.target)
  });
  const onKeyDown = (0, import_react15.useCallback)(
    (event) => {
      if (!event.currentTarget.contains(event.target))
        return;
      const eventKey = event.key;
      const keyMap = {
        Tab: (event2) => event2.preventDefault(),
        Escape: onClose,
        ArrowDown: () => {
          const next = descendants.nextEnabled(focusedIndex);
          if (next)
            setFocusedIndex(next.index);
        },
        ArrowUp: () => {
          const prev = descendants.prevEnabled(focusedIndex);
          if (prev)
            setFocusedIndex(prev.index);
        }
      };
      const fn2 = keyMap[eventKey];
      if (fn2) {
        event.preventDefault();
        fn2(event);
        return;
      }
      const onTypeahead = createTypeaheadHandler((character) => {
        const nextItem = getNextItemFromSearch(
          descendants.values(),
          character,
          (item) => {
            var _a, _b;
            return (_b = (_a = item == null ? void 0 : item.node) == null ? void 0 : _a.textContent) != null ? _b : "";
          },
          descendants.item(focusedIndex)
        );
        if (nextItem) {
          const index = descendants.indexOf(nextItem.node);
          setFocusedIndex(index);
        }
      });
      if (isTargetMenuItem(event.target)) {
        onTypeahead(event);
      }
    },
    [
      descendants,
      focusedIndex,
      createTypeaheadHandler,
      onClose,
      setFocusedIndex
    ]
  );
  const hasBeenOpened = (0, import_react15.useRef)(false);
  if (isOpen) {
    hasBeenOpened.current = true;
  }
  const shouldRenderChildren = lazyDisclosure({
    wasSelected: hasBeenOpened.current,
    enabled: isLazy,
    mode: lazyBehavior,
    isSelected: animated.present
  });
  return {
    ...props,
    ref: mergeRefs(menuRef, ref),
    children: shouldRenderChildren ? props.children : null,
    tabIndex: -1,
    role: "menu",
    id: menuId,
    style: {
      ...props.style,
      transformOrigin: "var(--popper-transform-origin)"
    },
    "aria-orientation": "vertical",
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown)
  };
}
function useMenuPositioner(props = {}) {
  const { popper: popper2, isOpen } = useMenuContext();
  return popper2.getPopperProps({
    ...props,
    style: {
      visibility: isOpen ? "visible" : "hidden",
      ...props.style
    }
  });
}
function useMenuItem(props = {}, externalRef = null) {
  const {
    onMouseEnter: onMouseEnterProp,
    onMouseMove: onMouseMoveProp,
    onMouseLeave: onMouseLeaveProp,
    onClick: onClickProp,
    onFocus: onFocusProp,
    isDisabled: isDisabled2,
    isFocusable: isFocusable2,
    closeOnSelect,
    type: typeProp,
    ...htmlProps
  } = props;
  const menu = useMenuContext();
  const {
    setFocusedIndex,
    focusedIndex,
    closeOnSelect: menuCloseOnSelect,
    onClose,
    menuRef,
    isOpen,
    menuId,
    rafId
  } = menu;
  const ref = (0, import_react15.useRef)(null);
  const id = `${menuId}-menuitem-${(0, import_react15.useId)()}`;
  const { index, register } = useMenuDescendant({
    disabled: isDisabled2 && !isFocusable2
  });
  const onMouseEnter = (0, import_react15.useCallback)(
    (event) => {
      onMouseEnterProp == null ? void 0 : onMouseEnterProp(event);
      if (isDisabled2)
        return;
      setFocusedIndex(index);
    },
    [setFocusedIndex, index, isDisabled2, onMouseEnterProp]
  );
  const onMouseMove = (0, import_react15.useCallback)(
    (event) => {
      onMouseMoveProp == null ? void 0 : onMouseMoveProp(event);
      if (ref.current && !isActiveElement2(ref.current)) {
        onMouseEnter(event);
      }
    },
    [onMouseEnter, onMouseMoveProp]
  );
  const onMouseLeave = (0, import_react15.useCallback)(
    (event) => {
      onMouseLeaveProp == null ? void 0 : onMouseLeaveProp(event);
      if (isDisabled2)
        return;
      setFocusedIndex(-1);
    },
    [setFocusedIndex, isDisabled2, onMouseLeaveProp]
  );
  const onClick = (0, import_react15.useCallback)(
    (event) => {
      onClickProp == null ? void 0 : onClickProp(event);
      if (!isTargetMenuItem(event.currentTarget))
        return;
      if (closeOnSelect != null ? closeOnSelect : menuCloseOnSelect) {
        onClose();
      }
    },
    [onClose, onClickProp, menuCloseOnSelect, closeOnSelect]
  );
  const onFocus = (0, import_react15.useCallback)(
    (event) => {
      onFocusProp == null ? void 0 : onFocusProp(event);
      setFocusedIndex(index);
    },
    [setFocusedIndex, onFocusProp, index]
  );
  const isFocused = index === focusedIndex;
  const trulyDisabled = isDisabled2 && !isFocusable2;
  useUpdateEffect(() => {
    if (!isOpen)
      return;
    if (isFocused && !trulyDisabled && ref.current) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(() => {
        var _a;
        (_a = ref.current) == null ? void 0 : _a.focus({ preventScroll: true });
        rafId.current = null;
      });
    } else if (menuRef.current && !isActiveElement2(menuRef.current)) {
      menuRef.current.focus({ preventScroll: true });
    }
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isFocused, trulyDisabled, menuRef, isOpen]);
  const clickableProps = useClickable({
    onClick,
    onFocus,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    ref: mergeRefs(register, ref, externalRef),
    isDisabled: isDisabled2,
    isFocusable: isFocusable2
  });
  return {
    ...htmlProps,
    ...clickableProps,
    type: typeProp != null ? typeProp : clickableProps.type,
    id,
    role: "menuitem",
    tabIndex: isFocused ? 0 : -1
  };
}
function useMenuOption(props = {}, ref = null) {
  const { type = "radio", isChecked, ...rest } = props;
  const ownProps = useMenuItem(rest, ref);
  return {
    ...ownProps,
    role: `menuitem${type}`,
    "aria-checked": isChecked
  };
}
function useMenuOptionGroup(props = {}) {
  const {
    children,
    type = "radio",
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
    ...htmlProps
  } = props;
  const isRadio = type === "radio";
  const fallback = isRadio ? "" : [];
  const [value, setValue] = useControllableState({
    defaultValue: defaultValue != null ? defaultValue : fallback,
    value: valueProp,
    onChange: onChangeProp
  });
  const onChange = (0, import_react15.useCallback)(
    (selectedValue) => {
      if (type === "radio" && typeof value === "string") {
        setValue(selectedValue);
      }
      if (type === "checkbox" && Array.isArray(value)) {
        const nextValue = value.includes(selectedValue) ? value.filter((item) => item !== selectedValue) : value.concat(selectedValue);
        setValue(nextValue);
      }
    },
    [value, setValue, type]
  );
  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child) => {
    if (child.type.id !== "MenuItemOption")
      return child;
    const onClick = (event) => {
      var _a, _b;
      onChange(child.props.value);
      (_b = (_a = child.props).onClick) == null ? void 0 : _b.call(_a, event);
    };
    const isChecked = type === "radio" ? child.props.value === value : value.includes(child.props.value);
    return (0, import_react15.cloneElement)(child, {
      type,
      onClick,
      isChecked
    });
  });
  return {
    ...htmlProps,
    children: clones
  };
}
function useMenuState() {
  const { isOpen, onClose } = useMenuContext();
  return { isOpen, onClose };
}
function isHTMLElement3(el) {
  var _a;
  if (!isElement4(el))
    return false;
  const win = (_a = el.ownerDocument.defaultView) != null ? _a : window;
  return el instanceof win.HTMLElement;
}
function isElement4(el) {
  return el != null && typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
}

// node_modules/@chakra-ui/menu/dist/chunk-UZJ3TPNQ.mjs
var import_react16 = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var [MenuStylesProvider, useMenuStyles] = createContext({
  name: `MenuStylesContext`,
  errorMessage: `useMenuStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Menu />" `
});
var Menu = (props) => {
  const { children } = props;
  const styles = useMultiStyleConfig("Menu", props);
  const ownProps = omitThemingProps(props);
  const { direction } = useTheme();
  const { descendants, ...ctx } = useMenu({ ...ownProps, direction });
  const context = (0, import_react16.useMemo)(() => ctx, [ctx]);
  const { isOpen, onClose, forceUpdate } = context;
  return (0, import_jsx_runtime.jsx)(MenuDescendantsProvider, { value: descendants, children: (0, import_jsx_runtime.jsx)(MenuProvider, { value: context, children: (0, import_jsx_runtime.jsx)(MenuStylesProvider, { value: styles, children: runIfFn(children, { isOpen, onClose, forceUpdate }) }) }) });
};
Menu.displayName = "Menu";

// node_modules/@chakra-ui/menu/dist/chunk-4CNGLKYX.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var MenuCommand = forwardRef(
  (props, ref) => {
    const styles = useMenuStyles();
    return (0, import_jsx_runtime2.jsx)(
      chakra.span,
      {
        ref,
        ...props,
        __css: styles.command,
        className: "chakra-menu__command"
      }
    );
  }
);
MenuCommand.displayName = "MenuCommand";

// node_modules/@chakra-ui/menu/dist/chunk-M565QO7N.mjs
var import_react17 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var StyledMenuItem = forwardRef(
  (props, ref) => {
    const { type, ...rest } = props;
    const styles = useMenuStyles();
    const btnType = rest.as || type ? type != null ? type : void 0 : "button";
    const buttonStyles = (0, import_react17.useMemo)(
      () => ({
        textDecoration: "none",
        color: "inherit",
        userSelect: "none",
        display: "flex",
        width: "100%",
        alignItems: "center",
        textAlign: "start",
        flex: "0 0 auto",
        outline: 0,
        ...styles.item
      }),
      [styles.item]
    );
    return (0, import_jsx_runtime3.jsx)(chakra.button, { ref, type: btnType, ...rest, __css: buttonStyles });
  }
);

// node_modules/@chakra-ui/menu/dist/chunk-HB6KBUMZ.mjs
var import_react18 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var MenuIcon = (props) => {
  const { className, children, ...rest } = props;
  const styles = useMenuStyles();
  const child = import_react18.Children.only(children);
  const clone = (0, import_react18.isValidElement)(child) ? (0, import_react18.cloneElement)(child, {
    focusable: "false",
    "aria-hidden": true,
    className: cx("chakra-menu__icon", child.props.className)
  }) : null;
  const _className = cx("chakra-menu__icon-wrapper", className);
  return (0, import_jsx_runtime4.jsx)(chakra.span, { className: _className, ...rest, __css: styles.icon, children: clone });
};
MenuIcon.displayName = "MenuIcon";

// node_modules/@chakra-ui/menu/dist/chunk-5TWLKMYI.mjs
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var MenuItem = forwardRef((props, ref) => {
  const {
    icon,
    iconSpacing = "0.75rem",
    command,
    commandSpacing = "0.75rem",
    children,
    ...rest
  } = props;
  const menuitemProps = useMenuItem(rest, ref);
  const shouldWrap = icon || command;
  const _children = shouldWrap ? (0, import_jsx_runtime5.jsx)("span", { style: { pointerEvents: "none", flex: 1 }, children }) : children;
  return (0, import_jsx_runtime5.jsxs)(
    StyledMenuItem,
    {
      ...menuitemProps,
      className: cx("chakra-menu__menuitem", menuitemProps.className),
      children: [
        icon && (0, import_jsx_runtime5.jsx)(MenuIcon, { fontSize: "0.8em", marginEnd: iconSpacing, children: icon }),
        _children,
        command && (0, import_jsx_runtime5.jsx)(MenuCommand, { marginStart: commandSpacing, children: command })
      ]
    }
  );
});
MenuItem.displayName = "MenuItem";

// node_modules/@chakra-ui/menu/dist/chunk-6MF6NSK4.mjs
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var motionVariants = {
  enter: {
    visibility: "visible",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    transitionEnd: {
      visibility: "hidden"
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: "easeOut"
    }
  }
};
var MenuTransition = chakra(motion.div);
var MenuList = forwardRef(function MenuList2(props, ref) {
  var _a, _b;
  const { rootProps, motionProps, ...rest } = props;
  const {
    isOpen,
    onTransitionEnd,
    unstable__animationState: animated
  } = useMenuContext();
  const listProps = useMenuList(rest, ref);
  const positionerProps = useMenuPositioner(rootProps);
  const styles = useMenuStyles();
  return (0, import_jsx_runtime6.jsx)(
    chakra.div,
    {
      ...positionerProps,
      __css: { zIndex: (_b = props.zIndex) != null ? _b : (_a = styles.list) == null ? void 0 : _a.zIndex },
      children: (0, import_jsx_runtime6.jsx)(
        MenuTransition,
        {
          variants: motionVariants,
          initial: false,
          animate: isOpen ? "enter" : "exit",
          __css: { outline: 0, ...styles.list },
          ...motionProps,
          className: cx("chakra-menu__menu-list", listProps.className),
          ...listProps,
          onUpdate: onTransitionEnd,
          onAnimationComplete: callAll(
            animated.onComplete,
            listProps.onAnimationComplete
          )
        }
      )
    }
  );
});
MenuList.displayName = "MenuList";

// node_modules/@chakra-ui/menu/dist/chunk-PTXXWAJU.mjs
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var MenuGroup = forwardRef((props, ref) => {
  const { title, children, className, ...rest } = props;
  const _className = cx("chakra-menu__group__title", className);
  const styles = useMenuStyles();
  return (0, import_jsx_runtime7.jsxs)("div", { ref, className: "chakra-menu__group", role: "group", children: [
    title && (0, import_jsx_runtime7.jsx)(chakra.p, { className: _className, ...rest, __css: styles.groupTitle, children: title }),
    children
  ] });
});
MenuGroup.displayName = "MenuGroup";

// node_modules/@chakra-ui/menu/dist/chunk-IOKLOFVX.mjs
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var MenuOptionGroup = (props) => {
  const { className, title, ...rest } = props;
  const ownProps = useMenuOptionGroup(rest);
  return (0, import_jsx_runtime8.jsx)(
    MenuGroup,
    {
      title,
      className: cx("chakra-menu__option-group", className),
      ...ownProps
    }
  );
};
MenuOptionGroup.displayName = "MenuOptionGroup";

// node_modules/@chakra-ui/menu/dist/chunk-Z3VR2BFQ.mjs
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var StyledMenuButton = forwardRef((props, ref) => {
  const styles = useMenuStyles();
  return (0, import_jsx_runtime9.jsx)(
    chakra.button,
    {
      ref,
      ...props,
      __css: {
        display: "inline-flex",
        appearance: "none",
        alignItems: "center",
        outline: 0,
        ...styles.button
      }
    }
  );
});
var MenuButton = forwardRef(
  (props, ref) => {
    const { children, as: As, ...rest } = props;
    const buttonProps = useMenuButton(rest, ref);
    const Element2 = As || StyledMenuButton;
    return (0, import_jsx_runtime9.jsx)(
      Element2,
      {
        ...buttonProps,
        className: cx("chakra-menu__menu-button", props.className),
        children: (0, import_jsx_runtime9.jsx)(
          chakra.span,
          {
            __css: { pointerEvents: "none", flex: "1 1 auto", minW: 0 },
            children: props.children
          }
        )
      }
    );
  }
);
MenuButton.displayName = "MenuButton";

// node_modules/@chakra-ui/menu/dist/chunk-H43S3DLB.mjs
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var MenuDivider = (props) => {
  const { className, ...rest } = props;
  const styles = useMenuStyles();
  return (0, import_jsx_runtime10.jsx)(
    chakra.hr,
    {
      "aria-orientation": "horizontal",
      className: cx("chakra-menu__divider", className),
      ...rest,
      __css: styles.divider
    }
  );
};
MenuDivider.displayName = "MenuDivider";

// node_modules/@chakra-ui/menu/dist/chunk-B3RAGXFV.mjs
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var CheckIcon = (props) => (0, import_jsx_runtime11.jsx)("svg", { viewBox: "0 0 14 14", width: "1em", height: "1em", ...props, children: (0, import_jsx_runtime11.jsx)(
  "polygon",
  {
    fill: "currentColor",
    points: "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
  }
) });
var MenuItemOption = forwardRef(
  (props, ref) => {
    const { icon, iconSpacing = "0.75rem", ...rest } = props;
    const optionProps = useMenuOption(rest, ref);
    return (0, import_jsx_runtime11.jsxs)(
      StyledMenuItem,
      {
        ...optionProps,
        className: cx("chakra-menu__menuitem-option", rest.className),
        children: [
          icon !== null && (0, import_jsx_runtime11.jsx)(
            MenuIcon,
            {
              fontSize: "0.8em",
              marginEnd: iconSpacing,
              opacity: props.isChecked ? 1 : 0,
              children: icon || (0, import_jsx_runtime11.jsx)(CheckIcon, {})
            }
          ),
          (0, import_jsx_runtime11.jsx)("span", { style: { flex: 1 }, children: optionProps.children })
        ]
      }
    );
  }
);
MenuItemOption.id = "MenuItemOption";
MenuItemOption.displayName = "MenuItemOption";

export {
  mergeRefs,
  useMergeRefs,
  useClickable,
  createDescendantContext,
  getScrollParent,
  getAllFocusable,
  useEventListener,
  useFocusOnHide,
  useFocusOnShow,
  cssVars,
  usePopper,
  useDisclosure,
  useAnimationState,
  getValidChildren,
  useControllableState,
  lazyDisclosure,
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
  MenuProvider,
  useMenuContext,
  useMenu,
  useMenuButton,
  useMenuList,
  useMenuPositioner,
  useMenuItem,
  useMenuOption,
  useMenuOptionGroup,
  useMenuState,
  useMenuStyles,
  Menu,
  MenuCommand,
  MenuIcon,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuOptionGroup,
  MenuButton,
  MenuDivider,
  MenuItemOption
};
//# sourceMappingURL=chunk-2HKBA6KI.js.map
