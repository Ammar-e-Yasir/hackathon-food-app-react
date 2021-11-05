import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { collection, query, where, onSnapshot, db, getDocs } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";

export default function CustDeliveredOrders() {
    const { state } = useContext(GlobalContext);
    const [orderDelivered, setDeliveredOrders] = useState([]);

    useEffect(async () => {

        try {
            // const q = query(collection(db, "odersDelivered"), where("custID", "==", "IPoM0wtj4tTrK2J48yRIRUhEC9t2"));
            // let orderDeliveredClone = orderDelivered.slice(0);
            // const unsubscribe = onSnapshot(q, (snapshot) => {
            //   snapshot.docChanges().forEach((change) => {
            //     if (change.type === "added") {
            //         console.log("New city: ", change.doc.data());
            //         let obj = change.doc.data();
            //         obj.id = change.doc.id;
            //         orderDeliveredClone.push(obj);
            //     }

            // });



            const q = query(collection(db, "ordersDelivered"), where("custID", "==", state.authUser.uid));

            const querySnapshot = await getDocs(q);
            let orderDeliveredClone = orderDelivered.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                orderDeliveredClone.push(obj)

            });
            setDeliveredOrders(orderDeliveredClone)
        }
        catch (e) {
            console.log(e)
        }

    }, [state.authUser])



    return (
        <div>
            <h1>Delivered Orders</h1>
            {orderDelivered.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                return (
                    <div key={index} className='border mt-5 h-50 w-50' id={id}>
                        <img src={foodImg} className='h-50 w-50' />
                        <h2>{foodname}</h2>
                        <h3>{category}</h3>
                        <p>{price}</p>
                        <p style={{ display: 'none' }}>{custID}</p>
                        {/* <button className='btn btn-success' onClick={(e)=>{acceptedOrder(e.target.parentNode)}}>Accept</button> */}

                    </div>
                )

            })
            }


        </div>

    )
}