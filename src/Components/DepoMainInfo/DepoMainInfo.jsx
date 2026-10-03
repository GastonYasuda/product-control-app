import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'
import PendingOrders from '../PendingOrders/PendingOrders'

const DepoMainInfo = () => {

    //pasarle cantidad de cards texto, cantidad, icono
    const allOrders = JSON.parse(localStorage.getItem('pendingOrder')) || []

    const processingCount = allOrders.filter(order => order.orderStatus === 'En Preparación')
    const preparedCount = allOrders.filter(order => order.orderStatus === 'Preparado')
    const deliveredCount = allOrders.filter(order => order.orderStatus === 'Entregado')

    console.log('processingCount', processingCount.length);
    console.log('preparedCount', preparedCount.length);
    console.log('deliveredCount', deliveredCount.length);



    const depoCards = [
        {
            'title': 'Pedidos En Proceso',
            'icon': ' deployed_code_history',
            'count': processingCount.length,
        }, {
            'title': 'preparados',
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

            <PendingOrders />
            {/* <RecentOrders /> */}

        </div>
    )
}

export default DepoMainInfo
