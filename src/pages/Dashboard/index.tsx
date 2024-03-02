import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import { mainListItems } from "../listItems";
import { Deposit } from "../../component/Deposit";
import { Pie1 } from "../../component/Pie/Pie1";
import { Bargraph1 } from "../../component/Bargraph/Bargraph1";
import { Avatar, FormControl, MenuItem, Select } from "@mui/material";
import { Heading } from "./Heading";
import { Cards } from "./Cards";
import RupeeIcon from "../../assets/ruppies.svg";
import ProfiteIcon from "../../assets/profit.svg";
import CardIcon from "../../assets/card.svg";
import DiscountIcon from "../../assets/discount.svg";
import { Bargraph2 } from "../../component/Bargraph/Bargraph2";
import { Pie } from "../../component/Pie/Pie";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#262d47",
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [cardData, setCardData] = React.useState({
    total_sales: "",
    total_sold: "",
    total_discount: "",
    total_profit: "",
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar sx={{ background: "#262d47" }} position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Typography
              component="h6"
              variant="subtitle2"
              className="text-white"
              noWrap
            >
              Hello User
            </Typography>
            <IconButton color="inherit">
              <Avatar>H</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon className="text-white" />
            </IconButton>
            <Typography
              component="h1"
              variant="subtitle1"
              className="text-white"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Sales Dashboard
            </Typography>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#262d47"
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Heading setCardData={setCardData} />
            <Grid marginBottom={2} container spacing={3}>
              <Cards
                heading="Total Sales"
                value={"$" + parseInt(cardData.total_sales)}
                icon={RupeeIcon}
              />
              <Cards
                heading="Quantity Sold"
                value={parseInt(cardData.total_sold)}
                icon={CardIcon}
              />
              <Cards
                heading="Discount%"
                value={parseInt(cardData.total_discount)}
                icon={DiscountIcon}
              />
              <Cards
                heading="Profit"
                value={parseInt(cardData.total_profit)}
                icon={ProfiteIcon}
              />
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Bargraph1 id="main1" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Pie
                    id="pie0"
                    data={[
                      { value: 1048, name: "Consumer" },
                      { value: 735, name: "Corporate" },
                      { value: 300, name: "Home Office" },
                    ]}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Pie
                    id="pie1"
                    data={[
                      { value: 1048, name: "Furniture" },
                      { value: 735, name: "Office Supplies" },
                      { value: 300, name: "Technology" },
                    ]}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Bargraph1 id="main2" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Pie
                    id="pie2"
                    data={[
                      { value: 1048, name: "Consumer" },
                      { value: 735, name: "Corporate" },
                      { value: 300, name: "Home Office" },
                    ]}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
