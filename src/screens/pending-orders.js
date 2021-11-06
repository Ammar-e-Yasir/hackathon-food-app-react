import React, { useContext, useEffect, } from "react";
import { useState } from "react/cjs/react.development";
import { db, collection, where, query, getDocs, addDoc, deleteDoc, doc, getDoc } from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function PendingOrders() {
    let uid = localStorage.getItem('restId');

    const { state, dispatch } = useContext(GlobalContext);
    const [pendingOrders, setAllPendingOrders] = useState([]);
    const [custId, setCustId] = useState();
    // console.log(state.authUser.uid)

    useEffect(async () => {
        try {
            const q = query(collection(db, "orders"), where("uid", "==", state.authUser.uid));
            let orderRef = await getDocs(q);
            let pendingOrdersClone = pendingOrders.slice(0);
            orderRef.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                // dispatch({type:"PENDING_ORDERS", payload:obj})
                // console.log(obj)
                pendingOrdersClone.push(obj)
            })
            setAllPendingOrders(pendingOrdersClone)
        }
        catch (e) {
            console.log(e)
        }

    }, [state.authUser])


    const acceptedOrder = async (element) => {
        try {
            let a = doc(db, "orders", element.id);
            let b = await getDoc(a);
            console.log(b.data())



            let orderAccRef = collection(db, 'ordersAccepted');
            await addDoc(orderAccRef, b.data());




            let docDel = doc(db, "orders", element.id);
            await deleteDoc(docDel);
        }
        catch (e) {
            console.log(e)
        }




    }







    return (
        <div>
            <h1 className='text-center'>Pending Orders</h1>
            <div className='container d-flex border'>
                {pendingOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (


                        <div className='col-4' id={id} key={index}>
                            <div className="card m-4 ">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='300px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
                                    <button className='btn btn-success' onClick={(e) => { acceptedOrder(e.target.parentNode.parentNode.parentNode) }}>Accept</button>
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