import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { ProductApi } from '../../Context/ProductControlApi'
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail'
import Swal from 'sweetalert2'


const DetailElementComponent = ({ detailElementName, from }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, loginUser, setLoginUser } = useContext(ProductApi)

    const [detailElement, setDetailElement] = useState([])
    const [pendingProducts, setPendingProducts] = useState(loginUser.userPendingProd ?? [])
    const [showProducts, setShowProducts] = useState([])

    const [variant, setVariant] = useState('')

    useEffect(() => {

        if (from === 'category') {
            const selectedCategory = getAllProducts.filter(prod => prod.category.name === detailElementName)
            setDetailElement(selectedCategory)
            //  console.log(selectedCategory)
            mergeProdFunc(selectedCategory)


        } else if (from === 'supplier') {
            //    console.log('from', from);

            const selectedSupplier = getAllProducts.filter(prod => prod.supplier.name === detailElementName)
            setDetailElement(selectedSupplier)
            //  console.log(selectedSupplier)
            mergeProdFunc(selectedSupplier)

        } else if (from === 'orderList') {

            const getArray = pendingProducts.flatMap(userProduct =>
                getAllProducts.filter(product => product.id === userProduct.id)
                    .map(product => ({
                        ...product,
                        count: userProduct.count,
                        pending: userProduct.pending
                    }))
            )
            //   console.log(getArray)
            setShowProducts(orderByName(getArray))
        }


    }, [getAllProducts, detailElementName, pendingProducts, loginUser])


    const mergeProdFunc = (array1) => {

        if (from === 'category') {

            const pendingProductsByCategory = pendingProducts.filter(pendingProd => pendingProd.category.name === detailElementName)
            //   console.log(pendingProductsByCategory);
            // console.log(array1);

            const mergedProducts = [
                ...new Map(
                    [...array1, ...pendingProductsByCategory].map(product => [product.id, product])
                ).values()
            ];
            // console.log('mergedProducts2', mergedProducts);

            setShowProducts(orderByName(mergedProducts))

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
            ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
            : [...pendingProducts, { ...product, count: cantidad, pending: true }]

        savePending(productMerged)
        // console.log('productMerged', productMerged);

        //  console.log(detailElement);



        const searchProductArrayUpdated = detailElement.map(p =>
            productMerged.find(pp => pp.id === p.id) ?? p
        )
        //  console.log('searchProductArrayUpdated', searchProductArrayUpdated);

        setShowProducts(orderByName(searchProductArrayUpdated))

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

    }

    const aplicateSweetAlert = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon
        });
    }



    return (


        <Row className="productsCardContainer g-4 mx-auto justify-content-center" >

            {showProducts.map((product, i) => (
                <ProductCardComponentDetail product={product} key={product.id} deleteOrder={deleteOrder} addToOrder={addToOrder} variant={variant} setVariant={setVariant} from={from} />
            ))
            }
        </Row>


    )
}

export default DetailElementComponent
