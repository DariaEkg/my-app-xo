import { Board } from "@/ui/board";
import { Box } from "@mui/material";
import { useEffect, useReducer } from "react";
import { initialState, gameReducer } from "./reducer";
import Message from "@/ui/message";
import { useComputerMove } from "@/ui/game/useComputerMove";
import DifficultySelect from "@/ui/game/DifficultySelect";

export function Game() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useComputerMove(state, dispatch);

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
            <DifficultySelect
                difficulty={state.difficulty}
                onChange={(e) =>
                    dispatch({ type: "SET_DIFFICULTY", difficulty: e.target.value as "easy" | "hard" })
                }
            />
            <Board board={state.board} onClick={(x, y) => dispatch({ type: "MAKE_MOVE", x, y })} />
            <Box sx={{ marginTop: 2 }}>
                <button onClick={() => dispatch({ type: "RESET_GAME" })}>Очистить поле</button>
            </Box>
        </Box>
    );
}