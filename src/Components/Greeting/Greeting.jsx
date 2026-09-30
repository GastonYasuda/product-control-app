import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import SendPendingProducts from '../SendPendingProducts/SendPendingProducts'

const Greeting = ({ userName, userRol }) => {

    const { order } = useParams()

    return (
        <div className='mb-2 ps-3 text-start'>
            <h5>Hola {userName} 👋</h5>
            <p>{userRol}</p>

            {order === 'order' && <SendPendingProducts />
            }
        </div>
    )
}

export default Greeting
