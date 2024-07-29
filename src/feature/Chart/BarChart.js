// src/components/BarChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { decodeToken } from "../../utils/DecodeToken";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fetchData = async () => {
  const token = localStorage.getItem("authToken");
  const decodedToken = decodeToken(token);
  const mitraId = decodedToken ? decodedToken.mitraId : 1; // Default to 1 if not found

  try {
    const response = await fetch(
      `http://antriaapi.verni.yt/pesanan/mitra/${mitraId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const processData = (data) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const initialData = {
    online: Array(12).fill(0),
    offline: Array(12).fill(0),
  };

  data.forEach((order) => {
    const date = new Date(order.created_at);
    const month = date.getMonth();
    if (order.pemesanan === "ONLINE") {
      initialData.online[month] += 1;
    } else if (order.pemesanan === "OFFLINE") {
      initialData.offline[month] += 1;
    }
  });

  return {
    labels: months,
    datasets: [
      {
        label: "Online",
        data: initialData.online,
        backgroundColor: "#A252A0",
      },
      {
        label: "Offline",
        data: initialData.offline,
        backgroundColor: "#E74C4C",
      },
    ],
  };
};

export default function BarChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      const processedData = processData(data);
      setChartData(processedData);
    };
    getData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to adjust its height and width
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Transaksi Bulanan",
      },
    },
  };

  return (
    <div className="w-full p-4 mx-auto">
      <div className="relative h-64 sm:h-80 md:h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
