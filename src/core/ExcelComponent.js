import DOMListener from '@/core/DOMListener';

export default class ExcelComponent extends DOMListener {
  constructor($root, option = {}) {
    super($root, option.listeners);
    this.name = option.name || '';
  }

  // return template
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
