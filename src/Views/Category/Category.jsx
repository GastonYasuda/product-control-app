import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import MainCard from '../../Components/MainCard/MainCard'
// import { Card, Col, Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

const Category = () => {


    return (
        <div className='mt-5'>

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <h1 className='mt-5'>Categorias</h1>

            <MainCard cardName="category" />

            <NavBar />
        </div>
    )
}

export default Category
