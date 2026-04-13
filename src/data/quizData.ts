export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  domainId: string;
  degreeId: string;
  title: string;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  // ─────────────────────────────────────────────
  // B.TECH IT — FULL STACK (existing)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-it',
    domainId: 'fullstack',
    title: 'Full Stack Development Quiz',
    questions: [
      { id: 'q1', question: 'Which HTML tag is used to define the main content of a web page?', options: ['<body>', '<main>', '<content>', '<section>'], correctIndex: 1, explanation: '<main> represents the dominant content of the <body> and is the correct semantic HTML5 element for main content.' },
      { id: 'q2', question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style System', 'Creative Style Syntax'], correctIndex: 0, explanation: 'CSS stands for Cascading Style Sheets. It is used to style and layout web pages.' },
      { id: 'q3', question: 'Which JavaScript method is used to fetch data from an API?', options: ['getData()', 'fetchData()', 'fetch()', 'getAPI()'], correctIndex: 2, explanation: 'fetch() is the built-in browser API for making HTTP requests. It returns a Promise.' },
      { id: 'q4', question: 'What is the purpose of React hooks like useState?', options: ['To style components', 'To manage state in functional components', 'To fetch data automatically', 'To route between pages'], correctIndex: 1, explanation: 'useState is a React hook that lets functional components manage local state without writing a class.' },
      { id: 'q5', question: 'What does REST stand for in REST API?', options: ['Remote Execution Standard Technology', 'Representational State Transfer', 'Reliable Server Transfer', 'Real-time Event Streaming Technology'], correctIndex: 1, explanation: 'REST (Representational State Transfer) is an architectural style for designing networked applications.' },
      { id: 'q6', question: 'Which command is used to initialize a new Node.js project?', options: ['node create', 'npm start', 'npm init', 'node init'], correctIndex: 2, explanation: 'npm init initializes a new Node.js project and creates a package.json file.' },
      { id: 'q7', question: 'In SQL, which clause is used to filter records?', options: ['FILTER', 'HAVING', 'WHERE', 'SEARCH'], correctIndex: 2, explanation: 'The WHERE clause is used to filter records in SQL SELECT, UPDATE, and DELETE statements.' },
      { id: 'q8', question: 'What is the default port for a React development server?', options: ['8080', '3000', '5000', '4200'], correctIndex: 1, explanation: 'React development server (Create React App / Vite) runs on port 3000 by default.' },
      { id: 'q9', question: 'What is MongoDB?', options: ['A relational database', 'A NoSQL document database', 'A cloud service', 'A JavaScript framework'], correctIndex: 1, explanation: 'MongoDB is a NoSQL document database that stores data in flexible JSON-like documents called BSON.' },
      { id: 'q10', question: 'In Git, which command creates a new branch?', options: ['git new branch', 'git create branch', 'git branch <name>', 'git make <name>'], correctIndex: 2, explanation: 'git branch <name> creates a new branch. To switch to it, use git checkout <name> or git switch <name>.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH IT — AI & ML (existing)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-it',
    domainId: 'ai-ml',
    title: 'AI & Machine Learning Quiz',
    questions: [
      { id: 'q1', question: 'Which Python library is most commonly used for machine learning?', options: ['NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib'], correctIndex: 2, explanation: 'Scikit-learn is the most popular Python library for traditional machine learning algorithms, preprocessing, and model evaluation.' },
      { id: 'q2', question: 'What is supervised learning?', options: ['Learning without any data', 'Learning from labeled training data', 'Learning from unlabeled data', 'Learning by trial and error only'], correctIndex: 1, explanation: 'In supervised learning, the algorithm learns from labeled training data, mapping inputs to known outputs.' },
      { id: 'q3', question: 'Which algorithm is used for classification problems?', options: ['Linear Regression', 'K-Means Clustering', 'Logistic Regression', 'PCA'], correctIndex: 2, explanation: 'Logistic Regression is used for binary classification problems, predicting categorical outcomes.' },
      { id: 'q4', question: 'What is a neural network?', options: ['A type of computer processor', 'A set of algorithms modeled after the human brain', 'A database system', 'A programming language'], correctIndex: 1, explanation: 'Neural networks are computing systems inspired by biological neural networks that learn from data through connected layers.' },
      { id: 'q5', question: 'What does CNN stand for in deep learning?', options: ['Computer Neural Network', 'Convolutional Neural Network', 'Cascaded Neural Node', 'Controlled Network Node'], correctIndex: 1, explanation: 'CNN (Convolutional Neural Network) is a deep learning architecture especially powerful for image recognition tasks.' },
      { id: 'q6', question: 'What is overfitting in machine learning?', options: ['When a model is too simple', 'When a model performs perfectly on all data', 'When a model learns noise in training data and fails on new data', 'When training takes too long'], correctIndex: 2, explanation: 'Overfitting occurs when a model learns the training data too well, including noise, causing poor performance on new, unseen data.' },
      { id: 'q7', question: 'What is the purpose of a training-test split?', options: ['To speed up computation', 'To evaluate model performance on unseen data', 'To reduce the dataset size', 'To improve accuracy on training data'], correctIndex: 1, explanation: 'The test set is held out during training so we can evaluate how well the model generalizes to new, unseen data.' },
      { id: 'q8', question: 'What is NLP?', options: ['Numeric Learning Protocol', 'Natural Language Processing', 'Neural Linear Programming', 'New Language Platform'], correctIndex: 1, explanation: 'NLP (Natural Language Processing) is a field of AI focused on enabling computers to understand, interpret, and generate human language.' },
      { id: 'q9', question: 'Which framework is developed by Google for deep learning?', options: ['PyTorch', 'Caffe', 'TensorFlow', 'Theano'], correctIndex: 2, explanation: 'TensorFlow is an open-source deep learning framework developed by Google Brain, widely used in production.' },
      { id: 'q10', question: 'What is a confusion matrix used for?', options: ['Debugging neural networks', 'Evaluating classification model performance', 'Visualizing data distribution', 'Reducing model complexity'], correctIndex: 1, explanation: 'A confusion matrix shows the true positives, false positives, true negatives, and false negatives of a classifier.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH IT — CYBERSECURITY (existing)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-it',
    domainId: 'cybersecurity',
    title: 'Cybersecurity Quiz',
    questions: [
      { id: 'q1', question: 'What does SQL Injection attack exploit?', options: ['Weak passwords', 'Poor input validation in database queries', 'Outdated software', 'Network vulnerabilities'], correctIndex: 1, explanation: 'SQL Injection exploits poor input validation, allowing attackers to manipulate database queries by injecting SQL code.' },
      { id: 'q2', question: 'What is a firewall?', options: ['An antivirus software', 'A network security system that controls traffic', 'A type of encryption', 'A VPN service'], correctIndex: 1, explanation: 'A firewall monitors and controls incoming and outgoing network traffic based on security rules.' },
      { id: 'q3', question: 'What does HTTPS stand for?', options: ['Hyper Text Transfer Protocol Secure', 'High Transfer Protocol System', 'Hyper Text Protocol Secured', 'Hyper Technical Protocol Standard'], correctIndex: 0, explanation: 'HTTPS (Hyper Text Transfer Protocol Secure) encrypts data in transit using TLS/SSL.' },
      { id: 'q4', question: 'What is phishing?', options: ['A type of virus', 'A network scanning technique', 'A social engineering attack via deceptive messages', 'A firewall bypass method'], correctIndex: 2, explanation: 'Phishing is a social engineering attack where attackers trick users into revealing sensitive information via fake emails or websites.' },
      { id: 'q5', question: 'What is the OWASP Top 10?', options: ['Top 10 programming languages', 'A list of the 10 most critical web application security risks', 'Top 10 hacking tools', 'Top 10 security certifications'], correctIndex: 1, explanation: 'OWASP Top 10 is a standard awareness document listing the most critical security risks to web applications.' },
      { id: 'q6', question: 'What does XSS stand for?', options: ['X-Site Scripting', 'Cross-Site Scripting', 'Extended Security Script', 'Cross-System Software'], correctIndex: 1, explanation: 'XSS (Cross-Site Scripting) is a vulnerability where attackers inject malicious scripts into web pages viewed by other users.' },
      { id: 'q7', question: 'What is a VPN used for?', options: ['Faster internet speed', 'Creating an encrypted tunnel for secure network communication', 'Blocking ads', 'Monitoring network traffic'], correctIndex: 1, explanation: 'A VPN (Virtual Private Network) creates an encrypted tunnel between your device and a server, protecting your data and privacy.' },
      { id: 'q8', question: 'What is encryption?', options: ['Deleting sensitive data', 'Converting data into an unreadable format to protect it', 'Compressing files', 'Backing up data'], correctIndex: 1, explanation: 'Encryption converts plain text data into ciphertext using an algorithm and key, making it unreadable without decryption.' },
      { id: 'q9', question: 'What type of attack involves overwhelming a server with traffic?', options: ['Man-in-the-Middle', 'DDoS (Distributed Denial of Service)', 'Phishing', 'SQL Injection'], correctIndex: 1, explanation: 'A DDoS attack floods a server with traffic from multiple sources, making it unavailable to legitimate users.' },
      { id: 'q10', question: 'What is two-factor authentication (2FA)?', options: ['Logging in twice', 'Using two passwords', 'Verifying identity with two different factors for security', 'Two-step encryption'], correctIndex: 2, explanation: '2FA adds an extra security layer by requiring both something you know (password) and something you have (phone OTP).' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH IT — DATA SCIENCE (existing)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-it',
    domainId: 'data-science',
    title: 'Data Science & Analytics Quiz',
    questions: [
      { id: 'q1', question: 'What is Pandas in Python?', options: ['A machine learning library', 'A data manipulation and analysis library', 'A visualization tool', 'A database connector'], correctIndex: 1, explanation: 'Pandas is a powerful Python library for data manipulation and analysis, offering DataFrame and Series structures.' },
      { id: 'q2', question: 'What does SQL GROUP BY do?', options: ['Sorts records', 'Groups rows with the same values for aggregation', 'Joins two tables', 'Filters records'], correctIndex: 1, explanation: 'GROUP BY groups rows with identical values in specified columns so aggregate functions (COUNT, SUM, AVG) can be applied.' },
      { id: 'q3', question: 'What is a DataFrame in context of data science?', options: ['A HTML table', 'A 2D labeled data structure with columns of different types', 'A machine learning model', 'A database'], correctIndex: 1, explanation: 'A DataFrame is a 2-dimensional labeled data structure in Pandas, like a spreadsheet or SQL table.' },
      { id: 'q4', question: 'What type of chart is best for showing distribution of data?', options: ['Line chart', 'Pie chart', 'Histogram', 'Bar chart'], correctIndex: 2, explanation: 'Histograms show the distribution and frequency of data values, making them ideal for understanding data spread.' },
      { id: 'q5', question: 'What is the mean of [2, 4, 6, 8, 10]?', options: ['5', '6', '7', '8'], correctIndex: 1, explanation: 'Mean = Sum / Count = (2+4+6+8+10) / 5 = 30/5 = 6' },
      { id: 'q6', question: 'What is feature engineering?', options: ['Building hardware circuits', 'Creating new input variables from existing data to improve models', 'Writing software features', 'Testing model features'], correctIndex: 1, explanation: 'Feature engineering creates new meaningful features from raw data to improve machine learning model performance.' },
      { id: 'q7', question: 'What does EDA stand for?', options: ['Extended Data Architecture', 'Exploratory Data Analysis', 'Engineering Data Application', 'External Data Aggregation'], correctIndex: 1, explanation: 'EDA (Exploratory Data Analysis) is the process of analyzing datasets to summarize their characteristics using statistics and visualizations.' },
      { id: 'q8', question: 'Which tool is used for creating business intelligence dashboards?', options: ['NumPy', 'Matplotlib', 'Tableau', 'Scikit-learn'], correctIndex: 2, explanation: 'Tableau is a leading BI tool for creating interactive data visualizations and business intelligence dashboards.' },
      { id: 'q9', question: 'What is correlation?', options: ['Causation between variables', 'A measure of the strength of relationship between two variables', 'Data cleaning technique', 'A type of regression'], correctIndex: 1, explanation: 'Correlation measures the strength and direction of the relationship between two variables, ranging from -1 to +1.' },
      { id: 'q10', question: 'What is missing data imputation?', options: ['Deleting rows with missing values', 'Filling missing values with estimated ones', 'Ignoring missing values', 'Highlighting missing rows'], correctIndex: 1, explanation: 'Imputation fills missing data with estimated values (mean, median, mode, or model-predicted values) to preserve dataset integrity.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH CSE — DSA (existing)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-cse',
    domainId: 'dsa',
    title: 'Data Structures & Algorithms Quiz',
    questions: [
      { id: 'q1', question: 'What is the time complexity of Binary Search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], correctIndex: 2, explanation: 'Binary Search halves the search space each step, resulting in O(log n) time complexity on a sorted array.' },
      { id: 'q2', question: 'Which data structure uses LIFO order?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correctIndex: 1, explanation: 'A Stack follows Last-In First-Out (LIFO) order — the last element added is the first to be removed.' },
      { id: 'q3', question: 'What is the time complexity of sorting with QuickSort (average case)?', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'], correctIndex: 2, explanation: 'QuickSort has an average time complexity of O(n log n) due to partitioning, though worst case is O(n²).' },
      { id: 'q4', question: 'What traversal visits Left → Root → Right in a binary tree?', options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'], correctIndex: 2, explanation: 'In-order traversal visits Left subtree → Root → Right subtree, which gives sorted output for a BST.' },
      { id: 'q5', question: 'Which algorithm finds the shortest path in a weighted graph?', options: ['BFS', 'DFS', "Dijkstra's Algorithm", 'Binary Search'], correctIndex: 2, explanation: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph." },
      { id: 'q6', question: 'What is a Hash Table?', options: ['A sorted array', 'A data structure that maps keys to values for O(1) lookup', 'A type of tree', 'A linked list'], correctIndex: 1, explanation: 'A Hash Table uses a hash function to map keys to indices, enabling average O(1) time for insertions and lookups.' },
      { id: 'q7', question: 'What is Dynamic Programming?', options: ['Programming with dynamic languages', 'Breaking problems into overlapping subproblems and storing results', 'Real-time programming', 'Object-oriented programming'], correctIndex: 1, explanation: 'DP breaks complex problems into simpler overlapping subproblems and stores their solutions (memoization/tabulation) to avoid redundant computation.' },
      { id: 'q8', question: 'What data structure is used for BFS traversal?', options: ['Stack', 'Queue', 'Priority Queue', 'Deque'], correctIndex: 1, explanation: 'BFS uses a Queue (FIFO) to visit nodes level by level, ensuring shortest path in unweighted graphs.' },
      { id: 'q9', question: 'What is the space complexity of storing an n×n matrix?', options: ['O(n)', 'O(n²)', 'O(1)', 'O(n log n)'], correctIndex: 1, explanation: 'An n×n matrix has n*n = n² cells, so space complexity is O(n²).' },
      { id: 'q10', question: 'Which sorting algorithm has O(n²) worst case but is adaptive?', options: ['Merge Sort', 'Quick Sort', 'Insertion Sort', 'Heap Sort'], correctIndex: 2, explanation: 'Insertion Sort is O(n²) worst case but O(n) on nearly sorted data. It\'s adaptive, meaning it speeds up on partially sorted lists.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH IT — CLOUD DEVOPS (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-it',
    domainId: 'cloud-devops',
    title: 'Cloud Computing & DevOps Quiz',
    questions: [
      { id: 'q1', question: 'What does IaaS stand for in cloud computing?', options: ['Internet as a Service', 'Infrastructure as a Service', 'Integration as a Service', 'Input as a Service'], correctIndex: 1, explanation: 'IaaS (Infrastructure as a Service) provides virtualized computing resources like VMs, storage, and networking over the internet.' },
      { id: 'q2', question: 'What is Docker used for?', options: ['Writing Python code', 'Containerizing applications for consistent deployment', 'Managing SQL databases', 'Version control'], correctIndex: 1, explanation: 'Docker packages applications and their dependencies into containers that run consistently across any environment.' },
      { id: 'q3', question: 'What does CI/CD stand for?', options: ['Code Integration / Code Deployment', 'Continuous Integration / Continuous Delivery', 'Cloud Infrastructure / Cloud Delivery', 'Central Integration / Central Deployment'], correctIndex: 1, explanation: 'CI/CD (Continuous Integration / Continuous Delivery) automates the process of building, testing, and deploying code.' },
      { id: 'q4', question: 'Which AWS service is used for serverless computing?', options: ['EC2', 'S3', 'Lambda', 'RDS'], correctIndex: 2, explanation: 'AWS Lambda runs your code in response to events without provisioning or managing servers.' },
      { id: 'q5', question: 'What is Kubernetes used for?', options: ['Writing Java code', 'Container orchestration at scale', 'DNS management', 'Database backups'], correctIndex: 1, explanation: 'Kubernetes automates deploying, scaling, and managing containerized applications across clusters of machines.' },
      { id: 'q6', question: 'What is Infrastructure as Code (IaC)?', options: ['Writing documentation for hardware', 'Managing infrastructure through machine-readable configuration files', 'Building network cables', 'Programming on physical servers'], correctIndex: 1, explanation: 'IaC manages and provisions infrastructure through code (e.g., Terraform, Ansible) rather than manual processes.' },
      { id: 'q7', question: 'Which file format does Docker use for its build instructions?', options: ['Makefile', 'Dockerfile', 'docker.yml', 'compose.json'], correctIndex: 1, explanation: 'A Dockerfile contains a set of instructions Docker uses to build a container image automatically.' },
      { id: 'q8', question: 'What is the purpose of AWS S3?', options: ['Running virtual machines', 'Scalable object storage in the cloud', 'Sending emails', 'Managing DNS records'], correctIndex: 1, explanation: 'Amazon S3 (Simple Storage Service) provides scalable object storage for files, backups, static websites, and more.' },
      { id: 'q9', question: 'What does a load balancer do?', options: ['Manages database queries', 'Distributes incoming traffic across multiple servers', 'Compresses files', 'Encrypts data'], correctIndex: 1, explanation: 'A load balancer distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed.' },
      { id: 'q10', question: 'What is the main purpose of Terraform?', options: ['Writing frontend code', 'Provisioning cloud infrastructure using declarative configuration', 'Running unit tests', 'Monitoring application logs'], correctIndex: 1, explanation: 'Terraform is an IaC tool that lets you define cloud infrastructure in HCL (HashiCorp Configuration Language) and provision it automatically.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH IT — MOBILE DEV (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-it',
    domainId: 'mobile-dev',
    title: 'Mobile App Development Quiz',
    questions: [
      { id: 'q1', question: 'What is React Native?', options: ['A CSS framework', 'A framework for building native mobile apps using JavaScript and React', 'A Python library', 'A database tool'], correctIndex: 1, explanation: 'React Native lets you build iOS and Android apps using JavaScript and React, sharing code across platforms.' },
      { id: 'q2', question: 'What is the difference between React Native and React.js?', options: ['They are exactly the same', 'React Native targets mobile apps; React.js targets web browsers', 'React Native is for backend; React.js is for frontend', 'React Native is slower than React.js'], correctIndex: 1, explanation: 'React.js renders to the browser DOM while React Native renders to native mobile UI components on iOS/Android.' },
      { id: 'q3', question: 'What component in React Native is equivalent to a <div> in HTML?', options: ['<Container>', '<Box>', '<View>', '<Frame>'], correctIndex: 2, explanation: '<View> is the fundamental building block in React Native, similar to <div> in HTML for layout and styling.' },
      { id: 'q4', question: 'What is Flutter developed by?', options: ['Facebook', 'Microsoft', 'Google', 'Apple'], correctIndex: 2, explanation: 'Flutter is Google\'s open-source UI framework for building natively compiled applications from a single codebase.' },
      { id: 'q5', question: 'What programming language does Flutter use?', options: ['JavaScript', 'Kotlin', 'Swift', 'Dart'], correctIndex: 3, explanation: 'Flutter uses Dart, a language developed by Google, which is optimized for building fast client-side apps.' },
      { id: 'q6', question: 'What is the purpose of the useEffect hook in a React Native app?', options: ['To style components', 'To handle side effects like API calls and subscriptions', 'To create new routes', 'To add animations'], correctIndex: 1, explanation: 'useEffect lets you perform side effects in function components — fetching data, subscriptions, DOM updates — after render.' },
      { id: 'q7', question: 'What does APK stand for?', options: ['Apple Package Kit', 'Android Package Kit', 'Application Programming Kit', 'Advanced Package Key'], correctIndex: 1, explanation: 'APK (Android Package Kit) is the file format for distributing and installing Android apps.' },
      { id: 'q8', question: 'Which navigation library is most popular in React Native?', options: ['Vue Router', 'React Router DOM', 'React Navigation', 'Expo Router'], correctIndex: 2, explanation: 'React Navigation is the most widely used navigation library for React Native apps, providing stack, tab, and drawer navigators.' },
      { id: 'q9', question: 'What is Expo in React Native development?', options: ['A testing framework', 'A platform/toolchain that simplifies React Native development and deployment', 'A CSS library', 'A state management tool'], correctIndex: 1, explanation: 'Expo is a framework and platform that wraps React Native, providing tools, libraries, and OTA updates without native code.' },
      { id: 'q10', question: 'What is AsyncStorage used for in React Native?', options: ['Async API calls', 'Persisting small amounts of data locally on the device', 'Async rendering', 'Background processing'], correctIndex: 1, explanation: 'AsyncStorage is an unencrypted, asynchronous key-value storage system in React Native for persisting data locally on the device.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH CSE — SYSTEM DESIGN (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-cse',
    domainId: 'system-design',
    title: 'System Design Quiz',
    questions: [
      { id: 'q1', question: 'What does the CAP theorem state?', options: ['A system can have Consistency, Availability, and Partition tolerance simultaneously', 'A distributed system can guarantee at most 2 of: Consistency, Availability, Partition tolerance', 'CAP is a hardware specification', 'CAP stands for Cache, API, and Persistence'], correctIndex: 1, explanation: 'CAP theorem states a distributed system can only guarantee 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network partitions).' },
      { id: 'q2', question: 'What is horizontal scaling?', options: ['Upgrading a server with more RAM/CPU', 'Adding more servers to distribute load', 'Increasing database storage', 'Improving network bandwidth'], correctIndex: 1, explanation: 'Horizontal scaling (scale out) means adding more machines to your pool of resources, distributing load across them.' },
      { id: 'q3', question: 'What is the purpose of a CDN (Content Delivery Network)?', options: ['To compress database queries', 'To serve static content from servers geographically close to users', 'To manage user authentication', 'To handle background jobs'], correctIndex: 1, explanation: 'A CDN caches static content (images, JS, CSS) at edge locations worldwide, reducing latency by serving users from nearby servers.' },
      { id: 'q4', question: 'What is database sharding?', options: ['Encrypting a database', 'Partitioning data across multiple database instances', 'Deleting old records', 'Creating database backups'], correctIndex: 1, explanation: 'Sharding splits a large database into smaller, faster, more manageable pieces (shards) stored across multiple servers.' },
      { id: 'q5', question: 'What is Redis most commonly used for?', options: ['Permanent data storage', 'In-memory caching and fast key-value storage', 'Video streaming', 'Image processing'], correctIndex: 1, explanation: 'Redis is an in-memory data store used for caching, session management, real-time leaderboards, and pub/sub messaging.' },
      { id: 'q6', question: 'What is the primary purpose of a message queue like Kafka?', options: ['Database management', 'Decoupling services and enabling async communication via event streaming', 'Frontend rendering', 'File compression'], correctIndex: 1, explanation: 'Message queues like Apache Kafka decouple producers and consumers, enabling async processing, event streaming, and fault tolerance.' },
      { id: 'q7', question: 'What is a microservices architecture?', options: ['A single large application', 'Breaking an application into small, independently deployable services', 'A type of database', 'A frontend framework'], correctIndex: 1, explanation: 'Microservices architecture structures an app as a collection of small, autonomous services, each responsible for a specific business function.' },
      { id: 'q8', question: 'What does "stateless" mean in the context of REST APIs?', options: ['The server has no storage', 'Each request contains all information needed; server stores no client state between requests', 'The API has no response', 'The server is always offline'], correctIndex: 1, explanation: 'Stateless means each HTTP request is self-contained — the server doesn\'t store session state between requests, improving scalability.' },
      { id: 'q9', question: 'What is a reverse proxy?', options: ['A server that forwards client requests to backend servers on their behalf', 'A database proxy', 'A client-side cache', 'A type of VPN'], correctIndex: 0, explanation: 'A reverse proxy (e.g., Nginx) sits in front of web servers, forwarding requests to them and returning responses — enabling load balancing, SSL termination, and caching.' },
      { id: 'q10', question: 'What is eventual consistency?', options: ['Data is always immediately consistent', 'Given no new updates, all replicas will eventually converge to the same value', 'Data is never consistent', 'A type of database transaction'], correctIndex: 1, explanation: 'Eventual consistency guarantees that, if no new updates are made, all replicas will eventually return the same value — used in highly available distributed systems.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH EEE — EMBEDDED SYSTEMS & IoT (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-eee',
    domainId: 'embedded',
    title: 'Embedded Systems & IoT Quiz',
    questions: [
      { id: 'q1', question: 'What is a microcontroller?', options: ['A large server computer', 'A compact integrated circuit containing a processor, memory, and I/O peripherals', 'A type of transistor', 'A network switch'], correctIndex: 1, explanation: 'A microcontroller is a single chip containing a CPU, memory (RAM/ROM), and programmable I/O — used in embedded systems like Arduino.' },
      { id: 'q2', question: 'What does GPIO stand for?', options: ['General Purpose Input/Output', 'Global Processor I/O', 'Grounded Power Input/Output', 'Generic Program Interface Operation'], correctIndex: 0, explanation: 'GPIO (General Purpose Input/Output) pins on a microcontroller can be configured as inputs or outputs to interface with sensors, LEDs, motors, etc.' },
      { id: 'q3', question: 'What does PWM stand for?', options: ['Power Watt Modulation', 'Pulse Width Modulation', 'Programmable Wave Management', 'Parallel Wire Mode'], correctIndex: 1, explanation: 'PWM (Pulse Width Modulation) varies the duty cycle of a digital signal to control power to devices like motors and LEDs.' },
      { id: 'q4', question: 'Which communication protocol is commonly used between Arduino and sensors over 2 wires?', options: ['USB', 'I2C', 'HDMI', 'Ethernet'], correctIndex: 1, explanation: 'I2C (Inter-Integrated Circuit) uses just 2 wires (SDA and SCL) to connect multiple devices like sensors and displays to a microcontroller.' },
      { id: 'q5', question: 'What is the purpose of a real-time operating system (RTOS)?', options: ['To run video games', 'To handle time-critical tasks with guaranteed response times', 'To browse the internet', 'To manage cloud storage'], correctIndex: 1, explanation: 'An RTOS manages hardware resources and schedules tasks with precise timing guarantees, critical in safety and control systems.' },
      { id: 'q6', question: 'What does MQTT stand for and what is it used for?', options: ['Multi-Queue Transfer Technology for databases', 'Message Queuing Telemetry Transport — a lightweight IoT messaging protocol', 'Mobile Queue Transfer Tool for apps', 'Managed Query Transfer Technology'], correctIndex: 1, explanation: 'MQTT is a lightweight publish/subscribe messaging protocol designed for IoT devices with low bandwidth and battery constraints.' },
      { id: 'q7', question: 'What is the voltage level of a typical Arduino digital pin output?', options: ['1.8V', '3.3V', '5V', '12V'], correctIndex: 2, explanation: 'Arduino Uno digital pins operate at 5V logic level. Some newer boards (like Arduino Due) operate at 3.3V.' },
      { id: 'q8', question: 'What is Raspberry Pi?', options: ['A type of pie chart', 'A single-board computer running Linux, used for IoT and learning', 'A microcontroller without an OS', 'A cloud computing service'], correctIndex: 1, explanation: 'Raspberry Pi is a credit-card sized single-board computer that runs Linux, capable of running full applications unlike simpler microcontrollers.' },
      { id: 'q9', question: 'What is the ADC in a microcontroller used for?', options: ['Analog-to-Digital Conversion — reading analog sensor values as digital numbers', 'Automatic Data Compression', 'Advanced Device Control', 'Asynchronous Data Communication'], correctIndex: 0, explanation: 'ADC (Analog-to-Digital Converter) converts continuous analog voltage from sensors (temperature, light) into discrete digital values the CPU can process.' },
      { id: 'q10', question: 'Which wireless protocol is designed for very low-power IoT devices over long ranges?', options: ['WiFi 6', 'Bluetooth Classic', 'LoRa (Long Range)', '4G LTE'], correctIndex: 2, explanation: 'LoRa (Long Range) is a spread-spectrum modulation technique enabling low-power IoT devices to communicate over several kilometers.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH EEE — VLSI DESIGN (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-eee',
    domainId: 'vlsi',
    title: 'VLSI Design Quiz',
    questions: [
      { id: 'q1', question: 'What does VLSI stand for?', options: ['Very Large Scale Integration', 'Variable Logic System Interface', 'Virtual Logic Signal Integration', 'Verified Large System Implementation'], correctIndex: 0, explanation: 'VLSI (Very Large Scale Integration) refers to creating integrated circuits with millions or billions of transistors on a single chip.' },
      { id: 'q2', question: 'What is the function of a MOSFET?', options: ['Store large amounts of data', 'Act as a switch or amplifier controlled by gate voltage', 'Generate clock signals', 'Convert AC to DC power'], correctIndex: 1, explanation: 'A MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) acts as a voltage-controlled switch/amplifier — the fundamental building block of digital circuits.' },
      { id: 'q3', question: 'What is Verilog used for?', options: ['Web development', 'Describing and simulating digital hardware circuits', 'Machine learning', 'Database management'], correctIndex: 1, explanation: 'Verilog is a Hardware Description Language (HDL) used to model, simulate, and synthesize digital systems like processors and controllers.' },
      { id: 'q4', question: 'What does FPGA stand for?', options: ['Fixed Programmable Gate Array', 'Field Programmable Gate Array', 'Fast Programmable Gate Architecture', 'Flexible Processing Gate Array'], correctIndex: 1, explanation: 'FPGA (Field Programmable Gate Array) is a reconfigurable chip that can be programmed to implement any digital circuit after manufacturing.' },
      { id: 'q5', question: 'What is the purpose of a flip-flop in digital circuits?', options: ['To amplify signals', 'To store a single bit of data (memory element)', 'To convert analog signals', 'To reduce power consumption'], correctIndex: 1, explanation: 'A flip-flop is a sequential logic circuit that stores one bit of data and changes state based on clock signals — the basis of registers and memory.' },
      { id: 'q6', question: 'What is a truth table?', options: ['A table showing processor speeds', 'A table showing all possible input-output combinations of a logic circuit', 'A list of debugging steps', 'A performance benchmark table'], correctIndex: 1, explanation: 'A truth table lists all possible combinations of input values and the corresponding output for a logic gate or circuit.' },
      { id: 'q7', question: 'In CMOS design, what are the two types of transistors used?', options: ['NPN and PNP', 'NMOS and PMOS', 'BJT and FET', 'Enhancement and Depletion'], correctIndex: 1, explanation: 'CMOS (Complementary MOS) uses both NMOS (n-channel) and PMOS (p-channel) transistors working complementarily, achieving low power consumption.' },
      { id: 'q8', question: 'What is the purpose of synthesis in VLSI design flow?', options: ['Drawing circuit schematics manually', 'Converting HDL code into a gate-level netlist', 'Testing the final chip', 'Packaging the chip'], correctIndex: 1, explanation: 'Synthesis translates RTL (Register Transfer Level) HDL code into a gate-level representation (netlist) that maps to actual library cells.' },
      { id: 'q9', question: 'What does setup time mean in sequential circuits?', options: ['Time to power on the circuit', 'Minimum time data must be stable before the clock edge', 'Time to reset all flip-flops', 'Time for the clock to stabilize'], correctIndex: 1, explanation: 'Setup time is the minimum time the input data must be stable (held constant) before the clock edge for the flip-flop to correctly capture the data.' },
      { id: 'q10', question: 'What is static timing analysis (STA) used for?', options: ['Measuring transistor size', 'Verifying circuit timing without simulation to ensure it meets timing constraints', 'Calculating power consumption only', 'Testing for manufacturing defects'], correctIndex: 1, explanation: 'STA verifies that all timing paths in the design meet setup and hold time requirements without exhaustive simulation.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH MECH — CAD/CAM (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-mech',
    domainId: 'cad-cam',
    title: 'CAD/CAM Design Quiz',
    questions: [
      { id: 'q1', question: 'What does CAD stand for?', options: ['Computer Aided Design', 'Computer Automated Drawing', 'Central Automated Design', 'Circuit Array Design'], correctIndex: 0, explanation: 'CAD (Computer Aided Design) uses software to create, modify, analyze, and optimize 2D drawings and 3D models of physical components.' },
      { id: 'q2', question: 'What is parametric modeling in CAD?', options: ['Freehand sketching on a tablet', 'Creating models driven by parameters/dimensions that update when values change', 'Drawing only 2D diagrams', 'Scanning physical objects'], correctIndex: 1, explanation: 'Parametric modeling creates designs with editable parameters — changing a dimension automatically updates all dependent features.' },
      { id: 'q3', question: 'What does GD&T stand for?', options: ['General Design & Tolerance', 'Geometric Dimensioning and Tolerancing', 'Graded Drawing & Testing', 'Global Design Technology'], correctIndex: 1, explanation: 'GD&T (Geometric Dimensioning and Tolerancing) is a system for defining and communicating engineering tolerances using symbols on drawings.' },
      { id: 'q4', question: 'What is FEA used for in mechanical design?', options: ['Creating 2D wireframes', 'Analyzing stress, deformation, and heat distribution in components', 'Writing G-code for CNC machines', 'Managing project timelines'], correctIndex: 1, explanation: 'FEA (Finite Element Analysis) divides a structure into small elements and solves equations to predict stress, strain, and deformation under load.' },
      { id: 'q5', question: 'What is G-code?', options: ['A programming language for web apps', 'The programming language used to control CNC machines', 'A Google software tool', 'A graphics format'], correctIndex: 1, explanation: 'G-code is the numerical control programming language that tells CNC machines where to move, how fast, and what path to follow to manufacture a part.' },
      { id: 'q6', question: 'What is the difference between first-angle and third-angle projection in engineering drawing?', options: ['They use different scales', 'They differ in the placement of views — first-angle is used in Europe; third-angle in the US/India', 'Third-angle uses colour; first-angle does not', 'There is no difference'], correctIndex: 1, explanation: 'In first-angle projection (European standard), views are placed opposite to the viewing direction. In third-angle (US/Indian standard), views are placed on the same side as the viewer.' },
      { id: 'q7', question: 'Which feature in SolidWorks creates a 3D solid by rotating a profile around an axis?', options: ['Extrude', 'Revolve', 'Sweep', 'Loft'], correctIndex: 1, explanation: 'The Revolve feature creates a 3D solid or surface by rotating a 2D sketch profile around a defined axis — used for cylindrical parts like shafts.' },
      { id: 'q8', question: 'What is a BOM in manufacturing?', options: ['Bill of Materials — a list of all parts, assemblies, and materials needed to build a product', 'Base Object Model', 'Binary Output Map', 'Build Operations Manual'], correctIndex: 0, explanation: 'A Bill of Materials (BOM) is a comprehensive list of all components, raw materials, and assemblies required to build a product, with quantities.' },
      { id: 'q9', question: 'What is CNC machining?', options: ['Computer Network Communication', 'Computer Numerical Control — automated machine operation using programmed instructions', 'Chemical Numerical Casting', 'Computerized Network Control'], correctIndex: 1, explanation: 'CNC (Computer Numerical Control) machining automates machine tool operation using pre-programmed sequences, enabling precise and repeatable manufacturing.' },
      { id: 'q10', question: 'What is the purpose of a datum in GD&T?', options: ['To decorate drawings', 'A theoretically exact reference point, line, or plane from which measurements are made', 'To indicate material type', 'To show assembly order'], correctIndex: 1, explanation: 'A datum is a theoretically exact geometric reference used to establish where measurements are taken from, ensuring consistency between design and manufacturing.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH MECH — ROBOTICS (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-mech',
    domainId: 'robotics',
    title: 'Robotics & Automation Quiz',
    questions: [
      { id: 'q1', question: 'What does DOF stand for in robotics?', options: ['Direction of Force', 'Degrees of Freedom', 'Drive Output Factor', 'Digital Operation Function'], correctIndex: 1, explanation: 'Degrees of Freedom (DOF) refers to the number of independent movements a robot joint or system can make. A 6-DOF robot arm can position and orient its end-effector in 3D space.' },
      { id: 'q2', question: 'What is the purpose of forward kinematics?', options: ['Finding joint angles from end-effector position', 'Calculating the end-effector position and orientation given joint angles', 'Measuring motor torque', 'Planning obstacle avoidance paths'], correctIndex: 1, explanation: 'Forward kinematics calculates where the robot\'s end-effector (hand/tool) is in space given the angles of all joints — mapping joint space to Cartesian space.' },
      { id: 'q3', question: 'What is ROS?', options: ['A type of motor controller', 'Robot Operating System — a framework providing tools and libraries for robot software development', 'A CNC programming language', 'Remote Operation Software'], correctIndex: 1, explanation: 'ROS (Robot Operating System) is an open-source robotics middleware providing hardware abstraction, communication tools, and a rich ecosystem of packages.' },
      { id: 'q4', question: 'What is a PID controller?', options: ['Programmable Interface Device', 'Proportional-Integral-Derivative controller — a feedback control algorithm', 'Parallel Input Device', 'Primary Instruction Database'], correctIndex: 1, explanation: 'A PID controller uses the error between desired and actual values to compute a correction — the P term reacts to current error, I to accumulated error, D to rate of change.' },
      { id: 'q5', question: 'What is the Jacobian matrix in robotics used for?', options: ['Designing robot aesthetics', 'Relating joint velocities to end-effector velocities (velocity kinematics)', 'Calculating power consumption', 'Storing waypoint data'], correctIndex: 1, explanation: 'The Jacobian matrix maps joint-space velocities to Cartesian end-effector velocities, and is also used for force/torque analysis and singularity detection.' },
      { id: 'q6', question: 'What is SLAM in robotics?', options: ['Simultaneous Localization And Mapping — building a map while tracking position within it', 'Speed, Load, and Motion management', 'Serial Link Actuator Mechanism', 'Sensor Latency and Motion'], correctIndex: 0, explanation: 'SLAM (Simultaneous Localization And Mapping) enables a robot to build a map of an unknown environment while simultaneously tracking its own location within that map.' },
      { id: 'q7', question: 'What type of sensor is a LiDAR?', options: ['A temperature sensor', 'A light-based distance measurement sensor using laser pulses', 'A pressure sensor', 'An accelerometer'], correctIndex: 1, explanation: 'LiDAR (Light Detection and Ranging) measures distances by emitting laser pulses and measuring the time for reflections to return, creating 3D point cloud maps.' },
      { id: 'q8', question: 'What is the difference between serial and parallel robot configurations?', options: ['Serial is faster; parallel is slower', 'Serial has joints in a chain (more workspace); parallel has multiple limbs (more rigidity/speed)', 'They are identical', 'Parallel robots are older designs'], correctIndex: 1, explanation: 'Serial robots (like industrial arms) have joints in sequence — large workspace but lower stiffness. Parallel robots (like delta robots) have multiple closed-loop chains — high stiffness and speed but smaller workspace.' },
      { id: 'q9', question: 'What is the end-effector of a robot?', options: ['The robot\'s power supply', 'The tool or device at the end of the robot arm that interacts with the environment', 'The robot\'s base frame', 'The robot\'s control computer'], correctIndex: 1, explanation: 'The end-effector is the device at the terminal end of a robotic arm — it could be a gripper, welding torch, spray nozzle, or any tool depending on the task.' },
      { id: 'q10', question: 'What is inverse kinematics (IK)?', options: ['Calculating end-effector pose from joint angles', 'Finding joint angles required to place the end-effector at a desired position and orientation', 'Measuring reaction forces', 'Planning the fastest path'], correctIndex: 1, explanation: 'Inverse kinematics solves the reverse problem of forward kinematics — given a desired end-effector position/orientation, it computes the required joint angles.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH AI/ML — GENERATIVE AI (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-ai',
    domainId: 'generative-ai',
    title: 'Generative AI & LLMs Quiz',
    questions: [
      { id: 'q1', question: 'What is a Large Language Model (LLM)?', options: ['A large library of books', 'A deep learning model trained on massive text data to generate and understand human language', 'A database of grammar rules', 'A spell-checking algorithm'], correctIndex: 1, explanation: 'LLMs are neural networks with billions of parameters, trained on vast text corpora to predict and generate coherent, contextually relevant text.' },
      { id: 'q2', question: 'What is the Transformer architecture primarily based on?', options: ['Convolutional layers', 'Recurrent layers', 'Self-attention mechanisms', 'Decision trees'], correctIndex: 2, explanation: 'The Transformer architecture, introduced in "Attention is All You Need" (2017), relies on self-attention to process all tokens in parallel, enabling efficient training on long sequences.' },
      { id: 'q3', question: 'What is prompt engineering?', options: ['Writing code prompts for beginners', 'Crafting effective inputs to guide LLM outputs toward desired results', 'Engineering hardware for AI', 'Writing system prompts for OS'], correctIndex: 1, explanation: 'Prompt engineering is the practice of designing and refining text inputs to LLMs to elicit accurate, relevant, and useful responses.' },
      { id: 'q4', question: 'What is RAG (Retrieval-Augmented Generation)?', options: ['A type of GAN', 'Combining a retrieval system with an LLM to ground responses in external documents', 'A data augmentation technique', 'A model compression method'], correctIndex: 1, explanation: 'RAG retrieves relevant documents from a knowledge base and provides them as context to an LLM, enabling factual, up-to-date responses without retraining.' },
      { id: 'q5', question: 'What is fine-tuning an LLM?', options: ['Adjusting the display settings', 'Further training a pre-trained model on domain-specific data to specialize its behavior', 'Writing better prompts', 'Reducing model size'], correctIndex: 1, explanation: 'Fine-tuning adapts a pre-trained LLM to specific tasks or domains by continuing training on a smaller, curated dataset — cheaper than training from scratch.' },
      { id: 'q6', question: 'What is "hallucination" in the context of LLMs?', options: ['A visualization technique', 'When an LLM generates plausible-sounding but factually incorrect information', 'A type of data augmentation', 'Model overfitting'], correctIndex: 1, explanation: 'Hallucination occurs when an LLM confidently generates false, fabricated, or nonsensical information that isn\'t grounded in its training data or provided context.' },
      { id: 'q7', question: 'What is the context window of an LLM?', options: ['The display area of the chatbot UI', 'The maximum amount of text (tokens) the model can process in a single interaction', 'The training dataset size', 'The number of model parameters'], correctIndex: 1, explanation: 'The context window is the maximum number of tokens an LLM can consider at once — inputs + outputs must fit within this limit (e.g., 128K tokens for GPT-4).' },
      { id: 'q8', question: 'What is LoRA in the context of LLM fine-tuning?', options: ['A chat interface for LLMs', 'Low-Rank Adaptation — an efficient fine-tuning technique that trains small adapter matrices instead of all parameters', 'A data labeling tool', 'A prompt template format'], correctIndex: 1, explanation: 'LoRA (Low-Rank Adaptation) freezes the original model weights and injects trainable low-rank matrices, enabling efficient fine-tuning with far fewer parameters.' },
      { id: 'q9', question: 'What is a vector database used for in AI applications?', options: ['Storing SQL tables', 'Storing and searching high-dimensional embeddings for semantic similarity search', 'Running neural network inference', 'Logging API calls'], correctIndex: 1, explanation: 'Vector databases (like Pinecone, Weaviate) store embeddings — numerical representations of text/images — and enable fast similarity search, powering RAG and recommendation systems.' },
      { id: 'q10', question: 'What is zero-shot prompting?', options: ['Prompting with no text at all', 'Asking an LLM to perform a task without providing any examples in the prompt', 'Training a model with no data', 'A prompt with zero tokens'], correctIndex: 1, explanation: 'Zero-shot prompting asks the LLM to perform a task relying only on its pre-trained knowledge, without any task-specific examples in the prompt.' },
    ],
  },

  // ─────────────────────────────────────────────
  // B.TECH AI/ML — COMPUTER VISION (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'btech-ai',
    domainId: 'computer-vision',
    title: 'Computer Vision Quiz',
    questions: [
      { id: 'q1', question: 'What is a convolution operation in CNNs?', options: ['Adding two matrices element-wise', 'Sliding a filter (kernel) over an input to extract local features', 'Multiplying all pixel values', 'Inverting image colors'], correctIndex: 1, explanation: 'Convolution slides a small learnable filter over the input image, computing dot products at each position to detect features like edges, textures, and patterns.' },
      { id: 'q2', question: 'What is the purpose of pooling layers in a CNN?', options: ['To add more parameters', 'To reduce spatial dimensions and achieve spatial invariance', 'To increase image resolution', 'To add color channels'], correctIndex: 1, explanation: 'Pooling (max or average) reduces the spatial size of feature maps, decreasing computation, preventing overfitting, and building spatial invariance.' },
      { id: 'q3', question: 'What does IoU (Intersection over Union) measure in object detection?', options: ['Model accuracy on training data', 'The overlap between a predicted bounding box and the ground-truth box', 'Image resolution quality', 'Inference speed'], correctIndex: 1, explanation: 'IoU measures how well a predicted bounding box overlaps with the ground-truth — IoU = Area of Overlap / Area of Union. Higher IoU means better localization.' },
      { id: 'q4', question: 'What is image segmentation?', options: ['Compressing image file size', 'Classifying each pixel in an image into a category', 'Detecting only one object per image', 'Resizing images'], correctIndex: 1, explanation: 'Image segmentation assigns a class label to every pixel in an image — semantic segmentation assigns class per pixel; instance segmentation distinguishes individual objects.' },
      { id: 'q5', question: 'What is transfer learning in computer vision?', options: ['Moving images between servers', 'Using a model pre-trained on a large dataset and fine-tuning it for a new task', 'Converting images to different formats', 'A type of data augmentation'], correctIndex: 1, explanation: 'Transfer learning reuses feature extractors learned on large datasets (like ImageNet) as a starting point, dramatically reducing data and compute needed for new tasks.' },
      { id: 'q6', question: 'What is the primary advantage of YOLO object detection?', options: ['Highest accuracy of all detectors', 'Real-time object detection by processing the image in a single forward pass', 'Requires no training data', 'Works only on grayscale images'], correctIndex: 1, explanation: 'YOLO (You Only Look Once) performs detection in a single pass through the network, making it extremely fast and suitable for real-time applications.' },
      { id: 'q7', question: 'What does batch normalization do in deep learning?', options: ['Groups images into batches', 'Normalizes layer inputs to have zero mean and unit variance, stabilizing and speeding training', 'Reduces image noise', 'Compresses model weights'], correctIndex: 1, explanation: 'Batch normalization normalizes activations within each mini-batch, reducing internal covariate shift and allowing higher learning rates and faster convergence.' },
      { id: 'q8', question: 'What is an anchor box in object detection?', options: ['The bounding box of the entire image', 'Pre-defined bounding boxes of various sizes used as references for predicting object locations', 'The output of the final layer', 'A type of activation function'], correctIndex: 1, explanation: 'Anchor boxes are predefined boxes of different scales and aspect ratios. Detectors predict offsets from these anchors to localize objects of varying sizes.' },
      { id: 'q9', question: 'What is data augmentation in computer vision?', options: ['Collecting more data manually', 'Artificially expanding training data by applying transforms like flips, rotations, and crops', 'Labeling images automatically', 'Removing duplicate images'], correctIndex: 1, explanation: 'Data augmentation applies random transformations (flip, rotate, crop, color jitter) to training images, increasing dataset diversity and improving model generalization.' },
      { id: 'q10', question: 'What does mAP (mean Average Precision) measure?', options: ['Mean model speed', 'The average precision across all classes and IoU thresholds — a standard object detection metric', 'Memory allocation for processing', 'Model size in megabytes'], correctIndex: 1, explanation: 'mAP is the standard metric for evaluating object detectors — it computes average precision (area under precision-recall curve) per class and averages across all classes.' },
    ],
  },

  // ─────────────────────────────────────────────
  // BCA/MCA — WEB DEVELOPMENT (NEW)
  // ─────────────────────────────────────────────
  {
    degreeId: 'bca',
    domainId: 'web-development',
    title: 'Web Development Quiz',
    questions: [
      { id: 'q1', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Manipulation Language', 'Home Tool Markup Language'], correctIndex: 0, explanation: 'HTML (Hyper Text Markup Language) is the standard language for creating web pages, providing structure and meaning to web content.' },
      { id: 'q2', question: 'Which CSS property is used to make text bold?', options: ['text-style: bold', 'font-weight: bold', 'text-weight: bold', 'font-style: bold'], correctIndex: 1, explanation: 'font-weight: bold (or font-weight: 700) makes text bold in CSS. font-style is used for italic.' },
      { id: 'q3', question: 'What is the difference between == and === in JavaScript?', options: ['No difference', '== checks value only; === checks both value and type', '=== is for strings only; == is for numbers', '== is stricter than ==='], correctIndex: 1, explanation: '== (loose equality) converts types before comparing. === (strict equality) checks both value AND type without conversion — always prefer === to avoid bugs.' },
      { id: 'q4', question: 'What does the CSS Flexbox display property enable?', options: ['3D transformations', 'A one-dimensional layout model for arranging items in rows or columns', 'CSS animations', 'Responsive images'], correctIndex: 1, explanation: 'Flexbox (display: flex) provides an efficient way to lay out, align, and distribute space among items in a container along a single axis.' },
      { id: 'q5', question: 'What is PHP primarily used for?', options: ['Styling web pages', 'Server-side scripting to create dynamic web content', 'Mobile app development', 'Database design'], correctIndex: 1, explanation: 'PHP is a server-side scripting language embedded in HTML, widely used for creating dynamic web pages, handling forms, and database interactions.' },
      { id: 'q6', question: 'What is the purpose of the Bootstrap grid system?', options: ['To add icons to web pages', 'To create responsive layouts using a 12-column grid system', 'To style buttons only', 'To handle JavaScript events'], correctIndex: 1, explanation: 'Bootstrap\'s 12-column grid system uses rows and columns to create layouts that automatically adjust to different screen sizes (responsive design).' },
      { id: 'q7', question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Output Management', 'Digital Object Module', 'Display Output Model'], correctIndex: 0, explanation: 'The DOM (Document Object Model) is a programming interface for HTML/XML documents, representing the page as a tree of objects that JavaScript can manipulate.' },
      { id: 'q8', question: 'What is a cookie in web development?', options: ['A type of web animation', 'Small pieces of data stored on the client\'s browser by a website', 'A JavaScript error', 'A type of web framework'], correctIndex: 1, explanation: 'Cookies are small text files stored in the browser, used to remember user preferences, login sessions, and tracking information across visits.' },
      { id: 'q9', question: 'What is responsive web design?', options: ['Designing only for desktop screens', 'Creating websites that adapt their layout to different screen sizes and devices', 'Making websites load faster', 'Designing interactive animations'], correctIndex: 1, explanation: 'Responsive web design uses flexible grids, images, and CSS media queries to make websites look and work well on all devices — mobile, tablet, and desktop.' },
      { id: 'q10', question: 'What is the purpose of a <meta> tag in HTML?', options: ['To display text on screen', 'To provide metadata about the document (charset, viewport, description) to browsers and search engines', 'To create navigation menus', 'To add images'], correctIndex: 1, explanation: '<meta> tags provide metadata like character encoding, viewport settings for mobile, page descriptions, and SEO keywords — not directly visible on the page.' },
    ],
  },
];

export const getQuiz = (degreeId: string, domainId: string): Quiz | undefined =>
  quizzes.find(q => q.degreeId === degreeId && q.domainId === domainId);