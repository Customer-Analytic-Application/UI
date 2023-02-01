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
import _ from "lodash";

function Shap() {
  const [shapData, setShapData] = useState<any>(null);

  useEffect(() => {
    //axios.get("/api/xai?shap=true").then((res) => {
    //  setShapData(res.data);
    //});
  }, []);

  if (!shapData) return <p>Loading</p>;
  console.log(shapData.length);

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5">Shapely values</Typography>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "45px" }}>
        <div style={{ padding: "5px" }}>
          <ScatterChart
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
            />
            <Tooltip />
            <ZAxis dataKey="z" range={[2, 220]} />

            <Scatter dataKey="value" fill="#413ea0" />
          </ScatterChart>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(Shap);
