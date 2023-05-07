import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../context/appContext";
import { useForm } from "react-hook-form";

interface Props {
  urlFoto: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

import { z } from "zod";
import { toast } from "react-toastify";
import { updateFotoAnimal } from "../services/animalService";
import { useParams } from "react-router-dom";

const fotoSchema = z.object({
  urlFoto: z.any().refine((value) => {
    if (!value || value.length === 0) return false;
    const [type, extension] = value[0].type.split("/");
    return type === "image" && ["jpeg", "png", "jpg"].includes(extension);
  }, "Selecione uma imagem válida"),
});

type FormProps = z.infer<typeof fotoSchema>;

export default function EditarFotoAnimal({ urlFoto, setUrl }: Props) {
  const { logoutContext } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: zodResolver(fotoSchema),
    shouldFocusError: true,
  });
  const param = useParams<{ id: string }>();

  const onSubmit = async (data: FormProps) => {
    const id = param.id;
    const file = data.urlFoto[0];

    const imageRef = ref(storage, `Animais/${id}`);
    const firebaseReturn = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(firebaseReturn.ref);

    const resp = await updateFotoAnimal(id as string, url);

    if (resp.status === 204) {
      toast.success("Foto atualizada com sucesso!");
      setUrl(url);
    } else if (resp.status === 401) {
      toast.error("Sessão expirada, faça login novamente para continuar.");
      return logoutContext();
    } else {
      toast.error(`Erro! ${resp.data.mensagem}`);
    }
    return;
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mb-8"
      >
        <div className="flex xl:flex-row flex-col pt-2 gap-10">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-medium text-slate-700">
              Foto Cadastrada
            </h2>
            <img
              src={urlFoto}
              alt="Foto do animal"
              className="w-[280px] object-cover"
            />
            <a
              href={urlFoto}
              target="_blank"
              rel="noreferrer"
              className="text-teal-500 hover:underline font-medium hover:text-slate-700 w-fit"
            >
              Link da foto
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <label
              htmlFor="urlFoto"
              className="text-2xl font-medium text-slate-700 w-fit"
            >
              Atualizar Foto
            </label>
            <input
              type="file"
              accept="image/*"
              id="urlFoto"
              {...register("urlFoto")}
              className="file:mr-3 file:py-2 file:px-4
            file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-500 hover:file:text-white file:cursor-pointer"
            />
            {errors.urlFoto && (
              <span className="text-red-600 text-sm px-1">
                {errors.urlFoto.message as string}
              </span>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-700 w-[280px]"
            >
              Atualizar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
