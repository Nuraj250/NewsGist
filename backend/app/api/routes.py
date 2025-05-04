from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.summarizer import summarize_text

router = APIRouter()

class SummarizeRequest(BaseModel):
    text: str
    use_multilang: bool = False

class SummarizeResponse(BaseModel):
    summary: str

@router.post("/summarize", response_model=SummarizeResponse)
async def summarize(request: SummarizeRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")
    try:
        summary = summarize_text(request.text, use_multilang=request.use_multilang)
        return SummarizeResponse(summary=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

