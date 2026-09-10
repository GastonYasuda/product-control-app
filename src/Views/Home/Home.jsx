import React, { useContext, useEffect } from 'react'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';
import ProductsCards from '../../Components/ProductsCards/ProductsCards';
import InfoCards from '../../Components/InfoCards/InfoCards';




const Home = () => {


    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <InfoCards />



            <ProductsCards />

            <NavBar />
        </div>
    )
}

export default Home
