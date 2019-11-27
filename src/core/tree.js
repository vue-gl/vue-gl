export default class {
  constructor(parent, getter) {
    this.listeners = parent ? parent.listeners : [];
    this.inst = getter || (() => {});
  }

  listen(fn) {
    if (!this.listeners.includes(fn)) this.listeners.push(fn);
  }

  unlisten(fn) {
    const index = this.listeners.indexOf(fn);
    if (index >= 0) this.listeners.splice(index, 1);
  }

  emit() {
    this.listeners.forEach((fn) => fn());
  }
}
