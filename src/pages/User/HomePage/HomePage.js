import React, { useEffect, useState } from 'react'
import { HomeImageSlider } from '../../../assets/components/HomeImageSlider/HomeImageSlider'
import { homeSlider } from '../../../Database/db';
import "./_homePage.scss";
import { Link } from 'react-router-dom';
// import { basic } from '../../../images';

export const HomePage = () => {
  return (
    <div className='home-img-slider'>
      <HomeImageSlider images={homeSlider} />
      <div className='vid-content'>
        {/* style={{ width: '100%', height: 'auto' }} */}
        <video autoPlay loop muted playsInline className='back-video' >
          <source src="clip.mp4"
            type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className='content'>
          <div>
            <h1>Easy Buy..</h1>
            <Link to="/electronics">Explore</Link>
          </div>
        </div>
      </div>

      <div className='fav-d'>
        <p className='h1'>Our favorites</p>

        {/* 1 para */}
        <div className='left-right-d'>
          <div></div>
            <div className='left-d d-1'>
              <p className='h-3'>Unleash Your Style</p>
              <p className='h-4'>Discover premium men's fashion that combines timeless elegance with modern sophistication. Elevate your wardrobe with our curated collection of must-have essentials.</p>
            <Link to="/men" className='btn'>Glance At</Link>
            </div>
          <div className='right-d'>
            <div className='img1'>
              <p className='h2'>Distinctly You</p>
            </div>
          </div>
          <div></div>
        </div>

        {/* 2para */}
        <div className='left-right-d'>
          <div></div>
          <div className='right-d'>
            <video autoPlay loop muted playsInline className='back-video' >
              <source src="womenshop.mp4"
                type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className='left-d d-2'>
            <p className='h-3'>Embrace Your Elegance</p>
            <p className='h-4'>Explore our exclusive collection of women's fashion that blends chic designs with unparalleled comfort. Elevate your style and radiate confidence with every outfit.</p>
            <Link to="/women" className='btn'>Glance At</Link>
          </div>
          <div></div>
        </div>

      </div>
    </div>
  )
}