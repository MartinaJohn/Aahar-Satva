import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Signin from './pages/Signin'

import Analyst from './pages/Analyst'
import Commissioner from './pages/Commissioner'
import Manufacturer from './pages/Manufacturer'
import Officer from './pages/Officer'

import Forum from './pages/Forum'
import FMDashboard from './pages/FMDashboard'
import FullProductDetails from './pages/FullProductDetails'

import FileUpload from './components/FileUpload'
import ManufacturerCompany from './pages/ManufacturerCompany'
import ViewForum from './pages/ViewForum'

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/analyst" element={<Analyst />}/>
        <Route path="/safetycommissioner" element={<Commissioner />}/>
        <Route path="/manufacturer" element={<Manufacturer />}/>
        <Route path="/safetyofficer" element={<Officer />}/>
  
        <Route path="/fmdashboard" element={<FMDashboard />}></Route>
        <Route path="/add-forum-posts" element={<Forum/>}/>
        <Route path="/product-details" element={<FullProductDetails />}/>
        <Route path="/manudocs" element={<ManufacturerCompany />}/>
        <Route path="/file" element={<FileUpload/>}/>
        <Route path="/viewforum" element={<ViewForum />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;