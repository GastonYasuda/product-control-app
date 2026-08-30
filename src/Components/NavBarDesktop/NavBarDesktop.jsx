import React from 'react'
import './navBarDesktop.css'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';


const NavBarDesktop = () => {
    return (
        <div className='navBar_container fixed-top pt-3 pe-2 '>

            <div className='d-flex w-100 '>

                <div className='navBar_container_searchbar  d-none d-lg-block'>
                    <SearchBar />
                </div>

                <div className='navBar_container_icons d-flex justify-content-evenly '>
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

                    <Link to={'/supplier'} className='d-flex flex-column'>
                        <span className="material-symbols-outlined navbar_icon">
                            store
                        </span>
                        <span className='navbar_txt'>Proveedor</span>
                    </Link>

                    <Link to={'/order'} className='d-flex flex-column'>
                        <span className="material-symbols-outlined navbar_icon">
                            order_approve
                        </span>
                        <span className='navbar_txt'>Repo</span>
                    </Link>

                    <Dropdown>
                        <Dropdown.Toggle className='pt-0 d-flex flex-column border-0 bg-transparent' id="dropdown-basic">
                            <span className="material-symbols-outlined navbar_icon">
                                account_circle
                            </span>
                            <span className='navbar_txt'>Login</span>
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
