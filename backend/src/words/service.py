import json
from pathlib import Path
import random
from typing import Literal, Optional, Tuple

from src.words.schema import WordResponse

WORDS_FILE = Path(__file__).resolve().parent.parent / "data" / "words.json"

with open(WORDS_FILE, encoding="utf-8") as f:
    WORDS = json.load(f)


def get_random_word(level: Literal["A1", "A2", "B1"]) -> Optional[WordResponse]:
    """
    Return a random word from WORDS with the specified level.
    """
    filtered_words = [word for word in WORDS if word["level"] == level]
    if not filtered_words:
        return None

    rand_choice = random.choice(filtered_words)
    to_return = {
        "id": rand_choice["id"],
        "word": rand_choice["word"],
        "level": rand_choice["level"],
        "url": rand_choice["url"],
    }

    return to_return


def get_articles(word_id: str) -> Optional[list[str]]:
    """
    Get the articles for a given word ID.
    """
    word_entry = next((w for w in WORDS if w["id"] == word_id), None)
    if not word_entry:
        return None
    return word_entry["articles"]


def check_article(articles: list, guess: str) -> bool:
    """
    Check if the guessed article is correct.
    """
    return guess.lower() in [a.lower() for a in articles]


def calculate_xp_awarded(id: str, is_correct: bool) -> int:
    """
    Calculate the XP awarded based on whether the answer is correct.
    """
    word_entry = next((w for w in WORDS if w["id"] == id), None)
    if not word_entry:
        return None
    frequency = word_entry["frequency"]

    scalar = 1 if is_correct else -1
    return 100 * frequency * scalar
