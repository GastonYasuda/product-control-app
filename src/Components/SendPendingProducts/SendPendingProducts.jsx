import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ProductApi } from '../../Context/ProductControlApi'
import Swal from 'sweetalert2'


const SendPendingProducts = () => {

    const { loginUser, setLoginUser } = useContext(ProductApi)

    const { userPendingProd } = loginUser

    const [oldDeliveredProd, setOldDeliveredProd] = useState(JSON.parse(localStorage.getItem("pendingOrder")) || [])

    //lo mando a localStorage, mas adelante tiene que enviarse a la DB



    const handlePendingProducts = () => {

        Swal.fire({
            title: "Enviar orden?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#17a2b8",
            cancelButtonColor: "#868e96",
            confirmButtonText: "Enviar"
        }).then((result) => {
            if (result.isConfirmed) Swal.fire({
                title: "Enviado!",
                text: "*aca poner el codigo que manda las cosas* Revisá la pantalla inicial para conocer el estado de la orden.",
                icon: "success"
            });


            const fechaFormateada = new Intl.DateTimeFormat('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(new Date());

            const pendingOrder = [
                {
                    "orderId": Math.floor(Math.random() * 90),
                    "orderStatus": "En Preparación",
                    "date": fechaFormateada,
                    "userOrder": `${loginUser.name}`,
                    "orderArray": userPendingProd
                }
            ];
            localStorage.setItem('pendingOrder', JSON.stringify([...oldDeliveredProd, ...pendingOrder]))


            const deletePendingProdAndaddingDeliveredProd = { ...loginUser, userDeliveredProd: [...oldDeliveredProd, ...pendingOrder], userPendingProd: [] }

            localStorage.setItem('userPass', JSON.stringify(deletePendingProdAndaddingDeliveredProd))
            //en vez de estar guardando en el localStorage del usuario, podria buscar en pendingOrder y ver si coincide la persona que envio la orden, y el usuario que esta logueado en HOME
            setLoginUser(deletePendingProdAndaddingDeliveredProd)

        });

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
