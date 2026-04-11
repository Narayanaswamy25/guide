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
];

export const getQuiz = (degreeId: string, domainId: string): Quiz | undefined =>
  quizzes.find(q => q.degreeId === degreeId && q.domainId === domainId);
