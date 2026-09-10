import React from 'react'
import { Link } from 'react-router-dom'
import './recentOrder.css'

const RecentOrders = () => {
    return (
        <div className='mt-3'>
            <h1 className='mt-3 text-start ps-3'>Pedidos Recientess</h1>

            <div className='h-100 m-3 py-2 d-flex rounded bg-light justify-content-around align-items-center'>
                <span>#123</span>
                <span className="bg-primary text-white rounded p-1">Pendiente</span>
                <span>9/9/2026</span>
                <Link to={''} className='LinkIcon'>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                </Link>
            </div>


            <div className='h-100 m-3 py-2 d-flex rounded bg-light justify-content-around align-items-center'>
                <span>#122</span>
                <span className="bg-success text-white rounded p-1">Entregado</span>
                <span>6/9/2026</span>
                <Link to={''} className='LinkIcon'>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                </Link>
            </div>


            <div className='h-100 m-3 py-2 d-flex rounded bg-light justify-content-around align-items-center'>
                <span>#123</span>
                <span className="bg-success text-white rounded p-1">Entregado</span>
                <span>5/9/2026</span>
                <Link to={''} className='LinkIcon'>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                </Link>
            </div>


        </div>
    )
}

export default RecentOrders
