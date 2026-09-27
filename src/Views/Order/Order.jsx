import React, { useContext, useEffect, useState } from 'react'
import './order.css'
import { Button, Col, Form, Row } from 'react-bootstrap'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'
import { Link } from 'react-router-dom'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'

const Order = () => {
    const { loginUser, orderByName } = useContext(ProductApi)
    const { desdeDB, getAllProducts } = useContext(DataProductApi)


    const [productCount, setProductCount] = useState()
    const [showProducts, setShowProducts] = useState([])



    //tengo que crear un nuevo array que me muestre los showProducts

    useEffect(() => {

        const { userPendingProd } = loginUser


        if (userPendingProd !== undefined) {

            const getArray = userPendingProd.flatMap(userProduct =>
                getAllProducts.filter(product => product.id === userProduct.id)
                    .map(product => ({
                        ...product,
                        count: userProduct.count
                    }))
            )
            console.log(getArray);

            setShowProducts(getArray)



            //   localStorage.setItem('userPass', JSON.stringify(changeOnlyProductCount))

        }



    }, [getAllProducts, loginUser])






    // const updateToOrder = (id) => {

    //     const changeOnlyProductCount = showProducts.map((product) => product.id === id ?
    //         { ...product, count: productCount, pending: true }
    //         : product
    //     )


    //     const updateUserPendingProd = {
    //         ...loginUser,
    //         userPendingProd: changeOnlyProductCount
    //     }


    //     setShowProducts(changeOnlyProductCount);
    //     localStorage.setItem('userPass', JSON.stringify(updateUserPendingProd))
    // }


    // const handleCountChange = (id, count) => {
    //     setShowProducts(prev => prev.map(product => product.id === id ?
    //         { ...product, count: Number(count) }
    //         : product
    //     )
    //     )
    //     setProductCount(count)
    // }



    // const deleteOrder = (id) => {
    //     const deleteProductCountId = showProducts.filter((product) => product.id !== id)

    //     const updateUserPendingProd = {
    //         ...loginUser,
    //         userPendingProd: deleteProductCountId
    //     }
    //     console.log(updateUserPendingProd);


    //     setShowProducts(deleteProductCountId);
    //     localStorage.setItem('userPass', JSON.stringify(updateUserPendingProd))

    // }



    return (
        <div className='mt-5'>
            <section className='fixed-top headerComponent'>

                {loginUser &&
                    <Greeting userName={loginUser.name} userRol={loginUser.rol} />
                }

                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            <div className='mt-5 d-flex justify-content-between ps-3 pe-3'>
                <h4 className='text-start'>Pendientes</h4>

                {/* <Button>Enviar</Button> */}
            </div>

            <section className='orderMainComponent'>
                <DetailElementComponent
                    // detailElementName={idCategory}
                    from={'orderList'} />

                {/*                 

                {showProducts.length === 0 ?
                    <h1>No hay productos pendientes!</h1>

                    : showProducts.map((product, i) => (

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
                                            <span>{product.supplier.name}</span>
                                            <div className='w-100 d-flex justify-content-between'>
                                                <span>${product.price}</span>
                                                <span>Stock: {product.stock}</span>
                                            </div>
                                        </div>

                                        <Form className='mt-2 d-flex justify-content-between' >

                                            <Form.Control
                                                type="number"
                                                placeholder={product.count}
                                                // value={product.count || ""}
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
                    ))

                } */}

            </section>


            <NavBar />

        </div>
    )
}

export default Order
