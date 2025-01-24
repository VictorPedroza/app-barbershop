import { useEffect, useState } from 'react';
import { getRootResponse } from './service/api';

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRootResponse();
        if (response.data) {
          setError(response.data);
        } else {
          setData(response);
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");  // Armazena a mensagem de erro
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>App BarberShop</h1>
      {error ? (
        <span>{error.message}</span>  // Exibe o erro, se houver
      ) : (
        <p>{data.message}</p>  // Exibe os dados, se disponíveis
      )}
    </div>
  );
}

export default App;
