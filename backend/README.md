# Backend

The backend contains the logic for predicting a class for a given input image using a pretrained CNN.

Developed using **Python 3.10.10**.

## Setup

1. Install required packages by executing the following command:
    ```shell
    pip install requirements.txt
    ```
2. Set the cors origin to your frontend url inside [config.py](config.py):
   ```python
   # ...
   cors_origins = ["http://localhost:3000"]
   # ...
   ```
3. Run the server locally using uvicorn. Pass your port to the command:
    ```shell
    uvicorn main:app --port 8000
    ```