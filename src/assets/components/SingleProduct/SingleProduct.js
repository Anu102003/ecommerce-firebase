import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./singleProduct.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faRulerHorizontal, faStar } from '@fortawesome/free-solid-svg-icons';
import { SizeChart } from '../Popup/SizeChart/SizeChart';
export const SingleProduct = () => {
    const location = useLocation();
    const product = location?.state?.details
    console.log(product)
    const [imgSelect, setImgSelect] = useState(product.thumbnail)
    const [ratings, setRatings] = useState([]);
    useEffect(() => {
        const newRatings = [];
        product.review.forEach((e) => {
            for (let i = 0; i < 5; i++) {
                if (i < e.ratingCount) {
                    newRatings.push(<p>
                        <FontAwesomeIcon icon={faStar} color="#FFA41C" />
                    </p>);
                } else {
                    newRatings.push(<p>
                        <FontAwesomeIcon icon={faStarRegular} color="#FFA41C" />
                    </p>);
                }
            }
        });
        setRatings(newRatings);
    }, [product.review]);
    const [openSizeChart, setOpenSizeChart] = useState(false);
    const sizeChart = () => {
        setOpenSizeChart(true)
    }
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "size-popup-parent") {
                setOpenSizeChart(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    const about = product.description.split('\\n')
    console.log(about)
    const abou = product.description.split('\n').join('');
// console.log(abou);
    return (
        <>
            <div className='single-product'>
                <div className='d-1'>
                    <div className='d-11'>
                        <div className='image-lists'>
                            <section className='scrollmenu'>
                                <div className={`product-img ${imgSelect === product.thumbnail && "active"}`}
                                    onClick={() => { setImgSelect(product.thumbnail) }}>
                                    <img src={product.thumbnail} />
                                </div>
                                {product.images.map((img) => (
                                    <div className={`product-img ${imgSelect === img.url && "active"}`}
                                        onClick={() => { setImgSelect(img.url) }}>
                                        <img src={img.url} />
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                    <div className='d-12'>
                        <div className='p-img'>
                            <img src={imgSelect} />
                        </div>
                    </div>
                </div>
                <div className='d-2'>
                    <div className='btn'>
                        <button className='cart-btn'>Add to cart</button>
                        <button className='buy-btn'>Buy Now</button>
                    </div>
                    <div className='details'>
                        <p className='brand'>Brand: {product.brand}</p>
                        <p className='title'>{product.title}</p>
                        <hr></hr>
                        {
                            product.review.length > 0 &&
                            <div className="ratings">
                                <p className="ratings__count">
                                    {ratings.map((rating, index) => (
                                        <p key={index}>{rating} </p>
                                    ))}
                                </p>
                                <p className="ratings__length">{product.review.length} Reviews</p>
                            </div>
                        }
                        <p className='discount-price'>
                            <span className='discount'>{product.price.discount}%</span>
                            <span className="rupee"></span> {product.overallPrice}
                        </p>
                        <p className='normalPrice'>M.P.R :<span className='strike'>{product.price.normalPrice}</span></p>
                        <p className='colour'>Color :
                            <span className='colour-box' style={{ backgroundColor: product.colour }}></span>
                            {product.colour}</p>
                        <p className='size'>Size : <span className='size-box'>{product.size}</span></p>
                        <p className='size-chart' onClick={sizeChart}>Size Chart
                            <FontAwesomeIcon icon={faRulerHorizontal} size="2xl" style={{ color: "#0c3c9b", paddingLeft: "15px" }} /></p>
                        <hr></hr>
                        <p className='title'>Product details</p>
                        <div className='details-wrapper'>
                            <div className="short-details">
                                <p className="short-details__head">Material Composition</p>
                                <p className="short-details__value">{product.material}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Pattern</p>
                                <p className="short-details__value">{product.pattern}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Fit Type</p>
                                <p className="short-details__value">{product.fitType}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Sleeve Type</p>
                                <p className="short-details__value">{product.sleeveType}</p>
                            </div>
                            {
                                product?.collarType &&
                                <div className="short-details">
                                    <p className="short-details__head">Collar Type</p>
                                    <p className="short-details__value">{product.collarType}</p>
                                </div>
                            }
                            <div className="short-details">
                                <p className="short-details__head">Length</p>
                                <p className="short-details__value">{product.length}</p>
                            </div>
                            <div className="short-details">
                                <p className="short-details__head">Country</p>
                                <p className="short-details__value">{product.country}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <p className='title'>About this item</p>
                        {about.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}

                    </div>
                </div>
                {
                    openSizeChart &&
                    <div className='size-popup-parent'>
                        <SizeChart setOpenSizeChart={setOpenSizeChart} />
                    </div>
                }
            </div>
        </>
    );
};


