import { useContext, useEffect } from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'
import { DataProductApi } from '../../Context/DataBaseProductApi'


const DepoMainInfo = () => {

    const { getAllOrders, allOrders } = useContext(DataProductApi)

    useEffect(() => {
        getAllOrders()
    }, [])


    const onProcessCount = allOrders.filter(order => order.status_name === 'En Preparación')
    const preparedCount = allOrders.filter(order => order.status_name === 'Preparado')
    const deliveredCount = allOrders.filter(order => order.status_name === 'Entregado')


    const depoCards = [
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
        <div>
            <InfoCards cardParams={depoCards} />

            <RecentOrders preparedCount={preparedCount} deliveredCount={deliveredCount} onProcessCount={onProcessCount} />
        </div>
    )
}

export default DepoMainInfo
