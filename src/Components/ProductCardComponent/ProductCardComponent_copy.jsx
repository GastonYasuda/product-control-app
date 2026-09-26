import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { DataProductApi } from '../../Context/DataBaseProductApi';
import { ProductApi } from '../../Context/ProductControlApi';
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail';

const ProductCardComponent_copy = ({ productsArray, from, loginUser }) => {
    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName } = useContext(ProductApi)


    //  const [pendingProducts, setPendingProducts] = useState(loginUser.userPendingProd)
    const [showProducts, setShowProducts] = useState([])
    const [productCount, setProductCount] = useState('')
    const [pendingProducts, setPendingProducts] = useState(productsArray)



    useEffect(() => {
        console.log(productsArray.length);

        if (productsArray.length !== 0) {
            console.log(productsArray);

            if (from === 'productCard') {
                mergeProdFunc(getAllProducts, productsArray)//me muestra todos los productos con los pendientes

            } else if (from === 'searchBar') {

            }
        }




    }, [getAllProducts, productsArray])

    const mergeProdFunc = (array1, array2) => {
        const mergedProducts = [
            ...new Map(
                [...array1, ...array2].map(product => [product.id, product])
            ).values()
        ];
        console.log('mergedProducts2', mergedProducts);
        setShowProducts(orderByName(mergedProducts))
    }



    const addToOrder = (id, count) => {
        const cantidad = Number(count)
        const product = getAllProducts.find(p => p.id === id)

        if (!product) return
        if (!Number.isInteger(cantidad) || cantidad <= 0) return alert('Ingresá una cantidad válida')
        if (cantidad > product.stock) return alert(`Solo hay ${product.stock} en stock`)

        const exists = pendingProducts.some(p => p.id === id)
        const newPending = exists
            ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
            : [...pendingProducts, { ...product, count: cantidad, pending: true }]

        setPendingProducts(newPending)
        mergeProdFunc(getAllProducts, newPending)
        localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: newPending }))
    }



    const deleteOrder = (id) => {
        const newPending = pendingProducts.filter(p => p.id !== id)

        setPendingProducts(newPending)
        mergeProdFunc(getAllProducts, newPending)
        localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: newPending }))
    }



    return (
        <Row xs={2} md={4} className="productsCardContainer mt-2 g-4 mx-auto justify-content-center" >

            {showProducts.map((product, i) => (
                <ProductCardComponentDetail product={product} key={i} deleteOrder={deleteOrder} addToOrder={addToOrder} />
            ))
            }
        </Row>
    )
}

export default ProductCardComponent_copy
