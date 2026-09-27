import React, { createContext, useContext, useEffect, useState } from 'react'

export const ProductApi = createContext()

const ProductControlApi = ({ children }) => {

    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('userPass')))

    useEffect(() => {





    }, [])

    const test = () => {
        console.log('Probando si anda');

    }



    const orderByName = (productoArray) => {
        return [...productoArray].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    return (
        <ProductApi.Provider value={{ test, loginUser, setLoginUser, orderByName }}>
            {children}
        </ProductApi.Provider>
    )
}

export default ProductControlApi
