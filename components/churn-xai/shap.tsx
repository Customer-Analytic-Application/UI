import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import _, { uniq } from "lodash";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";

function Shap() {
  const [shapData, setShapData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/xai?shap=true").then((res) => {
      setShapData(res.data);
    });
  }, []);

  if (!shapData) return <p>Loading</p>;
  console.log(shapData);

  return (
    <Grid container style={{ maxWidth: "600px" }}>
      <Grid item xs={6}>
        <Typography variant="h5">Shapely values</Typography>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "45px" }}>
        <div
          style={{
            height: "90vh",
            width: "50vw",
            backgroundColor: "white",
          }}
        >
          <ResponsiveSwarmPlot
            data={shapData
              .map((obj: any) => ({ ...obj, group: obj.name }))
              .filter((obj: any) => Math.abs(obj.value) <= 1)}
            groups={uniq(shapData.map((obj: any) => obj.name))}
            size={3}
            theme={{
              textColor: "black",
              crosshair: {
                line: {
                  stroke: "blue",
                },
              },
            }}
            colors={"blue"}
            value="value"
            valueFormat="$.2f"
            valueScale={{ type: "linear", min: -1, max: 1, reverse: false }}
            forceStrength={0.2}
            spacing={0}
            borderColor={{
              from: "color",
              modifiers: [
                ["darker", 0.6],
                ["opacity", 0.5],
              ],
            }}
            margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
            layout={"horizontal"}
            axisRight={null}
            axisTop={null}
            colorBy={"none"}
          />
          {/* <ScatterChart
            width={500}
            height={400}
            data={shapData.map((obj: any) => ({ ...obj, z: 100 }))}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 80,
            }}
            style={{ backgroundColor: "white" }}
          >
            <XAxis
              type="number"
              dataKey="value"
              tickLine={{ transform: "translate(0, -10)" }}
            />
            <YAxis
              dataKey={"name"}
              type="category"
              allowDuplicatedCategory={false}
              interval={0}
            />
            <Tooltip />
            <ZAxis dataKey="z" range={[2, 220]} />

            <Scatter dataKey="value" fill="#413ea0" />
          </ScatterChart>
          */}
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(Shap);

const data = [
  {
    id: "0.0",
    group: "group A",
    price: 159,
    volume: 17,
  },
  {
    id: "0.1",
    group: "group C",
    price: 57,
    volume: 5,
  },
  {
    id: "0.2",
    group: "group B",
    price: 379,
    volume: 18,
  },
  {
    id: "0.3",
    group: "group B",
    price: 346,
    volume: 5,
  },
  {
    id: "0.4",
    group: "group C",
    price: 142,
    volume: 20,
  },
  {
    id: "0.5",
    group: "group C",
    price: 303,
    volume: 18,
  },
  {
    id: "0.6",
    group: "group C",
    price: 465,
    volume: 18,
  },
  {
    id: "0.7",
    group: "group A",
    price: 17,
    volume: 7,
  },
  {
    id: "0.8",
    group: "group A",
    price: 467,
    volume: 19,
  },
  {
    id: "0.9",
    group: "group B",
    price: 184,
    volume: 11,
  },
  {
    id: "0.10",
    group: "group C",
    price: 393,
    volume: 6,
  },
  {
    id: "0.11",
    group: "group C",
    price: 181,
    volume: 12,
  },
  {
    id: "0.12",
    group: "group A",
    price: 31,
    volume: 6,
  },
  {
    id: "0.13",
    group: "group B",
    price: 307,
    volume: 14,
  },
  {
    id: "0.14",
    group: "group A",
    price: 428,
    volume: 6,
  },
  {
    id: "0.15",
    group: "group A",
    price: 242,
    volume: 10,
  },
  {
    id: "0.16",
    group: "group A",
    price: 437,
    volume: 10,
  },
  {
    id: "0.17",
    group: "group A",
    price: 395,
    volume: 10,
  },
  {
    id: "0.18",
    group: "group A",
    price: 364,
    volume: 8,
  },
  {
    id: "0.19",
    group: "group A",
    price: 412,
    volume: 7,
  },
  {
    id: "0.20",
    group: "group C",
    price: 397,
    volume: 8,
  },
  {
    id: "0.21",
    group: "group B",
    price: 157,
    volume: 18,
  },
  {
    id: "0.22",
    group: "group B",
    price: 138,
    volume: 6,
  },
  {
    id: "0.23",
    group: "group B",
    price: 56,
    volume: 12,
  },
  {
    id: "0.24",
    group: "group A",
    price: 311,
    volume: 6,
  },
  {
    id: "0.25",
    group: "group A",
    price: 46,
    volume: 12,
  },
  {
    id: "0.26",
    group: "group B",
    price: 257,
    volume: 7,
  },
  {
    id: "0.27",
    group: "group A",
    price: 56,
    volume: 13,
  },
  {
    id: "0.28",
    group: "group C",
    price: 434,
    volume: 11,
  },
  {
    id: "0.29",
    group: "group C",
    price: 4,
    volume: 8,
  },
  {
    id: "0.30",
    group: "group B",
    price: 448,
    volume: 9,
  },
  {
    id: "0.31",
    group: "group A",
    price: 81,
    volume: 7,
  },
  {
    id: "0.32",
    group: "group B",
    price: 487,
    volume: 8,
  },
  {
    id: "0.33",
    group: "group B",
    price: 296,
    volume: 9,
  },
  {
    id: "0.34",
    group: "group B",
    price: 323,
    volume: 9,
  },
  {
    id: "0.35",
    group: "group B",
    price: 16,
    volume: 12,
  },
  {
    id: "0.36",
    group: "group C",
    price: 484,
    volume: 7,
  },
  {
    id: "0.37",
    group: "group B",
    price: 167,
    volume: 6,
  },
  {
    id: "0.38",
    group: "group A",
    price: 300,
    volume: 13,
  },
  {
    id: "0.39",
    group: "group A",
    price: 469,
    volume: 13,
  },
  {
    id: "0.40",
    group: "group C",
    price: 292,
    volume: 8,
  },
  {
    id: "0.41",
    group: "group C",
    price: 67,
    volume: 18,
  },
  {
    id: "0.42",
    group: "group C",
    price: 77,
    volume: 13,
  },
  {
    id: "0.43",
    group: "group A",
    price: 458,
    volume: 12,
  },
  {
    id: "0.44",
    group: "group A",
    price: 269,
    volume: 15,
  },
  {
    id: "0.45",
    group: "group B",
    price: 238,
    volume: 13,
  },
  {
    id: "0.46",
    group: "group A",
    price: 116,
    volume: 20,
  },
  {
    id: "0.47",
    group: "group A",
    price: 295,
    volume: 16,
  },
  {
    id: "0.48",
    group: "group A",
    price: 39,
    volume: 19,
  },
  {
    id: "0.49",
    group: "group A",
    price: 392,
    volume: 14,
  },
  {
    id: "0.50",
    group: "group C",
    price: 126,
    volume: 7,
  },
  {
    id: "0.51",
    group: "group A",
    price: 16,
    volume: 11,
  },
  {
    id: "0.52",
    group: "group B",
    price: 186,
    volume: 20,
  },
  {
    id: "0.53",
    group: "group C",
    price: 76,
    volume: 18,
  },
  {
    id: "0.54",
    group: "group B",
    price: 246,
    volume: 16,
  },
  {
    id: "0.55",
    group: "group A",
    price: 266,
    volume: 8,
  },
  {
    id: "0.56",
    group: "group C",
    price: 119,
    volume: 6,
  },
  {
    id: "0.57",
    group: "group A",
    price: 358,
    volume: 7,
  },
  {
    id: "0.58",
    group: "group A",
    price: 485,
    volume: 11,
  },
  {
    id: "0.59",
    group: "group A",
    price: 9,
    volume: 4,
  },
  {
    id: "0.60",
    group: "group C",
    price: 29,
    volume: 13,
  },
  {
    id: "0.61",
    group: "group C",
    price: 61,
    volume: 5,
  },
  {
    id: "0.62",
    group: "group B",
    price: 203,
    volume: 6,
  },
  {
    id: "0.63",
    group: "group B",
    price: 108,
    volume: 12,
  },
  {
    id: "0.64",
    group: "group B",
    price: 190,
    volume: 12,
  },
  {
    id: "0.65",
    group: "group A",
    price: 121,
    volume: 18,
  },
  {
    id: "0.66",
    group: "group B",
    price: 435,
    volume: 8,
  },
  {
    id: "0.67",
    group: "group C",
    price: 265,
    volume: 7,
  },
  {
    id: "0.68",
    group: "group C",
    price: 289,
    volume: 14,
  },
  {
    id: "0.69",
    group: "group A",
    price: 472,
    volume: 13,
  },
  {
    id: "0.70",
    group: "group C",
    price: 70,
    volume: 15,
  },
  {
    id: "0.71",
    group: "group A",
    price: 55,
    volume: 9,
  },
  {
    id: "1.0",
    group: "group C",
    price: 25,
    volume: 15,
  },
  {
    id: "1.1",
    group: "group C",
    price: 471,
    volume: 18,
  },
  {
    id: "1.2",
    group: "group C",
    price: 51,
    volume: 18,
  },
  {
    id: "1.3",
    group: "group C",
    price: 21,
    volume: 12,
  },
  {
    id: "1.4",
    group: "group C",
    price: 424,
    volume: 8,
  },
  {
    id: "1.5",
    group: "group C",
    price: 182,
    volume: 19,
  },
  {
    id: "1.6",
    group: "group B",
    price: 60,
    volume: 7,
  },
  {
    id: "1.7",
    group: "group B",
    price: 101,
    volume: 14,
  },
  {
    id: "1.8",
    group: "group B",
    price: 67,
    volume: 15,
  },
  {
    id: "1.9",
    group: "group C",
    price: 46,
    volume: 19,
  },
  {
    id: "1.10",
    group: "group B",
    price: 247,
    volume: 14,
  },
  {
    id: "1.11",
    group: "group C",
    price: 394,
    volume: 9,
  },
  {
    id: "1.12",
    group: "group C",
    price: 381,
    volume: 5,
  },
  {
    id: "1.13",
    group: "group C",
    price: 432,
    volume: 19,
  },
  {
    id: "1.14",
    group: "group A",
    price: 177,
    volume: 19,
  },
  {
    id: "1.15",
    group: "group B",
    price: 306,
    volume: 5,
  },
  {
    id: "1.16",
    group: "group A",
    price: 176,
    volume: 12,
  },
  {
    id: "1.17",
    group: "group A",
    price: 287,
    volume: 17,
  },
  {
    id: "1.18",
    group: "group B",
    price: 209,
    volume: 19,
  },
  {
    id: "1.19",
    group: "group B",
    price: 232,
    volume: 10,
  },
  {
    id: "1.20",
    group: "group B",
    price: 293,
    volume: 8,
  },
  {
    id: "1.21",
    group: "group B",
    price: 48,
    volume: 8,
  },
  {
    id: "1.22",
    group: "group C",
    price: 27,
    volume: 17,
  },
  {
    id: "1.23",
    group: "group C",
    price: 376,
    volume: 8,
  },
  {
    id: "1.24",
    group: "group A",
    price: 80,
    volume: 10,
  },
  {
    id: "1.25",
    group: "group B",
    price: 491,
    volume: 9,
  },
  {
    id: "1.26",
    group: "group C",
    price: 220,
    volume: 20,
  },
  {
    id: "1.27",
    group: "group B",
    price: 205,
    volume: 15,
  },
  {
    id: "1.28",
    group: "group C",
    price: 117,
    volume: 18,
  },
  {
    id: "1.29",
    group: "group C",
    price: 32,
    volume: 5,
  },
  {
    id: "1.30",
    group: "group B",
    price: 347,
    volume: 12,
  },
  {
    id: "1.31",
    group: "group A",
    price: 68,
    volume: 7,
  },
  {
    id: "1.32",
    group: "group C",
    price: 13,
    volume: 15,
  },
  {
    id: "1.33",
    group: "group A",
    price: 459,
    volume: 7,
  },
  {
    id: "1.34",
    group: "group C",
    price: 194,
    volume: 8,
  },
  {
    id: "1.35",
    group: "group B",
    price: 475,
    volume: 15,
  },
  {
    id: "1.36",
    group: "group C",
    price: 447,
    volume: 5,
  },
  {
    id: "1.37",
    group: "group B",
    price: 399,
    volume: 10,
  },
  {
    id: "1.38",
    group: "group B",
    price: 52,
    volume: 15,
  },
  {
    id: "1.39",
    group: "group C",
    price: 438,
    volume: 4,
  },
  {
    id: "1.40",
    group: "group A",
    price: 268,
    volume: 8,
  },
  {
    id: "1.41",
    group: "group A",
    price: 464,
    volume: 9,
  },
  {
    id: "1.42",
    group: "group C",
    price: 413,
    volume: 8,
  },
  {
    id: "1.43",
    group: "group A",
    price: 132,
    volume: 17,
  },
  {
    id: "1.44",
    group: "group C",
    price: 275,
    volume: 7,
  },
  {
    id: "1.45",
    group: "group C",
    price: 166,
    volume: 14,
  },
  {
    id: "1.46",
    group: "group C",
    price: 133,
    volume: 16,
  },
  {
    id: "1.47",
    group: "group C",
    price: 271,
    volume: 12,
  },
  {
    id: "1.48",
    group: "group B",
    price: 61,
    volume: 5,
  },
  {
    id: "1.49",
    group: "group A",
    price: 297,
    volume: 16,
  },
  {
    id: "1.50",
    group: "group B",
    price: 275,
    volume: 7,
  },
  {
    id: "1.51",
    group: "group C",
    price: 125,
    volume: 9,
  },
  {
    id: "1.52",
    group: "group C",
    price: 207,
    volume: 6,
  },
  {
    id: "1.53",
    group: "group A",
    price: 300,
    volume: 18,
  },
  {
    id: "1.54",
    group: "group C",
    price: 419,
    volume: 8,
  },
  {
    id: "1.55",
    group: "group A",
    price: 390,
    volume: 4,
  },
  {
    id: "1.56",
    group: "group B",
    price: 127,
    volume: 13,
  },
  {
    id: "1.57",
    group: "group B",
    price: 401,
    volume: 15,
  },
  {
    id: "1.58",
    group: "group B",
    price: 474,
    volume: 6,
  },
  {
    id: "1.59",
    group: "group A",
    price: 401,
    volume: 11,
  },
  {
    id: "1.60",
    group: "group A",
    price: 112,
    volume: 8,
  },
  {
    id: "1.61",
    group: "group B",
    price: 454,
    volume: 20,
  },
  {
    id: "1.62",
    group: "group B",
    price: 387,
    volume: 18,
  },
  {
    id: "1.63",
    group: "group A",
    price: 394,
    volume: 8,
  },
  {
    id: "1.64",
    group: "group A",
    price: 280,
    volume: 11,
  },
  {
    id: "1.65",
    group: "group B",
    price: 443,
    volume: 9,
  },
  {
    id: "1.66",
    group: "group C",
    price: 48,
    volume: 10,
  },
  {
    id: "1.67",
    group: "group A",
    price: 250,
    volume: 9,
  },
  {
    id: "1.68",
    group: "group A",
    price: 81,
    volume: 14,
  },
  {
    id: "1.69",
    group: "group C",
    price: 56,
    volume: 17,
  },
  {
    id: "1.70",
    group: "group B",
    price: 138,
    volume: 18,
  },
  {
    id: "1.71",
    group: "group C",
    price: 80,
    volume: 17,
  },
  {
    id: "1.72",
    group: "group B",
    price: 167,
    volume: 7,
  },
  {
    id: "1.73",
    group: "group B",
    price: 264,
    volume: 6,
  },
  {
    id: "1.74",
    group: "group C",
    price: 185,
    volume: 18,
  },
  {
    id: "1.75",
    group: "group C",
    price: 62,
    volume: 4,
  },
  {
    id: "1.76",
    group: "group B",
    price: 74,
    volume: 16,
  },
  {
    id: "2.0",
    group: "group A",
    price: 211,
    volume: 10,
  },
  {
    id: "2.1",
    group: "group A",
    price: 286,
    volume: 15,
  },
  {
    id: "2.2",
    group: "group B",
    price: 170,
    volume: 20,
  },
  {
    id: "2.3",
    group: "group B",
    price: 464,
    volume: 17,
  },
  {
    id: "2.4",
    group: "group A",
    price: 126,
    volume: 9,
  },
  {
    id: "2.5",
    group: "group B",
    price: 174,
    volume: 10,
  },
  {
    id: "2.6",
    group: "group B",
    price: 446,
    volume: 17,
  },
  {
    id: "2.7",
    group: "group C",
    price: 360,
    volume: 4,
  },
  {
    id: "2.8",
    group: "group A",
    price: 306,
    volume: 19,
  },
  {
    id: "2.9",
    group: "group A",
    price: 165,
    volume: 14,
  },
  {
    id: "2.10",
    group: "group A",
    price: 155,
    volume: 16,
  },
  {
    id: "2.11",
    group: "group C",
    price: 155,
    volume: 6,
  },
  {
    id: "2.12",
    group: "group C",
    price: 422,
    volume: 10,
  },
  {
    id: "2.13",
    group: "group C",
    price: 395,
    volume: 7,
  },
  {
    id: "2.14",
    group: "group A",
    price: 183,
    volume: 7,
  },
  {
    id: "2.15",
    group: "group A",
    price: 10,
    volume: 17,
  },
  {
    id: "2.16",
    group: "group B",
    price: 108,
    volume: 14,
  },
  {
    id: "2.17",
    group: "group A",
    price: 129,
    volume: 11,
  },
  {
    id: "2.18",
    group: "group A",
    price: 442,
    volume: 20,
  },
  {
    id: "2.19",
    group: "group C",
    price: 63,
    volume: 13,
  },
  {
    id: "2.20",
    group: "group B",
    price: 226,
    volume: 19,
  },
  {
    id: "2.21",
    group: "group A",
    price: 262,
    volume: 16,
  },
  {
    id: "2.22",
    group: "group C",
    price: 437,
    volume: 4,
  },
  {
    id: "2.23",
    group: "group C",
    price: 491,
    volume: 10,
  },
  {
    id: "2.24",
    group: "group A",
    price: 319,
    volume: 11,
  },
  {
    id: "2.25",
    group: "group B",
    price: 452,
    volume: 20,
  },
  {
    id: "2.26",
    group: "group C",
    price: 126,
    volume: 4,
  },
  {
    id: "2.27",
    group: "group A",
    price: 352,
    volume: 4,
  },
  {
    id: "2.28",
    group: "group C",
    price: 491,
    volume: 13,
  },
  {
    id: "2.29",
    group: "group C",
    price: 368,
    volume: 14,
  },
  {
    id: "2.30",
    group: "group C",
    price: 160,
    volume: 19,
  },
  {
    id: "2.31",
    group: "group B",
    price: 468,
    volume: 12,
  },
  {
    id: "2.32",
    group: "group C",
    price: 61,
    volume: 10,
  },
  {
    id: "2.33",
    group: "group B",
    price: 289,
    volume: 8,
  },
  {
    id: "2.34",
    group: "group C",
    price: 203,
    volume: 4,
  },
  {
    id: "2.35",
    group: "group B",
    price: 20,
    volume: 6,
  },
  {
    id: "2.36",
    group: "group B",
    price: 369,
    volume: 12,
  },
  {
    id: "2.37",
    group: "group C",
    price: 471,
    volume: 4,
  },
  {
    id: "2.38",
    group: "group C",
    price: 323,
    volume: 14,
  },
  {
    id: "2.39",
    group: "group C",
    price: 278,
    volume: 12,
  },
  {
    id: "2.40",
    group: "group B",
    price: 84,
    volume: 6,
  },
  {
    id: "2.41",
    group: "group A",
    price: 71,
    volume: 19,
  },
  {
    id: "2.42",
    group: "group C",
    price: 92,
    volume: 8,
  },
  {
    id: "2.43",
    group: "group C",
    price: 407,
    volume: 14,
  },
  {
    id: "2.44",
    group: "group C",
    price: 425,
    volume: 8,
  },
  {
    id: "2.45",
    group: "group C",
    price: 6,
    volume: 5,
  },
  {
    id: "2.46",
    group: "group C",
    price: 336,
    volume: 15,
  },
  {
    id: "2.47",
    group: "group A",
    price: 495,
    volume: 20,
  },
  {
    id: "2.48",
    group: "group A",
    price: 381,
    volume: 9,
  },
  {
    id: "2.49",
    group: "group A",
    price: 259,
    volume: 4,
  },
  {
    id: "2.50",
    group: "group C",
    price: 257,
    volume: 20,
  },
  {
    id: "2.51",
    group: "group B",
    price: 176,
    volume: 4,
  },
  {
    id: "2.52",
    group: "group A",
    price: 250,
    volume: 6,
  },
  {
    id: "2.53",
    group: "group B",
    price: 297,
    volume: 10,
  },
  {
    id: "2.54",
    group: "group B",
    price: 453,
    volume: 7,
  },
  {
    id: "2.55",
    group: "group A",
    price: 420,
    volume: 4,
  },
  {
    id: "2.56",
    group: "group B",
    price: 230,
    volume: 13,
  },
  {
    id: "2.57",
    group: "group A",
    price: 130,
    volume: 11,
  },
  {
    id: "2.58",
    group: "group B",
    price: 444,
    volume: 5,
  },
  {
    id: "2.59",
    group: "group C",
    price: 331,
    volume: 10,
  },
  {
    id: "2.60",
    group: "group A",
    price: 451,
    volume: 14,
  },
  {
    id: "2.61",
    group: "group B",
    price: 297,
    volume: 17,
  },
  {
    id: "2.62",
    group: "group A",
    price: 335,
    volume: 7,
  },
  {
    id: "2.63",
    group: "group B",
    price: 347,
    volume: 4,
  },
  {
    id: "2.64",
    group: "group A",
    price: 497,
    volume: 19,
  },
  {
    id: "2.65",
    group: "group C",
    price: 49,
    volume: 16,
  },
  {
    id: "2.66",
    group: "group C",
    price: 413,
    volume: 18,
  },
  {
    id: "2.67",
    group: "group B",
    price: 21,
    volume: 17,
  },
  {
    id: "2.68",
    group: "group B",
    price: 413,
    volume: 18,
  },
];
