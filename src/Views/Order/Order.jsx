import React from 'react'
import './order.css'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'

const Order = () => {
    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <h1 className='mt-5'> Carrito de Pedidos</h1>

            <Row xs={2} md={6} className="g-2 m-auto" >
                <Col>
                    <div className="orderContainer_card mt-3 mx-auto d-flex flex-row">
                        <div className="orderContainer_card_img m-auto">
                            {/* <Link to={`/product/${product.name}`}> */}
                            <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='orderContainer_card_img' alt="Vaso de vidrio img" />
                            {/* </Link> */}
                        </div>
                        <div className="orderContainer_card_body p-3 d-flex flex-column align-items-start justify-content-space-between">

                            <div className="w-100 d-flex flex-column align-items-start">
                                <h5>NOMBRE PRODUCTO</h5>
                                <span>Rigolleau</span>
                                <div className='w-100 d-flex justify-content-between'>
                                    <span>$ 55555</span>
                                    <span>Stock: 53u.</span>
                                </div>
                            </div>

                            <Form className='mt-3 d-flex justify-content-between'>
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
                        </div>
                    </div>
                </Col>

                <Col>
                    <div className="orderContainer_card mt-3 mx-auto d-flex flex-row">
                        <div className="orderContainer_card_img m-auto">
                            {/* <Link to={`/product/${product.name}`}> */}
                            <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='orderContainer_card_img' alt="Vaso de vidrio img" />
                            {/* </Link> */}
                        </div>
                        <div className="orderContainer_card_body p-3 d-flex flex-column align-items-start justify-content-space-between">

                            <div className="w-100 d-flex flex-column align-items-start">
                                <h5>NOMBRE PRODUCTO</h5>
                                <span>Rigolleau</span>
                                <div className='w-100 d-flex justify-content-between'>
                                    <span>$ 55555</span>
                                    <span>Stock: 53u.</span>
                                </div>
                            </div>

                            <Form className='mt-3 d-flex justify-content-between'>
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
                        </div>
                    </div>
                </Col>

                <Col>
                    <div className="orderContainer_card mt-3 mx-auto d-flex flex-row">
                        <div className="orderContainer_card_img m-auto">
                            {/* <Link to={`/product/${product.name}`}> */}
                            <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='orderContainer_card_img' alt="Vaso de vidrio img" />
                            {/* </Link> */}
                        </div>
                        <div className="orderContainer_card_body p-3 d-flex flex-column align-items-start justify-content-space-between">

                            <div className="w-100 d-flex flex-column align-items-start">
                                <h5>NOMBRE PRODUCTO</h5>
                                <span>Rigolleau</span>
                                <div className='w-100 d-flex justify-content-between'>
                                    <span>$ 55555</span>
                                    <span>Stock: 53u.</span>
                                </div>
                            </div>

                            <Form className='mt-3 d-flex justify-content-between'>
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
                        </div>
                    </div>
                </Col>
            </Row>

            <NavBar />

        </div>
    )
}

export default Order
