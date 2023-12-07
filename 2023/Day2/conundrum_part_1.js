const fs = require('node:fs');

const inputFile = 'input.txt';
const digitRegex = /\d+/;
const colorRegex = /red|green|blue/;
const maxCubes = [];
maxCubes['red'] = 12;
maxCubes['green'] = 13;
maxCubes['blue'] = 14;

var feasibleGames = 0;
let games = readInput().split('\n');
games.forEach((game, index) => checkGame(cleanText(game), index + 1));
console.log(feasibleGames);

function readInput() {
    try {
        return fs.readFileSync(inputFile, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

function cleanText(text) {
    let cleanedText = text.replace('\r', '');
    cleanedText = cleanedText.split(':')[1];

    return cleanedText;
}

function checkGame(game, id) {
    let subsets = game.split(';');
    let validSubsets = [];
    subsets.forEach((subset) => validSubsets.push(checkSubset(subset)));

    if (!validSubsets.includes(false))
        feasibleGames += id;
}

function checkSubset(subset) {
    let cubes = subset.split(',');
    let validSubset = true;
    cubes.forEach(function(cube) {
        let nCubes = parseInt(cube.match(digitRegex));
        let cubeColor = cube.match(colorRegex);

        if(nCubes > maxCubes[cubeColor])
            validSubset = false;
    });

    return validSubset;
}