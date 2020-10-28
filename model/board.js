require('./field.js');

class Board {
    constructor(size) {
        this.size = size;
        this.fields = new Array(size);
        for (var i = 0; i < size; i++) {
            this.fields[i] = new Array(size);
        }
    }

    description = "This is the game board containing a 2D array of fields."
}


Board.prototype.toString = function boardToString() {
    return `Board of Size ${this.size}`;
};

module.exports = Board