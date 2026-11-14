import React, { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorSharedHealthEntries from './pages/Doctor/DoctorSharedHealthEntries';

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='relative min-h-screen'>
      {/* Ambient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(79,140,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>

      <ToastContainer />

      {dToken || aToken ? (
        <div className='relative z-10'>
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <div className='flex-1 m-5'>
              <Routes>
                <Route path='/' element={<></>} />
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-appointments' element={<AllAppointments />} />
                <Route path='/add-doctor' element={<AddDoctor />} />
                <Route path='/doctor-list' element={<DoctorsList />} />
                <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                <Route path='/doctor-profile' element={<DoctorProfile />} />
                <Route path='/doctor-shared-health-entries' element={<DoctorSharedHealthEntries />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div className='relative z-10'>
          <Login />
        </div>
      )}
    </div>
  )
}

export default App
