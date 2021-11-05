export let data = {
    authUser:null,
    // allUsers : [],
    // allTweets: [],
    // mytweets : [],
    // likeTweets : [],
    // unlieTweets :[],
    // restId : null,
    pendingOrders:[],
    acceptedOrders : [],
    deliveredOrders :[]


}

export function reducer(state, action) {
    switch (action.type) {
        case "AUTH_USER": {
            // console.log(action.payload)
            return {
                ...state,
                authUser: action.payload
            }
        }

        // case "SELECT_RES_ID": {
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         restId: action.payload
        //     }
        // }

       
        case "PENDING_ORDERS": {
            let pendingOrdersClone = state.pendingOrders.slice(0);
            pendingOrdersClone.push(action.payload)
            console.log(pendingOrdersClone)
            return {
                ...state,
                pendingOrders: pendingOrdersClone
            }
        }

        case "ACCEPTED_ORDERS": {
            let acceptedOrdersClone = state.acceptedOrders.slice(0);
            acceptedOrdersClone.push(action.payload)
            console.log(acceptedOrdersClone)
            return {
                ...state,
                acceptedOrders: acceptedOrdersClone
            }
        }


        case "DELIVERED_ORDERS": {
            let deliveredOrdersClone = state.deliveredOrders.slice(0);
            deliveredOrdersClone.push(action.payload)
            console.log(deliveredOrdersClone)
            return {
                ...state,
                deliveredOrders: deliveredOrdersClone
            }
        }
        // case "ALL_USERS" : {
        //     let allUsersClone = state.allUsers.slice(0);
        //     allUsersClone.push(action.payload)
        //     // console.log(allUsersClone)
        //     return {
        //         ...state,
        //         allUsers:allUsersClone
        //     }
        // }

        // case "ALL_TWEETS": {
        //     let allTweetsClone = state.allTweets.slice(0);
        //     allTweetsClone.push(action.payload)
        //     // console.log(allTweetsClone)  


        //     return {
        //         ...state,
        //         allTweets : allTweetsClone
        //     }
        // }



        // case "MY_TWEETS": {
        //     let myTweetsClone = state.mytweets.slice(0);
        //     myTweetsClone.push(action.payload)
        //     // console.log(myTweetsClone)

        //     return {
        //         ...state,
        //         mytweets: myTweetsClone
        //     }
        // }

        // case "LIKE_DATA" : {
        //     let likeTweetsClone = state.likeTweets.slice(0);
        //     likeTweetsClone.push(action.payload);
        //     console.log(likeTweetsClone)

            
        //     return {
        //         ...state,
        //         likeTweets : likeTweetsClone

        //     }
        // }

        default:
            return state;

    }
}


