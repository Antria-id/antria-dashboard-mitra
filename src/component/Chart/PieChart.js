// src/components/PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const data = {
    
    labels: ["Dine-In", "Take-Away"],
    datasets: [
      {
        data: [120, 180], // Contoh data, sesuaikan dengan kebutuhan
        backgroundColor: ["#A252A0", "#E74C4C"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className={`${props.size}`}>
      <Pie data={data} options={options} />
    </div>
  );
};