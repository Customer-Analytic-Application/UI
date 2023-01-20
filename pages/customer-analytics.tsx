import Charts from "@/components/charts";
import MetricRow from "@/components/customer-dashboard/metrics-row";
import Layout from "@/components/layout";

export default function CustomerAnalytics() {
  return (
    <Layout pageName={"Customer Analytics board"}>
      <MetricRow />
      <Charts />
    </Layout>
  );
}
