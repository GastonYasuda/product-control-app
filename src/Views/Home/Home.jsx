import SearchBar from '../../Components/SearchBar/SearchBar';
import Greeting from '../../Components/Greeting/Greeting';
import NavBarDesktop from '../../Components/NavBarDesktop/NavBarDesktop';
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';
import MainInfo from '../../Components/MainInfo/MainInfo';
import { useContext, useEffect, useState } from 'react';
import { ProductApi } from '../../Context/ProductControlApi';

const Home = () => {

    const { loginUser, setLoginUser } = useContext(ProductApi)

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem("userPass")))

    }, [])



    return (
        <div className='mt-5'>
            {loginUser &&
                <Greeting userName={loginUser.name} userRol={loginUser.rol} />
            }

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            {loginUser.rol === 'salon' ? <MainInfo /> : <h1>tiene que ir a depo</h1>}



            <div className="d-none d-lg-block">
                <NavBarDesktop />
            </div>

            <div className="d-block d-lg-none">
                <NavBarMobile />
            </div>

        </div>
    )
}

export default Home
