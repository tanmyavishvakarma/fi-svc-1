import { GlobalContext } from "@/context/GlobalState";
import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useTable } from "react-table";
import { useMemo } from 'react';
import Switch from "react-switch";

const LineChart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const { fetchInsights, transactions } = useContext(GlobalContext);
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [viewMode, setViewMode] = useState<string>("Chart");

  useEffect(() => {
    const fetchData = async () => {
      const insights = await fetchInsights();
      setData(insights);
    };
    fetchData();
  }, [fetchInsights, transactions]);

  const { expenses = [], income = [] } = data;

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
          customIcons: [],
        },
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
      text: "Transaction Trends",
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

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "Chart" ? "List" : "Chart"));
  };

  return (
    <div style={{minHeight:"60vh"}}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h5>Graph View</h5>
        <Switch onChange={toggleViewMode} checked={viewMode === "List"}
          onColor="#2693e6"
          offColor="#2693e6"
          handleDiameter={10}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
        <h5>Table View</h5>
      </div>
      {viewMode === "Chart" ? (

        <div id="linechart">
          <Chart
            options={options}
            series={options.series}
            type="line"
            height={500}
            ref={chartRef}
          />
        </div>
      ) : (
        <TableView expenses={expenses} income={income} />
      )}

    </div>
  );
};


const TableView: React.FC<{ expenses: any[]; income: any[] }> = ({
  expenses,
  income,
}) => {

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'x',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    []
  );

  const expenseData = useMemo(
    () =>
      expenses.map((expense, index) => ({
        x: expense.x.toString().split("T")[0],
        value: expense?.y,
      })),
    [expenses]
  );

  const incomeData = useMemo(
    () =>
      income.map((incomeItem, index) => ({
        x: incomeItem.x.toString().split("T")[0],
        value: incomeItem?.y,
      })),
    [income]
  );

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={{ marginRight: "20px", width: "100%" }}>
        <h4>Expenses</h4>
        <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Expense</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((row, index) => (
              <tr style={{ border: "1px solid black", padding: "8px" }} key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{row.x}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ width: "100%" }}>
        <h4>Income</h4>
        <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Income</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.map((row, index) => (
              <tr key={index} style={{ border: "1px solid black", padding: "8px" }}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{row.x}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}
                >{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};





export default LineChart;
