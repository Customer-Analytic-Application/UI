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

function Pdp() {
  const [features, setFeatures] = useState([]);
  const [pdpData, setPdpData] = useState<any>([]);
  const [selectedPdp, setSelectedPdp] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?features=true").then((res) => {
      setFeatures(res.data);
    });

    axios.get("/api/xai?pdp=true").then((res) => {
      console.log("pdp response", res.data);
      setPdpData(res.data);
      setSelectedPdp(res.data[0]);
    });
  }, []);

  const onChange = (e: any) => {
    console.log(e.target.value);
    pdpData.forEach((pdp: any) => {
      if (pdp.name == e.target.value.toLowerCase()) {
        setSelectedPdp(pdp);
      }
    });
  };
  if (!selectedPdp) return <p>Loading</p>;

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5">Partial dependancy plot</Typography>
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
            style={{ backgroundColor: "white" }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={selectedPdp.name} />
            <YAxis />
            <Tooltip />

            {selectedPdp.type == "string" ? (
              <Bar dataKey="mean_response" barSize={20} fill="#413ea0" />
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
