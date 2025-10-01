import express from 'express';
import cors from 'cors';
import * as auth from './auth/auth.js';
import * as ai from './ai/ai.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: 'http://localhost:5173' }));

// Routes
app.post('/api/v0/register', auth.Register);
app.post('/api/v0/login', auth.Login);
app.post('/api/v0/ai/generatePlan', ai.Message);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

export default app;
