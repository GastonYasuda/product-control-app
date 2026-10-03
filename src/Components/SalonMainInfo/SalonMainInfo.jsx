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



    const processingCount = orders.filter(order => order.orderStatus === 'En Preparación')
    const deliveredCount = orders.filter(order => order.orderStatus === 'Entregado')


    const salonCards = [
        {
            title: 'Pedidos En Preparación',
            icon: 'deployed_code_history',
            count: processingCount.length
        },
        {
            title: 'Mis pedidos realizados',
            icon: 'history',
            count: deliveredCount.length
        },
    ]

    return (
        <div className="mt-5">
            <InfoCards cardParams={salonCards} />

            <RecentOrders processingCount={processingCount} deliveredCount={deliveredCount} />
        </div>
    )
}

export default MainInfo
