const { ipcRenderer } = require('electron')
const Field = require('./model/field.js')
const Board = require('./model/board.js')

var board = new Board(9)
var gameBoard = document.getElementById("game-board")
console.log(board.description)
// generateNew()
generateSimpleExample()

console.log(board);

function generateNew() {
    console.log("Generate New Puzzle!")
    gameBoard.innerHTML = ''
    board.generatePuzzle(9, 25)
    displayPuzzle()
}

function generateSimpleExample() {
    console.log("Generate New Puzzle!")
    gameBoard.innerHTML = ''
    board.generateSimpleExample()
    displayPuzzle()
}

function displayPuzzle() {
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
                  var p = document.createElement("p")
                  p.className = "num-set num-set-black"
                  var node = document.createTextNode(tmpField.number)
                  p.appendChild(node)
                  field.appendChild(p)
              } else if (!tmpField.isWhite && !tmpField.isSet) {
                  field.className = "grid-item-black"
              } else {
                field.className = "grid-item-black"
                var p = document.createElement("p")
                p.className = "num-set num-set-white"
                var node = document.createTextNode(tmpField.number)
                p.appendChild(node)
                field.appendChild(p)
              }
              gameBoard.appendChild(field)
        }
    }
}
