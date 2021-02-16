import ExcelComponent from '@/core/ExcelComponent';

export default class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  onInput(event) {
    console.log('onInput', event);
  }

  onClick(event) {
    console.log('onClick', event);
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}