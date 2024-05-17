import { createContext } from 'react';

const AuthProvider = createContext({
  _Login: () => {}, // provide a default value or the actual implementation
  _Accept: () => {},
});

export default AuthProvider;