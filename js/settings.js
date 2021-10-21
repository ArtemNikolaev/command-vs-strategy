import { state } from './actions';

export class Settings {
  constructor(mapping) {
    this.mapping = mapping;
    this.divAdded = false;

    this.generateDiv();

  }

  generateDiv() {
    const exist = document.querySelector('#settings');
    if (exist) document.body.removeChild(exist);

    const div = document.createElement('div');
    div.style = `
        width: 300px;
        position: absolute;
        top: 0;
        right: 0;
        background: white;
      `;
    div.id = 'settings';

    const ol = document.createElement('ol');

    for(const key in this.mapping) {
      const div = document.createElement('div');

      const span = document.createElement('span');
      span.textContent = this.mapping[key] + ': ';
      const btn = document.createElement('button');
      btn.textContent = key;
      btn.addEventListener('click', () => {
        this.addListener(key);
      })

      div.append(span);
      div.append(btn);

      ol.append(div);
    }

    div.append(ol);

    this.div = div;

    if (this.divAdded) document.body.append(this.div);
  }

  addListener(key) {
    const change = (ev) => {
      if (this.mapping[ev.code]) {
        console.log('this key is already in use');
      }

      this.mapping[ev.code] = this.mapping[key];
      delete this.mapping[key];
      window.removeEventListener('keydown', change);
      this.generateDiv();
    }

    window.addEventListener('keydown', change);
  }

  check(currentState) {
    if (currentState === state.settings && !this.divAdded) {
      this.divAdded = !this.divAdded;
      document.body.appendChild(this.div);
    } else if (currentState !== state.settings && this.divAdded) {
      this.divAdded = !this.divAdded;

      document.body.removeChild(this.div);
    }
  }

  do() {

  }
}
