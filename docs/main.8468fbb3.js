parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fqCT":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var y=0;y<e.length;y++){var p=e[y];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(t,p.key,p)}}function y(t,y,p){return y&&e(t.prototype,y),p&&e(t,p),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Actions=exports.state=void 0;var p={openWorld:"OpenWorld",settings:"Settings",store:"Store"};exports.state=p;var m={current:"visited",currentStore:"store"},i={empty:"current",visited:"current",store:"currentStore"},r=function(){function e(){var y=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,m=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t(this,e),this.history={state:p.openWorld,x:y,y:m,moveNumber:0,field:[["current","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","store","empty","empty","empty","empty","empty"]]}}return y(e,[{key:"step",value:function(){this.history=Object.create(this.history),this.history.moveNumber++,this.history.field=JSON.parse(JSON.stringify(this.history.field))}},{key:"redo",value:function(){if(!this.history.moveNumber)return this;this.history=Object.getPrototypeOf(this.history)}},{key:"settings",value:function(){var t=this.history;t.state!==p.settings?t.state=p.settings:t.state=p.openWorld}},{key:"interact",value:function(){var t=this.history;"currentStore"===t.field[t.x][t.y]&&(this.step(),t.state!==p.store?t.state=p.store:t.state=p.openWorld)}},{key:"moveUp",value:function(){return this.move(this.history.x-1,this.history.y)}},{key:"moveDown",value:function(){return this.move(this.history.x+1,this.history.y)}},{key:"moveLeft",value:function(){return this.move(this.history.x,this.history.y-1)}},{key:"moveRight",value:function(){return this.move(this.history.x,this.history.y+1)}},{key:"move",value:function(t,e){if(t<0||t>this.history.field.length-1||e<0||e>this.history.field[0].length-1)return 0;this.step();var y=this.history;y.field[y.x][y.y]=m[y.field[y.x][y.y]],y.x=t,y.y=e,y.field[t][e]=i[y.field[t][e]]}}]),e}();exports.Actions=r;
},{}],"JyuG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.render=l;var e=require("./actions"),t=document.querySelector("canvas");t.width=window.innerWidth,t.height=window.innerHeight;var r=t.getContext("2d"),i={empty:"#C0513F",visited:"#6DC03F",current:"#923FC0",currentStore:"#bcdf3f",store:"yellow"};function l(e){var t=r.canvas.width,n=r.canvas.height,o=Math.floor(t/e.field[0].length),a=Math.floor(n/e.field.length);r.fillStyle="#3FAEC0",r.fillRect(0,0,t,n);for(var d=0;d<e.field.length;d++)for(var f=0;f<e.field[d].length;f++){var s=f*o,c=d*a;r.fillStyle=i[e.field[d][f]],r.fillRect(s+5,c+5,o-10,a-10)}l[e.state]&&l[e.state]()}l[e.state.store]=function(){console.log("rendering store")};
},{"./actions":"fqCT"}],"HxdU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Settings=void 0;var e=require("./actions");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function i(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}var d=function(){function n(e){t(this,n),this.mapping=e,this.divAdded=!1,this.generateDiv()}return i(n,[{key:"generateDiv",value:function(){var e=this,t=document.querySelector("#settings");t&&document.body.removeChild(t);var n=document.createElement("div");n.style="\n        width: 300px;\n        position: absolute;\n        top: 0;\n        right: 0;\n        background: white;\n      ",n.id="settings";var i=document.createElement("ol"),d=function(t){var n=document.createElement("div"),d=document.createElement("span");d.textContent=e.mapping[t]+": ";var o=document.createElement("button");o.textContent=t,o.addEventListener("click",function(){e.addListener(t)}),n.append(d),n.append(o),i.append(n)};for(var o in this.mapping)d(o);n.append(i),this.div=n,this.divAdded&&document.body.append(this.div)}},{key:"addListener",value:function(e){var t=this;window.addEventListener("keydown",function n(i){t.mapping[i.code]&&console.log("this key is already in use"),t.mapping[i.code]=t.mapping[e],delete t.mapping[e],window.removeEventListener("keydown",n),t.generateDiv()})}},{key:"check",value:function(t){t!==e.state.settings||this.divAdded?t!==e.state.settings&&this.divAdded&&(this.divAdded=!this.divAdded,document.body.removeChild(this.div)):(this.divAdded=!this.divAdded,document.body.appendChild(this.div))}},{key:"do",value:function(){}}]),n}();exports.Settings=d;
},{"./actions":"fqCT"}],"d6sW":[function(require,module,exports) {
"use strict";var e=require("./actions"),t=require("./canvas"),n=require("./settings"),r=new e.Actions,o=[],i={KeyB:"settings",KeyA:"moveLeft",KeyD:"moveRight",KeyW:"moveUp",KeyS:"moveDown",Backspace:"redo"},s=new n.Settings(i);function a(){for(;o.length;){var e=o.shift().code;console.log(e),i[e]&&r[i[e]]()}(0,t.render)(r.history),s.check(r.history.state),requestAnimationFrame(a)}window.addEventListener("keydown",Array.prototype.push.bind(o)),requestAnimationFrame(a);
},{"./actions":"fqCT","./canvas":"JyuG","./settings":"HxdU"}]},{},["d6sW"], null)
//# sourceMappingURL=/main.8468fbb3.js.map