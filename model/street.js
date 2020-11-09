class Street {
    constructor() {
        this.fields = [];
        this.positions = [];
        this.possibleValues = new Array(9).fill(true)
        this.isHorizontal = true
    }

    isSolved() {
        var solved = true
        this.fields.forEach(field => {
            solved = solved & (field.isSolved || field.isSet)
        })
        return solved
    }
    
    description = "This is a street, containing a number of fields and their positions on the board. Additionally, each street can have a minimum value and a maximum value."
}

module.exports = Street