import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";


export class Service{
    
    client = new Client()
    databases;
    bucket;
    
    constructor () {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost ({title,slug,content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {title,content,featuredImage,status,userId}
            )
        }catch(e){
            console.error(e);            
            return false
        }
    }
    async updatePost (slug,{title,content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {title,content,featuredImage,status}
            )
        }catch(e){
            console.error(e);  
            return false          
        }
    }
    async deletePost (slug){
        try{
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        }catch(e){
            console.error(e);  
            return false          
        }
    }
    async getPost (slug) {
        try{
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        }catch(e){
            console.error(e);   
            return false         
        }
    }
    async getAllPost () {
        try{
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        }catch(e){
            console.error(e);
            return false;
        }
    }

    // file upload service
    async uploadFile(file){

        try{
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        }catch(e){
            console.error(e);
            return false
        }

    }

    // delete file 
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
        }catch(e){
            console.error(e);
            return false
        }
    }

    // get file preview : 
    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appWriteBucketId,
            fileId,
        )
    }
    

}

const service = new Service();

export default service;

