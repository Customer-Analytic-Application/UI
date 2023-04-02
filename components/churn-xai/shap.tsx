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

function Shap() {
  const [shapData, setShapData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?shap=true").then((res) => {
      setShapData(res.data);
    });
  }, []);

  if (!shapData) return <p>Loading</p>;
  console.log(shapData);

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5">Shapely values</Typography>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "45px" }}>
        <div
          style={{
            height: "70vh",
            width: "780",
            backgroundColor: GRAPH_BG,
            borderRadius: "15px",
          }}
        >
          <ResponsiveSwarmPlot
            data={shapData
              .map((obj: any) => ({ ...obj, group: obj.name }))
              .filter((obj: any) => Math.abs(obj.value) <= 1)}
            groups={uniq(shapData.map((obj: any) => obj.name))}
            size={3}
            theme={{
              textColor: "black",
              crosshair: {
                line: {
                  stroke: "blue",
                },
              },
            }}
            colors={"#1f77b4"}
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
            margin={{ top: 30, right: 80, bottom: 30, left: 120 }}
            layout={"horizontal"}
            axisRight={null}
            axisTop={null}
            colorBy={"none"}
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
    </Grid>
  );
}

export default memo(Shap);
