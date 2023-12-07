const fs = require('node:fs')

const inputFilepath = 'input.txt';

var schMatrix = readInput().trim().replace(/(\r\n|\n|\r)/g, '\n').split('\n');
const schRows = schMatrix.length;
const schCols = schMatrix[0].length;

var numberList = [];
var gearList = [];
var solution = 0;

schMatrix.forEach((line, row) => processLine(line, row));
console.log(numberList);
console.log(gearList);
gearList.forEach((gear) => {
    console.log("GEAR(" + gear.row + ", " + gear.col + "):");
    checkPartNumbers(gear)
});
console.log("Solution is: " + solution);

function readInput() {
    try {
        return fs.readFileSync(inputFilepath, 'utf8');
    } catch(err) {
        console.error(err);
    }
}

// Generates two arrays, one describing the numbers and their position
// in the input schematic, and another locating all '*' symbols in 
// the input schematic.
function processLine(line, row) {
    let numbers = [];
    let number = '';
    let c;
    for(let i = 0; i < schCols; i++) {
        c = line[i];
        if(c >= '0' && c <= '9') {
            do {
                number += c;
                c = line[++i];
            } while(c >= '0' && c <= '9')
            numbers.push({'number': number, 'init': i - number.length, 'end': i - 1});
            number = ''
        } 
        if(c == '*') {
            gearList.push({'row': row, 'col': i});
        } 
    }
    numberList.push(numbers);
}

function checkPartNumbers(gear) {
    let minRow = gear.row > 0 ? gear.row - 1 : 0; 
    let minCol = gear.col > 0 ? gear.col - 1 : 0;
    let maxRow = gear.row + 1 < schRows ? gear.row + 1 : gear.row;
    let maxCol = gear.col + 1 < schCols ? gear.col + 1 : gear.col;
    let partNumbers = [];

    console.log("\tMIN AND MAX ROW = " + minRow + " | " + maxRow);
    console.log("\tMIN AND MAX COL = " + minCol + " | " + maxCol);

    let numbers;
    for(let row = minRow; row <= maxRow; row++) {
        numbers = numberList[row];
        numbers.forEach((number) => {
            if(isPartNumber(number, minCol, maxCol)) {
                partNumbers.push(parseInt(number.number)); 
                if (partNumbers.length == 2) {
                    console.log("\tGear has 2 part numbers! Adding to the solution...");
                    solution += partNumbers[0] * partNumbers[1];
                }
            };
        });
    }
}

function isPartNumber(number, minCol, maxCol) {
    console.log("\tChecking number " + number.number + "...");
    if(minCol <= number.end && maxCol >= number.init) { // If the ranges intersect
        console.log("\tNumber " + number.number + " is a part number!");
        return true;
    }
    return false;
}