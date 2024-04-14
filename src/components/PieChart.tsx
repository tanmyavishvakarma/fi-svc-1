"use client"
import { GlobalContext } from "@/context/GlobalState";
import React, { useContext } from "react";
import Chart from "react-apexcharts";

interface DataItem {
    name: string;
    quantity: number;
}

const PieChart: React.FC = () => {
    const categories: { [key: string]: number } = {};
    const { transactions } = useContext(GlobalContext);

    transactions.forEach((expense) => {
        const { category, amount, isExpense } = expense;
        if (isExpense) {
            categories[category] = (categories[category] || 0) + Math.abs(amount);
        }
    });

    const names: string[] = Object.keys(categories);
    const quantities: number[] = Object.values(categories).map(value => Math.abs(value)); 

    const palette = generatePalette(names.length);

    return (
        <Chart
            type="pie"
            series={quantities}
            options={{
                labels: names,
                legend: {
                    show: true,
                    position: "bottom",
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
