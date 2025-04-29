import React,{use, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Protected = ({children,authentication=true}) => {

    const navigate = useNavigate()
    const [loader,serLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status) 

    useEffect(()=>{

        //without authentication
        // if(authStatus===true){
        //     navigate("/")
        // }else if(authStatus===false){
        //     navigate("/login")
        // }

        // with authentication : 
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }else if(!authentication && authStatus!==authentication ){
            navigate("/")
        }
        serLoader(false)
    },[authStatus, navigate, authentication])

  return    loader ?  <h1> Loading... </h1> : <>{children}</>
}

export default Protected