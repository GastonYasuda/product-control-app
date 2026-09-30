import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { ProductApi } from '../../Context/ProductControlApi'

const SendPendingProducts = () => {

    const { loginUser, setLoginUser } = useContext(ProductApi)

    const { userPendingProd, userDeliveredProd } = loginUser

    //lo mando a localStorage, mas adelante tiene que enviarse a la DB





    const handlePendingProducts = () => {
        //  console.log('userPendingProd', userPendingProd);

        const oldDeliveredProd = userDeliveredProd ?? []
        console.log('oldDeliveredProd', oldDeliveredProd);

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

        localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder))

        const deletePendingProdAndaddingDeliveredProd = { ...loginUser, userDeliveredProd: [...oldDeliveredProd, [...userPendingProd]], userPendingProd: [] }

        localStorage.setItem('userPass', JSON.stringify(deletePendingProdAndaddingDeliveredProd))
        setLoginUser(deletePendingProdAndaddingDeliveredProd)

    }


    return (

        <Button type='button' variant='primary' className='position-absolute top-0 end-0 me-2 mt-5' onClick={() => { handlePendingProducts() }}>
            Enviar
        </Button>

    )
}

export default SendPendingProducts
