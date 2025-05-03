import React, { useState, useEffect } from 'react'
import { PostForm, Container } from '../components/index'
import appWriteService from "../appWrite/config"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditPost = () => {
    const [post, setPost] = useState()
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.userData)

    useEffect(()=>{
        if(slug){
            appWriteService.getPost(slug).then((post)=>{
                if(post){
                    if(post.userId === userData.$id){
                        setPost(post)
                    }else{
                        navigate("/")
                    }
                }
            })
        }else{
            navigate("/")
        }
    },[slug,navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost