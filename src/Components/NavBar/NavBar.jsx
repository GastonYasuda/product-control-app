import React from 'react'
import './navbar.css'

const NavBar = () => {
    return (
        <div className='navBar_container m-auto fixed-bottom p-2 d-flex justify-content-around'>
            <span className='d-flex flex-column'>
                <span className="material-symbols-outlined navbar_icon">
                    splitscreen
                </span>
                <span className='navbar_txt'>Productos</span>
            </span>

            <span className='d-flex flex-column'>
                <span className="material-symbols-outlined navbar_icon">
                    category
                </span>
                <span className='navbar_txt'>Categoria</span>
            </span>

            <span className='d-flex flex-column'>
                <span className="material-symbols-outlined navbar_icon">
                    order_approve
                </span>
                <span className='navbar_txt'>Repo</span>
            </span>

            <span className='d-flex flex-column'>
                <span className="material-symbols-outlined navbar_icon">
                    account_circle
                </span>
                <span className='navbar_txt'>Login</span>
            </span>

        </div>
    )
}

export default NavBar
