import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import MainCard from '../../Components/MainCard/MainCard'
import Greeting from '../../Components/Greeting/Greeting'
// import { Card, Col, Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

const Category = () => {


    return (
        <div className='mt-5'>

            <Greeting userName={'Gaston'} userRol={'Salon'} />

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>



            <h1 className='mt-4 text-start ps-3'>Categorias</h1>

            <MainCard cardName="category" />

            <NavBar />
        </div>
    )
}

export default Category
