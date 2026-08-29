import React, { useContext, useEffect } from 'react'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';




const Home = () => {

    const { desdeDB, getAllProducts } = useContext(DataProductApi)

    useEffect(() => {
        if (getAllProducts.length > 0) {
            console.log(getAllProducts);
        }

    }, [getAllProducts])

    return (

        <Row xs={2} md={2} className="g-4" style={{ marginRight: '0px', marginLeft: "0px" }}>
            {getAllProducts.map((product, i) => (
                <Col key={i}>
                    <Card className="h-100">
                        <Card.Img
                            variant="top"
                            src={product.image}
                            style={{
                                height: '200px',
                                objectFit: 'contain'
                            }}
                        />

                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.supplier}</Card.Text>
                            <Card.Subtitle>${product.price}</Card.Subtitle>
                            <Card.Text>Stock: {product.stock}</Card.Text>

                            <Form style={{ display: 'flex' }}>
                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                />
                                <Button type="submit">
                                    Agregar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Home
