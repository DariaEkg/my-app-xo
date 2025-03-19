export interface GameState {
    board: string[][];
    isComputerTurn: boolean;
    gameOver: boolean;
    difficulty: "easy" | "hard";
    message: string;
  }