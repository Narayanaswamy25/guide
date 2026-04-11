
import { CareerPath, Difficulty, DegreeType } from './types';

const gid = () => Math.random().toString(36).substr(2, 9);

export const DEGREES: DegreeType[] = [
  'Computer Science',
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Data Science',
  'Business Management',
  'Bio-Medical',
  'Aerospace Engineering'
];

export const CAREER_PATHS: CareerPath[] = [
  // --- COMPUTER SCIENCE: FULL STACK ---
  {
    id: 'cs-fullstack-pro',
    title: 'Professional Full Stack Engineering',
    degree: ['Computer Science'],
    category: 'frontend',
    icon: 'Layers',
    difficulty: 'Intermediate',
    duration: '24 Weeks',
    rating: 4.9,
    updatedAt: '2024-07-01',
    description: 'A complete end-to-end curriculum from browser internals to global cloud deployment.',
    steps: [
      { id: gid(), title: 'Semantic HTML5 Engineering', description: 'Advanced document structure, accessibility (ARIA), and SEO fundamentals.', youtubeId: 'HA3Xv8BfBq0' },
      { id: gid(), title: 'Modern CSS3 & Design Systems', description: 'Flexbox, Grid, CSS Variables, and scalable architecture (Tailwind/BEM).', youtubeId: 'W6L37y_BqgI' },
      { id: gid(), title: 'JavaScript Core & V8 Runtime', description: 'Memory management, closures, async/await, and the event loop mechanics.', youtubeId: '8aGhZQkoFbQ' },
      { id: gid(), title: 'Node.js & Express Backend', description: 'Server architecture, RESTful APIs, and middleware security protocols.', youtubeId: 'fFcCDAy_7S0' },
      { id: gid(), title: 'Firebase Cloud Infrastructure', description: 'Authentication, Firestore real-time DB, and Cloud Functions deployment.', youtubeId: 'fFcCDAy_7S0' },
      { id: gid(), title: 'Production Hosting & CI/CD', description: 'Deploying to Firebase Hosting with automated GitHub Action pipelines.', youtubeId: '08S_I_zK3y0' }
    ]
  },
  // --- AI & MACHINE LEARNING ---
  {
    id: 'ai-gen-specialist',
    title: 'Generative AI & LLM Engineering',
    degree: ['Computer Science', 'Data Science'],
    category: 'ai-ml',
    icon: 'Zap',
    difficulty: 'Advanced',
    duration: '18 Weeks',
    rating: 5.0,
    updatedAt: '2025-01-10',
    description: 'Master Transformer architectures, LLM fine-tuning, and RAG (Retrieval-Augmented Generation) systems.',
    steps: [
      { id: gid(), title: 'Attention & Transformers', description: 'Deep dive into the self-attention mechanism and BERT/GPT architectures.', youtubeId: 'yGTUuEx3G0E' },
      { id: gid(), title: 'Large Language Model Fine-tuning', description: 'Techniques like LoRA and QLoRA for efficient parameter tuning.', youtubeId: 'XpoK6zCAsSg' },
      { id: gid(), title: 'Vector Databases & RAG', description: 'Building scalable retrieval systems with Pinecone and LangChain.', youtubeId: 'LhnCsygAvzY' },
      { id: gid(), title: 'Model Evaluation & MLOps', description: 'Monitoring hallucinations and deploying at scale.', youtubeId: '08S_I_zK3y0' }
    ]
  },
  // --- MECHANICAL: ROBOTICS ---
  {
    id: 'mech-robotics-auto',
    title: 'Autonomous Robotics & ROS2',
    degree: ['Mechanical Engineering', 'Electrical Engineering'],
    category: 'robotics',
    icon: 'Cpu',
    difficulty: 'Advanced',
    duration: '22 Weeks',
    rating: 4.8,
    updatedAt: '2024-12-15',
    description: 'Developing autonomous systems using Robot Operating System (ROS2) and industrial PLC integration.',
    steps: [
      { id: gid(), title: 'ROS2 Node Architecture', description: 'Distributed computing for robotics control systems.', youtubeId: 'Gg25GfA456o' },
      { id: gid(), title: 'Robotic Perception (OpenCV/PCL)', description: 'Processing 2D and 3D sensor data for autonomous navigation.', youtubeId: 'qiQR5rTSshw' },
      { id: gid(), title: 'PLC & Industrial IoT', description: 'Integrating hardware with factory floor logic and AWS IoT.', youtubeId: 'fFcCDAy_7S0' }
    ]
  },
  // --- BIO-MEDICAL ---
  {
    id: 'bio-genomic-computing',
    title: 'Genomic Sequence Computing',
    degree: ['Bio-Medical'],
    category: 'data-analytics',
    icon: 'Activity',
    difficulty: 'Specialist',
    duration: '26 Weeks',
    rating: 4.9,
    updatedAt: '2024-10-05',
    description: 'Applying computational algorithms to biological data for drug discovery and disease research.',
    steps: [
      { id: gid(), title: 'Computational Biology Fundamentals', description: 'Sequence alignment and homology modeling algorithms.', youtubeId: 'HA3Xv8BfBq0' },
      { id: gid(), title: 'Bio-Python & R Bioconductor', description: 'Statistical genetics and transcriptomics analysis.', youtubeId: 'fFcCDAy_7S0' },
      { id: gid(), title: 'AlphaFold & Protein Structures', description: 'Predicting structure from sequence with specialized AI models.', youtubeId: '08S_I_zK3y0' }
    ]
  },
  // --- AEROSPACE ---
  {
    id: 'aero-avionics-sync',
    title: 'Digital Avionics & Flight Control',
    degree: ['Aerospace Engineering'],
    category: 'aerodynamics',
    icon: 'Rocket',
    difficulty: 'Specialist',
    duration: '30 Weeks',
    rating: 5.0,
    updatedAt: '2025-01-05',
    description: 'The intersection of aerospace dynamics and high-integrity flight control software.',
    steps: [
      { id: gid(), title: 'Flight Control Laws', description: 'Mathematical modeling of fly-by-wire and stability systems.', youtubeId: '8aGhZQkoFbQ' },
      { id: gid(), title: 'DO-178C Standards', description: 'Rigorous software certification for safety-critical avionics.', youtubeId: 'fFcCDAy_7S0' },
      { id: gid(), title: 'SatCom & Telemetry Protocols', description: 'Long-range digital communication in orbital environments.', youtubeId: '08S_I_zK3y0' }
    ]
  },
  // --- CYBERSECURITY ---
  {
    id: 'cyber-sec-ops',
    title: 'Cybersecurity Operations & Defense',
    degree: ['Computer Science', 'Electrical Engineering'],
    category: 'security',
    icon: 'Shield',
    difficulty: 'Intermediate',
    duration: '20 Weeks',
    rating: 4.7,
    updatedAt: '2025-02-15',
    description: 'Master network security, threat hunting, and incident response in modern enterprise environments.',
    steps: [
      { id: gid(), title: 'Network Security Protocols', description: 'Deep dive into TCP/IP, SSL/TLS, and secure routing architectures.', youtubeId: '8aGhZQkoFbQ' },
      { id: gid(), title: 'Penetration Testing Foundations', description: 'Ethical hacking methodologies and vulnerability assessment tools.', youtubeId: 'fFcCDAy_7S0' },
      { id: gid(), title: 'Incident Response & Forensics', description: 'Detecting and mitigating active threats in real-time.', youtubeId: '08S_I_zK3y0' }
    ]
  },
  // --- DEVOPS ---
  {
    id: 'devops-cloud-infra',
    title: 'Cloud Infrastructure & DevOps',
    degree: ['Computer Science', 'Data Science'],
    category: 'devops',
    icon: 'Server',
    difficulty: 'Advanced',
    duration: '22 Weeks',
    rating: 4.9,
    updatedAt: '2025-01-20',
    description: 'Automate deployment pipelines and manage scalable cloud infrastructure using Terraform and Kubernetes.',
    steps: [
      { id: gid(), title: 'Infrastructure as Code (Terraform)', description: 'Provisioning multi-cloud environments with declarative code.', youtubeId: 'yGTUuEx3G0E' },
      { id: gid(), title: 'Container Orchestration (Kubernetes)', description: 'Managing microservices at scale with K8s clusters.', youtubeId: 'XpoK6zCAsSg' },
      { id: gid(), title: 'CI/CD Pipeline Automation', description: 'Building robust delivery pipelines with GitHub Actions and Jenkins.', youtubeId: 'LhnCsygAvzY' }
    ]
  },
  // --- MOBILE DEVELOPMENT ---
  {
    id: 'mobile-app-dev',
    title: 'Cross-Platform Mobile Engineering',
    degree: ['Computer Science'],
    category: 'frontend',
    icon: 'Smartphone',
    difficulty: 'Intermediate',
    duration: '16 Weeks',
    rating: 4.8,
    updatedAt: '2024-11-10',
    description: 'Build high-performance mobile applications for iOS and Android using React Native.',
    steps: [
      { id: gid(), title: 'React Native Core Components', description: 'Building native-feeling UIs with cross-platform components.', youtubeId: 'HA3Xv8BfBq0' },
      { id: gid(), title: 'State Management & Navigation', description: 'Handling complex app state and deep linking.', youtubeId: 'W6L37y_BqgI' },
      { id: gid(), title: 'Native Modules & Performance', description: 'Optimizing app performance and bridging to native APIs.', youtubeId: '8aGhZQkoFbQ' }
    ]
  },
  // --- DATA SCIENCE ---
  {
    id: 'data-science-pro',
    title: 'Professional Data Science & Analytics',
    degree: ['Data Science', 'Computer Science', 'Business Management'],
    category: 'data-analytics',
    icon: 'BarChart3',
    difficulty: 'Intermediate',
    duration: '24 Weeks',
    rating: 4.9,
    updatedAt: '2025-02-01',
    description: 'Extract insights from complex datasets using Python, SQL, and advanced statistical modeling.',
    steps: [
      { id: gid(), title: 'Exploratory Data Analysis', description: 'Visualizing patterns and anomalies in large datasets.', youtubeId: 'fFcCDAy_7S0' },
      { id: gid(), title: 'Statistical Inference & Modeling', description: 'Applying hypothesis testing and regression models.', youtubeId: '08S_I_zK3y0' },
      { id: gid(), title: 'Big Data Processing (Spark)', description: 'Handling petabyte-scale data with distributed computing.', youtubeId: 'HA3Xv8BfBq0' }
    ]
  },
  // --- GAME DEVELOPMENT ---
  {
    id: 'game-dev-unity',
    title: '3D Game Engineering with Unity',
    degree: ['Computer Science'],
    category: 'robotics',
    icon: 'Gamepad2',
    difficulty: 'Advanced',
    duration: '28 Weeks',
    rating: 5.0,
    updatedAt: '2024-12-01',
    description: 'Create immersive 3D experiences and complex game mechanics using Unity and C#.',
    steps: [
      { id: gid(), title: 'Unity Engine Fundamentals', description: 'Mastering the editor, physics engine, and component system.', youtubeId: 'W6L37y_BqgI' },
      { id: gid(), title: 'C# Scripting for Games', description: 'Advanced programming patterns for game logic and AI.', youtubeId: '8aGhZQkoFbQ' },
      { id: gid(), title: 'Graphics & Shader Programming', description: 'Creating stunning visuals with URP and custom shaders.', youtubeId: 'fFcCDAy_7S0' }
    ]
  }
];
