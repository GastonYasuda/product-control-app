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
    const [pendingProducts, setPendingProducts] = useState([])
    const [showProducts, setShowProducts] = useState([])


    useEffect(() => {

        if (getAllProducts.length === 0) {
            setLoading(true)
        } else {
            setLoading(false)

            if (pendingProducts.length === 0) {
                setPendingProducts(JSON.parse(localStorage.getItem("pendingProductsArray")) || [])

            } else {
                //console.log('pending', pendingProducts);

                const mergedProducts = [
                    ...new Map(
                        [...getAllProducts, ...pendingProducts].map(product => [product.id, product])
                    ).values()
                ];

                //console.log(mergedProducts);

                setShowProducts(orderByName(mergedProducts))
            }
        }

    }, [getAllProducts, pendingProducts])



    const addCountSubmit = (e) => {
        e.preventDefault()
    }



    const addToOrder = (id) => {

        const searchProductToUpdate = getAllProducts.find((product) => product.id === id)
        // console.log('searchProductToUpdate', searchProductToUpdate);

        const repeatProduct = pendingProducts.some((product) => product.id === id)
        // console.log(repeatProduct);

        if (repeatProduct) {

            const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
                { ...product, count: productCount, pending: true }
                : product
            )

            setPendingProducts(changeOnlyProductCount);
            localStorage.setItem('pendingProductsArray', JSON.stringify(changeOnlyProductCount))


        } else {

            const addProductCount = [...pendingProducts,
            { ...searchProductToUpdate, count: productCount, pending: true }]

            setPendingProducts(addProductCount);
            localStorage.setItem('pendingProductsArray', JSON.stringify(addProductCount))

        }
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
                                                <p>{product.supplier}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='w-100 d-flex flex-column justify-content-between'>
                                                <span className='text-start'>Cod: {product.code}</span>
                                                <section className='d-flex justify-content-between'>
                                                    <span className='fw-semibold'>${product.price}</span>
                                                    <span>Stock: {product.stock}</span>
                                                </section>
                                            </div>

                                            <Form className='d-flex flex-column mt-2' onSubmit={addCountSubmit} >
                                                <Form.Control
                                                    type="number"
                                                    className='mb-3'
                                                    placeholder={product.count ? product.count : '0'}
                                                    onChange={(e) => { setProductCount(e.target.value) }}
                                                />
                                                <section className='d-flex justify-content-between'>
                                                    <Button type="submit" variant='danger'>
                                                        <span className="material-symbols-outlined">
                                                            delete
                                                        </span>
                                                    </Button>

                                                    <Button type="submit" variant='dark' onClick={() => { addToOrder(product.id) }} >
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
