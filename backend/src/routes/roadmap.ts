import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// Get all completed modules for user
router.get('/', async (req: any, res, next) => {
  try {
    const modules = await prisma.roadmapModule.findMany({
      where: { userId: req.user.id },
    });
    res.json(modules);
  } catch (error) {
    next(error);
  }
});

// Mark module as complete
router.post('/complete', async (req: any, res, next) => {
  try {
    const { degreeId, domainId, moduleIdx } = req.body;
    const module = await prisma.roadmapModule.upsert({
      where: {
        userId_degreeId_domainId_moduleIdx: {
          userId: req.user.id,
          degreeId,
          domainId,
          moduleIdx
        }
      },
      update: {},
      create: {
        userId: req.user.id,
        degreeId,
        domainId,
        moduleIdx
      }
    });
    res.json(module);
  } catch (error) {
    next(error);
  }
});

// Get academic record
router.get('/record', async (req: any, res, next) => {
  try {
    const record = await prisma.academicRecord.findUnique({
      where: { userId: req.user.id },
    });
    res.json(record || { gpa: 0, creditsEarned: 0, creditsRequired: 120 });
  } catch (error) {
    next(error);
  }
});

// Update academic record
router.patch('/record', async (req: any, res, next) => {
  try {
    const { gpa, creditsEarned, creditsRequired } = req.body;
    const record = await prisma.academicRecord.upsert({
      where: { userId: req.user.id },
      update: {
        gpa,
        creditsEarned,
        creditsRequired
      },
      create: {
        userId: req.user.id,
        gpa: gpa || 0,
        creditsEarned: creditsEarned || 0,
        creditsRequired: creditsRequired || 120
      }
    });
    res.json(record);
  } catch (error) {
    next(error);
  }
});

export default router;
