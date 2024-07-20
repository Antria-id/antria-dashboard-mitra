// src/components/PieChart.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { decodeToken } from '../../utils/DecodeToken';

ChartJS.register(ArcElement, Tooltip, Legend);
const axiosInstance = axios.create({
  baseURL: 'https://development.verni.yt',
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

export default function PieChart(props) {
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      const decodedToken = decodeToken(token);
      const mitraId = decodedToken ? decodedToken.mitraId : 1; // Default to 1 if not found

      try {
        const response = await axiosInstance.get(`/pesanan/mitra/${mitraId}`);
        const data = response.data;
        let online = 0;
        let offline = 0;

        data.forEach(order => {
          if (order.pemesanan === 'ONLINE') {
            online++;
          } else if (order.pemesanan === 'OFFLINE') {
            offline++;
          }
        });

        setOnlineCount(online);
        setOfflineCount(offline);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Online', 'Offline'],
    datasets: [
      {
        data: [onlineCount, offlineCount],
        backgroundColor: ['#A252A0', '#E74C4C'],
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
