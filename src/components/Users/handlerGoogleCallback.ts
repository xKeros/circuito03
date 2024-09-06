import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const refreshToken = queryParams.get('refreshToken');
    
      if (token && refreshToken) {
        // Guardar los tokens en el localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
    
        // Redirigir a la página principal o la ruta deseada
        navigate('/');
      } else {
        // Si no hay tokens, redirigir al login
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return console.log('error'); // Puedes mostrar un spinner de carga aquí si prefieres
};
