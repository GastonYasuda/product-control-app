import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className='mt-5'>

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <h1 className='mt-5'>Categorias</h1>


            <Row xs={2} md={4} className="w-100 g-4 mt-3 mx-auto justify-content-center" >
                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        <Link to={`/category/libreria`}>

                            <div className='w-100 homeCardImage'>
                                <img src="https://lirp.cdn-website.com/a2bff480/dms3rep/multi/opt/imagen-1+%282%29-1920w.png"
                                    className='w-100 h-100 object-fit-cover'
                                    alt='libreria img' />
                            </div>

                            <Card.Body>
                                <div className='text-center mt-3 text-black'>
                                    <h5>Libreria</h5>
                                </div>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        <Link to={`/category/jugueteria`}>
                            <div className='w-100 homeCardImage'>

                                <img src="https://images.unsplash.com/photo-1703319952657-0e6ff991bbc4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100 h-100 object-fit-cover'
                                    alt='libreria img' />
                            </div>

                            <Card.Body>
                                <div className='text-center mt-3 text-black'>
                                    <Card.Title>Jugueteria</Card.Title>
                                </div>

                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        <Link to={`/category/bazar`}>
                            <div className='w-100 homeCardImage'>
                                <img src="https://matriceriajl.com.ar/wp-content/uploads/2025/08/mega-menu-v2-1.webp"
                                    className='w-100 h-100 object-fit-cover'
                                    alt='libreria img' />
                            </div>

                            <Card.Body>
                                <div className='text-center mt-3 text-black'>
                                    <Card.Title>Bazar</Card.Title>
                                </div>

                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

            </Row>


            <NavBar />
        </div>
    )
}

export default Category
