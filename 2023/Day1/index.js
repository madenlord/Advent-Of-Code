const fs = require('node:fs')

const toIntDict = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};
const translate = item => item in toIntDict ? toIntDict[item] : item;
const regex_1 = /\d/g;
const regex_2 = /\d|one|two|three|four|five|six|seven|eight|nine/g;
const inputFilepath = 'input.txt';

var solution = 0;
var nLine = 0;


main();

function main() {
    let inputData = readInput();
    let input = inputData.split('\r');

    input.forEach((line) => solution += treatLine(line))
    console.log(solution);
};

function readInput() {
    try {
        return fs.readFileSync(inputFilepath, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

function treatLine(line) {
    let filteredLine     = line.match(regex_2);
    let calibrationValue = translate(filteredLine[0]) + translate(filteredLine.slice(-1));
    nLine += 1;

    console.log(nLine + "\tfirst digit: " + calibrationValue[0] + ", second digit: " + calibrationValue[1]);

    return parseInt(calibrationValue);
}