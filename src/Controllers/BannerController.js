import fs from 'fs';
import { promisify } from 'util';
import cloudinary from '../Configs/CloudinaryConfig.js';
import { CreateBannerService, DeleteBannerByIdService, FindBannerByIdService, GetAllBannerService } from '../Services/BannerService.js';
import BannerModel from '../Models/Banner/BannerModel.js'

import { unlink } from 'fs/promises';


export const CreateBannerController = async (req, res) => {
    try {
        const { link } = req.body;
        console.log('req.body:', req.body); // ✅ Corrected

        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded',
                success: false
            });
        }

        // Upload to Cloudinary
        const uploaded = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto' // Allows both images and videos
        });

        // Delete file from local storage
        await unlink(req.file.path); 

        const created = await CreateBannerService({ image: uploaded.secure_url, link });

        if (created) {
            return res.status(200).json({
                message: 'File uploaded successfully',
                success: true,
                url: uploaded.secure_url
            });
        }

        return res.status(400).json({
            message: 'Could not upload file',
            success: false
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error
        });
    }
};

export const DeleteBannerByIdController=async(req,res )=>{
    try{
        const id=req.params.id;
        if(!id)
        {
            return res.status(400).json({
                message:'can not get id',
                success:false
            })
        }
        const deleted=await DeleteBannerByIdService(id);
        if(deleted)
        {
            return res.status(201).json({
                message:'Banner is deleted successfully',
                deleted,
                success:true
            })
        }
        return res.status(401).json({
            message:'Can not delete ',
            success:false
        })

    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const GetAllBannerController=async(req, res)=>{
    try{
        const getall=await GetAllBannerService();
        if(!getall)
        {
            return res.status(404).json({
                message:'Can not get banner',
                success:false
            })
        }
        return res.status(201).json(getall);
    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false 
        })
    }
}



export const EditBannerController = async (req, res) => {
    try {
        const id = req.params.id;
        const { link } = req.body;

        if (!id) {
            return res.status(401).json({
                message: 'Invalid id',
                success: false
            });
        }
        const ExistingBanner = await FindBannerByIdService(id);

        let imageurl=ExistingBanner.image;// Default to the existing image URL if no new image is uploaded

        if (req.file && req.file.path) {
            const uploaded = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto' // Allows both images and videos
            });

            console.log('sdkfsd',req.file)
            fs.unlinkSync(req.file.path); // Remove the file after uploading
            imageurl = uploaded.secure_url; // Update with the new image URL
        }

     
     
        if (!ExistingBanner) {
            return res.status(404).json({
                message: 'No Banner with this id',
                success: false
            });
        }

        const updated = await BannerModel.findByIdAndUpdate(
            ExistingBanner._id, 
            { image: imageurl, link: link },  // Update both image and link
            { new: true }
        );

        if (updated) {
            return res.status(200).json({
                message: 'Updated successfully',
                updated,
                success: true
            });
        }

        return res.status(400).json({
            message: 'Cannot update', 
            success: false
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            message: 'Internal server error',
            success: false
        });
    }
};

