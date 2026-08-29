import React from 'react'
import './order.css'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const Order = () => {
    return (
        <div className='orderContainer'>
            <h1> Carrito de Pedidos</h1>
            <div className="orderContainer_card">
                <div className="orderContainer_card_img">
                    {/* <Link to={`/product/${product.name}`}> */}
                    <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='orderContainer_card_img' alt="Vaso de vidrio img" />
                    {/* </Link> */}
                </div>
                <div className="orderContainer_card_body">

                    <div className="orderContainer_card_body-data">
                        <h5>NOMBRE PRODUCTO</h5>
                        <span>Rigolleau</span>
                        <div className='orderContainer_card_body-data-priceStock'>
                            <span>$ 55555</span>
                            <span>Stock: 53u.</span>
                        </div>
                    </div>

                    <Form className='orderContainer_card_body_form'>
                        <Form.Control
                            type="number"
                            placeholder="0"
                        />
                        <Button type="submit" variant='danger'>
                            Quitar
                        </Button>
                        <Button type="submit" variant='dark'>
                            Modificar
                        </Button>
                    </Form>
                </div>
            </div>

            <div className="orderContainer_card">
                <div className="orderContainer_card_img">
                    {/* <Link to={`/product/${product.name}`}> */}
                    <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='orderContainer_card_img' alt="Vaso de vidrio img" />
                    {/* </Link> */}
                </div>
                <div className="orderContainer_card_body">

                    <div className="orderContainer_card_body-data">
                        <h5>NOMBRE PRODUCTO</h5>
                        <span>Rigolleau</span>
                        <div className='orderContainer_card_body-data-priceStock'>
                            <span>$ 55555</span>
                            <span>Stock: 53u.</span>
                        </div>
                    </div>

                    <Form className='orderContainer_card_body_form'>
                        <Form.Control
                            type="number"
                            placeholder="0"
                        />
                        <Button type="submit" variant='danger'>
                            Quitar
                        </Button>
                        <Button type="submit" variant='dark'>
                            Modificar
                        </Button>
                    </Form>
                </div>
            </div>

            <div className="orderContainer_card">
                <div className="orderContainer_card_img">
                    {/* <Link to={`/product/${product.name}`}> */}
                    <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='orderContainer_card_img' alt="Vaso de vidrio img" />
                    {/* </Link> */}
                </div>
                <div className="orderContainer_card_body">

                    <div className="orderContainer_card_body-data">
                        <h5>NOMBRE PRODUCTO</h5>
                        <span>Rigolleau</span>
                        <div className='orderContainer_card_body-data-priceStock'>
                            <span>$ 55555</span>
                            <span>Stock: 53u.</span>
                        </div>
                    </div>

                    <Form className='orderContainer_card_body_form'>
                        <Form.Control
                            type="number"
                            placeholder="0"
                        />
                        <Button type="submit" variant='danger'>
                            Quitar
                        </Button>
                        <Button type="submit" variant='dark'>
                            Modificar
                        </Button>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default Order
