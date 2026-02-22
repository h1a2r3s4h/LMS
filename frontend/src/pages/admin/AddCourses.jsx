import React, { useEffect, useRef, useState } from 'react'
import img from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCourseData } from '../../redux/courseSlice';

function AddCourses() {

  const navigate= useNavigate()
  const {courseId} = useParams()

  const [selectedCourse,setSelectedCourse] = useState(null)
  const [title,setTitle] = useState("")
  const [subTitle,setSubTitle] = useState("")
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("")
  const [level,setLevel] = useState("")
  const [price,setPrice] = useState("")
  const [isPublished,setIsPublished] = useState(false)
  const thumb=useRef()
  const [frontendImage,setFrontendImage] = useState(null)
  const [backendImage,setBackendImage] = useState(null)
  let [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const {courseData} = useSelector(state=>state.course)

  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}` , {withCredentials:true})
      setSelectedCourse(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "")
      setSubTitle(selectedCourse.subTitle || "")
      setDescription(selectedCourse.description || "")
      setCategory(selectedCourse.category || "")
      setLevel(selectedCourse.level || "")
      setPrice(selectedCourse.price || "")
      setFrontendImage(selectedCourse.thumbnail || img)
      setIsPublished(selectedCourse?.isPublished)
    }
  }, [selectedCourse])

  useEffect(()=>{
    getCourseById()
  },[])

  const handleThumbnail = (e)=>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const editCourseHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );

      const updatedCourse = result.data;

      if (updatedCourse.isPublished) {
        const updatedCourses = courseData.map(c =>
          c._id === courseId ? updatedCourse : c
        );
        if (!courseData.some(c => c._id === courseId)) {
          updatedCourses.push(updatedCourse);
        }
        dispatch(setCourseData(updatedCourses));
      } else {
        const filteredCourses = courseData.filter(c => c._id !== courseId);
        dispatch(setCourseData(filteredCourses));
      }

      navigate("/courses");
      toast.success("Course Updated");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const removeCourse = async () => {
    setLoading(true)
    try {
      await axios.delete(serverUrl + `/api/course/removecourse/${courseId}` , {withCredentials:true})
      toast.success("Course Deleted")
      const filteredCourses = courseData.filter(c => c._id !== courseId);
      dispatch(setCourseData(filteredCourses));
      navigate("/courses")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8">

        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 relative gap-4">

          <FaArrowLeftLong
            className='absolute md:static left-0 top-0 w-[20px] h-[20px] cursor-pointer text-gray-400 hover:text-red-500 transition'
            onClick={()=>navigate("/courses")}
          />

          <h2 className="text-2xl font-semibold md:ml-6">
            <span className="text-red-500">Edit</span> Course Details
          </h2>

          <button
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition shadow-lg"
            onClick={()=>navigate(`/createlecture/${selectedCourse?._id}`)}
          >
            Go to Lectures
          </button>
        </div>

        {/* Form Box */}
        <div className="bg-black border border-zinc-800 p-6 rounded-xl space-y-6">

          {/* Publish / Remove */}
          <div className="flex flex-wrap gap-4">
            <button
              className={`px-4 py-2 rounded-xl border transition
              ${!isPublished
                ? "bg-green-900 text-green-400 border-green-700"
                : "bg-red-900 text-red-400 border-red-700"}`}
              onClick={()=>setIsPublished(prev=>!prev)}
            >
              {isPublished ? "Click to UnPublish" : "Click to Publish"}
            </button>

            <button
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition shadow-lg"
              disabled={loading}
              onClick={removeCourse}
            >
              {loading ? <ClipLoader size={20} color='white'/> :"Remove Course"}
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>

            {/* Inputs */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Title</label>
              <input type="text"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Subtitle</label>
              <input type="text"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                onChange={(e)=>setSubTitle(e.target.value)}
                value={subTitle}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 h-28 resize-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
              />
            </div>

            {/* Row */}
            <div className="grid md:grid-cols-3 gap-4">

              <select
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-500"
                onChange={(e)=>setCategory(e.target.value)}
                value={category}
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="App Development">App Development</option>
                <option value="Others">Others</option>
              </select>

              <select
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-500"
                onChange={(e)=>setLevel(e.target.value)}
                value={level}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <input type="number"
                placeholder="Price ₹"
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-500"
                onChange={(e)=>setPrice(e.target.value)}
                value={price}
              />
            </div>

            {/* Thumbnail */}
            <input type="file" ref={thumb} hidden onChange={handleThumbnail} accept='image/*' />

            <div className='relative w-[300px] h-[170px] cursor-pointer'>
              <img
                src={frontendImage}
                alt=""
                className='w-full h-full object-cover rounded-xl border border-zinc-700 hover:opacity-80 transition'
                onClick={()=>thumb.current.click()}
              />
              <MdEdit
                className='w-[20px] h-[20px] absolute top-3 right-3 text-white bg-black p-1 rounded-full cursor-pointer'
                onClick={()=>thumb.current.click()}
              />
            </div>

            {/* Buttons */}
            <div className='flex gap-4 pt-4'>
              <button
                className='px-5 py-2 rounded-xl border border-zinc-600 hover:border-red-500 transition'
                onClick={()=>navigate("/courses")}
              >
                Cancel
              </button>

              <button
                className='px-7 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition shadow-lg'
                disabled={loading}
                onClick={editCourseHandler}
              >
                {loading ? <ClipLoader size={20} color='white'/> :"Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCourses