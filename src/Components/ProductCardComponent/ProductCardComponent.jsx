import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import { ProductApi } from '../../Context/ProductControlApi';
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail';

const ProductCardComponent = ({ searchProductArray, from, loginUser }) => {
    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, setLoginUser } = useContext(ProductApi)



    const [showProducts, setShowProducts] = useState([])
    const [pendingProducts, setPendingProducts] = useState(loginUser.userPendingProd ?? [])

    const { userPendingProd } = loginUser

    useEffect(() => {
        const pending = userPendingProd ?? []
        setPendingProducts(pending)

        if (from === 'productCard') {
            mergeProdFunc(getAllProducts, pending)
        } else if (from === 'searchBar') {
            setShowProducts(orderByName(
                searchProductArray.map(p =>
                    pending.find(pp => pp.id === p.id)
                    ?? getAllProducts.find(gp => gp.id === p.id)
                    ?? p
                )
            ))
        }
    }, [getAllProducts, searchProductArray, userPendingProd])


    const savePending = (newPending) => {
        const updatedUser = { ...loginUser, userPendingProd: newPending }
        setPendingProducts(newPending)
        setLoginUser(updatedUser)                                   // actualiza la app
        localStorage.setItem('userPass', JSON.stringify(updatedUser)) // persiste
    }

    const mergeProdFunc = (array1, array2) => {
        const mergedProducts = [
            ...new Map(
                [...array1, ...array2].map(product => [product.id, product])
            ).values()
        ];
        console.log('productos para mostrar en pantalla', mergedProducts);
        setShowProducts(orderByName(mergedProducts))
    }



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
            // localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: newPending }))
            // setPendingProducts(newPending)
            savePending(newPending)

            mergeProdFunc(getAllProducts, newPending)


        } else if (from === 'searchBar') {
            console.log(product.name);
            const exists = pendingProducts.some(p => p.id === id)

            const productMerged = exists
                ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
                : [...pendingProducts, { ...product, count: cantidad, pending: true }]

            savePending(productMerged)

            // setPendingProducts(productMerged)
            // localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: productMerged }))


            const searchProductArrayUpdated = searchProductArray.map(p =>
                productMerged.find(pp => pp.id === p.id) ?? p
            )
            setShowProducts(orderByName(searchProductArrayUpdated))

        }
    }


    const deleteOrder = (id) => {
        const newPending = pendingProducts.filter(p => p.id !== id)

        savePending(newPending)

        // setPendingProducts(newPending)
        // localStorage.setItem('userPass', JSON.stringify({ ...loginUser, userPendingProd: newPending }))

        if (from === 'productCard') {
            mergeProdFunc(getAllProducts, newPending)
        } else if (from === 'searchBar') {
            setShowProducts(orderByName(
                searchProductArray.map(p =>
                    newPending.find(pp => pp.id === p.id)      // si sigue pendiente, la versión pendiente
                    ?? getAllProducts.find(gp => gp.id === p.id) // si no, la versión limpia
                    ?? p
                )
            ))
        }
    }



    return (
        <Row xs={2} md={4} className="productsCardContainer g-4 mx-auto justify-content-center" >
            {
                showProducts.map((product, i) => (
                    <ProductCardComponentDetail product={product} key={product.id} deleteOrder={deleteOrder} addToOrder={addToOrder} variant={'vertical'} />
                ))
            }
        </Row>
    )
}

export default ProductCardComponent
