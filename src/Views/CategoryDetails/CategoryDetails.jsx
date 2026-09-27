import { useParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'
import { useContext, useEffect } from 'react'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'

const CategoryDetails = () => {
    const { loginUser } = useContext(ProductApi)

    const { idCategory } = useParams()


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

            <h4 className='mt-5 text-start ps-3'> {idCategory}</h4>

            <DetailElementComponent detailElementName={idCategory} from={'category'} />

            <NavBar />

        </div >
    )
}

export default CategoryDetails
