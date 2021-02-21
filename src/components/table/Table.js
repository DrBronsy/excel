import ExcelComponent from '@/core/ExcelComponent';
import {createTable} from './table.template.js';
import {resizeHandler} from './table.resize.js';
import {isCell, matrix, shouldResize, nextSelector} from './table.functions.js';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@/core/dom';

export default class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
        this.$emit('Table.select', $target.text());
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const $current = this.selection.current;
      const id = $current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$emit('Table.input-cell', $target.text());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table.input-cell', $cell.text());
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="1:1"]'));

    this.$on('Formula.input', (data) => {
      this.selection.current.text(data);
    });

    this.$on('Formula.keydown-enter', () => {
      this.selection.current.focus();
    });
  }

  toHTML() {
    return createTable(20);
  }
}
