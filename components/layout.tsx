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

import { PagesOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Customer churn xai",
    to: "/churn-xai",
  },
  {
    label: "Customer Satisfaction",
    to: "/customer-satisfaction",
  },
  {
    label: "Customer analytics",
    to: "/customer-analytics",
  },
];

export default function Layout(props: any) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
            <ListItem key={obj.label} disablePadding>
              <ListItemButton LinkComponent={Link} href={obj.to}>
                <ListItemIcon>{<PagesOutlined />}</ListItemIcon>
                <Typography style={{ textAlign: "left" }}>
                  {obj.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        style={{ minHeight: "100vh", overflowX: "scroll" }}
      >
        <div>
          <h1
            style={{
              color: "white",
              textAlign: "end",
              marginBottom: "15px",
            }}
          >
            {props.pageName}
          </h1>
        </div>
        {props.children}
      </Box>
    </Box>
  );
}
