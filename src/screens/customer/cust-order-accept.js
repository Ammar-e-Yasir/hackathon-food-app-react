import React, { useContext,useState } from "react";
import { useEffect } from "react";
import { collection, query, where,db,getDocs } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";

export default function CustAcceptOrders(){
    const {state} = useContext(GlobalContext);
    const [ordersAccepted , setAcceptedOrders] = useState([]);

    useEffect(async()=>{

// const q = query(collection(db, "odersDelivered"), where("custId", "==", state.authUser.uid));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const cities = [];
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data().name);
//   });
//   console.log("Current cities in CA: ", cities.join(", "));
// });


try{
// const q = query(collection(db, "odersAccepted"), where("custID", "==", state.authUser.uid));
// let ordersAcceptedClone = ordersAccepted.slice(0);
// const unsubscribe = onSnapshot(q, (snapshot) => {
//   snapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//         console.log("New city: ", change.doc.data());
//         let obj = change.doc.data();
//         obj.id = change.doc.id;
//         ordersAcceptedClone.push(obj);
//     }
  
//   });
// });
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
catch(e){
    console.log(e)
}


    },[state.authUser])




    return(
        <div>
        <h1>Acceptd Orders</h1>
        {ordersAccepted.map(({foodname,foodImg,category,price,custID,id},index)=>{
            return(
                <div key={index}  className='border mt-5 h-50 w-50' id={id}>
                    <img src={foodImg} className='h-50 w-50' />
                    <h2>{foodname}</h2>
                    <h3>{category}</h3>
                    <p>{price}</p>
                    <p style={{display:'none'}}>{custID}</p>
                    {/* <button className='btn btn-success' onClick={(e)=>{acceptedOrder(e.target.parentNode)}}>Accept</button> */}

                </div>
            )
            
        })
    }


        </div>

    )
}
