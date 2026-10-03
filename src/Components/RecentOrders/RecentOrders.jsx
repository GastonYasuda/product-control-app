import React, { useEffect } from 'react'
import RecentOrderDetail from '../RecentOrderDetail/RecentOrderDetail'

const RecentOrders = ({ processingCount, deliveredCount }) => {

    useEffect(() => {
        console.log('processingCount', processingCount);
        console.log('deliveredCount', deliveredCount);


    }, [])



    return (
        <div className='mt-3'>
            <h4 className='mt-3 text-start ps-3'>Pedidos Recientes</h4>

            {processingCount.length !== 0 && processingCount.map(((processingOrder, i) =>
                <RecentOrderDetail orderData={processingOrder} key={i} />

            ))}

            {deliveredCount.length !== 0 && deliveredCount.map((deliveredOrder, i) =>
                <RecentOrderDetail orderData={deliveredOrder} key={i} />
            )}





        </div>
    )
}

export default RecentOrders
