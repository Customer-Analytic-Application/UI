import {
  getFeaturesFromResponse,
  getIceDataFromResponse,
  getInfogramData,
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
    let result;

    result = await axios.get(
      "http://localhost:54321/3/PartialDependence/pdp-leader_model_id-churn_test_data"
    );

    if (!result.data.partial_dependence_data) {
      console.log("calling post pdp\n\n\n\n");
      await axios.post("http://localhost:54321/3/PartialDependence/", {
        destination_key: "pdp-leader_model_id-churn_test_data",
        frame_id: "churn_test_data",
        model_id: "leader_model_id",
      });
      result = await axios.get(
        "http://localhost:54321/3/PartialDependence/pdp-leader_model_id-churn_test_data"
      );
    }

    res.json(getPDPfromResponse(result));
  }
  if (req.query.variable_importances) {
    const result = await axios.get(
      "http://localhost:54321/3/Models/leader_model_id"
    );
    res.json(getVIfromResponse(result));
  }
  if (req.query.shap) {
    let result;
    try {
      result = await axios.get(
        "http://localhost:54321/3/Frames/predict_contributions-churn_test"
      );
    } catch (error) {
      console.log("got error in shap\n\n\n\n\n\n");
      await axios.post(
        "http://localhost:54321/3/Predictions/models/leader_model_id/frames/churn_test_data",
        {
          predict_contributions: true,
          compare_abs: true,
          predictions_frame: "predict_contributions-churn_test",
        }
      );
      result = await axios.get(
        "http://localhost:54321/3/Frames/predict_contributions-churn_test"
      );
    }
    const testdata = await axios.get(
      "http://localhost:54321/3/Frames/churn_test_data"
    );
    res.json(getShapFromResponse(result, testdata));
  }
  if (req.query.test_data) {
    const result = await axios.get(
      "http://localhost:54321/3/Frames/churn_test_data"
    );
    res.json(getTestDataFromReponse(result));
  }
  if (req.query.ice_plot) {
    const result = await axios.get(
      `http://localhost:54321/3/Frames/${req.query.ice_plot}-iceplot?row_count=1200`
    );
    res.json(getIceDataFromResponse(result));
  }
  if (req.query.infogram_with_pf) {
    const result = await axios.get(
      "http://localhost:54321/3/Frames/infogram_with_pf"
    );
    res.json(getInfogramData(result));
  }
  if (req.query.infogram_without_pf) {
    const result = await axios.get(
      "http://localhost:54321/3/Frames/infogram_without_pf"
    );
    res.json(getInfogramData(result));
  }
}
