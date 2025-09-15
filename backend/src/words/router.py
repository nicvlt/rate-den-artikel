from fastapi import APIRouter, HTTPException
from typing import Literal


from src.words.schema import CheckArticleResponse, WordResponse
from src.words.service import check_article, get_random_word

router = APIRouter(prefix="/words", tags=["words"])


@router.get("/random", response_model=WordResponse)
async def random_word(level: Literal["A1", "A2", "B1"]):
    word_object = get_random_word(level)
    if not word_object:
        raise HTTPException(status_code=404, detail="No words found for this level")
    return word_object


@router.post("/check", response_model=CheckArticleResponse)
async def check_article_endpoint(
    word_id: str, word: str, guessed_article: Literal["der", "die", "das"]
):
    correct = check_article(word_id, word, guessed_article)
    if correct is None:
        raise HTTPException(
            status_code=404, detail="Word not found with given ID and word"
        )
    return {"correct": correct}
