import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './productDetail.css'

const ProductDetail = () => {
    const { idProduct } = useParams()

    useEffect(() => {
        console.log(`yo soy ${idProduct}`);

    }, [])


    return (
        <div className='productDetailComponent'>
            <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='productDetailComponent_img' alt="Vaso de vidrio img" />

            <div className="productDetailComponent_body">

                <h2>{idProduct}</h2>
                <p>Rigolleau</p>
                <p>$ 55555</p>
                <p>Stock: 53u.</p>
                <Form className='productDetailComponent_body_form'>
                    <Form.Control
                        type="number"
                        placeholder="0"
                    />
                    <Button type="submit" variant='danger'>
                        Quitar
                    </Button>
                    <Button type="submit" variant='dark'>
                        Agregar
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ProductDetail
