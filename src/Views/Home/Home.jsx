import SearchBar from '../../Components/SearchBar/SearchBar';
import Greeting from '../../Components/Greeting/Greeting';
import NavBarDesktop from '../../Components/NavBarDesktop/NavBarDesktop';
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';
import MainInfo from '../../Components/MainInfo/MainInfo';

const Home = () => {

    return (
        <div className='mt-5'>
            <Greeting userName={'Gaston'} userRol={'Salon'} />

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            <MainInfo />



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
