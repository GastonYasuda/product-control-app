import { useContext, useEffect, useState } from 'react'
import './order.css'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'
import noProductImg from '../../assets/noProducts.png'
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile'
import { Spinner } from 'react-bootstrap'

const Order = () => {
    const { loginUser } = useContext(ProductApi)
    // const pendingProducts = loginUser?.userPendingProd ?? []

    // const [detailElement, setDetailElement] = useState([])
    const [allPendings, setAllPendings] = useState([]);
    const count = allPendings.length

    useEffect(() => {
        getUserPending()
    }, [allPendings])

    //tengo que actualizar userPass con pending_orders vacio

    const getUserPending = async () => {
        try {
            const response = await fetch(`https://product-control-back.onrender.com/users/${loginUser.user_id}/pending`)
            if (response.ok) {
                const data = await response.json()
                //  console.log('lo q tengo ahora', data);
                setAllPendings(data)

            } else {
                throw new Error("Error al intentar obtener usuario");

            }
        }
        catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='mt-5'>
            <section className='fixed-top headerComponent'>
                {loginUser &&
                    <Greeting userName={loginUser.user_name} userRol={loginUser.user_rol} />
                }
                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            {allPendings.length === 0 ?
                <Spinner animation="grow" variant="success" className='loadingSpinner' />
                :
                <>
                    {count > 0 ?
                        <>
                            <h4 className='mt-5 text-start ps-3'>
                                {count} {count === 1 ? 'Producto Pendiente' : 'Productos Pendientes'}
                            </h4>

                            <section className='orderMainComponent'>
                                <DetailElementComponent
                                    from={'pendingProductList'}
                                    allPendings={allPendings}
                                    setAllPendings={setAllPendings}
                                />
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
                </>
            }

            <NavBarMobile />
        </div>
    )
}

export default Order