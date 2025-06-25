/**
 * Advanced Skill Extraction System using LangGraph-inspired multi-agent approach
 * This system uses multiple specialized agents to extract skills more accurately
 */

<<<<<<< HEAD
import {
  PatternBasedAgent,
  ContextualAgent,
  SemanticAgent,
  InferenceAgent,
  ValidationAgent,
  type ExtractionAgent
=======
import { 
  PatternBasedAgent, 
  ContextualAgent, 
  SemanticAgent, 
  InferenceAgent, 
  ValidationAgent,
  type ExtractionAgent 
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
} from './extraction-agents'
import { BulletproofSkillExtractor } from './bulletproof-skill-extractor'

interface SkillExtractionResult {
  skills: string[]
  programmingLanguages: string[]
  frameworks: string[]
  tools: string[]
  databases: string[]
  softSkills: string[]
  certifications: string[]
  confidence: number
  extractionMethod: string
  detailedAnalysis: {
    contextualSkills: string[]
    inferredSkills: string[]
    skillCategories: Record<string, string[]>
  }
}

class AdvancedSkillExtractor {
  private agents: ExtractionAgent[]
  private skillDatabase: SkillDatabase
  private geminiApiKey: string

  constructor() {
    this.geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY || ""
    this.skillDatabase = new SkillDatabase()
    this.agents = [
      new PatternBasedAgent(),
      new ContextualAgent(),
      new SemanticAgent(this.geminiApiKey),
      new InferenceAgent(),
      new ValidationAgent()
    ]
  }

  async extractSkills(resumeText: string, jobContext?: any): Promise<SkillExtractionResult> {
    console.log("🚀 Starting advanced skill extraction with multi-agent system...")
    
    const results: Record<string, string[]> = {}
    const confidenceScores: Record<string, number> = {}

    // Run all agents in parallel for efficiency
    const agentPromises = this.agents.map(async (agent) => {
      try {
        console.log(`🤖 Running ${agent.name}...`)
        const skills = await agent.extract(resumeText, jobContext)
        results[agent.name] = skills
        confidenceScores[agent.name] = agent.confidence
        console.log(`✅ ${agent.name} found ${skills.length} skills`)
        return { agent: agent.name, skills, confidence: agent.confidence }
      } catch (error) {
        console.error(`❌ ${agent.name} failed:`, error)
        results[agent.name] = []
        confidenceScores[agent.name] = 0
        return { agent: agent.name, skills: [], confidence: 0 }
      }
    })

    const agentResults = await Promise.all(agentPromises)

    // Consensus and validation phase
    const consensusSkills = this.buildConsensus(results, confidenceScores)
<<<<<<< HEAD

=======
    
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
    // Enhanced fallback system
    let finalSkills = consensusSkills
    if (consensusSkills.length === 0) {
      console.log("⚠️ No skills found by agents, using bulletproof fallback...")
      const bulletproofExtractor = new BulletproofSkillExtractor()
      const bulletproofResult = bulletproofExtractor.extract(resumeText)
      finalSkills = bulletproofResult.skills
      console.log(`🛡️ Bulletproof fallback found ${finalSkills.length} skills`)
    } else if (consensusSkills.length < 3) {
      console.log("⚠️ Few skills found, enhancing with bulletproof extractor...")
      const bulletproofExtractor = new BulletproofSkillExtractor()
      const bulletproofResult = bulletproofExtractor.extract(resumeText)
<<<<<<< HEAD

=======
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      // Merge results, avoiding duplicates
      const enhancedSkills = new Set([...consensusSkills, ...bulletproofResult.skills])
      finalSkills = Array.from(enhancedSkills)
      console.log(`🔧 Enhanced from ${consensusSkills.length} to ${finalSkills.length} skills`)
    }
<<<<<<< HEAD

=======
    
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
    // Categorize skills
    const categorizedSkills = this.categorizeSkills(finalSkills)
    
    // Calculate overall confidence
    const overallConfidence = this.calculateOverallConfidence(agentResults)

    // Extract additional metadata
<<<<<<< HEAD
    const detailedAnalysis = await this.performDetailedAnalysis(resumeText, consensusSkills)
=======
    const detailedAnalysis = await this.performDetailedAnalysis(resumeText, finalSkills)
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff

    console.log(`🎯 Advanced extraction complete: ${finalSkills.length} skills with ${overallConfidence}% confidence`)

    return {
      skills: finalSkills,
      programmingLanguages: categorizedSkills.programmingLanguages,
      frameworks: categorizedSkills.frameworks,
      tools: categorizedSkills.tools,
      databases: categorizedSkills.databases,
      softSkills: categorizedSkills.softSkills,
      certifications: categorizedSkills.certifications,
      confidence: overallConfidence,
      extractionMethod: "multi-agent-langgraph",
      detailedAnalysis
    }
  }

  private buildConsensus(results: Record<string, string[]>, confidenceScores: Record<string, number>): string[] {
    console.log("🤝 Building consensus from agent results...")
    const skillVotes: Record<string, { count: number; totalConfidence: number; agents: string[] }> = {}

    // Count votes for each skill weighted by agent confidence
    Object.entries(results).forEach(([agentName, skills]) => {
      const confidence = confidenceScores[agentName] || 0
      console.log(`📊 ${agentName}: ${skills.length} skills, confidence: ${confidence}`)
      console.log(`   Skills: ${skills.join(', ')}`)
<<<<<<< HEAD

=======
      
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
      skills.forEach(skill => {
        const normalizedSkill = this.normalizeSkill(skill)
        if (!skillVotes[normalizedSkill]) {
          skillVotes[normalizedSkill] = { count: 0, totalConfidence: 0, agents: [] }
        }
        skillVotes[normalizedSkill].count += 1
        skillVotes[normalizedSkill].totalConfidence += confidence
        skillVotes[normalizedSkill].agents.push(agentName)
      })
    })

    // More lenient consensus: accept skills with at least 1 agent OR decent confidence
    const consensusSkills = Object.entries(skillVotes)
      .filter(([skill, votes]) => {
        const avgConfidence = votes.totalConfidence / votes.count
        // Accept if: 2+ agents agree OR single agent with 70%+ confidence OR high-confidence agent (80%+)
        const accepted = votes.count >= 2 || avgConfidence >= 0.7 || votes.totalConfidence >= 0.8
        if (accepted) {
          console.log(`✅ Accepted skill: ${skill} (${votes.count} agents, avg confidence: ${avgConfidence.toFixed(2)})`)
        } else {
          console.log(`❌ Rejected skill: ${skill} (${votes.count} agents, avg confidence: ${avgConfidence.toFixed(2)})`)
        }
        return accepted
      })
      .sort((a, b) => b[1].totalConfidence - a[1].totalConfidence)
      .map(([skill]) => skill)

    console.log(`🎯 Consensus result: ${consensusSkills.length} skills accepted`)
    return consensusSkills
  }

  private normalizeSkill(skill: string): string {
    // Normalize skill names for better matching
    const normalized = skill.trim().toLowerCase()
    
    // Handle common variations
    const variations: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'sql server': 'sql',
      'postgresql': 'postgres',
      'reactjs': 'react',
      'nodejs': 'node.js',
      'vuejs': 'vue.js',
      'angularjs': 'angular'
    }

    return variations[normalized] || skill
  }

  private categorizeSkills(skills: string[]): {
    programmingLanguages: string[]
    frameworks: string[]
    tools: string[]
    databases: string[]
    softSkills: string[]
    certifications: string[]
  } {
    return {
      programmingLanguages: skills.filter(skill => this.skillDatabase.isProgrammingLanguage(skill)),
      frameworks: skills.filter(skill => this.skillDatabase.isFramework(skill)),
      tools: skills.filter(skill => this.skillDatabase.isTool(skill)),
      databases: skills.filter(skill => this.skillDatabase.isDatabase(skill)),
      softSkills: skills.filter(skill => this.skillDatabase.isSoftSkill(skill)),
      certifications: skills.filter(skill => this.skillDatabase.isCertification(skill))
    }
  }

  private calculateOverallConfidence(agentResults: any[]): number {
    const validResults = agentResults.filter(result => result.confidence > 0)
    if (validResults.length === 0) return 0
    
    const avgConfidence = validResults.reduce((sum, result) => sum + result.confidence, 0) / validResults.length
    return Math.round(avgConfidence * 100)
  }

  private async performDetailedAnalysis(text: string, skills: string[]): Promise<any> {
    // Extract contextual information about skills
    const contextualSkills = await this.extractContextualSkills(text, skills)
    const inferredSkills = await this.inferAdditionalSkills(text, skills)
    const skillCategories = this.groupSkillsByCategory(skills)

    return {
      contextualSkills,
      inferredSkills,
      skillCategories
    }
  }

  private async extractContextualSkills(text: string, skills: string[]): Promise<string[]> {
    // Find skills mentioned with context (e.g., "3 years of Python experience")
    const contextualSkills: string[] = []
    
    skills.forEach(skill => {
      const contextPattern = new RegExp(`(\\d+\\+?\\s*(?:years?|yrs?)\\s*(?:of\\s*)?(?:experience\\s*(?:with|in)\\s*)?${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      const matches = text.match(contextPattern)
      if (matches) {
        contextualSkills.push(`${skill} (${matches[0]})`)
      }
    })

    return contextualSkills
  }

  private async inferAdditionalSkills(text: string, extractedSkills: string[]): Promise<string[]> {
    // Infer additional skills based on context and relationships
    const inferredSkills: string[] = []
    
    // If React is mentioned, likely knows JavaScript
    if (extractedSkills.includes('React') && !extractedSkills.includes('JavaScript')) {
      if (text.toLowerCase().includes('react')) {
        inferredSkills.push('JavaScript (inferred from React)')
      }
    }

    // If Django is mentioned, likely knows Python
    if (extractedSkills.includes('Django') && !extractedSkills.includes('Python')) {
      if (text.toLowerCase().includes('django')) {
        inferredSkills.push('Python (inferred from Django)')
      }
    }

    // Add more inference rules as needed
    return inferredSkills
  }

  private groupSkillsByCategory(skills: string[]): Record<string, string[]> {
    const categories: Record<string, string[]> = {
      'Frontend': [],
      'Backend': [],
      'Database': [],
      'Cloud': [],
      'DevOps': [],
      'AI/ML': [],
      'Mobile': [],
      'Other': []
    }

    skills.forEach(skill => {
      const category = this.skillDatabase.getSkillCategory(skill)
      if (categories[category]) {
        categories[category].push(skill)
      } else {
        categories['Other'].push(skill)
      }
    })

    return categories
  }

  private emergencyFallback(text: string): string[] {
    console.log("🚨 Emergency fallback: Using simple regex extraction...")
    const skills = new Set<string>()
<<<<<<< HEAD

=======
    
>>>>>>> 37c3e38d7e9453b24cd55858a6bb58dc2f43f1ff
    // Most common skills that should always be detected
    const criticalSkills = [
      'Python', 'JavaScript', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'TypeScript',
      'React', 'Angular', 'Vue', 'Vue.js', 'Node.js', 'Django', 'Flask', 'Spring',
      'HTML', 'CSS', 'Bootstrap', 'Tailwind', 'jQuery',
      'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle',
      'AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'Jenkins',
      'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence',
      'Machine Learning', 'Deep Learning', 'AI', 'ML', 'TensorFlow', 'PyTorch',
      'Power BI', 'Tableau', 'Analytics', 'Data Visualization'
    ]

    // Use multiple strategies for maximum detection
    criticalSkills.forEach(skill => {
      // Strategy 1: Word boundary regex
      const wordBoundaryRegex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      if (wordBoundaryRegex.test(text)) {
        skills.add(skill)
        return
      }

      // Strategy 2: Case-insensitive includes (for compound skills)
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        skills.add(skill)
        return
      }

      // Strategy 3: Flexible matching for variations
      const variations: Record<string, string[]> = {
        'JavaScript': ['js', 'javascript'],
        'TypeScript': ['ts', 'typescript'],
        'Python': ['python', 'py'],
        'Node.js': ['nodejs', 'node js', 'node.js'],
        'Vue.js': ['vuejs', 'vue js', 'vue.js', 'vue'],
        'Machine Learning': ['ml', 'machine learning', 'machinelearning'],
        'Deep Learning': ['dl', 'deep learning', 'deeplearning'],
        'Power BI': ['powerbi', 'power bi'],
        'SQL Server': ['sqlserver', 'sql server']
      }

      const skillVariations = variations[skill] || []
      for (const variation of skillVariations) {
        const variationRegex = new RegExp(`\\b${variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
        if (variationRegex.test(text)) {
          skills.add(skill)
          break
        }
      }
    })

    const result = Array.from(skills)
    console.log(`🚨 Emergency fallback found ${result.length} skills: ${result.join(', ')}`)
    return result
  }
}

// Skill Database for categorization and validation
class SkillDatabase {
  private programmingLanguages = new Set([
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'C', 'PHP', 'Ruby', 'Go', 'Rust', 
    'TypeScript', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell', 'Bash'
  ])

  private frameworks = new Set([
    'React', 'Angular', 'Vue.js', 'Django', 'Flask', 'Spring', 'Express.js', 'Next.js',
    'Laravel', 'Ruby on Rails', 'ASP.NET', 'Bootstrap', 'Tailwind CSS'
  ])

  private tools = new Set([
    'Git', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure', 'Google Cloud',
    'Terraform', 'Ansible', 'Jira', 'Confluence', 'Slack', 'VS Code'
  ])

  private databases = new Set([
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server',
    'Cassandra', 'DynamoDB', 'Elasticsearch'
  ])

  private softSkills = new Set([
    'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Project Management', 'Agile', 'Scrum', 'Time Management'
  ])

  private certifications = new Set([
    'AWS Certified', 'Azure Certified', 'Google Cloud Certified', 'PMP', 'Scrum Master',
    'CISSP', 'CompTIA', 'Oracle Certified', 'Microsoft Certified'
  ])

  isProgrammingLanguage(skill: string): boolean {
    return this.programmingLanguages.has(skill)
  }

  isFramework(skill: string): boolean {
    return this.frameworks.has(skill)
  }

  isTool(skill: string): boolean {
    return this.tools.has(skill)
  }

  isDatabase(skill: string): boolean {
    return this.databases.has(skill)
  }

  isSoftSkill(skill: string): boolean {
    return this.softSkills.has(skill)
  }

  isCertification(skill: string): boolean {
    return Array.from(this.certifications).some(cert => skill.includes(cert))
  }

  getSkillCategory(skill: string): string {
    if (this.isProgrammingLanguage(skill)) return 'Programming'
    if (this.isFramework(skill)) return 'Framework'
    if (this.isTool(skill)) return 'Tool'
    if (this.isDatabase(skill)) return 'Database'
    if (this.isSoftSkill(skill)) return 'Soft Skill'
    if (this.isCertification(skill)) return 'Certification'
    return 'Other'
  }
}

export { AdvancedSkillExtractor, type SkillExtractionResult }
