import { linechart_data } from "@/constants";
import { getAvgCSATScore } from "@/services";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import GaugeChart from "react-gauge-chart";

export function AvgCSATscore() {
  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      setValue(+res.data.avg);
    });
  }, []);
  console.log("value ", value);
  if (!value) return "Loading";
  return (
    <Grid
      container
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ width: "400px", height: "300px" }}
    >
      <Typography variant="h3">Average CSAT Score</Typography>

      <GaugeChart
        id="gauge-chart2"
        nrOfLevels={20}
        arcWidth={0.3}
        percent={value / 5}
        formatTextValue={() => {
          return value.toPrecision(3);
        }}
      />
    </Grid>
  );
}
