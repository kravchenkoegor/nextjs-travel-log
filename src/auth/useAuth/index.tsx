import { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../initFirebase';
import { removeTokenCookie, setTokenCookie } from '../tokenCookies';
import { FormInput } from 'src/interfaces';

initFirebase();

type User = firebase.User | null;

interface IAuthContext {
  user: User;
  login: (data: FormInput) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: FormInput) => Promise<void>;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  authenticated: false
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  const register = async ({ email, password }: FormInput) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        setUser(userCredential.user);
      }
      router.push('/');
    } catch (error) {
      console.error('registerError', error);
    }
  };

  const login = async ({ email, password }: FormInput) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (userCredential.user) {
        setUser(userCredential.user);
      }
      router.push('/');
    } catch (error) {
      console.error('loginUserError', error);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  // Listen for token changes
  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    });

    return () => {
      cancelAuthListener();
    };
  }, []);

  const providerValue: IAuthContext = {
    authenticated: Boolean(user),
    login,
    logout,
    register,
    user
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
