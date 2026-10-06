import { useContext } from 'react'
import './order.css'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'
import noProductImg from '../../assets/noProducts.png'

const Order = () => {
    const { loginUser } = useContext(ProductApi)
    const pendingProducts = loginUser?.userPendingProd ?? []
    const count = pendingProducts.length

    return (
        <div className='mt-5'>
            <section className='fixed-top headerComponent'>
                {loginUser &&
                    <Greeting userName={loginUser.name} userRol={loginUser.rol} />
                }
                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            {count > 0 ?
                <>
                    <h4 className='mt-5 text-start ps-3'>
                        {count} {count === 1 ? 'Producto Pendiente' : 'Productos Pendientes'}
                    </h4>
                    <section className='orderMainComponent'>
                        <DetailElementComponent from={'orderList'} />
                    </section>
                </>
                :
                <section className='pt-5'>
                    <img src={noProductImg} className="pt-5 w-50 h-auto" alt="no products image" />
                    <h4 className='mt-3'>
                        No hay productos pendientes
                    </h4>
                </section>
            }
            <NavBar />
        </div>
    )
}

export default Order