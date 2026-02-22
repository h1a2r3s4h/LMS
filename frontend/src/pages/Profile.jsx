import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function Profile() {

  let {userData} = useSelector(state=>state.user)
  let navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black px-6 py-12 flex items-center justify-center text-white">

      <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl p-10 max-w-xl w-full relative">

        {/* Back Arrow */}
        <FaArrowLeftLong
          className='absolute top-6 left-6 w-[20px] h-[20px] cursor-pointer text-gray-400 hover:text-red-500 transition'
          onClick={()=>navigate("/")}
        />

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">

          {userData.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt=""
              className="w-28 h-28 rounded-full object-cover border-4 border-red-600 shadow-lg"
            />
          ) : (
            <div className='w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-red-600 to-red-800'>
              {userData?.name?.slice(0,1).toUpperCase()}
            </div>
          )}

          <h2 className="text-3xl font-semibold mt-5">
            {userData.name}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            {userData.role}
          </p>

        </div>

        {/* Divider */}
        <div className="my-8 border-t border-zinc-800"></div>

        {/* Profile Info */}
        <div className="space-y-5 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-400">Email</span>
            <span className="text-gray-200">{userData.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Bio</span>
            <span className="text-gray-200 text-right max-w-[60%]">
              {userData.description || "No description added"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Enrolled Courses</span>
            <span className="text-red-500 font-semibold">
              {userData.enrolledCourses?.length || 0}
            </span>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-center">
          <button
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all shadow-lg font-medium"
            onClick={()=>navigate("/editprofile")}
          >
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  )
}

export default Profile