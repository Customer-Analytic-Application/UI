import Pdp from "@/components/churn-xai";
import ChurnTable from "@/components/churn-xai/churn_table";
import FeatureImportance from "@/components/churn-xai/feature_importance";
import IcePlot from "@/components/churn-xai/ice_plot";
import Shap from "@/components/churn-xai/shap";
import Layout from "@/components/layout";
import { Grid } from "@mui/material";

export default function CustomerAnalytics() {
  return (
    <Layout pageName={"Customer Churn with xai"}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        style={{ marginTop: "80px" }}
      >
        <Grid item xs={6} style={{ padding: "15px" }}>
          <Pdp />
        </Grid>
        <Grid item xs={6} style={{ padding: "15px" }}>
          <IcePlot />
        </Grid>
      </Grid>
    </Layout>
  );
}
