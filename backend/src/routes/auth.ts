import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        selectedDegree: user.selectedDegree,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        selectedDegree: user.selectedDegree,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get Profile
router.get('/me', authenticate, async (req: any, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        selectedDegree: true,
        avatar: true,
        bio: true,
        github: true,
        twitter: true,
        linkedin: true,
        focusHours: true,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update Profile
router.patch('/profile', authenticate, async (req: any, res, next) => {
  try {
    const { name, selectedDegree, avatar, bio, github, twitter, linkedin, focusHours } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { 
        name, 
        selectedDegree, 
        avatar, 
        bio, 
        github, 
        twitter, 
        linkedin, 
        focusHours 
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        selectedDegree: true,
        avatar: true,
        bio: true,
        github: true,
        twitter: true,
        linkedin: true,
        focusHours: true,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
