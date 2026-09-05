import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DataProductApi } from '../../Context/DataBaseProductApi'


const DetailElementComponent = ({ detailElementName, from }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const [detailElement, seDetailElement] = useState([])

    useEffect(() => {

        if (from === 'category') {
            const selectedCategory = getAllProducts.filter(prod => prod.category === detailElementName)
            seDetailElement(selectedCategory);

        } else if (from === 'supplier') {
            const selectedCategory = getAllProducts.filter(prod => prod.supplier === detailElementName)
            seDetailElement(selectedCategory);
        }


    }, [getAllProducts, detailElementName])

    return (
        <Row xs={2} md={4} className="mainCardComponent w-100 g-4 mt-3 mx-auto justify-content-center" >

            {detailElement.length > 0 ?
                detailElement.map((product, i) => (
                    <Col key={i}>
                        <Card className="h-100 d-flex justify-content-between">
                            {product.pending && <span>Pendiente</span>}


                            <Link to={`/product/${product.name}`}>
                                <div className='w-100 m-auto homeCardImage'>
                                    <img src={product.image} className='w-100 h-100 object-fit-contain' alt={`${product.name} img`} />
                                </div>
                            </Link>


                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <div className='text-start d-flex flex-column'>
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
                                    {product.pending ?
                                        <Button type="submit" variant='danger' className='ms-2'>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Button>
                                        :
                                        <Button type="submit" variant='dark' className='ms-2'>
                                            <span className="material-symbols-outlined">
                                                format_list_bulleted_add
                                            </span>
                                        </Button>
                                    }
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
                :
                <Spinner animation="grow" variant="success" className='loadingSpinner' />

            }
        </Row>
    )
}

export default DetailElementComponent
