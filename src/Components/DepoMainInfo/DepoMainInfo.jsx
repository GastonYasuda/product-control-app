import { useEffect, useState } from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'


const DepoMainInfo = () => {

    const [allOrders, setAllorders] = useState([])

    const getAllOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders`)
            if (response.ok) {
                const data = await response.json()
                // console.log(data);
                setAllorders(data)

            } else {
                throw new Error("Error al intentar obtener productos");

            }
        }
        catch (error) {
            console.error(error)
        }
    }



    const onProcessCount = allOrders.filter(order => order.status_name === 'En Preparación')
    const preparedCount = allOrders.filter(order => order.status_name === 'Preparado')
    const deliveredCount = allOrders.filter(order => order.status_name === 'Entregado')

    getAllOrders()
    // useEffect(() => {
    // console.log('onProcessCount', onProcessCount);
    // console.log('preparedCount', preparedCount)
    // console.log('preparedCount', preparedCount);

    // }, [])





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
