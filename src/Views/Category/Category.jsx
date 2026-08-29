import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className='mt-5'>
            <SearchBar />

            <h1 className='my-3'>Categorias</h1>

            <Row xs={2} md={2} className="g-4 mt-3 mx-0" >
                <Col>
                    <Card className="d-flex justify-content-space-between">
                        <Link to={`/category/libreria`}>
                            <Card.Img
                                variant="top"
                                src="https://lirp.cdn-website.com/a2bff480/dms3rep/multi/opt/imagen-1+%282%29-1920w.png"
                                className='homeCardImage'
                                alt='libreria img'
                            />

                            <Card.Body>
                                <div className='text-center mb-2 text-black'>
                                    <Card.Title>Libreria</Card.Title>
                                </div>

                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col>
                    <Card className="d-flex justify-content-space-between">
                        <Link to={`/category/jugueteria`}>
                            <Card.Img
                                variant="top"
                                src="https://images.unsplash.com/photo-1703319952657-0e6ff991bbc4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className='homeCardImage'
                                alt='libreria img'
                            />

                            <Card.Body>
                                <div className='text-center mb-2 text-black'>
                                    <Card.Title>Jugueteria</Card.Title>
                                </div>

                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col>
                    <Card className="d-flex justify-content-space-between">
                        <Link to={`/category/bazar`}>
                            <Card.Img
                                variant="top"
                                src="https://matriceriajl.com.ar/wp-content/uploads/2025/08/mega-menu-v2-1.webp"
                                className='homeCardImage'
                                alt='libreria img'
                            />

                            <Card.Body>
                                <div className='text-center mb-2 text-black'>
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
