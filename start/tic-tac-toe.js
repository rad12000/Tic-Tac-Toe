const xMark = "x-mark";
const oMark = "o-mark";
var GameOver = false;
let currentTurn = xMark; // Start with X.
previousTurn = "";
let gamebox = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let myBox = [
    [-5, -5, -5],
    [-5, -5, -5],
    [-5, -5, -5]
];

const oValue = 1;
const oToWin = gamebox[0].length * oValue;
var numMoves = 0;

function handleBoxClick(rowNumber, colNumber) {
    if (GameOver) return;
    console.log(`Row number: ${rowNumber}; Column number: ${colNumber}`);
    numMoves++;
    if (gamebox[rowNumber][colNumber] == "") {
        switch (currentTurn) {
            case xMark:
                console.log("got here");
                gamebox[rowNumber][colNumber] = xMark;
                myBox[rowNumber][colNumber] = 0;
                currentTurn = oMark;
                previousTurn = xMark;
                break;
            case oMark:
                gamebox[rowNumber][colNumber] = oMark;
                myBox[rowNumber][colNumber] = 1;
                currentTurn = xMark;
                previousTurn = oMark;
        }
        if (numMoves > 4 && isGameOver()) {
            displayMessage(previousTurn + " won. Game over");
            GameOver = true;
        }
        refreshView()

    }
    console.log("got here 2");
}

function isGameOver() {
    //i tracks across, y tracks down, x tracks diagnol
    rowTotal = 0;
    numCols = myBox.length;
    numRows = myBox[0].length;

    y = 0;
    for (let row of myBox) {
        y++;
        rowTotal = 0;
        for (let col of row) {
            rowTotal += col;
        }
        console.log(`rowTotal: ${rowTotal}, y: ${y}`);
        if (rowTotal == 0 || rowTotal == oToWin) return true;
    }
    for (let i = 0; i < numCols; i++){
        colTotal = 0;
        for (let x = 0; x < numRows; x++){
            colTotal += myBox[x][i];
        }
        console.log(`colTotal: ${colTotal}, i: ${i}`)
        if (colTotal == 0 || colTotal == oToWin) return true;
    }

    diagTotal = 0;
    for (let i = 0; i < numCols; i++){
        diagTotal += myBox[i][i];
    }
    console.log(`diagTotal1: ${diagTotal}`)
    if (diagTotal == 0 || diagTotal == oToWin) return true;
    
    diagTotal = 0;
    for (let i = numCols - 1; i >= 0; i--){
            diagTotal += myBox[Math.abs((-numRows + 1) + i)][i];
    }
    console.log(`diagTotal2: ${diagTotal}`)
    if (diagTotal == 0 || diagTotal == oToWin) return true;

    return false;
}