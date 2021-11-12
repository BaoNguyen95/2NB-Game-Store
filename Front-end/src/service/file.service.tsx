import { post } from "./app.service"
import { FILE_API } from "../constants/api.constants";
import { Image } from "../models/common.model";

export const uploadImage = async (image: Image, callback: (response: any) => void) => {
    let url = FILE_API.ADD_IMAGE;
    let formData = new FormData();
    formData.append('file', image.file)
    formData.set('foreignId', image.foreignId);
    return callback(await post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }));
}

export const deletePhoto = async (file: any, callback: (response: any) => void) => {
    return callback(await post(FILE_API.DELETE_PHOTO, { id: file.id }));
}