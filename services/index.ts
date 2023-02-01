import axios from "axios";

export const getAvgCSATScore = async () => {
  const res = await axios.get("htlocalhost:3000/avg-csat-score");
  console.log("res is ", res);
  return res.data;
};
