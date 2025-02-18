import { CreateUserService, FindUserByEmailService, GetAllUserService } from "../Services/UserService.js";


export const Register=async(req,res)=>{
    try{
        const {email, password}=req.body;
        const existing=await FindUserByEmailService(email);
        if(existing)
        {
            return res.status(401).json({
                message:'User is already exist with same email ',
                success:false
            })

        }
        const user=await CreateUserService({email, password});
        if(!user)
        {
            return res.status(401).json({
                message:'Can not Register',
                success:false
            })
        }
        return res.status(201).json({
            message:'Register Successfully',
            user,
            success:true
        })


    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const GetAllUserController=async(req,res)=>{
    try{
        const users=await GetAllUserService();
        if(!users)
        {
            return res.status(404).json({
                message:'Can not get users',
                success:false
            })
        }
        return res.status(201).json(users);
    }
    catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}