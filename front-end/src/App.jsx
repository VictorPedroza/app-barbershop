import { useState } from "react";

import { AppRoutes } from "./pages/AppRoutes";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Modal } from "./components/Modal/Modal";
import { Register } from "./components/Session/Register/Register";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => setModalIsOpen(false);

  const handleLogin = () => {
    console.log("Entrando...");
    setModalIsOpen(true);
  }

  return (
    <>
      <Sidebar handleLogin={handleLogin}  />
      <AppRoutes />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <Register closeModal={closeModal} />
      </Modal>
    </>
  );
}

export default App;
