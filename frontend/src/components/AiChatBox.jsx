import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Box, Modal } from '@mui/material';
import { useState } from 'react';
const AiChatBox = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleChatClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Box sx={{ ':hover': { cursor: 'pointer' } }} onClick={handleChatClick}>
        <ChatBubbleIcon />
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            margin: '5px',
            height: '75vh',
            bgcolor: 'background.paper',
          }}
        >
          <p>AI chat messages go here</p>
        </Box>
      </Modal>
    </>
  );
};

export default AiChatBox;
