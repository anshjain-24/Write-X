// refer AppWrite documentation 

import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;
    constructor () {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client)                    
    }

    async createAccount ({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                // calling login method, because as soon as user's account is created, user should be logged into the system
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (e) {
            throw e;
        }
    }

    login = async ({email,password}) => {
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }catch(e){
            throw e;
        }
    }

    async getCurrentUser(){
        try{
            const user = await this.account.get();
            // console.log("user returned from get method from appWrite : ",user);
            return user
        }catch(e){
            console.error(e);
        }
        return null;
    }

    async logout () {
        try{
            return await this.account.deleteSessions();
        }catch(e){
            console.error(e);
        }
    }

}

const authService = new AuthService();

export default authService; 
// exporting object of AuthService class.. so that it can access all methods and all