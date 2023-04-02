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
import { memo, useEffect, useState } from "react";
import {
  Bar,
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

function Pdp({ feature }: any) {
  const [pdpData, setPdpData] = useState<any>([]);
  const [selectedPdp, setSelectedPdp] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?pdp=true").then((res) => {
      console.log("pdp response", res.data);
      setPdpData(res.data);
      setSelectedPdp(
        res.data.filter((arr: any) => arr.name == "totalcharges")[0]
      );
    });
  }, []);
  useEffect(() => {
    pdpData.forEach((pdp: any) => {
      if (pdp.name == feature.toLowerCase()) {
        setSelectedPdp(pdp);
      }
    });
  }, [feature]);
  if (!selectedPdp) return <p>Loading</p>;

  return (
    <Grid container>
      <Grid item xs={12} margin={2}>
        <Typography variant="h5">Partial Dependancy Plot</Typography>
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
            value={selectedPdp.name}
            onChange={onChange}
          >
            {features
              .filter((item: any) =>
                _.find(pdpData, { name: item.toLowerCase() })
              )
              .map((item: any) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
              */}
      <Grid item xs={12}>
        <div style={{ padding: "5px" }}>
          <ComposedChart
            width={500}
            height={400}
            data={selectedPdp.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            style={{ backgroundColor: GRAPH_BG, borderRadius: "15px" }}
            barGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={selectedPdp.name}
              interval={selectedPdp.type == "string" ? 0 : undefined}
            />
            <YAxis />
            <Tooltip />

            {selectedPdp.type == "string" ? (
              <Bar dataKey="mean_response" barSize={40} fill="#243763" />
            ) : (
              <Line type="monotone" dataKey="mean_response" stroke="#ff7300" />
            )}
          </ComposedChart>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(Pdp);
