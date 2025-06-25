/**
 * Local Python Extraction Test
 * Run this with: node test-python-local.js
 */

// Simple test cases
const testCases = [
  {
    name: "Simple Python mention",
    text: "I have experience with Python programming.",
    expected: true
  },
  {
    name: "Skills list",
    text: "Technical Skills: Python, JavaScript, Java",
    expected: true
  },
  {
    name: "Bullet point",
    text: "• Programming Languages: Python, JavaScript, Java",
    expected: true
  },
  {
    name: "Experience context",
    text: "Developed applications using Python and Django framework.",
    expected: true
  },
  {
    name: "Different cases",
    text: "PYTHON programming, python scripting, Python development",
    expected: true
  },
  {
    name: "Python with version",
    text: "Python 3.9, Python3, Python 2.7",
    expected: true
  },
  {
    name: "Real resume",
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
    `,
    expected: true
  },
  {
    name: "No Python",
    text: "JavaScript, Java, C#, React, Node.js",
    expected: false
  }
];

// Simple Python detection function
function detectPython(text) {
  const methods = [];
  
  // Method 1: Case-insensitive includes
  if (text.toLowerCase().includes('python')) {
    methods.push('includes');
  }
  
  // Method 2: Word boundary regex
  const wordBoundaryRegex = /\bpython\b/gi;
  if (wordBoundaryRegex.test(text)) {
    methods.push('word-boundary');
  }
  
  // Method 3: Simple regex
  const simpleRegex = /python/gi;
  if (simpleRegex.test(text)) {
    methods.push('simple-regex');
  }
  
  // Method 4: Variations
  const variations = ['python', 'Python', 'PYTHON', 'python3', 'Python 3', 'py'];
  const foundVariations = variations.filter(v => text.toLowerCase().includes(v.toLowerCase()));
  if (foundVariations.length > 0) {
    methods.push(`variations: ${foundVariations.join(', ')}`);
  }
  
  return {
    found: methods.length > 0,
    methods: methods
  };
}

// Enhanced skill extraction
function extractSkills(text) {
  const skills = new Set();
  
  // Common skills to look for
  const commonSkills = [
    'Python', 'JavaScript', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go',
    'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask',
    'HTML', 'CSS', 'SQL', 'MySQL', 'PostgreSQL', 'MongoDB',
    'AWS', 'Azure', 'Docker', 'Git'
  ];
  
  const lowerText = text.toLowerCase();
  
  commonSkills.forEach(skill => {
    // Method 1: Case-insensitive includes
    if (lowerText.includes(skill.toLowerCase())) {
      skills.add(skill);
    }
  });
  
  // Special handling for compound skills
  const compoundSkills = {
    'Node.js': ['nodejs', 'node js', 'node.js'],
    'Vue.js': ['vuejs', 'vue js', 'vue.js', 'vue'],
    'C#': ['c#', 'csharp', 'c sharp'],
    'C++': ['c++', 'cpp', 'cplusplus']
  };
  
  Object.entries(compoundSkills).forEach(([skill, variations]) => {
    for (const variation of variations) {
      if (lowerText.includes(variation.toLowerCase())) {
        skills.add(skill);
        break;
      }
    }
  });
  
  return Array.from(skills);
}

// Run tests
function runTests() {
  console.log('🐍 PYTHON EXTRACTION LOCAL TEST');
  console.log('=' * 50);
  
  let passCount = 0;
  
  testCases.forEach((testCase, index) => {
    console.log(`\n📝 Test ${index + 1}: ${testCase.name}`);
    console.log(`Expected Python: ${testCase.expected ? 'YES' : 'NO'}`);
    
    // Test Python detection
    const pythonResult = detectPython(testCase.text);
    const pythonPassed = pythonResult.found === testCase.expected;
    
    console.log(`Python Detection: ${pythonResult.found ? '✅ FOUND' : '❌ NOT FOUND'} - ${pythonPassed ? 'PASS' : 'FAIL'}`);
    console.log(`Methods used: ${pythonResult.methods.join(', ') || 'None'}`);
    
    // Test full skill extraction
    const allSkills = extractSkills(testCase.text);
    const pythonInSkills = allSkills.some(skill => skill.toLowerCase().includes('python'));
    
    console.log(`All skills found: ${allSkills.join(', ') || 'None'}`);
    console.log(`Python in skills: ${pythonInSkills ? 'YES' : 'NO'}`);
    
    if (pythonPassed) {
      passCount++;
      console.log('✅ TEST PASSED');
    } else {
      console.log('❌ TEST FAILED');
    }
  });
  
  console.log('\n📊 SUMMARY');
  console.log('=' * 30);
  console.log(`Tests passed: ${passCount}/${testCases.length}`);
  console.log(`Success rate: ${Math.round((passCount / testCases.length) * 100)}%`);
  
  if (passCount === testCases.length) {
    console.log('🎉 ALL TESTS PASSED! Python extraction is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Check the implementation.');
  }
}

// Test specific text
function testSpecificText(text) {
  console.log('\n🧪 TESTING SPECIFIC TEXT');
  console.log('=' * 30);
  console.log(`Text: "${text}"`);
  
  const pythonResult = detectPython(text);
  const allSkills = extractSkills(text);
  
  console.log(`Python found: ${pythonResult.found ? 'YES' : 'NO'}`);
  console.log(`Methods: ${pythonResult.methods.join(', ')}`);
  console.log(`All skills: ${allSkills.join(', ')}`);
  
  return {
    pythonFound: pythonResult.found,
    skills: allSkills
  };
}

// Run the tests
runTests();

// Test some specific examples
console.log('\n🔍 ADDITIONAL TESTS');
console.log('=' * 30);

const additionalTests = [
  "Python developer with 5 years experience",
  "PYTHON, JavaScript, Java",
  "• Python\n• JavaScript\n• Java",
  "Experience with python and django",
  "No programming languages mentioned here"
];

additionalTests.forEach((text, index) => {
  console.log(`\nAdditional Test ${index + 1}:`);
  testSpecificText(text);
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    detectPython,
    extractSkills,
    testSpecificText,
    runTests
  };
}
