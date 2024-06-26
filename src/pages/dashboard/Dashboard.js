import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Card from "../../component/card/Card";
import { MdPeopleAlt } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { UserData } from "../../data/Data";
import LineChart from "../../component/Chart/LineChart";
import BarChart from "../../component/Chart/BarChart";
import PieChart from "../../component/Chart/PieChart";
import Tab from "../../component/tab/Tab";
import { FaHome, FaTable } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { IoAnalytics } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";
import Feedback from "../../component/feedback/Feedback";

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          "https://development.verni.yt/karyawan/mitra/2"
        );
        const data = await response.json();
        setEmployeeCount(data.length);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(
          "https://development.verni.yt/reviews/mitra/1"
        );
        const data = await response.json();
        setFeedbackCount(data.length);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchEmployeeData();
    fetchFeedbackData();
  }, []);

  const tabsAnalytics = [
    {
      label: "Income Analytics",
      icon: <IoAnalytics size={28} />,
      content: (
        <div className="flex flex-col justify-start w-full sm:w-[34rem] sm:h-[32rem] h-[26rem] overflow-y-scroll gap-2 sm:gap-4">
          <div className="bg-gray-200 rounded-xl p-4 w-full h-[16rem] sm:h-[22.7rem]">
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
        <div className="flex flex-col justify-start w-full sm:w-[34rem] sm:h-[32rem] overflow-y-scroll gap-2 sm:gap-4">
          <div className="bg-gray-200 rounded-xl p-4 w-full h-[13rem] sm:h-[25.2rem]">
            <h1 className="text-[1.5rem] font-semibold">
              Order System Mounthly
            </h1>
            <BarChart />
          </div>
          <div className="bg-gray-200 rounded-xl pl-6 w-full h-[20rem] sm:h-[30.7rem]">
            <h1 className="text-[1.5rem] font-semibold pt-4">
              Order System On Going
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
          <Feedback />
        </div>
      ),
    },
  ];

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Pendapatan",
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
      data: rupiah(500000),
      link: "/data-pemasukan",
    },
    {
      icon: <MdPeopleAlt size={50} color="white" />,
      tag: "Jumlah Pengunjung",
      data: <Data n={300} />,
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
      <h1 className="text-2xl pl-6 pt-4 pb-4 font-semibold">Data Analytics</h1>
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
            <div className="flex flex-col w-full sm:h-[5.7rem] pl-6 sm:w-auto gap-4">
              <Tab tabs={tabsAnalytics} />
            </div>
            <Tab tabs={tabsFeedback} />
          </div>
        </div>
      </div>
    </aside>
  );
}
