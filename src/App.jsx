import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Eg from './Components/Eg'
import Home from './Views/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Eg' element={<Eg />} />

        <Route path='*' element={<h3>Error!<br /> La pagina no existe! </h3>} />


      </Routes>
    </BrowserRouter >

  )
}

export default App
