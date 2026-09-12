import React, { createContext, useContext, useEffect, useState } from 'react'

export const ProductApi = createContext()

const ProductControlApi = ({ children }) => {

    const [loginUser, setLoginUser] = useState([])

    useEffect(() => {


        setLoginUser(JSON.parse(localStorage.getItem("userPass")))

    }, [])

    const test = () => {
        console.log('Probando si anda');

    }

    return (
        <ProductApi.Provider value={{ test, loginUser, setLoginUser }}>
            {children}
        </ProductApi.Provider>
    )
}

export default ProductControlApi
