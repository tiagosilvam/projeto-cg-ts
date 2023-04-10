interface Props {
    message?: string;
}

import { CheckCircleIcon } from "@heroicons/react/24/outline";




export function Alert({ message }: Props) {
    return (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 mb-4" role="alert">
            <p className="font-bold flex flex-row">
                <CheckCircleIcon className="w-6 h-6 mr-1" />
                Sucesso!
            </p>
            <p>{message}</p>
        </div>
    )
}