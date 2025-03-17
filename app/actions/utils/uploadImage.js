'use server'

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads an image to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} folder - The folder in Cloudinary to upload to
 * @returns {Promise<string>} - The URL of the uploaded image
 */
export async function uploadImage(file, folder = 'general') {
  try {
    if (!file || file.size === 0) {
      throw new Error('No file provided');
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          public_id: filename.split('.')[0], // Remove file extension for public_id
          resource_type: 'auto', // Auto-detect resource type
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image'));
          } else {
            resolve(result.secure_url);
          }
        }
      );
      
      // Write buffer to stream
      const Readable = require('stream').Readable;
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw new Error('Failed to upload image: ' + error.message);
  }
}
