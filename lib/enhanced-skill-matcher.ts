/**
 * Enhanced Skill Matching System
 * Provides intelligent skill matching with synonyms, variations, and fuzzy matching
 */

export interface SkillMatchResult {
  exactMatches: string[]
  partialMatches: string[]
  synonymMatches: string[]
  missingSkills: string[]
  matchPercentage: number
  confidence: number
  details: {
    candidateSkills: string[]
    requiredSkills: string[]
    matchedPairs: Array<{ required: string; candidate: string; type: 'exact' | 'partial' | 'synonym' }>
  }
}

export class EnhancedSkillMatcher {
  private skillSynonyms: Record<string, string[]> = {
    'JavaScript': ['JS', 'Javascript', 'ECMAScript', 'ES6', 'ES2015', 'ES2020', 'ES2021'],
    'TypeScript': ['TS', 'Typescript', 'Type Script'],
    'Python': ['Python3', 'Python 3', 'py', 'Python2'],
    'C++': ['CPP', 'C plus plus', 'Cpp', 'c++'],
    'C#': ['CSharp', 'C Sharp', 'dotnet', '.NET', 'dot net', 'csharp'],
    'Node.js': ['NodeJS', 'Node', 'node.js', 'nodejs'],
    'React': ['ReactJS', 'React.js', 'react.js'],
    'Angular': ['AngularJS', 'Angular.js', 'Angular 2+', 'Angular2'],
    'Vue': ['Vue.js', 'VueJS', 'Vuejs'],
    'Machine Learning': ['ML', 'machine-learning', 'machinelearning'],
    'Deep Learning': ['DL', 'deep-learning', 'deeplearning'],
    'Artificial Intelligence': ['AI', 'artificial-intelligence'],
    'SQL': ['Structured Query Language'],
    'HTML': ['HTML5', 'HyperText Markup Language'],
    'CSS': ['CSS3', 'Cascading Style Sheets'],
    'AWS': ['Amazon Web Services'],
    'GCP': ['Google Cloud Platform', 'Google Cloud'],
    'Azure': ['Microsoft Azure'],
    'CI/CD': ['Continuous Integration', 'Continuous Deployment', 'CI CD'],
    'REST': ['RESTful', 'REST API', 'RESTful API'],
    'API': ['Application Programming Interface'],
    'Git': ['Version Control', 'Source Control'],
    'Docker': ['Containerization', 'Containers'],
    'Kubernetes': ['K8s', 'Container Orchestration'],
    'MongoDB': ['Mongo DB', 'mongo db'],
    'PostgreSQL': ['Postgres', 'PostGres'],
    'MySQL': ['My SQL'],
    'TensorFlow': ['tensor flow'],
    'PyTorch': ['py torch'],
    'Next.js': ['NextJS', 'Next'],
    'Express': ['Express.js', 'ExpressJS'],
    'Spring Boot': ['SpringBoot'],
    'React Native': ['ReactNative'],
    'Flutter': ['Google Flutter'],
    'Xamarin': ['Microsoft Xamarin'],
    'Unity': ['Unity3D', 'Unity 3D'],
    'Unreal Engine': ['UE4', 'UE5', 'Unreal'],
    'Power BI': ['PowerBI', 'Microsoft Power BI'],
    'Tableau': ['Tableau Desktop', 'Tableau Server'],
    'Jenkins': ['Jenkins CI', 'Jenkins CI/CD'],
    'GitHub': ['Github'],
    'GitLab': ['Gitlab'],
    'JIRA': ['Jira', 'Atlassian JIRA'],
    'Confluence': ['Atlassian Confluence'],
    'Slack': ['Slack Technologies'],
    'Microsoft Teams': ['Teams', 'MS Teams'],
    'Visual Studio Code': ['VS Code', 'VSCode'],
    'IntelliJ IDEA': ['IntelliJ', 'IDEA'],
    'Postman': ['Postman API'],
    'Swagger': ['OpenAPI', 'Swagger UI'],
    'Elasticsearch': ['Elastic Search'],
    'Redis': ['Redis Cache'],
    'Kafka': ['Apache Kafka'],
    'Spark': ['Apache Spark'],
    'Hadoop': ['Apache Hadoop'],
    'Airflow': ['Apache Airflow'],
    'Terraform': ['HashiCorp Terraform'],
    'Ansible': ['Red Hat Ansible'],
    'Prometheus': ['Prometheus Monitoring'],
    'Grafana': ['Grafana Labs'],
    'Nginx': ['nginx'],
    'Apache': ['Apache HTTP Server', 'Apache Web Server'],
    'Linux': ['GNU/Linux', 'Ubuntu', 'CentOS', 'RHEL', 'Debian'],
    'Windows': ['Microsoft Windows', 'Windows Server'],
    'macOS': ['Mac OS', 'OS X', 'Mac OS X'],
    'iOS': ['iPhone OS'],
    'Android': ['Android OS', 'Google Android'],
    'Agile': ['Agile Methodology', 'Agile Development'],
    'Scrum': ['Scrum Framework', 'Scrum Methodology'],
    'Kanban': ['Kanban Board', 'Kanban Method'],
    'DevOps': ['Dev Ops', 'Development Operations'],
    'Microservices': ['Micro Services', 'Microservice Architecture'],
    'GraphQL': ['Graph QL'],
    'Sass': ['SCSS', 'Syntactically Awesome Style Sheets'],
    'Less': ['Less CSS'],
    'Webpack': ['Web Pack'],
    'Babel': ['Babel.js', 'BabelJS'],
    'ESLint': ['ES Lint'],
    'Prettier': ['Code Formatter'],
    'Jest': ['Jest Testing', 'Facebook Jest'],
    'Mocha': ['Mocha.js', 'MochaJS'],
    'Cypress': ['Cypress.io'],
    'Selenium': ['Selenium WebDriver'],
    'JUnit': ['JUnit Testing'],
    'PyTest': ['pytest', 'Python pytest'],
    'TestNG': ['Test NG'],
    'Cucumber': ['Cucumber BDD'],
    'SonarQube': ['Sonar Qube', 'SonarCloud'],
    'Material-UI': ['MUI', 'Material UI'],
    'Ant Design': ['AntD', 'Ant Design React'],
    'Chakra UI': ['ChakraUI'],
    'Styled Components': ['styled-components'],
    'Tailwind CSS': ['TailwindCSS', 'Tailwind'],
    'Bootstrap': ['Twitter Bootstrap'],
    'Foundation': ['Zurb Foundation'],
    'Bulma': ['Bulma CSS'],
    'Figma': ['Figma Design'],
    'Sketch': ['Sketch App'],
    'Adobe Creative Suite': ['Adobe CS', 'Creative Suite'],
    'Photoshop': ['Adobe Photoshop', 'PS'],
    'Illustrator': ['Adobe Illustrator', 'AI'],
    'After Effects': ['Adobe After Effects', 'AE'],
    'Premiere Pro': ['Adobe Premiere Pro', 'Premiere'],
    'InDesign': ['Adobe InDesign'],
    'XD': ['Adobe XD'],
    'Zeplin': ['Zeplin Design'],
    'InVision': ['InVision App'],
    'Marvel': ['Marvel App'],
    'Principle': ['Principle for Mac'],
    'Framer': ['Framer X'],
    'ProtoPie': ['Proto Pie'],
    'Axure': ['Axure RP'],
    'Balsamiq': ['Balsamiq Mockups'],
    'Wireframe': ['Wireframing'],
    'Prototyping': ['Prototype Design'],
    'User Experience': ['UX', 'UX Design'],
    'User Interface': ['UI', 'UI Design'],
    'User Research': ['UX Research'],
    'Usability Testing': ['User Testing'],
    'Information Architecture': ['IA'],
    'Interaction Design': ['IxD'],
    'Visual Design': ['Graphic Design'],
    'Brand Design': ['Branding'],
    'Logo Design': ['Logo Creation'],
    'Typography': ['Font Design'],
    'Color Theory': ['Color Design'],
    'Layout Design': ['Page Layout'],
    'Print Design': ['Graphic Design'],
    'Web Design': ['Website Design'],
    'Mobile Design': ['App Design'],
    'Responsive Design': ['Mobile-First Design'],
    'Accessibility': ['A11y', 'Web Accessibility'],
    'SEO': ['Search Engine Optimization'],
    'SEM': ['Search Engine Marketing'],
    'Google Analytics': ['GA', 'Analytics'],
    'Google Tag Manager': ['GTM'],
    'Facebook Ads': ['FB Ads'],
    'Google Ads': ['AdWords', 'Google AdWords'],
    'LinkedIn Ads': ['LinkedIn Marketing'],
    'Twitter Ads': ['Twitter Marketing'],
    'Instagram Ads': ['Instagram Marketing'],
    'YouTube Ads': ['YouTube Marketing'],
    'TikTok Ads': ['TikTok Marketing'],
    'Snapchat Ads': ['Snapchat Marketing'],
    'Pinterest Ads': ['Pinterest Marketing'],
    'Reddit Ads': ['Reddit Marketing'],
    'Quora Ads': ['Quora Marketing'],
    'Email Marketing': ['Email Campaigns'],
    'Content Marketing': ['Content Strategy'],
    'Social Media Marketing': ['SMM', 'Social Marketing'],
    'Influencer Marketing': ['Influencer Outreach'],
    'Affiliate Marketing': ['Affiliate Programs'],
    'Growth Hacking': ['Growth Marketing'],
    'Conversion Optimization': ['CRO'],
    'A/B Testing': ['Split Testing'],
    'Marketing Automation': ['Marketing Tech'],
    'CRM': ['Customer Relationship Management'],
    'Salesforce': ['SFDC'],
    'HubSpot': ['Hubspot'],
    'Marketo': ['Adobe Marketo'],
    'Pardot': ['Salesforce Pardot'],
    'Mailchimp': ['Mail Chimp'],
    'Constant Contact': ['ConstantContact'],
    'Campaign Monitor': ['CampaignMonitor'],
    'AWeber': ['A Weber'],
    'GetResponse': ['Get Response'],
    'ConvertKit': ['Convert Kit'],
    'ActiveCampaign': ['Active Campaign'],
    'Drip': ['Drip Email'],
    'Klaviyo': ['Klaviyo Email'],
    'Sendinblue': ['Send in Blue'],
    'Moosend': ['Moo Send'],
    'MailerLite': ['Mailer Lite'],
    'Benchmark Email': ['BenchmarkEmail'],
    'iContact': ['i Contact'],
    'Mad Mimi': ['MadMimi'],
    'Emma': ['Emma Email'],
    'Vertical Response': ['VerticalResponse'],
    'Constant Contact': ['ConstantContact'],
    'Campaign Monitor': ['CampaignMonitor'],
    'AWeber': ['A Weber'],
    'GetResponse': ['Get Response'],
    'ConvertKit': ['Convert Kit'],
    'ActiveCampaign': ['Active Campaign'],
    'Drip': ['Drip Email'],
    'Klaviyo': ['Klaviyo Email'],
    'Sendinblue': ['Send in Blue'],
    'Moosend': ['Moo Send'],
    'MailerLite': ['Mailer Lite'],
    'Benchmark Email': ['BenchmarkEmail'],
    'iContact': ['i Contact'],
    'Mad Mimi': ['MadMimi'],
    'Emma': ['Emma Email'],
    'Vertical Response': ['VerticalResponse']
  }

  /**
   * Enhanced skill matching with multiple strategies
   */
  matchSkills(candidateSkills: string[], requiredSkills: string[]): SkillMatchResult {
    console.log(`🎯 Enhanced skill matching: ${candidateSkills.length} candidate skills vs ${requiredSkills.length} required skills`)
    
    const exactMatches: string[] = []
    const partialMatches: string[] = []
    const synonymMatches: string[] = []
    const missingSkills: string[] = []
    const matchedPairs: Array<{ required: string; candidate: string; type: 'exact' | 'partial' | 'synonym' }> = []

    // Normalize skills for comparison
    const normalizedCandidateSkills = candidateSkills.map(skill => skill.toLowerCase().trim())
    const normalizedRequiredSkills = requiredSkills.map(skill => skill.toLowerCase().trim())

    for (const requiredSkill of requiredSkills) {
      const normalizedRequired = requiredSkill.toLowerCase().trim()
      let matched = false

      // Strategy 1: Exact match (case-insensitive)
      for (const candidateSkill of candidateSkills) {
        const normalizedCandidate = candidateSkill.toLowerCase().trim()
        if (normalizedRequired === normalizedCandidate) {
          exactMatches.push(requiredSkill)
          matchedPairs.push({ required: requiredSkill, candidate: candidateSkill, type: 'exact' })
          matched = true
          console.log(`✅ Exact match: "${requiredSkill}" = "${candidateSkill}"`)
          break
        }
      }

      if (matched) continue

      // Strategy 2: Partial match (contains)
      for (const candidateSkill of candidateSkills) {
        const normalizedCandidate = candidateSkill.toLowerCase().trim()
        if (normalizedCandidate.includes(normalizedRequired) || normalizedRequired.includes(normalizedCandidate)) {
          partialMatches.push(requiredSkill)
          matchedPairs.push({ required: requiredSkill, candidate: candidateSkill, type: 'partial' })
          matched = true
          console.log(`🔍 Partial match: "${requiredSkill}" ≈ "${candidateSkill}"`)
          break
        }
      }

      if (matched) continue

      // Strategy 3: Synonym matching
      const synonyms = this.skillSynonyms[requiredSkill] || []
      for (const synonym of synonyms) {
        const normalizedSynonym = synonym.toLowerCase().trim()
        for (const candidateSkill of candidateSkills) {
          const normalizedCandidate = candidateSkill.toLowerCase().trim()
          if (normalizedCandidate === normalizedSynonym || 
              normalizedCandidate.includes(normalizedSynonym) || 
              normalizedSynonym.includes(normalizedCandidate)) {
            synonymMatches.push(requiredSkill)
            matchedPairs.push({ required: requiredSkill, candidate: candidateSkill, type: 'synonym' })
            matched = true
            console.log(`🔗 Synonym match: "${requiredSkill}" → "${candidateSkill}" (via "${synonym}")`)
            break
          }
        }
        if (matched) break
      }

      // Strategy 4: Reverse synonym matching (check if candidate skill has synonyms that match required)
      if (!matched) {
        for (const candidateSkill of candidateSkills) {
          const candidateSynonyms = this.skillSynonyms[candidateSkill] || []
          for (const synonym of candidateSynonyms) {
            const normalizedSynonym = synonym.toLowerCase().trim()
            if (normalizedSynonym === normalizedRequired || 
                normalizedSynonym.includes(normalizedRequired) || 
                normalizedRequired.includes(normalizedSynonym)) {
              synonymMatches.push(requiredSkill)
              matchedPairs.push({ required: requiredSkill, candidate: candidateSkill, type: 'synonym' })
              matched = true
              console.log(`🔗 Reverse synonym match: "${requiredSkill}" ← "${candidateSkill}" (via "${synonym}")`)
              break
            }
          }
          if (matched) break
        }
      }

      if (!matched) {
        missingSkills.push(requiredSkill)
        console.log(`❌ Missing skill: "${requiredSkill}"`)
      }
    }

    const totalMatches = exactMatches.length + partialMatches.length + synonymMatches.length
    const matchPercentage = requiredSkills.length > 0 ? Math.round((totalMatches / requiredSkills.length) * 100) : 0
    
    // Calculate confidence based on match types (exact matches have higher confidence)
    const exactWeight = 1.0
    const partialWeight = 0.8
    const synonymWeight = 0.9
    
    const weightedMatches = (exactMatches.length * exactWeight) + 
                           (partialMatches.length * partialWeight) + 
                           (synonymMatches.length * synonymWeight)
    
    const confidence = requiredSkills.length > 0 ? Math.round((weightedMatches / requiredSkills.length) * 100) : 0

    console.log(`📊 Matching results: ${exactMatches.length} exact, ${partialMatches.length} partial, ${synonymMatches.length} synonym matches`)
    console.log(`📈 Match percentage: ${matchPercentage}%, Confidence: ${confidence}%`)

    return {
      exactMatches,
      partialMatches,
      synonymMatches,
      missingSkills,
      matchPercentage,
      confidence,
      details: {
        candidateSkills,
        requiredSkills,
        matchedPairs
      }
    }
  }

  /**
   * Quick skill matching for simple use cases
   */
  quickMatch(candidateSkills: string[], requiredSkills: string[]): number {
    const result = this.matchSkills(candidateSkills, requiredSkills)
    return result.matchPercentage
  }

  /**
   * Get all possible variations of a skill
   */
  getSkillVariations(skill: string): string[] {
    const variations = [skill]
    const synonyms = this.skillSynonyms[skill] || []
    variations.push(...synonyms)
    
    // Add case variations
    variations.push(skill.toLowerCase(), skill.toUpperCase())
    
    return [...new Set(variations)]
  }
}

// Export singleton instance
export const skillMatcher = new EnhancedSkillMatcher()
