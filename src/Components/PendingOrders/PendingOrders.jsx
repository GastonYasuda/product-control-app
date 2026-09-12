import React from 'react'
import { Link } from 'react-router-dom'

const PendingOrders = () => {
    return (
        <div className='mt-3'>
            <h1 className='mt-3 text-start ps-3'>Pedidos Pendientes</h1>

            <div className='h-100 m-3 py-2 d-flex rounded bg-light justify-content-around align-items-center'>
                <span>#123</span>
                <span className="bg-primary text-white rounded p-1">Pendiente</span>
                <span>9/9/2026</span>
                <span>Daiana</span>
                <Link to={''} className='LinkIcon'>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                </Link>
            </div>

            <div className='h-100 m-3 py-2 d-flex rounded bg-light justify-content-around align-items-center'>
                <span>#119</span>
                <span className="bg-primary text-white rounded p-1">Pendiente</span>
                <span>5/9/2026</span>
                <span>Kumi</span>
                <Link to={''} className='LinkIcon'>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                </Link>
            </div>

            <div className='h-100 m-3 py-2 d-flex rounded bg-light justify-content-around align-items-center'>
                <span>#112</span>
                <span className="bg-primary text-white rounded p-1">Pendiente</span>
                <span>3/9/2026</span>
                <span>Kumi</span>
                <Link to={''} className='LinkIcon'>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default PendingOrders
