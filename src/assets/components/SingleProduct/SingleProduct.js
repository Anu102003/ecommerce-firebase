import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./singleProduct.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import { SizeChart } from '../Popup/SizeChart/SizeChart';
import { CartBuyPopup } from '../Popup/CartBuyPopup/CartBuyPopup';
import { faHeart as faHeartSoild } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

export const SingleProduct = () => {
    const location = useLocation();
    const product = location?.state?.details
    const [buyEnabled, setBuyEnabled] = useState(false)
    const [cart, setCart] = useState(false)
    const [buy, setBuy] = useState(false)
    const [imgSelect, setImgSelect] = useState(product.thumbnail)
    const [ratings, setRatings] = useState([]);
    const [wishlist, setWishlist] = useState(false)


    useEffect(() => {
        function handle(e) {
            if (e.target.className === "buy-popup-parent") {
                setBuyEnabled(false)
                setBuy(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    const [openSizeChart, setOpenSizeChart] = useState(false);

    useEffect(() => {
        function handle(e) {
            if (e.target.className === "size-popup-parent") {
                setOpenSizeChart(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])

    const about = product?.description?.split('\\n')

    const handleCart = () => {
        let cart = JSON.parse(window.localStorage.getItem('cart')) || [];
        if (!Array.isArray(cart)) {
            cart = [];
        }
        cart = cart.filter((e) => e.id !== product.id);
        cart.push({ ...product, total: Number(product.overallPrice) });
        window.localStorage.setItem('cart', JSON.stringify(cart));
        setBuyEnabled(true)
        setCart(true)
    }
    const handleWishlist = () => {
        const wishlistString = window.localStorage.getItem('wishlist');
        let wishlist = [];

        if (wishlistString) {
            try {
                wishlist = JSON.parse(wishlistString);
                if (!Array.isArray(wishlist)) {
                    wishlist = [];
                }
            } catch (error) {
                wishlist = [];
            }
        }

        const isProductInWishlist = wishlist.some(item => item.id === product.id);

        if (isProductInWishlist) {
            wishlist = wishlist.filter(item => item.id !== product.id);
        } else {
            wishlist.push(product);
        }
        window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setWishlist(!isProductInWishlist);
    };

    const checkWishlist = () => {
        const wishlistString = window.localStorage.getItem('wishlist');
        let wishlistArray = [];

        if (wishlistString) {
            try {
                wishlistArray = JSON.parse(wishlistString);
                if (!Array.isArray(wishlistArray)) {
                    wishlistArray = [];
                }
            } catch (error) {
                wishlistArray = [];
            }
        }

        const isProductInWishlist = wishlistArray.some(item => item.id === product.id);
        setWishlist(isProductInWishlist);
    };
    useEffect(() => {
        checkWishlist();
    }, []);
    return (
        <>
            <div className='single-product'>
                <div className='d-1'>
                    <div className='d-11'>
                        <div className='image-lists'>
                            <section className='scrollmenu'>
                                <div className={`product-img ${imgSelect === product?.thumbnail && "active"}`}
                                    onClick={() => { setImgSelect(product?.thumbnail) }}>
                                    <img src={product?.thumbnail} />
                                </div>
                                {product?.images?.map((img) => (
                                    <div className={`product-img ${imgSelect === img?.url && "active"}`}
                                        onClick={() => { setImgSelect(img?.url) }}>
                                        <img src={img?.url} />
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                    <div className='d-12'>
                        <div className='p-img'>
                            <img src={imgSelect} />
                            <div className='wishlist'
                                // onMouseEnter={() => handleIconHover(!wishlist)}
                                // onMouseLeave={() => handleIconHover(!wishlist)}
                                onClick={handleWishlist}
                            >
                                <FontAwesomeIcon icon={wishlist ? faHeartSoild : faHeart} color={"purple"} size="xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-2'>
                    <div className='btn'>
                        <button className='cart-btn' onClick={handleCart}>Add to cart</button>
                        <button className='buy-btn' onClick={() => { setBuyEnabled(true); setBuy(true) }}>Buy Now</button>
                    </div>
                    <div className='details'>
                        <p className='brand'>Brand: {product?.brand}</p>
                        <p className='title'>{product?.title}</p>
                        <hr></hr>
                        {
                            product?.review?.length > 0 &&
                            <div className="ratings">
                                <p className="ratings__count">
                                    {ratings?.map((rating, index) => (
                                        <p key={index}>{rating} </p>
                                    ))}
                                </p>
                                <p className="ratings__length">{product?.review?.length} Reviews</p>
                            </div>
                        }
                        <p className='discount-price'>
                            <span className='discount'>{product?.price?.discount}%</span>
                            <span className="rupee"></span> {product?.overallPrice}
                        </p>
                        <p className='normalPrice'>M.P.R :<span className='strike'>{product?.price?.normalPrice}</span></p>
                        <p className='colour'>Color :
                            <span className='colour-box' style={{ backgroundColor: product?.colour }}></span>
                            {product?.colour}</p>
                        <p className='size'>Size : <span className='size-box'>{product?.size}</span></p>
                        <p className='size-chart' onClick={() => setOpenSizeChart(true)}>Size Chart
                            <FontAwesomeIcon icon={faRulerHorizontal} size="2xl" style={{ color: "#0c3c9b", paddingLeft: "15px" }} onClick={() => setOpenSizeChart(true)} /></p>
                        <hr></hr>
                        <p className='title'>Product details</p>
                        <div className='details-wrapper'>
                            <div className="short-details">
                                <p className="short-details__head">Material Composition</p>
                                <p className="short-details__value">{product?.material}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Pattern</p>
                                <p className="short-details__value">{product?.pattern}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Fit Type</p>
                                <p className="short-details__value">{product?.fitType}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Sleeve Type</p>
                                <p className="short-details__value">{product?.sleeveType}</p>
                            </div>
                            {
                                product?.collarType &&
                                <div className="short-details">
                                    <p className="short-details__head">Collar Type</p>
                                    <p className="short-details__value">{product?.collarType}</p>
                                </div>
                            }
                            <div className="short-details">
                                <p className="short-details__head">Length</p>
                                <p className="short-details__value">{product?.length}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Country</p>
                                <p className="short-details__value">{product?.country}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <p className='title'>About this item</p>
                        <div className='about-container'>
                            {about?.map((detail, index) => (
                                <li key={index} className='about-list'>{detail}</li>
                            ))}
                        </div>


                    </div>
                </div>
                {
                    openSizeChart &&
                    <div className='size-popup-parent'>
                        <SizeChart setOpenSizeChart={setOpenSizeChart} />
                    </div>
                }
                {
                    buyEnabled &&
                    <div className='buy-popup-parent'>
                        <CartBuyPopup data={product} setChart={setBuyEnabled} totalPrice={product?.overallPrice} cart={cart} buy={buy} />
                    </div>
                }
            </div>
        </>
    );
};


