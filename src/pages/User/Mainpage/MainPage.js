import React, { useEffect, useState } from 'react';
import "./_mainPage.scss"
import { NavbarPopup } from '../../../assets/components/NavbarPopup/NavbarPopup';
import { Outlet, useLocation } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar'
import Menu from '../../../Context/LocaleContext';
import { ProfilePopup } from '../../../assets/components/ProfilePopup/ProfilePopup';

export const MainPage = () => {
    const [navPopup, setNavPopup] = useState(false);
    const [navMenuSelected, setNavMenuSelected] = useState("Home");
    const [profilePopup, setProfilePopup] = useState(false);

    useEffect(() => {
        function handle(e) {
            if (e.target.className === "profile-popup-parent") {
                setProfilePopup(false);
            }
        }
        window.addEventListener("click", handle);
        return () => window.removeEventListener("click", handle);
    }, []);


    return (
        <>
            <div className='homepage'>
                <NavBar
                    setProfilePopup={setProfilePopup}
                    navPopup={navPopup}
                    setNavPopup={setNavPopup}
                    navMenuSelected={navMenuSelected}
                    setNavMenuSelected={setNavMenuSelected}
                />
                {
                    navPopup &&
                    <NavbarPopup setNavPopup={setNavPopup} type="User" setProfilePopup={setProfilePopup} />
                }
                <div className='outlet-container' style={{ marginTop: navPopup ? "50px" : "6rem" }}>
                    <Menu.Provider value={navMenuSelected}>
                        <Outlet />
                    </Menu.Provider>
                </div>
                {
                    profilePopup && <div className='profile-popup-parent'>
                        <ProfilePopup setProfilePopup={setProfilePopup}/>
                    </div>
                }
                <div className='footer'>
                    <p>© 2024 by Anu S.</p>
                </div>
            </div>
        </>
    );
};
