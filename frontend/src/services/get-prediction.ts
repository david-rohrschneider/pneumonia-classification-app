export interface ApiSuccessResponse {
    prediction: string
    confidence: number
}

interface ApiErrorResponse {
    detail: string
}

export interface ErrorResult {
    statusCode: number
    errorMsg: string
}

export type PredictionResult = ApiSuccessResponse | ErrorResult

export const isErrorResult = (
    value: PredictionResult
): value is ErrorResult => {
    return Object.keys(value).includes('statusCode')
}

const getPrediction = async (image: File): Promise<PredictionResult> => {
    const formData = new FormData()
    formData.append('image', image)

    const requestOptions: RequestInit = {
        method: 'POST',
        body: formData,
    }

    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL,
            requestOptions
        )

        if (response.status < 400 && response.ok) {
            return await response.json()
        }

        const errorBody: ApiErrorResponse = await response.json()

        return {
            statusCode: response.status,
            errorMsg: errorBody.detail,
        }
    } catch {
        return {
            statusCode: 503,
            errorMsg: 'The server is unreachable!',
        }
    }
}

export default getPrediction
