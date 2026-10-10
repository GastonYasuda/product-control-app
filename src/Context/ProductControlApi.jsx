import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'


export const ProductApi = createContext()

const ProductControlApi = ({ children }) => {

    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('userPass')))


    useEffect(() => {

        if (loginUser === null || loginUser.length === 0) {
            localStorage.setItem('userPass', JSON.stringify([]))
        } else if (loginUser !== null) {
            setLoginUser(JSON.parse(localStorage.getItem('userPass')))
        }

    }, [])


    const test = () => {
        console.log('Probando si anda');

    }



    const orderByName = (productoArray) => {
        return [...productoArray].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    const aplicateSweetAlert = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon
        });
    }

    return (
        <ProductApi.Provider value={{ test, loginUser, setLoginUser, orderByName, aplicateSweetAlert }}>
            {children}
        </ProductApi.Provider>
    )
}

export default ProductControlApi
