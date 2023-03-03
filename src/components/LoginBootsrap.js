import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);
const LoginBootsrap = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail]= useState('');


    const handleLogin = event=>{
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.email.value;
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user = result.user;
            console.log(user)
            setSuccess(true)
        })
        .catch(error=>{
            console.error('error', error);

        })
    }

    const handleEmailBlur=event=>{
        const email = event.target.value;
        setUserEmail(email);
        console.log(email)
    }

    const handleForgetPassword=()=>{
        if(!userEmail){
            alert('Please enter your email address')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(()=>{
            alert('Password Reset email sent please check')
        })
        .catch((error)=>{
            console.error('error', error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please Login!!</h3>
            <form>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
                <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your Email" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
                <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Your Password" required/>
            </div>

            <button className="btn btn-primary" type="submit">Login</button>
            </form>
            {success && <p>Successfuly login to the account</p>}
            <p>New to this website? Please <Link to='/register'>Register</Link></p>
            <p><small>Forget Password? <button onClick={handleForgetPassword} type="button" className="btn btn-link">Reset Password</button></small></p>
        </div>
    );
};

export default LoginBootsrap;