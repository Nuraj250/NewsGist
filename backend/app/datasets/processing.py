# This will be used to clean Kaggle datasets if you need
# Simple example for now

import pandas as pd
import os

RAW_DATA_DIR = os.path.join(os.path.dirname(__file__), 'raw')
PROCESSED_DATA_DIR = os.path.join(os.path.dirname(__file__), 'processed')

def clean_dataset(filename: str):
    raw_path = os.path.join(RAW_DATA_DIR, filename)
    df = pd.read_csv(raw_path)

    # Example cleaning
    df = df.dropna(subset=["text"])
    df = df[df["text"].str.strip() != ""]

    os.makedirs(PROCESSED_DATA_DIR, exist_ok=True)
    processed_path = os.path.join(PROCESSED_DATA_DIR, filename)
    df.to_csv(processed_path, index=False)
    print(f"Saved cleaned dataset to {processed_path}")

# Example usage:
# clean_dataset('kaggle_news.csv')
