import React, { useEffect, useState } from 'react'
import "./cart.scss"
import { NavBar } from '../NavBar/NavBar'
import { CartItem } from '../../../assets/components/Quantity/CartItem';
import { SizeChart } from '../../../assets/components/Popup/SizeChart/SizeChart';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartBuyPopup } from '../../../assets/components/Popup/CartBuyPopup/CartBuyPopup';
export const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [incrementClick, setIncrementClick] = useState(false);
    const [decrementClick, setDecrementClick] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [buyEnabled, setBuyEnabled] = useState(false)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCartData = () => {
            setLoading(true);
            const cartDataFromStorage = JSON.parse(window.localStorage.getItem('cart'));
            setCartData(cartDataFromStorage || []);
            setTimeout(() => {
                setLoading(false); 
              }, 3000);
        };
        fetchCartData();
    }, [deleteClick]);
    useEffect(() => {
        const fetchCartData = () => {
            const totalFromStorage = JSON.parse(window.localStorage.getItem('total'));
            setTotal(totalFromStorage || []);
        };
        fetchCartData();
    }, [incrementClick, decrementClick, deleteClick, cartData]);
    useEffect(() => {
        const sum = total.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
        setTotalPrice(sum);
    }, [incrementClick, decrementClick, total, deleteClick]);
    useEffect(() => {
        const updatedCombinedData = cartData.map(cartItem => {
            const totalItem = total.find(totalItem => totalItem?.id === cartItem?.id);
            return {
                ...cartItem,
                ...totalItem
            };
        });
        setCombinedData(updatedCombinedData);
    }, [cartData, total]);
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "buy-popup-parent") {
                setBuyEnabled(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    if (loading) {
        return <div className='order-table'>
            <img src="https://www.syncfusion.com/blogs/wp-content/uploads/2022/06/Cupertino-Material-Animation.gif" height={500} />
        </div>
    }
    return (
        <div className='cart-page'>
            {
                cartData !== null && cartData.length > 0 ?
                    <>
                        <div className='cart-contents'>
                            {
                                cartData?.map((data, index) =>
                                (
                                    <CartItem key={index} data={data} setDeleteClick={setDeleteClick} deleteClick={deleteClick} setDecrementClick={setDecrementClick} decrementClick={decrementClick} incrementClick={incrementClick} setIncrementClick={setIncrementClick} />
                                )
                                )
                            }
                            {
                                cartData.length > 0 &&
                                <div className='buy-container'>
                                    <h3>Total Price :{totalPrice} </h3>
                                    <button className='buy-btn' onClick={() => setBuyEnabled(true)}>Buy Now</button>
                                </div>
                            }
                        </div>
                        {
                            buyEnabled &&
                            <div className='buy-popup-parent'>
                                <CartBuyPopup data={combinedData} setChart={setBuyEnabled} totalPrice={totalPrice} />
                            </div>
                        }
                    </> :

                    <div className='no-cart-contents'>
                        <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#a30b00", }} size="4x" />
                        <h2>No items added to cart</h2>
                    </div>
            }
        </div>
    )
}
