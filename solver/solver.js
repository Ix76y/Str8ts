const { ipcRenderer } = require('electron')
const Field = require('./model/field.js')
const Board = require('./model/board.js')

function checkRowCols(game) {
    var solved = 0
    for(var i = 0; i < game.size; i++) {
        for (var j = 0; j < game.size; j++) {
            var rows = new Array(game.size).fill(0);
            var cols = new Array(game.size).fill(0);
            for(var x = 0; x < game.size; x++) {
                if (x == i) 
                    continue
                var num = game.fields[i][x].number
                if (num != 0)
                    cols[num - 1] += 1
                if (x == j)
                    continue
                var num = game.fields[i][x].number
                if (num != 0)
                    cols[num - 1] += 1
            }
        } 
    } 
    return solved
}

function solveGame(game) {

}