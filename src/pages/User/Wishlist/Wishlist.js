import React, { useEffect, useState } from 'react';
import './wishlist.scss';
import Card from '../../../assets/components/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faClose, } from '@fortawesome/free-solid-svg-icons';

export const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const wishlistString = window.localStorage.getItem('wishlist');
        if (wishlistString) {
            try {
                const parsedWishlist = JSON.parse(wishlistString);
                setWishlist(parsedWishlist);
            } catch (error) {
                console.error('Error parsing wishlist from localStorage', error);
            }
        }
    }, []);

    const handleRemoveFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter(item => item.id !== id);
        setWishlist(updatedWishlist);
        window.localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <div className={`wishlist-container ${wishlist.length > 0 && "wishlist-layout"}`}>
            {wishlist && wishlist.map((data, index) => (
                <div key={index} className="wishlist-item">
                    <Card key={data.ASIN} product={data} wishlistCard={true} />
                    <button onClick={() => handleRemoveFromWishlist(data.id)} className='remove-btn'>
                        <FontAwesomeIcon icon={faClose} className='close-icon'></FontAwesomeIcon>Remove</button>
                </div>
            ))}
            {wishlist.length === 0 &&
                <div className='no-cart-contents'>
                    <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#a30b00", }} size="4x" />
                    <h2>No items added to Wishlist</h2>
                </div>}
        </div>
    );
};
