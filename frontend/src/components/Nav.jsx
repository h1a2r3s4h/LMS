import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";

import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Nav() {
  let [showHam, setShowHam] = useState(false);
  let [showPro, setShowPro] = useState(false);
  let [scrolled, setScrolled] = useState(false);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);

  // Navbar darker on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      await dispatch(setUserData(null));
      navigate("/");          // ADD THIS LINE
      toast.success("LogOut Successfully");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <div
        className={`w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between z-50
        transition duration-300
        ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.55)]"
            : "bg-black/25 backdrop-blur-md border-b border-white/5"
        }`}
      >
        {/* LEFT: LOGO */}
        <div className="lg:w-[28%] w-[60%] lg:pl-[50px] flex items-center">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer select-none leading-none"
          >
            {/* EMBEDDED */}
            <div className="text-[24px] lg:text-[32px] font-extrabold italic tracking-[2px] text-white">
              EMBEDDED
            </div>

            {/* Xcelerate Labs */}
            <div className="flex items-baseline gap-2 -mt-[4px]">
              <div className="text-[18px] lg:text-[22px] font-extrabold italic bg-gradient-to-b from-[#ffd27a] via-[#ff9b2f] to-[#c8680f] text-transparent bg-clip-text">
                Xcelerate
              </div>

              <div className="text-[18px] lg:text-[22px] font-extrabold italic bg-gradient-to-b from-[#67d7ff] via-[#2b7bff] to-[#123f9b] text-transparent bg-clip-text">
                Labs
              </div>

              {/* right gold line */}
              <div className="hidden lg:block ml-2 w-[90px] h-[3px] rounded-full bg-gradient-to-r from-[#f0d07b] via-[#c99b32] to-transparent opacity-90" />
            </div>

            {/* underline */}
            <div className="mt-[4px] h-[3px] w-[220px] bg-gradient-to-r from-[#f0d07b] via-[#c99b32] to-transparent rounded-full opacity-90" />
          </div>
        </div>

        {/* RIGHT: Desktop menu */}
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden relative">
          {!userData ? (
            <IoMdPerson
              className="w-[50px] h-[50px] fill-white cursor-pointer border-[2px] border-white/40 bg-black/50 rounded-full p-[10px]
                         hover:border-white transition duration-300"
              onClick={() => setShowPro((prev) => !prev)}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black/50 border-white/40 cursor-pointer
                         hover:border-white transition duration-300"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-[100%] h-[100%] rounded-full object-cover"
                  alt=""
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black/50 border-white/40 cursor-pointer">
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          )}

          {userData?.role === "educator" ? (
            <div
              className="px-[20px] py-[10px] border border-white/30 text-white bg-black/40 rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer
                         hover:border-white hover:bg-black/60 transition duration-300"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          ) : (
            ""
          )}

          {/* ONLY LOGIN GLOWS */}
          {!userData && (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-black/40
                         shadow-[0_0_18px_rgba(255,255,255,0.55)]
                         hover:shadow-[0_0_30px_rgba(255,255,255,0.9)]
                         hover:bg-black/60 transition duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          )}

          {userData && (
            <span
              className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
              onClick={handleLogout}
            >
              LogOut
            </span>
          )}

          {/* Profile dropdown (Glow + Glass) */}
          {showPro && (
            <div className="absolute top-[110%] right-[0%] z-50">
              <div className="relative w-[220px] rounded-2xl p-[14px] border border-white/20 bg-black/75 backdrop-blur-xl shadow-[0_0_35px_rgba(255,255,255,0.18)]">
                <div className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowPro(false);
                    }}
                    className="w-full py-[14px] rounded-2xl text-white text-[17px] font-semibold bg-black/70
                               border border-white/15
                               shadow-[0_0_18px_rgba(255,255,255,0.12)]
                               hover:shadow-[0_0_26px_rgba(255,255,255,0.25)]
                               hover:border-white/35
                               hover:scale-[1.02]
                               transition duration-300"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/enrolledcourses");
                      setShowPro(false);
                    }}
                    className="w-full py-[14px] rounded-2xl text-white text-[17px] font-semibold bg-black/70
                               border border-white/15
                               shadow-[0_0_18px_rgba(255,255,255,0.12)]
                               hover:shadow-[0_0_26px_rgba(255,255,255,0.25)]
                               hover:border-white/35
                               hover:scale-[1.02]
                               transition duration-300"
                  >
                    My Courses
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <GiHamburgerMenu
          className="w-[30px] h-[30px] lg:hidden fill-white cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 w-[100vw] h-[100vh] bg-black/80 backdrop-blur-xl flex items-center justify-center flex-col gap-5 z-50 ${
          showHam
            ? "translate-x-[0%] transition duration-500 ease-in-out"
            : "translate-x-[-100%] transition duration-500 ease-in-out"
        }`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]"
          onClick={() => setShowHam((prev) => !prev)}
        />

        {!userData ? (
          <IoMdPerson className="w-[50px] h-[50px] fill-white cursor-pointer border-[2px] border-white/40 bg-black/40 rounded-full p-[10px]" />
        ) : (
          <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black/40 border-white/40 cursor-pointer">
            {userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                className="w-[100%] h-[100%] rounded-full object-cover"
                alt=""
              />
            ) : (
              <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black/40 border-white/40 cursor-pointer">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
        )}

        <span
          className="flex items-center justify-center gap-2 text-white border border-white/30 bg-black/35 rounded-2xl px-[65px] py-[18px] text-[18px]
                     hover:bg-black/55 hover:border-white transition duration-300"
          onClick={() => {
            navigate("/profile");
            setShowHam(false);
          }}
        >
          My Profile
        </span>

        <span
          className="flex items-center justify-center gap-2 text-white border border-white/30 bg-black/35 rounded-2xl px-[65px] py-[18px] text-[18px]
                     hover:bg-black/55 hover:border-white transition duration-300"
          onClick={() => {
            navigate("/enrolledcourses");
            setShowHam(false);
          }}
        >
          My Courses
        </span>

        {userData?.role === "educator" ? (
          <div
            className="flex items-center justify-center gap-2 text-[18px] text-white border border-white/30 bg-black/35 rounded-2xl px-[60px] py-[18px]
                       hover:bg-black/55 hover:border-white transition duration-300"
            onClick={() => {
              navigate("/dashboard");
              setShowHam(false);
            }}
          >
            Dashboard
          </div>
        ) : (
          ""
        )}

        {/* Mobile Login Glow */}
        {!userData ? (
          <span
            className="flex items-center justify-center gap-2 text-[18px] text-white border-2 border-white bg-black/40 rounded-2xl px-[80px] py-[18px]
                       shadow-[0_0_18px_rgba(255,255,255,0.55)]
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.9)]
                       hover:bg-black/60 transition duration-300"
            onClick={() => {
              navigate("/login");
              setShowHam(false);
            }}
          >
            Login
          </span>
        ) : (
          <span
            className="flex items-center justify-center gap-2 text-[18px] text-white border border-white/30 bg-black/35 rounded-2xl px-[75px] py-[18px]
                       hover:bg-black/55 hover:border-white transition duration-300"
            onClick={() => {
              handleLogout();
              setShowHam(false);
            }}
          >
            LogOut
          </span>
        )}
      </div>
    </div>
  );
}

export default Nav;
