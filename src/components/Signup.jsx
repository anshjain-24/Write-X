import React, { useState } from 'react'
import authService from '../appWrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'



const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const registerUser = async (data) => {
        setError("")
        try {
            const newUserData = await authService.createAccount(data)
            if (newUserData) {
                const userData = await authService.getCurrentUser()
                console.log("userData in signup component : ",userData);
                if (userData) {
                    dispatch(login({userData}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg
                bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Create New Account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>

                    Already have an account?&nbsp;
                    <Link
                        to={'/login'}
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign in to your account
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>
                    {error}</p>}
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className='space-y-5'>

                        <Input
                            label="Name: "
                            placeholder="Enter Your Name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter Email Id"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatter: (value) => {
                                        /^\S+@\S+\.\S+$/.test(value) || "Enter a valid Email ID"
                                    }
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            placeholder="enter password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            children="Create Account"
                            type="submit"
                            className="w-full"
                        />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup