import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { ProductApi } from '../../Context/ProductControlApi'


const DetailElementComponent = ({ detailElementName, from }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName } = useContext(ProductApi)

    const [productCount, setProductCount] = useState()
    const [detailElement, setDetailElement] = useState([])
    const [pendingProducts, setPendingProducts] = useState(JSON.parse(localStorage.getItem("pendingProductsArray")))
    const [showProducts, setShowProducts] = useState([])


    useEffect(() => {

        if (from === 'category') {
            const selectedCategory = getAllProducts.filter(prod => prod.category.name === detailElementName)
            setDetailElement(selectedCategory);
            console.log(selectedCategory);



        } else if (from === 'supplier') {
            console.log('from', from);


            const selectedSupplier = getAllProducts.filter(prod => prod.supplier.name === detailElementName)
            setDetailElement(selectedSupplier);
            console.log(selectedSupplier);

        }

        // if (pendingProducts !== null) {

        //     //  mergeProdFunc(detailElement)

        // } else {
        //     setShowProducts(orderByName(detailElement))
        //     localStorage.setItem('pendingProductsArray', JSON.stringify([]))

        // }

    }, [getAllProducts, detailElementName, pendingProducts])


    const mergeProdFunc = (array1) => {

        const pendingProductsByCategory = pendingProducts.filter(pendingProd => pendingProd.category === detailElementName)
        console.log(pendingProductsByCategory);



        const mergedProducts = [
            ...new Map(
                [...array1, ...pendingProductsByCategory].map(product => [product.id, product])
            ).values()
        ];

        console.log('mergedProducts2', mergedProducts);

        setShowProducts(orderByName(mergedProducts))
    }



    const updateToOrder = (id) => {
        // console.log('modificado el ', id);
        // console.log('productCount', productCount);

        const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
            { ...product, count: productCount, pending: true }
            : product
        )

        setPendingProducts(changeOnlyProductCount);
        localStorage.setItem('pendingProductsArray', JSON.stringify(changeOnlyProductCount))
    }


    // const handleCountChange = (id, count) => {
    //     setPendingProducts(prev => prev.map(product => product.id === id ?
    //         { ...product, count: Number(count) }
    //         : product
    //     )
    //     )
    //     setProductCount(count)
    // }



    const deleteOrder = (id) => {
        const deleteProductCountId = pendingProducts.filter((product) => product.id !== id)

        setPendingProducts(deleteProductCountId);
        localStorage.setItem('pendingProductsArray', JSON.stringify(deleteProductCountId))
    }


    return (


        <Row xs={2} md={4} className="productsCardContainer g-4  mx-auto justify-content-center" >

            {detailElement.map((product, i) => (
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
                                        <span>{product.count}</span>
                                    </section>
                                </div>

                                <Form className='d-flex flex-column mt-2'>
                                    <Form.Control
                                        type="number"
                                        className='mb-3'
                                        placeholder={product.count}
                                        value={product.count}
                                        onChange={(e) => { setProductCount(e.target.value) }}
                                    />
                                    <section className='d-flex justify-content-between'>
                                        <Button type="button" variant='danger' onClick={() => { deleteOrder(product.id) }}>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Button>

                                        <Button type="button" variant='dark' onClick={() => { updateToOrder(product.id) }} >
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

export default DetailElementComponent
