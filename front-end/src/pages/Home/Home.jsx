import { useEffect, useState } from "react";

import { getRootResponse } from "../../service/api";

export const Home = () => {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRootResponse();
                if (response.data) {
                    setError(response.data.message);
                } else {
                    setData(response.message)
                }
            } catch (err) {
                console.error("Erro inesperado:", err)
            }
        }

        fetchData()
    },[])

    return(
        <div className="main-container">
            <h1>Home</h1>
            {error ? (
                <span>{error}</span>
            ) : (
                <p>{data}</p>
            )}
        </div>
    )
}