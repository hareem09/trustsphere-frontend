import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BarChartComponent({ totalDonation, activeBeneficiery, futureEvents }) {
  const data = [
    { name: "Donations", value: totalDonation },
    { name: "Beneficiaries", value: activeBeneficiery },
    { name: "Events", value: futureEvents },
  ];

  return (
    <main className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}

export default BarChartComponent;
