import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = credentialsSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.post('/register', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name } = credentialsSchema.and(z.object({ name: z.string().optional() })).parse(req.body);
    const hashed = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name || email.split('@')[0] }
    });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Email taken or invalid input' });
  }
});

router.get('/me', async (req: AuthRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.name ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}` : undefined,
  });
});

export default router;

