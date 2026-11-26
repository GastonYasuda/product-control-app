import RecentOrderDetail from '../RecentOrderDetail/RecentOrderDetail';
import noProductImg from '../../assets/noProducts.png';
import './recentOrders.css'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import FilterComponent from '../FilterComponent/FilterComponent';

const RecentOrders = ({ preparedCount, deliveredCount, onProcessCount }) => {

    const [showFilter, setFilter] = useState('Todos')

    return (
        <div className='mt-3 recentOrdersStyle'>
            <section className='px-3 d-flex justify-content-between align-items-center'>
                <h4 className='mt-3 text-start'>Pedidos Recientes</h4>
                <FilterComponent setFilter={setFilter} showFilter={showFilter} />
            </section>

            {onProcessCount.length === 0 &&
                preparedCount.length === 0 &&
                deliveredCount.length === 0 ?
                <section>
                    <img src={noProductImg} className="pt-5 w-50 h-auto" alt="no products image" />
                    <h4 className='mt-3'>
                        No hay pedidos recientes.
                    </h4>
                </section>
                :
                <>
                    {(showFilter.status_name === "En Preparación" || showFilter === "Todos") && onProcessCount.map(((process, i) =>
                        <RecentOrderDetail orderData={process} key={i} />
                    ))}

                    {(showFilter.status_name === "Preparado" || showFilter === "Todos") && preparedCount.map(((processingOrder, i) =>
                        <RecentOrderDetail orderData={processingOrder} key={i} />

                    ))}

                    {(showFilter.status_name === "Entregado" || showFilter === "Todos") && deliveredCount.map(((deliveredOrder, i) =>
                        <RecentOrderDetail orderData={deliveredOrder} key={i} />
                    ))}
                </>
            }

        </div>
    )
}

export default RecentOrders
