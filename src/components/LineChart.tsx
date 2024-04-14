"use client";
import React, { useContext, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { GlobalContext } from "@/context/GlobalState";

const LineChart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const { transactions } = useContext(GlobalContext);

  transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  console.log(transactions);
  const dates = transactions.map((item) => item.date);
  console.log(dates);
  const expenses = transactions
    .filter((item) => item.isExpense)
    .map((item) => ({ x: new Date(item.date), y: item.amount }));

  const income = transactions
    .filter((item) => !item.isExpense)
    .map((item) => ({ x: new Date(item.date), y: item.amount }));

  console.log({ expenses });
  const options: ApexCharts.ApexOptions = {
    series: [
      {
        name: "Expense",
        data: expenses,
      },
      {
        name: "Income",
        data: income,
      },
    ],
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -10,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: []
        }
      },
      height: 500,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    colors: ["red", "green"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Spending Trends",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Amount",
      },
      min: Math.min.apply(
        Math,
        transactions.map((item) => item.amount)
      ),
      max: Math.max.apply(
        Math,
        transactions.map((item) => item.amount)
      ),
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };


  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.updateOptions(options);
      } else {
        chartRef.current.chart = new ApexCharts(
          document.querySelector("#linechart"),
          options
        );
        chartRef.current.chart.render();
      }
    }
  }, [options]);

  return (
    <div id="linechart">
      <Chart
        options={options}
        series={options.series}
        type="line"
        height={500}
        ref={chartRef}
      />
    </div>
  );
};

export default LineChart;
