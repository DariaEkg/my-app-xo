import { Board } from "@/ui/board";
import { Box } from "@mui/material";
import { useEffect, useReducer } from "react";
import { initialState, gameReducer } from "./reducer";
import Message from "@/ui/message";
import { getRandomMove } from "@/logic/randomStrategy";
import { getBestMove } from "@/logic/minimaxStrategy";

export function Game() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        if (state.isComputerTurn && !state.gameOver) {
            setTimeout(() => {
                const move = state.difficulty === "easy"
                    ? getRandomMove(state.board)
                    : getBestMove(state.board);

                if (move) {
                    dispatch({ type: "COMPUTER_MOVE", x: move.x, y: move.y });
                }
            }, 500);
        }
    }, [state.isComputerTurn, state.board, state.gameOver]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center"
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
            <Board board={state.board} onClick={(x, y) => dispatch({ type: "MAKE_MOVE", x, y })} />
            <Box sx={{ marginTop: 2 }}>
                <button onClick={() => dispatch({ type: "RESET_GAME" })}>Очистить поле</button>
            </Box>
        </Box >
    );
}
