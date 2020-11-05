const Field = require('./field.js')

class Board {
    constructor(size) {
        this.size = size;
        this.fields = new Array(size)
        for (var i = 0; i < size; i++) {
            this.fields[i] = new Array(size)
            for (var j = 0; j < size; j++) 
                this.fields[i][j] = new Field()
        }
    }

    description = "This is the game board containing a 2D array of fields."
    
    generatePuzzle(min, max) {
        for(var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                this.fields[i][j].isWhite = true
            } 
        } 
        var numBlackFields = randomIntFromInterval(min, max)
        for(var i = 0; i < numBlackFields; i++) {
            var x = randomIntFromInterval(0, 8)
            var y = randomIntFromInterval(0, 8)
            while(!this.fields[x][y].isWhite || !validate(this, x, y)) { //|| validate(this, x, y)
                this.fields[x][y].isWhite = true
                x = randomIntFromInterval(0, 8)
                y = randomIntFromInterval(0, 8)
            }
            this.fields[x][y].isWhite = false
        }
        // check emptyStreets() and add if necessary blocks

        // fill with numbers
    }
}

// row and col have max 5 black fields 
// not more than 4 streets with length 9 -> fill with more black dots
// streets length between 2 and 9

function emptyStreets() {
    var counter = 0
    for(var i = 1; i < this.size - 1; i++) {
        var empty = true
        for (var j = 1; j < this.size; j++) {
            if (!this.fields[i][j].isWhite) {
                empty = false
            }
        } 
        if (empty) {
            counter += 1
        }
    } 
    return counter
}

function isValidField(board, x, y) {
    if (x < 0 || x >= board.size || y < 0 || y >= board.size)
        return false
    if (!board.fields[x][y].isWhite)
        return false
    return true
}

function isValidStreet(board, x, y) {
    var hasStreetNeighbour = false
    if (isValidField(board, x, y)) {
        if (isValidField(board, x, y + 1)) 
            hasStreetNeighbour = true
        if (isValidField(board, x, y - 1))
            hasStreetNeighbour = true
        if (isValidField(board, x + 1, y))
            hasStreetNeighbour = true
        if (isValidField(board, x - 1, y))
            hasStreetNeighbour = true
    } else {
        return false
    }
    return hasStreetNeighbour
}

function validate(board, x, y) {
    board.fields[x][y].isWhite = false
    // count black fields in row & col, check if <= 5
    var xCounter = 0
    var yCounter = 0

    for(var i = 1; i < this.size - 1; i++) {
        !board.fields[x][i].isWhite ? xCounter += 1 : xCounter += 0
        !board.fields[i][y].isWhite ? yCounter += 1 : yCounter += 0
    }
    if (xCounter > 5 || yCounter > 5) {
        console.log("More than 5 black fields. Row: " + xCounter + " Column: " + yCounter)
        return false
    }
    
    // check if all direct neightbours of new field are either black or if white then they have at least on white neighbour
    return isValidStreet(board, x, y - 1) && isValidStreet(board, x, y + 1) && isValidStreet(board, x - 1, y) && isValidStreet(board, x + 1, y)
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

Board.prototype.toString = function boardToString() {
    return `Board of Size ${this.size}`
};

module.exports = Board