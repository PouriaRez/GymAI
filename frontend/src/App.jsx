import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ContextProvider from './context/contextProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoggedIn(false);
      return;
    }
    setLoggedIn(true);
  }, []);

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <ContextProvider.Provider
          value={{
            // loggedIn,
            setLoggedIn,
          }}
        >
          <Routes>
            <Route
              path="/login"
              element={!loggedIn ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={loggedIn ? <Dashboard /> : <Login />} />
          </Routes>
        </ContextProvider.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
