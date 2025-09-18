import pytest
from fastapi.testclient import TestClient
from src.main import app  # import your FastAPI app

client = TestClient(app)

SAMPLE_WORDS = [
    {
        "id": "a00debc6-bf2a-400f-aeff-db358c3804d7",
        "word": "Butter",
        "articles": ["die"],
        "level": "A1",
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
    "guess,answer,expected",
    [("das", False, ["die"]), ("der", False, ["die"]), ("die", True, ["die"])],
)
def test_check_article(guess, answer, expected):
    word_id = SAMPLE_WORDS[0]["id"]
    response = client.post(
        "/words/answer",
        params={
            "id": word_id,
            "guess": guess,
        },
    )
    assert response.status_code == 200
    data = response.json()
    # Check keys
    assert "answer" in data
    assert "expected" in data
    assert "xp_awarded" in data
    # Check values
    assert answer == data["answer"]
    assert expected == data["expected"]
    if answer:
        assert data["xp_awarded"] > 0
    else:
        assert data["xp_awarded"] < 0


def test_check_nonexistent_word():
    response = client.post(
        "/words/answer",
        params={
            "id": "nonexistent-uuid",
            "guess": "der",
        },
    )
    # Should return 404 since word does not exist
    assert response.status_code == 404
