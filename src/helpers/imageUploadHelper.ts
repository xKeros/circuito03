export const uploadImages = async (images: File[]): Promise<string[]> => {
  const savedImages: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append('image', images[i]);

    try {
      const response = await fetch('https://localhost:7128/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Image ${i + 1} uploaded successfully`, data);
        
        if (data.imagePath) {
          // El backend ahora devuelve la ruta relativa directamente
          const fullUrl = `https://localhost:7128${data.imagePath}`;
          savedImages.push(fullUrl);
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