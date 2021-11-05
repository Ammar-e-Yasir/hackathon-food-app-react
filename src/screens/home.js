import React from "react";
import { Link } from "react-router-dom";
export default function Home(){
    return (
        // <>
        //     <ul>
        //         <li>
        //             <Link to='/rest-reg'>Restaurant Registration</Link>
        //         </li>
        //         <li>
        //             <Link to='/cust-reg'>Customer Registration</Link>
        //         </li>
        //     </ul>
        // </>
        <div className='container'>


        <div className='w-75 mx-auto p-5 border bg-light' style={{marginTop:'10%'}}>
        <h1 className='text-white text-center rounded bg-secondary'>Register</h1>
    <Link to='/rest-reg'><button className="btn btn-outline-warning shadow-none mt-5 w-100">Restaurant</button></Link>
    {/* <span className='text-center d-block mt-5 border'>OR</span> */}
    <Link to='/cust-reg'><button className="btn btn-outline-primary shadow-none mt-4 w-100">Customer</button></Link>
            <p className='text-center mt-4'>Already have an account ! <Link to='/'> signin here</Link></p>
        </div>


    </div>

    )
}