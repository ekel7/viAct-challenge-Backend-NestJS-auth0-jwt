import { Document } from 'mongoose'

export interface IUser extends Document {
    id?: number //opcional
    name: string;
    nickname: string;
    email_verified: boolean;
    email: string;
    password: string;
    address: string;
    profilePic: string;
}