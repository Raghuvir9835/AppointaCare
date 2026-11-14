import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const getAdminUrl = () => {
  if (import.meta.env.VITE_ADMIN_URL) return import.meta.env.VITE_ADMIN_URL
  const port = window.location.port
  if (port === '5175') return 'http://localhost:5176'
  if (port === '5173') return 'http://localhost:5174'
  return 'http://localhost:5174'
}

const Login = () => {

  const [role, setRole] = useState('Patient')   // 'Patient' | 'Doctor' | 'Admin'
  const [state, setState] = useState('Login')    // 'Login' | 'Sign Up' (Patient only)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const handleRoleSwitch = (newRole) => {
    setRole(newRole)
    setState('Login')
    setEmail('')
    setPassword('')
    setName('')
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (role === 'Patient') {
        if (state === 'Sign Up') {
          const { data } = await axios.post(
            backendUrl + '/api/user/register',
            { name, email, password }
          )

          if (data.success) {
            sessionStorage.setItem('token', data.token)
            setToken(data.token)
            toast.success('Account created successfully!')
          } else {
            toast.error(data.message)
          }

        } else {
          const { data } = await axios.post(
            backendUrl + '/api/user/login',
            { email, password }
          )

          if (data.success) {
            sessionStorage.setItem('token', data.token)
            setToken(data.token)
            toast.success('Logged in successfully!')
          } else {
            toast.error(data.message)
          }
        }

      } else if (role === 'Doctor') {
        const { data } = await axios.post(
          backendUrl + '/api/doctor/login',
          { email, password }
        )

        if (data.success) {
          toast.success('Doctor Login Successful! Opening dashboard...')
          const adminUrl = getAdminUrl()
          setTimeout(() => {
            window.location.href = `${adminUrl}?dToken=${data.token}`
          }, 600)
        } else {
          toast.error(data.message)
        }

      } else if (role === 'Admin') {
        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password }
        )

        if (data.success) {
          toast.success('Admin Login Successful! Opening dashboard...')
          const adminUrl = getAdminUrl()
          setTimeout(() => {
            window.location.href = `${adminUrl}?aToken=${data.token}`
          }, 600)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      console.error('Auth error:', error)
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        toast.error('Cannot connect to server. Please make sure the backend is running.')
      } else {
        toast.error(error.response?.data?.message || error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const getTitle = () => {
    if (role === 'Patient') {
      return state === 'Sign Up' ? 'Create Account' : 'Login'
    }
    return `${role} Login`
  }

  const getSubtitle = () => {
    if (role === 'Patient') {
      return `Please ${state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment`
    }
    if (role === 'Doctor') {
      return 'Please log in to manage your appointments & patients'
    }
    return 'Please log in to access the admin panel'
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center py-8'>
      <div className='flex flex-col gap-3.5 m-auto items-start p-8 sm:p-10 min-w-[340px] sm:min-w-[420px] glass-card rounded-2xl text-[#475569] text-sm'>
        
        {/* Role Indicator / Header */}
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl font-bold text-gray-800 tracking-tight'>
            {role !== 'Patient' && <span className='text-primary'>{role} </span>}
            {role === 'Patient' ? getTitle() : 'Login'}
          </p>
          {role !== 'Patient' && (
            <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20'>
              {role} Portal
            </span>
          )}
        </div>

        <p className='text-xs text-gray-500 -mt-1'>{getSubtitle()}</p>

        {/* Patient Sign Up full name */}
        {role === 'Patient' && state === 'Sign Up' && (
          <div className='w-full'>
            <p className='font-medium text-gray-700 mb-1'>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded-lg w-full p-2.5 text-sm transition-all bg-white/90'
              type="text"
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p className='font-medium text-gray-700 mb-1'>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded-lg w-full p-2.5 text-sm transition-all bg-white/90'
            type="email"
            required
          />
        </div>

        <div className='w-full'>
          <p className='font-medium text-gray-700 mb-1'>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded-lg w-full p-2.5 text-sm transition-all bg-white/90'
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className='button-animate bg-primary text-white w-full py-2.5 my-2 rounded-lg text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-secondary transition-all shadow-md shadow-primary/25'
        >
          {loading ? 'Please wait...' : (role === 'Patient' && state === 'Sign Up' ? 'Create account' : 'Login')}
        </button>

        {/* Patient toggle Sign Up / Login */}
        {role === 'Patient' && (
          state === 'Sign Up'
            ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        )}

        {/* Downside Role Switcher Links */}
        <div className='w-full pt-3 mt-1 border-t border-gray-200 flex flex-col gap-1 text-xs text-gray-500'>
          {role !== 'Doctor' && (
            <p>
              Doctor Login?{' '}
              <span onClick={() => handleRoleSwitch('Doctor')} className='text-primary underline cursor-pointer font-medium'>
                Click here
              </span>
            </p>
          )}

          {role !== 'Admin' && (
            <p>
              Admin Login?{' '}
              <span onClick={() => handleRoleSwitch('Admin')} className='text-primary underline cursor-pointer font-medium'>
                Click here
              </span>
            </p>
          )}

          {role !== 'Patient' && (
            <p>
              Patient Login?{' '}
              <span onClick={() => handleRoleSwitch('Patient')} className='text-primary underline cursor-pointer font-medium'>
                Click here
              </span>
            </p>
          )}
        </div>

      </div>
    </form>
  )
}

export default Login
