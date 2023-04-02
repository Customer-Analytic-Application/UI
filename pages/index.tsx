import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/customer-analytics");
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "40vh",
        }}
      >
        <CircularProgress
          size={40}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            color: "white",
          }}
        />
        <Typography variant="h5" style={{ color: "white" }}>
          Loading ...
        </Typography>
      </div>
    </div>
  );
}
