from io import BytesIO
from fastapi import APIRouter, File
from classifier.classifier import Classifier
from config import settings

router = APIRouter(prefix="/predict")

classifier = Classifier(
    model=settings.classification_model,
    weights_file=settings.weights_file,
    classes=settings.classes
)


@router.post("/")
async def predict_image(image: bytes = File(...)):
    try:
        img_bytes = BytesIO(image)
        prediction, confidence = classifier.classify_image(img_bytes)

        return {
            "prediction": prediction,
            "confidence": confidence,
        }
    except:
        return {"Error": "Something went wrong!"}
