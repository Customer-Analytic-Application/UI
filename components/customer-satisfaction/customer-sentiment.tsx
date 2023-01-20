import { Grid, LinearProgress, Typography } from "@mui/material";

export function CustomerSentiment({ goodValue = 80, badValue = 40 }) {
  return (
    <div style={{ width: "400px", height: "400px", padding: "10px" }}>
      <Typography variant="h3">Customer Sentiment </Typography>
      <Grid container style={{ margin: "10px" }}>
        <Grid item style={{ fontSize: "4rem" }} xs={2}>
          &#x1F603;
        </Grid>
        <Grid container item alignItems={"center"} xs={6}>
          <LinearProgress
            value={goodValue}
            variant="determinate"
            style={{ width: "200px", height: 20, borderRadius: 10 }}
          />
          <Typography style={{ fontSize: "1.5rem", marginLeft: "2" }}>
            {goodValue}%
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ margin: "10px" }}>
        <Grid item style={{ fontSize: "4rem" }} xs={2}>
          &#x1F621;
        </Grid>
        <Grid container item alignItems={"center"} xs={6}>
          <LinearProgress
            value={badValue}
            variant="determinate"
            style={{ width: "200px", height: 20, borderRadius: 10 }}
          />
          <Typography style={{ fontSize: "1.5rem", marginLeft: "2" }}>
            {badValue}%
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
