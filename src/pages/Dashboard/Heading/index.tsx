import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "../../../apiRoutes";

interface DateRange {
  minDate: Date | null;
  maxDate: Date | null;
}

export const Heading = ({ setCardData }: { setCardData: any }) => {
  const [states, setStates] = useState<any>([]);
  const [selectedState, setSelectedState] = useState("");
  const [fromDateOptions, setFromDateOptions] = useState<any>([]);
  const [selectedFromDateOptions, setSelectedFromDateOptions] = useState("");
  const [selectedToDateOptions, setSelectedToDateOptions] = useState("");

  const fetchState = async () => {
    await axios
      .get(BASEURL + "states")
      .then((res) => {
        setStates(res.data);

        if (res.data.length > 0) {
          setSelectedState(res.data[0].code);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    fetchState();
  }, []);

  useEffect(() => {
    const fetchMinMaxDates = async () => {
      try {
        const response: any = await axios.get<DateRange>(
          BASEURL + `/state/${selectedState}`
        );

        const uniqueDates = new Set();
        setCardData({
          total_sales: response.data.totalSales,
          total_sold: response.data.totalQuantitySold,
          total_discount: response.data.totalDiscount,
          total_profit: response.data.totalProfit,
        });
        response.data.transformedDates.forEach((date: any) => {
          uniqueDates.add(date.code);
        });
        const fromDateOptions: any = Array.from(uniqueDates).sort(
          (a: any, b: any) => {
            return new Date(a).getTime() - new Date(b).getTime();
          }
        );

        setFromDateOptions(fromDateOptions);

        if (response.data.length > 0) {
          setSelectedFromDateOptions(fromDateOptions[0].code);
        }
      } catch (error) {
        console.log("Error fetching min/max dates:", error);
      }
    };

    if (selectedState) {
      fetchMinMaxDates();
    }
  }, [selectedState]);

  const handleStateChange = (event: any) => {
    setSelectedState(event.target.value);
  };

  const handleFromDateChange = (event: any) => {
    setSelectedFromDateOptions(event.target.value);
    setSelectedToDateOptions("");
  };

  const handleToDateChange = (event: any) => {
    setSelectedToDateOptions(event.target.value);
  };
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
      <Typography
        component="h1"
        variant="subtitle1"
        className="text-white"
        noWrap
      >
        Sales Overview
      </Typography>

      <Grid marginBottom={2} width={"60%"} container spacing={1}>
        <Grid item xs={12} md={8} lg={4}>
          <FormControl size="small" fullWidth>
            <Typography
              component="p"
              textAlign={"start"}
              variant="subtitle1"
              className="text-white"
              fontSize={12}
              noWrap
            >
              Select a state
            </Typography>
            <Select
              sx={{
                color: "white",
                background: "#262D47",
                "& .MuiSelect-icon": {
                  color: "white", // Change select icon color to white
                },
              }}
              value={selectedState}
              onChange={handleStateChange}
              displayEmpty
            >
              <MenuItem value={""}>Select</MenuItem>
              {states.map((state: any) => (
                <MenuItem key={state.code} value={state.code}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <FormControl size="small" fullWidth>
            <Typography
              component="p"
              textAlign={"start"}
              variant="subtitle1"
              className="text-white"
              fontSize={12}
              noWrap
            >
              Select from date
            </Typography>
            <Select
              sx={{
                color: "white",
                background: "#292f47",
                "& .MuiSelect-icon": {
                  color: "white", // Change select icon color to white
                },
              }}
              value={selectedFromDateOptions ? selectedFromDateOptions : ""}
              displayEmpty
              onChange={handleFromDateChange}
            >
              <MenuItem value={""}>Select</MenuItem>
              {fromDateOptions.map((date: string) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <FormControl size="small" fullWidth>
            <Typography
              textAlign={"start"}
              component="p"
              variant="subtitle1"
              className="text-white"
              fontSize={12}
              noWrap
            >
              Select to date
            </Typography>
            <Select
              sx={{
                color: "white",
                background: "#262d47",
                "& .MuiSelect-icon": {
                  color: "white", // Change select icon color to white
                },
              }}
              value={selectedToDateOptions}
              displayEmpty
              onChange={handleToDateChange}
            >
              <MenuItem value={""}>Select</MenuItem>
              {fromDateOptions
                .filter((date: string) => date >= selectedFromDateOptions)
                .map((date: string) => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
