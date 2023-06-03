import { useState } from "react";
import BarrasGraf from "./BarrasGraf";
import AreasGraf from "./AreasGraf";


export default function Charts({ data }: { data: any }) {
  const [chartControl, setChartControl] = useState(true);

  return (
    <div className="flex flex-col mb-8">
      <button className="bg-slate-700 text-white rounded-lg px-4 py-2 mb-4 w-fit mx-auto text-lg" 
      type="button" onClick={() => setChartControl((prev) => !prev)}>
        {chartControl ? "Ver Gráfico de Áreas" : "Ver Gráfico de Barras"}
      </button>

      {chartControl ? <BarrasGraf data={data} /> : <AreasGraf data={data} />}
    </div>
  )
}