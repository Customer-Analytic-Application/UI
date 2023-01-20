import { Grid } from "@mui/material";
import { AvgCSATscore } from "./average-CSAT-score";
import { CIScore } from "./customer-effort-score";
import { CustomerSentiment } from "./customer-sentiment";
import { NetPromotorScore } from "./net-promoter-score";

export default function Index() {
  return (
    <Grid container>
      <Grid item xs={6} className={"pa-5"}>
        <CIScore />
      </Grid>
      <Grid item xs={6} className={"pa-5"}>
        <AvgCSATscore />
      </Grid>
      <Grid item xs={6} className={"pa-5"}>
        <NetPromotorScore />
      </Grid>
      <Grid item xs={6} className={"pa-5"}>
        <CustomerSentiment />
      </Grid>
    </Grid>
  );
}
