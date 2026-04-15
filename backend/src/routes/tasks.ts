import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// Get all tasks for user
router.get('/', async (req: any, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// Create task
router.post('/', async (req: any, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// Update task
router.patch('/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const task = await prisma.task.update({
      where: { id, userId: req.user.id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Delete task
router.delete('/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id, userId: req.user.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
