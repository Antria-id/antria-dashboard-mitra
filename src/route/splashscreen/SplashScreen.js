import React, { useEffect } from "react";
import { useTypewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import Splash from "../../assets/Splash.gif";
import './style.css';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/data-analytics");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  const [typeEffect] = useTypewriter({
    words: ["emuat halaman..."],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="text-center">
        <div className="sm:w-[31.438rem] sm:h-[28.875rem] w-[15.5rem] h-[14.5rem]">
          <img src={Splash} alt="Logo" />
        </div>
        <h1 className="text-2xl font-semibold mt-4 loading-animation">M{typeEffect}</h1>
      </div>
    </div>
  );
}
