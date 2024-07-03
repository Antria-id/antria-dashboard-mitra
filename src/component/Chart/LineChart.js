import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Pendapatan Rp",
        data: Array(12).fill(0), // Initialize with zeros
        borderWidth: 2,
        fill: true,
        tension: 0.8,
      },
    ],
  });

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
    chart.data.datasets[0].borderColor = gradient;
    chart.data.datasets[0].backgroundColor = gradient;

    chart.update();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://development.verni.yt/pesanan/mitra/1");
        const orders = response.data;
        const monthlyRevenue = Array(12).fill(0);

        orders.forEach(order => {
          const month = new Date(order.created_at).getMonth();
          order.oderlist.forEach(item => {
            monthlyRevenue[month] += item.produk.harga * item.quantity;
          });
        });

        setData(prevData => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: monthlyRevenue,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      applyGradient(chart);
    }
  }, [data]);

  return (
    <div className="w-full sm:h-full h-full max-h-full max-w-full sm:max-w-4xl mx-auto p-4">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
