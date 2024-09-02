// src/helpers/imageUploadHelper.ts
export const uploadImages = async (images: File[]): Promise<string[]> => {
    const savedImages: string[] = [];
  
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('images', images[i]);
  
      try {
        const response = await fetch('https://localhost:7128/api/images/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(`Image ${i + 1} uploaded successfully`, data);
          
          if (Array.isArray(data.savedImages)) {
            savedImages.push(...data.savedImages);
          } else {
            console.error(`Unexpected response format for image ${i + 1}:`, data);
          }
        } else {
          console.error(`Failed to upload image ${i + 1}`);
        }
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);
      }
    }
  
    return savedImages;
};
