import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          sessionStorage.setItem('aToken', data.token)
          toast.success("Login Successful")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          sessionStorage.setItem('dToken', data.token)
          toast.success("Login Successful")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'ERR_NETWORK') {
        toast.error('Network Error: Backend is not reachable.');
      } else {
        toast.error(error.response?.data?.message || error.message || "Login failed");
      }
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[85vh] flex items-center justify-center py-10'>
      <div className='flex flex-col gap-3.5 m-auto items-start p-8 sm:p-10 min-w-[340px] sm:min-w-[420px] glass-card rounded-2xl text-[#475569] text-sm shadow-xl'>
        <p className='text-2xl font-bold m-auto tracking-tight text-gray-800'><span className='text-primary'>{state}</span> Login</p>
        <p className='text-xs text-gray-500 m-auto -mt-2'>Please log in to manage appointments & healthcare services</p>
        <div className='w-full mt-2'>
          <p className='font-medium text-gray-700 mb-1'>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded-lg w-full p-2.5 text-sm transition-all bg-white/90' type="email" required />
        </div>
        <div className='w-full '>
          <p className='font-medium text-gray-700 mb-1'>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded-lg w-full p-2.5 text-sm transition-all bg-white/90' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2.5 my-2 rounded-lg text-base font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20'>Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
        <p>Patient Login? <span onClick={() => { window.location.href = window.location.port === '5176' ? 'http://localhost:5175/login' : 'http://localhost:5173/login' }} className='text-primary underline cursor-pointer'>Click here</span></p>
      </div>
    </form>
  )
}

export default Login