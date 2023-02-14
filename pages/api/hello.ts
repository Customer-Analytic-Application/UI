import axios from "axios";
import NextCors from "nextjs-cors";

export default async function handler(req: any, res: any) {
  console.log("req came", req);
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const result = await axios.get("http://localhost:3080/avg-csat-score");
  res.json(result.data);
}
