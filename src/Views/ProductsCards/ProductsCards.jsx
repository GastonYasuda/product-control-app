import React, { useContext, useEffect, useState } from 'react'

import './productsCards.css'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import Spinner from 'react-bootstrap/Spinner';
import Greeting from '../../Components/Greeting/Greeting';
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';
import { ProductApi } from '../../Context/ProductControlApi';
import ProductCardComponent from '../../Components/ProductCardComponent/ProductCardComponent';
import ProductCardComponent_copy from '../../Components/ProductCardComponent/ProductCardComponent_copy';


const ProductsCards = () => {
    const { desdeDB, getAllProducts } = useContext(DataProductApi)
    const { loginUser } = useContext(ProductApi)

    const [loading, setLoading] = useState(false)
    const [showProducts, setShowProducts] = useState([])


    useEffect(() => {

        if (getAllProducts.length === 0) {
            setLoading(true)

        } else {
            setLoading(false)
        }


        const { userPendingProd } = loginUser


        if (userPendingProd !== undefined) {

            const getArray = userPendingProd.flatMap(userProduct =>
                getAllProducts.filter(product => product.id === userProduct.id)
                    .map(product => ({
                        ...product,
                        count: userProduct.count,
                        pending: userProduct.pending
                    }))
            )

            setShowProducts(getArray)
            console.log(getArray);


        }

    }, [getAllProducts])


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
                    // <ProductCardComponent
                    //     productsArray={showProducts}
                    //     from={'productCard'}
                    //     loginUser={loginUser}
                    // />
                    <ProductCardComponent_copy
                        productsArray={showProducts}
                        from={'productCard'}
                        loginUser={loginUser}
                    />
            }

            <NavBar />

        </div >

    )
}

export default ProductsCards
