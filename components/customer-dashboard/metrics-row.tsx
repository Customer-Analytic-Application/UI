import { Chip, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MetricRow() {
  const [values, setValues] = useState<any>({});
  const metrics = [
    {
      name: "Subscriber Count",
      api: "subs-count",
    },
    {
      name: "Avg Yearly Charges",
      api: "avg-total-charges",
    },
    {
      name: "Avg Monthly Charges",
      api: "avg-monthly-charges",
    },
    {
      name: "Churn Rate",
      api: "churn-rate",
    },
  ];
  const chipStyle = {
    backgroundImage: `linear-gradient(to right, #7f42bd , #ed1c7a)`,
  };

  useEffect(() => {
    (async () => {
      let obj: any = {};
      for (var metric of metrics) {
        const res = await axios.get(`api/server?path=${metric.api}`);
        console.log("data for metric: ", metric.name, res);
        obj[metric.name] = res.data;
      }
      setValues(obj);
    })();
  }, []);
  console.log("metric-row values are", values);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"space-around"}
      className={"mb-7"}
    >
      {metrics.map((metric) => (
        <Grid container direction={"column"} alignContent={"center"}>
          <Typography className="ma-5" align="center">
            {metric.name.toUpperCase()}
          </Typography>
          <Chip
            label={
              <Typography style={{ width: "150px", textAlign: "center" }}>
                {values[metric.name]}
              </Typography>
            }
            style={chipStyle}
          />
        </Grid>
      ))}
    </Stack>
  );
}
