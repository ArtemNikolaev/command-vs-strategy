import { Actions } from './actions';
import { render } from './canvas';

const actions = new Actions();

const pressedQueue = [];

const mapping = {
  KeyB: 'settings',
  KeyA: 'moveLeft',
  KeyD: 'moveRight',
  KeyW: 'moveUp',
  KeyS: 'moveDown',
  Backspace: 'redo',
}

window.addEventListener('keydown', Array.prototype.push.bind(pressedQueue)  );

function lifeCycle() {
  while (pressedQueue.length) {
    const event = pressedQueue.shift();

    if (mapping[event.code]) {
      actions[mapping[event.code]]();
    }
  }
  render(actions.history);
  requestAnimationFrame(lifeCycle);
}

requestAnimationFrame(lifeCycle);
