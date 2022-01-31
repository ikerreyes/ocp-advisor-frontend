

/**
 * This function is intended to capture all "get"s of view objects
 * and call locate (Locatable method) on widgets
 */
 const handler = {
  get: function (obj, prop) {
    if (prop in obj) {
      // object property
      return Reflect.get(...arguments);
    } else {
      // assume nested cypress command
      const cyObj = obj.locate()
      return cyObj[prop];
    }
  },
};


/**
 * Widgets are holders of elements
 * and other Widgets
 */
class Widget {
  locator = null;
  constructor(locator = null) {
    if (locator) {
      this.locator = locator;
    }
    const proxy = new Proxy(this, handler);
    return proxy;
  }
  locate() {
    if (this.parent && this.parent.locator) {
      // first locate references View, second cypress
      return this.parent.locate().locate(this.locator);
    } else {
      return cy.locate(this.locator);
    }
  }
  static nested(parent, it, ...args) {
    if (it instanceof Widget) {
      // already instanciated object
      it.parent = parent;
      return it;
    } else {
      // instanciate it
      const inst = new it(...args);
      inst.parent = parent;
      return inst;
    }
  }
}

export { Widget };
