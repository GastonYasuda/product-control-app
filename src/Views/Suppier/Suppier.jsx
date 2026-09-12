import React, { useContext } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainCard from '../../Components/MainCard/MainCard'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'

const Suppier = () => {

    const { loginUser } = useContext(ProductApi)

    return (
        <div className='mt-5'>

            {loginUser &&
                <Greeting userName={loginUser.name} userRol={loginUser.rol} />
            }

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <h1 className='mt-4 text-start ps-3'>Provedores</h1>

            <MainCard cardName={"supplier"} />


            <NavBar />
        </div>
    )
}

export default Suppier
