// --- Day 3: Gear Ratios ---
const { input, inputTest } = require("./input.js");

function stringToMatrix(input) {
    const lines = input.trim().split("\n");
    const matrix = lines.map(line => Array.from(line));
    return matrix;
}

// const symbols = ['*', '/', '@', '=', '-', '%', '&', '+', '$']

function isNumber(char) {
    return /^\d$/.test(char);
}

function isSymbol(character) {
    return isNumber(character) === false && character !== '.';
}

function checkAdjacentSymbol(matrix, i, j, width, height)
{
    if(j + 1 < width && isSymbol(matrix[i][j + 1]))
        return [true, { i, j: j + 1 }];
    if(j - 1 >= 0 && isSymbol(matrix[i][j - 1]))
        return [true, { i, j: j - 1 }];
    if(i + 1 < height && isSymbol(matrix[i + 1][j]))
        return [true, { i: i + 1, j }];
    if(i - 1 >= 0 && isSymbol(matrix[i - 1][j]))
        return [true, { i: i - 1, j }];
    if(i + 1 < height && j + 1 < width && isSymbol(matrix[i + 1][j + 1]))
        return [true, { i: i + 1, j: j + 1 }];
    if(i + 1 < height && j - 1 >= 0 && isSymbol(matrix[i + 1][j - 1]))
        return [true, { i: i + 1, j: j - 1 }];
    if(i - 1 >= 0 && j + 1 < width && isSymbol(matrix[i - 1][j + 1]))
        return [true, { i: i - 1, j: j + 1 }];
    if(i - 1 >= 0 && j - 1 >= 0 && isSymbol(matrix[i - 1][j - 1]))
        return [true, { i: i - 1, j: j - 1 }];

    return [false, null];
}

function getNumberAndReplaceToDot(matrix, i, j, width){
    let numberString = `${matrix[i][j]}`;
    let positions = [{ i, j }];
    matrix[i][j] = '.';
    
    for(j++; j < width && isNumber(matrix[i][j]); j++)
    {
        numberString += `${matrix[i][j]}`;
        positions.push({ i, j });
        matrix[i][j] = '.';
    }

    return [matrix, parseInt(numberString), positions];
}
  
function printMatrix(matrix) {
    matrix.forEach(row => console.log(row.join(' ')));
}

function multiplyAndSum(numbersWithPositions) {
    const productMap = {};

    numbersWithPositions.forEach(({ number, symbolPosition }) => {
        const key = `${symbolPosition.i}-${symbolPosition.j}`;
        productMap[key] = { time: (productMap[key] ? productMap[key].time : 0) + 1, total: (productMap[key] ? productMap[key].total : 1) * number };
    });

    const total = Object.values(productMap).filter(x => x.time > 1).reduce((acc, product) => acc + product.total, 0);

    return total;
}

function solve() {
    let matrix = stringToMatrix(input);
    const height = matrix.length;
    const width = matrix[0].length;
    const numberList = [];

    matrix.forEach((row, i) => {
        row.forEach((cell, j) => {
            if(isNumber(cell))
            {
                const [newMatrix, number, positions] = getNumberAndReplaceToDot(matrix, i, j, width);
                matrix = newMatrix;
                
                // Visualize new matrix
                // printMatrix(newMatrix)
                // console.log('-------')

                numberList.push({ number, positions });
            }
        })
    })

    // Visualize numbers found 
    // numberList.forEach((x) => {
    //     console.log(x.number, x.positions, x.positions.some((position) => { 
    //         const [result, _] = checkAdjacentSymbol(matrix, position.i, position.j, width, height);
    //         return result;
    //     }));
    // });

    symbolsList = [];
    // Sum total
    const p1Total = numberList.reduce((accumulator, current) => {
        return accumulator + (current.positions.some((position) => { 
            const [result, symbolPosition] = checkAdjacentSymbol(matrix, position.i, position.j, width, height);
            if(result)
                symbolsList.push({ number: current.number, symbolPosition});

            return result;
        }) ? current.number : 0);
    }, 0);

    // Visualize Symbol List
    // console.log(symbolsList);

    const p2Total = multiplyAndSum(symbolsList);
    console.log(`Result part 1: ${p1Total} | Result part 2: ${p2Total}`);
}

solve();
