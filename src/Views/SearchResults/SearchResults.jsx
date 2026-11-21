import React, { useContext, useEffect, useState } from 'react'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { useParams } from 'react-router-dom'
import ProductCardComponent from '../../Components/ProductCardComponent/ProductCardComponent'
import { ProductApi } from '../../Context/ProductControlApi'
import Greeting from '../../Components/Greeting/Greeting'
import SearchBar from '../../Components/SearchBar/SearchBar'
import { Spinner } from 'react-bootstrap'
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile'

const SearchResults = () => {
    const { loginUser } = useContext(ProductApi)

    const { getAllProducts } = useContext(DataProductApi)
    const { idSearchResults } = useParams()

    const [loading, setLoading] = useState(false)
    const [searchProductArray, setSearchProductArray] = useState([])
    const [allPendings, setAllPendings] = useState();



    useEffect(() => {
        // console.log(idSearchResults);
        //  console.log('getAllProducts', getAllProducts);

        getUserPending()


        if (getAllProducts.length === 0) {
            setLoading(true)

        } else {
            setLoading(false)
        }


        const { pending_orders } = loginUser
        //  console.log(pending_orders);
        setAllPendings(pending_orders)
        //  console.log(getAllProducts);

        console.log('idSearchResults', idSearchResults);


        const productCoincidence = getAllProducts.filter((p) => p.product_name.toLowerCase().includes(idSearchResults.toLowerCase()))
        setSearchProductArray(productCoincidence)
        console.log(productCoincidence);

        if (pending_orders !== undefined) {
            // console.log(userPendingProd);

            const getArray = pending_orders.flatMap(userProduct =>
                productCoincidence.filter(product => product.id === userProduct.id)
                    .map(product => ({
                        ...product,
                        count: userProduct.count,
                        pending: userProduct.pending
                    }))
            )
            //  console.log(getArray);


            const userPendingProductsMerged = getArray.length === 0 ? productCoincidence : getArray

            const mergedProducts = [
                ...new Map(
                    [...productCoincidence, ...userPendingProductsMerged].map(product => [product.product_id, product])
                ).values()
            ];
            //  console.log('resultadoBuscador', mergedProducts);

            setSearchProductArray(mergedProducts)
        }



    }, [getAllProducts, idSearchResults])

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

            <h4 className='mt-5'>Resultado de busqueda</h4>

            {
                loading ?
                    <Spinner animation="grow" variant="success" className='loadingSpinner' />
                    :
                    <ProductCardComponent
                        searchProductArray={searchProductArray}
                        from={'searchBar'}
                        loginUser={loginUser}
                        allPendings={allPendings}
                        setAllPendings={setAllPendings}
                        getAllProducts={getAllProducts}
                    />
            }

            <NavBarMobile />

        </div>
    )
}

export default SearchResults
