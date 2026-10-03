import RecentOrderDetail from '../RecentOrderDetail/RecentOrderDetail'

const RecentOrders = ({ preparedCount, deliveredCount, onProcessCount }) => {

    console.log(onProcessCount);
    console.log(preparedCount);



    return (
        <div className='mt-3'>
            <h4 className='mt-3 text-start ps-3'>Pedidos Recientes</h4>

            {onProcessCount.length !== 0 && onProcessCount.map(((process, i) =>
                <RecentOrderDetail orderData={process} key={i} />
            ))}

            {preparedCount.length !== 0 && preparedCount.map(((processingOrder, i) =>
                <RecentOrderDetail orderData={processingOrder} key={i} />

            ))}

            {deliveredCount.length !== 0 && deliveredCount.map((deliveredOrder, i) =>
                <RecentOrderDetail orderData={deliveredOrder} key={i} />
            )}


        </div>
    )
}

export default RecentOrders
