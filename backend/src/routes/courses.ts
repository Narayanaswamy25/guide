import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// Get all courses for user
router.get('/', async (req: any, res, next) => {
  try {
    const courses = await prisma.course.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(courses);
  } catch (error) {
    next(error);
  }
});

// Create course
router.post('/', async (req: any, res, next) => {
  try {
    const { code, title, instructor, category, color, status, progress, grade, nextDeadline } = req.body;
    const course = await prisma.course.create({
      data: {
        code,
        title,
        instructor,
        category,
        color,
        status,
        progress: progress || 0,
        grade,
        nextDeadline,
        userId: req.user.id,
      },
    });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
});

// Update course
router.patch('/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const { code, title, instructor, category, color, status, progress, grade, nextDeadline } = req.body;

    const course = await prisma.course.update({
      where: { id, userId: req.user.id },
      data: {
        code,
        title,
        instructor,
        category,
        color,
        status,
        progress,
        grade,
        nextDeadline,
      },
    });
    res.json(course);
  } catch (error) {
    next(error);
  }
});

// Delete course
router.delete('/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({
      where: { id, userId: req.user.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
