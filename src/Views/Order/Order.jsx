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

            <div className='w-75 g-4 mt-3 mx-auto justify-content-center'>
                <div className='w-50 m-auto'>
                    <div className="orderContainer_card mt-3 mx-auto d-flex flex-row justify-content-evenly rounded">
                        <div className="pe-4">
                            {/* <Link to={`/product/${product.name}`}> */}
                            <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='w-100 h-100 object-fit-contain m-auto' alt="Vaso de vidrio img" />
                            {/* </Link> */}
                        </div>
                        <div className="py-3 d-flex flex-column justify-content-between">

                            <div className="d-flex flex-column align-items-start">
                                <h5>NOMBRE PRODUCTO</h5>
                                <span>Rigolleau</span>
                                <div className='w-50 d-flex justify-content-between'>
                                    <span>$551.555</span>
                                    <span>Stock: 53u.</span>
                                </div>
                            </div>

                            <Form className='mt-2 d-flex justify-content-between'>
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
                </div>
            </div>

            <div className='w-75 g-4 mt-3 mx-auto justify-content-center'>
                <div className='w-50 m-auto'>
                    <div className="orderContainer_card mt-3 mx-auto d-flex flex-row justify-content-evenly rounded">
                        <div className="pe-4">
                            {/* <Link to={`/product/${product.name}`}> */}
                            <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='w-100 h-100 object-fit-contain m-auto' alt="Vaso de vidrio img" />
                            {/* </Link> */}
                        </div>
                        <div className="py-3 d-flex flex-column justify-content-between">

                            <div className="d-flex flex-column align-items-start">
                                <h5>NOMBRE PRODUCTO</h5>
                                <span>Rigolleau</span>
                                <div className='w-50 d-flex justify-content-between'>
                                    <span>$551.555</span>
                                    <span>Stock: 53u.</span>
                                </div>
                            </div>

                            <Form className='mt-2 d-flex justify-content-between'>
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
                </div>
            </div>

            <div className='w-75 g-4 mt-3 mx-auto justify-content-center'>
                <div className='w-50 m-auto'>
                    <div className="orderContainer_card mt-3 mx-auto d-flex flex-row justify-content-evenly rounded">
                        <div className="pe-4">
                            {/* <Link to={`/product/${product.name}`}> */}
                            <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='w-100 h-100 object-fit-contain m-auto' alt="Vaso de vidrio img" />
                            {/* </Link> */}
                        </div>
                        <div className="py-3 d-flex flex-column justify-content-between">

                            <div className="d-flex flex-column align-items-start">
                                <h5>NOMBRE PRODUCTO</h5>
                                <span>Rigolleau</span>
                                <div className='w-50 d-flex justify-content-between'>
                                    <span>$551.555</span>
                                    <span>Stock: 53u.</span>
                                </div>
                            </div>

                            <Form className='mt-2 d-flex justify-content-between'>
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
                </div>
            </div>



            <NavBar />

        </div>
    )
}

export default Order
