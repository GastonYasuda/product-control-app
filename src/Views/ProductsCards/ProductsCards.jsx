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
import Greeting from '../../Components/Greeting/Greeting';
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';


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

            <Greeting userName={'Gaston'} userRol={'Salon'} />

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <h1 className='mt-4 text-start ps-3'>Productos</h1>

            {
                loading ?
                    <Spinner animation="grow" variant="success" className='loadingSpinner' />
                    :
                    <Row xs={2} md={4} className="productsCardContainer g-4  mx-auto justify-content-center" >

                        {getAllProducts.map((product, i) => (
                            <Col key={i}>
                                <Card className="w-100 h-100 d-flex justify-content-space-between">
                                    {product.pending && <span>Pendiente</span>}

                                    <Link to={`/product/${product.name}`}>
                                        <div className='w-100 m-auto homeCardImage'>
                                            <img src={product.image} className='w-100 h-100 object-fit-contain' alt={`${product.name} img`} />
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
                        }
                    </Row>
            }

            <NavBar />

        </div >

    )
}

export default ProductsCards
