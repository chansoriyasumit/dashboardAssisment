import { useEffect } from "react";
import * as echarts from "echarts";

export const Bargraph2 = () => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);

    // There should not be negative values in rawData
    const rawData = [
      [100, 302, 301, 334, 390, 330, 320],
      [320, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 212, 201, 154, 190, 330, 410],
      [820, 832, 901, 934, 1290, 1330, 1320],
    ];
    const totalData: any = [];
    for (let i = 0; i < rawData[0].length; ++i) {
      let sum = 0;
      for (let j = 0; j < rawData.length; ++j) {
        sum += rawData[j][i];
      }
      totalData.push(sum);
    }
    const grid = {
      left: 50,
      right: 10,
      top: 10,
      bottom: 20,
    };
    const series = ["Direct", "Mail Ad"].map((name, sid) => {
      return {
        name,
        type: "bar",
        stack: "total",
        barWidth: "90%",
        label: {
          show: true,
          formatter: (params: any) =>
            Math.round(params.value * 1000) / 10 + "%",
        },
        itemStyle: {
          // Set itemStyle to change filled color
          color: sid === 0 ? "#d6eff3" : "#8bd0e0", // Change color according to series index
        },
        data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        ),
      };
    });
    const option = {
      legend: {
        selectedMode: false,
        show: false,
        data: series.map((s) => ({
          name: s.name,
          icon: "rect", // Set icon to 'rect' for colored squares
        })),
      },
      grid,
      yAxis: {
        type: "category",
        data: ["p1", "p2", "p3", "p4", "p5", "p6", "p7"],
      },
      xAxis: {
        type: "value",
      },
      series,
    };

    option && myChart.setOption(option);

    // Clean up
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="main" style={{ width: "100%", height: "100%" }} />;
};
