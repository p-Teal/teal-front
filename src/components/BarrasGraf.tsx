
import {
  BarChart as BarChartLib,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarrasGraf({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChartLib data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#2cb1b6" barSize={75} name="quantidade"/>
      </BarChartLib>
    </ResponsiveContainer>
  );
}
