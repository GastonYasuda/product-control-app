import React, { createContext, useContext } from 'react'

export const ProductApi = createContext()

const ProductControlApi = ({ children }) => {

    const test = () => {
        console.log('Probando si anda');

    }

    return (
        <ProductApi.Provider value={{ test }}>
            {children}
        </ProductApi.Provider>
    )
}

export default ProductControlApi
