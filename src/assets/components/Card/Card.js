import { useEffect, useRef, useState } from "react";
import "./card.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faHeart as faHeartSoild } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

function Card({ product, wishlistCard }) {
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false)
  const [isContentOverflowed, setIsContentOverflowed] = useState(false);
  const contentContainerRef = useRef(null);
  const [fitHeight, setFitHeigth] = useState(0);
  const contentContainer = contentContainerRef.current;
  const [wishlist, setWishlist] = useState(false)

  useEffect(() => {
    if (showMore) {
      if (contentContainer.scrollHeight > 100) {
        setIsContentOverflowed(true);
      } else {
        setFitHeigth(contentContainer.scrollHeight + "px")
        setIsContentOverflowed(false);
      }
    }
  }, [showMore]);

  useEffect(() => {
    if (!showMore && contentContainer) {
      contentContainer.scrollTop = 0;
    }
  }, [showMore, contentContainer]);

  useEffect(() => {
    checkWishlist();
  }, []);

  const redirect = () => {
    navigate("/product", { state: { details: product } })
  }
  const handleIconHover = (isHovered) => {
    setWishlist(isHovered)
  };

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

  // console.log(product)
  return (
    <div className="product-card-wrapper">
      <section className="product-card">


        {/* image */}
        <div className="product-card__img">
          <img src={product.thumbnail} onClick={redirect} />
          {!wishlistCard &&
            <div className='wishlist'
              // onMouseEnter={() => handleIconHover(!wishlist)}
              // onMouseLeave={() => handleIconHover(!wishlist)}
              onClick={handleWishlist}
            >
              <FontAwesomeIcon icon={wishlist ? faHeartSoild : faHeart} color={"purple"} size="xl" />
            </div>
          }
        </div>

        {/* contents */}
        <div className="product-card__contents" onClick={redirect}>
          <div className="product">

            {/* brand */}
            <p className="product__brand">{product.brand}</p>

            {/* title */}
            <div ref={contentContainerRef}
              onClick={() => { setShowMore(!showMore) }}
              style={{
                overflowY: showMore ? 'auto' : 'hidden',
                minHeight: showMore ? isContentOverflowed ? '70px' : fitHeight : null,
              }}
              className={'reels-description'}

            >
              {(contentContainer?.scrollHeight > 20 && !showMore) &&
                <p className='more'>. . . </p>
              }
              <p className='description' style={{
                width: '15rem'
              }}>{product.title}</p>
            </div>

            {/* ratings */}
            {
              product.review.length > 0 &&
              <div className="ratings">
                <p className="ratings__count">
                  {ratings.map((rating, index) => (
                    <p key={index}>{rating}</p>
                  ))}
                </p>
                <p className="ratings__length">{product.review.length}</p>
              </div>
            }

            {/* price */}
            <div className="price">

              <p className="price__correct"><span className="rupee"></span> {product.overallPrice}</p>
              {
                product.price.discount > 0 &&
                <>
                  <p className="price__original" style={{ textDecoration: "line-through" }}>M.R.P: {product.price.normalPrice}</p>
                  <p className="price__discount" >({product.price.discount}% off)</p>
                </>
              }
            </div>

            {/* delivery */}
            {
              product.overallPrice > 500 ?
                <div className="product__delivery">
                  <span className="free-txt" style={{ color: "green" }}>FREE</span>
                  Delivery
                </div> :
                <div className="product__delivery">
                  <span className="free-txt" style={{ color: "red" }}>FREE</span>
                  Delivery over ₹499.
                </div>
            }
          </div>
        </div>
      </section>
    </div>
  )
}
export default Card;