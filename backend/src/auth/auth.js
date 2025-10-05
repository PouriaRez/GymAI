import * as db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const result = await db.createAccount(username, hashedPass);
  if (!result) {
    return res.status(409).send();
  }

  res.status(201).send();
};

export const collectUserInfo = async (req, res) => {
  try {
    const { username, age, height, weight, frequency, goals } = req.body;

    await db.updateUserInfo(username, age, height, weight, frequency, goals);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  const result = await db.loginAccount(username, password);

  if (!result) {
    return res.status(404).send();
  }
  const token = jwt.sign(
    {
      id: result[0],
      username: result[1],
    },
    process.env.SECRET
  );

  res
    .status(200)
    .json({ id: result[0], username: result[1], accessToken: token });
};
