import { useParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'
import { useEffect } from 'react'

const CategoryDetails = () => {
    const { idCategory } = useParams()

    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <h1 className='mt-5'> {idCategory}</h1>

            <DetailElementComponent detailElementName={idCategory} from={'category'} />

            <NavBar />

        </div >
    )
}

export default CategoryDetails
