import React, { useContext, useEffect, useState } from "react";
import { db, collection, where ,query,getDocs} from '../configs/firebase'
import { GlobalContext } from "../context/context";
import { useHistory } from "react-router";


export default function CustomerHome() {
const {state , dispatch } = useContext(GlobalContext);
    const [allRestaurant, setAllRestaurant] = useState([]);
    const [userId , setUserId] = useState({});

let history = useHistory();
    useEffect(()=>{
        setUserId(state.authUser)
    },[])


    useEffect(async () => {
        // console.log(state.authUser.uid)
        const q = query(collection(db, "users"), where("userRole", "==", "restaurant"));

        let restRef = await getDocs(q);
        let allRestaurantClone = allRestaurant.slice(0);
        restRef.forEach((doc) => {
           let obj = doc.data();
            obj.id = doc.id;
            allRestaurantClone.push(obj)
            // console.log(obj)
        })

        setAllRestaurant(allRestaurantClone);

    }, [])

    const selectRest = (e)=>{
       let restID =  e.target.parentNode.id;
    //    dispatch({type:"SELECT_RES_ID" , payload:restID});
       localStorage.setItem('restId' , restID)
       history.push('/rest-dish')
    //    console.log(restID)

      



    }


    return (
        <>
        <h1>Select your Restaurant !</h1>
        {allRestaurant.map(({res_name,country,city,id},index)=>{
            return(
                <div key={index} id={id} className='border mt-5'>
                    <h3>{res_name}</h3>
                    <p>{country}</p>
                    <p>{city}</p>
                    <button className='btn btn-success' onClick={selectRest}>Explore</button>

                </div>
            )

        })
        }
        </>
        // <h1>asd</h1>
    )
}