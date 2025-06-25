# JobFit.AI - Setup Instructions

## 📋 Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Google Gemini API key

## 🚀 Quick Start

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd JobFit.AI-main
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 📁 Project Structure
```
JobFit.AI-main/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── steps/            # Multi-step workflow components
│   └── ui/               # Reusable UI components
├── lib/                  # Core libraries and utilities
│   ├── gemini-client.ts  # AI analysis client
│   ├── enhanced-skill-matcher.ts  # Skill matching engine
│   ├── bulletproof-skill-extractor.ts  # Skill extraction
│   └── pdf-extractor.ts  # PDF processing
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🔧 Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🧪 Testing
Run the test scripts to validate functionality:
```bash
node test-improved-scoring.js
node test-enhanced-system.js
```

## 📝 Usage Flow
1. **Upload Resumes**: Drag and drop PDF files
2. **Define Job Requirements**: Set required skills and experience
3. **AI Processing**: Multi-agent analysis processes resumes
4. **Review Results**: View ranked candidates with detailed scoring
5. **Export Data**: Download results for further analysis

## 🔍 Key Features
- **Multi-Agent AI**: 4 specialized agents for comprehensive evaluation
- **Enhanced Skill Matching**: 200+ skill variations and synonyms
- **Real-time Processing**: Live progress updates during analysis
- **Transparent Scoring**: Detailed explanations for all decisions
- **Responsive Design**: Works on desktop and mobile devices

## 🐛 Troubleshooting
- **API Key Issues**: Ensure GOOGLE_GEMINI_API_KEY is set correctly
- **PDF Processing Errors**: Check file format and size (max 10MB)
- **Slow Processing**: Large files may take longer to process
- **Build Errors**: Run `npm install` to ensure all dependencies are installed
