const { ipcRenderer } = require('electron')
const Field = require('./model/field.js')
const Board = require('./model/board.js')
const Solver = require('./solver/solver.js')

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

function solvePuzzle() {
    console.log("Trying to solve Puzzle...")
    Solver.solveGame(board)
    console.log("Updating UI of Puzzle with solved fields...")
    updatePuzzle()
}

function generateSimpleExample() {
    console.log("Generate New Puzzle!")
    gameBoard.innerHTML = ''
    board.generateSimpleExample()
    displayPuzzle()
}

function updatePuzzle() {
    for (var i = 0; i < board.size; i++) {
        for (var j = 0; j < board.size; j++) {
            let field = board.fields[i][j]
            if (!field.isSet && field.isWhite && field.number != 0) {
                var input = document.getElementById("" + i + j)
                input.value = field.number
            }
        }
    }
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
                  input.id = "" + i + j
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
