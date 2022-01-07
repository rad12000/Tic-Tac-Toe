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

    // Loops through each column in the gamebox.
    for (let colNumber = 0; colNumber < numberOfCols; colNumber++) {
        const valToCheck = gamebox[0][colNumber];
        let colDiffs = isUnsetCell(valToCheck);

        // Checks each row within the given column for a winner.
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

const StartCorner = {
    left: "left",
    right: "right"
}

function checkForDiagonalWin() {
    let { hasAWinner, winnerName } = checkDiagonalByCorner(StartCorner.left);
    if (hasAWinner) return { hasAWinner, winnerName };

    let { hasAWinner: didWin, winnerName: name } = checkDiagonalByCorner(StartCorner.right);
    if (didWin) return { hasAWinner: didWin, winnerName: name };

    return { hasAWinner: false }
}

function checkDiagonalByCorner(startCorner) {
    const leftCol = 0;
    const rightCol = gamebox[0].length - 1;

    let colNumber = startCorner === StartCorner.left ? leftCol : rightCol;
    let valToCheck = gamebox[0][colNumber];
    let diffs = isUnsetCell(valToCheck);

    for (const row of gamebox) {
        const colVal = row[colNumber];

        if (colVal != valToCheck) {
            diffs = true;
        }

        if (startCorner === StartCorner.left) {
            colNumber++;
            continue;
        }

        colNumber--;
    }

    return { hasAWinner: !diffs, winnerName: valToCheck }
}

function isCatGame() {
    for (const row of gamebox) {
        for (const col of row) {
            if (!col || col.length === 0) {
                return false; // The box is empty, which means the game is not a CAT and we can end the function.
            }
        }
    }

    return true; // The game is finished and it is a tied game.
}