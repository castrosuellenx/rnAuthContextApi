import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

interface User {
  name: string;
  email: string;
}
interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      try {
        const storagedUser = await AsyncStorage.getItem('@Auth:user');
        const storagedToken = await AsyncStorage.getItem('@Auth:token');
        //throw new Error('Deu um erro!');
        if (storagedUser && storagedToken) {
          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${storagedToken}`;
          console.log(api.defaults.headers);

          setUser(JSON.parse(storagedUser));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);

    api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@Auth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@Auth:token', response.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
