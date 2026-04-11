import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

const habitSchema = z.object({
  name: z.string().min(1),
});

router.get('/', async (req, res) => {
  const habits = await prisma.habit.findMany({
    where: { userId: req.user!.id },
  });
  res.json(habits);
});

router.post('/', async (req, res) => {
  const data = habitSchema.parse(req.body);
  const habit = await prisma.habit.create({
    data: { ...data, userId: req.user!.id }
  });
  res.json(habit);
});

router.put('/:id/toggle', async (req, res) => {
  const { id } = req.params;
  const habit = await prisma.habit.findFirst({ where: { id, userId: req.user!.id } });
  if (!habit) return res.status(404).json({ error: 'Habit not found' });
  const newStreak = habit.completedToday ? Math.max(0, habit.streak - 1) : habit.streak + 1;
  const updated = await prisma.habit.update({
    where: { id },
    data: { completedToday: !habit.completedToday, streak: newStreak }
  });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.habit.deleteMany({
    where: { id, userId: req.user!.id }
  });
  res.json({ success: true });
});

export default router;

