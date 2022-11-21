import {
  createContext, ReactNode, useEffect, useState, useMemo, useCallback,
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import api from '../services/api';
import { LoginMessage, RegisterMessage } from '../enums/returnMessages.enum';

interface IProps {
  children: ReactNode;
}

interface ILogin {
  username: string;
  password: string;
}

type IRegister = ILogin

interface IAuthentication {
  isAuthenticated: boolean;
  login: (loginData: ILogin) => Promise<void>
  register: (loginData: IRegister) => Promise<void>
  logout: () => void;
}

export const AuthContext = createContext({} as IAuthentication);

export function AuthProvider({ children }: IProps) {
  const { push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { 'ngcash.token': token } = parseCookies();
    setIsAuthenticated(!!token);
  }, []);

  const oneDay = 60 * 60 * 24;

  const login = useCallback(async ({ username, password }: ILogin) => {
    await api.post('/auth/login', { username, password }).then((response) => {
      setCookie(undefined, 'ngcash.token', response.data.token, {
        maxAge: oneDay,
      });
      setCookie(undefined, 'ngcash.user', response.data.username, {
        maxAge: oneDay,
      });
      const { status, data: { token } } = response;
      setIsAuthenticated(!!token);
      toast.success(LoginMessage[status], {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      push('/');
    }).catch((err) => {
      const { response: { status } } = err;
      toast.error(LoginMessage[status], {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  }, [oneDay, push]);

  const register = useCallback(async ({ username, password }: IRegister) => {
    await api.post('/auth/register', { username, password }).then((response) => {
      setCookie(undefined, 'ngcash.token', response.data.token, {
        maxAge: oneDay,
      });
      setCookie(undefined, 'ngcash.user', response.data.username, {
        maxAge: oneDay,
      });
      setIsAuthenticated(!!response.data.token);
      toast.success('Usuário registrado com sucesso!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      push('/');
    }).catch((err) => {
      const { response: { status } } = err;
      toast.error(RegisterMessage[status], {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  }, [oneDay, push]);

  const logout = useCallback(() => {
    destroyCookie(undefined, 'ngcash.token');
    setIsAuthenticated(false);
    push('/login');
  }, [push]);

  const value = useMemo(() => ({
    isAuthenticated, login, register, logout,
  }), [isAuthenticated, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}
