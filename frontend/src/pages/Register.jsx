import { Box, Button, FormControl, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import ContextProvider from '../context/contextProvider';
import { useNavigate } from 'react-router';
import UserInfo from './UserInfo';
const Register = () => {
  const { registered, setRegistered, username, setUsername } =
    useContext(ContextProvider);
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleLoginRedirect = () => {
    nav('/login');
  };

  const handleRegister = (username, password) => {
    if (!username || !password) {
      return setErr({ message: 'Please enter a username and password' });
    }
    if (password.length < 3) {
      return setErr({ message: 'Password must be greater than 3 characters' });
    }

    setErr('');
    fetch('http://localhost:3010/api/v0/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(
      (res) => {
        if (res.status === 409) {
          setErr({ message: 'Username already exists' });
          return;
        } else if (!res.ok) {
          setErr({ message: 'Please enter a valid username and password' });
          return;
        }
        setRegistered(true);
      },
      (error) => {
        setErr(error);
      }
    );
  };

  return !registered ? (
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
        onClick={() => handleRegister(username, password)}
      >
        Register
      </Button>
      <Button onClick={handleLoginRedirect}>Already have an account?</Button>
    </Box>
  ) : (
    <UserInfo />
  );
};

export default Register;
