import {capitalize} from '@/core/utils';

export default class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DOMListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    for (const key of this.listeners) {
      const method = getMethodName(key);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name}`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(key, this[method]);
    }
  }

  removeDOMListeners() {
    for (const key of this.listeners) {
      const method = getMethodName(key);
      this.$root.off(key, this[method]);
    }
  }

  oninput() {
    throw new Error(`not init oninput for ${this.name}`);
  }

  onclick() {
    throw new Error(`not init onclick for ${this}`);
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
