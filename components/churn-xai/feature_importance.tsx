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

function FeatureImportance() {
  const [features, setFeatures] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?variable_importances=true").then((res) => {
      console.log("variable_importances response", res.data);
      setFeatures(res.data);
    });
  }, []);

  if (!features) return <p>Loading</p>;

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5">Variable Importance</Typography>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "45px" }}>
        <div style={{ padding: "5px" }}>
          <BarChart
            width={500}
            height={400}
            data={features.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 80,
            }}
            style={{ backgroundColor: "white" }}
            layout={"vertical"}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey={"name"} type="category" />
            <Tooltip />

            <Bar dataKey="value" fill="#413ea0" />
          </BarChart>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(FeatureImportance);
