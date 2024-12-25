import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api,
  api_secret: config.cloudinary_api_secret, 
});

export const sendImageToCloudinary = async (imgName: string, path: string) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imgName,
    });

    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File is deleted.');
      }
    });

    return uploadResult;
  } catch (error) {
    console.error('Error during image upload or file deletion:', error);
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
