import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditLecture() {

  const [loading,setLoading]= useState(false)
  const [loading1,setLoading1]= useState(false)
  const {courseId , lectureId} = useParams()
  const {lectureData} = useSelector(state=>state.lecture)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedLecture = lectureData.find(
    lecture => lecture._id === lectureId
  )

  const [videoUrl,setVideoUrl] = useState(null)
  const [lectureTitle,setLectureTitle] = useState(selectedLecture?.lectureTitle || "")
  const [isPreviewFree,setIsPreviewFree] = useState(false)

  const formData = new FormData()
  formData.append("lectureTitle",lectureTitle)
  formData.append("videoUrl",videoUrl)
  formData.append("isPreviewFree",isPreviewFree)

  const editLecture = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formData,
        {withCredentials:true}
      )

      dispatch(setLectureData([...lectureData,result.data]))
      toast.success("Lecture Updated")
      navigate("/courses")

    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const removeLecture = async () => {
    setLoading1(true)
    try {
      await axios.delete(
        serverUrl + `/api/course/removelecture/${lectureId}`,
        {withCredentials:true}
      )

      toast.success("Lecture Removed")
      navigate(`/createlecture/${courseId}`)

    } catch (error) {
      toast.error("Lecture remove error")
    } finally {
      setLoading1(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">

      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 space-y-8">

        {/* Header */}
        <div className="flex items-center gap-3">
          <FaArrowLeft
            className="text-gray-400 hover:text-red-500 cursor-pointer transition"
            onClick={()=>navigate(`/createlecture/${courseId}`)}
          />
          <h2 className="text-2xl font-semibold">
            <span className="text-red-500">Update</span> Lecture
          </h2>
        </div>

        {/* Remove Button */}
        <button
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition text-sm shadow-lg"
          disabled={loading1}
          onClick={removeLecture}
        >
          {loading1
            ? <ClipLoader size={20} color='white'/>
            : "Remove Lecture"
          }
        </button>

        {/* Inputs */}
        <div className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Lecture Title
            </label>
            <input
              type="text"
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              placeholder={selectedLecture?.lectureTitle}
              onChange={(e)=>setLectureTitle(e.target.value)}
              value={lectureTitle}
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Upload Video *
            </label>
            <input
              type="file"
              required
              accept='video/*'
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-red-700 file:text-white hover:file:bg-red-600 transition"
              onChange={(e)=>setVideoUrl(e.target.files[0])}
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="accent-red-600 h-4 w-4"
              onChange={() => setIsPreviewFree(prev=>!prev)}
            />
            <label className="text-sm text-gray-300">
              Make this lecture FREE preview
            </label>
          </div>

        </div>

        {/* Uploading Status */}
        {loading && (
          <p className="text-sm text-gray-400">
            Uploading video... Please wait.
          </p>
        )}

        {/* Submit */}
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition shadow-lg text-sm font-medium"
          disabled={loading}
          onClick={editLecture}
        >
          {loading
            ? <ClipLoader size={20} color='white'/>
            : "Update Lecture"
          }
        </button>

      </div>
    </div>
  )
}

export default EditLecture