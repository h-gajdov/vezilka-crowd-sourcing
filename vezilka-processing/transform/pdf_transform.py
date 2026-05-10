import fitz
import uuid
import pandas as pd

from image_to_text.image_to_text import transform
from datasets import Dataset
from PIL import Image

CHUNK_SIZE = 1000 # characters per chunk
OVERLAP = 200 # keeps context between chunks
OCR_PAGES = True

def ocr_page(page):
    pix = page.get_pixmap()
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    return transform(img)

def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=OVERLAP):
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


def extract_large_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    rows = []

    for page_num, page in enumerate(doc):
        text = page.get_text("text").strip()

        if not text and OCR_PAGES:
            text = ocr_page(page) # the pdf might be fully scanned so get text from page with ocr

        chunks = chunk_text(text)

        for i, chunk in enumerate(chunks):
            rows.append({
                "id": str(uuid.uuid4()),
                "text": chunk,
                "source": pdf_path,
                "page": page_num,
                "chunk": i
            })

    return rows


# pdf_path = "./data/book.pdf"
# data = extract_large_pdf(pdf_path)

# df = pd.DataFrame(data)
# df.to_csv("dataset.csv")
# df.to_csv("dataset.json")

# dataset = Dataset.from_list(data)
# dataset.save_to_disk('./data')

# print(dataset)
# print(df)