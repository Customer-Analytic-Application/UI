import { COLORS, piechart_data, renderCustomizedLabel } from "@/constants";
import { Grid, Typography } from "@mui/material";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

export function NetPromotorScore({ data = piechart_data }) {
  return (
    <Grid
      container
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ width: "400px", height: "300px" }}
    >
      <Typography variant="h5">Net promoter score</Typography>
      <PieChart
        width={300}
        height={250}
        style={{
          backgroundColor: "white",
          margin: "20px",
          borderRadius: "15px",
        }}
      >
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={piechart_data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {piechart_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Grid>
  );
}
