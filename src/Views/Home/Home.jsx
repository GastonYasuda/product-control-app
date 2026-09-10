import React, { useContext, useEffect, useState } from 'react'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';
import ProductsCards from '../../Components/ProductsCards/ProductsCards';
import Greeting from '../../Components/Greeting/Greeting';
import Category from '../Category/Category';
import Suppier from '../Suppier/Suppier';
import Order from '../Order/Order';
import Login from '../Login/Login';
import NavBarDesktop from '../../Components/NavBarDesktop/NavBarDesktop';
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';
import MainInfo from '../../Components/MainInfo/MainInfo';




const Home = () => {

    const [navBarSelect, setNavBarSelect] = useState('home')


    return (
        <div className='mt-5'>
            <Greeting userName={'Gaston'} userRol={'Salon'} />

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>



            {navBarSelect === 'home' && <MainInfo />}
            {navBarSelect === 'products' && <ProductsCards />}
            {navBarSelect === 'category' && <Category />}
            {navBarSelect === 'supplier' && <Suppier />}
            {navBarSelect === 'order' && <Order />}

            <div className="d-none d-lg-block">
                <NavBarDesktop />
            </div>

            <div className="d-block d-lg-none">
                <NavBarMobile setNavBarSelect={setNavBarSelect} />
            </div>

        </div>
    )
}

export default Home
