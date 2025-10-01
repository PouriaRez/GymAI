import { Box, Button, TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ContextProvider from '../context/contextProvider';
import AiChatBox from '../components/AiChatBox';
import { useContext } from 'react';

const Dashboard = () => {
  const { setLoggedIn } = useContext(ContextProvider);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        padding: '2px',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        Dashboard
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <AiChatBox />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={handleLogout}
          endIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
