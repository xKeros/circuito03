import React, { useState, useEffect } from "react";
import { getUserById } from "../helpers/fectAPI"; // Asegúrate de que la ruta sea correcta
import { UserInterface } from "../interface/users"; // Asegúrate de que la ruta y la interfaz sean correctas
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import "./styles/profile.css";

const ProfilePage: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar el loading
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función que obtiene los datos del usuario
  const getInfoUser = async () => {
    if (!userId) {
      setError("User ID no encontrado");
      setLoading(false);
      return;
    }

    const url = `https://localhost:7128/api/TestUsers/${userId}`;
    try {
      const userData = await getUserById(url);
      setUser(userData);
    } catch (error) {
      setError("Error al obtener la información del usuario.");
    } finally {
      setLoading(false); // Siempre establecer el loading a false al finalizar la llamada
    }
  };

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    getInfoUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Card sx={{ maxWidth: "100%" }}>
        {/* Imagen de fondo como el banner */}
        <CardMedia
          component="img"
          height="200"
          image="https://www.teknofilo.com/wp-content/uploads/2023/06/Microsoft_Nostalgic_Windows_Wallpaper_4k-scaled.jpg"
          alt="Banner"
        />

        {/* Contenedor para el avatar y detalles */}
        <Box sx={{ position: "relative", textAlign: "center", mt: -8 }}>
          {/* Avatar circular */}
          <Avatar
            alt={user?.fullname}
            src="https://source.unsplash.com/random" // Puedes cambiar por la foto del usuario
            sx={{ width: 150, height: 150, margin: "0 auto", border: "5px solid white" }}
          />

          {/* Nombre de usuario y detalles */}
          <CardContent sx={{ mt: 2 }}>
            <Typography variant="h5" component="div">
              {user?.fullname}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user?.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Edad: {user?.age}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Posts: {user?.posts.join(", ")}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default ProfilePage;
