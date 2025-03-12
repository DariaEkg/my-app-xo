import { Box } from "@mui/material";

export function Board({ board, onClick }: BoardProps) {
    return board.map((row, y) => (
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
                    onClick={() => onClick?.(x, y)}
                >
                    {value || ""}
                </Box>
            ))}
        </Box>
    ))
}

export type BoardProps = {
    board: string[][];
    onClick?: (x: number, y: number) => void;
}