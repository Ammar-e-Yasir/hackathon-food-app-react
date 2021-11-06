import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, getDocs, addDoc, doc, deleteDoc, getDoc } from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function AccedtedOrders() {
    let uid = localStorage.getItem('restId');
    const [acceptedOrders, setAcceptedOrders] = useState([]);


    const { state, dispatch } = useContext(GlobalContext);


    useEffect(async () => {
        try {
            const q = query(collection(db, "ordersAccepted"), where("uid", "==", state.authUser.uid));
            let orderRef = await getDocs(q);
            let acceptedOrdersClone = acceptedOrders.slice(0);

            orderRef.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                // dispatch({type:"ACCEPTED_ORDERS", payload:obj})
                // console.log(obj)
                acceptedOrdersClone.push(obj)
            })
            setAcceptedOrders(acceptedOrdersClone)
        }
        catch (e) {
            console.log(e)
        }

    }, [state.authUser])


    const deliveredOrder = async (element) => {
        let a = doc(db, "ordersAccepted", element.id);
        let b = await getDoc(a);
        console.log(b.data())

        let orderDelivRef = collection(db, 'ordersDelivered');
        await addDoc(orderDelivRef, b.data())


        let docDel = doc(db, "ordersAccepted", element.id);
        await deleteDoc(docDel);
    }

    return (
        <div>
            <h1 className='text-center'>Accepted Orders</h1>
            <div className='container d-flex  border' >

                {acceptedOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (

                        <div className='col-4' id={id} key={index}>
                            <div className="card m-4 ">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='300px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
                                    <button className='btn btn-success' onClick={(e) => { deliveredOrder(e.target.parentNode.parentNode.parentNode) }}>Delivered</button>
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