import React, { useContext } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import MainCard from '../../Components/MainCard/MainCard'
import Greeting from '../../Components/Greeting/Greeting'
import { ProductApi } from '../../Context/ProductControlApi'


const Category = () => {

    const { loginUser } = useContext(ProductApi)



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




            <h4 className='mt-5 text-start ps-3'>Categorias</h4>

            <MainCard cardName={"category"} />

            <NavBar />
        </div>
    )
}

export default Category
