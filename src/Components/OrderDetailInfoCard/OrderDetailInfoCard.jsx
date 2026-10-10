const OrderDetailInfoCard = ({ orderArray, getPendingOrders, selectOrder, setPendingOrders }) => {

    const handleCheckProduct = (id) => {
        const checkedProduct = orderArray.map(p =>
            p.id === id ? { ...p, checked: !p.checked } : p
        );

        const updatedPendingOrders = getPendingOrders.map(orden =>
            orden.orderId === selectOrder.orderId
                ? { ...orden, orderArray: checkedProduct }
                : orden
        );

        if (setPendingOrders) {
            setPendingOrders(updatedPendingOrders);
        }

        localStorage.setItem("pendingOrder", JSON.stringify(updatedPendingOrders));
    }


    return (
        <>
            {orderArray.map((order) => (
                <div key={order.id} className='w-100 d-flex flex-row rounded bg-light mx-auto my-3 card align-items-center' style={{ height: '96px' }}>
                    <input
                        type='checkbox'
                        // Aseguramos un valor booleano por si order.checked viene undefined/null
                        checked={order.checked ?? false}
                        onChange={() => handleCheckProduct(order.id)}
                    />

                    <img src={order.image} className='w-25 h-100 object-fit-contain rounded flex-1' alt={`${order.name} img`} />

                    <section className='pt-2 ps-4'>
                        <h6 className='mb-1'>{order.name}</h6>
                        <p className='mb-0'>Pedido: {order.count}</p>
                    </section>
                </div>
            ))}
        </>
    )
}

export default OrderDetailInfoCard;