import React, { useContext, useEffect } from 'react'
import { DataProductApi } from '../Context/DataBaseProductApi'

const Home = () => {

    const { desdeDB, getAllProducts } = useContext(DataProductApi)

    useEffect(() => {
        if (getAllProducts.length > 0) {
            console.log(getAllProducts);
        }

    }, [getAllProducts])

    return (
        <div>

        </div>
    )
}

export default Home
