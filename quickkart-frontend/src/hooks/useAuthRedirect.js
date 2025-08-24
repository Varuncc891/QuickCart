import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect(requiredRole) {  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      if (requiredRole && payload.role !== requiredRole) {
        navigate('/unauthorized');
      }
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate, requiredRole]);
}