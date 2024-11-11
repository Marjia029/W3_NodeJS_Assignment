// src/routes/userRoutes.ts
import express, { Request, Response } from 'express';
import { User } from '../models/userSchema'; // Importing the User schema

const router = express.Router(); // Create a new router instance

let users: User[] = []; // Simulate a database with an array

// POST route to create a new user
router.post('/user', (req: Request, res: Response) => {
  const { id, name, age } = req.body;

  const newUser: User = { id, name, age };
  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully!',
    user: newUser
  });
});

// GET route to get all users
router.get('/user', (req: Request, res: Response) => {
  res.status(200).json(users);
});

export default router;
