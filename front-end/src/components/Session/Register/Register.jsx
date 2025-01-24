import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../../service/api";

import '../Session.css';

export const Register = ({ closeModal, switchModal }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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

        if (!formData.name || !formData.email || !formData.password) {
            console.log("Todos os campos são obrigatórios!");
        }

        try {
            const response = await registerUser(formData);
            if (response.data) {
                setError(response.data.message);
            } else {
                setData(response);
                navigate(0);
                closeModal()
            }
        } catch (err) {
            console.error("Erro inesperado: ", err)
        }

        console.log(data);
        console.log(error);
    };

    return (
        <div className="form-container">
            <h2>Registrar-se</h2>
            <form onSubmit={handleSubmit} className="form-content">
                <div className="item-form">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
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
                <div className="switch">
                    <p>Já possui conta? <button className="switch-button" onClick={switchModal}>Entrar</button></p>
                </div>
            </form>
        </div>
    );
};
