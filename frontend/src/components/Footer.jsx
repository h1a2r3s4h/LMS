import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate();

  return (
    <footer className="bg-black text-gray-300 py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row">
        {/* Logo + Description */}
        <div className="lg:w-[40%] md:w-[50%] w-[100%]">
          {/* LOGO TEXT */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer select-none inline-block leading-none"
          >
            <div className="text-[26px] font-extrabold italic tracking-[2px] text-white">
              EMBEDDED
            </div>

            <div className="flex items-baseline gap-2 -mt-[4px]">
              <div className="text-[18px] font-extrabold italic bg-gradient-to-b from-[#ffd27a] via-[#ff9b2f] to-[#c8680f] text-transparent bg-clip-text">
                Xcelerate
              </div>

              <div className="text-[18px] font-extrabold italic bg-gradient-to-b from-[#67d7ff] via-[#2b7bff] to-[#123f9b] text-transparent bg-clip-text">
                Labs
              </div>
            </div>

            <div className="mt-[6px] h-[3px] w-[220px] bg-gradient-to-r from-[#f0d07b] via-[#c99b32] to-transparent rounded-full opacity-90" />
          </div>

          {/* Description */}
          <p className="text-sm mt-4 text-gray-400 leading-relaxed">
            AI-powered learning platform built to help you grow smarter. Learn
            anytime, anywhere — with modern courses designed for real-world
            skills.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:w-[30%] md:w-[100%]">
          <h3 className="text-white font-semibold mb-3 text-[16px]">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li
              className="hover:text-white cursor-pointer transition duration-200"
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className="hover:text-white cursor-pointer transition duration-200"
              onClick={() => navigate("/allcourses")}
            >
              Courses
            </li>

            <li
              className="hover:text-white cursor-pointer transition duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </li>

            <li
              className="hover:text-white cursor-pointer transition duration-200"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
          </ul>
        </div>

        {/* Explore Categories */}
        <div className="lg:w-[30%] md:w-[100%]">
          <h3 className="text-white font-semibold mb-3 text-[16px]">
            Explore Categories
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition duration-200">
              Web Development
            </li>
            <li className="hover:text-white cursor-pointer transition duration-200">
              AI / ML
            </li>
            <li className="hover:text-white cursor-pointer transition duration-200">
              Data Science
            </li>
            <li className="hover:text-white cursor-pointer transition duration-200">
              UI / UX Design
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10 pt-5 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Embedded Xcelerate Labs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
