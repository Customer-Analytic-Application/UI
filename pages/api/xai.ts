import {
  getFeaturesFromResponse,
  getIceDataFromResponse,
  getPDPfromResponse,
  getShapFromResponse,
  getTestDataFromReponse,
  getVIfromResponse,
} from "@/utils";
import axios from "axios";
import NextCors from "nextjs-cors";

export default async function handler(req: any, res: any) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.query.features) {
    const result = await axios.get(
      "http://localhost:54321/3/Frames/feature_names"
    );

    res.json(getFeaturesFromResponse(result));
  }
  if (req.query.pdp) {
    const result = await axios.get(
      "http://localhost:54321/3/PartialDependence/pdp-leader_model_id-churn_test_data"
    );
    res.json(getPDPfromResponse(result));
  }
  if (req.query.variable_importances) {
    const result = await axios.get(
      "http://localhost:54321/3/Models/leader_model_id"
    );
    res.json(getVIfromResponse(result));
  }
  if (req.query.shap) {
    const result = await axios.get(
      "http://localhost:54321/3/Frames/predict_contributions-churn_test"
    );
    res.json(getShapFromResponse(result));
  }
  if (req.query.test_data) {
    const result = await axios.get(
      "http://localhost:54321/3/Frames/churn_test_data"
    );
    res.json(getTestDataFromReponse(result));
  }
  if (req.query.ice_plot) {
    const result = await axios.get(
      "http://localhost:54321/3/Frames/totalcharges-iceplot?row_count=1200"
    );
    res.json(getIceDataFromResponse(result));
  }
}
