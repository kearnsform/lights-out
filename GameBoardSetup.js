class GameBoardSetup {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
    }

    setup() {
        gameBoard.clearBoard();
        this.randomBoardSetup();
    }

    randomBoardSetup() {
        let randCoordinates = randomSelection(allCoordinates().flat(), 3);
        // let randCoordinates = randomSelection(allCoordinates().flat(), randomInt(3, 25))
        for (let [column, row] of randCoordinates) {
            gameBoard.pressButton(column, row);
        }
    }
}