import os
from io import BytesIO
import torch
import torch.nn.functional as F
import torchvision.transforms as transforms
from PIL import Image

from config import settings


class Classifier:
    __WEIGHTS_DIR = os.path.abspath(os.path.join("classifier", "weights"))

    def __init__(self, model, weights_file, classes):
        self.__model = model
        self.__weights = torch.load(os.path.join(self.__WEIGHTS_DIR, weights_file))
        self.__classes: tuple[str] = classes

        self.__transforms = transforms.Compose(
            [
                transforms.Resize((64, 64)),
                transforms.ToTensor()
            ]
        )

        self.__model.load_state_dict(self.__weights)

    def __load_image(self, image_bytes):
        image = Image.open(image_bytes).convert("RGB")

        # Raise an error because the transforms cannot crop to a higher resolution
        if image.width < 64 or image.height < 64:
            raise ValueError(f"The image must have a minimum width/height of {settings.min_img_size}px!")

        image = self.__transforms(image)
        image = image.unsqueeze(0)
        return image

    def __get_class(self, index: int) -> str:
        return self.__classes[index]

    def classify_image(self, image_bytes: BytesIO):
        self.__model.eval()
        image = self.__load_image(image_bytes)
        output = self.__model(image)
        probs = F.softmax(output, dim=1)
        confidence, prediction = torch.max(probs, dim=1)

        predicted_class = self.__get_class(prediction.item())

        return predicted_class, confidence.item()
