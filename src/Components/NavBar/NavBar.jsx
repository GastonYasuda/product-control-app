import React from 'react'
import NavBarDesktop from '../NavBarDesktop/NavBarDesktop'
import NavBarMobile from '../NavBarMobile/NavBarMobile'


const NavBar = () => {
    return (
        <>
            <div className="d-none d-lg-block">
                <NavBarDesktop />
            </div>

            <div className="d-block d-lg-none">
                <NavBarMobile />
            </div>
        </>
    )
}

export default NavBar
