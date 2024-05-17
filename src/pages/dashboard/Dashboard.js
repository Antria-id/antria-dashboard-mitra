import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Card from "../../component/card/Card";
import { MdPeopleAlt } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { UserData } from "../../data/Data";
import LineChart from "../../component/Chart/LineChart";
import BarChart from "../../component/Chart/BarChart";
import PieChart from "../../component/Chart/PieChart";

export default function Dashboard() {
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

  const cardData = [
    {
      icon: <GrMoney size={50} color="white" />,
      tag: "Jumlah Pemasukan",
      data: <>Rp <Data n={500000} /></>,
    },
    {
      icon: <MdPeopleAlt size={50} color="white" />,
      tag: "Jumlah Pengunjung",
      data: <Data n={300} />,
    },
  ];

  return (
    <aside
      className="
      bg-white 
      mt-[1.5rem] 
      rounded-xl 
      shadow-2xl 
      z-0 
      transition-all 
      mx-auto 
      duration-300 
      sm:w-[77rem] 
      w-[23.4rem] 
      sm:h-[51.563rem] 
      h-[43.2rem] 
      sm:overflow-y-hidden 
      overflow-y-auto"
    >
      <h1 className="text-[2rem] pl-[1.875rem] pt-[1.125rem] pb-[1rem] font-semibold">
        Dashboard
      </h1>
      <div className="flex sm:flex flex-col sm:flex-row sm:gap-y-0 gap-y-2">
        <div className="flex flex-col gap-4 sm:pl-[1.875rem] sm:justify-start justify-center">
          <div
            className="
            sm:flex 
            sm:flex-row 
            flex 
            flex-col 
            sm:justify-between 
            justify-center 
            items-center 
            gap-3"
          >
            {cardData.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                tag={card.tag}
                data={card.data}
              />
            ))}
          </div>
          {/* Pie Chart */}
          <div className="w-full flex justify-center items-center">
            <div
              className="
              sm:flex 
              sm:flex-col 
              sm:justify-center 
              sm:items-center
              flex-col
              justify-center
              items-center
              bg-gray-200 
              rounded-xl 
              p-4 
              sm:w-[36rem] 
              w-[21.2rem] 
              sm:h-[35.7rem] 
              h-[20rem]"
            >
              <PieChart size="sm:w-full sm:h-[130%]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full sm:gap-y-4 gap-2">
          <div className="bg-gray-200 rounded-xl p-4 sm:w-[36rem] w-[21.2rem] sm:h-[22rem] h-[15rem]">
            <LineChart chartData={userData} />
          </div>
          <div className="bg-gray-200 rounded-xl p-4 sm:w-[36rem] w-[21.2rem] sm:h-[21.2rem] h-[13rem]">
            <BarChart chartData={userData} />
          </div>
        </div>
      </div>
    </aside>
  );
}
