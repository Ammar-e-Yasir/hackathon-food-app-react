import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/context";
import { useHistory } from "react-router";
import { db, collection, where, query, getDocs, doc, setDoc, addDoc, auth, getDoc } from '../configs/firebase'
import Nav from "../components/navbar";
import Logout from "./logout";


export default function RestDishes() {

    const { state } = useContext(GlobalContext);


    // let history = useHistory();
    const [allDishes, setAllDish] = useState([]);
    // const [userId , setUserId] = useState('');
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


        //    await addDoc(collection(db,'orders'),{
        //     custID:state.authUser.uid,
        //     restID:uid,
        //     foodImg:element.children[0].src,
        //     foodname:element.children[1].innerText,
        //     category:element.children[2].innerText,
        //     price:element.children[3].innerText,
        //     delivery:element.children[4].innerText,
        //   })
        alert('Order has been done !')
        // });
        // let orderRef = doc(db,'orders', uid);
        // await setDoc(orderRef,{
        //         custID:state.authUser.uid,
        //         restID:uid,
        //         foodImg:element.children[0].src,
        //         foodname:element.children[1].innerText,
        //         category:element.children[2].innerText,
        //         price:element.children[3].innerText,
        //         delivery:element.children[4].innerText,
        //   })




    }
    // console.log(state.restId)
    return (
        <div className='mt-5'>
            <h1>Our Food</h1>
            {allDishes.map(({ foodname, foodImg, category, delivery, price, id }, index) => {
                return (
                    <div key={index} className='border mt-5 h-50 w-50' id={id}>
                        <img src={foodImg} className='h-50 w-50' />
                        <h2>{foodname}</h2>
                        <h3>{category}</h3>
                        <p>{price}</p>
                        <p>{delivery}</p>
                        <button className='btn btn-success' onClick={(e) => { orderItem(e.target.parentNode) }}>Order</button>

                    </div>
                )

            })
            }
            {/* <Logout/>  */}
        </div>
    )
}