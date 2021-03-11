class WinCelebration {
    constructor(gameBoard, turnOn) {
        this.gameBoard = gameBoard;
        gameBoard.setWinAction(() => { celebrate(this) });
        this.celebrating = false;
        this.getCelebrating = () => { return this.celebrating };
        this.turnOn = turnOn;
        this.frameCount = 20;
    }

    set setCelebrating(newValue) {
        this.celebrating = newValue;
    }

}

async function celebrate(winCelebration) {
    winCelebration.turnOn();
    let count = 0;
    while (count < winCelebration.frameCount) {
        await delayedEvents(100, winCelebration.gameBoard, winCelebration.getCelebrating);
        count++;
    }
}

function delayedEvents(delay, gameBoard, getCelebrating) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!getCelebrating()) {
                return;
            }
            gameBoard.clearBoard();
            decorateBoard(gameBoard);
            resolve();
        }, delay)
    })
}

function decorateBoard(gameBoard) {
    let randomCoordinates = randomSelection(allCoordinates().flat(), randomInt(3, 25));
    for (let coord of randomCoordinates) {
        getHTMLButton(coord[0], coord[1]).style.backgroundColor = randomColor();
    }
}