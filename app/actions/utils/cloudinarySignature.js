'use server';

import crypto from 'crypto';

export async function getCloudinarySignature(prevState, formData) {
  const folder = formData.get("folder") || "uploads";
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Determine if folder should be included in signature based on folder name
  const shouldIncludeFolder = folder.includes("experiences") || 
                             folder.includes("training_files") || 
                             folder.includes("support_files");
  
  // Determine which parameters to include in the signature
  let stringToSign;
  
  if (shouldIncludeFolder) {
    // For experiences, training_files and support_files
    stringToSign = `folder=${folder}&timestamp=${timestamp}`;
  } else {
    // For cover_image, gallery_image, blog, etc.
    stringToSign = `timestamp=${timestamp}`;
  }
  
  // Generate signature using your API secret
  const signature = crypto
    .createHash("sha1")
    .update(stringToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");
  
  return {
    success: true,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    signature,
    timestamp,
    folder,
    shouldIncludeFolder, // Include this flag in the response
    stringToSign, // Include this for debugging
  };
}

// Export with both names for compatibility
export { getCloudinarySignature as cloudinarySignature };