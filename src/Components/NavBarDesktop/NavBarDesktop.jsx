import React from 'react'
import './navBarDesktop.css'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';


const NavBarDesktop = () => {
    return (
        <div className='navBar_container fixed-top pt-3 pe-2 '>

            <div className='d-flex w-100 '>

                <div className='navBar_container_searchbar d-none d-lg-block'>
                    <SearchBar />
                </div>

                <div className='navBar_container_icons d-flex align-items-center'>
                    <Link to={'/'} className='ms-4 d-flex flex-row align-items-center text-light'>
                        <span className="material-symbols-outlined">
                            splitscreen
                        </span>
                        <span className='ms-1 '>Productos</span>
                    </Link>

                    <Link to={'/category'} className='ms-4 d-flex flex-row align-items-center text-light'>
                        <span className="material-symbols-outlined">
                            category
                        </span>
                        <span className='ms-1'>Categoria</span>
                    </Link>

                    <Link to={'/supplier'} className='ms-4 d-flex flex-row align-items-center text-light'>
                        <span className="material-symbols-outlined">
                            store
                        </span>
                        <span className='ms-1'>Proveedor</span>
                    </Link>

                    <Link to={'/order'} className='ms-4 d-flex flex-row align-items-center text-light'>
                        <span className="material-symbols-outlined">
                            order_approve
                        </span>
                        <span className='ms-1'>Repo</span>
                    </Link>

                    <Dropdown>
                        <Dropdown.Toggle className='ms-2 d-flex flex-row align-items-center border-0 bg-transparent' id="dropdown-basic">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                            <span className='ms-1'>Login</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/login" className='dropdown-menu-txt d-flex justify-content-evenly'>
                                <span className="material-symbols-outlined">
                                    no_accounts
                                </span>
                                <span>LogOut</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div >

            </div>
        </div>
    )
}

export default NavBarDesktop
