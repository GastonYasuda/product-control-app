import React, { useContext, useEffect, useState } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { ProductApi } from '../../Context/ProductControlApi'
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail'
import { toast, Slide, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'


const DetailElementComponent = ({ from, allPendings, setAllPendings, detailElement }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, loginUser } = useContext(ProductApi)



    const [showProducts, setShowProducts] = useState([])
    // const [pendingBadge, setPendingBadge] = useState(false)


    useEffect(() => {

        if (from !== 'pendingProductList') {

            if (allPendings !== undefined && detailElement.length !== 0) {

                mergeDetailElementAllPending(allPendings)

            }

        } else if (Array.isArray(allPendings)) {
            funcionParaOrder(allPendings);
        }

    }, [allPendings, getAllProducts, detailElement])

    const funcionParaOrder = (arrayAdd) => {
        const newProductsArray = arrayAdd.map(pending => {
            const product = getAllProducts.find(
                p => Number(p.product_id) === Number(pending.product_id)
            );

            if (!product) return null;

            return {
                ...product,
                product_count: pending.pending_order_quantity,
                pending: true
            };
        }).filter(Boolean);


        setShowProducts(orderByName(newProductsArray))
    }



    const mergeDetailElementAllPending = (allPendingProducts) => {
        console.log(detailElement);

        const pendientes = Array.isArray(allPendingProducts)
            ? allPendingProducts
            : [];

        const nuevoProducto = detailElement.map(product => {
            const actualizado = getAllProducts.find(
                p => Number(p.product_id) === Number(product.product_id)
            );
            const pendiente = pendientes.find(
                p => Number(p.product_id) === Number(product.product_id)
            );

            return {
                ...product,
                ...actualizado,   // precio y stock al día
                product_count: pendiente ? pendiente.pending_order_quantity : 0,
                pending: Boolean(pendiente),
            };
        });
        setShowProducts(orderByName(nuevoProducto));
    };



    const addToOrder = async (id_product, count) => {
        const quantity = Number(count);

        // 1. Validar la cantidad
        if (!Number.isInteger(quantity) || quantity <= 0) {
            Swal.fire("Atención", "Ingresá una cantidad válida", "warning");
            return;
        }

        const product = getAllProducts.find(
            p => Number(p.product_id) === Number(id_product)
        );

        if (!product) {
            Swal.fire("Error", "No se encontró el producto", "error");
            return;
        }

        if (quantity > product.product_stock) {
            Swal.fire(
                "Atención",
                `Solo hay ${product.product_stock} unidades en stock`,
                "warning"
            );
            return;
        }

        // 3. Comprobar si ya existe en pendientes
        const exists = allPendings.some(
            p => Number(p.product_id) === Number(id_product)
        );

        // 4. Enviar al backend
        const saved = await savePending(
            {
                product_id: Number(id_product),
                quantity: quantity,
            },
            product.product_name
        );

        // Si el backend falla, no actualizamos los datos locales
        if (!saved) return false;
        setAllPendings(updatedPendings);

        // 5. Crear un array sin duplicados y con la cantidad actualizada
        // const updatedPendings = exists
        //     ? allPendings.map(p =>
        //         Number(p.product_id) === Number(id_product)
        //             ? {
        //                 ...p,
        //                 pending_order_quantity: quantity,
        //             }
        //             : p
        //     )
        //     : [
        //         ...allPendings,
        //         {
        //             // pending_order_user: loginUser.user_id,
        //             product_id: Number(id_product),
        //             pending_order_quantity: quantity,
        //         },
        //     ];

        // // 6. Actualizar los estados de React
        // setAllPendings(updatedPendings);

        // const newArrayAdded = {
        //     ...product,
        //     product_count: quantity,
        //     pending: true,
        // }
        // console.log(newArrayAdded);

        // //   setShowProducts(newArrayAdded);

        // // 7. Actualizar localStorage
        // const updatedUser = {
        //     ...loginUser,
        //     pending_orders: updatedPendings,
        // };
        //console.log(updatedPendings);


        // if (from !== 'pendingProductList') {

        //     mergeDetailElementAllPending(updatedPendings);
        // } else {
        //     console.log(updatedPendings);

        //     funcionParaOrder(updatedPendings)
        // }



        localStorage.setItem("userPass", JSON.stringify(updatedUser));

    };


    const savePending = async (body, productName) => {
        // console.log(loginUser.user_id);
        // console.log(productName);


        try {
            const response = await fetch(
                `https://product-control-back.onrender.com/users/${loginUser.user_id}/pending`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            showTostify(
                "success",
                `${productName} guardado en pendientes correctamente`
            );

            return true;

        } catch (error) {
            console.error("Error al guardar el pendiente:", error);

            Swal.fire(
                "Error",
                "No se pudo guardar el producto en pendientes",
                "error"
            );

            return false;
        }
    };

    const deleteOrder = async (productId, productName) => {
        console.log('productId', productId);
        console.log('productName', productName);

        try {
            const response = await fetch(
                `https://product-control-back.onrender.com/users/${loginUser.user_id}/delete-pending/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            // 1. Crear un nuevo array sin el producto eliminado
            const newPendingArray = allPendings.filter(
                product => Number(product.product_id) !== Number(productId)
            );

            // 2. Actualizar el estado de todos los pendientes
            //   setAllPendings(newPendingArray);
            console.log(newPendingArray);//hasta aca ok



            // 4. Actualizar localStorage
            const newUserArray = {
                ...loginUser,
                pending_orders: newPendingArray,
            };

            localStorage.setItem("userPass", JSON.stringify(newUserArray));

            // 5. Actualizar la interfaz
            setAllPendings(newPendingArray);



            // if (from !== 'pendingProductList') {

            //     mergeDetailElementAllPending(newPendingArray);
            // } else {

            //     funcionParaOrder(newPendingArray)
            // }

            // setPendingBadge(false);

            const newShowArrayProducts = prev =>
                prev.map(product =>
                    Number(product.product_id) === Number(productId)
                        ? {
                            ...product,
                            product_count: 0,
                            pending: false
                        }
                        : product
                )

            setShowProducts(newShowArrayProducts);

            showTostify(
                "success",
                `${productName} eliminado de pendientes correctamente!`
            );

        } catch (error) {
            console.error("Error al eliminar el pendiente:", error);

            Swal.fire(
                "Error al eliminar",
                error.message || "No se pudo quitar el producto de pendientes",
                "error"
            );
        }
    };


    const showTostify = (icon, text) => {
        toast[icon](text, {
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
            {showProducts.length === 0 ?
                <Spinner animation="grow" variant="success" className='loadingSpinner' />
                :

                <>
                    <Row xs={2} md={4} className="productsCardContainer g-4 mx-auto justify-content-center" >

                        {showProducts.map((product) => (
                            <section key={product.product_id}>
                                <ProductCardComponentDetail
                                    product={product}
                                    deleteOrder={deleteOrder}
                                    addToOrder={addToOrder}
                                    from={from}
                                    rol={loginUser.user_rol}
                                />
                            </section>
                        ))
                        }
                    </Row>
                    <ToastContainer />
                </>
            }
        </>

    )
}

export default DetailElementComponent
