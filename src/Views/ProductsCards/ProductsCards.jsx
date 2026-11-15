import React, { useContext, useEffect, useState } from 'react'

import './productsCards.css'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import Spinner from 'react-bootstrap/Spinner';
import Greeting from '../../Components/Greeting/Greeting';
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';
import { ProductApi } from '../../Context/ProductControlApi';
import ProductCardComponent from '../../Components/ProductCardComponent/ProductCardComponent';


const ProductsCards = () => {
    const { getAllProductsFromDB, getAllProducts } = useContext(DataProductApi)
    const { loginUser, orderByName } = useContext(ProductApi)

    const [loading, setLoading] = useState(false)
    const [allPendings, setAllPendings] = useState([]);



    useEffect(() => {
        allPendings.length === 0 && getUserPending()

        if (getAllProducts.length === 0) {
            setLoading(true)

        } else {
            setLoading(false)
        }

        // console.log(getAllProducts);


    }, [getAllProducts])



    const getUserPending = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${loginUser.user_id}/pending`)
            if (response.ok) {
                const data = await response.json()
                setAllPendings(data)


            } else {
                throw new Error("Error al intentar obtener usuario");

            }
        }
        catch (error) {
            console.error(error)
        }
    }



    return (
        <div className='mt-5'>
            <section className='fixed-top headerComponent'>

                {loginUser &&
                    <Greeting userName={loginUser.user_name} userRol={loginUser.user_rol} />
                }

                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            <h4 className='mt-5 text-start ps-3'>Productos</h4>

            {
                loading ?
                    <Spinner animation="grow" variant="success" className='loadingSpinner' />
                    :
                    <ProductCardComponent
                        from={'productCard'}
                        loginUser={loginUser}
                        allPendings={allPendings}
                        setAllPendings={setAllPendings}
                    // getAllProducts={orderByName(getAllProducts)}
                    />
            }

            <NavBar />

        </div >

    )
}

export default ProductsCards
