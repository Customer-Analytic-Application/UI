import Pdp from "@/components/churn-xai/pdp";
import ChurnTable from "@/components/churn-xai/churn_table";
import Feature_importance from "@/components/churn-xai/feature_importance";
import FeatureImportance from "@/components/churn-xai/feature_importance";
import IcePlot from "@/components/churn-xai/ice_plot";
import Shap from "@/components/churn-xai/shap";
import Layout from "@/components/layout";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

export default function CustomerAnalytics() {
  const router = useRouter();
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("totalcharges");
  useEffect(() => {
    axios.get("/api/xai?features=true").then((res) => {
      setFeatures(res.data.map((s: string) => s.toLowerCase()));
    });
  }, []);
  const isemptyquery = Object.keys(router.query).length === 0;

  return (
    <Layout pageName={"Customer Churn with xai"}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        {(isemptyquery || router.query.pdp) && (
          <>
            <Grid container item xs={12} justifyContent={"flex-end"}>
              <Typography variant="h5" marginTop={"15px"}>
                Select feature
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Select Feature
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Select Feature"
                  fullWidth
                  value={selectedFeature}
                  onChange={(e) => setSelectedFeature(e.target.value)}
                >
                  {features.map((item: any) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ padding: "15px" }} id={"#my-pdp"}>
              <Pdp feature={selectedFeature} />
            </Grid>
            <Grid item xs={6} style={{ padding: "15px" }}>
              <IcePlot feature={selectedFeature} />
            </Grid>
          </>
        )}

        {(isemptyquery || router.query.fi) && (
          <Grid item xs={12} style={{ padding: "15px" }} id={"efineifb"}>
            <Feature_importance />
          </Grid>
        )}
        {(isemptyquery || router.query.shap) && (
          <Grid item xs={12} style={{ padding: "15px" }} id={"#my-shap"}>
            <Shap />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
