import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import SalesIcon from "../assets/sales.svg";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <img src={SalesIcon} alt="" />
      </ListItemIcon>
      <ListItemText className="text-white" primary="Sales Overview" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <StoreIcon className="text-white" />
      </ListItemIcon>
      <ListItemText className="text-white" primary="Stores" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NotificationsActiveIcon className="text-white" />
      </ListItemIcon>
      <ListItemText className="text-white" primary="Notifications" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon className="text-white" />
      </ListItemIcon>
      <ListItemText className="text-white" primary="Settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ModeNightIcon className="text-white" />
      </ListItemIcon>
      <ListItemText className="text-white" primary="Dark Theme" />
    </ListItemButton>
  </React.Fragment>
);
