import SearchBar from '../../Components/SearchBar/SearchBar';
import Greeting from '../../Components/Greeting/Greeting';
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';
import SalonMainInfo from '../../Components/SalonMainInfo/SalonMainInfo';
import { useContext, useEffect, useState } from 'react';
import { ProductApi } from '../../Context/ProductControlApi';
import DepoMainInfo from '../../Components/DepoMainInfo/DepoMainInfo';

const Home = () => {

    const { loginUser } = useContext(ProductApi)

    return (
        <div className='mt-5'>

            {loginUser !== null &&
                <>
                    <section className='fixed-top headerComponent'>
                        <Greeting userName={loginUser.user_name} userRol={loginUser.user_rol} />


                        <div className='d-block d-lg-none'>
                            <SearchBar />
                        </div>

                    </section>

                    {loginUser.user_rol === 'salon' ? <SalonMainInfo /> : <DepoMainInfo />}

                </>
            }

            <div className="d-block d-lg-none">
                <NavBarMobile />
            </div>

        </div>
    )
}

export default Home
