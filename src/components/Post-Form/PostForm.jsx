import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appWriteService from '../../appWrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PostForm = ({ post }) => {

    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.userData)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    })

    const submitForm = async (data) => {
        if (post) {
            const file = data.image[0] ? appWriteService.uploadFile(data.image[0]) : null

            if (file) {
                appWriteService.deleteFile(post.featuredImage) // if user has uploaded a file then this will delete the older image
            }

            const dbPost = await appWriteService.updatePost(
                post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage
            }
            )
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = data.image[0] ? appWriteService.uploadFile(data.image[0]) : null

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appWriteService.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-') // replace all spaces with "-"
        }
        return ''
    }, [])


    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            // here value is an object, we need to watch on title field that is why we will use value.title
            if(name=="title"){
                setValue('slug',slugTransform(value.title, {shouldValidate: true})) // in the slug it will set the string returned by slugTransform
            }
        })
        return () => {
            subscription.unsubscribe() // in order to optimize memory management \
            // any method inside useEffect can be hold in a variable and then we can use unsubscribe that method to optimize the memory usage
            // it stops the method calls again and again.. 
        }
    },[watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submitForm)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input 
                    label = "Title :"
                    placeholder = "Title"
                    className = "mb-4"
                    {...register("title",{required: true})}
                />
                <Input 
                    label = "Slug : "
                    placeholder = "Slug"
                    className="mb-4"
                    {...register("slug",{required: true })}
                    onInput = {(e)=>{
                        setValue("slug",slugTransform(e.currentTarget.value),{
                            shouldValidate: true
                        })
                    }}
                />
                <RTE 
                    label="Content: "
                    name = "content"
                    control = {control} defaultValue={getValues("content")}                    
                />
            </div>
            <div className='w-1/3 px-2'>
                    <Input 
                        label="Featured Image: "
                        type="file"
                        className="mb-4"
                        accept = "image/png image/jpg image/jpeg, image/gif"
                        {...register("image",{ required:!post})}
                    />
                    {post && (
                        <div className='w-full mb-4'>
                            <img 
                            src={appWriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                            />
                        </div>
                    )}
                    
                    <Select
                    options ={["active","inactive"]}
                    label = 'Status'
                    className = "mb-4"
                    {...register("status",{required:true})}
                    />

                    <Button
                    type="submit"
                    bgColor = {post ? "bg-green-500" : undefined}
                    className = 'w-full'
                    >
                        {!post ? "Upload Post" : "Update Post"}
                    </Button>
            </div>
        </form>
    )
}

export default PostForm