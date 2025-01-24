import axios from 'axios';

const API_URL = import.meta.env.VITE_API_DEV || import.meta.env.VITE_API_PROD;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getRootResponse = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response;
    } else {
      console.error("Network or server-side error:", err.message);
      return { message: "An unexpected error occurred. Please try again later." }; // Return a fallback message
    }
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await api.post("/Users/Register", formData);
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response;
    } else {
      console.error("Erro na conexão com o Servidor.", err.message);
      return { message: "Um erro inesperado ocorreu. Por favor tente novamente!" }
    }
  }
}

export const loginUser = async (formData) => {
  try {
    const response = await api.post("/Users/Login", formData);
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response;
    } else {
      console.error("Erro na conexão com o Servidor", err.message);
      return { message: "Um erro inesperado ocorreu. Por favor tente novamente!" }
    }
  }
}

export const getUser = async (token) => {
  try {
    const response = await api.post("/Users/User", {token})
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response;
    } else {
      console.error("Erro na conexão com o Servidor", err.message);
      return { message: "Um erro inesperado ocorreu. Por favor tente novamente!" }
    }
  }
}
