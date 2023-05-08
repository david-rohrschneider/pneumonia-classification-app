# pneumonia-classification-app
Upload chest X-Ray images to detect whether pneumonia is present or not.

- This repository contains frontend (Vite, React, Tailwindcss) and backend (FastAPI, PyTorch, Uvicorn).

## Classification CNN
- The image classification model was set up and trained in Google Colab: [Link](https://colab.research.google.com/drive/1cBqllqL3fBAf7ld-i8U4AgLM-oNhNzRN?usp=sharing)
- The training process was kept simple and did not include complex hyperparameter tuning to achieve a higher accuracy

### Training results after 12 epochs

| Metric           | Accuracy | Precision | Recall | F1-Score |
|------------------|----------|-----------|--------|----------|
| Value (Test set) | 0.896    | 0.897     | 0.941  | 0.919    |
