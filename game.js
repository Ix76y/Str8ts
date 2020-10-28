const { ipcRenderer } = require('electron')
const Field = require('./model/field.js')
const Board = require('./model/board.js')


var field = new Field();
console.log(field.description)
var board = new Board(9);
var gameBoard = document.getElementById("game-board")
console.log(board.description)
for (var i = 0; i < board.size; i++) {
  for (var j = 0; j < board.size; j++) {
    var field = document.createElement("div")
    field.className = "grid-item"
    var input = document.createElement("input")
    input.className = "num-input"
    /*input.setAttribute("type", "number")*/
    input.setAttribute("maxlength", "1")
    field.appendChild(input)
    gameBoard.appendChild(field)
  }
  console.log();
}
console.log(board);
