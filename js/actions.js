export const state = {
  openWorld: 'OpenWorld',
  settings: 'Settings',
  store: 'Store',
}

const visitedFieldMapping = {
  current: 'visited',
  currentStore: 'store',
}

const nextFieldMapping = {
  empty: 'current',
  visited: 'current',
  store: 'currentStore',
}

export class Actions {
  constructor(x = 0, y = 0) {
    this.history = {
      state: state.openWorld,
      x, y,
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
        ['empty', 'empty', 'empty', 'store', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ],
    }
  }

  step() {
    this.history = Object.create(this.history);
    this.history.moveNumber++;
    this.history.field = JSON.parse(JSON.stringify(this.history.field));
  }
  redo() {
    if (!this.history.moveNumber) return this;

    this.history = Object.getPrototypeOf(this.history);
  }

  // open
  settings() {
    const h = this.history;

    if (h.state !== state.settings) {
      h.state = state.settings;
    } else h.state = state.openWorld;
  }

  interact() {
    const h = this.history;

    if (h.field[h.x][h.y] !== 'currentStore') return;

    this.step();

    if (h.state !== state.store) {
      h.state = state.store;
    } else h.state = state.openWorld;
  }

  // moving
  moveUp() {
    return this.move(this.history.x-1, this.history.y);
  }
  moveDown() {
    return this.move(this.history.x+1, this.history.y);
  }
  moveLeft() {
    return this.move(this.history.x, this.history.y-1);
  }
  moveRight() {
    return this.move(this.history.x, this.history.y+1);
  }
  move(x, y) {
    if (
      (x < 0 || x > this.history.field.length -1) ||
      (y < 0 || y > this.history.field[0].length -1)
    ) return 0;

    this.step();
    const h = this.history;

    h.field[h.x][h.y] = visitedFieldMapping[h.field[h.x][h.y]];
    h.x = x;
    h.y = y;
    h.field[x][y] = nextFieldMapping[h.field[x][y]];
    console.log(h.field[x][y])
  }
}
