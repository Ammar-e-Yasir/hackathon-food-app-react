import React, { useContext, useEffect, } from "react";
import { useState } from "react/cjs/react.development";
import { db, collection, where, query, getDocs, addDoc, deleteDoc, doc,getDoc } from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function PendingOrders() {
    let uid = localStorage.getItem('restId');

    const { state, dispatch } = useContext(GlobalContext);
    const [pendingOrders, setAllPendingOrders] = useState([]);
    const [custId, setCustId] = useState();
    // console.log(state.authUser.uid)

    useEffect(async () => {
        // setTimeout(async()=>{
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
        // },5000)

    }, [state.authUser])


    const acceptedOrder = async (element) => {
        try {
            let a = doc(db, "orders", element.id);
            let b = await getDoc(a);
            console.log(b.data())
            
            
            
            let orderAccRef = collection(db, 'ordersAccepted');
            await addDoc(orderAccRef,b.data());
            
            
            // await addDoc(orderAccRef, {
                //     orderId:element.id,
                //     restID: state.authUser.uid,
                
                //     foodImg: element.children[0].src,
                //     foodname: element.children[1].innerText,
                //     category: element.children[2].innerText,
                //     price: element.children[3].innerText,
                //     custId: element.children[4].innerText
                
                
                
                // })
                
                
                let docDel = doc(db, "orders", element.id);
                await deleteDoc(docDel);
            }
            catch (e) {
            console.log(e)
        }




    }







    return (
        <div>
            <h1>Pending Orders</h1>
            {pendingOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                return (
                    <div key={index} className='border mt-5 h-50 w-50' id={id}>
                        <img src={foodImg} className='h-50 w-50' />
                        <h3>{category}</h3>
                        <h2>{foodname}</h2>
                        <p>{price}</p>
                        <p style={{ display: 'none' }}>{custID}</p>
                        <button className='btn btn-success' onClick={(e) => { acceptedOrder(e.target.parentNode) }}>Accept</button>

                    </div>
                )

            })
            }


        </div>
    )
}