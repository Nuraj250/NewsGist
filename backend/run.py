from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="NewsGist Summarizer API",
    description="Summarizes news articles using Hugging Face NLP models.",
    version="1.0.0"
)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
