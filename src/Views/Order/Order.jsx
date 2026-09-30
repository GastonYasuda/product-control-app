import React, { useContext, useState } from 'react'
import './order.css'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'

const Order = () => {
    const { loginUser } = useContext(ProductApi)


    const [showProducts, setShowProducts] = useState(loginUser.userPendingProd ?? [])


    return (
        <div className='mt-5'>
            <section className='fixed-top headerComponent'>

                {loginUser &&
                    <Greeting userName={loginUser.name} userRol={loginUser.rol} />
                }

                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            <h4 className='mt-5 text-start ps-3'>Pendientes</h4>

            {showProducts.length !== 0 ?
                <section className='orderMainComponent'>
                    <DetailElementComponent from={'orderList'} />
                </section>
                :
                <h1>No hay pedidos pendientes</h1>
            }
            <NavBar />

        </div>
    )
}

export default Order
