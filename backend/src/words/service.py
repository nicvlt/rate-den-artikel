import json
from pathlib import Path
import random
from typing import Literal, Optional

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


def check_article(id: str, guess: str) -> Optional[bool]:
    """
    Check if the guessed article is correct.
    """
    word_entry = next((w for w in WORDS if w["id"] == id), None)
    if not word_entry:
        return None

    return (
        word_entry["article"].lower() == guess.lower(),
        word_entry["article"].lower(),
    )


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
