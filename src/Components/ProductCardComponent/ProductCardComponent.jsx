import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { DataProductApi } from '../../Context/DataBaseProductApi';
import { ProductApi } from '../../Context/ProductControlApi';

const ProductCardComponent = ({ productsArray, from, loginUser }) => {
    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName } = useContext(ProductApi)


    const [pendingProducts, setPendingProducts] = useState(loginUser.userPendingProd)
    const [showProducts, setShowProducts] = useState([])
    const [productCount, setProductCount] = useState()

    useEffect(() => {
        //   console.log('userPendingProd', userPendingProd);

        if (from === 'productCard') {

            mergeProdFunc(getAllProducts)

        } else if (from === 'searchBar') {

            //del array que traigo de busqueda (productsArray) tengo que ver si esta en pending product y reemplazar el del pending products asi me figura count
            const selectRepeatProd = productsArray.map(product => {
                // 1. Buscamos si este producto está en pendientes
                const coincidencia = pendingProducts.find(pendingProd => pendingProd.id === product.id);

                // 2. Si hay coincidencia, devolvemos el producto pendiente (reemplazo)
                //    Si no hay, devolvemos el producto original sin cambios
                return coincidencia ? coincidencia : product;
            });

            //  console.log(selectRepeatProd);


            setShowProducts(selectRepeatProd)


        }
        console.log(pendingProducts);
        console.log('showProducts', showProducts);



    }, [loginUser, pendingProducts, productsArray])



    const addToOrder = (id) => {

        const searchProductToUpdate = getAllProducts.find((product) => product.id === id)

        const repeatProduct = pendingProducts.some((product) => product.id === id)

        if (repeatProduct) {

            const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
                { ...product, count: Number(productCount), pending: true }
                : product
            )

            const updateUserPendingProd = {
                ...loginUser,
                userPendingProd: changeOnlyProductCount
            }


            setPendingProducts(changeOnlyProductCount);
            localStorage.setItem('userPass', JSON.stringify(updateUserPendingProd))
            console.log(updateUserPendingProd);



        } else {

            const addProductCount = [...pendingProducts,
            { ...searchProductToUpdate, count: Number(productCount), pending: true }]

            const updateUserPendingProd = {
                ...loginUser,
                userPendingProd: addProductCount
            }


            setPendingProducts(addProductCount);
            localStorage.setItem('userPass', JSON.stringify(updateUserPendingProd))
            console.log(updateUserPendingProd);

        }
    }


    const deleteOrder = (id) => {
        const deleteProductCountId = pendingProducts.filter((product) => product.id !== id)

        const updateUserPendingProd = {
            ...loginUser,
            userPendingProd: deleteProductCountId
        }

        setShowProducts(deleteProductCountId);
        localStorage.setItem('userPass', JSON.stringify(updateUserPendingProd))
    }



    const mergeProdFunc = (array1) => {

        const mergedProducts = [
            ...new Map(
                [...array1, ...productsArray].map(product => [product.id, product])
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
        <Row xs={2} md={4} className="productsCardContainer mt-2 g-4 mx-auto justify-content-center" >

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
