import React from "react";
import { GlobalContext } from "../context/context";
import { useContext, useEffect } from "react";
import { collection, db, getDocs,query,orderBy } from "../configs/firebase";
import LikeBtn from './like-btn'
import DislikeBtn from './dislike-btn';
import MyComponent from "./my-component";
// 

export default function UserHome() {
    const { state, dispatch } = useContext(GlobalContext);


    useEffect( () => {
       const  a = async()=>{
        let tweetsRef = collection(db, 'tweets');
        const q = query(tweetsRef,orderBy("time","desc"));
        let userAllTweet = await getDocs(q);

        // let allTweetClone = alltweet.slice(0);
        userAllTweet.forEach((doc) => {
            let obj = doc.data();
            obj.id = doc.id;
            // allTweetClone.push(obj);


            dispatch({ type: "ALL_TWEETS", payload: obj })

        });
    }
    a();

        // setAllTweet(allTweetClone);

    }, [])


    



    return (

 <div className='w-75 mx-auto mt-3'>
<MyComponent/>
        <div>



            {
                
                state.allTweets.map(({ username, tweet, time, id }, index) => {
                    // console.log(id)
                
                    return (

                    
                        <div className='w-50 mx-auto border p-2 mb-5 ' key={index} id={id}>
                            <div className='d-flex flex-row justify-content-between'>
                            <h1 className='bg-secondary w-50 text-light rounded'>{username.replace(username[0],username[0].toUpperCase())}</h1>
                            <p className='pt-2 font-weight-normal'>{time}</p>
                            </div>
                            <p>{tweet}</p>
                            
                          <LikeBtn/>
                          <DislikeBtn/>
                         
                    
        

                        </div>
                    )
                })



            }

        </div>

</div>
    );


}

