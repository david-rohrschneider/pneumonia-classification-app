# Backend

The backend contains the logic for predicting a class for a given input image using a pretrained CNN.

Developed using **Python 3.10.10**.

## Setup

1. Install required packages by executing the following command:
    ```shell
    pip install requirements.txt
    ```
2. Run the server locally using uvicorn:
    ```shell
    uvicorn main:app --port 8000
    ```