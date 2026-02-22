import React from 'react'
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import img from "../../assets/empty.jpg";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-black text-white relative">

      {/* Back Arrow */}
      <FaArrowLeftLong
        className='w-[22px] absolute top-[8%] left-[5%] h-[22px] cursor-pointer text-gray-400 hover:text-red-500 transition duration-300'
        onClick={() => navigate("/")}
      />

      <div className="w-full px-6 py-10 space-y-12">

        {/* Welcome Section */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-black via-zinc-900 to-black border border-zinc-800 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8">

          <img
            src={userData?.photoUrl || img}
            alt="Educator"
            className="w-28 h-28 rounded-full object-cover border-4 border-red-600 shadow-lg"
          />

          <div className="text-center md:text-left space-y-3">
            <h1 className="text-3xl font-bold tracking-wide">
              Welcome, <span className="text-red-500">{userData?.name || "Educator"}</span> 👋
            </h1>

            <h2 className='text-xl font-semibold'>
              Total Earnings :
              <span className='ml-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent font-bold'>
                ₹{totalEarnings.toLocaleString()}
              </span>
            </h2>

            <p className="text-gray-400 text-sm max-w-md">
              {userData?.description || "Start creating amazing courses for your students!"}
            </p>

            <button
              onClick={() => navigate("/courses")}
              className='mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all duration-300 shadow-lg'
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Course Progress Chart */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6 hover:shadow-red-900/40 transition duration-300">
            <h2 className="text-lg font-semibold mb-6 text-red-500">
              Course Progress (Lectures)
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
                <Bar dataKey="lectures" fill="url(#colorLectures)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorLectures" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment Chart */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6 hover:shadow-red-900/40 transition duration-300">
            <h2 className="text-lg font-semibold mb-6 text-red-500">
              Student Enrollment
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
                <Bar dataKey="enrolled" fill="url(#colorEnroll)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard