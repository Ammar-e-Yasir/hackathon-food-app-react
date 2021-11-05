import React, { useContext } from "react";
import {
    Link
} from "react-router-dom";
import { GlobalContext } from "../context/context";
import { auth, signOut } from '../configs/firebase'
import Logout from "../screens/logout";
import { useEffect } from "react/cjs/react.development";
import { cleanup } from "@testing-library/react";
import SignIn from "../screens/signin";

export default function Nav() {
    const { state } = useContext(GlobalContext);









    return (
        <div>
            <nav className='w-75 mx-auto mt-2'>
                <ul className="nav bg-dark justify-content-center rounded">
                    {
                        state.authUser?.userRole === 'customer' ?
                            <>
                                <li className="nav-item ">
                                    <Link to='/' className="nav-link text-light">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/cust-order-pend' className="nav-link text-light">Pending Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/cust-order-accept' className="nav-link text-light">Accepted Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/cust-order-deliv' className="nav-link text-light">Delivered Orders</Link>
                                </li>
                                <Logout />
                            </> : null
                    }


                    {state.authUser?.userRole == 'restaurant' ?
                        <>
                            <li className="nav-item ">
                                <Link to='/' className="nav-link text-light">Add Dish</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/pending-orders' className="nav-link text-light">Pending Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/accepted-orders' className="nav-link text-light">Accepted Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/delivered-orders' className="nav-link text-light">Delivered Orders</Link>
                            </li>
                            <Logout />  
                      </> : null
                    }

                </ul>


            </nav>

        </div>
    )











}

