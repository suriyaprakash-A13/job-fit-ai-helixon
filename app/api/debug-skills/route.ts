import { NextRequest, NextResponse } from 'next/server'
import { AdvancedSkillExtractor } from '@/lib/advanced-skill-extractor'

export async function POST(request: NextRequest) {
  console.log("🐛 Debug Skills API called")
  
  try {
    const { resumeText } = await request.json()
    
    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    console.log("🔍 DEBUGGING SKILL EXTRACTION")
    console.log("=" * 50)
    console.log(`📄 Resume text length: ${resumeText.length}`)
    console.log(`📝 Resume preview: ${resumeText.substring(0, 500)}...`)
    
    // Test simple regex first
    console.log("\n🧪 SIMPLE REGEX TEST:")
    const simpleSkills = ['Python', 'JavaScript', 'Java', 'React', 'SQL', 'HTML', 'CSS']
    const foundSimple: string[] = []
    
    simpleSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill}\\b`, 'gi')
      if (regex.test(resumeText)) {
        foundSimple.push(skill)
        console.log(`✅ Simple regex found: ${skill}`)
      } else {
        console.log(`❌ Simple regex missed: ${skill}`)
      }
    })
    
    // Test case-insensitive includes
    console.log("\n🧪 CASE-INSENSITIVE INCLUDES TEST:")
    const foundIncludes: string[] = []
    
    simpleSkills.forEach(skill => {
      if (resumeText.toLowerCase().includes(skill.toLowerCase())) {
        foundIncludes.push(skill)
        console.log(`✅ Includes found: ${skill}`)
      } else {
        console.log(`❌ Includes missed: ${skill}`)
      }
    })

    // Test advanced extractor
    console.log("\n🤖 ADVANCED EXTRACTOR TEST:")
    const extractor = new AdvancedSkillExtractor()
    const advancedResult = await extractor.extractSkills(resumeText)
    
    console.log(`📊 Advanced extractor results:`)
    console.log(`   - Total skills: ${advancedResult.skills.length}`)
    console.log(`   - Skills: ${advancedResult.skills.join(', ')}`)
    console.log(`   - Confidence: ${advancedResult.confidence}%`)

    return NextResponse.json({
      success: true,
      debug: {
        textLength: resumeText.length,
        textPreview: resumeText.substring(0, 500),
        simpleRegexResults: {
          found: foundSimple,
          count: foundSimple.length
        },
        includesResults: {
          found: foundIncludes,
          count: foundIncludes.length
        },
        advancedResults: {
          skills: advancedResult.skills,
          count: advancedResult.skills.length,
          confidence: advancedResult.confidence,
          programmingLanguages: advancedResult.programmingLanguages,
          frameworks: advancedResult.frameworks,
          tools: advancedResult.tools
        }
      },
      recommendations: [
        foundSimple.length === 0 ? "❌ Simple regex failed - check text format" : "✅ Simple regex working",
        foundIncludes.length === 0 ? "❌ Case-insensitive includes failed - check text content" : "✅ Case-insensitive includes working",
        advancedResult.skills.length === 0 ? "❌ Advanced extractor failed - check agent implementations" : "✅ Advanced extractor working"
      ]
    })

  } catch (error) {
    console.error("❌ Debug skills failed:", error)
    
    return NextResponse.json(
      { 
        error: 'Debug skills failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  const testText = `
John Doe
Software Engineer
Email: john.doe@email.com

TECHNICAL SKILLS:
• Programming Languages: Python, JavaScript, Java
• Frontend: React, HTML, CSS
• Backend: Node.js, Django
• Database: SQL, PostgreSQL
• Cloud: AWS

EXPERIENCE:
Senior Developer | TechCorp | 2020-Present
• Developed applications using Python and React
• Built REST APIs with Django
• Managed databases with PostgreSQL
`

  return NextResponse.json({
    message: "Debug Skills API Test Endpoint",
    testData: {
      text: testText,
      expectedSkills: ["Python", "JavaScript", "Java", "React", "HTML", "CSS", "Node.js", "Django", "SQL", "PostgreSQL", "AWS"]
    },
    usage: {
      endpoint: "POST /api/debug-skills",
      body: { resumeText: "your resume text here" }
    }
  })
}
