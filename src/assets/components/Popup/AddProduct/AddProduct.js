import React, { useEffect, useState } from 'react'
import "./_addProduct.scss"
import { db } from "../../../../Config/ConfigFirebase"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlusCircle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { InputAddProduct } from '../../Buttons/InputAddProduct/InputAddProduct';
import { isEditable } from '@testing-library/user-event/dist/utils';
export const AddProduct = ({ category, editId, setAddEnable, editEnable, productData, setEditEnable, setProductData }) => {
    const [formData, setFormData] = useState(initialState(category));

    function initialState(category) {
        const commonState = {
            productId: '',
            category: '',
            title: '',
            brand: '',
            modelName: '',
            description: '',
            price: {
                discount: 0,
                normalPrice: 0,
            },
            thumbnail: '',
            images: [{ url: '' }],
            review: [
                {
                    username: '',
                    ratingCount: 0,
                    title: '',
                    description: '',
                    date: ''
                }
            ],
            modelNo: '',
            colour: '',
            manufacturer: '',
            country: '',
            weight: '',
        };
        const clothingState = {
            size: '',
            pattern: '',
            material: '',
            fitType: '',
            sleeveType: '',
            collarStyle: '',
            length: '',
            packer: '',
            importer: '',
            itemDimensions: '',
            dateFirstAvailable: '',
            ASIN: '',
            style: '',
            closureType: '',
            occasionType: '',
            careInstruction: '',
        }

        switch (category) {

            case "Mobile":
                return {
                    ...commonState,
                    cameraFeature: '',
                    os: '',
                    ram: '',
                    dimension: '',
                    battery: '',
                    wirelessSpecification: '',
                    connectivity: '',
                    gps: '',
                    specialFeature: '',
                    displayFeature: '',
                    deviceInterface: '',
                    formFactor: '',
                    resolution: '',
                    batteryPower: 0,
                    whatsInBox: ''
                }
            case "Men":
                return {
                    ...commonState,
                    ...clothingState
                }
            case "Women":
                return {
                    ...commonState,
                    ...clothingState
                }
            case "Electronics":
                return {
                    ...commonState,
                    formFactor: '',
                    connectivity: '',
                    whatsInBox: '',
                    itemDimensions: '',
                    battery: '',
                    hardwarePlatform: '',
                    specialFeature: '',
                    mountingHardware: '',
                    batteryIncluded: '',
                    batteryRequired: '',
                    batteryCell: '',
                    material: '',
                    rechargeableBattery: '',
                    operatingDistance: '',
                    cabelFeature: '',
                    chargingTime: '',
                }
            default:
                return commonState;
        }
    }

    useEffect(() => {
        setFormData(initialState(category));
    }, [category])

    useEffect(() => {
        if (editEnable) {
            setFormData(productData)
        }
    }, [editEnable])

    const [categoryOpen, setCategoryOpen] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            price: { ...prevState.price, [name]: value }
        }));
    };

    const handleImageChange = (index, e) => {
        const { value } = e.target;
        const updateImage = [...formData.images]
        updateImage[index] = {
            url: value
        }
        setFormData({
            ...formData,
            images: updateImage
        })
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        setFormData(prevState => ({
            ...prevState,
            images: [...prevState.images, { url: '' }]
        }));
    };

    const validation = (formData?.productId !== '' &&
        formData?.category !== '' &&
        formData?.title !== '' &&
        formData?.price?.normalPrice !== 0 &&
        formData?.thumbnail !== '')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation) {
            try {
                const postsCollectionRef = collection(db, `${category.toLowerCase()}`);
                const docRef = editEnable ? doc(db, `${category.toLowerCase()}`, editId) : await addDoc(postsCollectionRef, formData);
                await setDoc(docRef, formData);
                if (editEnable) {
                    window.alert("Edited successfully")
                    setEditEnable(false)
                    setProductData([])
                } else {
                    window.alert("Added successfully")
                    setAddEnable(false)
                }
                setFormData(initialState(category));

            } catch (error) {
                console.error('Error adding document: ', error);
                alert('An error occurred while submitting the message.');
            }
        } else {
            alert('Fill form fields');
        }
    }
    const commonInput = [
        {
            type: "text",
            name: "productId",
            placeholder: "Product Id",
            value: formData.productId,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "title",
            placeholder: "Title",
            value: formData.title,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "brand",
            placeholder: "Brand",
            value: formData.brand,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "modelName",
            placeholder: "Model Name",
            value: formData.modelName,
            handleChange: handleChange
        },
        // {
        //     type: "text",
        //     name: "discount",
        //     placeholder: "Dicount Percentage",
        //     value: formData.price.discount,
        //     handleChange: handlePriceChange,
        // },
        // {
        //     type: "text",
        //     name: "normalPrice",
        //     placeholder: "Normal Price",
        //     value: formData.price.normalPrice,
        //     handleChange: handlePriceChange,
        // },
        {
            type: "text",
            name: "thumbnail",
            placeholder: "Thumbnail Image",
            value: formData.thumbnail,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "colour",
            placeholder: "Colour",
            value: formData.colour,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "weight",
            placeholder: "Item Weight",
            value: formData.weight,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "modelNo",
            placeholder: "Model Number",
            value: formData.modelNo,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "manufacturer",
            placeholder: "Manufacturer",
            value: formData.manufacturer,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "country",
            placeholder: "Country",
            value: formData.country,
            handleChange: handleChange
        },

    ]
    const mobileInput = [
        { type: "text", name: "cameraFeature", placeholder: "Other Camera Feature", value: formData.cameraFeature, handleChange: handleChange },
        { type: "text", name: "os", placeholder: "OS", value: formData.os, handleChange: handleChange },
        { type: "text", name: "ram", placeholder: "RAM", value: formData.ram, handleChange: handleChange },
        { type: "text", name: "dimension", placeholder: "Dimension", value: formData.dimension, handleChange: handleChange },
        { type: "text", name: "battery", placeholder: "Battery", value: formData.battery, handleChange: handleChange },
        { type: "text", name: "wirelesSpecification", placeholder: "Wireless Specification", value: formData.wirelesSpecification, handleChange: handleChange },
        { type: "text", name: "connectivity", placeholder: "Connectivity", value: formData.connectivity, handleChange: handleChange },
        { type: "text", name: "gps", placeholder: "GPS", value: formData.gps, handleChange: handleChange },
        { type: "text", name: "specialFeature", placeholder: "Special Feature", value: formData.specialFeature, handleChange: handleChange },
        { type: "text", name: "displayFeature", placeholder: "Display Feature", value: formData.displayFeature, handleChange: handleChange },
        { type: "text", name: "deviceInterface", placeholder: "Device Interface", value: formData.deviceInterface, handleChange: handleChange },
        { type: "text", name: "formFactor", placeholder: "Form Factor", value: formData.formFactor, handleChange: handleChange },
        { type: "text", name: "resolution", placeholder: "Resolution", value: formData.resolution, handleChange: handleChange },
        { type: "text", name: "batteryPower", placeholder: "Battery Power", value: formData.batteryPower, handleChange: handleChange },
    ]
    const menShirtInput = [
        { type: "text", name: "size", placeholder: "Size", value: formData.size, handleChange: handleChange, },
        { type: "text", name: "pattern", placeholder: "Pattern", value: formData.pattern, handleChange: handleChange, },
        { type: "text", name: "material", placeholder: "Material", value: formData.material, handleChange: handleChange, },
        { type: "text", name: "fitType", placeholder: "Fit Type", value: formData.fitType, handleChange: handleChange, },
        { type: "text", name: "sleeveType", placeholder: "Sleeve Type", value: formData.sleeveType, handleChange: handleChange, },
        { type: "text", name: "collarStyle", placeholder: "Collar Style", value: formData.collarStyle, handleChange: handleChange, },
        { type: "text", name: "length", placeholder: "Length", value: formData.length, handleChange: handleChange, },
        { type: "text", name: "packer", placeholder: "Packer", value: formData.packer, handleChange: handleChange, },
        { type: "text", name: "importer", placeholder: "Importer", value: formData.importer, handleChange: handleChange, },
        { type: "text", name: "itemDimensions", placeholder: "Item Dimensions", value: formData.itemDimensions, handleChange: handleChange, },
        { type: "text", name: "dateFirstAvailable", placeholder: "Date First Available", value: formData.dateFirstAvailable, handleChange: handleChange, },
        { type: "text", name: "ASIN", placeholder: "ASIN", value: formData.ASIN, handleChange: handleChange, },
    ]
    const menPantInput = [
        { type: "text", name: "size", placeholder: "Size", value: formData.size, handleChange: handleChange, },
        { type: "text", name: "material", placeholder: "Material", value: formData.material, handleChange: handleChange, },
        { type: "text", name: "fitType", placeholder: "Fit Type", value: formData.fitType, handleChange: handleChange, },
        { type: "text", name: "style", placeholder: "Style", value: formData.style, handleChange: handleChange, },
        { type: "text", name: "closureType", placeholder: "Closure Type", value: formData.closureType, handleChange: handleChange, },
        { type: "text", name: "occasionType", placeholder: "Occasion Type", value: formData.occasionType, handleChange: handleChange, },
        { type: "text", name: "careInstruction", placeholder: "Care instructions", value: formData.careInstruction, handleChange: handleChange, },
        { type: "text", name: "length", placeholder: "Length", value: formData.length, handleChange: handleChange, },
        { type: "text", name: "packer", placeholder: "Packer", value: formData.packer, handleChange: handleChange, },
        { type: "text", name: "importer", placeholder: "Importer", value: formData.importer, handleChange: handleChange, },
        { type: "text", name: "itemDimensions", placeholder: "Item Dimensions", value: formData.itemDimensions, handleChange: handleChange, },
        { type: "text", name: "dateFirstAvailable", placeholder: "Date First Available", value: formData.dateFirstAvailable, handleChange: handleChange, },
        { type: "text", name: "ASIN", placeholder: "ASIN", value: formData.ASIN, handleChange: handleChange, },
    ]
    const electronicHeadsetInput = [
        { type: "text", name: "formFactor", placeholder: "Form Factor", value: formData.formFactor, handleChange: handleChange, },
        { type: "text", name: "connectivity", placeholder: "Connectivity", value: formData.connectivity, handleChange: handleChange, },
        { type: "text", name: "itemDimensions", placeholder: "Item Dimensions", value: formData.itemDimensions, handleChange: handleChange, },
        { type: "text", name: "battery", placeholder: "Battery", value: formData.battery, handleChange: handleChange, },
        { type: "text", name: "hardwarePlatform", placeholder: "Hardware Platform", value: formData.hardwarePlatform, handleChange: handleChange, },
        { type: "text", name: "specialFeature", placeholder: "Special Feature", value: formData.specialFeature, handleChange: handleChange, },
        { type: "text", name: "mountingHardware", placeholder: "Mounting Hardware", value: formData.mountingHardware, handleChange: handleChange, },
        { type: "text", name: "batteryIncluded", placeholder: "Battery Included", value: formData.batteryIncluded, handleChange: handleChange, },
        { type: "text", name: "batteryRequired", placeholder: "Battery Required", value: formData.batteryRequired, handleChange: handleChange, },
        { type: "text", name: "batteryCell", placeholder: "Battery Cell", value: formData.batteryCell, handleChange: handleChange, },
        { type: "text", name: "material", placeholder: "Material", value: formData.material, handleChange: handleChange, },
        { type: "text", name: "rechargeableBattery", placeholder: "Rechargeable Battery", value: formData.rechargeableBattery, handleChange: handleChange, },
        { type: "text", name: "operatingDistance", placeholder: "Operating Distance", value: formData.operatingDistance, handleChange: handleChange, },
        { type: "text", name: "cabelFeature", placeholder: "Cabel Feature", value: formData.cabelFeature, handleChange: handleChange, },
        { type: "text", name: "chargingTime", placeholder: "Charging Time", value: formData.chargingTime, handleChange: handleChange, },
    ]

    return (
        <div className='add'>
            <p className='add__title'>{category}</p>
            <form className="form" >

                {
                    category !== "Mobile" ?
                        <div className='form__fields'>
                            <p>Category </p>:
                            <div className='category-container'>
                                <div className={`category ${formData.category !== "" && "category-active"}`} onClick={() => { setCategoryOpen(!categoryOpen) }}>
                                    {
                                        formData.category === "" ? "Select Category" :
                                            <>
                                                {
                                                    category === "Men" ?
                                                        formData.category === "Shirt" ? "Shirt" : "Pant" :
                                                        category === "Women" ?
                                                            formData.category === "Shirt" ? "Shirt" : formData.category === "Pant" ? "Pant" : "Kurthi" :
                                                            formData.category === "Headphone" && "Headphone"
                                                }
                                            </>
                                    }
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </div>
                            </div>
                            {
                                categoryOpen &&
                                <div className='category-options'>
                                    {
                                        (category === "Men" || category === "Women") &&
                                        <>
                                            <p className='options' onClick={() => { setFormData(prevState => ({ ...prevState, category: "Shirt" })); setCategoryOpen(!categoryOpen) }}>Shirt</p>
                                            <p className='options' onClick={() => { setFormData(prevState => ({ ...prevState, category: "Pant" })); setCategoryOpen(!categoryOpen) }}>Pant</p>
                                            {category === "Women" && <p className='options' onClick={() => { setFormData(prevState => ({ ...prevState, category: "Kurthi" })); setCategoryOpen(!categoryOpen) }}>Kurthi</p>}
                                        </>
                                    }
                                    {
                                        (category === "Electronics") &&
                                        <>
                                            <p className='options' onClick={() => { setFormData(prevState => ({ ...prevState, category: "Headphone" })); setCategoryOpen(!categoryOpen) }}>Headphone</p>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                        :
                        <InputAddProduct type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
                }


                <div className='form__fields'>
                    <p>Images </p>:
                    <div className='image-field-wrapper'>
                        {formData.images.map((image, index) => (
                            <div className='image-field' key={index}>
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image.url}
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                            </div>
                        ))}
                        <button className='add-icon' onClick={handleAddImage}>Add Image<FontAwesomeIcon icon={faPlusCircle} /></button>
                    </div>
                </div>

                <div className='form__fields'>
                    <p>Description </p>:
                    <textarea type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} ></textarea>
                </div>

                <InputAddProduct type="text" name="normalPrice" placeholder="Normal Price" value={formData.price.normalPrice} handleChange={handlePriceChange} />
                <InputAddProduct type="text" name="discount" placeholder="Discount" value={formData.price.discount} handleChange={handlePriceChange} />



                {
                    commonInput.map((input, index) => (
                        <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                    ))
                }


                {
                    category === "Mobile" && (
                        <>
                            <div className='form__fields'>
                                <p>What's in box </p>:
                                <textarea type="text" name="whatsInBox" placeholder="What 's In Box" value={formData.whatsInBox} onChange={handleChange} ></textarea>
                            </div>
                            {mobileInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            )
                            )}
                        </>
                    )
                }

                {
                    (category === "Electronics" && formData.category === "Headphone") && (
                        <>
                            {electronicHeadsetInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            ))}
                            <div className='form__fields'>
                                <p>What's in box </p>:
                                <textarea type="text" name="whatsInBox" placeholder="What 's In Box" value={formData.whatsInBox} onChange={handleChange} ></textarea>
                            </div>
                        </>
                    )
                }
                {
                    ((category === "Men" || category === "Women") && (formData.category === "Kurthi" || formData.category === "Shirt")) && (
                        <>
                            {menShirtInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            ))}
                        </>
                    )
                }

                {
                    ((category === "Men" || category === "Women") && formData.category === "Pant") && (
                        <>
                            {menPantInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            ))}
                        </>
                    )
                }

                <div className="submit-btn">
                    <button type="submit" className="submit-icon" onClick={handleSubmit}>Submit</button>
                </div>
            </form >
        </div >
    )
}












