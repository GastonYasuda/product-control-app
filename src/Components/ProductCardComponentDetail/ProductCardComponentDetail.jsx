import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

import UpdatePriceStockModal from '../UpdatePriceStockModal/UpdatePriceStockModal';
import { ProductApi } from '../../Context/ProductControlApi';
import { DataProductApi } from '../../Context/DataBaseProductApi';



const ProductCardComponentDetail = ({ product, deleteOrder, addToOrder, variant, setVariant, from, rol }) => {

    const { aplicateSweetAlert } = useContext(ProductApi)
    const { updateProductInList } = useContext(DataProductApi)
    const [inputCount, setInputCount] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const isVertical = ['category', 'supplier', 'productCard'].includes(from);
    useEffect(() => {
        console.log(product);

        setVariant(isVertical ? 'vertical' : 'horizontal');
    }, [from]);

    const updateStockPrice = async (id, newPrice, newStock) => {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_price: newPrice, product_stock: newStock }),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || `HTTP ${response.status}`);
        }

        // Actualiza el estado → React vuelve a renderizar la tarjeta
        updateProductInList(id, { product_price: newPrice, product_stock: newStock });
        aplicateSweetAlert('Actualizado correctamente', '', 'success');
    };
    return (
        <Col>
            <Card className={`w-100 h-100 d-flex cardComponent--${variant} position-relative`}>
                {product.pending && <span className='position-absolute top-0 end-0 badge bg-warning p-2 mt-1 me-1'>Pendiente</span>}

                {product.product_stock === 0 && <h1 className='mt-3 z-3 w-100 bg-info text-light position-absolute'>SIN STOCK</h1>}


                <Link to={`/product/${product.product_id}`}>
                    <div className={`${product.product_stock === 0 ? "opacity-50" : ""} w-100 m-auto homeCardImage`}>
                        <img src={product.product_img} className='w-100 h-100 object-fit-contain' alt={`${product.product_img} img`} />
                    </div>
                </Link>

                <Card.Body className='d-flex flex-column justify-content-between'>
                    <div className={`${product.product_stock === 0 ? "opacity-50" : ""} text-start d-flex flex-column`}>
                        <div>
                            <h6>{product.product_name}</h6>

                            <p>{product.category.category_name}</p>
                            <p>{product.supplier.supplier_name}</p>
                        </div>
                    </div>

                    <div>
                        <div className={`${product.product_stock === 0 ? "opacity-50" : ""} w-100 d-flex flex-column justify-content-between`}>
                            <span className='text-start'>Cod: {product.product_sku}</span>
                            <section className='d-flex justify-content-between'>
                                <span className='fw-semibold'>${product.product_price}</span>
                                <span>Stock: {product.product_stock}</span>
                            </section>
                        </div>
                        <Form className={`${product.product_stock === 0 ? "opacity-50" : ""} w-100 d-flex flex-column justify-content-between d-flex flex-column mt-2`}>
                            <Form.Control
                                type="number"
                                placeholder={product.product_count}
                                value={inputCount}
                                onChange={(e) => setInputCount(e.target.value)}
                            />

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


                            {rol === 'deposito' &&
                                <section className='mt-3'>
                                    <Button variant="dark" className='w-100 opacity-50' onClick={() => { handleShow() }}>
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



                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </Col >
    )
}

export default ProductCardComponentDetail
