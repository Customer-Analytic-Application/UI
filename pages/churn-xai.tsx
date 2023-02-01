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
      <Grid container>
        <Grid item xs={6}>
          <Pdp />
        </Grid>
        <Grid item xs={6}>
          <FeatureImportance />
        </Grid>
        <Grid item xs={6}>
          <Shap />
        </Grid>
        <Grid item xs={6}>
          <IcePlot />
        </Grid>
        <Grid item xs={12}>
          <ChurnTable />
        </Grid>
      </Grid>
    </Layout>
  );
}
