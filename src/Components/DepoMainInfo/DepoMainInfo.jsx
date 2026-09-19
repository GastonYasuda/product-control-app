import React from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'
import PendingOrders from '../PendingOrders/PendingOrders'

const DepoMainInfo = () => {

    //pasarle cantidad de cards texto, cantidad, icono

    const depoCards = [
        {
            'title': 'Pedidos Pendientes',
            'icon': ' deployed_code_history',
            'count': '1',
        }, {
            'title': 'preparados',
            'icon': ' deployed_code_history',
            'count': '2',
        }, {
            'title': 'Entregados',
            'icon': ' deployed_code_history',
            'count': '3',
        }
    ]

    return (
        <div>
            <InfoCards cardParams={depoCards} />

            <PendingOrders />
            {/* <RecentOrders /> */}

        </div>
    )
}

export default DepoMainInfo
