import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getRandomMove } from "app/logic/randomStrategy";
import { checkWinner, checkDraw } from "app/logic/winnerLogic";
import { resetGameState } from 'app/logic/gameState';
import Message from './Message';


export function Board({ board, onClick }: BoardProps) {
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');  // Начинает игрок X
    const [gameBoard, setGameBoard] = useState<string[][]>(board);
    const [isComputerTurn, setIsComputerTurn] = useState(false);  // Флаг, когда ходит компьютер
    const [message, setMessage] = useState<string>("Ход игрока X");
    const [gameOver, setGameOver] = useState(false); 


    const handleClick = (x: number, y: number) => {
        if (gameBoard[y][x] !== '' || gameOver) return;  // Если клетка уже занята, игнорируем клик

        const newBoard = [...gameBoard];
        newBoard[y][x] = currentPlayer;

        const winner = checkWinner(newBoard);
        if (winner) {
            setMessage(`${winner} победил!`);
            setGameOver(true);  // Завершаем игру
            return;
        }

        if (checkDraw(newBoard)) {
            setMessage("Ничья!");
            setGameOver(true);
            return;
        }

        const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);
        setGameBoard(newBoard);
        setIsComputerTurn(nextPlayer === 'O');  // Если ходит O, это бот

        setMessage(`Ход игрока ${nextPlayer}`);
    };

    const computerMove = () => {
        const { x, y } = getRandomMove(gameBoard);  // Получаем ход от бота
        const newBoard = [...gameBoard];
        newBoard[y][x] = 'O';  // Устанавливаем O на выбранную позицию
        setGameBoard(newBoard); // Обновляем состояние доски с ходом бота

        const winner = checkWinner(newBoard);
        if (winner) {
            setMessage(`${winner} победил!`);
            setGameOver(true);  // Завершаем игру
        } else if (checkDraw(newBoard)) {
            setMessage("Ничья!");
            setGameOver(true);
        } else {
            // После хода бота, ходит игрок X
            setCurrentPlayer('X');
            setIsComputerTurn(false);  // Бот закончил ход
            setMessage("Ход игрока X");
        }
    };

    const resetBoard = () => {
        const initialState = resetGameState();
        setGameBoard(initialState.gameBoard);
        setCurrentPlayer(initialState.currentPlayer);
        setIsComputerTurn(initialState.isComputerTurn);
        setGameOver(initialState.gameOver);
        setMessage(initialState.message);
    };

    useEffect(() => {
        if (isComputerTurn && !gameOver) {
            setTimeout(() => {
                computerMove();
            }, 1000);  // Задержка для имитации хода бота
        }
    }, [isComputerTurn, gameBoard, gameOver]);

    useEffect(() => {
        const winner = checkWinner(gameBoard);
        if (winner) {
            setMessage(`${winner} победил!`);
            setGameOver(true);
        }
    }, [gameBoard]);

 
    return (
        <Box 
            sx={{ 
                width: '50vh',
                height: '50vh',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection:'column',
                alignSelf: 'center',
                gap: 2,
                margin: 'auto'
            }}
        >
            <Message message={message} />

            {gameBoard.map((row, y) => (
                <Box key={y} sx={{ display: 'flex', gap: 2 }}>
                    {row.map((value, x) => 
                        <Box 
                            key={`${y}-${x}`}
                            sx={{ 
                                display: 'flex',
                                width: 'calc(50vh / 3 - 2px)',
                                height: 'calc(50vh / 3 - 2px)',
                                boxShadow: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: value === '' ? 'pointer' : 'default',
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                '&:hover': {
                                    background: value === '' ? 'green' : 'lightgray',
                                } 
                            }}
                            onClick={() => value === '' && handleClick(x, y)}
                        >
                            {value || ''}
                        </Box>
                    )}
                </Box>
            ))}
            <Box sx={{ marginTop: 2 }}>
                <button onClick={resetBoard}>Очистить поле</button>
            </Box>
        </Box>
    );
}

export type BoardProps = {
    board: string[][];
    onClick?: (x: number, y: number) => void;
};