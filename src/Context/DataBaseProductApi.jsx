import React, { createContext, useEffect, useState } from 'react'

export const DataProductApi = createContext()

const DataBaseProductApi = ({ children }) => {



    const [getAllProducts, setGetAllProducts] = useState([])
    const [userOrder, setUserOrder] = useState([])

    const [allOrders, setAllorders] = useState([])


    useEffect(() => {
        getAllProductsFromDB()
    }, [userOrder])

    const getAllProductsFromDB = async () => {
        try {
            const response = await fetch('https://product-control-back.onrender.com/products')
            if (response.ok) {
                const data = await response.json()
                //  setGetAllProducts([...getAllProducts, ...data])
                setGetAllProducts(data)
                // console.log(data);

            } else {
                throw new Error("Error al intentar obtener productos")
            }
        }
        catch (error) {
            console.error(error)
        }
    }


    const updateProductInList = (id, changes) => {
        setGetAllProducts(prev =>
            prev.map(p =>
                Number(p.product_id) === Number(id) ? { ...p, ...changes } : p
            )
        );
    };

    const getUserOrders = async (loginUser) => {
        console.log(loginUser);

        try {
            const response = await fetch(`https://product-control-back.onrender.com/users/${loginUser.user_id}/orders`)
            if (response.ok) {
                const data = await response.json()
                // console.log(data);
                setUserOrder(data)


            } else {
                throw new Error("Error al intentar obtener productos");

            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const getAllOrders = async () => {
        try {
            const response = await fetch(`https://product-control-back.onrender.com/orders`)
            if (response.ok) {
                const data = await response.json()
                console.log(data);
                setAllorders(data)

            } else {
                throw new Error("Error al intentar obtener productos");

            }
        }
        catch (error) {
            console.error(error)
        }
    }



    const getOneProductFromDB = () => { }
    const updateProductFromDB = () => { }
    const updateOneElementFromDB = () => { }
    const insertOneProductFromDB = () => { }
    const deleteOneElementFromDB = () => { }

    return (
        <DataProductApi.Provider value={{ getAllProductsFromDB, getAllProducts, updateProductInList, getUserOrders, userOrder, getAllOrders, allOrders }}>
            {children}

        </DataProductApi.Provider>
    )
}

export default DataBaseProductApi
