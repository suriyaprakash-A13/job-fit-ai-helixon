import { NextRequest, NextResponse } from 'next/server'
import { BulletproofSkillExtractor, quickSkillTest, testPythonInText } from '@/lib/bulletproof-skill-extractor'

export async function POST(request: NextRequest) {
  console.log("🛡️ Bulletproof Skill Extractor Test API called")
  
  try {
    const { resumeText } = await request.json()
    
    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    console.log("🧪 TESTING BULLETPROOF SKILL EXTRACTION")
    console.log("=" * 50)
    console.log(`📄 Resume text length: ${resumeText.length}`)
    console.log(`📝 Resume preview: ${resumeText.substring(0, 300)}...`)
    
    // Test Python specifically
    const pythonFound = testPythonInText(resumeText)
    console.log(`🐍 Python test result: ${pythonFound ? '✅ FOUND' : '❌ NOT FOUND'}`)
    
    // Full bulletproof extraction
    const extractor = new BulletproofSkillExtractor()
    const result = extractor.extract(resumeText)
    
    // Quick test
    const quickResult = quickSkillTest(resumeText)
    
    console.log(`📊 Bulletproof results:`)
    console.log(`   - Total skills: ${result.skills.length}`)
    console.log(`   - Skills: ${result.skills.join(', ')}`)
    console.log(`   - Confidence: ${result.confidence}%`)
    console.log(`   - Python found: ${result.skills.includes('Python') ? 'YES' : 'NO'}`)

    return NextResponse.json({
      success: true,
      pythonSpecificTest: pythonFound,
      bulletproofResult: {
        skills: result.skills,
        confidence: result.confidence,
        method: result.method,
        pythonFound: result.skills.includes('Python'),
        debug: result.debug
      },
      quickTest: {
        skills: quickResult,
        pythonFound: quickResult.includes('Python')
      },
      analysis: {
        textLength: resumeText.length,
        skillsFound: result.skills.length,
        pythonDetected: result.skills.includes('Python'),
        commonSkillsFound: result.skills.filter(skill => 
          ['Python', 'JavaScript', 'Java', 'React', 'SQL', 'HTML', 'CSS'].includes(skill)
        ),
        extractionMethods: {
          byIncludes: result.debug.foundByIncludes.length,
          byRegex: result.debug.foundByRegex.length,
          byVariations: result.debug.foundByVariations.length
        }
      },
      recommendations: [
        result.skills.length === 0 ? "❌ No skills found - check text format" : "✅ Skills detected successfully",
        pythonFound ? "✅ Python detection working" : "❌ Python not detected - check text content",
        result.confidence > 70 ? "✅ High confidence extraction" : "⚠️ Low confidence - manual review recommended"
      ]
    })

  } catch (error) {
    console.error("❌ Bulletproof test failed:", error)
    
    return NextResponse.json(
      { 
        error: 'Bulletproof test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  const testTexts = [
    {
      name: "Simple Python mention",
      text: "I have 5 years of experience with Python programming and web development."
    },
    {
      name: "Skills list format",
      text: "Technical Skills: Python, JavaScript, React, Node.js, SQL, HTML, CSS"
    },
    {
      name: "Real resume format",
      text: `
John Doe
Software Engineer
Email: john.doe@email.com

TECHNICAL SKILLS:
• Programming Languages: Python, JavaScript, Java
• Frontend: React, HTML, CSS
• Backend: Django, Node.js
• Database: PostgreSQL, MongoDB

EXPERIENCE:
Senior Developer | TechCorp | 2020-Present
• Developed web applications using Python and Django
• Built REST APIs with Python Flask
• Frontend development with React and JavaScript
      `
    }
  ]

  // Test all cases
  const extractor = new BulletproofSkillExtractor()
  const testResults = testTexts.map(testCase => {
    const result = extractor.extract(testCase.text)
    return {
      name: testCase.name,
      skillsFound: result.skills.length,
      pythonFound: result.skills.includes('Python'),
      skills: result.skills,
      confidence: result.confidence
    }
  })

  return NextResponse.json({
    message: "Bulletproof Skill Extractor Test Endpoint",
    testResults,
    usage: {
      endpoint: "POST /api/test-bulletproof",
      body: { resumeText: "your resume text here" }
    },
    features: [
      "Case-insensitive includes matching",
      "Regex with word boundaries",
      "Skill variations and misspellings",
      "Critical skills special handling",
      "Context-based detection",
      "Python-specific testing"
    ]
  })
}
