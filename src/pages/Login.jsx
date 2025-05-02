import React from 'react'
import { Login as LoginComponent } from "../components/index"

const Login = () => {
    console.log("isinde login pAGE");
    
    return (
        <div className='py-8'>
            <LoginComponent />
        </div>
    )
}

export default Login