import axios from 'axios';

const API_URL = import.meta.env.VITE_API_DEV || import.meta.env.VITE_API_PROD;

export const api = axios.create({
  baseURL: API_URL,
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
