const xMark = 1;
const oMark = 0;
const unset = -1;

let currentTurn = xMark;

let gamebox = [
    [unset, unset, unset],
    [unset, unset, unset],
    [unset, unset, unset]
];

function displayMessage(message) {
    displayMessageHtml(message);
}

function refreshView() {
    refreshViewHtml();
}

function handleBoxClick(rowNumber, colNumber) {
    gamebox[rowNumber][colNumber] = currentTurn;
    refreshView();
}