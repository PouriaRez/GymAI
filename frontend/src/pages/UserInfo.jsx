// gather user info:
// age, height, weight, frequency, goals
// then update their profile on db with their info
// then navigate to dashboard
import { Box, Button, FormControl, TextField } from '@mui/material';
import ContextProvider from '../context/contextProvider';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

const UserInfo = () => {
  const { username, setLoggedIn } = useContext(ContextProvider);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [goals, setGoals] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handlePlanGeneration = () => {
    setErr('');
    if (frequency > 7) {
      setErr('Frequency must be between 1-7');
      return;
    }
    if (!age || !height || !weight || !frequency || !goals) {
      setErr('Please fill out each field for the most accurate plan');
      return;
    }

    fetch('http://localhost:3010/api/v0/register/userInfo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, age, height, weight, frequency, goals }),
    }).then((res) => {
      if (res.status !== 200) {
        setErr('There has been a problem. Try again later.');
      }
      setLoggedIn(true);
      nav('/');
    });
  };

  console.log(`${age}, ${height}, ${weight}, ${frequency}, ${goals}`);
  return (
    <>
      <Box>
        <Box>
          Hi {username}, enter some info so we can get personalize your plan
        </Box>
        <FormControl>
          <TextField
            required
            aria-label="age"
            type="number"
            label="Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </FormControl>
        {/* Give height a wheel selector menu */}
        <FormControl>
          <TextField
            required
            aria-label="height"
            type="text"
            label="Height (Example: 5'11)"
            onChange={(e) => setHeight(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            aria-label="weight"
            type="number"
            label="Weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            aria-label="frequency"
            type="number"
            label="Frequency (0-7)"
            onChange={(e) => setFrequency(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            aria-label="goal"
            type="text"
            label="Goals"
            onChange={(e) => setGoals(e.target.value)}
          />
        </FormControl>
        {err && <Box sx={{ color: 'red' }}>{err}</Box>}
        <Button onClick={handlePlanGeneration}>Generate my plan</Button>
      </Box>
    </>
  );
};

export default UserInfo;
