import React from 'react'

const Greeting = ({ userName, userRol }) => {
    return (
        <div className='mb-5 ps-3 text-start'>

            <h5>Hola {userName} 👋</h5>
            <p>{userRol}</p>


        </div>
    )
}

export default Greeting
