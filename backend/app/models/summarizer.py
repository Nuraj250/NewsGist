from app.core.config import load_summarizer, settings

default_summarizer = load_summarizer(settings.DEFAULT_MODEL_NAME)
multi_lang_summarizer = load_summarizer(settings.MULTI_LANG_MODEL_NAME)

def summarize_text(text: str, use_multilang: bool = False, max_length: int = 150, min_length: int = 30) -> str:
    summarizer = multi_lang_summarizer if use_multilang else default_summarizer
    summary = summarizer(
        text,
        max_length=max_length,
        min_length=min_length,
        do_sample=False
    )
    return summary[0]['summary_text']
