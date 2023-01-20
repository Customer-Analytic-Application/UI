import { linechart_data } from "@/constants";
import { Grid, Typography } from "@mui/material";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";

export function AvgCSATscore() {
  return (
    <Grid
      container
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ width: "400px", height: "300px" }}
    >
      <Typography variant="h3">Average CSAT score</Typography>
      <LineChart
        width={350}
        height={280}
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          margin: "10px",
        }}
        data={linechart_data}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
      </LineChart>
    </Grid>
  );
}
