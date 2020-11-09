const Field = require('./field.js')
const Street = require('./street.js')

class Board {
    constructor(size) {
        this.size = size;
        this.fields = new Array(size)
        for (var i = 0; i < size; i++) {
            this.fields[i] = new Array(size)
            for (var j = 0; j < size; j++) 
                this.fields[i][j] = new Field()
        }
        this.streets = new Array()
    }

    description = "This is the game board containing a 2D array of fields."
    
    generatePuzzle(min, max) {
        for(var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                this.fields[i][j].isWhite = true
            } 
        } 
        var numBlackFields = randomIntFromInterval(min, max)
        console.log("NumBlackFields: " + numBlackFields)
        for(var i = 0; i < numBlackFields; i++) {
            var x = randomIntFromInterval(0.0, 8.0)
            var y = randomIntFromInterval(0.0, 8.0)
            while(!this.fields[x][y].isWhite || !validate(this, x, y)) { 
                this.fields[x][y].isWhite = true
                x = randomIntFromInterval(0.0, 8.0)
                y = randomIntFromInterval(0.0, 8.0)
            }
            this.fields[x][y].isWhite = false
        }
        // check emptyStreets() and add if necessary blocks

        // fill with numbers
    }

    generateSimpleExample() {
        for(var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                this.fields[i][j].isWhite = true
                this.fields[i][j].isSet = false
                this.fields[i][j].number = 0
            } 
        } 
        var y = [2, 6, 5, 6, 0, 3, 4, 8, 2, 8, 2, 6, 0, 6, 0, 4, 5, 8, 2, 3, 2, 6]
        var x = [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 8, 8]
        var nums = [[0, 8, 4], [1, 0, 8], [1, 1, 9], [1, 4, 7], [2, 0, 4], [2, 1, 5], [2, 6, 2], [2, 8, 7], [3, 2, 8], [3, 3, 3], [4, 0, 7], [5, 2, 2], [5, 4, 4], [5, 6, 6], [5, 8, 8], [6, 4, 1], [7, 0, 1], [7, 3, 9], [7, 4, 8], [7, 5, 6], [8, 6, 3]]
        // nums.push([0, 1, 8])
        // nums.push([3, 1, 7])
        // nums.push([4, 1, 6])
        // nums.push([5, 1, 3])
        // nums.push([6, 1, 4])
        // nums.push([7, 1, 2])
        // nums.push([8, 1, 1])

        for (var i = 0; i < x.length; i++) {
            this.fields[x[i]][y[i]].isWhite = false
            console.log("Setting to black " + x[i] + "/" + y[i])
        }
        for (var i = 0; i < nums.length; i++) {
            this.fields[nums[i][0]][nums[i][1]].number = nums[i][2]
            // console.log("isSet = true "+ nums[i][0] + "/" + nums[i][1] + " || " + this.fields[0][8].isSet)
            this.fields[nums[i][0]][nums[i][1]].isSet = true
        }
    }

    findStreets() {
        // creating streets
        for(var i = 0; i < this.size; i++) {
            var streetH = new Street()
            streetH.isHorizontal = true
            var streetV = new Street()
            streetV.isHorizontal = false
            for (var j = 0; j < this.size; j++) {
                streetH = updateStreet(this, i, j, streetH)
                streetV = updateStreet(this, j, i, streetV)
            }
            if (streetH.fields.length > 1) {
                board.streets.push(streetH)
            }
            if (streetV.fields.length > 1) {
                board.streets.push(streetV)
            }
        }
    }
}

function updateStreet(board, i, j, street) {
    if (board.fields[i][j].isWhite) {
        street.fields.push(board.fields[i][j])
        street.positions.push([i, j])
    } else {
        if (street.fields.length > 1) {
            board.streets.push(street)
            return new Street()
        }
    }
    return street
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
        return true
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

function randomIntFromInterval(min, max) { 
    var r = Math.random()
    return Math.round(r * (max - min) + min);
}

Board.prototype.toString = function boardToString() {
    return `Board of Size ${this.size}`
};

module.exports = Board