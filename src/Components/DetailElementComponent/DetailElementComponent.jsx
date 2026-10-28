import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { ProductApi } from '../../Context/ProductControlApi'
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail'
import { toast, Slide, ToastContainer } from 'react-toastify';


const DetailElementComponent = ({ from, detailElementName, allPendings, detailElement }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, loginUser, setLoginUser, aplicateSweetAlert } = useContext(ProductApi)



    const [showProducts, setShowProducts] = useState([])
    const [pendingBadge, setPendingBadge] = useState(false)
    const [inputCount, setInputCount] = useState('0')



    const [variant, setVariant] = useState('')




    useEffect(() => {

        if (allPendings !== undefined && detailElement.length !== 0) {
            test()

        }



    }, [allPendings, detailElement])


    const test = () => {
        const nuevoProducto = detailElement.map(de => {
            const pendiente = allPendings.find(
                ap => Number(ap.product_id) === Number(de.product_id)
            );

            if (pendiente) {
                return {
                    ...de,
                    product_count: pendiente.pending_order_quantity
                };
            }

            return de;
        });

        console.log(nuevoProducto);
        setShowProducts(nuevoProducto)


    };



    const mergeProdFunc = (array1) => {

        if (from === 'category') {

            const pendingProductsByCategory = allPendings.filter(pendingProd => pendingProd.category_name === detailElementName)
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

            const pendingProductsBySupplier = allPendings.filter(pendingProd => pendingProd.supplier.name === detailElementName)

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

        const exists = allPendings.some(p => p.id === id)

        const productMerged = exists
            ? allPendings.map(p => p.id === id ? { ...p, count: cant, pending: true } : p)
            : [...allPendings, { ...product, count: cant, pending: true }]

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
        const newPending = allPendings.filter(p => p.id !== id)

        savePending(newPending)

        setShowProducts(orderByName(
            detailElement.map(p =>
                newPending.find(pp => pp.id === p.id)
                ?? getAllProducts.find(gp => gp.id === p.id)
                ?? p
            )
        ))

        const erasedProduct = allPendings.find(p => p.id === id)
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
