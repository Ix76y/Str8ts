const { ipcRenderer } = require('electron')

function checkRowsCols(game) {
    var solved = 0
    for (var i = 0; i < game.size; i++) {
        var valuesRow = new Array(game.size).fill(0)
        var possibleCol = 0
        var valuesCol = new Array(game.size).fill(0)
        var possibleRow = 0
        for (var j = 0; j < game.size; j++) {
            var numRow = game.fields[i][j].number
            var numCol = game.fields[j][i].number
            if (numRow != 0)
                valuesRow[numRow - 1] += 1
            else
                possibleCol = j
            if (numCol != 0)
                valuesCol[numCol - 1] += 1
            else 
                possibleRow = j
        }
        if (valuesRow.filter(x => x==0).length == 1) {
            for (var k = 0; k < valuesRow.length; k++) {
                if (valuesRow[k] == 0) {
                    game.fields[i][possibleCol].number = (k + 1)
                    solved += 1
                }
            }
        }
        if (valuesCol.filter(x => x==0).length == 1) {
            for (var k = 0; k < valuesCol.length; k++) {
                if (valuesCol[k] == 0) {
                    game.fields[possibleRow][i].number = (k + 1)
                    solved += 1
                }
            }
        }

    }
    return solved
}

function checkStreets(game) {
    var solved = 0
    var foundNew = true
    game.findStreets()
    game.streets.sort((a,b) => (a.fields.length > b.fields.length) ? 1 : ((b.fields.length > a.fields.length) ? -1 : 0));
    while (foundNew) {
        foundNew = false
        // finding all possible values for each field
        for (var i = 0; i < game.size; i ++) {
            for (var j = 0; j < game.size; j++) {
                let field = game.fields[i][j]
                if (field.isSolved || field.isSet)
                    continue
                for (var k = 0; k < game.size; k++) {
                    var num = game.fields[i][k].number
                    field.possibleValues.delete(num)
                    num = game.fields[k][j].number
                    field.possibleValues.delete(num)
                }

            }
        }

        // for each street find possible values
        for (var i = 0; i < game.streets.length; i++) {
            let street = game.streets[i]
            // if street is solved continue
            if (street.isSolved()) 
                continue
            // first create set of values in street
            var streetValues = new Set()
            for (var j = 0; j < street.fields.length; j++) {
                let number = street.fields[j].number
                if (number != 0)
                    streetValues.add(number)
            } 
            // find gap values -> in the current eixisting street are there any gap values eg 3_5 -> 4 is gap value
            var sortedStreetValues = Array.from(streetValues).sort()
            var gapValues = new Set()
            // find minSetValue and maxSetValue
            var minSetValue = sortedStreetValues[0]
            var maxSetValue = sortedStreetValues[sortedStreetValues.length - 1]
            for (var x = minSetValue; x < maxSetValue; x++) {
                if (!streetValues.has(x))
                    gapValues.add(x)
            }

            // missingBorderValues = street.length - values already set - gap values
            var missingBorderValues = street.fields.length - streetValues.size - gapValues.size

            var minOfStreet = minSetValue - missingBorderValues
            var maxOfStreet = maxSetValue + missingBorderValues
            if (minOfStreet < 1 || isNaN(minOfStreet)) {
                minOfStreet = 1
            }
            if (maxOfStreet > 9 || maxOfStreet == 0 || isNaN(maxOfStreet)) {
                maxOfStreet = 9
            }
            
            // update all field.possibleValues
            // if field.possibleValues.where(true).length == 1 -> set field value to possible value
            for (var j = 0; j < street.fields.length; j++) {
                var field = street.fields[j]
                if (field.isSolved  || field.isSet)
                    continue
                field.possibleValues = new Set(Array.from(field.possibleValues).filter(function(x) {
                    return x >= minOfStreet && x <= maxOfStreet;
                }))
                if (field.possibleValues.size == 1) {
                    field.number = Array.from(field.possibleValues)[0]
                    foundNew = true
                    field.isSolved = true
                    solved += 1
                }
            } 
        }
    }
    return solved
}

function isSolved (game) {
    return false
}

module.exports =  {
    solveGame: (game) => {
        var solved = isSolved(game)
        difficulty = 0
        //while(!solved) {
            difficulty += (checkRowsCols(game) * 1)
            difficulty += (checkStreets(game) * 2)
            solved = isSolved(game)
        //}
        console.log("Difficulty: " + difficulty)
        // TODO: update UI
    }
}
