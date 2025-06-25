import { NextRequest, NextResponse } from 'next/server'
import { extractTextFromFileAdvanced } from '@/lib/pdf-extractor'

export async function POST(request: NextRequest) {
  console.log("🚀 Advanced PDF Extraction API called")
  
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const jobContextStr = formData.get('jobContext') as string
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log(`📄 Processing file: ${file.name} (${file.size} bytes)`)
    console.log(`🎯 Job context provided: ${!!jobContextStr}`)

    // Parse job context if provided
    let jobContext = null
    if (jobContextStr) {
      try {
        jobContext = JSON.parse(jobContextStr)
        console.log(`📋 Job context: ${jobContext.jobTitle || 'Unknown'} with ${jobContext.requiredSkills?.length || 0} required skills`)
      } catch (error) {
        console.warn("⚠️ Failed to parse job context, proceeding without it")
      }
    }

    // Extract using advanced multi-agent system
    const result = await extractTextFromFileAdvanced(file, jobContext)
    
    console.log(`✅ Advanced extraction completed for ${file.name}`)
    console.log(`📊 Results:`)
    console.log(`   - Text length: ${result.text.length} characters`)
    console.log(`   - Skills found: ${result.extractedData.skills.length}`)
    console.log(`   - Programming languages: ${result.extractedData.programmingLanguages.length}`)
    console.log(`   - Frameworks: ${result.extractedData.frameworks.length}`)
    console.log(`   - Tools: ${result.extractedData.tools.length}`)
    console.log(`   - Confidence: ${result.metadata.confidence || 'N/A'}%`)

    return NextResponse.json({
      success: true,
      text: result.text,
      length: result.text.length,
      pageCount: result.metadata.pageCount,
      chunks: result.chunks.map(chunk => ({
        content: chunk.pageContent,
        metadata: chunk.metadata
      })),
      structuredData: result.extractedData,
      extractionMethod: result.metadata.extractionMethod || 'advanced-multi-agent',
      confidence: result.metadata.confidence || 85,
      hasEmail: !!result.extractedData.email,
      hasPhone: !!result.extractedData.phone,
      foundSkills: result.extractedData.skills,
      advancedFeatures: {
        multiAgentExtraction: true,
        semanticAnalysis: true,
        contextualInference: true,
        skillCategorization: true
      }
    })

  } catch (error) {
    console.error("❌ Advanced PDF extraction failed:", error)
    
    return NextResponse.json(
      { 
        error: 'Advanced PDF extraction failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        fallback: 'Consider using basic extraction endpoint'
      },
      { status: 500 }
    )
  }
}

// Test endpoint
export async function GET() {
  return NextResponse.json({
    message: "Advanced PDF Extraction API is running",
    version: "2.0.0",
    features: [
      "Multi-agent skill extraction",
      "LangGraph-inspired workflow", 
      "Semantic analysis with Gemini AI",
      "Contextual skill inference",
      "Advanced skill categorization",
      "Enhanced confidence scoring",
      "Job context awareness"
    ],
    agents: [
      "Pattern-Based Agent",
      "Contextual Agent",
      "Semantic Agent (Gemini AI)",
      "Inference Agent", 
      "Validation Agent"
    ]
  })
}
