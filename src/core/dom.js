class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  id(parse) {
    if (parse) {
      const id = this.id().split(':');
      return {
        row: +id[0],
        col: +id[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => this.$el.style[key] = styles[key]);
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
