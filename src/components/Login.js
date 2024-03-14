import React ,{ useRef, useState }  from 'react'
import { useDispatch } from 'react-redux';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import {LOGO_URL} from "../utils/constants";
import {useNavigate} from "react-router-dom"


const Login = () => {
    const [isSignInForm , setIsSignInForm]=useState(true);
    const [errorMessage,setErrorMessage]=useState(null);
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const name=useRef(null);
    const phone=useRef(null);
    const email=useRef(null);
    const password=useRef(null);
    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);
    };
    const handleButtonClick = () =>{
      //Validate the Form data
      const message=checkValidData(email.current.value,password.current.value);
      setErrorMessage(message);

      if(message) return;
  
      // Sign/Sign Up Logic
      if(!isSignInForm){
        //Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL:LOGO_URL
              }).then(() => {
                // Profile updated!
                const {uid,email,displayName,photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid,email:email,displayName: displayName,photoURL:photoURL}))
              }).catch((error) => {
                // An error occurred
                // ...
              });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });

      }else{
        //Sign In Logic
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate('/');; 
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-"+ errorMessage);
          });
      }


    };

  return (
    <div>
        <form onSubmit={(e)=>e.preventDefault()} className='absolute w-full md:w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In":"Sign Up"}</h1>
            {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
            {!isSignInForm && <input ref={phone} type='number' placeholder='Phone Number' className='p-4 my-4 w-full bg-gray-700'/>}
            <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
            <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In":"Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Swiggy? Sign Up Now":"Already Regisered? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login