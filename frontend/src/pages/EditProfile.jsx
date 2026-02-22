import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function EditProfile() {

  let {userData} = useSelector(state=>state.user)
  let [name,setName] = useState(userData.name || "")
  let [description,setDescription] = useState(userData.description || "")
  let [photoUrl,setPhotoUrl] = useState(null)
  let dispatch = useDispatch()
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate()

  const formData = new FormData()
  formData.append("name",name)
  formData.append("description",description)
  formData.append("photoUrl",photoUrl)

  const updateProfile = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + "/api/user/updateprofile",
        formData,
        {withCredentials:true}
      )

      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("Profile Updated Successfully")

    } catch (error) {
      toast.error("Profile Update Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12 text-white">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-10 max-w-xl w-full relative">

        {/* Back Arrow */}
        <FaArrowLeftLong
          className='absolute top-6 left-6 w-[20px] h-[20px] cursor-pointer text-gray-400 hover:text-red-500 transition'
          onClick={()=>navigate("/profile")}
        />

        <h2 className="text-3xl font-semibold text-center mb-8">
          <span className="text-red-500">Edit</span> Profile
        </h2>

        <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>

          {/* Profile Preview */}
          <div className="flex flex-col items-center gap-4">

            {userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt=""
                className="w-28 h-28 rounded-full object-cover border-4 border-red-600 shadow-lg"
              />
            ) : (
              <div className='w-28 h-28 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br from-red-600 to-red-800 font-bold'>
                {userData?.name?.slice(0,1).toUpperCase()}
              </div>
            )}

            <input
              type="file"
              name="photoUrl"
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-red-700 file:text-white hover:file:bg-red-600 transition"
              onChange={(e)=>setPhotoUrl(e.target.files[0])}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              placeholder={userData.name}
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              readOnly
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-gray-500"
              placeholder={userData.email}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              placeholder="Tell us about yourself"
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            onClick={updateProfile}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all shadow-lg font-medium"
          >
            {loading
              ? <ClipLoader size={20} color='white'/>
              : "Save Changes"
            }
          </button>

        </form>

      </div>
    </div>
  )
}

export default EditProfile