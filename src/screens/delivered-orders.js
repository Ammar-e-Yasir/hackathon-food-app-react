import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, getDocs, addDoc } from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function CustDeliveredOrders() {
    let uid = localStorage.getItem('restId');
    const [deliveredOrders, setDeliveredOrders] = useState([]);


    const { state, dispatch } = useContext(GlobalContext);

    // console.log(localStorage.getItem('authUserId'));
    let authUserId = localStorage.getItem('authUserId')
    useEffect(async () => {
        try {
            const q = query(collection(db, "ordersDelivered"), where("uid", "==", state.authUser.uid));
            let orderRef = await getDocs(q);
            let deliveredOrdersClone = deliveredOrders.slice(0);
            orderRef.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                // dispatch({type:"DELIVERED_ORDERS", payload:obj})
                // console.log(obj)
                deliveredOrdersClone.push(obj)
            })
            setDeliveredOrders(deliveredOrdersClone)
        }
        catch (e) {
            console.log(e)
        }

    }, [state.authUser])




    return (
        <div>
            <h1 className='text-center'>Delivered Orders</h1>
            <div className='container d-flex flex-wrap  border' >

                {deliveredOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (

                        <div className='col-4' id={id} key={index}>
                            <div className="card m-4 ">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='300px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
                                </div>
                            </div>
                        </div>
                    )

                })
                }


            </div>
        </div>
    )
}