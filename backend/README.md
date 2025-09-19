# Backend - Rate den Artikel API 🚀

FastAPI-based backend service for the German article guessing game. Provides RESTful API endpoints for word retrieval and answer validation.

## 🏗️ Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.13+**: Latest Python with type hints
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server for production
- **Pytest**: Testing framework
- **HTTPX**: HTTP client for testing

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.py              # FastAPI application entry point
│   ├── data/
│   │   └── words.json       # German words database (12,000+ entries)
│   └── words/               # Words API module
│       ├── __init__.py
│       ├── router.py        # API route definitions
│       ├── schema.py        # Pydantic models
│       └── service.py       # Business logic
├── tests/
│   └── test_words.py        # API tests
└── pyproject.toml           # Project configuration
```

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- uv package manager

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pip install -e .
   ```

3. **Run the development server**
   ```bash
   python -m uvicorn src.main:app --reload
   ```

The API will be available at `http://localhost:8000`

### Using Make (from project root)
```bash
make install-backend  # Install dependencies
make backend          # Start development server
make test-backend     # Run tests
```

## 📡 API Endpoints

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "healthy"
}
```

### Get Random Word
```http
GET /words/random?level={level}
```

**Parameters:**
- `level` (required): Word difficulty level (`A1`, `A2`, `B1`)

**Response:**
```json
{
  "id": "40b663f5-07d0-43a6-8615-50056ef73d56",
  "word": "Abend",
  "level": "A1",
  "url": "https://www.dwds.de/wb/Abend"
}
```

### Answer Article
```http
POST /words/answer?id={id}&guess={guess}
```

**Parameters:**
- `id` (required): Word ID from random word response
- `guess` (required): Guessed article (`der`, `die`, `das`)

**Response:**
```json
{
  "answer": true,
  "expected": "der",
  "xp_awarded": 10
}
```

**Error Response (404):**
```json
{
  "detail": "Word not found with given ID and word"
}
```

## 📊 Data Model

### Word Entry Structure (words.json)
```json
{
  "id": "unique-uuid",
  "word": "German noun",
  "article": "der|die|das",
  "level": "A1|A2|B1",
  "url": "https://www.dwds.de/wb/word"
}
```

### API Models

**WordResponse**
```python
class WordResponse(BaseModel):
    id: str           # Unique identifier
    word: str         # German noun
    level: str        # Difficulty level
    url: str          # Dictionary URL
```

**AnswerArticleResponse**
```python
class AnswerArticleResponse(BaseModel):
    answer: bool      # Whether guess was correct
    expected: str     # Correct article
    xp_awarded: int   # Experience points awarded
```

## 🧪 Testing

Run the test suite:
```bash
python -m pytest tests/ -v
```

Test coverage includes:
- Random word retrieval for all levels
- Article checking with correct/incorrect answers
- Error handling for invalid requests
- Health check endpoint

## 🔧 Configuration

### CORS Settings
The API is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)

To modify CORS settings, edit `src/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your domains
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Environment Variables
Currently, the backend doesn't require environment variables, but you can add them for:
- Database configuration
- External API keys
- Logging levels

## 📈 Performance

- **Database**: In-memory JSON loading for fast word retrieval
- **Response Time**: Sub-millisecond response times for word operations
- **Scalability**: Stateless design allows horizontal scaling
- **Caching**: Words are loaded once at startup

## 🔒 Security Features

- **Input Validation**: Pydantic models ensure type safety
- **CORS Protection**: Configured for specific origins
- **Error Handling**: Proper HTTP status codes
- **Type Safety**: Full type annotations throughout

## 🚀 Production Deployment

### Using Uvicorn
```bash
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

### Using Docker (example)
```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY . .
RUN pip install -e .
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Install development dependencies
2. Write tests for new features
3. Ensure all tests pass
4. Follow type hints and docstring conventions
5. Update API documentation if needed

## 📝 API Documentation

When running the development server, interactive API documentation is available at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

**Built with ❤️ using FastAPI**