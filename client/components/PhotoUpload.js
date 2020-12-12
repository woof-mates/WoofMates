import React, { Component } from 'react'
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

const cloudName = 'woofmates'
const uploadPreset = 'woofmates'
export default class PhotoUpload extends Component{
    constructor(props){
        super(props)
        this.getPhotoUrl = this.getPhotoUrl.bind(this)
    }
    getPhotoUrl(){
        let uploadWidget = cloudinary.openUploadWidget({cloudName, uploadPreset, cropping: true},
            (error, result) => { if (!error && result && result.event === 'success') {
                // console.log(result.info.secure_url);
                let imageUrl = result.info.secure_url
                if (this.props.type === 'owner') this.props.photoUpload({ userImage1: imageUrl })
                else this.props.photoUpload({ dogImage: imageUrl })
            }
        })
    }
    render(){
        return (
            <>
            <button id="upload_widget" onClick={this.getPhotoUrl}>Upload</button>
            </>
        )
    }
}
