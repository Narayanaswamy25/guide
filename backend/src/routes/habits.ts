import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// Get all habits for user
router.get('/', async (req: any, res, next) => {
  try {
    const habits = await prisma.habit.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(habits);
  } catch (error) {
    next(error);
  }
});

// Create habit
router.post('/', async (req: any, res, next) => {
  try {
    const { name } = req.body;
    const habit = await prisma.habit.create({
      data: {
        name,
        userId: req.user.id,
      },
    });
    res.status(201).json(habit);
  } catch (error) {
    next(error);
  }
});

// Update habit (toggle completion/streak)
router.patch('/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const { name, streak, completedToday } = req.body;

    const habit = await prisma.habit.update({
      where: { id, userId: req.user.id },
      data: {
        name,
        streak,
        completedToday,
      },
    });
    res.json(habit);
  } catch (error) {
    next(error);
  }
});

// Delete habit
router.delete('/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    await prisma.habit.delete({
      where: { id, userId: req.user.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
