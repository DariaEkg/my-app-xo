import React, { useEffect, useReducer } from "react";
import { Box } from "@mui/material";
import { getRandomMove } from "logic/randomStrategy";
import { getBestMove } from "logic/minimaxStrategy";
import { checkWinner, checkDraw } from "logic/winnerLogic";
import { resetGameState } from "logic/gameState";
import Message from "./Message";

type Player = "X" | "O";

type GameState = {
    board: string[][];
    currentPlayer: Player;
    isComputerTurn: boolean;
    message: string;
    gameOver: boolean;
    difficulty: "easy" | "hard";
};

// Начальное состояние игры
const initialState: GameState = {
    board: [["", "", ""], ["", "", ""], ["", "", ""]], 
    currentPlayer: "X",
    isComputerTurn: false,
    message: "Ход игрока X",
    gameOver: false,
    difficulty: "easy",
};

type Action =
    | { type: "MAKE_MOVE"; x: number; y: number }
    | { type: "SET_DIFFICULTY"; difficulty: "easy" | "hard" }
    | { type: "RESET_GAME" }
    | { type: "COMPUTER_MOVE"; x: number; y: number };

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case "MAKE_MOVE": {
            const { x, y } = action;

            // Защита от некорректного board
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

        case "SET_DIFFICULTY":
            return { ...state, difficulty: action.difficulty };

        case "RESET_GAME":
            return resetGameState();

        case "COMPUTER_MOVE": {
            const { x, y } = action;
            if (!state.board || !state.board[y]) return state; //Защита от ошибки

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

export function Board({ board }: { board: string[][] | null }) {
    //Если `board` вдруг `null`, используем `initialState`
    const [state, dispatch] = useReducer(gameReducer, { ...initialState, board: board || initialState.board });

    //Защита от `null` перед рендером
    if (!state.board || state.board.length === 0) {
        return <div>Загрузка...</div>;
    }

    const handleClick = (x: number, y: number) => {
        dispatch({ type: "MAKE_MOVE", x, y });
    };

    useEffect(() => {
        if (state.isComputerTurn && !state.gameOver) {
            setTimeout(() => {
                const move = state.difficulty === "easy"
                        ? getRandomMove(state.board)
                        : getBestMove(state.board, "O");

                if (move) {
                    dispatch({ type: "COMPUTER_MOVE", x: move.x, y: move.y });
                }
            }, 1000);
        }
    }, [state.isComputerTurn, state.board, state.gameOver]);

    return (
        <Box
            sx={{
                width: "300px",
                margin: "auto",
            }}
        >
            <Message message={state.message} />
            <Box sx={{ marginBottom: 2 }}>
                <label>Выбери сложность: </label>
                <select
                    value={state.difficulty}
                    onChange={(e) =>
                        dispatch({ type: "SET_DIFFICULTY", difficulty: e.target.value as "easy" | "hard" })
                    }
                >
                    <option value="easy">Легко</option>
                    <option value="hard">Сложно</option>
                </select>
            </Box>

            {state.board.map((row, y) => (
                <Box key={y} sx={{ display: "flex", gap: 2 }}>
                    {row.map((value, x) => (
                        <Box
                            key={`${y}-${x}`}
                            sx={{
                                display: "flex",
                                width: "calc(50vh / 3 - 2px)",
                                height: "calc(50vh / 3 - 2px)",
                                boxShadow: 2,
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: value === "" ? "pointer" : "default",
                                transition: "box-shadow 0.2s, transform 0.2s",
                                "&:hover": {
                                    boxShadow: 4,
                                },
                            }}
                            onClick={() => value === "" && handleClick(x, y)}
                        >
                            {value || ""}
                        </Box>
                    ))}
                </Box>
            ))}
            <Box sx={{ marginTop: 2 }}>
                <button onClick={() => dispatch({ type: "RESET_GAME" })}>Очистить поле</button>
            </Box>
        </Box>
    );
}
