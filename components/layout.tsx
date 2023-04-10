import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";

import { PagesOutlined, StarBorder } from "@mui/icons-material";
import { AppBar, Collapse, ListItemText, Typography } from "@mui/material";
import { useRouter } from "next/router";

const drawerWidth = 280;

const navItems = [
  {
    label: "Customer analytics",
    to: "/customer-analytics",
    options: [],
  },
  {
    label: "Customer churn xai",
    to: "/churn-xai",
    options: [
      {
        label: "PDP, ICE plots",
        to: "/churn-xai?pdp=true",
      },
      {
        label: "Variable Importance",
        to: "/churn-xai?fi=true",
      },
      {
        label: "Shap Plots",
        to: "/churn-xai?shap=true",
      },
    ],
  },
  {
    label: "Customer Satisfaction",
    to: "/customer-satisfaction",
    options: [],
  },
  {
    label: "Fairness",
    to: "/fairness",
    options: [],
  },
];

export default function Layout(props: any) {
  const router = useRouter();
  console.log("base path", router.asPath);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#1A1A4E" }}
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <h1
            style={{
              color: "white",
              textAlign: "end",
            }}
          >
            Customer Analytics with Explainable AI
          </h1>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {navItems.map((obj, index) => (
            <>
              <ListItem key={obj.label} disablePadding>
                <ListItemButton
                  LinkComponent={Link}
                  href={obj.to}
                  selected={router.asPath === obj.to}
                  style={{ marginTop: "10px" }}
                >
                  <ListItemIcon>{<PagesOutlined />}</ListItemIcon>
                  <Typography
                    style={{
                      textAlign: "left",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                    }}
                  >
                    {obj.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
              <List component="div" disablePadding>
                {obj.options.map((child) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    LinkComponent={Link}
                    href={child.to}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={child.label} />
                  </ListItemButton>
                ))}
              </List>
            </>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 4, mt: 8 }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
