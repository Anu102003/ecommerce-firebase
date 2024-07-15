import React from 'react'
import "./sizeChart.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
export const SizeChart = ({ setOpenSizeChart }) => {
    return (
        <div className='size-popup'>
            <div className='close-icon' onClick={() => { setOpenSizeChart(false) }}>
                <FontAwesomeIcon icon={faClose} size='2xl' />
            </div>
            <p className='head'>Size Chart</p>
            <div className='size-table'>
                <div className='row'>
                    <div className='col c-head'>Brand Size</div>
                    <div className='col c-head'>Standard Size</div>
                    <div className='col c-head'>Chest (in)</div>
                    <div className='col c-head'>Length (in)</div>
                </div>
                <div className='row'>
                    <div className='col'>S</div>
                    <div className='col'>S</div>
                    <div className='col'>38.5</div>
                    <div className='col'>27.5</div>
                </div>
                <div className='row'>
                    <div className='col'>M</div>
                    <div className='col'>M</div>
                    <div className='col'>41</div>
                    <div className='col'>28.5</div>
                </div>
                <div className='row'>
                    <div className='col'>L</div>
                    <div className='col'>L</div>
                    <div className='col'>43.5</div>
                    <div className='col'>28.5</div>
                </div>
                <div className='row'>
                    <div className='col'>XL</div>
                    <div className='col'>XL</div>
                    <div className='col'>46</div>
                    <div className='col'>30.5</div>
                </div>
                <div className='row'>
                    <div className='col'>2XL</div>
                    <div className='col'>2XL</div>
                    <div className='col'>48.5</div>
                    <div className='col'>31.5</div>
                </div>
                <div className='row'>
                    <div className='col'>3XL</div>
                    <div className='col'>3XL</div>
                    <div className='col'>51</div>
                    <div className='col'>32.2</div>
                </div>
                <div className='row'>
                    <div className='col'>4XL</div>
                    <div className='col'>4XL</div>
                    <div className='col'>53.5</div>
                    <div className='col'>33</div>
                </div>
            </div>

        </div>
    )
}
