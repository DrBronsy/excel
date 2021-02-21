import DOMListener from '@/core/DOMListener';

export default class ExcelComponent extends DOMListener {
  constructor($root, option = {}) {
    super($root, option.listeners);
    this.name = option.name || '';
    this.emitter = option.emitter;
    this.unsubscribes = [];
    this.prepare();
  }

  prepare() {}

  // return template
  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribes.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
  }
}
