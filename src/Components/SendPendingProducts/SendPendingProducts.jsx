import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ProductApi } from '../../Context/ProductControlApi'
import Swal from 'sweetalert2'



const SendPendingProducts = () => {

    const { loginUser, aplicateSweetAlert } = useContext(ProductApi)
    const [getPendingOrder, setGetPendingOrder] = useState([])


    //lo mando a localStorage, mas adelante tiene que enviarse a la DB

    useEffect(() => {
        if (getPendingOrder.length < 0) { getUserPending() }
    }, [getPendingOrder])


    const getUserPending = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${loginUser.user_id}/pending`)
            if (response.ok) {
                const data = await response.json()
                console.log('lo q tengo ahora', data);
                setGetPendingOrder(data)


            } else {
                throw new Error("Error al intentar obtener usuario");

            }
        }
        catch (error) {
            console.error(error)
        }
    }


    const deletePendingOrderDB = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/users/${loginUser.user_id}/delete-pending`,
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

        } catch (error) {
            console.error("Error al eliminar pendientes:", error);

        }
    }


    const sendOrder = async (userId, body) => {
        const response = await fetch(
            `http://localhost:3000/users/${userId}/addOrder`,
            {
                method: "POST",
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

    }





    const handlePendingProducts = () => {

        if (getPendingOrder.length !== 0) {

            Swal.fire({
                title: "Enviar orden?",
                text: "",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#17a2b8",
                cancelButtonColor: "#868e96",
                confirmButtonText: "Enviar"

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Enviado!",
                        text: "Revisá la pantalla inicial para conocer el estado de las ordenes.",
                        icon: "success",
                        confirmButtonColor: "#17a2b8",
                    });


                    const nuevoArray = getPendingOrder.map(product => ({
                        product_id: product.product_id,
                        quantity: Number(product.pending_order_quantity)
                    }));

                    console.log('getPendingOrder', getPendingOrder);

                    const pendingProductsToSend = {
                        "products": nuevoArray
                    }
                    console.log('nuevoArray', nuevoArray);

                    console.log(pendingProductsToSend);
                    sendOrder(loginUser.user_id, pendingProductsToSend)

                    deletePendingOrderDB()

                    // 7. Actualizar localStorage
                    const updatedUser = {
                        ...loginUser,
                        pending_orders: [],
                    };

                    localStorage.setItem("userPass", JSON.stringify(updatedUser));


                }

            });
        } else {
            aplicateSweetAlert("No hay productos pendientes", "", "warning")
        }

    }


    return (

        <Button type='button' variant='info' className='position-absolute top-0 end-0 me-2 mt-5' onClick={() => { handlePendingProducts() }}>
            <span className="material-symbols-outlined text-light">
                shopping_cart_checkout
            </span>
        </Button>

    )
}

export default SendPendingProducts
