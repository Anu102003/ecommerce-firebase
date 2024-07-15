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
            <div className='signin__right'>
                <img src={"https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-1592.jpg?t=st=1720523486~exp=1720527086~hmac=4185a60fc0e4895e87a5ceefed625851ef590f311cd00ded88c09fb15a6a646e&w=740"}/>
            </div>
            <div className='signin__left'>
                <div className='signin-container'>
                    <div className='signin-logo'>
                        <img src={basic.logoWhite} />
                    </div>

                    <button className='signin-btn'
                        onClick={handelSignIn}>
                        <img src={basic.google} height={30} width={30} />
                        Sign In with Google
                    </button>
                </div>
            </div>

        </div>
    )
}

// import React, { useState } from 'react';
// import { auth, provider } from '../../Config/ConfigFirebase';
// import { useNavigate } from 'react-router-dom';
// import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, linkWithCredential, EmailAuthProvider , fetchSignInMethodsForEmail} from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { login, logout } from '../../Redux/Action';
// import "./_signIn.scss";
// import { basic } from '../../images';

// export const SignIn = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [error,setError]=useState("")

//     const handleSignInWithGoogle = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const user = result.user;
//                 console.log(user);
//                 dispatch(login({
//                     email: user.email,
//                     name: user.displayName,
//                     profileImg: user.photoURL,
//                     accessToken: user.accessToken,
//                     refreshToken: user.refreshToken,
//                 }));

//                 setTimeout(() => {
//                     dispatch(logout());
//                 }, 6 * 60 * 60 * 1000);

//                 navigate("/home");
//             })
//             .catch(error => console.error("Firebase Error signing in:", error));
//     };

//     const handleEmailPasswordSignIn = () => {
//         signInWithEmailAndPassword(auth, email, password)
//             .then((result) => {
//                 const user = result.user;
//                 dispatch(login({
//                     email: user.email,
//                     name: user.displayName,
//                     profileImg: user.photoURL,
//                     accessToken: user.accessToken,
//                     refreshToken: user.refreshToken,
//                 }));

//                 setTimeout(() => {
//                     dispatch(logout());
//                 }, 6 * 60 * 60 * 1000);

//                 navigate("/home");
//             })
//             .catch(error => {
//                 console.log(error)
//                 if (error.code === 'auth/invalid-email') {
//                     setError('Invalid email address.');
//                 }else if (error.code === 'auth/user-not-found') {
//                     setError('No user found with this email.');
//                 } else if (error.code === 'auth/wrong-password') {
//                     setError('Incorrect password.');
//                 } else if(error.code==='auth/missing-password'){
//                     setError('Incorrect Password')
//                 } else if(error.code==='auth/email-already-in-use'){
//                     setError('Email already registered')
//                 } else if(error.code==='auth/invalid-credential'){
//                     setError('Invalid Credential')
//                 }else {
//                     setError('Error signing in. Please try again.');
//                 }
//             });
//     };

//     const handleRegister = () => {
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((result) => {
//                 const user = result.user;
//                 console.log(user);
//                 dispatch(login({
//                     email: user.email,
//                     name: user.displayName,
//                     profileImg: user.photoURL,
//                     accessToken: user.accessToken,
//                     refreshToken: user.refreshToken,
//                 }));

//                 setTimeout(() => {
//                     dispatch(logout());
//                 }, 6 * 60 * 60 * 1000);

//                 navigate("/home");
//             })
//             .catch(error => {
//                 console.log(error)
//                 if (error.code === 'auth/invalid-email') {
//                     setError('Invalid email address.');
//                 } else if(error.code==='auth/email-already-in-use'){
//                     setError('Email already registered')
//                 }else if (error.code === 'auth/weak-password') {
//                     setError('Password should be at least 6 characters');
//                 } else if(error.code==='auth/missing-password'){
//                     setError('Incorrect Password')
//                 }else {
//                     setError('Error signing in. Please try again.');
//                 }
//             });
//     };

//     const handleLinkEmailPassword = () => {
//         if (auth.currentUser) {
//             const credential = EmailAuthProvider.credential(email, password);
//             linkWithCredential(auth.currentUser, credential)
//                 .then((usercred) => {
//                     const user = usercred.user;
//                     console.log('Account linking success', user);
//                     dispatch(login({
//                         email: user.email,
//                         name: user.displayName,
//                         profileImg: user.photoURL,
//                         accessToken: user.accessToken,
//                         refreshToken: user.refreshToken,
//                     }));
//                 })
//                 .catch(error => console.error('Error linking accounts', error));
//         }
//     };

//     return (
//         <div className='signin'>
//             <div className='signin__right'>
//                 <img src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-1592.jpg" />
//             </div>
//             <div className='signin__left'>
//                 <div className='signin-container'>
//                     <div className='signin-logo'>
//                         <img src={basic.logoWhite} />
//                     </div>
//                     <p className='h-1'>{isRegistering ? "Login" : "Register"}</p>

//                     <div className='email-psw-options'>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         /><br>
//                         </br>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         {error &&<p className='error'>{error}</p>}
//                         {isRegistering ? (
//                            <button className='login-btn' onClick={handleEmailPasswordSignIn}>
//                            Login
//                        </button> 
//                         ) : (
//                             <button className='login-btn' onClick={handleRegister}>
//                             Register
//                         </button>
//                         )}
//                         {isRegistering ?
//                             <p className='signin-options'>Don't have an account ?
//                                 <span onClick={() => setIsRegistering(!isRegistering)}> Signup</span></p>
//                             :
//                             <p className='signin-options'>Already have an account ?
//                                 <span onClick={() => setIsRegistering(!isRegistering)}> Signin</span></p>
//                         }
//                         { auth.currentUser && (
//                             <button className='signin-btn' onClick={handleLinkEmailPassword}>
//                                 Link Email/Password to Google Account
//                             </button>
//                         )}
//                         <p className='or-div'>------------OR-----------</p>
//                         <button className='signin-btn' onClick={handleSignInWithGoogle}>
//                             <img src={basic.google} height={50} width={50} />
//                         </button>
                        
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
