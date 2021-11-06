import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/context";
// import { useHistory } from "react-router";
import { db, collection, where, query, getDocs, doc, setDoc, addDoc, auth, getDoc } from '../configs/firebase'
// import Nav from "../components/navbar";
// import Logout from "./logout";


export default function RestDishes() {

    const { state } = useContext(GlobalContext);


    const [allDishes, setAllDish] = useState([]);
    let uid = localStorage.getItem("restId");


    useEffect(async () => {
        try {
            const q = query(collection(db, "dishes"), where("uid", "==", uid));

            let dishRef = await getDocs(q);
            let allDishClone = allDishes.slice(0);
            dishRef.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                allDishClone.push(obj)
                // console.log(obj)
            })

            setAllDish(allDishClone);
        }

        catch (e) {
            console.log(e)
        }


    }, []);


    const orderItem = async (element) => {
        let a = doc(db, "dishes", element.id);
        let b = await getDoc(a);
        // console.log(b.data())
        let obj = b.data();
        obj.custID = state.authUser.uid;

        let orderRef = collection(db, 'orders');
        await addDoc(orderRef, obj)


        alert('Order has been done !')



    }
    return (
        <div className='border'>
            <h1 className='text-center'>Our Food</h1>
            <div className='container d-flex  border' >
            {allDishes.map(({ foodname, foodImg, category, delivery, price, id }, index) => {
               
                return(
                    <div className='col-4' id={id} key={index}>
                    <div className="card m-4 ">
                        <img className="card-img-top" src={foodImg} alt="Card image cap" height='300px' />
                        <div className="card-body">
                            <h2 className="card-title">{foodname}</h2>
                            <p className="card-text">Rs. {price}</p>
                            <p className="card-text">{category}</p>
                            <p className="card-text">Delivery : {delivery}</p>
                            <button className='btn btn-success' onClick={(e) => { orderItem(e.target.parentNode.parentNode.parentNode) }}>Order</button>
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