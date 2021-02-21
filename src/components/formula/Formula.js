import ExcelComponent from '@/core/ExcelComponent';
import {checkEventKey} from '@core/utils';
import {$} from '@core/dom';

export default class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });

    this.setInputValue = this.setInputValue.bind(this);
  }

  onInput(event) {
    this.$emit('Formula.input', $(event.target).text());
  }

  onKeydown(event) {
    if (checkEventKey(event, 'Enter', 'Tab')) {
      event.preventDefault();
      this.$emit('Formula.keydown-enter');
    }
  }

  setInputValue(value) {
    this.$input.text(value);
  }

  init() {
    super.init();
    this.$input = this.$root.find('#input');
    this.$on('Table.select', this.setInputValue);
    this.$on('Table.input-cell', this.setInputValue);
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="input" class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
