import React, { useContext } from 'react'
import { ProductApi } from '../../Context/ProductControlApi'
import Greeting from '../../Components/Greeting/Greeting'
import SearchBar from '../../Components/SearchBar/SearchBar'
import { useParams } from 'react-router-dom'
import OrderDetailInfo from '../../Components/OrderDetailInfo/OrderDetailInfo'
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile'


const OrderDetail = () => {

    const { loginUser } = useContext(ProductApi)

    const { idOrderDetail } = useParams()


    return (
        <div className='mt-5'>

            <section className='fixed-top headerComponent'>
                {loginUser &&
                    <Greeting userName={loginUser.user_name} userRol={loginUser.user_rol} />
                }
                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>


            <OrderDetailInfo idOrderDetail={idOrderDetail} />



            <NavBarMobile />
        </div>
    )
}

export default OrderDetail
