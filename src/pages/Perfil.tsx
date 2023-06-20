import { useAppContext } from "../context/appContext"
import { cpfMask } from "../utils/cpfmask";



export default function Perfil() {
  const {
    admin,
    voluntarioId,
    voluntarioNome,
    voluntarioCpf,
  } = useAppContext();

  return (
    <div className="flex flex-col gap-2 text-slate-700 text-sm">
      <h1 className="text-lg font-medium"> Meu Perfil </h1>
      <p>
        <b>Nome: </b> {voluntarioNome}
      </p>

      <p>
        <b>CPF: </b> {cpfMask(voluntarioCpf)}
      </p>

      <p>
        <b>Voluntário ID: </b> {voluntarioId}
      </p>

      <p>
        <b>Administrador: </b> {admin ? "Sim" : "Não"}
      </p>

    </div>
  )
}