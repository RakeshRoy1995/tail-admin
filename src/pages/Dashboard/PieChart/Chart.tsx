import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
const data = [
  { month: "Jan", Assign: 300, Achieve: 50 },
  { month: "Feb", Assign: 280, Achieve: 70 },
  { month: "Mar", Assign: 290, Achieve: 60 },
  { month: "Apr", Assign: 260, Achieve: 80 },
  { month: "May", Assign: 310, Achieve: 40 },
  { month: "Jun", Assign: 300, Achieve: 50 },
  { month: "Jul", Assign: 280, Achieve: 70 },
  { month: "Aug", Assign: 290, Achieve: 60 },
  { month: "Sep", Assign: 260, Achieve: 80 },
  { month: "Oct", Assign: 310, Achieve: 40 },
  { month: "Nov", Assign: 300, Achieve: 50 },
  { month: "Dec", Assign: 280, Achieve: 70 },
];
export const Chart = () => {




      return (
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Assign" fill="#4f46e5" />
          <Bar dataKey="Achieve" fill="#06b6d4" />
        </BarChart>
      </ResponsiveContainer>
      );

  }
