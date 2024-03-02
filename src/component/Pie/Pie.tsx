import React, { useEffect } from "react";
import * as echarts from "echarts";

export const Pie = ({ id, data }: { id: string; data: any }) => {
  useEffect(() => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   top: "5%",
      //   left: "center",
      //   show: false,
      // },
      legend: {
        orient: "horizontal", // Change orientation to horizontal
        top: "90%", // Adjust position to bottom
        itemWidth: 8, // Adjust width of legend item
        itemHeight: 8, // Adjust height of legend item
        textStyle: {
          color: "#333", // Adjust text color
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data,
        },
      ],
    };

    option && myChart.setOption(option);

    // Clean up
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id={id} style={{ width: "100%", height: "400px" }} />;
};
