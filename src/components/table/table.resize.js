import {$} from '@/core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type=resizable]');
  const coords = $parent.getCoords();
  const resizerType = $resizer.data.resize;

  if (resizerType === 'col') {
    $resizer.css({opacity: 1, bottom: '-5000px'});
  } else {
    $resizer.css({opacity: 1, right: '-5000px'});
  }

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);

  document.onmousemove = (e) => {
    const delta = resizerType === 'col'
      ? e.pageX - coords.right
      : e.pageY - coords.bottom;

    if (resizerType === 'col') {
      $resizer.css({right: -delta + 'px'});
    } else {
      $resizer.css({bottom: -delta + 'px'});
    }
  };

  document.onmouseup = (e) => {
    const delta = resizerType === 'col'
      ? e.pageX - coords.right
      : e.pageY - coords.bottom;
    const value = resizerType === 'col'
      ? coords.width + delta + 4
      : coords.height + delta + 4;

    if (resizerType === 'col') {
      $resizer.css({right: -delta + 'px'});
      cells.forEach((item) => {
        $(item).css({width: value + 'px'});
      });
    } else {
      $parent.css({height: value + 'px'});
    }

    document.onmousemove = null;
    document.onmouseup = null;
    if (resizerType === 'col') {
      $parent.css({width: value + 'px'});
      $resizer.css({opacity: '', bottom: 0, right: 0});
    } else {
      $parent.css({height: value + 'px'});
      $resizer.css({opacity: '', bottom: 0, right: 0});
    }
  };
}
