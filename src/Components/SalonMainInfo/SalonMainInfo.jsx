import React from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'

const MainInfo = () => {

    const salonCards = [
        {
            'title': 'Pedidos En Proceso',
            'icon': ' deployed_code_history',
            'count': '1',
        }, {
            'title': 'Mis pedidos realizados',
            'icon': 'history',
            'count': '2',
        }
    ]

    return (
        <div className="mt-5">
            <InfoCards cardParams={salonCards} />

            <RecentOrders />
        </div>
    )
}

export default MainInfo
