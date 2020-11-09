class Field {
    constructor() {
        this.isWhite = true;
        this.isSet = false;
        this.isSolved = false;
        this.number = 0;
        this.possibleValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
    
    description = "This is a field which can be either black or white and contains a number between 0-9."
}

module.exports = Field