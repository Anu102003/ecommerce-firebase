import React, { useEffect, useState } from 'react'
import "./cartBuyPopup.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../Config/ConfigFirebase'

export const CartBuyPopup = ({ data, setChart, cart, totalPrice, buy }) => {
    if (data && buy) {
        data = [{
            ...data,
            value: Number(data.overallPrice),
            productCount: 1
        }];
    }
    const [paymentPopup, setPaymentPopup] = useState(false)
    const [paymentId, setPaymentId] = useState('')
    const navigate = useNavigate()
    const { email } = useSelector(state => state.user);
    console.log(buy)
    const [paymentStatus, setPaymentStatus] = useState(false)
    const handlePay = () => {
        // var options = {
        //     key: "rzp_test_7XD7UUKbea9zSO",
        //     key_secret: "YRPWiuBKgS3Fs8ge6ja7raL1",
        //     amount: totalPrice * 100,
        //     currency: "INR",
        //     name: "Food Order",
        //     description: "for testing",
        //     handler: function (response) {
        // setPaymentId(response.razorpay_payment_id)
        setPaymentId("123")
        setPaymentPopup(true)
        setPaymentStatus(true)
        //     },
        //     prefill: {
        //         name: email.name,
        //         email: email.email,
        //         contact: "1234567890"
        //     },
        //     notes: {
        //         address: "cbe"
        //     },
        //     theme: {
        //         color: "#3399cc"
        //     }
        // }
        // var pay = new window.Razorpay(options)
        // pay.open()
        if (!buy) {
            localStorage.removeItem('total');
            localStorage.removeItem('cart');
        }
    }
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "payment-popup-parent") {
                setChart(false)
                setPaymentPopup(false)
                setPaymentId("")
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])

    const orderDetails = {
        userEmailId: email.email,
        orderProductEntityList: data,
        paymentId: paymentId,
        shipping:false,
        ordered:false,
        delivered:false
    }
    useEffect(() => {
        
        const handleSubmit = async () => {
            if (paymentId.length > 0) {
                try {
                    const postsCollectionRef = collection(db, 'order');
                    const docRef = await addDoc(postsCollectionRef, orderDetails);
                    // console.log("Document added with ID: ", docRef.id);
                    // localStorage.removeItem('total');
                    // localStorage.removeItem('cart');
                } catch (error) {
                    console.error('Error adding order: ', error);
                }
            }
        };

        handleSubmit();
    }, [paymentId, orderDetails]);
    const handleOk = () => {
        setChart(false);
        setPaymentPopup(false);
        setPaymentId("")
        navigate("/men")
    }
    return (
        <div className='cart-buy-popup'>
            {
                cart ?
                    <div className='cart-popup'>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#0c9715", }} size='6x' />
                        <h3 className='head'>Added to Cart Successfully</h3>
                        <button className="ok-btn" onClick={() => { setChart(false) }}>Ok</button>
                    </div> :
                    <>
                        {
                            !paymentPopup ?
                                <div className='pay-popup'>
                                    <div className='close-icon' onClick={() => { setChart(false) }}>
                                        <FontAwesomeIcon icon={faClose} size='2xl' />
                                    </div>
                                    <h3 className='head'>Proceed to Pay : {totalPrice}</h3>
                                    <button className='pay-btn' onClick={handlePay}>Pay</button>
                                </div>
                                :
                                <>
                                    {(paymentPopup && paymentStatus) ?
                                        <div className='payment-popup'>
                                            <h3 className='head'>Payment Successful!</h3>
                                            <p>Your payment was successful. Thank you for your purchase!</p>
                                            <h4>{paymentId}</h4>
                                            <button className="ok-btn" onClick={handleOk}>Ok</button>
                                        </div> :
                                        <div className='payment-popup'>
                                            <h3 className='head'>Payment Failed!</h3>
                                            <p>Your payment was cancelled. Please, Try again</p>
                                            <button className="ok-btn" style={{ background: "red" }} onClick={handleOk}>Cancel</button>
                                        </div>}
                                </>
                        }


                    </>
            }

        </div>
    )
}


