import React, { useContext, useEffect, useState } from 'react'
import './order.css'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'

const Order = () => {
    const { loginUser } = useContext(ProductApi)

    const [pendingProducts, setPendingProducts] = useState([])
    const [productCount, setProductCount] = useState()



    useEffect(() => {


        setPendingProducts(JSON.parse(localStorage.getItem("pendingProductsArray")))

    }, [])


    const updateCountSubmit = (e) => {
        e.preventDefault()
    }

    const updateToOrder = (id) => {
        // console.log('modificado el ', id);
        // console.log('productCount', productCount);

        const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
            { ...product, count: productCount }
            : product
        )

        setPendingProducts(changeOnlyProductCount);
        localStorage.setItem('pendingProductsArray', JSON.stringify(changeOnlyProductCount))
    }

    const deleteOrder = (id) => {
        const deleteProductCountId = pendingProducts.filter((product) => product.id !== id)

        setPendingProducts(deleteProductCountId);
        localStorage.setItem('pendingProductsArray', JSON.stringify(deleteProductCountId))


    }



    return (
        <div className='mt-5'>
            {loginUser &&
                <Greeting userName={loginUser.name} userRol={loginUser.rol} />
            }

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <div className='mt-4 d-flex justify-content-between p-3'>
                <h1 className=' text-start'>Pendientes</h1>

                <Button>Enviar</Button>
            </div>

            {pendingProducts.length === 0 ?

                <h1>No hay productos pendientes!</h1>

                : pendingProducts.map((product, i) => (

                    <div className='orderContainer g-4 mx-auto justify-content-center' key={i}>
                        <div>
                            <div className="orderContainer_card mx-auto d-flex flex-row justify-content-evenly rounded">
                                <div>
                                    {/* <Link to={`/product/${product.name}`}> */}
                                    <img src={product.image} className='w-100 h-100 object-fit-contain m-auto' alt={`${product.image} image`} />
                                    {/* </Link> */}
                                </div>
                                <div className="p-3 d-flex flex-column justify-content-between">

                                    <div className="d-flex flex-column align-items-start">
                                        <h5>{product.name}</h5>
                                        <span>{product.supplier}</span>
                                        <div className='w-100 d-flex justify-content-between'>
                                            <span>${product.price}</span>
                                            <span>Stock: {product.stock}</span>
                                        </div>
                                    </div>

                                    <Form className='mt-2 d-flex justify-content-between' onSubmit={updateCountSubmit} >
                                        <Form.Control
                                            type="number"
                                            placeholder={product.count}
                                            onChange={(e) => { setProductCount(e.target.value) }}
                                        />

                                        <Button type="submit" variant='danger' className='ms-3' onClick={() => { deleteOrder(product.id) }}>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Button>

                                        <Button type="submit" variant='dark' className='ms-2' onClick={() => { updateToOrder(product.id) }}>
                                            <span className="material-symbols-outlined">
                                                format_list_bulleted_add
                                            </span>
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}




            <NavBar />

        </div>
    )
}

export default Order
