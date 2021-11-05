import React, { useContext, useEffect,useState  } from "react";
import { db, collection, where ,query,getDocs,addDoc} from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function CustDeliveredOrders(){
    let uid =  localStorage.getItem('restId');
    const [deliveredOrders , setDeliveredOrders] = useState([]);


    const {state,dispatch } = useContext(GlobalContext);

// console.log(localStorage.getItem('authUserId'));
let authUserId = localStorage.getItem('authUserId')
    useEffect(async () => {
        try{
         const q = query(collection(db, "ordersDelivered"),where("uid" , "==" , state.authUser.uid));
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
    catch(e){
        console.log(e)
    }

    }, [state.authUser])
  

    // const deliveredOrder = async(element)=>{

    //     let orderAccRef = collection(db,'ordersDelivered');
    //     await addDoc(orderAccRef,{
    //         custID:element.id,
    //         restID:uid,
    //         foodImg:element.children[0].src,
    //         foodname:element.children[1].innerText,
    //         category:element.children[2].innerText,
    //         price:element.children[3].innerText
    //   })
    // }

    return(
    <div>
        <h1>Delivered Orders</h1>
        {deliveredOrders.map(({foodname,foodImg,category,price,custID,id},index)=>{
            return(
                <div key={index}  className='border mt-5 h-50 w-50' id={id}>
                    <img src={foodImg} className='h-50 w-50' />
                    <h2>{foodname}</h2>
                    <h3>{category}</h3>
                    <p>{price}</p>
                    <p style={{display:'none'}}>{custID}</p>
                    {/* <button className='btn btn-success' onClick={(e)=>{deliveredOrder(e.target.parentNode)}}>Delivered</button> */}

                </div>
            )
            
        })
    }


        </div>
    )
}