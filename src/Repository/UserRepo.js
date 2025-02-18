import UserModel from "../Models/User/Register.js"

export const FindUserByEmailRepo=async(email)=>{
    try{
        const user=await UserModel.find({email});
        return user;
    }catch(error)
    {
        return error;
    }
}
export const CreateUser=async(obj)=>{
    try{
        const created=await UserModel.create(obj);
        return created;
    }catch(error)
    {
        return error;
    }
}
export const GetAllUser=async()=>{
    try{
        const users=await UserModel.find({});
        return users;

    }catch(error)
    {

        return error;
    }
}