const fs = require('node:fs')

const inputFilepath = 'input.txt';

var schMatrix = readInput().trim().replace(/(\r\n|\n|\r)/g, '\n').split('\n');
var solution = 0;
const schRows = schMatrix.length;
const schCols = schMatrix[0].length;

let c;
for (let row = 0; row < schRows; row++) {
    for(let col = 0; col < schCols; col++) {
        c = schMatrix[row][col];
        if (c >= '0' && c <= '9') {
            console.log("Treating number " + c + "...");
            row, col = treatNumber(row, col);
        }
    }
}

console.log("Solution is " + solution + "!");


function readInput() {
    try {
        return fs.readFileSync(inputFilepath, 'utf8');
    } catch(err) {
        console.error(err);
    }
}

function treatNumber(row, col) {
    let number = '';
    let digit = schMatrix[row][col];
    let isNumber = false;

    do {
        console.log("\tDIGIT " + digit + ":");
        number += digit;
        if(!isNumber)
            isNumber = hasAdjacentSymbol(row, col)

        col += 1;
        digit = schMatrix[row][col];
    } while(digit >= '0' && digit <= '9' && col < schCols)

    if(isNumber) {
        console.log("\t" + number + " is number!");
        solution += parseInt(number);
    }

    return row, col;
}

function hasAdjacentSymbol(row, col) {
    let r = row - 1;
    let c = col - 1;

    if (r < 0) r = 0;
    if (c < 0) c = 0;

    let symbol;
    for(let i = r; i <= row + 1 && i < schRows; i++) {
        for(let j  = c; j <= col + 1 && j < schCols; j++) {
            symbol = schMatrix[i][j]; 
            if(symbol != '.' && (symbol < '0' || symbol > '9')) {
                console.log("\t\tIt has adjacent symbol!");
                return true;
            }
        }
    }

    return false;
}