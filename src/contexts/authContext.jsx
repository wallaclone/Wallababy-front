// auth context --> sets user to logged user username

import React, { createContext, useState, useEffect } from 'react';

import apiCall from '../api/api';

const { currentUser } = apiCall();

export const AuthContext = createContext(); // user context

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        if (window.localStorage.getItem('token')) {
          const user = await currentUser();
          setUser(user);
        } else {
          setUser('guest');
        }
      } catch (error) {
        setUser('guest');
      }
    })();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

// Remove token when user logouts
/* async function logout() {
  window.localStorage.removeItem('token')
} */
