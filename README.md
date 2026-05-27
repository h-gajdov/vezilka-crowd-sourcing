# Vezilka Crowd Sourcing Platform

A crowd sourcing platform developed for the Web Programming faculty course at FCSE, focused on collecting and organizing Macedonian-language datasets for the training of the Vezilka large language models.

The platform allows users to contribute documents and datasets that can later be processed and transformed into machine learning datasets for Macedonian NLP and LLM training.

# Project Goal

The main purpose of this platform is to support the development of Macedonian AI models by gathering high-quality textual data through community contributions.

Uploaded files are later can be processed by an admin team or an already implemented Python script and converted into datasets that are automatically pushed to Hugging Face for training and research purposes

# Features

## Users

- User registration and authentication
- User file management

## File Uploading

Users can:

- Upload files and datasets
- Mark uploads as:
  - Public - visible to everyone
  - Private - accessible only internally for dataset processing

## Automated Dataset Processing

A Python processing pipeline:

- Retrieves uploaded files
- Parses and cleans the data
- Converts data into dataset format
- Pushes datasets to Hugging Face automatically

This script is designed to run periodically as a cron job.

# Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Hugging Face](https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

# Team Project

This project was developed as part of a faculty course in Web Programming.

The platform combines modern web technologies with AI-oriented data collection pipelines to help support the future development of Macedonian language models.
