export const piechart_data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];
export const linechart_data = [
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

export const color_codes = [
  "#00ffff",
  "#cc33ff",
  "#ffff00",
  "#009933",
  "#003366",
  "#ff00ff",
  "#ff0066",
  "#6600cc",
  "#993300",
  "#666633",
  "#ff9900",
  "#0000ff",
];

export const GRAPH_BG = "#F3EBFA";

export const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#5DA5DA",
  "#FDB813",
  "#ADFF2F",
  "#DB7093",
  "#2F4F4F",
  "#00CED1",
  "#FF69B4",
  "#00FF00",
  "#FFD700",
  "#FF6347",
  "#9400D3",
  "#1E90FF",
  "#FF4500",
  "#8A2BE2",
];

export const RADIAN = Math.PI / 180;
export const renderCustomizedLabel = (obj: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name } =
    obj;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "0.75rem" }}
    >
      {`${name.split("(")[0]}-${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
