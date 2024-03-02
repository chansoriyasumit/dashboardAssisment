import { CardContent, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";

interface CardProps {
  icon: string;
  heading: string;
  value: string | number | null;
}
export const Cards = (props: CardProps) => {
  return (
    <Grid item xs={12} md={8} lg={3}>
      <Card sx={{ background: "#262d47" }} variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          className="text-white"
        >
          <img width={80} height={55} src={props.icon} alt="" />
          <div>
            <Typography fontSize={14} component="p">
              {props.heading}
            </Typography>
            <Typography variant="h5" component="p">
              {props.value}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
