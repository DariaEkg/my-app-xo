"use client"

import { Box } from "@mui/material";
import { Board } from '@/ui/board';

export default function Home() {
  return (
    <Box >
      <Board 
        board={[
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ]}
        onClick={(x, y) => { alert(`${x} ${y}`) }}
      />
    </Box>
  );
}
  
