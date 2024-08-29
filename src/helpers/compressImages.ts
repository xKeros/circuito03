import * as fs from 'fs';
import * as path from 'path';
import imageCompression from 'browser-image-compression';

/**
 * Crea una carpeta si no existe.
 * @param {string} folderPath - Ruta de la carpeta a crear.
 */
const createFolderSync = (folderPath: string): void => {
  const resolvedPath = path.resolve(folderPath);
  
  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
    console.log(`Folder created at: ${resolvedPath}`);
  } else {
    console.log('Folder already exists:', resolvedPath);
  }
};

/**
 * Compress and optimize the image file, then save it in a specific folder.
 * @param {File} imageFile - The image file to be compressed.
 * @param {string} saveFolder - The folder where the compressed image will be saved.
 * @returns {Promise<string>} - Returns the path of the saved image.
 */
export const compressAndSaveImage = async (imageFile: File, saveFolder: string = '../../assets/images'): Promise<string> => {
  const options = {
    maxSizeMB: 1, // Maximum size in MB
    maxWidthOrHeight: 800, // Resize image to this width/height
    useWebWorker: true, // Use multi-threading to speed up compression
    fileType: 'image/webp' // Convert to WebP format
  };

  try {
    // Compress the image
    const compressedBlob = await imageCompression(imageFile, options);

    // Create the folder if it doesn't exist
    createFolderSync(saveFolder);

    // Define the file path
    const fileName = `${Date.now()}_${imageFile.name}.webp`; // New file name with timestamp and extension
    const savePath = path.join(saveFolder, fileName);

    // Convert the compressed blob to a Buffer
    const arrayBuffer = await compressedBlob.arrayBuffer();
    const Guardar = Buffer.from(arrayBuffer);

    // Save the file to the disk
    fs.writeFileSync(savePath, Guardar);

    console.log(`Image saved at: ${savePath}`);
    return savePath;
  } catch (error) {
    console.error('Error during image compression or saving:', error);
    throw error;
  }
};

// Uso del método
// compressAndSaveImage(imageFile, '../../assets/images');
