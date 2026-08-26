import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Eg from './Components/Eg'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Eg />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
