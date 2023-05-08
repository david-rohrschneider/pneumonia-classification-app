export interface PredictionResult {
    prediction: string
    confidence: number
}

const getPrediction = async (image: File): Promise<PredictionResult | null> => {
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

        if (response.ok && response.body) {
            return await response.json()
        }

        return null
    } catch {
        return null
    }
}

export default getPrediction
