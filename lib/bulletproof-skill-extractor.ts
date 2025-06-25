/**
 * Bulletproof Skill Extractor
 * This is a simple, reliable skill extraction function that should never fail to find Python and other common skills
 */

export interface BulletproofResult {
  skills: string[]
  confidence: number
  method: string
  debug: {
    textLength: number
    foundByIncludes: string[]
    foundByRegex: string[]
    foundByVariations: string[]
  }
}

export class BulletproofSkillExtractor {
  private commonSkills = [
    // Programming Languages (most important)
    'Python', 'JavaScript', 'Java', 'C#', 'C++', 'C', 'PHP', 'Ruby', 'Go', 'Rust',
    'TypeScript', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell', 'Bash',
    'PowerShell', 'Objective-C', 'Dart', 'Elixir', 'Haskell', 'Clojure', 'F#', 'VB.NET',

    // Web Technologies
    'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'jQuery', 'Bootstrap',
    'Sass', 'SCSS', 'Webpack', 'Babel', 'Next.js', 'Nuxt.js', 'Svelte', 'Tailwind CSS',
    'Material-UI', 'Ant Design', 'Chakra UI', 'Styled Components',

    // Backend Frameworks
    'Django', 'Flask', 'Spring', 'Express', 'Laravel', 'Rails', 'FastAPI', 'ASP.NET',
    'Spring Boot', 'Struts', 'CodeIgniter', 'Symfony', 'CakePHP',

    // Databases
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle',
    'SQL Server', 'Cassandra', 'DynamoDB', 'Neo4j', 'InfluxDB', 'CouchDB',
    'MariaDB', 'Elasticsearch', 'Solr', 'Firebase',

    // Cloud & DevOps
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'Jenkins',
    'GitHub', 'GitLab', 'CI/CD', 'Terraform', 'Ansible', 'Chef', 'Puppet',
    'Vagrant', 'Helm', 'Istio', 'Prometheus', 'Grafana', 'Nagios',

    // Data & AI
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
    'Power BI', 'Tableau', 'Analytics', 'Scikit-learn', 'Keras', 'OpenCV', 'NLTK',
    'Spark', 'Hadoop', 'Kafka', 'Airflow', 'MLflow', 'Jupyter', 'Data Mining',

    // Mobile Development
    'iOS', 'Android', 'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Cordova',

    // Testing & Quality
    'Jest', 'Mocha', 'Cypress', 'Selenium', 'JUnit', 'PyTest', 'TestNG',
    'Cucumber', 'Postman', 'SonarQube', 'ESLint', 'Prettier',

    // Other Technologies
    'Linux', 'Windows', 'macOS', 'API', 'REST', 'GraphQL', 'Microservices',
    'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence', 'Slack', 'Teams',
    'Figma', 'Sketch', 'Adobe Creative Suite', 'Unity', 'Unreal Engine'
  ]

  private skillVariations: Record<string, string[]> = {
    'Python': ['python', 'PYTHON', 'Python3', 'Python 3', 'python3', 'py', 'Python2'],
    'JavaScript': ['javascript', 'JAVASCRIPT', 'js', 'JS', 'Java Script', 'ECMAScript', 'ES6', 'ES2015', 'ES2020'],
    'TypeScript': ['typescript', 'TYPESCRIPT', 'ts', 'TS', 'Type Script'],
    'Node.js': ['nodejs', 'node js', 'node.js', 'NodeJS', 'NODE.JS', 'node', 'Node'],
    'React': ['react', 'REACT', 'ReactJS', 'React.js', 'react.js', 'React Native'],
    'Vue': ['vue', 'VUE', 'Vue.js', 'vue.js', 'VueJS', 'Vuejs'],
    'Angular': ['angular', 'ANGULAR', 'AngularJS', 'angular.js', 'Angular 2+', 'Angular2'],
    'SQL': ['sql', 'SQL', 'Sql', 'structured query language', 'Structured Query Language'],
    'Machine Learning': ['machine learning', 'ML', 'ml', 'machinelearning', 'machine-learning', 'Machine-Learning'],
    'Deep Learning': ['deep learning', 'DL', 'dl', 'deeplearning', 'deep-learning', 'Deep-Learning'],
    'C++': ['cpp', 'CPP', 'C plus plus', 'c++', 'C PLUS PLUS'],
    'C#': ['csharp', 'CSharp', 'C Sharp', 'c#', 'C SHARP', 'dotnet', '.NET', 'dot net'],
    'HTML': ['html', 'HTML', 'HTML5', 'html5', 'HyperText Markup Language'],
    'CSS': ['css', 'CSS', 'CSS3', 'css3', 'Cascading Style Sheets'],
    'AWS': ['aws', 'AWS', 'Amazon Web Services', 'amazon web services'],
    'Azure': ['azure', 'AZURE', 'Microsoft Azure', 'microsoft azure'],
    'GCP': ['gcp', 'GCP', 'Google Cloud Platform', 'google cloud platform', 'Google Cloud'],
    'Docker': ['docker', 'DOCKER', 'containerization', 'containers'],
    'Kubernetes': ['kubernetes', 'KUBERNETES', 'k8s', 'K8s', 'K8S', 'container orchestration'],
    'Git': ['git', 'GIT', 'version control', 'source control', 'Version Control'],
    'REST': ['rest', 'REST', 'RESTful', 'restful', 'REST API', 'RESTful API'],
    'API': ['api', 'API', 'Application Programming Interface'],
    'CI/CD': ['ci/cd', 'CI/CD', 'continuous integration', 'continuous deployment', 'CI CD'],
    'TensorFlow': ['tensorflow', 'TENSORFLOW', 'TensorFlow', 'tensor flow'],
    'PyTorch': ['pytorch', 'PYTORCH', 'PyTorch', 'py torch'],
    'MongoDB': ['mongodb', 'MONGODB', 'mongo db', 'Mongo DB'],
    'PostgreSQL': ['postgresql', 'POSTGRESQL', 'postgres', 'Postgres', 'PostGres'],
    'MySQL': ['mysql', 'MYSQL', 'My SQL', 'my sql'],
    'Power BI': ['powerbi', 'power bi', 'POWER BI', 'PowerBI'],
    'C#': ['c#', 'C#', 'csharp', 'C-sharp', 'c sharp'],
    'C++': ['c++', 'C++', 'cpp', 'cplusplus', 'c plus plus']
  }

  extract(text: string): BulletproofResult {
    console.log("🛡️ Bulletproof Skill Extractor: Starting extraction...")
    console.log(`📝 Text length: ${text.length} characters`)
    
    const foundSkills = new Set<string>()
    const debug = {
      textLength: text.length,
      foundByIncludes: [] as string[],
      foundByRegex: [] as string[],
      foundByVariations: [] as string[]
    }

    // Convert text to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase()
    
    // Method 1: Simple includes check (most reliable)
    console.log("🔍 Method 1: Case-insensitive includes...")
    this.commonSkills.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        foundSkills.add(skill)
        debug.foundByIncludes.push(skill)
        console.log(`✅ Found by includes: ${skill}`)
      }
    })

    // Method 2: Regex with word boundaries (for precision)
    console.log("🔍 Method 2: Regex with word boundaries...")
    this.commonSkills.forEach(skill => {
      if (!foundSkills.has(skill)) {
        try {
          const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
          if (regex.test(text)) {
            foundSkills.add(skill)
            debug.foundByRegex.push(skill)
            console.log(`✅ Found by regex: ${skill}`)
          }
        } catch (error) {
          // Skip if regex fails
          console.log(`⚠️ Regex failed for skill: ${skill}`)
        }
      }
    })

    // Method 3: Check variations and common misspellings
    console.log("🔍 Method 3: Skill variations...")
    Object.entries(this.skillVariations).forEach(([mainSkill, variations]) => {
      if (!foundSkills.has(mainSkill)) {
        for (const variation of variations) {
          if (lowerText.includes(variation.toLowerCase())) {
            foundSkills.add(mainSkill)
            debug.foundByVariations.push(`${mainSkill} (as ${variation})`)
            console.log(`✅ Found by variation: ${mainSkill} (as ${variation})`)
            break
          }
        }
      }
    })

    // Method 4: Special handling for critical skills that are often missed
    console.log("🔍 Method 4: Critical skills special handling...")
    const criticalSkills = ['Python', 'JavaScript', 'Java', 'React', 'SQL', 'HTML', 'CSS']
    criticalSkills.forEach(skill => {
      if (!foundSkills.has(skill)) {
        // Try multiple patterns
        const patterns = [
          skill.toLowerCase(),
          skill.toUpperCase(),
          skill,
          skill.replace(/\./g, ''), // Remove dots
          skill.replace(/\s/g, ''), // Remove spaces
        ]
        
        for (const pattern of patterns) {
          if (lowerText.includes(pattern.toLowerCase())) {
            foundSkills.add(skill)
            console.log(`✅ Found critical skill: ${skill} (pattern: ${pattern})`)
            break
          }
        }
      }
    })

    // Method 5: Context-based detection
    console.log("🔍 Method 5: Context-based detection...")
    const contextPatterns = [
      { pattern: /experience\s+(?:with|in|using)\s+([^.,\n]+)/gi, context: 'experience' },
      { pattern: /skilled?\s+(?:with|in|at)\s+([^.,\n]+)/gi, context: 'skills' },
      { pattern: /proficient\s+(?:with|in)\s+([^.,\n]+)/gi, context: 'proficiency' },
      { pattern: /knowledge\s+(?:of|in)\s+([^.,\n]+)/gi, context: 'knowledge' },
      { pattern: /programming\s+languages?[:\s]+([^.\n]+)/gi, context: 'programming' },
      { pattern: /technologies?[:\s]+([^.\n]+)/gi, context: 'technologies' }
    ]

    contextPatterns.forEach(({ pattern, context }) => {
      const matches = [...text.matchAll(pattern)]
      matches.forEach(match => {
        const contextText = match[1]
        if (contextText) {
          this.commonSkills.forEach(skill => {
            if (!foundSkills.has(skill) && contextText.toLowerCase().includes(skill.toLowerCase())) {
              foundSkills.add(skill)
              console.log(`✅ Found in context (${context}): ${skill}`)
            }
          })
        }
      })
    })

    const result = Array.from(foundSkills)
    const confidence = Math.min(95, Math.max(50, result.length * 10 + 30))

    console.log(`🛡️ Bulletproof extraction complete: ${result.length} skills found`)
    console.log(`📊 Skills: ${result.join(', ')}`)
    console.log(`🎯 Confidence: ${confidence}%`)

    return {
      skills: result,
      confidence,
      method: 'bulletproof-multi-strategy',
      debug
    }
  }

  // Quick test method
  testPythonExtraction(text: string): boolean {
    const pythonPatterns = [
      'python',
      'Python',
      'PYTHON',
      'python3',
      'Python 3',
      'py'
    ]

    const lowerText = text.toLowerCase()
    
    for (const pattern of pythonPatterns) {
      if (lowerText.includes(pattern.toLowerCase())) {
        console.log(`🐍 Python found using pattern: ${pattern}`)
        return true
      }
    }

    console.log(`🐍 Python NOT found in text`)
    return false
  }
}

// Standalone function for quick testing
export function quickSkillTest(text: string): string[] {
  const extractor = new BulletproofSkillExtractor()
  const result = extractor.extract(text)
  return result.skills
}

// Test function specifically for Python
export function testPythonInText(text: string): boolean {
  const extractor = new BulletproofSkillExtractor()
  return extractor.testPythonExtraction(text)
}
