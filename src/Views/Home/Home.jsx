import React, { useContext, useEffect } from 'react'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';
import ProductsCards from '../../Components/ProductsCards/ProductsCards';




const Home = () => {


    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <ProductsCards />

            <NavBar />
        </div>
    )
}

export default Home
