import React, { useContext, useEffect, useState } from 'react'
import OrderDetailInfoCard from '../OrderDetailInfoCard/OrderDetailInfoCard';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { ProductApi } from '../../Context/ProductControlApi';


const statusClass = (name) =>
    name === 'Entregado' ? 'bg-secondary'
        : name === 'Preparado' ? 'bg-success'
            : 'bg-info';

const OrderDetailInfo = ({ idOrderDetail }) => {
    const { loginUser, formatDate } = useContext(ProductApi);
    const userRol = loginUser.user_rol;

    const [orderUser, setOrderUser] = useState(null);

    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const getStatuses = async () => {
            try {
                const response = await fetch("http://localhost:3000/status");
                if (!response.ok) throw new Error("Error al obtener estados");
                setStatuses(await response.json());
            } catch (error) {
                console.error(error);
            }
        };
        getStatuses();
    }, []);


    const getOneOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`);
            if (!response.ok) throw new Error(`Error al intentar obtener orden con id ${orderId}`);
            const data = await response.json();
            setOrderUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (idOrderDetail) getOneOrder(idOrderDetail);
    }, [idOrderDetail]);

    const updateStatus = async (status) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderUser.order_id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_status: status.status_id }),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error);
            }
            await getOneOrder(orderUser.order_id); // recargo con los datos reales
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo cambiar el estado", "error");
        }
    };

    const handleChangeOrderStatus = async (status) => {
        const currentStatus = orderUser.status_name;
        if (status.name === currentStatus) return;

        const products = orderUser.ordered_products || [];
        const allChecked = products.every((p) => p.product_checked);

        const result = await Swal.fire({
            title: allChecked ? "¿Desea cambiar el estado de la orden?" : "Productos sin tildar",
            text: allChecked
                ? `"${currentStatus}" a "${status.status_name}"`
                : "¿Desea cambiar el estado igual?",
            icon: allChecked ? "question" : "warning",
            showCancelButton: true,
            confirmButtonColor: "#17a2b8",
            cancelButtonColor: "#868e96",
            confirmButtonText: allChecked ? "Cambiar" : "Aceptar",
        });

        if (result.isConfirmed) updateStatus(status);
    };

    if (!orderUser) return <p className='mt-5 text-center'>Cargando...</p>;

    return (
        <div className='mt-5 mb-5 text-start px-3'>
            <section className='d-flex align-items-center mb-4'>
                <h6 className='flex-fill mb-0'>Pedido #{orderUser.order_id}</h6>
                <h6 className='flex-fill mb-0'>{formatDate(orderUser.order_date)}</h6>

                {userRol === 'deposito' ? (
                    <Dropdown className='navBar_container_item mt-3'>
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            className={`d-flex align-items-center ${statusClass(orderUser.status_name)}`}
                        >
                            {orderUser.status_name}
                            <span className="material-symbols-outlined mt-1 ps-1">stat_minus_1</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='mt-5 rounded'>
                            {statuses.map((s) => (
                                <Dropdown.Item
                                    key={s.status_id}
                                    className='dropdown-menu-txt pt-2'
                                    onClick={() => handleChangeOrderStatus(s)}
                                >
                                    {s.status_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <span className={`${statusClass(orderUser.status_name)} text-white rounded py-2 text-center lh-1 flex-fill`}>
                        {orderUser.status_name}
                    </span>
                )}
            </section>

            <OrderDetailInfoCard
                orderArray={orderUser.ordered_products || []}
                selectOrder={orderUser}
                setOrderUser={setOrderUser}
                userRol={userRol}
            />
        </div>
    );
};

export default OrderDetailInfo;