import ExcelComponent from '@/core/ExcelComponent';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {shouldResize} from './table.functions.js';

export default class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  toHTML() {
    return createTable(100);
  }
}
