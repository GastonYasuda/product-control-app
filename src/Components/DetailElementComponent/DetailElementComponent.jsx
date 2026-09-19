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
            mergeProdFunc(selectedCategory, from)



        } else if (from === 'supplier') {
            console.log('from', from);

            const selectedSupplier = getAllProducts.filter(prod => prod.supplier.name === detailElementName)
            setDetailElement(selectedSupplier);
            console.log(selectedSupplier);
            mergeProdFunc(selectedSupplier, from)

        }

        // if (pendingProducts !== null) {

        //     //  mergeProdFunc(detailElement)

        // } else {
        //     setShowProducts(orderByName(detailElement))
        //     localStorage.setItem('pendingProductsArray', JSON.stringify([]))

        // }

    }, [getAllProducts, detailElementName, pendingProducts])


    const mergeProdFunc = (array1, from) => {

        if (from === 'category') {

            const pendingProductsByCategory = pendingProducts.filter(pendingProd => pendingProd.category.name === detailElementName)
            //   console.log(pendingProductsByCategory);
            // console.log(array1);

            const mergedProducts = [
                ...new Map(
                    [...array1, ...pendingProductsByCategory].map(product => [product.id, product])
                ).values()
            ];
            // console.log('mergedProducts2', mergedProducts);

            setShowProducts(orderByName(mergedProducts))

        } else if (from === 'supplier') {

            const pendingProductsBySupplier = pendingProducts.filter(pendingProd => pendingProd.supplier.name === detailElementName)
            console.log(pendingProducts);

            console.log(pendingProducts[0].supplier.name);

            console.log(pendingProductsBySupplier);//[]vacio
            console.log(array1);//todo de toyshop
            console.log(detailElementName);//toyshop

            const mergedProducts = [
                ...new Map(
                    [...array1, ...pendingProductsBySupplier].map(product => [product.id, product])
                ).values()
            ];
            console.log('mergedProducts2', mergedProducts);

            setShowProducts(orderByName(mergedProducts))
        }

    }

    // const updateToOrder = (id) => {
    //     // console.log('modificado el ', id);
    //     // console.log('productCount', productCount);

    //     const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
    //         { ...product, count: productCount, pending: true }
    //         : product
    //     )

    //     setPendingProducts(changeOnlyProductCount);
    //     localStorage.setItem('pendingProductsArray', JSON.stringify(changeOnlyProductCount))
    // }

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


    const handleCountChange = (id, count) => {
        setPendingProducts(prev => prev.map(product => product.id === id ?
            { ...product, count: Number(count) }
            : product
        )
        )
        setProductCount(count)
    }



    const deleteOrder = (id) => {
        const deleteProductCountId = pendingProducts.filter((product) => product.id !== id)

        setPendingProducts(deleteProductCountId);
        localStorage.setItem('pendingProductsArray', JSON.stringify(deleteProductCountId))
    }


    return (


        <Row xs={2} md={4} className="productsCardContainer g-4  mx-auto justify-content-center" >

            {showProducts.map((product, i) => (
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
                                    {/* <Form.Control
                                        type="number"
                                        className='mb-3'
                                        placeholder={product.count}
                                        value={product.count}
                                        onChange={(e) => { setProductCount(e.target.value) }}
                                    /> */}
                                    <Form.Control
                                        type="number"
                                        className='mb-3'
                                        placeholder={product.count}
                                        onChange={(e) => handleCountChange(showProducts.id, e.target.value)}
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

export default DetailElementComponent
