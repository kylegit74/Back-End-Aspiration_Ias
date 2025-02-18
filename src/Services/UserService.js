import { CreateUser, FindUserByEmailRepo, GetAllUser } from "../Repository/UserRepo.js";

export const FindUserByEmailService=async(email)=>
{
    try{
        const user=await FindUserByEmailRepo(email)

    }catch(error)
    {
        return error;
    }

}
export const CreateUserService=async(obj)=>{
    try{
        const user=await CreateUser(obj);
        return user;

    }catch(error)
    {
        return error;
    }
}
export const GetAllUserService=async()=>{
    try{

        const users=await GetAllUser();
        return users;
    }catch(error)
    {
        return error;
    }
}