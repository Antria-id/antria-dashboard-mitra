// src/components/PieChart.jsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("https://development.verni.yt/pesanan");
        const data = await response.json();

        // Process the data to count ONLINE and OFFLINE orders
        let online = 0;
        let offline = 0;

        data.forEach(order => {
          if (order.pemesanan === "ONLINE") {
            online++;
          } else if (order.pemesanan === "OFFLINE") {
            offline++;
          }
        });

        setOnlineCount(online);
        setOfflineCount(offline);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ["Online", "Offline"],
    datasets: [
      {
        data: [onlineCount, offlineCount],
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
}
