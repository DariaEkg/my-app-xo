import { checkDraw, checkWinner } from "@/logic/winnerLogic";

export type Player = "X" | "O";

export type GameState = {
    board: string[][];
    currentPlayer: Player;
    isComputerTurn: boolean;
    message: string;
    gameOver: boolean;
    difficulty: "easy" | "hard";
};

export const initialState: GameState = {
    board: [["", "", ""], ["", "", ""], ["", "", ""]],
    currentPlayer: "X",
    isComputerTurn: false,
    message: "Ход игрока X",
    gameOver: false,
    difficulty: "easy",
};

export type Action =
    | { type: "MAKE_MOVE"; x: number; y: number }
    | { type: "SET_DIFFICULTY"; difficulty: "easy" | "hard" }
    | { type: "RESET_GAME" }
    | { type: "COMPUTER_MOVE"; x: number; y: number };

export const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case "RESET_GAME":
            return {
                ...initialState,
                board: [["", "", ""], ["", "", ""], ["", "", ""]] // Сбросить доску в пустое состояние
            };

        case "SET_DIFFICULTY":
            return { ...state, difficulty: action.difficulty };

        case "MAKE_MOVE": {
            const { x, y } = action;
            if (!state.board || !state.board[y] || state.board[y][x] !== "" || state.gameOver) {
                return state;
            }

            const newBoard = state.board.map((row) => [...row]);
            newBoard[y][x] = state.currentPlayer;

            const winner = checkWinner(newBoard);
            if (winner) {
                return { ...state, board: newBoard, message: `${winner} победил!`, gameOver: true };
            }

            if (checkDraw(newBoard)) {
                return { ...state, board: newBoard, message: "Ничья!", gameOver: true };
            }

            return {
                ...state,
                board: newBoard,
                currentPlayer: state.currentPlayer === "X" ? "O" : "X",
                isComputerTurn: state.currentPlayer === "X",
                message: `Ход игрока ${state.currentPlayer === "X" ? "O" : "X"}`,
            };
        }

        case "COMPUTER_MOVE": {
            const { x, y } = action;
            if (!state.board || !state.board[y]) return state; // Защита от ошибки

            const newBoard = state.board.map((row) => [...row]);
            newBoard[y][x] = "O";

            const winner = checkWinner(newBoard);
            if (winner) {
                return { ...state, board: newBoard, message: `${winner} победил!`, gameOver: true };
            }

            if (checkDraw(newBoard)) {
                return { ...state, board: newBoard, message: "Ничья!", gameOver: true };
            }

            return {
                ...state,
                board: newBoard,
                currentPlayer: "X",
                isComputerTurn: false,
                message: "Ход игрока X",
            };
        }

        default:
            return state;
    }
};