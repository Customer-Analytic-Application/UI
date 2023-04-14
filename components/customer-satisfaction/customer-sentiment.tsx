import { Grid, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export function CustomerSentiment({ goodValue = 80, badValue = 40 }) {
  const [happy, setHappy] = useState(0);
  const [angry, setAngry] = useState(0);
  useEffect(() => {
    axios.get("/api/server?path=customer-reaction").then((res: any) => {
      setHappy(+res.data.happy_count);
      setAngry(+res.data.angry_count);
    });
  }, []);
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
            {happy?.toFixed(2)}%
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
            {angry?.toFixed(2)}%
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
