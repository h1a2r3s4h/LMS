import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  let [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  let dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      navigate("/")
      setLoading(false)
      toast.success("Login Successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)

      let user = response.user
      let name = user.displayName;
      let email = user.email
      let role = "student"

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        { name, email, role },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("Login Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-black px-4'>
      <form
        className='w-[95%] max-w-[1000px] min-h-[520px] bg-[#0b0b0b] border border-white/10 shadow-2xl rounded-3xl flex overflow-hidden'
        onSubmit={(e) => e.preventDefault()}
      >
        {/* LEFT SIDE (FORM) */}
        <div className='w-[100%] md:w-[55%] min-h-[520px] flex flex-col items-center justify-center gap-5 p-7 md:p-10'>
          <div className='w-full'>
            <h1 className='font-semibold text-white text-3xl tracking-tight'>
              Welcome back 👋
            </h1>
            <h2 className='text-white/60 text-[15px] mt-1'>
              Login to your account and continue learning
            </h2>
          </div>

          {/* EMAIL */}
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="email" className='font-medium text-white/80 text-sm'>
              Email
            </label>
            <input
              id='email'
              type="text"
              className='w-full h-[46px] rounded-xl bg-[#111] border border-white/10 text-[15px] px-4 text-white placeholder:text-white/30 outline-none focus:border-white/25 transition'
              placeholder='you@example.com'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* PASSWORD */}
          <div className='flex flex-col gap-2 w-full relative'>
            <label htmlFor="password" className='font-medium text-white/80 text-sm'>
              Password
            </label>

            <input
              id='password'
              type={show ? "text" : "password"}
              className='w-full h-[46px] rounded-xl bg-[#111] border border-white/10 text-[15px] px-4 pr-12 text-white placeholder:text-white/30 outline-none focus:border-white/25 transition'
              placeholder='***********'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {!show && (
              <MdOutlineRemoveRedEye
                className='absolute w-[22px] h-[22px] cursor-pointer right-4 top-[44px] text-white/55 hover:text-white transition'
                onClick={() => setShow(prev => !prev)}
              />
            )}
            {show && (
              <MdRemoveRedEye
                className='absolute w-[22px] h-[22px] cursor-pointer right-4 top-[44px] text-white/55 hover:text-white transition'
                onClick={() => setShow(prev => !prev)}
              />
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            className='w-full h-[46px] bg-white text-black font-semibold cursor-pointer flex items-center justify-center rounded-xl hover:bg-white/90 transition disabled:opacity-60 disabled:cursor-not-allowed'
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? <ClipLoader size={26} color='black' /> : "Login"}
          </button>

          <div className='w-full flex items-center justify-between'>
            <span
              className='text-[13px] cursor-pointer text-white/55 hover:text-white transition'
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot your password?
            </span>

            <span
              className='text-[13px] cursor-pointer text-white/55 hover:text-white transition'
              onClick={() => navigate("/signup")}
            >
              Create account
            </span>
          </div>

          {/* DIVIDER */}
          <div className='w-full flex items-center gap-3 mt-2'>
            <div className='flex-1 h-[1px] bg-white/10'></div>
            <div className='text-[13px] text-white/40'>
              Or continue with
            </div>
            <div className='flex-1 h-[1px] bg-white/10'></div>
          </div>

          {/* GOOGLE BUTTON */}
          <div
            className='w-full h-[46px] border border-white/10 rounded-xl flex items-center justify-center gap-3 cursor-pointer bg-[#111] hover:bg-[#161616] transition'
            onClick={googleLogin}
          >
            <FcGoogle className='w-[22px] h-[22px]' />
            <span className='text-[15px] text-white/80 font-medium'>
              Continue with Google
            </span>
          </div>

          {/* SIGNUP TEXT */}
          <div className='text-white/50 text-sm mt-1'>
            Don&apos;t have an account?{" "}
            <span
              className='text-white underline underline-offset-4 cursor-pointer'
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </div>

        {/* RIGHT SIDE (BRAND) */}
        <div className='w-[45%] min-h-[520px] bg-gradient-to-br from-black via-[#070707] to-[#141414] md:flex items-center justify-center flex-col hidden border-l border-white/10'>
          <div className='flex flex-col items-center justify-center gap-5 px-10'>
            <img
              src={logo}
              className='w-28 rounded-2xl shadow-2xl border border-white/10'
              alt=""
            />
            <div className='text-center'>
              <h2 className='text-white text-3xl font-semibold tracking-wide'>
                VIRTUAL COURSES
              </h2>
              <p className='text-white/50 text-sm mt-2'>
                Learn anytime. Anywhere. Faster.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
