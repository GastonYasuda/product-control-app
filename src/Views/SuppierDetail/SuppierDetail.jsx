import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'


const SuppierDetail = () => {

    const { idSupplier } = useParams()

    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <h1 className='mt-5'>{idSupplier}</h1>

            <DetailElementComponent detailElementName={idSupplier} from={'supplier'} />

            <NavBar />

        </div >
    )
}

export default SuppierDetail
