export function getRandomMove(board: string[][]): { x: number, y: number } {
    const emptyCells = [];
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[y][x] === '') {
                emptyCells.push({ x, y });
            }
        }
    }
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return randomCell;
}