import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { ProductApi } from '../../Context/ProductControlApi'
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail'
import { toast, Slide, ToastContainer } from 'react-toastify';


const DetailElementComponent = ({ from, allPendings, setAllPendings, detailElement }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, loginUser, setLoginUser, aplicateSweetAlert } = useContext(ProductApi)



    const [showProducts, setShowProducts] = useState([])
    // const [pendingBadge, setPendingBadge] = useState(false)
    const [inputCount, setInputCount] = useState('0')



    const [variant, setVariant] = useState('')




    useEffect(() => {

        console.log(detailElement);


        if (allPendings !== undefined && detailElement.length !== 0) {
            mergeDetailElementAllPending(allPendings)
        }

        // if (allPendings) {
        //     if (from === 'category') {
        //         // mergeProdFunc(getAllProducts, pending)
        //         mergeDetailElementAllPending(allPendings)
        //         console.log(allPendings);


        //     } else if (from === 'searchBar') {
        //         setShowProducts(
        //             searchProductArray.map(p =>
        //                 pending.find(pp => pp.id === p.id)
        //                 ?? getAllProducts.find(gp => gp.id === p.id)
        //                 ?? p

        //             ))
        //     }
        // }



    }, [allPendings, detailElement])


    const mergeDetailElementAllPending = (allPendingProducts) => {
        const nuevoProducto = detailElement.map(de => {
            const pendiente = allPendingProducts.find(
                ap => Number(ap.product_id) === Number(de.product_id)
            );

            if (pendiente) {
                return {
                    ...de,
                    product_count: pendiente.pending_order_quantity,
                    pending: true
                };
            }

            return {
                ...de,
                product_count: 0,
                pending: false
            };
        });

        setShowProducts(nuevoProducto);
    };


    // const mergeDetailElementAllPending = () => {
    //     const nuevoProducto = detailElement.map(de => {
    //         const pendiente = allPendings.find(
    //             ap => Number(ap.product_id) === Number(de.product_id)
    //         );

    //         if (pendiente) {
    //             return {
    //                 ...de,
    //                 product_count: pendiente.pending_order_quantity,
    //                 pending: true
    //             };
    //         }

    //         return de;
    //     });

    //     console.log(nuevoProducto);
    //     setShowProducts(nuevoProducto)

    // };

    const addToOrder = async (id_product, count) => {
        const quantity = Number(count);

        // 1. Validar la cantidad
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
        if (!saved) return;

        // 5. Crear un array sin duplicados y con la cantidad actualizada
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
                    // pending_order_user: loginUser.user_id,
                    product_id: Number(id_product),
                    pending_order_quantity: quantity,
                },
            ];

        // 6. Actualizar los estados de React
        // setAllPendings(updatedPendings);

        const newArrayAdded = {
            ...product,
            product_count: quantity,
            pending: true,
        }
        console.log(newArrayAdded);

        //   setShowProducts(newArrayAdded);

        // 7. Actualizar localStorage
        const updatedUser = {
            ...loginUser,
            pending_orders: updatedPendings,
        };
        //console.log(updatedPendings);
        setAllPendings(updatedPendings);
        mergeDetailElementAllPending(updatedPendings);
        localStorage.setItem("userPass", JSON.stringify(updatedUser));

    };



    // const addToOrder = (id, count) => {

    //     const cant = Number(count)
    //     const product = getAllProducts.find(p => p.id === id)

    //     if (!product) return

    //     if (!Number.isInteger(cant) || cant <= 0) return aplicateSweetAlert("Cantidad Erronea", "Ingrese un número mayor a 0", "warning")
    //     if (cant > product.stock) return aplicateSweetAlert("Stock Insuficiente", "", "warning")

    //     const exists = allPendings.some(p => p.id === id)

    //     const productMerged = exists
    //         ? allPendings.map(p => p.id === id ? { ...p, count: cant, pending: true } : p)
    //         : [...allPendings, { ...product, count: cant, pending: true }]

    //     savePending(productMerged)

    //     const searchProductArrayUpdated = detailElement.map(p =>
    //         productMerged.find(pp => pp.id === p.id) ?? p
    //     )
    //     //  console.log('searchProductArrayUpdated', searchProductArrayUpdated);

    //     setShowProducts(orderByName(searchProductArrayUpdated))

    //     toast.success(`Agregaste ${count} unidades de ${product.name} a pendientes`, {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: false,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         transition: Slide,
    //     });
    // }



    const savePending = async (body, productName) => {
        console.log(loginUser.user_id);
        console.log(productName);


        try {
            const response = await fetch(
                `http://localhost:3000/users/${loginUser.user_id}/pending`,
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



    // const savePending = (newPending) => {
    //     const updatedUser = { ...loginUser, userPendingProd: newPending }
    //     setPendingProducts(newPending)
    //     setLoginUser(updatedUser)
    //     localStorage.setItem('userPass', JSON.stringify(updatedUser))
    // }


    const deleteOrder = async (productId, productName) => {
        console.log('productId', productId);
        console.log('productName', productName);

        try {
            const response = await fetch(
                `http://localhost:3000/users/${loginUser.user_id}/delete-pending/${productId}`,
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
                product => product.product_id !== Number(productId)
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
            mergeDetailElementAllPending(newPendingArray);

            // setPendingBadge(false);
            setInputCount("");

            setShowProducts(prev =>
                prev.map(product =>
                    Number(product.product_id) === Number(productId)
                        ? {
                            ...product,
                            product_count: 0,
                            pending: false
                        }
                        : product
                )
            );

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


    // const deleteOrder = (id) => {
    //     const newPending = allPendings.filter(p => p.id !== id)

    //     savePending(newPending)

    //     setShowProducts(orderByName(
    //         detailElement.map(p =>
    //             newPending.find(pp => pp.id === p.id)
    //             ?? getAllProducts.find(gp => gp.id === p.id)
    //             ?? p
    //         )
    //     ))

    //     const erasedProduct = allPendings.find(p => p.id === id)
    //     toast.warn(`Quitaste ${erasedProduct.name} de pendientes`, {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: false,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         transition: Slide,
    //     });
    // }

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




    //copia
    return (

        <>
            <Row xs={2} md={4} className="productsCardContainer g-4 mx-auto justify-content-center" >

                {showProducts.map((product) => (
                    <section key={product.product_id}>
                        <ProductCardComponentDetail
                            product={product}
                            deleteOrder={deleteOrder}
                            addToOrder={addToOrder}
                            variant={variant}
                            setVariant={setVariant}
                            from={from} />
                    </section>
                ))
                }
            </Row>
            <ToastContainer />
        </>

    )
}

export default DetailElementComponent
