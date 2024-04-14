import { GlobalContext } from "@/context/GlobalState";
import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useTable } from "react-table";
import { useMemo } from 'react';

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
    <div>
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
      <div style={{ display: "flex", justifyContent:"center" }}>
        <h5>Toggle {viewMode} View</h5>
        <input
          type="checkbox"
          onChange={toggleViewMode}
          checked={viewMode === "List"}
        />
      </div>
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
        Header: 'Expense',
        accessor: 'expense',
      },
      {
        Header: 'Income',
        accessor: 'income',
      },
    ],
    []
  );


  const tableData = useMemo(
    () =>
      expenses.map((expense, index) => ({
        x: expense.x.toString().split("T")[0],
        expense: expense?.y,
        income: income[index]?.y,
      })),
    [expenses, income]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <div>
      <table {...getTableProps()} style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ border: '1px solid black' }}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};





export default LineChart;
