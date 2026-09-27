import { useParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'
import Greeting from '../../Components/Greeting/Greeting'
import { useContext } from 'react'
import { ProductApi } from '../../Context/ProductControlApi'


const SuppierDetail = () => {
    const { loginUser } = useContext(ProductApi)

    const { idSupplier } = useParams()

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

            <h4 className='mt-5 text-start ps-3'>{idSupplier}</h4>

            <DetailElementComponent detailElementName={idSupplier} from={'supplier'} />

            <NavBar />

        </div >
    )
}

export default SuppierDetail
