import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { memo, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import _ from "lodash";
import { GRAPH_BG } from "@/constants";

function FeatureImportance({
  width = 500,
  height = 500,
  axisfont = "0.65rem",
}) {
  const [features, setFeatures] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?variable_importances=true").then((res) => {
      setFeatures(res.data);
    });
  }, []);

  if (!features) return <p>Loading</p>;

  return (
    <Grid container>
      <Grid item xs={12} margin={2}>
        <Typography variant="h5" align="center">
          Variable Importance
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ marginTop: "15px" }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div style={{ padding: "5px" }}>
          <BarChart
            width={width}
            height={height}
            data={features.data.map((a: any) => ({
              ...a,
              name: a.name.charAt(0).toUpperCase() + a.name.slice(1),
            }))}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            style={{ backgroundColor: GRAPH_BG, borderRadius: "15px" }}
            layout={"vertical"}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#A9A9A9" />
            <XAxis
              type="number"
              tick={{ fill: "white" }}
              tickLine={{ stroke: "white" }}
            />
            <YAxis
              dataKey={"name"}
              type="category"
              interval={0}
              tick={{ fill: "white", fontSize: axisfont }}
              tickLine={{ stroke: "white" }}
            />
            <Tooltip />

            <Bar dataKey="value" fill="#0096FF" />
          </BarChart>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(FeatureImportance);
