import React from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'

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
            'count': '8',
        }
    ]

    return (
        <div>
            <InfoCards cardParams={depoCards} />

            {/* tengo que crear uno nuevo componente de pedidos pendientes */}

            <RecentOrders />

        </div>
    )
}

export default DepoMainInfo
