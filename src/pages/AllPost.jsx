import React, { useState, useEffect } from 'react'
import appWriteService from "../appWrite/config"
import { PostCard, Container } from '../components/index'

const AllPost = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {

    }, [])

    appWriteService.getAllPost().then((res) => {
        if (res) {
            setPosts(res.documents)
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                ))}
                </div>
            </Container>

        </div>
    )
}

export default AllPost