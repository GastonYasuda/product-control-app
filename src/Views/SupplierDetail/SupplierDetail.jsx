import { useParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import DetailElementComponent from '../../Components/DetailElementComponent/DetailElementComponent'
import Greeting from '../../Components/Greeting/Greeting'
import { useContext, useEffect, useState } from 'react'
import { ProductApi } from '../../Context/ProductControlApi'


const SuppierDetail = () => {
    const { loginUser } = useContext(ProductApi)

    const { idSupplier } = useParams()
    const [detailElement, setDetailElement] = useState([])
    const [allPendings, setAllPendings] = useState();

    useEffect(() => {
        getProductsByItem(idSupplier)
        getUserPending()

    }, [])


    const getUserPending = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${loginUser.id}/pending`)
            if (response.ok) {
                const data = await response.json()
                //   console.log('lo q tengo ahora', data);
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
            const response = await fetch(`http://localhost:3000/supplier/${itemId}`)
            if (response.ok) {
                const data = await response.json()
                console.log('prod de la supplier', data);
                setDetailElement(data)
                // mergeProdFunc(data)

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
                    <Greeting userName={loginUser.name} userRol={loginUser.rol} />
                }

                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            <h4 className='mt-5 text-start ps-3'>{idSupplier}</h4>

            <DetailElementComponent
                from={'supplier'}
                detailElementName={idSupplier}
                allPendings={allPendings}
                setAllPendings={setAllPendings}
                detailElement={detailElement} />

            <NavBar />

        </div >
    )
}

export default SuppierDetail
