import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Signin from './pages/Signin'

import Analyst from './pages/Analyst'
import Commissioner from './pages/Commissioner'
import Manufacturer from './pages/Manufacturer'
import Officer from './pages/Officer'
import ManufacturerDocs from './pages/ManufacturerDocs'

import Forum from './pages/Forum'
import FMDashboard from './pages/FMDashboard'
import FullProductDetails from './pages/FullProductDetails'

import FileUpload from './pages/FileUpload'

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
        <Route path="/docs" element={<ManufacturerDocs />}/>
        <Route path="/fmdashboard" element={<FMDashboard />}></Route>
        <Route path="/add-forum-posts" element={<Forum/>}/>
        <Route path="/product/0" element={<FullProductDetails />}/>

        <Route path="/file" element={<FileUpload/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;