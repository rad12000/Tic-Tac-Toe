const xMark = "x-mark";
const oMark = "o-mark";

let currentTurn = xMark; // Start with X.

let gamebox = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

function handleBoxClick(rowNumber, colNumber) {
    console.log(`Row number: ${rowNumber}; Column number: ${colNumber}`);
}