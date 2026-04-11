import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.get('/health', (req, res) => res.send('Backend OK'));

// Routes placeholder
import authRouter from './routes/auth.js';
import tasksRouter from './routes/tasks.js';
import habitsRouter from './routes/habits.js';

app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/habits', habitsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
