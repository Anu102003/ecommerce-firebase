import React from 'react'
import { auth, provider } from '../../Config/ConfigFirebase'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../Redux/Action';
import "./_signIn.scss"
import { basic } from '../../images';
export const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //logining into firebase
    const handelSignIn = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                console.log(user)
                dispatch(login({
                    email: result.user.email,
                    name:user.displayName,
                    profileImg:user.photoURL,
                    accessToken:user.accessToken,
                    refreshToken:user.refreshToken,
                }));

                // calling refresh token at after 6 hrs and logging out
                setTimeout(() => {
                    dispatch(logout());
                }, 6 * 60 * 60 * 1000);

                navigate("/home");
            })
            .catch(error => console.error("Firebase Error signing in:", error));
    }

    return (
        <div className='signin'>
            <div className='signin__left'>
                <div className='signin-container'>
                    <div className='signin-logo'>
                        <img src={basic.logo} />
                    </div>

                    <button className='signin-btn'
                        onClick={handelSignIn}>
                        <img src={basic.google} height={30} width={30} />
                        Sign In with Google
                    </button>
                </div>
            </div>
            <div className='signin__right'>
                <img src={basic.signinShopping} />
            </div>
        </div>
    )
}

