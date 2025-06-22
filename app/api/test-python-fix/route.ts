import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log("🐍 Python Fix Test API called")
  
  try {
    const { resumeText } = await request.json()
    
    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    console.log("🧪 TESTING PYTHON EXTRACTION FIX")
    console.log("=" * 50)
    console.log(`📄 Resume text length: ${resumeText.length}`)
    console.log(`📝 Resume preview: ${resumeText.substring(0, 300)}...`)
    
    // Test 1: Simple case-insensitive includes
    const lowerText = resumeText.toLowerCase()
    const pythonIncludesTest = lowerText.includes('python')
    console.log(`🔍 Test 1 - Simple includes: ${pythonIncludesTest ? '✅ FOUND' : '❌ NOT FOUND'}`)
    
    // Test 2: Python variations
    const pythonVariations = ['python', 'Python', 'PYTHON', 'python3', 'Python 3', 'py']
    const foundVariations: string[] = []
    pythonVariations.forEach(variation => {
      if (lowerText.includes(variation.toLowerCase())) {
        foundVariations.push(variation)
      }
    })
    console.log(`🔍 Test 2 - Variations: Found ${foundVariations.length} variations: ${foundVariations.join(', ')}`)
    
    // Test 3: Enhanced skill extraction function
    const enhancedSkills = enhancedSkillExtraction(resumeText)
    const pythonInEnhanced = enhancedSkills.includes('Python')
    console.log(`🔍 Test 3 - Enhanced extraction: ${pythonInEnhanced ? '✅ FOUND' : '❌ NOT FOUND'}`)
    console.log(`📊 Enhanced found ${enhancedSkills.length} skills: ${enhancedSkills.join(', ')}`)
    
    // Test 4: Context-based detection
    const pythonContexts = [
      /experience\s+(?:with|in|using)\s+python/gi,
      /developed?\s+(?:with|using|in)\s+python/gi,
      /programming\s+languages?[:\s]+[^.]*python/gi,
      /skills?[:\s]+[^.]*python/gi
    ]
    
    const contextMatches: string[] = []
    pythonContexts.forEach((pattern, index) => {
      if (pattern.test(resumeText)) {
        contextMatches.push(`Context ${index + 1}`)
      }
    })
    console.log(`🔍 Test 4 - Context detection: Found ${contextMatches.length} context matches: ${contextMatches.join(', ')}`)

    return NextResponse.json({
      success: true,
      pythonDetectionResults: {
        simpleIncludes: pythonIncludesTest,
        variationsFound: foundVariations,
        enhancedExtraction: {
          pythonFound: pythonInEnhanced,
          allSkills: enhancedSkills,
          skillCount: enhancedSkills.length
        },
        contextMatches: contextMatches,
        overallResult: pythonIncludesTest || foundVariations.length > 0 || pythonInEnhanced || contextMatches.length > 0
      },
      analysis: {
        textLength: resumeText.length,
        pythonMentions: (resumeText.match(/python/gi) || []).length,
        recommendedAction: pythonIncludesTest ? "✅ Python detection working correctly" : "❌ Python not detected - check text content"
      },
      debugInfo: {
        textPreview: resumeText.substring(0, 500),
        lowerTextIncludes: lowerText.includes('python'),
        exactMatches: resumeText.match(/python/gi) || []
      }
    })

  } catch (error) {
    console.error("❌ Python fix test failed:", error)
    
    return NextResponse.json(
      { 
        error: 'Python fix test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Enhanced skill extraction function (copied from pdf-extractor for testing)
function enhancedSkillExtraction(text: string): string[] {
  console.log("🔧 Enhanced skill extraction with bulletproof Python detection...")
  
  const skills = new Set<string>()
  
  // Critical skills that must be detected
  const criticalSkills = [
    'Python', 'JavaScript', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'TypeScript',
    'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring',
    'HTML', 'CSS', 'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
    'AWS', 'Azure', 'Docker', 'Git', 'Machine Learning', 'Deep Learning'
  ]
  
  const lowerText = text.toLowerCase()
  
  // Method 1: Case-insensitive includes (most reliable for Python)
  criticalSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      skills.add(skill)
      console.log(`✅ Enhanced extraction found: ${skill}`)
    }
  })
  
  // Method 2: Special Python variations
  const pythonVariations = ['python', 'Python', 'PYTHON', 'python3', 'Python 3', 'py']
  pythonVariations.forEach(variation => {
    if (lowerText.includes(variation.toLowerCase()) && !skills.has('Python')) {
      skills.add('Python')
      console.log(`✅ Enhanced extraction found Python (variation: ${variation})`)
    }
  })
  
  // Method 3: Context-based detection for Python
  const pythonContexts = [
    /experience\s+(?:with|in|using)\s+python/gi,
    /developed?\s+(?:with|using|in)\s+python/gi,
    /programming\s+languages?[:\s]+[^.]*python/gi,
    /skills?[:\s]+[^.]*python/gi
  ]
  
  pythonContexts.forEach(pattern => {
    if (pattern.test(text) && !skills.has('Python')) {
      skills.add('Python')
      console.log(`✅ Enhanced extraction found Python (context)`)
    }
  })
  
  const result = Array.from(skills)
  console.log(`🔧 Enhanced extraction found ${result.length} skills: ${result.join(', ')}`)
  return result
}

export async function GET() {
  const testText = `
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

  return NextResponse.json({
    message: "Python Fix Test Endpoint",
    testData: {
      text: testText,
      expectedResult: "Should find Python in multiple ways"
    },
    usage: {
      endpoint: "POST /api/test-python-fix",
      body: { resumeText: "your resume text here" }
    },
    features: [
      "Simple case-insensitive includes test",
      "Python variations detection",
      "Enhanced skill extraction",
      "Context-based detection",
      "Comprehensive debugging info"
    ]
  })
}
