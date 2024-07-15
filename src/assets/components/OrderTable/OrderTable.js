import React, { useState } from 'react'
import "./orderTable.scss"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Config/ConfigFirebase';
export const OrderTable = ({ Customer, orderData, order, onDelete, user, setUpdateEnable, updateEnable }) => {
    const navigate = useNavigate()
    const sum = orderData?.map(data => (
        data?.orderProductEntityList?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.value;
        }, 0)
    ));

    const redirect = (product) => {
        navigate("/product", { state: { details: product } })
    }
    const updateOrderStatus = async (id, type) => {
        const orderRef = doc(db, "order", id);
        try {
            const docSnap = await getDoc(orderRef);
            if (docSnap.exists()) {
                if (type === "Ordered") {
                    await updateDoc(orderRef, {
                        ordered: true
                    });
                } else if (type === "Shipped") {
                    await updateDoc(orderRef, {
                        shipping: true
                    });
                } else {
                    await updateDoc(orderRef, {
                        delivered: true
                    });
                }
            }
            setUpdateEnable(!updateEnable)
        } catch (error) {
            setError(err.message);
            console.error("Error updating order: ", error);
        }
    };
    const generateOrderNumber = (index) => {
        return `ORD-${index + 1}`;
    };

    return (
        <div className='order-table'>
            {
                !orderData || orderData.length === 0 ? <div className='no-cart-contents'>
                    <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#a30b00", }} size="4x" />
                    <h2>No items Ordered</h2>
                </div> :
                    <table>
                        <thead>
                            <td>Order no</td>
                            <td>Product Image</td>
                            {
                                !user && order &&
                                <td>Email</td>
                            }
                            <td>Payment Id</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Price Per Quantity</td>
                            <td>Total</td>
                            {
                                !user &&
                                <td>Action</td>
                            }
                            <td>Ordered</td>
                            <td>Shipped</td>
                            <td>Delivered</td>
                        </thead>
                        <tbody>
                            {
                                !user ?
                                    <>{
                                        orderData?.map((data, index) => (
                                            <tr >
                                                <td>{index + 1}</td>
                                                <td >
                                                    {data.orderProductEntityList.map((e) => (
                                                        <><img src={e.thumbnail} height={100} width={100} onClick={() => redirect(e)} /><br></br>
                                                        </>
                                                    ))}
                                                </td>
                                                {
                                                    !user && order &&
                                                    <td>{data.userEmailId}</td>
                                                }
                                                <td>{data.paymentId}</td>
                                                <td>
                                                    {data.orderProductEntityList.map((e) => (
                                                        <>{e.overallPrice}<br></br>
                                                        </>
                                                    ))}
                                                </td>
                                                <td>
                                                    {data.orderProductEntityList.map((e) => (
                                                        <>{e.productCount}<br></br>
                                                        </>
                                                    ))}
                                                </td>
                                                <td>{data.orderProductEntityList.map((e) => (
                                                    <>{e.value}<br></br>
                                                    </>
                                                ))}</td>
                                                <td>{sum[index]}</td>
                                                {
                                                    !user &&
                                                    <td>
                                                        <button onClick={() => onDelete(data.id)} className='delete-btn'>Delete</button>
                                                    </td>
                                                }
                                                <td><button onClick={() => updateOrderStatus(data.id, "Ordered")} className={data.ordered ? 'success-btn' : 'edit-btn'}>{data.ordered ? "Ordered" : "Not Ordered"} </button></td>
                                                <td><button onClick={() => updateOrderStatus(data.id, "Shipped")} className={data.shipping ? 'success-btn' : 'edit-btn'}>{data.shipping ? "Shipped" : "Not Shipped"} </button></td>
                                                <td><button onClick={() => updateOrderStatus(data.id, "Delivered")} className={data.delivered ? 'success-btn' : 'edit-btn'}>{data.delivered ? "Delivered" : "Not Delivered"}</button></td>
                                            </tr>
                                        ))
                                    } </> :
                                    <>{
                                        orderData?.map((data, index) => (
                                            <>
                                                {data.orderProductEntityList.map((e) => (
                                                    <tr>
                                                        <td>{generateOrderNumber(index)}</td>                                                        <td >
                                                            <img src={e.thumbnail} height={100} width={100} onClick={() => redirect(e)} /><br></br>
                                                        </td>
                                                        <td>{data.paymentId}</td>
                                                        <td>{e.overallPrice}</td>
                                                        <td>{e.productCount}</td>
                                                        <td>{e.value}</td>
                                                        <td>{sum[index]}</td>
                                                        <td>
                                                            <p className={`default-txt ${data.ordered ? "success-txt" : "non-success-txt"}`}>{data.ordered ? "Ordered" : "Not Ordered"}</p>
                                                        </td>
                                                        <td>
                                                            <p className={`default-txt ${data.shipping ? "success-txt" : "non-success-txt"}`}>{data.shipping ? "Shipped" : "Not yet Shipped"}</p>
                                                        </td>
                                                        <td>
                                                            <p className={`default-txt ${data.delivered ? "success-txt" : "non-success-txt"}`}>{data.delivered ? "Delivered" : "Not yet Delivered"}</p>
                                                        </td>
                                                    </tr>
                                                ))
                                                }
                                            </>
                                        ))
                                    }
                                    </>
                            }
                        </tbody>
                    </table>
            }
        </div >
    )
}
