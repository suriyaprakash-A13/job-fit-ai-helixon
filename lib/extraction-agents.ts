/**
 * Individual Extraction Agents for the Advanced Skill Extraction System
 * Each agent specializes in a different extraction approach
 */

interface ExtractionAgent {
  name: string
  extract: (text: string, context?: any) => Promise<string[]>
  confidence: number
}

// Agent 1: Pattern-Based Extraction Agent
class PatternBasedAgent implements ExtractionAgent {
  name = "Pattern-Based Agent"
  confidence = 0.7

  async extract(text: string): Promise<string[]> {
    console.log("🔍 Pattern-Based Agent: Extracting skills using regex patterns...")
    console.log(`📝 Text length: ${text.length} characters`)
    console.log(`📄 Text preview: ${text.substring(0, 500)}...`)
<<<<<<< HEAD

    const skills = new Set<string>()

    // Comprehensive skill patterns
    const skillKeywords = [
      // Programming Languages
      'JavaScript', 'Python', 'Java', 'C#', 'C++', 'C', 'PHP', 'Ruby', 'Go', 'Rust',
=======
    
    const skills = new Set<string>()
    
    // Comprehensive skill patterns
    const skillKeywords = [
      // Programming Languages
      'JavaScript', 'Python', 'Java', 'C#', 'C++', 'C', 'PHP', 'Ruby', 'Go', 'Rust', 
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      'TypeScript', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell', 'Bash', 'PowerShell',
      
      // Web Technologies
      'HTML', 'CSS', 'SCSS', 'SASS', 'Bootstrap', 'Tailwind', 'jQuery', 'AJAX', 'JSON', 'XML', 
      'REST', 'GraphQL', 'WebSocket', 'OAuth', 'JWT',
      
      // Frontend Frameworks
      'React', 'Angular', 'Vue', 'Vue.js', 'Svelte', 'Ember', 'Backbone', 'Next.js', 'Nuxt.js', 
      'Gatsby', 'Redux', 'MobX', 'Vuex',
      
      // Backend Frameworks
      'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Spring', 'Spring Boot', 'Laravel', 
      'Ruby on Rails', 'ASP.NET', 'Symfony', 'CodeIgniter',
      
      // Databases
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'MariaDB', 
      'Cassandra', 'DynamoDB', 'Elasticsearch', 'Neo4j',
      
      // Cloud & DevOps
      'AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 
      'GitHub Actions', 'Terraform', 'Ansible', 'Chef', 'Puppet',
      
      // Data Science & AI
      'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn',
      'Power BI', 'PowerBI', 'Tableau', 'Data Visualization', 'Analytics', 'Artificial Intelligence', 
      'LLMs', 'NLP', 'Computer Vision',
      
      // Mobile Development
      'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Cordova', 'Android', 'iOS', 'Swift UI',
      
      // Tools & Others
      'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Slack', 'VS Code', 'IntelliJ',
      'Postman', 'Swagger', 'API', 'Microservices', 'Agile', 'Scrum', 'Kanban'
    ]

    // Strategy 1: Direct word boundary matching with enhanced debugging
    console.log("🔍 Strategy 1: Direct word boundary matching...")
    let strategy1Count = 0
    skillKeywords.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      if (regex.test(text)) {
        skills.add(skill)
        strategy1Count++
        console.log(`✅ Found skill: ${skill}`)
      }
    })
    console.log(`📊 Strategy 1 found ${strategy1Count} skills`)

    // Strategy 1b: Enhanced critical skills detection with multiple methods
    const criticalSkills = ['Python', 'JavaScript', 'Java', 'React', 'Node.js', 'SQL', 'HTML', 'CSS', 'Django', 'Flask']
    console.log("🔍 Strategy 1b: Enhanced critical skills detection...")
    let criticalCount = 0
<<<<<<< HEAD

    criticalSkills.forEach(skill => {
      let found = false

=======
    
    criticalSkills.forEach(skill => {
      let found = false
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      // Method 1: Case-insensitive includes (most reliable)
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        skills.add(skill)
        found = true
        console.log(`✅ Found critical skill (includes): ${skill}`)
      }
<<<<<<< HEAD

=======
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      // Method 2: Loose regex without word boundaries
      if (!found) {
        const looseRegex = new RegExp(skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        if (looseRegex.test(text)) {
          skills.add(skill)
          found = true
          console.log(`✅ Found critical skill (loose regex): ${skill}`)
        }
      }
<<<<<<< HEAD

=======
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      // Method 3: Check for variations and common misspellings
      if (!found) {
        const variations: Record<string, string[]> = {
          'Python': ['python', 'PYTHON', 'Python3', 'Python 3', 'python3'],
          'JavaScript': ['javascript', 'JAVASCRIPT', 'js', 'JS', 'Java Script'],
          'Node.js': ['nodejs', 'node js', 'node.js', 'NodeJS', 'NODE.JS'],
          'React': ['react', 'REACT', 'ReactJS', 'React.js'],
          'SQL': ['sql', 'SQL', 'Sql']
        }
<<<<<<< HEAD

=======
        
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
        const skillVariations = variations[skill] || []
        for (const variation of skillVariations) {
          if (text.toLowerCase().includes(variation.toLowerCase())) {
            skills.add(skill)
            found = true
            console.log(`✅ Found critical skill (variation): ${skill} (as ${variation})`)
            break
          }
        }
      }
<<<<<<< HEAD

=======
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      if (found) criticalCount++
    })
    console.log(`📊 Strategy 1b found ${criticalCount} critical skills`)

    // Strategy 2: Flexible patterns for compound skills
    console.log("🔍 Strategy 2: Flexible patterns...")
    let strategy2Count = 0
    const flexiblePatterns = [
      { pattern: /node\.?js/gi, skill: 'Node.js' },
      { pattern: /vue\.?js/gi, skill: 'Vue.js' },
      { pattern: /react\.?js/gi, skill: 'React' },
      { pattern: /next\.?js/gi, skill: 'Next.js' },
      { pattern: /express\.?js/gi, skill: 'Express.js' },
      { pattern: /sql\s*server|sqlserver/gi, skill: 'SQL Server' },
      { pattern: /google\s*cloud|gcp/gi, skill: 'Google Cloud' },
      { pattern: /amazon\s*web\s*services|aws/gi, skill: 'AWS' },
      { pattern: /scikit[\-\s]*learn|sklearn/gi, skill: 'Scikit-learn' },
      { pattern: /apache\s*spark/gi, skill: 'Apache Spark' },
      { pattern: /ruby\s*on\s*rails|rails/gi, skill: 'Ruby on Rails' },
      { pattern: /spring\s*boot/gi, skill: 'Spring Boot' },
      { pattern: /react\s*native/gi, skill: 'React Native' },
      { pattern: /power\s*bi|powerbi/gi, skill: 'Power BI' },
      { pattern: /machine\s*learning|ml/gi, skill: 'Machine Learning' },
      { pattern: /deep\s*learning|dl/gi, skill: 'Deep Learning' },
      { pattern: /artificial\s*intelligence|ai/gi, skill: 'Artificial Intelligence' },
      { pattern: /natural\s*language\s*processing|nlp/gi, skill: 'NLP' },
      { pattern: /computer\s*vision|cv/gi, skill: 'Computer Vision' }
    ]

    flexiblePatterns.forEach(({ pattern, skill }) => {
      if (pattern.test(text)) {
        skills.add(skill)
        strategy2Count++
        console.log(`✅ Found flexible skill: ${skill}`)
      }
    })
    console.log(`📊 Strategy 2 found ${strategy2Count} skills`)

    // Strategy 3: Section-based extraction
    console.log("🔍 Strategy 3: Section-based extraction...")
    let strategy3Count = 0
    const skillSections = [
      /(?:technical\s*skills?|programming\s*languages?|technologies?|tools?)[:\s]*([\s\S]*?)(?:\n\s*\n|$)/gi,
      /(?:skills?|competencies)[:\s]*([\s\S]*?)(?:\n\s*\n|$)/gi,
      /(?:languages?|frameworks?|libraries?)[:\s]*([\s\S]*?)(?:\n\s*\n|$)/gi,
      /(?:areas?\s+of\s+technical\s+interest)[:\s]*([\s\S]*?)(?:\n\s*\n|$)/gi
    ]

    skillSections.forEach(sectionPattern => {
      const matches = [...text.matchAll(sectionPattern)]
      matches.forEach(match => {
        const sectionText = match[1] || ''
        console.log(`📄 Found skill section: ${sectionText.substring(0, 100)}...`)
        skillKeywords.forEach(skill => {
          const skillRegex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
          if (skillRegex.test(sectionText) && !skills.has(skill)) {
            skills.add(skill)
            strategy3Count++
            console.log(`✅ Found section skill: ${skill}`)
          }
        })
      })
    })
    console.log(`📊 Strategy 3 found ${strategy3Count} skills`)

    const result = Array.from(skills)
    console.log(`✅ Pattern-Based Agent found ${result.length} total skills: ${result.join(', ')}`)
    return result
  }
}

// Agent 2: Contextual Extraction Agent
class ContextualAgent implements ExtractionAgent {
  name = "Contextual Agent"
  confidence = 0.8

  async extract(text: string): Promise<string[]> {
    console.log("🧠 Contextual Agent: Extracting skills using context analysis...")
    console.log(`📝 Text length: ${text.length} characters`)
<<<<<<< HEAD

=======
    
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
    const skills = new Set<string>()
    
    // Look for skills mentioned with experience context
    const experiencePatterns = [
      /(\d+)\+?\s*years?\s*(?:of\s*)?(?:experience\s*)?(?:with|in|using)\s*([A-Za-z\s\.#\+\-]+)/gi,
      /(?:experienced|proficient|skilled|expert)\s*(?:with|in|using)\s*([A-Za-z\s\.#\+\-]+)/gi,
      /(?:worked|working|developed|developing|built|building)\s*(?:with|in|using)\s*([A-Za-z\s\.#\+\-]+)/gi,
      /(?:knowledge|understanding)\s*(?:of|in)\s*([A-Za-z\s\.#\+\-]+)/gi
    ]

    experiencePatterns.forEach(pattern => {
      const matches = [...text.matchAll(pattern)]
      matches.forEach(match => {
        const skillText = match[match.length - 1] // Last capture group
        if (skillText) {
          const extractedSkills = this.parseSkillText(skillText)
          extractedSkills.forEach(skill => skills.add(skill))
        }
      })
    })

    // Look for project-based skill mentions
    const projectPatterns = [
      /(?:project|application|system|website|platform)\s*(?:built|developed|created|implemented)\s*(?:with|using|in)\s*([A-Za-z\s\.#\+\-,]+)/gi,
      /(?:implemented|developed|created|built)\s*(?:a|an)?\s*[^.]*?(?:using|with|in)\s*([A-Za-z\s\.#\+\-,]+)/gi
    ]

    projectPatterns.forEach(pattern => {
      const matches = [...text.matchAll(pattern)]
      matches.forEach(match => {
        const skillText = match[1]
        if (skillText) {
          const extractedSkills = this.parseSkillText(skillText)
          extractedSkills.forEach(skill => skills.add(skill))
        }
      })
    })

    // Look for certification and course mentions
    const certificationPatterns = [
      /(?:certified|certification)\s*(?:in|for)\s*([A-Za-z\s\.#\+\-]+)/gi,
      /(?:course|training|bootcamp)\s*(?:in|on)\s*([A-Za-z\s\.#\+\-]+)/gi
    ]

    certificationPatterns.forEach(pattern => {
      const matches = [...text.matchAll(pattern)]
      matches.forEach(match => {
        const skillText = match[1]
        if (skillText) {
          const extractedSkills = this.parseSkillText(skillText)
          extractedSkills.forEach(skill => skills.add(skill))
        }
      })
    })

    const result = Array.from(skills).filter(skill => this.isValidSkill(skill))
    console.log(`✅ Contextual Agent found ${result.length} skills`)
    return result
  }

  private parseSkillText(text: string): string[] {
    // Clean and split skill text
    const cleaned = text
      .replace(/[,;]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const skills: string[] = []

    // Comprehensive known skills list
    const knownSkills = [
      // Programming Languages
<<<<<<< HEAD
      'JavaScript', 'Python', 'Java', 'C#', 'C++', 'C', 'PHP', 'Ruby', 'Go', 'Rust',
      'TypeScript', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell', 'Bash',

      // Frontend
      'React', 'Angular', 'Vue.js', 'Vue', 'HTML', 'CSS', 'Bootstrap', 'Tailwind',

      // Backend
      'Node.js', 'Django', 'Flask', 'Spring', 'Express.js', 'Laravel', 'Ruby on Rails',

      // Databases
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'SQL',

      // Cloud & DevOps
      'AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Git',

=======
      'JavaScript', 'Python', 'Java', 'C#', 'C++', 'C', 'PHP', 'Ruby', 'Go', 'Rust', 
      'TypeScript', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell', 'Bash',
      
      // Frontend
      'React', 'Angular', 'Vue.js', 'Vue', 'HTML', 'CSS', 'Bootstrap', 'Tailwind',
      
      // Backend
      'Node.js', 'Django', 'Flask', 'Spring', 'Express.js', 'Laravel', 'Ruby on Rails',
      
      // Databases
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'SQL',
      
      // Cloud & DevOps
      'AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Git',
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      // Data & AI
      'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
      'Power BI', 'Tableau', 'Data Visualization', 'Analytics', 'AI', 'ML'
    ]

    // Use case-insensitive matching with word boundaries
    knownSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      if (regex.test(text)) {
        skills.push(skill)
        console.log(`🎯 Contextual found: ${skill}`)
      }
    })

    // Also try simple includes for compound skills
    const compoundSkills = ['Node.js', 'Vue.js', 'Machine Learning', 'Deep Learning', 'Power BI']
    compoundSkills.forEach(skill => {
      if (text.toLowerCase().includes(skill.toLowerCase()) && !skills.includes(skill)) {
        skills.push(skill)
        console.log(`🎯 Contextual found (compound): ${skill}`)
      }
    })

    return skills
  }

  private isValidSkill(skill: string): boolean {
    // Filter out common non-skills
    const invalidSkills = ['and', 'or', 'the', 'with', 'for', 'in', 'on', 'at', 'to', 'from']
    return skill.length > 2 && !invalidSkills.includes(skill.toLowerCase())
  }
}

// Agent 3: Semantic Analysis Agent (using Gemini AI)
class SemanticAgent implements ExtractionAgent {
  name = "Semantic Agent"
  confidence = 0.9
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async extract(text: string, context?: any): Promise<string[]> {
    console.log("🤖 Semantic Agent: Using Gemini AI for semantic skill extraction...")
    console.log(`📝 Text length: ${text.length} characters`)
<<<<<<< HEAD

=======
    
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
    try {
      const prompt = this.buildSemanticPrompt(text, context)
      console.log("📤 Sending request to Gemini API...")
      const response = await this.callGeminiAPI(prompt)
      console.log(`📥 Received response: ${response.substring(0, 200)}...`)
      const skills = this.parseGeminiResponse(response)
<<<<<<< HEAD

=======
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      console.log(`✅ Semantic Agent found ${skills.length} skills: ${skills.join(', ')}`)
      return skills
    } catch (error) {
      console.error("❌ Semantic Agent failed:", error)
      console.log("🔄 Falling back to basic pattern matching...")
<<<<<<< HEAD

=======
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      // Fallback to basic pattern matching if Gemini fails
      const fallbackSkills = this.fallbackExtraction(text)
      console.log(`🔄 Fallback found ${fallbackSkills.length} skills: ${fallbackSkills.join(', ')}`)
      return fallbackSkills
    }
  }

  private fallbackExtraction(text: string): string[] {
    const skills = new Set<string>()
    const basicSkills = [
      'Python', 'JavaScript', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'TypeScript',
      'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask', 'Spring',
      'HTML', 'CSS', 'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
      'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Git',
      'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch'
    ]

    basicSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      if (regex.test(text)) {
        skills.add(skill)
      }
    })

    return Array.from(skills)
  }

  private buildSemanticPrompt(text: string, context?: any): string {
    return `
You are an expert skill extraction AI. Extract ALL technical skills, programming languages, frameworks, tools, and technologies mentioned in this resume text.

RESUME TEXT:
${text}

${context?.jobRequirements ? `JOB CONTEXT: ${context.jobRequirements.join(', ')}` : ''}

INSTRUCTIONS:
1. Extract ONLY skills that are explicitly mentioned in the text
2. Include programming languages, frameworks, databases, cloud platforms, tools
3. Include soft skills if clearly stated
4. Include certifications and qualifications
5. Do NOT infer or add skills not mentioned
6. Return as a JSON array of strings

EXAMPLE OUTPUT:
["JavaScript", "React", "Node.js", "MongoDB", "AWS", "Git", "Agile"]

Return ONLY the JSON array, no other text:
`
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || ""
  }

  private parseGeminiResponse(response: string): string[] {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const skills = JSON.parse(jsonMatch[0])
        return Array.isArray(skills) ? skills.filter(skill => typeof skill === 'string') : []
      }
      return []
    } catch (error) {
      console.error("Failed to parse Gemini response:", error)
      return []
    }
  }
}

// Agent 4: Inference Agent
class InferenceAgent implements ExtractionAgent {
  name = "Inference Agent"
  confidence = 0.6

  async extract(text: string): Promise<string[]> {
    console.log("🔮 Inference Agent: Inferring additional skills from context...")
    
    const inferredSkills = new Set<string>()
    
    // Inference rules based on technology relationships
    const inferenceRules = [
      { condition: /react/gi, infer: ['JavaScript', 'HTML', 'CSS'] },
      { condition: /angular/gi, infer: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
      { condition: /vue/gi, infer: ['JavaScript', 'HTML', 'CSS'] },
      { condition: /django/gi, infer: ['Python'] },
      { condition: /flask/gi, infer: ['Python'] },
      { condition: /spring/gi, infer: ['Java'] },
      { condition: /laravel/gi, infer: ['PHP'] },
      { condition: /rails/gi, infer: ['Ruby'] },
      { condition: /express/gi, infer: ['Node.js', 'JavaScript'] },
      { condition: /tensorflow|pytorch/gi, infer: ['Python', 'Machine Learning'] },
      { condition: /pandas|numpy/gi, infer: ['Python', 'Data Analysis'] },
      { condition: /docker/gi, infer: ['DevOps', 'Containerization'] },
      { condition: /kubernetes/gi, infer: ['Docker', 'DevOps', 'Container Orchestration'] },
      { condition: /aws|azure|gcp/gi, infer: ['Cloud Computing'] },
      { condition: /mysql|postgresql|mongodb/gi, infer: ['Database Management', 'SQL'] }
    ]

    inferenceRules.forEach(rule => {
      if (rule.condition.test(text)) {
        rule.infer.forEach(skill => inferredSkills.add(skill))
      }
    })

    const result = Array.from(inferredSkills)
    console.log(`✅ Inference Agent inferred ${result.length} additional skills`)
    return result
  }
}

// Agent 5: Validation Agent
class ValidationAgent implements ExtractionAgent {
  name = "Validation Agent"
  confidence = 0.8

  async extract(text: string): Promise<string[]> {
    console.log("✅ Validation Agent: Validating and cleaning extracted skills...")
    
    // This agent doesn't extract new skills but validates existing ones
    // For now, return empty array as it's used in the consensus building
    return []
  }

  validateSkills(skills: string[]): string[] {
    // Remove duplicates and invalid skills
    const validSkills = new Set<string>()
    
    skills.forEach(skill => {
      const cleaned = this.cleanSkill(skill)
      if (this.isValidSkill(cleaned)) {
        validSkills.add(cleaned)
      }
    })

    return Array.from(validSkills)
  }

  private cleanSkill(skill: string): string {
    return skill.trim()
      .replace(/[^\w\s\.\#\+\-]/g, '') // Remove special chars except common ones
      .replace(/\s+/g, ' ') // Normalize whitespace
  }

  private isValidSkill(skill: string): boolean {
    // Basic validation rules
    if (skill.length < 2 || skill.length > 50) return false
    if (/^\d+$/.test(skill)) return false // Pure numbers
    if (/^[a-z]{1,2}$/i.test(skill)) return false // Single/double letters
    
    const commonWords = ['and', 'or', 'the', 'with', 'for', 'in', 'on', 'at', 'to', 'from', 'of', 'is', 'are', 'was', 'were']
    if (commonWords.includes(skill.toLowerCase())) return false
    
    return true
  }
}

export { 
  PatternBasedAgent, 
  ContextualAgent, 
  SemanticAgent, 
  InferenceAgent, 
  ValidationAgent,
  type ExtractionAgent 
}
