
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary.config';
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    const fileName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, '-') 
      .replace(/\.[^.]*$/, '')
      .replace(/[^a-z0-9\-]/g, ''); 

    const uniqueFileName =
      Math.random().toString(36).substring(2) +
      '-' +
      Date.now() +
      '-' +
      fileName;

    const isPdf = file.mimetype === 'application/pdf';
    
    if (isPdf) {
      // PDFs use memory storage for Google Drive upload
      return {
        resource_type: 'raw' as any,
        public_id: `${uniqueFileName}.pdf`,
        folder: 'pdfs',
      };
    }
    
    return {
      resource_type: 'auto' as any,
      public_id: uniqueFileName,
    };
  },
});

// Use memory storage for PDFs, Cloudinary for images
const memoryStorage = multer.memoryStorage();

export const multerUpload = multer({ 
  storage: multer.memoryStorage(),
});
