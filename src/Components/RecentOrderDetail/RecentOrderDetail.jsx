import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductApi } from '../../Context/ProductControlApi'

const RecentOrderDetail = ({ orderData }) => {

    const { formatDate } = useContext(ProductApi)
    const userOrders = JSON.parse(localStorage.getItem('userPass')) || []
    const userRol = userOrders.user_rol

    return (
        <Link to={`/orderDetail/${orderData.order_id}`} className='text-reset card m-3 py-2'>
            <div className='h-100 d-flex rounded bg-light justify-content-end align-items-center'>
                <span className='flex-fill orderDataId'>#{orderData.order_id}</span>
                <span className={`${orderData.status_name === 'Entregado'
                    ? 'bg-secondary'
                    : orderData.status_name === 'Preparado'
                        ? 'bg-success'
                        : 'bg-info'
                    } text-white rounded py-2 w-25 lh-1 flex-fill`}>
                    {orderData.status_name}
                </span>

                <span className='flex-fill'>{formatDate(orderData.order_date)}</span>

                {userRol === 'deposito' &&
                    <span className='flex-fill'>{orderData.user_name}</span>
                }


                <span className="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </div>
        </Link>
    )
}

export default RecentOrderDetail
