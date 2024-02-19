import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Greeter from "./pages/Greeter"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Analyst from './pages/Analyst'
import Commissioner from './pages/Commissioner'
import Manufacturer from './pages/Manufacturer'
import Officer from './pages/Officer'


const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Greeter/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/analyst" element={<Analyst />}/>
        <Route path="/safetycommissioner" element={<Commissioner />}/>
        <Route path="/manufacturer" element={<Manufacturer />}/>
        <Route path="/safetyofficer" element={<Officer />}/>
  


      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;