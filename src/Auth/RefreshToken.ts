export const handleRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      const response = await fetch('https://localhost:7128/api/TestUsers/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar el JWT y el Refresh Token
        localStorage.setItem('token', data.Token);
        localStorage.setItem('refreshToken', data.RefreshToken);
      } else {
        console.error("Token refresh failed:", data);
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  };