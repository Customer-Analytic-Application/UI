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
import { features } from "process";
import { color_codes } from "@/constants";

function IcePlot() {
  const [features, setFeatures] = useState([]);
  const [shapData, setShapData] = useState<any>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>("totalcharges");

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

  if (!shapData || features.length === 0) return <p>Loading</p>;
  let tmp = shapData.values.filter(
    (obj: any) => typeof obj.xval !== "string" && Object.keys(obj).length === 12
  );
  tmp = sortBy(tmp, (obj: any) => obj.xval);

  if (shapData.domain) {
    tmp = tmp.map((obj: any) => ({ ...obj, xval: shapData.domain[obj.xval] }));
  }

  tmp = tmp.filter((obj: any) => obj.xval != ".missing(NA)");

  const onChange = (e: any) => {
    setSelectedFeature(e.target.value);
    axios.get(`/api/xai?ice_plot=${e.target.value}`).then((res) => {
      setShapData(res.data);
      console.log("ice", res.data);
    });
  };

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5">{`ICE Plot for ${selectedFeature}`}</Typography>
      </Grid>
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
      <Grid item xs={12}>
        <div style={{ padding: "5px" }}>
          <ComposedChart
            width={500}
            height={400}
            data={tmp}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            style={{ backgroundColor: "white" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="xval"
              type={shapData.domain ? "category" : "number"}
              interval={0}
            ></XAxis>
            <YAxis />
            <Tooltip />
            {Object.keys(tmp[0])
              .filter((obj: any) => obj != "xval")
              .map((key: string, ind: number) =>
                shapData.domain ? (
                  <Scatter
                    dataKey={key}
                    type="monotone"
                    fill={color_codes[ind]}
                    name={`${(+key / 10.71).toFixed(0)}th percentile`}
                  />
                ) : (
                  <Line
                    dataKey={key}
                    type="monotone"
                    stroke={color_codes[ind]}
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
