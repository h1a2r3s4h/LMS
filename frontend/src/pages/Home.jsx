import React from "react";
import home from "../assets/home1.jpg";
import Nav from "../components/Nav";
import { SiViaplay } from "react-icons/si";
import Logos from "../components/Logos";
import Cardspage from "../components/Cardspage";
import ExploreCourses from "../components/ExploreCourses";
import About from "../components/About";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] overflow-hidden">
      {/* Button Glow CSS */}
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow {
          position: relative;
          z-index: 0;
          overflow: hidden;
        }

        .rainbow::before {
          content: "";
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-repeat: no-repeat;
          background-size: 50% 50%;
          filter: blur(12px);
          animation: rotate 4s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;

          background-image: conic-gradient(
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
          );
        }

        .rainbow:hover::before {
          opacity: 1;
        }
      `}</style>

      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav />

        <img
          src={home}
          className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]"
          alt=""
        />

        {/* Text Section */}
        <div
          className="
            absolute
            top-[16%]
            left-1/2
            -translate-x-1/2
            max-w-[1500px]
            w-full
            px-6 md:px-10 lg:px-14
            text-center
          "
        >
          {/* Main Line */}
          <span
            className="
              block
              font-extrabold
              tracking-tight
              leading-tight
              text-[18px]
              md:text-[32px]
              lg:text-[48px]
              text-white
              transition-all
              duration-300
              hover:scale-[1.01]
              hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]
            "
          >
            Learn smarter, build faster, and master the skills that turn ideas
            into real-world innovation.
          </span>

          {/* Small Catchy Line */}
     
        </div>

        {/* Buttons */}
        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
          {/* View All Courses */}
          <div
            className="rainbow p-0.5 rounded-[12px] hover:scale-105 transition duration-300 active:scale-100 cursor-pointer"
            onClick={() => navigate("/allcourses")}
          >
            <button className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 items-center bg-black/70 backdrop-blur">
              View all Courses{" "}
              <SiViaplay className="w-[30px] h-[30px] fill-white" />
            </button>
          </div>

          {/* Search with AI */}
          <div
            className="rainbow p-0.5 rounded-[12px] hover:scale-105 transition duration-300 active:scale-100 cursor-pointer"
            onClick={() => navigate("/searchwithai")}
          >
            <button className="px-[20px] py-[10px] bg-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center backdrop-blur">
              Search with AI
              <img
                src={ai}
                className="w-[30px] h-[30px] rounded-full hidden lg:block"
                alt=""
              />
              <img
                src={ai1}
                className="w-[35px] h-[35px] rounded-full lg:hidden"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>

      <Logos />
      <ExploreCourses />
      <Cardspage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
}

export default Home;
