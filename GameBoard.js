class GameBoard {
    constructor(htmlButtonSupplier) {
        this.getHTMLButton = htmlButtonSupplier;
        this.onButtons = new Set();
        this.buttonArray = buildButtonArray(this);
    }

    setWinAction(_winAction) {
        this.winAction = _winAction;
    }

    getButton(column, row) {
        return this.buttonArray[column][row];
    }

    clearBoard() {
        for (let column of this.buttonArray) {
            for (let button of column) {
                button.turnOff();
            }
        }
    }

    isClear() {
        return this.onButtons.size === 0;
    }

    pressButton(column, row) {
        for (let [_col, _row] of this.getNeighbors(column, row)) {
            this.getButton(_col, _row).toggle();
        }
    }

    getNeighbors(column, row) {
        let neighbors = [];
        neighbors.push([column, row]);
        if (column - 1 >= 0) {
            neighbors.push([column - 1, row]);
        }
        if (column + 1 <= 4) {
            neighbors.push([column + 1, row]);
        }
        if (row - 1 >= 0) {
            neighbors.push([column, row - 1]);
        }
        if (row + 1 <= 4) {
            neighbors.push([column, row + 1]);
        }
        return neighbors;
    }
}

function buildButtonArray(gameBoard) {
    return allCoordinates().map(array => array.map(coord => buildButton(coord[0], coord[1], gameBoard)));
}

function allCoordinates() {
    const coord = [];
    const range = [0, 1, 2, 3, 4]
    for (let column of range) {
        const _col = [];
        for (let row of range) {
            _col.push([column, row]);
        }
        coord.push(_col);
    }
    return coord;
}

function buildButton(column, row, gameBoard) {
    const htmlButton = gameBoard.getHTMLButton(column, row);
    htmlButton.addEventListener('click', buttonEventListener(gameBoard));
    const actionCallback = (button) => {
        htmlButton.style.backgroundColor = "";
        if (button.isOn) {
            gameBoard.onButtons.add(button);
            htmlButton.classList.remove("btn-dark");
            htmlButton.classList.add("btn-light");
        } else {
            gameBoard.onButtons.delete(button);
            htmlButton.classList.remove("btn-light");
            htmlButton.classList.add("btn-dark");
        }
    }
    let button = new Button(actionCallback);
    return button;
}

function buttonEventListener(gameBoard) {
    return function(ev) {
        ev.preventDefault();
        if (!gameBoard.isClear()) {
            let [column, row] = ev.target.coordinates;
            gameBoard.pressButton(column, row);
        }
        if (gameBoard.isClear()) {
            gameBoard.winAction.call();
        }
    }
}