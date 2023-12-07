const fs = require('node:fs');

const inputFile = 'input.txt';
const digitRegex = /\d+/g;
const colorRegex = /red|green|blue/g;

var solution = 0;

let games = readInput().trim();
games = games.split('\n');
games = arrangeInput(games);
games.forEach((game) => solution += processGame(game));
console.log("Solution is: " + solution);

function readInput() {
    try {
        return fs.readFileSync(inputFile, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

// This function reveices the entire input and, as a result, it returns
// an array with, for each element of the list, a list of every subset of
// a game:
// [
//      [
//          '3 blue, 4 red',
//          '1 red, 2 green, 6 blue',
//          '2 green'
//      ],
//      ...
// ]
function arrangeInput(inputData) {
    let arrangedData = [];
    inputData.forEach((input) => {
        let games = input.split(':')[1];
        arrangedData.push(games.split(';'));
    });

    return arrangedData;
}

function processGame(game) {
    let minCubes = [];
    minCubes['red'] = 0;
    minCubes['green'] = 0;
    minCubes['blue'] = 0;
    
    game.forEach((subset) => {
        let nCubes = subset.match(digitRegex);
        let colors = subset.match(colorRegex);

        nCubes = nCubes.map((n) => parseInt(n));

        colors.forEach((color, index) => {
            if(nCubes[index] > minCubes[color])
                minCubes[color] = nCubes[index];
        });
    });

    return minCubes['red'] * minCubes['green'] * minCubes['blue'];
}