import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function Chart({ type, data }: { type: string; data: Array<any> }) {
  const width = 300;
  const height = 300;
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
    data,
  },
  {
    label: "total subscribers per service count",
    type: "bar",
    data,
  },
  {
    label: "rate of expansion",
    type: "line",
    data,
  },
  {
    label: "subscriber segmanetation",
    type: "pie",
    data: data01,
  },
  {
    label: "subscribers demographics",
    type: "line",
    data,
  },
  {
    label: "customer based on communication type",
    type: "pie",
    data: data01,
  },
];

export default function Charts() {
  return (
    <Grid container>
      {chartMetadata.map((obj) => (
        <Grid item xs={4}>
          <Typography textAlign={"center"}>
            {obj.label.toLocaleUpperCase()}
          </Typography>
          <Chart type={obj.type} data={obj.data} key={obj.label} />
        </Grid>
      ))}
    </Grid>
  );
}
