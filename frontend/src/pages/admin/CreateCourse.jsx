import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CreateCourse = () => {

    let navigate = useNavigate()
    let [loading,setLoading]=useState(false)
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")

    const CreateCourseHandler = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/course/create" , {title , category} , {withCredentials:true})
            toast.success("Course Created")
            navigate("/courses")
            setTitle("")
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10 text-white">

            <div className="max-w-xl w-[600px] mx-auto p-8 bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl relative">

                {/* Back Arrow */}
                <FaArrowLeftLong
                    className='absolute top-6 left-6 w-[20px] h-[20px] cursor-pointer text-gray-400 hover:text-red-500 transition duration-300'
                    onClick={()=>navigate("/courses")}
                />

                <h2 className="text-3xl font-semibold mb-8 text-center">
                    <span className="text-red-500">Create</span> Course
                </h2>

                <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>

                    {/* Course Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Course Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter course title"
                            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-300"
                            onChange={(e)=>setTitle(e.target.value)}
                            value={title}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Category
                        </label>
                        <select
                            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-300"
                            onChange={(e)=>setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="">Select category</option>
                            <option value="App Development">App Development</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="AI Tools">AI Tools</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Ethical Hacking">Ethical Hacking</option>
                            <option value="UI UX Designing">UI UX Designing</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={CreateCourseHandler}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center"
                    >
                        {loading
                            ? <ClipLoader size={24} color='white' />
                            : "Create Course"
                        }
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateCourse;