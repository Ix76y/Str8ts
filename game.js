const { ipcRenderer } = require('electron');
const Field = require('./model/field.js');

require('./model/board.js')
require('./model/field.js')

/*class Board {
    constructor(size) {
        this.size = size;
        this.fields = new Array(size);
        for (var i = 0; i < size; i++) {
            this.fields[i] = new Array(size);
        }
    }
}


Board.prototype.toString = function boardToString() {
    return `Board of Size ${this.size}`;
};*/

console.log('x');
var field = new Field();
console.log(field.description)
var board = new Board(9);
console.log(board.description)
for (var i = 0; i < board.size; i++) {
  for (var j = 0; j < board.size; j++) {
    console.log('x');
  }
  console.log();
}
console.log(board);
