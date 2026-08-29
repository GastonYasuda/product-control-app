import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='navBar_container m-auto fixed-bottom p-2 d-flex justify-content-around'>
            <Link to={'/'} className='d-flex flex-column'>
                <span className="material-symbols-outlined navbar_icon">
                    splitscreen
                </span>
                <span className='navbar_txt'>Productos</span>
            </Link>

            <Link to={'/category'} className='d-flex flex-column'>
                <span className="material-symbols-outlined navbar_icon">
                    category
                </span>
                <span className='navbar_txt'>Categoria</span>
            </Link>

            <Link to={'/order'} className='d-flex flex-column'>
                <span className="material-symbols-outlined navbar_icon">
                    order_approve
                </span>
                <span className='navbar_txt'>Repo</span>
            </Link>

            <span className='d-flex flex-column' onClick={() => {
                console.log('tiene que salir un sider para hacer logout');
            }}>
                <span className="material-symbols-outlined navbar_icon">
                    account_circle
                </span>
                <span className='navbar_txt'>Login</span>
            </span>

        </div>
    )
}

export default NavBar
