import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Views/Home/Home'
import Login from './Views/Login/Login'
import ProductDetail from './Views/ProductDetail/ProductDetail'
import Order from './Views/Order/Order'
import Category from './Views/Category/Category'
import CategoryDetails from './Views/CategoryDetails/CategoryDetails'
import Suppier from './Views/Suppier/Suppier'
import SuppierDetail from './Views/SuppierDetail/SuppierDetail'
import ProductsCards from './Views/ProductsCards/ProductsCards'
import { useEffect, useState } from 'react'

function App() {

  const [almostLogged, setAlmostLogged] = useState(JSON.parse(localStorage.getItem("userPass")))


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={almostLogged ? <Home /> : <Login />} />

        <Route path='/products' element={<ProductsCards />} />
        <Route path='/product/:idProduct' element={<ProductDetail />} />
        <Route path='/category' element={<Category />} />
        <Route path='/category/:idCategory' element={<CategoryDetails />} />
        <Route path='/supplier' element={<Suppier />} />
        <Route path='/supplier/:idSupplier' element={<SuppierDetail />} />
        <Route path='/order' element={<Order />} />
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<h3>Error!<br /> La pagina no existe! </h3>} />


      </Routes>
    </BrowserRouter >

  )
}

export default App
