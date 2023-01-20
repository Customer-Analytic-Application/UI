import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
} from "recharts";
import { Grid } from "@mui/material";
import { linechart_data, piechart_data } from "@/constants";

export function Chart({ type, data }: { type: string; data: Array<any> }) {
  const width = 270;
  const height = 200;
  const styles = { backgroundColor: "white", borderRadius: "20px" };
  if (type == "line") {
    return (
      <div style={{ padding: "5px" }}>
        <LineChart width={width} height={height} data={data} style={styles}>
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart>
      </div>
    );
  }
  if (type == "bar") {
    return (
      <BarChart width={width} height={height} data={data} style={styles}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    );
  }
  if (type == "pie") {
    return (
      <PieChart width={width} height={height} style={styles}>
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
    );
  }

  return <div style={{ padding: "5px" }}>not supported</div>;
}

const chartMetadata = [
  {
    label: "network utilization",
    type: "line",
    data: linechart_data,
  },
  {
    label: "total subscribers per service count",
    type: "bar",
    data: linechart_data,
  },
  {
    label: "rate of expansion",
    type: "line",
    data: linechart_data,
  },
  {
    label: "subscriber segmanetation",
    type: "pie",
    data: piechart_data,
  },
  {
    label: "subscribers demographics",
    type: "line",
    data: linechart_data,
  },
  {
    label: "customer based on communication type",
    type: "pie",
    data: piechart_data,
  },
];

export default function Charts() {
  return (
    <Grid container>
      {chartMetadata.map((obj, ind) => (
        <Grid item xs={4} key={ind} className={"pa-4"}>
          <Typography>{obj.label.toLocaleUpperCase()}</Typography>
          <div>{<Chart type={obj.type} data={obj.data} key={obj.label} />}</div>
        </Grid>
      ))}
    </Grid>
  );
}
