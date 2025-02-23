interface GameState {
    gameBoard: string[][];
    currentPlayer: 'X' | 'O';
    isComputerTurn: boolean;
    gameOver: boolean;
    message: string;
}

export const resetGameState = () : GameState => ({
    gameBoard: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    currentPlayer: 'X',
    isComputerTurn: false,
    gameOver: false,
    message: "Ход игрока X"
});
