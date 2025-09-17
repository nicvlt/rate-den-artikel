from pydantic import BaseModel


class WordResponse(BaseModel):
    id: str
    word: str
    level: str
    url: str


class AnswerArticleResponse(BaseModel):
    answer: bool
    expected: str
    xp_awarded: int
