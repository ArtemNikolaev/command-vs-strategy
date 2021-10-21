import { Actions } from './actions';
import { render } from './canvas';

const actions = new Actions();

function isSpecialKeyPressed(event) {
  return [
    event.ctrlKey,
    event.shiftKey,
    event.altKey,
    event.metaKey,
  ].some(Boolean);
}

const pressedQueue = [];

const mapping = {
  KeyB: (ev) => {
    if (!ev.ctrlKey) return;

    actions.settings();
  },
  Space: (ev) => {
    if (isSpecialKeyPressed(ev)) return;

    actions.interact();
  },
  KeyA: () => {
    return actions.moveLeft();
  },
  KeyD: () => {
    return actions.moveRight();
  },
  KeyW: () => {
    return actions.moveUp();
  },
  KeyS: () => {
    return actions.moveDown();
  },
  Backspace: () => {
    return actions.redo();
  }
}

window.addEventListener('keydown', Array.prototype.push.bind(pressedQueue)  );

function lifeCycle() {
  while (pressedQueue.length) {
    const event = pressedQueue.shift();

    if (mapping[event.code]) {
      mapping[event.code](event);
    }
  }
  render(actions.history);
  requestAnimationFrame(lifeCycle);
}

requestAnimationFrame(lifeCycle);
