# JobFit.AI - Complete File Structure

## 📁 Source Code Organization

### Frontend Components (`/components`)
```
components/
├── steps/
│   ├── step-one.tsx              # File upload interface
│   ├── step-two.tsx              # Job requirements form
│   ├── step-three-extraction.tsx # Resume extraction UI
│   ├── step-three.tsx            # Multi-agent analysis
│   └── step-four.tsx             # Results display
├── ui/                           # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── progress.tsx
│   └── [other UI components]
└── theme-provider.tsx            # Theme management
```

### Backend API Routes (`/app/api`)
```
app/api/
├── analyze-extracted-resumes/    # Main analysis endpoint
├── extract-pdf/                  # PDF text extraction
├── extract-skills-advanced/      # Advanced skill extraction
├── process-resumes/              # Resume processing
├── process-with-rag/             # LangChain RAG processing
├── test-bulletproof/             # Skill extraction testing
└── test-python-fix/              # Python detection testing
```

### Core Libraries (`/lib`)
```
lib/
├── gemini-client.ts              # Google Gemini AI integration
├── enhanced-skill-matcher.ts     # Intelligent skill matching
├── bulletproof-skill-extractor.ts # Robust skill extraction
├── advanced-skill-extractor.ts   # Multi-agent skill extraction
├── extraction-agents.ts          # Individual extraction agents
├── pdf-extractor.ts              # PDF processing utilities
└── utils.ts                      # Common utilities
```

### Application Structure (`/app`)
```
app/
├── globals.css                   # Global styles
├── layout.tsx                    # Root layout component
└── page.tsx                      # Main application page
```

## 📋 Configuration Files

### Package Management
- `package.json` - Node.js dependencies and scripts
- `package-lock.json` - Locked dependency versions
- `pnpm-lock.yaml` - PNPM lock file
- `requirements.txt` - Python dependencies (optional)

### Build Configuration
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `components.json` - UI components configuration

### Development Tools
- `.eslintrc.json` - ESLint configuration (if present)
- `.gitignore` - Git ignore rules
- `next-env.d.ts` - Next.js TypeScript declarations

## 📚 Documentation Files

### Project Documentation
- `README.md` - Main project documentation
- `PROJECT_SUMMARY.md` - 20-line project summary
- `SETUP_INSTRUCTIONS.md` - Installation and setup guide
- `SCORING_IMPROVEMENTS.md` - Detailed scoring enhancements
- `ENHANCED_SYSTEM_DOCUMENTATION.md` - System architecture
- `ADVANCED_SKILL_EXTRACTION.md` - Skill extraction details

### Presentation Materials
- `PRESENTATION_SCRIPT.md` - Complete presentation script
- `EXECUTIVE_SUMMARY.md` - Business summary for stakeholders

## 🧪 Testing Files
- `test-improved-scoring.js` - Scoring system validation
- `test-enhanced-system.js` - System integration tests
- `test-advanced-extraction.js` - Skill extraction tests
- `debug-python-extraction.js` - Python detection debugging

## 🎨 Static Assets (`/public`)
```
public/
├── placeholder-logo.png
├── placeholder-logo.svg
├── placeholder-user.jpg
├── placeholder.jpg
├── placeholder.svg
└── test-skill-extraction.html
```

## 🔧 Utility Files
- `hooks/use-mobile.tsx` - Mobile detection hook
- `hooks/use-toast.ts` - Toast notification hook
- `styles/globals.css` - Additional global styles

## 📦 Dependencies Overview

### Core Dependencies
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **LangChain** - RAG processing
- **Radix UI** - Component library

### AI/ML Dependencies
- **Google Gemini** - AI analysis
- **PDF Processing** - pdf-parse, pdf-parse-fork
- **Vector Stores** - LangChain memory stores

### Development Dependencies
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Key Features by File

### Multi-Agent System
- `step-three.tsx` - Orchestrates 4 AI agents
- `gemini-client.ts` - AI analysis implementation
- `enhanced-skill-matcher.ts` - Intelligent matching

### Skill Extraction
- `bulletproof-skill-extractor.ts` - Robust extraction
- `advanced-skill-extractor.ts` - Multi-agent approach
- `extraction-agents.ts` - Individual agent implementations

### PDF Processing
- `pdf-extractor.ts` - Document processing
- `process-with-rag/route.ts` - LangChain integration
- `extract-pdf/route.ts` - Text extraction API

### User Interface
- `step-one.tsx` - File upload with drag-and-drop
- `step-two.tsx` - Job requirements form
- `step-four.tsx` - Results visualization

This structure provides a complete, production-ready resume screening system with advanced AI capabilities and a modern user interface.
