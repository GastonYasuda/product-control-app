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
        <>
            {getAllProducts.length > 0 &&
                getAllProducts.map((product, i) => {
                    return (
                        <div key={i}>
                            <h6>{product.name}</h6>
                            <img src={product.image} alt={`${product.name} image`} />
                            <p>{product.supplier}</p>
                            <p>${product.price}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Home
