import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import { ProductApi } from '../../Context/ProductControlApi';
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail';

const ProductCardComponent = ({ searchProductArray, from, loginUser }) => {
    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName } = useContext(ProductApi)



    const [showProducts, setShowProducts] = useState([])
    const [pendingProducts, setPendingProducts] = useState()

    const { userPendingProd } = loginUser

    useEffect(() => {
        // console.log('userPendingProd', userPendingProd);
        //  console.log('searchProductArray', searchProductArray);


        if (userPendingProd !== undefined) {


            if (from === 'productCard') {
                mergeProdFunc(getAllProducts, userPendingProd)//me muestra todos los productos con los pendientes
                setPendingProducts(userPendingProd)

            } else if (from === 'searchBar') {
                setShowProducts(orderByName(updateProductsFrom(searchProductArray, userPendingProd)));

                setPendingProducts(userPendingProd)
            }
        }

    }, [getAllProducts, searchProductArray])

    const mergeProdFunc = (array1, array2) => {
        const mergedProducts = [
            ...new Map(
                [...array1, ...array2].map(product => [product.id, product])
            ).values()
        ];
        console.log('productos para mostrar en pantalla', mergedProducts);
        setShowProducts(orderByName(mergedProducts))
    }


    const updateProductsFrom = (base, updates) => {
        const updatesById = new Map(updates.map(p => [p.id, p]));
        return base.map(p => updatesById.get(p.id) ?? p);
    };




    const addToOrder = (id, count) => {
        console.log('id', id);

        const cantidad = Number(count)
        const product = getAllProducts.find(p => p.id === id)

        if (!product) return
        if (!Number.isInteger(cantidad) || cantidad <= 0) return alert('Ingresá una cantidad válida')
        if (cantidad > product.stock) return alert(`Solo hay ${product.stock} en stock`)



        if (from === 'productCard') {

            const exists = pendingProducts.some(p => p.id === id)
            //  console.log(exists);

            const newPending = exists
                ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
                : [...pendingProducts, { ...product, count: cantidad, pending: true }]


            //   console.log('nuevo array para guardar en local', newPending);
            localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: newPending }))
            setPendingProducts(newPending)

            mergeProdFunc(getAllProducts, newPending)


        } else if (from === 'searchBar') {
            console.log(product.name);

            const exists = pendingProducts.some(p => p.id === product.id)
            console.log(exists);

            const productMerged = exists ?
                pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
                : [...pendingProducts, { ...product, count: cantidad, pending: true }]

            console.log('productMerged', productMerged);

            localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: productMerged }))

            const searchProductArrayUpdated = pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)

            console.log(searchProductArrayUpdated);
            setPendingProducts(productMerged)
            mergeProdFunc(searchProductArrayUpdated, productMerged)
        }
    }



    const deleteOrder = (id) => {
        if (from === 'productCard') {

            const newPending = pendingProducts.filter(p => p.id !== id)
            setPendingProducts(newPending)
            mergeProdFunc(getAllProducts, newPending)
            localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: newPending }))

        } else if (from === 'searchBar') {
            const newPending = searchProductArray.filter(p => p.id !== id)

            console.log(newPending);

            setPendingProducts(newPending)
            mergeProdFunc(searchProductArray, newPending)
            localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: newPending }))
        }

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

export default ProductCardComponent
