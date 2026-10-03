import React, { useEffect, useState } from 'react'
import OrderDetailInfoCard from '../OrderDetailInfoCard/OrderDetailInfoCard';
import { Dropdown } from 'react-bootstrap';

const OrderDetailInfo = ({ idOrderDetail }) => {

    const getPendingOrders =
        JSON.parse(localStorage.getItem("pendingOrder")) || [];

    const selectOrder = getPendingOrders.find(
        order => order.orderId === Number(idOrderDetail)
    );

    const [orderStatus, setOrderStatus] = useState(
        selectOrder?.orderStatus || "En Preparación"
    );

    const handleChangeOrderStatus = (newStatus) => {

        // Cambiamos el estado visual
        setOrderStatus(newStatus);

        // Actualizamos el array completo
        const updatedOrders = getPendingOrders.map(order =>
            order.orderId === Number(idOrderDetail)
                ? {
                    ...order,
                    orderStatus: newStatus
                }
                : order
        );

        // Guardamos nuevamente en localStorage
        localStorage.setItem("pendingOrder", JSON.stringify(updatedOrders));
    };


    return (
        <div className='mt-5 text-start px-3'>

            <section className='d-flex align-items-center mb-4'>

                <h6 className='flex-fill mb-0'>
                    Pedido #{selectOrder?.orderId}
                </h6>

                <h6 className='flex-fill mb-0'>
                    {selectOrder?.date}
                </h6>

                <Dropdown className='navBar_container_item mt-3'>

                    <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                    >
                        {orderStatus}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='mt-5 rounded'>

                        <Dropdown.Item
                            className='dropdown-menu-txt'
                            onClick={() =>
                                handleChangeOrderStatus("En Preparación")
                            }
                        >
                            En Preparación
                        </Dropdown.Item>

                        <Dropdown.Item
                            className='dropdown-menu-txt'
                            onClick={() =>
                                handleChangeOrderStatus("Preparado")
                            }
                        >
                            Preparado
                        </Dropdown.Item>

                        <Dropdown.Item
                            className='dropdown-menu-txt'
                            onClick={() =>
                                handleChangeOrderStatus("Entregado")
                            }
                        >
                            Entregado
                        </Dropdown.Item>

                    </Dropdown.Menu>

                </Dropdown>

            </section>

            <OrderDetailInfoCard
                orderArray={selectOrder?.orderArray}
            />

        </div>
    )
}

export default OrderDetailInfo