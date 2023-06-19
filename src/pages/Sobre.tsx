

export default function Sobre() {

  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          Sobre
        </h1>
      </div>
      <div className="flex flex-col gap-4 mb-8 text-xl text-slate-700 ">
        <p>
          - Teal é um projeto desenvolvido como trabalho de conclusão de curso.
        </p>
        <p>
          - Desenvolvido por: <b> Michel Ribeiro Corrêa</b>
        </p>
        <p>
          - Turma 2020/1 - Sistemas de Informação UNIVÁS
        </p>
      </div >


      <h2 className="text-xl font-medium text-slate-700">Links:</h2>
      <div className="flex flex-col gap-4 mb-8 text-xl text-slate-700 py-4">
        <p>
          Repositório do projeto: <a target="_blank" rel="noreferrer" className="underline text-teal-700"
          href="https://github.com/p-Teal">
            p-Teal
          </a>
        </p>
        <p>
          Linkedin: <a target="_blank" rel="noreferrer" className="underline text-teal-700"
          href="https://www.linkedin.com/in/michelribeiro1/">
            @michelribeiro1
          </a>
        </p>
      </div >
    </>
  );
}