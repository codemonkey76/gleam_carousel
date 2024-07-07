// build/dev/javascript/prelude.mjs
var CustomType = class {
  withFields(fields) {
    let properties = Object.keys(this).map(
      (label) => label in fields ? fields[label] : this[label]
    );
    return new this.constructor(...properties);
  }
};
var List = class {
  static fromArray(array3, tail) {
    let t = tail || new Empty();
    for (let i = array3.length - 1; i >= 0; --i) {
      t = new NonEmpty(array3[i], t);
    }
    return t;
  }
  [Symbol.iterator]() {
    return new ListIterator(this);
  }
  toArray() {
    return [...this];
  }
  // @internal
  atLeastLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return true;
      desired--;
    }
    return desired <= 0;
  }
  // @internal
  hasLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return false;
      desired--;
    }
    return desired === 0;
  }
  countLength() {
    let length2 = 0;
    for (let _ of this)
      length2++;
    return length2;
  }
};
function toList(elements, tail) {
  return List.fromArray(elements, tail);
}
var ListIterator = class {
  #current;
  constructor(current) {
    this.#current = current;
  }
  next() {
    if (this.#current instanceof Empty) {
      return { done: true };
    } else {
      let { head, tail } = this.#current;
      this.#current = tail;
      return { value: head, done: false };
    }
  }
};
var Empty = class extends List {
};
var NonEmpty = class extends List {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
};
var Result = class _Result extends CustomType {
  // @internal
  static isResult(data) {
    return data instanceof _Result;
  }
};
var Ok = class extends Result {
  constructor(value) {
    super();
    this[0] = value;
  }
  // @internal
  isOk() {
    return true;
  }
};
var Error = class extends Result {
  constructor(detail) {
    super();
    this[0] = detail;
  }
  // @internal
  isOk() {
    return false;
  }
};
function makeError(variant, module, line, fn, message, extra) {
  let error = new globalThis.Error(message);
  error.gleam_error = variant;
  error.module = module;
  error.line = line;
  error.fn = fn;
  for (let k in extra)
    error[k] = extra[k];
  return error;
}

// build/dev/javascript/gleam_stdlib/gleam/option.mjs
var Some = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var None = class extends CustomType {
};

// build/dev/javascript/gleam_stdlib/gleam/list.mjs
function fold(loop$list, loop$initial, loop$fun) {
  while (true) {
    let list = loop$list;
    let initial = loop$initial;
    let fun = loop$fun;
    if (list.hasLength(0)) {
      return initial;
    } else {
      let x = list.head;
      let rest$1 = list.tail;
      loop$list = rest$1;
      loop$initial = fun(initial, x);
      loop$fun = fun;
    }
  }
}

// build/dev/javascript/gleam_stdlib/gleam/dynamic.mjs
function from(a) {
  return identity(a);
}

// build/dev/javascript/gleam_stdlib/dict.mjs
var tempDataView = new DataView(new ArrayBuffer(8));
var SHIFT = 5;
var BUCKET_SIZE = Math.pow(2, SHIFT);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// build/dev/javascript/gleam_stdlib/gleam_stdlib.mjs
function identity(x) {
  return x;
}
function to_string3(term) {
  return term.toString();
}
function console_log(term) {
  console.log(term);
}

// build/dev/javascript/gleam_stdlib/gleam/int.mjs
function to_string(x) {
  return to_string3(x);
}

// build/dev/javascript/gleam_stdlib/gleam/io.mjs
function println(string3) {
  return console_log(string3);
}

// build/dev/javascript/gleam_stdlib/gleam/bool.mjs
function guard(requirement, consequence, alternative) {
  if (requirement) {
    return consequence;
  } else {
    return alternative();
  }
}

// build/dev/javascript/lustre/lustre/effect.mjs
var Effect = class extends CustomType {
  constructor(all) {
    super();
    this.all = all;
  }
};
function from2(effect) {
  return new Effect(toList([(dispatch, _) => {
    return effect(dispatch);
  }]));
}
function none() {
  return new Effect(toList([]));
}

// build/dev/javascript/lustre/lustre/internals/vdom.mjs
var Text = class extends CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
};
var Element = class extends CustomType {
  constructor(key, namespace2, tag, attrs, children, self_closing, void$) {
    super();
    this.key = key;
    this.namespace = namespace2;
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.self_closing = self_closing;
    this.void = void$;
  }
};
var Attribute = class extends CustomType {
  constructor(x0, x1, as_property) {
    super();
    this[0] = x0;
    this[1] = x1;
    this.as_property = as_property;
  }
};
var Event = class extends CustomType {
  constructor(x0, x1) {
    super();
    this[0] = x0;
    this[1] = x1;
  }
};

// build/dev/javascript/lustre/lustre/attribute.mjs
function attribute(name, value) {
  return new Attribute(name, from(value), false);
}
function on(name, handler) {
  return new Event("on" + name, handler);
}
function style(properties) {
  return attribute(
    "style",
    fold(
      properties,
      "",
      (styles, _use1) => {
        let name$1 = _use1[0];
        let value$1 = _use1[1];
        return styles + name$1 + ":" + value$1 + ";";
      }
    )
  );
}
function class$(name) {
  return attribute("class", name);
}
function id(name) {
  return attribute("id", name);
}
function role(name) {
  return attribute("role", name);
}

// build/dev/javascript/lustre/lustre/element.mjs
function element(tag, attrs, children) {
  if (tag === "area") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "base") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "br") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "col") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "embed") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "hr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "img") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "input") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "link") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "meta") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "param") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "source") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "track") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "wbr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else {
    return new Element("", "", tag, attrs, children, false, false);
  }
}
function namespaced(namespace2, tag, attrs, children) {
  return new Element("", namespace2, tag, attrs, children, false, false);
}
function text(content) {
  return new Text(content);
}

// build/dev/javascript/lustre/lustre/internals/runtime.mjs
var Debug = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Dispatch = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Shutdown = class extends CustomType {
};
var ForceModel = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};

// build/dev/javascript/lustre/vdom.ffi.mjs
function morph(prev, next, dispatch, isComponent = false) {
  let out;
  let stack = [{ prev, next, parent: prev.parentNode }];
  while (stack.length) {
    let { prev: prev2, next: next2, parent } = stack.pop();
    if (next2.subtree !== void 0)
      next2 = next2.subtree();
    if (next2.content !== void 0) {
      if (!prev2) {
        const created = document.createTextNode(next2.content);
        parent.appendChild(created);
        out ??= created;
      } else if (prev2.nodeType === Node.TEXT_NODE) {
        if (prev2.textContent !== next2.content)
          prev2.textContent = next2.content;
        out ??= prev2;
      } else {
        const created = document.createTextNode(next2.content);
        parent.replaceChild(created, prev2);
        out ??= created;
      }
    } else if (next2.tag !== void 0) {
      const created = createElementNode({
        prev: prev2,
        next: next2,
        dispatch,
        stack,
        isComponent
      });
      if (!prev2) {
        parent.appendChild(created);
      } else if (prev2 !== created) {
        parent.replaceChild(created, prev2);
      }
      out ??= created;
    } else if (next2.elements !== void 0) {
      iterateElement(next2, (fragmentElement) => {
        stack.unshift({ prev: prev2, next: fragmentElement, parent });
        prev2 = prev2?.nextSibling;
      });
    } else if (next2.subtree !== void 0) {
      stack.push({ prev: prev2, next: next2, parent });
    }
  }
  return out;
}
function createElementNode({ prev, next, dispatch, stack }) {
  const namespace2 = next.namespace || "http://www.w3.org/1999/xhtml";
  const canMorph = prev && prev.nodeType === Node.ELEMENT_NODE && prev.localName === next.tag && prev.namespaceURI === (next.namespace || "http://www.w3.org/1999/xhtml");
  const el2 = canMorph ? prev : namespace2 ? document.createElementNS(namespace2, next.tag) : document.createElement(next.tag);
  let handlersForEl;
  if (!registeredHandlers.has(el2)) {
    const emptyHandlers = /* @__PURE__ */ new Map();
    registeredHandlers.set(el2, emptyHandlers);
    handlersForEl = emptyHandlers;
  } else {
    handlersForEl = registeredHandlers.get(el2);
  }
  const prevHandlers = canMorph ? new Set(handlersForEl.keys()) : null;
  const prevAttributes = canMorph ? new Set(Array.from(prev.attributes, (a) => a.name)) : null;
  let className = null;
  let style2 = null;
  let innerHTML = null;
  for (const attr of next.attrs) {
    const name = attr[0];
    const value = attr[1];
    if (attr.as_property) {
      if (el2[name] !== value)
        el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    } else if (name.startsWith("on")) {
      const eventName = name.slice(2);
      const callback = dispatch(value);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      if (canMorph)
        prevHandlers.delete(eventName);
    } else if (name.startsWith("data-lustre-on-")) {
      const eventName = name.slice(15);
      const callback = dispatch(lustreServerEventHandler);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      el2.setAttribute(name, value);
    } else if (name === "class") {
      className = className === null ? value : className + " " + value;
    } else if (name === "style") {
      style2 = style2 === null ? value : style2 + value;
    } else if (name === "dangerous-unescaped-html") {
      innerHTML = value;
    } else {
      if (el2.getAttribute(name) !== value)
        el2.setAttribute(name, value);
      if (name === "value" || name === "selected")
        el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    }
  }
  if (className !== null) {
    el2.setAttribute("class", className);
    if (canMorph)
      prevAttributes.delete("class");
  }
  if (style2 !== null) {
    el2.setAttribute("style", style2);
    if (canMorph)
      prevAttributes.delete("style");
  }
  if (canMorph) {
    for (const attr of prevAttributes) {
      el2.removeAttribute(attr);
    }
    for (const eventName of prevHandlers) {
      handlersForEl.delete(eventName);
      el2.removeEventListener(eventName, lustreGenericEventHandler);
    }
  }
  if (next.key !== void 0 && next.key !== "") {
    el2.setAttribute("data-lustre-key", next.key);
  } else if (innerHTML !== null) {
    el2.innerHTML = innerHTML;
    return el2;
  }
  let prevChild = el2.firstChild;
  let seenKeys = null;
  let keyedChildren = null;
  let incomingKeyedChildren = null;
  let firstChild = next.children[Symbol.iterator]().next().value;
  if (canMorph && firstChild !== void 0 && // Explicit checks are more verbose but truthy checks force a bunch of comparisons
  // we don't care about: it's never gonna be a number etc.
  firstChild.key !== void 0 && firstChild.key !== "") {
    seenKeys = /* @__PURE__ */ new Set();
    keyedChildren = getKeyedChildren(prev);
    incomingKeyedChildren = getKeyedChildren(next);
  }
  for (const child of next.children) {
    iterateElement(child, (currElement) => {
      if (currElement.key !== void 0 && seenKeys !== null) {
        prevChild = diffKeyedChild(
          prevChild,
          currElement,
          el2,
          stack,
          incomingKeyedChildren,
          keyedChildren,
          seenKeys
        );
      } else {
        stack.unshift({ prev: prevChild, next: currElement, parent: el2 });
        prevChild = prevChild?.nextSibling;
      }
    });
  }
  while (prevChild) {
    const next2 = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = next2;
  }
  return el2;
}
var registeredHandlers = /* @__PURE__ */ new WeakMap();
function lustreGenericEventHandler(event2) {
  const target = event2.currentTarget;
  if (!registeredHandlers.has(target)) {
    target.removeEventListener(event2.type, lustreGenericEventHandler);
    return;
  }
  const handlersForEventTarget = registeredHandlers.get(target);
  if (!handlersForEventTarget.has(event2.type)) {
    target.removeEventListener(event2.type, lustreGenericEventHandler);
    return;
  }
  handlersForEventTarget.get(event2.type)(event2);
}
function lustreServerEventHandler(event2) {
  const el2 = event2.currentTarget;
  const tag = el2.getAttribute(`data-lustre-on-${event2.type}`);
  const data = JSON.parse(el2.getAttribute("data-lustre-data") || "{}");
  const include = JSON.parse(el2.getAttribute("data-lustre-include") || "[]");
  switch (event2.type) {
    case "input":
    case "change":
      include.push("target.value");
      break;
  }
  return {
    tag,
    data: include.reduce(
      (data2, property) => {
        const path2 = property.split(".");
        for (let i = 0, o = data2, e = event2; i < path2.length; i++) {
          if (i === path2.length - 1) {
            o[path2[i]] = e[path2[i]];
          } else {
            o[path2[i]] ??= {};
            e = e[path2[i]];
            o = o[path2[i]];
          }
        }
        return data2;
      },
      { data }
    )
  };
}
function getKeyedChildren(el2) {
  const keyedChildren = /* @__PURE__ */ new Map();
  if (el2) {
    for (const child of el2.children) {
      iterateElement(child, (currElement) => {
        const key = currElement?.key || currElement?.getAttribute?.("data-lustre-key");
        if (key)
          keyedChildren.set(key, currElement);
      });
    }
  }
  return keyedChildren;
}
function diffKeyedChild(prevChild, child, el2, stack, incomingKeyedChildren, keyedChildren, seenKeys) {
  while (prevChild && !incomingKeyedChildren.has(prevChild.getAttribute("data-lustre-key"))) {
    const nextChild = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = nextChild;
  }
  if (keyedChildren.size === 0) {
    iterateElement(child, (currChild) => {
      stack.unshift({ prev: prevChild, next: currChild, parent: el2 });
      prevChild = prevChild?.nextSibling;
    });
    return prevChild;
  }
  if (seenKeys.has(child.key)) {
    console.warn(`Duplicate key found in Lustre vnode: ${child.key}`);
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  seenKeys.add(child.key);
  const keyedChild = keyedChildren.get(child.key);
  if (!keyedChild && !prevChild) {
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild && prevChild !== null) {
    const placeholder = document.createTextNode("");
    el2.insertBefore(placeholder, prevChild);
    stack.unshift({ prev: placeholder, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild || keyedChild === prevChild) {
    stack.unshift({ prev: prevChild, next: child, parent: el2 });
    prevChild = prevChild?.nextSibling;
    return prevChild;
  }
  el2.insertBefore(keyedChild, prevChild);
  stack.unshift({ prev: keyedChild, next: child, parent: el2 });
  return prevChild;
}
function iterateElement(element2, processElement) {
  if (element2.elements !== void 0) {
    for (const currElement of element2.elements) {
      processElement(currElement);
    }
  } else {
    processElement(element2);
  }
}

// build/dev/javascript/lustre/client-runtime.ffi.mjs
var LustreClientApplication2 = class _LustreClientApplication {
  #root = null;
  #queue = [];
  #effects = [];
  #didUpdate = false;
  #isComponent = false;
  #model = null;
  #update = null;
  #view = null;
  static start(flags, selector, init3, update3, view2) {
    if (!is_browser())
      return new Error(new NotABrowser());
    const root2 = selector instanceof HTMLElement ? selector : document.querySelector(selector);
    if (!root2)
      return new Error(new ElementNotFound(selector));
    const app = new _LustreClientApplication(init3(flags), update3, view2, root2);
    return new Ok((msg) => app.send(msg));
  }
  constructor([model, effects], update3, view2, root2 = document.body, isComponent = false) {
    this.#model = model;
    this.#update = update3;
    this.#view = view2;
    this.#root = root2;
    this.#effects = effects.all.toArray();
    this.#didUpdate = true;
    this.#isComponent = isComponent;
    window.requestAnimationFrame(() => this.#tick());
  }
  send(action) {
    switch (true) {
      case action instanceof Dispatch: {
        this.#queue.push(action[0]);
        this.#tick();
        return;
      }
      case action instanceof Shutdown: {
        this.#shutdown();
        return;
      }
      case action instanceof Debug: {
        this.#debug(action[0]);
        return;
      }
      default:
        return;
    }
  }
  emit(event2, data) {
    this.#root.dispatchEvent(
      new CustomEvent(event2, {
        bubbles: true,
        detail: data,
        composed: true
      })
    );
  }
  #tick() {
    this.#flush_queue();
    if (this.#didUpdate) {
      const vdom = this.#view(this.#model);
      const dispatch = (handler) => (e) => {
        const result = handler(e);
        if (result instanceof Ok) {
          this.send(new Dispatch(result[0]));
        }
      };
      this.#didUpdate = false;
      this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
    }
  }
  #flush_queue(iterations = 0) {
    while (this.#queue.length) {
      const [next, effects] = this.#update(this.#model, this.#queue.shift());
      this.#didUpdate ||= this.#model !== next;
      this.#model = next;
      this.#effects = this.#effects.concat(effects.all.toArray());
    }
    while (this.#effects.length) {
      this.#effects.shift()(
        (msg) => this.send(new Dispatch(msg)),
        (event2, data) => this.emit(event2, data)
      );
    }
    if (this.#queue.length) {
      if (iterations < 5) {
        this.#flush_queue(++iterations);
      } else {
        window.requestAnimationFrame(() => this.#tick());
      }
    }
  }
  #debug(action) {
    switch (true) {
      case action instanceof ForceModel: {
        const vdom = this.#view(action[0]);
        const dispatch = (handler) => (e) => {
          const result = handler(e);
          if (result instanceof Ok) {
            this.send(new Dispatch(result[0]));
          }
        };
        this.#queue = [];
        this.#effects = [];
        this.#didUpdate = false;
        this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
      }
    }
  }
  #shutdown() {
    this.#root.remove();
    this.#root = null;
    this.#model = null;
    this.#queue = [];
    this.#effects = [];
    this.#didUpdate = false;
    this.#update = () => {
    };
    this.#view = () => {
    };
  }
};
var start = (app, selector, flags) => LustreClientApplication2.start(
  flags,
  selector,
  app.init,
  app.update,
  app.view
);
var is_browser = () => globalThis.window && window.document;

// build/dev/javascript/lustre/lustre.mjs
var App = class extends CustomType {
  constructor(init3, update3, view2, on_attribute_change) {
    super();
    this.init = init3;
    this.update = update3;
    this.view = view2;
    this.on_attribute_change = on_attribute_change;
  }
};
var ElementNotFound = class extends CustomType {
  constructor(selector) {
    super();
    this.selector = selector;
  }
};
var NotABrowser = class extends CustomType {
};
function application(init3, update3, view2) {
  return new App(init3, update3, view2, new None());
}
function start3(app, selector, flags) {
  return guard(
    !is_browser(),
    new Error(new NotABrowser()),
    () => {
      return start(app, selector, flags);
    }
  );
}

// build/dev/javascript/lustre/lustre/element/html.mjs
function h1(attrs, children) {
  return element("h1", attrs, children);
}
function h4(attrs, children) {
  return element("h4", attrs, children);
}
function nav(attrs, children) {
  return element("nav", attrs, children);
}
function div(attrs, children) {
  return element("div", attrs, children);
}
function span(attrs, children) {
  return element("span", attrs, children);
}
function button(attrs, children) {
  return element("button", attrs, children);
}

// build/dev/javascript/lustre/lustre/element/svg.mjs
var namespace = "http://www.w3.org/2000/svg";
function svg(attrs, children) {
  return namespaced(namespace, "svg", attrs, children);
}
function path(attrs) {
  return namespaced(namespace, "path", attrs, toList([]));
}

// build/dev/javascript/lustre/lustre/event.mjs
function on2(name, handler) {
  return on(name, handler);
}
function on_click(msg) {
  return on2("click", (_) => {
    return new Ok(msg);
  });
}
function on_mouse_enter(msg) {
  return on2("mouseenter", (_) => {
    return new Ok(msg);
  });
}
function on_mouse_leave(msg) {
  return on2("mouseleave", (_) => {
    return new Ok(msg);
  });
}

// build/dev/javascript/carousel/ffi.mjs
function requestAnimationFrame(callback) {
  window.requestAnimationFrame(callback);
}
function resetAnimations(selector) {
  const el2 = document.querySelector(selector);
  if (el2 === null) {
    console.log(`Invalid selector: ${selector}`);
    return;
  }
  const animations = el2.getAnimations({ subtree: true });
  animations.forEach((animation) => {
    animation.pause();
    animation.currentTime = 0;
  });
}
function playAnimationsForSlide(selector, index) {
  const found = document.querySelectorAll(selector);
  if (!found || index >= found.length) {
    return;
  }
  const animations = found[index].getAnimations({ subtree: true });
  if (!animations) {
    return;
  }
  animations.forEach((animation) => {
    animation.currentTime = 0;
    animation.play();
  });
}
function setTimeout(delay, callback) {
  return globalThis.setTimeout(callback, delay);
}
function clearTimeout(timer) {
  globalThis.clearTimeout(timer);
}

// build/dev/javascript/carousel/carousel/types.mjs
var UserClickedSlidePage = class extends CustomType {
  constructor(slide_index) {
    super();
    this.slide_index = slide_index;
  }
};
var UserClickedSlideNext = class extends CustomType {
};
var UserClickedSlidePrev = class extends CustomType {
};
var AutoplayTimeoutTriggered = class extends CustomType {
};
var AutoplayTimeoutSet = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var UserMouseOveredCarousel = class extends CustomType {
};
var UserMouseLeftCarousel = class extends CustomType {
};
var Model = class extends CustomType {
  constructor(current_slide_index, total_slides, timer) {
    super();
    this.current_slide_index = current_slide_index;
    this.total_slides = total_slides;
    this.timer = timer;
  }
};

// build/dev/javascript/carousel/carousel/ui.mjs
function prev_button() {
  return div(
    toList([class$("absolute top-0 bottom-0 flex items-center")]),
    toList([
      div(
        toList([class$("p-10 pl-2 group")]),
        toList([
          button(
            toList([
              on_click(new UserClickedSlidePrev()),
              attribute("title", "Previous Slide"),
              class$(
                "flex items-center justify-center w-10 h-10 p-3 rounded-full duration-200 group-hover:bg-white/30 text-transparent group-hover:text-gray-900/80"
              )
            ]),
            toList([
              svg(
                toList([
                  class$("fill-current"),
                  attribute("xmlns", "http://www.w3.org/2000/svg"),
                  attribute("viewBox", "0 0 320 512")
                ]),
                toList([
                  path(
                    toList([
                      attribute(
                        "d",
                        "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                      )
                    ])
                  )
                ])
              )
            ])
          )
        ])
      )
    ])
  );
}
function next_button() {
  return div(
    toList([class$("absolute top-0 bottom-0 right-0 flex items-center")]),
    toList([
      div(
        toList([class$("p-10 pr-2 group")]),
        toList([
          button(
            toList([
              on_click(new UserClickedSlideNext()),
              attribute("title", "Next Slide"),
              class$(
                "flex items-center justify-center w-10 h-10 p-3 rounded-full duration-200 group-hover:bg-white/30 text-transparent group-hover:text-gray-900/80"
              )
            ]),
            toList([
              svg(
                toList([
                  class$("fill-current"),
                  attribute("xmlns", "http://www.w3.org/2000/svg"),
                  attribute("viewBox", "0 0 320 512")
                ]),
                toList([
                  path(
                    toList([
                      attribute(
                        "d",
                        "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                      )
                    ])
                  )
                ])
              )
            ])
          )
        ])
      )
    ])
  );
}

// build/dev/javascript/carousel/carousel/effects.mjs
function start_autoplay() {
  return from2(
    (dispatch) => {
      return requestAnimationFrame(
        (_) => {
          let timer = setTimeout(
            1e3,
            () => {
              return dispatch(new AutoplayTimeoutTriggered());
            }
          );
          let _pipe = new AutoplayTimeoutSet(timer);
          return dispatch(_pipe);
        }
      );
    }
  );
}
function start_animations(slide_selector2, slide_index) {
  return from2(
    (_) => {
      return requestAnimationFrame(
        (_2) => {
          playAnimationsForSlide(slide_selector2, slide_index);
          return void 0;
        }
      );
    }
  );
}
function init_animations(carousel_selector2, slide_selector2, slide_index) {
  return from2(
    (dispatch) => {
      return requestAnimationFrame(
        (_) => {
          resetAnimations(carousel_selector2);
          playAnimationsForSlide(slide_selector2, slide_index);
          let timer = setTimeout(
            1e3,
            () => {
              return dispatch(new AutoplayTimeoutTriggered());
            }
          );
          let _pipe = new AutoplayTimeoutSet(timer);
          return dispatch(_pipe);
        }
      );
    }
  );
}

// build/dev/javascript/carousel/carousel/slides.mjs
function get_transform(slide_number, current_slide) {
  return [
    "transform",
    "translateX(" + to_string(100 * (slide_number - current_slide)) + "%)"
  ];
}
function slide(image_url, slide_index, current_index, content) {
  return div(
    toList([
      class$("w-full h-full absolute bg-cover py-12 slide"),
      style(
        toList([
          ["background-image", "url('" + image_url + "')"],
          ["transition", "transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);"],
          get_transform(slide_index, current_index)
        ])
      )
    ]),
    toList([content()])
  );
}
function check_item(classes, content) {
  return div(
    toList([class$(classes), class$("flex items-center space-x-2")]),
    toList([
      svg(
        toList([
          class$("fill-current text-brand-purple size-6 relative svg-shadow"),
          attribute("xmlns", "http://www.w3.org/2000/svg"),
          attribute("viewBox", "0 0 512 512")
        ]),
        toList([
          path(
            toList([
              attribute(
                "d",
                "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
              )
            ])
          )
        ])
      ),
      svg(
        toList([
          class$("fill-current absolute svg-shadow size-3"),
          attribute("xmlns", "http://www.w3.org/2000/svg"),
          attribute("viewBox", "0 0 448 512")
        ]),
        toList([
          path(
            toList([
              attribute(
                "d",
                "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              )
            ])
          )
        ])
      ),
      span(
        toList([class$("text-lg tracking-tight text-shadow")]),
        toList([text(content)])
      )
    ])
  );
}
function slide1_content() {
  return div(
    toList([class$("font-display py-12 space-y-4 p-8 relative h-100")]),
    toList([
      h1(
        toList([
          class$(
            "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0"
          )
        ]),
        toList([text("Hosted PBX")])
      ),
      h4(
        toList([
          class$(
            "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0"
          )
        ]),
        toList([
          text("Cloud-based communication system without the chunky equipment.")
        ])
      ),
      div(
        toList([class$("flex flex-col space-y-2")]),
        toList([
          check_item(
            "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
            "Can come with transportable handsets."
          ),
          check_item(
            "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
            "Compatible with your personal mobile devices."
          ),
          check_item(
            "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
            "Unlimited extensions."
          )
        ])
      ),
      div(
        toList([class$("py-4 space-x-2")]),
        toList([
          button(
            toList([
              class$(
                "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-6s opacity-0"
              )
            ]),
            toList([text("View All Plans")])
          ),
          button(
            toList([
              class$(
                "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-6s opacity-0"
              )
            ]),
            toList([text("Try It Free")])
          )
        ])
      )
    ])
  );
}
function slide2_content() {
  return div(
    toList([class$("font-display py-12 space-y-4 p-8 relative h-100")]),
    toList([
      h1(
        toList([
          class$(
            "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0"
          )
        ]),
        toList([text("Virtual Servers")])
      ),
      h4(
        toList([
          class$(
            "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0"
          )
        ]),
        toList([
          text("Enterprise Windows or Linux virtual servers on reliable nodes.")
        ])
      ),
      div(
        toList([class$("flex space-x-2")]),
        toList([
          div(
            toList([class$("flex flex-col space-y-2")]),
            toList([
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
                "1x Virtual 1.00Ghz"
              ),
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
                "50GB Disk space"
              )
            ])
          ),
          div(
            toList([class$("flex flex-col space-y-2")]),
            toList([
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
                "2GB RAM"
              ),
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-6s opacity-0",
                "50GB Bandwidth out"
              )
            ])
          )
        ])
      ),
      div(
        toList([class$("py-4 space-x-2")]),
        toList([
          button(
            toList([
              class$(
                "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0"
              )
            ]),
            toList([text("View All Plans")])
          ),
          button(
            toList([
              class$(
                "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0"
              )
            ]),
            toList([text("Try It Free")])
          )
        ])
      )
    ])
  );
}
function slide3_content() {
  return div(
    toList([class$("font-display py-12 space-y-4 p-8 relative h-100")]),
    toList([
      h1(
        toList([
          class$(
            "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0"
          )
        ]),
        toList([text("Website Hosting")])
      ),
      h4(
        toList([
          class$(
            "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0"
          )
        ]),
        toList([text("Powerful shared hosting on enterprise hardware.")])
      ),
      div(
        toList([class$("flex space-x-2")]),
        toList([
          div(
            toList([class$("flex flex-col space-y-2")]),
            toList([
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
                "Windows or Linux"
              ),
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
                "10GB Storage"
              )
            ])
          ),
          div(
            toList([class$("flex flex-col space-y-2")]),
            toList([
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
                "DNS Hosting"
              ),
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-6s opacity-0",
                "10GB Monthly traffic"
              )
            ])
          )
        ])
      ),
      div(
        toList([class$("py-4 space-x-2")]),
        toList([
          button(
            toList([
              class$(
                "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0"
              )
            ]),
            toList([text("View All Plans")])
          ),
          button(
            toList([
              class$(
                "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0"
              )
            ]),
            toList([text("Try It Free")])
          )
        ])
      )
    ])
  );
}
function slide4_content() {
  return div(
    toList([class$("font-display py-12 space-y-4 p-8 relative h-100")]),
    toList([
      h1(
        toList([
          class$(
            "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0"
          )
        ]),
        toList([text("Dedicated Servers")])
      ),
      h4(
        toList([
          class$(
            "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0"
          )
        ]),
        toList([text("Experience enterprise class dedicated resources.")])
      ),
      div(
        toList([class$("flex space-x-2")]),
        toList([
          div(
            toList([class$("flex flex-col space-y-2")]),
            toList([
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
                "iDRAC6 Express"
              ),
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
                "2 x 500GB SATAIII HDD"
              )
            ])
          ),
          div(
            toList([class$("flex flex-col space-y-2")]),
            toList([
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
                "32GB DDR3 ECC RAM"
              ),
              check_item(
                "animation-fade-in animation-duration-1s animation-delay-6s opacity-0",
                "Intel Xeon Quad Core 3.3Ghz CPU's"
              )
            ])
          )
        ])
      ),
      div(
        toList([class$("py-4 space-x-2")]),
        toList([
          button(
            toList([
              class$(
                "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0"
              )
            ]),
            toList([text("View All Plans")])
          ),
          button(
            toList([
              class$(
                "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0"
              )
            ]),
            toList([text("Try It Free")])
          )
        ])
      )
    ])
  );
}

// build/dev/javascript/carousel/carousel.mjs
function stop_autoplay(model) {
  let $ = model.timer;
  if ($ instanceof Some) {
    let timer = $[0];
    clearTimeout(timer);
  } else {
  }
  return model.withFields({ timer: new None() });
}
function decrement_page(model) {
  let $ = model.current_slide_index;
  if ($ === 0) {
    return model.withFields({ current_slide_index: model.total_slides - 1 });
  } else {
    return model.withFields({
      current_slide_index: model.current_slide_index - 1
    });
  }
}
function increment_page(model) {
  let $ = model.current_slide_index;
  if ($ < model.total_slides - 1) {
    let n = $;
    return model.withFields({
      current_slide_index: model.current_slide_index + 1
    });
  } else {
    return model.withFields({ current_slide_index: 0 });
  }
}
function set_page_number(model, page) {
  if (page < model.total_slides && page >= 0) {
    let n = page;
    return model.withFields({ current_slide_index: n });
  } else {
    return model;
  }
}
function pagination_button(number, active) {
  let classes = (() => {
    if (!active) {
      return "bg-[#aaa]";
    } else {
      return "bg-[#333] scale-150";
    }
  })();
  return button(
    toList([
      on_click(new UserClickedSlidePage(number)),
      class$(classes),
      class$(
        "text-transparent rounded-full w-[.5em] h-[.5em] ease-in-out duration-250 transition-all"
      ),
      role("tab"),
      attribute("aria-selected", "true")
    ]),
    toList([text(to_string(number))])
  );
}
function pagination(slide_index) {
  return nav(
    toList([
      class$(
        "absolute flex mx-auto pb-2 bottom-0 left-0 right-0 justify-center space-x-2"
      )
    ]),
    toList([
      pagination_button(0, slide_index === 0),
      pagination_button(1, slide_index === 1),
      pagination_button(2, slide_index === 2),
      pagination_button(3, slide_index === 3)
    ])
  );
}
function carousel(slide_index) {
  return div(
    toList([
      id("carousel-1"),
      on_mouse_enter(new UserMouseOveredCarousel()),
      on_mouse_leave(new UserMouseLeftCarousel()),
      class$("relative overflow-hidden min-h-[500px] font-display text-white")
    ]),
    toList([
      slide(
        "./priv/static/images/pbx.jpg",
        0,
        slide_index,
        slide1_content
      ),
      slide(
        "./priv/static/images/virtual-server.jpg",
        1,
        slide_index,
        slide2_content
      ),
      slide(
        "./priv/static/images/website-hosting.jpg",
        2,
        slide_index,
        slide3_content
      ),
      slide(
        "./priv/static/images/dedicated-server.jpg",
        3,
        slide_index,
        slide4_content
      ),
      pagination(slide_index),
      next_button(),
      prev_button()
    ])
  );
}
function view(model) {
  return div(
    toList([class$("w-full bg-white")]),
    toList([carousel(model.current_slide_index)])
  );
}
var carousel_selector = "#carousel-1";
var slide_selector = ".slide";
function init2(_) {
  return [
    new Model(0, 4, new None()),
    init_animations(carousel_selector, slide_selector, 0)
  ];
}
function update2(model, msg) {
  if (msg instanceof UserMouseOveredCarousel) {
    println("Mouse Entered -> Pausing Autoplay");
    let model$1 = (() => {
      let _pipe = model;
      return stop_autoplay(_pipe);
    })();
    return [model$1, none()];
  } else if (msg instanceof UserMouseLeftCarousel) {
    println("Mouse Left -> Starting Autoplay");
    return [model, start_autoplay()];
  } else if (msg instanceof AutoplayTimeoutSet) {
    let timer = msg[0];
    return [model.withFields({ timer: new Some(timer) }), none()];
  } else if (msg instanceof AutoplayTimeoutTriggered) {
    let model$1 = (() => {
      let _pipe = model;
      return increment_page(_pipe);
    })();
    return [
      model$1,
      start_animations(slide_selector, model$1.current_slide_index)
    ];
  } else if (msg instanceof UserClickedSlidePage) {
    let n = msg.slide_index;
    return [
      (() => {
        let _pipe = model;
        return set_page_number(_pipe, n);
      })(),
      start_animations(slide_selector, n)
    ];
  } else if (msg instanceof UserClickedSlideNext) {
    let model$1 = (() => {
      let _pipe = model;
      return increment_page(_pipe);
    })();
    return [
      model$1,
      start_animations(slide_selector, model$1.current_slide_index)
    ];
  } else {
    let model$1 = (() => {
      let _pipe = model;
      return decrement_page(_pipe);
    })();
    return [
      model$1,
      start_animations(slide_selector, model$1.current_slide_index)
    ];
  }
}
function main() {
  let app = application(init2, update2, view);
  let $ = start3(app, "#app", void 0);
  if (!$.isOk()) {
    throw makeError(
      "assignment_no_match",
      "carousel",
      26,
      "main",
      "Assignment pattern did not match",
      { value: $ }
    );
  }
  return $;
}

// build/.lustre/entry.mjs
main();
