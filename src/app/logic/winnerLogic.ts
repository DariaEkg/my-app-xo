export const checkWinner = (board: string[][]): string | null => {
    const lines = [
        // Строки
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        // Столбцы
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        // Диагонали
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (a && a === b && a === c) {
            return a;
        }
    }

    return null;  
};

export const checkDraw = (board: string[][]): boolean => {
    return board.every(row => row.every(cell => cell !== ''));  // Проверяем, заполнено ли всё поле
};