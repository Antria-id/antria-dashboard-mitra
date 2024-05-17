import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Create a reference for the canvas
  const chartRef = useRef(null);

  // Initialize data and options for the line chart
  const data = {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Pendapatan Rp",
        data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000],
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Function to apply gradient to the line
  const applyGradient = (chart) => {
    const canvas = chart.canvas;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, "#9b59b6");
    gradient.addColorStop(1, "#e74c3c"); 
    data.datasets[0].borderColor = gradient;
    data.datasets[0].backgroundColor = gradient;

    chart.update();
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      applyGradient(chart);
    }
  }, [chartRef]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineChart;
