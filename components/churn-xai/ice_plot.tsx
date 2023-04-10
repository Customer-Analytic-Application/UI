import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import _, { find, sortBy } from "lodash";
import { color_codes, COLORS, GRAPH_BG } from "@/constants";

function IcePlot({
  feature,
  width = 500,
  height = 500,
  axisfont = "0.65rem",
}: any) {
  const [features, setFeatures] = useState([]);
  const [shapData, setShapData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?features=true").then((res) => {
      setFeatures(
        res.data
          .map((s: string) => s.toLowerCase())
          .filter((s: string) => s != "churn" && s != "customerid")
      );
    });
    axios.get("/api/xai?ice_plot=totalcharges").then((res) => {
      console.log("ice response", res);
      setShapData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/xai?ice_plot=${feature.toLowerCase()}`).then((res) => {
      setShapData(res.data);
      console.log("ice", res.data);
    });
  }, [feature]);

  if (!shapData || features.length === 0) return <p>Loading</p>;
  let tmp = shapData.values.filter(
    (obj: any) => typeof obj.xval !== "string" && Object.keys(obj).length === 12
  );
  tmp = sortBy(tmp, (obj: any) => obj.xval);

  if (shapData.domain) {
    tmp = tmp.map((obj: any) => ({ ...obj, xval: shapData.domain[obj.xval] }));
  }

  tmp = tmp.filter((obj: any) => obj.xval != ".missing(NA)");

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={12} margin={2}>
        <Typography variant="h5" align="center">{`ICE Plot`}</Typography>
      </Grid>
      {/*
      <Grid item xs={6}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Feature
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Select Feature"
            fullWidth
            onChange={onChange}
            value={selectedFeature}
          >
            {features.map((item: any) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
            */}
      <Grid item xs={12}>
        <div style={{ padding: "5px" }}>
          <ComposedChart
            width={width}
            height={height}
            data={tmp}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            style={{ backgroundColor: GRAPH_BG, borderRadius: "15px" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="xval"
              type={shapData.domain ? "category" : "number"}
              interval={0}
              tick={{ fill: "white" }}
              tickLine={{ stroke: "white" }}
            ></XAxis>
            <YAxis tick={{ fill: "white" }} tickLine={{ stroke: "white" }} />
            <Tooltip />
            {Object.keys(tmp[0])
              .filter((obj: any) => obj != "xval")
              .map((key: string, ind: number) =>
                shapData.domain ? (
                  <Scatter
                    dataKey={key}
                    type="monotone"
                    fill={COLORS[ind]}
                    name={`${(+key / 10.71).toFixed(0)}th percentile`}
                  />
                ) : (
                  <Line
                    dataKey={key}
                    type="monotone"
                    stroke={COLORS[ind]}
                    dot={false}
                    name={`${(+key / 10.71).toFixed(0)}th percentile`}
                  />
                )
              )}
          </ComposedChart>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(IcePlot);
