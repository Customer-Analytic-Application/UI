import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import _, { sortBy } from "lodash";

function IcePlot() {
  const [shapData, setShapData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?ice_plot=true").then((res) => {
      setShapData(res.data);
    });
  }, []);

  if (!shapData) return <p>Loading</p>;
  let tmp = shapData.filter((obj: any) => typeof obj.xval !== "string");

  tmp = sortBy(tmp, (obj: any) => obj.xval);
  console.log("tmp", tmp);
  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5">Shapely values</Typography>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "45px" }}>
        <div style={{ padding: "5px" }}>
          <LineChart
            width={500}
            height={400}
            data={tmp}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 80,
            }}
            style={{ backgroundColor: "white" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="xval" type="number" />
            <YAxis type="number" />
            <Tooltip />
            {/*Object.keys(shapData[0])
              .filter((obj: any) => obj != "xval")
              .map((key: string, ind: number) => (
                <Line dataKey={key} type="monotone" stroke={`#${ind}884d8`} />
              ))*/}
            <Line dataKey={"921"} type="monotone" stroke={`#8884d8`} />
          </LineChart>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(IcePlot);
