import React from 'react'
import { Link } from 'react-router-dom'

const RecentOrderDetail = ({ orderData }) => {

    const userOrders = JSON.parse(localStorage.getItem('userPass')) || []
    const userRol = userOrders.rol

    return (
        <Link to={`/orderDetail/${orderData.orderId}`} className='text-reset card m-3 py-2'>
            <div className='h-100 d-flex rounded bg-light
        align-items-center'>
                <span className='flex-fill'>#{orderData.orderId}</span>
                <span className={`${orderData.orderStatus === 'Entregado'
                    ? 'bg-secondary'
                    : orderData.orderStatus === 'Preparado'
                        ? 'bg-success'
                        : 'bg-info'
                    } text-white rounded py-2 w-25 lh-1 flex-fill`}>
                    {orderData.orderStatus}
                </span>

                <span className='flex-fill'>{orderData.date}</span>

                {userRol === 'Depósito' &&
                    <span className='flex-fill'>{orderData.userOrder}</span>
                }


                <span className="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </div>
        </Link>
    )
}

export default RecentOrderDetail
