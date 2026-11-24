import React, { useContext, useEffect, useState } from 'react'
import InfoCards from '../InfoCards/InfoCards'
import RecentOrders from '../RecentOrders/RecentOrders'
import { ProductApi } from '../../Context/ProductControlApi'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { Spinner } from 'react-bootstrap'

const MainInfo = () => {
    const { loginUser } = useContext(ProductApi)
    const { getUserOrders, userOrder } = useContext(DataProductApi)



    useEffect(() => {
        getUserOrders(loginUser)
    }, [])




    const onProcessCount = userOrder.filter(order => order.status_name === 'En Preparación')
    const preparedCount = userOrder.filter(order => order.status_name === 'Preparado')
    const deliveredCount = userOrder.filter(order => order.status_name === 'Entregado')

    const salonCards = [
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
        <div className="mt-5">
            {userOrder.length === 0 ?
                <Spinner animation="grow" variant="success" className='loadingSpinner' />
                :
                <>
                    <InfoCards cardParams={salonCards} />

                    <RecentOrders preparedCount={preparedCount} deliveredCount={deliveredCount} onProcessCount={onProcessCount} />
                </>
            }
        </div>
    )
}

export default MainInfo
