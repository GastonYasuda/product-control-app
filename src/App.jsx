import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Views/Home/Home'
import Login from './Views/Login/Login'
import ProductDetail from './Views/ProductDetail/ProductDetail'
import Order from './Views/Order/Order'
import Category from './Views/Category/Category'
import CategoryDetails from './Views/CategoryDetails/CategoryDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:idProduct' element={<ProductDetail />} />
        <Route path='/category' element={<Category />} />
        <Route path='/category/:idCategory' element={<CategoryDetails />} />
        <Route path='/order' element={<Order />} />
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<h3>Error!<br /> La pagina no existe! </h3>} />


      </Routes>
    </BrowserRouter >

  )
}

export default App
