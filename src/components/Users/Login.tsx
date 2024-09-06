import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { Button, Alert, Snackbar } from '@mui/material';
import './Login.css';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const getCookie = (cookieName: string) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      // Elimina los espacios iniciales
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      // Si el nombre de la cookie coincide, devuelve su valor
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  const loginGoogleActive = (active: boolean) => {
    if (active) {
      // Obtener las cookies
      const token = getCookie('authToken');
      const refreshToken = getCookie('refreshToken');
      const userId = getCookie('userId');
  
      if (token && refreshToken && userId) {
        // Aquí puedes almacenar las cookies en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
        console.log('Cookies almacenadas en localStorage');
  
        // Redirige al usuario a la ruta raíz para limpiar la URL
        navigate('/');
      } else {
        console.log('No se encontraron todas las cookies necesarias.');
      }
    }
  }
  

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7128/api/TestUsers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.userId);

        navigate('/');
      } else {
        const errorData = await response.json();
        if (errorData.error === 'User not found') {
          setErrorMessage('Usuario no encontrado');
        } else if (errorData.error === 'Invalid credentials') {
          setErrorMessage('Credenciales incorrectas');
        } else {
          setErrorMessage('Error desconocido');
        }
        setOpenAlert(true);
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setErrorMessage('Error al conectar con el servidor');
      setOpenAlert(true);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://localhost:7128/api/TestUsers/login/google';
    loginGoogleActive(true)
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className="login-container">
      <form className="form">
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            className="input"
            placeholder="Enter your Email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            className="input"
            placeholder="Enter your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <Button
          variant="contained"
          className="button-submit"
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <p className="p">Don't have an account? <span className="span">Sign Up</span></p>

        <p className="p line">Or With</p>

        <div className="flex-row">
          <Button
            className="btn google"
            variant="outlined"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Login with Google
          </Button>
        </div>
      </form>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
