import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

import UpdatePriceStockModal from '../UpdatePriceStockModal/UpdatePriceStockModal';



const ProductCardComponentDetail = ({ product, deleteOrder, addToOrder, variant, setVariant, from, rol }) => {

    const [inputCount, setInputCount] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const isVertical = ['category', 'supplier', 'productCard'].includes(from);
    useEffect(() => {
        setVariant(isVertical ? 'vertical' : 'horizontal');
    }, [from]);

    const updateStockPrice = (id, newPrice, newStock) => {
        console.log('aca hago el patch',);
        console.log('id del producto', id);
        console.log('nuevo precio ', newPrice);
        console.log('nuevo stock ', newStock);

    }

    return (
        <Col >
            <Card className={`w-100 h-100 d-flex cardComponent--${variant}`}>
                {product.pending && <span className='position-absolute top-0 end-0 badge bg-warning p-2 mt-1 me-1'>Pendiente</span>}

                <Link to={`/product/${product.product_id}`}>
                    <div className='w-100 m-auto homeCardImage'>
                        <img src={product.product_img} className='w-100 h-100 object-fit-contain' alt={`${product.product_img} img`} />
                    </div>
                </Link>

                <Card.Body className='d-flex flex-column justify-content-between'>
                    <div className='text-start d-flex flex-column'>
                        <div>
                            <h6>{product.product_name}</h6>

                            <p>{product.category.category_name}</p>
                            <p>{product.supplier.supplier_name}</p>
                        </div>
                    </div>

                    <div>
                        <div className='w-100 d-flex flex-column justify-content-between'>
                            <span className='text-start'>Cod: {product.product_sku}</span>
                            <section className='d-flex justify-content-between'>
                                <span className='fw-semibold'>${product.product_price}</span>
                                <span>Stock: {product.product_stock}</span>
                            </section>
                        </div>
                        <Form className='d-flex flex-column mt-2'>
                            <Form.Control
                                type="number"
                                placeholder={product.product_count}
                                value={inputCount}
                                onChange={(e) => setInputCount(e.target.value)}
                            />


                            {rol === 'deposito' &&
                                <section className='mt-3'>
                                    <Button variant="primary" className='w-100' onClick={() => { handleShow() }}>
                                        Actualizar
                                    </Button>

                                    <UpdatePriceStockModal
                                        show={show}
                                        onHide={handleClose}
                                        product={product}
                                        updateStockPrice={updateStockPrice}
                                    />

                                </section>
                            }

                            <section className='d-flex mt-3'>
                                <Button type="button" variant='secondary' className='w-50 me-2' onClick={() => { deleteOrder(product.product_id, product.product_name) }}>
                                    <span className="material-symbols-outlined">
                                        remove_shopping_cart
                                    </span>
                                </Button>

                                <Button variant="info" className='w-50 me-2' onClick={() => { addToOrder(product.product_id, inputCount); setInputCount(''); }}>
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
