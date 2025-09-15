from pydantic import BaseModel


class WordResponse(BaseModel):
    id: str
    word: str
    level: str
    url: str


class CheckArticleResponse(BaseModel):
    correct: bool
