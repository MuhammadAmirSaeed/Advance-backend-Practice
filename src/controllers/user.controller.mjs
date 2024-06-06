import res from "express/lib/response";
import { User } from "../models/user.model.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";

import {uploadOnCloudinary} from '../utils/cloudinary.mjs'
import { ApiResponse } from "../utils/ApiResponse.mjs";
const registerUser =  asyncHandler(async(req,res)=>{
    const {fullName,email,username,password} = req.body;

    if([fullName,email,username,password].some((field)=>field?.trim() === "")){
     throw new  ApiError(400,"All Field are required")
    }

 
    // check if user is already exist 
    const  existUser = await User.findOne({ $or:[{username},{email}]})
})

if(existUser){
    throw new ApiError(400,"User is already exist")
}
const avatarLocalPath = req.files?.avatar[0]?.path
const coverImageLocalPath = req.files?.coverImage[0]?.path


const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)
if(!avatar){
    throw new ApiError(400,"Avatar filed is required")
}
const user = User.create({
    fullName,
    email,
    username:username.toLowerCase(),
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    
})
const createdUser  = User.findById(user._id).select(
    "-password -refreshtoken"
)

if(!createdUser){
    throw new ApiError(500," something wrong while creating a new user")
}

res.status(201).json(
    new ApiResponse(200,createdUser,"User is created successfully")
)

export {registerUser}