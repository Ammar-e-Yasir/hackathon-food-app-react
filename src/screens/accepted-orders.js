import React, { useContext, useEffect, useState } from "react";
import { db, collection, where ,query,getDocs,addDoc,doc,deleteDoc,getDoc} from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function AccedtedOrders(){
    let uid =  localStorage.getItem('restId');
    const [acceptedOrders , setAcceptedOrders] = useState([]);


    const {state,dispatch } = useContext(GlobalContext);


    useEffect(async () => {
        try{
         const q = query(collection(db, "ordersAccepted"),where("uid", "==", state.authUser.uid));
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
    catch(e){
        console.log(e)
    }

    }, [state.authUser])
  

    const deliveredOrder = async(element)=>{
        let a = doc(db, "ordersAccepted", element.id);
            let b = await getDoc(a);
            console.log(b.data())
        
        let orderDelivRef = collection(db,'ordersDelivered');
        await addDoc(orderDelivRef,b.data())
        // await addDoc(orderAccRef,{
        //     orderId:element.id,
        //     restID:uid,
        //     foodImg:element.children[0].src,
        //     foodname:element.children[1].innerText,
        //     category:element.children[2].innerText,
        //     price:element.children[3].innerText,
        //     custId:element.children[4].innerText
            
        // })

        let docDel = doc(db, "ordersAccepted", element.id);
        await deleteDoc(docDel);
    }

    return(
    <div>
        <h1>Accepted Orders</h1>
        {acceptedOrders.map(({foodname,foodImg,category,price,custID,id},index)=>{
            return(
                <div key={index}  className='border mt-5 h-50 w-50' id={id}>
                    <img src={foodImg} className='h-50 w-50' />
                    <h2>{foodname}</h2>
                    <h3>{category}</h3>
                    <p>{price}</p>
                    <p style={{display:'none'}}>{custID}</p>

                    <button className='btn btn-success' onClick={(e)=>{deliveredOrder(e.target.parentNode)}}>Delivered</button>

                </div>
            )
            
        })
    }


        </div>
    )
}