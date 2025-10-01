import { Box, Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const Register = () => {
  const [username, setUsername] = useState('');
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
        nav('/login');
      },
      (error) => {
        setErr(error);
      }
    );
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
      x
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
  );
};

export default Register;
