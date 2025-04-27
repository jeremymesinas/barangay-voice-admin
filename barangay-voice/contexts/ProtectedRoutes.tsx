// components/ProtectedRoute.tsx
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/LogIn" />;
  }

  return <>{children}</>;
};