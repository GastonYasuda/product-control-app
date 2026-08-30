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
                    <Row xs={2} md={6} className="g-4 mt-3 mx-0" >

                        {getAllProducts.map((product, i) => (
                            <Col key={i}>
                                <Card className="h-100 d-flex justify-content-space-between">
                                    <Link to={`/product/${product.name}`}>
                                        <Card.Img
                                            variant="top"
                                            src={product.image}
                                            className='homeCardImage'
                                            alt={`${product.name} img`}
                                        />
                                    </Link>

                                    <Card.Body className='d-flex flex-column justify-content-between'>
                                        <div className='text-start mb-2'>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.supplier}</Card.Text>
                                            <Card.Subtitle>${product.price}</Card.Subtitle>
                                            <Card.Text>Stock: {product.stock}</Card.Text>
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
                        ))
                        }
                    </Row>
            }
        </div >

    )
}

export default ProductsCards
