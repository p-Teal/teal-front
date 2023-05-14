import {
  DotsThree,
  NotePencil,
  Pill,
  Scissors,
  Shower,
  Stethoscope,
  Syringe,
} from "@phosphor-icons/react";
import { IRegistro } from "./Registros";
import { useState } from "react";
import Modal from "./Modal";

interface Props {
  registro: IRegistro;
  deleteRegistroFunction: (
    id: string,
    registroId: string,
    animalId: string,
    anexo?: string
  ) => Promise<any>;
}

const iconClasses = "text-white mr-2";

export default function ChipRegistro({
  registro,
  deleteRegistroFunction,
}: Props) {
  const [expand, setExpand] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  function checkRegistroTypeAndReturnIcon() {
    switch (registro.tipo) {
      case "vacina":
        return <Syringe className={iconClasses} size={24} />;
      case "veterinário":
        return <Stethoscope className={iconClasses} size={24} />;
      case "banho":
        return <Shower className={iconClasses} size={24} />;
      case "tosa":
        return <Scissors className={iconClasses} size={24} />;
      case "medicação":
        return <Pill className={iconClasses} size={24} />;
      case "outro":
        return <NotePencil className={iconClasses} size={24} />;
      default:
        return <NotePencil className={iconClasses} size={24} />;
    }
  }

  function openModal() {
    setIsOpenDelete(true);
  }

  function closeModal() {
    setIsOpenDelete(false);
  }

  function observacaoHandler(ob: string) {
    console.log(ob);
    const newText = ob.replace(/\n/g, "<br />");
    return newText;
  }

  return (
    <div className="flex flex-col w-full bg-teal-800 rounded-lg h-fit">
      <div className="flex flex-row justify-between items-center px-4 py-2 text-white text-lg">
        <div className="flex flex-row items-center">
          {checkRegistroTypeAndReturnIcon()}
          <p>
            {registro.tipo.charAt(0).toUpperCase() + registro.tipo.slice(1)}
          </p>
        </div>
        <p>{registro.data}</p>
      </div>
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <h1 className="text-white font-semibold text-xl pr-4 text-ellipsis overflow-hidden whitespace-nowrap">
          {registro.titulo}
        </h1>
        <DotsThree
          className="text-white hover:cursor-pointer"
          size={28}
          onClick={() => setExpand((prev) => !prev)}
        />
      </div>
      {expand && (
        <div className="flex flex-col px-4 py-2">
          <p
            className="text-white"
            dangerouslySetInnerHTML={{
              __html: observacaoHandler(registro.observacao),
            }}
          ></p>
          {registro.anexo && (
            <p className="my-4 text-white">
              Anexo:
              <a
                className="underline ml-4"
                href={registro.anexo}
                target="_blank"
                rel="noreferrer"
                download={true}
              >
                Clique aqui para abrir.
              </a>
            </p>
          )}
          <button
            type="button"
            onClick={() => openModal()}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full my-4"
          >
            Deletar
          </button>
        </div>
      )}

      <Modal
        isOpen={isOpenDelete}
        onClose={closeModal}
        title="Excluir registro"
        key={`${registro._id}delete}`}
      >
        <p className="text-center py-3">Deseja realmente excluir o registro?</p>
        <div className="flex flex-row justify-center pt-3">
          <button
            className="bg-teal-500 text-white rounded-lg px-6 py-2 mx-2 hover:bg-teal-600"
            onClick={() => {
              deleteRegistroFunction(
                registro._id,
                registro.registroId,
                registro.animalId,
                registro?.anexo
              );
            }}
          >
            Sim
          </button>
          <button
            className="border-2 border-teal-500 text-teal-500 rounded-lg px-6 py-2 mx-2 hover:font-bold"
            onClick={closeModal}
          >
            Não
          </button>
        </div>
      </Modal>
    </div>
  );
}
