import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

import { AppRoutes } from "./pages/AppRoutes";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Modal } from "./components/Modal/Modal";
import { Register } from "./components/Session/Register/Register";
import { Login } from "./components/Session/Login/Login";
import { getUser } from "./service/api";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const closeModal = () => setModalIsOpen(false);

  const switchModal = () => setHaveAccount((prev) => !prev)


  const handleLogin = () => {
    console.log("Entrando...");
    setModalIsOpen(true);
  }

  const token = Cookies.get("token");

  useEffect(() => {
    const checkLogin = async () => {
      if (token) {
        try {
          const response = await getUser(token);
          if (response.data) {
            setIsLogged(false); 
          } else {
            setIsLogged(true);
          }
        } catch (err) {
          console.error("Erro inseperado!", err)
        }
      }
    }

    checkLogin();
  },[token]);

return (
  <>
    <Sidebar handleLogin={handleLogin} isLogged={isLogged} />
    <AppRoutes />
    <Modal isOpen={modalIsOpen} onClose={closeModal}>
      {haveAccount ? (
        <Login closeModal={closeModal} switchModal={switchModal} />
      ) : (
        <Register closeModal={closeModal} switchModal={switchModal} />
      )}
    </Modal>
  </>
);
}

export default App;
