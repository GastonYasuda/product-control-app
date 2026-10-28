import { useParams } from 'react-router-dom'
import SendPendingProducts from '../SendPendingProducts/SendPendingProducts'

const Greeting = ({ userName, userRol }) => {

    const { idPending } = useParams()

    return (
        <div className='mb-2 ps-3 text-start'>
            <h5>Hola {userName} 👋</h5>
            <p>{userRol}</p>

            {idPending === 'pending' && <SendPendingProducts />
            }
        </div>
    )
}

export default Greeting
