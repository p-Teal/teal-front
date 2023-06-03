import {
  AreaChart as AreaChartLib,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AreasGraf({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChartLib data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"/>
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" name="quantidade"/>
      </AreaChartLib>
    </ResponsiveContainer>
  );
}