import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { storage, ref, uploadBytes, getDownloadURL } from "../configs/firebase";
import { GlobalContext } from "../context/context";
import { db, addDoc,collection } from "../configs/firebase";

export default function AddDish() {
    const { state } = useContext(GlobalContext);
    const [dishImg, setDishImg] = useState('');
    const [foodname, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [delivery, setDelivery] = useState('');
    const [errMsg, setErrMsg] = useState('');

    async function addDish() {
        try{
        const storageRef = ref(storage, `images/${state.authUser.uid}/${dishImg.name}`);
        await uploadBytes(storageRef, dishImg);
        let imgURL = await getDownloadURL(ref(storage, `images/${state.authUser.uid}/${dishImg.name}`));

        let dish = {
            foodImg: imgURL,
            foodname,
            price,
            category,
            delivery,
            uid: state.authUser.uid
        }
        let docRef = await addDoc(collection(db,'dishes'),dish);
        console.log(docRef.id)
    }
    catch(e){
        console.log(e)

    }
    }
    return (
        <div className='container'>


            <div className='w-75 mx-auto p-5 border bg-light' style={{ marginTop: '10%' }}>
                <div className="form-group">
                    <h1 className='text-white text-center rounded ' style={{ backgroundColor: '#0f9afb' }}>Add Dish !</h1>
                </div>
                <div className="text-center p-4 border">
                    <label>
                        <input type="file" onChange={(e) => { setDishImg(e.target.files[0]) }} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Food Name</label>
                    <input type="text" className="form-control shadow-none" aria-describedby="emailHelp" value={foodname} onChange={(ev) => { setFoodName(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control shadow-none" aria-describedby="emailHelp" value={price} onChange={(ev) => { setPrice(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input type="text" className="form-control shadow-none" value={category} onChange={(ev) => { setCategory(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}

                </div>
                <div className="form-group">
                    <label>Delivery type</label>
                    <input type="text" className="form-control shadow-none" value={delivery} onChange={(ev) => { setDelivery(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}

                </div>


                <button className="btn btn-outline-primary mt-4 shadow-none" onClick={addDish}>Add</button>
                <p className='text-center mt-3'>Already have an account ? <Link to='/'>Signin</Link></p>
            </div>


        </div>

    )
}


