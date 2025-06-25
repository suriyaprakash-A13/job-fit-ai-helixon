/**
 * Test script to validate the improved scoring system
 * This script tests the enhanced skill matching and scoring algorithms
 */

const { BulletproofSkillExtractor } = require('./lib/bulletproof-skill-extractor')
const { EnhancedSkillMatcher } = require('./lib/enhanced-skill-matcher')

// Test resume content with various skills
const testResumeText = `
John Doe
Software Engineer
john.doe@email.com
(555) 123-4567

PROFESSIONAL SUMMARY
Experienced full-stack developer with 5 years of experience in web development.
Proficient in JavaScript, React, Node.js, and Python. Strong background in 
cloud technologies including AWS and Docker.

TECHNICAL SKILLS
• Programming Languages: JavaScript, Python, Java, TypeScript
• Frontend: React, Angular, Vue.js, HTML5, CSS3
• Backend: Node.js, Express, Django, Flask
• Databases: MySQL, PostgreSQL, MongoDB
• Cloud: AWS, Docker, Kubernetes
• Tools: Git, Jenkins, JIRA

EXPERIENCE
Senior Software Engineer | TechCorp | 2020-2023
• Developed scalable web applications using React and Node.js
• Implemented microservices architecture with Docker and Kubernetes
• Led a team of 4 developers on multiple projects
• Worked with AWS services including EC2, S3, and RDS

Software Engineer | StartupXYZ | 2018-2020
• Built REST APIs using Python and Django
• Developed frontend components with React and TypeScript
• Implemented CI/CD pipelines with Jenkins
• Collaborated with cross-functional teams using Agile methodology

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2018

CERTIFICATIONS
• AWS Certified Solutions Architect
• Scrum Master Certification
`

// Test job requirements
const testJobDetails = {
  jobTitle: "Senior Full Stack Developer",
  requiredSkills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  preferredSkills: ["TypeScript", "Docker", "Kubernetes", "Leadership"],
  experienceLevel: "Senior Level (5+ years)",
  educationRequirement: "Bachelor's degree in Computer Science or related field"
}

async function testSkillExtraction() {
  console.log("🧪 Testing Enhanced Skill Extraction...")
  console.log("=" * 50)
  
  // Test bulletproof skill extractor
  const extractor = new BulletproofSkillExtractor()
  const extractionResult = extractor.extract(testResumeText)
  
  console.log("📋 Bulletproof Skill Extraction Results:")
  console.log(`   Skills found: ${extractionResult.skills.length}`)
  console.log(`   Skills: ${extractionResult.skills.join(', ')}`)
  console.log(`   Confidence: ${extractionResult.confidence}%`)
  console.log(`   Method: ${extractionResult.method}`)
  
  return extractionResult.skills
}

async function testSkillMatching(candidateSkills) {
  console.log("\n🎯 Testing Enhanced Skill Matching...")
  console.log("=" * 50)
  
  const skillMatcher = new EnhancedSkillMatcher()
  const matchResult = skillMatcher.matchSkills(candidateSkills, testJobDetails.requiredSkills)
  
  console.log("📊 Skill Matching Results:")
  console.log(`   Required Skills: ${testJobDetails.requiredSkills.join(', ')}`)
  console.log(`   Candidate Skills: ${candidateSkills.slice(0, 10).join(', ')}${candidateSkills.length > 10 ? '...' : ''}`)
  console.log(`   Exact Matches (${matchResult.exactMatches.length}): ${matchResult.exactMatches.join(', ')}`)
  console.log(`   Synonym Matches (${matchResult.synonymMatches.length}): ${matchResult.synonymMatches.join(', ')}`)
  console.log(`   Partial Matches (${matchResult.partialMatches.length}): ${matchResult.partialMatches.join(', ')}`)
  console.log(`   Missing Skills (${matchResult.missingSkills.length}): ${matchResult.missingSkills.join(', ')}`)
  console.log(`   Match Percentage: ${matchResult.matchPercentage}%`)
  console.log(`   Confidence: ${matchResult.confidence}%`)
  
  return matchResult
}

async function testScoringCalculation(skillMatchResult, candidateSkills) {
  console.log("\n📈 Testing Scoring Calculation...")
  console.log("=" * 50)
  
  // Simulate the improved scoring algorithm
  const skillsWeight = 0.5
  const experienceWeight = 0.3
  const educationWeight = 0.15
  const qualityWeight = 0.05
  
  const skillsScore = skillMatchResult.matchPercentage
  const experienceScore = 75 // 5 years experience
  const educationScore = 75 // Bachelor's degree
  const qualityScore = 80 // Has contact info
  
  const confidenceBonus = skillMatchResult.confidence > 80 ? 5 : 
                         skillMatchResult.confidence > 60 ? 3 : 0
  
  const baseFitScore = Math.round(
    (skillsScore * skillsWeight) +
    (experienceScore * experienceWeight) +
    (educationScore * educationWeight) +
    (qualityScore * qualityWeight)
  )
  
  const finalFitScore = Math.min(100, Math.max(0, baseFitScore + confidenceBonus))
  
  console.log("🏆 Scoring Breakdown:")
  console.log(`   Skills Score: ${skillsScore} (weight: ${skillsWeight}) = ${skillsScore * skillsWeight}`)
  console.log(`   Experience Score: ${experienceScore} (weight: ${experienceWeight}) = ${experienceScore * experienceWeight}`)
  console.log(`   Education Score: ${educationScore} (weight: ${educationWeight}) = ${educationScore * educationWeight}`)
  console.log(`   Quality Score: ${qualityScore} (weight: ${qualityWeight}) = ${qualityScore * qualityWeight}`)
  console.log(`   Base Fit Score: ${baseFitScore}`)
  console.log(`   Confidence Bonus: ${confidenceBonus}`)
  console.log(`   Final Fit Score: ${finalFitScore}/100`)
  
  return finalFitScore
}

async function runTests() {
  try {
    console.log("🚀 Starting Improved Scoring System Tests...")
    console.log("=" * 60)
    
    // Test 1: Skill Extraction
    const candidateSkills = await testSkillExtraction()
    
    // Test 2: Skill Matching
    const matchResult = await testSkillMatching(candidateSkills)
    
    // Test 3: Scoring Calculation
    const finalScore = await testScoringCalculation(matchResult, candidateSkills)
    
    console.log("\n🎉 Test Summary:")
    console.log("=" * 50)
    console.log(`   Skills Extracted: ${candidateSkills.length}`)
    console.log(`   Skills Matched: ${matchResult.exactMatches.length + matchResult.synonymMatches.length + matchResult.partialMatches.length}/${testJobDetails.requiredSkills.length}`)
    console.log(`   Match Percentage: ${matchResult.matchPercentage}%`)
    console.log(`   Match Confidence: ${matchResult.confidence}%`)
    console.log(`   Final Fit Score: ${finalScore}/100`)
    
    // Validate improvements
    console.log("\n✅ Validation Results:")
    console.log("=" * 50)
    
    if (candidateSkills.length >= 10) {
      console.log("✅ Skill extraction: GOOD - Found sufficient skills")
    } else {
      console.log("⚠️ Skill extraction: NEEDS IMPROVEMENT - Few skills found")
    }
    
    if (matchResult.matchPercentage >= 60) {
      console.log("✅ Skill matching: GOOD - High match percentage")
    } else {
      console.log("⚠️ Skill matching: NEEDS IMPROVEMENT - Low match percentage")
    }
    
    if (finalScore >= 60) {
      console.log("✅ Final scoring: GOOD - Realistic score achieved")
    } else {
      console.log("⚠️ Final scoring: NEEDS IMPROVEMENT - Score still too low")
    }
    
    console.log("\n🎯 Expected vs Actual:")
    console.log(`   Expected Score Range: 65-85 (for a qualified candidate)`)
    console.log(`   Actual Score: ${finalScore}`)
    console.log(`   Status: ${finalScore >= 65 && finalScore <= 85 ? '✅ WITHIN EXPECTED RANGE' : '⚠️ OUTSIDE EXPECTED RANGE'}`)
    
  } catch (error) {
    console.error("❌ Test failed:", error)
  }
}

// Run the tests
if (require.main === module) {
  runTests()
}

module.exports = {
  testSkillExtraction,
  testSkillMatching,
  testScoringCalculation,
  runTests
}
