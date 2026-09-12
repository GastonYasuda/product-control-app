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

            {loginUser &&
                <Greeting userName={loginUser.name} userRol={loginUser.rol} />
            }

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <h1 className='mt-4 text-start ps-3'> {idCategory}</h1>

            <DetailElementComponent detailElementName={idCategory} from={'category'} />

            <NavBar />

        </div >
    )
}

export default CategoryDetails
