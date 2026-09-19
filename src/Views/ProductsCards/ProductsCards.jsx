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
import { ProductApi } from '../../Context/ProductControlApi';


const ProductsCards = () => {
    const { desdeDB, getAllProducts } = useContext(DataProductApi)
    const { loginUser, orderByName } = useContext(ProductApi)

    const [productCount, setProductCount] = useState()
    const [loading, setLoading] = useState(false)
    const [pendingProducts, setPendingProducts] = useState(JSON.parse(localStorage.getItem("pendingProductsArray")))
    const [showProducts, setShowProducts] = useState([])


    useEffect(() => {

        if (getAllProducts.length === 0) {
            setLoading(true)
            // localStorage.setItem('pendingProductsArray', JSON.stringify())

        } else {
            setLoading(false)
            // console.log('loading', loading);

            // console.log('aca', pendingProducts);
            // console.log('showProducts', showProducts);
            // console.log('getAllProducts', getAllProducts);


            if (pendingProducts !== null) {

                mergeProdFunc(getAllProducts)



            } else {
                setShowProducts(orderByName(getAllProducts))
                localStorage.setItem('pendingProductsArray', JSON.stringify([]))
            }


            console.log('pendingProducts', pendingProducts);
        }

    }, [getAllProducts, pendingProducts])






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

        mergeProdFunc(showProducts)

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


    return (
        <div className='mt-5'>

            {loginUser &&
                <Greeting userName={loginUser.name} userRol={loginUser.rol} />
            }

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <h1 className='mt-4 text-start ps-3'>Productos</h1>

            {
                loading ?
                    <Spinner animation="grow" variant="success" className='loadingSpinner' />
                    :
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
                                                    <span>{product.count}</span>
                                                </section>
                                            </div>

                                            <Form className='d-flex flex-column mt-2'>
                                                <Form.Control
                                                    type="number"
                                                    className='mb-3'
                                                    placeholder={product.count}
                                                    value={product.count || productCount}
                                                    onChange={(e) => { setProductCount(e.target.value) }}
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
            }

            <NavBar />

        </div >

    )
}

export default ProductsCards
