import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELED']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  dueDate: z.string().optional(),
});

router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user!.id },
  });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  try {
    const data = taskSchema.parse(req.body);
    const task = await prisma.task.create({
      data: { ...data, userId: req.user!.id, dueDate: data.dueDate ? new Date(data.dueDate) : null }
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = taskSchema.partial().parse(req.body);
  const task = await prisma.task.updateMany({
    where: { id, userId: req.user!.id },
    data: { ...data, dueDate: data.dueDate ? new Date(data.dueDate) : null }
  });
  if (task.count === 0) return res.status(404).json({ error: 'Task not found' });
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.deleteMany({
    where: { id, userId: req.user!.id }
  });
  res.json({ success: true });
});

export default router;

