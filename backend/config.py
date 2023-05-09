from pydantic import BaseSettings
from classifier.pneumo_net import PneumoNet


class Settings(BaseSettings):
    classification_model = PneumoNet()
    weights_file: str = "PneumoNet_epoch_12.pth"
    classes: tuple[str, str] = ("NORMAL", "PNEUMONIA")
    min_img_size: int = 64


settings = Settings()

cors_origins = ["http://localhost:3000"]
