import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'


const ProductCardComponentDetail = ({ product, deleteOrder, addToOrder }) => {

    const [inputCount, setInputCount] = useState('')

    useEffect(() => {
        //   console.log('productCount', product.count);

    }, [])

    return (
        <Col>
            <Card className="w-100 h-100 d-flex justify-content-between">
                {product.pending && <span className='position-absolute top-0 end-0 badge bg-warning p-2 mt-1 me-1'>Pendiente</span>}

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
                                <span>{product.count}</span>
                            </section>
                        </div>
                        <Form className='d-flex flex-column mt-2'>
                            <Form.Control
                                type="number"
                                placeholder={product.count}
                                value={inputCount}
                                onChange={(e) => setInputCount(e.target.value)}
                            />
                            <section className='d-flex justify-content-between'>
                                <Button type="button" variant='danger' onClick={() => { deleteOrder(product.id) }}>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </Button>

                                <Button variant="dark" onClick={() => { addToOrder(product.id, inputCount); setInputCount(''); }}>
                                    <span className="material-symbols-outlined">
                                        format_list_bulleted_add
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
