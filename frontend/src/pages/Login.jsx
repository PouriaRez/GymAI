import { useState, useContext } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContextProvider from '../context/contextProvider';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const { setLoggedIn } = useContext(ContextProvider);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleLogin = (username, password) => {
    if (!username || !password) {
      setErr({ message: 'Please enter a username and password.' });
      return;
    }

    fetch('http://localhost:3010/api/v0/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setErr({
            message: 'Please enter a valid username and password',
          });
          return;
        }
        return res.json();
      })
      .then(
        (result) => {
          const token = result.accessToken;
          localStorage.setItem('authToken', token);
          setErr('');
          setLoggedIn(true);
          nav('/');
        },
        (error) => {
          setErr(error);
        }
      );
  };

  const handleRegisterRedirect = () => {
    nav('/register');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '50vh',
      }}
    >
      <FormControl>
        <TextField
          required
          aria-label="username"
          type="text"
          label="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          required
          aria-label="password"
          type="password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      {err && <Box sx={{ color: 'red' }}>{err.message}</Box>}
      <Button
        variant="contained"
        endIcon={<LoginIcon />}
        onClick={() => handleLogin(username, password)}
      >
        Login
      </Button>
      <Button onClick={handleRegisterRedirect}>Create an account</Button>
    </Box>
  );
};

export default Login;
