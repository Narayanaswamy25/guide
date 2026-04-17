import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { 
      email, 
      password, 
      name, 
      age,
      gender,
      dob,
      educationLevel, 
      stream, 
      subjects, 
      careerInterests,
      mainGoal,
      learningStyle,
      studyLocation,
      budgetPreference,
      degreeAwareness,
      confusionLevel,
      excitementFactor,
      personalityTrigger
    } = req.body;
    const normalizedEmail = email.toLowerCase();

    console.log(`Registration attempt for: ${normalizedEmail}`);

    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
        age: age ? parseInt(age.toString()) : undefined,
        gender,
        dob,
        educationLevel,
        stream,
        subjects,
        careerInterests,
        mainGoal,
        learningStyle,
        studyLocation,
        budgetPreference,
        degreeAwareness,
        confusionLevel,
        excitementFactor,
        personalityTrigger,
      },
    });

    console.log(`User created: ${user.id}`);

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
        age: user.age,
        gender: user.gender,
        dob: user.dob,
        educationLevel: user.educationLevel,
        stream: user.stream,
        subjects: user.subjects,
        careerInterests: user.careerInterests,
        mainGoal: user.mainGoal,
        learningStyle: user.learningStyle,
        studyLocation: user.studyLocation,
        budgetPreference: user.budgetPreference,
        degreeAwareness: user.degreeAwareness,
        confusionLevel: user.confusionLevel,
        excitementFactor: user.excitementFactor,
        personalityTrigger: user.personalityTrigger,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    console.log(`Login attempt for: ${normalizedEmail}`);

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      console.log(`User not found: ${normalizedEmail}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Password mismatch for: ${normalizedEmail}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(`Login successful for: ${normalizedEmail}`);

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
    console.error('Login error:', error);
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
        age: true,
        gender: true,
        dob: true,
        educationLevel: true,
        stream: true,
        subjects: true,
        careerInterests: true,
        mainGoal: true,
        learningStyle: true,
        studyLocation: true,
        budgetPreference: true,
        degreeAwareness: true,
        confusionLevel: true,
        excitementFactor: true,
        personalityTrigger: true,
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
    const { 
      name, 
      selectedDegree, 
      avatar, 
      bio, 
      github, 
      twitter, 
      linkedin, 
      focusHours,
      age,
      gender,
      dob,
      educationLevel,
      stream,
      subjects,
      careerInterests,
      mainGoal,
      learningStyle,
      studyLocation,
      budgetPreference,
      degreeAwareness,
      confusionLevel,
      excitementFactor,
      personalityTrigger
    } = req.body;
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
        focusHours,
        age: age ? parseInt(age.toString()) : undefined,
        gender,
        dob,
        educationLevel,
        stream,
        subjects,
        careerInterests,
        mainGoal,
        learningStyle,
        studyLocation,
        budgetPreference,
        degreeAwareness,
        confusionLevel,
        excitementFactor,
        personalityTrigger,
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
        age: true,
        gender: true,
        dob: true,
        educationLevel: true,
        stream: true,
        subjects: true,
        careerInterests: true,
        mainGoal: true,
        learningStyle: true,
        studyLocation: true,
        budgetPreference: true,
        degreeAwareness: true,
        confusionLevel: true,
        excitementFactor: true,
        personalityTrigger: true,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
