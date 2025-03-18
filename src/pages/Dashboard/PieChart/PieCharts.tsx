import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Male", value: 1500 },
  { name: "Female", value: 1000 },
  { name: "Other", value: 100},
];
const COLORS = ["#4f46e5", "#06b6d4", "#ff0000"];
function PieCharts() {


  return (
    <PieChart width={300} height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      outerRadius={100}
      dataKey="value"
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
  );
}

export default PieCharts;
