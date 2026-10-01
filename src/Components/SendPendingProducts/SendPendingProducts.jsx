import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ProductApi } from '../../Context/ProductControlApi'

const SendPendingProducts = () => {

    const { loginUser, setLoginUser } = useContext(ProductApi)

    const { userPendingProd, userDeliveredProd } = loginUser

    const [oldDeliveredProd, setOldDeliveredProd] = useState(JSON.parse(localStorage.getItem("pendingOrder")) || [])

    //lo mando a localStorage, mas adelante tiene que enviarse a la DB





    const handlePendingProducts = () => {
        //  console.log('userPendingProd', userPendingProd);

        const userOldDeliveredProd = userDeliveredProd ?? []
        console.log('oldDeliveredProd', userOldDeliveredProd);

        // const oldDeliveredProd = JSON.parse(localStorage.getItem("pendingOrder"))
        console.log(oldDeliveredProd || []);


        const pendingProd = userPendingProd ?? []
        console.log('pendingProd', pendingProd);



        const pendingOrder = [
            {
                "orderId": 'xx',
                "orderStatus": "En Preparación",
                "date": new Date().toISOString(),
                "userOrder": `${loginUser.name}`,
                "orderArray": userPendingProd
            }
        ]

        localStorage.setItem('pendingOrder', JSON.stringify([...oldDeliveredProd, ...pendingOrder]))


        const deletePendingProdAndaddingDeliveredProd = { ...loginUser, userDeliveredProd: [...oldDeliveredProd, ...pendingOrder], userPendingProd: [] }

        localStorage.setItem('userPass', JSON.stringify(deletePendingProdAndaddingDeliveredProd))
        //en vez de estar guardando en el localStorage del usuario, podria buscar en pendingOrder y ver si coincide la persona que envio la orden, y el usuario que esta logueado en HOME
        setLoginUser(deletePendingProdAndaddingDeliveredProd)

    }


    return (

        <Button type='button' variant='primary' className='position-absolute top-0 end-0 me-2 mt-5' onClick={() => { handlePendingProducts() }}>
            Enviar
        </Button>

    )
}

export default SendPendingProducts
