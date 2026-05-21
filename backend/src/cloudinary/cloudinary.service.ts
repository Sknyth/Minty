import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async uploadImage(file: { buffer: Buffer }): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'minty' }, (error, result) => {
        if (error) reject(new Error(error.message))
        else if (result) resolve(result.secure_url)
        else reject(new Error('Upload failed'))
      }).end(file.buffer)
    })
  }
}