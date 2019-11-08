export default class Namespace {
  constructor(parent) {
    this.parent = parent;
    this.children = [];
    this.hash = Object.create(null);
    this.listeners = Object.create(null);
    this.globalListeners = [];
    if (parent) parent.children.push(this);
  }

  listen(key, fn) {
    if (typeof key === 'function') {
      if (!this.globalListeners.includes(key)) this.globalListeners.push(key);
    } else if (key in this.listeners) {
      if (!this.listeners[key].includes(fn)) this.listeners[key].push(fn);
    } else {
      this.listeners[key] = [fn];
    }
  }

  unlisten(key, fn) {
    if (typeof key === 'function') {
      const index = this.globalListeners.indexOf(key);
      if (index >= 0) this.globalListeners.splice(index, 1);
    } else {
      const listeners = this.listeners[key];
      if (listeners) {
        if (listeners.length > 1) {
          const index = listeners.indexOf(fn);
          if (index >= 0) listeners.splice(index, 1);
        } else if (listeners[0] === fn) {
          delete this.listeners[key];
        }
      }
    }
  }

  get(key) {
    if (key in this.hash) return this.hash[key];
    return this.parent && this.parent.get(key);
  }

  set(key, inst) {
    if (this.hash[key] === inst) return;
    this.hash[key] = inst;
    this.emit(key, inst);
  }

  keys() {
    const keys = Object.keys(this.hash);
    if (!this.parent) return keys;
    const parentKeys = this.parent.keys().filter((key) => !(key in this.hash));
    return [...parentKeys, ...keys];
  }

  delete(key, inst) {
    if (this.hash[key] !== inst) return;
    delete this.hash[key];
    this.emit(key, this.parent && this.parent.get(key));
  }

  emit(key, inst) {
    if (key in this.listeners) this.listeners[key].forEach((fn) => fn(inst));
    this.children.forEach((child) => { if (!(key in child.hash)) child.emit(key, inst); });
    this.globalListeners.forEach((fn) => fn(this));
  }

  destroy() {
    if (this.parent) {
      const { children } = this.parent;
      children.splice(children.indexOf(this), 1);
    }
  }

  fork() { return new Namespace(this); }
}
