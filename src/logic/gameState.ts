interface GameState {
    gameBoard: string[][];
    currentPlayer: 'X' | 'O';
    isComputerTurn: boolean;
    gameOver: boolean;
    message: string;
}

export function resetGameState() : GameState {
    return {
        ...initialState,
        board: [["", "", ""], ["", "", ""], ["", "", ""]], // Явная инициализация доски
    };
}


/*=> ({
    gameBoard: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    currentPlayer: 'X',
    isComputerTurn: false,
    gameOver: false,
    message: "Ход игрока X"
}); */
