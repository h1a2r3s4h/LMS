import React, { useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img1 from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";

function Courses() {

  let navigate = useNavigate()
  let dispatch = useDispatch()
  const { creatorCourseData } = useSelector(state => state.course)

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreatorcourses", { withCredentials: true })
        await dispatch(setCreatorCourseData(result.data))
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    getCreatorData()
  }, [])

  return (
    <div className="flex min-h-screen bg-black text-white">

      <div className="w-full min-h-screen p-4 sm:p-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">

          <div className='flex items-center gap-4'>
            <FaArrowLeftLong
              className='w-[20px] h-[20px] cursor-pointer text-gray-400 hover:text-red-500 transition duration-300'
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-2xl font-semibold tracking-wide">
              <span className="text-red-500">Your</span> Courses
            </h1>
          </div>

          <button
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={() => navigate("/createcourses")}
          >
            Create Course
          </button>

        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6 overflow-x-auto">

          <table className="min-w-full text-sm">
            <thead className="border-b border-zinc-700">
              <tr className="text-gray-400 uppercase text-xs tracking-wider">
                <th className="text-left py-4 px-4">Course</th>
                <th className="text-left py-4 px-4">Price</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-zinc-800 hover:bg-zinc-800 transition duration-300"
                >
                  <td className="py-4 px-4 flex items-center gap-4">
                    {course?.thumbnail ?
                      <img
                        src={course?.thumbnail}
                        alt=""
                        className="w-20 h-14 object-cover rounded-lg border border-zinc-700"
                      />
                      :
                      <img
                        src={img1}
                        alt=""
                        className="w-20 h-14 object-cover rounded-lg border border-zinc-700"
                      />
                    }
                    <span className="font-medium">{course?.title}</span>
                  </td>

                  <td className="py-4 px-4">
                    {course?.price ? `₹${course?.price}` : "₹ NA"}
                  </td>

                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${course?.isPublished
                        ? "bg-green-900 text-green-400 border border-green-700"
                        : "bg-red-900 text-red-400 border border-red-700"}`}>
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <FaEdit
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-300"
                      onClick={() => navigate(`/addcourses/${course?._id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-center text-sm text-gray-500 mt-6">
            A list of your recent courses.
          </p>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-5">

          {creatorCourseData?.map((course, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg p-5 flex flex-col gap-4 hover:bg-zinc-800 transition duration-300"
            >
              <div className="flex gap-4 items-center">
                {course?.thumbnail ?
                  <img
                    src={course?.thumbnail}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-zinc-700"
                  />
                  :
                  <img
                    src={img1}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-zinc-700"
                  />
                }

                <div className="flex-1">
                  <h2 className="font-medium text-sm">
                    {course?.title}
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">
                    {course?.price ? `₹${course?.price}` : "₹ NA"}
                  </p>
                </div>

                <FaEdit
                  className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-300"
                  onClick={() => navigate(`/addcourses/${course?._id}`)}
                />
              </div>

              <span className={`w-fit px-3 py-1 text-xs rounded-full font-medium
                ${course?.isPublished
                  ? "bg-green-900 text-green-400 border border-green-700"
                  : "bg-red-900 text-red-400 border border-red-700"}`}>
                {course?.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}

          <p className="text-center text-sm text-gray-500 mt-4">
            A list of your recent courses.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Courses