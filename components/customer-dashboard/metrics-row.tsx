import { Chip, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default function MetricRow() {
  const metrics = [
    {
      name: "Subscriber count",
      value: "10286",
    },
    {
      name: "revenue",
      value: "10.6Cr",
    },
    {
      name: "Expense",
      value: "4.7CR",
    },
    {
      name: "Churn rate",
      value: "12.53%",
    },
  ];
  const chipStyle = {
    backgroundImage: `linear-gradient(to right, #7f42bd , #ed1c7a)`,
  };

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
                {metric.value}
              </Typography>
            }
            style={chipStyle}
          />
        </Grid>
      ))}
    </Stack>
  );
}
