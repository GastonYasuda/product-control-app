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
                <DetailElementComponent from={'orderList'} />
            </section>

            <NavBar />

        </div>
    )
}

export default Order
