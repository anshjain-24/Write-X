import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import authService from '../appWrite/auth.js'
import {useForm } from 'react-hook-form'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    /*
        register in react-hook-form : 
            register is a function used to connect (or "bind") your form fields 
            (like <input>, <select>, etc.) to react-hook-form's internal state 
            and validation system.
        
        Eg.:    <input {...register('username')} />
        It tells react-hook-form to watch this input.
        It keeps track of its value, validation errors, dirty/touched state, etc., automatically.
    
        handleSubmit : 
            handleSubmit is a function that you wrap your form submission function with.
        How it works: When the user submits the form:
            - handleSubmit will first validate all the registered inputs.
            - If everything is valid, it will call your custom function (passing all the form data).
            - If not valid, it will populate the errors for you.
    */
    const [error, setError] = useState("")

    const login = async (data) => {
        console.log("data during login : ",data);
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                console.log("just before dispatching userData from authService : ",userData);
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
            console.log("here is the error cought");
            
        }
    }

    console.log("inside LOGIN COMPONENt");
    

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className='mx-auto w-full  max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to your Account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>

                    Don&apos;t have any account?&nbsp;
                    <Link
                        to={'/signup'}
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Create a New Account
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>
                    {error}</p>}
                <form onSubmit={handleSubmit(login)}
                    /* handleSubmit is an event which we get from useForm (react-hook-form) 
                        we need to pass our method of handling the form submission here in its argument

                        we have passed login, which a method for handling form submission to handleSubmit

                        handleSubmit(onSubmit) ensures that onSubmit only gets called after validation passes.
                    */
                    className='mt-8'
                >
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter Email Id"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => 
                                        /^\S+@\S+\.\S+$/.test(value) || "Enter a valid Email ID"
                                }
                            })}
                        // if we don't spread the register then it will get overwritten by some other input field where register has been used
                        // inside the register, whatever name we pass is a key, keep it unique for each inputs

                        />
                        <Input
                            label="Password: "
                            placeholder="enter password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button type="submit">
                            Sign in
                        </Button>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Login