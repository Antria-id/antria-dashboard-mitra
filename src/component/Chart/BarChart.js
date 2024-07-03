import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const fetchData = async () => {
  try {
    const response = await fetch('https://development.verni.yt/pesanan');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const processData = (data) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const initialData = {
    online: Array(12).fill(0),
    offline: Array(12).fill(0),
  };

  data.forEach((order) => {
    const date = new Date(order.created_at);
    const month = date.getMonth();
    if (order.pemesanan === 'ONLINE') {
      initialData.online[month] += 1;
    } else if (order.pemesanan === 'OFFLINE') {
      initialData.offline[month] += 1;
    }
  });

  return {
    labels: months,
    datasets: [
      {
        label: 'Online',
        data: initialData.online,
        backgroundColor: '#A252A0',
      },
      {
        label: 'Offline',
        data: initialData.offline,
        backgroundColor: '#E74C4C',
      },
    ],
  };
};

const BarChart = () => {
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
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Orders',
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
