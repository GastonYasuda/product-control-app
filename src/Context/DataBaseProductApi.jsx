import React, { createContext, useState } from 'react'

export const DataProductApi = createContext()

const DataBaseProductApi = ({ children }) => {

    // const urlAllProducts = 'https://6a8cdd7663f113bab0b8788d.mockapi.io/product

    const [getAllProducts, setGetAllProducts] = useState([])

    const desdeDB = () => {
        console.log('probando desde desdeDB');

    }



    const getAllProductsFromDB = async () => {
        try {
            const response = await fetch('https://6a8cdd7663f113bab0b8788d.mockapi.io/product')
            if (response.ok) {
                const data = await response.json()
                console.log(data);

                //aca va el setState
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
        <DataProductApi.Provider value={{ desdeDB, getAllProductsFromDB }}>
            {children}
        </DataProductApi.Provider>
    )
}

export default DataBaseProductApi
