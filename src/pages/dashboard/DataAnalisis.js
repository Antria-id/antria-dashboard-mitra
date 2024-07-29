import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Card from "../../component/card/Card";
import { MdPeopleAlt } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { UserData } from "../../data/Data";
import LineChart from "../../feature/Chart/LineChart";
import BarChart from "../../feature/Chart/BarChart";
import PieChart from "../../feature/Chart/PieChart";
import Tab from "../../component/tab/Tab";
import { FaTable } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { IoAnalytics } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";
import Feedback from "../../feature/feedback/Feedback";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Axios instance with token handling
const axiosInstance = axios.create({
  baseURL: "http://antriaapi.verni.yt",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function DataAnalisis() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [mitraId, setMitraId] = useState(null); // State to hold mitraId

  useEffect(() => {
    // Decode JWT token to get mitraId
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setMitraId(decodedToken.mitraId); // Adjust if `mitraId` key is different
    }
  }, []);

  useEffect(() => {
    if (mitraId) {
      const fetchEmployeeData = async () => {
        try {
          const response = await axiosInstance.get(
            `/karyawan/mitra/${mitraId}`
          );
          const data = response.data;
          setEmployeeCount(data.length);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };

      const fetchFeedbackData = async () => {
        try {
          const response = await axiosInstance.get(`/reviews/mitra/${mitraId}`);
          const data = response.data;
          setFeedbackCount(data.length);
        } catch (error) {
          console.error("Error fetching feedback data:", error);
        }
      };

      const fetchIncomeData = async () => {
        try {
          const response = await axiosInstance.get(`/pesanan/mitra/${mitraId}`);
          const data = response.data;
          const total = data.reduce((acc, order) => {
            if (order.status === "SUCCESS") {
              const orderTotal = order.oderlist.reduce((sum, item) => {
                return sum + item.quantity * item.produk.harga;
              }, 0);
              return acc + orderTotal;
            }
            return acc;
          }, 0);
          setTotalIncome(total);
        } catch (error) {
          console.error("Error fetching income data:", error);
        }
      };

      const fetchVisitorData = async () => {
        try {
          const response = await axiosInstance.get(`/pesanan/mitra/${mitraId}`);
          const data = response.data;
          const visitorCount = data.filter((order) => order.takeaway).length;
          setVisitorCount(visitorCount);
        } catch (error) {
          console.error("Error fetching visitor data:", error);
        }
      };

      fetchEmployeeData();
      fetchFeedbackData();
      fetchIncomeData();
      fetchVisitorData();
    }
  }, [mitraId]); // Depend on mitraId to refetch when it changes

  const tabsAnalytics = [
    {
      label: "Income Analytics",
      icon: <IoAnalytics size={28} />,
      content: (
        <div className="flex flex-col justify-start w-full sm:w-[34rem] sm:h-[36rem] h-[40rem] overflow-y-scroll gap-2 sm:gap-4">
          <div className="bg-gray-200 rounded-xl p-4 w-full h-[24rem] sm:h-[28.7rem]">
            <h1 className="text-[1.5rem] font-semibold">Total Pendapatan</h1>
            <div className="sm:h-[30rem] h-[40rem]">
              <LineChart />
            </div>
          </div>
          <div className="flex flex-row justify-between bg-[#ECECEC] rounded-xl p-4 w-full h-[5rem] sm:h-[4.7rem]">
            <h1 className="flex justify-center h-[5rem] sm:h-[4.7rem] text-[1.3rem] font-medium">
              Lihat Tabel Pemasukan
            </h1>
            <Link to="/data-pemasukan">
              <div className="flex flex-row w-full justify-center h-[5rem] sm:h-[4.7rem] gap-2">
                <FaTable size={30} />
                <ChevronRight size={30} />
              </div>
            </Link>
          </div>
        </div>
      ),
    },
    {
      label: "Order System Analytics",
      icon: <IoAnalytics size={28} />,
      content: (
        <div className="flex flex-col justify-start w-full sm:w-[34rem] sm:h-[34rem] h-[40rem] overflow-y-scroll gap-2 sm:gap-4">
          <div className="bg-gray-200 rounded-xl p-4 w-full h-[24rem] sm:h-[28.7rem]">
            <h1 className="text-[1.5rem] font-semibold">
              Sistem Order Bulanan
            </h1>
            <BarChart />
          </div>
          <div className="bg-gray-200 rounded-xl pl-6 w-full h-[20rem] sm:h-[30.7rem]">
            <h1 className="text-[1.5rem] font-semibold pt-4">
              Sistem Order Hari ini
            </h1>
            <div className="relative bottom-[2.5rem]">
              <PieChart />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const tabsFeedback = [
    {
      label: "Customer Feedback",
      icon: <VscFeedback size={28} />,
      content: (
        <div>
          <Feedback mitraId={mitraId} />
        </div>
      ),
    },
  ];

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Jumlah pendapatan yang didapat:",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    if (UserData) {
      setUserData({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Pendapatan Tahunan",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, []);

  const Data = ({ n }) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 250,
      config: { mass: 1, tension: 20, friction: 10 },
    });

    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  };

  const rupiah = (harga) => {
    return new Intl.NumberFormat("id", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(harga);
  };

  const cardData = [
    {
      icon: <GrMoney size={50} color="white" />,
      tag: "Jumlah Pemasukan",
      data: rupiah(totalIncome),
      link: "/data-pemasukan",
    },
    {
      icon: <MdPeopleAlt size={50} color="white" />,
      tag: "Jumlah Pengunjung",
      data: <Data n={visitorCount} />,
    },
    {
      icon: <MdPeopleAlt size={50} color="white" />,
      tag: "Jumlah Karyawan",
      data: <Data n={employeeCount} />,
      link: "/data-akun",
    },
    {
      icon: <VscFeedback size={50} color="white" />,
      tag: "Feedback",
      data: <Data n={feedbackCount} />,
    },
  ];

  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`bg-white 
        sm:w-[77rem] 
        w-[23.4rem] 
        sm:h-[51.563rem] 
        h-[43.2rem] 
        mt-[1.5rem] 
        rounded-xl 
        shadow-2xl 
        z-0 
        transition-all 
        mx-auto 
        duration-300 
        sm:overflow-y-hidden 
        overflow-y-auto
      `}
    >
      <h1 className="text-2xl pl-6 pt-4 pb-4 font-semibold">Data Analsis</h1>
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:ml-6 ml-3">
            {cardData.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                tag={card.tag}
                data={card.data}
                link={card.link}
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <div className="flex flex-col w-full sm:h-[5.7rem] h-[48rem] pl-6 sm:w-auto gap-4">
              <Tab tabs={tabsAnalytics} />
            </div>
            <Tab tabs={tabsFeedback} />
          </div>
        </div>
      </div>
    </aside>
  );
}
