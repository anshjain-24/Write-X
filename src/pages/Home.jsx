import React, { useEffect, useState } from 'react'
import appWriteService from "../appWrite/config"
import { Container, PostCard } from "../components/index"
import { useSelector } from 'react-redux'


const Home = () => {
    const [posts, setPosts] = useState([])

    const authStatus = useSelector((state)=>state.auth.status)

    useEffect(() => {
        appWriteService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    })

    if(posts.length===0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'> 
                                {authStatus && (
                                    "There is no Post as of now"
                                )}
                                {!authStatus && (
                                    "Login to see all Posts"
                                )}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />  
                            {/* we would have to pass the destructured values */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home