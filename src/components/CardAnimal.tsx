import {
  Cat,
  Dog,
  Feather,
  GenderFemale,
  GenderMale,
  PencilLine,
} from "@phosphor-icons/react";
import { IAnimal } from "../pages/Animais";
import moment from "moment";
import { NavLink } from "react-router-dom";

interface CardProps {
  animal: IAnimal;
  clickCard: (animal: IAnimal) => void;
}

export default function CardAnimal({ animal, clickCard }: CardProps) {
  let animalStatus = animal.status;
  let colorStatus;
  if (animalStatus === "adotado") {
    colorStatus = "bg-sky-900";
  } else if (animalStatus === "em tratamento") {
    colorStatus = "bg-yellow-900";
  } else if (animalStatus === "não disponível") {
    colorStatus = "bg-red-900";
  } else {
    colorStatus = "bg-teal-900";
  }
  animalStatus = animalStatus.charAt(0).toUpperCase() + animalStatus.slice(1);

  const classNameCard = `my-8 rounded-lg shadow-lg shadow-slate-400 duration-300 hover:-translate-y-1 cursor-pointer ${colorStatus} leading-relaxed`;

  const data = "08/03/2023";

  const inputMoment = moment(data, "DD/MM/YYYY");

  const dataAtual = moment();

  const diferenca = inputMoment.diff(dataAtual, "days");

  let dias;
  if (diferenca === 0) {
    dias = "Entrada: Hoje";
  } else if (diferenca === -1) {
    dias = "Entrada: Ontem";
  } else {
    dias = `Entrada: ${diferenca * -1} dias atrás`;
  }

  return (
    <div
      key={animal.animalId}
      className={classNameCard}
      onClick={() => clickCard(animal)}
    >
      <img
        src={animal.urlFoto}
        alt={animal.apelido}
        className="h-72 w-full object-cover rounded-t-lg"
        loading="lazy"
      />
      <div className="p-3 pb-2 flex flex-row gap-2 items-center justify-between">
        {animal.tipo === "cachorro" && <Dog size={28} />}
        {animal.tipo === "gato" && <Cat size={28} />}
        {animal.tipo === "outro" && <Feather size={28} />}
        <h2 className="text-xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
          {animal.apelido}
        </h2>
        {animal.sexo === "M" && (
          <GenderMale size={28} className="text-teal-400" />
        )}
        {animal.sexo === "F" && (
          <GenderFemale size={28} className="text-pink-400" />
        )}
      </div>
      <div className="px-3 pb-2 flex flex-row gap-2 items-center justify-between">
        <small className="text-sm italic overflow-hidden whitespace-nowrap text-ellipsis">
          {animal.raca}
        </small>
        <small className="text-sm font-medium">{animalStatus}</small>
      </div>
      <div className="px-3 pb-3 flex flex-row gap-2 items-center justify-between">
        <small className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
          {dias}
        </small>
        <NavLink to={`/animais/${animal.animalId}`}>
          <PencilLine size={24} className="hover:text-teal-400" />
        </NavLink>
      </div>
    </div>
  );
}
