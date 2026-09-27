import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Greeting = ({ userName, userRol }) => {

    const { order } = useParams()

    useEffect(() => {
        console.log(order);

    }, [])

    return (
        <div className='mb-2 ps-3 text-start'>
            <h5>Hola {userName} 👋</h5>
            <p>{userRol}</p>

            {order === 'order' && <Button type='button' variant='secondary' className='position-absolute top-0 end-0 me-2 mt-5'>Enviar</Button>
            }
        </div>
    )
}

export default Greeting
