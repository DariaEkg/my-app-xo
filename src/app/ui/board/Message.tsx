import React from 'react';
import { Box } from '@mui/material';

type MessageProps = {
    message: string;
};

const Message: React.FC<MessageProps> = ({ message }) => (
    <Box sx={{ marginBottom: 2 }}>
        <strong>{message}</strong>
    </Box>
);

export default Message;