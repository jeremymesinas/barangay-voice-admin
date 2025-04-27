import { TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <TouchableOpacity onPress={logout}>
      <Text style={{ color: 'white', marginRight: 10 }}>Logout</Text>
    </TouchableOpacity>
  );
};