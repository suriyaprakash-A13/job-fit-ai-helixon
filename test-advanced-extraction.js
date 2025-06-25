/**
 * Test script for Advanced Skill Extraction System
 * Run this to test the multi-agent skill extraction
 */

const testResumeText = `
John Doe
Software Engineer
Email: john.doe@email.com
Phone: +1-555-123-4567

TECHNICAL SKILLS:
• Programming Languages: Python, JavaScript, Java, TypeScript
• Frontend Frameworks: React, Angular, Vue.js
• Backend Technologies: Node.js, Django, Flask, Express.js
• Databases: PostgreSQL, MongoDB, Redis
• Cloud Platforms: AWS, Azure, Google Cloud
• DevOps Tools: Docker, Kubernetes, Jenkins
• Version Control: Git, GitHub
• Areas of Technical Interest: Machine Learning, Deep Learning, LLMs, Data Visualization

PROFESSIONAL EXPERIENCE:
Senior Software Engineer | TechCorp Inc. | 2020 - Present
• Developed scalable web applications using React and Node.js
• Implemented machine learning models using Python and TensorFlow
• Managed cloud infrastructure on AWS with Docker containers
• Led a team of 5 developers in agile development practices

Software Developer | StartupXYZ | 2018 - 2020
• Built REST APIs using Django and PostgreSQL
• Created data visualization dashboards with Power BI
• Worked with microservices architecture and Kubernetes
• 3+ years of experience in full-stack development

EDUCATION:
Bachelor of Science in Computer Science
University of Technology (2014-2018)

CERTIFICATIONS:
• AWS Certified Solutions Architect
• Google Cloud Professional Developer
• Scrum Master Certification
`

const jobContext = {
  jobTitle: "Senior Full Stack Developer",
  requiredSkills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  preferredSkills: ["Machine Learning", "Docker", "Kubernetes"],
  experienceLevel: "Senior"
}

async function testAdvancedExtraction() {
  console.log("🧪 Testing Advanced Skill Extraction System...")
  console.log("=" * 50)
  
  try {
    // Test the advanced skill extraction API
    const response = await fetch('http://localhost:3000/api/extract-skills-advanced', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText: testResumeText,
        jobContext: jobContext
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const result = await response.json()
    
    console.log("✅ Advanced Extraction Results:")
    console.log("=" * 30)
    console.log(`📊 Total Skills Found: ${result.data.skills.length}`)
    console.log(`🔧 Programming Languages: ${result.data.programmingLanguages.length}`)
    console.log(`⚡ Frameworks: ${result.data.frameworks.length}`)
    console.log(`🛠️ Tools: ${result.data.tools.length}`)
    console.log(`🗄️ Databases: ${result.data.databases.length}`)
    console.log(`🤝 Soft Skills: ${result.data.softSkills.length}`)
    console.log(`📜 Certifications: ${result.data.certifications.length}`)
    console.log(`🎯 Confidence: ${result.data.confidence}%`)
    console.log(`🔄 Method: ${result.data.extractionMethod}`)
    
    console.log("\n📋 Detailed Breakdown:")
    console.log("Programming Languages:", result.data.programmingLanguages.join(", "))
    console.log("Frameworks:", result.data.frameworks.join(", "))
    console.log("Tools:", result.data.tools.join(", "))
    console.log("Databases:", result.data.databases.join(", "))
    console.log("All Skills:", result.data.skills.slice(0, 10).join(", ") + (result.data.skills.length > 10 ? "..." : ""))
    
    console.log("\n🔍 Detailed Analysis:")
    console.log("Contextual Skills:", result.data.detailedAnalysis.contextualSkills.join(", "))
    console.log("Inferred Skills:", result.data.detailedAnalysis.inferredSkills.join(", "))
    
    console.log("\n📊 Skill Categories:")
    Object.entries(result.data.detailedAnalysis.skillCategories).forEach(([category, skills]) => {
      if (skills.length > 0) {
        console.log(`${category}: ${skills.join(", ")}`)
      }
    })
    
    console.log("\n🎉 Test completed successfully!")
    
  } catch (error) {
    console.error("❌ Test failed:", error.message)
    console.log("\n💡 Make sure the development server is running:")
    console.log("   npm run dev")
    console.log("\n💡 And that the advanced extraction API is available at:")
    console.log("   http://localhost:3000/api/extract-skills-advanced")
  }
}

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch')
  testAdvancedExtraction()
} else {
  // Browser environment
  console.log("🌐 Browser test mode - call testAdvancedExtraction() manually")
  window.testAdvancedExtraction = testAdvancedExtraction
}

module.exports = { testAdvancedExtraction, testResumeText, jobContext }
