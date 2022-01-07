const xMark = 1;
const oMark = 0;
const unset = -1;

let currentTurn = xMark;

let gamebox = [
    [unset, unset, unset],
    [unset, unset, unset],
    [unset, unset, unset]
];

const boxWidth = gamebox[0].length;
const xSum = xMark * boxWidth;
const oSum = oMark * boxWidth;

const isUnsetCell = (cellValue) => cellValue === unset;
const toggleTurn = () => currentTurn = currentTurn === xMark ? oMark : xMark;
const isComplete = () => checkForWinner() || isFullBoard();

function handleBoxClick(rowNumber, colNumber) {
    const cell = gamebox[rowNumber][colNumber];
    const isMarked = cell != unset;

    if (isMarked || isComplete()) return;

    markBox(rowNumber, colNumber);

    if (checkForWinner()) {
        return displayMessage(`Looks like ${currentTurn === xMark ? "X" : "O"}'s won!`);
    }

    if (isFullBoard()) {
        displayMessage(`It's a CAT!`);
    }

    toggleTurn();
}

function markBox(rowNumber, colNumber) {
    gamebox[rowNumber][colNumber] = currentTurn;
    refreshView();
}

function checkForWinner() {
    const checks = [
        checkForRowWin,
        checkForColWin,
        checkForDiagonalWin
    ]

    for (const performCheck of checks) {
        if (performCheck()) {
            return true;
        }
    }

    return false;
}

function checkForRowWin() {
    for (const row of gamebox) {
        let rowSum = 0;

        for (const col of row) {
            if (isUnsetCell(col)) {
                rowSum = unset;
                break;
            }

            rowSum += col;
        }

        if (isWinningValue(rowSum)) {
            return true;
        }
    }

    return false;
}

function checkForColWin() {
    for (let colNumber = 0; colNumber < boxWidth; colNumber++) {
        let colSum = 0;

        for (const row of gamebox) {
            const colVal = row[colNumber];

            if (isUnsetCell(colVal)) {
                colSum = unset;
                break;
            }

            colSum += colVal;
        }

        if (isWinningValue(colSum)) {
            return true
        }
    }

    return false;
}

const StartCorner = {
    left: "left",
    right: "right"
}

function checkForDiagonalWin() {
    const didWin = checkDiagonalByCorner(StartCorner.left);
    if (didWin) return true;

    return checkDiagonalByCorner(StartCorner.right);
}

function checkDiagonalByCorner(startCorner) {
    const leftCol = 0;
    const rightCol = boxWidth - 1;

    let colNumber = startCorner === StartCorner.left ? leftCol : rightCol;
    let sum = 0;

    for (const row of gamebox) {
        const cellVal = row[colNumber];

        if (isUnsetCell(cellVal)) {
            sum = unset;
            break;
        }

        sum += cellVal;

        if (startCorner === StartCorner.left) {
            colNumber++;
            continue;
        }

        colNumber--;
    }

    return isWinningValue(sum);
}

function isWinningValue(sum) {
    if (sum === xSum || sum === oSum) return true;
    return false;
}

function isFullBoard() {
    for (const row of gamebox) {
        for (const col of row) {
            if (isUnsetCell(col)) {
                return false; // The box is empty, which means the game is not a CAT and we can end the function.
            }
        }
    }

    return true; // The game is finished and it is a tied game.
}