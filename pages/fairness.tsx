import Layout from "@/components/layout";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function Fairness() {
  const [val, setVal] = useState([]);
  const [val2, setVal2] = useState([]);
  useEffect(() => {
    console.log("Its loading");
    axios.get("/api/xai?infogram_with_pf=true").then((res) => {
      console.log("infogram with pf", res.data);
      let newarr = res.data.rows[0].data.map(() => ({}));
      res.data.rows.map((obj: any) => {
        for (var i = 0; i < obj.data.length; i++)
          newarr[i][obj.label] = obj.data[i];
      });
      console.log("new obj 1 is ", newarr);
      setVal(newarr);
    });
    axios.get("/api/xai?infogram_without_pf=true").then((res) => {
      console.log("infogram with pf", res.data);
      let newarr = res.data.rows[0].data.map(() => ({}));
      res.data.rows.map((obj: any) => {
        for (var i = 0; i < obj.data.length; i++)
          newarr[i][obj.label] = obj.data[i];
      });
      console.log("new obj 2 is ", newarr);
      setVal2(newarr);
    });
    console.log("data");
  }, []);
  return (
    <Layout pageName={"Metric Fairness"}>
      <Typography variant="h4">{"Model Fairness Infograms"}</Typography>
      <Grid container marginTop={7}>
        <Grid item xs={6} style={{ padding: "5px" }}>
          <ScatterChart
            width={550}
            height={480}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid
              fill="#4a3e61"
              fillOpacity={0.35}
              strokeOpacity={0.25}
            />
            <XAxis
              type="number"
              dataKey="total_information"
              name="Total Information"
              stroke="white"
              label={{
                value: "Total Information",
                position: "bottom",
                fill: "white",
              }}
            />
            <YAxis
              type="number"
              dataKey="net_information"
              name="Net information"
              stroke="white"
              label={{
                value: "Net Information",
                angle: "270",
                position: "left",
                fill: "white",
              }}
            />
            <ReferenceLine
              y={0.1}
              stroke="red"
              strokeOpacity={1}
              strokeDasharray="3 3"
            />
            <ReferenceLine
              x={0.1}
              stroke="red"
              strokeOpacity={1}
              strokeDasharray="3 3"
            />
            <ReferenceArea
              x1={0}
              x2={0.1}
              y1={0}
              y2={1}
              strokeOpacity={1}
              fill="red"
            />
            <ReferenceArea
              x1={0}
              x2={1}
              y1={0}
              y2={0.1}
              strokeOpacity={0.3}
              fill="red"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="A school" data={val} fill="white">
              <LabelList dataKey="column" fontSize={8} position={"top"} />
              {val.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  scale={0}
                  width={5}
                  fontSize={2}
                  strokeWidth={1}
                  fill="white"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </Grid>
        <Grid item xs={6} style={{ padding: 5 }}>
          <ScatterChart
            width={550}
            height={480}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid
              fill="#4a3e61"
              fillOpacity={0.35}
              strokeOpacity={0.25}
            />
            <YAxis
              type="number"
              dataKey="safety_index"
              name="Total Information"
              stroke="white"
              label={{
                value: "Safety Index",
                angle: "270",
                position: "left",
                fill: "white",
              }}
            />
            <XAxis
              type="number"
              dataKey="relevance_index"
              name="Net information"
              stroke="white"
              label={{
                value: "Relevant Index",
                position: "bottom",
                fill: "white",
              }}
            />

            <ReferenceLine
              y={0.1}
              stroke="red"
              strokeOpacity={1}
              strokeDasharray="3 3"
            />
            <ReferenceLine
              x={0.1}
              stroke="red"
              strokeOpacity={1}
              strokeDasharray="3 3"
            />
            <ReferenceArea
              x1={0}
              x2={0.1}
              y1={0}
              y2={1}
              strokeOpacity={1}
              fill="red"
            />
            <ReferenceArea
              x1={0}
              x2={1}
              y1={0}
              y2={0.1}
              strokeOpacity={0.3}
              fill="red"
            />

            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              name="A school"
              data={val2}
              fill="red"
              fontSize={1}
              stroke="blue"
            >
              <LabelList dataKey="column" position="top" fontSize={8} />
              {val2.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  scale={0}
                  width={5}
                  fontSize={2}
                  strokeWidth={1}
                  fill="white"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </Grid>
      </Grid>
    </Layout>
  );
}
