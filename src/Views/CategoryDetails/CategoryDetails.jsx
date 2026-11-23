import { useParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'
import { useContext, useEffect, useState } from 'react'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile'

const CategoryDetails = () => {
    const { loginUser, orderByName } = useContext(ProductApi)

    const { idCategory } = useParams()
    const [detailElement, setDetailElement] = useState([])
    const [allPendings, setAllPendings] = useState();

    useEffect(() => {
        getProductsByItem(idCategory)

    }, [idCategory])

    const getUserPending = async () => {
        try {
            const response = await fetch(`https://product-control-back.onrender.com/users/${loginUser.user_id}/pending`)
            if (response.ok) {
                const data = await response.json()
                console.log('lo q tengo ahora', data);
                setAllPendings(data)

            } else {
                throw new Error("Error al intentar obtener usuario");

            }
        }
        catch (error) {
            console.error(error)
        }
    }



    const getProductsByItem = async (itemId) => {

        try {
            const response = await fetch(`https://product-control-back.onrender.com/category/${itemId}`)
            if (response.ok) {
                const data = await response.json()
                console.log('prod de la cat', data);
                setDetailElement(orderByName(data))
                // mergeProdFunc(data)
                getUserPending()
            } else {
                throw new Error("Error al intentar obtener productos");

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

            <h4 className='mt-5 text-start ps-3'> {idCategory}</h4>

            <DetailElementComponent
                from={'category'}
                detailElementName={idCategory}
                allPendings={allPendings}
                setAllPendings={setAllPendings}
                detailElement={detailElement} />

            <NavBarMobile />

        </div >
    )
}

export default CategoryDetails
