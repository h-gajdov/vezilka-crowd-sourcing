import os
import fitz
import uuid
import pandas as pd
import textract

from pptx import Presentation
from docx import Document
from transform.transform_utils import *
from datasets import Dataset

def extract_pdf(file_path):
    doc = fitz.open(file_path)
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
                "source": file_path,
                "page": page_num,
                "chunk": i
            })

    return rows

def extract_docx_text(docx_path):
    doc = Document(docx_path)

    paragraphs = []

    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()

        if text:
            paragraphs.append(text)

    return "\n".join(paragraphs)

def extract_doc_text(doc_path):
    text = textract.process(doc_path).decode("utf-8")

    return text

def extract_document(file_path):
    rows = []

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".docx":
        text = extract_docx_text(file_path)

    elif extension == ".doc":
        text = extract_doc_text(file_path)

    else:
        raise ValueError(f"Unsupported file type: {extension}")

    chunks = chunk_text(text)

    for i, chunk in enumerate(chunks):
        rows.append({
            "id": str(uuid.uuid4()),
            "text": chunk,
            "source": file_path,
            "chunk": i
        })

    return rows

def extract_txt(file_path):
    rows = []

    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    text = text.strip()

    chunks = chunk_text(text)

    for i, chunk in enumerate(chunks):
        rows.append({
            "id": str(uuid.uuid4()),
            "text": chunk,
            "source": file_path,
            "chunk": i
        })

    return rows

def extract_pptx(file_path):
    rows = []

    presentation = Presentation(file_path)

    for slide_num, slide in enumerate(presentation.slides):
        slide_text = []

        for shape in slide.shapes:
            if hasattr(shape, "text"):
                text = shape.text.strip()

                if text:
                    slide_text.append(text)

        full_text = "\n".join(slide_text).strip()

        if not full_text:
            continue

        chunks = chunk_text(full_text)

        for i, chunk in enumerate(chunks):
            rows.append({
                "id": str(uuid.uuid4()),
                "text": chunk,
                "source": file_path,
                "slide": slide_num,
                "chunk": i
            })

    return rows

# file_path = "./data/presentation.pptx"
# data = extract_pptx(file_path)

# df = pd.DataFrame(data)
# df.to_csv("dataset.csv")
# df.to_csv("dataset.json")

# dataset = Dataset.from_list(data)
# dataset.save_to_disk('./data')

# print(dataset)
# print(df)