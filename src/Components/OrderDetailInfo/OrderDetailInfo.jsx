import React from 'react'
import OrderDetailInfoCard from '../OrderDetailInfoCard/OrderDetailInfoCard';

const OrderDetailInfo = ({ idOrderDetail }) => {

    const getPendingOrders = JSON.parse(localStorage.getItem("pendingOrder")) || []
    console.log(getPendingOrders);


    // Devuelve el objeto directo en lugar de un array con un único elemento
    const selectOrder = getPendingOrders.find(
        order => order.orderId === Number(idOrderDetail)
    );

    console.log(selectOrder);




    return (
        <div className='mt-5 text-start px-3'>

            <section className='d-flex align-items-center mb-4'>
                <h6 className='flex-fill mb-0'>Pedido #{selectOrder.orderId}</h6>
                <h6 className='flex-fill mb-0'>{selectOrder.date}</h6>
                <span className={`${selectOrder.orderStatus === 'Entregado'
                    ? 'bg-secondary'
                    : 'bg-info'
                    } text-white rounded p-2 w-25 lh-1 flex-fill text-center`} >{selectOrder.orderStatus}</span>

                {/* <span>Por: {selectOrder.orderStatus}</span> solamente para deposito*/}
            </section>


            <OrderDetailInfoCard orderArray={selectOrder.orderArray} />




        </div>
    )
}

export default OrderDetailInfo
