import { checkWinner } from './winnerLogic';



type Player = 'X' | 'O';
type Move = {
    x: number;
    y: number;
};

const scores: Record<Player, number> = {
    X: -1, // Игрок
    O: 1,  // Компьютер
};

const isMovesLeft = (board: string[][]): boolean => {
    return board.some(row => row.includes(''));
};

const minimax = (board: string[][], depth: number, isMax: boolean): number => {
    const winner = checkWinner(board) as Player | null;
    if (winner) return scores[winner] ?? 0;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
        let best = -Infinity;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (board[y][x] === '') {
                    const newBoard = board.map(row => [...row]); // Копия доски
                    newBoard[y][x] = 'O';
                    best = Math.max(best, minimax(newBoard, depth + 1, false));
                }
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (board[y][x] === '') {
                    const newBoard = board.map(row => [...row]); // Копия доски
                    newBoard[y][x] = 'X';
                    best = Math.min(best, minimax(newBoard, depth + 1, true));
                }
            }
        }
        return best;
    }
};

// Функция поиска лучшего хода для компьютера
export const getBestMove = (board: string[][]): Move => {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[y][x] === '') {
                const newBoard = board.map(row => [...row]);
                newBoard[y][x] = 'O';
                if (checkWinner(newBoard) === 'O') {
                    return { x, y }; // Немедленный выигрыш
                }
            }
        }
    }
    
    let bestVal = -Infinity;
    let bestMove: Move = { x: -1, y: -1 };

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[y][x] === '') {
                const newBoard = board.map(row => [...row]); // Копия доски
                newBoard[y][x] = 'O';
                let moveVal = minimax(newBoard, 0, false);

                if (moveVal > bestVal) {
                    bestMove = { x, y };
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
};

