import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'


const SuppierDetail = () => {

    const { idSupplier } = useParams()

    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <h1 className='mt-5'>{idSupplier}</h1>

            <Row xs={2} md={4} className="w-75 g-4 mt-3 mx-auto justify-content-center" >
                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        {/* <Link to={`/product/${product.name}`}> */}
                        <Card.Img
                            variant="top"
                            src='https://www.papelerabariloche.com.ar/img/p/141682/9d5975535a014bb888b3be0eb0eeea32.jpeg?quality=95&width=800&height=800&mode=max&upscale=false'
                            className='homeCardImage'
                            alt='lapiz'
                        />
                        {/* </Link> */}

                        <Card.Body>
                            <div className='text-start mb-2'>
                                <Card.Title>Lapiz Bic</Card.Title>
                                <Card.Text>Bariloche</Card.Text>
                                <Card.Subtitle>$400</Card.Subtitle>
                                <Card.Text>Stock: 10u</Card.Text>
                            </div>

                            <Form className='d-flex flex-row mt-3'>
                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                />
                                <Button type="submit" variant='danger' className='ms-2'>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </Button>
                                <Button type="submit" variant='dark' className='ms-2'>
                                    <span className="material-symbols-outlined">
                                        format_list_bulleted_add
                                    </span>
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        {/* <Link to={`/product/${product.name}`}> */}
                        <Card.Img
                            variant="top"
                            src='https://www.papelerabariloche.com.ar/img/p/141682/9d5975535a014bb888b3be0eb0eeea32.jpeg?quality=95&width=800&height=800&mode=max&upscale=false'
                            className='homeCardImage'
                            alt='lapiz'
                        />
                        {/* </Link> */}

                        <Card.Body>
                            <div className='text-start mb-2'>
                                <Card.Title>Lapiz Bic</Card.Title>
                                <Card.Text>Bariloche</Card.Text>
                                <Card.Subtitle>$400</Card.Subtitle>
                                <Card.Text>Stock: 10u</Card.Text>
                            </div>

                            <Form className='d-flex flex-row mt-3'>
                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                />
                                <Button type="submit" variant='danger' className='ms-2'>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </Button>
                                <Button type="submit" variant='dark' className='ms-2'>
                                    <span className="material-symbols-outlined">
                                        format_list_bulleted_add
                                    </span>
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        {/* <Link to={`/product/${product.name}`}> */}
                        <Card.Img
                            variant="top"
                            src='https://www.papelerabariloche.com.ar/img/p/141682/9d5975535a014bb888b3be0eb0eeea32.jpeg?quality=95&width=800&height=800&mode=max&upscale=false'
                            className='homeCardImage'
                            alt='lapiz'
                        />
                        {/* </Link> */}

                        <Card.Body>
                            <div className='text-start mb-2'>
                                <Card.Title>Lapiz Bic</Card.Title>
                                <Card.Text>Bariloche</Card.Text>
                                <Card.Subtitle>$400</Card.Subtitle>
                                <Card.Text>Stock: 10u</Card.Text>
                            </div>

                            <Form className='d-flex flex-row mt-3'>
                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                />
                                <Button type="submit" variant='danger' className='ms-2'>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </Button>
                                <Button type="submit" variant='dark' className='ms-2'>
                                    <span className="material-symbols-outlined">
                                        format_list_bulleted_add
                                    </span>
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <NavBar />

        </div >
    )
}

export default SuppierDetail
