import React, { useContext, useState } from 'react'
import OrderDetailInfoCard from '../OrderDetailInfoCard/OrderDetailInfoCard';
import { Button, Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2'


const OrderDetailInfo = ({ idOrderDetail }) => {

    const userOrders = JSON.parse(localStorage.getItem('userPass')) || []
    const userRol = userOrders.rol

    const [pendingOrders, setPendingOrders] = useState(() => {
        return JSON.parse(localStorage.getItem("pendingOrder")) || [];
    });

    const selectOrder = pendingOrders.find(
        order => order.orderId === Number(idOrderDetail)
    );

    const [orderStatus, setOrderStatus] = useState(
        selectOrder?.orderStatus || "En Preparación"
    );

    const handleChangeOrderStatus = (newStatus) => {

        const allChecked = selectOrder.orderArray.filter(p => p.checked === true)

        if (allChecked.length === selectOrder.orderArray.length) {

            Swal.fire({
                title: "Desea cambiar el estado de la orden?",
                text: `"${orderStatus}" a "${newStatus}"`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#17a2b8",
                cancelButtonColor: "#868e96",
                confirmButtonText: "Cambiar"
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        setOrderStatus(newStatus);

                        const updatedOrders = pendingOrders.map(order =>
                            order.orderId === Number(idOrderDetail)
                                ? { ...order, orderStatus: newStatus }
                                : order
                        );

                        setPendingOrders(updatedOrders);
                        localStorage.setItem("pendingOrder", JSON.stringify(updatedOrders));
                    }
                })

        } else {
            Swal.fire({
                title: "Productos sin tildar",
                text: `Desea cambiar el estado igual?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#17a2b8",
                cancelButtonColor: "#868e96",
                confirmButtonText: "Aceptar"
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        setOrderStatus(newStatus);

                        const updatedOrders = pendingOrders.map(order =>
                            order.orderId === Number(idOrderDetail)
                                ? { ...order, orderStatus: newStatus }
                                : order
                        );

                        setPendingOrders(updatedOrders);
                        localStorage.setItem("pendingOrder", JSON.stringify(updatedOrders));
                    }
                })


        }



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

                {userRol === 'Depósito' ?
                    <Dropdown className='navBar_container_item mt-3'>

                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            className={`d-flex algin-items-center 
                            ${orderStatus === 'Entregado'
                                    ? 'bg-secondary'
                                    : orderStatus === 'Preparado'
                                        ? 'bg-success'
                                        : 'bg-info'}
                                `}
                        >
                            {orderStatus}

                            <span className="material-symbols-outlined mt-1 ps-1">
                                stat_minus_1
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='mt-5 rounded'>

                            <Dropdown.Item
                                className='dropdown-menu-txt pt-2'
                                onClick={() =>
                                    handleChangeOrderStatus("En Preparación")
                                }
                            >
                                En Preparación
                            </Dropdown.Item>

                            <Dropdown.Item
                                className='dropdown-menu-txt pt-2'
                                onClick={() =>
                                    handleChangeOrderStatus("Preparado")
                                }
                            >
                                Preparado
                            </Dropdown.Item>

                            <Dropdown.Item
                                className='dropdown-menu-txt pt-2'
                                onClick={() =>
                                    handleChangeOrderStatus("Entregado")
                                }
                            >
                                Entregado
                            </Dropdown.Item>

                        </Dropdown.Menu>

                    </Dropdown>
                    :
                    <span className={`${orderStatus === 'Entregado'
                        ? 'bg-secondary'
                        : orderStatus === 'Preparado'
                            ? 'bg-success'
                            : 'bg-info'
                        } text-white rounded py-2 text-center lh-1 flex-fill`}>
                        {orderStatus}
                    </span>
                }
            </section>

            <OrderDetailInfoCard
                orderArray={selectOrder?.orderArray || []}
                getPendingOrders={pendingOrders}
                selectOrder={selectOrder}
                setPendingOrders={setPendingOrders}
            />

        </div>
    )
}

export default OrderDetailInfo