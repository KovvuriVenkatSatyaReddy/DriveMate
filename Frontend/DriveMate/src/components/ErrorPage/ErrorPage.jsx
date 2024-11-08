import React from "react";
import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
            <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
            <p className="text-xl mt-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-600 mt-2">
                <i>{error.statusText || error.message}</i>
            </p>    
        </div>
    );
}
export default ErrorPage;