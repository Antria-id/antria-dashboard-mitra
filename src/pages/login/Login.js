import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
import Button from "../../component/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import AuthContext from "../../services/AuthProvider";
import SplashScreen from "../../route/splashscreen/SplashScreen";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();
  const { _Login } = useContext(AuthContext);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const buttonPass = () => {
    setShowPass((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Mohon isi email dan password Anda");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://antriaapi.verni.yt/auth/login/mitra",
        {
          username,
          password,
        }
      );
      const accessToken = response.data.access_token;
      console.log(accessToken);
      localStorage.setItem("authToken", accessToken);
      const decoded = jwtDecode(accessToken);

      if (!decoded.payload.isOwner) {
        setError("Anda tidak memiliki izin untuk masuk.");
        setIsUsernameValid(false);
        setIsPasswordValid(false);
        return;
      }

      console.log(decoded.payload);
      localStorage.setItem("authToken", accessToken);
      _Login(accessToken);

      if (rememberMe) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      setIsUsernameValid(true);
      setIsPasswordValid(true);
      setShowSplash(true);
    } catch (error) {
      console.error("Login error", error);
      setError("Email atau password salah. Silakan coba lagi.");
      setIsUsernameValid(false);
      setIsPasswordValid(false);
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

  const [typeEffect] = useTypewriter({
    words: ["elamat datang mitra Antria 👋"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="w-full h-full bg-[#F6F5F5]">
      <div className="flex justify-center items-center h-screen">
        <div className="md:w-[30.313rem] w-[22rem] h-[35.75rem] bg-white rounded-xl shadow-xl">
          <img className="ml-[1.563rem] mt-[2.2rem]" src={Logo} alt="Logo" />
          <div>
            <h1 className="mt-[3.288rem] ml-[1.563rem] font-semibold sm:text-[1.5rem] text-[1.3rem]">
              S{typeEffect}
            </h1>
            <h2 className="mt-[0.1rem] ml-[1.563rem] font-semibold text-[#8A8A8A] text-[0.75rem]">
              Masukan data akun mitra yang sudah terdaftar
            </h2>
            <form
              onSubmit={handleLogin}
              className="sm:flex sm:flex-col sm:justify-center justify-center ml-[1.4rem] mt-[1.5rem]"
            >
              <div className="gap-y-[1rem]">
                <h1 className="text-[0.75rem] font-bold">Username</h1>
                <input
                  className={`md:w-[27.125rem] w-[19rem] h-[3.438rem] bg-white shadow-xl py-3 px-3 rounded-xl ${
                    username === ""
                      ? ""
                      : isUsernameValid
                      ? "border-green-500 border-4"
                      : "border-red-500 border-4"
                  }`}
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukan nama akun anda"
                />
                <div className="relative mt-[1.188rem]">
                  <h1 className="text-[0.75rem] font-bold">Password</h1>
                  <input
                    className={`md:w-[27.125rem] w-[19rem] h-[3.438rem] bg-white shadow-xl py-3 px-3 rounded-xl ${
                      password === ""
                        ? ""
                        : isPasswordValid
                        ? "border-green-500 border-4"
                        : "border-red-500 border-4"
                    }`}
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Masukan password anda"
                  />
                  <button
                    type="button"
                    className="absolute right-[2.4rem] top-[60%] transform -translate-y-1/2"
                    onClick={buttonPass}
                  >
                    {showPass ? (
                      <AiFillEye color="c4c4c4" size={24} />
                    ) : (
                      <AiFillEyeInvisible color="c4c4c4" size={24} />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-[1.5rem]">
                  <Link to="/lupa-password">
                    <h1 className="text-[0.75rem] font-bold hover:text-blue-500 hover:underline">
                      Lupa password?
                    </h1>
                  </Link>
                  <div className="flex flex-row-reverse gap-2 items-center mr-[2.4rem]">
                    <input
                      className="w-[1rem] h-[1rem] cursor-pointer bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 text-[0.75rem] font-semibold"
                    >
                      Simpan Riwayat Login
                    </label>
                  </div>
                </div>
                <button type="submit" data-cy="submit" className="mt-[4rem]">
                  <Button
                    text="Masuk"
                    size="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
                    bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
                    txtColor="text-white"
                    txtSize="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
                    position="sm:flex sm:justify-center sm:items-center flex justify-center items-center"
                  />
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
