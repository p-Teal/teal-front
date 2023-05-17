import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProtect from "./components/AuthProtect";
import Layout from "./components/Layout";
import CadastroVoluntario from "./pages/CadastroVoluntario";
import Login from "./pages/Login";
import Voluntarios from "./pages/Voluntarios";
import Animais from "./pages/Animais";
import CadastroAnimal from "./pages/CadastroAnimal";
import Doacoes from "./pages/Doacoes";
import CadastroTutor from "./pages/CadastroTutor";
import Tutores from "./pages/Tutores";
import Animal from "./pages/Animal";
import Tutor from "./pages/Tutor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProtect>
              <Layout />
            </AuthProtect>
          }
        >
          <Route index element={<h1>index</h1>} />

          <Route path="voluntarios" element={<Voluntarios />} />

          <Route path="animais">
            <Route index element={<Animais />} />
            <Route path="novo" element={<CadastroAnimal />} />
            <Route path=":id" element={<Animal />} />
          </Route>

          <Route path="adocoes" element={<h1>adocoes</h1>} />

          <Route path="tutores">
            <Route index element={<Tutores />} />
            <Route path="novo" element={<CadastroTutor />} />
            <Route path=":id" element={<Tutor />} />
          </Route>

          <Route path="sobre" element={<h1>sobre</h1>} />

          <Route path="perfil" element={<h1>perfil</h1>} />

          <Route path="doacoes" element={<Doacoes />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroVoluntario />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
