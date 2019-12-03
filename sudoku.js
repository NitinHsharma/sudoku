function getInput() {
    return [
        ['x', 'x', 'x', 2, 6, 'x', 7, 'x', 1],
        [6, 8, 'x', 'x', 7, 'x', 'x', 9, 'x'],
        [1, 9, 'x', 'x', 'x', 4, 5, 'x', 'x'],
        [8, 2, 'x', 1, 'x', 'x', 'x', 4, 'x'],
        ['x', 'x', 4, 6, 'x', 2, 9, 'x', 'x'],
        ['x', 5, 'x', 'x', 'x', 3, 'x', 2, 8],
        ['x', 'x', 9, 3, 'x', 'x', 'x', 7, 4],
        ['x', 4, 'x', 'x', 5, 'x', 'x', 3, 6],
        [7, 'x', 3, 'x', 1, 8, 'x', 'x', 'x']
    ];
};

function handleInput(array) {
    const possibleValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array.forEach((row, i) => {
        row.forEach((item, j) => {
            if (item === 'x') {
                array[i][j] = possibleValue;
            }
        })
    });

    return array;
};

function getCorrespondanceValues(array, i, j) {
     // ith row values
     const correspondanceValues = array[i].filter(function(item){
        if(!Array.isArray(item)) {
            return item;
        }
    });

    // jth row values
    for(let jindex = 0; jindex < 9; jindex++) {
        const currentItem = array[jindex][j];
        if (!Array.isArray(currentItem)) {
            correspondanceValues.push(currentItem);
        }
    }

    // 3*3 matrix values
    const iIndex = parseInt(parseInt(i / 3) * 3);
    const jIndex = parseInt(parseInt(j / 3) * 3);

    for(let k = iIndex; k < iIndex + 3; k++) {
        for (let m = jIndex; m < jIndex + 3; m++) {
            const currentItem = array[k][m];
            if (!Array.isArray(currentItem)) {
                correspondanceValues.push(currentItem);
            }
            
        }
    }
    return [ ...new Set(correspondanceValues)]
}

function checkPossibleValues(array, i, j) {
    const current = array[i][j];

    const toRemove = getCorrespondanceValues(array, i, j);

    // removing not possible values
    myArray = current.filter( ( el ) => !toRemove.includes( el ) );

    return myArray.length === 1 ? myArray[0] : myArray;
  
}

function solveMatrix(array) {
    let solved = true;
    array.forEach((row, i) => {
        row.forEach((item, j) => {
            if (typeof(item) === 'object' && Array.isArray(item)) {
                const value = checkPossibleValues(array, i, j);
                if(Array.isArray(value)) {
                    solved = false;
                }
                array[i][j] = value;
            }
        });
    });

    if (!solved) {
        solveMatrix(array);
    }

    return array;
}



(() => {
    // get input
    const userInput = getInput();

    // make initial assumption
    const completeMatrix = handleInput(userInput);

    // solve the matrix
    const result = solveMatrix(completeMatrix);

    console.log(result);

})();