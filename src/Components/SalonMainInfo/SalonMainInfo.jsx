import React, { useContext, useEffect, useState } from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'
import { ProductApi } from '../../Context/ProductControlApi'

const MainInfo = () => {
    const { loginUser } = useContext(ProductApi)
    const [userOrder, setUserOrder] = useState([])



    useEffect(() => {
        getUserOrders()
    }, [])

    const getUserOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${loginUser.id}/orders`)
            if (response.ok) {
                const data = await response.json()
                console.log(data);
                setUserOrder(data)


            } else {
                throw new Error("Error al intentar obtener productos");

            }
        }
        catch (error) {
            console.error(error)
        }
    }





    const onProcessCount = userOrder.filter(order => order.status_name === 'En Preparación')
    const preparedCount = userOrder.filter(order => order.status_name === 'Preparado')
    const deliveredCount = userOrder.filter(order => order.status_name === 'Entregado')

    const salonCards = [
        {
            'title': 'Pedidos En Preparación',
            'icon': ' deployed_code_history',
            'count': onProcessCount.length,
        }, {
            'title': 'Preparados',
            'icon': ' package_2',
            'count': preparedCount.length,
        }, {
            'title': 'Entregados',
            'icon': 'delivery_truck_speed',
            'count': deliveredCount.length,
        }
    ]





    return (
        <div className="mt-5">
            <InfoCards cardParams={salonCards} />

            <RecentOrders preparedCount={preparedCount} deliveredCount={deliveredCount} onProcessCount={onProcessCount} />
        </div>
    )
}

export default MainInfo
