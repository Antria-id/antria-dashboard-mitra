import { useContext, useState } from "react";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
import Button from "../../component/button/Button";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import AuthContext from "../../component/context/AuthProvider"; 

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { _Login } = useContext(AuthContext);

  const buttonPass = () => {
    setShowPass((prevState) => !prevState);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Mohon isi email dan password Anda");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://development.verni.yt/auth/login/mitra",
        {
          username,
          password,
        }
      );
      const accessToken = response.data.access_token;
      localStorage.setItem('authToken', accessToken );
      const decoded = jwtDecode(accessToken);
      console.log(decoded.payload);
      localStorage.setItem("authToken", accessToken);
      _Login(accessToken);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      setError("Email atau password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  function jwtDecode(token) {
    let decodedToken = {};
    decodedToken.raw = token;
    const [headerBase64, payloadBase64] = token.split(".");

    decodedToken.header = JSON.parse(window.atob(headerBase64));
    decodedToken.payload = JSON.parse(window.atob(payloadBase64));

    return decodedToken;
  }

  const [typeEffect1] = useTypewriter({
    words: ["Selamat datang mitra Antria 👋"],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 40,
  });

  return (
    <div className="w-full h-full bg-[#F6F5F5]">
      <div className="flex justify-center items-center h-screen">
        <div className="md:w-[30.313rem] w-[22rem] h-[35.75rem] bg-white rounded-xl shadow-xl">
          <img className="ml-[1.563rem] mt-[2.2rem]" src={Logo} alt="Logo" />
          <div>
            <h1 className="mt-[3.288rem] ml-[1.563rem] font-semibold sm:text-[1.5rem] text-[1.3rem]">
              {typeEffect1}
            </h1>
            <h2 className="mt-[0.1rem] ml-[1.563rem] font-semibold text-[#8A8A8A] text-[0.75rem]">
              Masukan data akun mitra yang sudah terdaftar
            </h2>
            <div className="sm:flex sm:flex-col sm:justify-center justify-center ml-[1.4rem] mt-[1.188rem]">
              <h1 className="text-[0.75rem] font-bold">Username</h1>
              <div>
                <input
                  className="md:w-[27.125rem] w-[19rem] h-[3.438rem] bg-white shadow-xl py-3 px-3 rounded-xl"
                  type="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukan nama akun anda"
                />
                <div className="mt-[1.188rem]">
                  <h1 className="text-[0.75rem] font-bold">Password</h1>
                  <input
                    className="md:w-[27.125rem] w-[19rem] h-[3.438rem] bg-white shadow-xl py-3 px-3 rounded-xl"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Masukan password anda"
                  />
                  <button
                    className="absolute sm:right-[38rem] right-[3.4rem] mt-[1rem]"
                    onClick={buttonPass}
                  >
                    {showPass ? (
                      <AiFillEye color="c4c4c4" size={24} />
                    ) : (
                      <AiFillEyeInvisible color="c4c4c4" size={24} />
                    )}
                  </button>
                </div>
                <div className="sm:pr-0 pr-[3rem] mt-[4.313rem]">
                  <Button
                    text="Masuk"
                    size="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
                    bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
                    txtColor="text-white"
                    txtSize="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
                    position="sm:flex sm:justify-center sm:items-center flex justify-center items-center"
                    onClick={handleLogin}
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}