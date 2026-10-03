import React, { useContext, useEffect, useState } from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'
import { ProductApi } from '../../Context/ProductControlApi'

const MainInfo = () => {
    const { loginUser } = useContext(ProductApi)



    const userOrders = JSON.parse(localStorage.getItem('pendingOrder')) || []
    const orders = loginUser?.name
        ? userOrders.filter(o => o.userOrder === loginUser.name)
        : []



    const onProcessCount = orders.filter(order => order.orderStatus === 'En Preparación')
    const preparedCount = orders.filter(order => order.orderStatus === 'Preparado')
    const deliveredCount = orders.filter(order => order.orderStatus === 'Entregado')

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
