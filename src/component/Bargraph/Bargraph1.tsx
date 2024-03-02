import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, BarChart, CanvasRenderer]);

export const Bargraph1 = ({ id }: { id: string }) => {
  useEffect(() => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "1.4%",
        right: "1%",
        bottom: "0%",
        top: "0%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          data: [
            "Delhi",
            "Gurgaon",
            "Jaipur",
            "Mumbai",
            "Pune",
            "Banglore",
            "Noida",
          ],
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "90%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    };

    option && myChart.setOption(option);

    // Clean up
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
};
