import { useParams } from 'react-router-dom'
import SendPendingProducts from '../SendPendingProducts/SendPendingProducts'
import { useContext } from 'react'
import { ProductApi } from '../../Context/ProductControlApi'

const Greeting = ({ userName, userRol }) => {
    const { capital } = useContext(ProductApi)

    const { idPending } = useParams()

    return (
        <div className='mb-2 ps-3 text-start'>
            <h5>Hola {capital(userName)} 👋</h5>
            <p>{capital(userRol)}</p>

            {idPending === 'pending' && <SendPendingProducts />}
        </div>
    )
}

export default Greeting
