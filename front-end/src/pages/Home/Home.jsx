import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import { getRootResponse, getUser } from "../../service/api";

export const Home = () => {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const [user, setUser] = useState(null);

    const token = Cookies.get("token");

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

        const fetchUser = async () => {
            try {
                const response = await getUser(token);
                console.log(token);
                if (response.data) {
                    setError(response.data.message);
                } else {
                    setUser(response.user);
                }
            } catch (err) {
                console.error("Erro inseperado!", err);
            }

        }

        fetchUser();
        fetchData();
    }, [])

    return (
        <div className="main-container">
            <h1>Home</h1>
            <div>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <p>{data}</p>
                        {user && (
                            <ul>
                                <li><strong>ID: </strong>{user.id}</li>
                                <li><strong>Nome: </strong>{user.name}</li>
                                <li><strong>Email: </strong>{user.email}</li>
                                <li><strong>Status: </strong>{user.status}</li>
                                <li><strong>Acesso: </strong>{user.rule}</li>
                            </ul>
                        )}
                    </div>

                )}
            </div>
        </div>
    )
}