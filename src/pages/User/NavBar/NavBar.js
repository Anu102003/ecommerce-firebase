import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Action';
import { useLocation, useNavigate } from 'react-router-dom';
import { basic } from '../../../images';
import "./_navBar.scss";
import { NavbarIcons } from '../../../assets/components/NavbarIcons/NavbarIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../../i18n';

export const NavBar = ({ setProfilePopup, navPopup, setNavPopup, navMenuSelected, setNavMenuSelected }) => {
    const Home = "Home";
    const Men = "Men";
    const Women = "Women";
    const Electronics = "Electronics";
    const Mobile = "Mobile";

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin");
    };

    const pathname = location.pathname;

    const handleRedirect = (menu) => {
        navigate(`/${menu.toLowerCase()}`);
    };

    useEffect(() => {
        if (pathname === '/') setNavMenuSelected(Home);
        if (pathname === '/home') setNavMenuSelected(Home);
        if (pathname === '/men') setNavMenuSelected(Men);
        if (pathname === '/women') setNavMenuSelected(Women);
        if (pathname === '/electronics') setNavMenuSelected(Electronics);
        if (pathname === '/mobile') setNavMenuSelected(Mobile);
    }, [pathname, setNavMenuSelected]);
    const handleError = (e) => {
        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg";
    };

    return (
        <div className='navbar'>
            <div className='navbar__logo' onClick={() => { handleRedirect(Home) }}>
                <img src={basic.logo} alt="Logo" />
            </div>

            <div className='navbar__contents'>
                {/* <div className='search'>
                    <input type='text' placeholder='Search' />
                    <div className='search-icon'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
                    </div>
                </div> */}

                <div className='more-icon-wrapper' onClick={() => { setNavPopup(!navPopup) }}>
                    <FontAwesomeIcon className='more-icon' size='xl' icon={faBars} />
                </div>

                <div className='menu-icons-container'>
                    <div className='menu'>
                        <div className='content' onClick={() => { handleRedirect(Home) }}>Home
                            <div className={navMenuSelected === Home ? 'nav-menu-hr' : ''}></div>
                        </div>
                        <div className='content' onClick={() => { handleRedirect(Men) }}>Mens
                            <div className={navMenuSelected === Men ? 'nav-menu-hr' : ''}></div>
                        </div>
                        <div className='content' onClick={() => { handleRedirect(Women) }}>Womens
                            <div className={navMenuSelected === Women ? 'nav-menu-hr' : ''}></div>
                        </div>
                        <div className='content' onClick={() => { handleRedirect(Electronics) }}>Electronics
                            <div className={navMenuSelected === Electronics ? 'nav-menu-hr' : ''}></div>
                        </div>
                        <div className='content' onClick={() => { handleRedirect(Mobile) }}>Mobiles
                            <div className={navMenuSelected === Mobile ? 'nav-menu-hr' : ''}></div>
                        </div>
                    </div>
                    <NavbarIcons setProfilePopup={setProfilePopup} />
                </div>
                
                <div className='profile-img' onClick={()=>setProfilePopup(true)}>
                    <img src={email.profileImg} alt='profile' height={50} width={50}
                    onError={handleError}/>
                </div>
            </div>

            <div className="navbar__logout-btn" onClick={handleLogout}>
                <div className='logout-icon'>
                    <FontAwesomeIcon icon={faRightFromBracket} color='white' />
                </div>
                <button>Logout</button>
            </div>
        </div>
    );
};
