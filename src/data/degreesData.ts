export interface Module {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  topics: string[];
}

export interface Domain {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  weeks: number;
  rating: number;
  modules: Module[];
  jobRoles: string[];
  avgSalary: string;
}

export interface Degree {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  duration: string;
  domains: Domain[];
  color: string;
}

export const degrees: Degree[] = [
  {
    id: 'btech-it',
    title: 'B.Tech Information Technology',
    shortTitle: 'B.Tech IT',
    description: 'Build software systems, applications and digital infrastructure powering the modern world.',
    icon: '💻',
    duration: '4 Years',
    color: '#c8ff00',
    domains: [
      {
        id: 'fullstack',
        title: 'Full Stack Development',
        description: 'Build complete web applications from frontend to backend — HTML, CSS, JavaScript, React, Node.js, and databases.',
        icon: '⚡',
        level: 'Intermediate',
        weeks: 24,
        rating: 4.9,
        jobRoles: ['Full Stack Developer', 'Frontend Engineer', 'Backend Developer', 'Software Engineer'],
        avgSalary: '₹8–25 LPA',
        modules: [
          { id: 'm1', title: 'HTML5 Fundamentals', description: 'Learn semantic HTML, forms, accessibility and document structure — the backbone of every web page.', youtubeId: 'pQN-pnXPaVg', duration: '4.5 hrs', topics: ['HTML Tags', 'Forms', 'Tables', 'Semantic Elements', 'Accessibility', 'SEO Basics'] },
          { id: 'm2', title: 'CSS3 & Modern Layouts', description: 'Master styling, Flexbox, Grid, animations and responsive design to make beautiful UIs.', youtubeId: 'OXGznpKZ_sA', duration: '6 hrs', topics: ['Box Model', 'Flexbox', 'CSS Grid', 'Animations', 'Media Queries', 'Variables'] },
          { id: 'm3', title: 'JavaScript Core', description: 'The language of the web — functions, DOM, events, asynchronous JS, and ES6+ features.', youtubeId: 'hdI2bqOjy3c', duration: '8 hrs', topics: ['Variables & Types', 'Functions', 'DOM Manipulation', 'Promises & Async', 'ES6+', 'Fetch API'] },
          { id: 'm4', title: 'React.js', description: 'Build modern, component-based UIs with hooks, state management, and React ecosystem.', youtubeId: 'bMknfKXIFA8', duration: '10 hrs', topics: ['Components', 'Props & State', 'Hooks', 'Context API', 'React Router', 'Performance'] },
          { id: 'm5', title: 'Node.js & Express Backend', description: 'Server-side JavaScript — build REST APIs, authentication, and backend services.', youtubeId: 'Oe421EPjeBE', duration: '7 hrs', topics: ['Node.js Basics', 'Express Framework', 'REST APIs', 'Middleware', 'Authentication', 'File System'] },
          { id: 'm6', title: 'MongoDB & SQL Databases', description: 'Store and query data with MongoDB (NoSQL) and PostgreSQL/MySQL (SQL).', youtubeId: 'ofme2o29ngU', duration: '6 hrs', topics: ['SQL Queries', 'Joins', 'MongoDB CRUD', 'Mongoose ODM', 'Indexing', 'Schema Design'] },
          { id: 'm7', title: 'Git & Version Control', description: 'Collaborate on code with Git — branching, merging, pull requests and GitHub workflow.', youtubeId: 'RGOj5yH7evk', duration: '3 hrs', topics: ['Git Basics', 'Branching', 'Merging', 'GitHub', 'Pull Requests', 'CI/CD Intro'] },
          { id: 'm8', title: 'Deployment & DevOps Basics', description: 'Deploy your apps to production using Netlify, Vercel, Railway, and Docker basics.', youtubeId: 'fl9yjkgxzio', duration: '4 hrs', topics: ['Hosting', 'Vercel / Netlify', 'Docker Basics', 'Environment Variables', 'CI/CD', 'Monitoring'] },
        ],
      },
      {
        id: 'ai-ml',
        title: 'AI & Machine Learning',
        description: 'Teach computers to learn from data — build intelligent systems using Python, TensorFlow, and ML algorithms.',
        icon: '🤖',
        level: 'Advanced',
        weeks: 28,
        rating: 4.8,
        jobRoles: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'NLP Engineer'],
        avgSalary: '₹12–40 LPA',
        modules: [
          { id: 'm1', title: 'Python for ML', description: 'Python fundamentals with NumPy, Pandas and Matplotlib for data science workflows.', youtubeId: '_uQrJ0TkZlc', duration: '6 hrs', topics: ['Python Basics', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebooks'] },
          { id: 'm2', title: 'Statistics & Mathematics for ML', description: 'Probability, linear algebra and statistics that underpin every ML algorithm.', youtubeId: 'xxpc-HPKN28', duration: '4 hrs', topics: ['Probability', 'Distributions', 'Linear Algebra', 'Calculus Basics', 'Hypothesis Testing', 'Bayesian Thinking'] },
          { id: 'm3', title: 'Supervised Learning', description: 'Regression, classification, decision trees, SVMs and ensemble methods.', youtubeId: 'w2OtwOs_rOE', duration: '8 hrs', topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forests', 'SVM', 'Evaluation Metrics'] },
          { id: 'm4', title: 'Unsupervised Learning', description: 'Clustering, dimensionality reduction and anomaly detection without labels.', youtubeId: 'DKSVS-2AhR4', duration: '5 hrs', topics: ['K-Means', 'Hierarchical Clustering', 'PCA', 't-SNE', 'Autoencoders', 'Anomaly Detection'] },
          { id: 'm5', title: 'Deep Learning & Neural Networks', description: 'Build deep neural networks with TensorFlow and Keras for complex tasks.', youtubeId: 'aircAruvnKk', duration: '10 hrs', topics: ['Perceptrons', 'Backpropagation', 'CNNs', 'RNNs', 'Transfer Learning', 'Regularization'] },
          { id: 'm6', title: 'Natural Language Processing', description: 'Work with text data — tokenization, sentiment analysis, transformers and LLMs.', youtubeId: '8rXD5-xhemo', duration: '7 hrs', topics: ['Text Preprocessing', 'TF-IDF', 'Word2Vec', 'BERT', 'Transformers', 'Sentiment Analysis'] },
          { id: 'm7', title: 'ML Project & Deployment', description: 'Build an end-to-end ML project and deploy it as a Flask/FastAPI web service.', youtubeId: 'xl0N7tHiwlw', duration: '5 hrs', topics: ['MLflow', 'Model Saving', 'Flask API', 'Streamlit Apps', 'Docker', 'Cloud Deployment'] },
        ],
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description: 'Protect systems and networks from digital attacks — ethical hacking, penetration testing, and security engineering.',
        icon: '🛡️',
        level: 'Advanced',
        weeks: 20,
        rating: 4.7,
        jobRoles: ['Security Analyst', 'Ethical Hacker', 'SOC Analyst', 'Penetration Tester'],
        avgSalary: '₹8–30 LPA',
        modules: [
          { id: 'm1', title: 'Networking Fundamentals', description: 'TCP/IP, subnetting, protocols and how the internet really works.', youtubeId: 'qiQR5rTSshw', duration: '5 hrs', topics: ['OSI Model', 'TCP/IP', 'IP Addressing', 'DNS', 'HTTP/S', 'Firewalls'] },
          { id: 'm2', title: 'Linux for Security', description: 'Master Linux — the operating system of choice for security professionals.', youtubeId: 'ZtqBQ68cfJc', duration: '6 hrs', topics: ['Terminal Commands', 'Permissions', 'Processes', 'Bash Scripting', 'File System', 'Networking Tools'] },
          { id: 'm3', title: 'Ethical Hacking Basics', description: 'Learn the hacker mindset — reconnaissance, scanning, exploitation methodology.', youtubeId: 'fNzpcB7ODxQ', duration: '7 hrs', topics: ['Reconnaissance', 'Scanning', 'Enumeration', 'Exploitation', 'Post-Exploitation', 'Reporting'] },
          { id: 'm4', title: 'Web Application Security', description: 'OWASP Top 10 vulnerabilities — SQL injection, XSS, CSRF and how to prevent them.', youtubeId: 'WtHnT73NaaQ', duration: '6 hrs', topics: ['SQL Injection', 'XSS', 'CSRF', 'Authentication Bypass', 'OWASP Top 10', 'Burp Suite'] },
          { id: 'm5', title: 'Cryptography', description: 'Encryption, hashing, PKI and how secure communications work.', youtubeId: 'AQDCe585Lnc', duration: '4 hrs', topics: ['Symmetric Encryption', 'Asymmetric Encryption', 'Hashing', 'Digital Signatures', 'PKI', 'TLS/SSL'] },
          { id: 'm6', title: 'Security Operations', description: 'SOC workflow, incident response, SIEM tools, and threat intelligence.', youtubeId: 'kDEX1HXybrU', duration: '5 hrs', topics: ['SIEM', 'Log Analysis', 'Incident Response', 'Threat Intelligence', 'Forensics', 'Blue Team Skills'] },
        ],
      },
      {
        id: 'data-science',
        title: 'Data Science & Analytics',
        description: 'Extract insights from massive datasets using statistics, visualization and machine learning to drive business decisions.',
        icon: '📊',
        level: 'Intermediate',
        weeks: 22,
        rating: 4.8,
        jobRoles: ['Data Analyst', 'Data Scientist', 'BI Developer', 'Analytics Engineer'],
        avgSalary: '₹6–25 LPA',
        modules: [
          { id: 'm1', title: 'Excel & Google Sheets for Data', description: 'Data analysis with spreadsheets — pivot tables, formulas, charts.', youtubeId: 'Vl0H-qTclOg', duration: '3 hrs', topics: ['Formulas', 'Pivot Tables', 'VLOOKUP', 'Charts', 'Data Validation', 'Macros'] },
          { id: 'm2', title: 'SQL for Data Analysis', description: 'Query databases to extract, filter, join and aggregate data.', youtubeId: 'HXV3zeQKqGY', duration: '4 hrs', topics: ['SELECT', 'WHERE', 'JOINs', 'GROUP BY', 'Window Functions', 'CTEs'] },
          { id: 'm3', title: 'Python Data Analysis', description: 'Pandas, NumPy and Matplotlib for data wrangling and visualization.', youtubeId: 'vmEHCJofslg', duration: '6 hrs', topics: ['DataFrames', 'Data Cleaning', 'Merging', 'Groupby', 'Matplotlib', 'Seaborn'] },
          { id: 'm4', title: 'Data Visualization', description: 'Tell stories with data — Tableau, Power BI and Plotly dashboards.', youtubeId: 'TPMlZxRRaBQ', duration: '5 hrs', topics: ['Chart Types', 'Tableau Basics', 'Power BI', 'Plotly', 'Dashboard Design', 'Storytelling'] },
          { id: 'm5', title: 'Statistics for Data Science', description: 'Descriptive stats, inferential statistics, A/B testing and regression.', youtubeId: 'xxpc-HPKN28', duration: '5 hrs', topics: ['Descriptive Stats', 'Distributions', 'Hypothesis Testing', 'Regression', 'Correlation', 'A/B Testing'] },
          { id: 'm6', title: 'Machine Learning for DS', description: 'Apply ML models to real datasets for prediction and classification.', youtubeId: 'w2OtwOs_rOE', duration: '7 hrs', topics: ['Regression Models', 'Classification', 'Model Evaluation', 'Feature Engineering', 'Cross-Validation', 'Deployment'] },
        ],
      },
      {
        id: 'cloud-devops',
        title: 'Cloud Computing & DevOps',
        description: 'Automate infrastructure at scale — AWS, Azure, Docker, Kubernetes and CI/CD pipelines.',
        icon: '☁️',
        level: 'Intermediate',
        weeks: 18,
        rating: 4.6,
        jobRoles: ['DevOps Engineer', 'Cloud Architect', 'SRE', 'Platform Engineer'],
        avgSalary: '₹10–35 LPA',
        modules: [
          { id: 'm1', title: 'Linux & Shell Scripting', description: 'Essential Linux skills and automation with bash scripting.', youtubeId: 'ZtqBQ68cfJc', duration: '4 hrs', topics: ['Linux Commands', 'Bash Scripting', 'Cron Jobs', 'File Permissions', 'Networking', 'Systemd'] },
          { id: 'm2', title: 'AWS Cloud Fundamentals', description: 'Core AWS services — EC2, S3, RDS, IAM, VPC and more.', youtubeId: 'k1RI5locZE4', duration: '8 hrs', topics: ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda', 'CloudWatch'] },
          { id: 'm3', title: 'Docker & Containerization', description: 'Package and run applications in containers with Docker.', youtubeId: 'pg19Z8LL06w', duration: '5 hrs', topics: ['Docker Basics', 'Dockerfile', 'Images', 'Containers', 'Docker Compose', 'Registries'] },
          { id: 'm4', title: 'Kubernetes', description: 'Orchestrate containers at scale with Kubernetes clusters.', youtubeId: 'X48VuDVv0do', duration: '7 hrs', topics: ['Pods', 'Services', 'Deployments', 'Ingress', 'ConfigMaps', 'Helm Charts'] },
          { id: 'm5', title: 'CI/CD Pipelines', description: 'Automate build, test and deploy workflows with GitHub Actions and Jenkins.', youtubeId: 'scEDHsr3APg', duration: '4 hrs', topics: ['GitHub Actions', 'Jenkins', 'Pipeline as Code', 'Testing Gates', 'Artifact Management', 'Deployment Strategies'] },
          { id: 'm6', title: 'Infrastructure as Code', description: 'Provision infrastructure automatically using Terraform and Ansible.', youtubeId: 'l5k1ai_GBDE', duration: '5 hrs', topics: ['Terraform Basics', 'HCL Language', 'State Management', 'Ansible Playbooks', 'Modules', 'Environments'] },
        ],
      },
      {
        id: 'mobile-dev',
        title: 'Mobile App Development',
        description: 'Build iOS and Android apps with React Native and Flutter for millions of users.',
        icon: '📱',
        level: 'Intermediate',
        weeks: 20,
        rating: 4.7,
        jobRoles: ['Mobile Developer', 'Android Developer', 'iOS Developer', 'React Native Engineer'],
        avgSalary: '₹7–22 LPA',
        modules: [
          { id: 'm1', title: 'JavaScript & React Refresher', description: 'Fast refresher on JS and React fundamentals before diving into mobile.', youtubeId: 'hdI2bqOjy3c', duration: '4 hrs', topics: ['ES6+', 'React Hooks', 'State Management', 'Component Patterns', 'Async JS', 'API Calls'] },
          { id: 'm2', title: 'React Native Fundamentals', description: 'Build cross-platform mobile apps — components, navigation, and styling.', youtubeId: '0-S5a0eXPoc', duration: '8 hrs', topics: ['Setup', 'Core Components', 'StyleSheet', 'Navigation', 'Lists', 'Gestures'] },
          { id: 'm3', title: 'Flutter & Dart', description: 'Google\'s UI framework for beautiful native apps on any platform.', youtubeId: 'VPvVD8t02U8', duration: '8 hrs', topics: ['Dart Basics', 'Widgets', 'State Management', 'Navigation', 'HTTP Requests', 'Firebase Integration'] },
          { id: 'm4', title: 'State Management (Redux/Zustand)', description: 'Manage complex app state across screens using proven patterns.', youtubeId: 'poQXNp9ItL4', duration: '4 hrs', topics: ['Redux Basics', 'Redux Toolkit', 'Zustand', 'Context API', 'Async Actions', 'Debugging'] },
          { id: 'm5', title: 'Firebase for Mobile', description: 'Backend services for mobile apps — auth, Firestore, storage and push notifications.', youtubeId: 'm_u6P5k0vP0', duration: '5 hrs', topics: ['Firebase Auth', 'Firestore', 'Realtime DB', 'Cloud Storage', 'Push Notifications', 'Analytics'] },
          { id: 'm6', title: 'App Store Deployment', description: 'Publish your app to Google Play Store and Apple App Store.', youtubeId: 'oBWBDaqpIDY', duration: '3 hrs', topics: ['App Signing', 'Play Store Console', 'App Store Connect', 'Release Builds', 'Version Management', 'ASO Basics'] },
        ],
      },
    ],
  },
  {
    id: 'btech-cse',
    title: 'B.Tech Computer Science Engineering',
    shortTitle: 'B.Tech CSE',
    description: 'The most versatile engineering branch covering algorithms, systems, AI and software engineering.',
    icon: '🖥️',
    duration: '4 Years',
    color: '#00ff88',
    domains: [
      {
        id: 'dsa',
        title: 'Data Structures & Algorithms',
        description: 'The foundation of problem solving — arrays, trees, graphs, dynamic programming and competitive programming.',
        icon: '🧩',
        level: 'Intermediate',
        weeks: 16,
        rating: 5.0,
        jobRoles: ['Software Engineer', 'SDE at FAANG', 'Competitive Programmer', 'Algorithm Engineer'],
        avgSalary: '₹15–50+ LPA',
        modules: [
          { id: 'm1', title: 'Arrays & Strings', description: 'Manipulation, two pointers, sliding window and pattern matching techniques.', youtubeId: 'B31LgI4Y4DQ', duration: '5 hrs', topics: ['Array Traversal', 'Two Pointers', 'Sliding Window', 'String Manipulation', 'Hashing', 'Prefix Sums'] },
          { id: 'm2', title: 'Linked Lists', description: 'Singly, doubly and circular linked lists with classic interview problems.', youtubeId: 'Hj_rA0dhr1', duration: '4 hrs', topics: ['Traversal', 'Reversal', 'Cycle Detection', 'Merge Sort on LL', 'Doubly LL', 'Circular LL'] },
          { id: 'm3', title: 'Stacks & Queues', description: 'Stack-based problems, monotonic stacks, queue implementations and priority queues.', youtubeId: 'wjI1WNcIntg', duration: '4 hrs', topics: ['Stack Operations', 'Queue Operations', 'Monotonic Stack', 'Min Stack', 'Deque', 'Priority Queue'] },
          { id: 'm4', title: 'Trees & Binary Search Trees', description: 'Tree traversals, BST operations, balanced trees and tree interview patterns.', youtubeId: 'fAAZixBzIAI', duration: '6 hrs', topics: ['DFS/BFS Traversals', 'BST Operations', 'Height & Diameter', 'LCA', 'AVL Trees', 'Segment Trees'] },
          { id: 'm5', title: 'Graphs', description: 'Graph representations, BFS, DFS, shortest paths and topological sort.', youtubeId: 'tWVWeAqZ0WU', duration: '7 hrs', topics: ['Adjacency List', 'BFS', 'DFS', "Dijkstra's", "Bellman-Ford", 'Topological Sort', 'Union-Find'] },
          { id: 'm6', title: 'Dynamic Programming', description: 'Break down complex problems with memoization, tabulation and classic DP patterns.', youtubeId: 'oBt53YbR9Kk', duration: '8 hrs', topics: ['Memoization', 'Tabulation', 'Knapsack', 'LCS', 'LIS', 'Matrix DP', 'DP on Strings'] },
        ],
      },
      {
        id: 'system-design',
        title: 'System Design',
        description: 'Design scalable distributed systems — databases, caching, load balancing and microservices at massive scale.',
        icon: '🏗️',
        level: 'Advanced',
        weeks: 12,
        rating: 4.9,
        jobRoles: ['Senior SDE', 'Solutions Architect', 'Technical Lead', 'Staff Engineer'],
        avgSalary: '₹25–80 LPA',
        modules: [
          { id: 'm1', title: 'System Design Fundamentals', description: 'Scalability, reliability, availability and the core trade-offs in distributed systems.', youtubeId: 'xpDnVSmNFX0', duration: '3 hrs', topics: ['Scalability', 'CAP Theorem', 'ACID vs BASE', 'SLA/SLO', 'Availability', 'Consistency'] },
          { id: 'm2', title: 'Databases at Scale', description: 'SQL vs NoSQL, sharding, replication and choosing the right database.', youtubeId: 'W2Z7fbCLSTw', duration: '4 hrs', topics: ['SQL vs NoSQL', 'Sharding', 'Replication', 'Indexing', 'Database Partitioning', 'Read Replicas'] },
          { id: 'm3', title: 'Caching Strategies', description: 'Redis, CDN caching, cache invalidation and cache-aside patterns.', youtubeId: 'joifNgoXXFk', duration: '3 hrs', topics: ['Cache Types', 'Redis', 'CDN', 'Cache Invalidation', 'Write-Through', 'LRU Eviction'] },
          { id: 'm4', title: 'Message Queues & Streaming', description: 'Kafka, RabbitMQ and event-driven architecture for async systems.', youtubeId: 'J6CVTwFYqKg', duration: '4 hrs', topics: ['Event-Driven Design', 'Kafka', 'RabbitMQ', 'Producer/Consumer', 'Topics & Partitions', 'exactly-once delivery'] },
          { id: 'm5', title: 'Designing Real Systems', description: 'Design WhatsApp, YouTube, Uber, Twitter — step by step system design walkthroughs.', youtubeId: '0163cssUxLA', duration: '5 hrs', topics: ['URL Shortener', 'Chat System', 'Video Streaming', 'Ride Sharing', 'News Feed', 'Rate Limiter'] },
        ],
      },
    ],
  },
  {
    id: 'btech-eee',
    title: 'B.Tech Electronics & Electrical Engineering',
    shortTitle: 'B.Tech EEE',
    description: 'Power systems, embedded electronics, circuit design and control systems for the future of energy.',
    icon: '⚡',
    duration: '4 Years',
    color: '#ffaa00',
    domains: [
      {
        id: 'embedded',
        title: 'Embedded Systems & IoT',
        description: 'Program microcontrollers, build IoT devices and create smart systems with Arduino, Raspberry Pi and ESP32.',
        icon: '🔌',
        level: 'Intermediate',
        weeks: 20,
        rating: 4.7,
        jobRoles: ['Embedded Engineer', 'IoT Developer', 'Firmware Engineer', 'Hardware Engineer'],
        avgSalary: '₹5–20 LPA',
        modules: [
          { id: 'm1', title: 'Electronics Fundamentals', description: 'Ohm\'s law, circuits, components and basic circuit analysis.', youtubeId: 'OZwpRRWANlY', duration: '4 hrs', topics: ["Ohm's Law", 'Resistors', 'Capacitors', 'Inductors', 'Circuit Analysis', 'Kirchhoff\'s Laws'] },
          { id: 'm2', title: 'Arduino Programming', description: 'Start with Arduino IDE, GPIO, sensors and actuators.', youtubeId: 'zJ-LqeX_fLU', duration: '5 hrs', topics: ['Arduino IDE', 'Digital I/O', 'Analog I/O', 'PWM', 'Serial Communication', 'Sensors'] },
          { id: 'm3', title: 'Raspberry Pi & Linux', description: 'Single board computing, Linux on embedded systems and GPIO control with Python.', youtubeId: 'NpEaa2P7qZI', duration: '5 hrs', topics: ['RPi Setup', 'Linux Basics', 'Python GPIO', 'I2C/SPI', 'Camera Module', 'Web Server'] },
          { id: 'm4', title: 'IoT Protocols', description: 'MQTT, HTTP, WiFi and wireless communication for connected devices.', youtubeId: 'WmcgZpVQ5Ec', duration: '4 hrs', topics: ['MQTT', 'HTTP REST', 'WiFi', 'Bluetooth LE', 'LoRa', 'ZigBee'] },
          { id: 'm5', title: 'IoT Cloud & Dashboards', description: 'Connect devices to AWS IoT, ThingSpeak and build real-time dashboards.', youtubeId: 'h0gWfVCSGQQ', duration: '4 hrs', topics: ['AWS IoT', 'ThingSpeak', 'Node-RED', 'Grafana', 'Data Logging', 'Alerts'] },
        ],
      },
      {
        id: 'vlsi',
        title: 'VLSI Design',
        description: 'Design integrated circuits and chips — the foundation of all modern electronics.',
        icon: '🔬',
        level: 'Advanced',
        weeks: 24,
        rating: 4.5,
        jobRoles: ['VLSI Design Engineer', 'Chip Designer', 'Verification Engineer', 'FPGA Engineer'],
        avgSalary: '₹8–35 LPA',
        modules: [
          { id: 'm1', title: 'Digital Logic Design', description: 'Boolean algebra, logic gates, combinational and sequential circuits.', youtubeId: 'M0mx8S05v60', duration: '5 hrs', topics: ['Logic Gates', 'Boolean Algebra', 'Karnaugh Maps', 'Flip-Flops', 'Counters', 'Registers'] },
          { id: 'm2', title: 'Verilog HDL', description: 'Hardware description language for digital circuit design and simulation.', youtubeId: 'PJGvZSlsLKs', duration: '6 hrs', topics: ['Module Declaration', 'Data Types', 'Structural Modeling', 'Behavioral Modeling', 'Testbenches', 'Simulation'] },
          { id: 'm3', title: 'FPGA Programming', description: 'Program FPGAs with Xilinx Vivado and deploy real hardware circuits.', youtubeId: 'lLg1AgA2Xoo', duration: '6 hrs', topics: ['FPGA Architecture', 'Vivado IDE', 'Constraint Files', 'Timing Analysis', 'IP Cores', 'Implementation'] },
          { id: 'm4', title: 'CMOS Circuit Design', description: 'Transistor-level design, static and dynamic CMOS logic families.', youtubeId: 'JqgZcV_1IU4', duration: '5 hrs', topics: ['MOSFET Basics', 'CMOS Inverter', 'Logic Gates in CMOS', 'Dynamic CMOS', 'Power Analysis', 'Timing'] },
        ],
      },
    ],
  },
  {
    id: 'btech-mech',
    title: 'B.Tech Mechanical Engineering',
    shortTitle: 'B.Tech Mech',
    description: 'Design machines, engines and mechanical systems — from CAD modelling to thermodynamics and robotics.',
    icon: '⚙️',
    duration: '4 Years',
    color: '#ff6b35',
    domains: [
      {
        id: 'cad-cam',
        title: 'CAD/CAM Design',
        description: 'Design mechanical parts and assemblies using SolidWorks, AutoCAD and CATIA.',
        icon: '📐',
        level: 'Beginner',
        weeks: 14,
        rating: 4.6,
        jobRoles: ['Design Engineer', 'CAD Designer', 'Product Engineer', 'Manufacturing Engineer'],
        avgSalary: '₹4–15 LPA',
        modules: [
          { id: 'm1', title: 'Engineering Drawing Basics', description: 'Orthographic projections, sectional views and GD&T fundamentals.', youtubeId: 'nv3neuhC4GI', duration: '3 hrs', topics: ['Orthographic Views', 'Sectional Views', 'Dimensions', 'Tolerances', 'GD&T', 'Assembly Drawings'] },
          { id: 'm2', title: 'AutoCAD 2D', description: 'Industry standard 2D drafting for mechanical and civil applications.', youtubeId: 'wGiWXoGK770', duration: '5 hrs', topics: ['Interface', 'Draw Commands', 'Modify Tools', 'Layers', 'Dimensions', 'Printing'] },
          { id: 'm3', title: 'SolidWorks 3D Modelling', description: 'Parametric 3D modelling — parts, assemblies and drawings.', youtubeId: 'qtgmGkEPXs8', duration: '7 hrs', topics: ['Sketching', 'Part Modelling', 'Assembly', 'Drawing Views', 'Configurations', 'Simulation'] },
          { id: 'm4', title: 'FEA & Simulation', description: 'Finite element analysis — stress, deformation and thermal analysis.', youtubeId: 'GHjopp47vvQ', duration: '5 hrs', topics: ['Mesh Generation', 'Boundary Conditions', 'Static Analysis', 'Thermal Analysis', 'Results Interpretation', 'ANSYS Intro'] },
          { id: 'm5', title: 'CNC & Manufacturing', description: 'CNC machine programming, G-code and manufacturing processes.', youtubeId: 'Cz7nQYZ-YU4', duration: '4 hrs', topics: ['G-Code', 'CNC Lathe', 'CNC Mill', 'CAM Software', 'Toolpaths', 'Post Processing'] },
        ],
      },
      {
        id: 'robotics',
        title: 'Robotics & Automation',
        description: 'Design and program robots — kinematics, ROS, computer vision and autonomous systems.',
        icon: '🤖',
        level: 'Advanced',
        weeks: 22,
        rating: 4.8,
        jobRoles: ['Robotics Engineer', 'Automation Engineer', 'ROS Developer', 'Control Systems Engineer'],
        avgSalary: '₹8–30 LPA',
        modules: [
          { id: 'm1', title: 'Robot Kinematics', description: 'Forward and inverse kinematics, Denavit-Hartenberg parameters.', youtubeId: 'BGTH9a87Gzk', duration: '4 hrs', topics: ['DOF', 'Forward Kinematics', 'Inverse Kinematics', 'DH Parameters', 'Jacobian', 'Workspace Analysis'] },
          { id: 'm2', title: 'ROS (Robot Operating System)', description: 'The framework powering modern robotics research and industry.', youtubeId: 'OWeLUSzxMsw', duration: '7 hrs', topics: ['Nodes', 'Topics', 'Services', 'URDF', 'RViz', 'Gazebo Simulation'] },
          { id: 'm3', title: 'Computer Vision for Robots', description: 'Enable robots to see — object detection, pose estimation with OpenCV.', youtubeId: 'oXlwWbU8l2o', duration: '6 hrs', topics: ['OpenCV Basics', 'Image Processing', 'Object Detection', 'YOLO', 'Depth Cameras', 'Pose Estimation'] },
          { id: 'm4', title: 'PID Control Systems', description: 'Design control loops for motors, manipulators and autonomous vehicles.', youtubeId: 'wkfEZmsQqiA', duration: '4 hrs', topics: ['PID Theory', 'Tuning Methods', 'Ziegler-Nichols', 'Simulation in MATLAB', 'Implementation', 'Advanced Control'] },
        ],
      },
    ],
  },
  {
    id: 'btech-ai',
    title: 'B.Tech Artificial Intelligence & ML',
    shortTitle: 'B.Tech AI/ML',
    description: 'The newest and hottest engineering branch — build the AI systems that will shape the next decade.',
    icon: '🧠',
    duration: '4 Years',
    color: '#9b59b6',
    domains: [
      {
        id: 'generative-ai',
        title: 'Generative AI & LLMs',
        description: 'Master transformer architectures, LLM fine-tuning, prompt engineering and building AI applications with GPT and Gemini APIs.',
        icon: '✨',
        level: 'Advanced',
        weeks: 18,
        rating: 5.0,
        jobRoles: ['Generative AI Engineer', 'Prompt Engineer', 'ML Engineer', 'AI Product Builder'],
        avgSalary: '₹20–60+ LPA',
        modules: [
          { id: 'm1', title: 'Transformer Architecture', description: 'How attention mechanisms and transformers actually work under the hood.', youtubeId: 'aircAruvnKk', duration: '4 hrs', topics: ['Self-Attention', 'Multi-Head Attention', 'Positional Encoding', 'Encoder/Decoder', 'BERT', 'GPT Architecture'] },
          { id: 'm2', title: 'Prompt Engineering', description: 'Get the most out of LLMs — zero-shot, few-shot, chain-of-thought and advanced prompting.', youtubeId: 'T_P_yoHUGnA', duration: '3 hrs', topics: ['Zero-Shot', 'Few-Shot', 'Chain-of-Thought', 'RAG', 'System Prompts', 'Evaluation'] },
          { id: 'm3', title: 'LangChain & AI Apps', description: 'Build production AI applications with LangChain, vector databases and agents.', youtubeId: 'lG7Uxts9SXs', duration: '6 hrs', topics: ['LangChain Chains', 'Memory', 'Agents', 'Tools', 'Vector Stores', 'RAG Pipeline'] },
          { id: 'm4', title: 'Fine-Tuning LLMs', description: 'Adapt pre-trained models to your domain using LoRA, PEFT and Hugging Face Transformers.', youtubeId: 'eC6Hd1hFvos', duration: '5 hrs', topics: ['Transfer Learning', 'LoRA', 'PEFT', 'Instruction Tuning', 'Dataset Preparation', 'Evaluation Metrics'] },
          { id: 'm5', title: 'Multimodal AI', description: 'Work with text + images — CLIP, DALL-E, Stable Diffusion and vision-language models.', youtubeId: 'yCBEumeXY4A', duration: '4 hrs', topics: ['CLIP', 'Stable Diffusion', 'Vision Transformers', 'Image-Text Retrieval', 'GPT-4 Vision', 'Gemini Pro Vision'] },
        ],
      },
      {
        id: 'computer-vision',
        title: 'Computer Vision',
        description: 'Train machines to understand images and video — object detection, segmentation and real-time vision.',
        icon: '👁️',
        level: 'Advanced',
        weeks: 20,
        rating: 4.8,
        jobRoles: ['Computer Vision Engineer', 'ML Engineer', 'Self-Driving Engineer', 'Medical AI Engineer'],
        avgSalary: '₹15–45 LPA',
        modules: [
          { id: 'm1', title: 'OpenCV Fundamentals', description: 'Image processing — filters, transformations, edge detection and feature matching.', youtubeId: 'oXlwWbU8l2o', duration: '5 hrs', topics: ['Image Basics', 'Filters', 'Edge Detection', 'Contours', 'Color Spaces', 'Morphological Operations'] },
          { id: 'm2', title: 'CNNs & Deep Learning for Vision', description: 'Convolutional neural networks from scratch — AlexNet, VGG, ResNet architectures.', youtubeId: 'ArPaAX_PhIs', duration: '8 hrs', topics: ['Convolution', 'Pooling', 'Batch Normalization', 'ResNet', 'EfficientNet', 'Transfer Learning'] },
          { id: 'm3', title: 'Object Detection', description: 'YOLO, SSD, Faster R-CNN for real-time object detection in images and video.', youtubeId: 'ag3DLKsl2vk', duration: '6 hrs', topics: ['YOLO v8', 'Faster R-CNN', 'Anchor Boxes', 'NMS', 'mAP Metric', 'Custom Training'] },
          { id: 'm4', title: 'Image Segmentation', description: 'Semantic and instance segmentation for pixel-level understanding.', youtubeId: 'nDPWywWRIRo', duration: '5 hrs', topics: ['Semantic Segmentation', 'Instance Segmentation', 'U-Net', 'Mask R-CNN', 'SAM (Segment Anything)', 'Evaluation'] },
        ],
      },
    ],
  },
  {
    id: 'bca',
    title: 'BCA / MCA',
    shortTitle: 'BCA / MCA',
    description: 'Bachelor and Master of Computer Applications — a focused computing degree for software development careers.',
    icon: '🎓',
    duration: '3 / 2 Years',
    color: '#3498db',
    domains: [
      {
        id: 'web-development',
        title: 'Web Development',
        description: 'Build modern websites and web applications — perfect starting point for aspiring developers.',
        icon: '🌐',
        level: 'Beginner',
        weeks: 20,
        rating: 4.8,
        jobRoles: ['Web Developer', 'Frontend Developer', 'Junior Software Engineer', 'Freelancer'],
        avgSalary: '₹4–15 LPA',
        modules: [
          { id: 'm1', title: 'HTML5 Fundamentals', description: 'Learn semantic HTML, forms, accessibility and document structure.', youtubeId: 'pQN-pnXPaVg', duration: '4.5 hrs', topics: ['HTML Tags', 'Forms', 'Tables', 'Semantic Elements', 'Accessibility', 'SEO Basics'] },
          { id: 'm2', title: 'CSS3 & Responsive Design', description: 'Style web pages with CSS3, Flexbox, Grid and media queries.', youtubeId: 'OXGznpKZ_sA', duration: '6 hrs', topics: ['Selectors', 'Box Model', 'Flexbox', 'Grid', 'Media Queries', 'Animations'] },
          { id: 'm3', title: 'JavaScript Essentials', description: 'Core JavaScript for interactive web pages.', youtubeId: 'hdI2bqOjy3c', duration: '8 hrs', topics: ['Variables', 'Functions', 'DOM', 'Events', 'Fetch API', 'Async/Await'] },
          { id: 'm4', title: 'Bootstrap Framework', description: 'Rapid UI development with Bootstrap components and grid.', youtubeId: '-qfEOE4vtxE', duration: '3 hrs', topics: ['Grid System', 'Components', 'Utilities', 'Navbar', 'Cards', 'Modals'] },
          { id: 'm5', title: 'PHP & MySQL', description: 'Server-side web development with PHP and MySQL databases.', youtubeId: 'OK_JCtrrv-c', duration: '6 hrs', topics: ['PHP Basics', 'Forms', 'MySQL Queries', 'CRUD', 'Sessions', 'Security'] },
          { id: 'm6', title: 'React Introduction', description: 'Modern frontend with React — components, hooks and state.', youtubeId: 'bMknfKXIFA8', duration: '7 hrs', topics: ['JSX', 'Components', 'Props', 'State', 'useEffect', 'API Calls'] },
        ],
      },
    ],
  },
];

export const getDegreeById = (id: string): Degree | undefined =>
  degrees.find(d => d.id === id);

export const getDomainById = (degreeId: string, domainId: string): Domain | undefined =>
  getDegreeById(degreeId)?.domains.find(d => d.id === domainId);
