import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../../service/api";

import '../Session.css';

export const Login = ({ closeModal, switchModal }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            console.log("Todos os campos são obrigatórios!");
        }

        try {
            const response = await loginUser(formData);
            if (response.data) {
                setError(response.data.message);
            } else {
                setData(response);
                navigate(0);
                closeModal();
            }
        } catch (err) {
            console.error("Erro inesperado: ", err)
        }
    };

    return (
        <div className="form-container">
            <h2>Entrar</h2>
            <form onSubmit={handleSubmit} className="form-content">
                <div className="item-form">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="item-form">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar-se</button>
            </form>
            <div className="switch">
                <p>Não possui conta? <button className="switch-button" onClick={switchModal}>Registrar-se</button></p>
            </div>
        </div>
    );
};
