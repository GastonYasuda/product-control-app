import React, { useContext, useEffect, useState } from 'react'
import './order.css'
import { Button, Col, Form, Row } from 'react-bootstrap'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'
import { Link } from 'react-router-dom'

const Order = () => {
    const { loginUser, orderByName } = useContext(ProductApi)

    const [pendingProducts, setPendingProducts] = useState([])
    const [productCount, setProductCount] = useState()



    useEffect(() => {

        const pendingProducts =
            JSON.parse(localStorage.getItem("pendingProductsArray")) || []

        setPendingProducts(orderByName(pendingProducts))

    }, [])



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
                                    <Link to={`/product/${product.name}`}>
                                        <img src={product.image} className='w-100 h-100 object-fit-contain m-auto' alt={`${product.image} image`} />
                                    </Link>
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

                                    <Form className='mt-2 d-flex justify-content-between' >

                                        <Form.Control
                                            type="number"
                                            value={product.count || ""}
                                            onChange={(e) => handleCountChange(product.id, e.target.value)}
                                        />

                                        <Button type="button" variant='danger' className='ms-3' onClick={() => { deleteOrder(product.id) }}>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Button>

                                        <Button type="button" variant='dark' className='ms-2' onClick={() => { updateToOrder(product.id) }}>
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
