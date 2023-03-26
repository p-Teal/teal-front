import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CadastroVoluntario from "./pages/CadastroVoluntario";
import Login from "./pages/Login";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}>
            <Route index element={<h1>index</h1>} />
            <Route path="voluntarios" element={<h1>voluntarios</h1>} />
            <Route path="animais" element={<h1>animais</h1>} />
            <Route path="adocoes" element={<h1>adocoes</h1>} />
            <Route path="tutores" element={<h1>adotantes</h1>} />
            <Route path="sobre" element={<h1>sobre</h1>} />
            <Route path="perfil" element={<h1>perfil</h1>} />
            <Route path="estoque" element={<h1>estoque</h1>} />
          </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroVoluntario />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
