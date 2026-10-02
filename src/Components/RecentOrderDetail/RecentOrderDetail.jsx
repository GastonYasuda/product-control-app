import React from 'react'
import { Link } from 'react-router-dom'

const RecentOrderDetail = ({ orderData }) => {
    return (
        <div className='h-100 m-3 py-2 d-flex rounded bg-light
        align-items-center'>
            <span className='flex-fill'>{orderData.orderId}</span>
            <span className={`${orderData.orderStatus === 'Entregado'
                ? 'bg-secondary'
                : 'bg-info'
                } text-white rounded py-2 w-25 lh-1 flex-fill`} >{orderData.orderStatus}</span>
            <span className='flex-fill'>{orderData.date}</span>
            {/* <span className='flex-fill'>{orderData.userOrder}</span> */}


            <Link to={''} className='LinkIcon'>
                <span className="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </Link>
        </div>
    )
}

export default RecentOrderDetail
