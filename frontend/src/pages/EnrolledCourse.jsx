import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function EnrolledCourse() {

  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen w-full px-6 py-12 bg-black text-white relative">

      {/* Back Arrow */}
      <FaArrowLeftLong
        className='absolute top-6 left-6 w-[20px] h-[20px] cursor-pointer text-gray-400 hover:text-red-500 transition'
        onClick={()=>navigate("/")}
      />

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl text-center font-semibold mb-10">
        <span className="text-red-500">My</span> Enrolled Courses
      </h1>

      {userData.enrolledCourses.length === 0 ? (

        <p className="text-gray-400 text-center w-full text-sm">
          You haven’t enrolled in any course yet.
        </p>

      ) : (

        <div className="flex items-center justify-center flex-wrap gap-10">

          {userData.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden w-[300px] hover:scale-105 transition-all duration-300"
            >

              {/* Thumbnail */}
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-44 object-cover"
              />

              {/* Content */}
              <div className="p-5 space-y-3">

                <h2 className="text-lg font-semibold">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-400">
                  {course.category}
                </p>

                <p className="text-sm text-gray-500">
                  {course.level}
                </p>

                <button
                  className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all shadow-lg text-sm font-medium"
                  onClick={()=>navigate(`/viewlecture/${course._id}`)}
                >
                  Watch Now
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default EnrolledCourse