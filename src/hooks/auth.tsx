import React, { createContext, ReactNode, useContext  } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: 'fswe343',
    name: 'Leo Schlanger',
    email: 'leoschlanger@gmail.com',
    photo: 'https://avatars.githubusercontent.com/u/37229572?s=400&u=c582816450d7548ede93d47f6c9affddf0aa2bdc&v=4'
    };

  return(
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };