import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'


export const ProductApi = createContext()

const ProductControlApi = ({ children }) => {

    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('userPass')))
    const [statuses, setStatuses] = useState([]);




    useEffect(() => {

        if (loginUser === null || loginUser.length === 0) {
            localStorage.setItem('userPass', JSON.stringify([]))
        } else if (loginUser !== null) {
            setLoginUser(JSON.parse(localStorage.getItem('userPass')))
        }
        getStatuses();
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
                    Swal.fire("Usuario o Contraseña Incorrecto!", "Ingrese nuevamente sus datos", "warning")
                }

            } else {
                throw new Error("Error al intentar obtener usuario");

            }
        }
        catch (error) {
            console.error(error)
        }
    }



    const orderByName = (productArray) => {
        return [...productArray].sort((a, b) =>
            a.product_name.localeCompare(b.product_name)
        );
    }

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        });


    const getStatuses = async () => {
        try {
            const response = await fetch("http://localhost:3000/status");
            if (!response.ok) throw new Error("Error al obtener estados");
            setStatuses(await response.json());
        } catch (error) {
            console.error(error);
        }
    };


    const capital = (text) => {
        const clean = String(text).trim();
        if (!clean) return '';
        return clean.charAt(0).toLocaleUpperCase('es') + clean.slice(1).toLocaleLowerCase('es');
    };

    return (
        <ProductApi.Provider value={{ getUsersData, loginUser, setLoginUser, orderByName, formatDate, statuses, capital }}>
            {children}
        </ProductApi.Provider>
    )
}

export default ProductControlApi
