import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Login from "./components/login.jsx"
import Register from "./components/register.jsx"
import Home from "./components/home.jsx"
import { Context } from "./context/context.jsx"
import { useContext } from "react"

function App() {
  const {value}=useContext(Context)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={!value.user?<Navigate to={"/home"}/>:<Navigate to={"/login"}/>}/>
          <Route path='/login' element={!value.user?<Login/>:<Navigate to={"/home"}/>}/>
          <Route path='/register' element={!value.user?<Register/>:<Navigate to={"/home"}/>}/>
          <Route path='/home' element={value.user?<Home/>:<Navigate to={'/login'}/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
