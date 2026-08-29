import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Eg from './Components/Eg'
import Home from './Views/Home/Home'
import Login from './Views/Login/Login'
import ProductDetail from './Components/ProductDetail/ProductDetail'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/:idProduct' element={<ProductDetail />} />
        <Route path='/Eg' element={<Eg />} />

        <Route path='*' element={<h3>Error!<br /> La pagina no existe! </h3>} />


      </Routes>
    </BrowserRouter >

  )
}

export default App
