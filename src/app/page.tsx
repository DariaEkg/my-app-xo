"use client"

import { Box } from "@mui/material";
import { Board } from '@/ui/board';

export default function Home() {
  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px'
    }}>
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
  
