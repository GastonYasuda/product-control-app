import React, { useContext, useEffect, useState } from 'react'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { useParams } from 'react-router-dom'
import ProductCardComponent from '../../Components/ProductCardComponent/ProductCardComponent'
import { ProductApi } from '../../Context/ProductControlApi'
import Greeting from '../../Components/Greeting/Greeting'
import SearchBar from '../../Components/SearchBar/SearchBar'
import { Spinner } from 'react-bootstrap'
import NavBar from '../../Components/NavBar/NavBar'

const SearchResults = () => {
    const { loginUser } = useContext(ProductApi)

    const { getAllProducts } = useContext(DataProductApi)
    const { idSearchResults } = useParams()

    const [loading, setLoading] = useState(false)
    const [searchProductArray, setSearchProductArray] = useState([])

    useEffect(() => {
        console.log(idSearchResults);

        if (getAllProducts.length === 0) {
            setLoading(true)

        } else {
            setLoading(false)
        }


        const { userPendingProd } = loginUser

        const productCoincidence = getAllProducts.filter((product) => product.name.toLowerCase().includes(idSearchResults.toLowerCase()))
        // setSearchProductArray(productCoincidence)
        // console.log(productCoincidence);

        if (userPendingProd !== undefined) {
            // console.log(userPendingProd);

            const getArray = userPendingProd.flatMap(userProduct =>
                productCoincidence.filter(product => product.id === userProduct.id)
                    .map(product => ({
                        ...product,
                        count: userProduct.count,
                        pending: userProduct.pending
                    }))
            )


            const userPendingProductsMerged = getArray.length === 0 ? productCoincidence : getArray

            const mergedProducts = [
                ...new Map(
                    [...productCoincidence, ...userPendingProductsMerged].map(product => [product.id, product])
                ).values()
            ];
            console.log('resultadoBuscador', mergedProducts);

            setSearchProductArray(mergedProducts)
        }



    }, [getAllProducts, idSearchResults, loginUser])




    return (
        <div className='mainCardComponent mt-5'>

            {loginUser &&
                <Greeting userName={loginUser.name} userRol={loginUser.rol} />
            }

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <h4 className='mt-3'>Resultado de busqueda</h4>

            {
                loading ?
                    <Spinner animation="grow" variant="success" className='loadingSpinner' />
                    :
                    // <ProductCardComponent productsArray={searchProductArray} from={'searchBar'} />
                    <ProductCardComponent
                        searchProductArray={searchProductArray}
                        from={'searchBar'}
                        loginUser={loginUser}
                    />
            }

            <NavBar />

        </div>
    )
}

export default SearchResults
