import React, { createContext, useEffect, useState } from 'react'

export const DataProductApi = createContext()

const DataBaseProductApi = ({ children }) => {


    const [getAllProducts, setGetAllProducts] = useState([])

    useEffect(() => {
        getAllProductsFromDB()
    }, [])

    const desdeDB = () => {
        console.log('probando desde desdeDB');

    }


    const getAllProductsFromDB = async () => {
        try {
            const response = await fetch('http://localhost:3000/products')
            if (response.ok) {
                const data = await response.json()
                setGetAllProducts([...getAllProducts, ...data])
            } else {
                throw new Error("Error al intentar obtener productos");

            }
        }
        catch (error) {
            console.error(error)
        }


    }

    const userPendingProducts = async () => {

    }



    const getOneProductFromDB = () => { }
    const updateProductFromDB = () => { }
    const updateOneElementFromDB = () => { }
    const insertOneProductFromDB = () => { }
    const deleteOneElementFromDB = () => { }

    return (
        <DataProductApi.Provider value={{ desdeDB, getAllProducts }}>
            {children}
        </DataProductApi.Provider>
    )
}

export default DataBaseProductApi
