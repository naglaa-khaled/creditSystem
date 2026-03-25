import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
}

export default function BasicModal({ open, onClose, title, content, actions }: BasicModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          {title}
        </Typography>
        <Box mb={3}>{content}</Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          {actions ? actions : <Button onClick={onClose}>Close</Button>}
        </Box>
      </Box>
    </Modal>
  );
}
