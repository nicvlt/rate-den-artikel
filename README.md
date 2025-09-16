# Rate den Artikel 🇩🇪

A fun and interactive German language learning game where you guess the correct article (der, die, das) for German nouns. Perfect for German language learners at A1, A2, and B1 levels.

## 🎯 What is this?

"Rate den Artikel" (Guess the Article) is a web-based language learning tool that helps you master one of the most challenging aspects of German grammar: noun articles. The app presents you with German words and challenges you to choose the correct definite article.

## ✨ Features

- 🎲 **Random Word Selection**: Get random German nouns from different difficulty levels
- 🎯 **Instant Feedback**: Immediate visual feedback on correct/incorrect answers
- 🔗 **Dictionary Integration**: Click on words to view definitions on DWDS
- 🚀 **Fast API Backend**: High-performance FastAPI backend with comprehensive word database

## 🏗️ Architecture

This is a full-stack application with:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: JSON file with 1,500+ German words
- **Development**: Make-based workflow for easy development

## 🚀 Quick Start

### Prerequisites

- Python 3.13+
- Node.js 18+
- Make (or run commands manually)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nicvlt/rate-den-artikel.git
   cd rate-den-artikel
   ```

2. **Install backend dependencies**
   ```bash
   make install-backend
   ```

3. **Install frontend dependencies**
   ```bash
   make install-frontend
   ```

4. **Start development servers**
   ```bash
   make dev
   ```

This will open two terminals:
- Backend server at `http://localhost:8000`
- Frontend development server at `http://localhost:5173`

### Manual Setup (Alternative)

**Backend:**
```bash
cd backend
pip install -e .
python -m uvicorn src.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🎮 How to Play

1. A German word appears on screen
2. Choose the correct article: **DER**, **DIE**, or **DAS**
3. Get instant feedback with color-coded results:
   - 🟢 Green: Correct answer
   - 🔴 Red: Your incorrect guess
4. Click the word to see its definition
5. Click the arrow to get a new word

## 📁 Project Structure

```
rate-den-artikel/
├── backend/              # FastAPI backend
│   ├── src/
│   │   ├── main.py      # FastAPI application
│   │   ├── data/        # Word database (JSON)
│   │   └── words/       # Words API module
│   └── tests/           # Backend tests
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── ui/         # UI components
│   └── public/         # Static assets
└── Makefile            # Development commands
```

## 🧪 Testing

Run backend tests:
```bash
make test-backend
```

## 🌐 API Endpoints

- `GET /words/random?level={A1|A2|B1}` - Get a random word
- `POST /words/check?id={id}&guess={der|die|das}` - Check answer
- `GET /health` - Health check

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

If you have questions or run into issues, please open an issue on GitHub.

---

**Happy learning! Viel Erfolg beim Deutschlernen! 🎉**