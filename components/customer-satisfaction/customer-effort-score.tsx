import {
  COLORS,
  GRAPH_BG,
  linechart_data,
  piechart_data,
  renderCustomizedLabel,
} from "@/constants";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
} from "recharts";

export function CIScore() {
  const [value, setValue] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/api/server?path=cltv").then((res) => {
      console.log("cltv response", res.data);
      setValue(res.data);
    });
  }, []);
  console.log("cltv values are", value, piechart_data);
  const styles = {
    backgroundColor: "white",
    borderRadius: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "2pc solid blue",
  };
  return (
    <Grid
      container
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ width: "400px", height: "300px" }}
    >
      <Typography variant="h5">Customer Life Time Value</Typography>
      <PieChart
        width={300}
        height={250}
        style={{
          backgroundColor: GRAPH_BG,
          margin: "20px",
          borderRadius: "15px",
        }}
      >
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={value}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {value.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Grid>
  );
}
