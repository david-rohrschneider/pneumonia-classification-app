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

## Error handling
- The backend handles three types of issues:
1. Invalid or missing post body -> Handled by FastAPI using the RequestValidationError
2. Uploaded file is not a jpeg image
3. Uploaded image is smaller than the what the preprocessing steps of the model can handle (This can be tested using the [small_image.jpeg](images/small_image.jpeg))

- The frontend handles three types of issues:
1. Dropzone only accepts img/jpeg files and therefore explicit error handling in the backend can be omitted as long as the frontend is the only requesting source
2. Status code is greater or equal to 400 -> response from the backend contains one of the errors mentioned above
3. client side error like an unreachable server
