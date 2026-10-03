import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'


const DepoMainInfo = () => {


    const allOrders = JSON.parse(localStorage.getItem('pendingOrder')) || []

    const onProcessCount = allOrders.filter(order => order.orderStatus === 'En Preparación')
    const preparedCount = allOrders.filter(order => order.orderStatus === 'Preparado')
    const deliveredCount = allOrders.filter(order => order.orderStatus === 'Entregado')





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

            {/* <PendingOrders /> */}
            <RecentOrders preparedCount={preparedCount} deliveredCount={deliveredCount} onProcessCount={onProcessCount} />


        </div>
    )
}

export default DepoMainInfo
