import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  //
  
  useEffect(()=>{
    const userStr = localStorage.getItem("user")
    userStr && setLoggedInUser(JSON.parse(userStr))
    

  },[])
  return (
    <>
    <Routes>

      <Route path='/' element={<Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}></Route>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/dashboard' element={<Dashboard loggedInUser={loggedInUser}/>}/>
    </Routes>
    
    
    </>
  )
}

export default App