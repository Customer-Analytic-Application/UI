import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Grid, Paper } from "@mui/material";
import {
  COLORS,
  linechart_data,
  piechart_data,
  renderCustomizedLabel,
} from "@/constants";
import axios from "axios";
import { sortBy } from "lodash";
class CustomizedAxisTick extends React.PureComponent {
  render() {
    const { x, y, stroke, payload }: any = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-90)"
          style={{ fontSize: "0.8rem" }}
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
export function Chart({ type, data }: { type: string; data: Array<any> }) {
  const width = 400;
  const height = 220;
  const styles = {
    backgroundColor: "white",
    borderRadius: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  };
  if (type == "line") {
    return (
      <div style={{ padding: "5px" }}>
        <LineChart
          width={width}
          height={height}
          data={data}
          style={{ ...styles }}
          margin={{
            top: 50,
            right: 40,
            bottom: 20,
            left: 0,
          }}
        >
          <XAxis dataKey="xval" type="number" domain={[0, 72]} />
          <YAxis dataKey="yval" domain={[0, 650]} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dataKey="yval" stroke="#ff7300" dot={false} />
        </LineChart>
      </div>
    );
  }
  if (type == "bar") {
    return (
      <BarChart
        width={width}
        height={height}
        data={data}
        style={styles}
        margin={{ bottom: 80, left: 0 }}
      >
        <Bar dataKey="yval" fill="#8884d8" />
        <XAxis
          dataKey="xval"
          type="category"
          interval={0}
          tick={<CustomizedAxisTick />}
        ></XAxis>
        <YAxis
          dataKey={"yval"}
          style={{ fontSize: "0.8rem", marginLeft: "0", paddingLeft: "0" }}
        />
        <Tooltip
          content={({ active, payload, label }: any) => {
            if (active && payload.length && label)
              return <Paper>{label + ":" + payload[0].value}</Paper>;
          }}
        />
      </BarChart>
    );
  }
  if (type == "pie") {
    return (
      <PieChart width={width} height={height} style={styles}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }

  return <div style={{ padding: "5px" }}>not supported</div>;
}

const chartMetadata = [
  {
    label: "Churn category",
    type: "pie",
    data: piechart_data,
  },
  {
    label: "total subscribers per service count",
    type: "bar",
    data: linechart_data,
  },
  {
    label: "Customer by tenure months",
    type: "line",
    data: piechart_data,
  },
  {
    label: "Customer based on payment type",
    type: "pie",
    data: piechart_data,
  },
];

export default function Charts() {
  const [data, setData] = React.useState<any>({});
  async function getAndSetData() {
    const res = await axios.get("api/server?path=subs-per-service");
    let points = Object.keys(res.data).map((key) => ({
      xval: key,
      yval: res.data[key],
    }));
    let obj: any = { "total subscribers per service count": points };
    const res2 = await axios.get("api/server?path=churn-category-percent");
    const res3 = await axios.get("api/server?path=customers-by-payment-type");
    const res4 = await axios.get("api/server?path=customers-by-tenure-months");

    obj = {
      ...obj,
      "Churn category": res2.data,
      "Customer based on payment type": res3.data,
      "Customer by tenure months": sortBy(res4.data, "xval"),
    };
    setData(obj);
  }

  React.useEffect(() => {
    getAndSetData();
  }, []);

  return (
    <Grid container>
      {chartMetadata.map((obj, ind) => (
        <Grid item xs={6} key={ind} className={"pa-4"}>
          <Typography style={{ textAlign: "center" }}>
            {obj.label.toLocaleUpperCase()}
          </Typography>
          <div>
            <Chart
              type={obj.type}
              data={data[obj.label] || obj.data}
              key={obj.label}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
