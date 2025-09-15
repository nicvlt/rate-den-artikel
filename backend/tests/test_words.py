import pytest
from fastapi.testclient import TestClient
from src.main import app  # import your FastAPI app

client = TestClient(app)

# Sample valid UUIDs from your dataset
SAMPLE_WORDS = [
    {
        "id": "a00debc6-bf2a-400f-aeff-db358c3804d7",
        "wort": "Butter",
        "artikel": "die",
        "niveau": "A1",
        "url": "https://www.dwds.de/wb/Butter",
    }
]


@pytest.mark.parametrize("level", ["A1", "A2", "B1"])
def test_random_word(level):
    response = client.get(f"/words/random?level={level}")
    assert response.status_code == 200
    data = response.json()
    # Check keys
    assert "id" in data
    assert "word" in data
    assert "level" in data
    assert "url" in data
    # Check level matches request
    assert data["level"] == level


@pytest.mark.parametrize(
    "guessed_article,expected", [("das", False), ("der", False), ("die", True)]
)
def test_check_article(guessed_article, expected):
    word_id = SAMPLE_WORDS[0]["id"]
    response = client.post(
        "/words/check",
        params={
            "word_id": word_id,
            "word": SAMPLE_WORDS[0]["wort"],
            "guessed_article": guessed_article,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "correct" in data
    assert data["correct"] is expected


def test_check_nonexistent_word():
    response = client.post(
        "/words/check",
        params={
            "word_id": "nonexistent-uuid",
            "word": "FakeWord",
            "guessed_article": "der",
        },
    )
    # Should return 404 since word does not exist
    assert response.status_code == 404
