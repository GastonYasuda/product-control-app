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



    const processingCount = orders.filter(order => order.orderStatus === 'En Preparación').length
    const deliveredCount = orders.filter(order => order.orderStatus === 'Entregado').length


    const salonCards = [
        {
            title: 'Pedidos En Proceso',
            icon: 'deployed_code_history',
            count: processingCount
        },
        {
            title: 'Mis pedidos realizados',
            icon: 'history',
            count: deliveredCount
        },
    ]

    return (
        <div className="mt-5">
            <InfoCards cardParams={salonCards} />

            <RecentOrders />
        </div>
    )
}

export default MainInfo
