import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import _, { uniq } from "lodash";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import { GRAPH_BG } from "@/constants";
const colors = [
  "#0080ff",
  "#0040ff",
  "#0000ff",
  "#4000ff",
  "#8000ff",
  "#bf00ff",
  "#ff00ff",
  "#ff00bf",
  "#ff0080",
  "#ff0040",
  "#ff0000",
];

function Shap({ width = 500, height = 500, axisfont = "0.65rem" }) {
  const [shapData, setShapData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?shap=true").then((res) => {
      console.log("shap res", res.data);
      setShapData(
        res.data
          .map((obj: any) => ({ ...obj, group: obj.name, id: "" + obj.xval }))
          .filter((obj: any) => Math.abs(obj.value) <= 1)
      );
    });
  }, []);

  if (!shapData) return <p>Loading</p>;
  console.log(shapData);

  return (
    <Grid container>
      <Grid item xs={12} margin={2}>
        <Typography variant="h5" align="center">
          Shapely values
        </Typography>
      </Grid>

      <Grid
        container
        item
        justifyContent={"center"}
        alignItems={"center"}
        xs={12}
        style={{ padding: "5px" }}
      >
        <div
          style={{
            width: width,
            height: height,
            borderRadius: "15px",
          }}
        >
          <ResponsiveSwarmPlot
            data={shapData}
            groups={uniq(shapData.map((obj: any) => obj.name))}
            size={2.5}
            theme={{
              textColor: "white",
              crosshair: {
                line: {
                  stroke: "blue",
                },
              },
            }}
            value="value"
            valueFormat="$.2f"
            valueScale={{ type: "linear", min: -1, max: 1, reverse: false }}
            forceStrength={0.2}
            spacing={0}
            borderColor={{
              from: "color",
              modifiers: [
                ["darker", 0.6],
                ["opacity", 0.5],
              ],
            }}
            margin={{ top: 30, right: 30, bottom: 30, left: 120 }}
            layout={"horizontal"}
            axisRight={null}
            axisTop={null}
            colorBy={"id"}
            colors={(data: any) => {
              console.log(data);
              return colors[+data.id * 10];
            }}
          />
          {/* <ScatterChart
            width={500}
            height={400}
            data={shapData.map((obj: any) => ({ ...obj, z: 100 }))}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 80,
            }}
            style={{ backgroundColor: "white" }}
          >
            <XAxis
              type="number"
              dataKey="value"
              tickLine={{ transform: "translate(0, -10)" }}
            />
            <YAxis
              dataKey={"name"}
              type="category"
              allowDuplicatedCategory={false}
              interval={0}
            />
            <Tooltip />
            <ZAxis dataKey="z" range={[2, 220]} />

            <Scatter dataKey="value" fill="#413ea0" />
          </ScatterChart>
          */}
        </div>
      </Grid>
      <Grid item xs={12} margin={1}>
        <div
          style={{
            height: "20px",
            width: "600",
            borderRadius: "15px",
            backgroundImage: "linear-gradient(to right, #0080ff,#ff0000)",
          }}
        ></div>
        <Typography style={{ width: "500px", textAlign: "center" }}>
          Normalized values from 0 to 1
        </Typography>
      </Grid>
    </Grid>
  );
}

export default memo(Shap);
