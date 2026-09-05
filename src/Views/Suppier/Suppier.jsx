import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainCard from '../../Components/MainCard/MainCard'

const Suppier = () => {
    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <h1 className='mt-5'>Provedores</h1>

            <MainCard cardName={"supplier"} />


            <NavBar />
        </div>
    )
}

export default Suppier
