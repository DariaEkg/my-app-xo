import { useEffect } from "react";
import { getRandomMove } from "@/logic/randomStrategy";
import { getBestMove } from "@/logic/minimaxStrategy";
import { GameState } from "@/ui/game/useComputerMove/types";

interface UseComputerMoveProps {
    state: GameState;
    dispatch: React.Dispatch<any>;
  }
  
  export const useComputerMove = ({ state, dispatch }: UseComputerMoveProps) => {
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
    }, [state.isComputerTurn, state.board, state.gameOver, dispatch, state.difficulty]);
  };