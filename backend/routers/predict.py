from io import BytesIO
from fastapi import APIRouter, File, UploadFile, HTTPException
from classifier.classifier import Classifier
from config import settings

router = APIRouter(prefix="/predict")

classifier = Classifier(
    model=settings.classification_model,
    weights_file=settings.weights_file,
    classes=settings.classes
)


@router.post("/")
async def predict_image(image: UploadFile = File(...)):

    if not image.content_type == "image/jpeg":
        raise HTTPException(status_code=415, detail="The uploaded file must be a jpeg image!")

    img_bytes = BytesIO(image.file.read())

    try:
        prediction, confidence = classifier.classify_image(img_bytes)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=exc.args[0])

    return {
        "prediction": prediction,
        "confidence": confidence,
    }
