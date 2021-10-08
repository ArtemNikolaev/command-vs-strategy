const history = {
  x: 0,
  y: 0,
  moveNumber: 0,

  step: function() {
    return Object.create(this);
  },
  redo: function() {
    if (!this.moveNumber) return this;

    return Object.getPrototypeOf(this);
  },
  moveUp: function () {
    return this.move(this.x, this.y+1);
  },
  moveDown: function () {
    return this.move(this.x, this.y-1);
  },
  moveLeft: function () {
    return this.move(this.x-1, this.y);
  },
  moveRight: function () {
    return this.move(this.x+1, this.y);
  },
  move: function(x, y) {
    const result = this.step();

    result.x = x;
    result.y = y;
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
console.log(human.history);
window.addEventListener('keydown', function(event) {
  if (!actionMapping[event.code]) {
    console.log(event.code, actionMapping[event.code]);
    return;
  }

  actionMapping[event.code]();
  console.log(human.history);
});
