import { useNavigate } from "react-router-dom";

export const logOut = () => {
  const navigate = useNavigate(); // Hook para manejar la redirección

   const handleLogOut = async () => {
    // Eliminar los tokens y la información relacionada con la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');

    try {
        const response = await fetch("https://localhost:7128/api/TestUsers/logout", {
            method: "POST",
            credentials: "include" 
        })
        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
        }
    } catch (error) {
        console.log(error)
    } 

    // Redirigir al usuario a la página de login
    navigate('/login');
  };

  return handleLogOut;
};
