import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'


const ProductCardComponentDetail = ({ product, deleteOrder, addToOrder, variant, setVariant, from }) => {

    const [inputCount, setInputCount] = useState('')

    useEffect(() => {
        //  console.log(from);

        if (from === 'category' || from === 'supplier' || from === 'productCard') {
            setVariant('vertical')
        } else {
            setVariant('horizontal')
        }
    }, [variant])


    return (
        <Col>
            <Card className={`w-100 h-100 d-flex cardComponent--${variant}`}>
                {product.pending && <span className='pendientStyle position-absolute top-0 badge bg-warning p-2 mt-2'>Pendiente</span>}

                <Link to={`/product/${product.name}`}>
                    <div className='w-100 m-auto homeCardImage'>
                        <img src={product.image} className='w-100 h-100 object-fit-contain' alt={`${product.name} img`} />
                    </div>
                </Link>

                <Card.Body className='d-flex flex-column justify-content-between'>
                    <div className='text-start d-flex flex-column'>
                        <div>
                            <h6>{product.name}</h6>
                            <p>{product.supplier.name}</p>
                        </div>
                    </div>

                    <div>
                        <div className='w-100 d-flex flex-column justify-content-between'>
                            <span className='text-start'>Cod: {product.code}</span>
                            <section className='d-flex justify-content-between'>
                                <span className='fw-semibold'>${product.price}</span>
                                <span>Stock: {product.stock}</span>
                            </section>
                        </div>
                        <Form className='d-flex flex-column mt-2'>
                            <Form.Control
                                type="number"
                                placeholder={product.count}
                                value={inputCount}
                                onChange={(e) => setInputCount(e.target.value)}
                            />
                            <section className='d-flex mt-3'>
                                <Button type="button" variant='secondary' className='w-50 me-2' onClick={() => { deleteOrder(product.id) }}>
                                    <span className="material-symbols-outlined">
                                        remove_shopping_cart
                                    </span>
                                </Button>

                                <Button variant="info" className='w-50 me-2' onClick={() => { addToOrder(product.id, inputCount); setInputCount(''); }}>
                                    <span className="material-symbols-outlined text-light">
                                        add_shopping_cart
                                    </span>
                                </Button>
                            </section>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </Col >
    )
}

export default ProductCardComponentDetail
