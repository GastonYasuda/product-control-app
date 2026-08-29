import React, { useContext, useEffect } from 'react'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import './home.css'
import { Link } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';




const Home = () => {

    const { desdeDB, getAllProducts } = useContext(DataProductApi)

    useEffect(() => {
        if (getAllProducts.length > 0) {
            console.log(getAllProducts);
        }

    }, [getAllProducts])

    return (
        <>
            <SearchBar />

            <Row xs={2} md={2} className="g-4 home" style={{ marginRight: '0px', marginLeft: "0px" }}>
                {getAllProducts.map((product, i) => (
                    <Col key={i}>
                        <Card className="h-100">
                            <Link to={`/product/${product.name}`}>
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    className='homeCardImage'
                                />
                            </Link>

                            <Card.Body>
                                <div className='homeProductsBody'>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.supplier}</Card.Text>
                                    <Card.Subtitle>${product.price}</Card.Subtitle>
                                    <Card.Text>Stock: {product.stock}</Card.Text>

                                </div>
                                <Form className='homeProductsForm'>
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                    />
                                    <div className='homeProductsFormButton'>
                                        <Button type="submit" variant='danger'>
                                            Quitar
                                        </Button>
                                        <Button type="submit" variant='dark'>
                                            Agregar
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Home
