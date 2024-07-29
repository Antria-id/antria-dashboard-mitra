// src/components/LineChart.jsx
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
import { decodeToken } from "../../utils/DecodeToken";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Axios instance with token handling
const axiosInstance = axios.create({
  baseURL: 'http://antriaapi.verni.yt',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default function LineChart() {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    labels: [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
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
    maintainAspectRatio: false, // Allow chart to adjust its height and width
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
        const token = localStorage.getItem('authToken');
        const decodedToken = decodeToken(token);
        const mitraId = decodedToken ? decodedToken.mitraId : 1; // Default to 1 if not found

        const response = await axiosInstance.get(`/pesanan/mitra/${mitraId}`);
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
    <div className="w-full p-4 mx-auto">
      <div className="relative h-72 sm:h-80 md:h-96">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
