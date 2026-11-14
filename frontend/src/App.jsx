import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import Verify from './pages/Verify'
import HealthTracker from './pages/HealthTracker'
import AIDoctor from './pages/AIDoctor'

const App = () => {
  return (
    <div className='relative min-h-screen'>
      {/* Modern Ambient Mesh & Orb Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Soft radial glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(79,140,255,0.18),transparent_70%)]" />
        
        {/* Subtle tech dot matrix grid */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />

        {/* Ambient floating blur orbs */}
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="ambient-orb orb-4" />
      </div>

      <div className='mx-4 sm:mx-[10%] relative z-10'>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/health-tracker' element={<HealthTracker />} />
          <Route path='/ai-doctor' element={<AIDoctor />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
