import { type PredictionSuccessResult } from '../services/get-prediction.ts'

function PredictionCard(predictionResult: PredictionSuccessResult) {
    return (
        <div
            className={'px-10 py-8 rounded-3xl bg-white bg-opacity-20 flex flex-col'}
        >
            <span className={'mb-3'}>
                <span className={'font-bold'}>Predicted class: </span>
                {predictionResult.prediction}
            </span>
            <span>
                <span className={'font-bold'}>Confidence: </span>
                {(predictionResult.confidence * 100).toFixed(2)} %
            </span>
        </div>
    )
}

export default PredictionCard
