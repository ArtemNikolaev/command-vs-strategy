import {state} from './actions';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const fieldStatuses = {
  empty: '#C0513F',
  visited: '#6DC03F',
  current: '#923FC0',
  currentStore: '#bcdf3f',
  store: 'yellow',
}

export function render(history) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const blockWidth = Math.floor(width / history.field[0].length);
  const blockHeight = Math.floor(height / history.field.length);

  ctx.fillStyle = '#3FAEC0';
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < history.field.length; y++) {
    for (let x = 0; x < history.field[y].length; x++) {
      const xStart = x * blockWidth;
      const yStart = y * blockHeight;
      ctx.fillStyle = fieldStatuses[history.field[y][x]];
      ctx.fillRect(xStart + 5, yStart+ 5, blockWidth - 10, blockHeight - 10);
    }
  }

  if (render[history.state]) {
    render[history.state]();
  }
}

render[state.store] = function() {
  console.log('rendering store');
}
