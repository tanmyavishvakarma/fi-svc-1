import { GlobalContext } from "@/context/GlobalState";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Switch from "react-switch";
import { useTable } from "react-table";

const PieChart: React.FC = () => {
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

    const { quantities = [], names = [] } = data;

    const palette = generatePalette(names.length);

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === "Chart" ? "List" : "Chart"));
    };
    return (
        <div>
            {viewMode === "Chart" ? (
                <ChartView names={names} quantities={quantities} palette={palette} />
            ) : (
                <TableView names={names} quantities={quantities} />
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

const ChartView: React.FC<{ names: string[]; quantities: number[]; palette: string[] }> = ({
    names,
    quantities,
    palette,
}) => {
    return (
        <div>
            {names.length === 0 ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    No Records Found. Please Add a Transaction.
                </div>
            ) : (
                <Chart
                    type="pie"
                    series={quantities}
                    options={{
                        labels: names,
                        legend: {
                            show: true,
                            position: "bottom",
                        },
                        title: {
                            text: "Category Expense",
                            align: "left",
                        },
                        colors: palette,
                    }}
                />
            )}
        </div>
    );
};

const TableView: React.FC<{ names: string[]; quantities: number[] }> = ({
    names,
    quantities,
}) => {
    const columns = [
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Expense",
            accessor: "quantity",
        },
    ];

    const tableData = names.map((name, index) => ({
        category: name,
        quantity: quantities[index],
    }));

    return (
        <div>
            <Table columns={columns} data={tableData} />
        </div>
    );
};

const Table: React.FC<{ columns: any[]; data: any[] }> = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table
            {...getTableProps()}
            style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}
        >
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{ border: "1px solid black", padding: "8px" }}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} style={{ borderBottom: "1px solid black" }}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

function generatePalette(count: number): string[] {
    const palette = [
        "#00AB55",
        "#2D99FF",
        "#FFE700",
        "#826AF9",
        "#FF6F61",
        "#6B5B95",
        "#88B04B",
        "#FCCE7B",
        "#B565A7",
        "#5A8770",
    ];
    const selectedColors = palette.slice(0, count);
    return selectedColors;
}

export default PieChart;
