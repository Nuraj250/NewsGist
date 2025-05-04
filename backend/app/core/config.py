from transformers import pipeline

class Settings:
    DEFAULT_MODEL_NAME = "facebook/bart-large-cnn"
    MULTI_LANG_MODEL_NAME = "csebuetnlp/mT5_multilingual_XLSum"  # supports 45+ languages

settings = Settings()

def load_summarizer(model_name: str = settings.DEFAULT_MODEL_NAME):
    summarizer = pipeline("summarization", model=model_name)
    return summarizer
