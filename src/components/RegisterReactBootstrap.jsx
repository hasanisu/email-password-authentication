import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';
import {Link} from 'react-router-dom';

const auth = getAuth(app);
const RegisterReactBootstrap = () => {
const [passwordError, setPasswordError] = useState('')
const [success, setSuccess] = useState(false); /* For Succesfull message */
    const handleRegister=event=>{
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        /*Validate password*/ 
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please provide at least two uppercase')
            return;
        }
        if(password.length < 6){
            setPasswordError('Password should be 6 charecter')
            return;
        }
        if(!/(?=.*[!@#$&*?])/.test(password)){
            setPasswordError('Please set at least special character')
            return
        }
        setPasswordError('')


        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
            verifyEmail();
        })
        .catch(error =>{
            console.error('error', error);
            setPasswordError(error.message);
        })
    }


    const verifyEmail =()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert('Please check your email and verify.')
        })
    }

    const updateUserName = (name)=>{
        updateProfile(auth.currentUser,{
            displayName: name
        })
        .then(()=>{
            console.log('Display name updated')
        })
        .catch(error=>{
            console.error('error', error)
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-warning'>Please Register</h3>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter Your Name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required/>
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>User Created Successfully</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p>Already have an accout? <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default RegisterReactBootstrap;