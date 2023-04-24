import {
  Cat,
  Dog,
  Feather,
  GenderFemale,
  GenderMale,
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
    colorStatus = "bg-sky-900 hover:bg-gradient-to-r hover:from-sky-900 hover:to-sky-800";
  } else if (animalStatus === "em tratamento") {
    colorStatus = "bg-yellow-900 hover:bg-gradient-to-r hover:from-yellow-900 hover:to-yellow-800";
  } else if (animalStatus === "não disponível") {
    colorStatus = "bg-gray-700 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800";
  } else {
    colorStatus = "bg-teal-900 hover:bg-gradient-to-r hover:from-teal-900 hover:to-teal-800";
  }
  animalStatus = animalStatus.charAt(0).toUpperCase() + animalStatus.slice(1);

  const classNameCard = `my-4 rounded-lg shadow-lg shadow-slate-400 duration-300 hover:-translate-y-1 cursor-pointer ${colorStatus}`;

  const data = animal.dataEntrada;

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
        // se for não disponível - deixar a imagem em preto e branco
        {...(animal.status === "não disponível" && {
          className: "h-72 w-full object-cover rounded-t-lg filter grayscale",
        })
        }
      />
      <div className="flex flex-row items-center justify-between p-2 pt-3">
        {animal.tipo === "cachorro" && <Dog size={34} />}
        {animal.tipo === "gato" && <Cat size={34} />}
        {animal.tipo === "outro" && <Feather size={34} />}
        <h2 className="text-2xl font-medium text-ellipsis overflow-hidden whitespace-nowrap px-2">
          {animal.apelido}
        </h2>
        {animal.sexo === "M" && (
          <GenderMale size={34} className="text-teal-400" />
        )}
        {animal.sexo === "F" && (
          <GenderFemale size={34} className="text-pink-400" />
        )}
      </div>
      <div className="flex flex-row justify-between px-3 py-1 items-center">
        <p className="italic overflow-hidden whitespace-nowrap text-ellipsis text-sm pr-3">
          {animal.raca}
        </p>
        <p className="font-medium text-right text-sm">{animalStatus}</p>
      </div>
      <div className="flex flex-row justify-between px-3 pb-4 pt-1 items-center">
        <p className="overflow-hidden whitespace-nowrap text-ellipsis pr-3 text-sm">
          {dias}
        </p>
        <NavLink
          className="bg-white px-2 py-1 flex items-center justify-center rounded-lg hover:bg-slate-200"
          to={`/animais/${animal.animalId}`}>
          <p className="text-xs font-medium text-black">Editar</p>
        </NavLink>
      </div>
    </div>
  );
}
