import { GlobalContext } from "@/context/GlobalState";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const PieChart: React.FC = () => {
    const { fetchInsights, transactions } = useContext(GlobalContext);
    const [data, setData] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        const fetchData = async () => {
            const insights = await fetchInsights();
            setData(insights);
        };
        fetchData();
    }, [fetchInsights, transactions]);

    const { quantities = [], names = [] } = data;

    const palette = generatePalette(names.length);

    return (
        names.length === 0 ?
            <div style={{ display: "flex", justifyContent: "center" }}>
                No Records Found Please Add a Transaction
            </div>
            :
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
                        align: "left"
                    },
                    colors: palette,
                }}
            />
    );
};

function generatePalette(count: number): string[] {
    const palette = ['#00AB55', '#2D99FF', '#FFE700', '#826AF9', '#FF6F61', '#6B5B95', '#88B04B', '#FCCE7B', '#B565A7', '#5A8770'];
    const selectedColors = palette.slice(0, count);
    return selectedColors;
}

export default PieChart;
