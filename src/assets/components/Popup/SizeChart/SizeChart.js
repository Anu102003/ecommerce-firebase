// import React from 'react'
// import "./sizeChart.scss"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faClose } from '@fortawesome/free-solid-svg-icons'
// export const SizeChart = ({ setOpenSizeChart }) => {
//     return (
//         <div className='size-popup'>
//             <div className='close-icon' onClick={() => { setOpenSizeChart(false) }}>
//                 <FontAwesomeIcon icon={faClose} size='2xl' />
//             </div>
//             <p className='head'>Size Chart</p>
//             <div className='size-table'>
//                 <div className='row'>
//                     <div className='col c-head'>Brand Size</div>
//                     <div className='col c-head'>Standard Size</div>
//                     <div className='col c-head'>Chest (in)</div>
//                     <div className='col c-head'>Length (in)</div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>S</div>
//                     <div className='col'>S</div>
//                     <div className='col'>38.5</div>
//                     <div className='col'>27.5</div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>M</div>
//                     <div className='col'>M</div>
//                     <div className='col'>41</div>
//                     <div className='col'>28.5</div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>L</div>
//                     <div className='col'>L</div>
//                     <div className='col'>43.5</div>
//                     <div className='col'>28.5</div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>XL</div>
//                     <div className='col'>XL</div>
//                     <div className='col'>46</div>
//                     <div className='col'>30.5</div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>2XL</div>
//                     <div className='col'>2XL</div>
//                     <div className='col'>48.5</div>
//                     <div className='col'>31.5</div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>3XL</div>
//                     <div className='col'>3XL</div>
//                     <div className='col'>51</div>
//                     <div className='col'>32.2</div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>4XL</div>
//                     <div className='col'>4XL</div>
//                     <div className='col'>53.5</div>
//                     <div className='col'>33</div>
//                 </div>
//             </div>

//         </div>
//     )
// }

import React, { useEffect, useState } from 'react'
import "./sizeChart.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const SizeChart = ({ data, setChart, cart, totalPrice }) => {

    const [paymentPopup, setPaymentPopup] = useState(false)
    const [paymentId, setPaymentId] = useState("")
    const navigate = useNavigate()
    const { email } = useSelector(state => state.user);
    const [paymentStatus, setPaymentStatus] = useState(false)
    const handlePay = () => {
        setPaymentPopup(true)
        setPaymentStatus(true)
        setPaymentId("num")
        localStorage.removeItem('total');
        localStorage.removeItem('cart');
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
    // const orderDetails={
    //     userEmailId:email.email,
    //     orderProductEntityList:data,
    //     paymentId:paymentId,
    // }
    // console.log(totalPrice)

    // useEffect(() => {
    //     const handleSubmit = async () => {
    //         if (paymentId.length > 0) {
    //             try {
    //                 const result=await addOrderApi(orderDetails)
    //                 console.log(result)
    //                 localStorage.removeItem('total');
    //                 localStorage.removeItem('cart');

    //             } catch (error) {
    //                 console.error('Error adding order: ', error);
    //             }
    //         }
    //     }
    //     handleSubmit()
    // }, [paymentId])
    const handleOk = () => {
        setChart(false);
        setPaymentPopup(false);
        setPaymentId("")
        navigate("/home")
    }
    return (
        <div className='size-popup'>
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
                                            <button className="ok-btn" style={{background:"red"}} onClick={handleOk}>Cancel</button>
                                        </div>}
                                </>
                        }


                    </>
            }

        </div>
    )
}

