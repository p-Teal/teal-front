import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroVoluntario from "./pages/CadastroVoluntario";
import Login from "./pages/Login";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<h1>e</h1>}>
            <Route index element={<h1>index</h1>} />
            <Route path="voluntarios" element={<h1>voluntarios</h1>} />
          </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroVoluntario />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
