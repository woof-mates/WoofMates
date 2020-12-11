import React, { Component } from 'react'
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

const cloudName = 'woofmates'
const uploadPreset = 'woofmates'

export default class PhotoUpload extends Component{
    // createUploadWidget(){
    //     const uploadWidget = cloudinary.createUploadWidget({
    //         cloudName, uploadPreset, cropping: true}, 
    //         (error, result) => { console.log(error, result) })
    //     return uploadWidget
    // }
    render(){
        const uploadWidget = cloudinary.createUploadWidget({cloudName, uploadPreset, cropping: true},
            (error, result) => { console.log(error, result) })
        return (
            <>
            <button id="upload_widget" onClick={uploadWidget.open}>Upload</button>
            </>
        )

    }
}
