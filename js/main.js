import { Actions } from './actions';
import { render } from './canvas';
import { Settings } from './settings';

const actions = new Actions();

const pressedQueue = [];

const mapping = {
  KeyB: 'settings',
  KeyA: 'moveLeft',
  KeyD: 'moveRight',
  KeyW: 'moveUp',
  KeyS: 'moveDown',
  Backspace: 'redo',
};
const settings = new Settings(mapping);

window.addEventListener('keydown', Array.prototype.push.bind(pressedQueue)  );

function lifeCycle() {
  while (pressedQueue.length) {
    const code = pressedQueue.shift().code;

    console.log(code);

    if (mapping[code]) {
      actions[mapping[code]]();
    }
  }
  render(actions.history);

  settings.check(actions.history.state);

  requestAnimationFrame(lifeCycle);
}

requestAnimationFrame(lifeCycle);
