const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const fieldStatuses = {
  empty: '#C0513F',
  visited: '#6DC03F',
  current: '#923FC0',
}

const history = {
  x: 0,
  y: 0,
  moveNumber: 0,
  field: [
    ['current', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ],

  step: function() {
    return Object.create(this);
  },
  redo: function() {
    if (!this.moveNumber) return this;

    return Object.getPrototypeOf(this);
  },
  moveUp: function () {
    return this.move(this.x-1, this.y);
  },
  moveDown: function () {
    return this.move(this.x+1, this.y);
  },
  moveLeft: function () {
    return this.move(this.x, this.y-1);
  },
  moveRight: function () {
    return this.move(this.x, this.y+1);
  },
  move: function(x, y) {
    const result = this.step();


    result.x = x;
    result.y = y;
    result.field = JSON.parse(JSON.stringify(result.field));
    result.field[this.x][this.y] = 'visited';
    result.field[x][y] = 'current';
    result.moveNumber++;

    return result;
  }
}

class Human {
  constructor(history) {
    this.history = history;
  }

  moveUp() {
    this.history = this.history.moveUp();
  }

  moveDown() {
    this.history = this.history.moveDown();
  }

  moveLeft() {
    this.history = this.history.moveLeft();
  }

  moveRight() {
    this.history = this.history.moveRight();
  }

  redo() {
    this.history = this.history.redo();
  }
}

const human = new Human(history);

const actionMapping = {
  ArrowUp: () => human.moveUp(),
  ArrowDown: () => human.moveDown(),
  ArrowLeft: () => human.moveLeft(),
  ArrowRight: () => human.moveRight(),
  Backspace: () => human.redo(),
}


function render() {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const blockWidth = width / human.history.field[0].length;
  const blockHeight = height / human.history.field.length;

  ctx.fillStyle = '#3FAEC0';
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < human.history.field.length; y++) {
    for (let x = 0; x < human.history.field[y].length; x++) {
      const xStart = x * blockWidth;
      const yStart = y * blockHeight;
      ctx.fillStyle = fieldStatuses[human.history.field[y][x]];
      ctx.fillRect(xStart + 2.5, yStart+ 1, blockWidth - 5, blockHeight - 2);
    }
  }
}

render();

window.addEventListener('keydown', function(event) {
  if (!actionMapping[event.code]) {
    return;
  }

  actionMapping[event.code]();
  render();
});
