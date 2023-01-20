import Charts from "@/components/charts";
import Layout from "@/components/layout";
import { Grid, LinearProgress, Typography } from "@mui/material";

const metrics = [
  {
    name: "Customer Effort score",
  },
  {
    name: "Average CSAT score",
  },
  {
    name: "Net promoter score",
  },
  {
    name: "Customer sentiment",
  },
];
import CustomerSatifaction from "@/components/customer-satisfaction";

export default function CustomerAnalytics() {
  return (
    <Layout pageName={"Customer Satisfcation board"}>
      <CustomerSatifaction />
    </Layout>
  );
}
