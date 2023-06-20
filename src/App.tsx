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
import Adocoes from "./pages/Adocoes";
import CadastroAdocao from "./pages/CadastroAdocao";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import NotFoundPage from "./pages/NotFoundPage";
import Perfil from "./pages/Perfil";

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
          <Route index element={<Home />} />

          <Route path="voluntarios" element={<Voluntarios />} />

          <Route path="animais">
            <Route index element={<Animais />} />
            <Route path="novo" element={<CadastroAnimal />} />
            <Route path=":id" element={<Animal />} />
          </Route>

          <Route path="adocoes">
            <Route index element={<Adocoes />} />
            <Route path="novo" element={<CadastroAdocao />} />
          </Route>

          <Route path="tutores">
            <Route index element={<Tutores />} />
            <Route path="novo" element={<CadastroTutor />} />
            <Route path=":id" element={<Tutor />} />
          </Route>

          <Route path="sobre" element={<Sobre />} />

          <Route path="perfil" element={<Perfil />} />

          <Route path="doacoes" element={<Doacoes />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroVoluntario />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
