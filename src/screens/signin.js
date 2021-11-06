import React, {useState,useEffect } from 'react';
import { auth, signInWithEmailAndPassword } from '../configs/firebase';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
// import { useContext } from 'react/cjs/react.development';
// import { GlobalContext } from '../context/context';
function SignIn() {
    // let {state , dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    let history = useHistory();
    const login = async () => {
        
        try {
         let a = await signInWithEmailAndPassword(auth, email, password);
         console.log(a)
         
        } 

        catch (err) {
            setErrMsg(err.message);
            setTimeout(() => {
                setErrMsg('');
            }, 9000)
        }
    }



        











    return (
       
        <div className='container'>


        <div className='w-75 mx-auto p-5 border bg-light' style={{marginTop:'10%'}}>
        <h1 className='text-white text-center rounded bg-secondary'>USER LOGIN !</h1>

            
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control shadow-none"  aria-describedby="emailHelp" value={email} onChange={(ev) => { setEmail(ev.target.value) }} />
                {errMsg ? <small  className="form-text text-muted">{errMsg}</small> : null}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control shadow-none" value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
                {errMsg ? <small  className="form-text text-muted">{errMsg}</small> : null}

            </div>

            <button className="btn btn-outline-primary shadow-none mt-5" onClick={login}>Login</button>
            <p className='text-center'>Don't have an account ? <Link to='/home'>register</Link></p>
        </div>


    </div>
    )
}

export default SignIn;