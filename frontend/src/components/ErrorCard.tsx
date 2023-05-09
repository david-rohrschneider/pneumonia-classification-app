import { ErrorResult } from '../services/get-prediction.ts'

function ErrorCard(errorResponse: ErrorResult) {
    return (
        <div className={'p-8 rounded-3xl bg-red-400 bg-opacity-60'}>
            <p className={"font-bold mb-4"}>Something went wrong during the request!</p>
            <p>Status code: {errorResponse.statusCode}</p>
            <p>Message: {errorResponse.errorMsg}</p>
        </div>
    )
}

export default ErrorCard
