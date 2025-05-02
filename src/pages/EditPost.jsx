import React, { useState, useEffect } from 'react'
import { PostForm, Container } from '../components/index'
import appWriteService from "../appWrite/config"
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const [post, setPost] = useState()
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appWriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
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