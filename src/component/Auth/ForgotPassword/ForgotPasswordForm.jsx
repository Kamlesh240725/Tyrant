import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@mui/material'
import { Button } from "@/components/ui/button";
import { useRef } from 'react';
import {useNavigate } from 'react-router-dom';
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [isSentMail, setIsSentMail] = useState(false);
    const [message ,setMessage] = useState('')
    const [isAlreadyRegistered,setIsAlreadyRegistered]= useState()
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const navigate = useNavigate()

    const checkIsRegistered = async (email) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_ISREGISTERED}/isregistered?email=${email}`
          );
          const data = response.data;
                console.log(response);
                
          console.log(data.isAlreadyRegistered,"loginnn page");     
          setIsAlreadyRegistered(data.isAlreadyRegistered);
          return data.isAlreadyRegistered;
        } catch (error) {
          console.error("Error:", error);
          setIsAlreadyRegistered(false);
          return false;
        }
      };
  
    useEffect(() => {
        if (emailMounted.current) {
          if (email.length > 1) {
            checkIsRegistered(email);
    
            if (emailRegex.test(email) === false) {
              document.querySelector(".emailText").textContent =
                "Please enter a valid email";
              document.querySelector(".emailText").classList.remove("hidden");
            } else {
              document.querySelector(".emailText").classList.add("hidden");
          

            checkIsRegistered(email).then(isRegistered => {
                if (isRegistered === false) {
                  console.log("not registered");
                  document.querySelector(".emailText").textContent =
                  "User Is NotRegistered Yet";
                document.querySelector(".emailText").classList.remove("hidden");

                } else {
                  console.log("registered");
                }
              });

            }
          }
        } else {
          emailMounted.current = true;
        }
      }, [email]);

    const emailMounted = useRef(false);

  

    const handleOnChange = (e)=>{
        setEmail(e.target.value)  
        // console.log(e.target.value);     
    }

    const sendOtp = ()=>{
            if(isAlreadyRegistered ===false){
                navigate('/register')
            }else{
                console.log("otp");
                navigate('/otpforresetpass' ,{state: {email}})
            }
    }
    

    return (
        <>

         <div className='w-screen h-screen  text-white flex flex-col justify-center items-center gap-5'>
         <h1 className=''> hello Mother fucker</h1>
         <div className=" col-span-1 row-span-1">
              <label
                htmlFor="email"
                className="block  font-medium text-gray-900"
              >
                Email*
              </label>
              <div className="">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                 ref={emailMounted}
                  value={email}
                  onChange={handleOnChange}  
                  required
                  placeholder="Enter Email"
                  className="border-2 border-solid border-black  block w-[200%] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6 "
                />
                <div className="emailText text-red-600 text-xs my-1 capitalize hidden">
                    {message}
                </div>
              </div>
            </div>

          <Button onClick ={sendOtp}>Send OTP</Button>

         </div>
        </>
    )
}

export default ForgotPasswordForm