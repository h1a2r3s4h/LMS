import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';

function CreateLecture() {

  const navigate = useNavigate()
  const {courseId} = useParams()
  const [lectureTitle , setLectureTitle] = useState("")
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const {lectureData} = useSelector(state=>state.lecture)

  const createLectureHandler = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + `/api/course/createlecture/${courseId}`,
        {lectureTitle},
        {withCredentials:true}
      )

      dispatch(setLectureData([...lectureData,result.data.lecture]))
      toast.success("Lecture Created")
      setLectureTitle("")

    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    const getLecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/course/getcourselecture/${courseId}`,
          {withCredentials:true}
        )
        dispatch(setLectureData(result.data.lectures))
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    getLecture()
  },[])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">

      <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl w-full max-w-2xl p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">
            <span className="text-red-500">Add</span> Lecture
          </h1>
          <p className="text-sm text-gray-400">
            Enter the lecture title and build your course content step by step.
          </p>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="e.g. Introduction to MERN Stack"
          className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition mb-6"
          onChange={(e)=>setLectureTitle(e.target.value)}
          value={lectureTitle}
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 hover:border-red-500 transition text-sm"
            onClick={()=>navigate(`/addcourses/${courseId}`)}
          >
            <FaArrowLeft /> Back to Course
          </button>

          <button
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all text-sm font-medium shadow-lg"
            disabled={loading}
            onClick={createLectureHandler}
          >
            {loading
              ? <ClipLoader size={20} color='white'/>
              : "+ Create Lecture"
            }
          </button>

        </div>

        {/* Lecture List */}
        <div className="space-y-3">
          {lectureData.map((lecture, index) => (
            <div
              key={index}
              className="bg-black border border-zinc-800 hover:border-red-600 transition rounded-xl flex justify-between items-center p-4 text-sm"
            >
              <span className="text-gray-300">
                Lecture {index + 1}: {lecture.lectureTitle}
              </span>

              <FaEdit
                className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CreateLecture