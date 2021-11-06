import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { collection, query, where, onSnapshot, db, auth, getDocs } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";

export default function CustPendingOrders() {
    const { state } = useContext(GlobalContext);
    const [ordersPending, setPendingOrders] = useState([]);
    // const [id , setId] = useState('a');
    // console.log(state.authUser.uid)



    useEffect(async () => {
        try {



            const q = query(collection(db, "orders"), where("custID", "==", state.authUser.uid));

            const querySnapshot = await getDocs(q);
            let ordersPendingClone = ordersPending.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                ordersPendingClone.push(obj)

            });

            setPendingOrders(ordersPendingClone)
        }


        catch (e) {
            console.log(e)
        }




    }, [])


    return (
        <div>
            <h1 className='text-center'>Pending Orders</h1>
            <div className='container d-flex  border' >

                {ordersPending.map(({ foodname, foodImg, category, price, custID, id }, index) => {
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
