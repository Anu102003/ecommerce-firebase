import React, { useEffect, useState } from 'react'
import { OrderTable } from '../../../assets/components/OrderTable/OrderTable';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../Config/ConfigFirebase';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const Orders = () => {
    const [orders, setOrders] = useState([])
    const { email } = useSelector(state => state.user)
    const [deleteEnable, setDeleteEnable] = useState(false)
    const [updateEnable, setUpdateEnable] = useState(false)
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = location?.state || {};
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const ordersCollectionRef = collection(db, 'order');
                let querySnapshot;
                if (user) {
                    const q = query(ordersCollectionRef, where('userEmailId', '==', email.email));
                    querySnapshot = await getDocs(q);
                } else {
                    querySnapshot = await getDocs(ordersCollectionRef);
                }
                const ordersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(ordersList);
            } catch (error) {
                console.error("Error updating order: ", error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [deleteEnable, updateEnable]);
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed) {
            try {
                const postsEditCollectionRef = doc(db, 'order', id);
                await deleteDoc(postsEditCollectionRef);
                setDeleteEnable(!deleteEnable)
            } catch (error) {
                console.error('Error deleting order: ', error);
            }

        }
    };
    if (loading) {
        return <div className='order-table'>
            <img src="https://www.syncfusion.com/blogs/wp-content/uploads/2022/06/Cupertino-Material-Animation.gif" height={500} />;
        </div>
    }

    if (error) {
        return (<div className='order-table'>
            <div>Error: {error}</div>
        </div>
        )
    }

    return (
        <OrderTable orderData={orders} order={true} onDelete={handleDelete} user={user} updateEnable={updateEnable} setUpdateEnable={setUpdateEnable} />
    )
}
