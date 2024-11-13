import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import { useSelector } from 'react-redux'


function App() {
  const isEmail=useSelector((state)=>state.authReducer.isEmail)
  return (
    <div >
      <Routes>
        <Route path='/' element={isEmail ?<Home/>:<Login/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
