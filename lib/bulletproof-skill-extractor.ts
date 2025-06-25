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
    
    // Web Technologies
    'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'jQuery', 'Bootstrap',
    
    // Backend Frameworks
    'Django', 'Flask', 'Spring', 'Express', 'Laravel', 'Rails',
    
    // Databases
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'Jenkins',
    
    // Data & AI
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
    'Power BI', 'Tableau', 'Analytics'
  ]

  private skillVariations: Record<string, string[]> = {
    'Python': ['python', 'PYTHON', 'Python3', 'Python 3', 'python3', 'py'],
    'JavaScript': ['javascript', 'JAVASCRIPT', 'js', 'JS', 'Java Script', 'ECMAScript'],
    'Node.js': ['nodejs', 'node js', 'node.js', 'NodeJS', 'NODE.JS', 'node'],
    'React': ['react', 'REACT', 'ReactJS', 'React.js', 'react.js'],
    'Vue': ['vue', 'VUE', 'Vue.js', 'vue.js', 'VueJS'],
    'Angular': ['angular', 'ANGULAR', 'AngularJS', 'angular.js'],
    'SQL': ['sql', 'SQL', 'Sql', 'structured query language'],
    'Machine Learning': ['machine learning', 'ML', 'ml', 'machinelearning', 'machine-learning'],
    'Deep Learning': ['deep learning', 'DL', 'dl', 'deeplearning', 'deep-learning'],
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
