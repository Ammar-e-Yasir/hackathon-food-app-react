import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { collection, query, where, db, getDocs } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";

export default function CustAcceptOrders() {
    const { state } = useContext(GlobalContext);
    const [ordersAccepted, setAcceptedOrders] = useState([]);

    useEffect(async () => {



        try {

            const q = query(collection(db, "ordersAccepted"), where("custID", "==", state.authUser.uid));

            const querySnapshot = await getDocs(q);
            let ordersAcceptedClone = ordersAccepted.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                ordersAcceptedClone.push(obj)

            });
            setAcceptedOrders(ordersAcceptedClone)


        }
        catch (e) {
            console.log(e)
        }


    }, [state.authUser])




    return (
        <div>
            <h1 className='text-center'>Acceptd Orders</h1>
            <div className='container d-flex  border' >

                {ordersAccepted.map(({ foodname, foodImg, category, price, custID, id }, index) => {
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
