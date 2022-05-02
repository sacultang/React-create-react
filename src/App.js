import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Links from './components/Links'
import NavLinks from './components/NavLinks'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Links></Links>
      <NavLinks></NavLinks>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/profile/:id' element={<Profile />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/' element={<Home />}></Route>
        {/* Not Found */}
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
