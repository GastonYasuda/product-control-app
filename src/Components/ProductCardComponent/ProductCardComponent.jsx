import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import { ProductApi } from '../../Context/ProductControlApi';
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail';
import Swal from 'sweetalert2'
import { toast, Slide, ToastContainer } from 'react-toastify';

const ProductCardComponent = ({ searchProductArray, from, loginUser, allPendings, setAllPendings }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName } = useContext(ProductApi)


    const [showProducts, setShowProducts] = useState([])



    useEffect(() => {

        if (getAllProducts !== 0) {
            if (from === 'productCard') {

                mergeDetailElementAllPending(getAllProducts)

            } else if (from === 'searchBar') {

                mergeDetailElementAllPending(searchProductArray)

            }
        }

    }, [getAllProducts, searchProductArray, allPendings, loginUser, from])



    const mergeDetailElementAllPending = (mergeProductsArray) => {

        const nuevoProducto = mergeProductsArray.map(de => {
            const pendiente = allPendings.find(
                ap => Number(ap.product_id) === Number(de.product_id)
            );

            return pendiente
                ? { ...de, product_count: pendiente.pending_order_quantity, pending: true }
                : { ...de, product_count: 0, pending: false };
        });
        console.log(nuevoProducto);

        setShowProducts(orderByName(nuevoProducto));

    };


    const addToOrder = async (id_product, count) => {
        const quantity = Number(count);

        if (!Number.isInteger(quantity) || quantity <= 0) {
            Swal.fire("Atención", "Ingresá una cantidad válida", "warning");
            return;
        }

        const product = getAllProducts.find(
            p => p.product_id === Number(id_product)
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

        const exists = allPendings.some(
            p => Number(p.product_id) === Number(id_product)
        );

        const saved = await savePending(
            {
                product_id: Number(id_product),
                quantity: quantity,
            },
            product.product_name
        );

        // Si el backend falla, no actualizamos los datos locales
        if (!saved) return;

        // Array sin duplicados y con la cantidad actualizada
        const updatedPendings = exists
            ? allPendings.map(p =>
                Number(p.product_id) === Number(id_product)
                    ? {
                        ...p,
                        pending_order_quantity: quantity,
                    }
                    : p
            )
            : [
                ...allPendings,
                {
                    product_id: Number(id_product),
                    pending_order_quantity: quantity,
                },
            ];

        const updatedUser = {
            ...loginUser,
            pending_orders: updatedPendings,
        };

        setAllPendings(updatedPendings);

        from === 'productCard' ?
            mergeDetailElementAllPending(getAllProducts)
            :
            mergeDetailElementAllPending(searchProductArray)

        localStorage.setItem("userPass", JSON.stringify(updatedUser));

    };


    const savePending = async (body, productName) => {

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

            Swal.fire(
                "Error",
                "No se pudo guardar el producto en pendientes",
                "error"
            );

            return false;
        }
    };



    const deleteOrder = async (productId, productName) => {

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

            const newPendingArray = allPendings.filter(
                product => product.product_id !== Number(productId)
            );


            const newUserArray = {
                ...loginUser,
                pending_orders: newPendingArray,
            };

            localStorage.setItem("userPass", JSON.stringify(newUserArray));

            setAllPendings(newPendingArray);

            from === 'productCard' ?
                mergeDetailElementAllPending(getAllProducts)
                :
                mergeDetailElementAllPending(searchProductArray)


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
            <Row xs={2} md={4} className="productsCardContainer g-4 mx-auto justify-content-center" >
                {
                    showProducts.map((product, i) => (
                        <section key={i}>
                            <ProductCardComponentDetail
                                product={product}
                                key={product.product_id}
                                deleteOrder={deleteOrder}
                                addToOrder={addToOrder}
                                from={from}
                                rol={loginUser.user_rol}
                            />
                        </section>
                    ))
                }
                <ToastContainer />
            </Row>
        </>

    )
}

export default ProductCardComponent
