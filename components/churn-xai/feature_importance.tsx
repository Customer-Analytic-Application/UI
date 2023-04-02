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

function FeatureImportance() {
  const [features, setFeatures] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?variable_importances=true").then((res) => {
      setFeatures(res.data);
    });
  }, []);

  if (!features) return <p>Loading</p>;

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5" align="center">
          Variable Importance
        </Typography>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "15px" }}>
        <div style={{ padding: "5px" }}>
          <BarChart
            width={750}
            height={600}
            data={features.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 140,
            }}
            style={{ backgroundColor: GRAPH_BG, borderRadius: "15px" }}
            layout={"vertical"}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey={"name"} type="category" interval={0} />
            <Tooltip />

            <Bar dataKey="value" fill="#243763" />
          </BarChart>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(FeatureImportance);
