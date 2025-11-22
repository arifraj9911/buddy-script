import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import multer from "multer";
import { config } from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name as string,
  api_key: config.cloudinary_api_key as string,
  api_secret: config.cloudinary_api_secret as string,
});

export const sendImageToCloudinary = (
  imageName: string,
  filePath: string
): Promise<{ [key: string]: any }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(filePath, { public_id: imageName })
      .then((uploadResult) => {
        const optimizeUrl = cloudinary.url(imageName, {
          fetch_format: "auto",
          quality: "auto",
        });

        const autoCropUrl = cloudinary.url(imageName, {
          crop: "auto",
          gravity: "auto",
          height: 500,
          width: 500,
        });

        console.log(
          `Optimize Url: ${optimizeUrl}\n Auto Crop Url: ${autoCropUrl}`
        );

        resolve(uploadResult);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("file is deleted");
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// upload directory setup
const uploadDir = path.join(process.cwd(), "uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
