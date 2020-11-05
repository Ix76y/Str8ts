const { ipcRenderer } = require('electron')
const Field = require('./model/field.js')
const Board = require('./model/board.js')

var board = new Board(9)
var gameBoard = document.getElementById("game-board")
console.log(board.description)
generateNew()

console.log(board);

function generateNew() {
    console.log("Generate New Puzzle!")
    gameBoard.innerHTML = ''
    board.generatePuzzle(2, 25)
    for (var i = 0; i < board.size; i++) {
        for (var j = 0; j < board.size; j++) {
              var field = document.createElement("div")
              var tmpField = board.fields[i][j]
              if (tmpField.isWhite && !tmpField.isSet) {
                  field.className = "grid-item"
                  var input = document.createElement("input")
                  input.className = "num-input"
                  input.setAttribute("maxlength", "1")
                  field.appendChild(input)
              } else if (tmpField.isWhite) {
                  field.className = "grid-item"
              } else {
                  field.className = "grid-item-black"
              }
              gameBoard.appendChild(field)
        }
      }
}
