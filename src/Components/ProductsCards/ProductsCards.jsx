import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './productsCards.css'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import Spinner from 'react-bootstrap/Spinner';


const ProductsCards = () => {
    const { desdeDB, getAllProducts } = useContext(DataProductApi)

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (getAllProducts.length === 0) {
            setLoading(true)
        } else {
            setLoading(false)
        }


    }, [getAllProducts])

    return (
        <div className='mt-5'>
            <h1 className='mt-5'>Todos los Productos</h1>

            {
                loading ?
                    <Spinner animation="grow" variant="success" className='loadingSpinner' />
                    :
                    <Row xs={2} md={4} className="productsCardContainer g-4 mt-3 mx-auto justify-content-center" >

                        {getAllProducts.map((product, i) => (
                            <Col key={i}>
                                <Card className="h-100 d-flex justify-content-space-between">
                                    <Link to={`/product/${product.name}`}>
                                        <div className='w-100'>
                                            <img src={product.image} className='w-100 homeCardImage' alt={`${product.name} img`} />
                                        </div>
                                    </Link>






                                    <Card.Body className='d-flex flex-column justify-content-between'>
                                        <div className='text-start d-flex flex-column'>
                                            <div>
                                                <h5>{product.name}</h5>
                                                <h6>{product.supplier}</h6>
                                                <span>{product.code}</span>
                                            </div>
                                            <div className='w-100 mt-4 mb-1 mb-lg-0  d-flex justify-content-between'>
                                                <span>${product.price}</span>
                                                <span>Stock: {product.stock}</span>
                                            </div>
                                        </div>

                                        <Form className='d-flex flex-row'>
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
                        ))
                        }
                    </Row>
            }
        </div >

    )
}

export default ProductsCards
