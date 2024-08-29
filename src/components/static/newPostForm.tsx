import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const NewPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Crear un FormData para la solicitud
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('content', content);
    formData.append('authorId', authorId);
    formData.append('timestamp', timestamp);
  
    images.map((image, index) => formData.append(`image_${index + 1}`, image));

  
    try {
      console.log(formData);
      // Enviar las imágenes al backend para procesarlas
      const response = await fetch('https://localhost:7128/api/images/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Post Data with Saved Images:', data);
  
        // Aquí puedes utilizar las rutas de las imágenes procesadas (data.OptimizedImagePath)
      } else {
        console.error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      console.log('Selected files:', newFiles); // Verifica que los archivos seleccionados se están agregando al estado
      setImages(newFiles); // Actualiza el estado con los nuevos archivos
  
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };
  

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#000" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            name="content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="authorId"
            label="Author ID"
            name="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="timestamp"
            label="Timestamp"
            name="timestamp"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Upload files
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              hidden
            />
          </Button>

          {imagePreviews.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" component="div" gutterBottom>
                Image Previews
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {imagePreviews.map((preview, index) => (
                  <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewPost;
