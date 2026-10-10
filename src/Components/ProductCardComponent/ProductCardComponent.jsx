import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import { ProductApi } from '../../Context/ProductControlApi';
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail';
import { toast, Slide, ToastContainer } from 'react-toastify';

const ProductCardComponent = ({ searchProductArray, from, loginUser }) => {
    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, setLoginUser } = useContext(ProductApi)



    const [showProducts, setShowProducts] = useState([])
    const [pendingProducts, setPendingProducts] = useState(loginUser.userPendingProd ?? [])

    const [variant, setVariant] = useState('')


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

            const newPending = exists
                ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
                : [...pendingProducts, { ...product, count: cantidad, pending: true }]

            savePending(newPending)

            mergeProdFunc(getAllProducts, newPending)


        } else if (from === 'searchBar') {
            console.log(product.name);
            const exists = pendingProducts.some(p => p.id === id)

            const productMerged = exists
                ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
                : [...pendingProducts, { ...product, count: cantidad, pending: true }]

            savePending(productMerged)


            const searchProductArrayUpdated = searchProductArray.map(p =>
                productMerged.find(pp => pp.id === p.id) ?? p
            )
            setShowProducts(orderByName(searchProductArrayUpdated))

        }

        toast.success(`Agregaste ${count} unidades de ${product.name} a pendientes`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }


    const deleteOrder = (id) => {
        const newPending = pendingProducts.filter(p => p.id !== id)

        savePending(newPending)



        if (from === 'productCard') {
            mergeProdFunc(getAllProducts, newPending)
        } else if (from === 'searchBar') {
            setShowProducts(orderByName(
                searchProductArray.map(p =>
                    newPending.find(pp => pp.id === p.id)
                    ?? getAllProducts.find(gp => gp.id === p.id)
                    ?? p
                )
            ))
        }
        const erasedProduct = pendingProducts.find(p => p.id === id)
        toast.warn(`Quitaste ${erasedProduct.name} de pendientes`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }



    return (
        <>
            <Row xs={2} md={4} className="productsCardContainer g-4 mx-auto justify-content-center" >
                {
                    showProducts.map((product, i) => (
                        <ProductCardComponentDetail product={product} key={product.id} deleteOrder={deleteOrder} addToOrder={addToOrder} variant={variant} setVariant={setVariant} from={from} />
                    ))
                }
            </Row>
            <ToastContainer />
        </>

    )
}

export default ProductCardComponent
