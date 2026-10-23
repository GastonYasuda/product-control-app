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


    const getUsersData = async (user, password) => {

        try {
            const response = await fetch('http://localhost:3000/users')
            if (response.ok) {
                const data = await response.json()
                //    console.log(data);
                const validateUserPass = data.find(eachUser => eachUser.user_name.toLocaleLowerCase() === user && eachUser.user_pass.toLocaleLowerCase() === password)
                //   console.log(validateUserPass);

                if (validateUserPass) {
                    localStorage.setItem('userPass', JSON.stringify(validateUserPass))
                    setLoginUser(validateUserPass);
                } else {
                    aplicateSweetAlert("Usuario o Contraseña incorrecta!", "Ingrese nuevamente su usuario y contraseña", "warning")
                }

            } else {
                throw new Error("Error al intentar obtener productos");

            }
        }
        catch (error) {
            console.error(error)
        }
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
        <ProductApi.Provider value={{ getUsersData, loginUser, setLoginUser, orderByName, aplicateSweetAlert }}>
            {children}
        </ProductApi.Provider>
    )
}

export default ProductControlApi
