import { Baby, HouseLine, PawPrint, Person } from "@phosphor-icons/react";
import { ITutor } from "../pages/Tutores";

interface CardProps {
  tutor: ITutor;
}

export default function CardTutor({ tutor }: CardProps) {
  let tutorStatus = tutor.status;
  let colorStatus;
  if (tutorStatus === "aprovado") {
    colorStatus = "border-2 border-teal-600";
  } else if (tutorStatus === "reprovado") {
    colorStatus = "border-2 border-red-600";
  } else {
    colorStatus = "border-2 border-slate-400";
  }
  tutorStatus = tutorStatus.charAt(0).toUpperCase() + tutorStatus.slice(1);

  const classNameCard = `mb-2 rounded-lg duration-300 hover:-translate-y-1 cursor-pointer ${colorStatus} bg-slate-300 p-2 text-slate-700 flex flex-col gap-1`;

  return (
    <div
      key={tutor._id}
      className={classNameCard}
      // onClick={() => clickCard(tutor)}
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-ellipsis overflow-hidden whitespace-nowrap pr-4">
          {tutor.nome}
        </h1>
        <p>{tutorStatus}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="italic">{tutor.cpf}</p>
        <p className="italic">{tutor.telefone}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="italic text-ellipsis overflow-hidden whitespace-nowrap pr-4">
          {tutor.endereco}
        </p>
        <p className="italic">
          {tutor.cidade} - {tutor.estado}
        </p>
      </div>
      <div className="flex flex-row items-center font-bold justify-evenly">
        <div className="flex flex-row">
          <HouseLine size={24} />
          <p className="pl-2 pr-4">{tutor.tipoMoradia}</p>
        </div>
        <div className="flex flex-row">
          <Person size={24} />
          <p className="pl-2 pr-4">{tutor.tamanhoFamilia}</p>
        </div>
        <div className="flex flex-row">
          <Baby size={24} />
          <p className="pl-2 pr-4">{tutor.numCriancas}</p>
        </div>
        <div className="flex flex-row">
          <PawPrint size={24} />
          <p className="pl-2 pr-4">{tutor.numAnimais}</p>
        </div>
      </div>
    </div>
  );
}
