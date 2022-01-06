const xMark = "x-mark";
const oMark = "o-mark";

let currentTurn = xMark; // Start with X.

let gamebox = [
    [
        [], [], []
    ],
    [
        [], [], []
    ],
    [
        [], [], []
    ]
];

const isUnsetCell = (cellValue) => !cellValue || cellValue.length === 0;
const toggleTurn = () => currentTurn = currentTurn === xMark ? oMark : xMark;
const isComplete = () => {
    const { hasAWinner } = checkForWinner();

    return hasAWinner || isCatGame();
}

function handleBoxClick(rowNumber, colNumber) {
    const cell = gamebox[rowNumber][colNumber];
    const isMarked = cell.length > 0; // Check if the cell is empty.

    if (isMarked || isComplete()) return; // End execution if the cell is marked, or the game is finished.

    markBox(rowNumber, colNumber);

    const { hasAWinner, winnerName } = checkForWinner();
    if (hasAWinner) {
        return displayMessage(`Looks like ${winnerName === xMark ? "X" : "O"}'s won!`);
    }

    if (isCatGame()) {
        displayMessage(`It's a CAT!`);
    }
}

function markBox(rowNumber, colNumber) {
    gamebox[rowNumber][colNumber] = currentTurn;

    toggleTurn();
    refreshView();
}

function checkForWinner() {
    const checks = [
        checkForRowWin,
        checkForColWin,
        checkForDiagonalWin
    ]

    for (const performCheck of checks) {
        const { hasAWinner, winnerName } = performCheck();

        if (hasAWinner) {
            return { hasAWinner, winnerName };
        }
    }

    return { hasAWinner: false }
}

function checkForRowWin() {
    for (const row of gamebox) {
        const valToCheck = row[0];
        let rowDiffs = isUnsetCell(valToCheck);

        for (const col of row) {
            if (col != valToCheck) {
                rowDiffs = true;
            }
        }

        if (!rowDiffs) {
            return { hasAWinner: true, winnerName: valToCheck }
        }
    }

    return { hasAWinner: false }
}

function checkForColWin() {
    const numberOfCols = gamebox[0].length;

    for (let colNumber = 0; colNumber < numberOfCols; colNumber++) {
        const valToCheck = gamebox[0][colNumber];
        let colDiffs = isUnsetCell(valToCheck);

        for (const row of gamebox) {
            const colVal = row[colNumber];

            if (colVal != valToCheck) {
                colDiffs = true;
            }
        }

        if (!colDiffs) {
            return { hasAWinner: true, winnerName: valToCheck }
        }
    }

    return { hasAWinner: false }
}

function checkForDiagonalWin() {
    let colNumber = 0;
    let valToCheck = gamebox[0][colNumber];
    let diffs = isUnsetCell(valToCheck);

    for (const row of gamebox) {
        const colVal = row[colNumber];

        if (colVal != valToCheck) {
            diffs = true;
        }

        colNumber++;
    }

    if (!diffs) {
        return { hasAWinner: true, winnerName: valToCheck }
    }

    valToCheck = gamebox[0][colNumber];
    diffs = isUnsetCell(valToCheck);

    for (const row of gamebox) {
        const colVal = row[colNumber];

        if (colVal != valToCheck) {
            diffs = true;
        }

        colNumber--;
    }

    if (!diffs) {
        return { hasAWinner: true, winnerName: valToCheck }
    }

    return { hasAWinner: false }
}

function isCatGame() {
    for (const row of gamebox) {
        for (const col of row) {
            if (!col || col.length === 0) {
                return false; // The box is empty, which means the game is not a CAT.
            }
        }
    }

    return true;
}