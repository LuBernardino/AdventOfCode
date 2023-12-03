numberList.forEach((x) => {
        console.log(x.number, x.positions, x.positions.some((position) => checkAdjacentSymbol(matrix, position.i, position.j, width, height)));
    });