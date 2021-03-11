addHTMLCoordinates();
let gameBoard = new GameBoard(getHTMLButton);
let turnOnWinMode = () => {
    winCelebration.celebrating = true;
    document.getElementById("youwin").hidden = false
};
let winCelebration = new WinCelebration(gameBoard, turnOnWinMode);
let gameBoardSetup = new GameBoardSetup(gameBoard);
restartGame();


function restartGame() {
    winCelebration.celebrating = false;
    document.getElementById("youwin").hidden = true;
    gameBoardSetup.setup();
}

function getHTMLButton(column, row) {
    for (let btn of getAllHTMLButtons()) {
        if (btn.coordinates[0] === column && btn.coordinates[1] === row) {
            return btn;
        }
    }
    return undefined;
}

function getAllHTMLButtons() {
    return Array.prototype.slice.call(document.querySelectorAll(".game-btn"));
}

function addHTMLCoordinates() {
    let coords = allCoordinates().flat();
    for (let btn of getAllHTMLButtons()) {
        btn.coordinates = coords.pop();
    }
}