import React from "react";
import { Box } from "@mui/material";

interface DifficultySelectProps {
    difficulty: "easy" | "hard";
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DifficultySelect: React.FC<DifficultySelectProps> = ({ difficulty, onChange }) => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            <label>Выбери сложность: </label>
            <select value={difficulty} onChange={onChange}>
                <option value="easy">Легко</option>
                <option value="hard">Сложно</option>
            </select>
        </Box>
    );
};

export default DifficultySelect;
