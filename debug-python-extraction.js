/**
 * Debug script specifically for Python skill extraction
 * This will help identify why Python is not being extracted
 */

// Test resume texts with Python mentioned in different ways
const testCases = [
  {
    name: "Simple Python mention",
    text: "I have experience with Python programming."
  },
  {
    name: "Skills list with Python",
    text: "Technical Skills: Python, JavaScript, Java"
  },
  {
    name: "Bullet point with Python",
    text: "• Programming Languages: Python, JavaScript, Java"
  },
  {
    name: "Experience with Python",
    text: "Developed applications using Python and Django framework."
  },
  {
    name: "Python in different case",
    text: "PYTHON programming language experience"
  },
  {
    name: "Python with version",
    text: "Python 3.9, JavaScript ES6"
  },
  {
    name: "Real resume format",
    text: `
John Doe
Software Engineer

TECHNICAL SKILLS:
• Programming Languages: Python, JavaScript, Java
• Frameworks: Django, React, Node.js
• Databases: PostgreSQL, MongoDB

EXPERIENCE:
Senior Developer | TechCorp | 2020-Present
• Developed web applications using Python and Django
• Built REST APIs with Python Flask
• Data analysis with Python pandas
    `
  }
];

function testPythonExtraction() {
  console.log("🐍 PYTHON EXTRACTION DEBUG TEST");
  console.log("=" * 50);

  testCases.forEach((testCase, index) => {
    console.log(`\n📝 Test Case ${index + 1}: ${testCase.name}`);
    console.log(`Text: "${testCase.text}"`);
    
    // Test 1: Simple regex with word boundaries
    const wordBoundaryRegex = /\bPython\b/gi;
    const wordBoundaryMatch = wordBoundaryRegex.test(testCase.text);
    console.log(`✓ Word boundary regex (/\\bPython\\b/gi): ${wordBoundaryMatch ? '✅ FOUND' : '❌ NOT FOUND'}`);
    
    // Test 2: Case-insensitive includes
    const includesMatch = testCase.text.toLowerCase().includes('python');
    console.log(`✓ Case-insensitive includes: ${includesMatch ? '✅ FOUND' : '❌ NOT FOUND'}`);
    
    // Test 3: Simple regex without word boundaries
    const simpleRegex = /python/gi;
    const simpleMatch = simpleRegex.test(testCase.text);
    console.log(`✓ Simple regex (/python/gi): ${simpleMatch ? '✅ FOUND' : '❌ NOT FOUND'}`);
    
    // Test 4: Global match to find all occurrences
    const globalMatches = testCase.text.match(/python/gi);
    console.log(`✓ Global matches: ${globalMatches ? `✅ FOUND ${globalMatches.length} times: [${globalMatches.join(', ')}]` : '❌ NOT FOUND'}`);
    
    // Test 5: Check for hidden characters
    const pythonIndex = testCase.text.toLowerCase().indexOf('python');
    if (pythonIndex !== -1) {
      const surroundingText = testCase.text.substring(Math.max(0, pythonIndex - 10), pythonIndex + 16);
      console.log(`✓ Found at index ${pythonIndex}, surrounding text: "${surroundingText}"`);
      
      // Check for special characters around Python
      const charBefore = pythonIndex > 0 ? testCase.text.charCodeAt(pythonIndex - 1) : null;
      const charAfter = pythonIndex + 6 < testCase.text.length ? testCase.text.charCodeAt(pythonIndex + 6) : null;
      console.log(`✓ Character codes - Before: ${charBefore}, After: ${charAfter}`);
    }
  });
  
  console.log("\n🔧 RECOMMENDED FIXES:");
  console.log("1. Use case-insensitive includes as primary method");
  console.log("2. Add fallback patterns for different formats");
  console.log("3. Clean text before processing (remove special chars)");
  console.log("4. Use multiple extraction strategies");
}

// Enhanced Python extraction function
function extractPythonRobust(text) {
  console.log("\n🔧 ROBUST PYTHON EXTRACTION TEST");
  const pythonVariations = [
    'Python',
    'python', 
    'PYTHON',
    'Python 3',
    'Python3',
    'Python 2',
    'Python2'
  ];
  
  const foundVariations = [];
  
  // Method 1: Direct includes check
  pythonVariations.forEach(variation => {
    if (text.toLowerCase().includes(variation.toLowerCase())) {
      foundVariations.push(`includes: ${variation}`);
    }
  });
  
  // Method 2: Regex patterns
  const regexPatterns = [
    /\bpython\b/gi,
    /python/gi,
    /python\s*\d*/gi,
    /python\s*[23]\.?\d*/gi
  ];
  
  regexPatterns.forEach((pattern, index) => {
    const matches = text.match(pattern);
    if (matches) {
      foundVariations.push(`regex${index + 1}: ${matches.join(', ')}`);
    }
  });
  
  // Method 3: Position-based search
  const positions = [];
  let searchText = text.toLowerCase();
  let pos = searchText.indexOf('python');
  while (pos !== -1) {
    positions.push(pos);
    pos = searchText.indexOf('python', pos + 1);
  }
  
  if (positions.length > 0) {
    foundVariations.push(`positions: ${positions.join(', ')}`);
  }
  
  console.log(`🐍 Python extraction results: ${foundVariations.length > 0 ? foundVariations.join(' | ') : 'NOT FOUND'}`);
  return foundVariations.length > 0;
}

// Test all cases
testPythonExtraction();

// Test robust extraction on all cases
console.log("\n" + "=" * 50);
testCases.forEach((testCase, index) => {
  console.log(`\nRobust test ${index + 1}: ${testCase.name}`);
  extractPythonRobust(testCase.text);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testPythonExtraction, extractPythonRobust, testCases };
}
