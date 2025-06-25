import { NextRequest, NextResponse } from 'next/server'
import { AdvancedSkillExtractor } from '@/lib/advanced-skill-extractor'

export async function POST(request: NextRequest) {
  console.log("🚀 Advanced Skill Extraction API called")
  
  try {
    const { resumeText, jobContext } = await request.json()
    
    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Resume text is required and must be a string' },
        { status: 400 }
      )
    }

    console.log(`📄 Processing resume text: ${resumeText.length} characters`)
    console.log(`🎯 Job context provided: ${!!jobContext}`)

    // Initialize the advanced skill extractor
    const extractor = new AdvancedSkillExtractor()
    
    // Extract skills using multi-agent system
    const result = await extractor.extractSkills(resumeText, jobContext)
    
    console.log(`✅ Advanced extraction completed:`)
    console.log(`   - Total skills: ${result.skills.length}`)
    console.log(`   - Programming languages: ${result.programmingLanguages.length}`)
    console.log(`   - Frameworks: ${result.frameworks.length}`)
    console.log(`   - Tools: ${result.tools.length}`)
    console.log(`   - Databases: ${result.databases.length}`)
    console.log(`   - Confidence: ${result.confidence}%`)

    return NextResponse.json({
      success: true,
      data: result,
      message: `Successfully extracted ${result.skills.length} skills with ${result.confidence}% confidence using multi-agent system`
    })

  } catch (error) {
    console.error("❌ Advanced skill extraction failed:", error)
    
    return NextResponse.json(
      { 
        error: 'Advanced skill extraction failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        fallback: 'Consider using basic extraction as fallback'
      },
      { status: 500 }
    )
  }
}

// Test endpoint
export async function GET() {
  return NextResponse.json({
    message: "Advanced Skill Extraction API is running",
    version: "1.0.0",
    agents: [
      "Pattern-Based Agent",
      "Contextual Agent", 
      "Semantic Agent (Gemini AI)",
      "Inference Agent",
      "Validation Agent"
    ],
    features: [
      "Multi-agent consensus building",
      "LangGraph-inspired workflow",
      "Semantic analysis with Gemini AI",
      "Contextual skill extraction",
      "Skill categorization",
      "Confidence scoring",
      "Inference-based skill discovery"
    ]
  })
}
