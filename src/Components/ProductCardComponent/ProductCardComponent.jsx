import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';

const ProductCardComponent = ({ productsArray }) => {





    const addToOrder = (id) => {

        const searchProductToUpdate = getAllProducts.find((product) => product.id === id)
        // console.log('searchProductToUpdate', searchProductToUpdate);

        const repeatProduct = pendingProducts.some((product) => product.id === id)

        if (repeatProduct) {

            const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
                { ...product, count: Number(productCount), pending: true }
                : product
            )


            setPendingProducts(changeOnlyProductCount);
            localStorage.setItem('pendingProductsArray', JSON.stringify(changeOnlyProductCount))


        } else {

            const addProductCount = [...pendingProducts,
            { ...searchProductToUpdate, count: Number(productCount), pending: true }]

            setPendingProducts(addProductCount);
            localStorage.setItem('pendingProductsArray', JSON.stringify(addProductCount))

        }
    }


    const deleteOrder = (id) => {
        const deleteProductCountId = pendingProducts.filter((product) => product.id !== id)
        // console.log('chequeo si corre para ver proque no me marca 0', deleteProductCountId);
        // console.log('pendings', pendingProducts);

        // mergeProdFunc(showProducts)

        setPendingProducts(deleteProductCountId);
        localStorage.setItem('pendingProductsArray', JSON.stringify(deleteProductCountId))
    }



    const mergeProdFunc = (array1) => {

        const mergedProducts = [
            ...new Map(
                [...array1, ...pendingProducts].map(product => [product.id, product])
            ).values()
        ];

        console.log('mergedProducts2', mergedProducts);

        setShowProducts(orderByName(mergedProducts))
    }
    const handleCountChange = (id, count) => {
        setPendingProducts(prev => prev.map(product => product.id === id ?
            { ...product, count: Number(count) }
            : product
        )
        )
        setProductCount(count)
    }
    return (
        <Row xs={2} md={4} className="productsCardContainer g-4  mx-auto justify-content-center" >

            {productsArray.map((product, i) => (
                <Col key={i}>
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
                                        {/* <span>{product.count}</span> */}
                                    </section>
                                </div>

                                <Form className='d-flex flex-column mt-2'>
                                    <Form.Control
                                        type="number"
                                        className='mb-3'
                                        placeholder={product.count}
                                        onChange={(e) => handleCountChange(productsArray.id, e.target.value)}
                                    />
                                    <section className='d-flex justify-content-between'>
                                        <Button type="button" variant='danger' onClick={() => { deleteOrder(product.id) }}>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Button>

                                        <Button type="button" variant='dark' onClick={() => { addToOrder(product.id) }} >
                                            <span className="material-symbols-outlined">
                                                format_list_bulleted_add
                                            </span>
                                        </Button>
                                    </section>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))
            }
        </Row>
    )
}

export default ProductCardComponent
