import React, { useContext } from 'react'
import { ProductApi } from '../../Context/ProductControlApi'
import Greeting from '../../Components/Greeting/Greeting'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import { useParams } from 'react-router-dom'
import OrderDetailInfo from '../../Components/OrderDetailInfo/OrderDetailInfo'

const OrderDetail = () => {

    const { loginUser } = useContext(ProductApi)

    const { idOrderDetail } = useParams()

    console.log(idOrderDetail);


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

            <OrderDetailInfo idOrderDetail={idOrderDetail} />

            <NavBar />
        </div>
    )
}

export default OrderDetail
