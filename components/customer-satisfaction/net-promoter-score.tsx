import { piechart_data } from "@/constants";
import { Typography } from "@mui/material";
import { Pie, PieChart, Tooltip } from "recharts";

export function NetPromotorScore({ data = piechart_data }) {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Typography variant="h3">Net promoter score</Typography>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}
