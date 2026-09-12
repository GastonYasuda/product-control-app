import React from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'

const MainInfo = () => {

    const salonCards = [
        {
            'title': 'Pedidos Pendientes',
            'icon': ' deployed_code_history',
            'count': '1',
        }, {
            'title': 'Mis pedidos realizados',
            'icon': 'history',
            'count': '2',
        }
    ]

    return (
        <div>
            <InfoCards cardParams={salonCards} />

            <RecentOrders />
        </div>
    )
}

export default MainInfo
