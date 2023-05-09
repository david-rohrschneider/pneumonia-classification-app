import ImageDrop from './ImageDrop.tsx'
import getPrediction, {
    ApiSuccessResponse,
    ErrorResult,
    isErrorResult,
    type PredictionResult,
} from '../services/get-prediction.ts'
import { useEffect, useState } from 'react'
import PredictionCard from './PredictionCard.tsx'
import LoadingSpinner from './LoadingSpinner.tsx'
import ErrorCard from './ErrorCard.tsx'

function BaseCard() {
    const [image, setImage] = useState<null | File>(null)
    const [previewSrc, setPreviewSrc] = useState<string>('')
    const [predictionResult, setPredictionResult] =
        useState<null | ApiSuccessResponse>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | ErrorResult>(null)

    useEffect(() => {
        if (!image) {
            setPreviewSrc('')
            return
        }

        const imgUrl = URL.createObjectURL(image)
        setPreviewSrc(imgUrl)

        return () => URL.revokeObjectURL(imgUrl)
    }, [image])

    const predictButtonHandler = async () => {
        if (!image) return
        setIsLoading(true)
        const prediction: PredictionResult = await getPrediction(image)

        if (isErrorResult(prediction)) {
            setError(prediction)
            setIsLoading(false)
            return
        }
        setError(null)
        setPredictionResult(prediction)
        setIsLoading(false)
    }

    const chooseOtherImageHandler = () => {
        setImage(null)
        setPredictionResult(null)
    }

    const processImage = (image: File) => {
        setImage(image)
    }

    return (
        <div
            className={
                'rounded-3xl bg-sky-500 bg-opacity-60 p-16 flex flex-col items-center shadow-2xl shadow-black'
            }
        >
            <span className={'text-5xl font-bold mb-10'}>
                {import.meta.env.VITE_APP_TITLE}
            </span>
            {!image || !previewSrc ? (
                <ImageDrop processImage={processImage} />
            ) : (
                <>
                    <img
                        className={
                            'w-72 h-auto rounded-3xl shadow-md shadow-black mb-10'
                        }
                        src={previewSrc}
                        alt={'Image'}
                    />

                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className={'flex mb-10'}>
                                <button
                                    onClick={predictButtonHandler}
                                    className={
                                        'px-8 py-5 mr-4 rounded-3xl bg-sky-400 text-lg font-bold hover:bg-sky-500'
                                    }
                                >
                                    Predict
                                </button>
                                <button
                                    onClick={chooseOtherImageHandler}
                                    className={
                                        'px-8 py-5 rounded-3xl bg-sky-800 text-lg font-bold hover:bg-sky-900'
                                    }
                                >
                                    Choose another image
                                </button>
                            </div>
                            {error ? (
                                <ErrorCard {...error} />
                            ) : (
                                predictionResult && (
                                    <PredictionCard {...predictionResult} />
                                )
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default BaseCard
