import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { ProductApi } from '../../Context/ProductControlApi'
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail'
import { toast, Slide, ToastContainer } from 'react-toastify';


const DetailElementComponent = ({ from, detailElementName }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, loginUser, setLoginUser, aplicateSweetAlert } = useContext(ProductApi)

    const [detailElement, setDetailElement] = useState([])
    const [pendingProducts, setPendingProducts] = useState(loginUser.pending_orders ?? [])
    const [showProducts, setShowProducts] = useState([])

    const [variant, setVariant] = useState('')

    useEffect(() => {
        getProductsByItem(from, detailElementName)

    }, [getAllProducts, detailElementName, pendingProducts, loginUser])

    const getProductsByItem = async (from, itemId) => {
        // console.log(from);
        // console.log(itemId);

        try {
            const response = await fetch(`http://localhost:3000/${from}/${itemId}`)
            if (response.ok) {
                const data = await response.json()
                console.log(data);
                setDetailElement(data)
                //     setShowProducts(data)
                mergeProdFunc(data)

            } else {
                throw new Error("Error al intentar obtener productos");

            }
        }
        catch (error) {
            console.error(error)
        }
    }


    const mergeProdFunc = (array1) => {

        if (from === 'category') {

            const pendingProductsByCategory = pendingProducts.filter(pendingProd => pendingProd.category_name === detailElementName)
            // console.log(pendingProductsByCategory);
            // console.log(detailElementName);


            const mergedProducts = [
                ...new Map(
                    [...array1, ...pendingProductsByCategory].map(product => [product.id, product])
                ).values()
            ];
            // console.log('mergedProducts2', mergedProducts);

            setShowProducts((mergedProducts))

        } else if (from === 'supplier') {

            const pendingProductsBySupplier = pendingProducts.filter(pendingProd => pendingProd.supplier.name === detailElementName)

            const mergedProducts = [
                ...new Map(
                    [...array1, ...pendingProductsBySupplier].map(product => [product.id, product])
                ).values()
            ];
            //   console.log('mergedProducts2', mergedProducts);

            setShowProducts(orderByName(mergedProducts))
        }

    }


    const addToOrder = (id, count) => {

        const cant = Number(count)
        const product = getAllProducts.find(p => p.id === id)

        if (!product) return

        if (!Number.isInteger(cant) || cant <= 0) return aplicateSweetAlert("Cantidad Erronea", "Ingrese un número mayor a 0", "warning")
        if (cant > product.stock) return aplicateSweetAlert("Stock Insuficiente", "", "warning")

        const exists = pendingProducts.some(p => p.id === id)

        const productMerged = exists
            ? pendingProducts.map(p => p.id === id ? { ...p, count: cant, pending: true } : p)
            : [...pendingProducts, { ...product, count: cant, pending: true }]

        savePending(productMerged)

        const searchProductArrayUpdated = detailElement.map(p =>
            productMerged.find(pp => pp.id === p.id) ?? p
        )
        //  console.log('searchProductArrayUpdated', searchProductArrayUpdated);

        setShowProducts(orderByName(searchProductArrayUpdated))

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


    const savePending = (newPending) => {
        const updatedUser = { ...loginUser, userPendingProd: newPending }
        setPendingProducts(newPending)
        setLoginUser(updatedUser)
        localStorage.setItem('userPass', JSON.stringify(updatedUser))
    }


    const deleteOrder = (id) => {
        const newPending = pendingProducts.filter(p => p.id !== id)

        savePending(newPending)

        setShowProducts(orderByName(
            detailElement.map(p =>
                newPending.find(pp => pp.id === p.id)
                ?? getAllProducts.find(gp => gp.id === p.id)
                ?? p
            )
        ))

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
            <Row className="productsCardContainer g-4 mx-auto justify-content-center" >

                {showProducts.map((product) => (
                    <section key={product.product_id}>
                        <ProductCardComponentDetail product={product} deleteOrder={deleteOrder} addToOrder={addToOrder} variant={variant} setVariant={setVariant} from={from} />
                    </section>
                ))
                }
            </Row>
            <ToastContainer />
        </>

    )
}

export default DetailElementComponent
