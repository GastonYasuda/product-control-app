import './orderDetailInfoCard.css'

const OrderDetailInfoCard = ({ orderArray, selectOrder, setOrderUser, userRol }) => {

    const handleCheckProduct = async (orderedProductId, checked) => {
        console.log("ordered_product_id:", orderedProductId, "order_id:", selectOrder.order_id);
        const previousOrder = selectOrder;

        // 1. actualizo la UI al instante
        const updatedProducts = orderArray.map((p) =>
            p.ordered_product_id === orderedProductId
                ? { ...p, product_checked: checked }
                : p
        );
        setOrderUser({ ...selectOrder, ordered_products: updatedProducts });

        // 2. guardo en el back solo el producto que cambió
        try {
            const response = await fetch(`http://localhost:3000/orders/${selectOrder.order_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderedProductsUpdated: [
                        { ordered_product_id: orderedProductId, product_checked: checked },
                    ],
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error);
            }
        } catch (error) {
            console.error(error);
            // 3. si falla, vuelvo al estado anterior
            setOrderUser(previousOrder);
        }
    };

    return (
        <>
            {orderArray.map((order) => (
                <div
                    key={order.ordered_product_id}
                    className='w-100 d-flex flex-row rounded bg-light mx-auto my-3 card align-items-center'
                    style={{ height: '96px' }}
                >
                    {userRol === 'deposito' && (
                        <div className="checkbox-wrapper-40 mx-2">
                            <input
                                type="checkbox"
                                checked={!!order.product_checked}
                                onChange={(e) => handleCheckProduct(order.ordered_product_id, e.target.checked)}
                            />
                            <span className="checkbox"></span>
                        </div>
                    )}

                    <img
                        src={order.product_img}
                        className='w-25 h-100 object-fit-contain rounded flex-1'
                        alt={`${order.product_name} img`}
                    />

                    <section className='pt-2 ps-4'>
                        <h6 className='mb-1'>{order.product_name}</h6>
                        <p className='mb-0'>Pedido: {order.ordered_quantity}</p>
                    </section>
                </div>
            ))}
        </>
    );
};

export default OrderDetailInfoCard;