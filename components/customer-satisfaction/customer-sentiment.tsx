import { Grid, LinearProgress, Typography } from "@mui/material";

export function CustomerSentiment({ goodValue = 80, badValue = 40 }) {
  return (
    <Grid
      container
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ width: "400px", height: "300px" }}
    >
      <Typography variant="h5">Customer Sentiment </Typography>
      <Grid
        container
        style={{ margin: "10px" }}
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
      >
        <Grid item style={{ fontSize: "4rem" }} xs={2}>
          &#x1F603;
        </Grid>
        <Grid
          container
          item
          alignItems={"center"}
          xs={6}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <LinearProgress
            value={goodValue}
            variant="determinate"
            style={{
              width: "200px",
              height: 20,
              borderRadius: 10,
              margin: "10px",
              marginTop: "25px",
            }}
          />
          <Typography style={{ fontSize: "1.5rem", marginLeft: "2" }}>
            {goodValue}%
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        style={{ margin: "10px" }}
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
      >
        <Grid item style={{ fontSize: "4rem" }} xs={2}>
          &#x1F621;
        </Grid>
        <Grid
          container
          item
          alignItems={"center"}
          xs={6}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <LinearProgress
            value={badValue}
            variant="determinate"
            style={{
              width: "200px",
              height: 20,
              borderRadius: 10,
              margin: "10px",
              marginTop: "25px",
            }}
          />
          <Typography style={{ fontSize: "1.5rem", marginLeft: "2" }}>
            {badValue}%
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
