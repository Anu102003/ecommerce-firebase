import React, { useEffect, useState } from 'react'
import "./profilePopup.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faClose } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

export const ProfilePopup = ({ setProfilePopup }) => {
    const { email } = useSelector(state => state.user);
    const [details, setDetails] = useState()
    const profileImg = email.profileImg
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await profileApi(email.email)
                console.log(result)
                setDetails(result);
            } catch (error) {
                console.error("Error in fetching profile details:", error);
            }
        };
        fetchData();
    }, [email]);
    const handleError = (e) => {
        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg";
    };
    return (
        <div className='profile-popup'>
            <div className='close-icon' onClick={() => { console.log("ttt", false); setProfilePopup(false) }}>
                <FontAwesomeIcon icon={faClose} size='2xl' />
            </div>
            <div className='details-container'>
                <img src={profileImg} height={100} width={100} alt='profile'
                    onError={handleError} />
                <h2>
                    Profile</h2>
                <h3 className='details-head'>
                    <p>Name : </p><p className='details'>{email.name}</p></h3>
                <h3 className='details-head'><p>Email : </p><p className='details'>{email.email}</p></h3>
                {/* <h3 className='details-head'>Phone number : <span className='details'>{details?.userPhoneNumber}</span></h3>
                <h3 className='details-head'>Date Of Birth : <span className='details'>{details?.dateOfBirth.split("-").reverse().join("-")}</span></h3> */}
            </div>
        </div>
    )
}
