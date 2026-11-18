import React, { useContext, useEffect, useState } from 'react'
import OrderDetailInfoCard from '../OrderDetailInfoCard/OrderDetailInfoCard';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { ProductApi } from '../../Context/ProductControlApi';
import { DataProductApi } from '../../Context/DataBaseProductApi';



const statusClass = (name) =>
    name === 'Entregado' ? 'bg-secondary'
        : name === 'Preparado' ? 'bg-success'
            : 'bg-info';

const OrderDetailInfo = ({ idOrderDetail }) => {
    const { loginUser, formatDate, statuses } = useContext(ProductApi);
    const { getAllProducts, getAllProductsFromDB } = useContext(DataProductApi)
    const userRol = loginUser.user_rol;

    const [orderUser, setOrderUser] = useState(null);
    const [allChecked, setAllChecked] = useState(false)




    useEffect(() => {
        if (idOrderDetail) getOneOrder(idOrderDetail);
    }, [idOrderDetail]);

    useEffect(() => {
        if (allChecked && orderUser?.status_name === 'En Preparación') {
            handleChangeOrderStatus({ status_id: 2, status_name: 'Preparado' });
        }
    }, [allChecked]);


    const updateProductStock = async () => {
        // 1. Traer el stock REAL de la base, no el del context
        const res = await fetch('http://localhost:3000/products');
        if (!res.ok) throw new Error('No se pudo leer el stock actual');
        const currentProducts = await res.json();

        const stockArray = orderUser.ordered_products.map(opa => {
            const product = currentProducts.find(
                p => Number(p.product_id) === Number(opa.product_id)
            );
            if (!product) throw new Error(`Producto ${opa.product_id} no encontrado`);

            const nuevoStock = product.product_stock - Number(opa.ordered_quantity);
            if (nuevoStock < 0) throw new Error(`Stock insuficiente para ${product.product_name}`);

            return { product_id: Number(opa.product_id), product_stock: nuevoStock };
        });

        // 2. Esperar a que TODOS los PATCH terminen
        await Promise.all(stockArray.map(patchNewStock));

        // 3. Recién ahora refrescar el context
        await getAllProductsFromDB();
    };


    const patchNewStock = async ({ product_id, product_stock }) => {
        const response = await fetch(`http://localhost:3000/products/${product_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_stock }),
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || `HTTP ${response.status}`);
        }
    };

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
        if (status.status_name === currentStatus) return;

        const products = orderUser.ordered_products || [];
        const allCheck = products.every(p => p.product_checked);

        const result = await Swal.fire({
            title: allCheck ? "¿Desea cambiar el estado de la orden?" : "Productos sin tildar",
            text: allCheck
                ? `"${currentStatus}" a "${status.status_name}"`
                : "¿Desea cambiar el estado igual?",
            icon: allCheck ? "question" : "warning",
            showCancelButton: true,
            confirmButtonColor: "#17a2b8",
            cancelButtonColor: "#868e96",
            confirmButtonText: allCheck ? "Cambiar" : "Aceptar",
        }).then((result) => {
            if (result.isConfirmed) Swal.fire("Estado actualizado con éxito!", "", "success");
        });

        if (!result.isConfirmed) return;// cancelar = no hace nada

        try {
            // descontar stock SOLO en la transición a Preparado
            if (status.status_name === 'Preparado' && currentStatus === 'En Preparación') {
                await updateProductStock();
            }
            await updateStatus(status);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", error.message, "error");
        }
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
                setAllChecked={setAllChecked}
            />

        </div>
    );
};

export default OrderDetailInfo;